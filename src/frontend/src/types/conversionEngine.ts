export interface UsageQuota {
  dailyLeadsUsed: number;
  dailyMessagesUsed: number;
  dailyLeadsLimit: number;
  dailyMessagesLimit: number;
}

export interface InactivityState {
  lastActiveAt: number;
  lastContactedLeadAt: number;
  inactiveDays: number;
}

export interface CountdownOffer {
  countdownActiveUntil: number | null;
  countdownSecondsLeft: number;
  isActive: boolean;
}

export interface ExitIntentState {
  exitIntentShown: boolean;
  exitIntentDismissedAt: number | null;
}

export interface SuccessMomentState {
  successMomentShown: boolean;
  successMomentType: "first_reply" | "first_enquiry" | null;
}

export type RetargetBanner = { day: 1 | 2 | 3; message: string } | null;

export interface ABVariant {
  testId: string;
  variantId: string;
  assignedAt: number;
}

export type ConversionEngineState = UsageQuota &
  InactivityState &
  CountdownOffer &
  ExitIntentState &
  SuccessMomentState;

export interface ClientProgressStep {
  id: string;
  label: string;
  completed: boolean;
  icon: string;
}

export interface ABTest {
  id: string;
  name: string;
  variants: { id: string; label: string; splitPct: number }[];
  conversions: Record<string, number>;
  impressions: Record<string, number>;
}
