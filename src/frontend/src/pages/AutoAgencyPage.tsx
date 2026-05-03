import { PaywallTrigger } from "@/components/PaywallTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAutoAgency } from "@/hooks/useAutoAgency";
import { useSubscription } from "@/hooks/useSubscription";
import type {
  AutoAgencyAction,
  AutoAgencyActionType,
  CoachSuggestion,
  DealSuggestion,
} from "@/types/auto-agency";
import {
  BarChart2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  Flame,
  Lightbulb,
  RefreshCw,
  Send,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatINR(val: bigint): string {
  const n = Number(val);
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function relativeTime(nsBigint: bigint): string {
  const ms = Number(nsBigint / BigInt(1_000_000));
  const diffMs = Date.now() - ms;
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatTime(nsBigint: bigint): string {
  const ms = Number(nsBigint / BigInt(1_000_000));
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ACTION_META: Record<
  AutoAgencyActionType,
  { icon: React.ReactNode; colorClass: string; label: string }
> = {
  leadFound: {
    icon: <Users className="w-4 h-4" />,
    colorClass: "text-[oklch(var(--primary))] bg-[oklch(var(--primary)/0.1)]",
    label: "Lead Found",
  },
  outreachSent: {
    icon: <Send className="w-4 h-4" />,
    colorClass: "text-[oklch(var(--success))] bg-[oklch(var(--success)/0.1)]",
    label: "Outreach Sent",
  },
  followupSent: {
    icon: <RefreshCw className="w-4 h-4" />,
    colorClass: "text-[oklch(var(--warning))] bg-[oklch(var(--warning)/0.1)]",
    label: "Follow-up",
  },
  dealSuggested: {
    icon: <Target className="w-4 h-4" />,
    colorClass:
      "text-[oklch(var(--premium-accent))] bg-[oklch(var(--premium-accent)/0.1)]",
    label: "Deal Flagged",
  },
  reportGenerated: {
    icon: <BarChart2 className="w-4 h-4" />,
    colorClass: "text-[oklch(var(--chart-5))] bg-[oklch(var(--chart-5)/0.1)]",
    label: "Report Ready",
  },
};

function closeProbColor(prob: bigint): string {
  const n = Number(prob);
  if (n >= 85)
    return "bg-[oklch(var(--success)/0.15)] text-[oklch(var(--success))] border-[oklch(var(--success)/0.3)]";
  if (n >= 70)
    return "bg-[oklch(var(--warning)/0.15)] text-[oklch(var(--warning))] border-[oklch(var(--warning)/0.3)]";
  return "bg-[oklch(var(--primary)/0.12)] text-[oklch(var(--primary))] border-[oklch(var(--primary)/0.3)]";
}

const EFFORT_META = {
  quick: { label: "Quick Win", color: "text-[oklch(var(--success))]" },
  medium: { label: "Medium", color: "text-[oklch(var(--warning))]" },
  deep: { label: "Deep Work", color: "text-[oklch(var(--primary))]" },
} as const;

const COACH_TYPE_META: Record<
  CoachSuggestion["type"],
  { icon: React.ReactNode; badge: string }
> = {
  revenueTactic: { icon: <TrendingUp className="w-4 h-4" />, badge: "Revenue" },
  nicheTargeting: { icon: <Target className="w-4 h-4" />, badge: "Niche" },
  growthHack: { icon: <Lightbulb className="w-4 h-4" />, badge: "Growth" },
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  subtitle,
  children,
  collapsible = false,
  ocid,
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  ocid: string;
  rightSlot?: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-border/40 shadow-subtle" data-ocid={ocid}>
        <CardHeader className="pb-3 pt-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5 min-w-0">
              {title && (
                <CardTitle className="text-sm font-bold text-foreground">
                  {title}
                </CardTitle>
              )}
              {subtitle && (
                <p className="text-[11px] text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {rightSlot}
              {collapsible && (
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  data-ocid={`${ocid}.collapse_button`}
                  aria-expanded={open}
                  className="w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-colors"
                >
                  {open ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              )}
            </div>
          </div>
        </CardHeader>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden" }}
            >
              <CardContent className="pt-0 px-4 pb-4">{children}</CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

// ─── Agency Toggle ────────────────────────────────────────────────────────────

function AgencyToggle({
  enabled,
  toggling,
  onToggle,
}: {
  enabled: boolean;
  toggling: boolean;
  onToggle: (val: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between gap-4"
      data-ocid="agency.toggle_row"
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold text-foreground">
          Auto Agency Mode
        </span>
        <span className="text-xs text-muted-foreground">
          Runs daily: finds leads, sends outreach, follows up
        </span>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        data-ocid="agency.toggle"
        onClick={() => !toggling && onToggle(!enabled)}
        className={`relative shrink-0 h-7 w-12 rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          enabled
            ? "bg-[oklch(var(--success))] border-[oklch(var(--success)/0.6)]"
            : "bg-muted border-border"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-elevated flex items-center justify-center ${
            enabled ? "left-[calc(100%-22px)]" : "left-0.5"
          }`}
        >
          {toggling && (
            <RefreshCw className="w-2.5 h-2.5 text-muted-foreground animate-spin" />
          )}
        </motion.span>
      </button>
    </div>
  );
}

// ─── Status Banner ────────────────────────────────────────────────────────────

function StatusBanner({
  enabled,
  runCount,
  lastRunTime,
}: {
  enabled: boolean;
  runCount: bigint;
  lastRunTime: bigint;
}) {
  if (!enabled) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/40 border border-border/40"
        data-ocid="agency.status_banner"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30 shrink-0" />
        <span className="text-sm font-medium text-muted-foreground">
          Agency Paused — toggle ON to start automation
        </span>
      </motion.div>
    );
  }
  return (
    <motion.div
      key="active-banner"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="agency-mode-banner"
      data-ocid="agency.status_banner"
    >
      <span className="agency-mode-indicator" />
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-sm font-semibold text-foreground">
          Agency Active
        </span>
        <span className="text-xs text-muted-foreground">
          {Number(runCount)} runs · Last at {formatTime(lastRunTime)}
        </span>
      </div>
      <Badge className="bg-[oklch(var(--success)/0.15)] text-[oklch(var(--success))] border-[oklch(var(--success)/0.3)] text-xs font-bold">
        LIVE
      </Badge>
    </motion.div>
  );
}

// ─── Mini KPI Row ─────────────────────────────────────────────────────────────

function MiniKPIRow({
  leadsGenerated,
  outreachSent,
  followupsSent,
  runCount,
}: {
  leadsGenerated: bigint;
  outreachSent: bigint;
  followupsSent: bigint;
  runCount: bigint;
}) {
  const kpis = [
    {
      label: "Leads",
      value: Number(leadsGenerated),
      icon: <Users className="w-3.5 h-3.5" />,
      color: "text-[oklch(var(--primary))]",
    },
    {
      label: "Outreach",
      value: Number(outreachSent),
      icon: <Send className="w-3.5 h-3.5" />,
      color: "text-[oklch(var(--success))]",
    },
    {
      label: "Follow-ups",
      value: Number(followupsSent),
      icon: <RefreshCw className="w-3.5 h-3.5" />,
      color: "text-[oklch(var(--warning))]",
    },
    {
      label: "Runs",
      value: Number(runCount),
      icon: <Zap className="w-3.5 h-3.5" />,
      color: "text-[oklch(var(--premium-accent))]",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-2" data-ocid="agency.kpi_row">
      {kpis.map((k) => (
        <div
          key={k.label}
          className="flex flex-col items-center gap-1 py-3 rounded-xl bg-card border border-border/30 shadow-xs"
        >
          <span className={`${k.color} flex items-center`}>{k.icon}</span>
          <span className="text-base font-bold text-foreground counter-number">
            {k.value}
          </span>
          <span className="text-[10px] font-medium text-muted-foreground">
            {k.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

function ActivityFeed({ feed }: { feed: AutoAgencyAction[] }) {
  if (feed.length === 0) {
    return (
      <div
        className="flex flex-col items-center gap-3 py-10"
        data-ocid="agency.activity.empty_state"
      >
        <div className="w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center">
          <BarChart2 className="w-6 h-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground text-center">
          No activity yet. Enable Auto Agency Mode to start.
        </p>
      </div>
    );
  }
  return (
    <div
      className="flex flex-col gap-0 max-h-72 overflow-y-auto scrollbar-thin"
      data-ocid="agency.activity.list"
    >
      {feed.slice(0, 20).map((item, i) => {
        const meta = ACTION_META[item.actionType];
        return (
          <motion.div
            key={item.actionId}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex gap-3 py-3 border-b border-border/20 last:border-0"
            data-ocid={`agency.activity.item.${i + 1}`}
          >
            <span
              className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${meta.colorClass}`}
            >
              {meta.icon}
            </span>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 justify-between">
                <span className="text-xs font-semibold text-foreground truncate">
                  {item.leadName}
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  {relativeTime(item.timestamp)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground text-truncate-2">
                {item.description}
              </span>
              <span className="text-[10px] font-medium text-[oklch(var(--success))] mt-0.5">
                {item.outcome}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Deal Suggestions ─────────────────────────────────────────────────────────

function DealSuggestionsPanel({
  deals,
  isRefreshing,
  onRefresh,
  onSendPitch,
  sentId,
}: {
  deals: DealSuggestion[];
  isRefreshing: boolean;
  onRefresh: () => void;
  onSendPitch: (id: string) => void;
  sentId: string | null;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Top {Math.min(deals.length, 5)} suggestions
        </span>
        <button
          type="button"
          onClick={onRefresh}
          data-ocid="agency.deals.refresh_button"
          disabled={isRefreshing}
          className="flex items-center gap-1.5 text-xs font-semibold text-[oklch(var(--primary))] hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`}
          />
          {isRefreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      <div className="flex flex-col gap-3" data-ocid="agency.deals.list">
        {deals.slice(0, 5).map((deal, i) => (
          <motion.div
            key={deal.suggestionId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-border/30 bg-muted/20 p-4"
            data-ocid={`agency.deals.item.${i + 1}`}
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className={`deal-score-badge text-xs border ${closeProbColor(deal.closeProbability)}`}
                  >
                    {Number(deal.closeProbability)}% Close
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold capitalize"
                  >
                    {deal.pricingTier}
                  </Badge>
                </div>
                <p className="text-sm font-bold text-foreground">
                  {formatINR(deal.suggestedPrice)}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-2 text-truncate-3 italic leading-relaxed">
              "{deal.suggestedPitch}"
            </p>
            <div className="flex items-center gap-1.5 mb-3 text-[11px] text-muted-foreground font-medium">
              <Clock className="w-3 h-3 shrink-0" />
              Best time: {deal.bestContactTime}
            </div>
            <Button
              size="sm"
              className="w-full h-8 text-xs font-semibold"
              data-ocid={`agency.deals.send_pitch.${i + 1}`}
              onClick={() => onSendPitch(deal.suggestionId)}
              variant={sentId === deal.suggestionId ? "outline" : "default"}
            >
              {sentId === deal.suggestionId ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-[oklch(var(--success))]" />
                  Pitch Sent!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Send Pitch
                </>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Accountability Card ──────────────────────────────────────────────────────

function AccountabilityCard({
  daily,
  target,
  streak,
  todayComplete,
}: {
  daily: { leads: bigint; followups: bigint; deals: bigint };
  target: { leads: bigint; followups: bigint; deals: bigint };
  streak: bigint;
  todayComplete: boolean;
}) {
  const tasks = [
    {
      label: "Contact leads",
      done: Number(daily.leads),
      total: Number(target.leads),
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      label: "Follow up leads",
      done: Number(daily.followups),
      total: Number(target.followups),
      icon: <RefreshCw className="w-3.5 h-3.5" />,
    },
    {
      label: "Close a deal",
      done: Number(daily.deals),
      total: Number(target.deals),
      icon: <Target className="w-3.5 h-3.5" />,
    },
  ];
  return (
    <div data-ocid="agency.accountability_card">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Today's Tasks
        </span>
        <div className="streak-badge text-xs py-1 px-2 gap-1">
          <Flame className="w-3.5 h-3.5" />
          <span>{Number(streak)} day streak</span>
        </div>
      </div>
      {todayComplete && (
        <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-[oklch(var(--success)/0.1)] border border-[oklch(var(--success)/0.3)]">
          <CheckCircle2 className="w-4 h-4 text-[oklch(var(--success))]" />
          <span className="text-xs font-semibold text-[oklch(var(--success))]">
            All tasks complete today! 🎉
          </span>
        </div>
      )}
      <div className="flex flex-col gap-1">
        {tasks.map((t, i) => {
          const isComplete = t.done >= t.total;
          const pct = Math.min(100, (t.done / t.total) * 100);
          return (
            <div
              key={t.label}
              className="accountability-task"
              data-ocid={`agency.task.item.${i + 1}`}
            >
              <span
                className={`accountability-checkbox ${isComplete ? "completed" : ""}`}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-card" />
                ) : (
                  <Circle className="w-3 h-3 text-muted-foreground/50" />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="accountability-text text-xs">{t.label}</span>
                  <span className="text-[11px] font-bold text-foreground">
                    {t.done}/{t.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Automation Settings ──────────────────────────────────────────────────────

function AutomationSettings({ enabled }: { enabled: boolean }) {
  const [freq, setFreq] = useState<"daily" | "twice">("daily");
  const [threshold, setThreshold] = useState<60 | 70 | 80>(70);
  const [autoOutreach, setAutoOutreach] = useState(true);
  const [autoFollowup, setAutoFollowup] = useState(true);
  const [reportGen, setReportGen] = useState(true);

  function ToggleRow({
    label,
    desc,
    checked,
    onToggle,
    ocid,
  }: {
    label: string;
    desc: string;
    checked: boolean;
    onToggle: () => void;
    ocid: string;
  }) {
    return (
      <div className="flex items-center justify-between gap-4 py-3 border-b border-border/20 last:border-0">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-[11px] text-muted-foreground">{desc}</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          data-ocid={ocid}
          onClick={onToggle}
          disabled={!enabled}
          className={`relative shrink-0 h-6 w-10 rounded-full border transition-all duration-200 disabled:opacity-40 ${
            checked
              ? "bg-[oklch(var(--primary))] border-[oklch(var(--primary)/0.5)]"
              : "bg-muted border-border"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-all duration-200 ${
              checked ? "left-[calc(100%-18px)]" : "left-0.5"
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div data-ocid="agency.settings_section">
      <div className="mb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Run Frequency
        </p>
        <div className="flex gap-2">
          {(["daily", "twice"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => enabled && setFreq(f)}
              disabled={!enabled}
              data-ocid={`agency.settings.freq.${f}`}
              className={`flex-1 h-9 rounded-lg text-xs font-semibold border transition-all duration-200 disabled:opacity-40 ${
                freq === f
                  ? "bg-[oklch(var(--primary)/0.12)] border-[oklch(var(--primary)/0.4)] text-[oklch(var(--primary))]"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              {f === "daily" ? "Daily" : "Twice Daily"}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Min Lead Score
        </p>
        <div className="flex gap-2">
          {([60, 70, 80] as const).map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => enabled && setThreshold(score)}
              disabled={!enabled}
              data-ocid={`agency.settings.threshold.${score}`}
              className={`flex-1 h-9 rounded-lg text-xs font-semibold border transition-all duration-200 disabled:opacity-40 ${
                threshold === score
                  ? "bg-[oklch(var(--primary)/0.12)] border-[oklch(var(--primary)/0.4)] text-[oklch(var(--primary))]"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              {score}+
            </button>
          ))}
        </div>
      </div>
      <ToggleRow
        label="Auto Outreach"
        desc="Send first pitch automatically"
        checked={autoOutreach}
        onToggle={() => setAutoOutreach((v) => !v)}
        ocid="agency.settings.auto_outreach"
      />
      <ToggleRow
        label="Auto Follow-up"
        desc="Follow up unreplied leads after 48h"
        checked={autoFollowup}
        onToggle={() => setAutoFollowup((v) => !v)}
        ocid="agency.settings.auto_followup"
      />
      <ToggleRow
        label="Report Generation"
        desc="Auto-generate monthly client reports"
        checked={reportGen}
        onToggle={() => setReportGen((v) => !v)}
        ocid="agency.settings.report_gen"
      />
    </div>
  );
}

// ─── Coach Suggestions ────────────────────────────────────────────────────────

function CoachSuggestionsSection({
  suggestions,
}: {
  suggestions: CoachSuggestion[];
}) {
  return (
    <div
      className="flex flex-col gap-3"
      data-ocid="agency.coach_suggestions.list"
    >
      {suggestions.slice(0, 4).map((s, i) => {
        const typeMeta = COACH_TYPE_META[s.type];
        const effortMeta = EFFORT_META[s.effort];
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl border border-border/30 bg-muted/20 p-4"
            data-ocid={`agency.coach_suggestions.item.${i + 1}`}
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-8 h-8 rounded-lg bg-[oklch(var(--primary)/0.08)] flex items-center justify-center text-[oklch(var(--primary))]">
                {typeMeta.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold"
                  >
                    {typeMeta.badge}
                  </Badge>
                  <span
                    className={`text-[10px] font-semibold ${effortMeta.color}`}
                  >
                    {effortMeta.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {s.title}
                </p>
                <p className="text-xs text-muted-foreground text-truncate-2">
                  {s.description}
                </p>
                <p className="text-xs font-semibold text-[oklch(var(--success))] mt-1.5">
                  {s.expectedROI}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 h-8 text-xs font-semibold"
              data-ocid={`agency.coach_suggestions.action.${i + 1}`}
            >
              {s.actionLabel}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Plan Gate ────────────────────────────────────────────────────────────────

function PlanGate({ children }: { children: React.ReactNode }) {
  const { data: sub } = useSubscription();
  const plan = String(sub?.plan ?? "free").toLowerCase();
  const tiers: Record<string, number> = {
    free: 0,
    starter: 1,
    growth: 2,
    pro: 3,
    agency: 4,
  };
  const tier = tiers[plan] ?? 0;
  if (tier >= 3) return <>{children}</>;
  return (
    <PaywallTrigger feature="auto-follow-up" requiredPlan="pro">
      <div className="pointer-events-none select-none">{children}</div>
    </PaywallTrigger>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AutoAgencyPage() {
  const {
    agencyState,
    accountabilityState,
    dealSuggestions,
    isAutoAgencyEnabled,
    toggleAutoAgency,
    isToggling,
    runAgencyCycle,
    isRunning,
    refreshDealSuggestions,
    coachSuggestions,
  } = useAutoAgency();

  const [pitchSentId, setPitchSentId] = useState<string | null>(null);

  function handleSendPitch(id: string) {
    setPitchSentId(id);
    setTimeout(() => setPitchSentId(null), 2500);
  }

  return (
    <PlanGate>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="flex flex-col gap-4 px-4 pt-4 pb-6 mobile-safe-content"
        data-ocid="auto_agency.page"
      >
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-0.5"
          data-ocid="auto_agency.header"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[oklch(var(--primary)/0.12)] flex items-center justify-center">
              <Zap className="w-4 h-4 text-[oklch(var(--primary))]" />
            </div>
            <h1 className="text-xl font-bold font-display text-foreground">
              Auto Agency Mode
            </h1>
          </div>
          <p className="text-xs text-muted-foreground pl-10">
            Your AI-powered marketing assistant
          </p>
        </motion.div>

        {/* Toggle + Status */}
        <Section title="" ocid="agency.control_section">
          <AgencyToggle
            enabled={isAutoAgencyEnabled}
            toggling={isToggling}
            onToggle={toggleAutoAgency}
          />
          <Separator className="my-3 opacity-40" />
          <AnimatePresence mode="wait">
            <StatusBanner
              key={isAutoAgencyEnabled ? "on" : "off"}
              enabled={isAutoAgencyEnabled}
              runCount={agencyState.runCount}
              lastRunTime={agencyState.lastRunTime}
            />
          </AnimatePresence>
        </Section>

        {/* Mini KPI Row — visible when ON */}
        <AnimatePresence>
          {isAutoAgencyEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MiniKPIRow
                leadsGenerated={agencyState.dailyLeadsGenerated}
                outreachSent={agencyState.dailyOutreachSent}
                followupsSent={agencyState.dailyFollowupsSent}
                runCount={agencyState.runCount}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agency Status Card — visible when ON */}
        <AnimatePresence>
          {isAutoAgencyEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className="border-[oklch(var(--success)/0.2)] bg-card shadow-subtle"
                data-ocid="agency.status_card"
              >
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold">
                      Agency Running
                    </CardTitle>
                    <Button
                      size="sm"
                      className="h-7 px-3 text-xs font-semibold"
                      onClick={runAgencyCycle}
                      disabled={isRunning}
                      data-ocid="agency.run_now_button"
                    >
                      {isRunning ? (
                        <>
                          <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" />
                          Running…
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 mr-1.5" />
                          Run Now
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                        Last Run
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {relativeTime(agencyState.lastRunTime)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">
                        Next Run
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {relativeTime(agencyState.nextRunTime)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 px-3 py-2 rounded-lg bg-[oklch(var(--success)/0.06)] border border-[oklch(var(--success)/0.15)] text-xs text-muted-foreground font-medium leading-relaxed">
                    Your agency is running in the background — leads contacted,
                    replies waiting, deals ready to close.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accountability Progress */}
        <Section
          title="Daily Accountability"
          subtitle="Stay consistent to grow faster"
          ocid="agency.accountability_section"
        >
          <AccountabilityCard
            daily={{
              leads: accountabilityState.dailyLeadsContacted,
              followups: accountabilityState.dailyFollowupsDone,
              deals: accountabilityState.dailyDealsClosed,
            }}
            target={{
              leads: accountabilityState.targetLeads,
              followups: accountabilityState.targetFollowups,
              deals: accountabilityState.targetDeals,
            }}
            streak={accountabilityState.currentStreak}
            todayComplete={accountabilityState.todayComplete}
          />
        </Section>

        {/* Deal Suggestions */}
        <Section
          title="Deal Suggestions"
          subtitle="Highest probability deals to close today"
          ocid="agency.deals_section"
          rightSlot={
            pitchSentId != null ? (
              <span className="text-[10px] font-bold text-[oklch(var(--success))] flex items-center gap-1 checkmark">
                <CheckCircle2 className="w-3 h-3" /> Sent!
              </span>
            ) : undefined
          }
        >
          <DealSuggestionsPanel
            deals={dealSuggestions}
            isRefreshing={false}
            onRefresh={refreshDealSuggestions}
            onSendPitch={handleSendPitch}
            sentId={pitchSentId}
          />
        </Section>

        {/* Activity Feed */}
        <Section
          title="Activity Feed"
          subtitle="What your agency did today"
          ocid="agency.activity_section"
        >
          <ActivityFeed feed={agencyState.lastActivityFeed} />
        </Section>

        {/* AI Business Coach */}
        <Section
          title="AI Business Coach"
          subtitle="Daily tactics to grow your agency faster"
          ocid="agency.coach_section"
        >
          <CoachSuggestionsSection suggestions={coachSuggestions} />
        </Section>

        {/* Automation Settings (collapsible) */}
        <Section
          title="Automation Settings"
          subtitle="Configure how the agency runs"
          collapsible
          ocid="agency.automation_settings_section"
        >
          <AutomationSettings enabled={isAutoAgencyEnabled} />
        </Section>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[11px] text-center text-muted-foreground px-4"
        >
          All outreach is consent-based and rate-limited. GrowthOS never spams.
        </motion.p>
      </motion.div>
    </PlanGate>
  );
}
