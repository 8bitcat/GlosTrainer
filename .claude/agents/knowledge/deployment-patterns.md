# Deployment Patterns - GlosTrainer.Web

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

### FTP Directory Mapping
- FTP root `/` is NOT the web root
- Web root on FTP: `/wwwroot/`
- Static files: `/wwwroot/js/`, `/wwwroot/css/`, `/wwwroot/images/`
- DLLs/PDBs: `/wwwroot/`
- Config: `/wwwroot/`

### Deployment Steps
1. **Upload `app_offline.htm`** to `/wwwroot/` - stops app, releases DLL locks
2. **Upload changed files**:
   - `GlosTrainer.Web.dll` + `.pdb` → `/wwwroot/`
   - `site.js` → `/wwwroot/js/`
   - Other static assets to respective paths
3. **Delete `app_offline.htm`** - restarts app
4. **Wait 8-10 seconds** for cold start

### curl FTP Commands
```bash
# Upload file
curl -T localfile.dll ftp://site57471.siteasp.net/wwwroot/ --user site57471:PASSWORD

# Upload app_offline
curl -T app_offline.htm ftp://site57471.siteasp.net/wwwroot/ --user site57471:PASSWORD

# Delete app_offline (use -Q DELE syntax)
curl ftp://site57471.siteasp.net/ -Q "DELE /wwwroot/app_offline.htm" --user site57471:PASSWORD
```

## Post-Deploy Verification
```bash
# Health check
curl -s -o /dev/null -w "%{http_code}" http://glostrainer.runasp.net/health

# Site loads
curl -s -o /dev/null -w "%{http_code}" http://glostrainer.runasp.net/

# API check
curl -s http://glostrainer.runasp.net/api/vocab/data | head -c 200
```

## Known Issues
- **HTTPS broken:** SSL handshake fails on hosting side. Always use HTTP.
- **WebDeploy returns 401:** Credentials expired. Use FTP instead.
- **Cold start:** App takes 8-10 seconds after app_offline removal.
