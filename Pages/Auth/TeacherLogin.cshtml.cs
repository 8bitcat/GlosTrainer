using GlosTrainer.Web.Models;
using GlosTrainer.Web.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GlosTrainer.Web.Pages.Auth;

public sealed class TeacherLoginModel : PageModel
{
    private readonly LocalAuthService _authService;
    private readonly IConfiguration _configuration;

    public TeacherLoginModel(LocalAuthService authService, IConfiguration configuration)
    {
        _authService = authService;
        _configuration = configuration;
    }

    [BindProperty]
    public TeacherQuickLoginRequest Input { get; set; } = new();

    public string? ErrorMessage { get; set; }

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync(CancellationToken ct)
    {
        var configuredCode = _configuration["Security:TeacherCode"];
        if (string.IsNullOrWhiteSpace(configuredCode))
        {
            ErrorMessage = "TeacherCode saknas i konfigurationen.";
            return Page();
        }

        if (!string.Equals(configuredCode.Trim(), Input.Code?.Trim(), StringComparison.Ordinal))
        {
            ErrorMessage = "Fel lararkod.";
            return Page();
        }

        var user = await _authService.EnsureTeacherQuickLoginAsync(ct);
        var principal = await _authService.CreatePrincipalAsync(user, ct);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        return RedirectToPage("/Teacher/Weeks");
    }
}
