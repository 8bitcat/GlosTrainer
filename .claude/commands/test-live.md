# Test Live Site

Run HTTP tests against the production site to verify it's working.

## Steps

1. Health check: `curl http://glostrainer.runasp.net/health`
2. Homepage loads: `curl -s -o /dev/null -w "%{http_code}" http://glostrainer.runasp.net/`
3. Vocab API returns data: `curl http://glostrainer.runasp.net/api/vocab/data`
4. Auth status endpoint: `curl http://glostrainer.runasp.net/api/auth/status`
5. Online users: `curl http://glostrainer.runasp.net/api/presence/public`
6. Leaderboard: `curl http://glostrainer.runasp.net/api/vocab/leaderboard-correct`
7. Report results with pass/fail for each endpoint
