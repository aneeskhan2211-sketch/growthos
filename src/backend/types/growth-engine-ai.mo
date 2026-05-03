module {
  // ── User Activity Segment ──────────────────────────────────────────────────

  /// Activity segment computed from recent event history.
  public type ActivitySegment = {
    #LowActivity;   // no message_sent in 3+ days
    #Medium;        // messaging but no reply or proposal yet
    #HighIntent;    // reply_received or close to proposal stage
  };

  public type UserActivityScore = {
    userId : Text;
    segment : ActivitySegment;
    lastMessageSentAt : ?Int;
    lastReplyReceivedAt : ?Int;
    lastProposalCreatedAt : ?Int;
    computedAt : Int;
  };

  // ── Nudge Variant ─────────────────────────────────────────────────────────

  public type NudgeVariantType = {
    #urgency;
    #fomo;
    #reward;
  };

  public type NudgeVariant = {
    variantId : Text;
    variantType : NudgeVariantType;
    copyText : Text;
    targetSegment : ActivitySegment;
  };

  /// Log record for every nudge delivered to a user.
  public type NudgeEvent = {
    id : Nat;
    userId : Text;
    variantId : Text;
    variantType : NudgeVariantType;
    segment : ActivitySegment;
    sentAt : Int;
    openedAt : ?Int;
    actedOnAt : ?Int;
  };

  /// Aggregate performance metrics for a single nudge variant.
  public type NudgePerformanceMetrics = {
    variantId : Text;
    variantType : NudgeVariantType;
    totalSent : Nat;
    totalOpened : Nat;
    totalActedOn : Nat;
    openRatePct : Float;
    actionRatePct : Float;
    conversionLiftPct : Float;
  };

  /// Counters for nudge event IDs.
  public type NudgeCounters = {
    var nextNudgeEventId : Nat;
  };

  // ── Pricing Recommendation ────────────────────────────────────────────────

  public type OfferType = {
    #free_trial_2d;     // LowActivity
    #bonus_credits;     // Medium
    #limited_discount;  // HighIntent
  };

  public type PricingRecommendation = {
    userId : Text;
    segment : ActivitySegment;
    currentPlan : Text;
    recommendedOffer : OfferType;
    offerLabel : Text;   // human-readable label shown in UI
    shownAt : ?Int;      // timestamp when offer was last displayed
    acceptedAt : ?Int;   // timestamp when user accepted
    computedAt : Int;
  };

  /// Admin view of a user row for segment-based pricing queries.
  public type UserPricingRow = {
    userId : Text;
    segment : ActivitySegment;
    currentPlan : Text;
    recommendedOffer : OfferType;
    offerLabel : Text;
    shownAt : ?Int;
  };

  // ── Paywall Timing ────────────────────────────────────────────────────────

  /// Per-user paywall timing state.
  public type PaywallState = {
    userId : Text;
    hasExperiencedValueMoment : Bool;  // lead_received OR reply_received happened
    paywallShownAfterValue : Bool;     // whether paywall was first shown post-value
    paywallShownAt : ?Int;
    abVariant : PaywallTimingVariant;
  };

  public type PaywallTimingVariant = {
    #immediate;           // show paywall regardless of value moment
    #after_value_moment;  // show paywall only after value moment
  };

  // ── A/B Test System ───────────────────────────────────────────────────────

  public type AbTestName = {
    #nudge_copy_ab;        // urgency vs fomo vs reward
    #paywall_timing_ab;    // immediate vs after_value_moment
  };

  public type AbVariantId = Text;  // e.g. "urgency", "fomo", "reward", "immediate", "after_value_moment"

  public type AbVariantStats = {
    variantId : AbVariantId;
    impressions : Nat;
    conversions : Nat;
    conversionRatePct : Float;
  };

  public type AbTestResult = {
    testName : AbTestName;
    variants : [AbVariantStats];
    winningVariant : ?AbVariantId;  // null if no winner yet
    isActive : Bool;
    lastResetAt : Int;
  };

  /// Per-user A/B assignment record.
  public type AbAssignment = {
    userId : Text;
    testName : AbTestName;
    assignedVariant : AbVariantId;
    assignedAt : Int;
  };

  // ── Growth Overview Metrics ───────────────────────────────────────────────

  public type GrowthOverview = {
    dau : Nat;            // unique users with app_opened today
    wau : Nat;            // unique users last 7 days
    mau : Nat;            // unique users last 30 days
    newSignupsLast7 : Nat;
    newSignupsLast30 : Nat;
    freeToPaidConversionPct : Float;
    mrrEstimatedInr : Nat; // estimated MRR in INR from plan upgrades
    retentionD1 : Float;
    retentionD7 : Float;
    retentionD30 : Float;
    computedAt : Int;
  };

  /// Single event entry in a user's journey timeline.
  public type UserJourneyEvent = {
    eventId : Nat;
    eventType : Text;
    timestamp : Int;
    timeSincePrevMs : ?Int;  // null for first event
    metadata : [(Text, Text)];
  };

  public type UserJourneyTimeline = {
    userId : Text;
    events : [UserJourneyEvent];
  };

  /// Cohort row: users who signed up in a given ISO week.
  public type CohortRetentionRow = {
    cohortWeek : Text;  // "YYYY-WW"
    cohortSize : Nat;
    retentionD1Pct : Float;
    retentionD7Pct : Float;
    retentionD30Pct : Float;
  };

  public type EventDrillDown = {
    eventName : Text;
    totalCount : Nat;
    nextEventBreakdown : [(Text, Nat, Float)]; // (next event name, count, pct)
  };

  /// Single event entry in the live admin event stream.
  public type LiveEventEntry = {
    eventId : Nat;
    userId : Text;
    eventType : Text;
    timestamp : Int;
    metadata : [(Text, Text)];
  };
};
