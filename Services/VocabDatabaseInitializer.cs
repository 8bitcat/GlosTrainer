using System.Text.Json;
using GlosTrainer.Web.Data;
using GlosTrainer.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace GlosTrainer.Web.Services;

public sealed class VocabDatabaseInitializer
{
    private readonly AppDbContext _db;
    private readonly IWebHostEnvironment _env;
    private readonly IConfiguration _configuration;

    public VocabDatabaseInitializer(AppDbContext db, IWebHostEnvironment env, IConfiguration configuration)
    {
        _db = db;
        _env = env;
        _configuration = configuration;
    }

    public async Task InitializeAsync(CancellationToken ct = default)
    {
        await _db.Database.EnsureCreatedAsync(ct);
        await EnsureLocalAuthSchemaAsync(ct);
        await EnsureRealtimeSchemaAsync(ct);
        await SeedNameDictionaryAsync(ct);
        await ClearSeedWeeksIfConfiguredAsync(ct);

        var seedFromJson = _configuration.GetValue<bool>("Vocab:SeedFromJson");
        if (seedFromJson && !await _db.Weeks.AnyAsync(ct))
        {
            var filePath = Path.Combine(_env.ContentRootPath, "Glosdatabas", "vocab_data.json");
            if (File.Exists(filePath))
            {
                await using var stream = File.OpenRead(filePath);
                var source = await JsonSerializer.DeserializeAsync<VocabData>(stream, cancellationToken: ct);
                if (source is not null)
                {
                    foreach (var user in source.Users)
                    {
                        _db.UserProfiles.Add(new UserProfile
                        {
                            Id = user.Id,
                            Name = user.Name,
                            CreatedUtc = DateTime.UtcNow
                        });
                    }

                    foreach (var week in source.Weeks)
                    {
                        _db.Weeks.Add(new WeekRecord
                        {
                            Id = week.Id,
                            WeekName = week.WeekName,
                            Language = string.IsNullOrWhiteSpace(week.Language) ? "english" : week.Language.Trim().ToLowerInvariant(),
                            Words = week.Words.Select(word => new WordRecord { Sv = word.Sv, En = word.En }).ToList()
                        });
                    }

                    foreach (var highscore in source.Highscores)
                    {
                        _db.Highscores.Add(new HighscoreRecord
                        {
                            Id = highscore.Id,
                            WeekId = highscore.WeekId,
                            UserProfileId = highscore.UserId,
                            Score = highscore.Score,
                            TimeSeconds = highscore.TimeSeconds,
                            CreatedUtc = highscore.CreatedUtc
                        });
                    }

                    foreach (var progressByUser in source.ProgressByUser.Values)
                    {
                        foreach (var weekProgress in progressByUser.Weeks.Values)
                        {
                            _db.ProgressRecords.Add(new ProgressRecord
                            {
                                UserProfileId = progressByUser.UserId,
                                WeekId = weekProgress.WeekId,
                                CorrectKeysJson = JsonSerializer.Serialize(weekProgress.CorrectKeys),
                                LastUpdatedUtc = progressByUser.LastUpdatedUtc ?? DateTime.UtcNow
                            });
                        }
                    }

                    if (!string.IsNullOrWhiteSpace(source.LastActiveUserId))
                    {
                        _db.UserPreferences.Add(new UserPreference
                        {
                            UserProfileId = source.LastActiveUserId,
                            LastSelectedWeekId = source.LastSelectedWeekId
                        });
                    }

                    await _db.SaveChangesAsync(ct);
                }
            }
        }

        await EnsureRequiredWeekDataAsync(ct);
    }

    private async Task EnsureLocalAuthSchemaAsync(CancellationToken ct)
    {
        const string sql = @"
IF OBJECT_ID(N'[dbo].[LocalAuthUsers]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[LocalAuthUsers](
        [Id] NVARCHAR(450) NOT NULL PRIMARY KEY,
        [Username] NVARCHAR(100) NOT NULL,
        [NormalizedUsername] NVARCHAR(100) NOT NULL,
        [PasswordHash] NVARCHAR(200) NOT NULL,
        [PasswordSalt] NVARCHAR(200) NOT NULL,
        [IsAdmin] BIT NOT NULL DEFAULT 0,
        [CreatedUtc] DATETIME2 NOT NULL,
        [LastLoginUtc] DATETIME2 NOT NULL,
        [UserProfileId] NVARCHAR(450) NOT NULL,
        CONSTRAINT [FK_LocalAuthUsers_UserProfiles_UserProfileId]
            FOREIGN KEY([UserProfileId]) REFERENCES [dbo].[UserProfiles]([Id]) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX [IX_LocalAuthUsers_NormalizedUsername] ON [dbo].[LocalAuthUsers]([NormalizedUsername]);
    CREATE UNIQUE INDEX [IX_LocalAuthUsers_UserProfileId] ON [dbo].[LocalAuthUsers]([UserProfileId]);
END
";

        await _db.Database.ExecuteSqlRawAsync(sql, ct);
    }

    private async Task EnsureRealtimeSchemaAsync(CancellationToken ct)
    {
        const string sql = @"
IF OBJECT_ID(N'[dbo].[NameDictionaryEntries]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[NameDictionaryEntries](
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Category] NVARCHAR(40) NOT NULL,
        [Value] NVARCHAR(80) NOT NULL
    );
    CREATE UNIQUE INDEX [IX_NameDictionaryEntries_Category_Value] ON [dbo].[NameDictionaryEntries]([Category],[Value]);
END

IF OBJECT_ID(N'[dbo].[OnlinePresences]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[OnlinePresences](
        [UserProfileId] NVARCHAR(450) NOT NULL PRIMARY KEY,
        [DisplayName] NVARCHAR(200) NOT NULL,
        [LastSeenUtc] DATETIME2 NOT NULL,
        CONSTRAINT [FK_OnlinePresences_UserProfiles_UserProfileId]
            FOREIGN KEY([UserProfileId]) REFERENCES [dbo].[UserProfiles]([Id]) ON DELETE CASCADE
    );
END

IF OBJECT_ID(N'[dbo].[DuelChallenges]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[DuelChallenges](
        [Id] NVARCHAR(450) NOT NULL PRIMARY KEY,
        [ChallengerProfileId] NVARCHAR(450) NOT NULL,
        [TargetProfileId] NVARCHAR(450) NOT NULL,
        [WeekId] NVARCHAR(450) NOT NULL,
        [Status] NVARCHAR(20) NOT NULL,
        [CreatedUtc] DATETIME2 NOT NULL,
        [RespondedUtc] DATETIME2 NULL,
        [MatchId] NVARCHAR(450) NULL
    );
    CREATE INDEX [IX_DuelChallenges_TargetProfileId_Status_CreatedUtc] ON [dbo].[DuelChallenges]([TargetProfileId],[Status],[CreatedUtc]);
END

IF OBJECT_ID(N'[dbo].[DuelMatches]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[DuelMatches](
        [Id] NVARCHAR(450) NOT NULL PRIMARY KEY,
        [WeekId] NVARCHAR(450) NOT NULL,
        [ChallengerProfileId] NVARCHAR(450) NOT NULL,
        [OpponentProfileId] NVARCHAR(450) NOT NULL,
        [TotalWords] INT NOT NULL,
        [ChallengerHp] FLOAT NOT NULL,
        [OpponentHp] FLOAT NOT NULL,
        [ChallengerCorrect] INT NOT NULL,
        [OpponentCorrect] INT NOT NULL,
        [ChallengerDamageMultiplier] INT NOT NULL,
        [OpponentDamageMultiplier] INT NOT NULL,
        [Status] NVARCHAR(20) NOT NULL,
        [WinnerProfileId] NVARCHAR(450) NULL,
        [CreatedUtc] DATETIME2 NOT NULL,
        [CompletedUtc] DATETIME2 NULL
    );
    CREATE INDEX [IX_DuelMatches_Status_CreatedUtc] ON [dbo].[DuelMatches]([Status],[CreatedUtc]);
END

IF COL_LENGTH(N'[dbo].[Weeks]', N'Language') IS NULL
BEGIN
    ALTER TABLE [dbo].[Weeks] ADD [Language] NVARCHAR(40) NOT NULL CONSTRAINT [DF_Weeks_Language] DEFAULT N'english';
END

IF OBJECT_ID(N'[dbo].[SitePresences]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[SitePresences](
        [SessionId] NVARCHAR(120) NOT NULL PRIMARY KEY,
        [DisplayName] NVARCHAR(200) NOT NULL,
        [IsAuthenticated] BIT NOT NULL,
        [UserProfileId] NVARCHAR(450) NULL,
        [LastSeenUtc] DATETIME2 NOT NULL
    );
    CREATE INDEX [IX_SitePresences_LastSeenUtc] ON [dbo].[SitePresences]([LastSeenUtc]);
END

IF OBJECT_ID(N'[dbo].[GroupFightInvites]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[GroupFightInvites](
        [Id] NVARCHAR(450) NOT NULL PRIMARY KEY,
        [CreatorActorId] NVARCHAR(450) NOT NULL,
        [WeekId] NVARCHAR(450) NOT NULL,
        [Status] NVARCHAR(20) NOT NULL,
        [CreatedUtc] DATETIME2 NOT NULL,
        [PrepEndsUtc] DATETIME2 NULL,
        [CompletedUtc] DATETIME2 NULL
    );
    CREATE INDEX [IX_GroupFightInvites_Status_CreatedUtc] ON [dbo].[GroupFightInvites]([Status],[CreatedUtc]);
END

IF COL_LENGTH(N'[dbo].[GroupFightInvites]', N'AnswerLanguage') IS NULL
BEGIN
    ALTER TABLE [dbo].[GroupFightInvites] ADD [AnswerLanguage] NVARCHAR(40) NOT NULL CONSTRAINT [DF_GroupFightInvites_AnswerLanguage] DEFAULT N'english';
END

IF OBJECT_ID(N'[dbo].[GroupFightInviteMembers]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[GroupFightInviteMembers](
        [Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [InviteId] NVARCHAR(450) NOT NULL,
        [ActorId] NVARCHAR(450) NOT NULL,
        [DisplayName] NVARCHAR(200) NOT NULL,
        [Team] NVARCHAR(2) NOT NULL,
        [IsCreator] BIT NOT NULL,
        [IsBot] BIT NOT NULL,
        [Status] NVARCHAR(20) NOT NULL,
        [RespondedUtc] DATETIME2 NULL,
        CONSTRAINT [FK_GroupFightInviteMembers_GroupFightInvites_InviteId]
            FOREIGN KEY([InviteId]) REFERENCES [dbo].[GroupFightInvites]([Id]) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX [IX_GroupFightInviteMembers_InviteId_ActorId] ON [dbo].[GroupFightInviteMembers]([InviteId],[ActorId]);
    CREATE INDEX [IX_GroupFightInviteMembers_ActorId_Status] ON [dbo].[GroupFightInviteMembers]([ActorId],[Status]);
END

IF COL_LENGTH(N'[dbo].[ProgressRecords]', N'PerfectCount') IS NULL
BEGIN
    ALTER TABLE [dbo].[ProgressRecords] ADD [PerfectCount] INT NOT NULL CONSTRAINT [DF_ProgressRecords_PerfectCount] DEFAULT 0;
END

IF COL_LENGTH(N'[dbo].[UserProfiles]', N'AvatarUrl') IS NULL
BEGIN
    ALTER TABLE [dbo].[UserProfiles] ADD [AvatarUrl] NVARCHAR(500) NOT NULL CONSTRAINT [DF_UserProfiles_AvatarUrl] DEFAULT '';
END

IF OBJECT_ID(N'[dbo].[GroupFightEvents]', N'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[GroupFightEvents](
        [Id] BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [InviteId] NVARCHAR(450) NOT NULL,
        [ActorId] NVARCHAR(450) NOT NULL,
        [Team] NVARCHAR(2) NOT NULL,
        [IsGood] BIT NOT NULL,
        [Text] NVARCHAR(300) NOT NULL,
        [CreatedUtc] DATETIME2 NOT NULL,
        CONSTRAINT [FK_GroupFightEvents_GroupFightInvites_InviteId]
            FOREIGN KEY([InviteId]) REFERENCES [dbo].[GroupFightInvites]([Id]) ON DELETE CASCADE
    );
    CREATE INDEX [IX_GroupFightEvents_InviteId_Id] ON [dbo].[GroupFightEvents]([InviteId],[Id]);
END
";

        await _db.Database.ExecuteSqlRawAsync(sql, ct);
    }

    private async Task SeedNameDictionaryAsync(CancellationToken ct)
    {
        if (await _db.NameDictionaryEntries.AnyAsync(ct))
        {
            return;
        }

        var animals = new[]
        {
            "hund","katt","bjorn","varg","raven","uggla","hare","ekorre","radjur","alg",
            "rav","tiger","lejon","panter","val","haj","delfin","orn","falk","skoldpadda"
        };
        var colors = new[]
        {
            "svart","vit","rod","bla","gron","gul","lila","rosa","orange","brun",
            "gra","turkos","beige","silver","guld","morkbla","ljusbla","mintgron","vinrod","koppar"
        };

        foreach (var a in animals)
        {
            _db.NameDictionaryEntries.Add(new NameDictionaryEntry { Category = "animal", Value = a });
        }
        foreach (var c in colors)
        {
            _db.NameDictionaryEntries.Add(new NameDictionaryEntry { Category = "color", Value = c });
        }

        await _db.SaveChangesAsync(ct);
    }

    private async Task ClearSeedWeeksIfConfiguredAsync(CancellationToken ct)
    {
        var clearSeedWeeks = _configuration.GetValue<bool>("Vocab:ClearSeedWeeksOnStartup");
        if (!clearSeedWeeks)
        {
            return;
        }

        var filePath = Path.Combine(_env.ContentRootPath, "Glosdatabas", "vocab_data.json");
        if (!File.Exists(filePath))
        {
            return;
        }

        await using var stream = File.OpenRead(filePath);
        var source = await JsonSerializer.DeserializeAsync<VocabData>(stream, cancellationToken: ct);
        var seedWeekIds = source?.Weeks.Select(x => x.Id).Where(x => !string.IsNullOrWhiteSpace(x)).ToHashSet() ?? [];
        if (seedWeekIds.Count == 0)
        {
            return;
        }

        var weeksToDelete = await _db.Weeks.Where(x => seedWeekIds.Contains(x.Id)).ToListAsync(ct);
        if (weeksToDelete.Count == 0)
        {
            return;
        }

        _db.Weeks.RemoveRange(weeksToDelete);

        var preferences = await _db.UserPreferences.Where(x => x.LastSelectedWeekId != null).ToListAsync(ct);
        foreach (var pref in preferences)
        {
            if (pref.LastSelectedWeekId is not null && seedWeekIds.Contains(pref.LastSelectedWeekId))
            {
                pref.LastSelectedWeekId = null;
            }
        }

        await _db.SaveChangesAsync(ct);
    }

    private async Task EnsureRequiredWeekDataAsync(CancellationToken ct)
    {
        var spanishWeeks = await _db.Weeks
            .Where(x => x.WeekName.ToLower().Contains("spanish"))
            .ToListAsync(ct);
        if (spanishWeeks.Count > 0)
        {
            _db.Weeks.RemoveRange(spanishWeeks);
            await _db.SaveChangesAsync(ct);
        }

        const string week10Id = "week10-something-wrong";
        var weeksWithoutLanguage = await _db.Weeks.Where(x => string.IsNullOrWhiteSpace(x.Language)).ToListAsync(ct);
        foreach (var weekRow in weeksWithoutLanguage)
        {
            weekRow.Language = "english";
        }
        if (weeksWithoutLanguage.Count > 0)
        {
            await _db.SaveChangesAsync(ct);
        }

        var week10 = await _db.Weeks
            .Include(x => x.Words)
            .FirstOrDefaultAsync(x => x.Id == week10Id || x.WeekName.Contains("Vecka 10") || x.WeekName.Contains("Week 10"), ct);

        if (week10 is null)
        {
            week10 = new WeekRecord
            {
                Id = week10Id,
                WeekName = "Vecka 10 - Something's wrong",
                Language = "english",
            };
            _db.Weeks.Add(week10);
        }
        else
        {
            week10.WeekName = "Vecka 10 - Something's wrong";
            week10.Language = "english";
            week10.Words.Clear();
        }

        var words = new List<WordRecord>
        {
            new() { Sv = "orolig", En = "worried" },
            new() { Sv = "hals", En = "neck" },
            new() { Sv = "Vad står på?", En = "What’s the matter?" },
            new() { Sv = "mage", En = "stomach" },
            new() { Sv = "ögon", En = "eyes" },
            new() { Sv = "betala", En = "pay" },
            new() { Sv = "försvinna", En = "disappear" },
            new() { Sv = "ledtråd", En = "clue" },
            new() { Sv = "springa till skogen", En = "run to the woods" },
            new() { Sv = "Har du ont i huvudet?", En = "Does your head hurt?" },
            new() { Sv = "Känner du dig sjuk?", En = "Do you feel sick?" },
            new() { Sv = "Känner du dig ok?", En = "Are you all right?" },
        };

        foreach (var word in words)
        {
            week10.Words.Add(word);
        }

        await _db.SaveChangesAsync(ct);
    }
}
