using System.Text.Json.Serialization;

namespace GlosTrainer.Web.Models;

public sealed class VocabData
{
    [JsonPropertyName("users")]
    public List<VocabUser> Users { get; set; } = [];

    [JsonPropertyName("weeks")]
    public List<VocabWeek> Weeks { get; set; } = [];

    [JsonPropertyName("highscores")]
    public List<HighscoreEntry> Highscores { get; set; } = [];

    [JsonPropertyName("progressByUser")]
    public Dictionary<string, LegacyUserProgress> ProgressByUser { get; set; } = [];

    [JsonPropertyName("lastActiveUserId")]
    public string? LastActiveUserId { get; set; }

    [JsonPropertyName("lastSelectedWeekId")]
    public string? LastSelectedWeekId { get; set; }
}

public sealed class LegacyUserProgress
{
    [JsonPropertyName("userId")]
    public string UserId { get; set; } = string.Empty;

    [JsonPropertyName("lastUpdatedUtc")]
    public DateTime? LastUpdatedUtc { get; set; }

    [JsonPropertyName("weeks")]
    public Dictionary<string, LegacyWeekProgress> Weeks { get; set; } = [];
}

public sealed class LegacyWeekProgress
{
    [JsonPropertyName("weekId")]
    public string WeekId { get; set; } = string.Empty;

    [JsonPropertyName("correctKeys")]
    public List<string> CorrectKeys { get; set; } = [];
}

public sealed class VocabUser
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}

public sealed class VocabWeek
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("weekName")]
    public string WeekName { get; set; } = string.Empty;

    [JsonPropertyName("language")]
    public string Language { get; set; } = "english";

    [JsonPropertyName("words")]
    public List<VocabWord> Words { get; set; } = [];
}

public sealed class VocabWord
{
    [JsonPropertyName("sv")]
    public string Sv { get; set; } = string.Empty;

    [JsonPropertyName("en")]
    public string En { get; set; } = string.Empty;
}

public sealed class HighscoreEntry
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("weekId")]
    public string WeekId { get; set; } = string.Empty;

    [JsonPropertyName("userId")]
    public string UserId { get; set; } = string.Empty;

    [JsonPropertyName("score")]
    public int Score { get; set; }

    [JsonPropertyName("timeSeconds")]
    public double TimeSeconds { get; set; }

    [JsonPropertyName("createdUtc")]
    public DateTime CreatedUtc { get; set; }
}

public sealed class SelectionUpdateRequest
{
    public string? WeekId { get; set; }
}

public sealed class WeekWordsUpdateRequest
{
    public string? WeekName { get; set; }
    public string? Language { get; set; }
    public List<VocabWord>? Words { get; set; }
}

public sealed class CreateWeekRequest
{
    public string? WeekName { get; set; }
    public string? Language { get; set; }
    public List<VocabWord>? Words { get; set; }
}

public sealed class ProgressSaveRequest
{
    public string? WeekId { get; set; }
    public int Score { get; set; }
    public double TimeSeconds { get; set; }
    public List<string>? CorrectKeys { get; set; }
}

public sealed class AdminLinkProfileRequest
{
    public string? AppAccountId { get; set; }
    public string? UserProfileId { get; set; }
}

public sealed class AiParseRequest
{
    public string? Text { get; set; }
    public string TargetLanguage { get; set; } = "english";
}

public sealed class AiParseResult
{
    public string DetectedLanguage { get; set; } = string.Empty;
    public string SuggestedWeekName { get; set; } = string.Empty;
    public List<VocabWord> Words { get; set; } = [];
}

public sealed class CreateChallengeRequest
{
    public string? TargetProfileId { get; set; }
    public string? WeekId { get; set; }
}

public sealed class RespondChallengeRequest
{
    public bool Accept { get; set; }
}

public sealed class DuelActionRequest
{
    public string? Action { get; set; }
}

public sealed class GuestPresenceHeartbeatRequest
{
    public string? SessionId { get; set; }
    public string? DisplayName { get; set; }
}

public sealed class CreateGroupFightInviteRequest
{
    public string? WeekId { get; set; }
    public string? AnswerLanguage { get; set; }
    public List<GroupFightMemberRequest>? TeamA { get; set; }
    public List<GroupFightMemberRequest>? TeamB { get; set; }
}

public sealed class GroupFightMemberRequest
{
    public string? ActorId { get; set; }
    public string? DisplayName { get; set; }
    public bool IsBot { get; set; }
}

public sealed class RespondGroupFightInviteRequest
{
    public bool Accept { get; set; }
}

public sealed class GroupFightBroadcastRequest
{
    public string? Team { get; set; }
    public bool IsGood { get; set; }
    public string? Text { get; set; }
}
