import { c as createLucideIcon, aG as useMetaTags, j as jsxRuntimeExports, y as motion, h as Badge, B as Bell, bP as Eye, a0 as CircleCheck, n as Card, o as CardHeader, aw as CardTitle, p as CardContent, R as ResponsiveContainer, J as BarChart, b1 as CartesianGrid, K as XAxis, Y as YAxis, N as Tooltip, O as Bar, Q as Cell, T as TrendingUp, bQ as ReferenceLine, f as cn, aN as PAGE_META, $ as Skeleton, r as reactExports } from "./index-DcPx_5wo.js";
import { u as useRetentionAnalytics } from "./useRetentionAnalytics-BooQoMkB.js";
import { P as PieChart, a as Pie } from "./PieChart-UXgBuAgW.js";
import { A as AreaChart, a as Area } from "./AreaChart-S7CCCoYI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 17V3", key: "1cwfxf" }],
  ["path", { d: "m6 11 6 6 6-6", key: "12ii2o" }],
  ["path", { d: "M19 21H5", key: "150jfl" }]
];
const ArrowDownToLine = createLucideIcon("arrow-down-to-line", __iconNode);
function AnimatedNumber({
  value,
  decimals = 0,
  suffix = ""
}) {
  const [display, setDisplay] = reactExports.useState(0);
  const raf = reactExports.useRef(null);
  const start = reactExports.useRef(null);
  const from = reactExports.useRef(0);
  const displayRef = reactExports.useRef(0);
  displayRef.current = display;
  reactExports.useEffect(() => {
    from.current = displayRef.current;
    start.current = null;
    const duration = 1e3;
    const tick = (now) => {
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
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
    display.toFixed(decimals),
    suffix
  ] });
}
function KpiCard({
  title,
  value,
  decimals = 0,
  suffix = "",
  icon,
  positive,
  neutral,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": ocid,
          className: "border-border/60 hover:shadow-md transition-shadow duration-200",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 truncate", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: cn(
                    "text-3xl font-bold tabular-nums font-display",
                    neutral && "text-foreground",
                    positive && "text-success",
                    !positive && !neutral && "text-destructive"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AnimatedNumber,
                    {
                      value,
                      decimals,
                      suffix
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl shrink-0",
                  neutral && "bg-muted text-muted-foreground",
                  positive && "bg-success/10 text-success",
                  !positive && !neutral && "bg-destructive/10 text-destructive"
                ),
                children: icon
              }
            )
          ] }) })
        }
      )
    }
  );
}
function rateColor(rate) {
  if (rate >= 70) return "oklch(0.56 0.15 170)";
  if (rate >= 40) return "oklch(0.68 0.18 86)";
  return "oklch(0.55 0.22 25)";
}
function rateBadge(rate) {
  if (rate >= 70)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-success/10 text-success border-success/20 text-xs", children: [
      rate.toFixed(1),
      "%"
    ] });
  if (rate >= 40)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-warning/10 text-warning border-warning/20 text-xs", children: [
      rate.toFixed(1),
      "%"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive/10 text-destructive border-destructive/20 text-xs", children: [
    rate.toFixed(1),
    "%"
  ] });
}
const COPY_COLORS = {
  fomo: "oklch(0.68 0.18 86)",
  urgency: "oklch(0.55 0.22 25)",
  reward: "oklch(0.56 0.15 170)",
  money_visibility: "oklch(0.53 0.22 253)"
};
const TOP_MESSAGES = [
  {
    text: "New reply received. Respond now.",
    type: "urgency",
    opens: 48,
    actions: 39,
    rate: 81.3
  },
  {
    text: "12 high-quality leads are waiting. Don't miss today's enquiries.",
    type: "fomo",
    opens: 42,
    actions: 32,
    rate: 76.2
  },
  {
    text: "Nice—keep going. You're close to your first booking.",
    type: "reward",
    opens: 38,
    actions: 27,
    rate: 71.1
  },
  {
    text: "Leads active in your area right now.",
    type: "fomo",
    opens: 35,
    actions: 24,
    rate: 68.6
  },
  {
    text: "Reply now—fast responses convert better.",
    type: "urgency",
    opens: 31,
    actions: 20,
    rate: 64.5
  },
  {
    text: "Follow-up pending. A quick message can help.",
    type: "urgency",
    opens: 28,
    actions: 17,
    rate: 60.7
  },
  {
    text: "These leads could convert if contacted today.",
    type: "money",
    opens: 25,
    actions: 13,
    rate: 52
  },
  {
    text: "Upgrade to remove limits and continue outreach.",
    type: "money",
    opens: 22,
    actions: 10,
    rate: 45.5
  }
];
const TYPE_BADGE = {
  fomo: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-warning/10 text-warning border-warning/20 text-[10px]", children: "FOMO" }),
  urgency: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/10 text-destructive border-destructive/20 text-[10px]", children: "Urgency" }),
  reward: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/10 text-success border-success/20 text-[10px]", children: "Reward" }),
  money: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 text-[10px]", children: "Money" })
};
function PageSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-80" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: ["sent", "open", "return", "convert"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }) }) }, k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 w-full" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) }) })
  ] });
}
const COHORT_ANNOTATIONS = [
  { day: 7, label: "Week 1 ends" },
  { day: 14, label: "Habit phase" },
  { day: 21, label: "Conversion phase" }
];
function RetentionAnalyticsPage() {
  useMetaTags(PAGE_META["/retention-analytics"]);
  const { data, isLoading } = useRetentionAnalytics();
  if (isLoading || !data) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageSkeleton, {});
  const {
    totalNotificationsSent,
    openRate,
    returnRate,
    conversionRate,
    byTriggerType,
    byCopyType,
    cohortByDay
  } = data;
  const triggerSorted = [...byTriggerType].sort(
    (a, b) => b.openRate - a.openRate
  );
  const totalSends = byCopyType.reduce((s, c) => s + c.count, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "retention_analytics.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "flex items-start justify-between gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display tracking-tight", children: "Retention Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Track how notifications drive daily actions and bookings" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              "data-ocid": "retention_analytics.live_badge",
              className: "bg-success/10 text-success border-success/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success animate-pulse mr-1.5" }),
                "Live"
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "retention_analytics.kpi_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Total Notifications Sent",
              value: totalNotificationsSent,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5" }),
              neutral: true,
              ocid: "retention_analytics.kpi_sent"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Notification Open Rate",
              value: openRate,
              decimals: 1,
              suffix: "%",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5" }),
              positive: openRate >= 50,
              ocid: "retention_analytics.kpi_open_rate"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Return to App Rate",
              value: returnRate,
              decimals: 1,
              suffix: "%",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "w-5 h-5" }),
              positive: returnRate >= 40,
              ocid: "retention_analytics.kpi_return_rate"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              title: "Action Conversion Rate",
              value: conversionRate,
              decimals: 1,
              suffix: "%",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
              positive: conversionRate >= 30,
              ocid: "retention_analytics.kpi_conversion_rate"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
        "data-ocid": "retention_analytics.charts_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.4, delay: 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-5 px-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Performance by Trigger Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Open rate % per notification trigger" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  BarChart,
                  {
                    data: triggerSorted,
                    layout: "vertical",
                    margin: { top: 4, right: 28, left: 8, bottom: 4 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CartesianGrid,
                        {
                          strokeDasharray: "3 3",
                          horizontal: false,
                          stroke: "oklch(0.88 0 0 / 0.5)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        XAxis,
                        {
                          type: "number",
                          domain: [0, 100],
                          tick: { fontSize: 11, fill: "oklch(0.55 0 0)" },
                          tickFormatter: (v) => `${v}%`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        YAxis,
                        {
                          type: "category",
                          dataKey: "label",
                          width: 120,
                          tick: { fontSize: 11, fill: "oklch(0.55 0 0)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Tooltip,
                        {
                          formatter: (v) => [`${v.toFixed(1)}%`, "Open Rate"],
                          contentStyle: {
                            background: "oklch(1 0 0)",
                            border: "1px solid oklch(0.88 0 0)",
                            borderRadius: "8px",
                            fontSize: 12
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "openRate", radius: [0, 4, 4, 0], maxBarSize: 28, children: triggerSorted.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Cell,
                        {
                          fill: rateColor(entry.openRate)
                        },
                        entry.trigger
                      )) })
                    ]
                  }
                ) }) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.4, delay: 0.15 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60 h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-5 px-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Performance by Copy Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Distribution and open rate by message psychology" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 160, height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Pie,
                        {
                          data: byCopyType,
                          cx: "50%",
                          cy: "50%",
                          innerRadius: 48,
                          outerRadius: 72,
                          dataKey: "count",
                          paddingAngle: 2,
                          children: byCopyType.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Cell,
                            {
                              fill: COPY_COLORS[entry.type] ?? "oklch(0.55 0 0)"
                            },
                            entry.type
                          ))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Tooltip,
                        {
                          formatter: (v) => [`${v} sends`, "Count"],
                          contentStyle: {
                            background: "oklch(1 0 0)",
                            border: "1px solid oklch(0.88 0 0)",
                            borderRadius: "8px",
                            fontSize: 12
                          }
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-foreground tabular-nums font-display", children: totalSends }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "sends" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 space-y-2", children: byCopyType.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center justify-between gap-2 min-w-0",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-2.5 h-2.5 rounded-full shrink-0",
                              style: {
                                background: COPY_COLORS[c.type] ?? "oklch(0.55 0 0)"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground truncate", children: c.label })
                        ] }),
                        rateBadge(c.openRate)
                      ]
                    },
                    c.type
                  )) })
                ] }) })
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.2 },
        "data-ocid": "retention_analytics.cohort_chart",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-5 px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "30-Day Retention Cohort" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "% of notified users who returned to the app by day" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AreaChart,
            {
              data: cohortByDay,
              margin: { top: 8, right: 16, left: -8, bottom: 4 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "linearGradient",
                  {
                    id: "cohortGradient",
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
                    stroke: "oklch(0.88 0 0 / 0.5)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "day",
                    tick: { fontSize: 11, fill: "oklch(0.55 0 0)" },
                    tickFormatter: (v) => `D${v}`,
                    interval: 4
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 11, fill: "oklch(0.55 0 0)" },
                    tickFormatter: (v) => `${v}%`,
                    domain: [0, 100]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    formatter: (v) => [
                      `${v.toFixed(1)}%`,
                      "Retention Rate"
                    ],
                    contentStyle: {
                      background: "oklch(1 0 0)",
                      border: "1px solid oklch(0.88 0 0)",
                      borderRadius: "8px",
                      fontSize: 12
                    },
                    labelFormatter: (l) => `Day ${l}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReferenceLine,
                  {
                    y: 50,
                    stroke: "oklch(0.68 0.18 86)",
                    strokeDasharray: "5 4",
                    strokeWidth: 1.5,
                    label: {
                      value: "50% target",
                      position: "right",
                      fontSize: 10,
                      fill: "oklch(0.68 0.18 86)"
                    }
                  }
                ),
                COHORT_ANNOTATIONS.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ReferenceLine,
                  {
                    x: a.day,
                    stroke: "oklch(0.88 0 0)",
                    strokeDasharray: "3 3",
                    label: {
                      value: a.label,
                      position: "top",
                      fontSize: 9,
                      fill: "oklch(0.55 0 0)"
                    }
                  },
                  a.day
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Area,
                  {
                    type: "monotone",
                    dataKey: "retentionRate",
                    stroke: "oklch(0.53 0.22 253)",
                    strokeWidth: 2,
                    fill: "url(#cohortGradient)",
                    dot: false,
                    activeDot: { r: 4, fill: "oklch(0.53 0.22 253)" }
                  }
                )
              ]
            }
          ) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.25 },
        "data-ocid": "retention_analytics.messages_table",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-5 px-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Top Performing Messages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sorted by open-to-action rate" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-2.5", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2.5 whitespace-nowrap", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2.5", children: "Opens" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2.5", children: "Actions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-5 py-2.5", children: "Rate" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: TOP_MESSAGES.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `retention_analytics.message_row.${TOP_MESSAGES.indexOf(msg) + 1}`,
                className: cn(
                  "border-b border-border/40 hover:bg-muted/30 transition-colors duration-150",
                  TOP_MESSAGES.indexOf(msg) === TOP_MESSAGES.length - 1 && "border-b-0"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground line-clamp-2 leading-snug", children: msg.text }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 whitespace-nowrap", children: TYPE_BADGE[msg.type] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px]", children: msg.type }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right tabular-nums text-sm text-foreground font-medium", children: msg.opens }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right tabular-nums text-sm text-foreground font-medium", children: msg.actions }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right", children: rateBadge(msg.rate) })
                ]
              },
              msg.text
            )) })
          ] }) }) })
        ] })
      }
    )
  ] });
}
export {
  RetentionAnalyticsPage as default
};
