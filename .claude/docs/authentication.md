# Authentication Documentation

## Auth Strategies

### 1. Cookie-Based (Authenticated Users)
- ASP.NET Core Cookie Authentication
- Login: POST `/auth/login` → sets auth cookie
- Register: POST `/auth/register` → creates LocalAuthUser + UserProfile
- Teacher quick login: POST `/auth/teacher-login` → uses shared teacher code
- Logout: GET `/auth/logout` → clears cookie

### 2. Guest Sessions (Anonymous Users)
- No authentication required
- Guest generates UUID stored in `localStorage` as session key
- Guest picks a display name (prompted on first visit)
- Every API call includes headers:
  - `X-Guest-Session: <uuid>`
  - `X-Guest-Name: <display-name>`
- Backend auto-creates UserProfile + SitePresence if needed

## Password Security
- Algorithm: PBKDF2-SHA256
- Iterations: 100,000
- Salt: 16 random bytes
- Hash output: 32 bytes
- Implementation: `Services/LocalAuthService.cs`

## Claims
- `AppClaimTypes.AccountId` - LocalAuthUser ID
- `AppClaimTypes.ProfileId` - UserProfile ID
- `ClaimTypes.Role` - "Admin" for admin users

## Admin Authorization
- Policy: "AdminOnly" requires Admin role
- Admin usernames configured in `Security:AdminUsernames` config array
- Protected folders: `/Admin/*`, `/Teacher/*`

## Middleware Behavior
- `/api/*` paths: Returns 401 JSON on auth failure (no redirect)
- Page paths: Redirects to `/Auth/Login` on auth failure
