import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import T "../types/viral-growth-tracking";
import RT "../types/referral";
import Lib "../lib/viral-growth-tracking";

mixin (
  trafficAttributions : List.List<T.TrafficSourceAttribution>,
  challengeParticipants : List.List<T.ChallengeParticipant>,
  featureUnlockSessions : List.List<T.FeatureUnlockSession>,
  nudgeDeliveries : List.List<T.NudgeDelivery>,
  referralFunnelEvents : List.List<T.ReferralFunnelEvent>,
  viralGrowthCounters : T.ViralGrowthTrackingCounters,
  referrals : List.List<RT.ReferralRecord>,
) {
  // ── Traffic Source Attribution ─────────────────────────────────────────────

  /// Record which source (referral/organic/direct/ads) brought a newly signed-up user.
  /// Call this at signup time, passing the referral code when applicable.
  public shared func recordTrafficSourceAttribution(
    userId : Text,
    source : T.TrafficSource,
    referralCode : ?Text,
  ) : async () {
    let nowNs = Time.now();
    Lib.recordTrafficSourceAttribution(
      trafficAttributions,
      userId,
      source,
      referralCode,
      nowNs,
    );
  };

  /// Return % split of signups by source for the last 30 or 90 days.
  public query func getTrafficSourceBreakdown(periodDays : Nat) : async T.TrafficSourceBreakdown {
    let nowNs = Time.now();
    Lib.getTrafficSourceBreakdown(trafficAttributions, periodDays, nowNs);
  };

  /// Admin: list all raw attribution records (for cohort analysis by acquisition source).
  public query func listTrafficAttributions() : async [T.TrafficSourceAttribution] {
    Lib.listAttributions(trafficAttributions);
  };

  // ── Challenge Participation Tracking ──────────────────────────────────────

  /// Join the weekly challenge for the calling user; records user_joined_challenge event.
  public shared ({ caller }) func joinChallenge(
    displayName : Text,
    city : Text,
    isoWeek : Text,
  ) : async () {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.joinChallenge(challengeParticipants, userId, displayName, city, isoWeek, nowNs);
  };

  /// Update calling user's weekly lead tally in the challenge participant tracker.
  public shared ({ caller }) func updateChallengeLeadsCount(
    isoWeek : Text,
    leadsToAdd : Nat,
  ) : async () {
    let userId = caller.toText();
    Lib.updateChallengeLeadsCount(challengeParticipants, userId, isoWeek, leadsToAdd);
  };

  /// List all participants with current lead count, rank, and city for an ISO week.
  public query func getChallengeParticipants(isoWeek : Text) : async [T.ChallengeParticipant] {
    Lib.getChallengeParticipants(challengeParticipants, isoWeek);
  };

  /// Admin: finalize the week — compute final ranks and award credits/badges to top 3.
  public shared func finalizeChallengeWeek(isoWeek : Text) : async [T.FinalizedChallengeResult] {
    Lib.finalizeChallengeWeek(challengeParticipants, isoWeek);
  };

  // ── Invite-to-Unlock Feature Gating ───────────────────────────────────────

  /// Return whether the calling user has unlocked a gated feature (3+ invites required).
  public query ({ caller }) func checkFeatureUnlock(
    featureName : T.GatedFeatureName,
  ) : async T.FeatureUnlockCheck {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.checkFeatureUnlock(featureUnlockSessions, referrals, userId, featureName, nowNs);
  };

  /// Activate (or refresh) a temporary feature unlock session for the calling user.
  public shared ({ caller }) func activateFeatureUnlock(
    featureName : T.GatedFeatureName,
  ) : async T.FeatureUnlockSession {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.activateFeatureUnlock(featureUnlockSessions, referrals, userId, featureName, nowNs);
  };

  /// Decrement the usage counter for the calling user's active feature unlock session.
  public shared ({ caller }) func recordFeatureUnlockUsed(
    featureName : T.GatedFeatureName,
  ) : async () {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.recordFeatureUnlockUsed(featureUnlockSessions, userId, featureName, nowNs);
  };

  /// Admin: how many users are currently using each invite-gated feature.
  public query func listGatedFeatureAdminStats() : async [T.GatedFeatureAdminStat] {
    let nowNs = Time.now();
    Lib.listGatedFeatureAdminStats(featureUnlockSessions, nowNs);
  };

  // ── Nudge Performance Metrics ──────────────────────────────────────────────

  /// Record that a nudge was delivered to a user.
  public shared func recordNudgeDelivery(
    userId : Text,
    nudgeType : T.NudgeType,
    userSegment : T.UserSegment,
  ) : async T.NudgeDelivery {
    let nowNs = Time.now();
    Lib.recordNudgeDelivery(nudgeDeliveries, viralGrowthCounters, userId, nudgeType, userSegment, nowNs);
  };

  /// Mark that a user took action after receiving a nudge (e.g. sent a message).
  public shared func markNudgeActionTaken(
    deliveryId : Nat,
    converted : Bool,
  ) : async () {
    let nowNs = Time.now();
    Lib.markNudgeActionTaken(nudgeDeliveries, deliveryId, nowNs, converted);
  };

  /// Admin: per-nudge-type stats (sent, actions, action rate, conversion lift) by user segment.
  public query func getNudgeDeliveryStats() : async [T.NudgePerformanceStat] {
    Lib.getNudgePerformanceMetrics(nudgeDeliveries);
  };

  // ── Referral Attribution Funnel ────────────────────────────────────────────

  /// Record a landing_view event when a visitor opens a referral link.
  public shared ({ caller }) func trackReferralLandingView(referralCode : Text) : async () {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.trackReferralLandingView(referralFunnelEvents, viralGrowthCounters, userId, referralCode, nowNs);
  };

  /// Record a share_clicked event with the social platform and optional win-card id.
  public shared ({ caller }) func trackShareClick(
    referralCode : Text,
    platform : Text,
    cardId : ?Text,
  ) : async () {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.trackShareClick(referralFunnelEvents, viralGrowthCounters, userId, referralCode, platform, cardId, nowNs);
  };

  /// Record any other referral funnel event (signup_started, signup_completed, reward_claimed, etc.).
  public shared ({ caller }) func trackReferralFunnelEvent(
    eventType : T.ReferralFunnelEventType,
    referralCode : Text,
    platform : ?Text,
    cardId : ?Text,
  ) : async () {
    let userId = caller.toText();
    let nowNs = Time.now();
    Lib.trackReferralFunnelEvent(
      referralFunnelEvents,
      viralGrowthCounters,
      userId,
      eventType,
      referralCode,
      platform,
      cardId,
      nowNs,
    );
  };

  /// Return the full referral funnel: link_generated → share_clicked → landing_view
  /// → signup_started → signup_completed → reward_claimed, with % conversion per step.
  public query func getReferralFunnelStats() : async T.ReferralFunnelStats {
    Lib.getReferralFunnelStats(referralFunnelEvents);
  };
};
