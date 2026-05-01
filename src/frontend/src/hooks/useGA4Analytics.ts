import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { GA4CredentialStatus, GA4Dashboard } from "../backend";

// ─── Mock fallback data ────────────────────────────────────────────────────────

const MOCK_DASHBOARD: GA4Dashboard = {
  totalSessions: BigInt(12480),
  totalUsers: BigInt(8934),
  avgBounceRate: 42.3,
  topPages: [
    ["/home", BigInt(3210)],
    ["/services", BigInt(2180)],
    ["/contact", BigInt(1540)],
    ["/blog", BigInt(980)],
    ["/pricing", BigInt(720)],
  ],
  trafficSources: [
    ["Google Organic", BigInt(4740)],
    ["Google Ads", BigInt(2990)],
    ["Direct", BigInt(1870)],
    ["Social Media", BigInt(1620)],
    ["Referral", BigInt(1260)],
  ],
  conversions: BigInt(312),
  isLive: false,
};

// ─── useGA4Analytics ──────────────────────────────────────────────────────────

export interface GA4AnalyticsResult {
  data: GA4Dashboard | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGA4Analytics(days = 90): GA4AnalyticsResult {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery<GA4Dashboard, Error>({
    queryKey: ["ga4Dashboard", days],
    queryFn: async () => {
      if (!actor) return { ...MOCK_DASHBOARD };
      try {
        const result = await actor.getGA4Dashboard(BigInt(days));
        if (result.__kind__ === "ok") return result.ok;
        // err path — fall back to mock with isLive: false
        return { ...MOCK_DASHBOARD };
      } catch {
        return { ...MOCK_DASHBOARD };
      }
    },
    enabled: !isFetching,
    initialData: { ...MOCK_DASHBOARD },
    staleTime: 5 * 60 * 1000, // 5 min
  });

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}

// ─── useGA4CredentialStatus ───────────────────────────────────────────────────

export interface GA4CredentialStatusResult {
  isConfigured: boolean;
  propertyId: string | null;
  lastUpdated: Date | null;
}

export function useGA4CredentialStatus(): GA4CredentialStatusResult & {
  isLoading: boolean;
} {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery<GA4CredentialStatus, Error>({
    queryKey: ["ga4CredentialStatus"],
    queryFn: async () => {
      if (!actor) return { isConfigured: false };
      try {
        return await actor.getGA4CredentialStatus();
      } catch {
        return { isConfigured: false };
      }
    },
    enabled: !isFetching,
  });

  const raw = query.data;
  return {
    isConfigured: raw?.isConfigured ?? false,
    propertyId: raw?.propertyId ?? null,
    lastUpdated:
      raw?.lastUpdated != null
        ? new Date(Number(raw.lastUpdated) / 1_000_000)
        : null,
    isLoading: query.isLoading,
  };
}

// ─── useSetGA4Credentials ─────────────────────────────────────────────────────

export function useSetGA4Credentials() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation<void, Error, { propertyId: string; apiKey: string }>({
    mutationFn: async ({ propertyId, apiKey }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setGA4Credentials(propertyId, apiKey);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ga4CredentialStatus"] });
      queryClient.invalidateQueries({ queryKey: ["ga4Dashboard"] });
    },
  });
}

// ─── useClearGA4Credentials ───────────────────────────────────────────────────

export function useClearGA4Credentials() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      await actor.clearGA4Credentials();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ga4CredentialStatus"] });
      queryClient.invalidateQueries({ queryKey: ["ga4Dashboard"] });
    },
  });
}
