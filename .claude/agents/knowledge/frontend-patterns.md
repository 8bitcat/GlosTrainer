# Frontend Patterns - GlosTrainer.Web

## Architecture
Single-file vanilla JS SPA (`wwwroot/js/site.js`, ~5800 lines) wrapped in an IIFE.

## State Management

### Two-tier state system

**`state` (game state):**
- Level, XP, coins, streak
- Boss fight: HP, round, duration
- Training queues: `trainQueue` (unseen) + `trainMissed` (retry)
- Duel: match IDs, HP, damage
- Fortress mode: timer, blocks

**`appState` (app-wide state):**
- Users, weeks, words arrays (from API)
- Auth info: `{ isAuthenticated, isAdmin, displayName, linkedProfileId }`
- Selected language, week, user
- Group fight teams, online users, challenges

### Persistence
- `localStorage` with `glostrainer_*` prefixed keys
- Auto-save via debounced `saveProgressQuiet()` (500ms)
- Keys: `glostrainer_state`, `glostrainer_week_xp_map`, `glostrainer_settings`

## Module Organization (approximate line ranges)

| Section | Lines | Purpose |
|---------|-------|---------|
| Elements Map | 2-91 | DOM element caching |
| State Init | 93-208 | Default state objects |
| Boss Fight Engine | 269-2148 | Canvas 2D animations |
| Storage | 2149-2390 | localStorage wrappers |
| Training Logic | 2387-3006 | Question picking, answer checking, XP |
| UI Builders | 3465-3785 | Selects, leaderboards, avatars |
| Data Loading | 3315-3717 | Fetch API calls |
| Duel System | 4894-5027 | 1v1 multiplayer |
| Group Fight | 4557-4754 | Team battles |
| AI Parse | 5101-5217 | OpenAI vocab parsing |
| Event Handlers | 5348-5717 | Form submissions, polling |

## API Communication

### Headers
```javascript
// Guest requests
{ 'X-Guest-Session': uuid, 'X-Guest-Name': name }

// Auth requests - cookies auto-sent by browser
```

### Fetch pattern
```javascript
const response = await fetch(url, { method, headers, body: JSON.stringify(data) });
const result = await response.json();
```

## Key Flows

### Training
```
initTrainQueue() → shuffle words → populate queues
pickWord() → pop from queue → setQuestion(word)
onSubmit → check answer → onCorrect()/onWrong()
onCorrect → addCorrectKey + grantXp + saveProgressQuiet + pickWord
onWrong → push to trainMissed + pickWord
```

### Boss Fight
```
startBossRound() → set boss HP/duration → start canvas engine
correct answer → projectile → damage boss
wrong answer → take damage
boss HP=0 → win round → next round or victory
```

### Polling Loop (every 3-5s)
```
sendHeartbeat() → POST /api/presence/heartbeat
pollChallengeInbox() → GET /api/challenges/inbox
pollGroupFightCurrent() → GET /api/groupfight/current
pollGroupFightEvents() → GET events?sinceId=
```

## Special Character Input
Language-specific buttons below answer input:
- Spanish: á, é, í, ó, ú, ü, ñ
- French: é, è, ê, ë, à, ù, ç
- German: ä, ö, ü, ß
- Clicking inserts into input field

## Canvas (Boss Fight Engine)
- 900x320px canvas
- Multi-layer: background parallax, boss sprite, player sprite, projectiles, particles
- `bossFightEngine` object manages render loop via `requestAnimationFrame`
- Text flash feedback on correct/wrong answers
