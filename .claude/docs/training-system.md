# Training System Documentation

## Training Modes

### Standard Training
- User selects a week → words shuffled into `trainQueue`
- Words picked one by one → user types translation
- Correct: word removed, XP granted, progress saved
- Wrong: word moved to `trainMissed` retry queue
- Complete when both queues empty

### Boss Fight
- Canvas-based visual battle (900x320px)
- Boss has HP that scales with round number
- Correct answers = projectile that damages boss
- Wrong answers = boss attacks player
- Win when boss HP = 0
- Multiple rounds with increasing difficulty

### Fortress Mode
- Timed challenge with blocks
- Correct answers build fortress blocks
- Timer-based scoring

## XP & Progression System
- XP granted per correct answer
- Streak multiplier: consecutive correct answers increase XP
- Streak resets on wrong answer
- XP stored per week in `glostrainer_week_xp_map` localStorage
- Level calculated from total XP

## Progress Persistence

### Database (ProgressRecord)
- `WeekId` - which vocabulary week
- `UserProfileId` - which user
- `CorrectKeysJson` - JSON array of word IDs answered correctly
- `PerfectCount` - times user completed all words in week
- `Score` - numeric score
- `TimeSeconds` - completion time

### localStorage
- `glostrainer_state` - full game state (HP, XP, coins, streak)
- `glostrainer_week_xp_map` - XP breakdown per week
- `glostrainer_settings` - user preferences

### Auto-Save
- `saveProgressQuiet()` debounced 500ms after state changes
- Uses `quietSave: true` flag to skip highscore creation
- Prevents server spam during rapid answer sequences

## Answer Checking
- Case-insensitive comparison
- Trims whitespace
- Multiple accepted answers separated by `/` or `,`
- Special characters matter (é ≠ e)
