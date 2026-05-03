import { useAnalytics } from "@/hooks/useAnalytics";
import useConversionEngine from "@/hooks/useConversionEngine";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

export function SuccessMomentPopup() {
  const { successMomentShown, successMomentType, dismissSuccessMoment } =
    useConversionEngine();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();

  useEffect(() => {
    if (successMomentShown && successMomentType) {
      trackEvent("success_moment_triggered", { type: successMomentType });
    }
  }, [successMomentShown, successMomentType, trackEvent]);

  const handleUpgrade = () => {
    dismissSuccessMoment();
    navigate({ to: "/pricing" });
  };

  const handleDismiss = () => {
    dismissSuccessMoment();
  };

  const typeLabel =
    successMomentType === "first_reply" ? "first reply" : "first enquiry";

  return (
    <AnimatePresence>
      {successMomentShown && (
        <motion.div
          className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-sm z-[9996]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 32 }}
          data-ocid="success_moment.dialog"
        >
          <div className="bg-card rounded-t-2xl sm:rounded-2xl border border-border/60 shadow-2xl overflow-hidden">
            {/* Gradient header */}
            <div className="px-5 py-4 relative overflow-hidden bg-gradient-to-br from-purple-600 to-cyan-500">
              <button
                type="button"
                data-ocid="success_moment.close_button"
                onClick={handleDismiss}
                aria-label="Close"
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-150"
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
              <div className="pr-8">
                <span className="text-[22px]">🎉</span>
                <p className="text-white font-bold font-display text-[18px] leading-tight mt-1">
                  This is how businesses get clients.
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                You just received your{" "}
                <span className="font-semibold text-foreground">
                  {typeLabel}
                </span>
                . Upgrade to automate and scale this.
              </p>
              <motion.button
                type="button"
                data-ocid="success_moment.confirm_button"
                onClick={handleUpgrade}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground text-[14px] font-bold shadow-lg shadow-primary/25"
                whileTap={{ scale: 0.98 }}
              >
                Automate and scale this
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
