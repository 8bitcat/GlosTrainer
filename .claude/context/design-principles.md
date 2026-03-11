# Design Principles - GlosTrainer.Web

## Core Philosophy
- **Simplicity first:** No frameworks, no build tools, no bundlers. Vanilla JS + ASP.NET Core.
- **Single-file approach:** One big site.js, one big Program.cs. Avoid premature abstraction.
- **Ship fast:** FTP deployment, raw SQL schema evolution, no migration ceremony.

## Architecture Decisions

### Why no frontend framework?
- Target audience: Swedish school students & teachers
- App complexity doesn't warrant React/Vue overhead
- Faster initial load, no build step, easy to debug
- Canvas-based boss fights work better with direct DOM control

### Why Minimal APIs over Controllers?
- All endpoints in one file (Program.cs) for easy discovery
- Less ceremony than MVC controllers
- Fits the "keep it simple" philosophy

### Why no EF migrations?
- Hosted on shared runasp.net without CLI access
- Raw SQL gives full control over schema changes
- `VocabDatabaseInitializer` handles idempotent schema creation

### Why polling instead of WebSocket/SignalR?
- Simpler to implement and debug
- Shared hosting may not support WebSocket
- Multiplayer is turn-based enough that 2-3s polling works
- Can upgrade to SignalR later if needed

## Development Values

1. **Working > Perfect:** Ship features that work, refine later
2. **One file > Many files:** Don't split until the pain is real
3. **Direct DOM > Abstractions:** querySelector is fine
4. **HTTP polling > WebSocket complexity:** Good enough for the use case
5. **Raw SQL evolution > Migration ceremony:** Pragmatic schema management
