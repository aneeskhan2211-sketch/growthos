import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { createActor } from "../backend";
import type { FunnelMetrics, RetentionData } from "../backend.d";

export function useAnalytics() {
  const { actor } = useActor(createActor);

  const trackEvent = useCallback(
    (eventType: string, metadata?: Record<string, string>): void => {
      if (!actor) return;
      try {
        const metaVec: Array<[string, string]> = metadata
          ? Object.entries(metadata)
          : [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        void (actor as any).trackEvent(eventType, metaVec).catch(() => {});
      } catch {
        // fire-and-forget: never throw
      }
    },
    [actor],
  );

  const trackHeatmap = useCallback(
    (
      screenName: string,
      elementId: string,
      kind: string,
      scrollDepth?: number,
      timeSpentMs?: number,
    ): void => {
      trackEvent("heatmap", {
        screen: screenName,
        element: elementId,
        kind,
        scrollDepth: String(scrollDepth ?? 0),
        timeSpentMs: String(timeSpentMs ?? 0),
      });
    },
    [trackEvent],
  );

  return { trackEvent, trackHeatmap };
}

export function useScreenTracking(screenName: string): void {
  const { trackHeatmap } = useAnalytics();
  const mountTime = useRef(Date.now());

  useEffect(() => {
    mountTime.current = Date.now();
    return () => {
      const timeSpentMs = Date.now() - mountTime.current;
      trackHeatmap(screenName, screenName, "screen_view", 0, timeSpentMs);
    };
  }, [screenName, trackHeatmap]);
}

// ─── Funnel Metrics ───────────────────────────────────────────────────────────
export function useFunnelMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FunnelMetrics>({
    queryKey: ["funnelMetrics"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getFunnelMetrics();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Heatmap Summary ─────────────────────────────────────────────────────────
export function useHeatmapSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Array<[string, bigint]>>({
    queryKey: ["heatmapSummary"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHeatmapSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Retention Data ───────────────────────────────────────────────────────────
export function useRetentionData(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<RetentionData | null>({
    queryKey: ["retentionData", userId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRetentionData(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}
