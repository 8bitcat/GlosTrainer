using System.Text.Json;
using GlosTrainer.Web.Models;

namespace GlosTrainer.Web.Services;

public sealed class VocabDataStore
{
    private readonly string _filePath;
    private readonly SemaphoreSlim _gate = new(1, 1);
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNamingPolicy = null,
        WriteIndented = true
    };

    public VocabDataStore(IWebHostEnvironment env)
    {
        _filePath = Path.Combine(env.ContentRootPath, "Glosdatabas", "vocab_data.json");
    }

    public async Task<VocabData> GetDataAsync(CancellationToken ct = default)
    {
        await _gate.WaitAsync(ct);
        try
        {
            return await ReadUnsafeAsync(ct);
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<VocabData> UpdateSelectionAsync(string? userId, string? weekId, CancellationToken ct = default)
    {
        await _gate.WaitAsync(ct);
        try
        {
            var data = await ReadUnsafeAsync(ct);

            if (!string.IsNullOrWhiteSpace(userId) && data.Users.Any(u => u.Id == userId))
            {
                data.LastActiveUserId = userId;
            }

            if (!string.IsNullOrWhiteSpace(weekId) && data.Weeks.Any(w => w.Id == weekId))
            {
                data.LastSelectedWeekId = weekId;
            }

            await WriteUnsafeAsync(data, ct);
            return data;
        }
        finally
        {
            _gate.Release();
        }
    }

    public async Task<VocabData> ReplaceWeekWordsAsync(string weekId, string? weekName, List<VocabWord> words, CancellationToken ct = default)
    {
        await _gate.WaitAsync(ct);
        try
        {
            var data = await ReadUnsafeAsync(ct);
            var week = data.Weeks.FirstOrDefault(w => w.Id == weekId);
            if (week is null)
            {
                throw new InvalidOperationException("Week not found.");
            }

            week.Words = words
                .Where(w => !string.IsNullOrWhiteSpace(w.Sv) && !string.IsNullOrWhiteSpace(w.En))
                .Select(w => new VocabWord { Sv = w.Sv.Trim(), En = w.En.Trim() })
                .ToList();

            if (!string.IsNullOrWhiteSpace(weekName))
            {
                week.WeekName = weekName.Trim();
            }

            await WriteUnsafeAsync(data, ct);
            return data;
        }
        finally
        {
            _gate.Release();
        }
    }

    private async Task<VocabData> ReadUnsafeAsync(CancellationToken ct)
    {
        if (!File.Exists(_filePath))
        {
            return new VocabData();
        }

        await using var stream = File.OpenRead(_filePath);
        var data = await JsonSerializer.DeserializeAsync<VocabData>(stream, _jsonOptions, ct);
        return data ?? new VocabData();
    }

    private async Task WriteUnsafeAsync(VocabData data, CancellationToken ct)
    {
        var directory = Path.GetDirectoryName(_filePath);
        if (!string.IsNullOrEmpty(directory))
        {
            Directory.CreateDirectory(directory);
        }

        await using var stream = File.Create(_filePath);
        await JsonSerializer.SerializeAsync(stream, data, _jsonOptions, ct);
    }
}