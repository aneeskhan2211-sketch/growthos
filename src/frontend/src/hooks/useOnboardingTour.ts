/**
 * useOnboardingTour.ts
 * In-app guided onboarding tour state management.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  action?: string;
  completed: boolean;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  completed: boolean;
  skipped: boolean;
  steps: OnboardingStep[];
  startedAt?: number;
  completedAt?: number;
}

const DEFAULT_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to GrowthOS 🎉",
    description:
      "Let's get you set up in 5 quick steps. This takes about 3 minutes.",
    completed: false,
  },
  {
    id: "lead-engine",
    title: "Find your first leads",
    description:
      "Go to Lead Engine, pick your niche and city, and generate your first 20 leads.",
    targetElement: "nav.leads",
    action: "Go to Lead Engine",
    completed: false,
  },
  {
    id: "get-clients",
    title: "Contact your first prospects",
    description:
      'Click "Get Clients Now" and send messages to your top 5 leads.',
    targetElement: "header.get_clients_cta",
    action: "Get Clients Now",
    completed: false,
  },
  {
    id: "inbox",
    title: "Check for replies",
    description:
      "Open your Inbox to see who has replied and follow up quickly.",
    targetElement: "nav.inbox",
    action: "Open Inbox",
    completed: false,
  },
  {
    id: "proposal",
    title: "Send your first proposal",
    description:
      "Use the Proposal generator to send a professional pitch to an interested lead.",
    targetElement: "nav.proposals",
    action: "Create Proposal",
    completed: false,
  },
];

const STORAGE_KEY = "growthos-onboarding-state";

function loadLocalState(): Partial<OnboardingState> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Partial<OnboardingState>) : {};
  } catch {
    return {};
  }
}

function saveLocalState(state: Partial<OnboardingState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

export function useOnboardingTour() {
  const { actor, isFetching } = useActor(createActor);
  const qc = useQueryClient();

  const stateQuery = useQuery<OnboardingState>({
    queryKey: ["onboardingTour"],
    queryFn: async () => {
      const local = loadLocalState();
      if (local.completed || local.skipped) {
        return {
          currentStep: local.currentStep ?? 0,
          totalSteps: DEFAULT_STEPS.length,
          completed: local.completed ?? false,
          skipped: local.skipped ?? false,
          steps: DEFAULT_STEPS,
        };
      }
      if (!actor) {
        return {
          currentStep: local.currentStep ?? 0,
          totalSteps: DEFAULT_STEPS.length,
          completed: false,
          skipped: false,
          steps: DEFAULT_STEPS,
        };
      }
      try {
        const raw = await actor.getOnboardingState?.();
        if (!raw) {
          return {
            currentStep: local.currentStep ?? 0,
            totalSteps: DEFAULT_STEPS.length,
            completed: false,
            skipped: false,
            steps: DEFAULT_STEPS,
          };
        }
        return raw as unknown as OnboardingState;
      } catch {
        return {
          currentStep: local.currentStep ?? 0,
          totalSteps: DEFAULT_STEPS.length,
          completed: false,
          skipped: false,
          steps: DEFAULT_STEPS,
        };
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });

  const updateStep = useMutation({
    mutationFn: async (step: number) => {
      saveLocalState({ currentStep: step });
      if (!actor) return;
      try {
        await actor.updateOnboardingStep?.(BigInt(step));
      } catch {
        // non-fatal
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["onboardingTour"] }),
  });

  const completeTour = useMutation({
    mutationFn: async () => {
      saveLocalState({ completed: true, skipped: false });
      if (!actor) return;
      try {
        await actor.completeOnboardingTour?.();
      } catch {
        // non-fatal
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["onboardingTour"] }),
  });

  const skipTour = useMutation({
    mutationFn: async () => {
      saveLocalState({ skipped: true });
      if (!actor) return;
      try {
        await actor.skipOnboardingTour?.();
      } catch {
        // non-fatal
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["onboardingTour"] }),
  });

  const state = stateQuery.data ?? {
    currentStep: 0,
    totalSteps: DEFAULT_STEPS.length,
    completed: false,
    skipped: false,
    steps: DEFAULT_STEPS,
  };

  return {
    state,
    shouldShowTour: !state.completed && !state.skipped,
    isLoading: stateQuery.isLoading,
    updateStep: (step: number) => updateStep.mutate(step),
    completeTour: () => completeTour.mutate(),
    skipTour: () => skipTour.mutate(),
  };
}
