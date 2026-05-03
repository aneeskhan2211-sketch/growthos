/**
 * useSubscriptionEvents.ts
 * Hooks for recording and querying subscription lifecycle events.
 * Used by paywall / upgrade flows to log plan changes.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  PlanTier,
  SubscriptionEvent,
  SubscriptionEventKind,
} from "../backend.d";

// ─── Query: subscription history ─────────────────────────────────────────────
export function useSubscriptionHistory(userId?: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SubscriptionEvent[]>({
    queryKey: ["subscriptionHistory", userId ?? "self"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        // null = own history; typed as Principal | null in backend
        return await actor.getSubscriptionHistory(null);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

// ─── Mutation: record a subscription event ───────────────────────────────────
export function useRecordSubscriptionEvent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<
    bigint,
    Error,
    {
      kind: SubscriptionEventKind;
      planTier: PlanTier;
      prevPlanTier?: PlanTier;
    }
  >({
    mutationFn: async ({ kind, planTier, prevPlanTier }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.recordSubscriptionEvent(
        kind,
        planTier,
        prevPlanTier ?? null,
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["subscriptionHistory"] });
      void qc.invalidateQueries({ queryKey: ["saasMetrics"] });
    },
  });
}
