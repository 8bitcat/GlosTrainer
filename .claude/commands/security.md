# Security Review

Perform a security-focused review of the codebase.

## Checklist

### Authentication & Authorization
- [ ] Cookie auth configured correctly (SameSite, Secure, HttpOnly)
- [ ] Admin-only endpoints properly gated with `[Authorize("AdminOnly")]`
- [ ] Teacher pages require proper authorization
- [ ] Guest session UUIDs validated (not spoofable for privilege escalation)
- [ ] Password hashing params adequate (PBKDF2-SHA256, 100k iterations)

### Input Validation
- [ ] API request bodies validated before database operations
- [ ] SQL injection protection (parameterized queries in raw SQL)
- [ ] XSS prevention (innerHTML with user-supplied data in site.js)
- [ ] Path traversal checks on file upload endpoints

### Data Protection
- [ ] Secrets not committed (appsettings.json, connection strings)
- [ ] No sensitive data in localStorage
- [ ] API responses don't leak internal data (stack traces, connection strings)
- [ ] OpenAI API key properly secured

### API Security
- [ ] Rate limiting on auth endpoints
- [ ] CORS configured appropriately
- [ ] Anti-forgery tokens on form submissions
- [ ] File upload size limits enforced
