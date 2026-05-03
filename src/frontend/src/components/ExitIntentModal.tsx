import { useAnalytics } from "@/hooks/useAnalytics";
import useConversionEngine from "@/hooks/useConversionEngine";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export function ExitIntentModal() {
  const { exitIntentShown, triggerExitIntent, dismissExitIntent } =
    useConversionEngine();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const triggeredRef = useRef(false);

  const trigger = useCallback(() => {
    if (triggeredRef.current || exitIntentShown) return;
    triggeredRef.current = true;
    triggerExitIntent();
    setVisible(true);
    trackEvent("exit_intent_shown", {});
  }, [exitIntentShown, triggerExitIntent, trackEvent]);

  useEffect(() => {
    const triggerRef = trigger;
    // Desktop: detect mouse leaving from top of page
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5) triggerRef();
    };

    // Mobile: detect scroll to bottom of page
    const handleScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 50;
      if (nearBottom) triggerRef();
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [trigger]);

  const handleDismiss = () => {
    dismissExitIntent();
    setVisible(false);
    trackEvent("exit_intent_dismissed", {});
  };

  const handleCTA = () => {
    trackEvent("exit_intent_converted", {});
    setVisible(false);
    navigate({ to: "/pricing" as "/" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9997] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-ocid="exit_intent.dialog"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-sm bg-card rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
          >
            {/* Dismiss */}
            <button
              type="button"
              data-ocid="exit_intent.close_button"
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M1 1 L11 11 M11 1 L1 11" />
              </svg>
            </button>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Before you go...
                </p>
                <h2 className="text-[20px] font-bold font-display text-foreground leading-tight">
                  Try Growth Plan free for 2 days
                </h2>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  No card required. Cancel anytime. Get 150 leads/day, auto
                  follow-ups, and full CRM.
                </p>
              </div>

              <div className="space-y-2">
                <motion.button
                  type="button"
                  data-ocid="exit_intent.confirm_button"
                  onClick={handleCTA}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-[15px] font-bold shadow-lg shadow-primary/25"
                  whileTap={{ scale: 0.98 }}
                >
                  Get 2-day free trial
                </motion.button>
                <button
                  type="button"
                  data-ocid="exit_intent.cancel_button"
                  onClick={handleDismiss}
                  className="w-full text-center text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150 py-1"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
