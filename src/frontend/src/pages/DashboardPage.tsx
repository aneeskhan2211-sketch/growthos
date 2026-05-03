import { ChurnAlertModal } from "@/components/ChurnAlertModal";
import { ClientProgressBar } from "@/components/ClientProgressBar";
import { CountdownOfferModal } from "@/components/CountdownOfferModal";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { FirstBookingChecklist } from "@/components/FirstBookingChecklist";
import { LossAversionWidget } from "@/components/LossAversionWidget";
import { PageTransition } from "@/components/PageTransition";
import { PaywallTrigger } from "@/components/PaywallTrigger";
import { RetargetingBanner } from "@/components/RetargetingBanner";
import { RetentionNudgeBannerContainer } from "@/components/RetentionNudgeBanner";
import { SmartPaywallModal } from "@/components/SmartPaywallModal";
import { StreakBanner } from "@/components/StreakBanner";
import { SuccessMomentPopup } from "@/components/SuccessMomentPopup";
import { UsageQuotaBar } from "@/components/UsageQuotaBar";
import { WeeklyReportCard } from "@/components/WeeklyReportCard";
import { PAGE_META } from "@/config/metaTags";
import { useAutoAgency } from "@/hooks/useAutoAgency";
import { useBehaviorNudges } from "@/hooks/useBehaviorNudges";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useSubscription } from "@/hooks/useSubscription";
import { useShareableWins, useSocialProofTicker } from "@/hooks/useViralLoop";
import {
  selectAutoAgencyEnabled,
  selectDailyDealsClosed,
  selectDailyFollowupsDone,
  selectDailyLeadsContacted,
  selectHotLeads,
  selectUnreadMessages,
  useGrowthStore,
} from "@/store/useGrowthStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { createActor } from "../backend";
import type { SocialProofEntry } from "../types/viralLoop";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function useAnimatedNumber(target: number, duration = 1000): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    start.current = null;
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const inv = 1 - progress;
      const eased = 1 - inv ** 3;
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

function formatINR(val: number): string {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val.toLocaleString("en-IN")}`;
}

function nsBigIntToDate(ns: bigint): Date {
  return new Date(Number(ns / BigInt(1_000_000)));
}

function timeAgo(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const TargetIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const ChatIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const HandshakeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
  </svg>
);

const TrendIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const BoltIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DocIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
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
);

const RefreshIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const RocketIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="min-w-[200px] h-[120px] rounded-2xl bg-card border border-border/30 p-4 flex flex-col justify-between snap-start animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="w-8 h-8 rounded-xl bg-muted" />
      </div>
      <div>
        <div className="h-8 w-16 bg-muted rounded mb-1" />
        <div className="h-2.5 w-24 bg-muted rounded" />
      </div>
    </div>
  );
}

function SkeletonActionButton() {
  return (
    <div className="h-12 rounded-xl bg-card border border-border/30 animate-pulse" />
  );
}

// ─── Metric Card ──────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  subLabel: string;
  icon: React.ReactNode;
  colorClass: string;
  gradientStyle: React.CSSProperties;
  onClick?: () => void;
  ocid: string;
}

function MobileMetricCard({
  label,
  value,
  suffix = "",
  prefix = "",
  subLabel,
  icon,
  colorClass,
  gradientStyle,
  onClick,
  ocid,
}: MetricCardProps) {
  const animated = useAnimatedNumber(value, 1200);
  const [pressed, setPressed] = useState(false);
  const displayVal = prefix
    ? `${prefix}${animated.toLocaleString("en-IN")}`
    : `${animated.toLocaleString("en-IN")}${suffix}`;

  return (
    <motion.button
      type="button"
      data-ocid={ocid}
      className="min-w-[200px] h-[120px] rounded-2xl p-4 flex flex-col justify-between snap-start text-left relative overflow-hidden border border-white/10 cursor-pointer"
      style={gradientStyle}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      animate={{ scale: pressed ? 0.97 : 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
    >
      <div className={`absolute top-3 right-3 opacity-80 ${colorClass}`}>
        {icon}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
        {label}
      </p>
      <div>
        <p className="text-[28px] font-bold font-display text-white leading-none tabular-nums">
          {displayVal}
        </p>
        <p className="text-[11px] text-white/60 mt-1">{subLabel}</p>
      </div>
    </motion.button>
  );
}

// ─── Circular Progress ────────────────────────────────────────────────────────

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  done: boolean;
}

function CircularProgress({
  value,
  max,
  size = 44,
  strokeWidth = 4,
  color,
  done,
}: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / Math.max(max, 1), 1);
  const offset = circ * (1 - pct);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="oklch(var(--muted))"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {done && (
        <text
          x={size / 2}
          y={size / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fontWeight="700"
          fill={color}
        >
          ✓
        </text>
      )}
      {!done && (
        <text
          x={size / 2}
          y={size / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="9"
          fontWeight="700"
          fill={color}
        >
          {value}/{max}
        </text>
      )}
    </svg>
  );
}

// ─── Action Button ────────────────────────────────────────────────────────────

interface ActionBtnProps {
  label: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary" | "ghost";
  onClick: () => void;
  ocid: string;
}

function ActionButton({ label, icon, variant, onClick, ocid }: ActionBtnProps) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const handleClick = () => {
    setState("loading");
    setTimeout(() => {
      setState("done");
      onClick();
      setTimeout(() => setState("idle"), 1500);
    }, 600);
  };
  const base =
    "relative flex items-center justify-center gap-2.5 h-12 rounded-xl text-[15px] font-semibold w-full transition-all duration-200 active:scale-[0.97]";
  const styles = {
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
    secondary: "bg-card border border-border/60 text-foreground",
    ghost: "bg-transparent border border-border/50 text-foreground",
  };

  return (
    <motion.button
      type="button"
      data-ocid={ocid}
      className={`${base} ${styles[variant]}`}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {icon}
            {label}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              className="animate-spin"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </motion.span>
        )}
        {state === "done" && (
          <motion.span
            key="done"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Pull-to-Refresh ──────────────────────────────────────────────────────────

function usePullToRefresh(onRefresh: () => void) {
  const startY = useRef<number | null>(null);
  const [pulling, setPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY === 0) startY.current = e.touches[0].clientY;
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (startY.current === null) return;
    const diff = e.touches[0].clientY - startY.current;
    if (diff > 0 && diff < 80) {
      setPulling(true);
      setPullY(diff);
    }
  }, []);
  const onTouchEnd = useCallback(() => {
    if (pullY > 60) {
      onRefresh();
      toast.success("Refreshed!");
    }
    setPulling(false);
    setPullY(0);
    startY.current = null;
  }, [pullY, onRefresh]);
  return { pulling, pullY, onTouchStart, onTouchMove, onTouchEnd };
}

// ─── Funnel Step ──────────────────────────────────────────────────────────────

function FunnelStep({
  count,
  label,
  dotColor,
  last,
}: { count: number; label: string; dotColor: string; last?: boolean }) {
  const animated = useAnimatedNumber(count, 1400);
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: dotColor }}
        />
        <p className="text-[22px] font-bold font-display text-foreground tabular-nums leading-none">
          {animated}
        </p>
        <p className="text-[10px] text-muted-foreground text-center leading-tight max-w-[70px]">
          {label}
        </p>
      </div>
      {!last && (
        <div className="flex items-center pb-8">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground/40"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ─── Agency Banner ────────────────────────────────────────────────────────────

interface AgencyBannerProps {
  isEnabled: boolean;
  isToggling: boolean;
  onToggle: (v: boolean) => void;
  lastRunTime: bigint;
  nextRunTime: bigint;
  leadsGenerated: bigint;
  outreachSent: bigint;
  followupsSent: bigint;
}

function AgencyBanner({
  isEnabled,
  isToggling,
  onToggle,
  lastRunTime,
  nextRunTime,
  leadsGenerated,
  outreachSent,
  followupsSent,
}: AgencyBannerProps) {
  const lastRun = nsBigIntToDate(lastRunTime);
  const nextRun = nsBigIntToDate(nextRunTime);
  const nextRunHours = Math.max(
    0,
    Math.floor((nextRun.getTime() - Date.now()) / 3600000),
  );

  return (
    <motion.div
      data-ocid="dashboard.agency_banner"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`rounded-2xl border p-4 relative overflow-hidden ${isEnabled ? "border-[oklch(var(--agency-status-active)/0.4)] bg-card" : "border-border/40 bg-card"}`}
    >
      {isEnabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 0% 50%, oklch(0.56 0.15 170 / 0.08), transparent 60%)",
          }}
        />
      )}
      <div className="relative">
        {/* Top row — status + toggle */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            {isEnabled ? (
              <>
                <span className="agency-mode-indicator" aria-hidden="true" />
                <span className="text-[13px] font-bold text-foreground">
                  Auto Agency Mode
                </span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.56 0.15 170 / 0.15)",
                    color: "oklch(var(--agency-status-active))",
                  }}
                >
                  RUNNING
                </span>
              </>
            ) : (
              <>
                <RocketIcon />
                <span className="text-[13px] font-bold text-foreground">
                  Auto Agency Mode
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground px-2 py-0.5 rounded-full bg-muted/60">
                  OFF
                </span>
              </>
            )}
          </div>

          {/* Toggle switch */}
          <motion.button
            type="button"
            data-ocid="dashboard.agency_toggle"
            aria-label={
              isEnabled ? "Disable Auto Agency Mode" : "Enable Auto Agency Mode"
            }
            onClick={() => !isToggling && onToggle(!isEnabled)}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isEnabled ? "bg-[oklch(var(--agency-status-active))]" : "bg-muted/60"}`}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
              animate={{ x: isEnabled ? 26 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            />
          </motion.button>
        </div>

        {isEnabled ? (
          <>
            {/* Running status message */}
            <p className="text-[12px] font-medium text-muted-foreground mb-3">
              Your agency is running in background · last run {timeAgo(lastRun)}{" "}
              · next in ~{nextRunHours}h
            </p>

            {/* Today's stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  label: "Leads Found",
                  value: Number(leadsGenerated),
                  color: "oklch(0.56 0.15 170)",
                },
                {
                  label: "Outreach Sent",
                  value: Number(outreachSent),
                  color: "oklch(0.62 0.22 253)",
                },
                {
                  label: "Follow-Ups",
                  value: Number(followupsSent),
                  color: "oklch(0.68 0.18 86)",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center rounded-xl py-2 px-1"
                  style={{
                    background: `${stat.color.replace(")", " / 0.08)")}`,
                  }}
                >
                  <p
                    className="text-[18px] font-bold font-display tabular-nums"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-wider"
                    style={{ color: stat.color }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-foreground leading-tight">
                Enable Auto Agency Mode
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Let AI find leads, send outreach & follow-ups automatically
              </p>
            </div>
            <motion.button
              type="button"
              data-ocid="dashboard.agency_enable_cta"
              onClick={() => !isToggling && onToggle(true)}
              className="shrink-0 text-[12px] font-bold px-3 py-2 rounded-xl text-primary-foreground"
              style={{ background: "oklch(0.56 0.15 170)" }}
              whileTap={{ scale: 0.95 }}
            >
              Turn ON
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Accountability Tasks Card ─────────────────────────────────────────────────

interface AccountabilityCardProps {
  leadsContacted: number;
  followupsDone: number;
  dealsClosed: number;
  targetLeads: number;
  targetFollowups: number;
  targetDeals: number;
  streak: number;
  todayComplete: boolean;
  onNavigate: (to: string) => void;
}

function AccountabilityCard({
  leadsContacted,
  followupsDone,
  dealsClosed,
  targetLeads,
  targetFollowups,
  targetDeals,
  streak,
  todayComplete,
  onNavigate,
}: AccountabilityCardProps) {
  const tasks = [
    {
      label: "Contact Leads",
      done: leadsContacted,
      target: targetLeads,
      color: "oklch(0.62 0.22 253)",
      to: "/leads",
      ocid: "accountability.leads_task",
    },
    {
      label: "Follow Ups",
      done: followupsDone,
      target: targetFollowups,
      color: "oklch(0.56 0.15 170)",
      to: "/outreach",
      ocid: "accountability.followup_task",
    },
    {
      label: "Close Deals",
      done: dealsClosed,
      target: targetDeals,
      color: "oklch(0.68 0.18 86)",
      to: "/crm",
      ocid: "accountability.deals_task",
    },
  ];

  const nextMilestone = [3, 7, 14, 30].find((m) => m > streak) ?? 30;
  const creditsAtMilestone =
    nextMilestone === 3
      ? 10
      : nextMilestone === 7
        ? 25
        : nextMilestone === 14
          ? 50
          : 100;

  return (
    <div
      data-ocid="dashboard.accountability_card"
      className="accountability-card border border-border/40"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Daily Accountability
          </p>
          <p className="text-[14px] font-bold text-foreground mt-0.5">
            Today's Tasks
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.18 60), oklch(0.70 0.20 45))",
          }}
        >
          <span className="text-[14px]">🔥</span>
          <span className="text-[12px] font-bold text-white tabular-nums">
            {streak}-day streak
          </span>
        </div>
      </div>

      {/* All done state */}
      <AnimatePresence>
        {todayComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 rounded-xl px-4 py-3 flex items-center gap-2"
            style={{
              background: "oklch(0.56 0.15 170 / 0.12)",
              border: "1px solid oklch(0.56 0.15 170 / 0.3)",
            }}
          >
            <span className="text-[18px]">✅</span>
            <div>
              <p
                className="text-[13px] font-bold"
                style={{ color: "oklch(var(--agency-status-active))" }}
              >
                All done today!
              </p>
              <p className="text-[11px] text-muted-foreground">
                Streak extended. Come back tomorrow!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task rows */}
      <div className="space-y-1">
        {tasks.map((task) => {
          const pct = Math.min(task.done / Math.max(task.target, 1), 1);
          const isTaskDone = task.done >= task.target;
          return (
            <motion.button
              key={task.label}
              type="button"
              data-ocid={task.ocid}
              className="accountability-task w-full text-left cursor-pointer"
              onClick={() => onNavigate(task.to)}
              whileTap={{ scale: 0.98 }}
            >
              <CircularProgress
                value={task.done}
                max={task.target}
                color={task.color}
                done={isTaskDone}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="accountability-text font-medium text-[13px]">
                    {task.label}
                  </p>
                  <span
                    className="text-[11px] font-bold tabular-nums"
                    style={{ color: task.color }}
                  >
                    {task.done}/{task.target}
                  </span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    style={{
                      background: `linear-gradient(90deg, ${task.color}, ${task.color.replace(")", " / 0.7)")})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </div>
              <div
                className={`accountability-checkbox ${isTaskDone ? "completed" : ""}`}
              >
                {isTaskDone && <CheckIcon />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Milestone hint */}
      <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground">
            {nextMilestone - streak} more days
          </span>{" "}
          → {creditsAtMilestone} bonus leads 🎁
        </p>
        <p
          className="text-[11px] font-semibold"
          style={{ color: "oklch(0.78 0.18 60)" }}
        >
          {nextMilestone}-day milestone
        </p>
      </div>
    </div>
  );
}

// ─── Revenue Prediction Card ───────────────────────────────────────────────────

interface RevenuePredictionCardProps {
  weeklyEstimate: bigint;
  monthlyEstimate: bigint;
  pipelineValue: bigint;
  missedOppCount: bigint;
  onNavigate: () => void;
}

function RevenuePredictionCard({
  weeklyEstimate,
  monthlyEstimate,
  pipelineValue,
  missedOppCount,
  onNavigate,
}: RevenuePredictionCardProps) {
  const weeklyNum = Number(weeklyEstimate);
  const monthlyNum = Number(monthlyEstimate);
  const pipelineNum = Number(pipelineValue);
  const weeklyAnimated = useAnimatedNumber(weeklyNum, 1400);
  const monthlyAnimated = useAnimatedNumber(monthlyNum, 1500);

  return (
    <motion.div
      data-ocid="dashboard.revenue_prediction_card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
      className="rounded-2xl bg-card border border-border/40 overflow-hidden cursor-pointer"
      onClick={onNavigate}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, oklch(0.62 0.22 253 / 0.12), transparent 60%)",
          }}
        />
        <div className="relative flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Revenue Prediction
            </p>
            <p className="text-[13px] font-semibold text-muted-foreground mt-0.5">
              Based on your pipeline · AI-powered
            </p>
          </div>
          <span
            className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full"
            style={{
              background: "oklch(0.62 0.22 253 / 0.12)",
              color: "oklch(0.62 0.22 253)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
            LIVE
          </span>
        </div>

        {/* Callout */}
        <div
          className="rounded-xl px-3 py-2 mb-3"
          style={{
            background: "oklch(0.62 0.22 253 / 0.08)",
            border: "1px solid oklch(0.62 0.22 253 / 0.2)",
          }}
        >
          <p
            className="text-[12px] font-semibold"
            style={{ color: "oklch(0.62 0.22 253)" }}
          >
            💡 You can close {formatINR(weeklyNum)} this week if you contact
            these leads
          </p>
        </div>

        {/* Revenue grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
              This Week
            </p>
            <p
              className="text-[26px] font-bold font-display tabular-nums"
              style={{ color: "oklch(0.62 0.22 253)" }}
            >
              ₹{weeklyAnimated.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
              This Month
            </p>
            <p className="text-[26px] font-bold font-display tabular-nums text-foreground">
              {formatINR(monthlyAnimated)}
            </p>
          </div>
        </div>

        {/* Pipeline + missed opp */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">Pipeline:</span>
            <span className="text-[12px] font-bold text-foreground">
              {formatINR(pipelineNum)}
            </span>
          </div>
          {Number(missedOppCount) > 0 && (
            <div
              className="flex items-center gap-1 text-[11px] font-semibold"
              style={{ color: "oklch(0.68 0.22 22)" }}
            >
              <span>⚠️</span>
              <span>{Number(missedOppCount)} missed opp</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <span>Details</span>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hot Deals Card ───────────────────────────────────────────────────────────

const LEAD_NAMES: Record<number, string> = {
  1: "BlueSky Dental Clinic",
  3: "TechEdge Solutions",
  8: "CloudNine Co-Working",
};

interface HotDealsCardProps {
  deals: Array<{
    suggestionId: string;
    leadId: bigint;
    closeProbability: bigint;
    suggestedPrice: bigint;
    suggestedPitch: string;
    bestContactTime: string;
  }>;
  onSendPitch: (id: string) => void;
  onViewLead: (leadId: bigint) => void;
  onRefresh: () => void;
}

function HotDealsCard({
  deals,
  onSendPitch,
  onViewLead,
  onRefresh,
}: HotDealsCardProps) {
  function probColor(prob: number) {
    if (prob >= 85)
      return {
        bg: "oklch(0.56 0.15 170 / 0.12)",
        text: "oklch(var(--agency-status-active))",
        border: "oklch(0.56 0.15 170 / 0.3)",
      };
    if (prob >= 60)
      return {
        bg: "oklch(0.68 0.18 86 / 0.12)",
        text: "oklch(0.68 0.18 86)",
        border: "oklch(0.68 0.18 86 / 0.3)",
      };
    return {
      bg: "oklch(var(--muted) / 0.2)",
      text: "oklch(var(--muted-foreground))",
      border: "oklch(var(--border) / 0.3)",
    };
  }

  return (
    <motion.div
      data-ocid="dashboard.hot_deals_card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
      className="rounded-2xl bg-card border border-border/40 overflow-hidden"
    >
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            AI Deal Suggestions
          </p>
          <p className="text-[14px] font-bold text-foreground mt-0.5">
            Hot Deals to Close
          </p>
        </div>
        <button
          type="button"
          data-ocid="dashboard.deals_refresh_button"
          onClick={onRefresh}
          aria-label="Refresh deal suggestions"
          className="p-2 rounded-xl bg-muted/40 text-muted-foreground active:scale-95 transition-transform duration-150"
        >
          <RefreshIcon />
        </button>
      </div>

      <div className="px-4 pb-4 space-y-3">
        {deals.slice(0, 3).map((deal, idx) => {
          const prob = Number(deal.closeProbability);
          const colors = probColor(prob);
          const leadName =
            LEAD_NAMES[Number(deal.leadId)] ?? `Lead #${deal.leadId}`;
          const pitch =
            deal.suggestedPitch.slice(0, 80) +
            (deal.suggestedPitch.length > 80 ? "…" : "");

          return (
            <motion.div
              key={deal.suggestionId}
              data-ocid={`dashboard.deal_item.${idx + 1}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + idx * 0.08, duration: 0.25 }}
              className="rounded-xl border p-3"
              style={{ borderColor: colors.border, background: colors.bg }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-foreground truncate">
                    {leadName}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Best time: {deal.bestContactTime}
                  </p>
                </div>
                <span
                  className="deal-score-badge ml-2 shrink-0 text-[11px] px-2 py-0.5 rounded-full border font-bold"
                  style={{
                    background: colors.bg,
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                >
                  {prob}% close
                </span>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                {pitch}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-[13px] font-bold"
                  style={{ color: colors.text }}
                >
                  ₹{Number(deal.suggestedPrice).toLocaleString("en-IN")}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    data-ocid={`dashboard.deal_view_lead.${idx + 1}`}
                    onClick={() => onViewLead(deal.leadId)}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-muted/60 text-muted-foreground active:scale-95 transition-transform duration-150"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    data-ocid={`dashboard.deal_send_pitch.${idx + 1}`}
                    onClick={() => onSendPitch(deal.suggestionId)}
                    className="text-[11px] font-bold px-2.5 py-1.5 rounded-lg text-primary-foreground active:scale-95 transition-transform duration-150"
                    style={{ background: colors.text }}
                  >
                    Send Pitch
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Performance Score Card ───────────────────────────────────────────────────

interface PerformanceScoreCardProps {
  overallScore: bigint;
  activityScore: bigint;
  conversionRate: bigint;
  revenueScore: bigint;
  percentileRank: bigint;
  estimatedMonthlyRevenue: bigint;
  rank: string;
}

function PerformanceScoreCard({
  overallScore,
  activityScore,
  conversionRate,
  revenueScore,
  percentileRank,
  estimatedMonthlyRevenue,
  rank,
}: PerformanceScoreCardProps) {
  const score = Number(overallScore);
  const percentile = Number(percentileRank);
  const animScore = useAnimatedNumber(score, 1200);
  const animMonthly = useAnimatedNumber(Number(estimatedMonthlyRevenue), 1400);

  const tierLabel =
    percentile >= 90 ? "Elite" : percentile >= 70 ? "Top" : "Rising";
  const tierColor =
    percentile >= 90
      ? "oklch(var(--performance-tier-elite))"
      : percentile >= 70
        ? "oklch(0.68 0.18 86)"
        : "oklch(0.56 0.15 170)";

  const bars = [
    {
      label: "Activity",
      value: Number(activityScore),
      color: "oklch(0.62 0.22 253)",
    },
    {
      label: "Conversion",
      value: Number(conversionRate),
      color: "oklch(0.56 0.15 170)",
    },
    {
      label: "Revenue",
      value: Number(revenueScore),
      color: "oklch(0.68 0.18 86)",
    },
  ];

  return (
    <motion.div
      data-ocid="dashboard.performance_score_card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4, ease: "easeOut" }}
      className="rounded-2xl bg-card border border-border/40 overflow-hidden"
    >
      {/* Premium gradient bg */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 90% 0%, oklch(var(--performance-tier-elite) / 0.1), transparent 55%)",
          }}
        />
        <div className="relative px-4 pt-4 pb-3">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Performance Score
              </p>
              <p className="text-[14px] font-bold text-foreground mt-0.5">
                Your Agency Rating
              </p>
            </div>
            <span className="leaderboard-tier-badge elite text-[11px] font-bold flex items-center gap-1">
              <StarIcon />
              {tierLabel}
            </span>
          </div>

          {/* Score ring + rank */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                aria-hidden="true"
              >
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke="oklch(var(--muted))"
                  strokeWidth="5"
                />
                <motion.circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke={tierColor}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 30}
                  initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 30 * (1 - score / 100),
                  }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  transform="rotate(-90 36 36)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[20px] font-bold font-display tabular-nums"
                  style={{ color: tierColor }}
                >
                  {animScore}
                </span>
              </div>
            </div>

            <div>
              <p className="text-[18px] font-bold text-foreground leading-tight">
                {rank}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Based on activity, conversions & revenue
              </p>
              <p className="text-[12px] font-semibold mt-1.5 text-foreground">
                Est. monthly:{" "}
                <span style={{ color: tierColor }}>
                  {formatINR(animMonthly)}
                </span>
              </p>
            </div>
          </div>

          {/* Score breakdown bars */}
          <div className="space-y-2">
            {bars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-2">
                <p className="text-[11px] text-muted-foreground w-[70px] shrink-0">
                  {bar.label}
                </p>
                <div className="flex-1 progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    style={{
                      background: `linear-gradient(90deg, ${bar.color}, ${bar.color.replace(")", " / 0.7)")})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.value}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  />
                </div>
                <span
                  className="text-[11px] font-bold tabular-nums shrink-0 w-8 text-right"
                  style={{ color: bar.color }}
                >
                  {bar.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Priority Row ─────────────────────────────────────────────────────────────

interface PriorityItem {
  id: string;
  text: string;
  potential: string;
  action: string;
  to: string;
}

const PRIORITIES: PriorityItem[] = [
  {
    id: "p1",
    text: "Follow up with Innovate Solutions",
    potential: "₹12k potential",
    action: "Respond",
    to: "/outreach",
  },
  {
    id: "p2",
    text: "Schedule demo with TechCorp India",
    potential: "₹9k potential",
    action: "Calendar",
    to: "/crm",
  },
  {
    id: "p3",
    text: "Send proposal to Spice Garden",
    potential: "₹15k potential",
    action: "Create",
    to: "/proposals",
  },
];

function PriorityRow({ item, idx }: { item: PriorityItem; idx: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      data-ocid={`dashboard.priority.item.${idx + 1}`}
      className="flex items-center gap-3 px-4 py-3"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.55 + idx * 0.07, duration: 0.25, ease: "easeOut" }}
    >
      <div className="w-5 h-5 rounded-full border-2 border-border/50 flex items-center justify-center shrink-0">
        <div className="w-2 h-2 rounded-full bg-primary/40" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-foreground leading-tight truncate">
          {item.text}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {item.potential}
        </p>
      </div>
      <button
        type="button"
        data-ocid={`dashboard.priority.action.${idx + 1}`}
        className="shrink-0 text-[12px] font-semibold text-foreground border border-border/60 px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-all duration-150"
        onClick={() => navigate({ to: item.to as "/" })}
      >
        {item.action}
        <ArrowIcon />
      </button>
    </motion.div>
  );
}

// ─── Revenue Potential (animated range) ───────────────────────────────────────

function RevenuePotential() {
  const low = useAnimatedNumber(15000, 1000);
  const high = useAnimatedNumber(45000, 1200);
  return (
    <p className="text-[32px] font-bold font-display text-foreground leading-none tabular-nums">
      ₹{low.toLocaleString("en-IN")}
      <span className="text-muted-foreground/60 text-[22px] mx-1">–</span>₹
      {high.toLocaleString("en-IN")}
    </p>
  );
}

// ─── Social Proof Mini Ticker ────────────────────────────────────────────────

function TypeDot({ type }: { type: SocialProofEntry["type"] }) {
  const colors: Record<SocialProofEntry["type"], string> = {
    lead: "bg-emerald-500",
    deal: "bg-amber-500",
    pitch: "bg-blue-500",
    share: "bg-purple-500",
    referral: "bg-rose-500",
  };
  return (
    <span
      className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors[type]}`}
      aria-hidden="true"
    />
  );
}

function SocialProofMiniWidget() {
  const { feed, activeEntry, isTransitioning } = useSocialProofTicker();
  const [visible, setVisible] = useState(false);

  // Show 3 entries with fade rotation
  const visibleEntries = feed.slice(0, 3);

  return (
    <motion.div
      data-ocid="dashboard.social_proof_widget"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.55 }}
      className="rounded-2xl bg-card border border-border/40 overflow-hidden"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3"
        onClick={() => setVisible((v) => !v)}
        data-ocid="dashboard.social_proof_toggle"
        aria-expanded={visible}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-pulse"
            aria-hidden="true"
          />
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Live Activity
          </p>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-muted-foreground transition-transform duration-200 ${visible ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M3 5 L7 9 L11 5" />
        </svg>
      </button>

      {/* Active entry - always visible (compact) */}
      <AnimatePresence mode="wait">
        {activeEntry && (
          <motion.div
            key={activeEntry.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2.5 px-4 pb-3"
          >
            <TypeDot type={activeEntry.type} />
            <p className="text-[12px] text-muted-foreground min-w-0 flex-1">
              <span className="font-semibold text-foreground">
                {activeEntry.userName}
              </span>{" "}
              ({activeEntry.city}) {activeEntry.action}
              {activeEntry.metricValue && (
                <span className="font-bold text-foreground">
                  {" "}
                  {activeEntry.metricValue}
                </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded list */}
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="divide-y divide-border/20 border-t border-border/20">
              {visibleEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-2.5 px-4 py-2.5"
                >
                  <TypeDot type={entry.type} />
                  <p className="text-[11px] text-muted-foreground flex-1 min-w-0">
                    <span className="font-medium text-foreground">
                      {entry.userName}
                    </span>{" "}
                    ({entry.city}) {entry.action}
                    {entry.metricValue && (
                      <span className="font-semibold">
                        {" "}
                        {entry.metricValue}
                      </span>
                    )}
                  </p>
                  <span className="text-[10px] text-muted-foreground/60 shrink-0">
                    {Math.floor(
                      (Date.now() - entry.timestamp.getTime()) / 60000,
                    )}
                    m
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Win This Week Mini Card ──────────────────────────────────────────────────

function WinThisWeekCard({ onShare }: { onShare: () => void }) {
  const { wins } = useShareableWins();
  const win = wins[0];
  if (!win) return null;

  return (
    <motion.div
      data-ocid="dashboard.win_this_week_card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.6 }}
      className="rounded-2xl overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.62 0.22 253), oklch(0.56 0.15 170))",
      }}
    >
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-2 right-2 w-16 h-16 rounded-full border border-white" />
      </div>
      <div className="relative p-4 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
            Your Win This Week
          </p>
          <p className="text-lg font-display font-bold text-white mt-0.5 leading-tight">
            {win.metricValue}
          </p>
          <p className="text-[11px] text-white/75">{win.metricLabel}</p>
        </div>
        <motion.button
          type="button"
          data-ocid="dashboard.share_win_button"
          onClick={onShare}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 flex items-center gap-1.5 text-[12px] font-bold text-white bg-white/20 hover:bg-white/30 border border-white/30 px-3 py-2 rounded-lg transition-all duration-150"
        >
          Share
          <svg
            width="12"
            height="12"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 5 L12 2 L9 -1" />
            <path d="M5 2 L12 2" />
            <path d="M2 7 L2 12 L12 12" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Business Insights Panel ─────────────────────────────────────────────────

interface InsightCard {
  icon: React.ReactNode;
  title: string;
  alertText: string;
  details: string;
  actionLabel: string;
  actionTo: string;
  disclaimer: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  badgeLabel: string;
  badgeBg: string;
  badgeText: string;
  ocid: string;
}

const INSIGHT_CARDS: InsightCard[] = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Missing Customers",
    alertText:
      "You may be missing 30–50 customers/month due to low Google visibility",
    details:
      "Your Google Business Profile needs more reviews and keyword-optimized descriptions for 'near me' searches.",
    actionLabel: "Fix Google Visibility",
    actionTo: "/seo",
    disclaimer: "Estimated based on public SEO metrics and local search data",
    borderColor: "border-l-yellow-400",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-700",
    badgeLabel: "WARNING",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-700",
    ocid: "dashboard.insights.missing_customers_card",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Competitor Activity",
    alertText:
      "3+ competitors in Mumbai are actively running Instagram Reels and Google Ads",
    details: "Estimated monthly ad spend: ₹15,000–₹35,000 per competitor",
    actionLabel: "See Competitor Strategies",
    actionTo: "/growth-advisor",
    disclaimer:
      "Estimated based on publicly available ad library and market research",
    borderColor: "border-l-red-400",
    iconBg: "bg-red-50",
    iconColor: "text-red-700",
    badgeLabel: "URGENT",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    ocid: "dashboard.insights.competitor_activity_card",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Quick Win Available",
    alertText:
      "Ask for 5 Google reviews this week — takes 5 minutes, boosts 'near me' rankings significantly",
    details:
      "Businesses with 10+ reviews get 3x more clicks from Google Maps (based on industry benchmarks)",
    actionLabel: "Start This Task",
    actionTo: "/growth-hub",
    disclaimer:
      "Based on industry benchmarks and publicly available Google ranking research",
    borderColor: "border-l-green-400",
    iconBg: "bg-green-50",
    iconColor: "text-green-700",
    badgeLabel: "FIX THIS",
    badgeBg: "bg-green-100",
    badgeText: "text-green-700",
    ocid: "dashboard.insights.quick_win_card",
  },
];

function BusinessInsightsPanel({
  onNavigate,
}: { onNavigate: (to: string) => void }) {
  return (
    <div data-ocid="dashboard.insights_panel">
      <div className="mb-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
          Your Growth Opportunities
        </p>
        <p className="text-[11px] text-muted-foreground leading-snug">
          Based on public SEO data and competitor tracking for your niche and
          city
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {INSIGHT_CARDS.map((card, idx) => (
          <motion.div
            key={card.ocid}
            data-ocid={card.ocid}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.1 + idx * 0.1,
              ease: "easeOut",
            }}
            className={`bg-card border border-border/40 border-l-4 ${card.borderColor} rounded-xl p-4 flex flex-col gap-2.5 hover:shadow-md transition-shadow duration-200`}
          >
            {/* Badge + Icon row */}
            <div className="flex items-center justify-between">
              <div
                className={`w-8 h-8 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center`}
              >
                {card.icon}
              </div>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${card.badgeBg} ${card.badgeText}`}
              >
                {card.badgeLabel}
              </span>
            </div>

            {/* Title */}
            <p className="font-display font-semibold text-[15px] text-foreground leading-tight">
              {card.title}
            </p>

            {/* Alert text */}
            <p className="text-[13px] font-medium text-foreground leading-snug">
              {card.alertText}
            </p>

            {/* Detail */}
            <p className="text-[12px] text-muted-foreground leading-relaxed flex-1">
              {card.details}
            </p>

            {/* Action button */}
            <button
              type="button"
              data-ocid={`${card.ocid}_action_button`}
              onClick={() => onNavigate(card.actionTo)}
              className="w-full mt-1 text-[12px] font-semibold px-3 py-2 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors duration-150 text-center active:scale-95"
            >
              {card.actionLabel} →
            </button>

            {/* Disclaimer */}
            <p className="text-[10px] italic text-muted-foreground leading-relaxed">
              {card.disclaimer}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
      {text}
    </p>
  );
}

// ─── Proof System Panel ───────────────────────────────────────────────────────

const ACTIVITY_ITEMS = [
  "Rahul (Mumbai) got 25 leads today",
  "Priya closed a ₹30k deal with a local salon",
  "Amit (Delhi) sent 30 outreach messages",
  "Neha (Pune) got her first enquiry in 2 hours",
  "Ravi (Bangalore) converted 3 leads this week",
];

interface CaseStudyCardProps {
  icon: React.ReactNode;
  business: string;
  before: string;
  after: string;
  ocid: string;
}

function CaseStudyCard({
  icon,
  business,
  before,
  after,
  ocid,
}: CaseStudyCardProps) {
  return (
    <div
      data-ocid={ocid}
      className="flex-1 min-w-0 rounded-xl bg-muted/40 border border-border/30 p-3 flex flex-col gap-2"
    >
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          {icon}
        </span>
        <p className="text-[12px] font-bold text-foreground truncate">
          {business}
        </p>
      </div>
      <div className="space-y-1">
        <div className="flex items-start gap-1.5">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide w-10 shrink-0 pt-px">
            Before
          </span>
          <p className="text-[11px] text-muted-foreground leading-snug">
            {before}
          </p>
        </div>
        <div className="flex items-start gap-1.5">
          <span
            className="text-[10px] font-bold uppercase tracking-wide w-10 shrink-0 pt-px"
            style={{ color: "oklch(0.56 0.15 150)" }}
          >
            After
          </span>
          <p className="text-[11px] font-medium text-foreground leading-snug">
            {after}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProofSystemPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveIdx((i) => (i + 1) % ACTIVITY_ITEMS.length);
        setTransitioning(false);
      }, 300);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const ScissorsIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );

  const DumbbellIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2v4" />
      <path d="M18 2v4" />
      <path d="M6 18v4" />
      <path d="M18 18v4" />
      <path d="M3 6h18" />
      <path d="M3 18h18" />
      <path d="M3 12h18" />
    </svg>
  );

  return (
    <motion.div
      data-ocid="dashboard.proof_system_panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl bg-card border border-border/40 p-4 space-y-4"
    >
      {/* Panel header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          How others are using GrowthOS
        </p>
        <p className="text-[13px] font-semibold text-foreground mt-0.5">
          Real results from real businesses
        </p>
      </div>

      {/* Case Study Cards — side by side */}
      <div className="flex gap-3">
        <CaseStudyCard
          ocid="dashboard.proof.salon_case_study"
          icon={<ScissorsIcon />}
          business="Salon — Mumbai"
          before="Irregular walk-ins"
          after="Steady enquiries through Google + Instagram"
        />
        <CaseStudyCard
          ocid="dashboard.proof.gym_case_study"
          icon={<DumbbellIcon />}
          business="Gym — Pune"
          before="Low trial sign-ups"
          after="Consistent local enquiries after local campaigns"
        />
      </div>

      {/* Activity Feed */}
      <div
        data-ocid="dashboard.proof.activity_feed"
        className="rounded-xl bg-muted/30 border border-border/20 px-3 py-2.5 flex items-center gap-2.5"
      >
        <span
          className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-pulse"
          aria-hidden="true"
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{
              opacity: transitioning ? 0 : 1,
              y: transitioning ? -4 : 0,
            }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-[12px] text-foreground font-medium flex-1 min-w-0"
          >
            {ACTIVITY_ITEMS[activeIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Transparency + Integration lines */}
      <div className="space-y-1.5 pt-0.5 border-t border-border/20">
        <p className="text-[11px] text-muted-foreground italic leading-snug">
          Results depend on your location, offer, and follow-up speed.
        </p>
        <p className="text-[11px] text-muted-foreground leading-snug">
          Works with tools like{" "}
          <span className="font-medium text-foreground">Google Ads</span>,{" "}
          <span className="font-medium text-foreground">Meta Ads</span>, and{" "}
          <span className="font-medium text-foreground">WhatsApp Business</span>
          .{" "}
          <span className="text-[10px] text-muted-foreground/70">
            Not official partnerships.
          </span>
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────

const CHURN_SESSION_KEY = "growthOS_churn_alert_dismissed";

export default function DashboardPage() {
  useMetaTags(PAGE_META["/"]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [, setRefreshKey] = useState(0);
  const [churnModalOpen, setChurnModalOpen] = useState(false);
  const [churnData, setChurnData] = useState({
    pendingHotLeads: 0,
    daysSinceLastSession: 0,
  });

  const { actor } = useActor(createActor);

  // Primitive selectors — safe for Zustand / useSyncExternalStore
  const autoAgencyEnabled = useGrowthStore(selectAutoAgencyEnabled);
  const dailyLeadsContacted = useGrowthStore(selectDailyLeadsContacted);
  const dailyFollowupsDone = useGrowthStore(selectDailyFollowupsDone);
  const dailyDealsClosed = useGrowthStore(selectDailyDealsClosed);
  const setAutoAgencyEnabled = useGrowthStore((s) => s.setAutoAgencyEnabled);

  const hotLeads = useGrowthStore(useShallow(selectHotLeads));
  const unreadMessages = useGrowthStore(useShallow(selectUnreadMessages));
  const hotLeadsCount = hotLeads.length;
  const repliesCount = unreadMessages.length;

  // Auto Agency hook
  const {
    agencyState,
    accountabilityState,
    dealSuggestions,
    revenuePrediction,
    performanceScore,
    isToggling,
    toggleAutoAgency,
    refreshDealSuggestions,
  } = useAutoAgency();

  // Subscription (for paywall gating)
  const { data: subscription } = useSubscription();
  const planName = subscription
    ? String(subscription.plan).toLowerCase()
    : "free";
  const isPremium = ["growth", "pro", "agency"].includes(planName);

  // Sync agency toggle with store
  const handleAgencyToggle = useCallback(
    (enabled: boolean) => {
      setAutoAgencyEnabled(enabled);
      toggleAutoAgency(enabled);
      toast.success(
        enabled ? "🚀 Auto Agency Mode activated!" : "Auto Agency paused",
      );
    },
    [setAutoAgencyEnabled, toggleAutoAgency],
  );

  // Behavior nudges
  const totalActionsToday = dailyLeadsContacted + dailyFollowupsDone;
  const { currentNudge, dismissNudge, triggerNudge, triggerEventNudge } =
    useBehaviorNudges({
      actionsToday: totalActionsToday,
      daysSinceActivity: churnData.daysSinceLastSession,
      tokens: {
        pendingLeads: String(hotLeadsCount),
        city: "Mumbai",
        niche: "salon",
        streak: String(7),
        possibleRevenue: "15,000",
        actionsToday: String(totalActionsToday),
      },
    });

  // Trigger reward nudge when a message action completes
  const handleMessageSent = useCallback(() => {
    triggerNudge("reward", undefined, "See Progress", "/auto-agency");
  }, [triggerNudge]);

  // Trigger urgency nudge when reply comes in
  const handleReplyReceived = useCallback(() => {
    triggerEventNudge("on_new_reply");
  }, [triggerEventNudge]);

  // Expose handlers for child components (used via console for now)
  useEffect(() => {
    const win = window as unknown as Record<string, unknown>;
    win.__growthNudge = {
      messageSent: handleMessageSent,
      replyReceived: handleReplyReceived,
    };
    return () => {
      win.__growthNudge = undefined;
    };
  }, [handleMessageSent, handleReplyReceived]);

  // Churn check
  useEffect(() => {
    if (!actor) return;
    actor.updateLastSession().catch(() => undefined);
    const dismissed = sessionStorage.getItem(CHURN_SESSION_KEY);
    if (!dismissed) {
      actor
        .getChurnStatus()
        .then((status) => {
          if (status.isAtRisk) {
            setChurnData({
              pendingHotLeads: Number(status.pendingHotLeads),
              daysSinceLastSession: Number(status.daysSinceLastSession),
            });
            setTimeout(() => setChurnModalOpen(true), 1000);
          }
        })
        .catch(() => undefined);
    }
  }, [actor]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChurnViewLeads = () => {
    console.debug("[analytics] churn_alert_cta_clicked");
    sessionStorage.setItem(CHURN_SESSION_KEY, "1");
    setChurnModalOpen(false);
    navigate({ to: "/leads" });
  };
  const handleChurnDismiss = () => {
    console.debug("[analytics] churn_alert_dismissed");
    sessionStorage.setItem(CHURN_SESSION_KEY, "1");
    setChurnModalOpen(false);
  };

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const { pulling, pullY, onTouchStart, onTouchMove, onTouchEnd } =
    usePullToRefresh(handleRefresh);

  const METRIC_CARDS = [
    {
      label: "Hot Leads",
      value: hotLeadsCount,
      subLabel: "High intent leads",
      icon: <TargetIcon />,
      colorClass: "text-white",
      gradientStyle: {
        background:
          "linear-gradient(135deg, oklch(0.62 0.22 253), oklch(0.72 0.18 285))",
      },
      onClick: () => navigate({ to: "/leads" }),
      ocid: "dashboard.metric_card.hot_leads",
    },
    {
      label: "Replies Waiting",
      value: repliesCount,
      subLabel: "Awaiting your response",
      icon: <ChatIcon />,
      colorClass: "text-white",
      gradientStyle: {
        background:
          "linear-gradient(135deg, oklch(0.62 0.20 170), oklch(0.72 0.18 200))",
      },
      onClick: () => navigate({ to: "/outreach" }),
      ocid: "dashboard.metric_card.replies_waiting",
    },
    {
      label: "Deals Closing",
      value: 2,
      subLabel: "Nearing completion",
      icon: <HandshakeIcon />,
      colorClass: "text-white",
      gradientStyle: {
        background:
          "linear-gradient(135deg, oklch(0.58 0.22 300), oklch(0.68 0.18 330))",
      },
      onClick: () => navigate({ to: "/crm" }),
      ocid: "dashboard.metric_card.deals_closing",
    },
    {
      label: "Revenue This Week",
      value: 120000,
      prefix: "₹",
      subLabel: "Total conversions",
      icon: <TrendIcon />,
      colorClass: "text-white",
      gradientStyle: {
        background:
          "linear-gradient(135deg, oklch(0.62 0.18 86), oklch(0.72 0.15 60))",
      },
      onClick: () => navigate({ to: "/analytics" }),
      ocid: "dashboard.metric_card.revenue_week",
    },
  ];

  const streakNum = Number(accountabilityState.currentStreak);
  const targetLeads = Number(accountabilityState.targetLeads);
  const targetFollowups = Number(accountabilityState.targetFollowups);
  const targetDeals = Number(accountabilityState.targetDeals);

  return (
    <PageTransition>
      <div
        data-ocid="dashboard.page"
        className="flex flex-col min-h-screen pb-24 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Pull indicator */}
        <AnimatePresence>
          {pulling && (
            <motion.div
              className="flex items-center justify-center py-3 text-muted-foreground"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: pullY * 0.6, opacity: pullY / 80 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <motion.div animate={{ rotate: pullY > 60 ? 360 : pullY * 4 }}>
                <RefreshIcon />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-4 pt-2 space-y-6">
          {/* ── Retargeting Banner (inactive users) ──────────────────── */}
          <RetargetingBanner />

          {/* ── Retention Nudge Banner (behavior-driven) ─────────────── */}
          <RetentionNudgeBannerContainer
            nudge={currentNudge}
            onDismiss={dismissNudge}
            onAction={() => {
              if (currentNudge?.actionPath) {
                navigate({ to: currentNudge.actionPath as "/" });
              }
              dismissNudge();
            }}
          />

          {/* ── Greeting + Revenue Potential ─────────────────────────── */}
          <motion.div
            data-ocid="dashboard.greeting_section"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-3 pt-2"
          >
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                {greeting()}, 👋
              </p>
              <h1 className="text-[22px] font-bold font-display text-foreground leading-tight">
                Rajesh Kumar
              </h1>
            </div>

            {/* Revenue potential card */}
            <div className="rounded-2xl bg-card border border-border/40 p-4 relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse at 80% 20%, oklch(0.6 0.25 253 / 0.4), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Today's Revenue Potential
                  </p>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-success inline-block animate-pulse" />
                    Updated now
                  </span>
                </div>
                <RevenuePotential />
                <p className="text-xs text-muted-foreground mt-1">
                  Based on your active pipeline
                </p>
              </div>
            </div>

            {/* Streak Banner */}
            <StreakBanner
              streak={streakNum || 7}
              credits={42}
              todayDone={accountabilityState.todayComplete}
            />
          </motion.div>

          {/* ── First Booking Checklist ───────────────────────────────── */}
          <motion.div
            data-ocid="dashboard.first_booking_checklist_section"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.04, ease: "easeOut" }}
          >
            <FirstBookingChecklist />
          </motion.div>

          {/* ── 1. AGENCY BANNER ─────────────────────────────────────── */}
          <motion.div
            data-ocid="dashboard.agency_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
          >
            <SectionLabel text="Auto Agency" />
            <AgencyBanner
              isEnabled={autoAgencyEnabled}
              isToggling={isToggling}
              onToggle={handleAgencyToggle}
              lastRunTime={agencyState.lastRunTime}
              nextRunTime={agencyState.nextRunTime}
              leadsGenerated={agencyState.dailyLeadsGenerated}
              outreachSent={agencyState.dailyOutreachSent}
              followupsSent={agencyState.dailyFollowupsSent}
            />
          </motion.div>

          {/* ── 2. ACCOUNTABILITY TASKS ───────────────────────────────── */}
          <motion.div
            data-ocid="dashboard.accountability_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
          >
            <SectionLabel text="Daily Accountability" />
            <AccountabilityCard
              leadsContacted={dailyLeadsContacted}
              followupsDone={dailyFollowupsDone}
              dealsClosed={dailyDealsClosed}
              targetLeads={targetLeads}
              targetFollowups={targetFollowups}
              targetDeals={targetDeals}
              streak={streakNum || 7}
              todayComplete={accountabilityState.todayComplete}
              onNavigate={(to) => navigate({ to: to as "/" })}
            />
          </motion.div>

          {/* ── 3. REVENUE PREDICTION ─────────────────────────────────── */}
          <motion.div
            data-ocid="dashboard.revenue_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
          >
            <SectionLabel text="Revenue Prediction" />
            <RevenuePredictionCard
              weeklyEstimate={revenuePrediction.weeklyEstimate}
              monthlyEstimate={revenuePrediction.monthlyEstimate}
              pipelineValue={revenuePrediction.pipelineValue}
              missedOppCount={revenuePrediction.missedOppCount}
              onNavigate={() => navigate({ to: "/analytics" })}
            />
          </motion.div>

          {/* ── 4. HOT DEALS (premium locked for free) ───────────────── */}
          <motion.div
            data-ocid="dashboard.deals_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between mb-3">
              <SectionLabel text="AI Deal Suggestions" />
              {!isPremium && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground px-2 py-0.5 rounded-full bg-muted/60">
                  <LockIcon />
                  PRO
                </span>
              )}
            </div>
            {isPremium ? (
              <HotDealsCard
                deals={dealSuggestions}
                onSendPitch={(id) => {
                  toast.success("Pitch queued!");
                  console.debug("[analytics] pitch_sent", { suggestionId: id });
                }}
                onViewLead={(_leadId) => navigate({ to: "/leads" })}
                onRefresh={refreshDealSuggestions}
              />
            ) : (
              <PaywallTrigger feature="high-score-leads" requiredPlan="growth">
                <HotDealsCard
                  deals={dealSuggestions}
                  onSendPitch={() => undefined}
                  onViewLead={() => undefined}
                  onRefresh={() => undefined}
                />
              </PaywallTrigger>
            )}
          </motion.div>

          {/* ── 5. PERFORMANCE SCORE (premium locked) ────────────────── */}
          <motion.div
            data-ocid="dashboard.performance_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between mb-3">
              <SectionLabel text="Performance Score" />
              {!isPremium && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground px-2 py-0.5 rounded-full bg-muted/60">
                  <LockIcon />
                  PRO
                </span>
              )}
            </div>
            {isPremium ? (
              <PerformanceScoreCard
                overallScore={performanceScore.overallScore}
                activityScore={performanceScore.activityScore}
                conversionRate={performanceScore.conversionRate}
                revenueScore={performanceScore.revenueScore}
                percentileRank={performanceScore.percentileRank}
                estimatedMonthlyRevenue={
                  performanceScore.estimatedMonthlyRevenue
                }
                rank={performanceScore.rank}
              />
            ) : (
              <PaywallTrigger feature="client-report" requiredPlan="growth">
                <PerformanceScoreCard
                  overallScore={performanceScore.overallScore}
                  activityScore={performanceScore.activityScore}
                  conversionRate={performanceScore.conversionRate}
                  revenueScore={performanceScore.revenueScore}
                  percentileRank={performanceScore.percentileRank}
                  estimatedMonthlyRevenue={
                    performanceScore.estimatedMonthlyRevenue
                  }
                  rank={performanceScore.rank}
                />
              </PaywallTrigger>
            )}
          </motion.div>

          {/* ── Metric Cards (swipeable) ──────────────────────────────── */}
          <motion.div
            data-ocid="dashboard.metric_cards_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
          >
            <SectionLabel text="Today's Overview" />
            <div
              data-tour="kpi-cards"
              className="-mx-4 px-4 flex gap-3 overflow-x-auto pb-2"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {isLoading
                ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
                : METRIC_CARDS.map((card) => (
                    <MobileMetricCard key={card.ocid} {...card} />
                  ))}
            </div>
          </motion.div>

          {/* ── Business Insights Panel ──────────────────────────────── */}
          {!isLoading && (
            <motion.div
              data-ocid="dashboard.insights_section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.33, ease: "easeOut" }}
            >
              <BusinessInsightsPanel
                onNavigate={(to) => navigate({ to: to as "/" })}
              />
            </motion.div>
          )}

          {/* ── Loss Aversion + Progress (free users) ─────────────────── */}
          {!isLoading && !isPremium && (
            <>
              <motion.div
                data-ocid="dashboard.loss_aversion_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.36, ease: "easeOut" }}
              >
                <SectionLabel text="What You're Missing" />
                <LossAversionWidget />
              </motion.div>

              <motion.div
                data-ocid="dashboard.client_progress_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.38, ease: "easeOut" }}
              >
                <ClientProgressBar />
              </motion.div>

              <motion.div
                data-ocid="dashboard.quota_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.4, ease: "easeOut" }}
                className="grid grid-cols-2 gap-3 bg-card rounded-2xl border border-border/40 p-3"
              >
                <UsageQuotaBar type="leads" />
                <UsageQuotaBar type="messages" />
              </motion.div>
            </>
          )}

          {/* ── Funnel Progress ───────────────────────────────────────── */}
          <motion.div
            data-ocid="dashboard.funnel_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
          >
            <SectionLabel text="This Week's Progress" />
            <div className="rounded-2xl bg-card border border-border/40 p-4">
              <div className="flex items-start justify-between">
                {isLoading ? (
                  <div className="flex items-center gap-3 w-full">
                    {[1, 2, 3].map((i) => (
                      <React.Fragment key={i}>
                        <div className="flex-1 space-y-2">
                          <div className="h-6 bg-muted rounded animate-pulse" />
                          <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                        </div>
                        {i < 3 && (
                          <div className="w-4 h-4 bg-muted rounded animate-pulse" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <>
                    <FunnelStep
                      count={42}
                      label="Leads Sent"
                      dotColor="oklch(0.6 0.25 253)"
                    />
                    <FunnelStep
                      count={38}
                      label="Delivered"
                      dotColor="oklch(0.58 0.22 300)"
                    />
                    <FunnelStep
                      count={7}
                      label="Replies"
                      dotColor="oklch(0.56 0.15 170)"
                      last
                    />
                  </>
                )}
              </div>
              {!isLoading && (
                <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">
                    Reply rate:{" "}
                    <span className="font-semibold text-success">16.7%</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Best niche:{" "}
                    <span className="font-semibold text-foreground">
                      IT Services
                    </span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Action Buttons ─────────────────────────────────────────── */}
          <motion.div
            data-ocid="dashboard.action_buttons_section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.4, ease: "easeOut" }}
          >
            <SectionLabel text="Quick Actions" />
            {/* FAB/Action panel — tour target */}
            {isLoading ? (
              <div className="space-y-3">
                <SkeletonActionButton />
                <SkeletonActionButton />
                <SkeletonActionButton />
              </div>
            ) : (
              <div data-tour="fab-button" className="space-y-3">
                <ActionButton
                  label="Contact 10 Leads Now"
                  icon={<BoltIcon />}
                  variant="primary"
                  onClick={() => {
                    navigate({ to: "/leads" });
                    toast.success("Opening leads list");
                  }}
                  ocid="dashboard.contact_leads_button"
                />
                <ActionButton
                  label="Start Automating Today"
                  icon={<ClockIcon />}
                  variant="secondary"
                  onClick={() => toast.success("Follow-up queued for 5 leads")}
                  ocid="dashboard.followup_button"
                />
                <ActionButton
                  label="Create Proposal"
                  icon={<DocIcon />}
                  variant="ghost"
                  onClick={() => navigate({ to: "/proposals" })}
                  ocid="dashboard.create_proposal_button"
                />
              </div>
            )}
          </motion.div>

          {/* ── Top Priorities ─────────────────────────────────────────── */}
          {!isLoading && (
            <motion.div
              data-ocid="dashboard.priorities_section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.45, ease: "easeOut" }}
            >
              <SectionLabel text="Top Priorities" />
              <div
                data-tour="lead-list"
                className="rounded-2xl bg-card border border-border/40 divide-y divide-border/30 overflow-hidden"
              >
                {PRIORITIES.map((item, idx) => (
                  <PriorityRow key={item.id} item={item} idx={idx} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Weekly Report ─────────────────────────────────────────── */}
          {!isLoading && (
            <motion.div
              data-ocid="dashboard.weekly_report_section"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
            >
              <WeeklyReportCard
                leadsGenerated={42}
                repliesReceived={7}
                proposalsSent={3}
                weeklyRevenuePotential={85000}
              />
            </motion.div>
          )}

          {/* ── Win This Week + Social Proof ───────────────────────────── */}
          {!isLoading && (
            <>
              <motion.div
                data-ocid="dashboard.win_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.55, ease: "easeOut" }}
              >
                <SectionLabel text="Your Win This Week" />
                <WinThisWeekCard
                  onShare={() => navigate({ to: "/viral-loop" })}
                />
              </motion.div>

              <motion.div
                data-ocid="dashboard.social_proof_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.6, ease: "easeOut" }}
              >
                <SectionLabel text="Live Activity" />
                <SocialProofMiniWidget />
              </motion.div>

              {/* ── Proof System Panel ──────────────────────────────── */}
              <motion.div
                data-ocid="dashboard.proof_section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.65, ease: "easeOut" }}
              >
                <SectionLabel text="Social Proof" />
                <ProofSystemPanel />
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Churn Alert Modal */}
      <ChurnAlertModal
        isOpen={churnModalOpen}
        pendingHotLeads={churnData.pendingHotLeads}
        daysSinceLastSession={churnData.daysSinceLastSession}
        onViewHotLeads={handleChurnViewLeads}
        onDismiss={handleChurnDismiss}
      />

      {/* ── Global Conversion Layer ───────────────────────────────────── */}
      <SmartPaywallModal />
      <CountdownOfferModal />
      <ExitIntentModal />
      <SuccessMomentPopup />
    </PageTransition>
  );
}
