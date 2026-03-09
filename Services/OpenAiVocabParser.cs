using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using GlosTrainer.Web.Models;
using System.Globalization;

namespace GlosTrainer.Web.Services;

public sealed class OpenAiVocabParser
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public OpenAiVocabParser(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<AiParseResult> ParseAsync(AiParseRequest request, IEnumerable<IFormFile>? files = null, CancellationToken ct = default)
    {
        var apiKey = _configuration["OpenAI:ApiKey"] ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException("OpenAI API key missing. Set OpenAI:ApiKey or OPENAI_API_KEY.");
        }

        var input = (request.Text ?? string.Empty).Trim();
        var uploadedFiles = files?.ToList() ?? [];
        if (string.IsNullOrWhiteSpace(input) && uploadedFiles.Count == 0)
        {
            return new AiParseResult();
        }

        if (uploadedFiles.Count == 0 && TryParsePlainTextPairs(request, input, currentWeek: ISOWeek.GetWeekOfYear(DateTime.UtcNow), out var localResult))
        {
            return localResult;
        }

        var model = _configuration["OpenAI:Model"] ?? "gpt-4.1-mini";
        var currentWeek = ISOWeek.GetWeekOfYear(DateTime.UtcNow);
        var userContent = new List<object>();

        userContent.Add(new
        {
            type = "text",
            text = BuildInstructionPrompt(request, input, currentWeek)
        });

        foreach (var file in uploadedFiles)
        {
            if (file.Length <= 0)
            {
                continue;
            }

            if (file.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
            {
                await using var fileStream = file.OpenReadStream();
                using var ms = new MemoryStream();
                await fileStream.CopyToAsync(ms, ct);
                var base64 = Convert.ToBase64String(ms.ToArray());
                var imageUrl = $"data:{file.ContentType};base64,{base64}";

                userContent.Add(new
                {
                    type = "image_url",
                    image_url = new { url = imageUrl }
                });
                continue;
            }

            if (IsTextFile(file))
            {
                using var reader = new StreamReader(file.OpenReadStream());
                var fileText = await reader.ReadToEndAsync(ct);
                if (!string.IsNullOrWhiteSpace(fileText))
                {
                    userContent.Add(new
                    {
                        type = "text",
                        text = $"File: {file.FileName}\n{fileText}"
                    });
                }
            }
        }

        var payload = new
        {
            model,
            response_format = new
            {
                type = "json_schema",
                json_schema = new
                {
                    name = "vocab_words",
                    strict = true,
                    schema = new
                    {
                        type = "object",
                        properties = new
                        {
                            words = new
                            {
                                type = "array",
                                items = new
                                {
                                    type = "object",
                                    properties = new
                                    {
                                        sv = new { type = "string" },
                                        en = new { type = "string" }
                                    },
                                    required = new[] { "sv", "en" },
                                    additionalProperties = false
                                }
                            }
                            ,
                            detectedLanguage = new { type = "string" },
                            suggestedWeekName = new { type = "string" }
                        },
                        required = new[] { "detectedLanguage", "suggestedWeekName", "words" },
                        additionalProperties = false
                    }
                }
            },
            messages = new object[]
            {
                new
                {
                    role = "system",
                    content = "You extract vocabulary pairs from text or images. Return JSON only. Keep source terms in sv and target terms in en."
                },
                new
                {
                    role = "user",
                    content = userContent
                }
            }
        };

        var client = _httpClientFactory.CreateClient();
        using var message = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        {
            Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
        };

        message.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        using var response = await client.SendAsync(message, ct);
        var raw = await response.Content.ReadAsStringAsync(ct);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"OpenAI call failed: {(int)response.StatusCode} {raw}");
        }

        using var doc = JsonDocument.Parse(raw);
        var content = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        if (string.IsNullOrWhiteSpace(content))
        {
            return new AiParseResult();
        }

        var parsed = JsonSerializer.Deserialize<AiParseResult>(content);
        if (parsed is null || parsed.Words.Count == 0)
        {
            if (TryParsePlainTextPairs(request, input, currentWeek, out var fallbackResult))
            {
                return fallbackResult;
            }

            return new AiParseResult();
        }

        parsed.Words = parsed.Words
            .Where(w => !string.IsNullOrWhiteSpace(w.Sv) && !string.IsNullOrWhiteSpace(w.En))
            .Select(w => new VocabWord { Sv = w.Sv.Trim(), En = w.En.Trim() })
            .ToList();

        return parsed;
    }

    private static bool TryParsePlainTextPairs(AiParseRequest request, string input, int currentWeek, out AiParseResult result)
    {
        result = new AiParseResult();
        if (string.IsNullOrWhiteSpace(input))
        {
            return false;
        }

        var lines = input
            .Split(['\r', '\n'], StringSplitOptions.RemoveEmptyEntries)
            .Select(NormalizeLine)
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .ToList();

        if (lines.Count < 2)
        {
            return false;
        }

        // Pass 1: explicit separators like "word - translation" or "word: translation".
        var explicitPairs = lines
            .Select(ParseExplicitPair)
            .Where(x => x is not null)
            .Select(x => x!)
            .ToList();

        if (explicitPairs.Count >= 2)
        {
            result = BuildLocalResult(request, explicitPairs, lines, currentWeek);
            return true;
        }

        // Pass 2: alternating rows (term on one row, translation on next row).
        var cleaned = lines.Where(x => !IsLikelyHeader(x)).ToList();
        var alternatingPairs = new List<VocabWord>();
        for (var i = 0; i + 1 < cleaned.Count; i += 2)
        {
            var left = cleaned[i].Trim();
            var right = cleaned[i + 1].Trim();
            if (left.Length == 0 || right.Length == 0)
            {
                continue;
            }

            alternatingPairs.Add(new VocabWord { Sv = left, En = right });
        }

        if (alternatingPairs.Count < 2)
        {
            return false;
        }

        result = BuildLocalResult(request, alternatingPairs, lines, currentWeek);
        return true;
    }

    private static AiParseResult BuildLocalResult(AiParseRequest request, List<VocabWord> words, List<string> lines, int currentWeek)
    {
        var detectedLanguage = ResolveDetectedLanguage(request, lines);
        var weekNameLanguage = string.Equals(detectedLanguage, "swedish", StringComparison.OrdinalIgnoreCase)
            ? "Swedish"
            : detectedLanguage;

        return new AiParseResult
        {
            DetectedLanguage = detectedLanguage,
            SuggestedWeekName = $"Week {currentWeek} - {weekNameLanguage}",
            Words = words
                .Where(w => !string.IsNullOrWhiteSpace(w.Sv) && !string.IsNullOrWhiteSpace(w.En))
                .Select(w => new VocabWord { Sv = w.Sv.Trim(), En = w.En.Trim() })
                .ToList()
        };
    }

    private static string ResolveDetectedLanguage(AiParseRequest request, List<string> lines)
    {
        var joined = string.Join(" ", lines).ToLowerInvariant();
        if (joined.Contains('å') || joined.Contains('ä') || joined.Contains('ö'))
        {
            return "swedish";
        }

        return "english";
    }

    private static VocabWord? ParseExplicitPair(string line)
    {
        var split = Regex.Split(line, @"\s*[-:=]\s*");
        if (split.Length < 2)
        {
            return null;
        }

        var left = split[0].Trim();
        var right = string.Join(" - ", split.Skip(1)).Trim();
        if (left.Length == 0 || right.Length == 0)
        {
            return null;
        }

        return new VocabWord { Sv = left, En = right };
    }

    private static string NormalizeLine(string line)
    {
        var normalized = line.Trim().Trim('"', '\'', '*', '•', '-', '\t');
        return Regex.Replace(normalized, @"\s+", " ");
    }

    private static bool IsLikelyHeader(string line)
    {
        if (Regex.IsMatch(line, @"^v\s*\d+\b", RegexOptions.IgnoreCase))
        {
            return true;
        }

        if (line.Length > 40 && !line.Contains('å') && !line.Contains('ä') && !line.Contains('ö'))
        {
            return true;
        }

        return false;
    }

    private static string BuildInstructionPrompt(AiParseRequest request, string input, int weekNumber)
    {
        return
            $"Target language: {request.TargetLanguage}. " +
            $"Detect the source language from the provided content. " +
            $"Generate a week name in the detected/source language and include week number {weekNumber}. " +
            $"The suggested week name must not be in Swedish unless detected language is Swedish. " +
            $"Extract vocabulary pairs into sv (source term) and en (target term). " +
            $"Content:\n{input}";
    }

    private static bool IsTextFile(IFormFile file)
    {
        if (file.ContentType.StartsWith("text/", StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }

        var ext = Path.GetExtension(file.FileName);
        return ext.Equals(".txt", StringComparison.OrdinalIgnoreCase)
               || ext.Equals(".csv", StringComparison.OrdinalIgnoreCase)
               || ext.Equals(".md", StringComparison.OrdinalIgnoreCase)
               || ext.Equals(".json", StringComparison.OrdinalIgnoreCase);
    }
}
