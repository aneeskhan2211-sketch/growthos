import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import T "../types/viral-growth-tracking";
import RT "../types/referral";
import Common "../types/common";

module {
  // ── Traffic Source Attribution ─────────────────────────────────────────────

  /// Record a traffic source attribution for a newly signed-up user.
  public func recordTrafficSourceAttribution(
    attributions : List.List<T.TrafficSourceAttribution>,
    userId : Text,
    source : T.TrafficSource,
    referralCode : ?Text,
    signedUpAt : Common.Timestamp,
  ) : () {
    attributions.add({
      userId;
      source;
      referralCode;
      signedUpAt;
    });
  };

  /// Return % breakdown of signups by source for last 30 or 90 days.
  public func getTrafficSourceBreakdown(
    attributions : List.List<T.TrafficSourceAttribution>,
    periodDays : Nat,
    nowNs : Common.Timestamp,
  ) : T.TrafficSourceBreakdown {
    // Period cutoff: nowNs - periodDays * 86_400_000_000_000 nanoseconds
    let cutoff : Int = nowNs - (periodDays * 86_400_000_000_000 : Nat);

    var refCount = 0;
    var orgCount = 0;
    var dirCount = 0;
    var adsCount = 0;

    attributions.forEach(func(a) {
      if (a.signedUpAt >= cutoff) {
        switch (a.source) {
          case (#referral) { refCount += 1 };
          case (#organic) { orgCount += 1 };
          case (#direct) { dirCount += 1 };
          case (#ads) { adsCount += 1 };
        };
      };
    });

    let total = refCount + orgCount + dirCount + adsCount;

    let refPct : Float = if (total == 0) 0.0 else refCount.toFloat() / total.toFloat() * 100.0;
    let orgPct : Float = if (total == 0) 0.0 else orgCount.toFloat() / total.toFloat() * 100.0;
    let dirPct : Float = if (total == 0) 0.0 else dirCount.toFloat() / total.toFloat() * 100.0;
    let adsPct : Float = if (total == 0) 0.0 else adsCount.toFloat() / total.toFloat() * 100.0;

    {
      periodDays;
      referralCount = refCount;
      organicCount = orgCount;
      directCount = dirCount;
      adsCount = adsCount;
      referralPct = refPct;
      organicPct = orgPct;
      directPct = dirPct;
      adsPct = adsPct;
    };
  };

  /// Return all attributions for admin cohort queries.
  public func listAttributions(
    attributions : List.List<T.TrafficSourceAttribution>,
  ) : [T.TrafficSourceAttribution] {
    attributions.toArray();
  };

  // ── Challenge Participation Tracking ──────────────────────────────────────

  /// Record that a user joined the weekly challenge.
  public func joinChallenge(
    participants : List.List<T.ChallengeParticipant>,
    userId : Text,
    displayName : Text,
    city : Text,
    isoWeek : Text,
    joinedAt : Common.Timestamp,
  ) : () {
    // If already joined this week, update displayName/city but keep leadsCount
    let existing = participants.find(func(p) {
      p.userId == userId and p.isoWeek == isoWeek
    });
    switch (existing) {
      case (?_) {
        participants.mapInPlace(func(p) {
          if (p.userId == userId and p.isoWeek == isoWeek) {
            { p with displayName; city }
          } else { p }
        });
      };
      case null {
        participants.add({
          userId;
          displayName;
          city;
          isoWeek;
          leadsCount = 0;
          rank = 0;
          joinedAt;
          rewarded = false;
        });
      };
    };
  };

  /// Update a participant's lead tally for the current week.
  public func updateChallengeLeadsCount(
    participants : List.List<T.ChallengeParticipant>,
    userId : Text,
    isoWeek : Text,
    leadsToAdd : Nat,
  ) : () {
    participants.mapInPlace(func(p) {
      if (p.userId == userId and p.isoWeek == isoWeek) {
        { p with leadsCount = p.leadsCount + leadsToAdd }
      } else { p }
    });
  };

  /// List all participants with current lead count and rank for a given week.
  public func getChallengeParticipants(
    participants : List.List<T.ChallengeParticipant>,
    isoWeek : Text,
  ) : [T.ChallengeParticipant] {
    // Filter to this week then sort desc by leadsCount
    let weekList = participants.filter(func(p) { p.isoWeek == isoWeek });
    let sorted = weekList.sort(func(a, b) {
      if (a.leadsCount > b.leadsCount) #less
      else if (a.leadsCount < b.leadsCount) #greater
      else #equal
    });
    // Assign ranks
    let arr = sorted.toArray();
    arr.mapEntries<T.ChallengeParticipant, T.ChallengeParticipant>(
      func(p, i) { { p with rank = i + 1 } }
    );
  };

  /// Auto-finalize weekly challenge: compute final ranks, award credits/badges to top 3.
  public func finalizeChallengeWeek(
    participants : List.List<T.ChallengeParticipant>,
    isoWeek : Text,
  ) : [T.FinalizedChallengeResult] {
    let ranked = getChallengeParticipants(participants, isoWeek);

    // Mark top 3 as rewarded in the live list
    participants.mapInPlace(func(p) {
      if (p.isoWeek == isoWeek) {
        let rank = switch (ranked.find(func(r) { r.userId == p.userId })) {
          case (?r) r.rank;
          case null 999;
        };
        if (rank <= 3) { { p with rewarded = true } } else { p }
      } else { p }
    });

    // Build result records for top 3 (or fewer if fewer participants)
    let top3 = ranked.filter(func(p) { p.rank <= 3 });
    top3.map<T.ChallengeParticipant, T.FinalizedChallengeResult>(func(p) {
      let (credits, badge) : (Nat, Text) = switch (p.rank) {
        case 1 (500, "gold");
        case 2 (250, "silver");
        case 3 (100, "bronze");
        case _ (0, "none");
      };
      {
        userId = p.userId;
        displayName = p.displayName;
        city = p.city;
        isoWeek;
        finalRank = p.rank;
        creditsAwarded = credits;
        badgeAwarded = badge;
      }
    });
  };

  // ── Invite-to-Unlock Feature Gating ───────────────────────────────────────

  /// Count how many completed referrals a user has.
  private func countCompletedReferrals(
    referrals : List.List<RT.ReferralRecord>,
    userId : Text,
  ) : Nat {
    referrals.foldLeft<Nat, RT.ReferralRecord>(0, func(acc, r) {
      if (r.referrerId.toText() == userId and r.status == #completed) {
        acc + 1
      } else { acc }
    });
  };

  /// Find the active (non-expired) session for a user+feature.
  private func findActiveSession(
    sessions : List.List<T.FeatureUnlockSession>,
    userId : Text,
    featureName : T.GatedFeatureName,
    nowNs : Common.Timestamp,
  ) : ?T.FeatureUnlockSession {
    sessions.find(func(s) {
      s.userId == userId and
      s.featureName == featureName and
      s.expiresAt > nowNs
    });
  };

  /// Check whether a user has enough invites (3+) to unlock a gated feature temporarily.
  public func checkFeatureUnlock(
    sessions : List.List<T.FeatureUnlockSession>,
    referrals : List.List<RT.ReferralRecord>,
    userId : Text,
    featureName : T.GatedFeatureName,
    nowNs : Common.Timestamp,
  ) : T.FeatureUnlockCheck {
    let currentInvites = countCompletedReferrals(referrals, userId);
    let activeSession = findActiveSession(sessions, userId, featureName, nowNs);
    let (isUnlocked, usageCount, expiresAt) = switch (activeSession) {
      case (?s) (true, s.usageCount, ?s.expiresAt);
      case null (false, 0, null);
    };
    {
      featureName;
      isUnlocked;
      requiredInvites = 3;
      currentInvites;
      usageCount;
      expiresAt;
    };
  };

  /// Activate (or refresh) a temporary feature unlock session for a user.
  public func activateFeatureUnlock(
    sessions : List.List<T.FeatureUnlockSession>,
    referrals : List.List<RT.ReferralRecord>,
    userId : Text,
    featureName : T.GatedFeatureName,
    nowNs : Common.Timestamp,
  ) : T.FeatureUnlockSession {
    let currentInvites = countCompletedReferrals(referrals, userId);
    if (currentInvites < 3) {
      Runtime.trap("Not enough referrals to unlock feature. Need 3, have " # currentInvites.toText());
    };
    // 24h in nanoseconds
    let expiresAt : Common.Timestamp = nowNs + 86_400_000_000_000;
    let newSession : T.FeatureUnlockSession = {
      userId;
      featureName;
      unlockedAt = nowNs;
      expiresAt;
      usageCount = 0;
    };
    // Remove any old session for same user+feature, then add fresh one
    let filtered = sessions.filter(func(s) {
      not (s.userId == userId and s.featureName == featureName)
    });
    sessions.clear();
    sessions.append(filtered);
    sessions.add(newSession);
    newSession;
  };

  /// Increment the usage counter on an active feature unlock session.
  public func recordFeatureUnlockUsed(
    sessions : List.List<T.FeatureUnlockSession>,
    userId : Text,
    featureName : T.GatedFeatureName,
    nowNs : Common.Timestamp,
  ) : () {
    sessions.mapInPlace(func(s) {
      if (s.userId == userId and s.featureName == featureName and s.expiresAt > nowNs) {
        { s with usageCount = s.usageCount + 1 }
      } else { s }
    });
  };

  /// Admin: return stats on how many users are currently using each gated feature.
  public func listGatedFeatureAdminStats(
    sessions : List.List<T.FeatureUnlockSession>,
    nowNs : Common.Timestamp,
  ) : [T.GatedFeatureAdminStat] {
    let allFeatures : [T.GatedFeatureName] = [#export_leads, #bulk_send, #advanced_analytics];
    allFeatures.map<T.GatedFeatureName, T.GatedFeatureAdminStat>(func(feat) {
      var activeUsers = 0;
      var totalUsage = 0;
      sessions.forEach(func(s) {
        if (s.featureName == feat) {
          totalUsage += s.usageCount;
          if (s.expiresAt > nowNs) { activeUsers += 1 };
        };
      });
      {
        featureName = switch (feat) {
          case (#export_leads) "export_leads";
          case (#bulk_send) "bulk_send";
          case (#advanced_analytics) "advanced_analytics";
        };
        activeUserCount = activeUsers;
        totalUsageCount = totalUsage;
      }
    });
  };

  // ── Nudge Performance Metrics ──────────────────────────────────────────────

  /// Record a nudge delivery event.
  public func recordNudgeDelivery(
    deliveries : List.List<T.NudgeDelivery>,
    counters : T.ViralGrowthTrackingCounters,
    userId : Text,
    nudgeType : T.NudgeType,
    userSegment : T.UserSegment,
    sentAt : Common.Timestamp,
  ) : T.NudgeDelivery {
    let id = counters.nextNudgeDeliveryId;
    counters.nextNudgeDeliveryId += 1;
    let delivery : T.NudgeDelivery = {
      id;
      userId;
      nudgeType;
      userSegment;
      sentAt;
      actionTakenAt = null;
      converted = false;
    };
    deliveries.add(delivery);
    delivery;
  };

  /// Mark action taken on a previously delivered nudge.
  public func markNudgeActionTaken(
    deliveries : List.List<T.NudgeDelivery>,
    deliveryId : Nat,
    actionTakenAt : Common.Timestamp,
    converted : Bool,
  ) : () {
    deliveries.mapInPlace(func(d) {
      if (d.id == deliveryId) {
        { d with actionTakenAt = ?actionTakenAt; converted }
      } else { d }
    });
  };

  /// Aggregate nudge performance by (nudgeType, userSegment).
  public func getNudgePerformanceMetrics(
    deliveries : List.List<T.NudgeDelivery>,
  ) : [T.NudgePerformanceStat] {
    let allTypes : [T.NudgeType] = [#urgency, #fomo, #reward, #money_visibility];
    let allSegments : [T.UserSegment] = [#LowActivity, #Medium, #HighIntent];

    // Compute overall action rate for conversionLiftPct baseline
    let totalDeliveries = deliveries.size();
    let totalActions = deliveries.foldLeft(0, func(acc, d) {
      if (d.converted) acc + 1 else acc
    });
    let baselineRate : Float = if (totalDeliveries == 0) 0.0
      else totalActions.toFloat() / totalDeliveries.toFloat() * 100.0;

    let results = List.empty<T.NudgePerformanceStat>();

    for (nudgeType in allTypes.values()) {
      for (seg in allSegments.values()) {
        var sent = 0;
        var actions = 0;
        var conversions = 0;
        deliveries.forEach(func(d) {
          if (d.nudgeType == nudgeType and d.userSegment == seg) {
            sent += 1;
            switch (d.actionTakenAt) {
              case (?_) { actions += 1 };
              case null {};
            };
            if (d.converted) { conversions += 1 };
          };
        });
        if (sent > 0) {
          let actionRate = actions.toFloat() / sent.toFloat() * 100.0;
          let convRate = conversions.toFloat() / sent.toFloat() * 100.0;
          results.add({
            nudgeType;
            userSegment = seg;
            sentCount = sent;
            actionCount = actions;
            actionRatePct = actionRate;
            conversionLiftPct = convRate - baselineRate;
          });
        };
      };
    };

    results.toArray();
  };

  // ── Referral Attribution Funnel ────────────────────────────────────────────

  /// Generic helper to append a funnel event.
  private func appendFunnelEvent(
    funnelEvents : List.List<T.ReferralFunnelEvent>,
    counters : T.ViralGrowthTrackingCounters,
    userId : Text,
    eventType : T.ReferralFunnelEventType,
    referralCode : Text,
    platform : ?Text,
    cardId : ?Text,
    timestamp : Common.Timestamp,
  ) : () {
    let id = counters.nextReferralFunnelEventId;
    counters.nextReferralFunnelEventId += 1;
    funnelEvents.add({
      id;
      userId;
      eventType;
      referralCode;
      platform;
      cardId;
      timestamp;
    });
  };

  /// Record a landing_view event when a user visits a referral link.
  public func trackReferralLandingView(
    funnelEvents : List.List<T.ReferralFunnelEvent>,
    counters : T.ViralGrowthTrackingCounters,
    userId : Text,
    referralCode : Text,
    timestamp : Common.Timestamp,
  ) : () {
    appendFunnelEvent(funnelEvents, counters, userId, #landing_view, referralCode, null, null, timestamp);
  };

  /// Record a share_clicked event with platform and card id.
  public func trackShareClick(
    funnelEvents : List.List<T.ReferralFunnelEvent>,
    counters : T.ViralGrowthTrackingCounters,
    userId : Text,
    referralCode : Text,
    platform : Text,
    cardId : ?Text,
    timestamp : Common.Timestamp,
  ) : () {
    appendFunnelEvent(funnelEvents, counters, userId, #share_clicked, referralCode, ?platform, cardId, timestamp);
  };

  /// Record any generic referral funnel event (signup_started, signup_completed, etc.).
  public func trackReferralFunnelEvent(
    funnelEvents : List.List<T.ReferralFunnelEvent>,
    counters : T.ViralGrowthTrackingCounters,
    userId : Text,
    eventType : T.ReferralFunnelEventType,
    referralCode : Text,
    platform : ?Text,
    cardId : ?Text,
    timestamp : Common.Timestamp,
  ) : () {
    appendFunnelEvent(funnelEvents, counters, userId, eventType, referralCode, platform, cardId, timestamp);
  };

  /// Return the full referral funnel with step counts and % conversion per step.
  public func getReferralFunnelStats(
    funnelEvents : List.List<T.ReferralFunnelEvent>,
  ) : T.ReferralFunnelStats {
    let orderedSteps : [(T.ReferralFunnelEventType, Text)] = [
      (#link_generated,   "Link Generated"),
      (#share_clicked,    "Share Clicked"),
      (#landing_view,     "Landing View"),
      (#signup_started,   "Signup Started"),
      (#signup_completed, "Signup Completed"),
      (#reward_claimed,   "Reward Claimed"),
    ];

    // Count each step
    let counts = orderedSteps.map(
      func((evType, name)) {
        var count = 0;
        funnelEvents.forEach(func(e) {
          if (e.eventType == evType) { count += 1 };
        });
        (name, count)
      }
    );

    // Build steps with conversion % relative to previous step
    var prevCount : Nat = 0;
    let steps = counts.mapEntries(
      func((name, count), idx) {
        let pct : Float = if (idx == 0 or prevCount == 0) 100.0
          else count.toFloat() / prevCount.toFloat() * 100.0;
        prevCount := count;
        { stepName = name; count; conversionPct = pct }
      }
    );

    let linksGenerated = switch (counts.find(func((n, _)) { n == "Link Generated" })) {
      case (?(_, c)) c;
      case null 0;
    };
    let rewardsClaimed = switch (counts.find(func((n, _)) { n == "Reward Claimed" })) {
      case (?(_, c)) c;
      case null 0;
    };

    {
      steps;
      totalLinksGenerated = linksGenerated;
      totalRewardsClaimed = rewardsClaimed;
    };
  };
};
