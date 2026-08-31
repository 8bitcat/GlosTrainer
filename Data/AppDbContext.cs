using GlosTrainer.Web.Models;
using Microsoft.EntityFrameworkCore;

namespace GlosTrainer.Web.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<AppAccount> AppAccounts => Set<AppAccount>();
    public DbSet<LocalAuthUser> LocalAuthUsers => Set<LocalAuthUser>();
    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public DbSet<WeekRecord> Weeks => Set<WeekRecord>();
    public DbSet<WordRecord> Words => Set<WordRecord>();
    public DbSet<HighscoreRecord> Highscores => Set<HighscoreRecord>();
    public DbSet<ProgressRecord> ProgressRecords => Set<ProgressRecord>();
    public DbSet<UserPreference> UserPreferences => Set<UserPreference>();
    public DbSet<NameDictionaryEntry> NameDictionaryEntries => Set<NameDictionaryEntry>();
    public DbSet<OnlinePresence> OnlinePresences => Set<OnlinePresence>();
    public DbSet<DuelChallenge> DuelChallenges => Set<DuelChallenge>();
    public DbSet<DuelMatch> DuelMatches => Set<DuelMatch>();
    public DbSet<GroupFightInvite> GroupFightInvites => Set<GroupFightInvite>();
    public DbSet<GroupFightInviteMember> GroupFightInviteMembers => Set<GroupFightInviteMember>();
    public DbSet<GroupFightEvent> GroupFightEvents => Set<GroupFightEvent>();
    public DbSet<SitePresence> SitePresences => Set<SitePresence>();
    public DbSet<PushSubscriptionRecord> PushSubscriptions => Set<PushSubscriptionRecord>();
    public DbSet<PushConfigRecord> PushConfigs => Set<PushConfigRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppAccount>()
            .HasIndex(x => new { x.Provider, x.ProviderSubject })
            .IsUnique();

        modelBuilder.Entity<AppAccount>()
            .HasOne(x => x.UserProfile)
            .WithOne(x => x.AppAccount)
            .HasForeignKey<AppAccount>(x => x.UserProfileId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<LocalAuthUser>()
            .HasIndex(x => x.NormalizedUsername)
            .IsUnique();

        modelBuilder.Entity<LocalAuthUser>()
            .Property(x => x.Username)
            .HasMaxLength(100);

        modelBuilder.Entity<LocalAuthUser>()
            .Property(x => x.NormalizedUsername)
            .HasMaxLength(100);

        modelBuilder.Entity<LocalAuthUser>()
            .HasOne(x => x.UserProfile)
            .WithOne(x => x.LocalAuthUser)
            .HasForeignKey<LocalAuthUser>(x => x.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserProfile>()
            .Property(x => x.Name)
            .HasMaxLength(200);

        modelBuilder.Entity<WeekRecord>()
            .Property(x => x.WeekName)
            .HasMaxLength(200);

        modelBuilder.Entity<WeekRecord>()
            .Property(x => x.Language)
            .HasMaxLength(40);

        modelBuilder.Entity<WordRecord>()
            .Property(x => x.Sv)
            .HasMaxLength(300);

        modelBuilder.Entity<WordRecord>()
            .Property(x => x.En)
            .HasMaxLength(300);

        modelBuilder.Entity<WordRecord>()
            .HasOne(x => x.Week)
            .WithMany(x => x.Words)
            .HasForeignKey(x => x.WeekId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<HighscoreRecord>()
            .HasOne(x => x.Week)
            .WithMany()
            .HasForeignKey(x => x.WeekId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<HighscoreRecord>()
            .HasOne(x => x.UserProfile)
            .WithMany(x => x.Highscores)
            .HasForeignKey(x => x.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProgressRecord>()
            .HasIndex(x => new { x.UserProfileId, x.WeekId })
            .IsUnique();

        modelBuilder.Entity<ProgressRecord>()
            .HasOne(x => x.Week)
            .WithMany()
            .HasForeignKey(x => x.WeekId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProgressRecord>()
            .HasOne(x => x.UserProfile)
            .WithMany(x => x.ProgressRecords)
            .HasForeignKey(x => x.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserPreference>()
            .HasKey(x => x.UserProfileId);

        modelBuilder.Entity<UserPreference>()
            .HasOne(x => x.UserProfile)
            .WithOne(x => x.Preference)
            .HasForeignKey<UserPreference>(x => x.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<NameDictionaryEntry>()
            .HasIndex(x => new { x.Category, x.Value })
            .IsUnique();

        modelBuilder.Entity<OnlinePresence>()
            .HasKey(x => x.UserProfileId);

        modelBuilder.Entity<OnlinePresence>()
            .HasOne(x => x.UserProfile)
            .WithMany(x => x.PresenceEntries)
            .HasForeignKey(x => x.UserProfileId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DuelChallenge>()
            .HasIndex(x => new { x.TargetProfileId, x.Status, x.CreatedUtc });

        modelBuilder.Entity<DuelMatch>()
            .HasIndex(x => new { x.Status, x.CreatedUtc });

        modelBuilder.Entity<GroupFightInvite>()
            .HasIndex(x => new { x.Status, x.CreatedUtc });

        modelBuilder.Entity<GroupFightInviteMember>()
            .HasIndex(x => new { x.ActorId, x.Status });

        modelBuilder.Entity<GroupFightInviteMember>()
            .HasIndex(x => new { x.InviteId, x.ActorId })
            .IsUnique();

        modelBuilder.Entity<GroupFightInviteMember>()
            .HasOne(x => x.Invite)
            .WithMany(x => x.Members)
            .HasForeignKey(x => x.InviteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<GroupFightEvent>()
            .HasIndex(x => new { x.InviteId, x.Id });

        modelBuilder.Entity<GroupFightEvent>()
            .HasOne(x => x.Invite)
            .WithMany()
            .HasForeignKey(x => x.InviteId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<SitePresence>()
            .HasKey(x => x.SessionId);

        modelBuilder.Entity<SitePresence>()
            .HasIndex(x => x.LastSeenUtc);

        modelBuilder.Entity<PushSubscriptionRecord>()
            .Property(x => x.DisplayName)
            .HasMaxLength(200);

        modelBuilder.Entity<PushSubscriptionRecord>()
            .Property(x => x.EndpointHash)
            .HasMaxLength(64);

        modelBuilder.Entity<PushSubscriptionRecord>()
            .Property(x => x.P256dh)
            .HasMaxLength(300);

        modelBuilder.Entity<PushSubscriptionRecord>()
            .Property(x => x.Auth)
            .HasMaxLength(150);

        modelBuilder.Entity<PushSubscriptionRecord>()
            .Property(x => x.UserAgent)
            .HasMaxLength(300);

        modelBuilder.Entity<PushSubscriptionRecord>()
            .HasIndex(x => x.EndpointHash)
            .IsUnique();

        modelBuilder.Entity<PushSubscriptionRecord>()
            .HasIndex(x => x.UserProfileId);

        modelBuilder.Entity<PushSubscriptionRecord>()
            .HasOne(x => x.UserProfile)
            .WithMany()
            .HasForeignKey(x => x.UserProfileId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<PushConfigRecord>()
            .Property(x => x.Id)
            .ValueGeneratedNever();
    }
}
