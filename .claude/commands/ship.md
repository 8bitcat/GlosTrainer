# Ship — Review, Commit, Push, and Deploy

Full pipeline: review changes → commit → push → build → deploy → verify. Each step must pass before proceeding to the next.

## Step 1: Review

1. Run `git status` and `git diff` to see all changes
2. Review for:
   - No secrets, credentials, or .env files
   - No debug code or console.log statements
   - Code quality and naming conventions
   - No Swedish character issues (å, ä, ö must be correct)
3. If issues found: **STOP** — report issues and ask user before continuing

## Step 2: Commit

1. Stage appropriate files (never stage secrets)
2. Draft commit message:
   - Conventional prefix: feat, fix, refactor, docs, chore, style
   - First line under 72 chars
   - Body explains "why" if needed
3. Create the commit
4. **Validate**: Run `git log -1 --oneline` — confirm commit was created
5. If commit fails (e.g. pre-commit hook): **STOP** — fix and retry

## Step 3: Push

1. Run `git push`
2. **Validate**: Check exit code is 0
3. If push fails (auth, permissions): **STOP** — report error, suggest fix (e.g. `gh auth switch`)

## Step 4: Build

1. Run `dotnet publish ./GlosTrainer.Web.csproj -c Release`
2. **Validate**: Build must succeed with 0 errors
3. If build fails: **STOP** — report errors

## Step 5: Deploy via FTP

1. Read FTP password from `.publishSettings` file
2. Upload `app_offline.htm` to `/wwwroot/` on FTP
3. **Validate**: Confirm site returns 503 or app_offline content
4. Upload changed files:
   - DLLs/PDBs → `ftp://site57471.siteasp.net/wwwroot/`
   - Static files (JS/CSS/images) → `ftp://site57471.siteasp.net/wwwroot/wwwroot/` (note: double-nested wwwroot)
5. Delete `app_offline.htm` from FTP (use `-Q "DELE /wwwroot/app_offline.htm"`)
6. Wait 10 seconds for cold start

## Step 6: Verify

1. **Site loads**: `curl -s -o /dev/null -w "%{http_code}" http://glostrainer.runasp.net/` must return 200
2. **API works**: `curl -s http://glostrainer.runasp.net/api/vocab/data` must return JSON
3. **Changed files deployed**: Verify key changes are present in the live response (e.g. grep deployed JS for a unique string from the latest changes)
4. If any check fails: **STOP** — report what failed, suggest rollback or re-deploy

## On any failure

- Clearly state which step failed and why
- Do NOT proceed to the next step
- Suggest a fix or ask the user how to proceed
