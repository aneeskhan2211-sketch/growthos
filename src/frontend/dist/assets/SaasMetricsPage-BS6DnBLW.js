import { u as useActor, a as useQuery, b as useQueryClient, d as useMutation, e as createActor, r as reactExports, cv as SpendChannel, j as jsxRuntimeExports, A as AnimatePresence, y as motion, X, L as Label, I as Input, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem, i as Button, f as cn, m as ue, aG as useMetaTags, cw as DollarSign, T as TrendingUp, aO as Activity, aa as Target, ba as TrendingDown, C as Clock, ao as Wallet, h as Badge, R as ResponsiveContainer, J as BarChart, b1 as CartesianGrid, K as XAxis, Y as YAxis, N as Tooltip, O as Bar, Q as Cell, bR as LineChart, cx as Legend, bS as Line, a2 as Users, aE as Info, aN as PAGE_META, cy as AlertSeverity, aC as TriangleAlert } from "./index-DcPx_5wo.js";
import { f as fmtINR, u as useSaasMetrics, a as fmtLakhs } from "./useSaasMetrics-CVvZTjnx.js";
import { a as useCohortRetentionRows } from "./useRetentionAnalytics-BooQoMkB.js";
import { A as AreaChart, a as Area } from "./AreaChart-S7CCCoYI.js";
import { P as PieChart, a as Pie } from "./PieChart-UXgBuAgW.js";
import { A as ArrowUpRight } from "./arrow-up-right-B1K0Na3Y.js";
import { A as ArrowDownRight } from "./arrow-down-right-CtD2X7uP.js";
function useMarketingSpend(month) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["marketingSpend", month ?? "all"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMarketingSpend(month ?? null);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useRecordMarketingSpend() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ month, channel, amountRs }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.recordMarketingSpend(month, channel, BigInt(amountRs));
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["marketingSpend"] });
      void qc.invalidateQueries({ queryKey: ["saasMetrics"] });
    }
  });
}
const CHANNEL_LABELS = {
  [SpendChannel.googleAds]: "Google Ads",
  [SpendChannel.metaAds]: "Meta Ads (Facebook + Instagram)",
  [SpendChannel.referral]: "Referral Program",
  [SpendChannel.other]: "Other"
};
const CHANNEL_COLORS = {
  [SpendChannel.googleAds]: "bg-[oklch(0.53_0.22_253)]",
  [SpendChannel.metaAds]: "bg-[oklch(0.42_0.17_280)]",
  [SpendChannel.referral]: "bg-[oklch(0.56_0.15_170)]",
  [SpendChannel.other]: "bg-[oklch(0.55_0.05_250)]"
};
function MarketingSpendModal({ onClose }) {
  const today = /* @__PURE__ */ new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const [channel, setChannel] = reactExports.useState(SpendChannel.googleAds);
  const [month, setMonth] = reactExports.useState(defaultMonth);
  const [amount, setAmount] = reactExports.useState("");
  const { data: spendRecords } = useMarketingSpend(month);
  const { mutateAsync: recordSpend, isPending } = useRecordMarketingSpend();
  const channelTotals = {};
  for (const r of spendRecords ?? []) {
    const ch = r.channel;
    channelTotals[ch] = (channelTotals[ch] ?? 0) + Number(r.amountRs);
  }
  const totalSpend = Object.values(channelTotals).reduce(
    (s, v) => s + (v ?? 0),
    0
  );
  async function handleSubmit(e) {
    e.preventDefault();
    const amountNum = Number(amount.replace(/[^0-9]/g, ""));
    if (!amountNum || amountNum <= 0) {
      ue.error("Enter a valid amount in ₹");
      return;
    }
    if (!/^\d{4}-\d{2}$/.test(month)) {
      ue.error("Month must be in YYYY-MM format");
      return;
    }
    try {
      await recordSpend({ month, channel, amountRs: amountNum });
      ue.success(
        `Recorded ${fmtINR(amountNum)} for ${CHANNEL_LABELS[channel]}`
      );
      setAmount("");
    } catch {
      ue.error("Failed to record spend. Try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "absolute inset-0 w-full h-full cursor-default",
        "aria-label": "Close modal",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { scale: 0.94, opacity: 0, y: 12 },
        animate: { scale: 1, opacity: 1, y: 0 },
        exit: { scale: 0.94, opacity: 0, y: 12 },
        transition: { duration: 0.2, ease: "easeOut" },
        className: "relative bg-card border border-border/50 rounded-2xl shadow-elevated w-full max-w-md mx-4 overflow-hidden",
        onClick: (e) => e.stopPropagation(),
        "data-ocid": "marketing_spend.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-bold text-foreground", children: "Update Ad Spend" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Record monthly marketing spend by channel" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Close",
                className: "text-muted-foreground hover:text-foreground transition-fast p-1 rounded-lg hover:bg-muted/30",
                "data-ocid": "marketing_spend.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "spend-month", className: "text-xs font-semibold", children: "Month (YYYY-MM)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "spend-month",
                    type: "month",
                    value: month,
                    onChange: (e) => setMonth(e.target.value),
                    className: "h-9 text-sm",
                    "data-ocid": "marketing_spend.month_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "spend-channel",
                    className: "text-xs font-semibold",
                    children: "Channel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: channel,
                    onValueChange: (v) => setChannel(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "spend-channel",
                          className: "h-9 text-sm",
                          "data-ocid": "marketing_spend.channel_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(SpendChannel).map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ch, children: CHANNEL_LABELS[ch] }, ch)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "spend-amount", className: "text-xs font-semibold", children: "Amount (₹)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground", children: "₹" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "spend-amount",
                      type: "number",
                      min: "1",
                      placeholder: "0",
                      value: amount,
                      onChange: (e) => setAmount(e.target.value),
                      className: "h-9 pl-7 text-sm",
                      "data-ocid": "marketing_spend.amount_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full",
                  disabled: isPending,
                  "data-ocid": "marketing_spend.submit_button",
                  children: isPending ? "Recording…" : "Record Spend"
                }
              )
            ] }),
            spendRecords && spendRecords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/20 rounded-xl p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
                  month,
                  " Spend Breakdown"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground", children: [
                  fmtINR(totalSpend),
                  " total"
                ] })
              ] }),
              Object.entries(channelTotals).map(([ch, amt]) => {
                const pct = totalSpend > 0 ? (amt ?? 0) / totalSpend * 100 : 0;
                const colorClass = CHANNEL_COLORS[ch] ?? "bg-muted-foreground";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-1",
                    "data-ocid": `marketing_spend.channel_row.${ch}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: CHANNEL_LABELS[ch] ?? ch }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground tabular-nums", children: [
                          fmtINR(amt ?? 0),
                          " · ",
                          pct.toFixed(1),
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: cn("h-full rounded-full", colorClass),
                          style: { width: `${pct}%` }
                        }
                      ) })
                    ]
                  },
                  ch
                );
              })
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
const MRR_TREND = [
  { month: "Jun '24", mrr: 21e4 },
  { month: "Jul '24", mrr: 238e3 },
  { month: "Aug '24", mrr: 265e3 },
  { month: "Sep '24", mrr: 296e3 },
  { month: "Oct '24", mrr: 325e3 },
  { month: "Nov '24", mrr: 352e3 },
  { month: "Dec '24", mrr: 378e3 },
  { month: "Jan '25", mrr: 402e3 },
  { month: "Feb '25", mrr: 423e3 },
  { month: "Mar '25", mrr: 447e3 },
  { month: "Apr '25", mrr: 463e3 },
  { month: "May '25", mrr: 485e3 }
];
const FUNNEL_DATA = [
  { name: "Signup", count: 10420, pct: 100, dropPct: null },
  { name: "Activation", count: 6852, pct: 65.8, dropPct: 34.2 },
  { name: "Paid", count: 342, pct: 5, dropPct: 95 },
  { name: "Retained", count: 318, pct: 93, dropPct: 7 }
];
const CAC_COLORS = [
  "oklch(0.53 0.22 253)",
  "oklch(0.42 0.17 280)",
  "oklch(0.56 0.15 170)",
  "oklch(0.55 0.05 250)"
];
function DynamicAlertBanner({ alert, onDismiss }) {
  const isDestructive = alert.severity === AlertSeverity.critical;
  const Icon = isDestructive ? TrendingDown : TriangleAlert;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8, height: 0 },
      className: cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg border text-sm relative",
        isDestructive ? "bg-destructive/8 border-l-4 border-l-destructive border-destructive/20 text-destructive" : "bg-warning/8 border-l-4 border-l-warning border-warning/20 text-warning"
      ),
      "data-ocid": `saas_metrics.alert.${alert.alertId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
            alert.alert,
            "."
          ] }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-80 text-xs", children: [
            "Threshold: ",
            alert.threshold,
            " · Actual: ",
            alert.actual
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onDismiss,
            "aria-label": "Dismiss alert",
            "data-ocid": `saas_metrics.alert.${alert.alertId}.close_button`,
            className: "shrink-0 opacity-60 hover:opacity-100 transition-fast",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
const BADGE_STYLES = {
  healthy: "bg-success/15 text-success border-success/20",
  fast: "bg-success/15 text-success border-success/20",
  weak: "bg-warning/15 text-warning border-warning/20",
  avg: "bg-warning/15 text-warning border-warning/20",
  loss: "bg-destructive/15 text-destructive border-destructive/20",
  slow: "bg-destructive/15 text-destructive border-destructive/20"
};
const BADGE_LABELS = {
  healthy: "Healthy ✓",
  fast: "Recovering fast ✓",
  weak: "Weak",
  avg: "Average",
  loss: "Loss ✗",
  slow: "Recovery slow"
};
function MetricCard({
  title,
  value,
  change,
  subtitle,
  tooltip,
  badge,
  index,
  icon: Icon
}) {
  const [showTooltip, setShowTooltip] = reactExports.useState(false);
  const isPositive = change !== void 0 && change >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.06, ease: "easeOut" },
      className: "bg-card rounded-xl border border-border/50 p-5 shadow-card hover:shadow-elevated transition-smooth relative group",
      "data-ocid": `saas_metrics.kpi.${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] to-success/[0.03] pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-primary/8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "opacity-0 group-hover:opacity-100 transition-fast text-muted-foreground hover:text-foreground",
                onMouseEnter: () => setShowTooltip(true),
                onMouseLeave: () => setShowTooltip(false),
                "aria-label": `Info: ${title}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-foreground tabular-nums mb-1", children: value }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: subtitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            change !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "flex items-center gap-1 text-xs font-semibold",
                  isPositive ? "text-success" : "text-destructive"
                ),
                children: [
                  isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "w-3 h-3" }),
                  isPositive ? "+" : "",
                  change,
                  "% MoM"
                ]
              }
            ),
            badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded border",
                  BADGE_STYLES[badge.variant]
                ),
                children: BADGE_LABELS[badge.variant]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showTooltip && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95, y: 4 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95 },
            className: "absolute top-full left-0 right-0 mt-2 z-50 bg-popover border border-border rounded-lg p-3 shadow-elevated",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: tooltip })
          }
        ) })
      ]
    }
  );
}
const HEALTH_STATUS_STYLES = {
  Strong: {
    dot: "bg-success",
    text: "text-success",
    bg: "bg-success/8 border-success/20"
  },
  Watchful: {
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning/8 border-warning/20"
  },
  Critical: {
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/8 border-destructive/20"
  }
};
function HealthBox({ title, status, value, change, index }) {
  const styles = HEALTH_STATUS_STYLES[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: 0.4 + index * 0.07, duration: 0.25 },
      className: cn("rounded-xl border p-4 flex flex-col gap-2", styles.bg),
      "data-ocid": `saas_metrics.health.${title.toLowerCase().replace(/\s+/g, "_")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-2 h-2 rounded-full shrink-0", styles.dot) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-lg font-display font-bold", styles.text), children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("text-xs font-semibold", styles.text), children: [
          status,
          " · ",
          change
        ] })
      ]
    }
  );
}
function ltvCacBadgeVariant(status) {
  if (status === "healthy") return "healthy";
  if (status === "loss") return "loss";
  return "weak";
}
function cacPaybackBadge(months) {
  if (months < 12) return "fast";
  if (months <= 18) return "avg";
  return "slow";
}
const DATE_RANGES = ["Last Month", "Last 3 Months", "Last 12 Months"];
function SaasMetricsPage() {
  useMetaTags(PAGE_META["/saas-metrics"]);
  const [dateRange, setDateRange] = reactExports.useState("Last 12 Months");
  const [dismissed, setDismissed] = reactExports.useState({});
  const [showSpendModal, setShowSpendModal] = reactExports.useState(false);
  const { metrics, healthAlerts } = useSaasMetrics();
  const { data: cohortRows } = useCohortRetentionRows();
  const dismiss = (key) => setDismissed((d) => ({ ...d, [key]: true }));
  const retentionData = cohortRows ?? [];
  const mrrWaterfall = [
    {
      name: "Opening MRR",
      value: metrics.mrr - metrics.newMrr - metrics.expansionMrr + metrics.churnedMrr,
      type: "opening"
    },
    { name: "New MRR", value: metrics.newMrr, type: "new" },
    { name: "Expansion", value: metrics.expansionMrr, type: "expansion" },
    { name: "Churn MRR", value: -metrics.churnedMrr, type: "churn" },
    { name: "Net MRR", value: metrics.mrr, type: "net" }
  ];
  const cacBreakdown = [
    { name: "Google Ads", value: metrics.cacByChannel.googleAds },
    { name: "Meta Ads", value: metrics.cacByChannel.metaAds },
    { name: "Referral", value: metrics.cacByChannel.referral },
    ...metrics.cacByChannel.other > 0 ? [{ name: "Other", value: metrics.cacByChannel.other }] : []
  ].filter((c) => c.value > 0);
  const kpiCards = [
    {
      title: "MRR",
      value: fmtINR(metrics.mrr),
      change: metrics.monthlyGrowthRate,
      subtitle: "Monthly Recurring Revenue",
      tooltip: "Total recurring revenue billed in the current month from all active subscriptions.",
      icon: DollarSign,
      index: 0
    },
    {
      title: "ARR",
      value: fmtLakhs(metrics.arr),
      change: metrics.monthlyGrowthRate,
      subtitle: "MRR × 12",
      tooltip: "Annualised Recurring Revenue = MRR × 12. Assumes current MRR holds constant for 12 months.",
      icon: TrendingUp,
      index: 1
    },
    {
      title: "LTV",
      value: fmtINR(metrics.ltv),
      subtitle: "Per customer lifetime",
      tooltip: `LTV = ARPU ÷ Monthly Churn Rate = ${fmtINR(metrics.arpu)} ÷ ${metrics.monthlyChurnRate}%`,
      icon: Activity,
      index: 2
    },
    {
      title: "CAC",
      value: fmtINR(metrics.cac),
      subtitle: "Cost per acquired customer",
      tooltip: `CAC = Total Marketing Spend ÷ New Customers = ${fmtINR(metrics.cacByChannel.totalSpend)} ÷ ${metrics.newCustomers}`,
      icon: Target,
      index: 3
    },
    {
      title: "LTV:CAC Ratio",
      value: `${metrics.ltvCacRatio.toFixed(2)}x`,
      badge: {
        label: "Ratio",
        variant: ltvCacBadgeVariant(metrics.ltvCacStatus)
      },
      subtitle: "≥ 3x is benchmark",
      tooltip: `LTV:CAC = ${fmtINR(metrics.ltv)} ÷ ${fmtINR(metrics.cac)} = ${metrics.ltvCacRatio.toFixed(2)}x`,
      icon: TrendingUp,
      index: 4
    },
    {
      title: "Churn Rate",
      value: `${metrics.monthlyChurnRate.toFixed(1)}%`,
      change: metrics.monthlyChurnRate - metrics.monthlyChurnRate * 0.9,
      subtitle: `Revenue churn: ${metrics.revenueChurnRate.toFixed(1)}%`,
      tooltip: `Monthly customer churn = churned customers ÷ total customers. ${metrics.churnedCustomers} ÷ ${metrics.totalPayingCustomers}`,
      icon: TrendingDown,
      index: 5
    },
    {
      title: "NRR",
      value: `${metrics.nrr.toFixed(1)}%`,
      change: 1.4,
      subtitle: "Net Revenue Retention",
      tooltip: "NRR = (Opening MRR + Expansion − Churn) ÷ Opening MRR × 100. >100% means revenue grows without new customers.",
      icon: Activity,
      index: 6
    },
    {
      title: "CAC Payback",
      value: `${metrics.cacPaybackMonths.toFixed(1)} months`,
      badge: {
        label: "Payback",
        variant: cacPaybackBadge(metrics.cacPaybackMonths)
      },
      subtitle: "Time to recover CAC",
      tooltip: `CAC Payback = CAC ÷ ARPU = ${fmtINR(metrics.cac)} ÷ ${fmtINR(metrics.arpu)} = ${metrics.cacPaybackMonths.toFixed(1)} months`,
      icon: Clock,
      index: 7
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "saas_metrics.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5 sticky top-0 z-20 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
          "SaaS Metrics"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Investor-ready view of revenue, unit economics, and growth" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowSpendModal(true),
            "data-ocid": "saas_metrics.update_ad_spend_button",
            className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border/50 bg-card hover:bg-muted/30 transition-fast text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-3.5 h-3.5 text-primary" }),
              "Update Ad Spend"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-muted/40 rounded-lg p-1", children: DATE_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setDateRange(r),
            "data-ocid": `saas_metrics.date_range.${r.toLowerCase().replace(/\s+/g, "_")}`,
            className: cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-fast",
              dateRange === r ? "bg-card shadow-subtle text-foreground" : "text-muted-foreground hover:text-foreground"
            ),
            children: r
          },
          r
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6 space-y-6 max-w-[1600px] mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "saas_metrics.alerts_section", children: [
        healthAlerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Alert System" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] text-warning border-warning/30",
              children: [
                healthAlerts.length,
                " active alert",
                healthAlerts.length !== 1 ? "s" : ""
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: healthAlerts.filter((a) => !dismissed[a.alertId]).map((alert) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DynamicAlertBanner,
          {
            alert,
            onDismiss: () => dismiss(alert.alertId)
          },
          alert.alertId
        )) }),
        healthAlerts.length > 0 && healthAlerts.every((a) => dismissed[a.alertId]) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "All alerts dismissed. Alerts fire automatically when thresholds are breached." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "saas_metrics.kpi_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Key Performance Indicators" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4", children: kpiCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { ...card }, card.title)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "saas_metrics.health_scorecard", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Health Scorecard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HealthBox,
            {
              title: "Revenue Health",
              status: metrics.monthlyGrowthRate >= 5 ? "Strong" : metrics.monthlyGrowthRate >= 0 ? "Watchful" : "Critical",
              value: `+${metrics.monthlyGrowthRate.toFixed(1)}% MoM`,
              change: `${fmtLakhs(metrics.arr)} ARR`,
              index: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HealthBox,
            {
              title: "Unit Economics",
              status: metrics.ltvCacRatio >= 3 ? "Strong" : metrics.ltvCacRatio >= 1 ? "Watchful" : "Critical",
              value: `LTV:CAC ${metrics.ltvCacRatio.toFixed(2)}x`,
              change: `CAC ${fmtINR(metrics.cac)}`,
              index: 1
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HealthBox,
            {
              title: "Retention Health",
              status: metrics.nrr >= 100 ? "Strong" : metrics.nrr >= 90 ? "Watchful" : "Critical",
              value: `NRR ${metrics.nrr.toFixed(1)}%`,
              change: `Churn ${metrics.monthlyChurnRate.toFixed(1)}%`,
              index: 2
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HealthBox,
            {
              title: "Growth Efficiency",
              status: metrics.cacPaybackMonths <= 12 ? "Strong" : metrics.cacPaybackMonths <= 18 ? "Watchful" : "Critical",
              value: `Payback ${metrics.cacPaybackMonths.toFixed(1)}mo`,
              change: `${metrics.totalPayingCustomers} paying`,
              index: 3
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "saas_metrics.charts_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.5 },
            className: "bg-card rounded-xl border border-border/50 p-5 shadow-card",
            "data-ocid": "saas_metrics.chart.mrr_waterfall",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground", children: "MRR Waterfall" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Revenue movement: New + Expansion − Churn" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                BarChart,
                {
                  data: mrrWaterfall,
                  margin: { top: 8, right: 8, left: 0, bottom: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "oklch(0.88 0 0 / 0.5)",
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "name",
                        tick: { fontSize: 10, fill: "oklch(0.55 0 0)" },
                        axisLine: false,
                        tickLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10, fill: "oklch(0.55 0 0)" },
                        axisLine: false,
                        tickLine: false,
                        tickFormatter: (v) => fmtLakhs(Math.abs(v))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        content: ({ active, payload, label }) => {
                          if (!active || !(payload == null ? void 0 : payload.length)) return null;
                          const v = payload[0].value;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-lg p-3 shadow-elevated text-xs", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                              fmtINR(Math.abs(v)),
                              v < 0 ? " (lost)" : ""
                            ] })
                          ] });
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [4, 4, 0, 0], maxBarSize: 64, children: mrrWaterfall.map((entry) => {
                      const colorMap = {
                        opening: "oklch(0.53 0.22 253)",
                        new: "oklch(0.56 0.15 170)",
                        expansion: "oklch(0.62 0.17 170)",
                        churn: "oklch(0.55 0.22 25)",
                        net: "oklch(0.53 0.22 253)"
                      };
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: colorMap[entry.type] }, entry.name);
                    }) })
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.55 },
            className: "bg-card rounded-xl border border-border/50 p-5 shadow-card",
            "data-ocid": "saas_metrics.chart.retention_cohort",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground", children: "Retention Cohort" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "D1 / D7 / D30 / D60 retention by signup week" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                LineChart,
                {
                  data: retentionData,
                  margin: { top: 8, right: 8, left: 0, bottom: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "oklch(0.88 0 0 / 0.5)",
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "week",
                        tick: { fontSize: 10, fill: "oklch(0.55 0 0)" },
                        axisLine: false,
                        tickLine: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10, fill: "oklch(0.55 0 0)" },
                        axisLine: false,
                        tickLine: false,
                        tickFormatter: (v) => `${v}%`,
                        domain: [0, 100]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        content: ({ active, payload, label }) => {
                          if (!active || !(payload == null ? void 0 : payload.length)) return null;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-lg p-3 shadow-elevated text-xs", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-2", children: label }),
                            payload.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "flex items-center gap-2 mb-1",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      className: "w-2 h-2 rounded-full",
                                      style: { background: String(p.color) }
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                                    p.name,
                                    ":"
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                                    p.value,
                                    "%"
                                  ] })
                                ]
                              },
                              p.name
                            ))
                          ] });
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 11 } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Line,
                      {
                        type: "monotone",
                        dataKey: "D1",
                        stroke: "oklch(0.53 0.22 253)",
                        strokeWidth: 2,
                        dot: false,
                        name: "D1"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Line,
                      {
                        type: "monotone",
                        dataKey: "D7",
                        stroke: "oklch(0.56 0.15 170)",
                        strokeWidth: 2,
                        dot: false,
                        name: "D7"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Line,
                      {
                        type: "monotone",
                        dataKey: "D30",
                        stroke: "oklch(0.68 0.18 86)",
                        strokeWidth: 2,
                        dot: false,
                        name: "D30"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Line,
                      {
                        type: "monotone",
                        dataKey: "D60",
                        stroke: "oklch(0.65 0.15 40)",
                        strokeWidth: 2,
                        dot: false,
                        name: "D60"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.6 },
            className: "bg-card rounded-xl border border-border/50 p-5 shadow-card",
            "data-ocid": "saas_metrics.chart.conversion_funnel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground", children: "Acquisition Funnel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Signup → Activation → Paid → Retained" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FUNNEL_DATA.map((step, i) => {
                const colors = [
                  "oklch(0.53 0.22 253)",
                  "oklch(0.58 0.2 253)",
                  "oklch(0.56 0.15 170)",
                  "oklch(0.62 0.17 170)"
                ];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "space-y-1",
                    "data-ocid": `saas_metrics.funnel.step.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: step.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground tabular-nums", children: [
                          step.count.toLocaleString("en-IN"),
                          " · ",
                          step.pct,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-8 bg-muted/20 rounded-lg overflow-hidden relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { width: 0 },
                            animate: { width: `${step.pct}%` },
                            transition: {
                              delay: 0.7 + i * 0.1,
                              duration: 0.6,
                              ease: "easeOut"
                            },
                            className: "h-full rounded-lg flex items-center justify-end pr-3",
                            style: { background: colors[i] },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-white", children: [
                              step.pct,
                              "%"
                            ] })
                          }
                        ),
                        step.dropPct !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-destructive", children: [
                          "-",
                          step.dropPct,
                          "%"
                        ] })
                      ] })
                    ]
                  },
                  step.name
                );
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.65 },
            className: "bg-card rounded-xl border border-border/50 p-5 shadow-card",
            "data-ocid": "saas_metrics.chart.revenue_trend",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground", children: "Revenue Growth Trend" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "12-month MRR trajectory" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                AreaChart,
                {
                  data: MRR_TREND,
                  margin: { top: 8, right: 8, left: 0, bottom: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "linearGradient",
                      {
                        id: "mrrGradient",
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "stop",
                            {
                              offset: "5%",
                              stopColor: "oklch(0.53 0.22 253)",
                              stopOpacity: 0.25
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "stop",
                            {
                              offset: "95%",
                              stopColor: "oklch(0.53 0.22 253)",
                              stopOpacity: 0.02
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CartesianGrid,
                      {
                        strokeDasharray: "3 3",
                        stroke: "oklch(0.88 0 0 / 0.5)",
                        vertical: false
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      XAxis,
                      {
                        dataKey: "month",
                        tick: { fontSize: 9, fill: "oklch(0.55 0 0)" },
                        axisLine: false,
                        tickLine: false,
                        interval: 2
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      YAxis,
                      {
                        tick: { fontSize: 10, fill: "oklch(0.55 0 0)" },
                        axisLine: false,
                        tickLine: false,
                        tickFormatter: (v) => fmtLakhs(v)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        content: ({ active, payload, label }) => {
                          if (!active || !(payload == null ? void 0 : payload.length)) return null;
                          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-lg p-3 shadow-elevated text-xs", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: label }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                              "MRR:",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: fmtINR(payload[0].value) })
                            ] })
                          ] });
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Area,
                      {
                        type: "monotone",
                        dataKey: "mrr",
                        stroke: "oklch(0.53 0.22 253)",
                        strokeWidth: 2.5,
                        fill: "url(#mrrGradient)",
                        name: "MRR",
                        dot: false,
                        activeDot: { r: 4, fill: "oklch(0.53 0.22 253)" }
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "saas_metrics.customer_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "xl:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Customer Metrics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
            {
              label: "Total Paying",
              value: metrics.totalPayingCustomers.toLocaleString("en-IN"),
              icon: Users,
              change: `+${metrics.newCustomers} this month`,
              positive: true
            },
            {
              label: "New Customers",
              value: metrics.newCustomers.toLocaleString("en-IN"),
              icon: Users,
              change: "This month",
              positive: true
            },
            {
              label: "Churned",
              value: metrics.churnedCustomers.toLocaleString("en-IN"),
              icon: TrendingDown,
              change: `${metrics.monthlyChurnRate.toFixed(1)}% churn rate`,
              positive: false
            },
            {
              label: "Active Users",
              value: metrics.activeUsers.toLocaleString("en-IN"),
              icon: Activity,
              change: `vs ${metrics.totalPayingCustomers} paying`,
              positive: true
            }
          ].map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.7 + i * 0.06 },
              className: "bg-card rounded-xl border border-border/50 p-4 shadow-card",
              "data-ocid": `saas_metrics.customer.${m.label.toLowerCase().replace(/\s+/g, "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: "w-4 h-4 text-muted-foreground mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-display font-bold text-foreground tabular-nums", children: m.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground mt-1", children: m.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "text-xs mt-1",
                      m.positive ? "text-success" : "text-destructive"
                    ),
                    children: m.change
                  }
                )
              ]
            },
            m.label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.75 },
            className: "bg-card rounded-xl border border-border/50 p-5 shadow-card",
            "data-ocid": "saas_metrics.cac_breakdown",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "CAC Breakdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Cost to acquire one customer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-primary", children: fmtINR(metrics.cac) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: cacBreakdown,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 40,
                    outerRadius: 60,
                    dataKey: "value",
                    paddingAngle: 3,
                    children: cacBreakdown.map((_entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Cell,
                      {
                        fill: CAC_COLORS[idx % CAC_COLORS.length]
                      },
                      CAC_COLORS[idx % CAC_COLORS.length]
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    formatter: (v) => fmtINR(v),
                    contentStyle: {
                      background: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0 0)",
                      borderRadius: "8px",
                      fontSize: 12
                    }
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 mt-2", children: cacBreakdown.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-2 h-2 rounded-full",
                          style: {
                            background: CAC_COLORS[i % CAC_COLORS.length]
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: item.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: fmtINR(item.value) })
                  ]
                },
                item.name
              )) })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.9 },
          className: "bg-muted/30 rounded-xl border border-border/40 p-6",
          "data-ocid": "saas_metrics.transparency_footer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-foreground", children: "How these numbers are calculated" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
              {
                label: "LTV",
                formula: "ARPU ÷ Monthly Churn Rate",
                detail: `${fmtINR(metrics.arpu)} ÷ ${metrics.monthlyChurnRate.toFixed(1)}% ≈ ${fmtINR(metrics.ltv)}.`
              },
              {
                label: "CAC",
                formula: "Total Spend ÷ New Customers",
                detail: `${fmtINR(metrics.cacByChannel.totalSpend)} ÷ ${metrics.newCustomers} = ${fmtINR(metrics.cac)}.`
              },
              {
                label: "NRR",
                formula: "(Opening + Expansion − Churn) ÷ Opening × 100",
                detail: `>${metrics.nrr >= 100 ? "100%" : `${metrics.nrr.toFixed(1)}%`} means revenue grows without new customers.`
              },
              {
                label: "LTV:CAC",
                formula: "LTV ÷ CAC",
                detail: `${fmtINR(metrics.ltv)} ÷ ${fmtINR(metrics.cac)} = ${metrics.ltvCacRatio.toFixed(2)}x. Benchmark: ≥3x is healthy.`
              },
              {
                label: "CAC Payback",
                formula: "CAC ÷ ARPU (months)",
                detail: `${fmtINR(metrics.cac)} ÷ ${fmtINR(metrics.arpu)} = ${metrics.cacPaybackMonths.toFixed(1)} months.`
              },
              {
                label: "ARR",
                formula: "MRR × 12",
                detail: `${fmtINR(metrics.mrr)} × 12 = ${fmtLakhs(metrics.arr)}. Assumes current MRR is stable.`
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: item.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                  "= ",
                  item.formula
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: item.detail })
            ] }, item.label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border/30 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Metrics update monthly. Revenue figures are in Indian Rupees (₹)." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Last updated: May 2025" })
            ] })
          ]
        }
      )
    ] }),
    showSpendModal && /* @__PURE__ */ jsxRuntimeExports.jsx(MarketingSpendModal, { onClose: () => setShowSpendModal(false) })
  ] });
}
export {
  SaasMetricsPage as default
};
