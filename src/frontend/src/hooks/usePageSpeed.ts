/**
 * usePageSpeed.ts
 * Google PageSpeed / performance scan hooks.
 * Uses the backend http-outcall for live data; falls back to mock.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface PageSpeedMetrics {
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  fcp: number; // First Contentful Paint ms
  lcp: number; // Largest Contentful Paint ms
  tbt: number; // Total Blocking Time ms
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte ms
  speedIndex: number;
  opportunities: PageSpeedOpportunity[];
  scannedAt: number;
  url: string;
}

export interface PageSpeedOpportunity {
  id: string;
  title: string;
  description: string;
  savingsMs?: number;
  severity: "high" | "medium" | "low";
}

const MOCK_METRICS: PageSpeedMetrics = {
  performanceScore: 94,
  seoScore: 88,
  accessibilityScore: 92,
  bestPracticesScore: 90,
  fcp: 1200,
  lcp: 2400,
  tbt: 80,
  cls: 0.04,
  ttfb: 420,
  speedIndex: 1800,
  opportunities: [
    {
      id: "render-blocking-resources",
      title: "Eliminate render-blocking resources",
      description: "2 scripts are delaying your page load.",
      savingsMs: 340,
      severity: "medium",
    },
    {
      id: "unused-css",
      title: "Remove unused CSS",
      description: "30KB of CSS is not used on this page.",
      savingsMs: 120,
      severity: "low",
    },
  ],
  scannedAt: Date.now() - 3_600_000,
  url: "https://yourbusiness.com",
};

export function usePageSpeedHistory(url: string | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<PageSpeedMetrics[]>({
    queryKey: ["pageSpeedHistory", url],
    queryFn: async () => {
      if (!url) return [];
      if (!actor) return [MOCK_METRICS];
      try {
        const raw = await actor.getPageSpeedHistory?.(url);
        if (!raw?.length) return [MOCK_METRICS];
        return raw as unknown as PageSpeedMetrics[];
      } catch {
        return [MOCK_METRICS];
      }
    },
    enabled: !isFetching && !!url,
    staleTime: 300_000,
  });
}

export function useRunPageSpeedScan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (url: string) => {
      if (!actor) return MOCK_METRICS;
      try {
        const result = await actor.runPageSpeedScan?.(url);
        return (result as unknown as PageSpeedMetrics) ?? MOCK_METRICS;
      } catch {
        return MOCK_METRICS;
      }
    },
    onSuccess: (_, url) =>
      qc.invalidateQueries({ queryKey: ["pageSpeedHistory", url] }),
  });
}
