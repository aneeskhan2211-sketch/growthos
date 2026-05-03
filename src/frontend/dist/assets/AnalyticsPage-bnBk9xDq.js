import { aV as frame, aW as isMotionValue, aX as JSAnimation, r as reactExports, aY as MotionConfigContext, aZ as useTransform, a_ as useMotionValue, a$ as useNavigate, b0 as useGA4Analytics, j as jsxRuntimeExports, i as Button, y as motion, n as Card, $ as Skeleton, t as Tabs, v as TabsList, w as TabsTrigger, aP as TabsContent, A as AnimatePresence, h as Badge, R as ResponsiveContainer, Q as Cell, N as Tooltip, b1 as CartesianGrid, K as XAxis, Y as YAxis, J as BarChart, O as Bar } from "./index-DcPx_5wo.js";
import { M as MetricCard } from "./MetricCard-Com_BhSx.js";
import { P as PageHeader } from "./PageHeader-DQS9y6_H.js";
import { P as PieChart, a as Pie } from "./PieChart-UXgBuAgW.js";
import { A as AreaChart, a as Area } from "./AreaChart-S7CCCoYI.js";
import "./minus-BGo421Cc.js";
function attachFollow(value, source, options = {}) {
  const initialValue = value.get();
  let activeAnimation = null;
  let latestValue = initialValue;
  let latestSetter;
  const unit = typeof initialValue === "string" ? initialValue.replace(/[\d.-]/g, "") : void 0;
  const stopAnimation = () => {
    if (activeAnimation) {
      activeAnimation.stop();
      activeAnimation = null;
    }
    value.animation = void 0;
  };
  const startAnimation = () => {
    const currentValue = asNumber(value.get());
    const targetValue = asNumber(latestValue);
    if (currentValue === targetValue) {
      stopAnimation();
      return;
    }
    const velocity = activeAnimation ? activeAnimation.getGeneratorVelocity() : value.getVelocity();
    stopAnimation();
    activeAnimation = new JSAnimation({
      keyframes: [currentValue, targetValue],
      velocity,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...options,
      onUpdate: latestSetter
    });
  };
  const scheduleAnimation = () => {
    var _a;
    startAnimation();
    value.animation = activeAnimation ?? void 0;
    (_a = value["events"].animationStart) == null ? void 0 : _a.notify();
    activeAnimation == null ? void 0 : activeAnimation.then(() => {
      var _a2;
      value.animation = void 0;
      (_a2 = value["events"].animationComplete) == null ? void 0 : _a2.notify();
    });
  };
  value.attach((v, set) => {
    latestValue = v;
    latestSetter = (latest) => set(parseValue(latest, unit));
    frame.postRender(scheduleAnimation);
  }, stopAnimation);
  if (isMotionValue(source)) {
    let skipNextAnimation = options.skipInitialAnimation === true;
    const removeSourceOnChange = source.on("change", (v) => {
      if (skipNextAnimation) {
        skipNextAnimation = false;
        value.jump(parseValue(v, unit), false);
      } else {
        value.set(parseValue(v, unit));
      }
    });
    const removeValueOnDestroy = value.on("destroy", removeSourceOnChange);
    return () => {
      removeSourceOnChange();
      removeValueOnDestroy();
    };
  }
  return stopAnimation;
}
function parseValue(v, unit) {
  return unit ? v + unit : v;
}
function asNumber(v) {
  return typeof v === "number" ? v : parseFloat(v);
}
function useFollowValue(source, options = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const getFromSource = () => isMotionValue(source) ? source.get() : source;
  if (isStatic) {
    return useTransform(getFromSource);
  }
  const value = useMotionValue(getFromSource());
  reactExports.useInsertionEffect(() => {
    return attachFollow(value, source, options);
  }, [value, JSON.stringify(options)]);
  return value;
}
function useSpring(source, options = {}) {
  return useFollowValue(source, { type: "spring", ...options });
}
const REVENUE_90D = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(2026, 0, 1);
  d.setDate(d.getDate() + i);
  const label = `${d.getDate()}/${d.getMonth() + 1}`;
  const base = 2800 + Math.sin(i / 7) * 800 + i * 30;
  return {
    label,
    revenue: Math.round(base + Math.random() * 600),
    leads: Math.round(6 + Math.sin(i / 5) * 3 + i * 0.1),
    conversions: Math.round(0.8 + Math.random() * 0.6)
  };
});
const REVENUE_30D = REVENUE_90D.slice(-30);
const REVENUE_7D = REVENUE_90D.slice(-7);
const TRAFFIC_SOURCES = [
  { name: "Google Organic", value: 38, color: "oklch(0.6 0.25 253)" },
  { name: "Google Ads", value: 24, color: "oklch(0.64 0.18 170)" },
  { name: "Direct", value: 15, color: "oklch(0.74 0.2 86)" },
  { name: "Social Media", value: 13, color: "oklch(0.7 0.18 40)" },
  { name: "Referral", value: 10, color: "oklch(0.78 0.15 300)" }
];
const FUNNEL_STAGES = [
  { stage: "Visitors", count: 12400, dropoff: null },
  { stage: "Leads", count: 1247, dropoff: 90 },
  { stage: "Qualified", count: 486, dropoff: 61 },
  { stage: "Proposals Sent", count: 89, dropoff: 81.7 },
  { stage: "Clients Won", count: 37, dropoff: 58.4 }
];
const ROI_TABLE = [
  { source: "Google Ads", leads: 312, cost: 48e3, revenue: 285e3, roi: 494 },
  {
    source: "Organic SEO",
    leads: 289,
    cost: 12e3,
    revenue: 198e3,
    roi: 1550
  },
  { source: "Meta Ads", leads: 198, cost: 35e3, revenue: 142e3, roi: 306 },
  {
    source: "WhatsApp Outreach",
    leads: 167,
    cost: 8e3,
    revenue: 118e3,
    roi: 1375
  },
  { source: "LinkedIn", leads: 124, cost: 22e3, revenue: 96e3, roi: 336 },
  { source: "Referral", leads: 157, cost: 5e3, revenue: 215e3, roi: 4200 }
].sort((a, b) => b.roi - a.roi);
const CLIENT_PERFORMANCE = [
  {
    name: "Sunrise Salon",
    leads: 48,
    revenue: 28500,
    growth: 24,
    trend: "up"
  },
  {
    name: "FitZone Gym",
    leads: 62,
    revenue: 42e3,
    growth: 38,
    trend: "up"
  },
  {
    name: "Dr. Mehta Clinic",
    leads: 31,
    revenue: 19800,
    growth: 15,
    trend: "up"
  },
  {
    name: "TechEdge IT",
    leads: 19,
    revenue: 55e3,
    growth: 52,
    trend: "up"
  },
  {
    name: "StarBites Bakery",
    leads: 44,
    revenue: 12400,
    growth: 8,
    trend: "up"
  }
];
const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HEATMAP_WEEKS = ["W1", "W2", "W3", "W4"];
const HEATMAP_DATA = HEATMAP_WEEKS.map(
  (week) => HEATMAP_DAYS.map((day) => ({
    week,
    day,
    value: Math.floor(Math.random() * 100)
  }))
);
const SPARKLINE = [
  { value: 42 },
  { value: 55 },
  { value: 48 },
  { value: 67 },
  { value: 72 },
  { value: 89 },
  { value: 95 }
];
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0
}) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const display = useTransform(
    spring,
    (v) => `${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")}${suffix}`
  );
  reactExports.useEffect(() => {
    mv.set(target);
  }, [mv, target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { children: display });
}
function HeatCell({ value, delay }) {
  const intensity = value / 100;
  const alpha = 0.08 + intensity * 0.85;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "rounded aspect-square",
      initial: { opacity: 0, scale: 0.6 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay, duration: 0.3, ease: "easeOut" },
      title: `${value} actions`,
      style: { background: `oklch(0.6 0.25 253 / ${alpha})` }
    }
  );
}
function DateRangePicker({
  value,
  onChange
}) {
  const opts = [
    { label: "Last 7 days", val: "7d" },
    { label: "Last 30 days", val: "30d" },
    { label: "Last 90 days", val: "90d" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1 bg-muted/50 rounded-lg p-1",
      "data-ocid": "analytics.date_range",
      children: opts.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(o.val),
          "data-ocid": `analytics.date_range.${o.val}`,
          className: `px-3 py-1.5 text-xs font-medium rounded-md transition-fast ${value === o.val ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
          children: o.label
        },
        o.val
      ))
    }
  );
}
function ChartToggle({
  value,
  onChange
}) {
  const opts = [
    { label: "Revenue", val: "revenue" },
    { label: "Leads", val: "leads" },
    { label: "Conversions", val: "conversions" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1 bg-muted/50 rounded-lg p-1",
      "data-ocid": "analytics.chart_toggle",
      children: opts.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(o.val),
          "data-ocid": `analytics.chart_toggle.${o.val}`,
          className: `px-3 py-1.5 text-xs font-medium rounded-md transition-fast ${value === o.val ? "bg-card text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
          children: o.label
        },
        o.val
      ))
    }
  );
}
function RevenueChart({
  data,
  metric
}) {
  const colorMap = {
    revenue: "oklch(0.6 0.25 253)",
    leads: "oklch(0.64 0.18 170)",
    conversions: "oklch(0.74 0.2 86)"
  };
  const color = colorMap[metric];
  const gradId = `grad_${metric}`;
  const tickData = data.filter((_, i) => i % Math.ceil(data.length / 8) === 0);
  const xLabels = new Set(tickData.map((d) => d.label));
  const formatValue = (v) => {
    if (metric === "revenue") return `₹${(v / 1e3).toFixed(0)}K`;
    if (metric === "conversions") return `${v}%`;
    return String(v);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data, margin: { top: 8, right: 8, bottom: 0, left: 0 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: color, stopOpacity: 0.18 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: color, stopOpacity: 0 })
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
        dataKey: "label",
        tick: { fontSize: 10 },
        axisLine: false,
        tickLine: false,
        tickFormatter: (v) => xLabels.has(v) ? v : "",
        interval: 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YAxis,
      {
        tick: { fontSize: 10 },
        axisLine: false,
        tickLine: false,
        tickFormatter: formatValue,
        width: 52
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
        formatter: (v) => [
          formatValue(v),
          metric.charAt(0).toUpperCase() + metric.slice(1)
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Area,
      {
        type: "monotone",
        dataKey: metric,
        stroke: color,
        strokeWidth: 2,
        fill: `url(#${gradId})`,
        dot: false,
        activeDot: { r: 4, fill: color },
        animationDuration: 800,
        animationEasing: "ease-out"
      }
    )
  ] }) });
}
function ConversionFunnel() {
  const maxW = 100;
  const widths = FUNNEL_STAGES.map((_, i) => maxW - i * 14);
  const colors = [
    "oklch(0.6 0.25 253)",
    "oklch(0.62 0.22 253)",
    "oklch(0.64 0.18 170)",
    "oklch(0.68 0.18 86)",
    "oklch(0.56 0.15 170)"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-w-lg mx-auto", "data-ocid": "analytics.funnel", children: FUNNEL_STAGES.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
      "data-ocid": `analytics.funnel.item.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: stage.stage }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold tabular-nums", children: stage.count.toLocaleString("en-IN") }),
            stage.dropoff !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-destructive font-medium", children: [
              "↓ ",
              stage.dropoff,
              "% drop"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-8 rounded-md flex items-center px-3 transition-smooth",
            style: {
              width: `${widths[i]}%`,
              background: `${colors[i]}`,
              opacity: 0.85 + (i === 0 ? 0.15 : 0)
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-white/90 truncate", children: [
              (stage.count / FUNNEL_STAGES[0].count * 100).toFixed(1),
              "% of visitors"
            ] })
          }
        )
      ]
    },
    stage.stage
  )) });
}
function RoiTable() {
  const maxRoi = ROI_TABLE[0].roi;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", "data-ocid": "analytics.roi.table", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[600px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: ["Lead Source", "Leads", "Cost (₹)", "Revenue (₹)", "ROI %"].map(
      (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide",
          children: h
        },
        h
      )
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: ROI_TABLE.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.tr,
      {
        className: "hover:bg-muted/20 transition-fast group",
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06, duration: 0.3 },
        "data-ocid": `analytics.roi.row.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: row.source }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground tabular-nums", children: row.leads }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-muted-foreground tabular-nums", children: [
            "₹",
            row.cost.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-foreground tabular-nums", children: [
            "₹",
            row.revenue.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-[80px] progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "progress-bar-fill",
                style: {
                  width: `${Math.min(row.roi / maxRoi * 100, 100)}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs font-bold tabular-nums ${row.roi > 1e3 ? "text-success" : row.roi > 400 ? "text-warning" : "text-muted-foreground"}`,
                children: [
                  row.roi,
                  "%"
                ]
              }
            ),
            i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[10px] status-active border-0 px-1.5 py-0", children: "Top" })
          ] }) })
        ]
      },
      row.source
    )) })
  ] }) });
}
function ClientPerformance() {
  const maxRevenue = Math.max(...CLIENT_PERFORMANCE.map((c) => c.revenue));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "analytics.clients", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: CLIENT_PERFORMANCE.map((client, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "bg-card border border-border rounded-xl p-4 hover-lift transition-hover",
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08, duration: 0.35 },
        "data-ocid": `analytics.clients.card.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: client.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                client.leads,
                " leads generated"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success text-sm font-bold", children: [
              "↑ ",
              client.growth,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground tabular-nums", children: [
            "₹",
            client.revenue.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Monthly Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "progress-bar-fill",
              style: { width: `${client.revenue / maxRevenue * 100}%` }
            }
          ) })
        ]
      },
      client.name
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground mb-4", children: "Revenue by Client" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        BarChart,
        {
          data: CLIENT_PERFORMANCE,
          margin: { top: 4, right: 4, bottom: 0, left: 0 },
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
                tickFormatter: (v) => `₹${(v / 1e3).toFixed(0)}K`,
                width: 44
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
                formatter: (v) => [
                  `₹${v.toLocaleString("en-IN")}`,
                  "Revenue"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Bar,
              {
                dataKey: "revenue",
                radius: [4, 4, 0, 0],
                animationDuration: 700,
                children: CLIENT_PERFORMANCE.map((client, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Cell,
                  {
                    fill: `oklch(${0.55 + idx * 0.05} 0.22 253)`
                  },
                  `bar-${client.name}`
                ))
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
function WeeklyHeatmap() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "analytics.heatmap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[340px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[28px_repeat(7,1fr)] gap-1.5 mb-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        HEATMAP_DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-center text-[10px] font-semibold text-muted-foreground",
            children: d
          },
          d
        ))
      ] }),
      HEATMAP_WEEKS.map((week, wi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-[28px_repeat(7,1fr)] gap-1.5 mb-1.5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center text-[10px] font-semibold text-muted-foreground", children: week }),
            HEATMAP_DATA[wi].map((cell, di) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              HeatCell,
              {
                value: cell.value,
                delay: (wi * 7 + di) * 0.02
              },
              `${week}-${cell.day}`
            ))
          ]
        },
        week
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Less" }),
      [0.08, 0.25, 0.45, 0.65, 0.9].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-4 h-4 rounded",
          style: { background: `oklch(0.6 0.25 253 / ${a})` }
        },
        a
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "More" })
    ] })
  ] });
}
function AnalyticsPage() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = reactExports.useState("30d");
  const [chartMetric, setChartMetric] = reactExports.useState("revenue");
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const hasAnimated = reactExports.useRef(false);
  const [showCounters, setShowCounters] = reactExports.useState(false);
  const ga4 = useGA4Analytics(90);
  const ga4Data = ga4.data;
  reactExports.useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      const t = setTimeout(() => setShowCounters(true), 200);
      return () => clearTimeout(t);
    }
  }, []);
  const chartData = dateRange === "7d" ? REVENUE_7D : dateRange === "30d" ? REVENUE_30D : REVENUE_90D;
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
    "oklch(0.68 0.2 200)"
  ];
  const trafficSourcesDisplay = ga4Data && ga4Data.trafficSources.length > 0 ? ga4Data.trafficSources.map(([name, count], i) => ({
    name,
    value: Number(count),
    color: SOURCE_COLORS[i % SOURCE_COLORS.length]
  })) : TRAFFIC_SOURCES;
  const topPagesDisplay = ga4Data && ga4Data.topPages.length > 0 ? ga4Data.topPages : [];
  const totalSourceTraffic = trafficSourcesDisplay.reduce(
    (s, x) => s + x.value,
    0
  );
  const trafficSourcesPct = trafficSourcesDisplay.map((s) => ({
    ...s,
    pct: totalSourceTraffic > 0 ? Math.round(s.value / totalSourceTraffic * 100) : 0
  }));
  const kpis = [
    {
      label: "Sessions",
      target: ga4Sessions,
      display: ga4.isLoading ? "—" : ga4Sessions.toLocaleString("en-IN"),
      change: 12,
      trend: "up",
      gradient: "gradient-kpi",
      isLoading: ga4.isLoading
    },
    {
      label: "Users",
      target: ga4Users,
      display: ga4.isLoading ? "—" : ga4Users.toLocaleString("en-IN"),
      change: 18,
      trend: "up",
      gradient: "gradient-success",
      isLoading: ga4.isLoading
    },
    {
      label: "Bounce Rate",
      target: ga4BounceRate,
      display: ga4.isLoading ? "—" : `${ga4BounceRate.toFixed(1)}%`,
      change: -2.1,
      trend: "up",
      gradient: "",
      isLoading: ga4.isLoading
    },
    {
      label: "Conversions",
      target: ga4Conversions,
      display: ga4.isLoading ? "—" : ga4Conversions.toLocaleString("en-IN"),
      change: 8,
      trend: "up",
      gradient: "gradient-premium",
      isLoading: ga4.isLoading
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "analytics.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Analytics",
        description: "Revenue-first insights for smarter decisions",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap justify-end", children: [
          (ga4Data == null ? void 0 : ga4Data.isLive) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20",
              "data-ocid": "analytics.ga4_live_badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success animate-pulse" }),
                "Live"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/40",
              "data-ocid": "analytics.ga4_demo_badge",
              children: [
                "Demo data ·",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "underline underline-offset-2 hover:text-foreground transition-colors",
                    onClick: () => navigate({ to: "/settings" }),
                    children: "Configure GA4 →"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { value: dateRange, onChange: setDateRange }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              type: "button",
              "data-ocid": "analytics.export_button",
              children: "Export CSV"
            }
          )
        ] })
      }
    ),
    ga4.error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/40 text-xs text-muted-foreground",
        "data-ocid": "analytics.ga4_error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-warning text-base", children: "⚠" }),
          "GA4 data unavailable — showing demo data.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/settings",
              className: "text-primary hover:underline font-medium",
              children: "Configure in Settings →"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        initial: "hidden",
        animate: "visible",
        variants: { visible: { transition: { staggerChildren: 0.09 } } },
        children: kpis.map((kpi, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: {
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 }
            },
            transition: { duration: 0.4, ease: "easeOut" },
            "data-ocid": `analytics.kpi.${i + 1}`,
            children: kpi.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-28" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              MetricCard,
              {
                label: kpi.label,
                value: kpi.display,
                change: kpi.change,
                trend: kpi.trend,
                gradient: kpi.gradient,
                sparkline: SPARKLINE,
                changeLabel: "vs last period"
              }
            )
          },
          kpi.label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Tabs,
      {
        value: activeTab,
        onValueChange: setActiveTab,
        "data-ocid": "analytics.tabs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mb-5 flex-wrap h-auto gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", "data-ocid": "analytics.tab.overview", children: "Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "funnel", "data-ocid": "analytics.tab.funnel", children: "Funnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "sources", "data-ocid": "analytics.tab.sources", children: "Traffic Sources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "toppages", "data-ocid": "analytics.tab.toppages", children: "Top Pages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "roi", "data-ocid": "analytics.tab.roi", children: "Lead ROI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "clients", "data-ocid": "analytics.tab.clients", children: "Clients" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "heatmap", "data-ocid": "analytics.tab.heatmap", children: "Activity" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Performance Trend" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        dateRange === "7d" ? "Last 7 days" : dateRange === "30d" ? "Last 30 days" : "Last 90 days",
                        " ",
                        "· Daily breakdown"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChartToggle, { value: chartMetric, onChange: setChartMetric })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueChart, { data: chartData, metric: chartMetric })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mt-4", children: [
                  {
                    label: "Peak Day Revenue",
                    value: "₹12,400",
                    sub: "15 Jan 2026"
                  },
                  {
                    label: "Best Lead Day",
                    value: "23 leads",
                    sub: "22 Jan 2026"
                  },
                  { label: "Top Conv. Day", value: "7.8%", sub: "8 Jan 2026" }
                ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: stat.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground tabular-nums", children: stat.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.sub })
                ] }, stat.label)) })
              ]
            },
            "overview"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "funnel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Conversion Funnel" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Visitor to client journey ·",
                      " ",
                      dateRange === "7d" ? "7d" : dateRange === "30d" ? "30d" : "90d",
                      " ",
                      "window"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                    (37 / 12400 * 100).toFixed(2),
                    "% overall"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ConversionFunnel, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border", children: [
                  {
                    label: "Lead Capture Rate",
                    value: "10.1%",
                    color: "text-primary"
                  },
                  {
                    label: "Qualification Rate",
                    value: "39.0%",
                    color: "text-success"
                  },
                  {
                    label: "Proposal Rate",
                    value: "18.3%",
                    color: "text-warning"
                  },
                  {
                    label: "Close Rate",
                    value: "41.6%",
                    color: "text-success"
                  }
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-xl font-bold tabular-nums ${m.color}`,
                      children: m.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: m.label })
                ] }, m.label)) })
              ] })
            },
            "funnel"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sources", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Traffic Source Breakdown" }),
                  (ga4Data == null ? void 0 : ga4Data.isLive) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-success font-medium flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success" }),
                    "Live GA4"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 220, height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Pie,
                      {
                        data: trafficSourcesPct,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 62,
                        outerRadius: 95,
                        paddingAngle: 3,
                        dataKey: "pct",
                        animationBegin: 0,
                        animationDuration: 700,
                        children: trafficSourcesPct.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Cell,
                          {
                            fill: entry.color
                          },
                          `pie-${entry.name}`
                        ))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Tooltip,
                      {
                        formatter: (v) => [`${v}%`, "Share"],
                        contentStyle: {
                          fontSize: 12,
                          borderRadius: 8,
                          border: "1px solid oklch(var(--border))"
                        }
                      }
                    )
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full space-y-3", children: trafficSourcesPct.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      className: "flex items-center gap-3",
                      initial: { opacity: 0, x: 12 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: i * 0.08, duration: 0.3 },
                      "data-ocid": `analytics.source.item.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "w-2.5 h-2.5 rounded-full shrink-0",
                            style: { background: s.color }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground", children: s.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-[120px] progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "progress-bar-fill",
                            style: {
                              width: `${s.pct}%`,
                              background: s.color
                            }
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            variant: "secondary",
                            className: "text-xs tabular-nums w-10 justify-center",
                            children: [
                              s.pct,
                              "%"
                            ]
                          }
                        )
                      ]
                    },
                    s.name
                  )) })
                ] })
              ] })
            },
            "sources"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "toppages", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Top Pages" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Most visited pages in the selected period" })
                  ] }),
                  (ga4Data == null ? void 0 : ga4Data.isLive) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-success font-medium flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-success" }),
                    "Live GA4"
                  ] })
                ] }),
                ga4.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3",
                    "data-ocid": "analytics.toppages.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
                    ]
                  },
                  i
                )) }) : topPagesDisplay.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm text-muted-foreground text-center py-8",
                    "data-ocid": "analytics.toppages.empty_state",
                    children: [
                      "No page data available.",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "/settings",
                          className: "text-primary hover:underline",
                          children: "Configure GA4 →"
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "space-y-2",
                    "data-ocid": "analytics.toppages.list",
                    children: topPagesDisplay.map(([page, count], i) => {
                      const maxCount = Number(topPagesDisplay[0][1]);
                      const pct = maxCount > 0 ? Math.round(Number(count) / maxCount * 100) : 0;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          className: "flex items-center gap-3",
                          initial: { opacity: 0, x: -12 },
                          animate: { opacity: 1, x: 0 },
                          transition: { delay: i * 0.07, duration: 0.3 },
                          "data-ocid": `analytics.toppages.item.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-5 shrink-0 tabular-nums", children: i + 1 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-foreground font-mono truncate", children: page }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 progress-bar shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "progress-bar-fill",
                                style: { width: `${pct}%` }
                              }
                            ) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tabular-nums text-muted-foreground w-16 text-right shrink-0", children: [
                              Number(count).toLocaleString("en-IN"),
                              " views"
                            ] })
                          ]
                        },
                        page
                      );
                    })
                  }
                )
              ] })
            },
            "toppages"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "roi", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Lead Source ROI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sorted by ROI descending" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      "data-ocid": "analytics.roi.export_button",
                      children: "Export"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RoiTable, {})
              ] })
            },
            "roi"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "clients", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientPerformance, {})
            },
            "clients"
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "heatmap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Weekly Activity Heatmap" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Leads contacted + messages sent per day" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Last 4 weeks" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyHeatmap, {})
              ] })
            },
            "heatmap"
          ) }) })
        ]
      }
    ),
    showCounters && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
        "data-ocid": "analytics.summary.section",
        children: [
          {
            label: "Total Sessions",
            target: ga4Sessions,
            prefix: "",
            suffix: ""
          },
          {
            label: "Total Users",
            target: ga4Users,
            prefix: "",
            suffix: ""
          },
          {
            label: "Avg. Bounce Rate",
            target: ga4BounceRate,
            prefix: "",
            suffix: "%",
            decimals: 1
          },
          {
            label: "Conversions",
            target: ga4Conversions,
            prefix: "",
            suffix: ""
          }
        ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "p-4 text-center",
            "data-ocid": `analytics.summary.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums font-display", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                AnimatedCounter,
                {
                  target: item.target,
                  prefix: item.prefix,
                  suffix: item.suffix,
                  decimals: item.decimals ?? 0
                }
              ) })
            ]
          },
          item.label
        ))
      }
    )
  ] });
}
export {
  AnalyticsPage as default
};
