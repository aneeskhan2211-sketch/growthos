/**
 * useMarketingSpend.ts
 * Hooks for recording and querying marketing spend by channel.
 * Used by the MarketingSpendModal admin form.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { MarketingSpend, SpendChannel } from "../backend.d";

// ─── Query: get marketing spend ───────────────────────────────────────────────
export function useMarketingSpend(month?: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<MarketingSpend[]>({
    queryKey: ["marketingSpend", month ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMarketingSpend(month ?? null);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

// ─── Mutation: record marketing spend ────────────────────────────────────────
export function useRecordMarketingSpend() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation<
    bigint,
    Error,
    { month: string; channel: SpendChannel; amountRs: number }
  >({
    mutationFn: async ({ month, channel, amountRs }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.recordMarketingSpend(month, channel, BigInt(amountRs));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["marketingSpend"] });
      void qc.invalidateQueries({ queryKey: ["saasMetrics"] });
    },
  });
}
