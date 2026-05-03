// ─── Notification Copy Library ────────────────────────────────────────────────
// Psychology-based copy for retention nudges.
// Max 2 in-app nudges/day. Quiet hours: no nudges after 9 PM.
// All monetary values in Indian Rupees (₹).

export type CopyType = "fomo" | "urgency" | "reward" | "money";

// ─── Copy Library ─────────────────────────────────────────────────────────────

export const COPY_LIBRARY: Record<CopyType, string[]> = {
  fomo: [
    "12 high-quality leads are waiting. Don't miss today.",
    "Leads active in your area right now.",
    "3 prospects checked messages today.",
    "{pendingLeads} leads waiting in your area.",
    "Gym owners in {city} are getting enquiries today.",
    "{niche} businesses in {city} are active right now.",
  ],
  urgency: [
    "Reply now—fast responses convert better.",
    "Send 5 messages in 5 minutes.",
    "Follow up today to increase chances.",
    "Reply quickly—first responses get more bookings.",
    "Act now. Early responses convert 3x better.",
    "Your {niche} leads need a reply today.",
  ],
  reward: [
    "Nice—keep going. You are close to your first booking.",
    "Good progress. Consistency builds enquiries.",
    "You are on a {streak}-day streak.",
    "Great work. Keep the momentum going.",
    "You have contacted {actionsToday} leads today. Keep it up.",
    "Strong start. Your first booking is within reach.",
  ],
  money: [
    "These leads could convert if contacted today.",
    "Follow-ups often turn into bookings.",
    "Even 1 booking can cover your monthly plan.",
    "Your pending leads could be worth ₹{possibleRevenue}.",
    "Active follow-up turns leads into ₹ revenue.",
    "{pendingLeads} leads are worth following up today.",
  ],
};

// ─── Trigger Messages ─────────────────────────────────────────────────────────

export type TriggerType =
  | "on_new_reply"
  | "on_inactivity_24h"
  | "on_inactivity_48h"
  | "on_followup_due"
  | "on_limit_reached"
  | "on_streak_milestone";

export const TRIGGER_MESSAGES: Record<TriggerType, string> = {
  on_new_reply: "New reply received. Respond now.",
  on_inactivity_24h: "Leads are waiting. Take 5 minutes to act.",
  on_inactivity_48h: "12 high-quality leads waiting. Don't miss today.",
  on_followup_due: "Follow-up pending. A quick message can help.",
  on_limit_reached: "Upgrade to remove limits and continue outreach.",
  on_streak_milestone: "You are on a streak. Keep going.",
};

// ─── 28-Day Drip Schedule ─────────────────────────────────────────────────────

export interface DripMessage {
  day: number;
  week: 1 | 2 | 3 | 4;
  phase: "activation" | "habit" | "conversion" | "scale";
  message: string;
}

export const DRIP_SCHEDULE: DripMessage[] = [
  // Week 1 — Activation
  {
    day: 1,
    week: 1,
    phase: "activation",
    message: "Your first leads are ready. Contact 5 to start.",
  },
  {
    day: 2,
    week: 1,
    phase: "activation",
    message: "Quick follow-up tip: message yesterday's leads.",
  },
  {
    day: 3,
    week: 1,
    phase: "activation",
    message: "Replies come faster when you respond early.",
  },
  {
    day: 4,
    week: 1,
    phase: "activation",
    message: "Send 5 messages now. It takes less than 5 minutes.",
  },
  {
    day: 5,
    week: 1,
    phase: "activation",
    message: "You're getting started. Keep the streak going.",
  },
  {
    day: 6,
    week: 1,
    phase: "activation",
    message: "Follow up with 3 leads today.",
  },
  {
    day: 7,
    week: 1,
    phase: "activation",
    message: "Week 1 done. Keep building momentum.",
  },

  // Week 2 — Habit Building
  {
    day: 8,
    week: 2,
    phase: "habit",
    message: "Contact 5 leads today. Make it a habit.",
  },
  {
    day: 9,
    week: 2,
    phase: "habit",
    message: "Check replies and respond quickly.",
  },
  {
    day: 10,
    week: 2,
    phase: "habit",
    message: "Try one simple offer with a lead this week.",
  },
  {
    day: 11,
    week: 2,
    phase: "habit",
    message: "Keep your daily outreach routine consistent.",
  },
  {
    day: 12,
    week: 2,
    phase: "habit",
    message: "5 minutes of follow-up now can mean a booking.",
  },
  {
    day: 13,
    week: 2,
    phase: "habit",
    message: "Reply to every open conversation today.",
  },
  {
    day: 14,
    week: 2,
    phase: "habit",
    message: "Two weeks in. Consistency is your edge.",
  },

  // Week 3 — Conversion Focus
  {
    day: 15,
    week: 3,
    phase: "conversion",
    message: "Turn replies into bookings—follow up today.",
  },
  {
    day: 16,
    week: 3,
    phase: "conversion",
    message: "Share a simple plan with your most interested lead.",
  },
  {
    day: 17,
    week: 3,
    phase: "conversion",
    message: "Close conversations by suggesting next steps.",
  },
  {
    day: 18,
    week: 3,
    phase: "conversion",
    message: "Check your pending replies now.",
  },
  {
    day: 19,
    week: 3,
    phase: "conversion",
    message: "One proposal sent today keeps the pipeline healthy.",
  },
  {
    day: 20,
    week: 3,
    phase: "conversion",
    message: "Follow up on proposals from last week.",
  },
  {
    day: 21,
    week: 3,
    phase: "conversion",
    message: "3 weeks strong. Your first booking is close.",
  },

  // Week 4 — Scale + Upgrade
  {
    day: 22,
    week: 4,
    phase: "scale",
    message: "Automate follow-ups to save time every day.",
  },
  {
    day: 23,
    week: 4,
    phase: "scale",
    message: "Increase daily outreach to scale enquiries.",
  },
  {
    day: 24,
    week: 4,
    phase: "scale",
    message: "Review your results and improve your offer.",
  },
  {
    day: 25,
    week: 4,
    phase: "scale",
    message: "Continue the routine for steady growth.",
  },
  {
    day: 26,
    week: 4,
    phase: "scale",
    message: "Scale what's working. Drop what's not.",
  },
  {
    day: 27,
    week: 4,
    phase: "scale",
    message: "Upgrade to remove limits and grow faster.",
  },
  {
    day: 28,
    week: 4,
    phase: "scale",
    message: "Month 1 complete. Keep the daily habit going.",
  },
];

// ─── Personalization ──────────────────────────────────────────────────────────

export type PersonalizationTokens = {
  niche?: string;
  city?: string;
  streak?: string;
  pendingLeads?: string;
  possibleRevenue?: string;
  actionsToday?: string;
};

/**
 * Replaces {token} placeholders in a message template.
 * Unknown tokens are left as-is.
 */
export function personalizeMessage(
  template: string,
  tokens: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => tokens[key] ?? `{${key}}`);
}

// ─── Copy Selector ────────────────────────────────────────────────────────────

/**
 * Selects copy category based on user activity state.
 * - Inactive (daysSinceActivity >= 2) → urgency
 * - Active today (actionsToday >= 5) → reward
 * - Moderate activity → fomo
 */
export function selectCopyByActivity(
  actionsToday: number,
  daysSinceActivity: number,
): CopyType {
  if (daysSinceActivity >= 2) return "urgency";
  if (actionsToday >= 5) return "reward";
  return "fomo";
}
