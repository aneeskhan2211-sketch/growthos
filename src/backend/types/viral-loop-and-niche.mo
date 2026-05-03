import Common "common";

module {
  // ── Social Proof Feed ──────────────────────────────────────────────────────

  public type SocialProofActivityType = {
    #leads_generated;
    #deal_closed;
    #pitches_sent;
    #referral_signup;
  };

  public type SocialProofEntry = {
    id : Nat;
    userDisplayName : Text;
    city : Text;
    activityType : SocialProofActivityType;
    metricValue : Nat;
    timestamp : Common.Timestamp;
  };

  // ── Weekly Challenge & Leaderboard ─────────────────────────────────────────

  public type ChallengeBadge = {
    #gold;
    #silver;
    #bronze;
    #none;
  };

  public type LeaderboardEntry = {
    rank : Nat;
    userId : Text;
    displayName : Text;
    city : Text;
    leadsCount : Nat;
    badge : ChallengeBadge;
  };

  /// Internal record tracking per-user weekly progress.
  public type WeeklyChallengeRecord = {
    userId : Text;
    displayName : Text;
    city : Text;
    isoWeek : Text;
    leadsGenerated : Nat;
    rewardClaimed : Bool;
  };

  // ── Invite-to-Unlock Milestones ────────────────────────────────────────────

  public type MilestoneId = Text; // e.g. "pro_48h", "auto_followups_7d", "agency_7d"

  public type MilestoneStatus = {
    #locked;
    #unlocked;
    #claimed;
  };

  public type MilestoneInfo = {
    milestoneId : MilestoneId;
    title : Text;
    description : Text;
    inviteThreshold : Nat;
    status : MilestoneStatus;
    currentInvites : Nat;
    activatedAt : ?Common.Timestamp;
    expiresAt : ?Common.Timestamp;
  };

  /// Persisted per-user milestone claim record.
  public type MilestoneClaim = {
    userId : Text;
    milestoneId : MilestoneId;
    activatedAt : Common.Timestamp;
    expiresAt : Common.Timestamp;
  };

  // ── Audit Lead Form ────────────────────────────────────────────────────────

  public type AuditLead = {
    id : Nat;
    leadName : Text;
    phone : Text;
    salonType : Text;
    budgetRange : Text;
    niche : Text; // always "salons"
    city : Text;  // always "mumbai"
    submittedAt : Common.Timestamp;
    whatsappSentAt : ?Common.Timestamp;
  };

  // ── Niche Funnel Events ────────────────────────────────────────────────────

  public type NicheFunnelEventType = {
    #landing_view;
    #form_submit;
    #whatsapp_sent;
    #whatsapp_click;
    #audit_sent;
    #call_booked;
    #share_clicked;
  };

  public type NicheFunnelEvent = {
    id : Nat;
    userId : Text;
    eventType : NicheFunnelEventType;
    niche : Text;
    city : Text;
    metricValue : ?Nat;
    timestamp : Common.Timestamp;
  };

  public type NicheFunnelMetrics = {
    niche : Text;
    city : Text;
    counts : [(Text, Nat)]; // event type name → count
  };

  // ── Shareable Win ──────────────────────────────────────────────────────────

  public type ShareWinType = {
    #leads;
    #deal;
    #streak;
  };

  public type ShareableWin = {
    winType : ShareWinType;
    metricValue : Nat;
    displayName : Text;
    city : Text;
    date : Text; // ISO date string, e.g. "2026-05-01"
  };

  // ── Counters ───────────────────────────────────────────────────────────────

  public type ViralLoopCounters = {
    var nextSocialProofId : Nat;
    var nextAuditLeadId : Nat;
    var nextNicheFunnelEventId : Nat;
  };
};
