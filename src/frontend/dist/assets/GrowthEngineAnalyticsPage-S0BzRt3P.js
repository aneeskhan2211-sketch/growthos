import { aG as useMetaTags, r as reactExports, j as jsxRuntimeExports, h as Badge, aN as PAGE_META, $ as Skeleton, y as motion, n as Card, R as ResponsiveContainer, bR as LineChart, b1 as CartesianGrid, K as XAxis, Y as YAxis, N as Tooltip, bS as Line, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem } from "./index-DcPx_5wo.js";
import { H as HeatmapCard } from "./HeatmapCard-CFHPGPU-.js";
import { M as MetricCard } from "./MetricCard-Com_BhSx.js";
import { P as PageHeader } from "./PageHeader-DQS9y6_H.js";
import { A as AreaChart, a as Area } from "./AreaChart-S7CCCoYI.js";
import "./minus-BGo421Cc.js";
const OVERVIEW_SPARKLINES = {
  dau: [420, 445, 398, 480, 512, 495, 543],
  wau: [2800, 2950, 3100, 2980, 3250, 3400, 3620],
  mau: [9800, 10200, 10500, 10900, 11400, 11800, 12340],
  signups: [38, 45, 52, 41, 59, 63, 71],
  conversion: [2.1, 2.4, 2.2, 2.6, 2.8, 3.1, 3.4],
  mrr: [142e3, 158e3, 171e3, 185e3, 204e3, 218e3, 234e3],
  d1: [58, 61, 57, 63, 65, 62, 67],
  d7: [28, 31, 29, 34, 36, 33, 38]
};
const FUNNEL_STEPS = [
  { name: "Signup", count: 5840, pct: 100 },
  { name: "Onboarding", count: 4147, pct: 71 },
  { name: "Leads Generated", count: 2906, pct: 70.1 },
  { name: "Message Sent", count: 1744, pct: 60 },
  { name: "Reply Received", count: 436, pct: 25 },
  { name: "Proposal Sent", count: 175, pct: 40.1 },
  { name: "Payment", count: 88, pct: 50.3 }
];
const COHORT_DATA = [
  { cohortWeek: "W1 Jan", size: 312, d1: 68, d7: 41, d30: 22 },
  { cohortWeek: "W2 Jan", size: 289, d1: 71, d7: 38, d30: 19 },
  { cohortWeek: "W3 Jan", size: 341, d1: 65, d7: 44, d30: 25 },
  { cohortWeek: "W4 Jan", size: 378, d1: 73, d7: 46, d30: 28 },
  { cohortWeek: "W1 Feb", size: 402, d1: 70, d7: 43, d30: 31 },
  { cohortWeek: "W2 Feb", size: 445, d1: 74, d7: 48, d30: 34 },
  { cohortWeek: "W3 Feb", size: 418, d1: 76, d7: 51, d30: 36 },
  { cohortWeek: "W4 Feb", size: 487, d1: 79, d7: 54, d30: 38 }
];
const DRILL_DOWN_DATA = {
  get_clients_clicked: [
    { nextEvent: "leads_generated", count: 4102, pct: 78 },
    { nextEvent: "message_sent", count: 1832, pct: 35 },
    { nextEvent: "paywall_viewed", count: 912, pct: 17 },
    { nextEvent: "app_closed", count: 820, pct: 16 }
  ],
  leads_generated: [
    { nextEvent: "message_sent", count: 2906, pct: 68 },
    { nextEvent: "paywall_viewed", count: 1248, pct: 29 },
    { nextEvent: "followup_sent", count: 612, pct: 14 },
    { nextEvent: "inactive_24h", count: 518, pct: 12 }
  ],
  message_sent: [
    { nextEvent: "reply_received", count: 436, pct: 25 },
    { nextEvent: "followup_sent", count: 786, pct: 45 },
    { nextEvent: "paywall_viewed", count: 312, pct: 18 },
    { nextEvent: "inactive_24h", count: 210, pct: 12 }
  ],
  reply_received: [
    { nextEvent: "proposal_sent", count: 305, pct: 70 },
    { nextEvent: "followup_sent", count: 131, pct: 30 },
    { nextEvent: "paywall_viewed", count: 88, pct: 20 },
    { nextEvent: "upgrade_completed", count: 44, pct: 10 }
  ],
  followup_sent: [
    { nextEvent: "reply_received", count: 412, pct: 52 },
    { nextEvent: "message_sent", count: 218, pct: 28 },
    { nextEvent: "inactive_24h", count: 168, pct: 21 },
    { nextEvent: "paywall_viewed", count: 87, pct: 11 }
  ],
  paywall_viewed: [
    { nextEvent: "upgrade_completed", count: 312, pct: 34 },
    { nextEvent: "dismissed", count: 486, pct: 53 },
    { nextEvent: "started_free_trial", count: 118, pct: 13 },
    { nextEvent: "message_sent", count: 72, pct: 8 }
  ],
  upgrade_completed: [
    { nextEvent: "leads_generated", count: 286, pct: 92 },
    { nextEvent: "message_sent", count: 261, pct: 84 },
    { nextEvent: "followup_sent", count: 214, pct: 69 },
    { nextEvent: "proposal_sent", count: 128, pct: 41 }
  ]
};
const EVENT_NAMES = [
  "get_clients_clicked",
  "leads_generated",
  "message_sent",
  "reply_received",
  "followup_sent",
  "paywall_viewed",
  "upgrade_completed"
];
const EVENT_LABELS = {
  get_clients_clicked: "Get Clients Clicked",
  leads_generated: "Leads Generated",
  message_sent: "Message Sent",
  reply_received: "Reply Received",
  followup_sent: "Follow-up Sent",
  paywall_viewed: "Paywall Viewed",
  upgrade_completed: "Upgrade Completed"
};
const LIVE_EVENT_TYPES = [
  "get_clients_clicked",
  "leads_generated",
  "message_sent",
  "reply_received",
  "followup_sent",
  "paywall_viewed",
  "upgrade_completed"
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
  "u_1cmvj"
];
function generateLiveEvents(count) {
  const now = /* @__PURE__ */ new Date();
  return Array.from({ length: count }, (_, i) => {
    const secAgo = i * 18 + Math.floor(Math.random() * 12);
    return {
      id: i,
      userId: SAMPLE_USER_IDS[i % SAMPLE_USER_IDS.length],
      eventType: LIVE_EVENT_TYPES[Math.floor(Math.random() * LIVE_EVENT_TYPES.length)],
      timestamp: new Date(now.getTime() - secAgo * 1e3)
    };
  });
}
function fmtRupee(val) {
  return `₹${val.toLocaleString("en-IN")}`;
}
function timeAgo(ts) {
  const secs = Math.floor((Date.now() - ts.getTime()) / 1e3);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}
function getCohortColor(val) {
  if (val >= 60) return "text-success bg-success/12";
  if (val >= 30) return "text-warning bg-warning/12";
  return "text-destructive bg-destructive/12";
}
function getFunnelColor(pct) {
  if (pct >= 30) return { bar: "oklch(0.62 0.22 170)", text: "text-success" };
  if (pct >= 15)
    return { bar: "oklch(0.74 0.18 86)", text: "text-warning", alert: "amber" };
  return { bar: "oklch(0.6 0.22 25)", text: "text-destructive", alert: "red" };
}
function OverviewSection() {
  const kpis = [
    {
      title: "DAU",
      value: 543,
      change: 9,
      changeType: "up",
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.dau
    },
    {
      title: "WAU",
      value: 3620,
      change: 6,
      changeType: "up",
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.wau
    },
    {
      title: "MAU",
      value: 12340,
      change: 4,
      changeType: "up",
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.mau
    },
    {
      title: "New Signups (7d)",
      value: 71,
      change: 13,
      changeType: "up",
      prefix: "",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.signups
    },
    {
      title: "Free → Paid Conv.",
      value: 3.4,
      change: 0.3,
      changeType: "up",
      prefix: "",
      suffix: "%",
      trendData: OVERVIEW_SPARKLINES.conversion
    },
    {
      title: "MRR",
      value: 234e3,
      change: 7,
      changeType: "up",
      prefix: "₹",
      suffix: "",
      trendData: OVERVIEW_SPARKLINES.mrr
    },
    {
      title: "Day 1 Retention",
      value: 67,
      change: 5,
      changeType: "up",
      prefix: "",
      suffix: "%",
      trendData: OVERVIEW_SPARKLINES.d1
    },
    {
      title: "Day 7 Retention",
      value: 38,
      change: 5,
      changeType: "up",
      prefix: "",
      suffix: "%",
      trendData: OVERVIEW_SPARKLINES.d7
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "growth-engine.overview.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Overview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: kpis.map((kpi, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05, duration: 0.35, ease: "easeOut" },
        "data-ocid": `growth-engine.kpi.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            title: kpi.title,
            value: kpi.prefix === "₹" ? fmtRupee(kpi.value) : `${kpi.value}`,
            change: kpi.change,
            changeType: kpi.changeType,
            trendData: kpi.trendData
          }
        )
      },
      kpi.title
    )) })
  ] });
}
function FunnelSection() {
  const maxCount = FUNNEL_STEPS[0].count;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "growth-engine.funnel.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Funnel Drop-off" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Signup → Payment Funnel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            FUNNEL_STEPS.length,
            " steps · Last 30 days ·",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              (FUNNEL_STEPS[FUNNEL_STEPS.length - 1].count / maxCount * 100).toFixed(1),
              "% end-to-end"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs tabular-nums", children: [
          FUNNEL_STEPS[0].count.toLocaleString("en-IN"),
          " signups"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", "data-ocid": "growth-engine.funnel.list", children: FUNNEL_STEPS.map((step, i) => {
        const prevCount = i === 0 ? step.count : FUNNEL_STEPS[i - 1].count;
        const convPct = i === 0 ? 100 : Math.round(step.count / prevCount * 100);
        const barPct = step.count / maxCount * 100;
        const { bar, text, alert } = getFunnelColor(convPct);
        const showAlert = i > 0 && alert;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `growth-engine.funnel.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-32 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: step.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground tabular-nums", children: step.count.toLocaleString("en-IN") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-8 relative rounded-md bg-muted/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute inset-y-0 left-0 rounded-md flex items-center",
                    initial: { width: 0 },
                    animate: { width: `${barPct}%` },
                    transition: {
                      delay: i * 0.08,
                      duration: 0.55,
                      ease: [0.4, 0, 0.2, 1]
                    },
                    style: { background: bar },
                    children: barPct > 20 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto mr-2 text-[11px] font-bold text-white/90 whitespace-nowrap", children: step.count.toLocaleString("en-IN") })
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 text-right shrink-0", children: i === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: "—" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: `text-xs font-bold tabular-nums ${text}`,
                    children: [
                      convPct,
                      "%"
                    ]
                  }
                ) })
              ] }),
              showAlert && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  transition: { delay: i * 0.08 + 0.3, duration: 0.3 },
                  className: `mt-1 mb-2 ml-[8.5rem] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium ${alert === "red" ? "bg-destructive/10 text-destructive border border-destructive/20" : "bg-warning/10 text-warning border border-warning/20"}`,
                  "data-ocid": `growth-engine.funnel.alert.${i}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "High drop-off at",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: FUNNEL_STEPS[i - 1].name }),
                      " →",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: step.name }),
                      " (only ",
                      convPct,
                      "% continue)"
                    ] })
                  ]
                }
              )
            ]
          },
          step.name
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-border", children: [
        { label: "Signup → Onboarding", val: "71%", color: "text-success" },
        { label: "Msg → Reply", val: "25%", color: "text-warning" },
        { label: "Reply → Proposal", val: "40%", color: "text-success" },
        { label: "Proposal → Payment", val: "50%", color: "text-success" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-bold tabular-nums ${s.color}`, children: s.val }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: s.label })
      ] }, s.label)) })
    ] })
  ] });
}
function CohortSection() {
  const chartData = COHORT_DATA.map((c) => ({
    name: c.cohortWeek,
    d1: c.d1,
    d7: c.d7,
    d30: c.d30
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "growth-engine.cohort.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Cohort Retention" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Weekly Cohort Retention Curves" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Last 8 signup cohorts · D1 / D7 / D30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 text-xs", children: [
          { label: "D1", color: "oklch(0.6 0.25 253)" },
          { label: "D7", color: "oklch(0.64 0.18 170)" },
          { label: "D30", color: "oklch(0.74 0.18 86)" }
        ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 text-muted-foreground font-medium",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2.5 h-2.5 rounded-full",
                  style: { background: l.color }
                }
              ),
              l.label
            ]
          },
          l.label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        LineChart,
        {
          data: chartData,
          margin: { top: 4, right: 12, bottom: 0, left: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "oklch(0 0 0 / 0.05)",
                vertical: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "name",
                tick: { fontSize: 10 },
                axisLine: false,
                tickLine: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 10 },
                axisLine: false,
                tickLine: false,
                tickFormatter: (v) => `${v}%`,
                width: 36,
                domain: [0, 100]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  borderRadius: 8,
                  border: "1px solid oklch(var(--border))",
                  fontSize: 12
                },
                formatter: (v) => [`${v}%`]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "d1",
                stroke: "oklch(0.6 0.25 253)",
                strokeWidth: 2,
                dot: false,
                activeDot: { r: 4 },
                animationDuration: 700
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "d7",
                stroke: "oklch(0.64 0.18 170)",
                strokeWidth: 2,
                dot: false,
                activeDot: { r: 4 },
                animationDuration: 800
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "d30",
                stroke: "oklch(0.74 0.18 86)",
                strokeWidth: 2,
                dot: false,
                activeDot: { r: 4 },
                animationDuration: 900
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-sm min-w-[480px]",
          "data-ocid": "growth-engine.cohort.table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: ["Cohort Week", "Size", "D1 %", "D7 %", "D30 %"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-3 py-2 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: COHORT_DATA.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.tr,
              {
                initial: { opacity: 0, y: 6 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: i * 0.04, duration: 0.3 },
                className: "hover:bg-muted/20 transition-colors",
                "data-ocid": `growth-engine.cohort.row.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-foreground text-xs", children: row.cohortWeek }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground tabular-nums text-xs", children: row.size.toLocaleString("en-IN") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${getCohortColor(row.d1)}`,
                      children: [
                        row.d1,
                        "%"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${getCohortColor(row.d7)}`,
                      children: [
                        row.d7,
                        "%"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-xs font-semibold tabular-nums px-1.5 py-0.5 rounded ${getCohortColor(row.d30)}`,
                      children: [
                        row.d30,
                        "%"
                      ]
                    }
                  ) })
                ]
              },
              row.cohortWeek
            )) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded bg-success/60" }),
          " >60% good"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded bg-warning/60" }),
          " 30–60% average"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded bg-destructive/60" }),
          " <30% needs attention"
        ] })
      ] })
    ] })
  ] });
}
function EventDrillSection() {
  const [selectedEvent, setSelectedEvent] = reactExports.useState("message_sent");
  const items = DRILL_DOWN_DATA[selectedEvent] ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "growth-engine.event-drill.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Event Drill-down" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
            "After",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-mono", children: selectedEvent }),
            ", what happened next?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Within 24 hours · last 30 days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: selectedEvent,
            onValueChange: (v) => setSelectedEvent(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-52 text-xs",
                  "data-ocid": "growth-engine.event-drill.select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: EVENT_NAMES.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: e, className: "text-xs", children: EVENT_LABELS[e] }, e)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "growth-engine.event-drill.list", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.07, duration: 0.3 },
          className: "flex items-center gap-3",
          "data-ocid": `growth-engine.event-drill.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-4 tabular-nums shrink-0", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-xs font-mono font-medium text-foreground truncate min-w-0", children: item.nextEvent }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full rounded-full",
                style: { background: "oklch(0.6 0.25 253)" },
                initial: { width: 0 },
                animate: { width: `${item.pct}%` },
                transition: {
                  delay: i * 0.07 + 0.15,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary tabular-nums w-8 text-right shrink-0", children: [
              item.pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums w-14 text-right shrink-0", children: [
              item.count.toLocaleString("en-IN"),
              " users"
            ] })
          ]
        },
        item.nextEvent
      )) })
    ] })
  ] });
}
const EVENT_BADGE_COLORS = {
  get_clients_clicked: "bg-primary/12 text-primary",
  leads_generated: "bg-success/12 text-success",
  message_sent: "bg-blue-500/12 text-blue-600",
  reply_received: "bg-warning/12 text-warning",
  followup_sent: "bg-violet-500/12 text-violet-600",
  paywall_viewed: "bg-orange-500/12 text-orange-600",
  upgrade_completed: "bg-success/20 text-success"
};
function LiveEventStream() {
  const [events, setEvents] = reactExports.useState(
    () => generateLiveEvents(50)
  );
  const [lastRefresh, setLastRefresh] = reactExports.useState(/* @__PURE__ */ new Date());
  const [isRefreshing, setIsRefreshing] = reactExports.useState(false);
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setEvents(generateLiveEvents(50));
        setLastRefresh(/* @__PURE__ */ new Date());
        setIsRefreshing(false);
      }, 300);
    }, 1e4);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "growth-engine.live-stream.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Live Event Stream" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: isRefreshing ? "Refreshing…" : `Refreshed ${timeAgo(lastRefresh)}` })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-b border-border bg-muted/30 grid grid-cols-[1fr_2fr_1fr] gap-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "When" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: scrollRef,
          className: "overflow-y-auto max-h-80",
          "data-ocid": "growth-engine.live-stream.list",
          children: events.map((ev, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, backgroundColor: "oklch(0.97 0.02 253)" },
              animate: { opacity: 1, backgroundColor: "oklch(1 0 0 / 0)" },
              transition: { delay: Math.min(i * 0.01, 0.3), duration: 0.4 },
              className: "grid grid-cols-[1fr_2fr_1fr] gap-3 px-4 py-2.5 border-b border-border/40 hover:bg-muted/20 transition-colors",
              "data-ocid": `growth-engine.live-stream.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground truncate", children: ev.userId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${EVENT_BADGE_COLORS[ev.eventType] ?? "bg-muted text-muted-foreground"}`,
                    children: ev.eventType
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-right tabular-nums", children: timeAgo(ev.timestamp) })
              ]
            },
            `${ev.id}-${lastRefresh.getTime()}`
          ))
        }
      )
    ] })
  ] });
}
const HEATMAP_MOST_CLICKED = [
  {
    label: "Get Clients Now (FAB)",
    count: 8420,
    percentage: 100,
    color: "oklch(0.6 0.25 253)"
  },
  {
    label: "Send Pitch Button",
    count: 5830,
    percentage: 69,
    color: "oklch(0.64 0.18 170)"
  },
  {
    label: "View Lead Details",
    count: 4210,
    percentage: 50,
    color: "oklch(0.62 0.22 253)"
  },
  {
    label: "Follow Up Now",
    count: 3180,
    percentage: 38,
    color: "oklch(0.74 0.2 86)"
  },
  {
    label: "Upgrade to Growth",
    count: 2460,
    percentage: 29,
    color: "oklch(0.7 0.18 40)"
  }
];
const HEATMAP_RAGE_TAPS = [
  {
    label: "Inactive Filter Chips",
    count: 1820,
    percentage: 100,
    color: "oklch(0.55 0.25 25)",
    fix: "Add visual feedback on filter tap"
  },
  {
    label: "Paywall Dismiss",
    count: 1340,
    percentage: 74,
    color: "oklch(0.58 0.22 25)",
    fix: "Reduce paywall frequency"
  },
  {
    label: "Proposal Send (loading)",
    count: 980,
    percentage: 54,
    color: "oklch(0.62 0.2 25)",
    fix: "Show spinner on first tap"
  }
];
const HEATMAP_DEAD_CLICKS = [
  {
    label: "Lead Score Badge",
    count: 2240,
    percentage: 100,
    color: "oklch(0.65 0.18 253)"
  },
  {
    label: "Status Pill",
    count: 1560,
    percentage: 70,
    color: "oklch(0.68 0.16 253)"
  },
  {
    label: "Revenue Estimate Row",
    count: 1120,
    percentage: 50,
    color: "oklch(0.7 0.14 253)"
  }
];
function HeatmapSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "growth-engine.heatmap.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Interaction Heatmap" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeatmapCard,
        {
          title: "Most Clicked Buttons",
          items: HEATMAP_MOST_CLICKED,
          ocid: "growth-engine.heatmap.clicks"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeatmapCard,
        {
          title: "Rage Taps",
          items: HEATMAP_RAGE_TAPS,
          showFix: true,
          ocid: "growth-engine.heatmap.rage"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HeatmapCard,
        {
          title: "Dead Clicks",
          items: HEATMAP_DEAD_CLICKS,
          ocid: "growth-engine.heatmap.dead"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Scroll Depth Distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Dashboard page" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AreaChart,
        {
          data: [
            { depth: "0%", users: 100 },
            { depth: "25%", users: 78 },
            { depth: "50%", users: 54 },
            { depth: "75%", users: 31 },
            { depth: "100%", users: 18 }
          ],
          margin: { top: 4, right: 8, bottom: 0, left: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "scroll-grad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "oklch(0.6 0.25 253)",
                  stopOpacity: 0.2
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "oklch(0.6 0.25 253)",
                  stopOpacity: 0
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "oklch(0 0 0 / 0.05)",
                vertical: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "depth",
                tick: { fontSize: 10 },
                axisLine: false,
                tickLine: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 10 },
                axisLine: false,
                tickLine: false,
                tickFormatter: (v) => `${v}%`,
                width: 36
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  borderRadius: 8,
                  border: "1px solid oklch(var(--border))",
                  fontSize: 12
                },
                formatter: (v) => [`${v}% of users`]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Area,
              {
                type: "monotone",
                dataKey: "users",
                stroke: "oklch(0.6 0.25 253)",
                strokeWidth: 2,
                fill: "url(#scroll-grad)",
                dot: false,
                animationDuration: 700
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
function SectionSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) })
  ] });
}
function GrowthEngineAnalyticsPage() {
  useMetaTags(PAGE_META["/growth-engine/analytics"]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "growth-engine.analytics.page", className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Growth Engine",
        description: "Admin Dashboard · Behavior analytics, funnel drop-off, cohort retention, live events",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success animate-pulse" }),
            "Live"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-medium", children: "Last 30 days" })
        ] })
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSkeleton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionSkeleton, {})
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CohortSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EventDrillSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LiveEventStream, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeatmapSection, {})
    ] })
  ] });
}
export {
  GrowthEngineAnalyticsPage as default
};
