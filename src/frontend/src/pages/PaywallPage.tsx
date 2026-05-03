import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { type LockedFeature, usePaywall } from "@/hooks/usePaywall";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  Crown,
  Lock,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PaywallPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  leads: string;
  features: string[];
  cta: string;
  isFree?: boolean;
  isMostPopular?: boolean;
  isAgency?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAYWALL_PLANS: PaywallPlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started for free",
    leads: "10 leads/day",
    features: [
      "10 leads/day",
      "Manual outreach",
      "Basic dashboard",
      "Lead scoring",
      "Dark/light mode",
    ],
    cta: "Start free",
    isFree: true,
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Perfect for solo freelancers",
    leads: "50 leads/day",
    features: [
      "50 leads/day",
      "Message templates",
      "Basic follow-ups",
      "Lead scoring",
      "Email outreach",
    ],
    cta: "Get started",
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 299,
    yearlyPrice: 239,
    description: "For growing agencies",
    leads: "150 leads/day",
    features: [
      "150 leads/day",
      "Auto follow-ups",
      "CRM pipeline",
      "Simple reports",
      "AI pitch generator",
      "Priority support",
    ],
    cta: "Upgrade to Growth",
    isMostPopular: true,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 999,
    yearlyPrice: 799,
    description: "Serious agency growth",
    leads: "500 leads/day",
    features: [
      "500 leads/day",
      "Proposal generator",
      "Campaign tools",
      "Advanced tracking",
      "White-label reports",
      "Dedicated support",
    ],
    cta: "Go Pro",
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    description: "Unlimited power for teams",
    leads: "High-volume usage",
    features: [
      "High-volume usage",
      "White-label reports",
      "Team access",
      "Premium automation",
      "API access",
      "Account manager",
    ],
    cta: "Start Agency plan",
    isAgency: true,
  },
];

const FEATURE_LABEL_MAP: Record<NonNullable<LockedFeature>, string> = {
  "export-leads": "Export Leads",
  "bulk-messages": "Bulk Messages",
  "ai-proposal": "AI Proposal Generator",
  "high-score-leads": "High-Score Leads",
  "auto-follow-up": "Auto Follow-Up",
  "client-report": "Client Reports",
  message_send: "Send Message",
  lead_reply: "Reply to Lead",
  fab_click: "Get Clients Now",
  high_score_lead: "High-Score Lead",
};

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  index,
  isYearly,
  isCurrent,
  onSelect,
}: {
  plan: PaywallPlan;
  index: number;
  isYearly: boolean;
  isCurrent: boolean;
  onSelect: (plan: PaywallPlan) => void;
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const yearlySavings =
    isYearly && plan.monthlyPrice > 0
      ? Math.round(
          ((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100,
        )
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: plan.isMostPopular ? 1.02 : 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={`paywall-card flex flex-col min-w-[220px] max-w-[260px] snap-start relative ${
        plan.isMostPopular ? "most-popular" : ""
      }`}
      data-ocid={`paywall.plan.${index + 1}`}
    >
      {/* Most Popular badge */}
      {plan.isMostPopular && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.2 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="paywall-most-popular-badge flex items-center gap-1">
            <Star className="w-3 h-3" />
            Most businesses start here
          </span>
        </motion.div>
      )}

      {/* Current badge */}
      {isCurrent && (
        <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full status-active">
          Current
        </span>
      )}

      <div className="mt-2 mb-4">
        {/* Icon */}
        <div className="w-9 h-9 rounded-xl mb-3 flex items-center justify-center bg-primary/10">
          {plan.isFree ? (
            <Zap className="w-4 h-4 text-muted-foreground" />
          ) : plan.isMostPopular ? (
            <Sparkles className="w-4 h-4 text-primary" />
          ) : plan.isAgency ? (
            <Crown className="w-4 h-4 text-warning" />
          ) : (
            <Star className="w-4 h-4 text-primary" />
          )}
        </div>

        <h3 className="font-display font-bold text-base text-foreground mb-0.5">
          {plan.name}
        </h3>
        <p className="text-xs text-muted-foreground">{plan.description}</p>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          {plan.isFree ? (
            <span className="text-2xl font-bold text-foreground tabular-nums">
              ₹0
            </span>
          ) : (
            <span className="text-2xl font-bold text-foreground tabular-nums">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}
          {!plan.isFree && (
            <span className="text-xs text-muted-foreground">/mo</span>
          )}
        </div>

        {/* Yearly savings */}
        {isYearly && yearlySavings > 0 && (
          <span className="paywall-annual-savings mt-1 inline-block">
            Save {yearlySavings}%
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-2 flex-1 mb-5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-success mt-0.5 shrink-0" />
            <span className="text-foreground">{f}</span>
          </li>
        ))}
      </ul>

      {/* Free trial note */}
      {(plan.id === "starter" || plan.id === "growth") && (
        <p className="text-[10px] text-muted-foreground mb-2 text-center">
          🎁 7-day free trial included
        </p>
      )}

      {/* CTA */}
      <Button
        size="sm"
        className={`w-full text-sm h-10 font-semibold ${
          plan.isMostPopular && !isCurrent ? "btn-primary-glow" : ""
        }`}
        variant={
          isCurrent
            ? "outline"
            : plan.isMostPopular
              ? "default"
              : plan.isAgency
                ? "outline"
                : "outline"
        }
        disabled={isCurrent}
        onClick={() => !isCurrent && onSelect(plan)}
        data-ocid={`paywall.plan.select.${plan.id}`}
      >
        {isCurrent ? (
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Current Plan
          </span>
        ) : plan.isAgency ? (
          <span className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-warning" />
            {plan.cta}
          </span>
        ) : plan.isFree ? (
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            {plan.cta}
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            {plan.cta}
          </span>
        )}
      </Button>
    </motion.div>
  );
}

// ─── Paywall FAQ Item ─────────────────────────────────────────────────────────

function PaywallFAQItem({
  item,
  index,
}: {
  item: { q: string; a: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border/50 rounded-lg overflow-hidden"
      data-ocid={`paywall.faq.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left hover:bg-muted/20 transition-colors duration-200"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold text-foreground">{item.q}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <p className="px-3 pb-2.5 text-xs text-muted-foreground">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PaywallPageProps {
  isModal?: boolean;
  onClose?: () => void;
  highlightFeature?: LockedFeature;
}

export default function PaywallPage({
  isModal,
  onClose,
  highlightFeature,
}: PaywallPageProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { data: subscription } = useSubscription();
  const { closePaywall } = usePaywall();
  const { trackEvent } = useAnalytics();

  const currentPlanId = subscription
    ? String(subscription.plan).toLowerCase()
    : "free";

  const navigate = useNavigate();

  function handleSelect(plan: PaywallPlan) {
    if (plan.isAgency) {
      toast.info("Contact our sales team for Agency plan.", {
        description: "We'll set up a custom plan for your team.",
      });
      return;
    }
    trackEvent("plan_selected", {
      plan: plan.id,
      billingCycle: isYearly ? "yearly" : "monthly",
    });
    trackEvent("payment_started", { plan: plan.id });
    handleClose();
    // Map paywall plan IDs to Razorpay plan IDs
    const rzpId = plan.id === "free" ? null : `rzp_${plan.id}`;
    if (rzpId) {
      navigate({
        to: "/checkout",
        search: { plan: rzpId, yearly: isYearly ? "1" : undefined } as Record<
          string,
          string
        >,
      });
    }
  }

  function handleClose() {
    if (onClose) onClose();
    else closePaywall();
  }

  const content = (
    <div className="flex flex-col h-full" data-ocid="paywall.page">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-4 border-b border-border/50 shrink-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">
              Simple pricing. Built to get you more enquiries.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {highlightFeature
              ? `${FEATURE_LABEL_MAP[highlightFeature]} requires a higher plan. `
              : ""}
            Start free. Upgrade when you want faster results and less manual
            work.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-fast shrink-0 mt-0.5"
          aria-label="Close paywall"
          data-ocid="paywall.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3 px-5 py-4 shrink-0">
        <span
          className={`text-sm font-semibold transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isYearly}
          onClick={() => setIsYearly((p) => !p)}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${isYearly ? "bg-primary" : "bg-muted"}`}
          data-ocid="paywall.billing_toggle"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-subtle transition-transform duration-200 ${isYearly ? "translate-x-6" : "translate-x-0"}`}
          />
        </button>
        <span
          className={`text-sm font-semibold transition-colors ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
        >
          Yearly
        </span>
        {isYearly && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-warning/15 text-warning"
            data-ocid="paywall.yearly_savings_badge"
          >
            Save 20%
          </motion.span>
        )}
      </div>

      {/* Plan Cards — horizontal snap scroll */}
      <div
        className="flex-1 overflow-hidden flex flex-col"
        data-ocid="paywall.plans.list"
      >
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-thin px-5 pb-4 pt-6 flex-1">
          {PAYWALL_PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isYearly={isYearly}
              isCurrent={plan.id === currentPlanId}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* ROI Highlight */}
      <div className="px-5 py-4 shrink-0 border-t border-border/30">
        <div className="rounded-xl bg-success/10 border border-success/30 p-4">
          <p className="text-sm font-semibold text-foreground mb-1">
            Even 1 new customer can cover your monthly plan.
          </p>
          <p className="text-xs text-muted-foreground">
            If your service is ₹1,000 and you get 10 extra customers, that's{" "}
            <span className="font-semibold text-success">
              ₹10,000 added revenue
            </span>
            .
          </p>
        </div>
      </div>

      {/* Objection Handling */}
      <div className="px-5 shrink-0 border-t border-border/30 py-3 space-y-2">
        {[
          {
            q: "Will this work for my business?",
            a: "If your customers search online or use WhatsApp, this system can help you reach them.",
          },
          {
            q: "Do I need experience?",
            a: "No. The app guides you step by step.",
          },
          {
            q: "Is there a contract?",
            a: "No. Cancel anytime.",
          },
        ].map((item, i) => (
          <PaywallFAQItem key={item.q} item={item} index={i} />
        ))}
      </div>

      {/* Final CTA line */}
      <div className="px-5 pb-3 pt-2 shrink-0 text-center">
        <p className="text-xs text-muted-foreground font-medium">
          Start free. Upgrade when you're ready to scale.
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-3 border-t border-border/30 shrink-0">
        <p className="text-xs text-muted-foreground text-center">
          <CheckCircle2 className="w-3 h-3 inline mr-1 text-success" />
          All plans include: dark/light mode, lead scoring, basic CRM, and
          Indian Rupee billing.
        </p>
        <p className="text-[10px] text-muted-foreground/60 text-center mt-1">
          Payments secured by Razorpay. UPI, Cards, Net Banking accepted. Cancel
          anytime.
        </p>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <AnimatePresence>
        <motion.div
          key="paywall-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          style={{ background: "oklch(0 0 0 / 0.6)" }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            key="paywall-sheet"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="bg-card w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-hidden flex flex-col rounded-t-2xl sm:rounded-2xl shadow-premium"
            data-ocid="paywall.dialog"
          >
            {content}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Full-page route view
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col">
        {content}
      </div>
    </div>
  );
}
