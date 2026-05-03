import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HeatmapCard } from "../components/HeatmapCard";
import { MetricCard } from "../components/ui/MetricCard";
import { PageHeader } from "../components/ui/PageHeader";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FunnelStep {
  name: string;
  count: number;
  pct: number; // conversion % from previous step
}

interface CohortRow {
  cohortWeek: string;
  size: number;
  d1: number;
  d7: number;
  d30: number;
}

interface EventDrillItem {
  nextEvent: string;
  count: number;
  pct: number;
}

interface LiveEvent {
  id: number;
  userId: string;
  eventType: string;
  timestamp: Date;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const OVERVIEW_SPARKLINES: Record<string, number[]> = {
  dau: [420, 445, 398, 480, 512, 495, 543],
  wau: [2800, 2950, 3100, 2980, 3250, 3400, 3620],
  mau: [9800, 10200, 10500, 10900, 11400, 11800, 12340],
  signups: [38, 45, 52, 41, 59, 63, 71],
  conversion: [2.1, 2.4, 2.2, 2.6, 2.8, 3.1, 3.4],
  mrr: [142000, 158000, 171000, 185000, 204000, 218000, 234000],
  d1: [58, 61, 57, 63, 65, 62, 67],
  d7: [28, 31, 29, 34, 36, 33, 38],
};

const FUNNEL_STEPS: FunnelStep[] = [
  { name: "Signup", count: 5840, pct: 100 },
  { name: "Onboarding", count: 4147, pct: 71.0 },
  { name: "Leads Generated", count: 2906, pct: 70.1 },
  { name: "Message Sent", count: 1744, pct: 60.0 },
  { name: "Reply Received", count: 436, pct: 25.0 },
  { name: "Proposal Sent", count: 175, pct: 40.1 },
  { name: "Payment", count: 88, pct: 50.3 },
];

const COHORT_DATA: CohortRow[] = [
  { cohortWeek: "W1 Jan", size: 312, d1: 68, d7: 41, d30: 22 },
  { cohortWeek: "W2 Jan", size: 289, d1: 71, d7: 38, d30: 19 },
  { cohortWeek: "W3 Jan", size: 341, d1: 65, d7: 44, d30: 25 },
  { cohortWeek: "W4 Jan", size: 378, d1: 73, d7: 46, d30: 28 },
  { cohortWeek: "W1 Feb", size: 402, d1: 70, d7: 43, d30: 31 },
  { cohortWeek: "W2 Feb", size: 445, d1: 74, d7: 48, d30: 34 },
  { cohortWeek: "W3 Feb", size: 418, d1: 76, d7: 51, d30: 36 },
  { cohortWeek: "W4 Feb", size: 487, d1: 79, d7: 54, d30: 38 },
];

const DRILL_DOWN_DATA: Record<string, EventDrillItem[]> = {
  get_clients_clicked: [
    { nextEvent: "leads_generated", count: 4102, pct: 78 },
    { nextEvent: "message_sent", count: 1832, pct: 35 },
    { nextEvent: "paywall_viewed", count: 912, pct: 17 },
    { nextEvent: "app_closed", count: 820, pct: 16 },
  ],
  leads_generated: [
    { nextEvent: "message_sent", count: 2906, pct: 68 },
    { nextEvent: "paywall_viewed", count: 1248, pct: 29 },
    { nextEvent: "followup_sent", count: 612, pct: 14 },
    { nextEvent: "inactive_24h", count: 518, pct: 12 },
  ],
  message_sent: [
    { nextEvent: "reply_received", count: 436, pct: 25 },
    { nextEvent: "followup_sent", count: 786, pct: 45 },
    { nextEvent: "paywall_viewed", count: 312, pct: 18 },
    { nextEvent: "inactive_24h", count: 210, pct: 12 },
  ],
  reply_received: [
    { nextEvent: "proposal_sent", count: 305, pct: 70 },
    { nextEvent: "followup_sent", count: 131, pct: 30 },
    { nextEvent: "paywall_viewed", count: 88, pct: 20 },
    { nextEvent: "upgrade_completed", count: 44, pct: 10 },
  ],
  followup_sent: [
    { nextEvent: "reply_received", count: 412, pct: 52 },
    { nextEvent: "message_sent", count: 218, pct: 28 },
    { nextEvent: "inactive_24h", count: 168, pct: 21 },
    { nextEvent: "paywall_viewed", count: 87, pct: 11 },
  ],
  paywall_viewed: [
    { nextEvent: "upgrade_completed", count: 312, pct: 34 },
    { nextEvent: "dismissed", count: 486, pct: 53 },
    { nextEvent: "started_free_trial", count: 118, pct: 13 },
    { nextEvent: "message_sent", count: 72, pct: 8 },
  ],
  upgrade_completed: [
    { nextEvent: "leads_generated", count: 286, pct: 92 },
    { nextEvent: "message_sent", count: 261, pct: 84 },
    { nextEvent: "followup_sent", count: 214, pct: 69 },
    { nextEvent: "proposal_sent", count: 128, pct: 41 },
  ],
};

const EVENT_NAMES = [
  "get_clients_clicked",
  "leads_generated",
  "message_sent",
  "reply_received",
  "followup_sent",
  "paywall_viewed",
  "upgrade_completed",
] as const;

type CoreEvent = (typeof EVENT_NAMES)[number];

const EVENT_LABELS: Record<CoreEvent, string> = {
  get_clients_clicked: "Get Clients Clicked",
  leads_generated: "Leads Generated",
  message_sent: "Message Sent",
  reply_received: "Reply Received",
  followup_sent: "Follow-up Sent",
  paywall_viewed: "Paywall Viewed",
  upgrade_completed: "Upgrade Completed",
};

const LIVE_EVENT_TYPES: CoreEvent[] = [
  "get_clients_clicked",
  "leads_generated",
  "message_sent",
  "reply_received",
  "followup_sent",
  "paywall_viewed",
  "upgrade_completed",
];

const SAMPLE_USER_IDS = [
  "u_k8m2p",
  "u_3xnqr",
  "u_w7vlt",
  "u_9bfcz",
  "u_4hdjy",
  "u_r5aps",
  "u_2gkwm",
  "u_7tznx",
  "u_qb6fe",
  "u_1cmvj",
];

function generateLiveEvents(count: number): LiveEvent[] {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const secAgo = i * 18 + Math.floor(Math.random() * 12);
    return {
      id: i,
      userId: SAMPLE_USER_IDS[i % SAMPLE_USER_IDS.length],
      eventType:
        LIVE_EVENT_TYPES[Math.floor(Math.random() * LIVE_EVENT_TYPES.length)],
      timestamp: new Date(now.getTime() - secAgo * 1000),
    };
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtRupee(val: number): string {
  return `₹${val.toLocaleString("en-IN")}`;
}

function timeAgo(ts: Date): string {
  const secs = Math.floor((Date.now() - ts.getTime()) / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function getCohortColor(val: number): string {
  if (val >= 60) return "text-success bg-success/12";
  if (val >= 30) return "text-warning bg-warning/12";
  return "text-destructive bg-destructive/12";
}

function getFunnelColor(pct: number): {
  bar: string;
  text: string;
  alert?: string;
} {
  if (pct >= 30) return { bar: "oklch(0.62 0.22 170)", text: "text-success" };
  if (pct >= 15)
    return { bar: "oklch(0.74 0.18 86)", text: "text-warning", alert: "amber" };
  return { bar: "oklch(0.6 0.22 25)", text: "text-destructive", alert: "red" };
}

// ─── Section: Overview KPIs ───────────────────────────────────────────────────

function OverviewSection() {
  const kpis = [
    {
      title: "DAU",
      value: 543,
      change: 9,
      changeType: "up" as const,
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.dau,
    },
    {
      title: "WAU",
      value: 3620,
      change: 6,
      changeType: "up" as const,
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.wau,
    },
    {
      title: "MAU",
      value: 12340,
      change: 4,
      changeType: "up" as const,
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.mau,
    },
    {
      title: "New Signups (7d)",
      value: 71,
      change: 13,
      changeType: "up" as const,
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.signups,
    },
    {
      title: "Free → Paid Conv.",
      value: 3.4,
      change: 0.3,
      changeType: "up" as const,
      prefix: "",
      suffix: "%",
      trendData: OVERVIEW_SPARKLINES.conversion,
    },
    {
      title: "MRR",
      value: 234000,
      change: 7,
      changeType: "up" as const,
      prefix: "₹",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.mrr,
    },
    {
      title: "Day 1 Retention",
      value: 67,
      change: 5,
      changeType: "up" as const,
      prefix: "",
      suffix: "%",
      trendData: OVERVIEW_SPARKLINES.d1,
    },
    {
      title: "Day 7 Retention",
      value: 38,
      change: 5,
      changeType: "up" as const,
      prefix: "",
      suffix: "%",
      trendData: OVERVIEW_SPARKLINES.d7,
    },
  ];

  return (
    <section data-ocid="growth-engine.overview.section">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Overview
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35, ease: "easeOut" }}
            data-ocid={`growth-engine.kpi.${i + 1}`}
          >
            <MetricCard
              title={kpi.title}
              value={kpi.prefix === "₹" ? fmtRupee(kpi.value) : `${kpi.value}`}
              change={kpi.change}
              changeType={kpi.changeType}
              trendData={kpi.trendData}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Section: Funnel Drop-off ─────────────────────────────────────────────────

function FunnelSection() {
  const maxCount = FUNNEL_STEPS[0].count;

  return (
    <section data-ocid="growth-engine.funnel.section">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Funnel Drop-off
      </h2>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Signup → Payment Funnel
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {FUNNEL_STEPS.length} steps · Last 30 days ·{" "}
              <span className="font-medium text-foreground">
                {(
                  (FUNNEL_STEPS[FUNNEL_STEPS.length - 1].count / maxCount) *
                  100
                ).toFixed(1)}
                % end-to-end
              </span>
            </p>
          </div>
          <Badge variant="secondary" className="text-xs tabular-nums">
            {FUNNEL_STEPS[0].count.toLocaleString("en-IN")} signups
          </Badge>
        </div>

        <div className="space-y-1" data-ocid="growth-engine.funnel.list">
          {FUNNEL_STEPS.map((step, i) => {
            const prevCount = i === 0 ? step.count : FUNNEL_STEPS[i - 1].count;
            const convPct =
              i === 0 ? 100 : Math.round((step.count / prevCount) * 100);
            const barPct = (step.count / maxCount) * 100;
            const { bar, text, alert } = getFunnelColor(convPct);
            const showAlert = i > 0 && alert;

            return (
              <div
                key={step.name}
                data-ocid={`growth-engine.funnel.item.${i + 1}`}
              >
                <div className="flex items-center gap-3 group">
                  {/* Step label */}
                  <div className="w-32 shrink-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {step.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground tabular-nums">
                      {step.count.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 h-8 relative rounded-md bg-muted/20 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-md flex items-center"
                      initial={{ width: 0 }}
                      animate={{ width: `${barPct}%` }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.55,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      style={{ background: bar }}
                    >
                      {barPct > 20 && (
                        <span className="ml-auto mr-2 text-[11px] font-bold text-white/90 whitespace-nowrap">
                          {step.count.toLocaleString("en-IN")}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  {/* Conv % */}
                  <div className="w-16 text-right shrink-0">
                    {i === 0 ? (
                      <span className="text-xs font-semibold text-muted-foreground">
                        —
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-bold tabular-nums ${text}`}
                      >
                        {convPct}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Drop-off alert */}
                {showAlert && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.3 }}
                    className={`mt-1 mb-2 ml-[8.5rem] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                      alert === "red"
                        ? "bg-destructive/10 text-destructive border border-destructive/20"
                        : "bg-warning/10 text-warning border border-warning/20"
                    }`}
                    data-ocid={`growth-engine.funnel.alert.${i}`}
                  >
                    <span>⚠</span>
                    <span>
                      High drop-off at{" "}
                      <strong>{FUNNEL_STEPS[i - 1].name}</strong> →{" "}
                      <strong>{step.name}</strong> (only {convPct}% continue)
                    </span>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-border">
          {[
            { label: "Signup → Onboarding", val: "71%", color: "text-success" },
            { label: "Msg → Reply", val: "25%", color: "text-warning" },
            { label: "Reply → Proposal", val: "40%", color: "text-success" },
            { label: "Proposal → Payment", val: "50%", color: "text-success" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`text-lg font-bold tabular-nums ${s.color}`}>
                {s.val}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ─── Section: Cohort Retention ────────────────────────────────────────────────

function CohortSection() {
  const chartData = COHORT_DATA.map((c) => ({
    name: c.cohortWeek,
    d1: c.d1,
    d7: c.d7,
    d30: c.d30,
  }));

  return (
    <section data-ocid="growth-engine.cohort.section">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Cohort Retention
      </h2>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Weekly Cohort Retention Curves
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Last 8 signup cohorts · D1 / D7 / D30
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {[
              { label: "D1", color: "oklch(0.6 0.25 253)" },
              { label: "D7", color: "oklch(0.64 0.18 170)" },
              { label: "D30", color: "oklch(0.74 0.18 86)" },
            ].map((l) => (
              <span
                key={l.label}
                className="flex items-center gap-1.5 text-muted-foreground font-medium"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: l.color }}
                />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        {/* Trend chart */}
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={chartData}
            margin={{ top: 4, right: 12, bottom: 0, left: 0 }}
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
              tickFormatter={(v) => `${v}%`}
              width={36}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid oklch(var(--border))",
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v}%`]}
            />
            <Line
              type="monotone"
              dataKey="d1"
              stroke="oklch(0.6 0.25 253)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={700}
            />
            <Line
              type="monotone"
              dataKey="d7"
              stroke="oklch(0.64 0.18 170)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={800}
            />
            <Line
              type="monotone"
              dataKey="d30"
              stroke="oklch(0.74 0.18 86)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              animationDuration={900}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Table */}
        <div className="overflow-x-auto mt-5">
          <table
            className="w-full text-sm min-w-[480px]"
            data-ocid="growth-engine.cohort.table"
          >
            <thead>
              <tr className="border-b border-border">
                {["Cohort Week", "Size", "D1 %", "D7 %", "D30 %"].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COHORT_DATA.map((row, i) => (
                <motion.tr
                  key={row.cohortWeek}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="hover:bg-muted/20 transition-colors"
                  data-ocid={`growth-engine.cohort.row.${i + 1}`}
                >
                  <td className="px-3 py-2.5 font-medium text-foreground text-xs">
                    {row.cohortWeek}
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground tabular-nums text-xs">
                    {row.size.toLocaleString("en-IN")}
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${getCohortColor(row.d1)}`}
                    >
                      {row.d1}%
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${getCohortColor(row.d7)}`}
                    >
                      {row.d7}%
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${getCohortColor(row.d30)}`}
                    >
                      {row.d30}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-success/60" /> &gt;60% good
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-warning/60" /> 30–60% average
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded bg-destructive/60" /> &lt;30% needs
            attention
          </span>
        </div>
      </Card>
    </section>
  );
}

// ─── Section: Event Drill-down ────────────────────────────────────────────────

function EventDrillSection() {
  const [selectedEvent, setSelectedEvent] = useState<CoreEvent>("message_sent");
  const items = DRILL_DOWN_DATA[selectedEvent] ?? [];

  return (
    <section data-ocid="growth-engine.event-drill.section">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Event Drill-down
      </h2>
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <p className="text-sm font-semibold text-foreground">
              After{" "}
              <span className="text-primary font-mono">{selectedEvent}</span>,
              what happened next?
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Within 24 hours · last 30 days
            </p>
          </div>
          <Select
            value={selectedEvent}
            onValueChange={(v) => setSelectedEvent(v as CoreEvent)}
          >
            <SelectTrigger
              className="w-52 text-xs"
              data-ocid="growth-engine.event-drill.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EVENT_NAMES.map((e) => (
                <SelectItem key={e} value={e} className="text-xs">
                  {EVENT_LABELS[e]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3" data-ocid="growth-engine.event-drill.list">
          {items.map((item, i) => (
            <motion.div
              key={item.nextEvent}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="flex items-center gap-3"
              data-ocid={`growth-engine.event-drill.item.${i + 1}`}
            >
              <span className="text-xs text-muted-foreground w-4 tabular-nums shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 text-xs font-mono font-medium text-foreground truncate min-w-0">
                {item.nextEvent}
              </span>
              <div className="w-40 shrink-0">
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "oklch(0.6 0.25 253)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{
                      delay: i * 0.07 + 0.15,
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-primary tabular-nums w-8 text-right shrink-0">
                {item.pct}%
              </span>
              <span className="text-xs text-muted-foreground tabular-nums w-14 text-right shrink-0">
                {item.count.toLocaleString("en-IN")} users
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ─── Section: Live Event Stream ───────────────────────────────────────────────

const EVENT_BADGE_COLORS: Record<CoreEvent, string> = {
  get_clients_clicked: "bg-primary/12 text-primary",
  leads_generated: "bg-success/12 text-success",
  message_sent: "bg-blue-500/12 text-blue-600",
  reply_received: "bg-warning/12 text-warning",
  followup_sent: "bg-violet-500/12 text-violet-600",
  paywall_viewed: "bg-orange-500/12 text-orange-600",
  upgrade_completed: "bg-success/20 text-success",
};

function LiveEventStream() {
  const [events, setEvents] = useState<LiveEvent[]>(() =>
    generateLiveEvents(50),
  );
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setEvents(generateLiveEvents(50));
        setLastRefresh(new Date());
        setIsRefreshing(false);
      }, 300);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section data-ocid="growth-engine.live-stream.section">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Live Event Stream
        </h2>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">
            {isRefreshing ? "Refreshing…" : `Refreshed ${timeAgo(lastRefresh)}`}
          </span>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border bg-muted/30 grid grid-cols-[1fr_2fr_1fr] gap-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
          <span>User</span>
          <span>Event</span>
          <span className="text-right">When</span>
        </div>
        <div
          ref={scrollRef}
          className="overflow-y-auto max-h-80"
          data-ocid="growth-engine.live-stream.list"
        >
          {events.map((ev, i) => (
            <motion.div
              key={`${ev.id}-${lastRefresh.getTime()}`}
              initial={{ opacity: 0, backgroundColor: "oklch(0.97 0.02 253)" }}
              animate={{ opacity: 1, backgroundColor: "oklch(1 0 0 / 0)" }}
              transition={{ delay: Math.min(i * 0.01, 0.3), duration: 0.4 }}
              className="grid grid-cols-[1fr_2fr_1fr] gap-3 px-4 py-2.5 border-b border-border/40 hover:bg-muted/20 transition-colors"
              data-ocid={`growth-engine.live-stream.item.${i + 1}`}
            >
              <span className="text-xs font-mono text-muted-foreground truncate">
                {ev.userId}
              </span>
              <span>
                <span
                  className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${EVENT_BADGE_COLORS[ev.eventType as CoreEvent] ?? "bg-muted text-muted-foreground"}`}
                >
                  {ev.eventType}
                </span>
              </span>
              <span className="text-xs text-muted-foreground text-right tabular-nums">
                {timeAgo(ev.timestamp)}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ─── Section: Heatmap Summary ─────────────────────────────────────────────────

const HEATMAP_MOST_CLICKED = [
  {
    label: "Get Clients Now (FAB)",
    count: 8420,
    percentage: 100,
    color: "oklch(0.6 0.25 253)",
  },
  {
    label: "Send Pitch Button",
    count: 5830,
    percentage: 69,
    color: "oklch(0.64 0.18 170)",
  },
  {
    label: "View Lead Details",
    count: 4210,
    percentage: 50,
    color: "oklch(0.62 0.22 253)",
  },
  {
    label: "Follow Up Now",
    count: 3180,
    percentage: 38,
    color: "oklch(0.74 0.2 86)",
  },
  {
    label: "Upgrade to Growth",
    count: 2460,
    percentage: 29,
    color: "oklch(0.7 0.18 40)",
  },
];

const HEATMAP_RAGE_TAPS = [
  {
    label: "Inactive Filter Chips",
    count: 1820,
    percentage: 100,
    color: "oklch(0.55 0.25 25)",
    fix: "Add visual feedback on filter tap",
  },
  {
    label: "Paywall Dismiss",
    count: 1340,
    percentage: 74,
    color: "oklch(0.58 0.22 25)",
    fix: "Reduce paywall frequency",
  },
  {
    label: "Proposal Send (loading)",
    count: 980,
    percentage: 54,
    color: "oklch(0.62 0.2 25)",
    fix: "Show spinner on first tap",
  },
];

const HEATMAP_DEAD_CLICKS = [
  {
    label: "Lead Score Badge",
    count: 2240,
    percentage: 100,
    color: "oklch(0.65 0.18 253)",
  },
  {
    label: "Status Pill",
    count: 1560,
    percentage: 70,
    color: "oklch(0.68 0.16 253)",
  },
  {
    label: "Revenue Estimate Row",
    count: 1120,
    percentage: 50,
    color: "oklch(0.7 0.14 253)",
  },
];

function HeatmapSection() {
  return (
    <section data-ocid="growth-engine.heatmap.section">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Interaction Heatmap
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <HeatmapCard
          title="Most Clicked Buttons"
          items={HEATMAP_MOST_CLICKED}
          ocid="growth-engine.heatmap.clicks"
        />
        <HeatmapCard
          title="Rage Taps"
          items={HEATMAP_RAGE_TAPS}
          showFix
          ocid="growth-engine.heatmap.rage"
        />
        <HeatmapCard
          title="Dead Clicks"
          items={HEATMAP_DEAD_CLICKS}
          ocid="growth-engine.heatmap.dead"
        />
      </div>

      {/* Scroll depth mini chart */}
      <Card className="p-5 mt-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-foreground">
            Scroll Depth Distribution
          </p>
          <Badge variant="secondary" className="text-xs">
            Dashboard page
          </Badge>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart
            data={[
              { depth: "0%", users: 100 },
              { depth: "25%", users: 78 },
              { depth: "50%", users: 54 },
              { depth: "75%", users: 31 },
              { depth: "100%", users: 18 },
            ]}
            margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="scroll-grad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="oklch(0.6 0.25 253)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="oklch(0.6 0.25 253)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0 0 0 / 0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="depth"
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={36}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid oklch(var(--border))",
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v}% of users`]}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="oklch(0.6 0.25 253)"
              strokeWidth={2}
              fill="url(#scroll-grad)"
              dot={false}
              animationDuration={700}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </section>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function SectionSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-3 w-24 rounded" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GrowthEngineAnalyticsPage() {
  useMetaTags(PAGE_META["/growth-engine/analytics"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div data-ocid="growth-engine.analytics.page" className="space-y-8">
      <PageHeader
        title="Growth Engine"
        description="Admin Dashboard · Behavior analytics, funnel drop-off, cohort retention, live events"
        actions={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live
            </span>
            <Badge variant="outline" className="text-xs font-medium">
              Last 30 days
            </Badge>
          </div>
        }
      />

      {isLoading ? (
        <div className="space-y-8">
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      ) : (
        <>
          <OverviewSection />
          <FunnelSection />
          <CohortSection />
          <EventDrillSection />
          <LiveEventStream />
          <HeatmapSection />
        </>
      )}
    </div>
  );
}
