import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

export interface MonthReport {
  month: string;
  revenue: number;
  leads: number;
  closeRate: number;
  revenuePerLead: number;
  replyRate: number;
  actionItems: [string, string];
}

interface MiniReportModalProps {
  report: MonthReport | null;
  onClose: () => void;
}

function formatRevenue(val: number): string {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
}

export function MiniReportModal({ report, onClose }: MiniReportModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (report) closeBtnRef.current?.focus();
  }, [report]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (report) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [report, onClose]);

  const METRICS = report
    ? [
        {
          label: "Revenue per Lead",
          value: formatRevenue(report.revenuePerLead),
        },
        { label: "Reply Rate", value: `${report.replyRate.toFixed(1)}%` },
        { label: "Close Rate", value: `${report.closeRate.toFixed(1)}%` },
        { label: "Total Leads", value: String(report.leads) },
      ]
    : [];

  return (
    <AnimatePresence>
      {report && (
        <>
          {/* Backdrop */}
          <motion.div
            key="report-backdrop"
            data-ocid="mini_report.backdrop"
            className="fixed inset-0 z-50 bg-black/40"
            style={{ backdropFilter: "blur(3px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet slide-up */}
          <motion.dialog
            key="report-sheet"
            data-ocid="mini_report.dialog"
            aria-labelledby="mini-report-title"
            className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl border-t border-border/60 shadow-2xl overflow-hidden open:block p-0 m-0 max-w-none w-full"
            open
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-9 h-1 rounded-full bg-border/60" />
            </div>

            <div className="px-5 pb-8 pt-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Monthly Report
                  </p>
                  <h2
                    id="mini-report-title"
                    className="text-lg font-bold font-display text-foreground leading-tight mt-0.5"
                  >
                    {report.month}
                  </h2>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">Revenue</p>
                  <p className="text-xl font-bold text-primary tabular-nums font-display">
                    {formatRevenue(report.revenue)}
                  </p>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {METRICS.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl bg-muted/40 border border-border/40 p-3"
                  >
                    <p className="text-[10px] text-muted-foreground font-medium mb-1">
                      {m.label}
                    </p>
                    <p className="text-base font-bold text-foreground tabular-nums">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action items for next month */}
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Recommended Next Steps
                </p>
                <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                  {report.actionItems.map((item, i) => (
                    <div
                      key={item}
                      data-ocid={`mini_report.action_item.${i + 1}`}
                      className={`flex items-start gap-3 px-4 py-3 ${
                        i === 0 ? "border-b border-border/40" : ""
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.53 0.22 253), oklch(0.62 0.24 270))",
                        }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-[13px] text-foreground leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                ref={closeBtnRef}
                type="button"
                data-ocid="mini_report.close_button"
                className="w-full h-11 rounded-xl border border-border/60 text-[14px] font-semibold text-foreground bg-muted/40 active:scale-[0.97] transition-all duration-150"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
}
