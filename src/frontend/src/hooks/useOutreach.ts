import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  MOCK_OUTREACH_CAMPAIGNS,
  MOCK_OUTREACH_MESSAGES,
  MOCK_SCRAPER_JOBS,
} from "../mocks/outreach";
import type {
  CreateOutreachCampaignInput,
  CreateOutreachMessageInput,
  OutreachCampaign,
  OutreachMessage,
  OutreachStatus,
  ScraperJob,
} from "../types/outreach";

// ─── Outreach Messages ────────────────────────────────────────────────────────

export function useOutreachMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OutreachMessage[]>({
    queryKey: ["outreach", "messages"],
    queryFn: async () => {
      if (!actor) return MOCK_OUTREACH_MESSAGES;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listAllOutreachMessages();
        return result?.length > 0 ? result : MOCK_OUTREACH_MESSAGES;
      } catch {
        return MOCK_OUTREACH_MESSAGES;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_OUTREACH_MESSAGES,
  });
}

export function useOutreachMessagesByLead(leadId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  const filtered = MOCK_OUTREACH_MESSAGES.filter((m) => m.leadId === leadId);
  return useQuery<OutreachMessage[]>({
    queryKey: ["outreach", "messages", leadId.toString()],
    queryFn: async () => {
      if (!actor) return filtered;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getOutreachMessagesByLead(leadId);
        return result?.length > 0 ? result : filtered;
      } catch {
        return filtered;
      }
    },
    enabled: !isFetching,
    initialData: filtered,
  });
}

export function useCreateOutreachMessage() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: CreateOutreachMessageInput) => {
      if (!actor) {
        const mock: OutreachMessage = {
          id: BigInt(Date.now()),
          ...input,
          status: "scheduled",
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createOutreachMessage(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outreach", "messages"] });
    },
  });
}

export function useUpdateOutreachMessageStatus() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: OutreachStatus }) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateOutreachMessageStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outreach", "messages"] });
    },
  });
}

// ─── Scraper Jobs ─────────────────────────────────────────────────────────────

export function useScraperJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ScraperJob[]>({
    queryKey: ["outreach", "scraper-jobs"],
    queryFn: async () => {
      if (!actor) return MOCK_SCRAPER_JOBS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listScraperJobs();
        return result?.length > 0 ? result : MOCK_SCRAPER_JOBS;
      } catch {
        return MOCK_SCRAPER_JOBS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_SCRAPER_JOBS,
    refetchInterval: 5000, // poll running jobs
  });
}

export function useCreateScraperJob() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ niche, city }: { niche: string; city: string }) => {
      if (!actor) {
        const mock: ScraperJob = {
          id: BigInt(Date.now()),
          niche,
          city,
          status: "queued",
          totalFound: 0,
          processed: 0,
          progress: 0,
          createdAt: BigInt(Date.now()) * BigInt(1_000_000),
          leadsGenerated: 0,
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createScraperJob({ niche, city });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outreach", "scraper-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useUpdateScraperJobProgress() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, progress }: { id: bigint; progress: number }) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateScraperJobProgress(id, progress);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outreach", "scraper-jobs"] });
    },
  });
}

// ─── Outreach Campaigns ───────────────────────────────────────────────────────

export function useOutreachCampaigns() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OutreachCampaign[]>({
    queryKey: ["outreach", "campaigns"],
    queryFn: async () => {
      if (!actor) return MOCK_OUTREACH_CAMPAIGNS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listAllCampaigns();
        return result?.length > 0 ? result : MOCK_OUTREACH_CAMPAIGNS;
      } catch {
        return MOCK_OUTREACH_CAMPAIGNS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_OUTREACH_CAMPAIGNS,
  });
}

export function useCampaignsByLead(leadId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  const filtered = MOCK_OUTREACH_CAMPAIGNS.filter((c) => c.leadId === leadId);
  return useQuery<OutreachCampaign[]>({
    queryKey: ["outreach", "campaigns", leadId.toString()],
    queryFn: async () => {
      if (!actor) return filtered;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getCampaignsByLead(leadId);
        return result?.length > 0 ? result : filtered;
      } catch {
        return filtered;
      }
    },
    enabled: !isFetching,
    initialData: filtered,
  });
}

export function useCreateOutreachCampaign() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: CreateOutreachCampaignInput) => {
      if (!actor) {
        const mock: OutreachCampaign = {
          id: BigInt(Date.now()),
          ...input,
          startedAt: BigInt(Date.now()) * BigInt(1_000_000),
          totalMessages: 3,
          deliveredCount: 0,
          repliedCount: 0,
          status: "active",
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createOutreachCampaign(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outreach", "campaigns"] });
    },
  });
}

export function useUpdateCampaignStats() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      deliveredCount,
      repliedCount,
    }: {
      id: bigint;
      deliveredCount: number;
      repliedCount: number;
    }) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateCampaignStats(
        id,
        deliveredCount,
        repliedCount,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outreach", "campaigns"] });
    },
  });
}
