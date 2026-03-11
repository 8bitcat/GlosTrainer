# API Endpoint Reference

## Authentication
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | None | Register local user |
| POST | `/auth/login` | None | Login with username/password |
| POST | `/auth/teacher-login` | None | Quick login with teacher code |
| GET | `/auth/logout` | Any | Sign out |
| GET | `/api/auth/status` | Any | Current auth status (guest or authenticated) |

## Vocabulary
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/vocab/data` | None | Fetch all weeks with words |
| POST | `/api/vocab/selection` | Any | Save selected week + user state |
| POST | `/api/vocab/progress` | Any | Save training progress |
| POST | `/api/vocab/weeks` | Admin | Create new week |
| POST | `/api/vocab/weeks/{weekId}/words` | Admin | Update week words/name |
| DELETE | `/api/vocab/weeks/{weekId}` | Admin | Delete week |
| GET | `/api/vocab/highscores` | None | Top scores per week |
| GET | `/api/vocab/leaderboard-correct` | None | Ranking by correct answers |
| GET | `/api/vocab/week-stats` | None | Stats aggregated by week |

## Player/Profile
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/profile/avatar` | Any | Save player avatar URL |
| GET | `/api/players` | None | List available avatars from filesystem |
| GET | `/api/names/random` | None | Random player name (animal+color) |
| GET | `/api/admin/accounts` | Admin | List all auth accounts |

## Presence
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/presence/heartbeat` | Auth | Authenticated user heartbeat |
| POST | `/api/presence/guest-heartbeat` | Guest | Guest session heartbeat |
| GET | `/api/presence/public` | None | Public online users list |
| GET | `/api/presence/online` | Any | Online users visible to current user |

## Duels
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/challenges` | Any | Create duel challenge |
| GET | `/api/challenges/inbox` | Any | Pending challenges for user |
| POST | `/api/challenges/{id}/respond` | Any | Accept/reject challenge |
| GET | `/api/duel/current` | Any | Current active duel state |
| POST | `/api/duel/{matchId}/action` | Any | Submit duel answer |

## Group Fights
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/groupfight/invites` | Any | Create group fight invite |
| GET | `/api/groupfight/inbox` | Any | Pending group invites |
| POST | `/api/groupfight/invites/{id}/respond` | Any | Accept/reject group invite |
| GET | `/api/groupfight/current` | Any | Current active group battle |
| POST | `/api/groupfight/invites/{id}/broadcast` | Any | Broadcast battle action |
| GET | `/api/groupfight/invites/{id}/events` | Any | Event log (polling) |

## AI & Import
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/vocab/ai-parse` | Admin | Parse text with OpenAI |
| POST | `/api/vocab/ai-parse-upload` | Admin | Parse with file upload |

## Utility
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | None | Health check |
| GET | `/api/admin/link-profile` | Admin | Link app account to profile |
