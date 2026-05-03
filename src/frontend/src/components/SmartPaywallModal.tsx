import { useAnalytics } from "@/hooks/useAnalytics";
import useConversionEngine from "@/hooks/useConversionEngine";
import { usePaywall } from "@/hooks/usePaywall";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

const SMART_FEATURES = new Set([
  "message_send",
  "lead_reply",
  "fab_click",
  "high_score_lead",
]);

export function SmartPaywallModal() {
  const { isOpen, currentFeature, context, closePaywall } = usePaywall();
  const { getVariant, trackVariantEvent } = useConversionEngine();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();

  const isSmartPaywall =
    currentFeature !== null && SMART_FEATURES.has(currentFeature);
  const show = isOpen && isSmartPaywall;

  const headlineVariant = getVariant("paywall_headline", [
    "control",
    "outcome",
  ]);
  const ctaVariant = getVariant("cta_text", ["unlock", "close_deal"]);

  const headline =
    headlineVariant === "outcome"
      ? "This is your chance to close a real client."
      : "You're 1 step away from converting this lead.";

  const ctaLabel =
    ctaVariant === "close_deal" ? "Close this deal now" : "Unlock this lead";

  useEffect(() => {
    if (!show) return;
    trackEvent("paywall_viewed", {
      feature: currentFeature ?? "unknown",
      trigger_type: context?.type ?? "smart",
    });
    trackVariantEvent("paywall_headline", headlineVariant, "variant_selected", {
      modal: "smart_paywall",
    });
    trackVariantEvent("cta_text", ctaVariant, "variant_selected", {
      modal: "smart_paywall",
    });
  }, [
    show,
    currentFeature,
    context?.type,
    headlineVariant,
    ctaVariant,
    trackEvent,
    trackVariantEvent,
  ]);

  const handleUpgrade = () => {
    trackVariantEvent("cta_text", ctaVariant, "paywall_converted", {
      modal: "smart_paywall",
    });
    closePaywall();
    // Navigate directly to checkout with Razorpay growth plan pre-selected
    navigate({
      to: "/checkout",
      search: { plan: "rzp_growth" } as Record<string, string>,
    });
  };

  const handleDismiss = () => {
    trackEvent("paywall_dismissed", {
      feature: currentFeature ?? "unknown",
      trigger_type: context?.type ?? "smart",
    });
    closePaywall();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-ocid="smart_paywall.dialog"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Card */}
          <motion.div
            className="relative w-full sm:max-w-md mx-4 sm:mx-auto bg-card rounded-t-2xl sm:rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
          >
            {/* Dismiss */}
            <button
              type="button"
              data-ocid="smart_paywall.close_button"
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 z-10"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M1 1 L13 13 M13 1 L1 13" />
              </svg>
            </button>

            {/* Lead context banner */}
            {context?.leadName && (
              <div className="px-5 pt-5 pb-0">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/8 border border-primary/20">
                  <span
                    className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-[12px] font-semibold text-foreground">
                    Closing{" "}
                    <span className="text-primary">{context.leadName}</span>
                    {context.leadCity && (
                      <>
                        {" "}
                        from{" "}
                        <span className="text-primary">{context.leadCity}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            <div className="p-5 pt-4 space-y-4">
              {/* Headline */}
              <div className="space-y-1.5">
                <h2 className="text-[20px] font-bold font-display text-foreground leading-tight">
                  {headline}
                </h2>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Upgrade to send messages and close this opportunity. Pay with
                  Razorpay — UPI, cards, net banking accepted.
                </p>
              </div>

              {/* Benefits row */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: "💬", label: "Send unlimited messages" },
                  { icon: "🔄", label: "Auto follow-ups" },
                  { icon: "📊", label: "Full pipeline view" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex flex-col items-center gap-1 text-center px-1 py-2.5 rounded-xl bg-muted/40 border border-border/30"
                  >
                    <span className="text-[18px]">{b.icon}</span>
                    <p className="text-[10px] font-semibold text-foreground leading-tight">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-2">
                <motion.button
                  type="button"
                  data-ocid="smart_paywall.confirm_button"
                  onClick={handleUpgrade}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-[15px] font-bold shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform duration-150"
                  whileTap={{ scale: 0.98 }}
                >
                  {ctaLabel} — Pay with Razorpay
                </motion.button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Growth plan — ₹299/mo. Cancel anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
