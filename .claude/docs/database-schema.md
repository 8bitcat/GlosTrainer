# Database Schema Documentation

## Tables Overview

### User & Auth
| Table | PK | Description |
|-------|-----|-------------|
| `UserProfiles` | Id (string) | Central user entity |
| `LocalAuthUsers` | Id (string) | Username/password credentials |
| `AppAccounts` | Id (string) | OAuth accounts (future use) |
| `UserPreferences` | Id (string) | User settings |

### Vocabulary
| Table | PK | Description |
|-------|-----|-------------|
| `WeekRecords` | Id (int) | Vocabulary week container |
| `WordRecords` | Id (int) | Individual vocab word (FK → Week) |
| `ProgressRecords` | Id (string) | Per-user per-week progress |
| `HighscoreRecords` | Id (string) | Top scores per week |

### Multiplayer
| Table | PK | Description |
|-------|-----|-------------|
| `DuelChallenges` | Id (string) | 1v1 challenge invitation |
| `DuelMatches` | Id (string) | Active/completed 1v1 match |
| `GroupFightInvites` | Id (string) | Team battle lobby |
| `GroupFightInviteMembers` | Id (string) | Team membership |
| `GroupFightEvents` | Id (long) | Battle event log |

### Presence
| Table | PK | Description |
|-------|-----|-------------|
| `OnlinePresences` | UserProfileId (string) | Auth user last-seen |
| `SitePresences` | SessionId (string) | Guest session tracking |

### Utility
| Table | PK | Description |
|-------|-----|-------------|
| `NameDictionaryEntries` | Id (int) | Animals/colors for random names |

## Key Relationships
```
UserProfile 1──0..1 LocalAuthUser
UserProfile 1──0..1 AppAccount
UserProfile 1──0..1 UserPreference
UserProfile 1──0..1 OnlinePresence
UserProfile 1──* HighscoreRecord
UserProfile 1──* ProgressRecord

WeekRecord 1──* WordRecord (cascade delete)
WeekRecord 1──* ProgressRecord
WeekRecord 1──* HighscoreRecord

GroupFightInvite 1──* GroupFightInviteMember (cascade delete)
GroupFightInvite 1──* GroupFightEvent (cascade delete)
```

## Schema Evolution
All schema changes happen in `Services/VocabDatabaseInitializer.cs` using idempotent raw SQL:
```sql
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TableName')
CREATE TABLE TableName (...)

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('Table') AND name = 'Column')
ALTER TABLE Table ADD Column ...
```
