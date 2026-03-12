using GlosTrainer.Web.Data;
using GlosTrainer.Web.Models;
using GlosTrainer.Web.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("ConnectionStrings:DefaultConnection is missing.");
}

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddScoped<LocalAuthService>();
builder.Services.AddScoped<AuthAccountService>();
builder.Services.AddScoped<VocabDatabaseInitializer>();

builder.Services.AddHttpClient();
builder.Services.AddSingleton<OpenAiVocabParser>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.LoginPath = "/Auth/Login";
    options.Events.OnRedirectToLogin = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }

        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});

builder.Services.AddRazorPages(options =>
{
    options.Conventions.AuthorizeFolder("/Admin", "AdminOnly");
    options.Conventions.AuthorizeFolder("/Teacher", "AdminOnly");
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<VocabDatabaseInitializer>();
    await initializer.InitializeAsync();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.MapPost("/auth/register", async (RegisterRequest request, LocalAuthService authService, HttpContext httpContext, CancellationToken ct) =>
{
    var result = await authService.RegisterAsync(request, ct);
    if (!result.Success || result.User is null)
    {
        return Results.BadRequest(new { error = result.Error ?? "Registration failed." });
    }

    var principal = await authService.CreatePrincipalAsync(result.User, ct);
    await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
    return Results.Ok(new { registered = true });
});

app.MapPost("/auth/login", async (LoginRequest request, LocalAuthService authService, HttpContext httpContext, CancellationToken ct) =>
{
    var user = await authService.ValidateCredentialsAsync(request, ct);
    if (user is null)
    {
        return Results.BadRequest(new { error = "Fel anvandarnamn eller losenord." });
    }

    var principal = await authService.CreatePrincipalAsync(user, ct);
    await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
    return Results.Ok(new { loggedIn = true });
});

app.MapPost("/auth/teacher-login", async (TeacherQuickLoginRequest request, LocalAuthService authService, IConfiguration configuration, HttpContext httpContext, CancellationToken ct) =>
{
    var configuredCode = configuration["Security:TeacherCode"];
    if (string.IsNullOrWhiteSpace(configuredCode))
    {
        return Results.BadRequest(new { error = "TeacherCode saknas i konfigurationen." });
    }

    if (!string.Equals(configuredCode.Trim(), request.Code?.Trim(), StringComparison.Ordinal))
    {
        return Results.BadRequest(new { error = "Fel lararkod." });
    }

    var user = await authService.EnsureTeacherQuickLoginAsync(ct);
    var principal = await authService.CreatePrincipalAsync(user, ct);
    await httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
    return Results.Ok(new { loggedIn = true, redirect = "/Teacher/Weeks" });
});

app.MapGet("/auth/logout", async (HttpContext httpContext) =>
{
    await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Results.Redirect("/");
});

app.MapGet("/api/auth/status", async (HttpContext httpContext, LocalAuthService authService, CancellationToken ct) =>
{
    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);

    return Results.Ok(new
    {
        isAuthenticated = account is not null,
        isAdmin = account?.IsAdmin ?? false,
        displayName = account?.UserProfile?.Name ?? account?.Username,
        username = account?.Username,
        linkedProfileId = account?.UserProfileId,
        loginConfigured = true
    });
});

app.MapGet("/api/names/random", async (AppDbContext db, CancellationToken ct) =>
{
    var colors = await db.NameDictionaryEntries.AsNoTracking().Where(x => x.Category == "color").Select(x => x.Value).ToListAsync(ct);
    var animals = await db.NameDictionaryEntries.AsNoTracking().Where(x => x.Category == "animal").Select(x => x.Value).ToListAsync(ct);
    if (colors.Count == 0 || animals.Count == 0)
    {
        return Results.Ok(new { name = "SVART-HUND" });
    }

    var rnd = Random.Shared;
    string name;
    int attempts = 0;
    do
    {
        name = $"{colors[rnd.Next(colors.Count)]}-{animals[rnd.Next(animals.Count)]}".ToUpperInvariant();
        attempts++;
    } while (attempts < 50 && await db.UserProfiles.AnyAsync(x => x.Name == name, ct));
    return Results.Ok(new { name });
});

app.MapGet("/api/vocab/data", async (HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    httpContext.Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    httpContext.Response.Headers["Pragma"] = "no-cache";
    var users = await db.UserProfiles.AsNoTracking()
        .OrderBy(x => x.Name)
        .Select(x => new VocabUser { Id = x.Id, Name = x.Name })
        .ToListAsync(ct);

    var weeks = await db.Weeks.AsNoTracking()
        .Include(x => x.Words)
        .OrderBy(x => x.WeekName)
        .Select(week => new VocabWeek
        {
            Id = week.Id,
            WeekName = week.WeekName,
            Language = string.IsNullOrWhiteSpace(week.Language) ? "english" : week.Language,
            Words = week.Words.OrderBy(x => x.Id).Select(word => new VocabWord { Sv = word.Sv, En = word.En }).ToList()
        })
        .ToListAsync(ct);

    var availableLanguages = weeks
        .Select(x => NormalizeAppLanguage(x.Language))
        .Distinct(StringComparer.OrdinalIgnoreCase)
        .OrderBy(x => x)
        .ToList();

    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);
    var selectedUserId = account?.UserProfileId ?? users.FirstOrDefault()?.Id;

    string? selectedWeekId = weeks.FirstOrDefault()?.Id;
    if (!string.IsNullOrWhiteSpace(selectedUserId))
    {
        var pref = await db.UserPreferences.AsNoTracking().FirstOrDefaultAsync(x => x.UserProfileId == selectedUserId, ct);
        if (!string.IsNullOrWhiteSpace(pref?.LastSelectedWeekId))
        {
            selectedWeekId = pref.LastSelectedWeekId;
        }
    }

    return Results.Ok(new
    {
        users,
        weeks,
        availableLanguages,
        lastActiveUserId = selectedUserId,
        lastSelectedWeekId = selectedWeekId,
        isAuthenticated = account is not null,
        linkedProfileId = account?.UserProfileId,
        canPersist = account is not null
    });
});

app.MapPost("/api/vocab/selection", async (SelectionUpdateRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);
    if (account?.UserProfileId is null)
    {
        return Results.Unauthorized();
    }

    if (string.IsNullOrWhiteSpace(request.WeekId))
    {
        return Results.BadRequest(new { error = "WeekId is required." });
    }

    var weekExists = await db.Weeks.AnyAsync(x => x.Id == request.WeekId, ct);
    if (!weekExists)
    {
        return Results.NotFound(new { error = "Week not found." });
    }

    var preference = await db.UserPreferences.FirstOrDefaultAsync(x => x.UserProfileId == account.UserProfileId, ct);
    if (preference is null)
    {
        preference = new UserPreference
        {
            UserProfileId = account.UserProfileId,
            LastSelectedWeekId = request.WeekId
        };
        db.UserPreferences.Add(preference);
    }
    else
    {
        preference.LastSelectedWeekId = request.WeekId;
    }

    await db.SaveChangesAsync(ct);
    return Results.Ok(new { lastSelectedWeekId = preference.LastSelectedWeekId });
}).RequireAuthorization();

app.MapPost("/api/profile/avatar", async (AvatarSaveRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    string? profileId = null;
    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);
    if (account?.UserProfileId is not null)
    {
        profileId = account.UserProfileId;
    }
    else
    {
        var guestSession = httpContext.Request.Headers["X-Guest-Session"].FirstOrDefault()?.Trim();
        var guestName = httpContext.Request.Headers["X-Guest-Name"].FirstOrDefault()?.Trim();
        if (!string.IsNullOrWhiteSpace(guestSession))
        {
            var presence = await db.SitePresences.FirstOrDefaultAsync(x => x.SessionId == guestSession, ct);
            profileId = presence?.UserProfileId;
        }
    }
    if (string.IsNullOrWhiteSpace(profileId)) return Results.Unauthorized();
    var profile = await db.UserProfiles.FirstOrDefaultAsync(p => p.Id == profileId, ct);
    if (profile is null) return Results.NotFound();
    var avatarUrl = request.AvatarUrl ?? "";
    if (avatarUrl.Length > 500 || (avatarUrl.Length > 0 && !avatarUrl.StartsWith("/images/")))
    {
        return Results.BadRequest(new { error = "Ogiltig avatar-URL." });
    }
    profile.AvatarUrl = avatarUrl;
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { saved = true });
});

app.MapPost("/api/presence/heartbeat", async (HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);
    if (account?.UserProfileId is null)
    {
        return Results.Unauthorized();
    }

    var displayName = account.UserProfile?.Name ?? account.Username;
    var presence = await db.OnlinePresences.FirstOrDefaultAsync(x => x.UserProfileId == account.UserProfileId, ct);
    if (presence is null)
    {
        presence = new OnlinePresence
        {
            UserProfileId = account.UserProfileId,
            DisplayName = displayName,
            LastSeenUtc = DateTime.UtcNow
        };
        db.OnlinePresences.Add(presence);
    }
    else
    {
        presence.DisplayName = displayName;
        presence.LastSeenUtc = DateTime.UtcNow;
    }

    var sessionId = $"auth:{account.UserProfileId}";
    var sitePresence = await db.SitePresences.FirstOrDefaultAsync(x => x.SessionId == sessionId, ct);
    if (sitePresence is null)
    {
        sitePresence = new SitePresence
        {
            SessionId = sessionId,
            DisplayName = displayName,
            IsAuthenticated = true,
            UserProfileId = account.UserProfileId,
            LastSeenUtc = DateTime.UtcNow
        };
        db.SitePresences.Add(sitePresence);
    }
    else
    {
        sitePresence.DisplayName = displayName;
        sitePresence.IsAuthenticated = true;
        sitePresence.UserProfileId = account.UserProfileId;
        sitePresence.LastSeenUtc = DateTime.UtcNow;
    }

    await db.SaveChangesAsync(ct);
    return Results.Ok(new { ok = true });
}).RequireAuthorization();

app.MapPost("/api/presence/guest-heartbeat", async (GuestPresenceHeartbeatRequest request, AppDbContext db, CancellationToken ct) =>
{
    if (string.IsNullOrWhiteSpace(request.SessionId) || string.IsNullOrWhiteSpace(request.DisplayName))
    {
        return Results.BadRequest(new { error = "SessionId and DisplayName required." });
    }
    var sessionId = request.SessionId.Trim();
    var displayName = request.DisplayName.Trim();
    if (displayName.Length > 200)
    {
        displayName = displayName[..200];
    }

    var row = await db.SitePresences.FirstOrDefaultAsync(x => x.SessionId == sessionId, ct);
    if (row is null)
    {
        row = new SitePresence
        {
            SessionId = sessionId,
            DisplayName = displayName,
            IsAuthenticated = false,
            UserProfileId = null,
            LastSeenUtc = DateTime.UtcNow
        };
        db.SitePresences.Add(row);
    }
    else
    {
        row.DisplayName = displayName;
        row.IsAuthenticated = false;
        row.UserProfileId = null;
        row.LastSeenUtc = DateTime.UtcNow;
    }
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { ok = true });
});

app.MapGet("/api/presence/public", async (AppDbContext db, CancellationToken ct) =>
{
    var cutoff = DateTime.UtcNow.AddSeconds(-45);
    var users = await db.SitePresences.AsNoTracking()
        .Where(x => x.LastSeenUtc >= cutoff)
        .OrderBy(x => x.DisplayName)
        .Select(x => new
        {
            sessionId = x.SessionId,
            name = x.DisplayName,
            isAuthenticated = x.IsAuthenticated,
            profileId = x.UserProfileId
        })
        .ToListAsync(ct);
    return Results.Ok(new { users });
});

app.MapGet("/api/presence/online", async (HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);
    if (account?.UserProfileId is null)
    {
        return Results.Unauthorized();
    }

    var cutoff = DateTime.UtcNow.AddSeconds(-45);
    var users = await db.OnlinePresences.AsNoTracking()
        .Where(x => x.LastSeenUtc >= cutoff)
        .OrderBy(x => x.DisplayName)
        .Select(x => new
        {
            profileId = x.UserProfileId,
            name = x.DisplayName,
            isSelf = x.UserProfileId == account.UserProfileId
        })
        .ToListAsync(ct);

    return Results.Ok(new { users });
}).RequireAuthorization();

app.MapPost("/api/challenges", async (CreateChallengeRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;
    if (string.IsNullOrWhiteSpace(request.TargetProfileId) || string.IsNullOrWhiteSpace(request.WeekId))
    {
        return Results.BadRequest(new { error = "TargetProfileId and WeekId required." });
    }
    var targetId = request.TargetProfileId.Trim();
    if (string.Equals(targetId, actorId, StringComparison.Ordinal))
    {
        return Results.BadRequest(new { error = "Du kan inte utmana dig sjalv." });
    }

    var weekExists = await db.Weeks.AnyAsync(x => x.Id == request.WeekId, ct);
    if (!weekExists)
    {
        return Results.NotFound(new { error = "Veckan finns inte." });
    }

    var challenge = new DuelChallenge
    {
        ChallengerProfileId = actorId,
        TargetProfileId = targetId,
        WeekId = request.WeekId,
        Status = "Pending",
        CreatedUtc = DateTime.UtcNow
    };
    db.DuelChallenges.Add(challenge);
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { challengeId = challenge.Id });
});

app.MapGet("/api/challenges/inbox", async (HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var pending = await db.DuelChallenges.AsNoTracking()
        .Where(x => x.TargetProfileId == actorId && x.Status == "Pending")
        .OrderByDescending(x => x.CreatedUtc)
        .Take(12)
        .ToListAsync(ct);

    var challengerIds = pending.Select(x => x.ChallengerProfileId).Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x!).Distinct().ToList();
    var weekIds = pending.Select(x => x.WeekId).Distinct().ToList();
    var profileIds = challengerIds.Where(x => !x.StartsWith("guest:", StringComparison.OrdinalIgnoreCase)).ToList();
    var guestSessionIds = challengerIds.Where(x => x.StartsWith("guest:", StringComparison.OrdinalIgnoreCase)).Select(x => x["guest:".Length..]).ToList();
    var names = await db.UserProfiles.AsNoTracking().Where(x => profileIds.Contains(x.Id)).ToDictionaryAsync(x => x.Id, x => x.Name, ct);
    var guestNames = await db.SitePresences.AsNoTracking()
        .Where(x => guestSessionIds.Contains(x.SessionId))
        .ToDictionaryAsync(x => $"guest:{x.SessionId}", x => x.DisplayName, ct);
    var weeks = await db.Weeks.AsNoTracking().Where(x => weekIds.Contains(x.Id)).ToDictionaryAsync(x => x.Id, x => x.WeekName, ct);

    var items = pending.Select(x => new
    {
        x.Id,
        challengerProfileId = x.ChallengerProfileId,
        challengerName = names.TryGetValue(x.ChallengerProfileId, out var n) ? n : (guestNames.TryGetValue(x.ChallengerProfileId, out var gn) ? gn : "Okänd"),
        x.WeekId,
        weekName = weeks.TryGetValue(x.WeekId, out var w) ? w : "Okänd vecka",
        x.CreatedUtc
    });

    return Results.Ok(new { items });
});

app.MapPost("/api/challenges/{challengeId}/respond", async (string challengeId, RespondChallengeRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var challenge = await db.DuelChallenges.FirstOrDefaultAsync(x => x.Id == challengeId, ct);
    if (challenge is null || challenge.TargetProfileId != actorId || challenge.Status != "Pending")
    {
        return Results.NotFound(new { error = "Utmaning hittades inte." });
    }

    challenge.RespondedUtc = DateTime.UtcNow;
    if (!request.Accept)
    {
        challenge.Status = "Declined";
        await db.SaveChangesAsync(ct);
        return Results.Ok(new { accepted = false });
    }

    var totalWords = await db.Words.CountAsync(x => x.WeekId == challenge.WeekId, ct);
    if (totalWords <= 0)
    {
        return Results.BadRequest(new { error = "Veckan har inga glosor." });
    }

    var match = new DuelMatch
    {
        WeekId = challenge.WeekId,
        ChallengerProfileId = challenge.ChallengerProfileId,
        OpponentProfileId = challenge.TargetProfileId,
        TotalWords = totalWords,
        ChallengerHp = 100,
        OpponentHp = 100,
        Status = "Active",
        CreatedUtc = DateTime.UtcNow
    };
    db.DuelMatches.Add(match);
    challenge.MatchId = match.Id;
    challenge.Status = "Accepted";
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { accepted = true, matchId = match.Id });
});

app.MapGet("/api/duel/current", async (HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }

    var actorId = actor.Value.ActorId;
    var match = await db.DuelMatches.AsNoTracking()
        .Where(x => x.Status == "Active" && (x.ChallengerProfileId == actorId || x.OpponentProfileId == actorId))
        .OrderByDescending(x => x.CreatedUtc)
        .FirstOrDefaultAsync(ct);

    if (match is null)
    {
        return Results.Ok(new { match = (object?)null });
    }

    var actorIds = new[] { match.ChallengerProfileId, match.OpponentProfileId }.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x!).Distinct().ToList();
    var profileIds = actorIds.Where(x => !x.StartsWith("guest:", StringComparison.OrdinalIgnoreCase)).ToList();
    var guestSessionIds = actorIds.Where(x => x.StartsWith("guest:", StringComparison.OrdinalIgnoreCase)).Select(x => x["guest:".Length..]).ToList();
    var names = await db.UserProfiles.AsNoTracking()
        .Where(x => profileIds.Contains(x.Id))
        .ToDictionaryAsync(x => x.Id, x => x.Name, ct);
    var guestNames = await db.SitePresences.AsNoTracking()
        .Where(x => guestSessionIds.Contains(x.SessionId))
        .ToDictionaryAsync(x => $"guest:{x.SessionId}", x => x.DisplayName, ct);

    var weekName = await db.Weeks.AsNoTracking().Where(x => x.Id == match.WeekId).Select(x => x.WeekName).FirstOrDefaultAsync(ct) ?? "Okänd vecka";

    return Results.Ok(new
    {
        match = new
        {
            match.Id,
            match.WeekId,
            weekName,
            match.TotalWords,
            match.ChallengerProfileId,
            challengerName = names.TryGetValue(match.ChallengerProfileId, out var cn) ? cn : (guestNames.TryGetValue(match.ChallengerProfileId, out var cgn) ? cgn : "Okänd"),
            match.OpponentProfileId,
            opponentName = names.TryGetValue(match.OpponentProfileId, out var on) ? on : (guestNames.TryGetValue(match.OpponentProfileId, out var ogn) ? ogn : "Okänd"),
            match.ChallengerHp,
            match.OpponentHp,
            match.ChallengerCorrect,
            match.OpponentCorrect,
            match.ChallengerDamageMultiplier,
            match.OpponentDamageMultiplier,
            match.Status,
            match.WinnerProfileId,
            createdUtc = match.CreatedUtc,
            prepEndsUtc = match.CreatedUtc.AddSeconds(10)
        }
    });
});

app.MapPost("/api/duel/{matchId}/action", async (string matchId, DuelActionRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var match = await db.DuelMatches.FirstOrDefaultAsync(x => x.Id == matchId, ct);
    if (match is null || match.Status != "Active")
    {
        return Results.NotFound(new { error = "Match hittades inte." });
    }

    var myId = actorId;
    var isChallenger = match.ChallengerProfileId == myId;
    var isOpponent = match.OpponentProfileId == myId;
    if (!isChallenger && !isOpponent)
    {
        return Results.Forbid();
    }

    var action = (request.Action ?? string.Empty).Trim().ToLowerInvariant();
    if (action != "correct" && action != "miss")
    {
        return Results.BadRequest(new { error = "Action must be correct or miss." });
    }

    if (action == "miss")
    {
        if (isChallenger)
        {
            match.ChallengerDamageMultiplier = Math.Min(3, match.ChallengerDamageMultiplier + 1);
        }
        else
        {
            match.OpponentDamageMultiplier = Math.Min(3, match.OpponentDamageMultiplier + 1);
        }
    }
    else
    {
        var baseDamage = 100.0 / Math.Max(1, match.TotalWords);
        if (isChallenger)
        {
            var dmg = baseDamage * Math.Max(1, match.ChallengerDamageMultiplier);
            match.ChallengerDamageMultiplier = 1;
            match.ChallengerCorrect = Math.Min(match.TotalWords, match.ChallengerCorrect + 1);
            var bothFinished = match.ChallengerCorrect >= match.TotalWords && match.OpponentCorrect >= match.TotalWords;
            match.OpponentHp = bothFinished ? Math.Max(0, match.OpponentHp - dmg) : Math.Max(1, match.OpponentHp - dmg);
        }
        else
        {
            var dmg = baseDamage * Math.Max(1, match.OpponentDamageMultiplier);
            match.OpponentDamageMultiplier = 1;
            match.OpponentCorrect = Math.Min(match.TotalWords, match.OpponentCorrect + 1);
            var bothFinished = match.ChallengerCorrect >= match.TotalWords && match.OpponentCorrect >= match.TotalWords;
            match.ChallengerHp = bothFinished ? Math.Max(0, match.ChallengerHp - dmg) : Math.Max(1, match.ChallengerHp - dmg);
        }
    }

    if (match.ChallengerHp <= 0 || match.OpponentHp <= 0)
    {
        match.Status = "Completed";
        match.CompletedUtc = DateTime.UtcNow;
        match.WinnerProfileId = match.ChallengerHp > 0 ? match.ChallengerProfileId : match.OpponentProfileId;
    }

    await db.SaveChangesAsync(ct);
    return Results.Ok(new
    {
        match = new
        {
            match.Id,
            match.WeekId,
            match.TotalWords,
            match.ChallengerProfileId,
            match.OpponentProfileId,
            match.ChallengerHp,
            match.OpponentHp,
            match.ChallengerCorrect,
            match.OpponentCorrect,
            match.ChallengerDamageMultiplier,
            match.OpponentDamageMultiplier,
            match.Status,
            match.WinnerProfileId,
            createdUtc = match.CreatedUtc,
            prepEndsUtc = match.CreatedUtc.AddSeconds(10)
        }
    });
});

app.MapPost("/api/groupfight/invites", async (CreateGroupFightInviteRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }

    var actorId = actor.Value.ActorId;
    var actorName = actor.Value.DisplayName;
    var weekId = (request.WeekId ?? string.Empty).Trim();
    if (string.IsNullOrWhiteSpace(weekId))
    {
        return Results.BadRequest(new { error = "WeekId is required." });
    }
    var week = await db.Weeks.AsNoTracking().FirstOrDefaultAsync(x => x.Id == weekId, ct);
    if (week is null)
    {
        return Results.NotFound(new { error = "Veckan finns inte." });
    }
    var answerLanguage = NormalizeAppLanguage(request.AnswerLanguage);
    var weekLanguage = NormalizeAppLanguage(week.Language);
    if (!string.Equals(answerLanguage, weekLanguage, StringComparison.OrdinalIgnoreCase))
    {
        return Results.BadRequest(new { error = "Veckans sprak maste matcha gruppfightens sprak." });
    }

    var invite = new GroupFightInvite
    {
        CreatorActorId = actorId,
        WeekId = weekId,
        AnswerLanguage = answerLanguage,
        Status = "Pending",
        CreatedUtc = DateTime.UtcNow
    };

    var members = new List<GroupFightInviteMember>
    {
        new()
        {
            InviteId = invite.Id,
            ActorId = actorId,
            DisplayName = actorName,
            Team = "A",
            IsCreator = true,
            IsBot = false,
            Status = "Accepted",
            RespondedUtc = DateTime.UtcNow
        }
    };

    static IEnumerable<GroupFightMemberRequest> SafeMembers(List<GroupFightMemberRequest>? list) => list ?? [];
    var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { actorId };
    foreach (var item in SafeMembers(request.TeamA))
    {
        var id = (item.ActorId ?? string.Empty).Trim();
        if (string.IsNullOrWhiteSpace(id) || !seen.Add(id))
        {
            continue;
        }
        members.Add(new GroupFightInviteMember
        {
            InviteId = invite.Id,
            ActorId = id,
            DisplayName = (item.DisplayName ?? id).Trim(),
            Team = "A",
            IsCreator = false,
            IsBot = item.IsBot || id.StartsWith("bot:", StringComparison.OrdinalIgnoreCase),
            Status = (item.IsBot || id.StartsWith("bot:", StringComparison.OrdinalIgnoreCase)) ? "Accepted" : "Pending"
        });
    }
    foreach (var item in SafeMembers(request.TeamB))
    {
        var id = (item.ActorId ?? string.Empty).Trim();
        if (string.IsNullOrWhiteSpace(id) || !seen.Add(id))
        {
            continue;
        }
        members.Add(new GroupFightInviteMember
        {
            InviteId = invite.Id,
            ActorId = id,
            DisplayName = (item.DisplayName ?? id).Trim(),
            Team = "B",
            IsCreator = false,
            IsBot = item.IsBot || id.StartsWith("bot:", StringComparison.OrdinalIgnoreCase),
            Status = (item.IsBot || id.StartsWith("bot:", StringComparison.OrdinalIgnoreCase)) ? "Accepted" : "Pending"
        });
    }

    db.GroupFightInvites.Add(invite);
    db.GroupFightInviteMembers.AddRange(members);

    var hasPendingHumans = members.Any(x => !x.IsBot && x.Status == "Pending");
    if (!hasPendingHumans)
    {
        invite.Status = "Active";
        invite.PrepEndsUtc = DateTime.UtcNow.AddSeconds(10);
    }

    await db.SaveChangesAsync(ct);

    return Results.Ok(new { inviteId = invite.Id });
});

app.MapGet("/api/groupfight/inbox", async (HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var inviteIds = await db.GroupFightInviteMembers.AsNoTracking()
        .Where(x => x.ActorId == actorId)
        .Join(
            db.GroupFightInvites.AsNoTracking().Where(i => i.Status == "Pending"),
            m => m.InviteId,
            i => i.Id,
            (m, i) => new { m.InviteId, m.Status, m.IsCreator })
        .Where(x => x.Status == "Pending" || x.IsCreator)
        .Select(x => x.InviteId)
        .Distinct()
        .ToListAsync(ct);

    if (inviteIds.Count == 0)
    {
        return Results.Ok(new { items = Array.Empty<object>() });
    }

    var invites = await db.GroupFightInvites.AsNoTracking()
        .Where(x => inviteIds.Contains(x.Id) && x.Status == "Pending")
        .OrderByDescending(x => x.CreatedUtc)
        .Take(10)
        .ToListAsync(ct);

    var inviteIdSet = invites.Select(x => x.Id).ToHashSet(StringComparer.OrdinalIgnoreCase);
    var members = await db.GroupFightInviteMembers.AsNoTracking()
        .Where(x => inviteIdSet.Contains(x.InviteId))
        .OrderBy(x => x.Team).ThenBy(x => x.DisplayName)
        .ToListAsync(ct);
    var weekIds = invites.Select(x => x.WeekId).Distinct().ToList();
    var weeks = await db.Weeks.AsNoTracking().Where(x => weekIds.Contains(x.Id)).ToDictionaryAsync(x => x.Id, x => x.WeekName, ct);

    var items = invites.Select(inv => new
    {
        inv.Id,
        inv.WeekId,
        weekName = weeks.TryGetValue(inv.WeekId, out var wn) ? wn : "Okänd vecka",
        answerLanguage = NormalizeAppLanguage(inv.AnswerLanguage),
        inv.CreatorActorId,
        inv.Status,
        inv.CreatedUtc,
        teamA = members.Where(m => m.InviteId == inv.Id && m.Team == "A").Select(m => new { m.ActorId, m.DisplayName, m.Status, m.IsBot }),
        teamB = members.Where(m => m.InviteId == inv.Id && m.Team == "B").Select(m => new { m.ActorId, m.DisplayName, m.Status, m.IsBot }),
    });
    return Results.Ok(new { items });
});

app.MapGet("/api/groupfight/current", async (HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var inviteId = await db.GroupFightInviteMembers.AsNoTracking()
        .Where(x => x.ActorId == actorId)
        .Join(db.GroupFightInvites.AsNoTracking().Where(x => x.Status == "Pending" || x.Status == "Active"),
            m => m.InviteId,
            i => i.Id,
            (m, i) => new { i.Id, i.CreatedUtc })
        .OrderByDescending(x => x.CreatedUtc)
        .Select(x => x.Id)
        .FirstOrDefaultAsync(ct);

    if (string.IsNullOrWhiteSpace(inviteId))
    {
        return Results.Ok(new { invite = (object?)null });
    }

    var invite = await db.GroupFightInvites.AsNoTracking().FirstOrDefaultAsync(x => x.Id == inviteId, ct);
    if (invite is null)
    {
        return Results.Ok(new { invite = (object?)null });
    }
    var members = await db.GroupFightInviteMembers.AsNoTracking()
        .Where(x => x.InviteId == invite.Id)
        .OrderBy(x => x.Team).ThenBy(x => x.DisplayName)
        .ToListAsync(ct);
    var weekName = await db.Weeks.AsNoTracking().Where(x => x.Id == invite.WeekId).Select(x => x.WeekName).FirstOrDefaultAsync(ct) ?? "Okänd vecka";
    var me = members.FirstOrDefault(x => x.ActorId == actorId);

    var prepUtc = invite.PrepEndsUtc.HasValue
        ? DateTime.SpecifyKind(invite.PrepEndsUtc.Value, DateTimeKind.Utc)
        : (DateTime?)null;
    var prepUnixMs = prepUtc.HasValue ? new DateTimeOffset(prepUtc.Value).ToUnixTimeMilliseconds() : (long?)null;

    return Results.Ok(new
    {
        invite = new
        {
            invite.Id,
            invite.WeekId,
            weekName,
            answerLanguage = NormalizeAppLanguage(invite.AnswerLanguage),
            invite.CreatorActorId,
            invite.Status,
            invite.CreatedUtc,
            prepEndsUtc = prepUtc,
            prepEndsUnixMs = prepUnixMs,
            myStatus = me?.Status ?? "Unknown",
            teamA = members.Where(m => m.Team == "A").Select(m => new { m.ActorId, m.DisplayName, m.Status, m.IsBot }),
            teamB = members.Where(m => m.Team == "B").Select(m => new { m.ActorId, m.DisplayName, m.Status, m.IsBot }),
        }
    });
});

app.MapPost("/api/groupfight/invites/{inviteId}/respond", async (string inviteId, RespondGroupFightInviteRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var invite = await db.GroupFightInvites.FirstOrDefaultAsync(x => x.Id == inviteId, ct);
    if (invite is null || (invite.Status != "Pending" && invite.Status != "Active"))
    {
        return Results.NotFound(new { error = "Inbjudan hittades inte." });
    }

    var member = await db.GroupFightInviteMembers.FirstOrDefaultAsync(x => x.InviteId == inviteId && x.ActorId == actorId, ct);
    if (member is null)
    {
        return Results.NotFound(new { error = "Du ar inte med i denna gruppfight." });
    }

    if (invite.Status == "Pending")
    {
        member.Status = request.Accept ? "Accepted" : "Declined";
        member.RespondedUtc = DateTime.UtcNow;
        if (!request.Accept)
        {
            invite.Status = "Cancelled";
            invite.CompletedUtc = DateTime.UtcNow;
            await db.SaveChangesAsync(ct);
        }
        else
        {
            // Persist my acceptance first, then evaluate remaining pending users.
            await db.SaveChangesAsync(ct);
            var pendingLeft = await db.GroupFightInviteMembers
                .Where(x => x.InviteId == inviteId && !x.IsBot && x.Status == "Pending")
                .AnyAsync(ct);
            if (!pendingLeft)
            {
                invite.Status = "Active";
                invite.PrepEndsUtc = DateTime.UtcNow.AddSeconds(10);
                await db.SaveChangesAsync(ct);
            }
        }
    }
    var prepUtc = invite.PrepEndsUtc.HasValue
        ? DateTime.SpecifyKind(invite.PrepEndsUtc.Value, DateTimeKind.Utc)
        : (DateTime?)null;
    var prepUnixMs = prepUtc.HasValue ? new DateTimeOffset(prepUtc.Value).ToUnixTimeMilliseconds() : (long?)null;
    return Results.Ok(new { ok = true, status = invite.Status, prepEndsUtc = prepUtc, prepEndsUnixMs = prepUnixMs });
});

app.MapPost("/api/groupfight/invites/{inviteId}/broadcast", async (string inviteId, GroupFightBroadcastRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var isMember = await db.GroupFightInviteMembers.AsNoTracking()
        .AnyAsync(x => x.InviteId == inviteId && x.ActorId == actorId, ct);
    if (!isMember)
    {
        return Results.Forbid();
    }

    var invite = await db.GroupFightInvites.AsNoTracking().FirstOrDefaultAsync(x => x.Id == inviteId, ct);
    if (invite is null || invite.Status != "Active")
    {
        return Results.BadRequest(new { error = "Gruppfight ar inte aktiv." });
    }

    var text = (request.Text ?? string.Empty).Trim();
    if (string.IsNullOrWhiteSpace(text))
    {
        return Results.BadRequest(new { error = "Text is required." });
    }
    if (text.Length > 300)
    {
        text = text[..300];
    }

    var team = string.Equals((request.Team ?? string.Empty).Trim(), "B", StringComparison.OrdinalIgnoreCase) ? "B" : "A";
    var row = new GroupFightEvent
    {
        InviteId = inviteId,
        ActorId = actorId,
        Team = team,
        IsGood = request.IsGood,
        Text = text,
        CreatedUtc = DateTime.UtcNow
    };
    db.GroupFightEvents.Add(row);
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { id = row.Id });
});

app.MapGet("/api/groupfight/invites/{inviteId}/events", async (string inviteId, long? sinceId, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    var actor = await ResolveChallengeActorAsync(httpContext, db, authService, ct);
    if (actor is null)
    {
        return Results.Unauthorized();
    }
    var actorId = actor.Value.ActorId;

    var isMember = await db.GroupFightInviteMembers.AsNoTracking()
        .AnyAsync(x => x.InviteId == inviteId && x.ActorId == actorId, ct);
    if (!isMember)
    {
        return Results.Forbid();
    }

    var last = Math.Max(0, sinceId ?? 0);
    var items = await db.GroupFightEvents.AsNoTracking()
        .Where(x => x.InviteId == inviteId && x.Id > last)
        .OrderBy(x => x.Id)
        .Take(80)
        .Select(x => new
        {
            x.Id,
            x.ActorId,
            x.Team,
            x.IsGood,
            x.Text,
            x.CreatedUtc
        })
        .ToListAsync(ct);

    return Results.Ok(new { items });
});

app.MapPost("/api/vocab/weeks/{weekId}/words", async (string weekId, WeekWordsUpdateRequest request, AppDbContext db, CancellationToken ct) =>
{
    if (request.Words is null || request.Words.Count == 0)
    {
        return Results.BadRequest(new { error = "Words are required." });
    }

    var week = await db.Weeks.Include(x => x.Words).FirstOrDefaultAsync(x => x.Id == weekId, ct);
    if (week is null)
    {
        return Results.NotFound(new { error = "Week not found." });
    }

    if (!string.IsNullOrWhiteSpace(request.WeekName))
    {
        week.WeekName = request.WeekName.Trim();
    }
    week.Language = string.IsNullOrWhiteSpace(request.Language)
        ? NormalizeAppLanguage(week.Language)
        : NormalizeAppLanguage(request.Language);

    db.Words.RemoveRange(week.Words);
    week.Words = request.Words
        .Where(x => !string.IsNullOrWhiteSpace(x.Sv) && !string.IsNullOrWhiteSpace(x.En))
        .Select(x => new WordRecord { WeekId = week.Id, Sv = x.Sv.Trim(), En = x.En.Trim() })
        .ToList();

    await db.SaveChangesAsync(ct);

    var weeks = await db.Weeks.AsNoTracking()
        .Include(x => x.Words)
        .OrderBy(x => x.WeekName)
        .Select(currentWeek => new VocabWeek
        {
            Id = currentWeek.Id,
            WeekName = currentWeek.WeekName,
            Language = string.IsNullOrWhiteSpace(currentWeek.Language) ? "english" : currentWeek.Language,
            Words = currentWeek.Words.OrderBy(x => x.Id).Select(word => new VocabWord { Sv = word.Sv, En = word.En }).ToList()
        })
        .ToListAsync(ct);

    return Results.Ok(new { weeks });
}).RequireAuthorization();

app.MapPost("/api/vocab/weeks", async (CreateWeekRequest request, AppDbContext db, CancellationToken ct) =>
{
    var weekName = (request.WeekName ?? string.Empty).Trim();
    var language = NormalizeAppLanguage(request.Language);
    if (string.IsNullOrWhiteSpace(weekName))
    {
        return Results.BadRequest(new { error = "WeekName is required." });
    }

    var words = request.Words ?? [];
    var week = new WeekRecord
    {
        WeekName = weekName,
        Language = language,
        Words = words
            .Where(x => !string.IsNullOrWhiteSpace(x.Sv) && !string.IsNullOrWhiteSpace(x.En))
            .Select(x => new WordRecord { Sv = x.Sv.Trim(), En = x.En.Trim() })
            .ToList()
    };

    db.Weeks.Add(week);
    await db.SaveChangesAsync(ct);

    return Results.Ok(new { weekId = week.Id });
}).RequireAuthorization();

app.MapDelete("/api/vocab/weeks/{weekId}", async (string weekId, AppDbContext db, CancellationToken ct) =>
{
    var week = await db.Weeks.FirstOrDefaultAsync(x => x.Id == weekId, ct);
    if (week is null)
    {
        return Results.NotFound(new { error = "Week not found." });
    }

    db.Weeks.Remove(week);
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { deleted = true });
}).RequireAuthorization();

app.MapPost("/api/vocab/progress", async (ProgressSaveRequest request, HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct) =>
{
    string? profileId = null;

    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);
    if (account?.UserProfileId is not null)
    {
        profileId = account.UserProfileId;
    }
    else
    {
        var guestSession = httpContext.Request.Headers["X-Guest-Session"].FirstOrDefault()?.Trim();
        var guestName = httpContext.Request.Headers["X-Guest-Name"].FirstOrDefault()?.Trim();
        if (string.IsNullOrWhiteSpace(guestSession) || string.IsNullOrWhiteSpace(guestName))
        {
            return Results.BadRequest(new { error = "Namn och session krävs." });
        }
        var presence = await db.SitePresences.FirstOrDefaultAsync(x => x.SessionId == guestSession, ct);
        if (presence?.UserProfileId is not null)
        {
            profileId = presence.UserProfileId;
            var existingProfile = await db.UserProfiles.FirstOrDefaultAsync(x => x.Id == profileId, ct);
            if (existingProfile is not null && existingProfile.Name != guestName)
            {
                existingProfile.Name = guestName;
            }
        }
        else
        {
            // Ensure unique name
            var uniqueName = guestName;
            if (await db.UserProfiles.AnyAsync(x => x.Name == uniqueName, ct))
            {
                for (int i = 2; i <= 99; i++)
                {
                    var candidate = $"{guestName}-{i}";
                    if (!await db.UserProfiles.AnyAsync(x => x.Name == candidate, ct))
                    {
                        uniqueName = candidate;
                        break;
                    }
                }
            }
            var profile = new UserProfile { Name = uniqueName };
            db.UserProfiles.Add(profile);
            await db.SaveChangesAsync(ct);
            profileId = profile.Id;
            if (presence is not null)
            {
                presence.UserProfileId = profileId;
            }
            else
            {
                db.SitePresences.Add(new SitePresence
                {
                    SessionId = guestSession,
                    DisplayName = guestName,
                    IsAuthenticated = false,
                    UserProfileId = profileId,
                    LastSeenUtc = DateTime.UtcNow
                });
            }
            await db.SaveChangesAsync(ct);
        }
    }

    if (string.IsNullOrWhiteSpace(profileId))
    {
        return Results.BadRequest(new { error = "Kunde inte identifiera användare." });
    }

    if (string.IsNullOrWhiteSpace(request.WeekId))
    {
        return Results.BadRequest(new { error = "WeekId is required." });
    }

    var week = await db.Weeks.AsNoTracking().Include(w => w.Words).FirstOrDefaultAsync(x => x.Id == request.WeekId, ct);
    if (week is null)
    {
        return Results.NotFound(new { error = "Week not found." });
    }

    var progress = await db.ProgressRecords.FirstOrDefaultAsync(x => x.UserProfileId == profileId && x.WeekId == request.WeekId, ct);
    if (progress is null)
    {
        progress = new ProgressRecord
        {
            UserProfileId = profileId,
            WeekId = request.WeekId
        };
        db.ProgressRecords.Add(progress);
    }

    var correctKeys = request.CorrectKeys ?? [];
    progress.CorrectKeysJson = JsonSerializer.Serialize(correctKeys);
    progress.LastUpdatedUtc = DateTime.UtcNow;

    // Check for 100% completion
    var totalWords = week.Words.Count;
    if (totalWords > 0 && correctKeys.Count >= totalWords)
    {
        progress.PerfectCount += 1;
    }

    if (!request.QuietSave)
    {
        db.Highscores.Add(new HighscoreRecord
        {
            WeekId = request.WeekId,
            UserProfileId = profileId,
            Score = request.Score,
            TimeSeconds = request.TimeSeconds,
            CreatedUtc = DateTime.UtcNow
        });
    }

    await db.SaveChangesAsync(ct);
    return Results.Ok(new { saved = true, perfectCount = progress.PerfectCount });
}).AllowAnonymous();

app.MapGet("/api/vocab/highscores", async (string? weekId, AppDbContext db, CancellationToken ct) =>
{
    var query = db.Highscores.AsNoTracking()
        .Include(x => x.UserProfile)
        .Include(x => x.Week)
        .AsQueryable();

    if (!string.IsNullOrWhiteSpace(weekId))
    {
        query = query.Where(x => x.WeekId == weekId);
    }

    var items = await query
        .OrderByDescending(x => x.Score)
        .ThenBy(x => x.TimeSeconds)
        .ThenByDescending(x => x.CreatedUtc)
        .Take(20)
        .Select(x => new
        {
            userName = x.UserProfile != null ? x.UserProfile.Name : "Okänd",
            weekName = x.Week != null ? x.Week.WeekName : "Okänd vecka",
            x.Score,
            x.TimeSeconds,
            x.CreatedUtc
        })
        .ToListAsync(ct);

    return Results.Ok(new { items });
});

app.MapGet("/api/vocab/leaderboard-correct", async (string? weekId, AppDbContext db, CancellationToken ct) =>
{
    var query = db.ProgressRecords.AsNoTracking().AsQueryable();
    if (!string.IsNullOrWhiteSpace(weekId))
    {
        query = query.Where(x => x.WeekId == weekId);
    }
    var rows = await query.ToListAsync(ct);
    var totalCorrectByUser = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
    foreach (var row in rows)
    {
        if (!totalCorrectByUser.ContainsKey(row.UserProfileId))
        {
            totalCorrectByUser[row.UserProfileId] = 0;
        }
        try
        {
            var keys = JsonSerializer.Deserialize<List<string>>(row.CorrectKeysJson ?? "[]") ?? [];
            totalCorrectByUser[row.UserProfileId] += keys.Count;
        }
        catch
        {
            // Ignore malformed rows.
        }
    }

    var winsQuery = db.DuelMatches.AsNoTracking()
        .Where(x => x.Status == "Completed" && x.WinnerProfileId != null);
    if (!string.IsNullOrWhiteSpace(weekId))
    {
        winsQuery = winsQuery.Where(x => x.WeekId == weekId);
    }
    var winsGrouped = await winsQuery
        .GroupBy(x => x.WinnerProfileId!)
        .Select(g => new { userProfileId = g.Key, matchWins = g.Count() })
        .ToListAsync(ct);
    var winsByUser = winsGrouped.ToDictionary(x => x.userProfileId, x => x.matchWins, StringComparer.OrdinalIgnoreCase);

    var allUserIds = totalCorrectByUser.Keys
        .Concat(winsByUser.Keys)
        .Distinct(StringComparer.OrdinalIgnoreCase)
        .ToList();

    var userProfileMap = await db.UserProfiles.AsNoTracking()
        .Where(x => allUserIds.Contains(x.Id))
        .ToDictionaryAsync(x => x.Id, x => x, StringComparer.OrdinalIgnoreCase, ct);

    var items = allUserIds
        .Select(id =>
        {
            userProfileMap.TryGetValue(id, out var profile);
            var name = profile?.Name ?? "Okänd";
            return new
            {
                userProfileId = id,
                userName = name,
                baseName = StripGuestSuffix(name),
                avatarUrl = profile?.AvatarUrl ?? "",
                totalCorrect = totalCorrectByUser.TryGetValue(id, out var correct) ? correct : 0,
                matchWins = winsByUser.TryGetValue(id, out var wins) ? wins : 0
            };
        })
        .GroupBy(x => x.baseName, StringComparer.OrdinalIgnoreCase)
        .Select(g =>
        {
            var best = g.OrderByDescending(x => x.totalCorrect).ThenByDescending(x => x.matchWins).First();
            return new
            {
                best.userProfileId,
                userName = g.Key,
                best.avatarUrl,
                totalCorrect = g.Sum(x => x.totalCorrect),
                matchWins = g.Sum(x => x.matchWins)
            };
        })
        .OrderByDescending(x => x.totalCorrect)
        .ThenByDescending(x => x.matchWins)
        .ThenBy(x => x.userName)
        .Take(30)
        .ToList();

    return Results.Ok(new { items });
});

app.MapGet("/api/vocab/week-stats", async (AppDbContext db, CancellationToken ct) =>
{
    var weeks = await db.Weeks.AsNoTracking().Include(w => w.Words).OrderBy(w => w.WeekName).ToListAsync(ct);
    var progressRows = await db.ProgressRecords.AsNoTracking().ToListAsync(ct);
    var userProfiles = await db.UserProfiles.AsNoTracking().ToDictionaryAsync(u => u.Id, u => u, StringComparer.OrdinalIgnoreCase, ct);

    var items = new List<object>();
    foreach (var week in weeks)
    {
        var totalWords = week.Words.Count;
        var weekProgress = progressRows.Where(p => p.WeekId == week.Id).ToList();
        var users = weekProgress.Select(p =>
        {
            int correctCount = 0;
            try
            {
                var keys = JsonSerializer.Deserialize<List<string>>(p.CorrectKeysJson ?? "[]") ?? [];
                correctCount = keys.Count;
            }
            catch { }

            var percent = totalWords > 0 ? Math.Round((double)correctCount / totalWords * 100, 0) : 0;
            userProfiles.TryGetValue(p.UserProfileId, out var profile);
            return new
            {
                userName = profile?.Name ?? "Okänd",
                avatarUrl = profile?.AvatarUrl ?? "",
                percent,
                correctCount,
                totalWords,
                perfectCount = p.PerfectCount
            };
        })
        .GroupBy(u => StripGuestSuffix(u.userName), StringComparer.OrdinalIgnoreCase)
        .Select(g => {
            var best = g.OrderByDescending(u => u.correctCount).ThenByDescending(u => u.perfectCount).First();
            // Use the base name (without suffix) as display name
            return new { userName = g.Key, best.avatarUrl, best.percent, best.correctCount, best.totalWords, best.perfectCount };
        })
        .OrderByDescending(u => u.percent)
        .ThenByDescending(u => u.perfectCount)
        .ToList<object>();

        items.Add(new
        {
            weekId = week.Id,
            weekName = week.WeekName,
            language = week.Language,
            totalWords,
            users
        });
    }
    return Results.Ok(new { items });
});

app.MapGet("/api/players", (IWebHostEnvironment env) =>
{
    var playersDir = Path.Combine(env.WebRootPath, "images", "players");
    if (!Directory.Exists(playersDir))
    {
        return Results.Ok(new { items = Array.Empty<object>() });
    }

    var allowedExtensions = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { ".gif", ".png", ".jpg", ".jpeg", ".webp" };
    var items = Directory.EnumerateFiles(playersDir)
        .Where(path => allowedExtensions.Contains(Path.GetExtension(path)))
        .OrderBy(path => Path.GetFileName(path), StringComparer.OrdinalIgnoreCase)
        .Select(path =>
        {
            var fileName = Path.GetFileName(path);
            return new
            {
                id = fileName,
                name = Path.GetFileNameWithoutExtension(fileName),
                url = $"/images/players/{Uri.EscapeDataString(fileName)}"
            };
        })
        .ToList();

    return Results.Ok(new { items });
});

app.MapGet("/api/admin/accounts", async (AppDbContext db, CancellationToken ct) =>
{
    var accounts = await db.LocalAuthUsers.AsNoTracking()
        .OrderBy(x => x.Username)
        .Select(x => new
        {
            x.Id,
            email = x.Username,
            displayName = x.Username,
            x.IsAdmin,
            x.UserProfileId,
            x.LastLoginUtc
        })
        .ToListAsync(ct);

    var profiles = await db.UserProfiles.AsNoTracking()
        .OrderBy(x => x.Name)
        .Select(x => new
        {
            x.Id,
            x.Name,
            isLinked = db.LocalAuthUsers.Any(a => a.UserProfileId == x.Id)
        })
        .ToListAsync(ct);

    return Results.Ok(new { accounts, profiles });
}).RequireAuthorization("AdminOnly");

app.MapPost("/api/admin/link-profile", async (AdminLinkProfileRequest request, AppDbContext db, CancellationToken ct) =>
{
    if (string.IsNullOrWhiteSpace(request.AppAccountId) || string.IsNullOrWhiteSpace(request.UserProfileId))
    {
        return Results.BadRequest(new { error = "AppAccountId and UserProfileId are required." });
    }

    var account = await db.LocalAuthUsers.FirstOrDefaultAsync(x => x.Id == request.AppAccountId, ct);
    if (account is null)
    {
        return Results.NotFound(new { error = "Account not found." });
    }

    var profile = await db.UserProfiles.FirstOrDefaultAsync(x => x.Id == request.UserProfileId, ct);
    if (profile is null)
    {
        return Results.NotFound(new { error = "Profile not found." });
    }

    var profileAlreadyLinked = await db.LocalAuthUsers.AnyAsync(x => x.UserProfileId == profile.Id && x.Id != account.Id, ct);
    if (profileAlreadyLinked)
    {
        return Results.BadRequest(new { error = "Profile is already linked to another account." });
    }

    account.UserProfileId = profile.Id;
    await db.SaveChangesAsync(ct);

    return Results.Ok(new { linked = true });
}).RequireAuthorization("AdminOnly");

app.MapPost("/api/vocab/ai-parse", async (AiParseRequest request, OpenAiVocabParser parser, CancellationToken ct) =>
{
    if (string.IsNullOrWhiteSpace(request.Text))
    {
        return Results.BadRequest(new { error = "Text is required." });
    }

    try
    {
        var result = await parser.ParseAsync(request, null, ct);
        return Results.Ok(new { detectedLanguage = result.DetectedLanguage, suggestedWeekName = result.SuggestedWeekName, words = result.Words });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

app.MapPost("/api/vocab/ai-parse-upload", async (HttpRequest httpRequest, OpenAiVocabParser parser, CancellationToken ct) =>
{
    if (!httpRequest.HasFormContentType)
    {
        return Results.BadRequest(new { error = "Multipart form-data required." });
    }

    var form = await httpRequest.ReadFormAsync(ct);
    var text = form["text"].ToString();
    var targetLanguage = NormalizeAppLanguage(form["targetLanguage"].ToString());
    var files = form.Files;

    if (string.IsNullOrWhiteSpace(text) && files.Count == 0)
    {
        return Results.BadRequest(new { error = "Add text or at least one file/image." });
    }

    try
    {
        var result = await parser.ParseAsync(new AiParseRequest
        {
            Text = text,
            TargetLanguage = targetLanguage
        }, files, ct);

        return Results.Ok(new
        {
            detectedLanguage = result.DetectedLanguage,
            suggestedWeekName = result.SuggestedWeekName,
            words = result.Words
        });
    }
    catch (Exception ex)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

app.Run();

static async Task<(string ActorId, string DisplayName)?> ResolveChallengeActorAsync(HttpContext httpContext, AppDbContext db, LocalAuthService authService, CancellationToken ct)
{
    var account = await authService.GetCurrentUserAsync(httpContext.User, ct);
    if (account?.UserProfileId is not null)
    {
        var name = account.UserProfile?.Name ?? account.Username;
        return (account.UserProfileId, name);
    }

    var guestSessionId = httpContext.Request.Headers["X-Guest-Session"].FirstOrDefault();
    var guestName = httpContext.Request.Headers["X-Guest-Name"].FirstOrDefault();
    if (string.IsNullOrWhiteSpace(guestSessionId))
    {
        return null;
    }

    var normalizedSession = guestSessionId.Trim();
    var cutoff = DateTime.UtcNow.AddMinutes(-10);
    var presence = await db.SitePresences.FirstOrDefaultAsync(x => x.SessionId == normalizedSession && x.LastSeenUtc >= cutoff, ct);
    if (presence is null)
    {
        return null;
    }

    if (!string.IsNullOrWhiteSpace(guestName) && !string.Equals(presence.DisplayName, guestName.Trim(), StringComparison.OrdinalIgnoreCase))
    {
        presence.DisplayName = guestName.Trim();
        await db.SaveChangesAsync(ct);
    }

    return ($"guest:{normalizedSession}", presence.DisplayName);
}

static string StripGuestSuffix(string name)
{
    var lastDash = name.LastIndexOf('-');
    if (lastDash > 0 && int.TryParse(name[(lastDash + 1)..], out _))
        return name[..lastDash];
    return name;
}

static string NormalizeAppLanguage(string? value)
{
    var normalized = (value ?? string.Empty).Trim().ToLowerInvariant();
    return normalized switch
    {
        "svenska" => "swedish",
        "engelska" => "english",
        "spanska" => "spanish",
        "tyska" => "german",
        "franska" => "french",
        "" => "english",
        _ => normalized
    };
}
