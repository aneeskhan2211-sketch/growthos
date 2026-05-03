import { useCallback, useRef } from "react";
import { SubscriptionPlan } from "../backend";
import { useAnalytics } from "./useAnalytics";
import { useSubscription } from "./useSubscription";

// Import openPaywall from module-level pub/sub exposed by usePaywall
// (avoids circular hook calls — we call the imperative function directly)
import type { LockedFeature } from "./usePaywall";

export type SmartPaywallContext = {
  type: "message" | "lead_view" | "reply" | "fab";
  leadName?: string;
  leadCity?: string;
};

// Dynamic import guard — openPaywall is a module-level function exported
// from usePaywall; we call it imperatively so we don't violate Rules of Hooks.
let _openPaywall: ((feature: LockedFeature) => void) | null = null;

/** Call once at app boot (inside a component that already calls usePaywall). */
export function registerOpenPaywall(fn: (feature: LockedFeature) => void) {
  _openPaywall = fn;
}

function firePaywall(feature: LockedFeature) {
  if (_openPaywall) _openPaywall(feature);
}

interface LeadRef {
  id: string;
  name: string;
  city: string;
}

function isFree(plan: SubscriptionPlan): boolean {
  return plan === SubscriptionPlan.free;
}

const LS_LEAD_VIEWS = "growthosLeadViews";
const LS_FAB_CLICKS = "growthosLeadFABClicks";

function readInt(key: string): number {
  try {
    return Number.parseInt(localStorage.getItem(key) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}

function writeInt(key: string, val: number) {
  try {
    localStorage.setItem(key, String(val));
  } catch {
    // ignore
  }
}

export function useSmartPaywall() {
  const { data: subscription } = useSubscription();
  const { trackEvent } = useAnalytics();
  const plan = subscription?.plan ?? SubscriptionPlan.free;

  const trackTrigger = useCallback(
    (source: string) => {
      trackEvent("paywall_trigger_source", { source });
    },
    [trackEvent],
  );

  /**
   * Trigger paywall when user tries to send a message.
   * Always blocks free users.
   */
  const triggerMessagePaywall = useCallback(
    (_lead: LeadRef): { shouldBlock: boolean } => {
      if (!isFree(plan)) return { shouldBlock: false };
      trackTrigger("message_send");
      firePaywall("message_send" as LockedFeature);
      return { shouldBlock: true };
    },
    [plan, trackTrigger],
  );

  /**
   * Trigger paywall after free user has viewed 3+ leads without upgrading.
   */
  const viewCountRef = useRef(readInt(LS_LEAD_VIEWS));
  const triggerLeadViewPaywall = useCallback(
    (_lead: LeadRef): { shouldBlock: boolean } => {
      if (!isFree(plan)) return { shouldBlock: false };
      viewCountRef.current += 1;
      writeInt(LS_LEAD_VIEWS, viewCountRef.current);
      if (viewCountRef.current >= 3) {
        trackTrigger("lead_view");
        firePaywall("high-score-leads" as LockedFeature);
        return { shouldBlock: true };
      }
      return { shouldBlock: false };
    },
    [plan, trackTrigger],
  );

  /**
   * Trigger paywall on first reply received.
   */
  const triggerReplyPaywall = useCallback(
    (_lead: LeadRef): { shouldBlock: boolean } => {
      if (!isFree(plan)) return { shouldBlock: false };
      trackTrigger("lead_reply");
      firePaywall("message_send" as LockedFeature);
      return { shouldBlock: true };
    },
    [plan, trackTrigger],
  );

  /**
   * Trigger paywall on "Get Clients Now" FAB click after 5 free uses.
   */
  const fabClickRef = useRef(readInt(LS_FAB_CLICKS));
  const triggerFABPaywall = useCallback((): { shouldBlock: boolean } => {
    if (!isFree(plan)) return { shouldBlock: false };
    fabClickRef.current += 1;
    writeInt(LS_FAB_CLICKS, fabClickRef.current);
    if (fabClickRef.current > 5) {
      trackTrigger("fab_click");
      firePaywall("fab_click" as LockedFeature);
      return { shouldBlock: true };
    }
    return { shouldBlock: false };
  }, [plan, trackTrigger]);

  return {
    triggerMessagePaywall,
    triggerLeadViewPaywall,
    triggerReplyPaywall,
    triggerFABPaywall,
  };
}
