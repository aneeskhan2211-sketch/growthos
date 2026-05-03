import T "../types/growth-engine-ai";
import AT "../types/analytics-and-tracking";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {

  // ── Constants ─────────────────────────────────────────────────────────────

  let dayNs : Int = 86_400_000_000_000;
  let weekNs : Int = 604_800_000_000_000;
  let monthNs : Int = 2_592_000_000_000_000;

  // ── Default nudge variants ────────────────────────────────────────────────
  // 3 per segment (urgency, FOMO, reward)

  public let defaultNudgeVariants : [T.NudgeVariant] = [
    // LowActivity
    { variantId = "low_urgency";  variantType = #urgency; copyText = "Reply now — fast responses convert better.";        targetSegment = #LowActivity },
    { variantId = "low_fomo";     variantType = #fomo;    copyText = "12 high-quality leads are waiting. Act today.";     targetSegment = #LowActivity },
    { variantId = "low_reward";   variantType = #reward;  copyText = "You're on a streak — keep it going!";               targetSegment = #LowActivity },
    // Medium
    { variantId = "med_urgency";  variantType = #urgency; copyText = "Send 5 messages in 5 minutes. Close faster.";       targetSegment = #Medium },
    { variantId = "med_fomo";     variantType = #fomo;    copyText = "3 prospects may convert today. Don't miss them.";   targetSegment = #Medium },
    { variantId = "med_reward";   variantType = #reward;  copyText = "Good progress. Consistency builds enquiries.";      targetSegment = #Medium },
    // HighIntent
    { variantId = "hi_urgency";   variantType = #urgency; copyText = "Send proposal now — limited-time upgrade bonus.";   targetSegment = #HighIntent },
    { variantId = "hi_fomo";      variantType = #fomo;    copyText = "Leads active in your area right now.";              targetSegment = #HighIntent },
    { variantId = "hi_reward";    variantType = #reward;  copyText = "Nice — keep going. You're close to your first booking."; targetSegment = #HighIntent },
  ];

  // ── Helper: event type text ────────────────────────────────────────────────

  func eventTypeText(et : AT.AnalyticsEventType) : Text {
    switch (et) {
      case (#app_opened)            "app_opened";
      case (#onboarding_started)    "onboarding_started";
      case (#onboarding_completed)  "onboarding_completed";
      case (#niche_selected)        "niche_selected";
      case (#city_selected)         "city_selected";
      case (#get_clients_clicked)   "get_clients_clicked";
      case (#leads_generated)       "leads_generated";
      case (#pitch_sent)            "pitch_sent";
      case (#reply_received)        "reply_received";
      case (#proposal_created)      "proposal_created";
      case (#paywall_viewed)        "paywall_viewed";
      case (#plan_selected)         "plan_selected";
      case (#payment_started)       "payment_started";
      case (#payment_success)       "payment_success";
      case (#payment_failed)        "payment_failed";
      case (#feature_locked_clicked) "feature_locked_clicked";
      case (#user_churn_risk)       "user_churn_risk";
    };
  };

  func safeDiv(n : Nat, d : Nat) : Float {
    if (d == 0) 0.0
    else Float.div(n.toFloat(), d.toFloat()) * 100.0;
  };

  func testNameKey(tn : T.AbTestName) : Text {
    switch (tn) {
      case (#nudge_copy_ab)    "nudge_copy_ab";
      case (#paywall_timing_ab) "paywall_timing_ab";
    };
  };

  // ── Activity Scoring ───────────────────────────────────────────────────────

  public func computeActivityScore(
    userId : Text,
    events : List.List<AT.AnalyticsEvent>,
    nowNs : Int,
  ) : T.UserActivityScore {
    // Collect all events for this user
    let userEvents = events.filter(func(e) { e.userId == userId });

    // Find last pitch_sent, reply_received, proposal_created timestamps
    var lastMessageSentAt : ?Int = null;
    var lastReplyReceivedAt : ?Int = null;
    var lastProposalCreatedAt : ?Int = null;

    userEvents.forEach(func(e) {
      switch (e.eventType) {
        case (#pitch_sent) {
          switch (lastMessageSentAt) {
            case null { lastMessageSentAt := ?e.timestamp };
            case (?t)  { if (e.timestamp > t) lastMessageSentAt := ?e.timestamp };
          };
        };
        case (#reply_received) {
          switch (lastReplyReceivedAt) {
            case null { lastReplyReceivedAt := ?e.timestamp };
            case (?t)  { if (e.timestamp > t) lastReplyReceivedAt := ?e.timestamp };
          };
        };
        case (#proposal_created) {
          switch (lastProposalCreatedAt) {
            case null { lastProposalCreatedAt := ?e.timestamp };
            case (?t)  { if (e.timestamp > t) lastProposalCreatedAt := ?e.timestamp };
          };
        };
        case _ {};
      };
    });

    // Determine segment:
    // HighIntent: has reply_received OR proposal_created
    // LowActivity: last pitch_sent was > 3 days ago (or never sent)
    // Medium: everything else
    let segment : T.ActivitySegment = switch (lastReplyReceivedAt, lastProposalCreatedAt) {
      case (?_, _) #HighIntent;
      case (_, ?_) #HighIntent;
      case (null, null) {
        switch (lastMessageSentAt) {
          case null      #LowActivity;
          case (?t) {
            if (nowNs - t > 3 * dayNs) #LowActivity else #Medium;
          };
        };
      };
    };

    {
      userId;
      segment;
      lastMessageSentAt;
      lastReplyReceivedAt;
      lastProposalCreatedAt;
      computedAt = nowNs;
    };
  };

  // ── Nudge Variant Selection ────────────────────────────────────────────────

  public func selectBestNudgeVariant(
    segment : T.ActivitySegment,
    variants : [T.NudgeVariant],
    nudgeEvents : List.List<T.NudgeEvent>,
  ) : ?T.NudgeVariant {
    // Filter variants matching the segment
    let matching = variants.filter(func(v) { v.targetSegment == segment });
    if (matching.isEmpty()) return null;

    // Compute actionRatePct per variant, pick highest
    var bestVariant : ?T.NudgeVariant = null;
    var bestRate : Float = -1.0;

    matching.forEach(func(v) {
      let metrics = computeNudgeMetrics(nudgeEvents, v.variantId, v);
      if (metrics.actionRatePct > bestRate) {
        bestRate := metrics.actionRatePct;
        bestVariant := ?v;
      };
    });

    // Fallback: first matching variant if all rates are 0
    switch (bestVariant) {
      case null { if (matching.size() > 0) ?matching[0] else null };
      case v    { v };
    };
  };

  public func recordNudgeSent(
    nudgeEvents : List.List<T.NudgeEvent>,
    counters : T.NudgeCounters,
    userId : Text,
    variant : T.NudgeVariant,
    segment : T.ActivitySegment,
    nowNs : Int,
  ) : T.NudgeEvent {
    let id = counters.nextNudgeEventId;
    counters.nextNudgeEventId += 1;
    let evt : T.NudgeEvent = {
      id;
      userId;
      variantId  = variant.variantId;
      variantType = variant.variantType;
      segment;
      sentAt     = nowNs;
      openedAt   = null;
      actedOnAt  = null;
    };
    nudgeEvents.add(evt);
    evt;
  };

  public func markNudgeOpened(
    nudgeEvents : List.List<T.NudgeEvent>,
    nudgeEventId : Nat,
    nowNs : Int,
  ) : Bool {
    var found = false;
    nudgeEvents.mapInPlace(func(e) {
      if (e.id == nudgeEventId and e.openedAt == null) {
        found := true;
        { e with openedAt = ?nowNs };
      } else e;
    });
    found;
  };

  public func markNudgeActedOn(
    nudgeEvents : List.List<T.NudgeEvent>,
    nudgeEventId : Nat,
    nowNs : Int,
  ) : Bool {
    var found = false;
    nudgeEvents.mapInPlace(func(e) {
      if (e.id == nudgeEventId and e.actedOnAt == null) {
        found := true;
        { e with actedOnAt = ?nowNs };
      } else e;
    });
    found;
  };

  public func computeNudgeMetrics(
    nudgeEvents : List.List<T.NudgeEvent>,
    variantId : Text,
    variant : T.NudgeVariant,
  ) : T.NudgePerformanceMetrics {
    let relevant = nudgeEvents.filter(func(e) { e.variantId == variantId });
    let totalSent    = relevant.size();
    let totalOpened  = relevant.filter(func(e) { e.openedAt  != null }).size();
    let totalActedOn = relevant.filter(func(e) { e.actedOnAt != null }).size();
    let openRatePct    = safeDiv(totalOpened,  totalSent);
    let actionRatePct  = safeDiv(totalActedOn, totalSent);
    // conversionLiftPct: actionRate above a 10% baseline
    let conversionLiftPct = if (actionRatePct > 10.0) actionRatePct - 10.0 else 0.0;
    {
      variantId;
      variantType = variant.variantType;
      totalSent;
      totalOpened;
      totalActedOn;
      openRatePct;
      actionRatePct;
      conversionLiftPct;
    };
  };

  public func allNudgeMetrics(
    nudgeEvents : List.List<T.NudgeEvent>,
    variants : [T.NudgeVariant],
  ) : [T.NudgePerformanceMetrics] {
    variants.map<T.NudgeVariant, T.NudgePerformanceMetrics>(
      func(v) { computeNudgeMetrics(nudgeEvents, v.variantId, v) }
    );
  };

  // ── Pricing Recommendation ─────────────────────────────────────────────────

  public func offerForSegment(segment : T.ActivitySegment) : T.OfferType {
    switch (segment) {
      case (#LowActivity) #free_trial_2d;
      case (#Medium)      #bonus_credits;
      case (#HighIntent)  #limited_discount;
    };
  };

  func offerLabel(offer : T.OfferType) : Text {
    switch (offer) {
      case (#free_trial_2d)      "2-Day Free Trial — no card required";
      case (#bonus_credits)      "Bonus 100 Lead Credits on upgrade";
      case (#limited_discount)   "Limited-time 20% off — upgrade within 10 mins";
    };
  };

  public func buildPricingRecommendation(
    userId : Text,
    segment : T.ActivitySegment,
    currentPlan : Text,
    existingRec : ?T.PricingRecommendation,
    nowNs : Int,
  ) : T.PricingRecommendation {
    let offer = offerForSegment(segment);
    switch (existingRec) {
      case null {
        {
          userId;
          segment;
          currentPlan;
          recommendedOffer = offer;
          offerLabel       = offerLabel(offer);
          shownAt          = null;
          acceptedAt       = null;
          computedAt       = nowNs;
        };
      };
      case (?r) {
        // Re-compute offer and label; preserve shownAt / acceptedAt
        { r with
          segment;
          currentPlan;
          recommendedOffer = offer;
          offerLabel       = offerLabel(offer);
          computedAt       = nowNs;
        };
      };
    };
  };

  public func markOfferShown(
    rec : T.PricingRecommendation,
    nowNs : Int,
  ) : T.PricingRecommendation {
    { rec with shownAt = ?nowNs };
  };

  // ── Paywall Timing ─────────────────────────────────────────────────────────

  public func hasValueMoment(
    userId : Text,
    events : List.List<AT.AnalyticsEvent>,
  ) : Bool {
    events.any(func(e) {
      e.userId == userId and (e.eventType == #leads_generated or e.eventType == #reply_received)
    });
  };

  public func getOrInitPaywallState(
    paywallStates : Map.Map<Text, T.PaywallState>,
    userId : Text,
    abVariant : T.PaywallTimingVariant,
  ) : T.PaywallState {
    switch (paywallStates.get(userId)) {
      case (?s) s;
      case null {
        let s : T.PaywallState = {
          userId;
          hasExperiencedValueMoment = false;
          paywallShownAfterValue    = false;
          paywallShownAt            = null;
          abVariant;
        };
        paywallStates.add(userId, s);
        s;
      };
    };
  };

  public func recordPaywallShown(
    paywallStates : Map.Map<Text, T.PaywallState>,
    userId : Text,
    events : List.List<AT.AnalyticsEvent>,
    nowNs : Int,
  ) : T.PaywallState {
    let hasValue = hasValueMoment(userId, events);
    let existing = paywallStates.get(userId);
    let abVar : T.PaywallTimingVariant = switch (existing) {
      case (?s) s.abVariant;
      case null {
        // Deterministic assignment by userId hash
        let h = userId.size() % 2;
        if (h == 0) #immediate else #after_value_moment;
      };
    };
    let updated : T.PaywallState = {
      userId;
      hasExperiencedValueMoment = hasValue;
      paywallShownAfterValue    = hasValue;
      paywallShownAt            = ?nowNs;
      abVariant                 = abVar;
    };
    paywallStates.add(userId, updated);
    updated;
  };

  // ── A/B Test Logic ─────────────────────────────────────────────────────────

  public func assignAbVariant(
    testName : T.AbTestName,
    userId : Text,
    availableVariants : [Text],
  ) : Text {
    if (availableVariants.size() == 0) return "control";
    // Deterministic hash: combine testName key and userId text lengths
    let seed = userId.size() + testNameKey(testName).size();
    let idx = seed % availableVariants.size();
    availableVariants[idx];
  };

  func initAbResult(testName : T.AbTestName, nowNs : Int) : T.AbTestResult {
    let variants : [T.AbVariantStats] = switch (testName) {
      case (#nudge_copy_ab) [
        { variantId = "urgency"; impressions = 0; conversions = 0; conversionRatePct = 0.0 },
        { variantId = "fomo";    impressions = 0; conversions = 0; conversionRatePct = 0.0 },
        { variantId = "reward";  impressions = 0; conversions = 0; conversionRatePct = 0.0 },
      ];
      case (#paywall_timing_ab) [
        { variantId = "immediate";          impressions = 0; conversions = 0; conversionRatePct = 0.0 },
        { variantId = "after_value_moment"; impressions = 0; conversions = 0; conversionRatePct = 0.0 },
      ];
    };
    { testName; variants; winningVariant = null; isActive = true; lastResetAt = nowNs };
  };

  public func recordImpression(
    abResults : Map.Map<Text, T.AbTestResult>,
    testName : T.AbTestName,
    variantId : T.AbVariantId,
    nowNs : Int,
  ) {
    let key = testNameKey(testName);
    let existing = switch (abResults.get(key)) {
      case (?r) r;
      case null { initAbResult(testName, nowNs) };
    };
    let updated : T.AbTestResult = {
      existing with
      variants = existing.variants.map<T.AbVariantStats, T.AbVariantStats>(func(v) {
        if (v.variantId == variantId) {
          let imp = v.impressions + 1;
          { v with impressions = imp; conversionRatePct = safeDiv(v.conversions, imp) }
        } else v
      });
    };
    abResults.add(key, { updated with winningVariant = computeWinner(updated) });
  };

  public func recordConversion(
    abResults : Map.Map<Text, T.AbTestResult>,
    testName : T.AbTestName,
    variantId : T.AbVariantId,
    nowNs : Int,
  ) {
    let key = testNameKey(testName);
    let existing = switch (abResults.get(key)) {
      case (?r) r;
      case null { initAbResult(testName, nowNs) };
    };
    let updated : T.AbTestResult = {
      existing with
      variants = existing.variants.map<T.AbVariantStats, T.AbVariantStats>(func(v) {
        if (v.variantId == variantId) {
          let conv = v.conversions + 1;
          { v with conversions = conv; conversionRatePct = safeDiv(conv, v.impressions) }
        } else v
      });
    };
    abResults.add(key, { updated with winningVariant = computeWinner(updated) });
  };

  public func computeWinner(result : T.AbTestResult) : ?T.AbVariantId {
    // Find the variant with highest conversionRatePct (if > 100 impressions and 5% delta)
    let qualified = result.variants.filter(func(v) { v.impressions >= 100 });
    if (qualified.size() < 2) return null;

    // Find best and second-best rates
    var best : ?T.AbVariantStats = null;
    var secondRate : Float = 0.0;

    qualified.forEach(func(v) {
      switch (best) {
        case null { best := ?v };
        case (?b) {
          if (v.conversionRatePct > b.conversionRatePct) {
            secondRate := b.conversionRatePct;
            best := ?v;
          } else if (v.conversionRatePct > secondRate) {
            secondRate := v.conversionRatePct;
          };
        };
      };
    });

    switch (best) {
      case null null;
      case (?b) {
        if (b.conversionRatePct - secondRate > 5.0) ?b.variantId
        else null;
      };
    };
  };

  public func resetAbTest(
    abResults : Map.Map<Text, T.AbTestResult>,
    testName : T.AbTestName,
    nowNs : Int,
  ) {
    let key = testNameKey(testName);
    abResults.add(key, initAbResult(testName, nowNs));
  };

  // ── Growth Overview Metrics ────────────────────────────────────────────────

  public func computeGrowthOverview(
    events : List.List<AT.AnalyticsEvent>,
    nowNs : Int,
  ) : T.GrowthOverview {
    let dayStart  = nowNs - dayNs;
    let weekStart = nowNs - weekNs;
    let monthStart = nowNs - monthNs;

    // Distinct user sets for DAU/WAU/MAU
    let dauSet  = Map.empty<Text, Bool>();
    let wauSet  = Map.empty<Text, Bool>();
    let mauSet  = Map.empty<Text, Bool>();
    let signups7Set  = Map.empty<Text, Bool>();
    let signups30Set = Map.empty<Text, Bool>();
    var paidCount : Nat = 0;
    var totalSignups : Nat = 0;

    // For retention: track who was DAU, who signed up in D1/D7/D30 windows
    let signupTimestamps = Map.empty<Text, Int>(); // userId → first app_opened

    events.forEach(func(e) {
      // DAU: any event today
      if (e.timestamp >= dayStart)  dauSet.add(e.userId,  true);
      if (e.timestamp >= weekStart) wauSet.add(e.userId,  true);
      if (e.timestamp >= monthStart) mauSet.add(e.userId, true);

      // New signups = first app_opened
      if (e.eventType == #app_opened) {
        switch (signupTimestamps.get(e.userId)) {
          case null {
            signupTimestamps.add(e.userId, e.timestamp);
            if (e.timestamp >= weekStart)  signups7Set.add(e.userId,  true);
            if (e.timestamp >= monthStart) signups30Set.add(e.userId, true);
          };
          case (?t) {
            if (e.timestamp < t) {
              signupTimestamps.add(e.userId, e.timestamp);
            };
          };
        };
      };

      if (e.eventType == #payment_success) { paidCount += 1 };
    });

    totalSignups := signupTimestamps.size();

    let dau = dauSet.size();
    let wau = wauSet.size();
    let mau = mauSet.size();
    let newSignupsLast7  = signups7Set.size();
    let newSignupsLast30 = signups30Set.size();
    let freeToPaidConversionPct = safeDiv(paidCount, totalSignups);

    // MRR estimate: assume each paid user on Growth ₹299 plan
    let mrrEstimatedInr = paidCount * 299;

    // Retention: among users who signed up >1d/7d/30d ago, what % were seen again
    let d1Users   = Map.empty<Text, Bool>();
    let d7Users   = Map.empty<Text, Bool>();
    let d30Users  = Map.empty<Text, Bool>();
    var d1Base : Nat = 0;
    var d7Base : Nat = 0;
    var d30Base : Nat = 0;

    for ((uid, signupTs) in signupTimestamps.entries()) {
      let age = nowNs - signupTs;
      if (age >= dayNs)   d1Base  += 1;
      if (age >= weekNs)  d7Base  += 1;
      if (age >= monthNs) d30Base += 1;
    };

    events.forEach(func(e) {
      switch (signupTimestamps.get(e.userId)) {
        case null {};
        case (?signupTs) {
          let age = nowNs - signupTs;
          let gap = e.timestamp - signupTs;
          // D1 retention: seen after signup, within 2 days
          if (age >= dayNs and gap >= dayNs and gap < 2 * dayNs) d1Users.add(e.userId, true);
          // D7 retention: seen between day 7 and day 8
          if (age >= weekNs and gap >= weekNs and gap < weekNs + dayNs) d7Users.add(e.userId, true);
          // D30 retention: seen between day 30 and day 31
          if (age >= monthNs and gap >= monthNs and gap < monthNs + dayNs) d30Users.add(e.userId, true);
        };
      };
    });

    let retentionD1  = safeDiv(d1Users.size(),  d1Base);
    let retentionD7  = safeDiv(d7Users.size(),  d7Base);
    let retentionD30 = safeDiv(d30Users.size(), d30Base);

    {
      dau; wau; mau;
      newSignupsLast7;
      newSignupsLast30;
      freeToPaidConversionPct;
      mrrEstimatedInr;
      retentionD1;
      retentionD7;
      retentionD30;
      computedAt = nowNs;
    };
  };

  // ── User Journey Timeline ──────────────────────────────────────────────────

  public func getUserJourneyTimeline(
    userId : Text,
    events : List.List<AT.AnalyticsEvent>,
  ) : T.UserJourneyTimeline {
    let userEvents = events.filter(func(e) { e.userId == userId });

    // Sort by timestamp ascending
    let sorted = userEvents.sort(func(a : AT.AnalyticsEvent, b : AT.AnalyticsEvent) : { #less; #equal; #greater } {
      if (a.timestamp < b.timestamp)      #less
      else if (a.timestamp > b.timestamp) #greater
      else #equal
    });

    var prevTs : ?Int = null;
    let journeyEvents = sorted.map<AT.AnalyticsEvent, T.UserJourneyEvent>(func(e) {
      let gap : ?Int = switch (prevTs) {
        case null null;
        case (?t) {
          let diffNs = e.timestamp - t;
          // Convert ns to ms
          ?(diffNs / 1_000_000);
        };
      };
      prevTs := ?e.timestamp;
      {
        eventId        = e.id;
        eventType      = eventTypeText(e.eventType);
        timestamp      = e.timestamp;
        timeSincePrevMs = gap;
        metadata       = e.metadata;
      };
    });

    { userId; events = journeyEvents.toArray() };
  };

  // ── Cohort Retention ──────────────────────────────────────────────────────

  /// Simple ISO week key: "YYYY-WNN"
  func isoWeekKey(ts : Int) : Text {
    // Days since epoch (approximate, using 7-day weeks)
    let epochDays : Int = ts / (dayNs);
    // Week number (ISO weeks start Monday, approx)
    let weekNum : Int = (epochDays + 3) / 7; // offset to align to ~Monday
    let year : Int = 1970 + weekNum / 52;
    let week : Int = weekNum % 52 + 1;
    let yearText = year.toText();
    let weekText = if (week < 10) "0" # week.toText() else week.toText();
    yearText # "-W" # weekText;
  };

  public func getCohortRetention(
    events : List.List<AT.AnalyticsEvent>,
    nowNs : Int,
  ) : [T.CohortRetentionRow] {
    // Build signup timestamps map
    let signupTs = Map.empty<Text, Int>();
    events.forEach(func(e) {
      if (e.eventType == #app_opened) {
        switch (signupTs.get(e.userId)) {
          case null { signupTs.add(e.userId, e.timestamp) };
          case (?t) { if (e.timestamp < t) signupTs.add(e.userId, e.timestamp) };
        };
      };
    });

    // Group users by cohort week
    let cohortMap = Map.empty<Text, List.List<Text>>(); // week → user IDs
    for ((uid, ts) in signupTs.entries()) {
      let wk = isoWeekKey(ts);
      let lst = switch (cohortMap.get(wk)) {
        case null {
          let l = List.empty<Text>();
          cohortMap.add(wk, l);
          l;
        };
        case (?l) l;
      };
      lst.add(uid);
    };

    // Build retention rows — last 8 cohort weeks
    let rows = List.empty<T.CohortRetentionRow>();
    for ((wk, cohortUsers) in cohortMap.entries()) {
      let cohortSize = cohortUsers.size();
      if (cohortSize > 0) {
        // For each cohort user, check if they have events at D1/D7/D30
        var d1Retained : Nat = 0;
        var d7Retained : Nat = 0;
        var d30Retained : Nat = 0;

        cohortUsers.forEach(func(uid) {
          switch (signupTs.get(uid)) {
            case null {};
            case (?signup) {
              let d1Ts  = signup + dayNs;
              let d7Ts  = signup + weekNs;
              let d30Ts = signup + monthNs;
              let hasD1  = events.any(func(e) { e.userId == uid and e.timestamp >= d1Ts  and e.timestamp < d1Ts  + dayNs });
              let hasD7  = events.any(func(e) { e.userId == uid and e.timestamp >= d7Ts  and e.timestamp < d7Ts  + dayNs });
              let hasD30 = events.any(func(e) { e.userId == uid and e.timestamp >= d30Ts and e.timestamp < d30Ts + dayNs });
              if (hasD1)  d1Retained  += 1;
              if (hasD7)  d7Retained  += 1;
              if (hasD30) d30Retained += 1;
            };
          };
        });

        rows.add({
          cohortWeek     = wk;
          cohortSize;
          retentionD1Pct  = safeDiv(d1Retained,  cohortSize);
          retentionD7Pct  = safeDiv(d7Retained,  cohortSize);
          retentionD30Pct = safeDiv(d30Retained, cohortSize);
        });
      };
    };

    // Sort by cohort week descending, return last 8
    let sorted = rows.sort(func(a : T.CohortRetentionRow, b : T.CohortRetentionRow) : { #less; #equal; #greater } {
      Text.compare(b.cohortWeek, a.cohortWeek);
    });

    sorted.sliceToArray(0, 8);
  };

  // ── Event Drill-Down ──────────────────────────────────────────────────────

  public func getEventDrillDown(
    eventName : Text,
    events : List.List<AT.AnalyticsEvent>,
  ) : T.EventDrillDown {
    // Find all events matching eventName
    let targetEvents = events.filter(func(e) { eventTypeText(e.eventType) == eventName });
    let totalCount = targetEvents.size();

    if (totalCount == 0) {
      return { eventName; totalCount = 0; nextEventBreakdown = [] };
    };

    // For each target event, find the next event from the same user within 24h
    let nextMap = Map.empty<Text, Nat>();

    targetEvents.forEach(func(te) {
      // Find events from same user after this event within 24h
      let nextEvent = events.find(func(e) {
        e.userId == te.userId
        and e.timestamp > te.timestamp
        and e.timestamp <= te.timestamp + dayNs
        and e.id != te.id
      });
      switch (nextEvent) {
        case null {};
        case (?ne) {
          let key = eventTypeText(ne.eventType);
          let cur = switch (nextMap.get(key)) {
            case null 0;
            case (?n) n;
          };
          nextMap.add(key, cur + 1);
        };
      };
    });

    let breakdown = nextMap.toArray().map(
      func((name, cnt)) {
        (name, cnt, safeDiv(cnt, totalCount))
      }
    );

    // Sort by count descending
    let sorted = breakdown.sort(func(a : (Text, Nat, Float), b : (Text, Nat, Float)) : { #less; #equal; #greater } {
      if (b.1 > a.1) #less else if (b.1 < a.1) #greater else #equal
    });

    { eventName; totalCount; nextEventBreakdown = sorted };
  };

  // ── Real-Time Event Stream ─────────────────────────────────────────────────

  public func getRealTimeEventStream(
    events : List.List<AT.AnalyticsEvent>,
  ) : [T.LiveEventEntry] {
    let arr = events.toArray();

    // Sort by timestamp descending
    let sorted = arr.sort(func(a : AT.AnalyticsEvent, b : AT.AnalyticsEvent) : { #less; #equal; #greater } {
      if (b.timestamp > a.timestamp)      #less
      else if (b.timestamp < a.timestamp) #greater
      else #equal
    });

    // Take first 50 and map to LiveEventEntry
    let limit = if (sorted.size() < 50) sorted.size() else 50;
    sorted.sliceToArray(0, limit).map<AT.AnalyticsEvent, T.LiveEventEntry>(
      func(e) {
        {
          eventId   = e.id;
          userId    = e.userId;
          eventType = eventTypeText(e.eventType);
          timestamp = e.timestamp;
          metadata  = e.metadata;
        }
      }
    );
  };
};
