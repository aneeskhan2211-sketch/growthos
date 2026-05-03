import Common "common";

module {
  // ── Traffic Source Attribution ─────────────────────────────────────────────

  public type TrafficSource = {
    #referral;
    #organic;
    #direct;
    #ads;
  };

  public type TrafficSourceAttribution = {
    userId : Text;
    source : TrafficSource;
    referralCode : ?Text;
    signedUpAt : Common.Timestamp;
  };

  public type TrafficSourceBreakdown = {
    periodDays : Nat; // 30 or 90
    referralCount : Nat;
    organicCount : Nat;
    directCount : Nat;
    adsCount : Nat;
    referralPct : Float;
    organicPct : Float;
    directPct : Float;
    adsPct : Float;
  };

  // ── Challenge Participation ────────────────────────────────────────────────

  public type ChallengeParticipant = {
    userId : Text;
    displayName : Text;
    city : Text;
    isoWeek : Text;
    leadsCount : Nat;
    rank : Nat;
    joinedAt : Common.Timestamp;
    rewarded : Bool;
  };

  public type FinalizedChallengeResult = {
    userId : Text;
    displayName : Text;
    city : Text;
    isoWeek : Text;
    finalRank : Nat;
    creditsAwarded : Nat;
    badgeAwarded : Text; // "gold", "silver", "bronze", or "none"
  };

  // ── Invite-to-Unlock Feature Gating ───────────────────────────────────────

  public type GatedFeatureName = {
    #export_leads;
    #bulk_send;
    #advanced_analytics;
  };

  /// Per-user, per-feature unlock session record.
  public type FeatureUnlockSession = {
    userId : Text;
    featureName : GatedFeatureName;
    unlockedAt : Common.Timestamp;
    expiresAt : Common.Timestamp;
    usageCount : Nat;
  };

  public type FeatureUnlockCheck = {
    featureName : GatedFeatureName;
    isUnlocked : Bool;
    requiredInvites : Nat;
    currentInvites : Nat;
    usageCount : Nat;
    expiresAt : ?Common.Timestamp;
  };

  public type GatedFeatureAdminStat = {
    featureName : Text;
    activeUserCount : Nat;
    totalUsageCount : Nat;
  };

  // ── Nudge Performance Metrics ──────────────────────────────────────────────

  public type NudgeType = {
    #urgency;
    #fomo;
    #reward;
    #money_visibility;
  };

  public type UserSegment = {
    #LowActivity;
    #Medium;
    #HighIntent;
  };

  /// A single nudge delivery event.
  public type NudgeDelivery = {
    id : Nat;
    userId : Text;
    nudgeType : NudgeType;
    userSegment : UserSegment;
    sentAt : Common.Timestamp;
    actionTakenAt : ?Common.Timestamp; // null = no action taken
    converted : Bool; // true if user upgraded within 24h after nudge
  };

  public type NudgePerformanceStat = {
    nudgeType : NudgeType;
    userSegment : UserSegment;
    sentCount : Nat;
    actionCount : Nat;
    actionRatePct : Float;
    conversionLiftPct : Float; // vs control (no nudge) baseline
  };

  // ── Referral Attribution Funnel ────────────────────────────────────────────

  public type ReferralFunnelEventType = {
    #link_generated;
    #share_clicked;
    #landing_view;
    #signup_started;
    #signup_completed;
    #reward_claimed;
  };

  public type ReferralFunnelEvent = {
    id : Nat;
    userId : Text;
    eventType : ReferralFunnelEventType;
    referralCode : Text;
    platform : ?Text; // "whatsapp" | "instagram" | "linkedin" | null
    cardId : ?Text;
    timestamp : Common.Timestamp;
  };

  public type ReferralFunnelStep = {
    stepName : Text;
    count : Nat;
    conversionPct : Float; // from previous step
  };

  public type ReferralFunnelStats = {
    steps : [ReferralFunnelStep];
    totalLinksGenerated : Nat;
    totalRewardsClaimed : Nat;
  };

  // ── Counters ───────────────────────────────────────────────────────────────

  public type ViralGrowthTrackingCounters = {
    var nextNudgeDeliveryId : Nat;
    var nextReferralFunnelEventId : Nat;
  };
};
