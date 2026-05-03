import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import T "../types/viral-loop-and-niche";
import RT "../types/referral";
import AT "../types/analytics-and-tracking";
import Lib "../lib/viral-loop-and-niche";

mixin (
  socialProofFeed : List.List<T.SocialProofEntry>,
  challengeRecords : Map.Map<Text, T.WeeklyChallengeRecord>,
  milestoneClaims : List.List<T.MilestoneClaim>,
  auditLeads : List.List<T.AuditLead>,
  nicheFunnelEvents : List.List<T.NicheFunnelEvent>,
  viralLoopCounters : T.ViralLoopCounters,
  referrals : List.List<RT.ReferralRecord>,
  analyticsEvents : List.List<AT.AnalyticsEvent>,
  analyticsCounters : AT.AnalyticsCounters,
) {
  // ── Social Proof Feed ──────────────────────────────────────────────────────

  /// Record a social proof activity entry (e.g. leads generated, deal closed).
  public shared func recordSocialProofEntry(
    displayName : Text,
    city : Text,
    activityType : T.SocialProofActivityType,
    metricValue : Nat,
  ) : async T.SocialProofEntry {
    let nowNs = Time.now();
    Lib.recordSocialProofEntryAt(
      socialProofFeed,
      viralLoopCounters,
      displayName,
      city,
      activityType,
      metricValue,
      nowNs,
    );
  };

  /// Return up to 50 social proof entries from the last 24h, sorted newest first.
  public query func listRecentSocialProof() : async [T.SocialProofEntry] {
    let nowNs = Time.now();
    Lib.listRecentSocialProof(socialProofFeed, nowNs);
  };

  // ── Weekly Challenge & City Leaderboard ────────────────────────────────────

  /// Update the calling user's weekly challenge progress for the current ISO week.
  public shared ({ caller }) func updateChallengeProgress(
    displayName : Text,
    city : Text,
    isoWeek : Text,
    leadsToAdd : Nat,
  ) : async () {
    let userId = caller.toText();
    Lib.updateChallengeProgress(challengeRecords, userId, displayName, city, isoWeek, leadsToAdd);
    // Auto-record social proof if milestone reached
    let key = userId # ":" # isoWeek;
    switch (challengeRecords.get(key)) {
      case (?rec) {
        if (rec.leadsGenerated >= 10 and leadsToAdd > 0) {
          ignore Lib.recordSocialProofEntryAt(
            socialProofFeed, viralLoopCounters, displayName, city,
            #leads_generated, rec.leadsGenerated, Time.now(),
          );
        };
      };
      case null {};
    };
  };

  /// Return top-10 leaderboard for a city and ISO week.
  public query func getCityLeaderboard(city : Text, isoWeek : Text) : async [T.LeaderboardEntry] {
    Lib.getCityLeaderboard(challengeRecords, city, isoWeek);
  };

  /// Award end-of-week credits to the top 3 users for a city/week (admin call).
  public shared func awardWeeklyRewards(city : Text, isoWeek : Text) : async [(Text, Nat)] {
    Lib.awardWeeklyRewards(challengeRecords, city, isoWeek);
  };

  // ── Invite-to-Unlock Milestones ────────────────────────────────────────────

  /// Activate a milestone for the calling user (e.g. "pro_48h" after 3 invites).
  public shared ({ caller }) func activateMilestone(milestoneId : T.MilestoneId) : async Bool {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.activateMilestone(milestoneClaims, referrals, userId, milestoneId, nowNs);
  };

  /// Return the full list of milestones with status and progress for the calling user.
  public query ({ caller }) func getMilestoneStatus() : async [T.MilestoneInfo] {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.getMilestoneStatus(milestoneClaims, referrals, userId, nowNs);
  };

  // ── Audit Lead Form ────────────────────────────────────────────────────────

  /// Submit a Free Salon Growth Audit lead form. Simulates WhatsApp response on save.
  public shared func submitAuditLead(
    leadName : Text,
    phone : Text,
    salonType : Text,
    budgetRange : Text,
  ) : async T.AuditLead {
    let nowNs = Time.now();
    let lead = Lib.submitAuditLead(
      auditLeads, viralLoopCounters,
      leadName, phone, salonType, budgetRange, nowNs,
    );
    // Record funnel event
    Lib.recordNicheFunnelEvent(
      nicheFunnelEvents, viralLoopCounters,
      "anonymous", #form_submit, "salons", "mumbai", null, nowNs,
    );
    lead;
  };

  /// Admin: list all audit lead submissions.
  public query func listAuditLeads() : async [T.AuditLead] {
    Lib.listAuditLeads(auditLeads);
  };

  // ── Niche Funnel Events ────────────────────────────────────────────────────

  /// Record a niche funnel event (e.g. landing_view, form_submit, whatsapp_click).
  public shared func recordNicheFunnelEvent(
    userId : Text,
    eventType : T.NicheFunnelEventType,
    niche : Text,
    city : Text,
    metricValue : ?Nat,
  ) : async () {
    let nowNs = Time.now();
    Lib.recordNicheFunnelEvent(
      nicheFunnelEvents, viralLoopCounters,
      userId, eventType, niche, city, metricValue, nowNs,
    );
  };

  /// Return aggregated funnel event counts per type for a niche+city.
  public query func getNicheFunnelMetrics(niche : Text, city : Text) : async T.NicheFunnelMetrics {
    Lib.getNicheFunnelMetrics(nicheFunnelEvents, niche, city);
  };

  // ── Shareable Win ──────────────────────────────────────────────────────────

  /// Generate a shareable win card data for the calling user.
  public query ({ caller }) func generateShareableWin(
    displayName : Text,
    city : Text,
    isoWeek : Text,
    currentStreak : Nat,
  ) : async T.ShareableWin {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.generateShareableWin(
      challengeRecords, userId, displayName, city, isoWeek, currentStreak, nowNs,
    );
  };

  /// Log a share_clicked event for analytics.
  public shared ({ caller }) func recordShareClick(
    platform : Text,
    winType : Text,
  ) : async () {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.recordNicheFunnelEvent(
      nicheFunnelEvents, viralLoopCounters,
      userId, #share_clicked, "salons", "mumbai",
      null, nowNs,
    );
  };
};
