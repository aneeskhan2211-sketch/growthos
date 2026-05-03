import { Badge } from "@/components/ui/badge";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Clock,
  DollarSign,
  Info,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertSeverity } from "../backend";
import type { HealthAlert } from "../backend.d";
import { MarketingSpendModal } from "../components/MarketingSpendModal";
import { useCohortRetentionRows } from "../hooks/useRetentionAnalytics";
import { fmtINR, fmtLakhs, useSaasMetrics } from "../hooks/useSaasMetrics";

// ─── Static chart data (MRR trend and funnel are kept as illustrative visuals) ─
const MRR_TREND = [
  { month: "Jun '24", mrr: 210_000 },
  { month: "Jul '24", mrr: 238_000 },
  { month: "Aug '24", mrr: 265_000 },
  { month: "Sep '24", mrr: 296_000 },
  { month: "Oct '24", mrr: 325_000 },
  { month: "Nov '24", mrr: 352_000 },
  { month: "Dec '24", mrr: 378_000 },
  { month: "Jan '25", mrr: 402_000 },
  { month: "Feb '25", mrr: 423_000 },
  { month: "Mar '25", mrr: 447_000 },
  { month: "Apr '25", mrr: 463_000 },
  { month: "May '25", mrr: 485_000 },
];

const FUNNEL_DATA = [
  { name: "Signup", count: 10_420, pct: 100, dropPct: null },
  { name: "Activation", count: 6_852, pct: 65.8, dropPct: 34.2 },
  { name: "Paid", count: 342, pct: 5.0, dropPct: 95.0 },
  { name: "Retained", count: 318, pct: 93.0, dropPct: 7.0 },
];

const CAC_COLORS = [
  "oklch(0.53 0.22 253)",
  "oklch(0.42 0.17 280)",
  "oklch(0.56 0.15 170)",
  "oklch(0.55 0.05 250)",
];

// ─── Alert Banners (dynamic from backend) ────────────────────────────────────
interface DynamicAlertBannerProps {
  alert: HealthAlert;
  onDismiss: () => void;
}

function DynamicAlertBanner({ alert, onDismiss }: DynamicAlertBannerProps) {
  const isDestructive = alert.severity === AlertSeverity.critical;
  const Icon = isDestructive ? TrendingDown : AlertTriangle;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg border text-sm relative",
        isDestructive
          ? "bg-destructive/8 border-l-4 border-l-destructive border-destructive/20 text-destructive"
          : "bg-warning/8 border-l-4 border-l-warning border-warning/20 text-warning",
      )}
      data-ocid={`saas_metrics.alert.${alert.alertId}`}
    >
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="font-semibold">{alert.alert}.</span>{" "}
        <span className="opacity-80 text-xs">
          Threshold: {alert.threshold} · Actual: {alert.actual}
        </span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss alert"
        data-ocid={`saas_metrics.alert.${alert.alertId}.close_button`}
        className="shrink-0 opacity-60 hover:opacity-100 transition-fast"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────
interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  subtitle?: string;
  tooltip: string;
  badge?: {
    label: string;
    variant: "healthy" | "weak" | "loss" | "fast" | "avg" | "slow";
  };
  index: number;
  icon: React.ElementType;
}

const BADGE_STYLES = {
  healthy: "bg-success/15 text-success border-success/20",
  fast: "bg-success/15 text-success border-success/20",
  weak: "bg-warning/15 text-warning border-warning/20",
  avg: "bg-warning/15 text-warning border-warning/20",
  loss: "bg-destructive/15 text-destructive border-destructive/20",
  slow: "bg-destructive/15 text-destructive border-destructive/20",
};

const BADGE_LABELS = {
  healthy: "Healthy ✓",
  fast: "Recovering fast ✓",
  weak: "Weak",
  avg: "Average",
  loss: "Loss ✗",
  slow: "Recovery slow",
};

function MetricCard({
  title,
  value,
  change,
  subtitle,
  tooltip,
  badge,
  index,
  icon: Icon,
}: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isPositive = change !== undefined && change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className="bg-card rounded-xl border border-border/50 p-5 shadow-card hover:shadow-elevated transition-smooth relative group"
      data-ocid={`saas_metrics.kpi.${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] to-success/[0.03] pointer-events-none" />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/8">
              <Icon className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </span>
          </div>
          <button
            type="button"
            className="opacity-0 group-hover:opacity-100 transition-fast text-muted-foreground hover:text-foreground"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={`Info: ${title}`}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-2xl font-display font-bold text-foreground tabular-nums mb-1">
          {value}
        </div>

        {subtitle && (
          <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {change !== undefined && (
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-semibold",
                isPositive ? "text-success" : "text-destructive",
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {isPositive ? "+" : ""}
              {change}% MoM
            </span>
          )}
          {badge && (
            <span
              className={cn(
                "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                BADGE_STYLES[badge.variant],
              )}
            >
              {BADGE_LABELS[badge.variant]}
            </span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-popover border border-border rounded-lg p-3 shadow-elevated"
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              {tooltip}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Health Scorecard Box ─────────────────────────────────────────────────────
interface HealthBoxProps {
  title: string;
  status: "Strong" | "Watchful" | "Critical";
  value: string;
  change: string;
  index: number;
}

const HEALTH_STATUS_STYLES = {
  Strong: {
    dot: "bg-success",
    text: "text-success",
    bg: "bg-success/8 border-success/20",
  },
  Watchful: {
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning/8 border-warning/20",
  },
  Critical: {
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/8 border-destructive/20",
  },
};

function HealthBox({ title, status, value, change, index }: HealthBoxProps) {
  const styles = HEALTH_STATUS_STYLES[status];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.07, duration: 0.25 }}
      className={cn("rounded-xl border p-4 flex flex-col gap-2", styles.bg)}
      data-ocid={`saas_metrics.health.${title.toLowerCase().replace(/\s+/g, "_")}`}
    >
      <div className="flex items-center gap-2">
        <div className={cn("w-2 h-2 rounded-full shrink-0", styles.dot)} />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
      </div>
      <div className={cn("text-lg font-display font-bold", styles.text)}>
        {value}
      </div>
      <div className={cn("text-xs font-semibold", styles.text)}>
        {status} · {change}
      </div>
    </motion.div>
  );
}

function ltvCacBadgeVariant(status: string): "healthy" | "weak" | "loss" {
  if (status === "healthy") return "healthy";
  if (status === "loss") return "loss";
  return "weak";
}

function cacPaybackBadge(months: number): "fast" | "avg" | "slow" {
  if (months < 12) return "fast";
  if (months <= 18) return "avg";
  return "slow";
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const DATE_RANGES = ["Last Month", "Last 3 Months", "Last 12 Months"] as const;
type DateRange = (typeof DATE_RANGES)[number];

export default function SaasMetricsPage() {
  useMetaTags(PAGE_META["/saas-metrics"]);
  const [dateRange, setDateRange] = useState<DateRange>("Last 12 Months");
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({});
  const [showSpendModal, setShowSpendModal] = useState(false);

  const { metrics, healthAlerts } = useSaasMetrics();
  const { data: cohortRows } = useCohortRetentionRows();

  const dismiss = (key: string) => setDismissed((d) => ({ ...d, [key]: true }));

  const retentionData = cohortRows ?? [];

  // Build dynamic waterfall from real metrics
  const mrrWaterfall = [
    {
      name: "Opening MRR",
      value:
        metrics.mrr -
        metrics.newMrr -
        metrics.expansionMrr +
        metrics.churnedMrr,
      type: "opening",
    },
    { name: "New MRR", value: metrics.newMrr, type: "new" },
    { name: "Expansion", value: metrics.expansionMrr, type: "expansion" },
    { name: "Churn MRR", value: -metrics.churnedMrr, type: "churn" },
    { name: "Net MRR", value: metrics.mrr, type: "net" },
  ];

  // CAC breakdown from real data
  const cacBreakdown = [
    { name: "Google Ads", value: metrics.cacByChannel.googleAds },
    { name: "Meta Ads", value: metrics.cacByChannel.metaAds },
    { name: "Referral", value: metrics.cacByChannel.referral },
    ...(metrics.cacByChannel.other > 0
      ? [{ name: "Other", value: metrics.cacByChannel.other }]
      : []),
  ].filter((c) => c.value > 0);

  const kpiCards: MetricCardProps[] = [
    {
      title: "MRR",
      value: fmtINR(metrics.mrr),
      change: metrics.monthlyGrowthRate,
      subtitle: "Monthly Recurring Revenue",
      tooltip:
        "Total recurring revenue billed in the current month from all active subscriptions.",
      icon: DollarSign,
      index: 0,
    },
    {
      title: "ARR",
      value: fmtLakhs(metrics.arr),
      change: metrics.monthlyGrowthRate,
      subtitle: "MRR × 12",
      tooltip:
        "Annualised Recurring Revenue = MRR × 12. Assumes current MRR holds constant for 12 months.",
      icon: TrendingUp,
      index: 1,
    },
    {
      title: "LTV",
      value: fmtINR(metrics.ltv),
      subtitle: "Per customer lifetime",
      tooltip: `LTV = ARPU ÷ Monthly Churn Rate = ${fmtINR(metrics.arpu)} ÷ ${metrics.monthlyChurnRate}%`,
      icon: Activity,
      index: 2,
    },
    {
      title: "CAC",
      value: fmtINR(metrics.cac),
      subtitle: "Cost per acquired customer",
      tooltip: `CAC = Total Marketing Spend ÷ New Customers = ${fmtINR(metrics.cacByChannel.totalSpend)} ÷ ${metrics.newCustomers}`,
      icon: Target,
      index: 3,
    },
    {
      title: "LTV:CAC Ratio",
      value: `${metrics.ltvCacRatio.toFixed(2)}x`,
      badge: {
        label: "Ratio",
        variant: ltvCacBadgeVariant(metrics.ltvCacStatus),
      },
      subtitle: "≥ 3x is benchmark",
      tooltip: `LTV:CAC = ${fmtINR(metrics.ltv)} ÷ ${fmtINR(metrics.cac)} = ${metrics.ltvCacRatio.toFixed(2)}x`,
      icon: TrendingUp,
      index: 4,
    },
    {
      title: "Churn Rate",
      value: `${metrics.monthlyChurnRate.toFixed(1)}%`,
      change: metrics.monthlyChurnRate - metrics.monthlyChurnRate * 0.9,
      subtitle: `Revenue churn: ${metrics.revenueChurnRate.toFixed(1)}%`,
      tooltip: `Monthly customer churn = churned customers ÷ total customers. ${metrics.churnedCustomers} ÷ ${metrics.totalPayingCustomers}`,
      icon: TrendingDown,
      index: 5,
    },
    {
      title: "NRR",
      value: `${metrics.nrr.toFixed(1)}%`,
      change: 1.4,
      subtitle: "Net Revenue Retention",
      tooltip:
        "NRR = (Opening MRR + Expansion − Churn) ÷ Opening MRR × 100. >100% means revenue grows without new customers.",
      icon: Activity,
      index: 6,
    },
    {
      title: "CAC Payback",
      value: `${metrics.cacPaybackMonths.toFixed(1)} months`,
      badge: {
        label: "Payback",
        variant: cacPaybackBadge(metrics.cacPaybackMonths),
      },
      subtitle: "Time to recover CAC",
      tooltip: `CAC Payback = CAC ÷ ARPU = ${fmtINR(metrics.cac)} ÷ ${fmtINR(metrics.arpu)} = ${metrics.cacPaybackMonths.toFixed(1)} months`,
      icon: Clock,
      index: 7,
    },
  ];

  return (
    <div className="min-h-screen bg-background" data-ocid="saas_metrics.page">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border px-6 py-5 sticky top-0 z-20 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              SaaS Metrics
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Investor-ready view of revenue, unit economics, and growth
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSpendModal(true)}
              data-ocid="saas_metrics.update_ad_spend_button"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border/50 bg-card hover:bg-muted/30 transition-fast text-foreground"
            >
              <Wallet className="w-3.5 h-3.5 text-primary" />
              Update Ad Spend
            </button>
            <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1">
              {DATE_RANGES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDateRange(r)}
                  data-ocid={`saas_metrics.date_range.${r.toLowerCase().replace(/\s+/g, "_")}`}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-semibold transition-fast",
                    dateRange === r
                      ? "bg-card shadow-subtle text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
        {/* ── Alert Banners (dynamic from backend) ────────────────────── */}
        <div className="space-y-2" data-ocid="saas_metrics.alerts_section">
          {healthAlerts.length > 0 && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Alert System
              </span>
              <Badge
                variant="outline"
                className="text-[10px] text-warning border-warning/30"
              >
                {healthAlerts.length} active alert
                {healthAlerts.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          )}
          <AnimatePresence>
            {healthAlerts
              .filter((a) => !dismissed[a.alertId])
              .map((alert) => (
                <DynamicAlertBanner
                  key={alert.alertId}
                  alert={alert}
                  onDismiss={() => dismiss(alert.alertId)}
                />
              ))}
          </AnimatePresence>
          {healthAlerts.length > 0 &&
            healthAlerts.every((a) => dismissed[a.alertId]) && (
              <p className="text-xs text-muted-foreground py-2">
                All alerts dismissed. Alerts fire automatically when thresholds
                are breached.
              </p>
            )}
        </div>

        {/* ── KPI Grid ─────────────────────────────────────────────────── */}
        <section data-ocid="saas_metrics.kpi_section">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {kpiCards.map((card) => (
              <MetricCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        {/* ── Health Scorecard ─────────────────────────────────────────── */}
        <section data-ocid="saas_metrics.health_scorecard">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Health Scorecard
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <HealthBox
              title="Revenue Health"
              status={
                metrics.monthlyGrowthRate >= 5
                  ? "Strong"
                  : metrics.monthlyGrowthRate >= 0
                    ? "Watchful"
                    : "Critical"
              }
              value={`+${metrics.monthlyGrowthRate.toFixed(1)}% MoM`}
              change={`${fmtLakhs(metrics.arr)} ARR`}
              index={0}
            />
            <HealthBox
              title="Unit Economics"
              status={
                metrics.ltvCacRatio >= 3
                  ? "Strong"
                  : metrics.ltvCacRatio >= 1
                    ? "Watchful"
                    : "Critical"
              }
              value={`LTV:CAC ${metrics.ltvCacRatio.toFixed(2)}x`}
              change={`CAC ${fmtINR(metrics.cac)}`}
              index={1}
            />
            <HealthBox
              title="Retention Health"
              status={
                metrics.nrr >= 100
                  ? "Strong"
                  : metrics.nrr >= 90
                    ? "Watchful"
                    : "Critical"
              }
              value={`NRR ${metrics.nrr.toFixed(1)}%`}
              change={`Churn ${metrics.monthlyChurnRate.toFixed(1)}%`}
              index={2}
            />
            <HealthBox
              title="Growth Efficiency"
              status={
                metrics.cacPaybackMonths <= 12
                  ? "Strong"
                  : metrics.cacPaybackMonths <= 18
                    ? "Watchful"
                    : "Critical"
              }
              value={`Payback ${metrics.cacPaybackMonths.toFixed(1)}mo`}
              change={`${metrics.totalPayingCustomers} paying`}
              index={3}
            />
          </div>
        </section>

        {/* ── Charts Grid ──────────────────────────────────────────────── */}
        <section data-ocid="saas_metrics.charts_section">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* MRR Waterfall */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-xl border border-border/50 p-5 shadow-card"
              data-ocid="saas_metrics.chart.mrr_waterfall"
            >
              <div className="mb-4">
                <h3 className="text-sm font-display font-semibold text-foreground">
                  MRR Waterfall
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Revenue movement: New + Expansion − Churn
                </p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={mrrWaterfall}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.88 0 0 / 0.5)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => fmtLakhs(Math.abs(v))}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const v = payload[0].value as number;
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated text-xs">
                          <p className="font-semibold text-foreground mb-1">
                            {label}
                          </p>
                          <p className="text-muted-foreground">
                            {fmtINR(Math.abs(v))}
                            {v < 0 ? " (lost)" : ""}
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={64}>
                    {mrrWaterfall.map((entry) => {
                      const colorMap: Record<string, string> = {
                        opening: "oklch(0.53 0.22 253)",
                        new: "oklch(0.56 0.15 170)",
                        expansion: "oklch(0.62 0.17 170)",
                        churn: "oklch(0.55 0.22 25)",
                        net: "oklch(0.53 0.22 253)",
                      };
                      return (
                        <Cell key={entry.name} fill={colorMap[entry.type]} />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Retention Cohort */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-card rounded-xl border border-border/50 p-5 shadow-card"
              data-ocid="saas_metrics.chart.retention_cohort"
            >
              <div className="mb-4">
                <h3 className="text-sm font-display font-semibold text-foreground">
                  Retention Cohort
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  D1 / D7 / D30 / D60 retention by signup week
                </p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart
                  data={retentionData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.88 0 0 / 0.5)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${v}%`}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated text-xs">
                          <p className="font-semibold text-foreground mb-2">
                            {label}
                          </p>
                          {payload.map((p) => (
                            <div
                              key={p.name}
                              className="flex items-center gap-2 mb-1"
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ background: String(p.color) }}
                              />
                              <span className="text-muted-foreground">
                                {p.name}:
                              </span>
                              <span className="font-semibold text-foreground">
                                {p.value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line
                    type="monotone"
                    dataKey="D1"
                    stroke="oklch(0.53 0.22 253)"
                    strokeWidth={2}
                    dot={false}
                    name="D1"
                  />
                  <Line
                    type="monotone"
                    dataKey="D7"
                    stroke="oklch(0.56 0.15 170)"
                    strokeWidth={2}
                    dot={false}
                    name="D7"
                  />
                  <Line
                    type="monotone"
                    dataKey="D30"
                    stroke="oklch(0.68 0.18 86)"
                    strokeWidth={2}
                    dot={false}
                    name="D30"
                  />
                  <Line
                    type="monotone"
                    dataKey="D60"
                    stroke="oklch(0.65 0.15 40)"
                    strokeWidth={2}
                    dot={false}
                    name="D60"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Conversion Funnel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card rounded-xl border border-border/50 p-5 shadow-card"
              data-ocid="saas_metrics.chart.conversion_funnel"
            >
              <div className="mb-4">
                <h3 className="text-sm font-display font-semibold text-foreground">
                  Acquisition Funnel
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Signup → Activation → Paid → Retained
                </p>
              </div>
              <div className="space-y-3">
                {FUNNEL_DATA.map((step, i) => {
                  const colors = [
                    "oklch(0.53 0.22 253)",
                    "oklch(0.58 0.2 253)",
                    "oklch(0.56 0.15 170)",
                    "oklch(0.62 0.17 170)",
                  ];
                  return (
                    <div
                      key={step.name}
                      className="space-y-1"
                      data-ocid={`saas_metrics.funnel.step.${i + 1}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">
                          {step.name}
                        </span>
                        <span className="text-muted-foreground tabular-nums">
                          {step.count.toLocaleString("en-IN")} · {step.pct}%
                        </span>
                      </div>
                      <div className="h-8 bg-muted/20 rounded-lg overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${step.pct}%` }}
                          transition={{
                            delay: 0.7 + i * 0.1,
                            duration: 0.6,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-lg flex items-center justify-end pr-3"
                          style={{ background: colors[i] }}
                        >
                          <span className="text-[11px] font-bold text-white">
                            {step.pct}%
                          </span>
                        </motion.div>
                        {step.dropPct !== null && (
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-destructive">
                            -{step.dropPct}%
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Revenue Growth Trend */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="bg-card rounded-xl border border-border/50 p-5 shadow-card"
              data-ocid="saas_metrics.chart.revenue_trend"
            >
              <div className="mb-4">
                <h3 className="text-sm font-display font-semibold text-foreground">
                  Revenue Growth Trend
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  12-month MRR trajectory
                </p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart
                  data={MRR_TREND}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="mrrGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="oklch(0.53 0.22 253)"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="oklch(0.53 0.22 253)"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.88 0 0 / 0.5)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9, fill: "oklch(0.55 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => fmtLakhs(v)}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated text-xs">
                          <p className="font-semibold text-foreground mb-1">
                            {label}
                          </p>
                          <p className="text-muted-foreground">
                            MRR:{" "}
                            <span className="font-bold text-primary">
                              {fmtINR(payload[0].value as number)}
                            </span>
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mrr"
                    stroke="oklch(0.53 0.22 253)"
                    strokeWidth={2.5}
                    fill="url(#mrrGradient)"
                    name="MRR"
                    dot={false}
                    activeDot={{ r: 4, fill: "oklch(0.53 0.22 253)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </section>

        {/* ── Customer Metrics + CAC Breakdown ─────────────────────────── */}
        <section data-ocid="saas_metrics.customer_section">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Customer Metrics
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Paying",
                    value: metrics.totalPayingCustomers.toLocaleString("en-IN"),
                    icon: Users,
                    change: `+${metrics.newCustomers} this month`,
                    positive: true,
                  },
                  {
                    label: "New Customers",
                    value: metrics.newCustomers.toLocaleString("en-IN"),
                    icon: Users,
                    change: "This month",
                    positive: true,
                  },
                  {
                    label: "Churned",
                    value: metrics.churnedCustomers.toLocaleString("en-IN"),
                    icon: TrendingDown,
                    change: `${metrics.monthlyChurnRate.toFixed(1)}% churn rate`,
                    positive: false,
                  },
                  {
                    label: "Active Users",
                    value: metrics.activeUsers.toLocaleString("en-IN"),
                    icon: Activity,
                    change: `vs ${metrics.totalPayingCustomers} paying`,
                    positive: true,
                  },
                ].map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.06 }}
                    className="bg-card rounded-xl border border-border/50 p-4 shadow-card"
                    data-ocid={`saas_metrics.customer.${m.label.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <m.icon className="w-4 h-4 text-muted-foreground mb-2" />
                    <div className="text-xl font-display font-bold text-foreground tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground mt-1">
                      {m.label}
                    </div>
                    <div
                      className={cn(
                        "text-xs mt-1",
                        m.positive ? "text-success" : "text-destructive",
                      )}
                    >
                      {m.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CAC Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="bg-card rounded-xl border border-border/50 p-5 shadow-card"
              data-ocid="saas_metrics.cac_breakdown"
            >
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                CAC Breakdown
              </h2>
              <div className="text-center mb-2">
                <p className="text-xs text-muted-foreground mb-1">
                  Cost to acquire one customer
                </p>
                <p className="text-2xl font-display font-bold text-primary">
                  {fmtINR(metrics.cac)}
                </p>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={cacBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {cacBreakdown.map((_entry, idx) => (
                      <Cell
                        key={CAC_COLORS[idx % CAC_COLORS.length]}
                        fill={CAC_COLORS[idx % CAC_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => fmtINR(v)}
                    contentStyle={{
                      background: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0 0)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {cacBreakdown.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: CAC_COLORS[i % CAC_COLORS.length],
                        }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {fmtINR(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Transparency Footer ───────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-muted/30 rounded-xl border border-border/40 p-6"
          data-ocid="saas_metrics.transparency_footer"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-display font-semibold text-foreground">
              How these numbers are calculated
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                label: "LTV",
                formula: "ARPU ÷ Monthly Churn Rate",
                detail: `${fmtINR(metrics.arpu)} ÷ ${metrics.monthlyChurnRate.toFixed(1)}% ≈ ${fmtINR(metrics.ltv)}.`,
              },
              {
                label: "CAC",
                formula: "Total Spend ÷ New Customers",
                detail: `${fmtINR(metrics.cacByChannel.totalSpend)} ÷ ${metrics.newCustomers} = ${fmtINR(metrics.cac)}.`,
              },
              {
                label: "NRR",
                formula: "(Opening + Expansion − Churn) ÷ Opening × 100",
                detail: `>${metrics.nrr >= 100 ? "100%" : `${metrics.nrr.toFixed(1)}%`} means revenue grows without new customers.`,
              },
              {
                label: "LTV:CAC",
                formula: "LTV ÷ CAC",
                detail: `${fmtINR(metrics.ltv)} ÷ ${fmtINR(metrics.cac)} = ${metrics.ltvCacRatio.toFixed(2)}x. Benchmark: ≥3x is healthy.`,
              },
              {
                label: "CAC Payback",
                formula: "CAC ÷ ARPU (months)",
                detail: `${fmtINR(metrics.cac)} ÷ ${fmtINR(metrics.arpu)} = ${metrics.cacPaybackMonths.toFixed(1)} months.`,
              },
              {
                label: "ARR",
                formula: "MRR × 12",
                detail: `${fmtINR(metrics.mrr)} × 12 = ${fmtLakhs(metrics.arr)}. Assumes current MRR is stable.`,
              },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    = {item.formula}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/30 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>
              Metrics update monthly. Revenue figures are in Indian Rupees (₹).
            </span>
            <span className="font-medium">Last updated: May 2025</span>
          </div>
        </motion.section>
      </div>

      {showSpendModal && (
        <MarketingSpendModal onClose={() => setShowSpendModal(false)} />
      )}
    </div>
  );
}
