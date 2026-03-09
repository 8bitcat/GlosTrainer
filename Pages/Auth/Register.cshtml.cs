using GlosTrainer.Web.Models;
using GlosTrainer.Web.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GlosTrainer.Web.Pages.Auth;

public class RegisterModel : PageModel
{
    private readonly LocalAuthService _authService;

    public RegisterModel(LocalAuthService authService)
    {
        _authService = authService;
    }

    [BindProperty]
    public RegisterRequest Input { get; set; } = new();

    public string? ErrorMessage { get; set; }

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync(CancellationToken ct)
    {
        var result = await _authService.RegisterAsync(Input, ct);
        if (!result.Success || result.User is null)
        {
            ErrorMessage = result.Error ?? "Registrering misslyckades.";
            return Page();
        }

        var principal = await _authService.CreatePrincipalAsync(result.User, ct);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        return RedirectToPage("/Index");
    }
}