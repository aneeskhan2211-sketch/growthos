import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ChurnAlertModalProps {
  isOpen: boolean;
  pendingHotLeads: number;
  daysSinceLastSession: number;
  onViewHotLeads: () => void;
  onDismiss: () => void;
}

const FIRE_ICON = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-orange-400"
    aria-hidden="true"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export function ChurnAlertModal({
  isOpen,
  pendingHotLeads,
  daysSinceLastSession,
  onViewHotLeads,
  onDismiss,
}: ChurnAlertModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Trap focus inside modal
  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  const handleViewHotLeads = () => {
    toast.success("Opening hot leads…");
    onViewHotLeads();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="churn-backdrop"
            data-ocid="churn_alert.backdrop"
            className="fixed inset-0 z-50 bg-black/50"
            style={{ backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onDismiss}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.dialog
            key="churn-modal"
            data-ocid="churn_alert.dialog"
            aria-labelledby="churn-modal-title"
            className="fixed inset-x-4 bottom-28 z-50 mx-auto max-w-sm rounded-2xl bg-card border border-border/60 shadow-2xl overflow-hidden open:block p-0 m-0"
            open
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            {/* Gradient accent strip */}
            <div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.62 0.22 25), oklch(0.68 0.18 45))",
              }}
            />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                {/* Animated pulse dot */}
                <div className="relative mt-0.5 shrink-0">
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10">
                    <FIRE_ICON />
                    <span className="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-orange-500">
                      <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75" />
                    </span>
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    id="churn-modal-title"
                    className="text-base font-bold font-display text-foreground leading-tight"
                  >
                    Your leads are getting cold 🔥
                  </h2>
                  <p className="text-[13px] text-muted-foreground mt-1.5 leading-relaxed">
                    <span className="font-semibold text-foreground">
                      {pendingHotLeads} hot lead
                      {pendingHotLeads !== 1 ? "s" : ""}
                    </span>{" "}
                    {pendingHotLeads !== 1 ? "are" : "is"} waiting for your
                    reply. Last active{" "}
                    <span className="font-semibold text-foreground">
                      {daysSinceLastSession === 0
                        ? "today"
                        : daysSinceLastSession === 1
                          ? "1 day ago"
                          : `${daysSinceLastSession} days ago`}
                    </span>
                    . Don&apos;t let them go cold.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5">
                <motion.button
                  type="button"
                  data-ocid="churn_alert.confirm_button"
                  className="w-full h-11 rounded-xl text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.97]"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.53 0.22 253), oklch(0.62 0.24 270))",
                    boxShadow: "0 4px 14px oklch(0.53 0.22 253 / 0.35)",
                  }}
                  onClick={handleViewHotLeads}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  View Hot Leads
                </motion.button>

                <button
                  ref={closeBtnRef}
                  type="button"
                  data-ocid="churn_alert.cancel_button"
                  className="w-full h-9 rounded-xl text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
                  onClick={onDismiss}
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}
