import AT "../types/analytics-and-tracking";
import GAIT "../types/growth-engine-ai";
import Lib "../lib/cohorts-and-segments";
import List "mo:core/List";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

/// Cohorts and Segments API — pure query interface.
/// All functions are query calls (no state mutation).
///
/// State injected:
///   analyticsEvents    — full event log shared with analytics-and-tracking
///   subscriptionEvents — subscription lifecycle events for revenue/churn analysis
///   nudgeEvents        — nudge delivery log from growth-engine-ai
///   retentionMap       — per-user retention data (for churn exclusion in segmentation)
mixin (
  analyticsEvents    : List.List<AT.AnalyticsEvent>,
  subscriptionEvents : List.List<AT.SubscriptionEvent>,
  nudgeEvents        : List.List<GAIT.NudgeEvent>,
  retentionMap       : Map.Map<Text, AT.RetentionData>,
) {

  // ── getCohortRetention ────────────────────────────────────────────────────

  /// Returns cohort retention rows for the last N complete ISO weeks.
  /// windowWeeks: null or 0 = default 12 weeks.
  /// Each row: week label, cohort size, D1/D7/D30/D60 rates and absolute retained counts.
  public query func getCohortRetention(windowWeeks : ?Nat) : async [AT.CohortRetentionRow] {
    let w = switch (windowWeeks) {
      case null 12;
      case (?n) if (n == 0) 12 else n;
    };
    Lib.computeCohortRetention(
      analyticsEvents.toArray(),
      subscriptionEvents.toArray(),
      w,
    );
  };

  // ── getUserSegments ───────────────────────────────────────────────────────

  /// Returns the current segment distribution across all scored users.
  /// Excludes churned users (ChurnRisk.high + plan_cancelled) from totals.
  /// scoredAt is the canister's current time in nanoseconds.
  public query func getUserSegments() : async AT.UserSegmentDistribution {
    // Convert retentionMap to [(Principal, AT.RetentionData)] for Lib
    // retentionMap uses Text keys (userId.toText()); we reconstruct Principals
    let retentionArr : [(Principal, AT.RetentionData)] = retentionMap.toArray().map<
      (Text, AT.RetentionData),
      (Principal, AT.RetentionData)
    >(func((uid, rd)) {
      (Principal.fromText(uid), rd);
    });

    let nowNs : Nat = Int.abs(Time.now());

    Lib.computeUserSegments(
      analyticsEvents.toArray(),
      subscriptionEvents.toArray(),
      retentionArr,
      nowNs,
    );
  };

  // ── getChurnRiskUsers ─────────────────────────────────────────────────────

  /// Returns churn risk rows for all active paid users.
  /// Only users with a non-Free active plan (last sub event = purchased/upgraded) are included.
  /// Risk: high (> 3 days inactive), medium (> 1 day), none (≤ 1 day).
  public query func getChurnRiskUsers() : async [AT.UserChurnRiskRow] {
    let nowNs : Nat = Int.abs(Time.now());
    Lib.computeChurnRiskUsers(
      analyticsEvents.toArray(),
      subscriptionEvents.toArray(),
      nowNs,
    );
  };

  // ── getEnhancedFunnelMetrics ──────────────────────────────────────────────

  /// Returns the 7-step funnel (signup → onboarding → leads → message →
  /// reply → proposal → payment) with unique user counts, drop-off %, and
  /// median time to next step for each step.
  /// avgDaysToFirstPayment: null if no paying users in the event log.
  public query func getEnhancedFunnelMetrics() : async AT.EnhancedFunnelMetrics {
    Lib.computeEnhancedFunnelMetrics(
      analyticsEvents.toArray(),
      subscriptionEvents.toArray(),
    );
  };

  // ── getNudgePerformanceBySegment ──────────────────────────────────────────

  /// Returns nudge A/B performance rows grouped by (variantId, segment).
  /// segment: null = all segments; otherwise filter to that segment only.
  /// One row is marked isWinner = true per segment (highest conversionRate).
  public query func getNudgePerformanceBySegment(segment : ?AT.Segment) : async [AT.NudgePerformanceRow] {
    // Convert GAIT.NudgeEvent → Lib.NudgeEventPublic
    let nudgeArr : [Lib.NudgeEventPublic] = nudgeEvents.toArray().map<
      GAIT.NudgeEvent,
      Lib.NudgeEventPublic
    >(func(ne) {
      {
        variantId  = ne.variantId;
        segmentKey = activitySegToKey(ne.segment);
        copyType   = variantTypeToText(ne.variantType);
        wasOpened  = ne.openedAt  != null;
        wasActedOn = ne.actedOnAt != null;
      };
    });

    let allRows = Lib.computeNudgePerformance(nudgeArr);

    switch (segment) {
      case null allRows;
      case (?seg) {
        allRows.filter(func(r : AT.NudgePerformanceRow) : Bool { r.segment == seg });
      };
    };
  };

  // ── Private helpers ───────────────────────────────────────────────────────

  /// Map growth-engine-ai ActivitySegment to a Text key for NudgeEventPublic.
  func activitySegToKey(seg : GAIT.ActivitySegment) : Text {
    switch (seg) {
      case (#LowActivity) "LowActivity";
      case (#Medium)      "Medium";
      case (#HighIntent)  "HighIntent";
    };
  };

  func variantTypeToText(vt : GAIT.NudgeVariantType) : Text {
    switch (vt) {
      case (#urgency) "urgency";
      case (#fomo)    "fomo";
      case (#reward)  "reward";
    };
  };
};
