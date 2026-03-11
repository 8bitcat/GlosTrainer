# Platform Architecture - GlosTrainer.Web

## Tech Stack
- **Runtime:** .NET 8.0 (ASP.NET Core)
- **Frontend:** Vanilla JavaScript ES6+ (no framework)
- **Database:** SQL Server via EF Core 8.0.12
- **Hosting:** runasp.net (HTTP only, InProcess hosting, x86)
- **External APIs:** OpenAI GPT-4.1-mini (vocabulary parsing)

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│  Browser (SPA)                                  │
│  ┌───────────────────────────────────────────┐  │
│  │ site.js (~5800 lines)                     │  │
│  │ - state + appState objects                │  │
│  │ - Boss Fight Engine (Canvas 2D)           │  │
│  │ - Duel + Group Fight polling              │  │
│  │ - localStorage persistence                │  │
│  └───────────────────┬───────────────────────┘  │
│                      │ Fetch API + Cookies       │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│  ASP.NET Core 8.0    │                          │
│  ┌───────────────────┴───────────────────────┐  │
│  │ Program.cs (~1580 lines)                  │  │
│  │ - 30+ Minimal API endpoints               │  │
│  │ - Cookie Authentication middleware        │  │
│  │ - Guest session resolution                │  │
│  └───────────────────┬───────────────────────┘  │
│                      │                          │
│  ┌───────────────────┴───────────────────────┐  │
│  │ Services Layer                            │  │
│  │ - LocalAuthService (PBKDF2-SHA256)        │  │
│  │ - AuthAccountService (claims helper)      │  │
│  │ - OpenAiVocabParser (AI + fallback)       │  │
│  │ - VocabDatabaseInitializer (schema+seed)  │  │
│  │ - VocabDataStore (legacy JSON)            │  │
│  └───────────────────┬───────────────────────┘  │
│                      │                          │
│  ┌───────────────────┴───────────────────────┐  │
│  │ Data Layer (EF Core)                      │  │
│  │ - AppDbContext (13 DbSets)                │  │
│  │ - No migrations (raw SQL evolution)       │  │
│  └───────────────────┬───────────────────────┘  │
└──────────────────────┼──────────────────────────┘
                       │
              ┌────────┴────────┐
              │  SQL Server     │
              │  (runasp.net)   │
              └─────────────────┘
```

## Key Files & Responsibilities

| File | Lines | Role |
|------|-------|------|
| `Program.cs` | ~1580 | All API endpoints, DI, middleware |
| `wwwroot/js/site.js` | ~5800 | Entire frontend SPA |
| `wwwroot/css/site.css` | ~1200 | All styling |
| `Pages/Index.cshtml` | ~600 | SPA shell HTML |
| `Data/AppDbContext.cs` | ~100 | EF Core config |
| `Models/AppEntities.cs` | ~300 | Domain entities |
| `Models/VocabModels.cs` | ~150 | DTOs |
| `Services/VocabDatabaseInitializer.cs` | ~400 | Schema creation & seeding |

## Authentication Flow

```
Guest Path:
  Browser → localStorage UUID → X-Guest-Session header → Backend auto-creates UserProfile

Authenticated Path:
  Browser → /auth/login form → Cookie set → Auto-included on requests

Admin Path:
  Cookie auth + Security:AdminUsernames config check → Admin role claim
```

## Multiplayer Architecture (Polling-based)

```
No WebSocket/SignalR - everything is HTTP polling:

Duels:
  Player A: POST /api/challenges (create)
  Player B: GET /api/challenges/inbox (poll) → POST respond (accept)
  Both: GET /api/duel/current (poll every 2-3s) + POST /api/duel/{id}/action

Group Fights:
  Creator: POST /api/groupfight/invites
  Members: GET /api/groupfight/inbox → POST respond
  All: GET /api/groupfight/events?sinceId= (poll for battle updates)
```

## Database Schema (Key Tables)

- `UserProfiles` - Central user entity
- `LocalAuthUsers` - Username/password credentials
- `WeekRecords` - Vocabulary week containers
- `WordRecords` - Individual vocabulary words (FK → WeekRecord)
- `ProgressRecords` - Per-user per-week progress (correct keys JSON)
- `HighscoreRecords` - Top scores per week
- `DuelChallenges` / `DuelMatches` - 1v1 battles
- `GroupFightInvites` / `GroupFightInviteMembers` / `GroupFightEvents` - Team battles
- `OnlinePresences` / `SitePresences` - User presence tracking
- `NameDictionaryEntries` - Random name generation (animals + colors)
