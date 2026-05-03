import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChecklistItem {
  id: string;
  label: string;
  cta: string;
  to: string;
  ocid: string;
  ctaOcid: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "contact_leads",
    label: "Contact 5 leads now",
    cta: "Go to Leads",
    to: "/leads",
    ocid: "checklist.contact_leads_item",
    ctaOcid: "checklist.contact_leads_link",
  },
  {
    id: "followup_replies",
    label: "Follow up pending replies",
    cta: "Open Inbox",
    to: "/outreach",
    ocid: "checklist.followup_replies_item",
    ctaOcid: "checklist.followup_replies_link",
  },
  {
    id: "send_proposal",
    label: "Send your first proposal",
    cta: "Create Proposal",
    to: "/proposals",
    ocid: "checklist.send_proposal_item",
    ctaOcid: "checklist.send_proposal_link",
  },
];

const STORAGE_KEY_DISMISSED = "firstBookingChecklistDismissed";
const STORAGE_KEY_CHECKED = "firstBookingChecklistChecked";

function loadChecked(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHECKED);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveChecked(checked: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY_CHECKED, JSON.stringify(checked));
  } catch {
    // ignore
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FirstBookingChecklist() {
  const navigate = useNavigate();

  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_DISMISSED) === "true";
    } catch {
      return false;
    }
  });

  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked);

  const checkedCount = CHECKLIST_ITEMS.filter((i) => checked[i.id]).length;
  const allDone = checkedCount === CHECKLIST_ITEMS.length;

  useEffect(() => {
    saveChecked(checked);
  }, [checked]);

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY_DISMISSED, "true");
    } catch {
      // ignore
    }
  }

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  if (dismissed) return null;

  return (
    <AnimatePresence initial={false}>
      <motion.div
        data-ocid="checklist.panel"
        key="first-booking-checklist"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`rounded-2xl border p-4 relative overflow-hidden ${
          allDone
            ? "border-green-500/30 bg-green-500/5"
            : "border-primary/20 bg-card"
        }`}
      >
        {/* Subtle gradient bg */}
        {!allDone && (
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, oklch(0.62 0.22 253 / 0.06), transparent 60%)",
            }}
          />
        )}

        {/* Header row */}
        <div className="relative flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <div className="flex items-center gap-2 flex-wrap">
              <p
                className="text-[13px] font-bold text-foreground leading-tight"
                data-ocid="checklist.title"
              >
                Your first booking checklist
              </p>
              {/* Progress badge */}
              <span
                data-ocid="checklist.progress_badge"
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  allDone
                    ? "bg-green-500/15 text-green-600"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {checkedCount}/{CHECKLIST_ITEMS.length} done
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Get your first booking in 24–72 hours
            </p>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            data-ocid="checklist.dismiss_button"
            onClick={dismiss}
            aria-label="Dismiss checklist"
            className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-150 active:scale-95"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 rounded-full bg-border/40 mb-3 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: allDone
                ? "oklch(0.56 0.15 150)"
                : "oklch(0.62 0.22 253)",
            }}
            initial={{ width: 0 }}
            animate={{
              width: `${(checkedCount / CHECKLIST_ITEMS.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* All done message */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-3"
              data-ocid="checklist.success_state"
            >
              <div className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 px-3 py-2">
                <span className="text-[16px]">🎉</span>
                <p className="text-[12px] font-semibold text-green-700">
                  Great start! Keep going to close your first deal.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checklist items */}
        <div className="relative space-y-2">
          {CHECKLIST_ITEMS.map((item, idx) => {
            const isChecked = !!checked[item.id];
            return (
              <motion.div
                key={item.id}
                data-ocid={item.ocid}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.22 }}
                className="flex items-center gap-3"
              >
                {/* Checkbox */}
                <button
                  type="button"
                  data-ocid={`checklist.checkbox.${idx + 1}`}
                  aria-label={
                    isChecked
                      ? `Uncheck: ${item.label}`
                      : `Check: ${item.label}`
                  }
                  onClick={() => toggle(item.id)}
                  className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 active:scale-90 ${
                    isChecked
                      ? "border-primary bg-primary"
                      : "border-border/60 bg-transparent hover:border-primary/60"
                  }`}
                >
                  <AnimatePresence>
                    {isChecked && (
                      <motion.svg
                        key="check"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </button>

                {/* Label */}
                <p
                  className={`flex-1 text-[13px] font-medium transition-all duration-200 min-w-0 ${
                    isChecked
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </p>

                {/* CTA link */}
                {!isChecked && (
                  <button
                    type="button"
                    data-ocid={item.ctaOcid}
                    onClick={() => navigate({ to: item.to as "/" })}
                    className="shrink-0 text-[11px] font-semibold text-primary flex items-center gap-0.5 hover:underline active:opacity-70 transition-opacity duration-150"
                  >
                    {item.cta}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
