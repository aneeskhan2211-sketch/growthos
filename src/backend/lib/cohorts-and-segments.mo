import AT "../types/analytics-and-tracking";
import Common "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {

  // ── Constants ───────────────────────────────────────────────────────────────

  /// Nanoseconds per second
  let secNs  : Nat = 1_000_000_000;
  /// Nanoseconds per day
  let dayNs  : Nat = 86_400_000_000_000;
  /// Nanoseconds per week
  let weekNs : Nat = 604_800_000_000_000;

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /// Safe float rate (result in [0.0, 1.0]). Returns 0.0 when denominator is 0.
  func safeRate(numerator : Nat, denominator : Nat) : Float {
    if (denominator == 0) 0.0
    else Float.div(numerator.toFloat(), denominator.toFloat());
  };

  /// Convert Int nanosecond timestamp to Nat (pre-epoch clamped to 0).
  func tsToNat(ts : Int) : Nat {
    if (ts <= 0) 0 else ts.toNat();
  };

  /// Compute "YYYY-WNN" ISO week key from a Nat nanosecond timestamp.
  func isoWeekKey(tsNat : Nat) : Text {
    let totalDays = tsNat / dayNs;
    // Unix epoch (1970-01-01) was a Thursday; +3 aligns weeks to start on Monday
    let isoWeekNum = (totalDays + 3) / 7;
    let year : Nat = 1970 + isoWeekNum / 52;
    let week : Nat = isoWeekNum % 52 + 1;
    let weekText = if (week < 10) "0" # week.toText() else week.toText();
    year.toText() # "-W" # weekText;
  };

  /// Build a map of userId (Text) → earliest timestamp (Nat) from signup-qualifying events.
  /// Qualifying event types: app_opened, onboarding_started.
  func buildSignupMap(analyticsEvents : [AT.AnalyticsEvent]) : Map.Map<Text, Nat> {
    let m = Map.empty<Text, Nat>();
    for (e in analyticsEvents.vals()) {
      switch (e.eventType) {
        case (#app_opened or #onboarding_started) {
          let tsNat = tsToNat(e.timestamp);
          switch (m.get(e.userId)) {
            case null { m.add(e.userId, tsNat) };
            case (?existing) {
              if (tsNat < existing) m.add(e.userId, tsNat);
            };
          };
        };
        case _ {};
      };
    };
    m;
  };

  /// Build a map of userId (Principal.toText()) → most recent SubscriptionEvent.
  func buildLastSubMap(subscriptionEvents : [AT.SubscriptionEvent]) : Map.Map<Text, AT.SubscriptionEvent> {
    let m = Map.empty<Text, AT.SubscriptionEvent>();
    for (se in subscriptionEvents.vals()) {
      let uid = se.userId.toText();
      switch (m.get(uid)) {
        case null { m.add(uid, se) };
        case (?existing) {
          if (se.timestamp > existing.timestamp) m.add(uid, se);
        };
      };
    };
    m;
  };

  // ── AT.Segment helpers ───────────────────────────────────────────────────────

  func segKey(seg : AT.Segment) : Text {
    switch (seg) {
      case (#LowActivity) "LowActivity";
      case (#Medium)      "Medium";
      case (#HighIntent)  "HighIntent";
    };
  };

  func textToSegment(t : Text) : AT.Segment {
    if (t == "HighIntent") #HighIntent
    else if (t == "Medium") #Medium
    else #LowActivity;
  };

  // ── Event type → Text ────────────────────────────────────────────────────────

  func eventTypeText(et : AT.AnalyticsEventType) : Text {
    switch (et) {
      case (#app_opened)             "app_opened";
      case (#onboarding_started)     "onboarding_started";
      case (#onboarding_completed)   "onboarding_completed";
      case (#niche_selected)         "niche_selected";
      case (#city_selected)          "city_selected";
      case (#get_clients_clicked)    "get_clients_clicked";
      case (#leads_generated)        "leads_generated";
      case (#pitch_sent)             "pitch_sent";
      case (#reply_received)         "reply_received";
      case (#proposal_created)       "proposal_created";
      case (#paywall_viewed)         "paywall_viewed";
      case (#plan_selected)          "plan_selected";
      case (#payment_started)        "payment_started";
      case (#payment_success)        "payment_success";
      case (#payment_failed)         "payment_failed";
      case (#feature_locked_clicked) "feature_locked_clicked";
      case (#user_churn_risk)        "user_churn_risk";
    };
  };

  // ── Public adapter types ─────────────────────────────────────────────────────

  /// Flattened nudge event view passed from the mixin. Avoids importing
  /// growth-engine-ai types into this module.
  public type NudgeEventPublic = {
    variantId  : Text;
    /// Segment label: "LowActivity" | "Medium" | "HighIntent"
    segmentKey : Text;
    copyType   : Text;
    wasOpened  : Bool;
    wasActedOn : Bool;
  };

  // ── computeCohortRetention ───────────────────────────────────────────────────

  /// Pure computation: cohort retention analysis using unique user IDs.
  ///
  /// windowWeeks: number of most-recent complete cohort weeks to return (0 = default 12).
  /// Returns rows sorted descending by cohort week key.
  public func computeCohortRetention(
    analyticsEvents    : [AT.AnalyticsEvent],
    subscriptionEvents : [AT.SubscriptionEvent],
    windowWeeks        : Nat,
  ) : [AT.CohortRetentionRow] {

    let limit = if (windowWeeks == 0) 12 else windowWeeks;

    let signupMap = buildSignupMap(analyticsEvents);

    // Group users by signup ISO week
    let cohortMap = Map.empty<Text, List.List<Text>>();
    for ((uid, tsNat) in signupMap.entries()) {
      let wk = isoWeekKey(tsNat);
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

    // Build userId → all event timestamps
    let userTimestamps = Map.empty<Text, List.List<Nat>>();
    for (e in analyticsEvents.vals()) {
      let tsNat = tsToNat(e.timestamp);
      let lst = switch (userTimestamps.get(e.userId)) {
        case null {
          let l = List.empty<Nat>();
          userTimestamps.add(e.userId, l);
          l;
        };
        case (?l) l;
      };
      lst.add(tsNat);
    };

    let rows = List.empty<AT.CohortRetentionRow>();

    for ((wk, cohortUsers) in cohortMap.entries()) {
      let cohortSize = cohortUsers.size();
      if (cohortSize > 0) {
        var retD1 : Nat = 0;
        var retD7 : Nat = 0;
        var retD30 : Nat = 0;
        var retD60 : Nat = 0;

        cohortUsers.forEach(func(uid) {
          switch (signupMap.get(uid)) {
            case null {};
            case (?firstTs) {
              let d1Start  : Nat = firstTs + dayNs;
              let d1End    : Nat = firstTs + 2 * dayNs;
              let d7Start  : Nat = firstTs + 7 * dayNs;
              let d30Start : Nat = firstTs + 30 * dayNs;
              let d60Start : Nat = firstTs + 60 * dayNs;

              let tsList : List.List<Nat> = switch (userTimestamps.get(uid)) {
                case null { List.empty<Nat>() };
                case (?l) l;
              };

              // D1: has event in [firstTs + 1d, firstTs + 2d)
              let hasD1 = tsList.any(func(ts) { ts >= d1Start and ts < d1End });
              // D7: has any event ≥ firstTs + 7d
              let hasD7 = tsList.any(func(ts) { ts >= d7Start });
              // D30: has any event ≥ firstTs + 30d
              let hasD30 = tsList.any(func(ts) { ts >= d30Start });
              // D60: has any event ≥ firstTs + 60d
              let hasD60 = tsList.any(func(ts) { ts >= d60Start });

              if (hasD1)  retD1  += 1;
              if (hasD7)  retD7  += 1;
              if (hasD30) retD30 += 1;
              if (hasD60) retD60 += 1;
            };
          };
        });

        rows.add({
          week        = wk;
          cohortSize;
          d1          = safeRate(retD1,  cohortSize);
          d7          = safeRate(retD7,  cohortSize);
          d30         = safeRate(retD30, cohortSize);
          d60         = safeRate(retD60, cohortSize);
          retainedD1  = retD1;
          retainedD7  = retD7;
          retainedD30 = retD30;
          retainedD60 = retD60;
        });
      };
    };

    // Sort descending by cohort week (lexicographic on "YYYY-WNN" is correct)
    let sorted = rows.sort(func(a : AT.CohortRetentionRow, b : AT.CohortRetentionRow) : { #less; #equal; #greater } {
      Text.compare(b.week, a.week);
    });

    sorted.sliceToArray(0, limit);
  };

  // ── computeUserSegments ──────────────────────────────────────────────────────

  /// Pure computation: segment distribution across all scored users.
  ///
  /// Scoring window = last 7 days from nowNs (Nat, nanoseconds).
  /// Segment rules:
  ///   HighIntent:    events in last 7d ≥ 8 OR (paywall_viewed in last 7d AND pitch_sent in last 3d)
  ///   Medium:        events in last 7d ∈ [3, 7]
  ///   LowActivity:   events in last 7d ∈ [0, 2]
  /// Excludes users with ChurnRisk.high whose last subscription event is plan_cancelled.
  public func computeUserSegments(
    analyticsEvents    : [AT.AnalyticsEvent],
    subscriptionEvents : [AT.SubscriptionEvent],
    retentionData      : [(Principal, AT.RetentionData)],
    nowNs              : Nat,
  ) : AT.UserSegmentDistribution {

    let weekAgo    : Nat = if (nowNs >= weekNs)       nowNs - weekNs       else 0;
    let threeDayAgo : Nat = if (nowNs >= 3 * dayNs)   nowNs - 3 * dayNs   else 0;

    // Build churn-excluded set: plan_cancelled + ChurnRisk.high
    let lastSubMap  = buildLastSubMap(subscriptionEvents);
    let churnedSet  = Set.empty<Text>();
    for ((uid, sub) in lastSubMap.entries()) {
      switch (sub.eventKind) {
        case (#plan_cancelled) {
          // Check if retention data marks this user as high churn risk
          let found = retentionData.find(func(entry : (Principal, AT.RetentionData)) : Bool {
            entry.0.toText() == uid
          });
          switch (found) {
            case null {};
            case (?(_, rd)) {
              switch (rd.churnRisk) {
                case (#high) { churnedSet.add(uid) };
                case _ {};
              };
            };
          };
        };
        case _ {};
      };
    };

    // Collect all unique user IDs from events
    let allUserIds = Set.empty<Text>();
    for (e in analyticsEvents.vals()) {
      allUserIds.add(e.userId);
    };

    var lowActivity    : Nat = 0;
    var mediumActivity : Nat = 0;
    var highIntent     : Nat = 0;
    var excludedChurned : Nat = 0;

    allUserIds.forEach(func(uid) {
      if (churnedSet.contains(uid)) {
        excludedChurned += 1;
        return;
      };

      var recentEventCount   : Nat = 0;
      var paywallViewedLast7 : Bool = false;
      var pitchSentLast3d    : Bool = false;

      for (e in analyticsEvents.vals()) {
        if (e.userId == uid) {
          let tsNat = tsToNat(e.timestamp);
          if (tsNat >= weekAgo) {
            recentEventCount += 1;
            if (e.eventType == #paywall_viewed) paywallViewedLast7 := true;
          };
          if (tsNat >= threeDayAgo and e.eventType == #pitch_sent) {
            pitchSentLast3d := true;
          };
        };
      };

      if (recentEventCount >= 8 or (paywallViewedLast7 and pitchSentLast3d)) {
        highIntent += 1;
      } else if (recentEventCount >= 3) {
        mediumActivity += 1;
      } else {
        lowActivity += 1;
      };
    });

    {
      lowActivity;
      mediumActivity;
      highIntent;
      totalScored     = lowActivity + mediumActivity + highIntent;
      excludedChurned;
      scoredAt        = nowNs;
    };
  };

  // ── computeChurnRiskUsers ────────────────────────────────────────────────────

  /// Pure computation: churn risk rows for all active paid users.
  ///
  /// Only includes users whose most recent SubscriptionEvent is
  /// plan_purchased or plan_upgraded to a non-Free tier.
  ///
  /// Risk levels:
  ///   High:   daysSinceLastAction > 3
  ///   Medium: daysSinceLastAction > 1 and ≤ 3
  ///   None:   daysSinceLastAction ≤ 1
  public func computeChurnRiskUsers(
    analyticsEvents    : [AT.AnalyticsEvent],
    subscriptionEvents : [AT.SubscriptionEvent],
    nowNs              : Nat,
  ) : [AT.UserChurnRiskRow] {

    let lastSubMap = buildLastSubMap(subscriptionEvents);

    // Build userId → (lastActionTs, lastEventTypeName)
    let lastActionMap    = Map.empty<Text, Nat>();
    let lastEventTypeMap = Map.empty<Text, Text>();

    for (e in analyticsEvents.vals()) {
      let tsNat = tsToNat(e.timestamp);
      switch (lastActionMap.get(e.userId)) {
        case null {
          lastActionMap.add(e.userId, tsNat);
          lastEventTypeMap.add(e.userId, eventTypeText(e.eventType));
        };
        case (?existing) {
          if (tsNat > existing) {
            lastActionMap.add(e.userId, tsNat);
            lastEventTypeMap.add(e.userId, eventTypeText(e.eventType));
          };
        };
      };
    };

    let rows = List.empty<AT.UserChurnRiskRow>();

    for ((uid, sub) in lastSubMap.entries()) {
      let isActivePaid : Bool = switch (sub.eventKind) {
        case (#plan_purchased or #plan_upgraded) {
          switch (sub.planTier) {
            case (#Free) false;
            case _       true;
          };
        };
        case _ false;
      };

      if (isActivePaid) {
        let lastActionTs : Nat = switch (lastActionMap.get(uid)) {
          case null 0;
          case (?ts) ts;
        };

        let daysSince : Nat = if (nowNs > lastActionTs) {
          (nowNs - lastActionTs) / dayNs;
        } else 0;

        let risk : AT.ChurnRisk = if (daysSince > 3) #high
          else if (daysSince > 1) #medium
          else #none;

        let lastEventType : Text = switch (lastEventTypeMap.get(uid)) {
          case null "none";
          case (?t) t;
        };

        rows.add({
          userId          = sub.userId;
          risk;
          daysSinceLastAction = daysSince;
          lastEventType;
          openPlan        = sub.planTier;
          openPlanRevenue = Common.planTierAmount(sub.planTier);
        });
      };
    };

    rows.toArray();
  };

  // ── computeEnhancedFunnelMetrics ─────────────────────────────────────────────

  /// Pure computation: 7-step funnel with per-step timing and payment velocity.
  ///
  /// Steps: signup → onboarding → leads → message → reply → proposal → payment
  ///
  /// users       = unique user count with that event (earliest timestamp).
  /// conversions = users in step N who also appear in step N+1.
  /// dropoffPercent = (1 − conversions/users) × 100.
  /// avgSecondsToNextStep: median time (seconds) user takes from step N to step N+1;
  ///   null if < 3 data points or last step.
  /// avgDaysToFirstPayment: median days from first app_opened to payment_success;
  ///   null if no paying users.
  public func computeEnhancedFunnelMetrics(
    analyticsEvents    : [AT.AnalyticsEvent],
    subscriptionEvents : [AT.SubscriptionEvent],
  ) : AT.EnhancedFunnelMetrics {

    // ── Step definitions ───────────────────────────────────────────────────────
    type StepEventType = AT.AnalyticsEventType;
    let stepNames : [Text] = [
      "signup", "onboarding", "leads", "message", "reply", "proposal", "payment",
    ];
    let stepEventTypes : [StepEventType] = [
      #app_opened, #onboarding_completed, #leads_generated,
      #pitch_sent, #reply_received, #proposal_created, #payment_success,
    ];
    let numSteps = stepNames.size();

    // ── Build: per-step user → earliest timestamp ──────────────────────────────
    // stepUserMaps[i]: Map<userId, earliestTimestampNat> for step i
    let stepUserMaps : [Map.Map<Text, Nat>] = Array.tabulate<Map.Map<Text, Nat>>(
      numSteps,
      func(_) { Map.empty<Text, Nat>() }
    );

    for (e in analyticsEvents.vals()) {
      let tsNat = tsToNat(e.timestamp);
      var i = 0;
      for (et in stepEventTypes.vals()) {
        if (e.eventType == et) {
          let m = stepUserMaps[i];
          switch (m.get(e.userId)) {
            case null { m.add(e.userId, tsNat) };
            case (?ex) { if (tsNat < ex) m.add(e.userId, tsNat) };
          };
        };
        i += 1;
      };
    };

    // ── Build funnel step details ──────────────────────────────────────────────
    let funnelSteps = List.empty<AT.FunnelStepDetail>();

    var i = 0;
    while (i < numSteps) {
      let stepMap = stepUserMaps[i];
      let users   = stepMap.size();

      let conversions : Nat = if (i + 1 < numSteps) {
        let nextMap = stepUserMaps[i + 1];
        var cnt : Nat = 0;
        for ((uid, _) in stepMap.entries()) {
          switch (nextMap.get(uid)) {
            case null {};
            case (?_) { cnt += 1 };
          };
        };
        cnt;
      } else {
        users; // last step: no drop
      };

      let dropoffPercent : Float = if (users == 0) 0.0
        else (1.0 - safeRate(conversions, users)) * 100.0;

      // Median seconds to next step
      let avgSecondsToNextStep : ?Nat = if (i + 1 >= numSteps) null
      else {
        let nextMap = stepUserMaps[i + 1];
        let deltas  = List.empty<Nat>();
        for ((uid, stepTs) in stepMap.entries()) {
          switch (nextMap.get(uid)) {
            case null {};
            case (?nextTs) {
              if (nextTs >= stepTs) deltas.add((nextTs - stepTs) / secNs);
            };
          };
        };
        if (deltas.size() < 3) null
        else {
          let sorted = deltas.sort(func(a : Nat, b : Nat) : { #less; #equal; #greater } {
            Nat.compare(a, b)
          });
          ?sorted.at(sorted.size() / 2);
        };
      };

      funnelSteps.add({
        step                = stepNames[i];
        users;
        conversions;
        dropoffPercent;
        avgSecondsToNextStep;
      });

      i += 1;
    };

    let totalUsers = stepUserMaps[0].size();
    let paidUsers  = stepUserMaps[numSteps - 1].size();

    let freeToPaidConversion : Float = if (totalUsers == 0) 0.0
      else safeRate(paidUsers, totalUsers) * 100.0;

    // Median days from first app_opened to payment_success
    let signupMap   = stepUserMaps[0];
    let paymentMap  = stepUserMaps[numSteps - 1];
    let payDelays   = List.empty<Float>();

    for ((uid, signupTs) in signupMap.entries()) {
      switch (paymentMap.get(uid)) {
        case null {};
        case (?payTs) {
          if (payTs >= signupTs) {
            payDelays.add(Float.div((payTs - signupTs).toFloat(), dayNs.toFloat()));
          };
        };
      };
    };

    let avgDaysToFirstPayment : ?Float = if (payDelays.size() == 0) null
    else {
      let sorted = payDelays.sort(func(a : Float, b : Float) : { #less; #equal; #greater } {
        Float.compare(a, b)
      });
      ?sorted.at(sorted.size() / 2);
    };

    {
      steps                = funnelSteps.toArray();
      freeToPaidConversion;
      totalUsers;
      paidUsers;
      avgDaysToFirstPayment;
    };
  };

  // ── computeNudgePerformance ──────────────────────────────────────────────────

  /// Pure computation: nudge performance grouped by (variantId, segment).
  ///
  /// openRate        = opened / sent            (0.0 if sent = 0)
  /// conversionRate  = actionTaken / opened     (0.0 if opened = 0)
  /// isWinner        = highest conversionRate per segment group;
  ///                   only one winner per segment; ties go to first encountered.
  ///
  /// Callers pass NudgeEventPublic to avoid cross-module type dependency.
  public func computeNudgePerformance(
    nudgeEvents : [NudgeEventPublic],
  ) : [AT.NudgePerformanceRow] {

    // Mutable accumulator per (variantId # ":" # segKey)
    type AggRow = {
      var sent        : Nat;
      var opened      : Nat;
      var actionTaken : Nat;
      copyType        : Text;
      segment         : AT.Segment;
      variantId       : Text;
    };

    let aggMap = Map.empty<Text, AggRow>();

    for (ne in nudgeEvents.vals()) {
      let seg = textToSegment(ne.segmentKey);
      let k   = ne.variantId # ":" # segKey(seg);
      let acc : AggRow = switch (aggMap.get(k)) {
        case null {
          let a : AggRow = {
            var sent        = 0;
            var opened      = 0;
            var actionTaken = 0;
            copyType        = ne.copyType;
            segment         = seg;
            variantId       = ne.variantId;
          };
          aggMap.add(k, a);
          a;
        };
        case (?a) a;
      };
      acc.sent += 1;
      if (ne.wasOpened)  acc.opened      += 1;
      if (ne.wasActedOn) acc.actionTaken += 1;
    };

    // Collect rows (without isWinner yet)
    let rows = List.empty<AT.NudgePerformanceRow>();
    for ((_, acc) in aggMap.entries()) {
      let openRate       = if (acc.sent   == 0) 0.0 else safeRate(acc.opened,      acc.sent);
      let conversionRate = if (acc.opened == 0) 0.0 else safeRate(acc.actionTaken, acc.opened);
      rows.add({
        variantId      = acc.variantId;
        segment        = acc.segment;
        copyType       = acc.copyType;
        sent           = acc.sent;
        opened         = acc.opened;
        openRate;
        actionTaken    = acc.actionTaken;
        conversionRate;
        isWinner       = false;
      });
    };

    // Identify best conversionRate per segment
    let segBestMap = Map.empty<Text, Float>();
    rows.forEach(func(r) {
      let sk = segKey(r.segment);
      let cur = switch (segBestMap.get(sk)) {
        case null 0.0;
        case (?v) v;
      };
      if (r.conversionRate > cur) segBestMap.add(sk, r.conversionRate);
    });

    // Mark one winner per segment (first row matching best rate)
    let winnerSet = Set.empty<Text>();
    let finalRows = rows.map<AT.NudgePerformanceRow, AT.NudgePerformanceRow>(func(r) {
      let sk = segKey(r.segment);
      let best = switch (segBestMap.get(sk)) {
        case null 0.0;
        case (?v) v;
      };
      if (best > 0.0 and r.conversionRate == best and not winnerSet.contains(sk)) {
        winnerSet.add(sk);
        { r with isWinner = true };
      } else r;
    });

    finalRows.toArray();
  };
};
