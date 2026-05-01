import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  ConversionScript,
  CreateWhatsAppTemplateInput,
  GrowthReport,
  LandingPage,
  SeoAuditRecord,
  WhatsAppTemplate,
  WhatsAppTemplateStatus,
} from "../types/growth-engine";

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "tmpl-1",
    name: "Lead Outreach - Standard",
    category: "lead_outreach",
    body: "Hi {{BusinessName}}, we analyzed your online presence in {{City}} and found you may be missing potential customers from Google search. Would you like a free growth audit?",
    variables: ["BusinessName", "City"],
    status: "approved",
    usageCount: 142,
    replyRate: 18.4,
    createdAt: Date.now() - 30 * 86400000,
    submittedAt: Date.now() - 28 * 86400000,
    approvedAt: Date.now() - 27 * 86400000,
  },
  {
    id: "tmpl-2",
    name: "Follow-Up Day 2",
    category: "follow_up",
    body: "Hi {{BusinessName}}, just following up on our message from yesterday. We noticed businesses like yours in {{City}} are getting 3x more leads with better online visibility. Happy to share how — quick 10 min call?",
    variables: ["BusinessName", "City"],
    status: "approved",
    usageCount: 89,
    replyRate: 11.2,
    createdAt: Date.now() - 25 * 86400000,
    submittedAt: Date.now() - 23 * 86400000,
    approvedAt: Date.now() - 22 * 86400000,
  },
  {
    id: "tmpl-3",
    name: "Proposal Sharing",
    category: "proposal_sharing",
    body: "Hi {{BusinessName}}, here is the growth proposal we prepared for your {{Service}} business in {{City}}. It covers SEO improvements, local listing optimization, and a 90-day growth roadmap. [View Proposal Link]",
    variables: ["BusinessName", "Service", "City"],
    status: "pending",
    usageCount: 0,
    replyRate: 0,
    createdAt: Date.now() - 3 * 86400000,
    submittedAt: Date.now() - 2 * 86400000,
  },
  {
    id: "tmpl-4",
    name: "Generic Pitch",
    category: "lead_outreach",
    body: "Hi, we offer digital marketing services. Contact us for more info.",
    variables: [],
    status: "rejected",
    rejectionReason:
      "Too generic, lacks personalization. Must include business-specific variables and a clear value proposition.",
    usageCount: 0,
    replyRate: 0,
    createdAt: Date.now() - 15 * 86400000,
    submittedAt: Date.now() - 13 * 86400000,
  },
  {
    id: "tmpl-5",
    name: "Holiday Campaign",
    category: "lead_outreach",
    body: "Hi {{BusinessName}}! This festive season is the best time to grow your customer base in {{City}}. We have a special holiday growth package to help you get 20–30 new customers before the new year. Interested?",
    variables: ["BusinessName", "City"],
    status: "paused",
    usageCount: 34,
    replyRate: 22.1,
    createdAt: Date.now() - 60 * 86400000,
    submittedAt: Date.now() - 58 * 86400000,
    approvedAt: Date.now() - 57 * 86400000,
  },
];

const MOCK_LANDING_PAGES: LandingPage[] = [
  {
    id: "lp-1",
    niche: "salons",
    city: "Mumbai",
    slug: "digital-marketing-salons-mumbai",
    headline: "Get 30–50 New Salon Customers Every Month",
    subheadline:
      "We help salons in Mumbai dominate local search and grow revenue",
    sections: [],
    status: "published",
    leads: 24,
    views: 312,
    createdAt: Date.now() - 20 * 86400000,
    publishedAt: Date.now() - 18 * 86400000,
  },
  {
    id: "lp-2",
    niche: "gyms",
    city: "Pune",
    slug: "digital-marketing-gyms-pune",
    headline: "Double Your Gym Memberships in 90 Days",
    subheadline: "Local SEO and targeted ads that bring members to your door",
    sections: [],
    status: "draft",
    leads: 0,
    views: 0,
    createdAt: Date.now() - 5 * 86400000,
  },
];

const MOCK_SCRIPTS: ConversionScript[] = [
  {
    id: "script-1",
    type: "discovery_call",
    title: "Discovery Call — Salon & Wellness",
    niche: "salons",
    steps: [
      {
        step: 1,
        label: "Open",
        script:
          "Hi [Name], this is [Your Name] from GrowthOS. Thanks for taking the time — I'll keep this quick, just 10 minutes. How's business going lately?",
        tip: "Be warm and casual, not salesy",
      },
      {
        step: 2,
        label: "Diagnose",
        script:
          "I noticed your salon doesn't show up on the first page when people search for salons in [City]. Are you getting enough walk-ins and bookings online?",
        tip: "Reference their specific situation",
      },
      {
        step: 3,
        label: "Pain",
        script:
          "What's the biggest frustration right now — is it getting new customers, keeping existing ones, or getting found online?",
        tip: "Let them talk, listen for their real pain",
      },
      {
        step: 4,
        label: "Close",
        script:
          "Based on what you've shared, I think we can get you 20–30 more customers per month within 90 days. Would you like me to send you a detailed growth plan this week?",
        tip: "Specific numbers build trust",
      },
    ],
    createdAt: Date.now() - 10 * 86400000,
  },
];

const MOCK_SEO_AUDITS: SeoAuditRecord[] = [
  {
    id: "seo-1",
    url: "https://sunrisesalon.in",
    businessName: "Sunrise Salon",
    score: 42,
    items: [
      {
        id: "s1",
        category: "on_page",
        title: "Missing Meta Description",
        description: "No meta description found",
        severity: "critical",
        recommendation: "Add a 155-char description with your main keyword",
      },
      {
        id: "s2",
        category: "local",
        title: "Google Business Profile Incomplete",
        description: "Business hours and photos missing",
        severity: "critical",
        recommendation: "Complete your GMB profile to rank in local pack",
      },
      {
        id: "s3",
        category: "technical",
        title: "Page Speed — Mobile",
        description: "Page loads in 6.2s on mobile",
        severity: "warning",
        recommendation: "Compress images and enable browser caching",
      },
    ],
    keywords: [
      "salon in Mumbai",
      "best hair salon Mumbai",
      "beauty parlour near me",
    ],
    createdAt: Date.now() - 2 * 86400000,
    label: "Based on publicly available data and heuristics",
  },
];

const MOCK_GROWTH_REPORTS: GrowthReport[] = [
  {
    id: "report-1",
    clientId: "client-1",
    clientName: "Sunrise Salon",
    period: "April 2026",
    leadsGenerated: 38,
    conversionRate: 18,
    revenueImpact: 47000,
    weeklyActions: [
      {
        id: "a1",
        week: 1,
        title: "Run Referral Offer",
        description: "Offer ₹200 off next visit for every referral",
        category: "offer",
        completed: true,
      },
      {
        id: "a2",
        week: 2,
        title: "Post 3 Reels",
        description: "Before/after transformations with trending audio",
        category: "content",
        completed: true,
      },
      {
        id: "a3",
        week: 3,
        title: "Google Ads Campaign",
        description: "₹500/day budget targeting 'salon in Mumbai'",
        category: "ads",
        completed: false,
      },
      {
        id: "a4",
        week: 4,
        title: "Request Reviews",
        description: "Send review request to last 20 clients via WhatsApp",
        category: "retention",
        completed: false,
      },
    ],
    revenueStrategy: [
      "Upsell hair treatment packages to walk-in clients",
      "Introduce monthly membership plan at ₹999/month",
      "Partner with bridal studios for referral commissions",
    ],
    marketingSuggestions: [
      "Reel idea: '3 hairstyles for Navratri 2026' — high search volume",
      "Claim and optimize Google Business Profile listing",
      "Start collecting reviews — even 10 reviews can push you to the local pack",
    ],
    nextActions: [
      "Launch Google Ads by 5th May",
      "Record 2 transformation reels this week",
      "Add booking link to Instagram bio",
    ],
    createdAt: Date.now() - 86400000,
  },
];

// ─── WhatsApp Templates ────────────────────────────────────────────────────────

export function useWhatsAppTemplates() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WhatsAppTemplate[]>({
    queryKey: ["growth-engine", "templates"],
    queryFn: async () => {
      if (!actor) return MOCK_TEMPLATES;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listWhatsAppTemplates();
        return result?.length > 0 ? result : MOCK_TEMPLATES;
      } catch {
        return MOCK_TEMPLATES;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_TEMPLATES,
  });
}

export function useCreateWhatsAppTemplate() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: CreateWhatsAppTemplateInput) => {
      if (!actor) {
        const mock: WhatsAppTemplate = {
          id: `tmpl-${Date.now()}`,
          ...input,
          status: "draft",
          usageCount: 0,
          replyRate: 0,
          createdAt: Date.now(),
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createWhatsAppTemplate(
        input.name,
        input.category,
        input.body,
        input.variables,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["growth-engine", "templates"],
      });
    },
  });
}

export function useSubmitTemplateForApproval() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).submitTemplateForApproval(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["growth-engine", "templates"],
      });
    },
  });
}

export function useUpdateTemplateStatus() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      status,
      rejectionReason,
    }: {
      id: string;
      status: WhatsAppTemplateStatus;
      rejectionReason?: string;
    }) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateTemplateApprovalStatus(
        id,
        status,
        rejectionReason ?? "",
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["growth-engine", "templates"],
      });
    },
  });
}

// ─── Landing Pages ─────────────────────────────────────────────────────────────

export function useLandingPages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LandingPage[]>({
    queryKey: ["growth-engine", "landing-pages"],
    queryFn: async () => {
      if (!actor) return MOCK_LANDING_PAGES;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listLandingPages();
        return result?.length > 0 ? result : MOCK_LANDING_PAGES;
      } catch {
        return MOCK_LANDING_PAGES;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_LANDING_PAGES,
  });
}

export function useCreateLandingPage() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (
      input: Omit<LandingPage, "id" | "leads" | "views" | "createdAt">,
    ) => {
      if (!actor) {
        const mock: LandingPage = {
          id: `lp-${Date.now()}`,
          ...input,
          leads: 0,
          views: 0,
          createdAt: Date.now(),
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createLandingPage(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["growth-engine", "landing-pages"],
      });
    },
  });
}

export function usePublishLandingPage() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).publishLandingPage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["growth-engine", "landing-pages"],
      });
    },
  });
}

// ─── Conversion Scripts ────────────────────────────────────────────────────────

export function useConversionScripts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ConversionScript[]>({
    queryKey: ["growth-engine", "scripts"],
    queryFn: async () => {
      if (!actor) return MOCK_SCRIPTS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listConversionScripts();
        return result?.length > 0 ? result : MOCK_SCRIPTS;
      } catch {
        return MOCK_SCRIPTS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_SCRIPTS,
  });
}

export function useCreateConversionScript() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: Omit<ConversionScript, "id" | "createdAt">) => {
      if (!actor) {
        const mock: ConversionScript = {
          id: `script-${Date.now()}`,
          ...input,
          createdAt: Date.now(),
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).createConversionScript(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["growth-engine", "scripts"] });
    },
  });
}

// ─── SEO Audits ────────────────────────────────────────────────────────────────

export function useSeoAudits() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SeoAuditRecord[]>({
    queryKey: ["growth-engine", "seo-audits"],
    queryFn: async () => {
      if (!actor) return MOCK_SEO_AUDITS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).listSeoAudits();
        return result?.length > 0 ? result : MOCK_SEO_AUDITS;
      } catch {
        return MOCK_SEO_AUDITS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_SEO_AUDITS,
  });
}

export function useRunSeoAudit() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      url,
      businessName,
    }: { url: string; businessName: string }) => {
      if (!actor) {
        const mock: SeoAuditRecord = {
          id: `seo-${Date.now()}`,
          url,
          businessName,
          score: Math.floor(Math.random() * 60) + 20,
          items: MOCK_SEO_AUDITS[0].items,
          keywords: [
            `${businessName.toLowerCase()} near me`,
            `best ${businessName.toLowerCase()}`,
          ],
          createdAt: Date.now(),
          label: "Based on publicly available data and heuristics",
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).runSeoAudit(url, businessName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["growth-engine", "seo-audits"],
      });
    },
  });
}

// ─── Growth Reports ────────────────────────────────────────────────────────────

export function useGrowthReports(clientId: string) {
  const { actor, isFetching } = useActor(createActor);
  const filtered = MOCK_GROWTH_REPORTS.filter((r) => r.clientId === clientId);
  return useQuery<GrowthReport[]>({
    queryKey: ["growth-engine", "reports", clientId],
    queryFn: async () => {
      if (!actor) return filtered.length > 0 ? filtered : MOCK_GROWTH_REPORTS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getGrowthReports(clientId);
        return result?.length > 0 ? result : MOCK_GROWTH_REPORTS;
      } catch {
        return MOCK_GROWTH_REPORTS;
      }
    },
    enabled: !isFetching,
    initialData: filtered.length > 0 ? filtered : MOCK_GROWTH_REPORTS,
  });
}

export function useGenerateGrowthReport() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      clientId,
      clientName,
      period,
    }: { clientId: string; clientName: string; period: string }) => {
      if (!actor) {
        const mock: GrowthReport = {
          id: `report-${Date.now()}`,
          clientId,
          clientName,
          period,
          leadsGenerated: Math.floor(Math.random() * 40) + 10,
          conversionRate: Math.floor(Math.random() * 20) + 10,
          revenueImpact: Math.floor(Math.random() * 50000) + 10000,
          weeklyActions: MOCK_GROWTH_REPORTS[0].weeklyActions,
          revenueStrategy: MOCK_GROWTH_REPORTS[0].revenueStrategy,
          marketingSuggestions: MOCK_GROWTH_REPORTS[0].marketingSuggestions,
          nextActions: MOCK_GROWTH_REPORTS[0].nextActions,
          createdAt: Date.now(),
        };
        return mock;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).generateGrowthReport(clientId, clientName, period);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["growth-engine", "reports", variables.clientId],
      });
    },
  });
}
