module {
  // ── Onboarding ────────────────────────────────────────────────────────────

  public type OnboardingPrefs = {
    niche : Text;
    city : Text;
    targetBudget : Nat;
    completedOnboarding : Bool;
  };

  // ── Gamification ──────────────────────────────────────────────────────────

  public type GamificationState = {
    dailyStreak : Nat;
    lastActionDate : Text; // YYYY-MM-DD
    totalActions : Nat;
    currentMilestone : Nat;
    creditsEarned : Nat;
    unlockedFeatures : [Text];
  };
};
