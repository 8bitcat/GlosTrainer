# CLAUDE.md - Project instructions for Claude Code

## Project
GlosTrainer.Web - ASP.NET Core 8.0 Razor Pages vocabulary training app with vanilla JS frontend.
Hosted at: http://glostrainer.runasp.net/

## Workflow: Always test, deploy, verify

After making code changes, always follow this sequence:

1. **Build** - `dotnet publish ./GlosTrainer.Web.csproj -c Release`
2. **Deploy** - Use the FTP app_offline trick (upload `app_offline.htm` to stop app, upload changed files, delete `app_offline.htm` to restart)
3. **Test against live site** - Run HTTP tests against `http://glostrainer.runasp.net/` to verify:
   - Site responds (HTTP 200)
   - API endpoints return expected data
   - Auth flows work (login/logout)
   - Changed features are live and functional

## Deployment

- **FTP host**: `site57471.siteasp.net:21`, user `site57471`, password from `.publishSettings` file
- **Critical**: Must upload `app_offline.htm` first to release file locks on DLLs, then upload files, then delete `app_offline.htm`
- **WebDeploy**: Currently returns 401 (credentials expired). Use FTP instead.
- **HTTPS**: Broken on hosting side (SSL handshake fails). Use HTTP for testing.

## Key files
- `wwwroot/js/site.js` - Main frontend (~5000+ lines, vanilla JS)
- `Program.cs` - All API endpoints and middleware (~1400 lines)
- `Pages/Teacher/Weeks.cshtml` - Teacher vocabulary management tool
- `Pages/Index.cshtml` - Main SPA page
- `appsettings.json` - Production config (contains secrets, excluded from git)
