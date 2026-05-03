/**
 * useBulkSeoGenerator.ts
 * Bulk SEO landing page generator hooks (admin).
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface SeoPageRequest {
  niche: string;
  city: string;
  area?: string;
  targetKeyword: string;
}

export interface SeoPage {
  id: string;
  slug: string;
  niche: string;
  city: string;
  area?: string;
  targetKeyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  content: string;
  published: boolean;
  createdAt: number;
  views: number;
  leads: number;
}

const MOCK_SEO_PAGES: SeoPage[] = [
  {
    id: "1",
    slug: "salon-marketing-mumbai-bandra",
    niche: "Salon",
    city: "Mumbai",
    area: "Bandra",
    targetKeyword: "best salon marketing in Bandra",
    title: "Best Salon Marketing in Bandra, Mumbai | GrowthOS",
    metaDescription:
      "Get more salon clients in Bandra with local SEO and WhatsApp outreach. Start free.",
    h1: "Salon Marketing That Actually Gets You Clients in Bandra",
    content: "Placeholder content",
    published: true,
    createdAt: Date.now() - 2_592_000_000,
    views: 342,
    leads: 18,
  },
  {
    id: "2",
    slug: "gym-marketing-pune-koregaon-park",
    niche: "Gym",
    city: "Pune",
    area: "Koregaon Park",
    targetKeyword: "gym marketing Koregaon Park Pune",
    title: "Gym Marketing in Koregaon Park, Pune | GrowthOS",
    metaDescription:
      "Grow your gym membership in Koregaon Park with local campaigns. Free audit.",
    h1: "Get More Gym Members in Koregaon Park",
    content: "Placeholder content",
    published: false,
    createdAt: Date.now() - 1_296_000_000,
    views: 0,
    leads: 0,
  },
];

export function useSeoPages() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SeoPage[]>({
    queryKey: ["seoPages"],
    queryFn: async () => {
      if (!actor) return MOCK_SEO_PAGES;
      try {
        const raw = await actor.listSeoPages?.();
        if (!raw?.length) return MOCK_SEO_PAGES;
        return raw as unknown as SeoPage[];
      } catch {
        return MOCK_SEO_PAGES;
      }
    },
    enabled: !isFetching,
    staleTime: 120_000,
  });
}

export function useGenerateSeoPages() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (requests: SeoPageRequest[]) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.generateSeoPages?.(
        requests as unknown as import("../backend").SeoPageRequest[],
      );
      return result ?? [];
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["seoPages"] }),
  });
}

export function usePublishSeoPage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.publishSeoPage?.(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["seoPages"] }),
  });
}

export function useDeleteSeoPage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteSeoPage?.(id);
      if (result && result.__kind__ === "err") {
        throw new Error(result.err);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["seoPages"] }),
  });
}

export function useGetSeoPage(slug: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SeoPage | null>({
    queryKey: ["seoPage", slug],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const raw = await actor.getSeoPage?.(slug);
        if (!raw) return null;
        return raw as unknown as SeoPage;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!slug,
    staleTime: 300_000,
  });
}
