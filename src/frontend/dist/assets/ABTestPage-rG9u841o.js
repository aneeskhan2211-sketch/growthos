import { aG as useMetaTags, r as reactExports, j as jsxRuntimeExports, y as motion, aN as PAGE_META, m as ue } from "./index-DcPx_5wo.js";
import { d as defaultABTests } from "./abTests-DFKS3-k8.js";
const MIN_SAMPLE_SIZE = 30;
function erfc(x) {
  const t = 1 / (1 + 0.47047 * Math.abs(x));
  const poly = t * (0.3480242 + t * (-0.0958798 + t * 0.7478556));
  const result = poly * Math.exp(-(x * x));
  return x >= 0 ? result : 2 - result;
}
function zScoreToP(z) {
  return erfc(Math.abs(z) / Math.SQRT2);
}
function zTestTwoProportions(n1, c1, n2, c2) {
  const insufficientData = n1 < MIN_SAMPLE_SIZE || n2 < MIN_SAMPLE_SIZE;
  if (n1 === 0 || n2 === 0 || c1 === 0 && c2 === 0) {
    return {
      z: 0,
      pValue: 1,
      confidenceLevel: 0,
      isSignificant: false,
      isBorderline: false,
      insufficientData: true,
      neededSamples: estimateNeededSamples(n1, c1, n2, c2),
      winnerIndex: null
    };
  }
  const p1 = c1 / n1;
  const p2 = c2 / n2;
  const pPooled = (c1 + c2) / (n1 + n2);
  const se = Math.sqrt(pPooled * (1 - pPooled) * (1 / n1 + 1 / n2));
  const z = se === 0 ? 0 : (p1 - p2) / se;
  const pValue = zScoreToP(z);
  const confidenceLevel = Math.round((1 - pValue) * 100);
  const isSignificant = pValue < 0.05;
  const isBorderline = !isSignificant && pValue < 0.1;
  let winnerIndex = null;
  if (isSignificant) {
    winnerIndex = p1 > p2 ? 0 : 1;
  }
  return {
    z,
    pValue,
    confidenceLevel,
    isSignificant,
    isBorderline,
    insufficientData,
    neededSamples: insufficientData ? estimateNeededSamples(n1, c1, n2, c2) : 0,
    winnerIndex
  };
}
function estimateNeededSamples(n1, c1, n2, c2) {
  const z_alpha_2 = 1.96;
  const z_beta = 0.842;
  const currentN = Math.min(n1, n2);
  const p1 = n1 > 0 ? c1 / n1 : 0.05;
  const p2 = n2 > 0 ? c2 / n2 : 0.05;
  const pAvg = (p1 + p2) / 2 || 0.05;
  const delta = Math.abs(p1 - p2) || 0.05;
  const nRequired = Math.ceil(
    (z_alpha_2 + z_beta) ** 2 * 2 * pAvg * (1 - pAvg) / delta ** 2
  );
  return Math.max(0, nRequired - currentN);
}
const LS_RESULTS = "growthosABResults";
const LS_AB = "growthosABTests";
function readResults() {
  try {
    const raw = localStorage.getItem(LS_RESULTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function readAssignments() {
  try {
    const raw = localStorage.getItem(LS_AB);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function computeStats(test, results, assignments) {
  var _a;
  const stats = {};
  for (const v of test.variants) {
    const r = (_a = results[test.id]) == null ? void 0 : _a[v.id];
    const assignmentCount = Object.values(assignments).filter(
      (val) => val === v.id
    ).length;
    stats[v.id] = {
      impressions: ((r == null ? void 0 : r.impressions) ?? 0) + assignmentCount,
      conversions: (r == null ? void 0 : r.conversions) ?? 0
    };
  }
  return stats;
}
function resetTest(testId) {
  try {
    const raw = localStorage.getItem(LS_RESULTS);
    const results = raw ? JSON.parse(raw) : {};
    delete results[testId];
    localStorage.setItem(LS_RESULTS, JSON.stringify(results));
    const assignRaw = localStorage.getItem(LS_AB);
    if (assignRaw) {
      const assigns = JSON.parse(assignRaw);
      delete assigns[testId];
      localStorage.setItem(LS_AB, JSON.stringify(assigns));
    }
  } catch {
  }
}
function ABTestPage() {
  useMetaTags(PAGE_META["/admin/ab-tests"]);
  const [results, setResults] = reactExports.useState(readResults);
  const [assignments, setAssignments] = reactExports.useState(readAssignments);
  const totalConversions = Object.values(results).reduce((sum, testData) => {
    return sum + Object.values(testData).reduce((s, v) => s + (v.conversions ?? 0), 0);
  }, 0);
  const handleReset = (testId) => {
    resetTest(testId);
    setResults(readResults());
    setAssignments(readAssignments());
    ue.success("Test data reset");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "ab_test.page", className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "A/B Tests — Conversion Optimization" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground mt-1", children: "Track which messaging and timing converts free users to paid faster." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-4 py-3 rounded-xl bg-card border border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-2 h-2 rounded-full bg-primary animate-pulse",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[13px] font-semibold text-foreground", children: [
          defaultABTests.length,
          " active tests"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[13px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums", children: totalConversions }),
        " ",
        "total conversions tracked"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground ml-auto", children: "Data stored in localStorage — resets on clear" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: defaultABTests.map((test, i) => {
      const stats = computeStats(test, results, assignments);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          "data-ocid": `ab_test.card.${i + 1}`,
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: i * 0.07 },
          className: "bg-card rounded-2xl border border-border/40 overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border/30 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-bold text-foreground", children: test.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground font-mono mt-0.5", children: test.id })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-500/10 px-2 py-0.5 rounded-full border border-green-300/50 dark:border-green-500/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse",
                    "aria-hidden": "true"
                  }
                ),
                "Active"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-[12px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground border-b border-border/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-semibold pb-2 uppercase text-[10px] tracking-wider", children: "Variant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right font-semibold pb-2 uppercase text-[10px] tracking-wider", children: "Impressions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right font-semibold pb-2 uppercase text-[10px] tracking-wider", children: "Conversions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right font-semibold pb-2 uppercase text-[10px] tracking-wider", children: "Rate" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/20", children: test.variants.map((v) => {
                const s = stats[v.id] ?? {
                  impressions: 0,
                  conversions: 0
                };
                const rate = s.impressions > 0 ? (s.conversions / s.impressions * 100).toFixed(1) : "0.0";
                const isLeading = s.conversions === Math.max(
                  ...test.variants.map(
                    (tv) => {
                      var _a;
                      return ((_a = stats[tv.id]) == null ? void 0 : _a.conversions) ?? 0;
                    }
                  )
                ) && s.conversions > 0;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2 pr-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: v.label }),
                      isLeading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-px rounded-full", children: "LEADING" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono", children: v.id })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-muted-foreground", children: s.impressions }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right tabular-nums text-foreground font-semibold", children: s.conversions }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "td",
                    {
                      className: [
                        "py-2 text-right tabular-nums font-bold",
                        Number(rate) > 5 ? "text-green-600 dark:text-green-400" : Number(rate) > 2 ? "text-amber-500 dark:text-amber-400" : "text-muted-foreground"
                      ].join(" "),
                      children: [
                        rate,
                        "%"
                      ]
                    }
                  )
                ] }, v.id);
              }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SignificanceSection, { test, stats, cardIndex: i }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `ab_test.reset_button.${i + 1}`,
                onClick: () => handleReset(test.id),
                className: "text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border/50 px-3 py-1.5 rounded-lg transition-colors duration-150 active:scale-95",
                children: "Reset test data"
              }
            ) })
          ]
        },
        test.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryPanel, { results, assignments }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center pb-4", children: "Impressions and conversions are tracked via localStorage. Numbers will be low initially — that's expected. Clear localStorage to reset all tests." })
  ] });
}
function SignificanceSection({
  test,
  stats,
  cardIndex
}) {
  if (test.variants.length < 2) return null;
  const [a, b] = test.variants;
  const sA = stats[a.id] ?? { impressions: 0, conversions: 0 };
  const sB = stats[b.id] ?? { impressions: 0, conversions: 0 };
  const result = zTestTwoProportions(
    sA.impressions,
    sA.conversions,
    sB.impressions,
    sB.conversions
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `ab_test.significance.${cardIndex + 1}`,
      className: "mx-4 mb-3 rounded-xl border border-border/30 bg-muted/30 px-4 py-3 space-y-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: "Statistical Significance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SignificanceBadge, { result }),
          !result.insufficientData && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground tabular-nums", children: [
              result.confidenceLevel,
              "% confidence"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground tabular-nums", children: [
              "p = ",
              result.pValue < 1e-3 ? "<0.001" : result.pValue.toFixed(3)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground tabular-nums", children: [
              "z = ",
              result.z.toFixed(2)
            ] })
          ] })
        ] }),
        result.insufficientData && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-amber-600 dark:text-amber-400", children: [
          "Need at least ",
          MIN_SAMPLE_SIZE,
          " impressions per variant",
          result.neededSamples > 0 ? ` (~${result.neededSamples} more obs for 80% power)` : ""
        ] }),
        !result.insufficientData && result.neededSamples > 0 && !result.isSignificant && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          "~",
          result.neededSamples,
          " more observations for 95% confidence"
        ] }),
        result.isSignificant && result.winnerIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-green-700 dark:text-green-400 font-semibold", children: [
          "Winner: ",
          test.variants[result.winnerIndex].label
        ] })
      ]
    }
  );
}
function SignificanceBadge({ result }) {
  if (result.insufficientData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50", children: "Insufficient data" });
  }
  if (result.isSignificant) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border border-green-300/50 dark:border-green-500/30", children: "✓ Statistically significant" });
  }
  if (result.isBorderline) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300/50 dark:border-amber-500/30", children: "Borderline result" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50", children: "Not significant" });
}
function SummaryPanel({
  results,
  assignments
}) {
  const rows = defaultABTests.map((test) => {
    const stats = computeStats(test, results, assignments);
    if (test.variants.length < 2) {
      return {
        test,
        winner: null,
        needsData: true,
        confidenceLevel: 0,
        pValue: 1
      };
    }
    const [a, b] = test.variants;
    const sA = stats[a.id] ?? { impressions: 0, conversions: 0 };
    const sB = stats[b.id] ?? { impressions: 0, conversions: 0 };
    const res = zTestTwoProportions(
      sA.impressions,
      sA.conversions,
      sB.impressions,
      sB.conversions
    );
    const winnerLabel = res.isSignificant && res.winnerIndex !== null ? test.variants[res.winnerIndex].label : null;
    return {
      test,
      winner: winnerLabel,
      needsData: res.insufficientData,
      confidenceLevel: res.confidenceLevel,
      pValue: res.pValue
    };
  });
  const significantRows = rows.filter((r) => r.winner !== null);
  const needsDataRows = rows.filter((r) => r.needsData);
  const borderlineRows = rows.filter(
    (r) => !r.needsData && !r.winner && r.pValue < 0.1
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "ab_test.summary_panel",
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: 0.25 },
      className: "bg-card rounded-2xl border border-border/40 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[14px] font-bold text-foreground", children: "Test Results Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-muted-foreground mt-0.5", children: [
            "Overview of all ",
            defaultABTests.length,
            " active experiments"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400", children: [
              "Significant Results (",
              significantRows.length,
              ")"
            ] }),
            significantRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "No significant results yet" }) : significantRows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200/60 dark:border-green-500/20 px-3 py-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold text-foreground", children: r.test.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-green-700 dark:text-green-400", children: [
                    "Winner: ",
                    r.winner,
                    " · ",
                    r.confidenceLevel,
                    "% confidence"
                  ] })
                ]
              },
              r.test.id
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400", children: [
              "Borderline (",
              borderlineRows.length,
              ")"
            ] }),
            borderlineRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "No borderline results" }) : borderlineRows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20 px-3 py-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold text-foreground", children: r.test.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-amber-600 dark:text-amber-400", children: [
                    "p = ",
                    r.pValue.toFixed(3),
                    " · keep collecting data"
                  ] })
                ]
              },
              r.test.id
            ))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
              "Needs More Data (",
              needsDataRows.length,
              ")"
            ] }),
            needsDataRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "All tests have enough data" }) : needsDataRows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-lg bg-muted/40 border border-border/40 px-3 py-2",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold text-foreground", children: r.test.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                    "Min ",
                    MIN_SAMPLE_SIZE,
                    " impressions per variant"
                  ] })
                ]
              },
              r.test.id
            ))
          ] })
        ] })
      ]
    }
  );
}
export {
  ABTestPage as default
};
