import { create } from "zustand";
import type { Action, Campaign, Lead, Message } from "../types/dashboard";
import type {
  AuditLead,
  LeaderboardEntry,
  MilestoneInfo,
  ReferralInfo,
  ShareableWin,
  SocialProofEntry,
  WeeklyChallenge,
} from "../types/viralLoop";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const d = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const minutesAgo = (mins: number) => new Date(Date.now() - mins * 60 * 1000);

// ─── Sample Data ──────────────────────────────────────────────────────────────

const SAMPLE_LEADS: Lead[] = [
  {
    id: "l1",
    businessName: "BlueSky Dental Clinic",
    city: "Mumbai",
    score: 87,
    issue: "No Google Business Profile",
    status: "new",
    phone: "+91 98201 11234",
    email: "info@bluesky.in",
    industry: "Healthcare",
    budget: 25000,
    source: "scraper",
  },
  {
    id: "l2",
    businessName: "Prime Fitness & Wellness",
    city: "Pune",
    score: 82,
    issue: "Zero online reviews",
    status: "contacted",
    phone: "+91 97301 22345",
    email: "hello@primefitness.in",
    industry: "Fitness",
    budget: 18000,
    source: "scraper",
  },
  {
    id: "l3",
    businessName: "TechEdge Solutions",
    city: "Bengaluru",
    score: 91,
    issue: "Outdated website (2019)",
    status: "interested",
    phone: "+91 98456 33456",
    email: "sales@techedge.in",
    industry: "IT Services",
    budget: 45000,
    source: "inbound",
  },
  {
    id: "l4",
    businessName: "Spice Garden Restaurant",
    city: "Hyderabad",
    score: 78,
    issue: "No social media presence",
    status: "proposal",
    phone: "+91 99001 44567",
    email: "owner@spicegarden.in",
    industry: "F&B",
    budget: 12000,
    source: "csv",
  },
  {
    id: "l5",
    businessName: "Radiance Beauty Studio",
    city: "Chennai",
    score: 74,
    issue: "Low search rankings",
    status: "new",
    phone: "+91 98765 55678",
    email: "radiance@studio.in",
    industry: "Beauty",
    budget: 10000,
    source: "organic",
  },
  {
    id: "l6",
    businessName: "GreenLeaf Organic Farms",
    city: "Nashik",
    score: 69,
    issue: "No WhatsApp Business account",
    status: "new",
    phone: "+91 97654 66789",
    email: "hello@greenleaf.in",
    industry: "Agriculture",
    budget: 8000,
    source: "referral",
  },
  {
    id: "l7",
    businessName: "Apex Auto Service Center",
    city: "Delhi",
    score: 85,
    issue: "Negative Google reviews",
    status: "contacted",
    phone: "+91 98100 77890",
    email: "apex@autoservice.in",
    industry: "Automotive",
    budget: 20000,
    source: "scraper",
  },
  {
    id: "l8",
    businessName: "CloudNine Co-Working Space",
    city: "Bengaluru",
    score: 88,
    issue: "No paid ads strategy",
    status: "interested",
    phone: "+91 99109 88901",
    email: "hello@cloudnine.in",
    industry: "Real Estate",
    budget: 35000,
    source: "inbound",
  },
  {
    id: "l9",
    businessName: "Vedic Wellness Ayurveda",
    city: "Jaipur",
    score: 72,
    issue: "Website not mobile-optimized",
    status: "new",
    phone: "+91 98234 99012",
    email: "info@vedicwell.in",
    industry: "Healthcare",
    budget: 15000,
    source: "csv",
  },
  {
    id: "l10",
    businessName: "BoldBrew Coffee Roasters",
    city: "Mumbai",
    score: 80,
    issue: "No loyalty program online",
    status: "contacted",
    phone: "+91 97801 10123",
    email: "hi@boldbrew.in",
    industry: "F&B",
    budget: 14000,
    source: "scraper",
  },
  {
    id: "l11",
    businessName: "Horizon Law Associates",
    city: "Delhi",
    score: 77,
    issue: "No content marketing",
    status: "new",
    phone: "+91 98112 21234",
    email: "contact@horizonlaw.in",
    industry: "Legal",
    budget: 30000,
    source: "organic",
  },
  {
    id: "l12",
    businessName: "Stellar Kids Academy",
    city: "Pune",
    score: 83,
    issue: "Low Instagram engagement",
    status: "proposal",
    phone: "+91 99023 32345",
    email: "info@stellarkids.in",
    industry: "Education",
    budget: 16000,
    source: "referral",
  },
  {
    id: "l13",
    businessName: "IronClad Gym & CrossFit",
    city: "Ahmedabad",
    score: 76,
    issue: "No email marketing setup",
    status: "new",
    phone: "+91 97934 43456",
    email: "train@ironcladgym.in",
    industry: "Fitness",
    budget: 11000,
    source: "scraper",
  },
  {
    id: "l14",
    businessName: "Nimbus Cloud Consulting",
    city: "Hyderabad",
    score: 93,
    issue: "No case studies or social proof",
    status: "closed",
    phone: "+91 98845 54567",
    email: "bd@nimbus.in",
    industry: "IT Services",
    budget: 60000,
    source: "inbound",
  },
  {
    id: "l15",
    businessName: "The Crafted Home Studio",
    city: "Chennai",
    score: 71,
    issue: "No Facebook/Meta ads running",
    status: "new",
    phone: "+91 97756 65678",
    email: "store@craftedhome.in",
    industry: "Home Decor",
    budget: 9000,
    source: "csv",
  },
];

const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    name: "Mumbai Dental Clinic Blitz",
    status: "active",
    platform: "google",
    budget: 30000,
    spent: 18450,
    leadsCount: 47,
    conversionRate: 12.4,
    startDate: "2026-04-01",
  },
  {
    id: "c2",
    name: "Bengaluru IT Leads — LinkedIn",
    status: "active",
    platform: "linkedin",
    budget: 25000,
    spent: 9800,
    leadsCount: 28,
    conversionRate: 9.8,
    startDate: "2026-04-10",
  },
  {
    id: "c3",
    name: "Pan-India Fitness Q2",
    status: "active",
    platform: "instagram",
    budget: 15000,
    spent: 7200,
    leadsCount: 63,
    conversionRate: 7.2,
    startDate: "2026-04-05",
  },
  {
    id: "c4",
    name: "Restaurant WhatsApp Blasts",
    status: "paused",
    platform: "whatsapp",
    budget: 8000,
    spent: 5600,
    leadsCount: 34,
    conversionRate: 14.1,
    startDate: "2026-03-15",
  },
  {
    id: "c5",
    name: "Delhi NCR SMB April",
    status: "completed",
    platform: "facebook",
    budget: 20000,
    spent: 20000,
    leadsCount: 91,
    conversionRate: 11.0,
    startDate: "2026-03-01",
  },
  {
    id: "c6",
    name: "Edu Sector Awareness",
    status: "draft",
    platform: "youtube",
    budget: 40000,
    spent: 0,
    leadsCount: 0,
    conversionRate: 0,
    startDate: "2026-05-01",
  },
];

const SAMPLE_MESSAGES: Message[] = [
  {
    id: "m1",
    from: "Rohit Sharma",
    content:
      "Hi, saw your audit report — really interested in the SEO package. Can we do a quick call?",
    timestamp: d(0),
    channel: "whatsapp",
    read: false,
  },
  {
    id: "m2",
    from: "Priya Nair",
    content:
      "We've been getting a lot of Google leads but conversions are low. Your pitch was spot on.",
    timestamp: d(0),
    channel: "email",
    read: false,
  },
  {
    id: "m3",
    from: "Suresh Menon",
    content:
      "Can you send over the ₹25k proposal PDF? I want to show my business partner.",
    timestamp: d(1),
    channel: "whatsapp",
    read: false,
  },
  {
    id: "m4",
    from: "Kavya Reddy",
    content:
      "Just completed the free audit form on your landing page. My salon badly needs more foot traffic.",
    timestamp: d(1),
    channel: "email",
    read: true,
  },
  {
    id: "m5",
    from: "Aditya Kapoor",
    content:
      "Quick question — does the premium plan include Instagram content creation or just ads?",
    timestamp: d(2),
    channel: "whatsapp",
    read: true,
  },
  {
    id: "m6",
    from: "Meena Iyer",
    content:
      "Following up on our call. Ready to start the pilot. Please share the agreement.",
    timestamp: d(2),
    channel: "email",
    read: true,
  },
  {
    id: "m7",
    from: "Vikram Tiwari",
    content: "Your monthly report template looks great. When can we onboard?",
    timestamp: d(3),
    channel: "whatsapp",
    read: true,
  },
  {
    id: "m8",
    from: "Divya Krishnan",
    content:
      "We tried running our own Facebook ads and got zero results. Need expert help ASAP.",
    timestamp: d(4),
    channel: "email",
    read: true,
  },
];

const SAMPLE_ACTIONS: Action[] = [
  {
    id: "a1",
    type: "follow_up",
    description:
      "Follow up with TechEdge Solutions — proposal review overdue by 2 days",
    timestamp: d(0),
    completed: false,
    priority: "high",
  },
  {
    id: "a2",
    type: "call",
    description:
      "Schedule call with Rohit Sharma (BlueSky Dental) — he's ready to close",
    timestamp: d(0),
    completed: false,
    priority: "high",
  },
  {
    id: "a3",
    type: "send_pitch",
    description:
      "Send WhatsApp pitch to 8 new Mumbai leads from today's scrape",
    timestamp: d(0),
    completed: false,
    priority: "medium",
  },
  {
    id: "a4",
    type: "proposal",
    description: "Create ₹25k proposal for Spice Garden Restaurant",
    timestamp: d(1),
    completed: false,
    priority: "medium",
  },
  {
    id: "a5",
    type: "review",
    description:
      "Review Google Ads campaign for Bengaluru IT leads — CTR dropped 18%",
    timestamp: d(1),
    completed: false,
    priority: "medium",
  },
  {
    id: "a6",
    type: "onboard",
    description:
      "Kickoff onboarding for Nimbus Cloud Consulting — documents ready",
    timestamp: d(1),
    completed: true,
    priority: "high",
  },
  {
    id: "a7",
    type: "follow_up",
    description: "Send month 2 performance report to existing 3 clients",
    timestamp: d(2),
    completed: true,
    priority: "low",
  },
  {
    id: "a8",
    type: "send_pitch",
    description:
      "Launch WhatsApp template campaign: Fitness Q2 — 63 leads queued",
    timestamp: d(2),
    completed: true,
    priority: "medium",
  },
];

// ─── Viral Loop Sample Data ────────────────────────────────────────────────────

const SOCIAL_PROOF_FEED: SocialProofEntry[] = [
  {
    id: "sp1",
    userName: "Aman",
    city: "Mumbai",
    action: "sent 30 pitches to salons",
    type: "pitch",
    timestamp: minutesAgo(3),
  },
  {
    id: "sp2",
    userName: "Neha",
    city: "Mumbai",
    action: "closed a deal",
    metric: "revenue",
    metricValue: "₹25k",
    type: "deal",
    timestamp: minutesAgo(8),
  },
  {
    id: "sp3",
    userName: "Rahul",
    city: "Delhi",
    action: "shared 10 referral links",
    type: "share",
    timestamp: minutesAgo(14),
  },
  {
    id: "sp4",
    userName: "Priya",
    city: "Mumbai",
    action: "generated 15 new leads",
    metric: "leads",
    metricValue: "15",
    type: "lead",
    timestamp: minutesAgo(21),
  },
  {
    id: "sp5",
    userName: "Vikram",
    city: "Pune",
    action: "unlocked Auto Follow-ups via 10 invites",
    type: "referral",
    timestamp: minutesAgo(35),
  },
  {
    id: "sp6",
    userName: "Simran",
    city: "Bengaluru",
    action: "closed a salon client",
    metric: "revenue",
    metricValue: "₹15k",
    type: "deal",
    timestamp: minutesAgo(48),
  },
  {
    id: "sp7",
    userName: "Arun",
    city: "Hyderabad",
    action: "sent 45 pitches today",
    type: "pitch",
    timestamp: minutesAgo(62),
  },
  {
    id: "sp8",
    userName: "Kavita",
    city: "Chennai",
    action: "generated 28 new leads",
    metric: "leads",
    metricValue: "28",
    type: "lead",
    timestamp: minutesAgo(77),
  },
];

const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userName: "Rohan Das",
    city: "Mumbai",
    value: 89,
    avatarInitials: "RD",
  },
  {
    rank: 2,
    userName: "Aisha Khan",
    city: "Mumbai",
    value: 81,
    avatarInitials: "AK",
  },
  {
    rank: 3,
    userName: "Vikram Singh",
    city: "Pune",
    value: 79,
    avatarInitials: "VS",
  },
  {
    rank: 4,
    userName: "Hanny Sinn",
    city: "Mumbai",
    value: 74,
    avatarInitials: "HS",
  },
  {
    rank: 5,
    userName: "Meena Iyer",
    city: "Chennai",
    value: 71,
    avatarInitials: "MI",
  },
  {
    rank: 6,
    userName: "You",
    city: "Mumbai",
    value: 75,
    avatarInitials: "YO",
    isCurrentUser: true,
  },
  {
    rank: 7,
    userName: "Rajan Desai",
    city: "Pune",
    value: 68,
    avatarInitials: "RD",
  },
  {
    rank: 8,
    userName: "Neha Kapoor",
    city: "Delhi",
    value: 65,
    avatarInitials: "NK",
  },
  {
    rank: 9,
    userName: "Suresh Pillai",
    city: "Andheri",
    value: 62,
    avatarInitials: "SP",
  },
  {
    rank: 10,
    userName: "Tanya Malhotra",
    city: "Pune",
    value: 60,
    avatarInitials: "TM",
  },
];

const challengeEnd = new Date();
challengeEnd.setDate(challengeEnd.getDate() + 2);
challengeEnd.setHours(14, 55, 0, 0);

const WEEKLY_CHALLENGE: WeeklyChallenge = {
  id: "wc1",
  title: "Get 100 Leads This Week",
  description: "Generate 100 qualified salon leads before Sunday midnight.",
  targetMetric: "leads",
  targetValue: 100,
  currentValue: 75,
  endsAt: challengeEnd,
  reward: "₹500 credits + Gold Badge + Leaderboard rank",
  leaderboard: LEADERBOARD,
};

const MILESTONES: MilestoneInfo[] = [
  {
    id: "m1",
    tier: 1,
    title: "Get 3 Invites",
    requiredInvites: 3,
    currentInvites: 1,
    unlock: "1-Month Pro Trial",
    unlockDetail:
      "Full access to AI pitch generator, bulk send & advanced analytics for 30 days.",
    badge: "bronze",
    status: "in_progress",
  },
  {
    id: "m2",
    tier: 2,
    title: "Get 10 Invites",
    requiredInvites: 10,
    currentInvites: 1,
    unlock: "Auto Follow-up Sequence Builder",
    unlockDetail:
      "Automated WhatsApp follow-up sequences — set once, run forever.",
    badge: "silver",
    status: "locked",
  },
  {
    id: "m3",
    tier: 3,
    title: "Get 25 Invites",
    requiredInvites: 25,
    currentInvites: 1,
    unlock: "Agency Features (7 Days)",
    unlockDetail:
      "White-label reports, team access, unlimited leads & premium automation for a full week.",
    badge: "gold",
    status: "locked",
  },
];

const SHAREABLE_WINS: ShareableWin[] = [
  {
    id: "sw1",
    userName: "You",
    city: "Mumbai",
    winType: "deal",
    metricLabel: "CLOSED",
    metricValue: "₹15,000",
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
  },
];

const REFERRAL_INFO: ReferralInfo = {
  referralCode: "GROW-AMAN47",
  referralLink: `${typeof window !== "undefined" ? window.location.origin : "https://growthos.app"}/ref/GROW-AMAN47`,
  totalReferrals: 1,
  pendingReferrals: 0,
  completedReferrals: 1,
  bonusLeadsEarned: 100,
  nextMilestone: MILESTONES[0],
};

const SAMPLE_AUDIT_LEADS: AuditLead[] = [
  {
    id: "al1",
    salonName: "Glamour House Salon",
    ownerName: "Kavya Reddy",
    phone: "+91 98765 43210",
    salonType: "unisex",
    budget: "10k_25k",
    city: "Mumbai",
    area: "Andheri West",
    painPoints: ["low walk-ins", "no online bookings"],
    submittedAt: minutesAgo(45),
    whatsappOptIn: true,
    status: "new",
  },
  {
    id: "al2",
    salonName: "Bliss Beauty Lounge",
    ownerName: "Shruti Patil",
    phone: "+91 97654 32109",
    salonType: "ladies",
    budget: "25k_50k",
    city: "Mumbai",
    area: "Bandra",
    painPoints: ["weak Instagram", "no referral system"],
    submittedAt: d(1),
    whatsappOptIn: true,
    status: "contacted",
  },
];

// ─── Trust Hub Sample Data ────────────────────────────────────────────────────

/** Estimated platform metrics — labeled for transparency. */
export interface TrustHubMetrics {
  /** Estimated based on usage patterns */
  totalLeads: number;
  /** Estimated based on usage patterns */
  messagesSent: number;
  /** Estimated based on usage patterns */
  clientsClosed: number;
  /** Estimated based on usage patterns — Indian notation */
  revenueGenerated: string;
  disclaimer: string;
}

export interface MarketTrustStat {
  id: string;
  stat: string;
  value: string;
  unit: string;
  icon: "analytics" | "growth" | "social";
  description: string;
  source: string;
}

export interface Testimonial {
  id: string;
  name: string;
  businessType: string;
  city: string;
  /** Initials used for avatar placeholder */
  avatarInitials: string;
  /** Accent color for avatar */
  avatarColor: string;
  result: string;
  quote: string;
  stars: number;
}

const TRUST_HUB_METRICS: TrustHubMetrics = {
  totalLeads: 142380,
  messagesSent: 398700,
  clientsClosed: 8940,
  revenueGenerated: "₹4.2Cr",
  disclaimer:
    "Figures are estimated based on aggregated usage patterns across GrowthOS users.",
};

const MARKET_TRUST_DATA: MarketTrustStat[] = [
  {
    id: "mts1",
    stat: "50M+",
    value: "50",
    unit: "M+",
    icon: "analytics",
    description: "websites worldwide use Google Analytics",
    source: "Data based on publicly available industry reports",
  },
  {
    id: "mts2",
    stat: "80%+",
    value: "80",
    unit: "%+",
    icon: "growth",
    description: "of websites use analytics tools to drive growth",
    source: "Data based on publicly available industry reports",
  },
  {
    id: "mts3",
    stat: "90%",
    value: "90",
    unit: "%",
    icon: "social",
    description: "of Instagram users follow at least one business",
    source: "Data based on publicly available industry reports",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Kavya Reddy",
    businessType: "Salon Owner",
    city: "Mumbai",
    avatarInitials: "KR",
    avatarColor: "#7C3AED",
    result: "20 leads → 80 leads/month",
    quote:
      "GrowthOS helped my salon go from struggling to fully booked in 6 weeks. The WhatsApp outreach and Google visibility tips were game-changing.",
    stars: 5,
  },
  {
    id: "t2",
    name: "Arjun Mehta",
    businessType: "Gym Owner",
    city: "Pune",
    avatarInitials: "AM",
    avatarColor: "#0E7490",
    result: "Revenue grew from ₹80k to ₹2.1L/month",
    quote:
      "I was sceptical at first, but after running local ads and following the daily action plan, my gym memberships doubled in two months.",
    stars: 5,
  },
  {
    id: "t3",
    name: "Sunita Patel",
    businessType: "Clinic Owner",
    city: "Ahmedabad",
    avatarInitials: "SP",
    avatarColor: "#B45309",
    result: "Enquiries up 3x in 45 days",
    quote:
      "The AI business consultant feature showed me exactly what my competitors were doing. I fixed my Google profile and reviews — the difference is unbelievable.",
    stars: 5,
  },
  {
    id: "t4",
    name: "Rohit Bansal",
    businessType: "Digital Marketing Agency",
    city: "Delhi",
    avatarInitials: "RB",
    avatarColor: "#BE123C",
    result: "Closed ₹4.5L worth of clients in 30 days",
    quote:
      "The pitch generator and CRM pipeline saved me hours every day. I'm now running 8 clients solo instead of 3.",
    stars: 5,
  },
  {
    id: "t5",
    name: "Divya Krishnan",
    businessType: "Real Estate Consultant",
    city: "Bengaluru",
    avatarInitials: "DK",
    avatarColor: "#065F46",
    result: "15 qualified leads in first week",
    quote:
      "The lead scoring was spot on — every lead GrowthOS highlighted was actually interested. No time wasted on cold contacts.",
    stars: 4,
  },
  {
    id: "t6",
    name: "Prashant Nair",
    businessType: "Restaurant Owner",
    city: "Hyderabad",
    avatarInitials: "PN",
    avatarColor: "#1D4ED8",
    result: "Online orders up 60% in 3 months",
    quote:
      "Before GrowthOS I had no idea how bad my online presence was. The audit report was eye-opening and the fixes were simple to follow.",
    stars: 5,
  },
];

// ─── Store Interface ──────────────────────────────────────────────────────────

type ActiveTab = "home" | "leads" | "inbox" | "clients";

interface AccountabilityProgress {
  dailyLeadsContacted: number;
  dailyFollowupsDone: number;
  dailyDealsClosed: number;
}

interface GrowthStoreState {
  leads: Lead[];
  campaigns: Campaign[];
  messages: Message[];
  userActions: Action[];
  activeTab: ActiveTab;

  // Auto Agency
  autoAgencyEnabled: boolean;
  accountabilityProgress: AccountabilityProgress;
  coachSuggestionsRefreshed: string;

  // Viral Loop
  socialProofFeed: SocialProofEntry[];
  weeklyChallenge: WeeklyChallenge;
  milestones: MilestoneInfo[];
  shareableWins: ShareableWin[];
  referralInfo: ReferralInfo;
  auditLeads: AuditLead[];

  // Trust Hub
  trustHubMetrics: TrustHubMetrics;
  marketTrustData: MarketTrustStat[];
  testimonials: Testimonial[];

  // Lead actions
  addLead: (lead: Lead) => void;
  updateLead: (id: string, patch: Partial<Lead>) => void;

  // Campaign actions
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, patch: Partial<Campaign>) => void;

  // Message actions
  markMessageRead: (id: string) => void;
  addMessage: (message: Message) => void;

  // User action actions
  addUserAction: (action: Action) => void;
  markActionComplete: (id: string) => void;

  // Navigation
  setActiveTab: (tab: ActiveTab) => void;

  // Auto Agency actions
  setAutoAgencyEnabled: (enabled: boolean) => void;
  setAccountabilityProgress: (
    progress: Partial<AccountabilityProgress>,
  ) => void;
  refreshCoachSuggestions: () => void;

  // Viral Loop actions
  addSocialProofEntry: (entry: SocialProofEntry) => void;
  updateChallengeProgress: (value: number) => void;
  updateMilestoneProgress: (invites: number) => void;
  addAuditLead: (lead: AuditLead) => void;
  updateAuditLeadStatus: (id: string, status: AuditLead["status"]) => void;
  addShareableWin: (win: ShareableWin) => void;
}

// ─── Zustand Store ────────────────────────────────────────────────────────────

export const useGrowthStore = create<GrowthStoreState>((set) => ({
  leads: SAMPLE_LEADS,
  campaigns: SAMPLE_CAMPAIGNS,
  messages: SAMPLE_MESSAGES,
  userActions: SAMPLE_ACTIONS,
  activeTab: "home",

  // Auto Agency defaults
  autoAgencyEnabled: true,
  accountabilityProgress: {
    dailyLeadsContacted: 7,
    dailyFollowupsDone: 3,
    dailyDealsClosed: 0,
  },
  coachSuggestionsRefreshed: new Date().toISOString().split("T")[0],

  // Viral Loop defaults
  socialProofFeed: SOCIAL_PROOF_FEED,
  weeklyChallenge: WEEKLY_CHALLENGE,
  milestones: MILESTONES,
  shareableWins: SHAREABLE_WINS,
  referralInfo: REFERRAL_INFO,
  auditLeads: SAMPLE_AUDIT_LEADS,

  // Trust Hub defaults
  trustHubMetrics: TRUST_HUB_METRICS,
  marketTrustData: MARKET_TRUST_DATA,
  testimonials: TESTIMONIALS,

  // Lead actions
  addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
  updateLead: (id, patch) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    })),

  // Campaign actions
  addCampaign: (campaign) =>
    set((state) => ({ campaigns: [campaign, ...state.campaigns] })),
  updateCampaign: (id, patch) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, ...patch } : c,
      ),
    })),

  // Message actions
  markMessageRead: (id) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, read: true } : m,
      ),
    })),
  addMessage: (message) =>
    set((state) => ({ messages: [message, ...state.messages] })),

  // User action actions
  addUserAction: (action) =>
    set((state) => ({ userActions: [action, ...state.userActions] })),
  markActionComplete: (id) =>
    set((state) => ({
      userActions: state.userActions.map((a) =>
        a.id === id ? { ...a, completed: true } : a,
      ),
    })),

  // Navigation
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Auto Agency actions
  setAutoAgencyEnabled: (enabled) => set({ autoAgencyEnabled: enabled }),
  setAccountabilityProgress: (progress) =>
    set((state) => ({
      accountabilityProgress: { ...state.accountabilityProgress, ...progress },
    })),
  refreshCoachSuggestions: () =>
    set({ coachSuggestionsRefreshed: new Date().toISOString().split("T")[0] }),

  // Viral Loop actions
  addSocialProofEntry: (entry) =>
    set((state) => ({
      socialProofFeed: [entry, ...state.socialProofFeed].slice(0, 20),
    })),
  updateChallengeProgress: (value) =>
    set((state) => ({
      weeklyChallenge: { ...state.weeklyChallenge, currentValue: value },
    })),
  updateMilestoneProgress: (invites) =>
    set((state) => ({
      milestones: state.milestones.map((m) => {
        const updated = { ...m, currentInvites: invites };
        if (invites >= m.requiredInvites) updated.status = "unlocked";
        else if (invites > 0) updated.status = "in_progress";
        return updated;
      }),
      referralInfo: {
        ...state.referralInfo,
        completedReferrals: invites,
        totalReferrals: invites,
        bonusLeadsEarned: invites * 100,
      },
    })),
  addAuditLead: (lead) =>
    set((state) => ({ auditLeads: [lead, ...state.auditLeads] })),
  updateAuditLeadStatus: (id, status) =>
    set((state) => ({
      auditLeads: state.auditLeads.map((l) =>
        l.id === id ? { ...l, status } : l,
      ),
    })),
  addShareableWin: (win) =>
    set((state) => ({ shareableWins: [win, ...state.shareableWins] })),
}));

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectUnreadMessages = (state: GrowthStoreState) =>
  state.messages.filter((m) => !m.read);

export const selectUnreadMessageCount = (state: GrowthStoreState) =>
  state.messages.filter((m) => !m.read).length;

export const selectHighPriorityActions = (state: GrowthStoreState) =>
  state.userActions.filter((a) => !a.completed && a.priority === "high");

export const selectHotLeads = (state: GrowthStoreState) =>
  state.leads.filter(
    (l) => l.score >= 80 && l.status !== "closed" && l.status !== "lost",
  );

export const selectActiveCampaigns = (state: GrowthStoreState) =>
  state.campaigns.filter((c) => c.status === "active");

export const selectActiveTab = (state: GrowthStoreState) => state.activeTab;

// ─── Auto Agency Selectors ────────────────────────────────────────────────────

export const selectAutoAgencyEnabled = (state: GrowthStoreState) =>
  state.autoAgencyEnabled;

export const selectDailyLeadsContacted = (state: GrowthStoreState) =>
  state.accountabilityProgress.dailyLeadsContacted;

export const selectDailyFollowupsDone = (state: GrowthStoreState) =>
  state.accountabilityProgress.dailyFollowupsDone;

export const selectDailyDealsClosed = (state: GrowthStoreState) =>
  state.accountabilityProgress.dailyDealsClosed;

export const selectCoachSuggestionsRefreshed = (state: GrowthStoreState) =>
  state.coachSuggestionsRefreshed;

// ─── Viral Loop Selectors ─────────────────────────────────────────────────────

export const selectSocialProofFeed = (state: GrowthStoreState) =>
  state.socialProofFeed;

export const selectWeeklyChallenge = (state: GrowthStoreState) =>
  state.weeklyChallenge;

export const selectMilestones = (state: GrowthStoreState) => state.milestones;

export const selectReferralInfo = (state: GrowthStoreState) =>
  state.referralInfo;

export const selectAuditLeads = (state: GrowthStoreState) => state.auditLeads;

export const selectShareableWins = (state: GrowthStoreState) =>
  state.shareableWins;

// ─── Trust Hub Selectors ──────────────────────────────────────────────────────

export const selectTrustHubMetrics = (state: GrowthStoreState) =>
  state.trustHubMetrics;

export const selectMarketTrustData = (state: GrowthStoreState) =>
  state.marketTrustData;

export const selectTestimonials = (state: GrowthStoreState) =>
  state.testimonials;
