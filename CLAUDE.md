# CLAUDE.md - Project instructions for Claude Code

## Project
GlosTrainer.Web - ASP.NET Core 8.0 Razor Pages vocabulary training app with vanilla JS frontend.
Hosted at: http://glostrainer.runasp.net/

## CRITICAL: Repository & Identity Safety

- **GitHub account**: ALWAYS use `8bitcat`. NEVER push as `carlpalsson`.
- **Repository**: `8bitcat/GlosTrainer` — verify remote before every push.
- **Before ANY git push**: Run `gh auth status` and confirm active account is `8bitcat`. If not, run `gh auth switch --user 8bitcat && gh auth setup-git` before proceeding.
- **Before ANY git push**: Run `git remote -v` and confirm origin is `8bitcat/GlosTrainer`. If not, **STOP** and alert the user.
- **Branching**: NEVER commit directly to `main`. Always create a feature branch (e.g. `feat/sms-notifications`, `fix/trophy-colors`). Use `/ship` to commit, push, and deploy.

## Workflow: Branch → Code → Ship

1. **Branch** - Create a new branch from main for each change: `git checkout -b <type>/<short-description>`
2. **Code** - Make changes
3. **Ship** - Use `/ship` command which handles: review → commit → push → build → deploy → verify

## Deployment

- **FTP host**: `site57471.siteasp.net:21`, user `site57471`, password from `.publishSettings` file
- **Critical**: Must upload `app_offline.htm` first to release file locks on DLLs, then upload files, then delete `app_offline.htm`
- **Static files**: Upload to `ftp://site57471.siteasp.net/wwwroot/wwwroot/` (double-nested wwwroot!)
- **DLLs**: Upload to `ftp://site57471.siteasp.net/wwwroot/`
- **WebDeploy**: Currently returns 401 (credentials expired). Use FTP instead.
- **HTTPS**: Broken on hosting side (SSL handshake fails). Use HTTP for testing.

## Key files
- `wwwroot/js/site.js` - Main frontend (~5800+ lines, vanilla JS)
- `Program.cs` - All API endpoints and middleware (~1600+ lines)
- `Pages/Teacher/Weeks.cshtml` - Teacher vocabulary management tool
- `Pages/Index.cshtml` - Main SPA page
- `appsettings.json` - Production config (contains secrets, excluded from git)
