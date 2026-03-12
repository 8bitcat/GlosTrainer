# Review and Commit

Review staged changes, then create a well-formatted commit.

## Pre-flight

1. Run `git remote -v` — confirm origin is `8bitcat/GlosTrainer`. If wrong: **STOP**.
2. Run `git branch --show-current` — must NOT be `main`. If on main: **STOP** and ask for branch name.

## Steps

1. Run `git status` and `git diff --staged` to see changes
2. If nothing staged, check `git diff` for unstaged changes and suggest what to stage
3. Review the changes:
   - Verify no secrets, credentials, or .env files included
   - Check code quality and naming conventions
   - Ensure no debug code or console.log left in
   - No Swedish character issues (å, ä, ö)
4. Draft a commit message:
   - First line: concise summary under 72 chars
   - Blank line
   - Body: explain the "why" if needed
   - Use conventional commit prefixes: feat, fix, refactor, docs, chore, style
5. Stage appropriate files and create the commit
6. Show the commit result
