using System.Security.Claims;
using System.Security.Cryptography;
using GlosTrainer.Web.Data;
using GlosTrainer.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace GlosTrainer.Web.Services;

public sealed class LocalAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _configuration;

    public LocalAuthService(AppDbContext db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
    }

    public async Task<(bool Success, string? Error, LocalAuthUser? User)> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
    {
        var username = request.Username.Trim();
        var displayName = request.DisplayName.Trim();

        if (username.Length < 3)
        {
            return (false, "Anvandarnamn maste vara minst 3 tecken.", null);
        }

        if (request.Password.Length < 8)
        {
            return (false, "Losenord maste vara minst 8 tecken.", null);
        }

        if (displayName.Length < 2)
        {
            return (false, "Namn maste vara minst 2 tecken.", null);
        }

        var normalized = NormalizeUsername(username);

        var exists = await _db.LocalAuthUsers.AnyAsync(x => x.NormalizedUsername == normalized, ct);
        if (exists)
        {
            return (false, "Anvandarnamnet ar upptaget.", null);
        }

        var profile = await _db.UserProfiles
            .Where(x => x.Name.ToLower() == displayName.ToLower())
            .Where(x => !_db.LocalAuthUsers.Any(u => u.UserProfileId == x.Id))
            .FirstOrDefaultAsync(ct);

        if (profile is null)
        {
            profile = new UserProfile { Name = displayName };
            _db.UserProfiles.Add(profile);
            await _db.SaveChangesAsync(ct);
        }

        var (hash, salt) = HashPassword(request.Password);

        var adminUsers = _configuration.GetSection("Security:AdminUsernames").Get<string[]>() ?? [];
        var isAdmin = adminUsers.Any(x => string.Equals(x?.Trim(), username, StringComparison.OrdinalIgnoreCase));

        var user = new LocalAuthUser
        {
            Username = username,
            NormalizedUsername = normalized,
            PasswordHash = hash,
            PasswordSalt = salt,
            IsAdmin = isAdmin,
            LastLoginUtc = DateTime.UtcNow,
            UserProfileId = profile.Id
        };

        _db.LocalAuthUsers.Add(user);
        await _db.SaveChangesAsync(ct);

        return (true, null, user);
    }

    public async Task<LocalAuthUser?> ValidateCredentialsAsync(LoginRequest request, CancellationToken ct = default)
    {
        var normalized = NormalizeUsername(request.Username);
        if (string.IsNullOrWhiteSpace(normalized) || string.IsNullOrWhiteSpace(request.Password))
        {
            return null;
        }

        var user = await _db.LocalAuthUsers.FirstOrDefaultAsync(x => x.NormalizedUsername == normalized, ct);
        if (user is null)
        {
            return null;
        }

        if (!VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
        {
            return null;
        }

        var adminUsers = _configuration.GetSection("Security:AdminUsernames").Get<string[]>() ?? [];
        var shouldBeAdmin = adminUsers.Any(x => string.Equals(x?.Trim(), user.Username, StringComparison.OrdinalIgnoreCase));
        if (shouldBeAdmin && !user.IsAdmin)
        {
            user.IsAdmin = true;
        }

        user.LastLoginUtc = DateTime.UtcNow;
        await _db.SaveChangesAsync(ct);
        return user;
    }

    public async Task<LocalAuthUser?> GetCurrentUserAsync(ClaimsPrincipal principal, CancellationToken ct = default)
    {
        var userId = principal.FindFirstValue(AppClaimTypes.AccountId);
        if (string.IsNullOrWhiteSpace(userId))
        {
            return null;
        }

        return await _db.LocalAuthUsers
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == userId, ct);
    }

    public async Task<ClaimsPrincipal> CreatePrincipalAsync(LocalAuthUser user, CancellationToken ct = default)
    {
        var profileName = await _db.UserProfiles
            .Where(x => x.Id == user.UserProfileId)
            .Select(x => x.Name)
            .FirstOrDefaultAsync(ct) ?? user.Username;

        var claims = new List<Claim>
        {
            new(AppClaimTypes.AccountId, user.Id),
            new(AppClaimTypes.ProfileId, user.UserProfileId),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Name, profileName)
        };

        if (user.IsAdmin)
        {
            claims.Add(new Claim(ClaimTypes.Role, "Admin"));
        }

        var identity = new ClaimsIdentity(claims, "LocalCookie");
        return new ClaimsPrincipal(identity);
    }

    public async Task<LocalAuthUser> EnsureTeacherQuickLoginAsync(CancellationToken ct = default)
    {
      const string teacherUsername = "TeacherQuickLogin";
      var normalized = NormalizeUsername(teacherUsername);
      var user = await _db.LocalAuthUsers.FirstOrDefaultAsync(x => x.NormalizedUsername == normalized, ct);

      var profile = await _db.UserProfiles.FirstOrDefaultAsync(x => x.Name == "Larare", ct);
      if (profile is null)
      {
          profile = new UserProfile { Name = "Larare" };
          _db.UserProfiles.Add(profile);
          await _db.SaveChangesAsync(ct);
      }

      if (user is not null)
      {
          user.IsAdmin = true;
          user.UserProfileId = profile.Id;
          user.LastLoginUtc = DateTime.UtcNow;
          await _db.SaveChangesAsync(ct);
          return user;
      }

      var randomPassword = Guid.NewGuid().ToString("N");
      var (hash, salt) = HashPassword(randomPassword);
      user = new LocalAuthUser
      {
          Username = teacherUsername,
          NormalizedUsername = normalized,
          PasswordHash = hash,
          PasswordSalt = salt,
          IsAdmin = true,
          LastLoginUtc = DateTime.UtcNow,
          UserProfileId = profile.Id
      };

      _db.LocalAuthUsers.Add(user);
      await _db.SaveChangesAsync(ct);
      return user;
    }

    private static string NormalizeUsername(string username) => username.Trim().ToUpperInvariant();

    private static (string Hash, string Salt) HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100_000, HashAlgorithmName.SHA256);
        var hash = pbkdf2.GetBytes(32);
        return (Convert.ToBase64String(hash), Convert.ToBase64String(salt));
    }

    private static bool VerifyPassword(string password, string storedHash, string storedSalt)
    {
        var salt = Convert.FromBase64String(storedSalt);
        var expectedHash = Convert.FromBase64String(storedHash);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100_000, HashAlgorithmName.SHA256);
        var actualHash = pbkdf2.GetBytes(32);
        return CryptographicOperations.FixedTimeEquals(actualHash, expectedHash);
    }
}
