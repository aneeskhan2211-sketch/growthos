/**
 * growthEngine.ts
 * Shared TypeScript types for the GrowthOS Growth Engine:
 * Admin analytics dashboard, AI optimizer (nudges + pricing),
 * and product-led growth loops (referrals + viral sharing).
 *
 * Re-exports backend-generated types where overlap exists to avoid
 * double-definitions; adds frontend-only convenience aliases and
 * derived types the backend doesn't model.
 */

// ─── Re-export canonical backend enums used across Growth Engine ─────────────
export {
  ActivitySegment,
  AbTestName,
  GatedFeatureName,
  NudgeType,
  NudgeVariantType,
  OfferType,
  PaywallTimingVariant,
  ReferralFunnelEventType,
  TrafficSource,
} from "../backend.d";

// ─── Re-export canonical backend interfaces used directly ─────────────────────
export type {
  AbTestResult,
  AbVariantStats,
  ChallengeParticipant,
  CohortRetentionRow,
  EventDrillDown,
  FeatureUnlockCheck,
  FinalizedChallengeResult,
  GrowthOverview,
  LiveEventEntry,
  NudgeDelivery,
  NudgePerformanceMetrics,
  NudgePerformanceStat,
  PaywallState,
  PricingRecommendation,
  ReferralFunnelStats,
  ReferralFunnelStep,
  TrafficSourceBreakdown,
  UserActivityScore,
  UserJourneyEvent,
  UserJourneyTimeline,
} from "../backend.d";

// ─── Frontend-only aliases / narrowed types ───────────────────────────────────

/** Union alias matching the backend `ActivitySegment` enum values */
export type ActivitySegmentValue = "LowActivity" | "Medium" | "HighIntent";

/** Nudge variant alias matching `NudgeVariantType` enum values */
export type NudgeVariant = "fomo" | "urgency" | "reward";

// ─── Derived / computed types for UI rendering ───────────────────────────────

export interface GrowthOverviewDerived {
  dauWauMauRatio: number; // dau / mau — stickiness indicator
  retentionSummary: string; // "D1: 72% · D7: 51% · D30: 28%"
  mrrFormatted: string; // "₹2,40,000"
  newSignupsTrend: "up" | "down" | "flat";
}

export interface CohortHeatmapCell {
  cohortWeek: string;
  day: 1 | 7 | 30;
  retentionPct: number;
  alertLevel: "none" | "warning" | "danger";
}

export interface FunnelDropOffAlert {
  fromStep: string;
  toStep: string;
  conversionPct: number;
  alertLevel: "none" | "warning" | "danger";
  message: string;
}

export interface EventTrendPoint {
  label: string; // e.g. "Mon", "Day 1"
  count: number;
}

export interface LiveEventFeed {
  entries: LiveEventEntryView[];
  lastUpdatedAt: number;
}

export interface LiveEventEntryView {
  eventId: string;
  eventType: string;
  userId: string;
  timestamp: number;
  metaLabel: string; // human-readable from metadata
}

// ─── AI Optimizer types ───────────────────────────────────────────────────────

export interface NudgeDecision {
  shouldShow: boolean;
  nudgeType: NudgeVariant | null;
  message: string;
  ctaLabel: string;
  ctaRoute: string;
}

export interface PricingSegmentOffer {
  segment: ActivitySegmentValue;
  offerType: "free_trial_2d" | "limited_discount" | "bonus_credits";
  offerLabel: string; // e.g. "2-Day Free Trial"
  upgradeCtaLabel: string;
  urgencyNote: string | null;
}

export interface PaywallIntelligenceState {
  shouldShowPaywall: boolean;
  timingVariant: "after_value_moment" | "immediate";
  hasSeenValueMoment: boolean;
  recommendedOfferLabel: string;
}

// ─── A/B Test types ───────────────────────────────────────────────────────────

export interface AbTestSummary {
  testName: string;
  isActive: boolean;
  winningVariantId: string | null;
  variants: AbVariantSummary[];
  totalImpressions: number;
  totalConversions: number;
}

export interface AbVariantSummary {
  variantId: string;
  impressions: number;
  conversions: number;
  conversionRatePct: number;
  isWinner: boolean;
}

// ─── Viral Growth / Referral types ───────────────────────────────────────────

export interface ReferralFunnelView {
  steps: ReferralFunnelStepView[];
  totalLinks: number;
  totalRewards: number;
  overallConversionPct: number;
}

export interface ReferralFunnelStepView {
  stepName: string;
  count: number;
  conversionPct: number;
  dropOffAlertLevel: "none" | "warning" | "danger";
}

export interface TrafficBreakdownView {
  periodDays: number;
  organic: { count: number; pct: number };
  referral: { count: number; pct: number };
  ads: { count: number; pct: number };
  direct: { count: number; pct: number };
}

export interface FeatureGateStatus {
  featureName: string;
  isUnlocked: boolean;
  currentInvites: number;
  requiredInvites: number;
  progress: number; // 0–100
  expiresAt: number | null;
}

// ─── Challenge types ──────────────────────────────────────────────────────────

export interface ChallengeLeaderboardEntry {
  rank: number;
  displayName: string;
  city: string;
  leadsCount: number;
  isRewarded: boolean;
  joinedAt: number;
}

// ─── Nudge delivery / performance ────────────────────────────────────────────

export interface NudgeDeliveryView {
  deliveryId: string;
  userId: string;
  nudgeType: NudgeVariant;
  segment: ActivitySegmentValue;
  sentAt: number;
  converted: boolean;
  actionTakenAt: number | null;
}

export interface NudgePerformanceView {
  nudgeType: NudgeVariant;
  segment: ActivitySegmentValue;
  sentCount: number;
  actionCount: number;
  actionRatePct: number;
  conversionLiftPct: number;
}
