import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import {
  ArrowDownToLine,
  Bell,
  CheckCircle2,
  Eye,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRetentionAnalytics } from "../hooks/useRetentionAnalytics";

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);
  const from = useRef(0);
  const displayRef = useRef(0);
  displayRef.current = display;

  useEffect(() => {
    from.current = displayRef.current;
    start.current = null;
    const duration = 1000;

    const tick = (now: number) => {
      if (!start.current) start.current = now;
      const progress = Math.min((now - start.current) / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      setDisplay(from.current + (value - from.current) * ease);
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
interface KpiProps {
  title: string;
  value: number;
  decimals?: number;
  suffix?: string;
  icon: React.ReactNode;
  positive?: boolean;
  neutral?: boolean;
  ocid: string;
}

function KpiCard({
  title,
  value,
  decimals = 0,
  suffix = "",
  icon,
  positive,
  neutral,
  ocid,
}: KpiProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        data-ocid={ocid}
        className="border-border/60 hover:shadow-md transition-shadow duration-200"
      >
        <CardContent className="pt-5 pb-4 px-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 truncate">
                {title}
              </p>
              <p
                className={cn(
                  "text-3xl font-bold tabular-nums font-display",
                  neutral && "text-foreground",
                  positive && "text-success",
                  !positive && !neutral && "text-destructive",
                )}
              >
                <AnimatedNumber
                  value={value}
                  decimals={decimals}
                  suffix={suffix}
                />
              </p>
            </div>
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
                neutral && "bg-muted text-muted-foreground",
                positive && "bg-success/10 text-success",
                !positive && !neutral && "bg-destructive/10 text-destructive",
              )}
            >
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Colour helpers ───────────────────────────────────────────────────────────
function rateColor(rate: number): string {
  if (rate >= 70) return "oklch(0.56 0.15 170)";
  if (rate >= 40) return "oklch(0.68 0.18 86)";
  return "oklch(0.55 0.22 25)";
}

function rateBadge(rate: number) {
  if (rate >= 70)
    return (
      <Badge className="bg-success/10 text-success border-success/20 text-xs">
        {rate.toFixed(1)}%
      </Badge>
    );
  if (rate >= 40)
    return (
      <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">
        {rate.toFixed(1)}%
      </Badge>
    );
  return (
    <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
      {rate.toFixed(1)}%
    </Badge>
  );
}

const COPY_COLORS: Record<string, string> = {
  fomo: "oklch(0.68 0.18 86)",
  urgency: "oklch(0.55 0.22 25)",
  reward: "oklch(0.56 0.15 170)",
  money_visibility: "oklch(0.53 0.22 253)",
};

// ─── Top messages data ────────────────────────────────────────────────────────
const TOP_MESSAGES = [
  {
    text: "New reply received. Respond now.",
    type: "urgency",
    opens: 48,
    actions: 39,
    rate: 81.3,
  },
  {
    text: "12 high-quality leads are waiting. Don't miss today's enquiries.",
    type: "fomo",
    opens: 42,
    actions: 32,
    rate: 76.2,
  },
  {
    text: "Nice—keep going. You're close to your first booking.",
    type: "reward",
    opens: 38,
    actions: 27,
    rate: 71.1,
  },
  {
    text: "Leads active in your area right now.",
    type: "fomo",
    opens: 35,
    actions: 24,
    rate: 68.6,
  },
  {
    text: "Reply now—fast responses convert better.",
    type: "urgency",
    opens: 31,
    actions: 20,
    rate: 64.5,
  },
  {
    text: "Follow-up pending. A quick message can help.",
    type: "urgency",
    opens: 28,
    actions: 17,
    rate: 60.7,
  },
  {
    text: "These leads could convert if contacted today.",
    type: "money",
    opens: 25,
    actions: 13,
    rate: 52.0,
  },
  {
    text: "Upgrade to remove limits and continue outreach.",
    type: "money",
    opens: 22,
    actions: 10,
    rate: 45.5,
  },
];

const TYPE_BADGE: Record<string, React.ReactNode> = {
  fomo: (
    <Badge className="bg-warning/10 text-warning border-warning/20 text-[10px]">
      FOMO
    </Badge>
  ),
  urgency: (
    <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px]">
      Urgency
    </Badge>
  ),
  reward: (
    <Badge className="bg-success/10 text-success border-success/20 text-[10px]">
      Reward
    </Badge>
  ),
  money: (
    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
      Money
    </Badge>
  ),
};

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(["sent", "open", "return", "convert"] as const).map((k) => (
          <Card key={k}>
            <CardContent className="pt-5 pb-4">
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-4">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="pt-4">
          <Skeleton className="h-56 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-4">
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Cohort annotations ───────────────────────────────────────────────────────
const COHORT_ANNOTATIONS = [
  { day: 7, label: "Week 1 ends" },
  { day: 14, label: "Habit phase" },
  { day: 21, label: "Conversion phase" },
];

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function RetentionAnalyticsPage() {
  useMetaTags(PAGE_META["/retention-analytics"]);
  const { data, isLoading } = useRetentionAnalytics();

  if (isLoading || !data) return <PageSkeleton />;

  const {
    totalNotificationsSent,
    openRate,
    returnRate,
    conversionRate,
    byTriggerType,
    byCopyType,
    cohortByDay,
  } = data;

  const triggerSorted = [...byTriggerType].sort(
    (a, b) => b.openRate - a.openRate,
  );
  const totalSends = byCopyType.reduce((s, c) => s + c.count, 0);

  return (
    <div className="space-y-6" data-ocid="retention_analytics.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display tracking-tight">
            Retention Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track how notifications drive daily actions and bookings
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge
            data-ocid="retention_analytics.live_badge"
            className="bg-success/10 text-success border-success/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse mr-1.5" />
            Live
          </Badge>
        </div>
      </motion.div>

      {/* Row 1: KPI Cards */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="retention_analytics.kpi_section"
      >
        <KpiCard
          title="Total Notifications Sent"
          value={totalNotificationsSent}
          icon={<Bell className="w-5 h-5" />}
          neutral
          ocid="retention_analytics.kpi_sent"
        />
        <KpiCard
          title="Notification Open Rate"
          value={openRate}
          decimals={1}
          suffix="%"
          icon={<Eye className="w-5 h-5" />}
          positive={openRate >= 50}
          ocid="retention_analytics.kpi_open_rate"
        />
        <KpiCard
          title="Return to App Rate"
          value={returnRate}
          decimals={1}
          suffix="%"
          icon={<ArrowDownToLine className="w-5 h-5" />}
          positive={returnRate >= 40}
          ocid="retention_analytics.kpi_return_rate"
        />
        <KpiCard
          title="Action Conversion Rate"
          value={conversionRate}
          decimals={1}
          suffix="%"
          icon={<CheckCircle2 className="w-5 h-5" />}
          positive={conversionRate >= 30}
          ocid="retention_analytics.kpi_conversion_rate"
        />
      </div>

      {/* Row 2: Charts */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        data-ocid="retention_analytics.charts_section"
      >
        {/* Trigger performance — horizontal bar */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-border/60 h-full">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-sm font-semibold text-foreground">
                Performance by Trigger Type
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Open rate % per notification trigger
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={triggerSorted}
                  layout="vertical"
                  margin={{ top: 4, right: 28, left: 8, bottom: 4 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="oklch(0.88 0 0 / 0.5)"
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={120}
                    tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                  />
                  <Tooltip
                    formatter={(v: number) => [`${v.toFixed(1)}%`, "Open Rate"]}
                    contentStyle={{
                      background: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0 0)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="openRate" radius={[0, 4, 4, 0]} maxBarSize={28}>
                    {triggerSorted.map((entry) => (
                      <Cell
                        key={entry.trigger}
                        fill={rateColor(entry.openRate)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Copy type performance — donut */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card className="border-border/60 h-full">
            <CardHeader className="pb-2 pt-5 px-5">
              <CardTitle className="text-sm font-semibold text-foreground">
                Performance by Copy Type
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Distribution and open rate by message psychology
              </p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie
                        data={byCopyType}
                        cx="50%"
                        cy="50%"
                        innerRadius={48}
                        outerRadius={72}
                        dataKey="count"
                        paddingAngle={2}
                      >
                        {byCopyType.map((entry) => (
                          <Cell
                            key={entry.type}
                            fill={COPY_COLORS[entry.type] ?? "oklch(0.55 0 0)"}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => [`${v} sends`, "Count"]}
                        contentStyle={{
                          background: "oklch(1 0 0)",
                          border: "1px solid oklch(0.88 0 0)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xl font-bold text-foreground tabular-nums font-display">
                      {totalSends}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      sends
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  {byCopyType.map((c) => (
                    <div
                      key={c.type}
                      className="flex items-center justify-between gap-2 min-w-0"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{
                            background:
                              COPY_COLORS[c.type] ?? "oklch(0.55 0 0)",
                          }}
                        />
                        <span className="text-xs text-foreground truncate">
                          {c.label}
                        </span>
                      </div>
                      {rateBadge(c.openRate)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Row 3: Cohort area chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        data-ocid="retention_analytics.cohort_chart"
      >
        <Card className="border-border/60">
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-semibold text-foreground">
                30-Day Retention Cohort
              </CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">
              % of notified users who returned to the app by day
            </p>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={cohortByDay}
                margin={{ top: 8, right: 16, left: -8, bottom: 4 }}
              >
                <defs>
                  <linearGradient
                    id="cohortGradient"
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
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                  tickFormatter={(v: number) => `D${v}`}
                  interval={4}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                  tickFormatter={(v: number) => `${v}%`}
                  domain={[0, 100]}
                />
                <Tooltip
                  formatter={(v: number) => [
                    `${v.toFixed(1)}%`,
                    "Retention Rate",
                  ]}
                  contentStyle={{
                    background: "oklch(1 0 0)",
                    border: "1px solid oklch(0.88 0 0)",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  labelFormatter={(l: number) => `Day ${l}`}
                />
                {/* Target line */}
                <ReferenceLine
                  y={50}
                  stroke="oklch(0.68 0.18 86)"
                  strokeDasharray="5 4"
                  strokeWidth={1.5}
                  label={{
                    value: "50% target",
                    position: "right",
                    fontSize: 10,
                    fill: "oklch(0.68 0.18 86)",
                  }}
                />
                {/* Milestone annotations */}
                {COHORT_ANNOTATIONS.map((a) => (
                  <ReferenceLine
                    key={a.day}
                    x={a.day}
                    stroke="oklch(0.88 0 0)"
                    strokeDasharray="3 3"
                    label={{
                      value: a.label,
                      position: "top",
                      fontSize: 9,
                      fill: "oklch(0.55 0 0)",
                    }}
                  />
                ))}
                <Area
                  type="monotone"
                  dataKey="retentionRate"
                  stroke="oklch(0.53 0.22 253)"
                  strokeWidth={2}
                  fill="url(#cohortGradient)"
                  dot={false}
                  activeDot={{ r: 4, fill: "oklch(0.53 0.22 253)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Row 4: Top performing messages table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        data-ocid="retention_analytics.messages_table"
      >
        <Card className="border-border/60">
          <CardHeader className="pb-2 pt-5 px-5">
            <CardTitle className="text-sm font-semibold text-foreground">
              Top Performing Messages
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Sorted by open-to-action rate
            </p>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-2.5">
                      Message
                    </th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2.5 whitespace-nowrap">
                      Type
                    </th>
                    <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2.5">
                      Opens
                    </th>
                    <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2.5">
                      Actions
                    </th>
                    <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-2.5">
                      Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_MESSAGES.map((msg) => (
                    <tr
                      key={msg.text}
                      data-ocid={`retention_analytics.message_row.${TOP_MESSAGES.indexOf(msg) + 1}`}
                      className={cn(
                        "border-b border-border/40 hover:bg-muted/30 transition-colors duration-150",
                        TOP_MESSAGES.indexOf(msg) === TOP_MESSAGES.length - 1 &&
                          "border-b-0",
                      )}
                    >
                      <td className="px-5 py-3 max-w-xs">
                        <p className="text-sm text-foreground line-clamp-2 leading-snug">
                          {msg.text}
                        </p>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {TYPE_BADGE[msg.type] ?? (
                          <Badge variant="outline" className="text-[10px]">
                            {msg.type}
                          </Badge>
                        )}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums text-sm text-foreground font-medium">
                        {msg.opens}
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums text-sm text-foreground font-medium">
                        {msg.actions}
                      </td>
                      <td className="px-5 py-3 text-right">
                        {rateBadge(msg.rate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
