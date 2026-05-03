// ─── Dashboard-specific types for GrowthOS ───────────────────────────────────

export interface Lead {
  id: string;
  businessName: string;
  city: string;
  score: number; // 0–100
  issue: string;
  status: "new" | "contacted" | "interested" | "proposal" | "closed" | "lost";
  phone: string;
  email: string;
  industry: string;
  budget: number; // ₹ monthly
  source: "organic" | "referral" | "csv" | "scraper" | "inbound";
}

export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "draft" | "completed";
  platform:
    | "google"
    | "instagram"
    | "facebook"
    | "linkedin"
    | "whatsapp"
    | "youtube";
  budget: number; // ₹ total
  spent: number; // ₹ spent
  leadsCount: number;
  conversionRate: number; // percentage
  startDate: string; // ISO date
}

export interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: Date;
  channel: "whatsapp" | "email";
  read: boolean;
  avatar?: string;
}

export interface Action {
  id: string;
  type: "follow_up" | "call" | "send_pitch" | "proposal" | "review" | "onboard";
  description: string;
  timestamp: Date;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export interface MetricData {
  title: string;
  value: string | number;
  change: number; // percentage
  changeType: "up" | "down" | "neutral";
  icon: string; // icon key from PlatformIcons or Lucide name
  trendData: number[]; // sparkline data points
  prefix?: string; // e.g. "₹"
  suffix?: string; // e.g. "%"
}

export interface PipelineStageData {
  id: string;
  name: string;
  leads: Lead[];
  color: string; // CSS color token, e.g. "bg-primary"
}
