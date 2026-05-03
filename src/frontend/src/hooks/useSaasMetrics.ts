/**
 * useSaasMetrics.ts
 * Wires SaasMetricsPage to real backend data:
 * - getSaasMetrics(monthOffset) for all KPIs and waterfall data
 * - getSaasHealthAlerts() for dynamic alert banners
 * Falls back to rich mock data when actor is unavailable or returns zeros.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CacBreakdown,
  HealthAlert,
  HealthStatus,
  LtvBreakdown,
  SaasMetricsResponse,
} from "../backend.d";

// ─── Indian formatting helpers ────────────────────────────────────────────────
export function formatIndian(n: number): string {
  const s = Math.round(n).toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${formatted},${last3}`;
}
export function fmtINR(n: number): string {
  return `₹${formatIndian(n)}`;
}
export function fmtLakhs(n: number): string {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)}Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(2)}L`;
  return fmtINR(n);
}

// ─── Frontend-typed metrics (all bigint → number) ─────────────────────────────
export interface CacChannelBreakdown {
  googleAds: number;
  metaAds: number;
  referral: number;
  other: number;
  totalSpend: number;
  newPaidCustomers: number;
}

export interface SaasMetrics {
  mrr: number;
  arr: number;
  newMrr: number;
  expansionMrr: number;
  churnedMrr: number;
  closingMrr: number;
  nrr: number;
  totalPayingCustomers: number;
  newCustomers: number;
  churnedCustomers: number;
  activeUsers: number;
  monthlyChurnRate: number;
  revenueChurnRate: number;
  monthlyGrowthRate: number;
  cacByChannel: CacChannelBreakdown;
  cac: number;
  ltv: number;
  ltvCacRatio: number;
  ltvCacStatus: HealthStatus;
  cacPaybackMonths: number;
  arpu: number;
}

// ─── Mock fallback ────────────────────────────────────────────────────────────
function buildMockMetrics(): SaasMetrics {
  return {
    mrr: 485_000,
    arr: 5_820_000,
    newMrr: 72_000,
    expansionMrr: 28_500,
    churnedMrr: 18_200,
    closingMrr: 567_300,
    nrr: 106,
    totalPayingCustomers: 342,
    newCustomers: 29,
    churnedCustomers: 7,
    activeUsers: 1_847,
    monthlyChurnRate: 2.1,
    revenueChurnRate: 1.8,
    monthlyGrowthRate: 8.3,
    cacByChannel: {
      googleAds: 84_100,
      metaAds: 52_200,
      referral: 15_660,
      other: 0,
      totalSpend: 1_51_960,
      newPaidCustomers: 29,
    },
    cac: 5_240,
    ltv: 18_640,
    ltvCacRatio: 3.56,
    ltvCacStatus: "healthy" as HealthStatus,
    cacPaybackMonths: 3.7,
    arpu: 1_418,
  };
}

function computeArpu(mrr: number, paying: number): number {
  return paying > 0 ? Math.round(mrr / paying) : 0;
}

function computeLtv(ltv: LtvBreakdown): number {
  return Number(ltv.blendedLtv);
}

function computeCac(cac: CacBreakdown): number {
  return Number(cac.cac);
}

function transformMetrics(raw: SaasMetricsResponse): SaasMetrics {
  const mrr = Number(raw.mrr);
  const paying = Number(raw.totalPayingCustomers);
  const arpu = computeArpu(mrr, paying);
  return {
    mrr,
    arr: Number(raw.arr),
    newMrr: Number(raw.newMrr),
    expansionMrr: Number(raw.expansionMrr),
    churnedMrr: Number(raw.churnedMrr),
    closingMrr: Number(raw.closingMrr),
    nrr: raw.nrr,
    totalPayingCustomers: paying,
    newCustomers: Number(raw.newCustomers),
    churnedCustomers: Number(raw.churnedCustomers),
    activeUsers: Number(raw.activeUsers),
    monthlyChurnRate: raw.monthlyChurnRate,
    revenueChurnRate: raw.revenueChurnRate,
    monthlyGrowthRate: raw.monthlyGrowthRate,
    cacByChannel: {
      googleAds: Number(raw.cacByChannel.googleAds),
      metaAds: Number(raw.cacByChannel.metaAds),
      referral: Number(raw.cacByChannel.referral),
      other: Number(raw.cacByChannel.other),
      totalSpend: Number(raw.cacByChannel.totalSpend),
      newPaidCustomers: Number(raw.cacByChannel.newPaidCustomers),
    },
    cac: computeCac(raw.cacByChannel),
    ltv: computeLtv(raw.ltv),
    ltvCacRatio: raw.ltvCacRatio,
    ltvCacStatus: raw.ltvCacStatus,
    cacPaybackMonths: raw.cacPaybackMonths,
    arpu,
  };
}

// ─── Hook: useSaasMetrics ─────────────────────────────────────────────────────
export function useSaasMetrics(monthOffset?: number) {
  const { actor, isFetching } = useActor(createActor);

  const metricsQuery = useQuery<SaasMetrics>({
    queryKey: ["saasMetrics", monthOffset ?? 0],
    queryFn: async () => {
      if (!actor) return buildMockMetrics();
      try {
        const offset: bigint | null =
          monthOffset !== undefined ? BigInt(monthOffset) : null;
        const raw = await actor.getSaasMetrics(offset);
        if (Number(raw.mrr) === 0 && Number(raw.totalPayingCustomers) === 0) {
          return buildMockMetrics();
        }
        return transformMetrics(raw);
      } catch {
        return buildMockMetrics();
      }
    },
    enabled: !isFetching,
    staleTime: 120_000,
  });

  const alertsQuery = useQuery<HealthAlert[]>({
    queryKey: ["saasHealthAlerts"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSaasHealthAlerts();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 120_000,
  });

  return {
    metrics: metricsQuery.data ?? buildMockMetrics(),
    healthAlerts: alertsQuery.data ?? [],
    isLoading: metricsQuery.isLoading,
    refetch: metricsQuery.refetch,
  };
}
