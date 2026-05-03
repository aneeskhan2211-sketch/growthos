/**
 * growthEngineFormatters.ts
 * Pure utility functions for rendering Growth Engine data in the UI.
 * No React hooks — safe to call anywhere (components, hooks, tests).
 */

import { ActivitySegment } from "../backend.d";

// ─── Segment Formatting ───────────────────────────────────────────────────────

/**
 * Returns a human-readable label for an ActivitySegment value.
 * Maps backend enum values to plain-English copy shown in the UI.
 */
export function formatSegmentLabel(
  segment: ActivitySegment,
): "Low Activity" | "Engaged" | "High Intent" {
  switch (segment) {
    case ActivitySegment.LowActivity:
      return "Low Activity";
    case ActivitySegment.Medium:
      return "Engaged";
    case ActivitySegment.HighIntent:
      return "High Intent";
  }
}

/**
 * Returns a Tailwind CSS class string for a colored badge per segment.
 * Uses semantic design tokens so it works in both light and dark mode.
 */
export function formatSegmentColor(segment: ActivitySegment): string {
  switch (segment) {
    case ActivitySegment.LowActivity:
      return "bg-muted text-muted-foreground border border-border";
    case ActivitySegment.Medium:
      return "bg-primary/10 text-primary border border-primary/20";
    case ActivitySegment.HighIntent:
      return "bg-accent/20 text-accent-foreground border border-accent/30";
  }
}

// ─── Offer Formatting ────────────────────────────────────────────────────────

/**
 * Converts a backend OfferType string into a friendly, ₹-denominated label.
 */
export function formatOfferLabel(offerType: string): string {
  switch (offerType) {
    case "free_trial_2d":
      return "2-Day Free Trial";
    case "limited_discount":
      return "Limited-Time ₹99 Upgrade";
    case "bonus_credits":
      return "+100 Bonus Lead Credits";
    default:
      return offerType.replace(/_/g, " ");
  }
}

// ─── Retention Formatting ─────────────────────────────────────────────────────

/**
 * Formats a retention percentage (0–100) as "XX.X%" string.
 * Clamps to [0, 100] and rounds to one decimal place.
 */
export function formatRetentionPct(value: number): string {
  const clamped = Math.min(100, Math.max(0, value));
  return `${clamped.toFixed(1)}%`;
}

// ─── MRR Formatting ──────────────────────────────────────────────────────────

/**
 * Formats a number in Indian Rupee notation with ₹ prefix.
 * e.g. 240000 → "₹2,40,000"
 * e.g. 1000 → "₹1,000"
 */
export function formatMRR(inr: number): string {
  if (inr < 0) return "₹0";
  // Use Intl with en-IN locale for Indian number grouping
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(inr));
  return `₹${formatted}`;
}

// ─── Drop-Off Alert Level ─────────────────────────────────────────────────────

/**
 * Returns an alert severity level based on a funnel step conversion %.
 * Used to drive visual treatment (badge color, border, icon) in funnel charts.
 *
 * Thresholds:
 *  - ≥ 40%  → "none"    (healthy conversion)
 *  - 20–39% → "warning" (needs attention)
 *  - < 20%  → "danger"  (high drop-off, highlight in red)
 */
export function getDropOffAlertLevel(
  conversionPct: number,
): "none" | "warning" | "danger" {
  if (conversionPct >= 40) return "none";
  if (conversionPct >= 20) return "warning";
  return "danger";
}

// ─── Convenience: format bigint MRR from backend ─────────────────────────────

/**
 * Convenience wrapper: takes a bigint (from backend) and formats as ₹MRR.
 */
export function formatMRRFromBigInt(inr: bigint): string {
  return formatMRR(Number(inr));
}

// ─── Cohort week display ──────────────────────────────────────────────────────

/**
 * Converts an ISO week string (e.g. "2026-W18") to a short display label.
 * e.g. "2026-W18" → "W18 '26"
 */
export function formatCohortWeek(isoWeek: string): string {
  const match = /^(\d{4})-W(\d{2})$/.exec(isoWeek);
  if (!match) return isoWeek;
  const [, year, week] = match;
  return `W${week} '${year.slice(2)}`;
}

// ─── Traffic source label ────────────────────────────────────────────────────

/**
 * Returns a human-readable label for a TrafficSource enum value.
 */
export function formatTrafficSourceLabel(source: string): string {
  switch (source) {
    case "organic":
      return "Organic";
    case "referral":
      return "Referral";
    case "ads":
      return "Paid Ads";
    case "direct":
      return "Direct";
    default:
      return source.charAt(0).toUpperCase() + source.slice(1);
  }
}

// ─── Nudge type label ────────────────────────────────────────────────────────

/**
 * Returns a human-readable label for a NudgeVariantType value.
 */
export function formatNudgeTypeLabel(nudgeType: string): string {
  switch (nudgeType) {
    case "fomo":
      return "FOMO";
    case "urgency":
      return "Urgency";
    case "reward":
      return "Reward";
    case "money_visibility":
      return "Money Visibility";
    default:
      return nudgeType.replace(/_/g, " ");
  }
}
