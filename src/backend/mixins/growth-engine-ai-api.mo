import T "../types/growth-engine-ai";
import AT "../types/analytics-and-tracking";
import Lib "../lib/growth-engine-ai";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  nudgeEvents : List.List<T.NudgeEvent>,
  nudgeCounters : T.NudgeCounters,
  pricingRecs : Map.Map<Text, T.PricingRecommendation>,
  paywallStates : Map.Map<Text, T.PaywallState>,
  abAssignments : Map.Map<Text, T.AbAssignment>,
  abResults : Map.Map<Text, T.AbTestResult>,
  analyticsEvents : List.List<AT.AnalyticsEvent>,
) {

  // ── Activity Scoring ───────────────────────────────────────────────────────

  public shared ({ caller }) func getMyActivityScore() : async T.UserActivityScore {
    Lib.computeActivityScore(caller.toText(), analyticsEvents, Time.now());
  };

  public shared ({ caller }) func getUserActivityScore(userId : Text) : async T.UserActivityScore {
    Lib.computeActivityScore(userId, analyticsEvents, Time.now());
  };

  // ── Nudge Engine ───────────────────────────────────────────────────────────

  public shared ({ caller }) func triggerNudgeForUser(userId : Text) : async ?T.NudgeEvent {
    let score = Lib.computeActivityScore(userId, analyticsEvents, Time.now());
    let bestVariant = Lib.selectBestNudgeVariant(
      score.segment,
      Lib.defaultNudgeVariants,
      nudgeEvents,
    );
    switch (bestVariant) {
      case null null;
      case (?v) {
        let evt = Lib.recordNudgeSent(nudgeEvents, nudgeCounters, userId, v, score.segment, Time.now());
        ?evt;
      };
    };
  };

  public shared ({ caller }) func markNudgeOpened(nudgeEventId : Nat) : async Bool {
    Lib.markNudgeOpened(nudgeEvents, nudgeEventId, Time.now());
  };

  public shared ({ caller }) func markNudgeActedOn(nudgeEventId : Nat) : async Bool {
    Lib.markNudgeActedOn(nudgeEvents, nudgeEventId, Time.now());
  };

  public query ({ caller }) func getNudgePerformanceMetrics() : async [T.NudgePerformanceMetrics] {
    Lib.allNudgeMetrics(nudgeEvents, Lib.defaultNudgeVariants);
  };

  public query ({ caller }) func getNudgeMetricsBySegment(segment : T.ActivitySegment) : async [T.NudgePerformanceMetrics] {
    let filtered = Lib.defaultNudgeVariants.filter(func(v) { v.targetSegment == segment });
    Lib.allNudgeMetrics(nudgeEvents, filtered);
  };

  // ── Pricing Optimizer ─────────────────────────────────────────────────────

  public shared ({ caller }) func getMyPricingRecommendation() : async T.PricingRecommendation {
    let userId = caller.toText();
    let score  = Lib.computeActivityScore(userId, analyticsEvents, Time.now());
    let existing = pricingRecs.get(userId);
    // Determine current plan from events (payment_success = paid; else free)
    let isPaid = analyticsEvents.any(func(e) {
      e.userId == userId and e.eventType == #payment_success
    });
    let currentPlan = if (isPaid) "growth" else "free";
    let rec = Lib.buildPricingRecommendation(userId, score.segment, currentPlan, existing, Time.now());
    pricingRecs.add(userId, rec);
    rec;
  };

  public shared ({ caller }) func recordOfferShown() : async () {
    let userId = caller.toText();
    switch (pricingRecs.get(userId)) {
      case null {};
      case (?r) {
        pricingRecs.add(userId, Lib.markOfferShown(r, Time.now()));
      };
    };
  };

  public query ({ caller }) func listUserPricingRows() : async [T.UserPricingRow] {
    pricingRecs.toArray().map<(Text, T.PricingRecommendation), T.UserPricingRow>(
      func((_, r)) {
        {
          userId          = r.userId;
          segment         = r.segment;
          currentPlan     = r.currentPlan;
          recommendedOffer = r.recommendedOffer;
          offerLabel      = r.offerLabel;
          shownAt         = r.shownAt;
        }
      }
    );
  };

  // ── Paywall Timing ────────────────────────────────────────────────────────

  public query ({ caller }) func checkValueMoment(userId : Text) : async Bool {
    Lib.hasValueMoment(userId, analyticsEvents);
  };

  public shared ({ caller }) func recordPaywallShown(userId : Text) : async T.PaywallState {
    Lib.recordPaywallShown(paywallStates, userId, analyticsEvents, Time.now());
  };

  public query ({ caller }) func getPaywallState(userId : Text) : async ?T.PaywallState {
    paywallStates.get(userId);
  };

  // ── A/B Test System ───────────────────────────────────────────────────────

  public shared ({ caller }) func getAbVariant(testName : T.AbTestName) : async T.AbVariantId {
    let userId = caller.toText();
    let assignKey = userId # ":" # (switch (testName) {
      case (#nudge_copy_ab)    "nudge_copy_ab";
      case (#paywall_timing_ab) "paywall_timing_ab";
    });

    switch (abAssignments.get(assignKey)) {
      case (?a) a.assignedVariant;
      case null {
        let variants : [Text] = switch (testName) {
          case (#nudge_copy_ab)    ["urgency", "fomo", "reward"];
          case (#paywall_timing_ab) ["immediate", "after_value_moment"];
        };
        let assigned = Lib.assignAbVariant(testName, userId, variants);
        let record : T.AbAssignment = {
          userId;
          testName;
          assignedVariant = assigned;
          assignedAt = Time.now();
        };
        abAssignments.add(assignKey, record);
        assigned;
      };
    };
  };

  public shared ({ caller }) func recordAbImpression(testName : T.AbTestName, variantId : T.AbVariantId) : async () {
    Lib.recordImpression(abResults, testName, variantId, Time.now());
  };

  public shared ({ caller }) func recordAbConversion(testName : T.AbTestName, variantId : T.AbVariantId) : async () {
    Lib.recordConversion(abResults, testName, variantId, Time.now());
  };

  public query ({ caller }) func getAbTestResult(testName : T.AbTestName) : async ?T.AbTestResult {
    let key = switch (testName) {
      case (#nudge_copy_ab)    "nudge_copy_ab";
      case (#paywall_timing_ab) "paywall_timing_ab";
    };
    abResults.get(key);
  };

  public shared ({ caller }) func resetAbTest(testName : T.AbTestName) : async () {
    Lib.resetAbTest(abResults, testName, Time.now());
  };

  // ── Growth Overview Dashboard ─────────────────────────────────────────────

  public query ({ caller }) func getGrowthOverview() : async T.GrowthOverview {
    Lib.computeGrowthOverview(analyticsEvents, Time.now());
  };

  public query ({ caller }) func getUserJourneyTimeline(userId : Text) : async T.UserJourneyTimeline {
    Lib.getUserJourneyTimeline(userId, analyticsEvents);
  };

  public query ({ caller }) func getEventDrillDown(eventName : Text) : async T.EventDrillDown {
    Lib.getEventDrillDown(eventName, analyticsEvents);
  };

  public query ({ caller }) func getRealTimeEventStream() : async [T.LiveEventEntry] {
    Lib.getRealTimeEventStream(analyticsEvents);
  };
};
