import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface WeeklyReportCardProps {
  leadsGenerated: number;
  repliesReceived: number;
  proposalsSent: number;
  weeklyRevenuePotential: number;
}

function useAnimatedNumber(target: number, duration = 900): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    start.current = null;
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return value;
}

interface MetricCellProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  isLow?: boolean;
  colorClass?: string;
}

function MetricCell({
  label,
  value,
  prefix = "",
  suffix = "",
  isLow = false,
  colorClass,
}: MetricCellProps) {
  const animated = useAnimatedNumber(value);
  const displayCls = isLow ? "text-warning" : (colorClass ?? "text-foreground");

  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`text-[22px] font-bold font-display tabular-nums leading-none ${displayCls}`}
      >
        {prefix}
        {animated.toLocaleString("en-IN")}
        {suffix}
      </p>
    </div>
  );
}

export function WeeklyReportCard({
  leadsGenerated,
  repliesReceived,
  proposalsSent,
  weeklyRevenuePotential,
}: WeeklyReportCardProps) {
  const navigate = useNavigate();
  const hasData = leadsGenerated > 0 || repliesReceived > 0;
  const isLowActivity = leadsGenerated < 5;

  return (
    <motion.div
      data-ocid="weekly-report.card"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
      className="rounded-2xl bg-card border border-border/40 p-4 relative overflow-hidden"
    >
      {/* Glow accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 90% 10%, oklch(0.62 0.20 170 / 0.5), transparent 60%)",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              This Week's Growth
            </p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              Weekly Report
            </p>
          </div>
          <button
            type="button"
            data-ocid="weekly-report.view_full_button"
            onClick={() => navigate({ to: "/analytics" })}
            className="text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            View Full Report
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
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {hasData ? (
          <div className="grid grid-cols-2 gap-4">
            <MetricCell
              label="Leads Generated"
              value={leadsGenerated}
              isLow={isLowActivity}
            />
            <MetricCell
              label="Replies Received"
              value={repliesReceived}
              colorClass={
                repliesReceived >= 3 ? "text-success" : "text-foreground"
              }
            />
            <MetricCell
              label="Proposals Sent"
              value={proposalsSent}
              colorClass="text-foreground"
            />
            <MetricCell
              label="Revenue Potential"
              value={weeklyRevenuePotential}
              prefix="₹"
              colorClass="text-success"
            />
          </div>
        ) : (
          <div
            data-ocid="weekly-report.empty_state"
            className="py-4 flex flex-col items-center justify-center gap-2 text-center"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground/40"
              aria-hidden="true"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <p className="text-xs text-muted-foreground">
              Start contacting leads to see your weekly progress
            </p>
          </div>
        )}

        {isLowActivity && hasData && (
          <p className="mt-3 text-[11px] font-medium text-warning/80">
            ⚠️ Low activity this week — contact more leads to hit your target
          </p>
        )}
      </div>
    </motion.div>
  );
}
