import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import type {
  AccountabilityState,
  AutoAgencyState,
  AutoReport,
  ClientGrowthPlan,
  CoachSuggestion,
  DealSuggestion,
  MarketplaceListing,
  PerformanceScore,
  RevenuePrediction,
} from "../types/auto-agency";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const now = BigInt(Date.now()) * BigInt(1_000_000);
const dayMs = BigInt(24 * 60 * 60) * BigInt(1_000_000_000);

const MOCK_AGENCY_STATE: AutoAgencyState = {
  toggleEnabled: true,
  lastRunTime: now - BigInt(2 * 60 * 60) * BigInt(1_000_000_000),
  nextRunTime: now + BigInt(22 * 60 * 60) * BigInt(1_000_000_000),
  dailyLeadsGenerated: BigInt(18),
  dailyOutreachSent: BigInt(12),
  dailyFollowupsSent: BigInt(5),
  runCount: BigInt(7),
  lastActivityFeed: [
    {
      actionId: "a1",
      actionType: "leadFound",
      timestamp: now - BigInt(30 * 60) * BigInt(1_000_000_000),
      description: "Found 6 new high-score leads in Mumbai dental niche",
      leadName: "BlueSky Dental Clinic",
      outcome: "Score 87 — added to pipeline",
    },
    {
      actionId: "a2",
      actionType: "outreachSent",
      timestamp: now - BigInt(45 * 60) * BigInt(1_000_000_000),
      description: "Sent personalized WhatsApp pitch",
      leadName: "Prime Fitness & Wellness",
      outcome: "Delivered ✓",
    },
    {
      actionId: "a3",
      actionType: "followupSent",
      timestamp: now - BigInt(90 * 60) * BigInt(1_000_000_000),
      description: "Day-3 follow-up email sent automatically",
      leadName: "Spice Garden Restaurant",
      outcome: "Reply received!",
    },
    {
      actionId: "a4",
      actionType: "dealSuggested",
      timestamp: now - BigInt(120 * 60) * BigInt(1_000_000_000),
      description: "High close probability detected — deal suggested",
      leadName: "TechEdge Solutions",
      outcome: "₹45,000 opportunity flagged",
    },
    {
      actionId: "a5",
      actionType: "reportGenerated",
      timestamp: now - BigInt(180 * 60) * BigInt(1_000_000_000),
      description: "Monthly performance report auto-generated",
      leadName: "Nimbus Cloud Consulting",
      outcome: "Report ready to send",
    },
  ],
};

const MOCK_ACCOUNTABILITY: AccountabilityState = {
  dailyLeadsContacted: BigInt(7),
  dailyFollowupsDone: BigInt(3),
  dailyDealsClosed: BigInt(0),
  targetLeads: BigInt(10),
  targetFollowups: BigInt(5),
  targetDeals: BigInt(1),
  currentStreak: BigInt(5),
  lastTaskDate: now - dayMs,
  streakMilestones: [BigInt(3), BigInt(7), BigInt(14), BigInt(30)],
  todayComplete: false,
};

const MOCK_DEAL_SUGGESTIONS: DealSuggestion[] = [
  {
    suggestionId: "ds1",
    leadId: BigInt(3),
    closeProbability: BigInt(87),
    suggestedPrice: BigInt(45000),
    suggestedPitch:
      "Hi TechEdge, I noticed your website hasn't been updated since 2019. We helped a similar IT firm in Bengaluru get 3x more inbound leads within 60 days. Can we show you a quick demo?",
    bestContactTime: "Tuesday 11am–1pm",
    pricingTier: "pro",
    createdAt: now - dayMs,
  },
  {
    suggestionId: "ds2",
    leadId: BigInt(8),
    closeProbability: BigInt(79),
    suggestedPrice: BigInt(35000),
    suggestedPitch:
      "CloudNine Co-Working — your Google Ads aren't running while competitors are dominating 'coworking Bengaluru'. You're losing ₹2L+/month in missed leads.",
    bestContactTime: "Wednesday 3pm–5pm",
    pricingTier: "growth",
    createdAt: now - dayMs * BigInt(2),
  },
  {
    suggestionId: "ds3",
    leadId: BigInt(1),
    closeProbability: BigInt(91),
    suggestedPrice: BigInt(25000),
    suggestedPitch:
      "BlueSky Dental — you have zero Google Business Profile reviews. I can get you 20 verified reviews in 30 days, putting you above every competitor in Mumbai.",
    bestContactTime: "Thursday 10am–12pm",
    pricingTier: "growth",
    createdAt: now - dayMs * BigInt(3),
  },
];

const MOCK_REVENUE_PREDICTION: RevenuePrediction = {
  weeklyEstimate: BigInt(75000),
  monthlyEstimate: BigInt(285000),
  pipelineValue: BigInt(420000),
  missedOppCount: BigInt(4),
  hotLeadsCount: BigInt(8),
  closingThisWeek: BigInt(3),
  predictionBasis:
    "Based on 8 hot leads, 3 proposals sent this week, and your avg ₹25k deal size",
  generatedAt: now,
};

const MOCK_PERFORMANCE: PerformanceScore = {
  userId: "user_001",
  activityScore: BigInt(82),
  conversionRate: BigInt(18),
  revenueScore: BigInt(74),
  overallScore: BigInt(78),
  percentileRank: BigInt(89),
  estimatedMonthlyRevenue: BigInt(95000),
  rank: "Top 11% of users",
  updatedAt: now,
};

const MOCK_MARKETPLACE: MarketplaceListing[] = [
  {
    listingId: "ml1",
    listingType: "buyLeads",
    title: "100 Premium Dental Clinic Leads — Mumbai + Pune",
    description:
      "Verified, high-score dental leads with contact info, website gap analysis, and WhatsApp opt-in. Score >75 guaranteed.",
    price: BigInt(4999),
    sellerId: "seller_01",
    sellerName: "LeadGen Pro Agency",
    reviewCount: BigInt(34),
    avgRating: BigInt(47),
    tags: ["dental", "healthcare", "mumbai", "pune", "verified"],
    isActive: true,
    createdAt: now - dayMs * BigInt(5),
  },
  {
    listingId: "ml2",
    listingType: "sellService",
    title: "Google Ads Setup + Management (30 days)",
    description:
      "Complete Google Search Ads setup, keyword research, landing page review, and 30-day management. Guaranteed 20+ leads or refund.",
    price: BigInt(12999),
    sellerId: "seller_02",
    sellerName: "DigitalBoost India",
    reviewCount: BigInt(21),
    avgRating: BigInt(48),
    tags: ["google-ads", "ppc", "lead-gen", "guaranteed"],
    isActive: true,
    createdAt: now - dayMs * BigInt(8),
  },
  {
    listingId: "ml3",
    listingType: "hireFreelancer",
    title: "WhatsApp Campaign Copywriter — 20 Templates",
    description:
      "Native Hindi + English WhatsApp pitch templates for salons, gyms, clinics, and restaurants. High reply rates verified across 200+ campaigns.",
    price: BigInt(2499),
    sellerId: "seller_03",
    sellerName: "Riya Mehta Copywriting",
    reviewCount: BigInt(58),
    avgRating: BigInt(49),
    tags: ["whatsapp", "copywriting", "templates", "hindi"],
    isActive: true,
    createdAt: now - dayMs * BigInt(2),
  },
  {
    listingId: "ml4",
    listingType: "buyLeads",
    title: "50 Gym & Fitness Leads — Bangalore, Hyderabad, Chennai",
    description:
      "Fresh leads from South India's fitness industry. Includes owner contact, current ad spend estimate, and social gap analysis.",
    price: BigInt(2999),
    sellerId: "seller_04",
    sellerName: "FitLeads South",
    reviewCount: BigInt(17),
    avgRating: BigInt(45),
    tags: ["gym", "fitness", "south-india", "bangalore"],
    isActive: true,
    createdAt: now - dayMs * BigInt(3),
  },
  {
    listingId: "ml5",
    listingType: "sellService",
    title: "Local SEO Package — 3 Month Retainer",
    description:
      "Full local SEO: Google Business Profile optimization, citation building, review generation, and monthly rank reports.",
    price: BigInt(8999),
    sellerId: "seller_05",
    sellerName: "RankLocal Agency",
    reviewCount: BigInt(43),
    avgRating: BigInt(46),
    tags: ["seo", "local-seo", "google-business", "retainer"],
    isActive: true,
    createdAt: now - dayMs * BigInt(10),
  },
  {
    listingId: "ml6",
    listingType: "hireFreelancer",
    title: "Instagram Content Creator — 12 Posts/Month",
    description:
      "High-quality Reels + carousels for salons, cafes, and boutiques. Includes captions, hashtags, and story versions.",
    price: BigInt(5999),
    sellerId: "seller_06",
    sellerName: "Arjun Visuals",
    reviewCount: BigInt(29),
    avgRating: BigInt(48),
    tags: ["instagram", "content", "reels", "social-media"],
    isActive: true,
    createdAt: now - dayMs * BigInt(7),
  },
];

const MOCK_COACH_SUGGESTIONS: CoachSuggestion[] = [
  {
    id: "cs1",
    type: "revenueTactic",
    title: "Launch a 'Free 30-Day Audit' Offer This Week",
    description:
      "Free audits convert 3x better than cold pitches. Send to 10 dental and salon leads today — follow up in 48h with results.",
    expectedROI: "+₹40,000 potential from 2 closures",
    effort: "quick",
    actionLabel: "Create Audit Campaign",
    niche: "All niches",
  },
  {
    id: "cs2",
    type: "nicheTargeting",
    title: "Target Gyms in Bengaluru This Week",
    description:
      "Post-New Year gym signups are slowing — owners are now looking for digital marketing help. Strike while the intent is high.",
    expectedROI: "+₹25,000 from 3 gym clients",
    effort: "medium",
    actionLabel: "Find Gym Leads",
    niche: "Fitness",
  },
  {
    id: "cs3",
    type: "growthHack",
    title: "Ask 3 Clients for a Google Review Today",
    description:
      "Each Google review improves your agency's local visibility and acts as social proof in your pitch decks. Takes 2 minutes per client.",
    expectedROI: "+15% higher conversion rate",
    effort: "quick",
    actionLabel: "Message Clients",
    niche: "Agency growth",
  },
  {
    id: "cs4",
    type: "revenueTactic",
    title: "Run a ₹499 'Quick Win' Offer for Restaurants",
    description:
      "Low-ticket entry offer: Google Business Profile setup + 5 review responses. Gets your foot in the door for ₹15k retainers.",
    expectedROI: "+₹60,000 from upsells",
    effort: "medium",
    actionLabel: "Set Up Offer",
    niche: "Restaurants & Cafes",
  },
  {
    id: "cs5",
    type: "growthHack",
    title: "Improve Your Google Reviews via QR Code",
    description:
      "Print a QR code and send to clients to put at their checkout. Every new review boosts both their SEO and your case studies.",
    expectedROI: "+20% client retention",
    effort: "quick",
    actionLabel: "Generate QR Code",
    niche: "Local businesses",
  },
  {
    id: "cs6",
    type: "nicheTargeting",
    title: "Focus on Real Estate Agents in Pune + Hyderabad",
    description:
      "Property portals are saturated — individual agents are actively looking for personal branding and lead gen services.",
    expectedROI: "+₹50,000 from 2 retainers",
    effort: "deep",
    actionLabel: "Find Real Estate Leads",
    niche: "Real Estate",
  },
];

const MOCK_CLIENT_GROWTH_PLAN = (clientId: bigint): ClientGrowthPlan => ({
  planId: `plan_${clientId}`,
  clientId,
  weekOf: now,
  approvalStatus: "pending",
  generatedAt: now,
  seoPlan: [
    {
      title: "Optimize Google Business Profile",
      description:
        "Add 10 photos, update hours, add services, and reply to all reviews.",
      effort: "quick",
      priorityScore: BigInt(92),
      estimatedRevenue: BigInt(15000),
      status: "pending",
    },
    {
      title: "Build 15 Local Directory Citations",
      description:
        "Submit to JustDial, Sulekha, IndiaMART, and 12 other local directories.",
      effort: "medium",
      priorityScore: BigInt(78),
      estimatedRevenue: BigInt(8000),
      status: "pending",
    },
  ],
  adsPlan: [
    {
      title: "Launch Google Search Ads for Core Keywords",
      description:
        "Target 5 high-intent keywords with ₹500/day budget. Expected 20+ leads/month.",
      effort: "medium",
      priorityScore: BigInt(88),
      estimatedRevenue: BigInt(45000),
      status: "pending",
    },
    {
      title: "Retargeting Campaign for Website Visitors",
      description:
        "Show ads to people who visited their site but didn't convert.",
      effort: "deep",
      priorityScore: BigInt(71),
      estimatedRevenue: BigInt(22000),
      status: "pending",
    },
  ],
  contentIdeas: [
    {
      title: "Before/After Customer Transformation Reel",
      description:
        "Film a 30-second Reel showing the client's best transformation story.",
      effort: "medium",
      priorityScore: BigInt(84),
      estimatedRevenue: BigInt(12000),
      status: "pending",
    },
    {
      title: "5 FAQ Blog Posts for Long-Tail Keywords",
      description:
        "Target 'How to…' questions in their niche. Drives organic traffic in 60–90 days.",
      effort: "deep",
      priorityScore: BigInt(65),
      estimatedRevenue: BigInt(18000),
      status: "pending",
    },
  ],
});

const MOCK_AUTO_REPORT = (clientId: bigint): AutoReport => ({
  reportId: `rep_${clientId}_${Date.now()}`,
  clientId,
  reportPeriod: "April 2026",
  leadsGenerated: BigInt(47),
  conversions: BigInt(8),
  revenueImpact: BigInt(185000),
  roi: BigInt(340),
  topChannel: "Google Search Ads",
  nextSteps: [
    "Expand Google Ads budget by ₹200/day — current ROAS is 3.4x",
    "Launch Instagram Reels campaign to build brand awareness",
    "Request 5 more Google reviews from satisfied customers",
    "Optimize top 3 landing pages for mobile (bounce rate 62%)",
  ],
  status: "ready",
  generatedAt: now,
  sentAt: null,
});

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAutoAgency() {
  const queryClient = useQueryClient();

  const { data: agencyState } = useQuery<AutoAgencyState>({
    queryKey: ["autoAgencyState"],
    queryFn: async () => MOCK_AGENCY_STATE,
    staleTime: 30_000,
  });

  const { data: accountabilityState } = useQuery<AccountabilityState>({
    queryKey: ["accountabilityState"],
    queryFn: async () => MOCK_ACCOUNTABILITY,
    staleTime: 30_000,
  });

  const { data: dealSuggestions } = useQuery<DealSuggestion[]>({
    queryKey: ["dealSuggestions"],
    queryFn: async () => MOCK_DEAL_SUGGESTIONS,
    staleTime: 60_000,
  });

  const { data: revenuePrediction } = useQuery<RevenuePrediction>({
    queryKey: ["revenuePrediction"],
    queryFn: async () => MOCK_REVENUE_PREDICTION,
    staleTime: 60_000,
  });

  const { data: performanceScore } = useQuery<PerformanceScore>({
    queryKey: ["performanceScore"],
    queryFn: async () => MOCK_PERFORMANCE,
    staleTime: 60_000,
  });

  const { data: marketplaceListings } = useQuery<MarketplaceListing[]>({
    queryKey: ["marketplaceListings"],
    queryFn: async () => MOCK_MARKETPLACE,
    staleTime: 120_000,
  });

  const coachSuggestions: CoachSuggestion[] = useMemo(
    () => MOCK_COACH_SUGGESTIONS,
    [],
  );

  const isAutoAgencyEnabled = agencyState?.toggleEnabled ?? false;

  const toggleAutoAgencyMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      await new Promise((r) => setTimeout(r, 400));
      return enabled;
    },
    onSuccess: (enabled) => {
      queryClient.setQueryData<AutoAgencyState>(["autoAgencyState"], (prev) =>
        prev ? { ...prev, toggleEnabled: enabled } : prev,
      );
    },
  });

  const runAgencyCycleMutation = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 1200));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["autoAgencyState"] });
      queryClient.invalidateQueries({ queryKey: ["dealSuggestions"] });
      queryClient.invalidateQueries({ queryKey: ["revenuePrediction"] });
    },
  });

  const updateDailyProgressMutation = useMutation({
    mutationFn: async ({
      leads,
      followups,
      deals,
    }: {
      leads: number;
      followups: number;
      deals: number;
    }) => {
      await new Promise((r) => setTimeout(r, 300));
      return { leads, followups, deals };
    },
    onSuccess: ({ leads, followups, deals }) => {
      queryClient.setQueryData<AccountabilityState>(
        ["accountabilityState"],
        (prev) => {
          if (!prev) return prev;
          const newLeads = BigInt(leads);
          const newFollowups = BigInt(followups);
          const newDeals = BigInt(deals);
          const todayComplete =
            newLeads >= prev.targetLeads &&
            newFollowups >= prev.targetFollowups &&
            newDeals >= prev.targetDeals;
          return {
            ...prev,
            dailyLeadsContacted: newLeads,
            dailyFollowupsDone: newFollowups,
            dailyDealsClosed: newDeals,
            todayComplete,
          };
        },
      );
    },
  });

  const refreshDealSuggestionsMutation = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 800));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dealSuggestions"] });
    },
  });

  const getClientGrowthPlan = useCallback(
    async (clientId: bigint): Promise<ClientGrowthPlan> => {
      await new Promise((r) => setTimeout(r, 500));
      return MOCK_CLIENT_GROWTH_PLAN(clientId);
    },
    [],
  );

  const generateClientGrowthPlan = useCallback(
    async (clientId: bigint): Promise<ClientGrowthPlan> => {
      await new Promise((r) => setTimeout(r, 1000));
      return MOCK_CLIENT_GROWTH_PLAN(clientId);
    },
    [],
  );

  const getAutoReport = useCallback(
    async (clientId: bigint): Promise<AutoReport> => {
      await new Promise((r) => setTimeout(r, 500));
      return MOCK_AUTO_REPORT(clientId);
    },
    [],
  );

  const generateAutoReport = useCallback(
    async (clientId: bigint): Promise<AutoReport> => {
      await new Promise((r) => setTimeout(r, 1200));
      return MOCK_AUTO_REPORT(clientId);
    },
    [],
  );

  const markReportSent = useCallback(
    async (_reportId: string): Promise<void> => {
      await new Promise((r) => setTimeout(r, 300));
    },
    [],
  );

  return {
    agencyState: agencyState ?? MOCK_AGENCY_STATE,
    accountabilityState: accountabilityState ?? MOCK_ACCOUNTABILITY,
    dealSuggestions: dealSuggestions ?? MOCK_DEAL_SUGGESTIONS,
    revenuePrediction: revenuePrediction ?? MOCK_REVENUE_PREDICTION,
    performanceScore: performanceScore ?? MOCK_PERFORMANCE,
    marketplaceListings: marketplaceListings ?? MOCK_MARKETPLACE,
    coachSuggestions,
    isAutoAgencyEnabled,
    toggleAutoAgency: (enabled: boolean) =>
      toggleAutoAgencyMutation.mutate(enabled),
    isToggling: toggleAutoAgencyMutation.isPending,
    runAgencyCycle: () => runAgencyCycleMutation.mutate(),
    isRunning: runAgencyCycleMutation.isPending,
    updateDailyProgress: (leads: number, followups: number, deals: number) =>
      updateDailyProgressMutation.mutate({ leads, followups, deals }),
    refreshDealSuggestions: () => refreshDealSuggestionsMutation.mutate(),
    getClientGrowthPlan,
    generateClientGrowthPlan,
    getAutoReport,
    generateAutoReport,
    markReportSent,
  };
}
