import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import T "../types/gamification-and-onboarding";

module {
  // ── Milestone definitions ─────────────────────────────────────────────────

  // (thresholdActions, creditsReward, featureUnlock)
  let milestones : [(Nat, Nat, Text)] = [
    (10, 50, "bulk-campaigns"),
    (50, 100, "ai-pitch-generator"),
    (100, 200, "advanced-analytics"),
  ];

  // ── Date helpers ──────────────────────────────────────────────────────────

  // Returns YYYY-MM-DD from nanosecond timestamp
  func nanosToDate(ns : Int) : Text {
    let secs : Int = ns / 1_000_000_000;
    let days : Int = secs / 86400;
    // Julian Day Number epoch offset: Unix epoch 1970-01-01 = JDN 2440588
    let jdn : Int = days + 2440588;

    // Gregorian calendar conversion
    let l = jdn + 68569;
    let n = (4 * l) / 146097;
    let l2 = l - (146097 * n + 3) / 4;
    let i = (4000 * (l2 + 1)) / 1461001;
    let l3 = l2 - (1461 * i) / 4 + 31;
    let j = (80 * l3) / 2447;
    let day = l3 - (2447 * j) / 80;
    let l4 = j / 11;
    let month = j + 2 - 12 * l4;
    let year = 100 * (n - 49) + i + l4;

    let yStr = year.toText();
    let mStr = if (month < 10) { "0" # month.toText() } else { month.toText() };
    let dStr = if (day < 10) { "0" # day.toText() } else { day.toText() };
    yStr # "-" # mStr # "-" # dStr;
  };

  func todayDate() : Text {
    nanosToDate(Time.now());
  };

  // Subtract 1 day from a YYYY-MM-DD string (approximation via seconds)
  func yesterdayDate() : Text {
    nanosToDate(Time.now() - 86_400_000_000_000);
  };

  // ── Default state ─────────────────────────────────────────────────────────

  func defaultState() : T.GamificationState {
    {
      dailyStreak = 0;
      lastActionDate = "";
      totalActions = 0;
      currentMilestone = 0;
      creditsEarned = 0;
      unlockedFeatures = [];
    };
  };

  // ── Onboarding helpers ────────────────────────────────────────────────────

  public func getOnboardingPrefs(
    onboarding : Map.Map<Principal, T.OnboardingPrefs>,
    caller : Principal,
  ) : ?T.OnboardingPrefs {
    onboarding.get(caller);
  };

  public func saveOnboardingPrefs(
    onboarding : Map.Map<Principal, T.OnboardingPrefs>,
    caller : Principal,
    niche : Text,
    city : Text,
    targetBudget : Nat,
  ) {
    let existing = onboarding.get(caller);
    let completedOnboarding = switch (existing) {
      case (?p) { p.completedOnboarding };
      case null { false };
    };
    onboarding.add(
      caller,
      {
        niche;
        city;
        targetBudget;
        completedOnboarding;
      },
    );
  };

  public func completeOnboarding(
    onboarding : Map.Map<Principal, T.OnboardingPrefs>,
    caller : Principal,
  ) {
    let existing = onboarding.get(caller);
    let prefs : T.OnboardingPrefs = switch (existing) {
      case (?p) { { p with completedOnboarding = true } };
      case null {
        {
          niche = "";
          city = "";
          targetBudget = 0;
          completedOnboarding = true;
        };
      };
    };
    onboarding.add(caller, prefs);
  };

  // ── Gamification helpers ──────────────────────────────────────────────────

  public func getGamificationState(
    gamification : Map.Map<Principal, T.GamificationState>,
    caller : Principal,
  ) : T.GamificationState {
    switch (gamification.get(caller)) {
      case (?s) { s };
      case null { defaultState() };
    };
  };

  public func recordDailyAction(
    gamification : Map.Map<Principal, T.GamificationState>,
    caller : Principal,
    _actionType : Text,
  ) : T.GamificationState {
    let state = getGamificationState(gamification, caller);
    let today = todayDate();
    let yesterday = yesterdayDate();

    // Update streak
    let newStreak = if (state.lastActionDate == today) {
      state.dailyStreak; // already recorded today — no streak change
    } else if (state.lastActionDate == yesterday) {
      state.dailyStreak + 1; // consecutive day
    } else {
      1; // missed a day — reset
    };

    let newTotalActions = state.totalActions + 1;

    // Check milestones: walk through and apply all newly crossed milestones
    var creditsToAdd : Nat = 0;
    var newFeatures : [Text] = state.unlockedFeatures;
    var newMilestone = state.currentMilestone;

    for ((threshold, credits, feature) in milestones.vals()) {
      let milestoneIdx = switch (threshold) {
        case 10 { 1 };
        case 50 { 2 };
        case _ { 3 };
      };
      if (milestoneIdx > state.currentMilestone and newTotalActions >= threshold) {
        creditsToAdd += credits;
        // Only add feature if not already unlocked
        let alreadyUnlocked = newFeatures.find(func(f : Text) : Bool { f == feature });
        if (alreadyUnlocked == null) {
          newFeatures := newFeatures.concat([feature]);
        };
        if (milestoneIdx > newMilestone) {
          newMilestone := milestoneIdx;
        };
      };
    };

    let updated : T.GamificationState = {
      dailyStreak = newStreak;
      lastActionDate = today;
      totalActions = newTotalActions;
      currentMilestone = newMilestone;
      creditsEarned = state.creditsEarned + creditsToAdd;
      unlockedFeatures = newFeatures;
    };
    gamification.add(caller, updated);
    updated;
  };

  public func claimMilestoneReward(
    gamification : Map.Map<Principal, T.GamificationState>,
    caller : Principal,
    milestoneIndex : Nat,
  ) : Bool {
    if (milestoneIndex == 0 or milestoneIndex > milestones.size()) {
      return false;
    };
    let state = getGamificationState(gamification, caller);
    // milestoneIndex is 1-based; can only claim up to currentMilestone
    if (milestoneIndex > state.currentMilestone) {
      return false;
    };
    // Reward is already applied in recordDailyAction — this is a confirmation call
    // that marks the reward as "seen" (no-op on data, returns true to confirm eligibility)
    true;
  };
};
