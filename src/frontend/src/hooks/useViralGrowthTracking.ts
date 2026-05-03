/**
 * useViralGrowthTracking.ts
 * React Query hooks for viral growth loops and product-led growth tracking:
 * referral funnel stats, traffic source breakdown, weekly challenge
 * participants, feature gate status, and nudge delivery stats.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { GatedFeatureName } from "../backend.d";
import type {
  ChallengeParticipant,
  FeatureUnlockCheck,
  NudgePerformanceStat,
  ReferralFunnelStats,
  TrafficSourceBreakdown,
} from "../backend.d";

// ─── Referral Funnel Stats ────────────────────────────────────────────────────

export function useReferralFunnelStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ReferralFunnelStats>({
    queryKey: ["referralFunnelStats"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getReferralFunnelStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
  });
}

// ─── Traffic Source Breakdown ─────────────────────────────────────────────────

export function useTrafficSourceBreakdown(days: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<TrafficSourceBreakdown>({
    queryKey: ["trafficSourceBreakdown", days],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getTrafficSourceBreakdown(BigInt(days));
    },
    enabled: !!actor && !isFetching && days > 0,
    staleTime: 300_000,
  });
}

// ─── Challenge Participants ───────────────────────────────────────────────────

export function useChallengeParticipants(isoWeek: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChallengeParticipant[]>({
    queryKey: ["challengeParticipants", isoWeek],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChallengeParticipants(isoWeek);
    },
    enabled: !!actor && !isFetching && !!isoWeek,
    staleTime: 60_000,
  });
}

// ─── Feature Unlock Status ────────────────────────────────────────────────────

export function useFeatureUnlockStatus(featureName: GatedFeatureName) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FeatureUnlockCheck>({
    queryKey: ["featureUnlockCheck", featureName],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.checkFeatureUnlock(featureName);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ─── Nudge Delivery Stats ─────────────────────────────────────────────────────

export function useNudgeDeliveryStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<NudgePerformanceStat[]>({
    queryKey: ["nudgeDeliveryStats"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNudgeDeliveryStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 120_000,
  });
}
