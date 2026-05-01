// ─── Compliance & Consent Types ──────────────────────────────────────────────

export type ConsentType =
  | "form_submission"
  | "reply_first"
  | "qr_optin"
  | "manual_override";

export type ConsentStatus = "granted" | "withdrawn" | "pending";

export interface ConsentLog {
  id: bigint;
  timestamp: bigint;
  phone: string;
  email: string;
  consentType: ConsentType;
  status: ConsentStatus;
  messageTemplate: string;
  userId: string;
  notes: string;
}

export type ImportRowStatus = "valid" | "invalid" | "duplicate";

export interface ImportRowResult {
  rowIndex: number;
  status: ImportRowStatus;
  reason: string;
  phone: string;
  email: string;
  name: string;
  website: string;
  city: string;
  category: string;
}

export interface ImportRecord {
  id: bigint;
  filename: string;
  timestamp: bigint;
  userId: string;
  totalRows: number;
  validCount: number;
  invalidCount: number;
  duplicateCount: number;
  importedCount: number;
}

export type SenderType = "whatsapp" | "email_domain";
export type WarmupPhase = "phase1" | "phase2" | "phase3" | "unlimited";

export const WarmupPhaseLabels: Record<WarmupPhase, string> = {
  phase1: "1–20/day",
  phase2: "21–50/day",
  phase3: "51–100/day",
  unlimited: "100+/day (unrestricted)",
};

export interface SenderIdentity {
  id: bigint;
  identifier: string;
  senderType: SenderType;
  reputationScore: number;
  warmupPhase: WarmupPhase;
  totalSent: number;
  totalDelivered: number;
  totalReplied: number;
  totalBounced: number;
  totalOptOut: number;
  blockedCount: number;
  createdAt: bigint;
}

export interface DeliveryStats {
  id: bigint;
  identityId: bigint;
  date: string;
  deliveredCount: number;
  repliedCount: number;
  bouncedCount: number;
  optOutCount: number;
  blockedCount: number;
}

export interface LeadScoreBreakdown {
  website: number;
  seo: number;
  reviews: number;
  social: number;
  domainAge: number;
}

export type PriorityTag = "high" | "medium" | "low";

export const PriorityTagColors: Record<PriorityTag, string> = {
  high: "text-emerald-400 bg-emerald-400/10",
  medium: "text-amber-400 bg-amber-400/10",
  low: "text-slate-400 bg-slate-400/10",
};

export interface AcquisitionStage {
  label: string;
  count: number;
  value: number;
  color: string;
}

export interface PilotClient {
  leadId: string;
  businessName: string;
  niche: string;
  city: string;
  mrrAmount: number;
  testimonial: string;
  caseStudy: string;
  startDate: string;
  status: "active" | "churned" | "trial";
}
