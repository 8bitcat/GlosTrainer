using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using GlosTrainer.Web.Data;
using GlosTrainer.Web.Models;
using Microsoft.EntityFrameworkCore;
using WebPush;

namespace GlosTrainer.Web.Services;

public sealed class PushNotificationService
{
    private readonly AppDbContext _db;
    private readonly ILogger<PushNotificationService> _logger;

    public PushNotificationService(AppDbContext db, ILogger<PushNotificationService> logger)
    {
        _db = db;
        _logger = logger;
    }

    public static string HashEndpoint(string endpoint)
        => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(endpoint.Trim())));

    public static DateTime SwedishNow()
    {
        try
        {
            var tz = TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tz);
        }
        catch
        {
            return DateTime.UtcNow.AddHours(1);
        }
    }

    public async Task<PushConfigRecord> GetOrCreateConfigAsync(CancellationToken ct)
    {
        var config = await _db.PushConfigs.FirstOrDefaultAsync(x => x.Id == 1, ct);
        if (config is null)
        {
            var keys = VapidHelper.GenerateVapidKeys();
            config = new PushConfigRecord
            {
                Id = 1,
                VapidPublicKey = keys.PublicKey,
                VapidPrivateKey = keys.PrivateKey,
                CronKey = Guid.NewGuid().ToString("N")
            };
            _db.PushConfigs.Add(config);
            await _db.SaveChangesAsync(ct);
        }
        else if (string.IsNullOrWhiteSpace(config.VapidPublicKey) || string.IsNullOrWhiteSpace(config.VapidPrivateKey))
        {
            var keys = VapidHelper.GenerateVapidKeys();
            config.VapidPublicKey = keys.PublicKey;
            config.VapidPrivateKey = keys.PrivateKey;
            if (string.IsNullOrWhiteSpace(config.CronKey))
            {
                config.CronKey = Guid.NewGuid().ToString("N");
            }
            await _db.SaveChangesAsync(ct);
        }

        return config;
    }

    public async Task<int> SendToAllAsync(string title, string body, string? url, string? tag, CancellationToken ct)
    {
        var subs = await _db.PushSubscriptions.ToListAsync(ct);
        return await SendBatchAsync(subs.Select(s => (s, title, body)).ToList(), url, tag, ct);
    }

    public async Task<int> SendToProfileAsync(string profileId, string title, string body, string? url, string? tag, CancellationToken ct)
    {
        var subs = await _db.PushSubscriptions.Where(x => x.UserProfileId == profileId).ToListAsync(ct);
        return await SendBatchAsync(subs.Select(s => (s, title, body)).ToList(), url, tag, ct);
    }

    public async Task<int> SendToSubscriptionAsync(PushSubscriptionRecord sub, string title, string body, string? url, string? tag, CancellationToken ct)
        => await SendBatchAsync([(sub, title, body)], url, tag, ct);

    private async Task<int> SendBatchAsync(List<(PushSubscriptionRecord Sub, string Title, string Body)> targets, string? url, string? tag, CancellationToken ct)
    {
        if (targets.Count == 0)
        {
            return 0;
        }

        var config = await GetOrCreateConfigAsync(ct);
        var vapid = new VapidDetails(config.VapidSubject, config.VapidPublicKey, config.VapidPrivateKey);
        var client = new WebPushClient();
        var sent = 0;

        foreach (var (sub, title, body) in targets)
        {
            var payload = JsonSerializer.Serialize(new { title, body, url = url ?? "/", tag });
            try
            {
                var pushSub = new PushSubscription(sub.Endpoint, sub.P256dh, sub.Auth);
                await client.SendNotificationAsync(pushSub, payload, vapid);
                sub.FailCount = 0;
                sent++;
            }
            catch (WebPushException ex) when (ex.StatusCode is HttpStatusCode.NotFound or HttpStatusCode.Gone)
            {
                // Subscription är död (avinstallerad PWA / återkallad) — rensa bort den.
                _db.PushSubscriptions.Remove(sub);
                _logger.LogInformation("Push-prenumeration borttagen (död endpoint) för {Name}", sub.DisplayName);
            }
            catch (Exception ex)
            {
                sub.FailCount++;
                if (sub.FailCount >= 8)
                {
                    _db.PushSubscriptions.Remove(sub);
                }
                _logger.LogWarning(ex, "Push misslyckades för {Name} (fail #{Count})", sub.DisplayName, sub.FailCount);
            }
        }

        await _db.SaveChangesAsync(ct);
        return sent;
    }

    public async Task<object> RunReminderCheckAsync(bool force, CancellationToken ct)
    {
        var config = await GetOrCreateConfigAsync(ct);
        var now = SwedishNow();

        if (!force)
        {
            if (!config.ReminderEnabled)
            {
                return new { ran = false, reason = "Påminnelser är avstängda." };
            }
            if (now.Hour < config.ReminderHour)
            {
                return new { ran = false, reason = $"Klockan är före {config.ReminderHour}:00 svensk tid." };
            }
            if (config.LastReminderSentUtc.HasValue)
            {
                var lastLocal = TimeZoneInfo.ConvertTimeFromUtc(config.LastReminderSentUtc.Value, GetSwedishTz());
                if (lastLocal.Date == now.Date)
                {
                    return new { ran = false, reason = "Påminnelse är redan skickad idag." };
                }
            }
        }

        WeekRecord? week = null;
        if (!string.IsNullOrWhiteSpace(config.ReminderWeekId))
        {
            week = await _db.Weeks.AsNoTracking().Include(w => w.Words).FirstOrDefaultAsync(x => x.Id == config.ReminderWeekId, ct);
        }
        week ??= await _db.Weeks.AsNoTracking().Include(w => w.Words)
            .OrderByDescending(x => x.CreatedUtc)
            .FirstOrDefaultAsync(x => x.Words.Count > 0, ct);

        if (week is null || week.Words.Count == 0)
        {
            return new { ran = false, reason = "Ingen läxa med glosor att påminna om." };
        }

        var subs = await _db.PushSubscriptions.Where(x => x.UserProfileId != null).ToListAsync(ct);
        var targets = new List<(PushSubscriptionRecord Sub, string Title, string Body)>();
        var details = new List<object>();

        foreach (var group in subs.GroupBy(x => x.UserProfileId!))
        {
            var progress = await _db.ProgressRecords.AsNoTracking()
                .FirstOrDefaultAsync(x => x.UserProfileId == group.Key && x.WeekId == week.Id, ct);

            var perfects = progress?.PerfectCount ?? 0;
            var correct = 0;
            try
            {
                correct = JsonSerializer.Deserialize<List<string>>(progress?.CorrectKeysJson ?? "[]")?.Count ?? 0;
            }
            catch
            {
                // Trasig JSON i progress — räkna som 0.
            }

            var pct = Math.Min(100, (int)Math.Round(100.0 * correct / week.Words.Count));
            var name = group.First().DisplayName;
            var done = perfects >= config.ReminderRequiredPerfects;

            if (!done)
            {
                var body = $"Du har gjort {perfects} av {config.ReminderRequiredPerfects} gånger på \"{week.WeekName}\" — se till att göra klart!";
                foreach (var sub in group)
                {
                    targets.Add((sub, "He-Man ser dig! 👁️", body));
                }
            }

            details.Add(new { name, pct, perfects, paminde = !done });
        }

        var sent = await SendBatchAsync(targets, "/", "glos-reminder", ct);

        config.LastReminderSentUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync(ct);

        return new { ran = true, week = week.WeekName, sent, details };
    }

    private static TimeZoneInfo GetSwedishTz()
    {
        try
        {
            return TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time");
        }
        catch
        {
            return TimeZoneInfo.Utc;
        }
    }
}
