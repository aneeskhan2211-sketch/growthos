/// SaaS Metrics API Mixin — public query/update interface for investor-grade metrics.
/// All monetary values are in Indian Rupees (₹).
///
/// Injected state:
///   subscriptionEvents       — immutable event log (purchases, upgrades, cancels)
///   marketingSpendRecords    — monthly channel spend entries for CAC computation
///   subscriptionEventCounter — auto-increment counter for subscription event IDs
///   marketingSpendCounter    — auto-increment counter for marketing spend IDs
///   analyticsEvents          — shared read-only reference from analytics-and-tracking

import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Lib "../lib/saas-metrics";
import AnalyticsLib "../lib/analytics-and-tracking";
import T "../types/analytics-and-tracking";
import Common "../types/common";

mixin (
  subscriptionEvents       : List.List<T.SubscriptionEvent>,
  marketingSpendRecords    : List.List<T.MarketingSpend>,
  subscriptionEventCounter : { var value : Nat },
  marketingSpendCounter    : { var value : Nat },
  analyticsEvents          : List.List<T.AnalyticsEvent>,
) {
  // ── Internal helpers ────────────────────────────────────────────────────────

  /// Nanoseconds in a 30-day window (approximation for month boundaries).
  let monthNs : Nat = 30 * 24 * 3600 * 1_000_000_000;

  /// Compute the start-of-month timestamp for a given offset from now.
  /// offset 0 = current month, 1 = previous month, 2 = two months ago.
  func monthTimestampForOffset(offset : Nat) : Nat {
    let now    = Time.now();
    let nowNat : Nat = if (now < 0) 0 else now.toNat();
    let currentStart = (nowNat / monthNs) * monthNs;
    if (currentStart >= offset * monthNs) currentStart - offset * monthNs else 0;
  };

  // ── Subscription event recording ────────────────────────────────────────────

  /// Record a subscription lifecycle event for the calling user.
  ///
  /// kind:         plan_purchased | plan_upgraded | plan_cancelled | plan_downgraded
  /// planTier:     the new plan tier after this event
  /// prevPlanTier: the previous tier (include for upgrades, downgrades, and cancels)
  ///
  /// Returns the new event ID.
  public shared ({ caller }) func recordSubscriptionEvent(
    kind         : T.SubscriptionEventKind,
    planTier     : T.PlanTier,
    prevPlanTier : ?T.PlanTier,
  ) : async Nat {
    let id = subscriptionEventCounter.value;
    subscriptionEventCounter.value += 1;

    let amountRs = Common.planTierAmount(planTier);
    let prevAmountRs : ?Nat = switch (prevPlanTier) {
      case null      null;
      case (?pt) ?Common.planTierAmount(pt);
    };

    let event : T.SubscriptionEvent = {
      id;
      userId       = caller;
      eventKind    = kind;
      planTier;
      amountRs;
      prevPlanTier;
      prevAmountRs;
      timestamp    = Time.now().toNat();
    };
    subscriptionEvents.add(event);
    id;
  };

  /// Return subscription history.
  /// Pass null to get the caller's own history.
  /// Passing another user's Principal returns their history
  /// (access control beyond the canister controller is enforced at the app layer).
  public query ({ caller }) func getSubscriptionHistory(userId : ?Principal) : async [T.SubscriptionEvent] {
    let target = switch (userId) {
      case null  caller;
      case (?p)  p;
    };
    subscriptionEvents
      .filter(func(e : T.SubscriptionEvent) : Bool { e.userId == target })
      .toArray();
  };

  // ── Marketing spend recording ────────────────────────────────────────────────

  /// Record a monthly marketing spend entry.
  ///
  /// month:    ISO-style text e.g. "2026-05"
  /// channel:  #googleAds | #metaAds | #referral | #other
  /// amountRs: spend in ₹ for the given month + channel
  ///
  /// Returns the new record ID. Traps for anonymous callers.
  public shared ({ caller }) func recordMarketingSpend(
    month    : Text,
    channel  : T.SpendChannel,
    amountRs : Nat,
  ) : async Nat {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous callers cannot record marketing spend");
    };
    let id = marketingSpendCounter.value;
    marketingSpendCounter.value += 1;

    let record : T.MarketingSpend = {
      id;
      month;
      channel;
      amountRs;
      recordedBy = caller;
      timestamp  = Time.now().toNat();
    };
    marketingSpendRecords.add(record);
    id;
  };

  /// Return marketing spend records.
  /// Pass a month string (e.g. "2026-05") to filter, or null for all records.
  public query func getMarketingSpend(month : ?Text) : async [T.MarketingSpend] {
    switch (month) {
      case null  { marketingSpendRecords.toArray() };
      case (?m)  {
        marketingSpendRecords
          .filter(func(s : T.MarketingSpend) : Bool { s.month == m })
          .toArray();
      };
    };
  };

  // ── SaaS Metrics ────────────────────────────────────────────────────────────

  /// Return the full investor-grade SaaS metrics snapshot.
  ///
  /// monthOffset: 0 (default) = current month, 1 = previous month, 2 = two months ago.
  /// Cohort retention is computed inline from stored events.
  ///
  /// All monetary values in ₹. Full calculation basis in lib/saas-metrics.mo.
  public query func getSaasMetrics(monthOffset : ?Nat) : async T.SaasMetricsResponse {
    let offset  = switch (monthOffset) { case null 0; case (?n) n };
    let monthTs = monthTimestampForOffset(offset);

    let subArr   = subscriptionEvents.toArray();
    let spendArr = marketingSpendRecords.toArray();
    let evtArr   = analyticsEvents.toArray();

    let cohortRows = Lib.computeCohortRetention(subArr, evtArr);
    Lib.computeSaasMetricsWithCohorts(subArr, spendArr, evtArr, monthTs, cohortRows);
  };

  // ── Health alerts ────────────────────────────────────────────────────────────

  /// Return current health alerts comparing this month vs last month.
  ///
  /// Fires when:
  ///   - Monthly churn > 5%          (critical)
  ///   - Free→paid conversion < 10%  (warning)
  ///   - CAC rose > 15% vs last month (warning)
  ///   - LTV:CAC ratio < 2×          (warning)
  public query func getSaasHealthAlerts() : async [T.HealthAlert] {
    let subArr   = subscriptionEvents.toArray();
    let spendArr = marketingSpendRecords.toArray();
    let evtArr   = analyticsEvents.toArray();

    let cohortRows = Lib.computeCohortRetention(subArr, evtArr);
    let current    = Lib.computeSaasMetricsWithCohorts(subArr, spendArr, evtArr, monthTimestampForOffset(0), cohortRows);
    let prev       = Lib.computeSaasMetricsWithCohorts(subArr, spendArr, evtArr, monthTimestampForOffset(1), cohortRows);

    // Free→paid conversion % from the shared analytics funnel
    let funnelMetrics = AnalyticsLib.getFunnelMetrics(analyticsEvents);

    Lib.computeHealthAlerts(current, ?prev, funnelMetrics.freeToPaidConversion);
  };
};
