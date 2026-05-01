import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MetricCard } from "../components/ui/MetricCard";
import { PageHeader } from "../components/ui/PageHeader";
import { useGA4Analytics } from "../hooks/useGA4Analytics";

// ─── Types ────────────────────────────────────────────────────────────────────

type DateRange = "7d" | "30d" | "90d";

// ─── Mock data ────────────────────────────────────────────────────────────────

const REVENUE_90D = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(2026, 0, 1);
  d.setDate(d.getDate() + i);
  const label = `${d.getDate()}/${d.getMonth() + 1}`;
  const base = 2800 + Math.sin(i / 7) * 800 + i * 30;
  return {
    label,
    revenue: Math.round(base + Math.random() * 600),
    leads: Math.round(6 + Math.sin(i / 5) * 3 + i * 0.1),
    conversions: Math.round(0.8 + Math.random() * 0.6),
  };
});

const REVENUE_30D = REVENUE_90D.slice(-30);
const REVENUE_7D = REVENUE_90D.slice(-7);

const TRAFFIC_SOURCES = [
  { name: "Google Organic", value: 38, color: "oklch(0.6 0.25 253)" },
  { name: "Google Ads", value: 24, color: "oklch(0.64 0.18 170)" },
  { name: "Direct", value: 15, color: "oklch(0.74 0.2 86)" },
  { name: "Social Media", value: 13, color: "oklch(0.7 0.18 40)" },
  { name: "Referral", value: 10, color: "oklch(0.78 0.15 300)" },
];

const FUNNEL_STAGES = [
  { stage: "Visitors", count: 12400, dropoff: null },
  { stage: "Leads", count: 1247, dropoff: 90.0 },
  { stage: "Qualified", count: 486, dropoff: 61.0 },
  { stage: "Proposals Sent", count: 89, dropoff: 81.7 },
  { stage: "Clients Won", count: 37, dropoff: 58.4 },
];

const ROI_TABLE = [
  { source: "Google Ads", leads: 312, cost: 48000, revenue: 285000, roi: 494 },
  {
    source: "Organic SEO",
    leads: 289,
    cost: 12000,
    revenue: 198000,
    roi: 1550,
  },
  { source: "Meta Ads", leads: 198, cost: 35000, revenue: 142000, roi: 306 },
  {
    source: "WhatsApp Outreach",
    leads: 167,
    cost: 8000,
    revenue: 118000,
    roi: 1375,
  },
  { source: "LinkedIn", leads: 124, cost: 22000, revenue: 96000, roi: 336 },
  { source: "Referral", leads: 157, cost: 5000, revenue: 215000, roi: 4200 },
].sort((a, b) => b.roi - a.roi);

const CLIENT_PERFORMANCE = [
  {
    name: "Sunrise Salon",
    leads: 48,
    revenue: 28500,
    growth: 24,
    trend: "up" as const,
  },
  {
    name: "FitZone Gym",
    leads: 62,
    revenue: 42000,
    growth: 38,
    trend: "up" as const,
  },
  {
    name: "Dr. Mehta Clinic",
    leads: 31,
    revenue: 19800,
    growth: 15,
    trend: "up" as const,
  },
  {
    name: "TechEdge IT",
    leads: 19,
    revenue: 55000,
    growth: 52,
    trend: "up" as const,
  },
  {
    name: "StarBites Bakery",
    leads: 44,
    revenue: 12400,
    growth: 8,
    trend: "up" as const,
  },
];

const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_WEEKS = ["W1", "W2", "W3", "W4"];
const HEATMAP_DATA = HEATMAP_WEEKS.map((week) =>
  HEATMAP_DAYS.map((day) => ({
    week,
    day,
    value: Math.floor(Math.random() * 100),
  })),
);

const SPARKLINE = [
  { value: 42 },
  { value: 55 },
  { value: 48 },
  { value: 67 },
  { value: 72 },
  { value: 89 },
  { value: 95 },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const display = useTransform(
    spring,
    (v) =>
      `${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")}${suffix}`,
  );
  useEffect(() => {
    mv.set(target);
  }, [mv, target]);
  return <motion.span>{display}</motion.span>;
}

// ─── Heatmap Cell ─────────────────────────────────────────────────────────────

function HeatCell({ value, delay }: { value: number; delay: number }) {
  const intensity = value / 100;
  const alpha = 0.08 + intensity * 0.85;
  return (
    <motion.div
      className="rounded aspect-square"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      title={`${value} actions`}
      style={{ background: `oklch(0.6 0.25 253 / ${alpha})` }}
    />
  );
}

// ─── Date Range Picker ────────────────────────────────────────────────────────

function DateRangePicker({
  value,
  onChange,
}: { value: DateRange; onChange: (v: DateRange) => void }) {
  const opts: { label: string; val: DateRange }[] = [
    { label: "Last 7 days", val: "7d" },
    { label: "Last 30 days", val: "30d" },
    { label: "Last 90 days", val: "90d" },
  ];
  return (
    <div
      className="flex items-center gap-1 bg-muted/50 rounded-lg p-1"
      data-ocid="analytics.date_range"
    >
      {opts.map((o) => (
        <button
          type="button"
          key={o.val}
          onClick={() => onChange(o.val)}
          data-ocid={`analytics.date_range.${o.val}`}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-fast ${
            value === o.val
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── Chart Toggle ─────────────────────────────────────────────────────────────

type ChartMetric = "revenue" | "leads" | "conversions";

function ChartToggle({
  value,
  onChange,
}: { value: ChartMetric; onChange: (v: ChartMetric) => void }) {
  const opts: { label: string; val: ChartMetric }[] = [
    { label: "Revenue", val: "revenue" },
    { label: "Leads", val: "leads" },
    { label: "Conversions", val: "conversions" },
  ];
  return (
    <div
      className="flex items-center gap-1 bg-muted/50 rounded-lg p-1"
      data-ocid="analytics.chart_toggle"
    >
      {opts.map((o) => (
        <button
          type="button"
          key={o.val}
          onClick={() => onChange(o.val)}
          data-ocid={`analytics.chart_toggle.${o.val}`}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-fast ${
            value === o.val
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── Revenue Area Chart ───────────────────────────────────────────────────────

function RevenueChart({
  data,
  metric,
}: { data: typeof REVENUE_90D; metric: ChartMetric }) {
  const colorMap: Record<ChartMetric, string> = {
    revenue: "oklch(0.6 0.25 253)",
    leads: "oklch(0.64 0.18 170)",
    conversions: "oklch(0.74 0.2 86)",
  };
  const color = colorMap[metric];
  const gradId = `grad_${metric}`;
  const tickData = data.filter((_, i) => i % Math.ceil(data.length / 8) === 0);
  const xLabels = new Set(tickData.map((d) => d.label));

  const formatValue = (v: number) => {
    if (metric === "revenue") return `₹${(v / 1000).toFixed(0)}K`;
    if (metric === "conversions") return `${v}%`;
    return String(v);
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.18} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(0 0 0 / 0.05)"
          vertical={false}
        />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: string) => (xLabels.has(v) ? v : "")}
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatValue}
          width={52}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid oklch(var(--border))",
            fontSize: 12,
          }}
          formatter={(v: number) => [
            formatValue(v),
            metric.charAt(0).toUpperCase() + metric.slice(1),
          ]}
        />
        <Area
          type="monotone"
          dataKey={metric}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradId})`}
          dot={false}
          activeDot={{ r: 4, fill: color }}
          animationDuration={800}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Conversion Funnel ────────────────────────────────────────────────────────

function ConversionFunnel() {
  const maxW = 100;
  const widths = FUNNEL_STAGES.map((_, i) => maxW - i * 14);
  const colors = [
    "oklch(0.6 0.25 253)",
    "oklch(0.62 0.22 253)",
    "oklch(0.64 0.18 170)",
    "oklch(0.68 0.18 86)",
    "oklch(0.56 0.15 170)",
  ];

  return (
    <div className="space-y-2 max-w-lg mx-auto" data-ocid="analytics.funnel">
      {FUNNEL_STAGES.map((stage, i) => (
        <motion.div
          key={stage.stage}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          data-ocid={`analytics.funnel.item.${i + 1}`}
        >
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="font-medium text-foreground">{stage.stage}</span>
            <div className="flex items-center gap-3">
              <span className="text-foreground font-semibold tabular-nums">
                {stage.count.toLocaleString("en-IN")}
              </span>
              {stage.dropoff !== null && (
                <span className="text-xs text-destructive font-medium">
                  ↓ {stage.dropoff}% drop
                </span>
              )}
            </div>
          </div>
          <div
            className="h-8 rounded-md flex items-center px-3 transition-smooth"
            style={{
              width: `${widths[i]}%`,
              background: `${colors[i]}`,
              opacity: 0.85 + (i === 0 ? 0.15 : 0),
            }}
          >
            <span className="text-xs font-semibold text-white/90 truncate">
              {((stage.count / FUNNEL_STAGES[0].count) * 100).toFixed(1)}% of
              visitors
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── ROI Table ────────────────────────────────────────────────────────────────

function RoiTable() {
  const maxRoi = ROI_TABLE[0].roi;
  return (
    <div className="overflow-x-auto" data-ocid="analytics.roi.table">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            {["Lead Source", "Leads", "Cost (₹)", "Revenue (₹)", "ROI %"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {ROI_TABLE.map((row, i) => (
            <motion.tr
              key={row.source}
              className="hover:bg-muted/20 transition-fast group"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              data-ocid={`analytics.roi.row.${i + 1}`}
            >
              <td className="px-4 py-3 font-medium text-foreground">
                {row.source}
              </td>
              <td className="px-4 py-3 text-muted-foreground tabular-nums">
                {row.leads}
              </td>
              <td className="px-4 py-3 text-muted-foreground tabular-nums">
                ₹{row.cost.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3 font-semibold text-foreground tabular-nums">
                ₹{row.revenue.toLocaleString("en-IN")}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 max-w-[80px] progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${Math.min((row.roi / maxRoi) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold tabular-nums ${row.roi > 1000 ? "text-success" : row.roi > 400 ? "text-warning" : "text-muted-foreground"}`}
                  >
                    {row.roi}%
                  </span>
                  {i === 0 && (
                    <Badge className="text-[10px] status-active border-0 px-1.5 py-0">
                      Top
                    </Badge>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Client Cards ─────────────────────────────────────────────────────────────

function ClientPerformance() {
  const maxRevenue = Math.max(...CLIENT_PERFORMANCE.map((c) => c.revenue));
  return (
    <div className="space-y-4" data-ocid="analytics.clients">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLIENT_PERFORMANCE.map((client, i) => (
          <motion.div
            key={client.name}
            className="bg-card border border-border rounded-xl p-4 hover-lift transition-hover"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            data-ocid={`analytics.clients.card.${i + 1}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {client.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {client.leads} leads generated
                </p>
              </div>
              <span className="text-success text-sm font-bold">
                ↑ {client.growth}%
              </span>
            </div>
            <p className="text-xl font-bold text-foreground tabular-nums">
              ₹{client.revenue.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Monthly Revenue
            </p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(client.revenue / maxRevenue) * 100}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <Card className="p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">
          Revenue by Client
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={CLIENT_PERFORMANCE}
            margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0 0 0 / 0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`}
              width={44}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid oklch(var(--border))",
                fontSize: 12,
              }}
              formatter={(v: number) => [
                `₹${v.toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />
            <Bar
              dataKey="revenue"
              radius={[4, 4, 0, 0]}
              animationDuration={700}
            >
              {CLIENT_PERFORMANCE.map((client, idx) => (
                <Cell
                  key={`bar-${client.name}`}
                  fill={`oklch(${0.55 + idx * 0.05} 0.22 253)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

// ─── Heatmap ──────────────────────────────────────────────────────────────────

function WeeklyHeatmap() {
  return (
    <div className="space-y-3" data-ocid="analytics.heatmap">
      <div className="overflow-x-auto">
        <div className="min-w-[340px]">
          <div className="grid grid-cols-[28px_repeat(7,1fr)] gap-1.5 mb-1.5">
            <div />
            {HEATMAP_DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-semibold text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>
          {HEATMAP_WEEKS.map((week, wi) => (
            <div
              key={week}
              className="grid grid-cols-[28px_repeat(7,1fr)] gap-1.5 mb-1.5"
            >
              <div className="flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
                {week}
              </div>
              {HEATMAP_DATA[wi].map((cell, di) => (
                <HeatCell
                  key={`${week}-${cell.day}`}
                  value={cell.value}
                  delay={(wi * 7 + di) * 0.02}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Less</span>
        {[0.08, 0.25, 0.45, 0.65, 0.9].map((a) => (
          <div
            key={a}
            className="w-4 h-4 rounded"
            style={{ background: `oklch(0.6 0.25 253 / ${a})` }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [chartMetric, setChartMetric] = useState<ChartMetric>("revenue");
  const [activeTab, setActiveTab] = useState("overview");
  const hasAnimated = useRef(false);
  const [showCounters, setShowCounters] = useState(false);

  // GA4 live data
  const ga4 = useGA4Analytics(90);
  const ga4Data = ga4.data;

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      const t = setTimeout(() => setShowCounters(true), 200);
      return () => clearTimeout(t);
    }
  }, []);

  const chartData =
    dateRange === "7d"
      ? REVENUE_7D
      : dateRange === "30d"
        ? REVENUE_30D
        : REVENUE_90D;

  // Build KPI cards using GA4 data when available
  const ga4Sessions = ga4Data ? Number(ga4Data.totalSessions) : 12480;
  const ga4Users = ga4Data ? Number(ga4Data.totalUsers) : 8934;
  const ga4BounceRate = ga4Data ? ga4Data.avgBounceRate : 42.3;
  const ga4Conversions = ga4Data ? Number(ga4Data.conversions) : 312;

  const SOURCE_COLORS = [
    "oklch(0.6 0.25 253)",
    "oklch(0.64 0.18 170)",
    "oklch(0.74 0.2 86)",
    "oklch(0.7 0.18 40)",
    "oklch(0.78 0.15 300)",
    "oklch(0.68 0.2 200)",
  ];

  // Traffic sources from GA4 or fallback
  const trafficSourcesDisplay =
    ga4Data && ga4Data.trafficSources.length > 0
      ? ga4Data.trafficSources.map(([name, count], i) => ({
          name,
          value: Number(count),
          color: SOURCE_COLORS[i % SOURCE_COLORS.length],
        }))
      : TRAFFIC_SOURCES;

  // Top pages from GA4
  const topPagesDisplay =
    ga4Data && ga4Data.topPages.length > 0 ? ga4Data.topPages : [];

  // Normalize traffic sources to percentages for the pie chart
  const totalSourceTraffic = trafficSourcesDisplay.reduce(
    (s, x) => s + x.value,
    0,
  );
  const trafficSourcesPct = trafficSourcesDisplay.map((s) => ({
    ...s,
    pct:
      totalSourceTraffic > 0
        ? Math.round((s.value / totalSourceTraffic) * 100)
        : 0,
  }));

  const kpis = [
    {
      label: "Sessions",
      target: ga4Sessions,
      display: ga4.isLoading ? "—" : ga4Sessions.toLocaleString("en-IN"),
      change: 12,
      trend: "up" as const,
      gradient: "gradient-kpi",
      isLoading: ga4.isLoading,
    },
    {
      label: "Users",
      target: ga4Users,
      display: ga4.isLoading ? "—" : ga4Users.toLocaleString("en-IN"),
      change: 18,
      trend: "up" as const,
      gradient: "gradient-success",
      isLoading: ga4.isLoading,
    },
    {
      label: "Bounce Rate",
      target: ga4BounceRate,
      display: ga4.isLoading ? "—" : `${ga4BounceRate.toFixed(1)}%`,
      change: -2.1,
      trend: "up" as const,
      gradient: "",
      isLoading: ga4.isLoading,
    },
    {
      label: "Conversions",
      target: ga4Conversions,
      display: ga4.isLoading ? "—" : ga4Conversions.toLocaleString("en-IN"),
      change: 8,
      trend: "up" as const,
      gradient: "gradient-premium",
      isLoading: ga4.isLoading,
    },
  ];

  return (
    <div data-ocid="analytics.page" className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Analytics"
        description="Revenue-first insights for smarter decisions"
        actions={
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* GA4 live/demo badge */}
            {ga4Data?.isLive ? (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20"
                data-ocid="analytics.ga4_live_badge"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Live
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/40"
                data-ocid="analytics.ga4_demo_badge"
              >
                Demo data ·{" "}
                <button
                  type="button"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                  onClick={() => navigate({ to: "/settings" })}
                >
                  Configure GA4 →
                </button>
              </span>
            )}
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <Button
              size="sm"
              variant="outline"
              type="button"
              data-ocid="analytics.export_button"
            >
              Export CSV
            </Button>
          </div>
        }
      />

      {/* GA4 error / unavailable banner */}
      {ga4.error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/40 text-xs text-muted-foreground"
          data-ocid="analytics.ga4_error_state"
        >
          <span className="text-warning text-base">⚠</span>
          GA4 data unavailable — showing demo data.{" "}
          <a
            href="/settings"
            className="text-primary hover:underline font-medium"
          >
            Configure in Settings →
          </a>
        </motion.div>
      )}

      {/* KPI Cards */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
      >
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            data-ocid={`analytics.kpi.${i + 1}`}
          >
            {kpi.isLoading ? (
              <Card className="p-4 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-3 w-16" />
              </Card>
            ) : (
              <MetricCard
                label={kpi.label}
                value={kpi.display}
                change={kpi.change}
                trend={kpi.trend}
                gradient={kpi.gradient}
                sparkline={SPARKLINE}
                changeLabel="vs last period"
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="analytics.tabs"
      >
        <TabsList className="mb-5 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" data-ocid="analytics.tab.overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="funnel" data-ocid="analytics.tab.funnel">
            Funnel
          </TabsTrigger>
          <TabsTrigger value="sources" data-ocid="analytics.tab.sources">
            Traffic Sources
          </TabsTrigger>
          <TabsTrigger value="toppages" data-ocid="analytics.tab.toppages">
            Top Pages
          </TabsTrigger>
          <TabsTrigger value="roi" data-ocid="analytics.tab.roi">
            Lead ROI
          </TabsTrigger>
          <TabsTrigger value="clients" data-ocid="analytics.tab.clients">
            Clients
          </TabsTrigger>
          <TabsTrigger value="heatmap" data-ocid="analytics.tab.heatmap">
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Overview – Revenue Chart */}
        <TabsContent value="overview">
          <AnimatePresence mode="wait">
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Performance Trend
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {dateRange === "7d"
                        ? "Last 7 days"
                        : dateRange === "30d"
                          ? "Last 30 days"
                          : "Last 90 days"}{" "}
                      · Daily breakdown
                    </p>
                  </div>
                  <ChartToggle value={chartMetric} onChange={setChartMetric} />
                </div>
                <RevenueChart data={chartData} metric={chartMetric} />
              </Card>

              {/* Summary stats row */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  {
                    label: "Peak Day Revenue",
                    value: "₹12,400",
                    sub: "15 Jan 2026",
                  },
                  {
                    label: "Best Lead Day",
                    value: "23 leads",
                    sub: "22 Jan 2026",
                  },
                  { label: "Top Conv. Day", value: "7.8%", sub: "8 Jan 2026" },
                ].map((stat) => (
                  <Card key={stat.label} className="p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-lg font-bold text-foreground tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.sub}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Conversion Funnel */}
        <TabsContent value="funnel">
          <AnimatePresence mode="wait">
            <motion.div
              key="funnel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Conversion Funnel
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Visitor to client journey ·{" "}
                      {dateRange === "7d"
                        ? "7d"
                        : dateRange === "30d"
                          ? "30d"
                          : "90d"}{" "}
                      window
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {((37 / 12400) * 100).toFixed(2)}% overall
                  </Badge>
                </div>
                <ConversionFunnel />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border">
                  {[
                    {
                      label: "Lead Capture Rate",
                      value: "10.1%",
                      color: "text-primary",
                    },
                    {
                      label: "Qualification Rate",
                      value: "39.0%",
                      color: "text-success",
                    },
                    {
                      label: "Proposal Rate",
                      value: "18.3%",
                      color: "text-warning",
                    },
                    {
                      label: "Close Rate",
                      value: "41.6%",
                      color: "text-success",
                    },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <p
                        className={`text-xl font-bold tabular-nums ${m.color}`}
                      >
                        {m.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Traffic Sources */}
        <TabsContent value="sources">
          <AnimatePresence mode="wait">
            <motion.div
              key="sources"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold text-foreground">
                    Traffic Source Breakdown
                  </h3>
                  {ga4Data?.isLive && (
                    <span className="text-xs text-success font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      Live GA4
                    </span>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="shrink-0">
                    <ResponsiveContainer width={220} height={220}>
                      <PieChart>
                        <Pie
                          data={trafficSourcesPct}
                          cx="50%"
                          cy="50%"
                          innerRadius={62}
                          outerRadius={95}
                          paddingAngle={3}
                          dataKey="pct"
                          animationBegin={0}
                          animationDuration={700}
                        >
                          {trafficSourcesPct.map((entry) => (
                            <Cell
                              key={`pie-${entry.name}`}
                              fill={entry.color}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v: number) => [`${v}%`, "Share"]}
                          contentStyle={{
                            fontSize: 12,
                            borderRadius: 8,
                            border: "1px solid oklch(var(--border))",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 w-full space-y-3">
                    {trafficSourcesPct.map((s, i) => (
                      <motion.div
                        key={s.name}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        data-ocid={`analytics.source.item.${i + 1}`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: s.color }}
                        />
                        <span className="flex-1 text-sm text-foreground">
                          {s.name}
                        </span>
                        <div className="flex-1 max-w-[120px] progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${s.pct}%`,
                              background: s.color,
                            }}
                          />
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs tabular-nums w-10 justify-center"
                        >
                          {s.pct}%
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Top Pages */}
        <TabsContent value="toppages">
          <AnimatePresence mode="wait">
            <motion.div
              key="toppages"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Top Pages
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Most visited pages in the selected period
                    </p>
                  </div>
                  {ga4Data?.isLive && (
                    <span className="text-xs text-success font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      Live GA4
                    </span>
                  )}
                </div>
                {ga4.isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3"
                        data-ocid="analytics.toppages.loading_state"
                      >
                        <Skeleton className="h-4 flex-1" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                ) : topPagesDisplay.length === 0 ? (
                  <p
                    className="text-sm text-muted-foreground text-center py-8"
                    data-ocid="analytics.toppages.empty_state"
                  >
                    No page data available.{" "}
                    <a
                      href="/settings"
                      className="text-primary hover:underline"
                    >
                      Configure GA4 →
                    </a>
                  </p>
                ) : (
                  <div
                    className="space-y-2"
                    data-ocid="analytics.toppages.list"
                  >
                    {topPagesDisplay.map(([page, count], i) => {
                      const maxCount = Number(topPagesDisplay[0][1]);
                      const pct =
                        maxCount > 0
                          ? Math.round((Number(count) / maxCount) * 100)
                          : 0;
                      return (
                        <motion.div
                          key={page}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.3 }}
                          data-ocid={`analytics.toppages.item.${i + 1}`}
                        >
                          <span className="text-xs text-muted-foreground w-5 shrink-0 tabular-nums">
                            {i + 1}
                          </span>
                          <span className="flex-1 text-sm text-foreground font-mono truncate">
                            {page}
                          </span>
                          <div className="w-28 progress-bar shrink-0">
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs tabular-nums text-muted-foreground w-16 text-right shrink-0">
                            {Number(count).toLocaleString("en-IN")} views
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Lead Source ROI */}
        <TabsContent value="roi">
          <AnimatePresence mode="wait">
            <motion.div
              key="roi"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Lead Source ROI
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Sorted by ROI descending
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    data-ocid="analytics.roi.export_button"
                  >
                    Export
                  </Button>
                </div>
                <RoiTable />
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Client Performance */}
        <TabsContent value="clients">
          <AnimatePresence mode="wait">
            <motion.div
              key="clients"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ClientPerformance />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Weekly Heatmap */}
        <TabsContent value="heatmap">
          <AnimatePresence mode="wait">
            <motion.div
              key="heatmap"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Weekly Activity Heatmap
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Leads contacted + messages sent per day
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Last 4 weeks
                  </Badge>
                </div>
                <WeeklyHeatmap />
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Animated KPI Summary at bottom */}
      {showCounters && (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          data-ocid="analytics.summary.section"
        >
          {[
            {
              label: "Total Sessions",
              target: ga4Sessions,
              prefix: "",
              suffix: "",
            },
            {
              label: "Total Users",
              target: ga4Users,
              prefix: "",
              suffix: "",
            },
            {
              label: "Avg. Bounce Rate",
              target: ga4BounceRate,
              prefix: "",
              suffix: "%",
              decimals: 1,
            },
            {
              label: "Conversions",
              target: ga4Conversions,
              prefix: "",
              suffix: "",
            },
          ].map((item, i) => (
            <Card
              key={item.label}
              className="p-4 text-center"
              data-ocid={`analytics.summary.${i + 1}`}
            >
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-foreground tabular-nums font-display">
                <AnimatedCounter
                  target={item.target}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  decimals={item.decimals ?? 0}
                />
              </p>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
