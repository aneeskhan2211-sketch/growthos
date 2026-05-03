// ─── AI Reply Suggestions Hook ────────────────────────────────────────────────
// Determines context-aware reply suggestions based on lead score + pipeline status

export type SuggestionContext = "cold" | "warm" | "negotiation" | "client";

export interface ReplySuggestion {
  id: string;
  text: string;
  context: SuggestionContext;
}

// ─── Suggestion Templates ─────────────────────────────────────────────────────

const SUGGESTIONS: Record<SuggestionContext, [string, string, string]> = {
  cold: [
    "Hi [Name], I noticed your business could benefit from better online visibility. Mind if I share a quick audit?",
    "We've helped 3 businesses in [City] grow 40% — can I show you how?",
    "Quick question: Are you currently running any digital ads or SEO?",
  ],
  warm: [
    "Following up — did you get a chance to review the audit I shared?",
    "We have a slot open this week for onboarding. Would [City] work for a quick call?",
    "Happy to customize the proposal further — what's your main priority: more leads or better conversions?",
  ],
  negotiation: [
    "I can offer a 10% discount if we sign by end of this week",
    "The ₹25k package includes everything you mentioned — let's lock it in?",
    "Most clients see ROI within 45 days — I'm confident we can deliver that for you too",
  ],
  client: [
    "How's the campaign performing for you? We've seen strong results in your area this month",
    "We're launching a new SEO package — as a current client you'd get early access",
    "Your monthly report is ready — want me to walk you through the highlights?",
  ],
};

// ─── Context Resolver ─────────────────────────────────────────────────────────

export function resolveContext(
  score: number,
  status: "new" | "contacted" | "interested" | "proposal" | "closed" | "lost",
): SuggestionContext {
  if (status === "closed") return "client";
  if (status === "proposal") return "negotiation";
  if (score >= 40 && (status === "contacted" || status === "interested"))
    return "warm";
  return "cold";
}

// ─── Hook ────────────────────────────────────────────────────────────────────

interface UseInboxRepliesOptions {
  score: number;
  status: "new" | "contacted" | "interested" | "proposal" | "closed" | "lost";
  businessName: string;
  city: string;
}

export function useInboxReplies({
  score,
  status,
  businessName,
  city,
}: UseInboxRepliesOptions): {
  suggestions: ReplySuggestion[];
  context: SuggestionContext;
  logSuggestionUsed: (suggestion: ReplySuggestion) => void;
} {
  const context = resolveContext(score, status);
  const templates = SUGGESTIONS[context];

  const suggestions: ReplySuggestion[] = templates.map((text, i) => ({
    id: `${context}-${i}`,
    text: text
      .replace(/\[Name\]/g, businessName.split(" ")[0])
      .replace(/\[City\]/g, city),
    context,
  }));

  const logSuggestionUsed = (suggestion: ReplySuggestion) => {
    // Analytics event: ai_reply_suggestion_used
    // In a real app this would call the backend trackEvent method
    console.info("[GrowthOS Analytics] ai_reply_suggestion_used", {
      context: suggestion.context,
      suggestionId: suggestion.id,
      timestamp: new Date().toISOString(),
    });
  };

  return { suggestions, context, logSuggestionUsed };
}
