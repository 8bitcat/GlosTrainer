namespace GlosTrainer.Web.Models;

public sealed class AppAccount
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Provider { get; set; } = "Microsoft";
    public string ProviderSubject { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public bool IsAdmin { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime LastLoginUtc { get; set; } = DateTime.UtcNow;
    public string? UserProfileId { get; set; }
    public UserProfile? UserProfile { get; set; }
}

public sealed class LocalAuthUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Username { get; set; } = string.Empty;
    public string NormalizedUsername { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string PasswordSalt { get; set; } = string.Empty;
    public bool IsAdmin { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime LastLoginUtc { get; set; } = DateTime.UtcNow;
    public string UserProfileId { get; set; } = string.Empty;
    public UserProfile? UserProfile { get; set; }
}

public sealed class UserProfile
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;

    public AppAccount? AppAccount { get; set; }
    public LocalAuthUser? LocalAuthUser { get; set; }
    public List<HighscoreRecord> Highscores { get; set; } = [];
    public List<ProgressRecord> ProgressRecords { get; set; } = [];
    public UserPreference? Preference { get; set; }
    public List<OnlinePresence> PresenceEntries { get; set; } = [];
}

public sealed class WeekRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string WeekName { get; set; } = string.Empty;
    public string Language { get; set; } = "english";
    public List<WordRecord> Words { get; set; } = [];
}

public sealed class WordRecord
{
    public int Id { get; set; }
    public string WeekId { get; set; } = string.Empty;
    public WeekRecord? Week { get; set; }
    public string Sv { get; set; } = string.Empty;
    public string En { get; set; } = string.Empty;
}

public sealed class HighscoreRecord
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string WeekId { get; set; } = string.Empty;
    public WeekRecord? Week { get; set; }
    public string UserProfileId { get; set; } = string.Empty;
    public UserProfile? UserProfile { get; set; }
    public int Score { get; set; }
    public double TimeSeconds { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}

public sealed class ProgressRecord
{
    public int Id { get; set; }
    public string WeekId { get; set; } = string.Empty;
    public WeekRecord? Week { get; set; }
    public string UserProfileId { get; set; } = string.Empty;
    public UserProfile? UserProfile { get; set; }
    public string CorrectKeysJson { get; set; } = "[]";
    public DateTime LastUpdatedUtc { get; set; } = DateTime.UtcNow;
}

public sealed class UserPreference
{
    public string UserProfileId { get; set; } = string.Empty;
    public UserProfile? UserProfile { get; set; }
    public string? LastSelectedWeekId { get; set; }
}

public sealed class NameDictionaryEntry
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public sealed class OnlinePresence
{
    public string UserProfileId { get; set; } = string.Empty;
    public UserProfile? UserProfile { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public DateTime LastSeenUtc { get; set; } = DateTime.UtcNow;
}

public sealed class SitePresence
{
    public string SessionId { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public bool IsAuthenticated { get; set; }
    public string? UserProfileId { get; set; }
    public DateTime LastSeenUtc { get; set; } = DateTime.UtcNow;
}

public sealed class DuelChallenge
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string ChallengerProfileId { get; set; } = string.Empty;
    public string TargetProfileId { get; set; } = string.Empty;
    public string WeekId { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? RespondedUtc { get; set; }
    public string? MatchId { get; set; }
}

public sealed class DuelMatch
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string WeekId { get; set; } = string.Empty;
    public string ChallengerProfileId { get; set; } = string.Empty;
    public string OpponentProfileId { get; set; } = string.Empty;
    public int TotalWords { get; set; }
    public double ChallengerHp { get; set; } = 100;
    public double OpponentHp { get; set; } = 100;
    public int ChallengerCorrect { get; set; }
    public int OpponentCorrect { get; set; }
    public int ChallengerDamageMultiplier { get; set; } = 1;
    public int OpponentDamageMultiplier { get; set; } = 1;
    public string Status { get; set; } = "Active";
    public string? WinnerProfileId { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedUtc { get; set; }
}

public sealed class GroupFightInvite
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string CreatorActorId { get; set; } = string.Empty;
    public string WeekId { get; set; } = string.Empty;
    public string AnswerLanguage { get; set; } = "english";
    public string Status { get; set; } = "Pending";
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? PrepEndsUtc { get; set; }
    public DateTime? CompletedUtc { get; set; }
    public List<GroupFightInviteMember> Members { get; set; } = [];
}

public sealed class GroupFightInviteMember
{
    public int Id { get; set; }
    public string InviteId { get; set; } = string.Empty;
    public GroupFightInvite? Invite { get; set; }
    public string ActorId { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Team { get; set; } = "A";
    public bool IsCreator { get; set; }
    public bool IsBot { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime? RespondedUtc { get; set; }
}

public sealed class GroupFightEvent
{
    public long Id { get; set; }
    public string InviteId { get; set; } = string.Empty;
    public GroupFightInvite? Invite { get; set; }
    public string ActorId { get; set; } = string.Empty;
    public string Team { get; set; } = "A";
    public bool IsGood { get; set; }
    public string Text { get; set; } = string.Empty;
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}
