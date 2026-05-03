import Common "common";

module {
  public type PlanTier = Common.PlanTier;

  public type AnalyticsEventType = {
    #app_opened;
    #onboarding_started;
    #onboarding_completed;
    #niche_selected;
    #city_selected;
    #get_clients_clicked;
    #leads_generated;
    #pitch_sent;
    #reply_received;
    #proposal_created;
    #paywall_viewed;
    #plan_selected;
    #payment_started;
    #payment_success;
    #payment_failed;
    #feature_locked_clicked;
    #user_churn_risk;
  };

  public type AnalyticsEvent = {
    id : Nat;
    userId : Text;
    eventType : AnalyticsEventType;
    timestamp : Int;
    metadata : [(Text, Text)];
  };

  public type HeatmapEventKind = {
    #tap;
    #rageTap;
    #deadClick;
    #scrollDepth;
    #screenTime;
  };

  public type HeatmapEvent = {
    id : Nat;
    userId : Text;
    screenName : Text;
    elementId : Text;
    eventKind : HeatmapEventKind;
    timestamp : Int;
    scrollDepth : Nat;
    timeSpentMs : Nat;
  };

  public type FunnelStep = {
    stepName : Text;
    count : Nat;
    conversionRate : Float;
    dropOffRate : Float;
  };

  public type FunnelMetrics = {
    steps : [FunnelStep];
    freeToPaidConversion : Float;
    totalUsers : Nat;
    paidUsers : Nat;
  };

  public type ChurnRisk = {
    #none;
    #medium;
    #high;
  };

  public type RetentionData = {
    userId : Text;
    lastActiveDate : Text;
    currentStreak : Nat;
    longestStreak : Nat;
    weeklyLeadsGenerated : Nat;
    weeklyRepliesReceived : Nat;
    weeklyProposalsSent : Nat;
    creditsEarned : Nat;
    lastCreditClaim : Int;
    lastSessionAt : Int;
    churnRisk : ChurnRisk;
  };

  public type AnalyticsCounters = {
    var nextEventId : Nat;
    var nextHeatmapId : Nat;
  };

  // ---------------------------------------------------------------------------
  // Subscription events — track plan purchases, upgrades, downgrades, cancels
  // ---------------------------------------------------------------------------

  public type SubscriptionEventKind = {
    #plan_purchased;
    #plan_upgraded;
    #plan_cancelled;
    #plan_downgraded;
  };

  /// A subscription lifecycle event.
  /// amountRs: the ₹ amount of the new plan.
  /// prevPlanTier / prevAmountRs: populated for upgrades and downgrades.
  public type SubscriptionEvent = {
    id : Nat;
    userId : Principal;
    eventKind : SubscriptionEventKind;
    planTier : PlanTier;
    amountRs : Nat;
    prevPlanTier : ?PlanTier;
    prevAmountRs : ?Nat;
    timestamp : Nat;
  };

  // ---------------------------------------------------------------------------
  // Marketing spend — used for CAC calculation
  // ---------------------------------------------------------------------------

  public type SpendChannel = {
    #googleAds;
    #metaAds;
    #referral;
    #other;
  };

  /// A monthly marketing spend entry per channel, recorded by an admin.
  /// amountRs: spend in Indian Rupees (₹) for the given month.
  public type MarketingSpend = {
    id : Nat;
    month : Text;
    channel : SpendChannel;
    amountRs : Nat;
    recordedBy : Principal;
    timestamp : Nat;
  };

  // ---------------------------------------------------------------------------
  // Health status — used for LTV:CAC indicator
  // ---------------------------------------------------------------------------

  /// healthy = LTV:CAC ≥ 3×, moderate = 1–3×, loss = < 1×
  public type HealthStatus = {
    #healthy;
    #moderate;
    #loss;
  };

  // ---------------------------------------------------------------------------
  // Alert system
  // ---------------------------------------------------------------------------

  public type AlertSeverity = {
    #critical;
    #warning;
    #info;
  };

  /// A health alert fired when a metric crosses its threshold.
  /// threshold and actual are human-readable strings for display.
  public type HealthAlert = {
    alertId : Text;
    alert : Text;
    severity : AlertSeverity;
    metric : Text;
    threshold : Text;
    actual : Text;
    timestamp : Nat;
  };

  // ---------------------------------------------------------------------------
  // Unit economics — CAC and LTV breakdowns
  // ---------------------------------------------------------------------------

  /// CAC breakdown by marketing channel.
  /// cac = totalSpend ÷ newPaidCustomers (₹ per acquired customer)
  public type CacBreakdown = {
    googleAds : Nat;
    metaAds : Nat;
    referral : Nat;
    other : Nat;
    totalSpend : Nat;
    newPaidCustomers : Nat;
    cac : Nat;
  };

  /// LTV for a single plan tier.
  /// ltv = amountRs × avgRetentionMonths
  public type TierLtv = {
    tier : PlanTier;
    amountRs : Nat;
    avgRetentionMonths : Float;
    ltv : Nat;
    userCount : Nat;
  };

  /// LTV breakdown: per-tier details plus a weighted blended LTV across all tiers.
  public type LtvBreakdown = {
    byTier : [TierLtv];
    blendedLtv : Nat;
  };

  // ---------------------------------------------------------------------------
  // Top-level SaaS metrics response
  // ---------------------------------------------------------------------------

  /// Full investor-grade SaaS metrics snapshot for a given date range.
  /// All monetary values are in Indian Rupees (₹).
  ///
  /// MRR waterfall: closingMrr = openingMrr + newMrr + expansionMrr − churnedMrr
  /// NRR (Net Revenue Retention): (openingMrr + expansionMrr − churnedMrr) ÷ openingMrr
  /// LTV:CAC status: healthy ≥ 3×, weak 1–3×, loss < 1×
  /// CAC payback = cacByChannel.cac ÷ (mrr ÷ totalPayingCustomers)
  public type SaasMetricsResponse = {
    mrr : Nat;
    arr : Nat;
    newMrr : Nat;
    expansionMrr : Nat;
    churnedMrr : Nat;
    closingMrr : Nat;
    nrr : Float;
    totalPayingCustomers : Nat;
    newCustomers : Nat;
    churnedCustomers : Nat;
    activeUsers : Nat;
    monthlyChurnRate : Float;
    revenueChurnRate : Float;
    monthlyGrowthRate : Float;
    cacByChannel : CacBreakdown;
    ltv : LtvBreakdown;
    ltvCacRatio : Float;
    ltvCacStatus : HealthStatus;
    cacPaybackMonths : Float;
    dateRange : { from : Nat; to : Nat };
  };

  // ---------------------------------------------------------------------------
  // Retention cohorts
  // ---------------------------------------------------------------------------

  /// Retention cohort row for a signup week/month cohort.
  /// d1/d7/d30/d60: float retention rates (0.0–1.0); retainedDN: absolute counts.
  public type CohortRetentionRow = {
    week : Text;
    cohortSize : Nat;
    d1 : Float;
    d7 : Float;
    d30 : Float;
    d60 : Float;
    retainedD1 : Nat;
    retainedD7 : Nat;
    retainedD30 : Nat;
    retainedD60 : Nat;
  };

  // ---------------------------------------------------------------------------
  // AI optimizer supporting types
  // ---------------------------------------------------------------------------

  public type Segment = {
    #LowActivity;
    #Medium;
    #HighIntent;
  };

  /// Snapshot of how users are distributed across scoring segments.
  /// excludedChurned: users excluded from scoring because they already churned.
  public type UserSegmentDistribution = {
    lowActivity : Nat;
    mediumActivity : Nat;
    highIntent : Nat;
    totalScored : Nat;
    excludedChurned : Nat;
    scoredAt : Nat;
  };

  /// Performance row for a single nudge variant in an A/B experiment.
  /// openRate = opened ÷ sent; conversionRate = actionTaken ÷ sent.
  public type NudgePerformanceRow = {
    variantId : Text;
    segment : Segment;
    copyType : Text;
    sent : Nat;
    opened : Nat;
    openRate : Float;
    actionTaken : Nat;
    conversionRate : Float;
    isWinner : Bool;
  };

  // ---------------------------------------------------------------------------
  // Enhanced funnel metrics
  // ---------------------------------------------------------------------------

  /// A single step in the enhanced funnel with timing data.
  /// avgSecondsToNextStep: null if this is the last step or not yet measurable.
  public type FunnelStepDetail = {
    step : Text;
    users : Nat;
    conversions : Nat;
    dropoffPercent : Float;
    avgSecondsToNextStep : ?Nat;
  };

  /// Extended funnel metrics with per-step timing and payment velocity.
  /// avgDaysToFirstPayment: null if no paying users in the window.
  public type EnhancedFunnelMetrics = {
    steps : [FunnelStepDetail];
    freeToPaidConversion : Float;
    totalUsers : Nat;
    paidUsers : Nat;
    avgDaysToFirstPayment : ?Float;
  };

  // ---------------------------------------------------------------------------
  // Churn risk per-user row
  // ---------------------------------------------------------------------------

  /// A single user's churn risk assessment.
  /// openPlanRevenue: monthly ₹ value of their current plan.
  public type UserChurnRiskRow = {
    userId : Principal;
    risk : ChurnRisk;
    daysSinceLastAction : Nat;
    lastEventType : Text;
    openPlan : PlanTier;
    openPlanRevenue : Nat;
  };
};
