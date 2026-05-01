import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Lib "../lib/gamification-and-onboarding";
import T "../types/gamification-and-onboarding";

mixin (
  onboarding : Map.Map<Principal, T.OnboardingPrefs>,
  gamification : Map.Map<Principal, T.GamificationState>,
) {
  // ── Onboarding ────────────────────────────────────────────────────────────

  public query ({ caller }) func getOnboardingPrefs() : async ?T.OnboardingPrefs {
    Lib.getOnboardingPrefs(onboarding, caller);
  };

  public shared ({ caller }) func saveOnboardingPrefs(
    niche : Text,
    city : Text,
    targetBudget : Nat,
  ) : async () {
    Lib.saveOnboardingPrefs(onboarding, caller, niche, city, targetBudget);
  };

  public shared ({ caller }) func completeOnboarding() : async () {
    Lib.completeOnboarding(onboarding, caller);
  };

  // ── Gamification ──────────────────────────────────────────────────────────

  public query ({ caller }) func getGamificationState() : async T.GamificationState {
    Lib.getGamificationState(gamification, caller);
  };

  public shared ({ caller }) func recordDailyAction(actionType : Text) : async T.GamificationState {
    Lib.recordDailyAction(gamification, caller, actionType);
  };

  public shared ({ caller }) func claimMilestoneReward(milestoneIndex : Nat) : async Bool {
    Lib.claimMilestoneReward(gamification, caller, milestoneIndex);
  };
};
