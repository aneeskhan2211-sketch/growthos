/**
 * RazorpayCheckoutPage.tsx
 * Full checkout experience with Razorpay — plan summary, billing toggle, and payment button.
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  Loader2,
  Lock,
  RefreshCcw,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  RAZORPAY_PLANS,
  useRazorpayCheckout,
} from "../hooks/useRazorpayCheckout";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtPrice(n: number) {
  return n.toLocaleString("en-IN");
}

// ─── Razorpay trust badge ─────────────────────────────────────────────────────

function RazorpayBadge() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Lock className="w-3.5 h-3.5 text-[#528FF0]" />
      <span>Secured by</span>
      <span className="font-bold text-[#528FF0]">Razorpay</span>
      <span className="text-muted-foreground/60">·</span>
      <span>UPI, Cards, Net Banking, Wallets</span>
    </div>
  );
}

// ─── PlanSummaryCard ─────────────────────────────────────────────────────────

function PlanSummaryCard({
  planId,
  yearly,
  onChangePlan,
}: {
  planId: string;
  yearly: boolean;
  onChangePlan: () => void;
}) {
  const plan = RAZORPAY_PLANS.find((p) => p.id === planId);
  if (!plan || plan.id === "free") return null;

  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <Card className="p-5 bg-card border border-border rounded-2xl space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              {plan.highlighted ? (
                <Sparkles className="w-4 h-4 text-primary" />
              ) : plan.name === "Agency" ? (
                <Crown className="w-4 h-4 text-warning" />
              ) : (
                <Star className="w-4 h-4 text-primary" />
              )}
            </div>
            <h2 className="text-lg font-display font-bold text-foreground">
              {plan.name} Plan
            </h2>
            {plan.highlighted && (
              <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px] font-bold">
                Most Popular
              </Badge>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground tabular-nums">
              ₹{fmtPrice(price)}
            </span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          {yearly && (
            <p className="text-xs text-success mt-0.5 font-medium">
              ₹{fmtPrice(price * 12)} billed annually — save 10%
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onChangePlan}
          className="text-xs text-primary hover:underline font-semibold shrink-0 mt-1"
          data-ocid="rzp_checkout.change_plan.button"
        >
          Change
        </button>
      </div>

      <Separator />

      <ul className="space-y-2">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ─── SmallPlanPicker ─────────────────────────────────────────────────────────

function SmallPlanPicker({
  selectedId,
  yearly,
  onSelect,
}: {
  selectedId: string;
  yearly: boolean;
  onSelect: (id: string) => void;
}) {
  const paid = RAZORPAY_PLANS.filter((p) => p.id !== "free");
  return (
    <div
      className="grid grid-cols-2 gap-3"
      data-ocid="rzp_checkout.plan_picker"
    >
      {paid.map((plan) => {
        const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
        const isSelected = plan.id === selectedId;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan.id)}
            data-ocid={`rzp_checkout.plan_option.${plan.id}`}
            className={[
              "relative flex flex-col gap-1 rounded-xl border p-4 text-left transition-smooth cursor-pointer",
              isSelected
                ? "border-primary bg-primary/5 shadow-glow-primary"
                : "border-border hover:border-primary/40 bg-card",
            ].join(" ")}
          >
            {plan.highlighted && (
              <span className="absolute -top-2.5 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                Popular
              </span>
            )}
            <p className="font-semibold text-sm text-foreground">{plan.name}</p>
            <p className="text-lg font-bold text-foreground tabular-nums">
              ₹{fmtPrice(price)}
              <span className="text-xs font-normal text-muted-foreground">
                /mo
              </span>
            </p>
          </button>
        );
      })}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

type SearchParams = { plan?: string; yearly?: string };

export default function RazorpayCheckoutPage() {
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false }) as SearchParams;
  const urlPlan = rawSearch?.plan ?? null;
  const urlYearly = rawSearch?.yearly === "1";

  const defaultPlan =
    (urlPlan ? RAZORPAY_PLANS.find((p) => p.id === urlPlan) : null) ??
    RAZORPAY_PLANS.find((p) => p.highlighted) ??
    RAZORPAY_PLANS[2];

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    defaultPlan?.id ?? "rzp_growth",
  );
  const [yearly, setYearly] = useState(urlYearly);
  const [showPicker, setShowPicker] = useState(!urlPlan);

  const { initiatePayment, isLoading, error } = useRazorpayCheckout();

  const selectedPlan = useMemo(
    () =>
      RAZORPAY_PLANS.find((p) => p.id === selectedPlanId) ?? RAZORPAY_PLANS[2],
    [selectedPlanId],
  );

  const displayPrice = yearly
    ? selectedPlan.yearlyPrice
    : selectedPlan.monthlyPrice;

  const handlePay = async () => {
    await initiatePayment(selectedPlanId);
  };

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate({ to: "/pricing" })}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
        data-ocid="rzp_checkout.back.button"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to pricing
      </button>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-display font-bold text-foreground">
          Complete your upgrade
        </h1>
        <p className="text-sm text-muted-foreground">
          You're one step away from more leads, faster follow-ups, and better
          results.
        </p>
      </motion.div>

      {/* Billing toggle */}
      <div className="flex items-center gap-3 text-sm">
        <span
          className={`font-semibold ${
            !yearly ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          onClick={() => setYearly((v) => !v)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${
            yearly ? "bg-primary" : "bg-muted"
          }`}
          data-ocid="rzp_checkout.billing_toggle"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-subtle transition-transform duration-200 ${
              yearly ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`font-semibold ${
            yearly ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Yearly
        </span>
        {yearly && (
          <Badge className="bg-success/15 text-success border-success/20 text-[10px] font-bold">
            Save 10%
          </Badge>
        )}
      </div>

      {/* Plan picker */}
      {showPicker && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select a plan
          </p>
          <SmallPlanPicker
            selectedId={selectedPlanId}
            yearly={yearly}
            onSelect={(id) => {
              setSelectedPlanId(id);
              setShowPicker(false);
            }}
          />
        </div>
      )}

      {/* Selected plan summary */}
      <PlanSummaryCard
        planId={selectedPlanId}
        yearly={yearly}
        onChangePlan={() => setShowPicker((v) => !v)}
      />

      {/* Error */}
      {error && (
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
          data-ocid="rzp_checkout.error_state"
        >
          <RefreshCcw className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Pay button */}
      <Button
        type="button"
        className="w-full h-12 text-base font-bold btn-primary-glow"
        disabled={isLoading || selectedPlan.id === "free"}
        onClick={handlePay}
        data-ocid="rzp_checkout.pay.primary_button"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Opening payment window…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Pay ₹{fmtPrice(displayPrice)} with Razorpay
          </span>
        )}
      </Button>

      {/* Trust row */}
      <div className="flex flex-col items-center gap-2 pt-1">
        <RazorpayBadge />
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <RefreshCcw className="w-3.5 h-3.5 text-primary" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary" />
            Data privacy compliant
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            Instant activation
          </span>
        </div>
      </div>

      {/* ROI note */}
      <Card className="p-4 bg-muted/30 border-border rounded-xl">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            Even 1 new customer can cover your monthly plan.
          </span>{" "}
          If your service is ₹1,000 and you get 10 extra customers, that's{" "}
          <span className="font-semibold text-success">
            ₹10,000 added revenue
          </span>{" "}
          in a single month.
        </p>
      </Card>
    </div>
  );
}
