/**
 * StripeCheckoutPage.tsx
 * Full checkout experience — plan summary, payment button, success handling.
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  RefreshCcw,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import {
  FALLBACK_PLANS,
  useCheckoutConfig,
  useCheckoutSuccess,
  useCreateCheckoutSession,
} from "../hooks/useStripeCheckout";
import type { CheckoutPlan } from "../hooks/useStripeCheckout";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtPrice(n: number) {
  return n.toLocaleString("en-IN");
}

// ─── PlanSummaryCard ─────────────────────────────────────────────────────────

function PlanSummaryCard({
  plan,
  yearly,
  onChangePlan,
}: {
  plan: CheckoutPlan;
  yearly: boolean;
  onChangePlan: () => void;
}) {
  const price = yearly ? plan.priceYearly : plan.priceMonthly;
  const annualTotal = price * 12;

  return (
    <Card className="p-5 bg-card border border-border rounded-2xl space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
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
              ₹{fmtPrice(annualTotal)} billed annually — save 20%
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onChangePlan}
          className="text-xs text-primary hover:underline font-semibold shrink-0 mt-1"
          data-ocid="checkout.change_plan.button"
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
  plans,
  selectedId,
  yearly,
  onSelect,
  loading,
}: {
  plans: CheckoutPlan[];
  selectedId: string;
  yearly: boolean;
  onSelect: (id: string) => void;
  loading: string | null;
}) {
  const paid = plans.filter((p) => p.id !== "free");
  return (
    <div className="grid grid-cols-2 gap-3" data-ocid="checkout.plan_picker">
      {paid.map((plan) => {
        const price = yearly ? plan.priceYearly : plan.priceMonthly;
        const isSelected = plan.id === selectedId;
        const isLoading = loading === plan.id;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => onSelect(plan.id)}
            disabled={!!loading}
            data-ocid={`checkout.plan_option.${plan.id}`}
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
            {isLoading && (
              <Loader2 className="w-3 h-3 animate-spin text-primary absolute top-2 right-2" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

type SearchParams = { plan?: string; yearly?: string };

export default function StripeCheckoutPage() {
  const navigate = useNavigate();
  // TanStack Router search — may be undefined if not defined in route validator
  const rawSearch = useSearch({ strict: false }) as SearchParams;
  const urlPlan = rawSearch?.plan ?? null;
  const urlYearly = rawSearch?.yearly === "1";

  const { data: config } = useCheckoutConfig();
  const createSession = useCreateCheckoutSession();
  const { succeeded } = useCheckoutSuccess();

  const plans = config?.plans ?? FALLBACK_PLANS;
  const paidPlans = plans.filter((p) => p.id !== "free");

  const defaultPlan =
    (urlPlan ? paidPlans.find((p) => p.id === urlPlan) : null) ??
    paidPlans.find((p) => p.highlighted) ??
    paidPlans[1];

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    defaultPlan?.id ?? "growth",
  );
  const [yearly, setYearly] = useState(urlYearly);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(!urlPlan);

  // Update selected plan if URL param changes after mount
  useEffect(() => {
    if (urlPlan) {
      setSelectedPlanId(urlPlan);
      setShowPicker(false);
    }
  }, [urlPlan]);

  const selectedPlan = useMemo(
    () => paidPlans.find((p) => p.id === selectedPlanId) ?? paidPlans[1],
    [paidPlans, selectedPlanId],
  );

  const selectedPrice = yearly
    ? selectedPlan?.priceYearly
    : selectedPlan?.priceMonthly;

  const handlePay = async () => {
    if (!selectedPlan) return;
    setProcessingPlanId(selectedPlan.id);
    setError(null);
    try {
      const successUrl = `${window.location.origin}/?checkout_success=1`;
      const cancelUrl = `${window.location.origin}/checkout?plan=${selectedPlan.id}${
        yearly ? "&yearly=1" : ""
      }`;
      const url = await createSession.mutateAsync({
        planId: selectedPlan.id,
        successUrl,
        cancelUrl,
      });
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      // Graceful fallback: if backend not yet live, go to billing page
      if (
        msg.includes("Actor not ready") ||
        msg.includes("No response") ||
        msg.includes("Could not create")
      ) {
        navigate({ to: "/billing" });
      } else {
        setError(msg);
      }
    } finally {
      setProcessingPlanId(null);
    }
  };

  const isProcessing = !!processingPlanId;

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate({ to: "/pricing" })}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
        data-ocid="checkout.back.button"
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

      {/* Success banner (if returned from Stripe) */}
      {succeeded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-success/10 border border-success/30"
        >
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Payment successful!
            </p>
            <p className="text-xs text-muted-foreground">
              Your plan has been upgraded. Enjoy the full GrowthOS experience.
            </p>
          </div>
        </motion.div>
      )}

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
          data-ocid="checkout.billing_toggle"
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
            Save 20%
          </Badge>
        )}
      </div>

      {/* Plan picker (when no plan pre-selected) */}
      {showPicker && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select a plan
          </p>
          <SmallPlanPicker
            plans={plans}
            selectedId={selectedPlanId}
            yearly={yearly}
            onSelect={(id) => {
              setSelectedPlanId(id);
              setShowPicker(false);
            }}
            loading={processingPlanId}
          />
        </div>
      )}

      {/* Selected plan summary */}
      {selectedPlan && (
        <PlanSummaryCard
          plan={selectedPlan}
          yearly={yearly}
          onChangePlan={() => setShowPicker((v) => !v)}
        />
      )}

      {/* Error */}
      {error && (
        <div
          className="flex items-start gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
          data-ocid="checkout.error_state"
        >
          <RefreshCcw className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Pay button */}
      <Button
        type="button"
        className="w-full h-12 text-base font-bold btn-primary-glow"
        disabled={isProcessing || !selectedPlan}
        onClick={handlePay}
        data-ocid="checkout.pay.primary_button"
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Redirecting to Stripe…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Pay ₹{fmtPrice(selectedPrice ?? 0)}/month
          </span>
        )}
      </Button>

      {/* Trust row */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
        <span className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-success" />
          Secured by Stripe
        </span>
        <span className="flex items-center gap-1.5">
          <RefreshCcw className="w-3.5 h-3.5 text-primary" />
          Cancel anytime
        </span>
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-primary" />₹ Indian Rupees
        </span>
        <span className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-warning" />
          Instant activation
        </span>
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
