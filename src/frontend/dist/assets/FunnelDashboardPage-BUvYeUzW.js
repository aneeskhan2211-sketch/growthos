import { r as reactExports, j as jsxRuntimeExports, y as motion, bz as useScreenTracking, bA as useHeatmapSummary, bB as useRetentionData, u as useActor, a as useQuery, e as createActor } from "./index-DcPx_5wo.js";
import { H as HeatmapCard } from "./HeatmapCard-CFHPGPU-.js";
function getBarColor(index, total) {
  const t = index / Math.max(total - 1, 1);
  const hue = 253 + (170 - 253) * t;
  const chroma = 0.25 - 0.05 * t;
  const lightness = 0.6 + 0.06 * t;
  return `oklch(${lightness.toFixed(2)} ${chroma.toFixed(2)} ${hue.toFixed(0)})`;
}
function FunnelChart({ steps }) {
  const [animated, setAnimated] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  const maxCount = Math.max(...steps.map((s) => s.count), 1);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "space-y-2", "data-ocid": "funnel.chart", children: steps.map((step, i) => {
    const widthPct = animated ? step.count / maxCount * 100 : 0;
    const barColor = getBarColor(i, steps.length);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "funnel-step group relative",
        "data-ocid": `funnel.step.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "funnel-label text-foreground text-truncate-1 w-36 shrink-0", children: [
              i + 1,
              ". ",
              step.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "funnel-bar flex-1 relative",
                style: { height: 32 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-lg bg-muted/30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "absolute inset-y-0 left-0 rounded-lg flex items-center overflow-hidden",
                      initial: { width: 0 },
                      animate: { width: `${widthPct}%` },
                      transition: {
                        duration: 0.6,
                        delay: i * 0.07,
                        ease: [0.4, 0, 0.2, 1]
                      },
                      style: {
                        background: barColor,
                        minWidth: widthPct > 0 ? 48 : 0
                      },
                      children: widthPct > 18 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "funnel-percentage ml-auto mr-2 text-[11px] font-bold text-white/90 whitespace-nowrap", children: step.count.toLocaleString("en-IN") })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-popover border border-border rounded-lg px-2.5 py-1.5 shadow-elevated text-xs whitespace-nowrap z-10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: step.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      step.count.toLocaleString("en-IN"),
                      " users"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      "Conv: ",
                      (step.conversionRate * 100).toFixed(1),
                      "%"
                    ] }),
                    step.avgMinToNext !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
                      "Avg ",
                      step.avgMinToNext,
                      " min to next step"
                    ] })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "funnel-dropoff w-16 shrink-0 text-right",
                style: { color: "oklch(var(--destructive))" },
                children: [
                  "-",
                  (step.dropOffRate * 100).toFixed(0),
                  "%"
                ]
              }
            )
          ] }),
          i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center pl-36 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                "aria-hidden": "true",
                style: { color: "oklch(var(--destructive))" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M6 2v8M3 7l3 3 3-3",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] font-semibold px-1.5 py-0.5 rounded-full",
                style: {
                  background: "oklch(var(--destructive) / 0.12)",
                  color: "oklch(var(--destructive))"
                },
                children: [
                  "-",
                  (step.dropOffRate * 100).toFixed(0),
                  "% Drop-off"
                ]
              }
            ),
            step.avgMinToNext !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-medium ml-1", children: [
              "· Avg ",
              step.avgMinToNext,
              " min"
            ] })
          ] }) })
        ]
      },
      step.name
    );
  }) });
}
function useEnhancedFunnelMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
    staleTime: 6e4
  });
}
const MOCK_FUNNEL_STEPS = [
  { name: "Install", count: 12400, conversionRate: 1, dropOffRate: 0.18 },
  { name: "Signup", count: 10168, conversionRate: 0.82, dropOffRate: 0.22 },
  { name: "Onboarding", count: 7931, conversionRate: 0.78, dropOffRate: 0.15 },
  {
    name: "Get Clients Click",
    count: 6741,
    conversionRate: 0.85,
    dropOffRate: 0.25
  },
  { name: "Pitch Sent", count: 5056, conversionRate: 0.75, dropOffRate: 0.3 },
  {
    name: "Reply Received",
    count: 3539,
    conversionRate: 0.7,
    dropOffRate: 0.22
  },
  {
    name: "Proposal Created",
    count: 2760,
    conversionRate: 0.78,
    dropOffRate: 0.38
  },
  { name: "Payment", count: 1711, conversionRate: 0.62, dropOffRate: 0 }
];
const MOCK_SCREEN_ACTIVITY = [
  { label: "Home Dashboard", count: 847, percentage: 100, screen: "Home" },
  { label: "Leads Screen", count: 623, percentage: 74, screen: "Leads" },
  { label: "Inbox", count: 412, percentage: 49, screen: "Inbox" },
  { label: "FAB Flow", count: 389, percentage: 46, screen: "FAB" },
  { label: "Paywall", count: 234, percentage: 28, screen: "Paywall" },
  { label: "Clients", count: 198, percentage: 23, screen: "Clients" }
];
const INTERACTION_COLORS = {
  tap: "oklch(var(--primary))",
  rageTap: "oklch(var(--destructive))",
  deadClick: "oklch(var(--warning))",
  scrollDepth: "oklch(var(--success))",
  screenTime: "oklch(0.7 0.12 300)"
};
const MOCK_INTERACTIONS = [
  { label: "Tap", count: 28340, percentage: 62, color: INTERACTION_COLORS.tap },
  {
    label: "Scroll Depth",
    count: 9120,
    percentage: 20,
    color: INTERACTION_COLORS.scrollDepth
  },
  {
    label: "Dead Click",
    count: 4560,
    percentage: 10,
    color: INTERACTION_COLORS.deadClick
  },
  {
    label: "Screen Time",
    count: 2740,
    percentage: 6,
    color: INTERACTION_COLORS.screenTime
  },
  {
    label: "Rage Tap",
    count: 910,
    percentage: 2,
    color: INTERACTION_COLORS.rageTap
  }
];
const MOCK_TOP_TAPPED = [
  {
    label: "FAB Button (Get Clients)",
    count: 1243,
    percentage: 100,
    screen: "Home"
  },
  { label: "Send Pitch Button", count: 456, percentage: 37, screen: "Leads" },
  { label: "Leads Filter", count: 234, percentage: 19, screen: "Leads" },
  { label: "Upgrade Plan CTA", count: 198, percentage: 16, screen: "Paywall" },
  { label: "Reply Button", count: 187, percentage: 15, screen: "Inbox" },
  { label: "Create Proposal", count: 143, percentage: 12, screen: "Leads" }
];
const MOCK_RAGE_TAPS = [
  {
    label: "Export Leads Button",
    count: 312,
    percentage: 100,
    screen: "Leads",
    fix: "Show paywall immediately with feature explanation"
  },
  {
    label: "Bulk Message Send",
    count: 187,
    percentage: 60,
    screen: "Inbox",
    fix: "Add spinner + success toast to confirm action"
  },
  {
    label: "Back Navigation",
    count: 134,
    percentage: 43,
    screen: "Onboarding",
    fix: "Reduce onboarding steps or add skip option"
  }
];
const STREAK_MILESTONES = [
  { label: "Day 1 (New)", pct: 100 },
  { label: "Day 3 (Returning)", pct: 62 },
  { label: "Day 7 (Engaged)", pct: 34 },
  { label: "Day 30 (Power User)", pct: 11 }
];
const DAU_DATA = [320, 410, 395, 480, 521, 499, 603];
const DAU_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function KpiCard({ label, value, sub, trend, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "bg-card border border-border/40 rounded-xl p-4 shadow-card",
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-xs font-semibold mt-1 ${trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-muted-foreground"}`,
            children: sub
          }
        )
      ]
    }
  );
}
function Sparkline({ data, days }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 300;
  const H = 80;
  const padding = 4;
  const points = data.map((v, i) => {
    const x = padding + i / (data.length - 1) * (W - padding * 2);
    const y = H - padding - (v - min) / range * (H - padding * 2);
    return `${x},${y}`;
  });
  const polyline = points.join(" ");
  const area = `${points[0]} ${points.join(" ")} ${W - padding},${H} ${padding},${H} Z`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${W} ${H}`, className: "w-full h-20", "aria-hidden": "true", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sparkGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "stop",
          {
            offset: "0%",
            stopColor: "oklch(0.6 0.25 253)",
            stopOpacity: "0.3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "stop",
          {
            offset: "100%",
            stopColor: "oklch(0.6 0.25 253)",
            stopOpacity: "0.02"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: area, fill: "url(#sparkGrad)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "polyline",
        {
          points: polyline,
          fill: "none",
          stroke: "oklch(0.6 0.25 253)",
          strokeWidth: "2",
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }
      ),
      data.map((_v, i) => {
        const [x, y] = points[i].split(",").map(Number);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: "3",
            fill: "oklch(0.6 0.25 253)"
          },
          days[i] ?? i
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between px-1 mt-1", children: days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: d }, d)) })
  ] });
}
function FunnelDashboardPage() {
  useScreenTracking("FunnelDashboard");
  const [dateRange, setDateRange] = reactExports.useState("30d");
  const { data: enhancedFunnel } = useEnhancedFunnelMetrics();
  const { data: heatmapSummary } = useHeatmapSummary();
  const { data: retentionData } = useRetentionData("current_user");
  const funnelSteps = enhancedFunnel && enhancedFunnel.steps.length > 0 ? enhancedFunnel.steps.map((s) => ({
    name: s.step,
    count: Number(s.users),
    conversionRate: Number(s.users) > 0 ? Number(s.conversions) / Number(s.users) : 0,
    dropOffRate: s.dropoffPercent / 100,
    avgMinToNext: s.avgSecondsToNextStep !== void 0 ? Math.round(Number(s.avgSecondsToNextStep) / 60) : void 0
  })) : MOCK_FUNNEL_STEPS;
  const totalUsers = enhancedFunnel ? Number(enhancedFunnel.totalUsers) : MOCK_FUNNEL_STEPS[0].count;
  const paidUsers = enhancedFunnel ? Number(enhancedFunnel.paidUsers) : MOCK_FUNNEL_STEPS[7].count;
  const freeToPaid = enhancedFunnel ? (enhancedFunnel.freeToPaidConversion * 100).toFixed(1) : (MOCK_FUNNEL_STEPS[7].count / MOCK_FUNNEL_STEPS[0].count * 100).toFixed(
    1
  );
  const onboardingCompletion = funnelSteps.length >= 3 ? (funnelSteps[2].count / funnelSteps[0].count * 100).toFixed(1) : "63.9";
  const screenActivity = heatmapSummary && heatmapSummary.length > 0 ? heatmapSummary.slice(0, 6).map(([label, count], _i, arr) => {
    const maxC = Number(arr[0][1]) || 1;
    return {
      label,
      count: Number(count),
      percentage: Math.round(Number(count) / maxC * 100)
    };
  }) : MOCK_SCREEN_ACTIVITY;
  const weeklyLeads = retentionData ? Number(retentionData.weeklyLeadsGenerated) : 847;
  const weeklyReplies = retentionData ? Number(retentionData.weeklyRepliesReceived) : 234;
  const weeklyProposals = retentionData ? Number(retentionData.weeklyProposalsSent) : 67;
  const currentStreak = retentionData ? Number(retentionData.currentStreak) : 5;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mobile-safe-content min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-20 bg-card border-b border-border/50 px-4 py-3 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-bold text-foreground leading-tight truncate", children: "Conversion Funnel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Track user growth journey" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center bg-muted/40 border border-border/40 rounded-lg p-0.5 shrink-0",
          "data-ocid": "funnel.date_range.toggle",
          children: ["7d", "30d", "90d"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setDateRange(r),
              className: `px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${dateRange === r ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `funnel.date_range.${r}`,
              children: r
            },
            r
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "funnel.kpi.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Total Users",
            value: totalUsers.toLocaleString("en-IN"),
            sub: "↑ 12% vs last period",
            trend: "up",
            ocid: "funnel.kpi.total_users"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Paid Users",
            value: paidUsers.toLocaleString("en-IN"),
            sub: "↑ 8% vs last period",
            trend: "up",
            ocid: "funnel.kpi.paid_users"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Free → Paid",
            value: `${freeToPaid}%`,
            sub: "Conversion rate",
            trend: "neutral",
            ocid: "funnel.kpi.conversion_rate"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          KpiCard,
          {
            label: "Onboarding %",
            value: `${onboardingCompletion}%`,
            sub: "Completion rate",
            trend: "up",
            ocid: "funnel.kpi.onboarding_completion"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "funnel.chart.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/40 rounded-xl p-4 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-bold text-foreground", children: "8-Step Conversion Funnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Install → Signup → Onboarding → Payment" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[11px] font-semibold px-2 py-1 rounded-full",
              style: {
                background: "oklch(var(--primary) / 0.12)",
                color: "oklch(var(--primary))"
              },
              children: dateRange
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FunnelChart, { steps: funnelSteps })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "funnel.behavior.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground mb-3", children: "User Behavior Insights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeatmapCard,
            {
              title: "Most Active Screens",
              items: screenActivity,
              showScreen: true,
              ocid: "funnel.screens"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeatmapCard,
            {
              title: "Interaction Types",
              items: MOCK_INTERACTIONS,
              ocid: "funnel.interactions"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "funnel.heatmap.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground mb-3", children: "Element Heatmap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeatmapCard,
            {
              title: "Top Tapped Elements",
              items: MOCK_TOP_TAPPED,
              showScreen: true,
              ocid: "funnel.top_tapped"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HeatmapCard,
            {
              title: "Rage Taps ⚠️",
              items: MOCK_RAGE_TAPS,
              showScreen: true,
              showFix: true,
              ocid: "funnel.rage_taps"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "funnel.retention.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground mb-3", children: "Retention Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-3", children: [
          { label: "Leads", value: weeklyLeads, icon: "📊" },
          { label: "Replies", value: weeklyReplies, icon: "💬" },
          { label: "Proposals", value: weeklyProposals, icon: "📄" }
        ].map(({ label, value, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border/40 rounded-xl p-3 text-center shadow-card",
            "data-ocid": `funnel.retention.${label.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-bold text-foreground mt-1 tabular-nums", children: value.toLocaleString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
                label,
                " / week"
              ] })
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border/40 rounded-xl p-4 shadow-card mb-3",
            "data-ocid": "funnel.retention.dau_chart",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground", children: "Daily Active Users" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-bold",
                    style: { color: "oklch(var(--success))" },
                    children: "↑ +21% this week"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { data: DAU_DATA, days: DAU_DAYS })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border/40 rounded-xl p-4 shadow-card",
            "data-ocid": "funnel.retention.streak_distribution",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold text-foreground", children: "Streak Distribution" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "streak-badge text-xs px-2 py-1", children: [
                  "🔥 Your streak: ",
                  currentStreak,
                  " days"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: STREAK_MILESTONES.map(({ label, pct }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  "data-ocid": `funnel.streak.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground w-36 shrink-0", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "h-full rounded-full",
                        style: { background: "oklch(var(--milestone-gold))" },
                        initial: { width: 0 },
                        whileInView: { width: `${pct}%` },
                        viewport: { once: true },
                        transition: {
                          duration: 0.6,
                          delay: i * 0.08,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground tabular-nums w-10 text-right", children: [
                      pct,
                      "%"
                    ] })
                  ]
                },
                label
              )) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
    ] })
  ] });
}
export {
  FunnelDashboardPage as default
};
