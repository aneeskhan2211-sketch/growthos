import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import T "../types/referral";
import AT "../types/analytics-and-tracking";
import AnalyticsLib "../lib/analytics-and-tracking";

module {
  // ── Code generation ───────────────────────────────────────────────────────

  /// Deterministic referral code derived from a Principal's text representation.
  /// Takes the first 4 alphanumeric chars + last 4 alphanumeric chars, uppercased.
  public func generateReferralCode(userId : Principal) : Text {
    let raw = userId.toText();
    let chars = raw.toArray();
    var code = "";
    var taken = 0;
    var i = 0;
    while (i < chars.size() and taken < 4) {
      let c = chars[i];
      if (c != '-') {
        code := code # Text.fromChar(c);
        taken += 1;
      };
      i += 1;
    };
    var j = chars.size();
    var suffix = "";
    var suffixTaken = 0;
    while (j > 0 and suffixTaken < 4) {
      j -= 1;
      let c = chars[j];
      if (c != '-') {
        suffix := Text.fromChar(c) # suffix;
        suffixTaken += 1;
      };
    };
    (code # suffix).toUpper();
  };

  // ── CRUD ──────────────────────────────────────────────────────────────────

  public func createReferral(
    referrals : List.List<T.ReferralRecord>,
    counters : T.ReferralCounters,
    referrerId : Principal,
  ) : T.ReferralRecord {
    let id = counters.nextReferralId;
    counters.nextReferralId += 1;
    let record : T.ReferralRecord = {
      id;
      referrerId;
      referralCode = generateReferralCode(referrerId);
      referredUserId = null;
      status = #created;
      createdAt = Time.now();
      completedAt = null;
      rewardClaimed = false;
    };
    referrals.add(record);
    record;
  };

  /// Claim a referral by code: link the newUserId, mark #signedUp.
  /// If the referral was already #signedUp, complete it and award credits.
  /// Returns true if a matching referral code was found and processed.
  public func claimReferralByCode(
    referrals : List.List<T.ReferralRecord>,
    analyticsEvents : List.List<AT.AnalyticsEvent>,
    analyticsCounters : AT.AnalyticsCounters,
    retentionMap : Map.Map<Text, AT.RetentionData>,
    code : Text,
    newUserId : Principal,
  ) : Bool {
    let upperCode = code.toUpper();
    let matched = referrals.find(func(r) { r.referralCode == upperCode and r.status == #created });
    switch (matched) {
      case null { false };
      case (?r) {
        // Mark as signed up
        referrals.mapInPlace(func(rec) {
          if (rec.id == r.id) {
            { rec with referredUserId = ?newUserId; status = #signedUp }
          } else rec
        });
        // Log signup event
        ignore AnalyticsLib.recordAnalyticsEvent(
          analyticsEvents, analyticsCounters,
          newUserId.toText(), #user_churn_risk, [("event", "referral_signup"), ("code", upperCode)]
        );
        // Complete: award 50 credits to both sides
        completeReferral(referrals, analyticsEvents, analyticsCounters, retentionMap, r.id, newUserId);
        true
      };
    };
  };

  func completeReferral(
    referrals : List.List<T.ReferralRecord>,
    analyticsEvents : List.List<AT.AnalyticsEvent>,
    analyticsCounters : AT.AnalyticsCounters,
    retentionMap : Map.Map<Text, AT.RetentionData>,
    referralId : Nat,
    referredUserId : Principal,
  ) {
    let now = Time.now();
    // Find the referral to get referrerId
    let referralOpt = referrals.find(func(r) { r.id == referralId });
    switch (referralOpt) {
      case null {};
      case (?r) {
        // Update status to completed
        referrals.mapInPlace(func(rec) {
          if (rec.id == referralId) {
            { rec with status = #completed; completedAt = ?now; rewardClaimed = true }
          } else rec
        });
        // Award 50 credits to referrer
        AnalyticsLib.awardCredits(retentionMap, r.referrerId.toText(), 50);
        // Award 50 credits to referred user
        AnalyticsLib.awardCredits(retentionMap, referredUserId.toText(), 50);
        // Log referral_completed event for referrer
        ignore AnalyticsLib.recordAnalyticsEvent(
          analyticsEvents, analyticsCounters,
          r.referrerId.toText(), #user_churn_risk, [("event", "referral_completed"), ("referredUser", referredUserId.toText())]
        );
      };
    };
  };

  // ── Queries ───────────────────────────────────────────────────────────────

  public func getReferralStats(
    referrals : List.List<T.ReferralRecord>,
    userId : Principal,
  ) : T.ReferralStats {
    let userReferrals = referrals.filter(func(r) { Principal.equal(r.referrerId, userId) });
    let totalInvited = userReferrals.size();
    let signedUp = userReferrals.filter(func(r) { r.status == #signedUp or r.status == #completed }).size();
    let completed = userReferrals.filter(func(r) { r.status == #completed }).size();
    let creditsEarned = completed * 50;
    let trialDaysEarned = completed * 7; // 7 trial days per completed referral
    { totalInvited; signedUp; completed; creditsEarned; trialDaysEarned };
  };

  public func listUserReferrals(
    referrals : List.List<T.ReferralRecord>,
    userId : Principal,
  ) : [T.ReferralRecord] {
    referrals.filter(func(r) { Principal.equal(r.referrerId, userId) }).toArray();
  };
};
