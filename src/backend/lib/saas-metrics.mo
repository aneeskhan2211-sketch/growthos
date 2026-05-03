/// SaaS Metrics Library — pure computation module.
/// All functions are stateless: state is passed in as arguments.
/// All monetary values are in Indian Rupees (₹).
///
/// Calculation basis (investor-grade transparency):
///   MRR   = sum of amountRs for each user's latest active subscription
///   ARR   = MRR × 12
///   NRR   = (openingMrr + expansionMrr − churnedMrr) ÷ openingMrr × 100
///   CAC   = totalMarketingSpend ÷ newPaidCustomers  (for the month window)
///   LTV   = tier_arpu × avgRetentionMonths  where avgRetentionMonths ≈ −1 ÷ ln(d30Rate)
///   LTV:CAC health: ≥3× healthy, 1–3× weak, <1× loss
///   CAC payback = cac ÷ (mrr ÷ totalPayingCustomers)  in months

import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import T "../types/analytics-and-tracking";
import Common "../types/common";

module {
  // ── Helpers ─────────────────────────────────────────────────────────────────

  /// Natural logarithm (base e) via Float.log. Returns 0.0 for non-positive inputs.
  func ln(x : Float) : Float {
    if (x <= 0.0) 0.0
    else Float.log(x);
  };

  /// Safe float division — returns 0.0 when denominator is zero.
  func safeDiv(a : Float, b : Float) : Float {
    if (b == 0.0) 0.0 else a / b;
  };

  /// Convert Nat to Float.
  func natF(n : Nat) : Float { n.toFloat() };

  /// Nanoseconds constants (IC Time.now() is Int nanoseconds).
  let secondNs : Nat = 1_000_000_000;
  let dayNs    : Nat = 86_400_000_000_000;
  let monthNs  : Nat = 2_592_000_000_000_000;

  /// Window for a given 30-day month offset.
  /// offset 0 = current, 1 = previous, etc.
  func monthWindow(monthTimestamp : Nat, offset : Nat) : (Nat, Nat) {
    let start = if (monthTimestamp >= offset * monthNs) monthTimestamp - offset * monthNs else 0;
    (start, start + monthNs);
  };

  // ── Latest subscription per user ────────────────────────────────────────────

  /// Build a map of userId → their most recent SubscriptionEvent.
  func latestPerUser(events : [T.SubscriptionEvent]) : Map.Map<Principal, T.SubscriptionEvent> {
    let m = Map.empty<Principal, T.SubscriptionEvent>();
    for (e in events.values()) {
      switch (m.get(e.userId)) {
        case null { m.add(e.userId, e) };
        case (?existing) {
          if (e.timestamp > existing.timestamp) { m.add(e.userId, e) };
        };
      };
    };
    m;
  };

  /// An active subscription: latest event is plan_purchased or plan_upgraded to a paid tier.
  func isActiveSubscription(e : T.SubscriptionEvent) : Bool {
    switch (e.eventKind) {
      case (#plan_purchased) { e.planTier != #Free };
      case (#plan_upgraded)  { e.planTier != #Free };
      case (#plan_cancelled)  false;
      case (#plan_downgraded) { e.planTier != #Free };
    };
  };

  // ── MRR waterfall ────────────────────────────────────────────────────────────

  /// Opening MRR = active subscription revenue from users whose latest event was before windowStart.
  func computeOpeningMrr(events : [T.SubscriptionEvent], windowStart : Nat) : Nat {
    let prior = events.filter(func(e : T.SubscriptionEvent) : Bool { e.timestamp < windowStart });
    let latest = latestPerUser(prior);
    latest.foldLeft<Principal, T.SubscriptionEvent, Nat>(0, func(acc, _k, e) {
      if (isActiveSubscription(e)) acc + e.amountRs else acc
    });
  };

  /// Current MRR = sum of amountRs for all users with an active latest subscription.
  func computeMrr(events : [T.SubscriptionEvent]) : Nat {
    let latest = latestPerUser(events);
    latest.foldLeft<Principal, T.SubscriptionEvent, Nat>(0, func(acc, _k, e) {
      if (isActiveSubscription(e)) acc + e.amountRs else acc
    });
  };

  /// New MRR = sum of amountRs for plan_purchased events (paid) within the window.
  func computeNewMrr(events : [T.SubscriptionEvent], from : Nat, to : Nat) : Nat {
    events.foldLeft<T.SubscriptionEvent, Nat>(0, func(acc, e) {
      if (e.timestamp >= from and e.timestamp < to
          and e.eventKind == #plan_purchased and e.planTier != #Free)
        acc + e.amountRs
      else acc
    });
  };

  /// Expansion MRR = sum(newAmount − prevAmount) for plan_upgraded events in window
  /// where newAmount > prevAmount.
  func computeExpansionMrr(events : [T.SubscriptionEvent], from : Nat, to : Nat) : Nat {
    events.foldLeft<T.SubscriptionEvent, Nat>(0, func(acc, e) {
      if (e.timestamp >= from and e.timestamp < to and e.eventKind == #plan_upgraded) {
        switch (e.prevAmountRs) {
          case (?prev) {
            if (e.amountRs > prev) acc + (e.amountRs - prev) else acc
          };
          case null acc;
        };
      } else acc
    });
  };

  /// Churned MRR = sum of prevAmountRs for plan_cancelled events in window.
  func computeChurnedMrr(events : [T.SubscriptionEvent], from : Nat, to : Nat) : Nat {
    events.foldLeft<T.SubscriptionEvent, Nat>(0, func(acc, e) {
      if (e.timestamp >= from and e.timestamp < to and e.eventKind == #plan_cancelled) {
        switch (e.prevAmountRs) {
          case (?prev) acc + prev;
          case null    acc + e.amountRs;
        };
      } else acc
    });
  };

  // ── Customer counts ──────────────────────────────────────────────────────────

  /// Total paying customers = distinct users with an active latest subscription.
  public func computeTotalPayingCustomers(events : [T.SubscriptionEvent]) : Nat {
    let latest = latestPerUser(events);
    latest.foldLeft<Principal, T.SubscriptionEvent, Nat>(0, func(acc, _k, e) {
      if (isActiveSubscription(e)) acc + 1 else acc
    });
  };

  /// New customers in window = users whose first-ever paid subscription starts in window.
  func newCustomersInWindow(events : [T.SubscriptionEvent], from : Nat, to : Nat) : Nat {
    // Find earliest plan_purchased (paid) timestamp per user
    let firstPaid = Map.empty<Principal, Nat>();
    for (e in events.values()) {
      if (e.eventKind == #plan_purchased and e.planTier != #Free) {
        switch (firstPaid.get(e.userId)) {
          case null { firstPaid.add(e.userId, e.timestamp) };
          case (?t) { if (e.timestamp < t) { firstPaid.add(e.userId, e.timestamp) } };
        };
      };
    };
    firstPaid.foldLeft<Principal, Nat, Nat>(0, func(acc, _k, t) {
      if (t >= from and t < to) acc + 1 else acc
    });
  };

  /// Churned customers in window = distinct users with plan_cancelled in window.
  func churnedCustomersInWindow(events : [T.SubscriptionEvent], from : Nat, to : Nat) : Nat {
    let seen = Map.empty<Principal, Bool>();
    var count = 0;
    for (e in events.values()) {
      if (e.timestamp >= from and e.timestamp < to and e.eventKind == #plan_cancelled) {
        switch (seen.get(e.userId)) {
          case null { seen.add(e.userId, true); count += 1 };
          case _ {};
        };
      };
    };
    count;
  };

  /// Starting paying customers = active subscribers at windowStart.
  func startingCustomers(events : [T.SubscriptionEvent], windowStart : Nat) : Nat {
    let prior = events.filter(func(e : T.SubscriptionEvent) : Bool { e.timestamp < windowStart });
    let latest = latestPerUser(prior);
    latest.foldLeft<Principal, T.SubscriptionEvent, Nat>(0, func(acc, _k, e) {
      if (isActiveSubscription(e)) acc + 1 else acc
    });
  };

  // ── CAC ──────────────────────────────────────────────────────────────────────

  /// CAC = totalSpend ÷ newPaidCustomers for the month window.
  func computeCac(
    spendRecords     : [T.MarketingSpend],
    newPaidCustomers : Nat,
    from             : Nat,
    to               : Nat,
  ) : T.CacBreakdown {
    var googleAds : Nat = 0;
    var metaAds   : Nat = 0;
    var referral  : Nat = 0;
    var other     : Nat = 0;

    for (s in spendRecords.values()) {
      if (s.timestamp >= from and s.timestamp < to) {
        switch (s.channel) {
          case (#googleAds) { googleAds += s.amountRs };
          case (#metaAds)   { metaAds   += s.amountRs };
          case (#referral)  { referral  += s.amountRs };
          case (#other)     { other     += s.amountRs };
        };
      };
    };

    let totalSpend = googleAds + metaAds + referral + other;
    let cac = if (newPaidCustomers == 0) 0 else totalSpend / newPaidCustomers;

    { googleAds; metaAds; referral; other; totalSpend; newPaidCustomers; cac };
  };

  // ── LTV ──────────────────────────────────────────────────────────────────────

  /// LTV per tier = amountRs × avgRetentionMonths.
  /// avgRetentionMonths ≈ −1 ÷ ln(d30Rate) using geometric series (d30 rate bounded to [0.01, 0.99]).
  /// Blended LTV = Σ(tierLtv × userCount) ÷ totalPayingCustomers.
  func computeLtv(
    events       : [T.SubscriptionEvent],
    cohortRows   : [T.CohortRetentionRow],
    totalPaying  : Nat,
  ) : T.LtvBreakdown {
    // Average d30 across cohort rows — baseline 0.5 when no cohorts
    let avgD30 : Float = if (cohortRows.size() == 0) 0.5 else {
      let sum = cohortRows.foldLeft(0.0, func(acc, r) { acc + r.d30 });
      safeDiv(sum, natF(cohortRows.size()));
    };

    // Count active users per tier
    let latest = latestPerUser(events);
    let tierCounts = Map.empty<Text, Nat>();

    latest.forEach(func(_k, e) {
      if (isActiveSubscription(e)) {
        let key = Common.planTierKey(e.planTier);
        let c = switch (tierCounts.get(key)) { case null 0; case (?n) n };
        tierCounts.add(key, c + 1);
      };
    });

    // avgRetentionMonths = −1 ÷ ln(d30Clamped)
    let d30Clamped  : Float = if (avgD30 < 0.01) 0.01 else if (avgD30 > 0.99) 0.99 else avgD30;
    let avgRetMonths : Float = safeDiv(-1.0, ln(d30Clamped));

    let tiers : [(T.PlanTier, Nat)] = [
      (#Starter, 49),
      (#Growth,  299),
      (#Pro,     999),
      (#Agency,  4999),
    ];

    let byTierList = List.empty<T.TierLtv>();
    for ((tier, amountRs) in tiers.values()) {
      let key = Common.planTierKey(tier);
      let userCount = switch (tierCounts.get(key)) { case null 0; case (?n) n };
      let ltvFloat  = natF(amountRs) * avgRetMonths;
      let ltv : Nat = if (ltvFloat < 0.0) 0 else ltvFloat.toInt().toNat();
      byTierList.add({ tier; amountRs; avgRetentionMonths = avgRetMonths; ltv; userCount });
    };

    let byTier = byTierList.toArray();

    let weightedSum = byTier.foldLeft(0.0, func(acc, row) {
      acc + natF(row.ltv) * natF(row.userCount)
    });
    let blendedLtvFloat = safeDiv(weightedSum, natF(totalPaying));
    let blendedLtv : Nat = if (blendedLtvFloat < 0.0) 0 else blendedLtvFloat.toInt().toNat();

    { byTier; blendedLtv };
  };

  // ── LTV:CAC health ───────────────────────────────────────────────────────────

  func ltvCacHealth(ratio : Float) : T.HealthStatus {
    if (ratio >= 3.0) #healthy
    else if (ratio >= 1.0) #moderate
    else #loss;
  };

  // ── Active users ─────────────────────────────────────────────────────────────

  /// Active users = distinct users with any analytics event in the window.
  func activeUsersInWindow(analyticsEvents : [T.AnalyticsEvent], from : Nat, to : Nat) : Nat {
    let seen = Map.empty<Text, Bool>();
    var count = 0;
    for (e in analyticsEvents.values()) {
      let tNat : Nat = if (e.timestamp < 0) 0 else e.timestamp.toNat();
      if (tNat >= from and tNat < to) {
        switch (seen.get(e.userId)) {
          case null { seen.add(e.userId, true); count += 1 };
          case _ {};
        };
      };
    };
    count;
  };

  // ── Main computation ─────────────────────────────────────────────────────────

  /// Full investor-grade SaaS metrics snapshot for a given month window.
  /// monthTimestamp: nanosecond start of the month window (0-offset = current).
  public func computeSaasMetrics(
    subscriptionEvents : [T.SubscriptionEvent],
    spendRecords       : [T.MarketingSpend],
    analyticsEvts      : [T.AnalyticsEvent],
    monthTimestamp     : Nat,
  ) : T.SaasMetricsResponse {
    let (from, to) = monthWindow(monthTimestamp, 0);

    let openingMrr   = computeOpeningMrr(subscriptionEvents, from);
    let mrr          = computeMrr(subscriptionEvents);
    let newMrr       = computeNewMrr(subscriptionEvents, from, to);
    let expansionMrr = computeExpansionMrr(subscriptionEvents, from, to);
    let churnedMrr   = computeChurnedMrr(subscriptionEvents, from, to);

    // closingMrr = openingMrr + newMrr + expansionMrr − churnedMrr (floored at 0)
    let closingMrr : Nat =
      if (openingMrr + newMrr + expansionMrr >= churnedMrr)
        openingMrr + newMrr + expansionMrr - churnedMrr
      else 0;

    let arr = mrr * 12;

    // NRR = (openingMrr + expansionMrr − churnedMrr) ÷ openingMrr × 100
    let nrr : Float =
      if (openingMrr == 0) 100.0
      else {
        let num : Nat =
          if (openingMrr + expansionMrr >= churnedMrr)
            openingMrr + expansionMrr - churnedMrr
          else 0;
        safeDiv(natF(num), natF(openingMrr)) * 100.0;
      };

    let totalPayingCustomers = computeTotalPayingCustomers(subscriptionEvents);
    let newCustomers         = newCustomersInWindow(subscriptionEvents, from, to);
    let churnedCustomers     = churnedCustomersInWindow(subscriptionEvents, from, to);
    let startCust            = startingCustomers(subscriptionEvents, from);
    let activeUsers          = activeUsersInWindow(analyticsEvts, from, to);

    // Monthly churn rate = churnedCustomers ÷ startingCustomers × 100
    let monthlyChurnRate : Float = safeDiv(natF(churnedCustomers), natF(startCust)) * 100.0;
    // Revenue churn rate = churnedMrr ÷ openingMrr × 100
    let revenueChurnRate : Float = safeDiv(natF(churnedMrr), natF(openingMrr)) * 100.0;
    // Monthly growth rate = (closingMrr − openingMrr) ÷ openingMrr × 100
    let monthlyGrowthRate : Float =
      if (openingMrr == 0) 0.0
      else {
        let delta : Float =
          if (closingMrr >= openingMrr) natF(closingMrr - openingMrr)
          else -(natF(openingMrr - closingMrr));
        safeDiv(delta, natF(openingMrr)) * 100.0;
      };

    let cacByChannel = computeCac(spendRecords, newCustomers, from, to);

    let ltv = computeLtv(subscriptionEvents, [], totalPayingCustomers);

    let ltvCacRatio : Float = safeDiv(natF(ltv.blendedLtv), natF(cacByChannel.cac));

    // CAC payback = cac × totalPayingCustomers ÷ mrr  (months)
    let cacPaybackMonths : Float =
      if (mrr == 0 or totalPayingCustomers == 0) 0.0
      else safeDiv(natF(cacByChannel.cac) * natF(totalPayingCustomers), natF(mrr));

    {
      mrr; arr; newMrr; expansionMrr; churnedMrr; closingMrr; nrr;
      totalPayingCustomers; newCustomers; churnedCustomers; activeUsers;
      monthlyChurnRate; revenueChurnRate; monthlyGrowthRate;
      cacByChannel; ltv;
      ltvCacRatio;
      ltvCacStatus = ltvCacHealth(ltvCacRatio);
      cacPaybackMonths;
      dateRange = { from; to };
    };
  };

  /// Variant of computeSaasMetrics that feeds actual cohort rows into the LTV calculation.
  public func computeSaasMetricsWithCohorts(
    subscriptionEvents : [T.SubscriptionEvent],
    spendRecords       : [T.MarketingSpend],
    analyticsEvts      : [T.AnalyticsEvent],
    monthTimestamp     : Nat,
    cohortRows         : [T.CohortRetentionRow],
  ) : T.SaasMetricsResponse {
    let base = computeSaasMetrics(subscriptionEvents, spendRecords, analyticsEvts, monthTimestamp);
    let ltv = computeLtv(subscriptionEvents, cohortRows, base.totalPayingCustomers);
    let ltvCacRatio : Float = safeDiv(natF(ltv.blendedLtv), natF(base.cacByChannel.cac));
    let cacPaybackMonths : Float =
      if (base.mrr == 0 or base.totalPayingCustomers == 0) 0.0
      else safeDiv(natF(base.cacByChannel.cac) * natF(base.totalPayingCustomers), natF(base.mrr));
    {
      base with
      ltv;
      ltvCacRatio;
      ltvCacStatus = ltvCacHealth(ltvCacRatio);
      cacPaybackMonths;
    };
  };

  // ── Cohort retention ─────────────────────────────────────────────────────────

  /// Build cohort retention rows from subscription + analytics events.
  /// Groups by first-subscription month (approximate YYYY-MM).
  /// D1/D7/D30/D60 = fraction of cohort with activity on day N after their first event.
  public func computeCohortRetention(
    subscriptionEvents : [T.SubscriptionEvent],
    analyticsEvts      : [T.AnalyticsEvent],
  ) : [T.CohortRetentionRow] {
    // userId → first subscription timestamp
    let firstSub = Map.empty<Principal, Nat>();
    for (e in subscriptionEvents.values()) {
      if (e.eventKind == #plan_purchased) {
        switch (firstSub.get(e.userId)) {
          case null { firstSub.add(e.userId, e.timestamp) };
          case (?t) { if (e.timestamp < t) { firstSub.add(e.userId, e.timestamp) } };
        };
      };
    };

    // userId (Text) → sorted list of analytics event timestamps (Nat)
    let userActivity = Map.empty<Text, List.List<Nat>>();
    for (ae in analyticsEvts.values()) {
      let t : Nat = if (ae.timestamp < 0) 0 else ae.timestamp.toNat();
      switch (userActivity.get(ae.userId)) {
        case null {
          let l = List.empty<Nat>();
          l.add(t);
          userActivity.add(ae.userId, l);
        };
        case (?l) { l.add(t) };
      };
    };

    // Group users by signup month (approximate from timestamp)
    let cohortGroups = Map.empty<Text, List.List<Principal>>();
    firstSub.forEach(func(userId, firstTs) {
      let secs        : Nat = firstTs / secondNs;
      let days        : Nat = secs / 86400;
      let year        : Nat = 1970 + days / 365;
      let month       : Nat = (days % 365) / 30 + 1;
      let monthStr = year.toText() # "-" # (if (month < 10) "0" # month.toText() else month.toText());

      switch (cohortGroups.get(monthStr)) {
        case null {
          let l = List.empty<Principal>();
          l.add(userId);
          cohortGroups.add(monthStr, l);
        };
        case (?l) { l.add(userId) };
      };
    });

    let resultList = List.empty<T.CohortRetentionRow>();

    cohortGroups.forEach(func(monthStr, members) {
      let cohortSize = members.size();
      if (cohortSize == 0) return;

      var retD1 = 0; var retD7 = 0; var retD30 = 0; var retD60 = 0;

      members.forEach(func(userId) {
        let uidText = userId.toText();
        let firstTsOpt = firstSub.get(userId);
        switch (firstTsOpt) {
          case null {};
          case (?firstTs) {
            let hasActivity = func(from : Nat, to : Nat) : Bool {
              switch (userActivity.get(uidText)) {
                case null false;
                case (?times) { times.any(func(t : Nat) : Bool { t >= from and t < to }) };
              };
            };
            if (hasActivity(firstTs + dayNs,       firstTs + 2 * dayNs))      { retD1  += 1 };
            if (hasActivity(firstTs + 7 * dayNs,   firstTs + 8 * dayNs))      { retD7  += 1 };
            if (hasActivity(firstTs + 30 * dayNs,  firstTs + 31 * dayNs))     { retD30 += 1 };
            if (hasActivity(firstTs + 60 * dayNs,  firstTs + 61 * dayNs))     { retD60 += 1 };
          };
        };
      });

      let sz = natF(cohortSize);
      resultList.add({
        week = monthStr; cohortSize;
        d1 = safeDiv(natF(retD1), sz); d7 = safeDiv(natF(retD7), sz);
        d30 = safeDiv(natF(retD30), sz); d60 = safeDiv(natF(retD60), sz);
        retainedD1 = retD1; retainedD7 = retD7;
        retainedD30 = retD30; retainedD60 = retD60;
      });
    });

    resultList.toArray();
  };

  // ── Health alerts ────────────────────────────────────────────────────────────

  /// Generate health alerts. freeToPaidConvPct is 0–100 scale from analytics funnel.
  ///
  /// Alert thresholds (investor-grade):
  ///   1. monthlyChurnRate > 5%           → critical
  ///   2. freeToPaidConversion < 10%      → warning
  ///   3. CAC rose > 15% vs prev month    → warning
  ///   4. ltvCacRatio < 2.0               → warning
  public func computeHealthAlerts(
    metrics           : T.SaasMetricsResponse,
    prevMetrics       : ?T.SaasMetricsResponse,
    freeToPaidConvPct : Float,
  ) : [T.HealthAlert] {
    let alerts = List.empty<T.HealthAlert>();
    let now : Nat = metrics.dateRange.to;

    if (metrics.monthlyChurnRate > 5.0) {
      alerts.add({
        alertId   = "churn_high";
        alert     = "Monthly churn rate is above 5% — investigate retention immediately";
        severity  = #critical;
        metric    = "monthlyChurnRate";
        threshold = "5%";
        actual    = metrics.monthlyChurnRate.toText() # "%";
        timestamp = now;
      });
    };

    if (freeToPaidConvPct >= 0.0 and freeToPaidConvPct < 10.0) {
      alerts.add({
        alertId   = "conversion_low";
        alert     = "Free to paid conversion is below 10% — review paywall triggers and onboarding";
        severity  = #warning;
        metric    = "freeToPaidConversion";
        threshold = "10%";
        actual    = freeToPaidConvPct.toText() # "%";
        timestamp = now;
      });
    };

    switch (prevMetrics) {
      case null {};
      case (?prev) {
        if (prev.cacByChannel.cac > 0) {
          let delta = safeDiv(
            natF(metrics.cacByChannel.cac) - natF(prev.cacByChannel.cac),
            natF(prev.cacByChannel.cac)
          ) * 100.0;
          if (delta > 15.0) {
            alerts.add({
              alertId   = "cac_rising";
              alert     = "Customer acquisition cost rose more than 15% vs last month";
              severity  = #warning;
              metric    = "cac";
              threshold = "+15% vs prev month";
              actual    = "+" # delta.toText() # "%";
              timestamp = now;
            });
          };
        };
      };
    };

    if (metrics.ltvCacRatio >= 0.0 and metrics.ltvCacRatio < 2.0) {
      alerts.add({
        alertId   = "ltvcac_low";
        alert     = "LTV:CAC ratio is below 2× — unit economics need improvement";
        severity  = #warning;
        metric    = "ltvCacRatio";
        threshold = "2×";
        actual    = metrics.ltvCacRatio.toText() # "×";
        timestamp = now;
      });
    };

    alerts.toArray();
  };
};
