import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import T "../types/analytics-and-tracking";

module {
  // ── Analytics Events ─────────────────────────────────────────────────────

  public func recordAnalyticsEvent(
    analyticsEvents : List.List<T.AnalyticsEvent>,
    counters : T.AnalyticsCounters,
    userId : Text,
    eventType : T.AnalyticsEventType,
    metadata : [(Text, Text)],
  ) : Nat {
    let id = counters.nextEventId;
    counters.nextEventId += 1;
    let event : T.AnalyticsEvent = {
      id;
      userId;
      eventType;
      timestamp = Time.now();
      metadata;
    };
    analyticsEvents.add(event);
    id;
  };

  public func getAnalyticsEvents(
    analyticsEvents : List.List<T.AnalyticsEvent>,
    userId : Text,
  ) : [T.AnalyticsEvent] {
    analyticsEvents.filter(func(e) { e.userId == userId }).toArray();
  };

  // ── Heatmap Events ────────────────────────────────────────────────────────

  public func recordHeatmapEvent(
    heatmapEvents : List.List<T.HeatmapEvent>,
    counters : T.AnalyticsCounters,
    userId : Text,
    screenName : Text,
    elementId : Text,
    eventKind : T.HeatmapEventKind,
    scrollDepth : Nat,
    timeSpentMs : Nat,
  ) : Nat {
    let id = counters.nextHeatmapId;
    counters.nextHeatmapId += 1;
    let event : T.HeatmapEvent = {
      id;
      userId;
      screenName;
      elementId;
      eventKind;
      timestamp = Time.now();
      scrollDepth;
      timeSpentMs;
    };
    heatmapEvents.add(event);
    id;
  };

  public func getHeatmapSummary(
    heatmapEvents : List.List<T.HeatmapEvent>,
  ) : [(Text, Nat)] {
    // Build a map of screenName → count using fold
    let countMap = Map.empty<Text, Nat>();
    heatmapEvents.forEach(func(e) {
      let current = switch (countMap.get(e.screenName)) {
        case null { 0 };
        case (?n) { n };
      };
      countMap.add(e.screenName, current + 1);
    });
    // Convert to array and sort descending by count
    let arr = countMap.toArray();
    let sorted = arr.sort(func(a : (Text, Nat), b : (Text, Nat)) : { #less; #equal; #greater } {
      // Sort descending: larger counts first
      if (b.1 > a.1) #less
      else if (b.1 < a.1) #greater
      else #equal
    });
    sorted;
  };

  // ── Funnel Metrics ────────────────────────────────────────────────────────

  func countEventType(
    analyticsEvents : List.List<T.AnalyticsEvent>,
    eventType : T.AnalyticsEventType,
  ) : Nat {
    analyticsEvents.foldLeft<Nat, T.AnalyticsEvent>(0, func(acc, e) {
      if (e.eventType == eventType) acc + 1 else acc
    });
  };

  func safeConversion(numerator : Nat, denominator : Nat) : Float {
    if (denominator == 0) 0.0
    else Float.div(numerator.toFloat(), denominator.toFloat()) * 100.0;
  };

  public func getFunnelMetrics(
    analyticsEvents : List.List<T.AnalyticsEvent>,
  ) : T.FunnelMetrics {
    let appOpened      = countEventType(analyticsEvents, #app_opened);
    let obStarted      = countEventType(analyticsEvents, #onboarding_started);
    let obCompleted    = countEventType(analyticsEvents, #onboarding_completed);
    let getClients     = countEventType(analyticsEvents, #get_clients_clicked);
    let pitchSent      = countEventType(analyticsEvents, #pitch_sent);
    let replyReceived  = countEventType(analyticsEvents, #reply_received);
    let proposalCreated = countEventType(analyticsEvents, #proposal_created);
    let paymentSuccess = countEventType(analyticsEvents, #payment_success);

    let step1Conv = safeConversion(obStarted, appOpened);
    let step2Conv = safeConversion(obCompleted, obStarted);
    let step3Conv = safeConversion(getClients, obCompleted);
    let step4Conv = safeConversion(pitchSent, getClients);
    let step5Conv = safeConversion(replyReceived, pitchSent);
    let step6Conv = safeConversion(proposalCreated, replyReceived);
    let step7Conv = safeConversion(paymentSuccess, proposalCreated);

    let steps : [T.FunnelStep] = [
      { stepName = "Install → Signup";           count = appOpened;       conversionRate = step1Conv; dropOffRate = 100.0 - step1Conv },
      { stepName = "Signup → Onboarding";        count = obStarted;       conversionRate = step2Conv; dropOffRate = 100.0 - step2Conv },
      { stepName = "Onboarding → Get Clients";   count = obCompleted;     conversionRate = step3Conv; dropOffRate = 100.0 - step3Conv },
      { stepName = "Get Clients → Pitch Sent";   count = getClients;      conversionRate = step4Conv; dropOffRate = 100.0 - step4Conv },
      { stepName = "Pitch Sent → Reply";         count = pitchSent;       conversionRate = step5Conv; dropOffRate = 100.0 - step5Conv },
      { stepName = "Reply → Proposal";           count = replyReceived;   conversionRate = step6Conv; dropOffRate = 100.0 - step6Conv },
      { stepName = "Proposal → Payment";         count = proposalCreated; conversionRate = step7Conv; dropOffRate = 100.0 - step7Conv },
    ];

    let totalUsers = appOpened;
    let paidUsers  = paymentSuccess;
    let freeToPaidConversion = safeConversion(paidUsers, totalUsers);

    { steps; freeToPaidConversion; totalUsers; paidUsers };
  };

  // ── Retention Data ────────────────────────────────────────────────────────

  public func updateRetentionData(
    retentionMap : Map.Map<Text, T.RetentionData>,
    userId : Text,
    weeklyLeads : Nat,
    weeklyReplies : Nat,
    weeklyProposals : Nat,
  ) {
    let now = Time.now();
    let existing = retentionMap.get(userId);
    let updated : T.RetentionData = switch (existing) {
      case null {
        {
          userId;
          lastActiveDate = "";
          currentStreak = 1;
          longestStreak = 1;
          weeklyLeadsGenerated = weeklyLeads;
          weeklyRepliesReceived = weeklyReplies;
          weeklyProposalsSent = weeklyProposals;
          creditsEarned = 0;
          lastCreditClaim = now;
          lastSessionAt = now;
          churnRisk = #none;
        };
      };
      case (?r) {
        let newStreak = r.currentStreak + 1;
        let longest = if (newStreak > r.longestStreak) newStreak else r.longestStreak;
        {
          r with
          currentStreak = newStreak;
          longestStreak = longest;
          weeklyLeadsGenerated = weeklyLeads;
          weeklyRepliesReceived = weeklyReplies;
          weeklyProposalsSent = weeklyProposals;
        };
      };
    };
    retentionMap.add(userId, updated);
  };

  public func getRetentionData(
    retentionMap : Map.Map<Text, T.RetentionData>,
    userId : Text,
  ) : ?T.RetentionData {
    retentionMap.get(userId);
  };

  public func awardCredits(
    retentionMap : Map.Map<Text, T.RetentionData>,
    userId : Text,
    amount : Nat,
  ) {
    let now = Time.now();
    let existing = retentionMap.get(userId);
    let updated : T.RetentionData = switch (existing) {
      case null {
        {
          userId;
          lastActiveDate = "";
          currentStreak = 0;
          longestStreak = 0;
          weeklyLeadsGenerated = 0;
          weeklyRepliesReceived = 0;
          weeklyProposalsSent = 0;
          creditsEarned = amount;
          lastCreditClaim = now;
          lastSessionAt = now;
          churnRisk = #none;
        };
      };
      case (?r) {
        { r with creditsEarned = r.creditsEarned + amount; lastCreditClaim = now };
      };
    };
    retentionMap.add(userId, updated);
  };

  // ── Churn Risk ────────────────────────────────────────────────────────────

  /// Day in nanoseconds
  let dayNs : Int = 86_400_000_000_000;

  public func updateLastSession(
    retentionMap : Map.Map<Text, T.RetentionData>,
    userId : Text,
  ) {
    let now = Time.now();
    let existing = retentionMap.get(userId);
    let updated : T.RetentionData = switch (existing) {
      case null {
        {
          userId;
          lastActiveDate = "";
          currentStreak = 0;
          longestStreak = 0;
          weeklyLeadsGenerated = 0;
          weeklyRepliesReceived = 0;
          weeklyProposalsSent = 0;
          creditsEarned = 0;
          lastCreditClaim = now;
          lastSessionAt = now;
          churnRisk = #none;
        };
      };
      case (?r) {
        { r with lastSessionAt = now; churnRisk = #none };
      };
    };
    retentionMap.add(userId, updated);
  };

  public func checkChurnRisk(
    retentionMap : Map.Map<Text, T.RetentionData>,
    userId : Text,
  ) : T.ChurnRisk {
    let now = Time.now();
    switch (retentionMap.get(userId)) {
      case null { #none };
      case (?r) {
        let elapsed = now - r.lastSessionAt;
        if (elapsed > 3 * dayNs) #high
        else if (elapsed > dayNs) #medium
        else #none;
      };
    };
  };

  public func getChurnStatus(
    retentionMap : Map.Map<Text, T.RetentionData>,
    analyticsEvents : List.List<T.AnalyticsEvent>,
    userId : Text,
  ) : { isAtRisk : Bool; daysSinceLastSession : Nat; pendingHotLeads : Nat } {
    let now = Time.now();
    let daysSince : Nat = switch (retentionMap.get(userId)) {
      case null { 0 };
      case (?r) {
        let elapsed = now - r.lastSessionAt;
        if (elapsed > 0) (elapsed / dayNs).toNat() else 0;
      };
    };
    // Count leads_generated events as a proxy for hot leads pending follow-up
    let pendingHotLeads = analyticsEvents.filter(func(e) {
      e.userId == userId and e.eventType == #leads_generated
    }).size();
    let isAtRisk = daysSince >= 1;
    { isAtRisk; daysSinceLastSession = daysSince; pendingHotLeads };
  };
};
