import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";
import type { EnhancedFunnelMetrics } from "../backend.d";
import { FunnelChart, type FunnelStepData } from "../components/FunnelChart";
import { HeatmapCard } from "../components/HeatmapCard";
import {
  useHeatmapSummary,
  useRetentionData,
  useScreenTracking,
} from "../hooks/useAnalytics";

// ─── Enhanced funnel hook ─────────────────────────────────────────────────────

function useEnhancedFunnelMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<EnhancedFunnelMetrics | null>({
    queryKey: ["enhancedFunnelMetrics"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getEnhancedFunnelMetrics();
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

// ─── Mock / fallback data ─────────────────────────────────────────────────────

const MOCK_FUNNEL_STEPS: FunnelStepData[] = [
  { name: "Install", count: 12400, conversionRate: 1.0, dropOffRate: 0.18 },
  { name: "Signup", count: 10168, conversionRate: 0.82, dropOffRate: 0.22 },
  { name: "Onboarding", count: 7931, conversionRate: 0.78, dropOffRate: 0.15 },
  {
    name: "Get Clients Click",
    count: 6741,
    conversionRate: 0.85,
    dropOffRate: 0.25,
  },
  { name: "Pitch Sent", count: 5056, conversionRate: 0.75, dropOffRate: 0.3 },
  {
    name: "Reply Received",
    count: 3539,
    conversionRate: 0.7,
    dropOffRate: 0.22,
  },
  {
    name: "Proposal Created",
    count: 2760,
    conversionRate: 0.78,
    dropOffRate: 0.38,
  },
  { name: "Payment", count: 1711, conversionRate: 0.62, dropOffRate: 0.0 },
];

const MOCK_SCREEN_ACTIVITY = [
  { label: "Home Dashboard", count: 847, percentage: 100, screen: "Home" },
  { label: "Leads Screen", count: 623, percentage: 74, screen: "Leads" },
  { label: "Inbox", count: 412, percentage: 49, screen: "Inbox" },
  { label: "FAB Flow", count: 389, percentage: 46, screen: "FAB" },
  { label: "Paywall", count: 234, percentage: 28, screen: "Paywall" },
  { label: "Clients", count: 198, percentage: 23, screen: "Clients" },
];

const INTERACTION_COLORS = {
  tap: "oklch(var(--primary))",
  rageTap: "oklch(var(--destructive))",
  deadClick: "oklch(var(--warning))",
  scrollDepth: "oklch(var(--success))",
  screenTime: "oklch(0.7 0.12 300)",
};

const MOCK_INTERACTIONS = [
  { label: "Tap", count: 28340, percentage: 62, color: INTERACTION_COLORS.tap },
  {
    label: "Scroll Depth",
    count: 9120,
    percentage: 20,
    color: INTERACTION_COLORS.scrollDepth,
  },
  {
    label: "Dead Click",
    count: 4560,
    percentage: 10,
    color: INTERACTION_COLORS.deadClick,
  },
  {
    label: "Screen Time",
    count: 2740,
    percentage: 6,
    color: INTERACTION_COLORS.screenTime,
  },
  {
    label: "Rage Tap",
    count: 910,
    percentage: 2,
    color: INTERACTION_COLORS.rageTap,
  },
];

const MOCK_TOP_TAPPED = [
  {
    label: "FAB Button (Get Clients)",
    count: 1243,
    percentage: 100,
    screen: "Home",
  },
  { label: "Send Pitch Button", count: 456, percentage: 37, screen: "Leads" },
  { label: "Leads Filter", count: 234, percentage: 19, screen: "Leads" },
  { label: "Upgrade Plan CTA", count: 198, percentage: 16, screen: "Paywall" },
  { label: "Reply Button", count: 187, percentage: 15, screen: "Inbox" },
  { label: "Create Proposal", count: 143, percentage: 12, screen: "Leads" },
];

const MOCK_RAGE_TAPS = [
  {
    label: "Export Leads Button",
    count: 312,
    percentage: 100,
    screen: "Leads",
    fix: "Show paywall immediately with feature explanation",
  },
  {
    label: "Bulk Message Send",
    count: 187,
    percentage: 60,
    screen: "Inbox",
    fix: "Add spinner + success toast to confirm action",
  },
  {
    label: "Back Navigation",
    count: 134,
    percentage: 43,
    screen: "Onboarding",
    fix: "Reduce onboarding steps or add skip option",
  },
];

const STREAK_MILESTONES = [
  { label: "Day 1 (New)", pct: 100 },
  { label: "Day 3 (Returning)", pct: 62 },
  { label: "Day 7 (Engaged)", pct: 34 },
  { label: "Day 30 (Power User)", pct: 11 },
];

const DAU_DATA = [320, 410, 395, 480, 521, 499, 603];
const DAU_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  ocid: string;
}

function KpiCard({ label, value, sub, trend, ocid }: KpiCardProps) {
  return (
    <motion.div
      className="bg-card border border-border/40 rounded-xl p-4 shadow-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid={ocid}
    >
      <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
        {label}
      </p>
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
      {sub && (
        <p
          className={`text-xs font-semibold mt-1 ${
            trend === "up"
              ? "text-emerald-600"
              : trend === "down"
                ? "text-red-500"
                : "text-muted-foreground"
          }`}
        >
          {sub}
        </p>
      )}
    </motion.div>
  );
}

// ─── Sparkline ────────────────────────────────────────────────────────────────

function Sparkline({ data, days }: { data: number[]; days: string[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 300;
  const H = 80;
  const padding = 4;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (W - padding * 2);
    const y = H - padding - ((v - min) / range) * (H - padding * 2);
    return `${x},${y}`;
  });

  const polyline = points.join(" ");
  const area = `${points[0]} ${points.join(" ")} ${W - padding},${H} ${padding},${H} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-20" aria-hidden="true">
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="oklch(0.6 0.25 253)"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.6 0.25 253)"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#sparkGrad)" />
        <polyline
          points={polyline}
          fill="none"
          stroke="oklch(0.6 0.25 253)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {data.map((_v, i) => {
          const [x, y] = points[i].split(",").map(Number);
          return (
            <circle
              key={days[i] ?? i}
              cx={x}
              cy={y}
              r="3"
              fill="oklch(0.6 0.25 253)"
            />
          );
        })}
      </svg>
      <div className="flex justify-between px-1 mt-1">
        {days.map((d) => (
          <span key={d} className="text-[10px] text-muted-foreground">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type DateRange = "7d" | "30d" | "90d";

export default function FunnelDashboardPage() {
  useScreenTracking("FunnelDashboard");
  const [dateRange, setDateRange] = useState<DateRange>("30d");

  const { data: enhancedFunnel } = useEnhancedFunnelMetrics();
  const { data: heatmapSummary } = useHeatmapSummary();
  const { data: retentionData } = useRetentionData("current_user");

  // Build funnel steps — prefer EnhancedFunnelMetrics (with avgSecondsToNextStep)
  const funnelSteps: FunnelStepData[] =
    enhancedFunnel && enhancedFunnel.steps.length > 0
      ? enhancedFunnel.steps.map((s) => ({
          name: s.step,
          count: Number(s.users),
          conversionRate:
            Number(s.users) > 0 ? Number(s.conversions) / Number(s.users) : 0,
          dropOffRate: s.dropoffPercent / 100,
          avgMinToNext:
            s.avgSecondsToNextStep !== undefined
              ? Math.round(Number(s.avgSecondsToNextStep) / 60)
              : undefined,
        }))
      : MOCK_FUNNEL_STEPS;

  const totalUsers = enhancedFunnel
    ? Number(enhancedFunnel.totalUsers)
    : MOCK_FUNNEL_STEPS[0].count;
  const paidUsers = enhancedFunnel
    ? Number(enhancedFunnel.paidUsers)
    : MOCK_FUNNEL_STEPS[7].count;
  const freeToPaid = enhancedFunnel
    ? (enhancedFunnel.freeToPaidConversion * 100).toFixed(1)
    : ((MOCK_FUNNEL_STEPS[7].count / MOCK_FUNNEL_STEPS[0].count) * 100).toFixed(
        1,
      );
  const onboardingCompletion =
    funnelSteps.length >= 3
      ? ((funnelSteps[2].count / funnelSteps[0].count) * 100).toFixed(1)
      : "63.9";

  // Build screen activity from heatmap summary or fallback
  const screenActivity =
    heatmapSummary && heatmapSummary.length > 0
      ? heatmapSummary.slice(0, 6).map(([label, count], _i, arr) => {
          const maxC = Number(arr[0][1]) || 1;
          return {
            label,
            count: Number(count),
            percentage: Math.round((Number(count) / maxC) * 100),
          };
        })
      : MOCK_SCREEN_ACTIVITY;

  // Retention weekly stats
  const weeklyLeads = retentionData
    ? Number(retentionData.weeklyLeadsGenerated)
    : 847;
  const weeklyReplies = retentionData
    ? Number(retentionData.weeklyRepliesReceived)
    : 234;
  const weeklyProposals = retentionData
    ? Number(retentionData.weeklyProposalsSent)
    : 67;
  const currentStreak = retentionData ? Number(retentionData.currentStreak) : 5;

  return (
    <div className="mobile-safe-content min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card border-b border-border/50 px-4 py-3 shadow-subtle">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-lg font-bold text-foreground leading-tight truncate">
              Conversion Funnel
            </h1>
            <p className="text-xs text-muted-foreground">
              Track user growth journey
            </p>
          </div>

          {/* Date Range Toggle */}
          <div
            className="flex items-center bg-muted/40 border border-border/40 rounded-lg p-0.5 shrink-0"
            data-ocid="funnel.date_range.toggle"
          >
            {(["7d", "30d", "90d"] as DateRange[]).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
                  dateRange === r
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`funnel.date_range.${r}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-5">
        {/* KPI Summary Row */}
        <section data-ocid="funnel.kpi.section">
          <div className="grid grid-cols-2 gap-3">
            <KpiCard
              label="Total Users"
              value={totalUsers.toLocaleString("en-IN")}
              sub="↑ 12% vs last period"
              trend="up"
              ocid="funnel.kpi.total_users"
            />
            <KpiCard
              label="Paid Users"
              value={paidUsers.toLocaleString("en-IN")}
              sub="↑ 8% vs last period"
              trend="up"
              ocid="funnel.kpi.paid_users"
            />
            <KpiCard
              label="Free → Paid"
              value={`${freeToPaid}%`}
              sub="Conversion rate"
              trend="neutral"
              ocid="funnel.kpi.conversion_rate"
            />
            <KpiCard
              label="Onboarding %"
              value={`${onboardingCompletion}%`}
              sub="Completion rate"
              trend="up"
              ocid="funnel.kpi.onboarding_completion"
            />
          </div>
        </section>

        {/* Funnel Chart */}
        <section data-ocid="funnel.chart.section">
          <div className="bg-card border border-border/40 rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-sm font-bold text-foreground">
                  8-Step Conversion Funnel
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Install → Signup → Onboarding → Payment
                </p>
              </div>
              <span
                className="text-[11px] font-semibold px-2 py-1 rounded-full"
                style={{
                  background: "oklch(var(--primary) / 0.12)",
                  color: "oklch(var(--primary))",
                }}
              >
                {dateRange}
              </span>
            </div>
            <FunnelChart steps={funnelSteps} />
          </div>
        </section>

        {/* Behavior Insights */}
        <section data-ocid="funnel.behavior.section">
          <h2 className="font-display text-base font-bold text-foreground mb-3">
            User Behavior Insights
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <HeatmapCard
              title="Most Active Screens"
              items={screenActivity}
              showScreen
              ocid="funnel.screens"
            />
            <HeatmapCard
              title="Interaction Types"
              items={MOCK_INTERACTIONS}
              ocid="funnel.interactions"
            />
          </div>
        </section>

        {/* Heatmap Cards */}
        <section data-ocid="funnel.heatmap.section">
          <h2 className="font-display text-base font-bold text-foreground mb-3">
            Element Heatmap
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <HeatmapCard
              title="Top Tapped Elements"
              items={MOCK_TOP_TAPPED}
              showScreen
              ocid="funnel.top_tapped"
            />
            <HeatmapCard
              title="Rage Taps ⚠️"
              items={MOCK_RAGE_TAPS}
              showScreen
              showFix
              ocid="funnel.rage_taps"
            />
          </div>
        </section>

        {/* Retention Overview */}
        <section data-ocid="funnel.retention.section">
          <h2 className="font-display text-base font-bold text-foreground mb-3">
            Retention Overview
          </h2>

          {/* Weekly Metrics */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Leads", value: weeklyLeads, icon: "📊" },
              { label: "Replies", value: weeklyReplies, icon: "💬" },
              { label: "Proposals", value: weeklyProposals, icon: "📄" },
            ].map(({ label, value, icon }) => (
              <div
                key={label}
                className="bg-card border border-border/40 rounded-xl p-3 text-center shadow-card"
                data-ocid={`funnel.retention.${label.toLowerCase()}`}
              >
                <span className="text-lg">{icon}</span>
                <p className="font-display text-xl font-bold text-foreground mt-1 tabular-nums">
                  {value.toLocaleString("en-IN")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {label} / week
                </p>
              </div>
            ))}
          </div>

          {/* DAU Trend */}
          <div
            className="bg-card border border-border/40 rounded-xl p-4 shadow-card mb-3"
            data-ocid="funnel.retention.dau_chart"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Daily Active Users
              </h3>
              <span
                className="text-xs font-bold"
                style={{ color: "oklch(var(--success))" }}
              >
                ↑ +21% this week
              </span>
            </div>
            <Sparkline data={DAU_DATA} days={DAU_DAYS} />
          </div>

          {/* Streak Distribution */}
          <div
            className="bg-card border border-border/40 rounded-xl p-4 shadow-card"
            data-ocid="funnel.retention.streak_distribution"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-semibold text-foreground">
                Streak Distribution
              </h3>
              <div className="streak-badge text-xs px-2 py-1">
                🔥 Your streak: {currentStreak} days
              </div>
            </div>
            <div className="space-y-3">
              {STREAK_MILESTONES.map(({ label, pct }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-3"
                  data-ocid={`funnel.streak.item.${i + 1}`}
                >
                  <span className="text-xs font-medium text-foreground w-36 shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "oklch(var(--milestone-gold))" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground tabular-nums w-10 text-right">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom padding for nav */}
        <div className="h-4" />
      </div>
    </div>
  );
}
