# Deployment Patterns - GlosTrainer.Web

## Identity & Repo Safety
- **GitHub account**: MUST be `8bitcat`. Run `gh auth status` to verify.
- **Repository**: `8bitcat/GlosTrainer`. Run `git remote -v` to verify.
- **NEVER push as `carlpalsson`**. If wrong account: `gh auth switch --user 8bitcat && gh auth setup-git`
- **NEVER commit to `main`**. Always use feature branches.

## Build
```bash
dotnet publish ./GlosTrainer.Web.csproj -c Release
```
Output: `./bin/Release/net8.0/publish/`

## FTP Deployment (Primary Method)

### Credentials
- Host: `site57471.siteasp.net:21`
- User: `site57471`
- Password: from `.publishSettings` file

### FTP Directory Mapping (IMPORTANT: double-nested wwwroot!)
- FTP root `/` is NOT the web root
- DLLs/PDBs: `/wwwroot/`
- Static files: `/wwwroot/wwwroot/js/`, `/wwwroot/wwwroot/css/`, `/wwwroot/wwwroot/images/`
- `app_offline.htm`: `/wwwroot/`

### Deployment Steps
1. **Upload `app_offline.htm`** to `/wwwroot/` - stops app, releases DLL locks
2. **Upload changed files**:
   - `GlosTrainer.Web.dll` + `.pdb` → `ftp://site57471.siteasp.net/wwwroot/`
   - `site.js` → `ftp://site57471.siteasp.net/wwwroot/wwwroot/js/`
   - Other static assets → `ftp://site57471.siteasp.net/wwwroot/wwwroot/<path>/`
3. **Delete `app_offline.htm`** (use `-Q "DELE /wwwroot/app_offline.htm"`)
4. **Wait 10 seconds** for cold start

### curl FTP Commands
```bash
# Upload DLL
curl -T localfile.dll ftp://site57471.siteasp.net/wwwroot/ --user site57471:PASSWORD

# Upload static file (note: double wwwroot!)
curl -T site.js ftp://site57471.siteasp.net/wwwroot/wwwroot/js/ --user site57471:PASSWORD

# Upload app_offline
curl -T app_offline.htm ftp://site57471.siteasp.net/wwwroot/ --user site57471:PASSWORD

# Delete app_offline (use -Q DELE syntax, NOT -X)
curl ftp://site57471.siteasp.net/ -Q "DELE /wwwroot/app_offline.htm" --user site57471:PASSWORD
```

## Post-Deploy Verification
```bash
# Site loads
curl -s -o /dev/null -w "%{http_code}" http://glostrainer.runasp.net/

# API check
curl -s http://glostrainer.runasp.net/api/vocab/data | head -c 200

# Verify deployed JS has latest changes
curl -s http://glostrainer.runasp.net/js/site.js | grep -c 'UNIQUE_STRING_FROM_LATEST_CHANGE'
```

## Known Issues
- **HTTPS broken:** SSL handshake fails on hosting side. Always use HTTP.
- **WebDeploy returns 401:** Credentials expired. Use FTP instead.
- **Cold start:** App takes ~10 seconds after app_offline removal.
