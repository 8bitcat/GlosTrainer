# Style Guide - GlosTrainer.Web

## C# Style

### File Organization
- Program.cs: All endpoints grouped by feature (auth, vocab, duels, groupfight, presence)
- Models: Split into AppEntities.cs (domain), VocabModels.cs (DTOs), AuthModels.cs (auth DTOs)
- Services: One class per file, named by responsibility

### Class Definitions
```csharp
public sealed class EntityName
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Name { get; set; } = "";
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public string? OptionalField { get; set; }
}
```

### API Endpoint Style
```csharp
app.MapPost("/api/feature/action", async (RequestDto req, AppDbContext db, CancellationToken ct) =>
{
    // Validate
    if (string.IsNullOrWhiteSpace(req.Field))
        return Results.BadRequest(new { error = "Field is required" });

    // Process
    var entity = new Entity { ... };
    db.Entities.Add(entity);
    await db.SaveChangesAsync(ct);

    return Results.Ok(new { entity.Id, entity.Name });
});
```

### Service Methods
```csharp
public async Task<(bool Success, string? Error)> DoSomethingAsync(
    string input, CancellationToken ct)
{
    // Validation
    // Processing
    // Return tuple
}
```

## JavaScript Style

### Function Naming
```javascript
// Rendering
function renderStats() { }
function buildWeekOptions() { }
function updateLeaderboard() { }

// Data
function loadData() { }
function loadAuthStatus() { }
function saveProgressQuiet() { }

// Events
function onCorrect() { }
function handleFormSubmit() { }

// Polling
function pollChallengeInbox() { }
function sendHeartbeat() { }
```

### State Updates
```javascript
// Direct mutation (no immutability pattern)
state.xp += amount;
state.streak++;
appState.selectedWeek = weekId;

// Persist after changes
saveProgressQuiet(); // debounced 500ms
```

### API Calls
```javascript
async function loadSomething() {
    try {
        const response = await fetch('/api/endpoint', {
            headers: guestHeaders()
        });
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        // Use data
    } catch (err) {
        console.error('Load failed:', err);
    }
}
```

## CSS Style

### Variables
```css
:root {
    --accent-primary: #4a9eff;
    --accent-good: #4caf50;
    --accent-bad: #f44336;
    --bg-dark: #1a1a2e;
    --bg-panel: #16213e;
}
```

### Layout
- CSS Grid for page sections
- Flexbox for component internals
- Single breakpoint: `@media (max-width: 768px)`

### Naming
- kebab-case: `.boss-fight-canvas`, `.game-shell`, `.week-select`
- State classes: `.active`, `.hidden`, `.disabled`
- Animation: `.sending-pulse`, `.ghost`
