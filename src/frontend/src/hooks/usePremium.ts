import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  GamificationState as BackendGamificationState,
  OnboardingPrefs as BackendOnboardingPrefs,
} from "../backend";
import type {
  GamificationState,
  Milestone,
  OnboardingPrefs,
} from "../types/premium";

export const MILESTONES: Milestone[] = [
  {
    index: 0,
    label: "First Wins",
    threshold: 10,
    credits: 20,
    unlocks: "ai-proposals",
    badgeColor: "bronze",
  },
  {
    index: 1,
    label: "Growth Mode",
    threshold: 50,
    credits: 75,
    unlocks: "bulk-campaigns",
    badgeColor: "silver",
  },
  {
    index: 2,
    label: "Scale Machine",
    threshold: 100,
    credits: 200,
    unlocks: "competitor-intel",
    badgeColor: "gold",
  },
];

const ONBOARDING_FALLBACK: OnboardingPrefs = {
  niche: "",
  city: "",
  targetBudget: 0,
  completedOnboarding: false,
};

const GAMIFICATION_FALLBACK: GamificationState = {
  dailyStreak: 3,
  lastActionDate: "2026-04-30",
  totalActions: 23,
  currentMilestone: 1,
  creditsEarned: 50,
  unlockedFeatures: ["bulk-campaigns"],
};

function toOnboardingPrefs(b: BackendOnboardingPrefs): OnboardingPrefs {
  return {
    niche: b.niche,
    city: b.city,
    targetBudget: Number(b.targetBudget),
    completedOnboarding: b.completedOnboarding,
  };
}

function toGamificationState(b: BackendGamificationState): GamificationState {
  return {
    dailyStreak: Number(b.dailyStreak),
    lastActionDate: b.lastActionDate,
    totalActions: Number(b.totalActions),
    currentMilestone: Number(b.currentMilestone),
    creditsEarned: Number(b.creditsEarned),
    unlockedFeatures: b.unlockedFeatures,
  };
}

export function useOnboardingPrefs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OnboardingPrefs>({
    queryKey: ["onboarding-prefs"],
    queryFn: async () => {
      if (!actor) return ONBOARDING_FALLBACK;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getOnboardingPrefs();
        if (!result) return ONBOARDING_FALLBACK;
        return toOnboardingPrefs(result as BackendOnboardingPrefs);
      } catch {
        return ONBOARDING_FALLBACK;
      }
    },
    enabled: !isFetching,
  });
}

export function useSaveOnboardingPrefs() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (prefs: OnboardingPrefs) => {
      if (!actor) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).saveOnboardingPrefs(
        prefs.niche,
        prefs.city,
        BigInt(prefs.targetBudget),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboarding-prefs"] });
    },
  });
}

export function useCompleteOnboarding() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).completeOnboarding();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboarding-prefs"] });
    },
  });
}

export function useGamificationState() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GamificationState>({
    queryKey: ["gamification-state"],
    queryFn: async () => {
      if (!actor) return GAMIFICATION_FALLBACK;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getGamificationState();
        if (!result) return GAMIFICATION_FALLBACK;
        return toGamificationState(result as BackendGamificationState);
      } catch {
        return GAMIFICATION_FALLBACK;
      }
    },
    enabled: !isFetching,
  });
}

export function useRecordDailyAction() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (actionId: string) => {
      if (!actor) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).recordDailyAction(actionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification-state"] });
    },
  });
}

export function useClaimMilestoneReward() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (milestoneIndex: number) => {
      if (!actor) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (actor as any).claimMilestoneReward(BigInt(milestoneIndex));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification-state"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
}
