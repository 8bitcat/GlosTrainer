# Deploy

Build and deploy the application to production via FTP.

## Steps

1. Build: `dotnet publish ./GlosTrainer.Web.csproj -c Release`
2. Read FTP password from publish profile
3. Upload `app_offline.htm` to `/wwwroot/` on FTP
4. Upload changed files (DLLs, static assets) to appropriate FTP paths
5. Delete `app_offline.htm` from FTP
6. Wait 8-10 seconds for cold start
7. Verify deployment:
   - `curl http://glostrainer.runasp.net/health` returns 200
   - `curl http://glostrainer.runasp.net/` returns 200
   - Test any changed API endpoints
8. Report deployment status
