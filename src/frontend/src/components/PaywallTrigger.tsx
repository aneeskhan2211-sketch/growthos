import { useAnalytics } from "@/hooks/useAnalytics";
import { type LockedFeature, usePaywall } from "@/hooks/usePaywall";
import { useSubscription } from "@/hooks/useSubscription";
import PaywallPage from "@/pages/PaywallPage";
import { toast } from "sonner";

type RequiredPlan = "starter" | "growth" | "pro" | "agency";

const PLAN_TIER: Record<string, number> = {
  free: 0,
  starter: 1,
  growth: 2,
  pro: 3,
  agency: 4,
};

const REQUIRED_PLAN_TIER: Record<RequiredPlan, number> = {
  starter: 1,
  growth: 2,
  pro: 3,
  agency: 4,
};

const FEATURE_LABELS: Record<NonNullable<LockedFeature>, string> = {
  "export-leads": "Export Leads",
  "bulk-messages": "Bulk Messages",
  "ai-proposal": "AI Proposal",
  "high-score-leads": "High-Score Leads",
  "auto-follow-up": "Auto Follow-Up",
  "client-report": "Client Report",
  message_send: "Send Message",
  lead_reply: "Reply to Lead",
  fab_click: "Get Clients Now",
  high_score_lead: "High-Score Lead",
};

function planNameFromEnum(plan: string): string {
  const key = String(plan).toLowerCase();
  return PLAN_TIER[key] !== undefined ? key : "free";
}

interface PaywallTriggerProps {
  children: React.ReactNode;
  feature: LockedFeature;
  requiredPlan: RequiredPlan;
  /** Render the trigger wrapper as a div instead of a button.
   *  Use when children contain interactive elements (buttons, switches, etc.)
   *  to avoid invalid button-in-button HTML. */
  asDiv?: boolean;
}

export function PaywallTrigger({
  children,
  feature,
  requiredPlan,
  asDiv = false,
}: PaywallTriggerProps) {
  const { data: subscription } = useSubscription();
  const { openPaywall, isOpen, closePaywall } = usePaywall();
  const { trackEvent } = useAnalytics();

  const currentPlanName = subscription
    ? planNameFromEnum(subscription.plan)
    : "free";
  const currentTier = PLAN_TIER[currentPlanName] ?? 0;
  const requiredTier = REQUIRED_PLAN_TIER[requiredPlan];
  const hasAccess = currentTier >= requiredTier;

  if (hasAccess) {
    return <>{children}</>;
  }

  function handleLockedClick() {
    const label = feature ? FEATURE_LABELS[feature] : "this lead";
    toast.error(`🔒 ${label}`, {
      description: `To close this lead, upgrade to ${requiredPlan} — get more clients faster.`,
      duration: 3000,
    });
    trackEvent("feature_locked_clicked", {
      feature: feature ?? "unknown",
      requiredPlan,
    });
    openPaywall(feature);
  }

  return (
    <>
      {asDiv ? (
        // Use a span (inline) or a focusable region for div-style wrapper
        // to avoid button-in-button when children contain interactive elements.
        // We still need it to be clickable, so we use a presentation wrapper
        // with an absolutely-positioned transparent button on top for a11y.
        <div className="relative w-full" data-ocid="paywall.trigger">
          <button
            type="button"
            className="absolute inset-0 z-10 w-full h-full cursor-pointer bg-transparent border-0"
            onClick={handleLockedClick}
            aria-label={`Close more deals with less effort — upgrade to ${requiredPlan}`}
          />
          <div className="pointer-events-none opacity-50">{children}</div>
        </div>
      ) : (
        <button
          type="button"
          className="relative cursor-pointer w-full text-left bg-transparent border-0 p-0"
          data-ocid="paywall.trigger"
          onClick={handleLockedClick}
          aria-label={`Close more deals with less effort — upgrade to ${requiredPlan}`}
        >
          {/* Lock overlay hint */}
          <div className="absolute inset-0 z-10 rounded-[inherit]" />
          <div className="pointer-events-none opacity-50">{children}</div>
        </button>
      )}

      {isOpen && (
        <PaywallPage
          isModal
          onClose={closePaywall}
          highlightFeature={feature}
        />
      )}
    </>
  );
}
