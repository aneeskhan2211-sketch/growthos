// ─── Viral Loop & Niche Domination Types ─────────────────────────────────────

export interface SocialProofEntry {
  id: string;
  userName: string;
  city: string;
  action: string;
  metric?: string;
  metricValue?: string;
  timestamp: Date;
  type: "pitch" | "lead" | "deal" | "share" | "referral";
}

export interface ShareableWin {
  id: string;
  userName: string;
  city: string;
  winType: "leads" | "deal" | "revenue";
  metricLabel: string;
  metricValue: string;
  date: string;
  gradient: string; // CSS gradient class
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  targetMetric: "leads" | "pitches" | "deals";
  targetValue: number;
  currentValue: number;
  endsAt: Date;
  reward: string;
  leaderboard: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  city: string;
  value: number;
  avatarInitials: string;
  isCurrentUser?: boolean;
}

export interface MilestoneInfo {
  id: string;
  tier: 1 | 2 | 3;
  title: string;
  requiredInvites: number;
  currentInvites: number;
  unlock: string;
  unlockDetail: string;
  badge: "bronze" | "silver" | "gold";
  status: "locked" | "in_progress" | "unlocked";
}

export interface AuditLead {
  id: string;
  salonName: string;
  ownerName: string;
  phone: string;
  salonType: "unisex" | "ladies" | "mens" | "bridal" | "spa";
  budget: "under_10k" | "10k_25k" | "25k_50k" | "above_50k";
  city: string;
  area: string;
  painPoints: string[];
  submittedAt: Date;
  whatsappOptIn: boolean;
  status: "new" | "contacted" | "audit_sent" | "converted";
}

export interface ReferralInfo {
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  pendingReferrals: number;
  completedReferrals: number;
  bonusLeadsEarned: number;
  nextMilestone: MilestoneInfo | null;
}

export interface ViralLoopState {
  socialProofFeed: SocialProofEntry[];
  weeklyChallenge: WeeklyChallenge;
  milestones: MilestoneInfo[];
  shareableWins: ShareableWin[];
  referralInfo: ReferralInfo;
  auditLeads: AuditLead[];
}

export interface AuditFormInput {
  salonName: string;
  ownerName: string;
  phone: string;
  salonType: AuditLead["salonType"];
  budget: AuditLead["budget"];
  area: string;
  whatsappOptIn: boolean;
}

export type NicheLandingEvent =
  | "landing_view"
  | "form_submit"
  | "whatsapp_click"
  | "audit_sent"
  | "call_booked";
