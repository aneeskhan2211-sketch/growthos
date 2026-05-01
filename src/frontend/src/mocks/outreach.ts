import type {
  OutreachCampaign,
  OutreachMessage,
  ScraperJob,
} from "../types/outreach";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const dayMs = BigInt(24 * 60 * 60) * BigInt(1_000_000_000);

// ─── Mock Outreach Messages ───────────────────────────────────────────────────

export const MOCK_OUTREACH_MESSAGES: OutreachMessage[] = [
  {
    id: BigInt(1),
    leadId: BigInt(1),
    businessName: "BlueSky Dental",
    channel: "whatsapp",
    templateType: "initial",
    dayNumber: 1,
    status: "delivered",
    personalizedMessage:
      "Hi BlueSky Dental! We noticed your business isn't ranking for 'dentist Austin TX' — you could be losing 30+ patients per month. We specialize in local SEO for dental practices. Can we show you a free audit?",
    scheduledAt: now - dayMs * BigInt(3),
    sentAt: now - dayMs * BigInt(3),
    deliveredAt: now - dayMs * BigInt(3),
    detectedProblem: "weak_seo",
  },
  {
    id: BigInt(2),
    leadId: BigInt(1),
    businessName: "BlueSky Dental",
    channel: "email",
    templateType: "followup",
    dayNumber: 2,
    status: "replied",
    personalizedMessage:
      "Following up — BlueSky Dental ranks on page 3 for 'Austin dentist'. Competitors on page 1 are getting 10x more clicks. We can fix that in 60 days. Reply to schedule a free call.",
    scheduledAt: now - dayMs * BigInt(2),
    sentAt: now - dayMs * BigInt(2),
    deliveredAt: now - dayMs * BigInt(2),
    repliedAt: now - dayMs,
    detectedProblem: "weak_seo",
  },
  {
    id: BigInt(3),
    leadId: BigInt(2),
    businessName: "Prime Fitness",
    channel: "whatsapp",
    templateType: "initial",
    dayNumber: 1,
    status: "sent",
    personalizedMessage:
      "Hey Prime Fitness! Your Google listing has a 3.8 rating — customers are choosing competitors with 4.5+. We help gyms improve their online reputation and attract 50+ new members/month. Interested?",
    scheduledAt: now - dayMs * BigInt(2),
    sentAt: now - dayMs * BigInt(2),
    detectedProblem: "low_rating",
  },
  {
    id: BigInt(4),
    leadId: BigInt(2),
    businessName: "Prime Fitness",
    channel: "email",
    templateType: "followup",
    dayNumber: 2,
    status: "scheduled",
    personalizedMessage:
      "Prime Fitness — quick follow-up. We noticed no Google Ads running for your gym. Competitors in Dallas are spending $2k/month and getting 80+ leads. We can set this up with full ROI tracking.",
    scheduledAt: now + dayMs,
    detectedProblem: "no_ads",
  },
  {
    id: BigInt(5),
    leadId: BigInt(3),
    businessName: "Sunrise Salon & Spa",
    channel: "whatsapp",
    templateType: "initial",
    dayNumber: 1,
    status: "delivered",
    personalizedMessage:
      "Hi Sunrise Salon! We searched 'best salon Houston' and couldn't find your business on page 1. You're missing 40+ bookings per month. We specialize in salon SEO — can we show you a free demo?",
    scheduledAt: now - dayMs * BigInt(4),
    sentAt: now - dayMs * BigInt(4),
    deliveredAt: now - dayMs * BigInt(4),
    detectedProblem: "weak_seo",
  },
  {
    id: BigInt(6),
    leadId: BigInt(3),
    businessName: "Sunrise Salon & Spa",
    channel: "email",
    templateType: "followup",
    dayNumber: 2,
    status: "delivered",
    personalizedMessage:
      "Sunrise Salon — your website scored 42/100 on Google PageSpeed. Slow sites lose 53% of visitors. We can optimize it and get you ranking for 'balayage Houston' and 'hair color specialist'. Reply to learn more.",
    scheduledAt: now - dayMs * BigInt(3),
    sentAt: now - dayMs * BigInt(3),
    deliveredAt: now - dayMs * BigInt(3),
    detectedProblem: "slow_website",
  },
  {
    id: BigInt(7),
    leadId: BigInt(3),
    businessName: "Sunrise Salon & Spa",
    channel: "whatsapp",
    templateType: "final",
    dayNumber: 4,
    status: "scheduled",
    personalizedMessage:
      "Last message from us — Sunrise Salon, we're offering a free 30-minute strategy session this week only. We'll show you exactly how to get 60+ new bookings/month from Google. Book your spot now.",
    scheduledAt: now + dayMs * BigInt(2),
    detectedProblem: "slow_website",
  },
  {
    id: BigInt(8),
    leadId: BigInt(4),
    businessName: "Green Valley Gym",
    channel: "whatsapp",
    templateType: "initial",
    dayNumber: 1,
    status: "failed",
    personalizedMessage:
      "Hey Green Valley Gym! We noticed you don't have a website — you're invisible to 70% of Phoenix customers searching for gyms online. We build high-converting gym websites for $0 upfront. Interested?",
    scheduledAt: now - dayMs * BigInt(5),
    detectedProblem: "no_website",
  },
];

// ─── Mock Scraper Jobs ────────────────────────────────────────────────────────

export const MOCK_SCRAPER_JOBS: ScraperJob[] = [
  {
    id: BigInt(1),
    niche: "Dental Clinic",
    city: "Austin, TX",
    status: "completed",
    totalFound: 47,
    processed: 47,
    progress: 100,
    createdAt: now - dayMs * BigInt(2),
    completedAt: now - dayMs * BigInt(2) + BigInt(45 * 60 * 1_000_000_000),
    leadsGenerated: 34,
  },
  {
    id: BigInt(2),
    niche: "Fitness Center",
    city: "Dallas, TX",
    status: "running",
    totalFound: 38,
    processed: 25,
    progress: 65,
    createdAt: now - BigInt(30 * 60 * 1_000_000_000),
    leadsGenerated: 18,
  },
  {
    id: BigInt(3),
    niche: "Hair Salon",
    city: "Houston, TX",
    status: "queued",
    totalFound: 0,
    processed: 0,
    progress: 0,
    createdAt: now,
    leadsGenerated: 0,
  },
];

// ─── Mock Outreach Campaigns ──────────────────────────────────────────────────

export const MOCK_OUTREACH_CAMPAIGNS: OutreachCampaign[] = [
  {
    id: BigInt(1),
    leadId: BigInt(1),
    businessName: "BlueSky Dental",
    startedAt: now - dayMs * BigInt(3),
    totalMessages: 3,
    deliveredCount: 2,
    repliedCount: 1,
    status: "active",
    channels: ["whatsapp", "email"],
  },
  {
    id: BigInt(2),
    leadId: BigInt(3),
    businessName: "Sunrise Salon & Spa",
    startedAt: now - dayMs * BigInt(4),
    totalMessages: 3,
    deliveredCount: 2,
    repliedCount: 0,
    status: "active",
    channels: ["whatsapp", "email"],
  },
];
