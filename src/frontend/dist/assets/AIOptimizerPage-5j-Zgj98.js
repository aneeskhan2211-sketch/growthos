import { c as createLucideIcon, u as useActor, a as useQuery, e as createActor, aG as useMetaTags, r as reactExports, j as jsxRuntimeExports, y as motion, Z as Zap, ab as Sparkles, bP as Eye, ac as RefreshCw, b2 as ChartNoAxesColumn, aC as TriangleAlert, aN as PAGE_META, m as ue } from "./index-DcPx_5wo.js";
import { d as defaultABTests } from "./abTests-DFKS3-k8.js";
import { A as ArrowUpRight } from "./arrow-up-right-B1K0Na3Y.js";
import { A as ArrowDownRight } from "./arrow-down-right-CtD2X7uP.js";
import { T as Trophy } from "./trophy-SLj1qkKb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "9", cy: "12", r: "3", key: "u3jwor" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleLeft = createLucideIcon("toggle-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "15", cy: "12", r: "3", key: "1afu0r" }],
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "7", key: "g7kal2" }]
];
const ToggleRight = createLucideIcon("toggle-right", __iconNode);
function segmentLabel(seg) {
  if ("LowActivity" in seg) return "low";
  if ("HighIntent" in seg) return "high";
  return "medium";
}
function transformSegmentDistribution(raw) {
  return {
    lowActivity: Number(raw.lowActivity),
    mediumActivity: Number(raw.mediumActivity),
    highIntent: Number(raw.highIntent),
    totalScored: Number(raw.totalScored)
  };
}
function transformNudgeRows(raw) {
  return raw.map((r) => ({
    variantId: r.variantId,
    segment: segmentLabel(r.segment),
    copyType: r.copyType,
    sent: Number(r.sent),
    opened: Number(r.opened),
    actionTaken: Number(r.actionTaken),
    openRate: r.openRate,
    conversionRate: r.conversionRate,
    isWinner: r.isWinner
  }));
}
function useUserSegments() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["userSegments"],
    queryFn: async () => {
      if (!actor)
        return {
          lowActivity: 847,
          mediumActivity: 1234,
          highIntent: 312,
          totalScored: 2393
        };
      try {
        const raw = await actor.getUserSegments();
        return transformSegmentDistribution(raw);
      } catch {
        return {
          lowActivity: 847,
          mediumActivity: 1234,
          highIntent: 312,
          totalScored: 2393
        };
      }
    },
    enabled: !isFetching,
    staleTime: 12e4
  });
}
function useNudgePerformanceBySegment() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["nudgePerformanceBySegment"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const raw = await actor.getNudgePerformanceBySegment(null);
        if (!raw.length) return [];
        return transformNudgeRows(raw);
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 12e4
  });
}
const SEGMENT_CONFIG = {
  low: {
    id: "low",
    label: "Low Activity",
    description: "Signed up but rarely engage. Fewer than 3 actions in 7 days.",
    recommendedAction: "Show 2-day free trial",
    trend: "down",
    trendPct: 4.2,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted/40",
    borderClass: "border-border/40",
    dotClass: "bg-muted-foreground"
  },
  medium: {
    id: "medium",
    label: "Engaged",
    description: "Regular users — send messages, view leads weekly.",
    recommendedAction: "Offer bonus credits",
    trend: "up",
    trendPct: 11.8,
    colorClass: "text-warning",
    bgClass: "bg-warning/8",
    borderClass: "border-warning/30",
    dotClass: "bg-warning"
  },
  high: {
    id: "high",
    label: "High Intent",
    description: "Active daily. Hit free limits. Viewed paywall 2+ times.",
    recommendedAction: "Show limited-time 50% off",
    trend: "up",
    trendPct: 23.5,
    colorClass: "text-success",
    bgClass: "bg-success/8",
    borderClass: "border-success/30",
    dotClass: "bg-success"
  }
};
const nudgeCopyPreview = {
  low: {
    urgency: "Follow up today to increase chances.",
    fomo: "Leads active in your area right now.",
    reward: "Strong start. Your first booking is within reach.",
    money: "These leads could convert if contacted today."
  },
  medium: {
    urgency: "Reply now—fast responses convert better.",
    fomo: "3 prospects checked messages today.",
    reward: "You're on a 5-day streak. Keep it up.",
    money: "Follow-ups often turn into bookings."
  },
  high: {
    urgency: "Act now. Early responses convert 3x better.",
    fomo: "12 high-quality leads are waiting. Don't miss today.",
    reward: "Great work. You contacted 8 leads today.",
    money: "Your pending leads could be worth ₹35,000."
  }
};
const MOCK_NUDGE_ROWS = [
  {
    segment: "low",
    nudgeType: "urgency",
    copyPreview: nudgeCopyPreview.low.urgency,
    sent: 412,
    opened: 89,
    actedOn: 21,
    enabled: true
  },
  {
    segment: "low",
    nudgeType: "fomo",
    copyPreview: nudgeCopyPreview.low.fomo,
    sent: 389,
    opened: 104,
    actedOn: 38,
    enabled: true
  },
  {
    segment: "low",
    nudgeType: "reward",
    copyPreview: nudgeCopyPreview.low.reward,
    sent: 201,
    opened: 43,
    actedOn: 9,
    enabled: false
  },
  {
    segment: "medium",
    nudgeType: "urgency",
    copyPreview: nudgeCopyPreview.medium.urgency,
    sent: 623,
    opened: 198,
    actedOn: 87,
    enabled: true
  },
  {
    segment: "medium",
    nudgeType: "fomo",
    copyPreview: nudgeCopyPreview.medium.fomo,
    sent: 541,
    opened: 167,
    actedOn: 52,
    enabled: true
  },
  {
    segment: "medium",
    nudgeType: "reward",
    copyPreview: nudgeCopyPreview.medium.reward,
    sent: 298,
    opened: 112,
    actedOn: 31,
    enabled: true
  },
  {
    segment: "high",
    nudgeType: "urgency",
    copyPreview: nudgeCopyPreview.high.urgency,
    sent: 187,
    opened: 96,
    actedOn: 64,
    enabled: true
  },
  {
    segment: "high",
    nudgeType: "fomo",
    copyPreview: nudgeCopyPreview.high.fomo,
    sent: 164,
    opened: 91,
    actedOn: 58,
    enabled: true
  },
  {
    segment: "high",
    nudgeType: "money",
    copyPreview: nudgeCopyPreview.high.money,
    sent: 142,
    opened: 78,
    actedOn: 41,
    enabled: true
  }
];
function backendRowToNudgeRow(r) {
  const copyPreviewMap = nudgeCopyPreview[r.segment] ?? nudgeCopyPreview.medium;
  const nudgeType = r.copyType === "fomo" ? "fomo" : r.copyType === "urgency" ? "urgency" : r.copyType === "money_visibility" ? "money" : "reward";
  return {
    segment: r.segment,
    nudgeType,
    copyPreview: copyPreviewMap[nudgeType],
    sent: r.sent,
    opened: r.opened,
    actedOn: r.actionTaken,
    enabled: true,
    isWinner: r.isWinner
  };
}
const PRICING_ROWS = [
  {
    userId: "U001",
    name: "Priya Sharma",
    city: "Mumbai",
    segment: "high",
    recommendedOffer: "50% off Growth for 24h",
    offerShown: true,
    dateShown: "2026-04-30"
  },
  {
    userId: "U002",
    name: "Rahul Nair",
    city: "Pune",
    segment: "low",
    recommendedOffer: "2-day free trial",
    offerShown: true,
    dateShown: "2026-04-30"
  },
  {
    userId: "U003",
    name: "Ankit Verma",
    city: "Delhi",
    segment: "medium",
    recommendedOffer: "+50 bonus lead credits",
    offerShown: false,
    dateShown: null
  },
  {
    userId: "U004",
    name: "Sneha Patil",
    city: "Mumbai",
    segment: "high",
    recommendedOffer: "Limited-time upgrade bonus",
    offerShown: true,
    dateShown: "2026-04-29"
  },
  {
    userId: "U005",
    name: "Deepak Singh",
    city: "Bengaluru",
    segment: "low",
    recommendedOffer: "2-day free trial",
    offerShown: false,
    dateShown: null
  },
  {
    userId: "U006",
    name: "Kavita Menon",
    city: "Chennai",
    segment: "medium",
    recommendedOffer: "+50 bonus lead credits",
    offerShown: true,
    dateShown: "2026-04-29"
  },
  {
    userId: "U007",
    name: "Raj Kulkarni",
    city: "Pune",
    segment: "high",
    recommendedOffer: "50% off Growth for 24h",
    offerShown: true,
    dateShown: "2026-04-28"
  },
  {
    userId: "U008",
    name: "Sunita Joshi",
    city: "Hyderabad",
    segment: "low",
    recommendedOffer: "2-day free trial",
    offerShown: false,
    dateShown: null
  },
  {
    userId: "U009",
    name: "Mohit Garg",
    city: "Mumbai",
    segment: "medium",
    recommendedOffer: "+50 bonus lead credits",
    offerShown: true,
    dateShown: "2026-04-28"
  },
  {
    userId: "U010",
    name: "Pooja Iyer",
    city: "Delhi",
    segment: "high",
    recommendedOffer: "Limited-time upgrade bonus",
    offerShown: false,
    dateShown: null
  }
];
const LS_RESULTS = "growthosABResults";
const LS_AB = "growthosABTests";
function readResults() {
  try {
    const r = localStorage.getItem(LS_RESULTS);
    return r ? JSON.parse(r) : {};
  } catch {
    return {};
  }
}
function readAssignments() {
  try {
    const r = localStorage.getItem(LS_AB);
    return r ? JSON.parse(r) : {};
  } catch {
    return {};
  }
}
function computeStats(test, results, assignments) {
  var _a;
  const stats = {};
  for (const v of test.variants) {
    const r = (_a = results[test.id]) == null ? void 0 : _a[v.id];
    const assign = Object.values(assignments).filter(
      (val) => val === v.id
    ).length;
    stats[v.id] = {
      impressions: ((r == null ? void 0 : r.impressions) ?? 0) + assign,
      conversions: (r == null ? void 0 : r.conversions) ?? 0
    };
  }
  return stats;
}
function doResetTest(testId) {
  try {
    const r = localStorage.getItem(LS_RESULTS);
    const results = r ? JSON.parse(r) : {};
    delete results[testId];
    localStorage.setItem(LS_RESULTS, JSON.stringify(results));
    const a = localStorage.getItem(LS_AB);
    if (a) {
      const assigns = JSON.parse(a);
      delete assigns[testId];
      localStorage.setItem(LS_AB, JSON.stringify(assigns));
    }
  } catch {
  }
}
function ActionRateBar({ rate }) {
  const color = rate >= 20 ? "bg-success" : rate >= 10 ? "bg-warning" : "bg-destructive";
  const textColor = rate >= 20 ? "text-success" : rate >= 10 ? "text-warning" : "text-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-[80px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-muted/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full ${color}`,
        style: { width: `${Math.min(rate, 100)}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] font-bold tabular-nums ${textColor}`, children: [
      rate.toFixed(1),
      "%"
    ] })
  ] });
}
function SegmentBadge({ segment }) {
  const cfg = {
    low: "bg-muted/40 text-muted-foreground",
    medium: "bg-warning/10 text-warning",
    high: "bg-success/10 text-success"
  }[segment];
  const label = { low: "Low", medium: "Engaged", high: "High Intent" }[segment];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg}`,
      children: label
    }
  );
}
function SimulateModal({
  row,
  segments,
  onClose
}) {
  const seg = segments.find((s) => s.id === row.segment) ?? {
    ...SEGMENT_CONFIG[row.segment]
  };
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { scale: 0.92, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        className: "bg-card border border-border/40 rounded-2xl shadow-premium p-6 w-80 mx-4",
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] font-bold uppercase tracking-wider text-muted-foreground", children: [
                "Preview for ",
                row.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] font-bold text-foreground mt-0.5", children: row.city })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentBadge, { segment: row.segment })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl border px-4 py-4 ${seg.bgClass} ${seg.borderClass}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wider mb-2 text-muted-foreground", children: "Personalized offer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[16px] font-bold ${seg.colorClass}`, children: row.recommendedOffer }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground mt-2", children: seg.recommendedAction })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "mt-4 w-full text-[13px] font-semibold text-muted-foreground border border-border/40 rounded-lg py-2 hover:bg-muted/30 transition-colors",
              children: "Close"
            }
          )
        ]
      }
    )
  ] });
}
function AIOptimizerPage() {
  useMetaTags(PAGE_META["/growth-engine/ai-optimizer"]);
  const { data: segmentDist } = useUserSegments();
  const { data: backendNudgeRows } = useNudgePerformanceBySegment();
  const SEGMENTS = [
    { ...SEGMENT_CONFIG.low, userCount: (segmentDist == null ? void 0 : segmentDist.lowActivity) ?? 847 },
    {
      ...SEGMENT_CONFIG.medium,
      userCount: (segmentDist == null ? void 0 : segmentDist.mediumActivity) ?? 1234
    },
    { ...SEGMENT_CONFIG.high, userCount: (segmentDist == null ? void 0 : segmentDist.highIntent) ?? 312 }
  ];
  const derivedRows = backendNudgeRows && backendNudgeRows.length > 0 ? backendNudgeRows.map(backendRowToNudgeRow) : MOCK_NUDGE_ROWS;
  const [toggleOverrides, setToggleOverrides] = reactExports.useState({});
  const nudgeRows = derivedRows.map((r) => {
    const key = `${r.segment}-${r.nudgeType}`;
    return key in toggleOverrides ? { ...r, enabled: toggleOverrides[key] } : r;
  });
  const [simulateRow, setSimulateRow] = reactExports.useState(null);
  const [abResults, setAbResults] = reactExports.useState(readResults);
  const [abAssignments, setAbAssignments] = reactExports.useState(readAssignments);
  const allTests = defaultABTests;
  function getBestInSegment(seg) {
    const rows = nudgeRows.filter((r) => r.segment === seg);
    if (!rows.length) return null;
    const winner = rows.find((r) => r.isWinner);
    if (winner) return `${winner.segment}-${winner.nudgeType}`;
    const best = rows.reduce((a, b) => {
      const aRate = a.sent > 0 ? a.actedOn / a.sent * 100 : 0;
      const bRate = b.sent > 0 ? b.actedOn / b.sent * 100 : 0;
      return bRate > aRate ? b : a;
    });
    return `${best.segment}-${best.nudgeType}`;
  }
  function toggleNudge(seg, type) {
    const key = `${seg}-${type}`;
    setToggleOverrides((prev) => {
      var _a;
      const current = ((_a = nudgeRows.find((r) => r.segment === seg && r.nudgeType === type)) == null ? void 0 : _a.enabled) ?? true;
      return { ...prev, [key]: !current };
    });
  }
  function handleResetTest(testId) {
    doResetTest(testId);
    setAbResults(readResults());
    setAbAssignments(readAssignments());
    ue.success("Test data reset");
  }
  const paywallTest = defaultABTests.find((t) => t.id === "paywall_timing");
  const paywallStats = paywallTest ? computeStats(paywallTest, abResults, abAssignments) : {};
  const summaryOffers = {
    freeTrial: PRICING_ROWS.filter((r) => r.recommendedOffer.includes("trial")).length,
    bonusCredits: PRICING_ROWS.filter(
      (r) => r.recommendedOffer.includes("bonus")
    ).length,
    discount: PRICING_ROWS.filter((r) => r.recommendedOffer.includes("%")).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "ai_optimizer.page", className: "space-y-8 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "AI Optimizer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground", children: "Nudge engine, pricing intelligence, and paywall timing — all in one view." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "ai_optimizer.segment_overview.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-4 rounded-full bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-bold text-foreground", children: "User Segment Overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: SEGMENTS.map((seg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": `ai_optimizer.segment_card.${i + 1}`,
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: i * 0.08 },
          className: `rounded-2xl border p-5 ${seg.bgClass} ${seg.borderClass}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-2.5 h-2.5 rounded-full ${seg.dotClass}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[12px] font-bold uppercase tracking-wider ${seg.colorClass}`,
                    children: seg.label
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `flex items-center gap-0.5 text-[11px] font-bold ${seg.trend === "up" ? "text-success" : "text-destructive"}`,
                  children: [
                    seg.trend === "up" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "w-3.5 h-3.5" }),
                    seg.trendPct,
                    "% vs last week"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-display text-foreground tabular-nums", children: seg.userCount.toLocaleString("en-IN") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground mt-2 leading-relaxed", children: seg.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Recommended action" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: `flex items-center gap-1.5 text-[13px] font-bold ${seg.colorClass}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                    seg.recommendedAction
                  ]
                }
              )
            ] })
          ]
        },
        seg.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "ai_optimizer.nudge_panel.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-4 rounded-full bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-bold text-foreground", children: "Nudge Recommendation Panel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-[12px]",
          "data-ocid": "ai_optimizer.nudge_table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/30 bg-muted/20", children: [
              "Segment",
              "Nudge Type",
              "Copy Preview",
              "Sent",
              "Opened",
              "Acted On",
              "Action Rate",
              "Status"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/20", children: nudgeRows.map((row, i) => {
              const actionRate = row.sent > 0 ? row.actedOn / row.sent * 100 : 0;
              const rowKey = `${row.segment}-${row.nudgeType}`;
              const bestKey = getBestInSegment(row.segment);
              const isBest = rowKey === bestKey;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.tr,
                {
                  "data-ocid": `ai_optimizer.nudge_row.${i + 1}`,
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: i * 0.03 },
                  className: `group hover:bg-muted/10 transition-colors ${isBest ? "bg-primary/4" : ""}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentBadge, { segment: row.segment }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-foreground capitalize", children: row.nudgeType }),
                      isBest && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-2.5 h-2.5" }),
                        "BEST"
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 max-w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: row.copyPreview }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-muted-foreground font-medium", children: row.sent.toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-foreground font-medium", children: row.opened.toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-foreground font-semibold", children: row.actedOn.toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionRateBar, { rate: actionRate }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `ai_optimizer.nudge_toggle.${i + 1}`,
                        onClick: () => toggleNudge(row.segment, row.nudgeType),
                        className: "flex items-center gap-1 text-[11px] font-semibold transition-colors hover:opacity-80",
                        "aria-label": row.enabled ? "Disable nudge" : "Enable nudge",
                        children: row.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "w-4 h-4 text-success" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "On" })
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "w-4 h-4 text-muted-foreground" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Off" })
                        ] })
                      }
                    ) })
                  ]
                },
                rowKey
              );
            }) })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "ai_optimizer.pricing_offers.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-4 rounded-full bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-bold text-foreground", children: "Pricing Offer Recommendations" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mb-5", children: [
        {
          label: "Free trial recommended",
          count: summaryOffers.freeTrial,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5" })
        },
        {
          label: "Bonus credits recommended",
          count: summaryOffers.bonusCredits,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" })
        },
        {
          label: "Discount offer",
          count: summaryOffers.discount,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" })
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/40 text-[12px]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: item.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-bold text-foreground", children: item.count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: item.label })
          ]
        },
        item.label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border/40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "table",
        {
          className: "w-full text-[12px]",
          "data-ocid": "ai_optimizer.pricing_table",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/30 bg-muted/20", children: [
              "User",
              "City",
              "Segment",
              "Recommended Offer",
              "Shown",
              "Date",
              "Action"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/20", children: PRICING_ROWS.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `ai_optimizer.pricing_row.${i + 1}`,
                className: "hover:bg-muted/10 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground whitespace-nowrap", children: row.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: row.city }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentBadge, { segment: row.segment }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground font-medium max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate", children: row.recommendedOffer }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[11px] font-bold px-2 py-0.5 rounded-full ${row.offerShown ? "bg-success/10 text-success" : "bg-muted/40 text-muted-foreground"}`,
                      children: row.offerShown ? "Yes" : "No"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground text-[11px] whitespace-nowrap", children: row.dateShown ?? "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `ai_optimizer.simulate_button.${i + 1}`,
                      onClick: () => setSimulateRow(row),
                      className: "flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/8 hover:bg-primary/14 border border-primary/20 px-2.5 py-1 rounded-lg transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                        "Simulate"
                      ]
                    }
                  ) })
                ]
              },
              row.userId
            )) })
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "ai_optimizer.paywall_timing.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-4 rounded-full bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-bold text-foreground", children: "Paywall Timing Intelligence" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5", children: [
        {
          label: "Paywalls shown AFTER value moment",
          value: "68%",
          description: "Lead generated, reply received, or proposal sent before paywall.",
          isPositive: true
        },
        {
          label: "Paywalls shown BEFORE value moment",
          value: "32%",
          description: "Paywall triggered before user experienced meaningful value.",
          isPositive: false
        }
      ].map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": `ai_optimizer.paywall_stat.${i + 1}`,
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.08 },
          className: `rounded-2xl border p-5 ${card.isPositive ? "bg-success/6 border-success/25" : "bg-destructive/6 border-destructive/25"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-[11px] font-bold uppercase tracking-wider mb-2 ${card.isPositive ? "text-success" : "text-destructive"}`,
                children: card.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-3xl font-bold font-display tabular-nums ${card.isPositive ? "text-success" : "text-destructive"}`,
                children: card.value
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground mt-2", children: card.description })
          ]
        },
        card.label
      )) }),
      paywallTest && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-bold text-foreground", children: "Paywall Timing A/B Test" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground mt-0.5", children: paywallTest.id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "ai_optimizer.paywall_reset_button",
              onClick: () => handleResetTest(paywallTest.id),
              className: "flex items-center gap-1 text-[11px] font-semibold text-muted-foreground border border-border/40 px-3 py-1.5 rounded-lg hover:bg-muted/20 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                "Reset test"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4", children: paywallTest.variants.map((v) => {
          const s = paywallStats[v.id] ?? {
            impressions: 0,
            conversions: 0
          };
          const rate = s.impressions > 0 ? (s.conversions / s.impressions * 100).toFixed(1) : "0.0";
          const isWinner = v.id === "delayed";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": `ai_optimizer.paywall_variant.${v.id}`,
              className: `rounded-xl border p-4 ${isWinner ? "border-success/50 bg-success/6" : "border-border/30 bg-muted/10"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold text-foreground", children: v.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground", children: v.id })
                  ] }),
                  isWinner && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] font-bold text-success bg-success/12 px-2 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-2.5 h-2.5" }),
                    "Winner"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-[12px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Impressions" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums text-foreground", children: s.impressions })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Conversions" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tabular-nums text-foreground", children: s.conversions })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Conv. rate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `font-bold tabular-nums ${isWinner ? "text-success" : "text-foreground"}`,
                        children: [
                          rate,
                          "%"
                        ]
                      }
                    )
                  ] })
                ] })
              ]
            },
            v.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-primary/6 border border-primary/20 rounded-xl px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-foreground font-medium leading-relaxed", children: [
            "Users who saw the paywall ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "after a value moment" }),
            " ",
            "converted ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold", children: "2.4×" }),
            " ",
            "more often than those shown it immediately."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "ai_optimizer.ab_tests.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-4 rounded-full bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[15px] font-bold text-foreground", children: "A/B Test Auto-Winner Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[11px] font-semibold text-muted-foreground", children: "Auto-selects winner after 100 impressions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: allTests.map((test, i) => {
        const stats = computeStats(test, abResults, abAssignments);
        const totalImpressions = Object.values(stats).reduce(
          (s, v) => s + v.impressions,
          0
        );
        const hasEnoughData = totalImpressions >= 100;
        const winnerVariant = hasEnoughData ? test.variants.reduce((a, b) => {
          var _a, _b;
          const aR = ((_a = stats[a.id]) == null ? void 0 : _a.impressions) > 0 ? stats[a.id].conversions / stats[a.id].impressions : 0;
          const bR = ((_b = stats[b.id]) == null ? void 0 : _b.impressions) > 0 ? stats[b.id].conversions / stats[b.id].impressions : 0;
          return bR > aR ? b : a;
        }) : null;
        const maxConversions = Math.max(
          ...test.variants.map((v) => {
            var _a;
            return ((_a = stats[v.id]) == null ? void 0 : _a.conversions) ?? 0;
          }),
          1
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `ai_optimizer.ab_card.${i + 1}`,
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: i * 0.06 },
            className: "bg-card rounded-2xl border border-border/40 overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border/30 flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-bold text-foreground", children: test.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mt-0.5", children: test.id })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  winnerVariant && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-2.5 h-2.5" }),
                    "Auto-selected winner"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/8 px-2 py-0.5 rounded-full flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary animate-pulse" }),
                    "Active"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-2", children: [
                test.variants.map((v) => {
                  const s = stats[v.id] ?? { impressions: 0, conversions: 0 };
                  const rate = s.impressions > 0 ? (s.conversions / s.impressions * 100).toFixed(1) : "0.0";
                  const barWidth = maxConversions > 0 ? s.conversions / maxConversions * 100 : 0;
                  const isW = (winnerVariant == null ? void 0 : winnerVariant.id) === v.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `rounded-xl p-3 border ${isW ? "border-success/40 bg-success/6" : "border-border/20 bg-muted/6"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-semibold text-foreground", children: v.label }),
                            isW && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-success bg-success/10 px-1.5 py-px rounded-full", children: "WINNER" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: `text-[12px] font-bold tabular-nums ${isW ? "text-success" : "text-muted-foreground"}`,
                              children: [
                                rate,
                                "%"
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: `h-full rounded-full transition-all duration-500 ${isW ? "bg-success" : "bg-primary/50"}`,
                              style: { width: `${barWidth}%` }
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground tabular-nums whitespace-nowrap", children: [
                            s.conversions,
                            " / ",
                            s.impressions
                          ] })
                        ] })
                      ]
                    },
                    v.id
                  );
                }),
                !hasEnoughData && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `ai_optimizer.ab_empty.${i + 1}`,
                    className: "flex items-center gap-2 text-[11px] text-muted-foreground bg-muted/20 rounded-lg px-3 py-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-warning" }),
                      "No test results yet — tests update after 100 impressions"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-1 border-t border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `ai_optimizer.ab_reset_button.${i + 1}`,
                  onClick: () => handleResetTest(test.id),
                  className: "flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border/40 px-3 py-1.5 rounded-lg transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                    "Reset test"
                  ]
                }
              ) })
            ]
          },
          test.id
        );
      }) })
    ] }),
    simulateRow && /* @__PURE__ */ jsxRuntimeExports.jsx(
      SimulateModal,
      {
        row: simulateRow,
        segments: SEGMENTS,
        onClose: () => setSimulateRow(null)
      }
    )
  ] });
}
export {
  AIOptimizerPage as default
};
