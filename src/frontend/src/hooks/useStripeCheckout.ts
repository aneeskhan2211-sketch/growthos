/**
 * useStripeCheckout.ts
 * Stripe checkout integration hooks.
 * Reads plan config and initiates checkout sessions via backend.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";

export interface CheckoutPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  highlighted: boolean;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
}

export interface CheckoutConfig {
  publishableKey: string;
  plans: CheckoutPlan[];
}

export interface SubscriptionStatus {
  plan: string;
  status: "active" | "trialing" | "canceled" | "inactive" | "pastDue";
  currentPeriodEnd?: number;
  cancelAtPeriodEnd: boolean;
}

export const FALLBACK_PLANS: CheckoutPlan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["10 leads/day", "Manual outreach", "Basic tracking"],
    highlighted: false,
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 49,
    priceYearly: 470,
    features: ["50 leads/day", "Message templates", "Basic follow-ups"],
    highlighted: false,
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 299,
    priceYearly: 2870,
    features: [
      "150 leads/day",
      "Auto follow-ups",
      "CRM pipeline",
      "Simple reports",
    ],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 999,
    priceYearly: 9590,
    features: [
      "500 leads/day",
      "Proposal generator",
      "Campaign tools",
      "Advanced tracking",
    ],
    highlighted: false,
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 4999,
    priceYearly: 47990,
    features: [
      "White-label reports",
      "Team access",
      "High-volume usage",
      "Priority support",
    ],
    highlighted: false,
  },
];

// ─── Hook: getCheckoutConfig ──────────────────────────────────────────────────
export function useCheckoutConfig() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<CheckoutConfig>({
    queryKey: ["checkoutConfig"],
    queryFn: async () => {
      if (!actor) return { publishableKey: "", plans: FALLBACK_PLANS };
      try {
        const raw = await actor.getCheckoutConfig?.();
        if (!raw) return { publishableKey: "", plans: FALLBACK_PLANS };
        // Map StripePlan[] → CheckoutPlan[] (backend returns minimal plan shape)
        const mappedPlans: CheckoutPlan[] = raw.plans?.length
          ? raw.plans.map((sp) => {
              const fallback =
                FALLBACK_PLANS.find((fp) => fp.id === sp.id) ??
                FALLBACK_PLANS[2];
              return {
                id: sp.id,
                name: sp.name,
                priceMonthly: fallback.priceMonthly,
                priceYearly: fallback.priceYearly,
                features: fallback.features,
                highlighted: fallback.highlighted,
                stripePriceIdMonthly:
                  sp.interval === "month" ? sp.id : undefined,
                stripePriceIdYearly: sp.interval === "year" ? sp.id : undefined,
              };
            })
          : FALLBACK_PLANS;
        return {
          publishableKey: raw.publishableKey,
          plans: mappedPlans,
        };
      } catch {
        return { publishableKey: "", plans: FALLBACK_PLANS };
      }
    },
    enabled: !isFetching,
    staleTime: 300_000,
  });
}

// ─── Mutation: createCheckoutSession ─────────────────────────────────────────
export function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async ({
      planId,
      successUrl,
      cancelUrl,
    }: {
      planId: string;
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createCheckoutSession?.(
        planId,
        successUrl,
        cancelUrl,
      );
      if (!result) throw new Error("No response from backend");
      // Handle #ok / #err variant response
      if (typeof result === "object" && "ok" in result) {
        const ok = (result as { ok: { sessionId: string; url: string } }).ok;
        return ok.url;
      }
      if (typeof result === "object" && "err" in result) {
        throw new Error(String((result as { err: string }).err));
      }
      // Plain string fallback
      if (typeof result === "string") return result;
      throw new Error("Could not create checkout session");
    },
  });
}

// ─── Hook: getSubscriptionStatus ─────────────────────────────────────────────
export function useSubscriptionStatus() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<SubscriptionStatus>({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      if (!actor)
        return { plan: "free", status: "inactive", cancelAtPeriodEnd: false };
      try {
        const sub = await actor.getMySubscription();
        if (!sub)
          return { plan: "free", status: "inactive", cancelAtPeriodEnd: false };
        return {
          plan: String(sub.plan),
          status: String(
            sub.subscriptionStatus,
          ) as SubscriptionStatus["status"],
          cancelAtPeriodEnd: false,
        };
      } catch {
        return { plan: "free", status: "inactive", cancelAtPeriodEnd: false };
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

// ─── Mutation: cancelSubscription ────────────────────────────────────────────
export function useCancelSubscription() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (reason: string) => {
      if (!actor) throw new Error("Actor not ready");
      await actor.cancelSubscription?.(reason);
    },
  });
}

// ─── Hook: useCheckoutSuccess ─────────────────────────────────────────────────
// Reads ?checkout_success=1 from the URL, shows a success toast,
// invalidates subscription cache, and removes the param from the URL.
export function useCheckoutSuccess() {
  const queryClient = useQueryClient();
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isSuccess =
      params.get("checkout_success") === "1" || params.get("success") === "1";
    if (!isSuccess) return;

    setSucceeded(true);

    // Show success toast
    toast.success("Payment successful! Your plan has been upgraded.", {
      description:
        "Welcome to your new plan. Enjoy the full GrowthOS experience.",
      duration: 6000,
    });

    // Invalidate subscription status so the UI refreshes
    void queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
    void queryClient.invalidateQueries({ queryKey: ["checkoutConfig"] });

    // Remove the param from the URL without a page reload
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
  }, [queryClient]);

  return { succeeded };
}
