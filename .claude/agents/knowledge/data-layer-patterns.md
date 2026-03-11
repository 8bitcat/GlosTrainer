# Data Layer Patterns - GlosTrainer.Web

## EF Core Setup
- Provider: `Microsoft.EntityFrameworkCore.SqlServer` v8.0.12
- DbContext: `AppDbContext` in `Data/AppDbContext.cs`
- 13 DbSets covering users, vocab, multiplayer, and presence

## Schema Management (No Migrations)

Schema is created and evolved entirely in `VocabDatabaseInitializer`:

```csharp
// 1. Initial creation
await db.Database.EnsureCreatedAsync(ct);

// 2. Table additions via raw SQL
await db.Database.ExecuteSqlRawAsync(@"
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TableName')
    CREATE TABLE TableName (...)
", ct);

// 3. Column additions (schema evolution)
await db.Database.ExecuteSqlRawAsync(@"
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE ...)
    ALTER TABLE ... ADD ColumnName ...
", ct);
```

**Why no migrations:** Hosted on shared runasp.net without migration tooling access. Raw SQL gives full control.

## Entity Relationships

### UserProfile (Central Entity)
```
UserProfile (1) ──── (0..1) LocalAuthUser
UserProfile (1) ──── (0..1) AppAccount
UserProfile (1) ──── (0..1) UserPreference
UserProfile (1) ──── (0..1) OnlinePresence
UserProfile (1) ──── (*) HighscoreRecord
UserProfile (1) ──── (*) ProgressRecord
```

### Vocabulary
```
WeekRecord (1) ──── (*) WordRecord [cascade delete]
WeekRecord (1) ──── (*) ProgressRecord
WeekRecord (1) ──── (*) HighscoreRecord
```

### Multiplayer
```
DuelChallenge → references ChallengerProfileId + TargetProfileId
DuelMatch → references Player1Id + Player2Id + WeekId

GroupFightInvite (1) ──── (*) GroupFightInviteMember [cascade delete]
GroupFightInvite (1) ──── (*) GroupFightEvent [cascade delete]
```

## Key Indexes
- `ProgressRecord`: Unique on `(UserProfileId, WeekId)`
- `DuelChallenge`: Index on `(TargetProfileId, Status, CreatedUtc)`
- `DuelMatch`: Index on `(Status, CreatedUtc)`
- `GroupFightInvite`: Index on `(Status, CreatedUtc)`
- `GroupFightInviteMember`: Unique on `(InviteId, ActorId)`

## Common Query Patterns

### Fetching with includes
```csharp
var weeks = await db.WeekRecords
    .Include(w => w.Words)
    .OrderBy(w => w.SortOrder)
    .ToListAsync(ct);
```

### Upsert pattern (progress)
```csharp
var existing = await db.ProgressRecords
    .FirstOrDefaultAsync(p => p.UserProfileId == id && p.WeekId == weekId, ct);
if (existing == null) {
    db.ProgressRecords.Add(new ProgressRecord { ... });
} else {
    existing.Score = newScore;
    // update fields
}
await db.SaveChangesAsync(ct);
```

### Guest user resolution
```csharp
// Resolve from X-Guest-Session header → SitePresence → UserProfile
var presence = await db.SitePresences
    .FirstOrDefaultAsync(p => p.SessionId == sessionId, ct);
var profile = presence != null
    ? await db.UserProfiles.FindAsync(presence.UserProfileId)
    : null;
```

## Seeding
- `SeedNameDictionaryAsync()` - Populates animals/colors for random names
- `EnsureRequiredWeekDataAsync()` - Creates fallback week if DB empty
- Legacy: `vocab_data.json` can be loaded via `ClearSeedWeeksIfConfiguredAsync()`
