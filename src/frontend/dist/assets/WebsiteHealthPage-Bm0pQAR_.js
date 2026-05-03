import { c as createLucideIcon, aG as useMetaTags, r as reactExports, bE as useSubscription, cz as SubscriptionPlan, j as jsxRuntimeExports, ad as Link, i as Button, aH as Download, aF as CircleX, cA as Search, ac as RefreshCw, Z as Zap, aC as TriangleAlert, A as AnimatePresence, y as motion, h as Badge, ai as Plus, cB as Lock, k as Shield, T as TrendingUp, f as cn, aN as PAGE_META, ak as Globe, ba as TrendingDown, E as ChevronUp, q as ChevronDown, B as Bell, R as ResponsiveContainer, bR as LineChart, K as XAxis, Y as YAxis, N as Tooltip, bS as Line } from "./index-DcPx_5wo.js";
import { u as useWebsiteHealth, S as SCAN_STEPS, C as CircleCheckBig } from "./useWebsiteHealth-CRBOzht6.js";
import { e as exportWebsiteHealthPDF } from "./pdfExport-DluFGja_.js";
import "./jspdf.es.min-DtXcvIPA.js";
import "./useSaasMetrics-CVvZTjnx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
];
const Wrench = createLucideIcon("wrench", __iconNode);
function getScoreColor(score) {
  if (score >= 70) return "success";
  if (score >= 40) return "warning";
  return "critical";
}
function getScoreClass(score) {
  if (score >= 70) return "score-success";
  if (score >= 40) return "score-warning";
  return "score-critical";
}
function getBarClass(score) {
  if (score >= 70) return "success";
  if (score >= 40) return "warning";
  return "critical";
}
const SEVERITY_LABELS = {
  Critical: "Urgent",
  Warning: "Medium",
  Minor: "Low"
};
const FIX_LABELS = {
  WhatsApp: "Add WhatsApp Button",
  Speed: "Improve Page Speed",
  Seo: "Fix Search Visibility",
  Cta: "Add Call-to-Action",
  Content: "Improve Content",
  Security: "Fix Security Issue",
  Mobile: "Fix Mobile Issue",
  Images: "Optimise Images"
};
const DIFFICULTY_LABELS = {
  Easy: "Easy Fix",
  Medium: "Medium",
  Hard: "Advanced"
};
function difficultyClass(d) {
  if (d === "Easy")
    return "score-success text-xs font-semibold px-2 py-0.5 rounded bg-score-success";
  if (d === "Hard")
    return "text-destructive text-xs font-semibold px-2 py-0.5 rounded bg-destructive/10";
  return "score-warning text-xs font-semibold px-2 py-0.5 rounded bg-score-warning";
}
function PageSpeedRing({
  score,
  label,
  size = 80
}) {
  const [animated, setAnimated] = reactExports.useState(0);
  const r = size * 0.38;
  const circumference = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  const color = score >= 90 ? "oklch(var(--score-success))" : score >= 50 ? "oklch(var(--score-warning))" : "oklch(var(--score-critical))";
  const textClass = score >= 90 ? "score-success" : score >= 50 ? "score-warning" : "score-critical";
  reactExports.useEffect(() => {
    const start = Date.now();
    const duration = 700;
    let raf;
    function step() {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setAnimated(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);
  const dashOffset = circumference - animated / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`,
        "aria-label": `${label} score ${score}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
            label,
            " PageSpeed score"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx,
              cy,
              r,
              fill: "none",
              stroke: "oklch(var(--muted)/0.3)",
              strokeWidth: size * 0.08
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx,
              cy,
              r,
              fill: "none",
              stroke: color,
              strokeWidth: size * 0.08,
              strokeLinecap: "round",
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              transform: `rotate(-90 ${cx} ${cy})`,
              style: { transition: "stroke-dashoffset 0.04s linear" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: cx,
              y: cy + 1,
              textAnchor: "middle",
              dominantBaseline: "middle",
              className: textClass,
              fontSize: size * 0.24,
              fontWeight: 700,
              fill: "currentColor",
              children: animated
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: label })
  ] });
}
const CWV_RATING_LABELS = {
  good: "Good",
  "needs-improvement": "Needs Work",
  poor: "Poor"
};
const CWV_RATING_CLASSES = {
  good: "score-success bg-score-success",
  "needs-improvement": "score-warning bg-score-warning",
  poor: "text-destructive bg-destructive/10"
};
function CwvRow({
  label,
  vital
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-xs font-medium text-foreground w-40", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-3 text-xs text-muted-foreground font-mono", children: vital.displayValue }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "text-xs font-semibold px-2 py-0.5 rounded",
          CWV_RATING_CLASSES[vital.rating]
        ),
        children: CWV_RATING_LABELS[vital.rating]
      }
    ) })
  ] });
}
function PageSpeedSection({
  result,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        className: "bg-card border rounded-xl p-5 shadow-card",
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        "data-ocid": "pagespeed.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Fetching real performance data from Google…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-2", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-5 bg-muted rounded animate-pulse",
                style: { width: `${60 + n * 8}%` }
              },
              n
            )) })
          ] })
        ]
      }
    );
  }
  if (!result) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      className: "bg-card border rounded-xl p-5 shadow-card",
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": "pagespeed.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground font-display", children: "Performance Metrics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 11 }),
              "Verified by Google PageSpeed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Real data from Google’s testing servers" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-start mb-5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PageSpeedRing, { score: result.mobileScore, label: "Mobile", size: 100 }),
          result.desktopScore > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            PageSpeedRing,
            {
              score: result.desktopScore,
              label: "Desktop",
              size: 72
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-48", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Core Web Vitals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CwvRow, { label: "First Contentful Paint", vital: result.fcp }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CwvRow, { label: "Largest Contentful Paint", vital: result.lcp }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CwvRow, { label: "Cumulative Layout Shift", vital: result.cls }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CwvRow, { label: "Total Blocking Time", vital: result.tbt })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 12, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Powered by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://developers.google.com/speed/pagespeed/insights/",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline",
                children: "Google PageSpeed Insights"
              }
            ),
            " ",
            "· Real performance data. Not an estimate."
          ] })
        ] })
      ]
    }
  );
}
function ScoreMeter({ score, delta }) {
  const [animatedScore, setAnimatedScore] = reactExports.useState(0);
  const circumference = 2 * Math.PI * 80;
  const colorType = getScoreColor(score);
  const strokeColor = colorType === "success" ? "oklch(var(--score-success))" : colorType === "warning" ? "oklch(var(--score-warning))" : "oklch(var(--score-critical))";
  reactExports.useEffect(() => {
    const start = Date.now();
    const duration = 900;
    let rafId;
    function step() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [score]);
  const dashOffset = circumference - animatedScore / 100 * circumference;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-score-meter", "data-ocid": "score.meter", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "200",
        height: "200",
        viewBox: "0 0 200 200",
        className: "health-score-meter-svg",
        "aria-label": `Website score ${score} out of 100`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Website health score gauge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "100",
              cy: "100",
              r: "80",
              fill: "none",
              stroke: "oklch(var(--muted)/0.25)",
              strokeWidth: "12"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "100",
              cy: "100",
              r: "80",
              fill: "none",
              stroke: strokeColor,
              strokeWidth: "12",
              strokeLinecap: "round",
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
              transform: "rotate(-90 100 100)",
              style: { transition: "stroke-dashoffset 0.05s linear" }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn("health-score-meter-value", getScoreClass(score)),
          style: { fontSize: 44 },
          children: animatedScore
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "health-score-meter-label", children: "/ 100" }),
      delta !== void 0 && delta !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: cn(
            "text-xs font-semibold mt-1 flex items-center gap-0.5",
            delta > 0 ? "score-success" : "score-critical"
          ),
          children: [
            delta > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 11 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 11 }),
            delta > 0 ? "+" : "",
            delta,
            " from last scan"
          ]
        }
      )
    ] })
  ] });
}
function CategoryBar({
  label,
  score,
  delay = 0
}) {
  const [width, setWidth] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setWidth(score), 80 + delay);
    return () => clearTimeout(t);
  }, [score, delay]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-category-bar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "health-category-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "health-category-bar-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `health-category-bar-fill ${getBarClass(score)}`,
        style: { width: `${width}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("health-category-score", getScoreClass(score)), children: score })
  ] });
}
function IssueCard({
  issue,
  index,
  isLocked,
  onExpand
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const severityIcon = issue.severity === "Critical" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16 });
  const fixSteps = issue.aiFixSuggestion.split(/\.\s+/).filter(Boolean).slice(0, 5);
  function handleFixClick() {
    if (isLocked) return;
    const next = !expanded;
    setExpanded(next);
    if (next && onExpand) onExpand();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: cn(
        "health-issue-card",
        isLocked && "relative overflow-hidden"
      ),
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07 },
      "data-ocid": `issue.item.${index + 1}`,
      children: [
        isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[var(--radius)] backdrop-blur-sm bg-card/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 22, className: "text-muted-foreground mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground text-center px-4", children: "Upgrade to see all issues & AI fix guides" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "mt-3 btn-primary-glow",
              "data-ocid": "issue.upgrade_button",
              onClick: () => {
                window.location.href = "/paywall";
              },
              children: "Growth Plan · ₹299/month"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-issue-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `health-issue-icon ${issue.severity.toLowerCase()}`, children: severityIcon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-issue-content min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "health-issue-title flex-1", children: issue.problem }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `health-issue-severity ${issue.severity.toLowerCase()}`,
                  children: [
                    severityIcon,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: SEVERITY_LABELS[issue.severity] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "health-issue-impact mt-1", children: issue.businessImpact })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground bg-score-warning rounded px-2 py-0.5 font-medium", children: [
            "May affect ",
            issue.estimatedLossMin,
            "–",
            issue.estimatedLossMax,
            " ",
            "customers/month"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: difficultyClass(issue.difficulty), children: DIFFICULTY_LABELS[issue.difficulty] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "btn-primary-glow sm:flex-none",
              "data-ocid": `issue.fix_button.${index + 1}`,
              onClick: handleFixClick,
              disabled: isLocked,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14, className: "mr-1" }),
                FIX_LABELS[issue.fixCategory] ?? "Fix Now",
                expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 14, className: "ml-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 14, className: "ml-1" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/website-health/fix-tools", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": `issue.view_fix_tools.${index + 1}`,
              disabled: isLocked,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 14, className: "mr-1" }),
                "Fix Tools"
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn("health-fix-guide", expanded && !isLocked && "open"),
            "data-ocid": `issue.fix_guide.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-fix-guide-content", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "health-fix-guide-title", children: "How to fix this — step by step" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "health-fix-guide-steps", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { children: fixSteps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: step.endsWith(".") ? step : `${step}.` }, step.slice(0, 40))) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "health-fix-guide-cta mt-3",
                  onClick: () => setExpanded(false),
                  "data-ocid": `issue.got_it.${index + 1}`,
                  type: "button",
                  children: "Got it"
                }
              )
            ] })
          }
        )
      ]
    }
  );
}
function CompetitorCard({
  competitor,
  userScores,
  userOverall,
  index
}) {
  const metrics = [
    {
      label: "Speed",
      userVal: userScores.speed,
      compVal: competitor.pageSpeedScore ?? competitor.speedScore
    },
    { label: "SEO", userVal: userScores.seo, compVal: competitor.seoScore },
    {
      label: "Mobile",
      userVal: userScores.mobile,
      compVal: competitor.mobileScore
    },
    {
      label: "Conversion",
      userVal: userScores.conversion,
      compVal: competitor.conversionScore
    },
    {
      label: "Overall",
      userVal: userOverall,
      compVal: competitor.overallScore
    }
  ];
  const lastScanned = competitor.lastScannedAt ? Math.round((Date.now() - competitor.lastScannedAt) / 6e4) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "health-competitor-card fade-in-item",
      style: { animationDelay: `${index * 0.1}s` },
      "data-ocid": `competitor.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "health-competitor-header mb-0 truncate text-sm", children: competitor.competitorName || `Competitor ${index + 1}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "text-lg font-bold font-display",
                getScoreClass(competitor.overallScore)
              ),
              children: competitor.overallScore
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [
          competitor.scannedLive && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs gap-1 py-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 10 }),
            "Live scan"
          ] }),
          lastScanned !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Last scanned: ",
            lastScanned < 1 ? "just now" : `${lastScanned}m ago`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: metrics.map(({ label, userVal, compVal }) => {
          const isAhead = userVal >= compVal;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-competitor-metric", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `health-competitor-icon ${isAhead ? "strength" : "gap"}`,
                children: isAhead ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 12 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "health-competitor-label text-xs w-14", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "health-competitor-value text-xs font-semibold",
                  isAhead ? "score-success" : "score-critical"
                ),
                children: [
                  "You ",
                  userVal,
                  " vs ",
                  compVal
                ]
              }
            )
          ] }, label);
        }) })
      ]
    }
  );
}
function ScoreHistoryChart({
  history,
  isPaid
}) {
  const displayHistory = isPaid ? history : history.slice(0, 2);
  const data = displayHistory.map((score, i) => ({
    scan: `Scan ${i + 1}`,
    score
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-trend-chart relative", "data-ocid": "history.chart", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "health-trend-label", children: "Your score over time" }),
    !isPaid && history.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 top-8 z-10 flex flex-col items-center justify-center rounded-b-[var(--radius)] backdrop-blur-sm bg-card/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18, className: "text-muted-foreground mb-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground text-center px-4", children: "Upgrade to see full history" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 140, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      LineChart,
      {
        data,
        margin: { top: 4, right: 12, left: -20, bottom: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "scan",
              tick: { fontSize: 11, fill: "oklch(var(--muted-foreground))" },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              domain: [0, 100],
              tick: { fontSize: 11, fill: "oklch(var(--muted-foreground))" },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border)/0.3)",
                borderRadius: 8,
                fontSize: 12
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "score",
              stroke: "oklch(var(--primary))",
              strokeWidth: 2.5,
              dot: { fill: "oklch(var(--primary))", r: 4 },
              activeDot: { r: 6 }
            }
          )
        ]
      }
    ) })
  ] });
}
function ScanningIndicator({
  url,
  stepIndex
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "bg-card border rounded-xl p-8 text-center shadow-card max-w-md mx-auto",
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      "data-ocid": "scanning.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 40, className: "text-primary absolute inset-0 m-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 truncate", children: url }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-4", children: SCAN_STEPS.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex items-center justify-center rounded-full text-xs font-bold transition-all duration-500",
              i < stepIndex ? "w-6 h-6 bg-primary/20 text-primary" : i === stepIndex ? "w-8 h-8 bg-primary text-primary-foreground shadow-md" : "w-6 h-6 bg-muted text-muted-foreground"
            ),
            children: i < stepIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14 }) : i + 1
          },
          SCAN_STEPS[i]
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            className: "text-base font-semibold text-foreground",
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -6 },
            transition: { duration: 0.3 },
            children: SCAN_STEPS[stepIndex]
          },
          stepIndex
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 w-full bg-muted rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full bg-primary rounded-full",
            initial: { width: "5%" },
            animate: { width: `${(stepIndex + 1) / SCAN_STEPS.length * 100}%` },
            transition: { duration: 0.5 }
          }
        ) })
      ]
    }
  );
}
function BusinessImpactPanel({ issues }) {
  const topIssues = issues.filter((i) => i.severity === "Critical").slice(0, 4);
  if (topIssues.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "bg-destructive/5 border border-destructive/20 rounded-xl p-5",
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": "health.business_impact_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 18, className: "text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground text-sm", children: "Your website may be losing enquiries because:" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-3", children: topIssues.map((issue) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14, className: "text-destructive mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: issue.businessImpact })
            ]
          },
          `${issue.fixCategory}-${issue.problem.slice(0, 20)}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "* Impact is estimated based on website signals, not guaranteed results." })
      ]
    }
  );
}
function MonitorToggle({
  url,
  isActive,
  rescanNeeded,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between bg-card border rounded-xl p-4 shadow-card",
      "data-ocid": "health.monitor_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bell,
            {
              size: 18,
              className: isActive ? "text-primary" : "text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Weekly Monitoring" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isActive ? `Scanning ${url} every week` : "Get notified when your score drops" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          rescanNeeded && isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "destructive",
              className: "text-xs",
              "data-ocid": "health.rescan_badge",
              children: "Rescan due"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onToggle(!isActive),
              className: cn(
                "w-10 h-6 rounded-full transition-colors duration-200 relative",
                isActive ? "bg-primary" : "bg-muted"
              ),
              "data-ocid": "health.monitor_toggle",
              "aria-label": "Toggle weekly monitoring",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow transition-transform duration-200",
                    isActive ? "left-4" : "left-0.5"
                  )
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function CompetitorInputSection({
  isPaid,
  userScores,
  userOverall,
  yourUrl,
  onCompare
}) {
  const [inputs, setInputs] = reactExports.useState(["", "", ""]);
  const [results, setResults] = reactExports.useState([]);
  const [comparing, setComparing] = reactExports.useState(false);
  async function handleCompare() {
    const validUrls = inputs.map((u) => u.trim()).filter(Boolean);
    if (validUrls.length === 0) return;
    setComparing(true);
    try {
      const comps = await onCompare(validUrls, yourUrl);
      setResults(comps);
    } finally {
      setComparing(false);
    }
  }
  async function handleRescan() {
    if (results.length === 0) return;
    const existingUrls = inputs.map((u) => u.trim()).filter(Boolean);
    if (existingUrls.length === 0) return;
    setComparing(true);
    try {
      const comps = await onCompare(existingUrls, yourUrl);
      setResults(comps);
    } finally {
      setComparing(false);
    }
  }
  if (!isPaid) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative rounded-xl border border-border overflow-hidden",
        style: { minHeight: 180 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/90 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 24, className: "text-muted-foreground mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground mb-1", children: "Competitor data is a paid feature" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center max-w-xs px-4 mb-3", children: "See how you compare on Speed, SEO, and Mobile against top businesses in your area." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "btn-primary-glow",
                onClick: () => {
                  window.location.href = "/paywall";
                },
                "data-ocid": "competitors.upgrade_button",
                children: "Unlock Competitor Insights"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blur-sm pointer-events-none p-4 grid sm:grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "health-competitor-card opacity-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-3/4 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-1/2" })
          ] }, i)) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "competitors.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Enter up to 3 competitor URLs for live comparison" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 mb-3", children: inputs.map((val, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex gap-2 items-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-4 shrink-0", children: [
              i + 1,
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: val,
                onChange: (e) => {
                  const next = [...inputs];
                  next[i] = e.target.value;
                  setInputs(next);
                },
                placeholder: `Competitor website ${i + 1} (e.g. www.rival.com)`,
                className: "flex-1 h-9 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                "data-ocid": `competitor.url_input.${i + 1}`
              }
            )
          ]
        },
        `competitor-input-${i + 1}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: handleCompare,
            disabled: comparing || inputs.every((u) => !u.trim()),
            className: "btn-primary-glow",
            "data-ocid": "competitor.compare_button",
            children: [
              comparing ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: "mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 14, className: "mr-1" }),
              comparing ? "Scanning live…" : "Compare Live"
            ]
          }
        ),
        results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: handleRescan,
            disabled: comparing,
            "data-ocid": "competitor.rescan_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 14, className: "mr-1" }),
              "Rescan"
            ]
          }
        )
      ] })
    ] }),
    results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-3", children: results.map((comp, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompetitorCard,
      {
        competitor: comp,
        userScores,
        userOverall,
        index: i
      },
      `${comp.competitorName}-${i}`
    )) })
  ] });
}
const CATEGORY_ROWS = [
  { label: "Page Speed", key: "speed", delay: 0 },
  { label: "Search Visibility", key: "seo", delay: 80 },
  { label: "Mobile Experience", key: "mobile", delay: 160 },
  { label: "Content Quality", key: "content", delay: 240 },
  { label: "Conversion", key: "conversion", delay: 320 },
  { label: "Security", key: "security", delay: 400 }
];
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex flex-col items-center justify-center py-16 text-center",
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      "data-ocid": "health.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 36, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground mb-2", children: "Check your website for free" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Enter your website URL above to discover what's hurting your enquiries — and get a simple action plan to fix it." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-3 justify-center", children: [
          "Page Speed",
          "Search Visibility",
          "Mobile",
          "Security",
          "Conversion"
        ].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary",
            children: label
          },
          label
        )) })
      ]
    }
  );
}
function WebsiteHealthPage() {
  useMetaTags(PAGE_META["/website-health"]);
  const {
    isScanning,
    scanStepIndex,
    latestAudit,
    auditHistory,
    weeklyReport,
    rescanNeeded,
    error,
    pageSpeedResult,
    isPageSpeedLoading,
    scanWebsite,
    refreshAudit,
    clearResults,
    toggleMonitor,
    fetchCompetitors,
    trackEvent
  } = useWebsiteHealth();
  const [inputUrl, setInputUrl] = reactExports.useState("");
  const [monitorActive, setMonitorActive] = reactExports.useState(false);
  const [exporting, setExporting] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  async function handleExportPDF() {
    if (!latestAudit) return;
    setExporting(true);
    try {
      exportWebsiteHealthPDF({
        audit: latestAudit,
        competitors: latestAudit.competitors.length > 0 ? latestAudit.competitors : void 0
      });
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  }
  const { data: subscription } = useSubscription();
  const isPaid = (subscription == null ? void 0 : subscription.plan) === SubscriptionPlan.growth || (subscription == null ? void 0 : subscription.plan) === SubscriptionPlan.pro || (subscription == null ? void 0 : subscription.plan) === SubscriptionPlan.agency;
  const visibleIssues = (latestAudit == null ? void 0 : latestAudit.issues) ?? [];
  const lockedFromIndex = isPaid ? visibleIssues.length : 3;
  const historyScores = auditHistory.map((a) => a.overallScore).reverse();
  const scoreDelta = auditHistory.length >= 2 ? auditHistory[0].overallScore - auditHistory[1].overallScore : weeklyReport == null ? void 0 : weeklyReport.scoreDelta;
  reactExports.useEffect(() => {
    if (latestAudit) setMonitorActive(latestAudit.monitorActive);
  }, [latestAudit]);
  function handleScan(e) {
    e.preventDefault();
    if (!isScanning) scanWebsite(inputUrl);
  }
  async function handleMonitorToggle(active) {
    if (!latestAudit) return;
    setMonitorActive(active);
    await toggleMonitor(latestAudit.url, active);
  }
  async function handleIssueExpand(index) {
    await trackEvent("issue_viewed", `index:${index}`);
  }
  const showPageSpeed = !!(isPageSpeedLoading || pageSpeedResult);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 py-6 space-y-8",
      "data-ocid": "website_health.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Website Health Check" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Find out what’s hurting your enquiries — and fix it today." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/website-health/fix-tools", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                "data-ocid": "health.fix_tools_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { size: 14, className: "mr-1.5" }),
                  "Fix Tools"
                ]
              }
            ) }),
            latestAudit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: handleExportPDF,
                disabled: exporting,
                "data-ocid": "health.export_pdf_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14, className: "mr-1.5" }),
                  exporting ? "Generating…" : "Export PDF"
                ]
              }
            ),
            latestAudit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: clearResults,
                "data-ocid": "health.clear_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14, className: "mr-1.5" }),
                  "Clear"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border rounded-xl p-5 shadow-card",
            "data-ocid": "health.input_section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleScan, className: "flex gap-3 flex-col sm:flex-row", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      size: 16,
                      className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: inputRef,
                      type: "text",
                      value: inputUrl,
                      onChange: (e) => setInputUrl(e.target.value),
                      placeholder: "Enter your website URL (e.g. www.mysalon.com)",
                      className: "w-full h-11 pl-9 pr-4 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth",
                      disabled: isScanning,
                      "data-ocid": "health.url_input",
                      "aria-label": "Website URL"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    disabled: isScanning || !inputUrl.trim(),
                    className: "btn-primary-glow h-11 px-6 font-semibold shrink-0",
                    "data-ocid": "health.scan_button",
                    children: [
                      isScanning ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15, className: "mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 15, className: "mr-2" }),
                      isScanning ? "Scanning…" : "Scan Now"
                    ]
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "mt-3 text-sm text-destructive flex items-center gap-1.5",
                  "data-ocid": "health.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 14 }),
                    error
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isScanning && /* @__PURE__ */ jsxRuntimeExports.jsx(ScanningIndicator, { url: inputUrl, stepIndex: scanStepIndex }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: latestAudit && !isScanning && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "space-y-8",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.section,
                {
                  className: "bg-card border rounded-xl p-6 shadow-card",
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  "data-ocid": "health.score_section",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ScoreMeter,
                        {
                          score: latestAudit.overallScore,
                          delta: typeof scoreDelta === "number" ? scoreDelta : void 0
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold font-display text-foreground text-center", children: [
                        "Website Score:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: getScoreClass(latestAudit.overallScore), children: latestAudit.overallScore }),
                        " ",
                        "/ 100"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "secondary",
                            className: "text-xs",
                            "data-ocid": "health.last_checked_badge",
                            children: "Just scanned"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: refreshAudit,
                            className: "text-primary text-xs font-semibold flex items-center gap-1 hover:underline",
                            "data-ocid": "health.refresh_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 11 }),
                              "Re-scan"
                            ]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full", children: CATEGORY_ROWS.map(({ label, key, delay }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CategoryBar,
                      {
                        label,
                        score: latestAudit.categoryScores[key],
                        delay
                      },
                      key
                    )) })
                  ] })
                }
              ),
              showPageSpeed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                PageSpeedSection,
                {
                  result: pageSpeedResult,
                  isLoading: isPageSpeedLoading
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessImpactPanel, { issues: visibleIssues }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "health.issues_section", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground font-display", children: "What to fix right now" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-xs", children: [
                      visibleIssues.length,
                      " issues found"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/website-health/fix-tools", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        "data-ocid": "health.all_fix_tools_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13, className: "mr-1" }),
                          "All Fix Tools"
                        ]
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: visibleIssues.map((issue, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IssueCard,
                  {
                    issue,
                    index: i,
                    isLocked: i >= lockedFromIndex,
                    onExpand: () => handleIssueExpand(i)
                  },
                  `${issue.fixCategory}-${issue.severity}-${issue.problem.slice(0, 10)}`
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 leading-relaxed", children: "* Estimated customer impact is based on general usage patterns. Results depend on your website, location, and offer. Not a guarantee of specific outcomes." }),
                !isPaid && visibleIssues.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mt-4 bg-premium-accent-light border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3",
                    "data-ocid": "health.upgrade_cta",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 20, className: "text-premium-accent shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                          visibleIssues.length - 3,
                          " more issues are hidden"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upgrade to Growth Plan (₹299/month) to see all issues, AI fix guides, and competitor insights." })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          className: "btn-primary-glow shrink-0",
                          onClick: () => {
                            window.location.href = "/paywall";
                          },
                          "data-ocid": "health.upgrade_primary_button",
                          children: "Upgrade · ₹299/month"
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MonitorToggle,
                {
                  url: latestAudit.url,
                  isActive: monitorActive,
                  rescanNeeded,
                  onToggle: handleMonitorToggle
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "health.competitors_section", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground font-display", children: "Compare with competitors" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CompetitorInputSection,
                  {
                    isPaid,
                    userScores: latestAudit.categoryScores,
                    userOverall: latestAudit.overallScore,
                    yourUrl: latestAudit.url,
                    onCompare: fetchCompetitors
                  }
                )
              ] }),
              historyScores.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "health.history_section", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground font-display mb-3", children: "Score trend" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreHistoryChart, { history: historyScores, isPaid })
              ] }),
              weeklyReport && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.section,
                {
                  className: "bg-card border rounded-xl p-5 shadow-card",
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  "data-ocid": "health.weekly_report_section",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18, className: "text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-bold text-foreground font-display", children: "Last week’s summary" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mb-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: cn(
                              "text-2xl font-bold font-display",
                              weeklyReport.scoreDelta >= 0 ? "score-success" : "score-critical"
                            ),
                            children: [
                              weeklyReport.scoreDelta >= 0 ? "+" : "",
                              weeklyReport.scoreDelta
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Score change" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground", children: weeklyReport.newIssueCount }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "New issues" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display score-success", children: weeklyReport.resolvedIssueCount }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Resolved" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/15 rounded-lg p-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1", children: "Top recommendation" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed line-clamp-3", children: weeklyReport.topRecommendation })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "* Score changes and recommendations are based on general usage patterns. Results vary." })
                  ]
                }
              )
            ]
          }
        ) }),
        !latestAudit && !isScanning && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {})
      ]
    }
  );
}
export {
  WebsiteHealthPage as default
};
