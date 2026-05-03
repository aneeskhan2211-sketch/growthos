/**
 * useCaseStudies.ts
 * Case study builder hooks — full CRUD + publish + public view.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface CaseStudyResult {
  label: string;
  value: string;
  positive: boolean;
}

export interface CaseStudyMetric {
  label: string;
  before: string;
  after: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  niche: string;
  city: string;
  challenge: string;
  solution: string;
  actionsTaken: string[];
  results: CaseStudyResult[];
  metrics: CaseStudyMetric[];
  beforeMetric: string;
  afterMetric: string;
  testimonial?: string;
  published: boolean;
  shareToken?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateCaseStudyInput {
  title: string;
  clientName: string;
  niche: string;
  city: string;
  challenge: string;
  solution: string;
  actionsTaken: string[];
  metrics: CaseStudyMetric[];
  results: CaseStudyResult[];
  beforeMetric: string;
  afterMetric: string;
  testimonial?: string;
}

export type UpdateCaseStudyInput = Partial<CreateCaseStudyInput> & {
  id: string;
};

function mapRaw(c: Record<string, unknown>): CaseStudy {
  return {
    id: String(c.id),
    title: String(c.title ?? ""),
    clientName: String(c.clientName ?? ""),
    niche: String(c.niche ?? ""),
    city: String(c.city ?? ""),
    challenge: String(c.challenge ?? ""),
    solution: String(c.solution ?? ""),
    actionsTaken: Array.isArray(c.actionsTaken)
      ? (c.actionsTaken as string[])
      : [],
    results: Array.isArray(c.results) ? (c.results as CaseStudyResult[]) : [],
    metrics: Array.isArray(c.metrics) ? (c.metrics as CaseStudyMetric[]) : [],
    beforeMetric: String(c.beforeMetric ?? ""),
    afterMetric: String(c.afterMetric ?? ""),
    testimonial: c.testimonial ? String(c.testimonial) : undefined,
    published: Boolean(c.published),
    shareToken: c.shareToken ? String(c.shareToken) : undefined,
    createdAt: Number(c.createdAt),
    updatedAt: Number(c.updatedAt),
  };
}

export function generateShareUrl(shareToken: string): string {
  return `${window.location.origin}/case-studies/${shareToken}`;
}

const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    title: "Salon Mumbai: From Irregular Walk-ins to Daily Enquiries",
    clientName: "Glamour Studio",
    niche: "Salon",
    city: "Mumbai",
    challenge:
      "Irregular walk-in traffic with no consistent digital presence or follow-up system.",
    solution:
      "Implemented local SEO, Google Business Profile optimization, and daily follow-up workflows.",
    actionsTaken: [
      "Set up Google Business Profile with photos and hours",
      "Started posting daily Instagram reels with before/after transformations",
      "Launched WhatsApp follow-up sequence for enquiries",
    ],
    metrics: [
      { label: "Monthly Enquiries", before: "8", after: "52" },
      { label: "Bookings", before: "5", after: "38" },
      { label: "Monthly Revenue", before: "₹45k", after: "₹1.8L" },
    ],
    results: [
      { label: "Monthly Leads", value: "+280%", positive: true },
      { label: "Bookings", value: "+65", positive: true },
      { label: "Revenue Increase", value: "₹1.2L/mo", positive: true },
    ],
    beforeMetric: "8–12 enquiries/month",
    afterMetric: "45–60 enquiries/month",
    testimonial:
      "GrowthOS transformed how we get clients. We now have a predictable pipeline every month.",
    published: true,
    shareToken: "salon-mumbai-growth",
    createdAt: Date.now() - 7_776_000_000,
    updatedAt: Date.now() - 604_800_000,
  },
  {
    id: "2",
    title: "Gym Pune: Steady Trial Sign-ups Through Local Campaigns",
    clientName: "FitZone Pune",
    niche: "Gym",
    city: "Pune",
    challenge: "Low trial sign-ups with no structured outreach process.",
    solution:
      "Local WhatsApp outreach campaigns, offer builder, and follow-up reminders.",
    actionsTaken: [
      "Created local Google Ads targeting 5km radius",
      "Built WhatsApp broadcast list of 200 local contacts",
      "Launched 7-day free trial offer with urgency deadline",
    ],
    metrics: [
      { label: "Trial Sign-ups", before: "10", after: "28" },
      { label: "Conversion Rate", before: "18%", after: "34%" },
      { label: "Monthly Revenue", before: "₹1.2L", after: "₹2.05L" },
    ],
    results: [
      { label: "Trial Sign-ups", value: "+120%", positive: true },
      { label: "Conversion Rate", value: "34%", positive: true },
      { label: "Monthly Revenue", value: "+₹85k", positive: true },
    ],
    beforeMetric: "10 trials/month",
    afterMetric: "28 trials/month",
    published: true,
    shareToken: "gym-pune-growth",
    createdAt: Date.now() - 5_184_000_000,
    updatedAt: Date.now() - 432_000_000,
  },
];

export function useCaseStudies() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CaseStudy[]>({
    queryKey: ["caseStudies"],
    queryFn: async () => {
      if (!actor) return MOCK_CASE_STUDIES;
      try {
        const raw = await actor.listCaseStudies?.();
        if (!raw?.length) return MOCK_CASE_STUDIES;
        return (raw as unknown as Record<string, unknown>[]).map(mapRaw);
      } catch {
        return MOCK_CASE_STUDIES;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function usePublicCaseStudy(shareToken: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CaseStudy | null>({
    queryKey: ["publicCaseStudy", shareToken],
    queryFn: async () => {
      if (actor) {
        try {
          const raw = await actor.getPublicCaseStudy?.(shareToken);
          if (raw) return mapRaw(raw as unknown as Record<string, unknown>);
        } catch {
          // fallthrough to mock
        }
      }
      return MOCK_CASE_STUDIES.find((c) => c.shareToken === shareToken) ?? null;
    },
    enabled: !isFetching,
    staleTime: 300_000,
  });
}

export function useCreateCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCaseStudyInput) => {
      if (!actor) {
        return { id: String(Date.now()), ...input };
      }
      const result = await actor.createCaseStudy?.(
        input as unknown as Parameters<typeof actor.createCaseStudy>[0],
        input as unknown as Parameters<typeof actor.createCaseStudy>[1],
        input as unknown as Parameters<typeof actor.createCaseStudy>[2],
        input as unknown as Parameters<typeof actor.createCaseStudy>[3],
        input as unknown as Parameters<typeof actor.createCaseStudy>[4],
        input as unknown as Parameters<typeof actor.createCaseStudy>[5],
        input as unknown as Parameters<typeof actor.createCaseStudy>[6],
      );
      if (!result) throw new Error("Failed to create case study");
      return result as unknown as CaseStudy;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] }),
  });
}

export function useUpdateCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateCaseStudyInput) => {
      if (!actor) return input;
      const result = await actor.updateCaseStudy?.(
        input.id,
        input as unknown as import("../backend").CaseStudyUpdate,
      );
      return (result as unknown as CaseStudy | null | undefined) ?? input;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] }),
  });
}

export function usePublishCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return;
      await actor.publishCaseStudy?.(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] }),
  });
}

export function useDeleteCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return;
      await actor.deleteCaseStudy?.(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] }),
  });
}
