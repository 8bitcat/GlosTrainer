# Deploy

Build and deploy the application to production via FTP.

## Pre-flight

1. Run `git remote -v` — confirm origin is `8bitcat/GlosTrainer`. If wrong: **STOP**.
2. Run `git branch --show-current` — must NOT be `main`.

## Steps

1. Build: `dotnet publish ./GlosTrainer.Web.csproj -c Release`
2. Read FTP password from `.publishSettings` file
3. Upload `app_offline.htm` to `/wwwroot/` on FTP
4. Upload changed files:
   - DLLs/PDBs → `ftp://site57471.siteasp.net/wwwroot/`
   - Static files → `ftp://site57471.siteasp.net/wwwroot/wwwroot/` (double-nested!)
5. Delete `app_offline.htm` from FTP (use `-Q "DELE /wwwroot/app_offline.htm"`)
6. Wait 10 seconds for cold start
7. Verify deployment:
   - `curl http://glostrainer.runasp.net/` returns 200
   - `curl http://glostrainer.runasp.net/api/vocab/data` returns JSON
   - Grep deployed JS/HTML for unique string from latest changes
8. Report deployment status
