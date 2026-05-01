// ─── Outreach & Scraper Types ───────────────────────────────────────────────

export type OutreachChannel = "whatsapp" | "email";
export type OutreachStatus =
  | "scheduled"
  | "sent"
  | "delivered"
  | "replied"
  | "failed";
export type ScraperJobStatus = "queued" | "running" | "completed" | "failed";
export type CampaignStatus = "active" | "paused" | "completed";
export type TemplateType = "initial" | "followup" | "final";

export interface OutreachMessage {
  id: bigint;
  leadId: bigint;
  businessName: string;
  channel: OutreachChannel;
  templateType: TemplateType;
  dayNumber: number;
  status: OutreachStatus;
  personalizedMessage: string;
  scheduledAt: bigint;
  sentAt?: bigint;
  deliveredAt?: bigint;
  repliedAt?: bigint;
  detectedProblem: string;
}

export interface ScraperJob {
  id: bigint;
  niche: string;
  city: string;
  status: ScraperJobStatus;
  totalFound: number;
  processed: number;
  progress: number;
  createdAt: bigint;
  completedAt?: bigint;
  leadsGenerated: number;
}

export interface OutreachCampaign {
  id: bigint;
  leadId: bigint;
  businessName: string;
  startedAt: bigint;
  completedAt?: bigint;
  totalMessages: number;
  deliveredCount: number;
  repliedCount: number;
  status: CampaignStatus;
  channels: OutreachChannel[];
}

export interface CreateOutreachMessageInput {
  leadId: bigint;
  businessName: string;
  channel: OutreachChannel;
  templateType: TemplateType;
  dayNumber: number;
  personalizedMessage: string;
  scheduledAt: bigint;
  detectedProblem: string;
}

export interface CreateOutreachCampaignInput {
  leadId: bigint;
  businessName: string;
  channels: OutreachChannel[];
}

// ─── Helper Maps ─────────────────────────────────────────────────────────────

export const DETECTED_PROBLEMS: Record<string, string> = {
  no_website: "No website found",
  low_rating: "Low customer rating",
  no_ads: "No active ads detected",
  weak_seo: "Weak SEO presence",
  no_google_profile: "Incomplete Google Business Profile",
  slow_website: "Slow website performance",
  no_reviews: "No customer reviews",
  outdated_site: "Outdated website design",
};

export const OUTREACH_DAY_CONFIG: Record<number, string> = {
  1: "Initial Outreach",
  2: "Follow-up Reminder",
  4: "Final Message",
};

// ─── Score Utilities ─────────────────────────────────────────────────────────

export function scoreColor(score: number): string {
  if (score >= 80) return "score-critical";
  if (score >= 60) return "score-warning";
  return "score-success";
}

export function scoreLabel(score: number): string {
  if (score >= 80) return "High Priority";
  if (score >= 60) return "Medium Priority";
  return "Low Priority";
}
