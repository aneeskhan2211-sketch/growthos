export interface OnboardingPrefs {
  niche: string;
  city: string;
  targetBudget: number;
  completedOnboarding: boolean;
}

export interface GamificationState {
  dailyStreak: number;
  lastActionDate: string;
  totalActions: number;
  currentMilestone: number;
  creditsEarned: number;
  unlockedFeatures: string[];
}

export interface Milestone {
  index: number;
  label: string;
  threshold: number;
  credits: number;
  unlocks: string;
  badgeColor: "bronze" | "silver" | "gold";
}

export interface ActionChecklist {
  id: string;
  title: string;
  target: number;
  current: number;
  completed: boolean;
}

export interface RevenueFunnelData {
  stage: string;
  count: number;
  value: number;
}
