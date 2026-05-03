import Common "common";

module {
  public type ReferralStatus = {
    #created;
    #signedUp;
    #completed;
  };

  public type ReferralRecord = {
    id : Nat;
    referrerId : Principal;
    referralCode : Text;
    referredUserId : ?Principal;
    status : ReferralStatus;
    createdAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    rewardClaimed : Bool;
  };

  public type ReferralStats = {
    totalInvited : Nat;
    signedUp : Nat;
    completed : Nat;
    creditsEarned : Nat;
    trialDaysEarned : Nat;
  };

  public type ReferralCounters = {
    var nextReferralId : Nat;
  };
};
