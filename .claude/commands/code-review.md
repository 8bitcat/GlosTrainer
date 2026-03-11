# Code Review

Review the current changes for quality, security, and correctness.

## Steps

1. Run `git diff` to see all changes
2. Check for:
   - SQL injection risks (raw SQL in VocabDatabaseInitializer)
   - XSS vulnerabilities (innerHTML usage in site.js)
   - Missing null checks on nullable reference types
   - API endpoints missing auth checks
   - Broken guest session handling (X-Guest-Session / X-Guest-Name)
   - localStorage key collisions
   - Missing error handling on fetch calls
   - Unintended cascade deletes in EF Core relationships
3. Verify naming conventions match project standards
4. Check that new API endpoints follow existing patterns
5. Report findings with severity (critical/warning/info)
