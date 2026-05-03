import type { ABTest } from "../types/conversionEngine";

export const defaultABTests: ABTest[] = [
  {
    id: "paywall_headline",
    name: "Paywall Headline",
    variants: [
      { id: "control", label: "Generic", splitPct: 50 },
      { id: "outcome", label: "Outcome-focused", splitPct: 50 },
    ],
    conversions: { control: 0, outcome: 0 },
    impressions: { control: 0, outcome: 0 },
  },
  {
    id: "cta_text",
    name: "CTA Text",
    variants: [
      { id: "unlock", label: "Unlock now", splitPct: 50 },
      { id: "close_deal", label: "Close this deal", splitPct: 50 },
    ],
    conversions: { unlock: 0, close_deal: 0 },
    impressions: { unlock: 0, close_deal: 0 },
  },
  {
    id: "paywall_timing",
    name: "Paywall Timing",
    variants: [
      { id: "immediate", label: "On first action", splitPct: 50 },
      { id: "delayed", label: "After 3 actions", splitPct: 50 },
    ],
    conversions: { immediate: 0, delayed: 0 },
    impressions: { immediate: 0, delayed: 0 },
  },
  {
    id: "trial_offer",
    name: "Trial Offer",
    variants: [
      { id: "no_trial", label: "No trial", splitPct: 50 },
      { id: "two_day_trial", label: "2-day free trial", splitPct: 50 },
    ],
    conversions: { no_trial: 0, two_day_trial: 0 },
    impressions: { no_trial: 0, two_day_trial: 0 },
  },
];
