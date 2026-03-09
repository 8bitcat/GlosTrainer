using GlosTrainer.Web.Models;
using GlosTrainer.Web.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GlosTrainer.Web.Pages.Auth;

public class LoginModel : PageModel
{
    private readonly LocalAuthService _authService;

    public LoginModel(LocalAuthService authService)
    {
        _authService = authService;
    }

    [BindProperty]
    public LoginRequest Input { get; set; } = new();

    [BindProperty(SupportsGet = true)]
    public string? ReturnUrl { get; set; }

    public string? ErrorMessage { get; set; }

    public void OnGet()
    {
    }

    public async Task<IActionResult> OnPostAsync(CancellationToken ct)
    {
        var user = await _authService.ValidateCredentialsAsync(Input, ct);
        if (user is null)
        {
            ErrorMessage = "Fel anvandarnamn eller losenord.";
            return Page();
        }

        var principal = await _authService.CreatePrincipalAsync(user, ct);
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

        if (!string.IsNullOrWhiteSpace(ReturnUrl) && Url.IsLocalUrl(ReturnUrl))
        {
            return Redirect(ReturnUrl);
        }

        return RedirectToPage("/Index");
    }
}