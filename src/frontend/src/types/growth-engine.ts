// ─── WhatsApp Template Types ──────────────────────────────────────────────────

export type WhatsAppTemplateCategory =
  | "lead_outreach"
  | "follow_up"
  | "proposal_sharing";

export type WhatsAppTemplateStatus =
  | "draft"
  | "pending"
  | "approved"
  | "rejected"
  | "paused";

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: WhatsAppTemplateCategory;
  body: string;
  variables: string[];
  status: WhatsAppTemplateStatus;
  rejectionReason?: string;
  usageCount: number;
  replyRate: number;
  createdAt: number;
  submittedAt?: number;
  approvedAt?: number;
}

export interface CreateWhatsAppTemplateInput {
  name: string;
  category: WhatsAppTemplateCategory;
  body: string;
  variables: string[];
}

// ─── Landing Page Types ────────────────────────────────────────────────────────

export type LandingPageNiche =
  | "salons"
  | "restaurants"
  | "gyms"
  | "clinics"
  | "real_estate"
  | "education"
  | "retail";

export type LandingPageStatus = "draft" | "published" | "archived";

export interface LandingPageSection {
  id: string;
  type: "hero" | "pain_points" | "results" | "testimonials" | "cta_form";
  headline: string;
  content: string;
}

export interface LandingPage {
  id: string;
  niche: LandingPageNiche;
  city: string;
  slug: string;
  headline: string;
  subheadline: string;
  sections: LandingPageSection[];
  status: LandingPageStatus;
  leads: number;
  views: number;
  createdAt: number;
  publishedAt?: number;
}

// ─── Conversion Script Types ───────────────────────────────────────────────────

export type ScriptType =
  | "discovery_call"
  | "objection_handling"
  | "closing"
  | "follow_up";

export interface ScriptStep {
  step: number;
  label: string;
  script: string;
  tip?: string;
}

export interface ConversionScript {
  id: string;
  type: ScriptType;
  title: string;
  niche?: string;
  steps: ScriptStep[];
  createdAt: number;
}

// ─── SEO Audit Types ───────────────────────────────────────────────────────────

export type SeoAuditSeverity = "critical" | "warning" | "info" | "passed";

export interface SeoAuditItem {
  id: string;
  category: "on_page" | "technical" | "content" | "local";
  title: string;
  description: string;
  severity: SeoAuditSeverity;
  recommendation: string;
}

export interface SeoAuditRecord {
  id: string;
  url: string;
  businessName: string;
  score: number;
  items: SeoAuditItem[];
  keywords: string[];
  createdAt: number;
  label: "Based on publicly available data and heuristics";
}

// ─── Growth Report Types ───────────────────────────────────────────────────────

export interface WeeklyAction {
  id: string;
  week: number;
  title: string;
  description: string;
  category: "offer" | "content" | "ads" | "retention" | "seo";
  completed: boolean;
}

export interface GrowthReport {
  id: string;
  clientId: string;
  clientName: string;
  period: string;
  leadsGenerated: number;
  conversionRate: number;
  revenueImpact: number;
  weeklyActions: WeeklyAction[];
  revenueStrategy: string[];
  marketingSuggestions: string[];
  nextActions: string[];
  createdAt: number;
}
