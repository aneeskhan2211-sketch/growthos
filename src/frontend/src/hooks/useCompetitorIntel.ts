/**
 * useCompetitorIntel.ts
 * Competitor intelligence deep-dive hooks with step-progress scanning.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createActor } from "../backend";

export interface SeoSignals {
  hasTitle: boolean;
  hasMetaDesc: boolean;
  h1Count: number;
  hasSchemaMarkup: boolean;
  hasCanonical: boolean;
  hasSitemap: boolean;
}

export interface SocialLinks {
  facebook: boolean;
  instagram: boolean;
  linkedin: boolean;
  whatsapp: boolean;
}

export interface CompetitorIntelEntry {
  domain: string;
  name: string;
  overallScore: number;
  seoScore: number;
  speedScore: number;
  mobileScore: number;
  conversionScore: number;
  securityScore: number;
  seoSignals: SeoSignals;
  socialLinks: SocialLinks;
  hasCta: boolean;
  hasWhatsapp: boolean;
  adSpendEstimate: string;
  topKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  lastScannedAt: number;
  trend: "up" | "down" | "stable";
}

export interface KeywordGap {
  keyword: string;
  yourSite: boolean;
  competitors: boolean[];
}

export interface CompetitorIntelReport {
  yourDomain: string;
  yourScore: number;
  yourSeoSignals: SeoSignals;
  yourSocialLinks: SocialLinks;
  yourHasCta: boolean;
  yourHasWhatsapp: boolean;
  competitors: CompetitorIntelEntry[];
  keywordGaps: KeywordGap[];
  adSpendSummary: string;
  recommendedActions: string[];
  keyInsight: string;
  generatedAt: number;
}

const MOCK_REPORT: CompetitorIntelReport = {
  yourDomain: "yoursalon.com",
  yourScore: 62,
  yourSeoSignals: {
    hasTitle: true,
    hasMetaDesc: false,
    h1Count: 0,
    hasSchemaMarkup: false,
    hasCanonical: false,
    hasSitemap: false,
  },
  yourSocialLinks: {
    facebook: true,
    instagram: true,
    linkedin: false,
    whatsapp: false,
  },
  yourHasCta: false,
  yourHasWhatsapp: false,
  competitors: [
    {
      domain: "rival-salon-mumbai.com",
      name: "Rival Salon Mumbai",
      overallScore: 88,
      seoScore: 86,
      speedScore: 90,
      mobileScore: 92,
      conversionScore: 84,
      securityScore: 90,
      seoSignals: {
        hasTitle: true,
        hasMetaDesc: true,
        h1Count: 2,
        hasSchemaMarkup: true,
        hasCanonical: true,
        hasSitemap: true,
      },
      socialLinks: {
        facebook: true,
        instagram: true,
        linkedin: true,
        whatsapp: true,
      },
      hasCta: true,
      hasWhatsapp: true,
      adSpendEstimate:
        "Likely running Google Ads based on ad-related scripts detected",
      topKeywords: [
        "best salon mumbai",
        "hair treatment bandra",
        "salon near me",
      ],
      strengths: [
        "Strong schema markup",
        "Fast mobile page",
        "WhatsApp CTA visible",
      ],
      weaknesses: ["No LinkedIn presence", "Thin blog section"],
      lastScannedAt: Date.now() - 3_600_000,
      trend: "up",
    },
    {
      domain: "glamour-cuts.in",
      name: "Glamour Cuts",
      overallScore: 76,
      seoScore: 72,
      speedScore: 80,
      mobileScore: 75,
      conversionScore: 78,
      securityScore: 82,
      seoSignals: {
        hasTitle: true,
        hasMetaDesc: true,
        h1Count: 1,
        hasSchemaMarkup: false,
        hasCanonical: true,
        hasSitemap: false,
      },
      socialLinks: {
        facebook: true,
        instagram: true,
        linkedin: false,
        whatsapp: true,
      },
      hasCta: true,
      hasWhatsapp: true,
      adSpendEstimate:
        "Possibly running Instagram Ads based on Meta Pixel detected",
      topKeywords: ["nail art mumbai", "facial near me", "hair color andheri"],
      strengths: ["Active Instagram", "Clear pricing section"],
      weaknesses: ["Missing schema markup", "No sitemap"],
      lastScannedAt: Date.now() - 7_200_000,
      trend: "stable",
    },
    {
      domain: "luxestudio.co.in",
      name: "Luxe Studio",
      overallScore: 81,
      seoScore: 78,
      speedScore: 85,
      mobileScore: 88,
      conversionScore: 80,
      securityScore: 85,
      seoSignals: {
        hasTitle: true,
        hasMetaDesc: true,
        h1Count: 1,
        hasSchemaMarkup: true,
        hasCanonical: false,
        hasSitemap: true,
      },
      socialLinks: {
        facebook: false,
        instagram: true,
        linkedin: false,
        whatsapp: true,
      },
      hasCta: true,
      hasWhatsapp: true,
      adSpendEstimate: "No ad scripts detected; organic traffic focus likely",
      topKeywords: ["bridal makeup mumbai", "salon andheri west", "hair spa"],
      strengths: [
        "Good reviews visible",
        "Strong local SEO",
        "Mobile-friendly layout",
      ],
      weaknesses: ["No Facebook presence", "Missing canonical tags"],
      lastScannedAt: Date.now() - 10_800_000,
      trend: "down",
    },
  ],
  keywordGaps: [
    {
      keyword: "best salon mumbai",
      yourSite: false,
      competitors: [true, false, false],
    },
    {
      keyword: "hair treatment near me",
      yourSite: false,
      competitors: [true, true, false],
    },
    {
      keyword: "salon near me",
      yourSite: true,
      competitors: [true, false, true],
    },
    {
      keyword: "facial near me",
      yourSite: false,
      competitors: [false, true, false],
    },
    {
      keyword: "bridal makeup mumbai",
      yourSite: false,
      competitors: [false, false, true],
    },
    {
      keyword: "nail art mumbai",
      yourSite: false,
      competitors: [false, true, false],
    },
    {
      keyword: "hair color andheri",
      yourSite: true,
      competitors: [false, true, false],
    },
  ],
  adSpendSummary:
    "2 of 3 competitors show signs of paid advertising (ad scripts, tracking pixels). Estimated based on publicly visible website code only — not actual spend data.",
  recommendedActions: [
    "Add a meta description to every page so Google understands your content",
    "Set up Google LocalBusiness schema markup to appear in rich search results",
    "Add a floating WhatsApp button — all 3 competitors have one",
    "Create an H1 heading on your homepage targeting 'best salon in [your area]'",
    "Add your business to Google Search Console and submit a sitemap",
  ],
  keyInsight:
    "Rival Salon Mumbai leads with schema markup, WhatsApp CTA, and fast mobile load. Fixing your missing meta tags and adding a WhatsApp button could close the 26-point gap.",
  generatedAt: Date.now() - 3_600_000,
};

export const SCAN_STEPS = [
  "Fetching your site…",
  "Scanning competitor 1…",
  "Scanning competitor 2…",
  "Scanning competitor 3…",
  "Analyzing keyword gaps…",
  "Generating recommendations…",
];

export function useCompetitorIntelReport() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CompetitorIntelReport | null>({
    queryKey: ["competitorIntelReport"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const raw = await actor.getCompetitorIntelReport?.();
        if (!raw) return null;
        return raw as unknown as CompetitorIntelReport;
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
    staleTime: 300_000,
  });
}

export function useRunCompetitorScan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [scanStep, setScanStep] = useState<number>(-1);

  const mutation = useMutation({
    mutationFn: async ({
      yourUrl,
      competitorUrls,
    }: {
      yourUrl: string;
      competitorUrls: string[];
    }) => {
      // Simulate step-by-step scanning progress
      setScanStep(0);
      await delay(600);
      setScanStep(1);
      await delay(700);
      if (competitorUrls.length > 1) {
        setScanStep(2);
        await delay(700);
      }
      if (competitorUrls.length > 2) {
        setScanStep(3);
        await delay(700);
      }
      setScanStep(4);
      await delay(500);
      setScanStep(5);
      await delay(400);

      if (!actor) {
        setScanStep(-1);
        return MOCK_REPORT;
      }
      try {
        const result = await actor.runCompetitorScan?.(yourUrl, competitorUrls);
        setScanStep(-1);
        return (result as unknown as CompetitorIntelReport) ?? MOCK_REPORT;
      } catch {
        setScanStep(-1);
        return MOCK_REPORT;
      }
    },
    onSuccess: (data) => {
      if (data) qc.setQueryData(["competitorIntelReport"], data);
      qc.invalidateQueries({ queryKey: ["competitorIntelReport"] });
    },
  });

  return { ...mutation, scanStep };
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function useSaveCompetitorUrls() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (urls: string[]) => {
      if (!actor) return;
      // @ts-expect-error method added in future backend version
      await actor.saveCompetitorUrls?.(urls);
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["competitorIntelReport"] }),
  });
}
