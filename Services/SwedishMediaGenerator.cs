using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace GlosTrainer.Web.Services;

public sealed class SwedishMediaGenerator
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public SwedishMediaGenerator(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    /// <summary>
    /// Generate a simple illustration of the concept using DALL-E.
    /// The englishHint describes what to draw (e.g. "a dog", "a school").
    /// Returns a data URI string: "data:image/png;base64,..."
    /// </summary>
    public async Task<string> GenerateImageAsync(string englishHint, CancellationToken ct = default)
    {
        var apiKey = GetApiKey();
        var client = _httpClientFactory.CreateClient();

        var payload = new
        {
            model = "dall-e-3",
            prompt = $"Educational flashcard illustration for a children's spelling game. " +
                     $"Show a clear, recognizable picture of: {englishHint}. " +
                     "The image should make it obvious what the object/concept is so a child can identify it and spell the word. " +
                     "IMPORTANT: No text, no letters, no words, no numbers anywhere in the image. " +
                     "Clean, simple, colorful cartoon style. White or light background. Single subject centered.",
            n = 1,
            size = "1024x1024",
            response_format = "b64_json"
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/images/generations")
        {
            Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        using var response = await client.SendAsync(request, ct);
        var raw = await response.Content.ReadAsStringAsync(ct);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"DALL-E call failed: {(int)response.StatusCode} {raw}");
        }

        using var doc = JsonDocument.Parse(raw);
        var b64 = doc.RootElement
            .GetProperty("data")[0]
            .GetProperty("b64_json")
            .GetString();

        return $"data:image/png;base64,{b64}";
    }

    /// <summary>
    /// Generate spoken audio of a Swedish word using OpenAI TTS.
    /// Returns a data URI string: "data:audio/mpeg;base64,..."
    /// </summary>
    public async Task<string> GenerateAudioAsync(string swedishWord, CancellationToken ct = default)
    {
        var apiKey = GetApiKey();
        var client = _httpClientFactory.CreateClient();

        // Full Swedish sentence context forces TTS to use Swedish pronunciation
        var ttsInput = $"{swedishWord}. Jag säger ordet igen: {swedishWord}.";
        var payload = new
        {
            model = "tts-1-hd",
            input = ttsInput,
            voice = "shimmer",
            response_format = "mp3",
            speed = 0.85
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/audio/speech")
        {
            Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        using var response = await client.SendAsync(request, ct);
        if (!response.IsSuccessStatusCode)
        {
            var errorBody = await response.Content.ReadAsStringAsync(ct);
            throw new InvalidOperationException($"TTS call failed: {(int)response.StatusCode} {errorBody}");
        }

        var audioBytes = await response.Content.ReadAsByteArrayAsync(ct);
        var b64 = Convert.ToBase64String(audioBytes);
        return $"data:audio/mpeg;base64,{b64}";
    }

    /// <summary>
    /// Translate a Swedish word to an English concept description for DALL-E.
    /// </summary>
    public async Task<string> TranslateForImageAsync(string swedishWord, CancellationToken ct = default)
    {
        var apiKey = GetApiKey();
        var client = _httpClientFactory.CreateClient();
        var model = _configuration["OpenAI:Model"] ?? "gpt-4.1-mini";

        var payload = new
        {
            model,
            messages = new object[]
            {
                new { role = "system", content = "Translate the Swedish word to a short English description suitable for generating an illustration. Reply with ONLY the English description, nothing else. Example: 'björk' -> 'a birch tree', 'stjärna' -> 'a star', 'hund' -> 'a dog'" },
                new { role = "user", content = swedishWord }
            },
            max_tokens = 50
        };

        using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        {
            Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        using var response = await client.SendAsync(request, ct);
        var raw = await response.Content.ReadAsStringAsync(ct);
        if (!response.IsSuccessStatusCode)
        {
            return swedishWord; // Fallback to the Swedish word
        }

        using var doc = JsonDocument.Parse(raw);
        var content = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        return string.IsNullOrWhiteSpace(content) ? swedishWord : content.Trim().Trim('"', '\'');
    }

    private string GetApiKey()
    {
        var apiKey = _configuration["OpenAI:ApiKey"] ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException("OpenAI API key missing. Set OpenAI:ApiKey or OPENAI_API_KEY.");
        }
        return apiKey;
    }
}
