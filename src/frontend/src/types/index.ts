// Re-export backend types
export type {
  Lead,
  Note,
  Proposal,
  Client,
  ClientMetrics,
  WebsiteTemplate,
  TemplateSections,
  GrowthSuggestion,
  UserSubscription,
  CreateLeadInput,
  CreateNoteInput,
  CreateProposalInput,
  CreateClientInput,
  UpdateLeadInput,
  UpdateClientMetricsInput,
} from "../backend";

export {
  LeadStatus,
  NoteType,
  SubscriptionPlan,
  SubscriptionStatus,
  UserRole,
} from "../backend";

// Re-export outreach types
export type {
  OutreachMessage,
  ScraperJob,
  OutreachCampaign,
  CreateOutreachMessageInput,
  CreateOutreachCampaignInput,
  OutreachChannel,
  OutreachStatus,
  ScraperJobStatus,
  CampaignStatus,
  TemplateType,
} from "./outreach";

export {
  DETECTED_PROBLEMS,
  OUTREACH_DAY_CONFIG,
  scoreColor,
  scoreLabel,
} from "./outreach";

// ─── UI / App Types ───────────────────────────────────────────────────────────

export interface NotificationItem {
  id: string;
  type: "lead" | "reply" | "deal" | "campaign" | "system" | "alert";
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  actionPath?: string;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  path: string;
  icon?: string;
  keywords?: string[];
}

export interface SidebarNavItem {
  label: string;
  path: string;
  ocid: string;
  badge?: string;
  badgeVariant?: "ai" | "new" | "pro";
}

export interface SparklinePoint {
  value: number;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change: number; // percentage, positive = up
  changeLabel?: string;
  trend: "up" | "down" | "neutral";
  sparkline?: SparklinePoint[];
  statusLabel?: string;
  icon?: React.ReactNode;
  gradient?: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  count: number;
  value: string;
  color: string;
}

export interface CampaignMetric {
  platform: string;
  spend: string;
  reach: string;
  leads: number;
  roi: string;
  status: "active" | "paused" | "completed";
}
