// Auto Agency types — mirrors Motoko backend contracts exactly

export type AutoAgencyActionType =
  | "leadFound"
  | "outreachSent"
  | "followupSent"
  | "dealSuggested"
  | "reportGenerated";

export interface AutoAgencyAction {
  actionId: string;
  actionType: AutoAgencyActionType;
  timestamp: bigint;
  description: string;
  leadName: string;
  outcome: string;
}

export interface AutoAgencyState {
  toggleEnabled: boolean;
  lastRunTime: bigint;
  nextRunTime: bigint;
  dailyLeadsGenerated: bigint;
  dailyOutreachSent: bigint;
  dailyFollowupsSent: bigint;
  runCount: bigint;
  lastActivityFeed: AutoAgencyAction[];
}

export interface AccountabilityState {
  dailyLeadsContacted: bigint;
  dailyFollowupsDone: bigint;
  dailyDealsClosed: bigint;
  targetLeads: bigint;
  targetFollowups: bigint;
  targetDeals: bigint;
  currentStreak: bigint;
  lastTaskDate: bigint;
  streakMilestones: bigint[];
  todayComplete: boolean;
}

export interface DealSuggestion {
  suggestionId: string;
  leadId: bigint;
  closeProbability: bigint;
  suggestedPrice: bigint;
  suggestedPitch: string;
  bestContactTime: string;
  pricingTier: string;
  createdAt: bigint;
}

export type GrowthPlanItemStatus = "pending" | "approved" | "done";
export type GrowthPlanItemEffort = "quick" | "medium" | "deep";

export interface GrowthPlanItem {
  title: string;
  description: string;
  effort: GrowthPlanItemEffort;
  priorityScore: bigint;
  estimatedRevenue: bigint;
  status: GrowthPlanItemStatus;
}

export type ClientGrowthPlanApprovalStatus =
  | "pending"
  | "approved"
  | "executing";

export interface ClientGrowthPlan {
  planId: string;
  clientId: bigint;
  weekOf: bigint;
  seoPlan: GrowthPlanItem[];
  adsPlan: GrowthPlanItem[];
  contentIdeas: GrowthPlanItem[];
  approvalStatus: ClientGrowthPlanApprovalStatus;
  generatedAt: bigint;
}

export interface PerformanceScore {
  userId: string;
  activityScore: bigint;
  conversionRate: bigint;
  revenueScore: bigint;
  overallScore: bigint;
  percentileRank: bigint;
  estimatedMonthlyRevenue: bigint;
  rank: string;
  updatedAt: bigint;
}

export interface RevenuePrediction {
  weeklyEstimate: bigint;
  monthlyEstimate: bigint;
  pipelineValue: bigint;
  missedOppCount: bigint;
  hotLeadsCount: bigint;
  closingThisWeek: bigint;
  predictionBasis: string;
  generatedAt: bigint;
}

export type MarketplaceListingType =
  | "buyLeads"
  | "sellService"
  | "hireFreelancer";

export interface MarketplaceListing {
  listingId: string;
  listingType: MarketplaceListingType;
  title: string;
  description: string;
  price: bigint;
  sellerId: string;
  sellerName: string;
  reviewCount: bigint;
  avgRating: bigint;
  tags: string[];
  isActive: boolean;
  createdAt: bigint;
}

export type AutoReportStatus = "draft" | "ready" | "sent";

export interface AutoReport {
  reportId: string;
  clientId: bigint;
  reportPeriod: string;
  leadsGenerated: bigint;
  conversions: bigint;
  revenueImpact: bigint;
  roi: bigint;
  topChannel: string;
  nextSteps: string[];
  status: AutoReportStatus;
  generatedAt: bigint;
  sentAt: bigint | null;
}

// ─── AI Business Coach ────────────────────────────────────────────────────────

export type CoachSuggestionType =
  | "revenueTactic"
  | "nicheTargeting"
  | "growthHack";

export interface CoachSuggestion {
  id: string;
  type: CoachSuggestionType;
  title: string;
  description: string;
  expectedROI: string;
  effort: GrowthPlanItemEffort;
  actionLabel: string;
  niche?: string;
}
