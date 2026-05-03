import { useAnalytics } from "@/hooks/useAnalytics";
import useConversionEngine from "@/hooks/useConversionEngine";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function timerColor(seconds: number): string {
  if (seconds > 300) return "oklch(0.56 0.15 150)"; // green
  if (seconds > 120) return "oklch(0.78 0.18 60)"; // amber
  return "oklch(0.65 0.22 22)"; // red
}

export function CountdownOfferModal() {
  const { countdownSecondsLeft, isCountdownActive, dismissCountdown } =
    useConversionEngine();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (isCountdownActive && !shown) {
      setShown(true);
      trackEvent("countdown_offer_shown", {});
    }
  }, [isCountdownActive, shown, trackEvent]);

  useEffect(() => {
    if (shown && countdownSecondsLeft === 0) {
      trackEvent("countdown_expired", {});
      dismissCountdown();
      toast.info("Offer expired", { duration: 3000 });
      setShown(false);
    }
  }, [countdownSecondsLeft, shown, dismissCountdown, trackEvent]);

  const handleUpgrade = () => {
    trackEvent("countdown_converted", {
      seconds_left: String(countdownSecondsLeft),
    });
    dismissCountdown();
    setShown(false);
    navigate({
      to: "/checkout",
      search: { plan: "rzp_growth" } as Record<string, string>,
    });
  };

  const handleDismiss = () => {
    dismissCountdown();
    setShown(false);
  };

  const visible = shown && isCountdownActive && countdownSecondsLeft > 0;
  const color = timerColor(countdownSecondsLeft);
  const timeLabel = formatTime(countdownSecondsLeft);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-ocid="countdown_offer.dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={handleDismiss}
            onKeyDown={(e) => e.key === "Escape" && handleDismiss()}
            role="button"
            tabIndex={-1}
            aria-label="Close"
          />

          {/* Card */}
          <motion.div
            className="relative w-full sm:max-w-md mx-4 sm:mx-auto bg-card rounded-t-2xl sm:rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
          >
            <div className="p-6 space-y-4 text-center">
              {/* Timer */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Limited-time offer
                </p>
                <motion.p
                  className="text-[48px] font-bold font-display tabular-nums leading-none"
                  style={{ color }}
                  animate={{ color }}
                  transition={{ duration: 0.5 }}
                >
                  {timeLabel}
                </motion.p>
              </div>

              {/* Body */}
              <div className="space-y-1">
                <p className="text-[18px] font-bold text-foreground leading-snug">
                  Unlock Growth Plan in the next{" "}
                  <span style={{ color }}>{timeLabel}</span> and get:
                </p>
              </div>

              {/* Benefits */}
              <div className="text-left space-y-2">
                {[
                  "+100 extra leads today",
                  "Free follow-up automation",
                  "Full CRM pipeline",
                ].map((b) => (
                  <div key={b} className="flex items-center gap-2.5">
                    <span className="w-4.5 h-4.5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="2 6 5 9 10 3" />
                      </svg>
                    </span>
                    <p className="text-[13px] font-medium text-foreground">
                      {b}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-2 pt-1">
                <motion.button
                  type="button"
                  data-ocid="countdown_offer.confirm_button"
                  onClick={handleUpgrade}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-[15px] font-bold shadow-lg shadow-primary/25"
                  whileTap={{ scale: 0.98 }}
                >
                  Upgrade Now — Pay with Razorpay
                </motion.button>
                <button
                  type="button"
                  data-ocid="countdown_offer.cancel_button"
                  onClick={handleDismiss}
                  className="text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  No thanks
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
