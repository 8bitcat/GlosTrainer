using GlosTrainer.Web.Data;
using GlosTrainer.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace GlosTrainer.Web.Services;

public sealed class AuthAccountService
{
    private readonly AppDbContext _db;

    public AuthAccountService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<LocalAuthUser?> GetCurrentAccountAsync(System.Security.Claims.ClaimsPrincipal principal, CancellationToken ct = default)
    {
        var accountId = principal.FindFirst(AppClaimTypes.AccountId)?.Value;
        if (string.IsNullOrWhiteSpace(accountId))
        {
            return null;
        }

        return await _db.LocalAuthUsers
            .Include(x => x.UserProfile)
            .FirstOrDefaultAsync(x => x.Id == accountId, ct);
    }
}