import { useCallback, useEffect, useState } from "react";
import { useAnalytics } from "./useAnalytics";
import type { SmartPaywallContext } from "./useSmartPaywall";

export type LockedFeature =
  // original 6 feature locks
  | "export-leads"
  | "bulk-messages"
  | "ai-proposal"
  | "high-score-leads"
  | "auto-follow-up"
  | "client-report"
  // smart paywall trigger sources
  | "message_send"
  | "lead_reply"
  | "fab_click"
  | "high_score_lead"
  | null;

interface PaywallState {
  isOpen: boolean;
  currentFeature: LockedFeature;
  /** Optional contextual metadata for dynamic paywall copy */
  context?: SmartPaywallContext;
}

// Module-level state + listeners for cross-component access without full Zustand
let _state: PaywallState = { isOpen: false, currentFeature: null };
const _listeners = new Set<() => void>();

function setState(next: Partial<PaywallState>) {
  _state = { ..._state, ...next };
  for (const l of _listeners) l();
}

/** Imperative open — safe to call outside React render cycle */
export function openPaywall(
  featureName: LockedFeature,
  context?: SmartPaywallContext,
) {
  setState({ isOpen: true, currentFeature: featureName, context });
}

/** Imperative close */
export function closePaywall() {
  setState({ isOpen: false, currentFeature: null, context: undefined });
}

export function usePaywall() {
  const [, forceUpdate] = useState(0);
  const { trackEvent } = useAnalytics();

  // Subscribe on mount, unsubscribe on unmount
  const rerender = useCallback(() => forceUpdate((n) => n + 1), []);
  useEffect(() => {
    _listeners.add(rerender);
    return () => {
      _listeners.delete(rerender);
    };
  }, [rerender]);

  const openPaywallHook = useCallback(
    (featureName: LockedFeature, context?: SmartPaywallContext) => {
      setState({ isOpen: true, currentFeature: featureName, context });
      trackEvent("paywall_viewed", {
        feature: featureName ?? "unknown",
        trigger_type: context?.type ?? "direct",
        lead_name: context?.leadName ?? "",
        lead_city: context?.leadCity ?? "",
      });
    },
    [trackEvent],
  );

  const closePaywallHook = useCallback(() => {
    setState({ isOpen: false, currentFeature: null, context: undefined });
  }, []);

  return {
    isOpen: _state.isOpen,
    currentFeature: _state.currentFeature,
    context: _state.context,
    openPaywall: openPaywallHook,
    closePaywall: closePaywallHook,
  };
}
