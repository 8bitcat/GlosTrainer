# Code Conventions - GlosTrainer.Web

## C# Backend Conventions

### Naming
- **Classes/Methods:** PascalCase (`UserProfile`, `InitializeAsync`)
- **Properties:** PascalCase with auto-properties (`public string Id { get; set; }`)
- **Async methods:** Always suffix with `Async`, always accept `CancellationToken ct`
- **Private fields:** No prefix convention, but rare (most logic in Program.cs minimal APIs)
- **Model classes:** Always `sealed` for performance

### Patterns
- **Nullable references:** Enabled project-wide (`<Nullable>enable</Nullable>`)
- **Implicit usings:** Enabled (no explicit `using System;` etc.)
- **Property initializers:** `public string Id { get; set; } = Guid.NewGuid().ToString("N");`
- **Error returns:** Services return tuples `(bool Success, string? Error, T? Result)` instead of exceptions
- **DI lifetime:** Scoped for auth services, Singleton for stateless parsers

### API Endpoints (Minimal API in Program.cs)
- Group by feature: `/api/vocab/*`, `/api/duel/*`, `/api/groupfight/*`, `/api/presence/*`
- Auth endpoints at `/auth/*` (no `/api/` prefix)
- Return `Results.Ok(data)` or `Results.BadRequest(new { error = "message" })`
- Use `[Authorize]` attribute or manual auth checks
- Guest identification via `X-Guest-Session` + `X-Guest-Name` headers

### Entity Framework
- No migrations - schema created via raw SQL in `VocabDatabaseInitializer`
- `EnsureCreatedAsync()` for initial schema, then `ExecuteSqlRawAsync()` for evolution
- All DbSet names match table names
- Cascade delete configured via `OnDelete(DeleteBehavior.Cascade)`

## Frontend Conventions (site.js)

### Structure
- Single IIFE wrapping entire app (~5800 lines)
- DOM elements cached at top in elements map
- Two state objects: `state` (game) + `appState` (app-wide)
- No framework - pure vanilla JS ES6+

### Naming
- **Functions:** camelCase, prefixed by purpose:
  - `render*` / `build*` / `update*` for UI rendering
  - `load*` for data fetching
  - `poll*` for polling loops
  - `save*` for persistence
  - `on*` / `handle*` for event handlers
- **Constants:** camelCase (not UPPER_SNAKE)
- **localStorage keys:** Prefixed `glostrainer_*`

### Async Patterns
- Always `async/await` (no `.then()` chains)
- Fetch API for all HTTP calls
- Guest headers sent on every request

### DOM Manipulation
- `querySelector` / `getElementById` for element access
- Direct `innerHTML =` for list/select rendering
- `classList.add/remove/toggle` for state classes
- No template literals for large HTML - string concatenation used

### CSS Conventions
- CSS variables in `:root` for color palette
- CSS Grid primary layout, Flexbox for component alignment
- Single breakpoint: `@media (max-width: 768px)`
- Class naming: kebab-case (`.boss-fight-canvas`, `.game-shell`)
- Animation classes: `.sending-pulse`, `.ghost`
