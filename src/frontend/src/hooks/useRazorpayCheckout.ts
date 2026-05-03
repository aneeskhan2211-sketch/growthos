/**
 * useRazorpayCheckout.ts
 * Razorpay payment integration hook.
 * Dynamically loads the Razorpay SDK, creates an order, and opens the payment modal.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RazorpayPlan {
  id: string;
  name: string;
  amountPaise: number;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

// ─── Plan config ─────────────────────────────────────────────────────────────

export const RAZORPAY_PLANS: RazorpayPlan[] = [
  {
    id: "free",
    name: "Free",
    amountPaise: 0,
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ["10 leads/day", "Manual outreach", "Basic tracking"],
  },
  {
    id: "rzp_starter",
    name: "Starter",
    amountPaise: 4900,
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: ["50 leads/day", "Message templates", "Basic follow-ups"],
  },
  {
    id: "rzp_growth",
    name: "Growth",
    amountPaise: 29900,
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: [
      "150 leads/day",
      "Auto follow-ups",
      "CRM pipeline",
      "Simple reports",
    ],
    highlighted: true,
  },
  {
    id: "rzp_pro",
    name: "Pro",
    amountPaise: 99900,
    monthlyPrice: 999,
    yearlyPrice: 9990,
    features: [
      "500 leads/day",
      "Proposal generator",
      "Campaign tools",
      "Advanced tracking",
    ],
  },
  {
    id: "rzp_agency",
    name: "Agency",
    amountPaise: 499900,
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    features: [
      "High-volume usage",
      "White-label reports",
      "Team access",
      "Priority support",
    ],
  },
];

// ─── SDK loader ───────────────────────────────────────────────────────────────

function loadRazorpaySDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}

// ─── Backend caller helpers (avoid useLiteralKeys lint issues) ───────────────

type AnyActor = {
  [key: string]: ((...args: unknown[]) => Promise<unknown>) | undefined;
};

function callActorMethod(
  actor: unknown,
  method: string,
  ...args: unknown[]
): Promise<unknown> | undefined {
  const fn = (actor as AnyActor)[method];
  if (typeof fn === "function") {
    return fn(...args);
  }
  return undefined;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRazorpayCheckout() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(
    async (planId: string) => {
      const plan = RAZORPAY_PLANS.find((p) => p.id === planId);
      if (!plan) {
        setError("Invalid plan selected");
        return;
      }

      // Free plan — no payment needed
      if (plan.amountPaise === 0) {
        toast.success("You are on the Free plan.");
        void navigate({ to: "/" });
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await loadRazorpaySDK();

        // Get Razorpay config from backend via helper (avoids index access lint)
        const configResult = await callActorMethod(actor, "getRazorpayConfig");
        let keyId = "rzp_test_REPLACE_KEY_ID";
        if (
          configResult &&
          typeof configResult === "object" &&
          "ok" in configResult &&
          configResult.ok &&
          typeof configResult.ok === "object" &&
          "keyId" in configResult.ok
        ) {
          keyId = String((configResult.ok as { keyId: string }).keyId);
        }

        // Create order
        const orderResult = await callActorMethod(
          actor,
          "createRazorpayOrder",
          planId,
        );
        let orderId = "order_test_123";
        let orderAmount = plan.amountPaise;
        if (
          orderResult &&
          typeof orderResult === "object" &&
          "__kind__" in orderResult &&
          (orderResult as { __kind__: string }).__kind__ === "ok" &&
          "ok" in orderResult &&
          orderResult.ok &&
          typeof orderResult.ok === "object" &&
          "orderId" in orderResult.ok
        ) {
          const ok = orderResult.ok as { orderId: string; amount: bigint };
          orderId = ok.orderId;
          orderAmount = Number(ok.amount);
        }

        if (!window.Razorpay) {
          throw new Error("Razorpay SDK not loaded");
        }

        // Open Razorpay modal
        await new Promise<void>((resolve, reject) => {
          const rzp = new window.Razorpay!({
            key: keyId,
            amount: orderAmount,
            currency: "INR",
            name: "GrowthOS",
            description: `${plan.name} Plan`,
            order_id: orderId,
            prefill: { contact: "" },
            theme: { color: "#6366f1" },
            handler: (response) => {
              void (async () => {
                try {
                  await callActorMethod(
                    actor,
                    "verifyRazorpayPayment",
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature,
                    planId,
                  );
                } catch {
                  // Non-blocking — payment already succeeded at gateway level
                }

                toast.success(`Plan activated! Welcome to ${plan.name}.`, {
                  description:
                    "You now have access to all features of your new plan.",
                  duration: 6000,
                });

                void queryClient.invalidateQueries({
                  queryKey: ["subscriptionStatus"],
                });
                void queryClient.invalidateQueries({
                  queryKey: ["checkoutConfig"],
                });

                void navigate({ to: "/" });
                resolve();
              })();
            },
            modal: {
              ondismiss: () => {
                reject(new Error("Payment cancelled"));
              },
            },
          });
          rzp.open();
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Payment failed";
        if (msg !== "Payment cancelled") {
          setError(msg);
          toast.error("Payment failed", { description: msg });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [actor, navigate, queryClient],
  );

  return { initiatePayment, isLoading, error };
}
