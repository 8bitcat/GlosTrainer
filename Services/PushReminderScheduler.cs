namespace GlosTrainer.Web.Services;

// Kör påminnelse-kollen var femte minut så länge appen är vaken.
// Shared hosting kan söva app-poolen — därför finns även /api/push/run-reminders
// som kan triggas utifrån (GitHub Actions-cron) och väcker appen samtidigt.
public sealed class PushReminderScheduler : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<PushReminderScheduler> _logger;

    public PushReminderScheduler(IServiceScopeFactory scopeFactory, ILogger<PushReminderScheduler> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        try
        {
            await Task.Delay(TimeSpan.FromSeconds(45), stoppingToken);
        }
        catch (OperationCanceledException)
        {
            return;
        }

        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(5));
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var push = scope.ServiceProvider.GetRequiredService<PushNotificationService>();
                await push.RunReminderCheckAsync(force: false, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Påminnelse-kollen misslyckades — försöker igen nästa varv.");
            }

            try
            {
                if (!await timer.WaitForNextTickAsync(stoppingToken))
                {
                    break;
                }
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }
    }
}
