import List "mo:core/List";
import Map "mo:core/Map";
import ReferralLib "../lib/referral";
import T "../types/referral";
import AT "../types/analytics-and-tracking";

mixin (
  referrals : List.List<T.ReferralRecord>,
  referralCounters : T.ReferralCounters,
  analyticsEvents : List.List<AT.AnalyticsEvent>,
  analyticsCounters : AT.AnalyticsCounters,
  retentionMap : Map.Map<Text, AT.RetentionData>,
) {
  /// Create a new referral for the calling user (generates a unique code).
  public shared ({ caller }) func createReferral() : async T.ReferralRecord {
    ReferralLib.createReferral(referrals, referralCounters, caller);
  };

  /// Claim a referral code on behalf of the calling user (newly signed-up user).
  public shared ({ caller }) func claimReferralByCode(code : Text) : async Bool {
    ReferralLib.claimReferralByCode(
      referrals,
      analyticsEvents,
      analyticsCounters,
      retentionMap,
      code,
      caller,
    );
  };

  /// Get referral statistics for the calling user.
  public query ({ caller }) func getReferralStats() : async T.ReferralStats {
    ReferralLib.getReferralStats(referrals, caller);
  };

  /// List all referral records created by the calling user.
  public query ({ caller }) func listUserReferrals() : async [T.ReferralRecord] {
    ReferralLib.listUserReferrals(referrals, caller);
  };
};
