import { u as useActor, a as useQuery, b as useQueryClient, d as useMutation, e as createActor, r as reactExports, j as jsxRuntimeExports, $ as Skeleton, C as Clock, i as Button, ac as RefreshCw, f as cn, aH as Download, T as TrendingUp, aI as ShieldCheck, n as Card, h as Badge, b3 as Separator, a7 as FileText, aC as TriangleAlert, a0 as CircleCheck, m as ue } from "./index-DcPx_5wo.js";
import { u as useSaasMetrics, a as fmtLakhs, f as fmtINR } from "./useSaasMetrics-CVvZTjnx.js";
import { a as exportInvestorReportPDF } from "./pdfExport-DluFGja_.js";
import "./jspdf.es.min-DtXcvIPA.js";
const MOCK_REPORT = {
  id: "1",
  generatedAt: Date.now(),
  periodLabel: (/* @__PURE__ */ new Date()).toLocaleString("default", {
    month: "long",
    year: "numeric"
  }),
  mrr: 485e3,
  arr: 582e4,
  nrr: 106,
  churnRate: 2.1,
  ltv: 18640,
  cac: 5240,
  ltvCacRatio: 3.56,
  activeUsers: 1847,
  payingCustomers: 342,
  monthlyGrowthRate: 8.3,
  cohortData: [],
  funnelData: [],
  sections: [
    {
      title: "MRR",
      value: "₹4,85,000",
      change: "+8.3%",
      positive: true,
      description: "Monthly Recurring Revenue from active subscriptions."
    },
    {
      title: "Net Revenue Retention",
      value: "106%",
      change: "+2pp",
      positive: true,
      description: "NRR above 100% means expansion revenue exceeds churn."
    },
    {
      title: "LTV:CAC",
      value: "3.56x",
      change: "+0.2x",
      positive: true,
      description: "Healthy ratio — every ₹1 spent on acquisition returns ₹3.56."
    },
    {
      title: "Churn Rate",
      value: "2.1%",
      change: "-0.3pp",
      positive: true,
      description: "Monthly revenue churn — below 3% is SaaS benchmark."
    }
  ],
  highlights: [
    "MRR grew 8.3% month-over-month, above the 5% SaaS growth benchmark.",
    "NRR of 106% indicates strong expansion revenue from plan upgrades.",
    "LTV:CAC ratio of 3.56x is within the healthy 3–5x range."
  ],
  risks: [
    "CAC payback period of 3.7 months could increase if ad costs rise.",
    "Free plan conversion rate below 10% — onboarding improvements needed."
  ],
  nextSteps: [
    "Improve free-to-paid onboarding to increase conversion above 15%.",
    "Focus expansion revenue by upselling Growth users to Pro plan.",
    "Add annual billing option to reduce churn and improve cash flow."
  ],
  healthScore: "healthy"
};
function parseCohortData(raw) {
  return raw.flatMap((s) => {
    try {
      const parsed = JSON.parse(s);
      if (typeof parsed === "object" && parsed !== null && "label" in parsed && "d1" in parsed && "d7" in parsed && "d30" in parsed) {
        return [parsed];
      }
      return [];
    } catch {
      return [];
    }
  });
}
function parseFunnelData(raw) {
  return raw.flatMap((s) => {
    try {
      const parsed = JSON.parse(s);
      if (typeof parsed === "object" && parsed !== null && "name" in parsed && "count" in parsed && "pct" in parsed) {
        return [parsed];
      }
      return [];
    } catch {
      return [];
    }
  });
}
function useLatestInvestorReport() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["investorReport", "latest"],
    queryFn: async () => {
      var _a;
      if (!actor) return MOCK_REPORT;
      try {
        const raw = await ((_a = actor.getLatestReport) == null ? void 0 : _a.call(actor));
        if (!raw) return MOCK_REPORT;
        return {
          ...MOCK_REPORT,
          ...raw,
          mrr: typeof raw.mrr === "bigint" ? Number(raw.mrr) : raw.mrr ?? MOCK_REPORT.mrr,
          arr: typeof raw.arr === "bigint" ? Number(raw.arr) : raw.arr ?? MOCK_REPORT.arr,
          ltv: typeof raw.ltv === "bigint" ? Number(raw.ltv) : raw.ltv ?? MOCK_REPORT.ltv,
          cac: typeof raw.cac === "bigint" ? Number(raw.cac) : raw.cac ?? MOCK_REPORT.cac,
          payingCustomers: typeof raw.payingCustomers === "bigint" ? Number(raw.payingCustomers) : raw.payingCustomers ?? MOCK_REPORT.payingCustomers,
          cohortData: parseCohortData(raw.cohortData ?? []),
          funnelData: parseFunnelData(raw.funnelData ?? [])
        };
      } catch {
        return MOCK_REPORT;
      }
    },
    enabled: !isFetching,
    staleTime: 3e5
  });
}
function useGenerateInvestorReport() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      var _a;
      if (!actor) return MOCK_REPORT;
      try {
        const raw = await ((_a = actor.generateInvestorReport) == null ? void 0 : _a.call(actor));
        if (!raw) return MOCK_REPORT;
        return {
          ...MOCK_REPORT,
          ...raw,
          mrr: typeof raw.mrr === "bigint" ? Number(raw.mrr) : raw.mrr ?? MOCK_REPORT.mrr,
          arr: typeof raw.arr === "bigint" ? Number(raw.arr) : raw.arr ?? MOCK_REPORT.arr,
          ltv: typeof raw.ltv === "bigint" ? Number(raw.ltv) : raw.ltv ?? MOCK_REPORT.ltv,
          cac: typeof raw.cac === "bigint" ? Number(raw.cac) : raw.cac ?? MOCK_REPORT.cac,
          payingCustomers: typeof raw.payingCustomers === "bigint" ? Number(raw.payingCustomers) : raw.payingCustomers ?? MOCK_REPORT.payingCustomers,
          cohortData: parseCohortData(raw.cohortData ?? []),
          funnelData: parseFunnelData(raw.funnelData ?? [])
        };
      } catch {
        return MOCK_REPORT;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["investorReport"] })
  });
}
const LTV_CAC_STATUS = {
  healthy: {
    label: "Healthy (≥3x)",
    cls: "text-success border-success/30 bg-success/5 print:border-green-600 print:text-green-700"
  },
  watch: {
    label: "Watch (1–3x)",
    cls: "text-warning border-warning/30 bg-warning/5 print:border-yellow-600 print:text-yellow-700"
  },
  critical: {
    label: "Critical (<1x)",
    cls: "text-destructive border-destructive/30 bg-destructive/5 print:border-red-600 print:text-red-700"
  }
};
function ltvCacStatus(ratio) {
  if (ratio >= 3) return "healthy";
  if (ratio >= 1) return "watch";
  return "critical";
}
const DISCLAIMERS = [
  "Revenue figures are based on subscription event data recorded in the platform.",
  "CAC is based on manually entered marketing spend.",
  "LTV is estimated using tier-weighted ARPU and monthly churn rate.",
  "This report is for informational purposes only and does not constitute financial advice."
];
function SectionTitle({
  children,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 print:mb-2", children: [
    icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary print:text-blue-600", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground print:text-black", children })
  ] });
}
function KpiCard({
  label,
  value,
  sub,
  highlight,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "p-4 print:border print:border-gray-200 print:shadow-none print:p-3",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground print:text-gray-500", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: cn(
              "text-xl font-bold mt-0.5 print:text-black",
              highlight === "success" && "text-success",
              highlight === "warning" && "text-warning",
              highlight === "destructive" && "text-destructive",
              !highlight && "text-foreground"
            ),
            children: value
          }
        ),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 print:text-gray-500", children: sub })
      ]
    }
  );
}
function AlertRow({
  severity,
  message
}) {
  const isRed = severity === "critical";
  const isOrange = severity === "warning";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex items-start gap-2 p-2.5 rounded-lg border text-sm print:border print:rounded",
        isRed && "bg-destructive/5 border-destructive/20 text-destructive print:border-red-300 print:text-red-700 print:bg-red-50",
        isOrange && "bg-warning/5 border-warning/20 text-warning print:border-yellow-300 print:text-yellow-700 print:bg-yellow-50",
        !isRed && !isOrange && "bg-success/5 border-success/20 text-success print:border-green-300 print:text-green-700 print:bg-green-50"
      ),
      children: [
        isRed && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        isOrange && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        !isRed && !isOrange && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: message })
      ]
    }
  );
}
function InvestorReportPage() {
  const { data: report, isLoading, refetch } = useLatestInvestorReport();
  const generate = useGenerateInvestorReport();
  const { metrics, healthAlerts } = useSaasMetrics();
  const [generating, setGenerating] = reactExports.useState(false);
  const [exporting, setExporting] = reactExports.useState(false);
  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await generate.mutateAsync();
      await refetch();
      ue.success("Investor report updated");
    } finally {
      setGenerating(false);
    }
  };
  const handleExport = async () => {
    setExporting(true);
    try {
      const cohorts2 = (report == null ? void 0 : report.cohortData) && report.cohortData.length > 0 ? report.cohortData : [];
      const funnelSteps2 = (report == null ? void 0 : report.funnelData) && report.funnelData.length > 0 ? report.funnelData : [];
      exportInvestorReportPDF({
        metrics,
        cohorts: cohorts2,
        funnelSteps: funnelSteps2,
        highlights: report == null ? void 0 : report.highlights,
        risks: report == null ? void 0 : report.risks
      });
      ue.success("PDF downloaded");
    } catch (err) {
      ue.error("Export failed — please try again");
      console.error(err);
    } finally {
      setExporting(false);
    }
  };
  const r = report;
  const cohorts = (r == null ? void 0 : r.cohortData) && r.cohortData.length > 0 ? r.cohortData : [];
  const funnelSteps = (r == null ? void 0 : r.funnelData) && r.funnelData.length > 0 ? r.funnelData : [];
  const generatedDate = r ? new Date(r.generatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }) : (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const mrr = (r == null ? void 0 : r.mrr) ?? metrics.mrr;
  const arr = (r == null ? void 0 : r.arr) ?? metrics.arr;
  const nrr = (r == null ? void 0 : r.nrr) ?? metrics.nrr;
  const churnRate = (r == null ? void 0 : r.churnRate) ?? metrics.monthlyChurnRate;
  const ltv = (r == null ? void 0 : r.ltv) ?? metrics.ltv;
  const cac = (r == null ? void 0 : r.cac) ?? metrics.cac;
  const ltvCac = (r == null ? void 0 : r.ltvCacRatio) ?? metrics.ltvCacRatio;
  const payingCustomers = (r == null ? void 0 : r.payingCustomers) ?? metrics.totalPayingCustomers;
  const newCustomers = metrics.newCustomers;
  const churnedCustomers = metrics.churnedCustomers;
  const cacByChannel = metrics.cacByChannel;
  const newMrr = metrics.newMrr;
  const churnedMrr = metrics.churnedMrr;
  const cacPayback = metrics.cacPaybackMonths;
  const statusKey = ltvCacStatus(ltvCac);
  const alerts = healthAlerts.length > 0 ? healthAlerts : [
    {
      severity: "healthy",
      message: "All key SaaS metrics are within healthy benchmarks."
    }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: ["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, k)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print:hidden flex items-center justify-between flex-wrap gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Investor Report" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
          "Last generated: ",
          generatedDate
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: handleGenerate,
            disabled: generating,
            "data-ocid": "investor_report.regenerate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: cn("w-3.5 h-3.5 mr-1.5", generating && "animate-spin")
                }
              ),
              generating ? "Generating…" : "Generate Latest"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleExport,
            disabled: exporting,
            "data-ocid": "investor_report.export_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
              exporting ? "Generating…" : "Export as PDF"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        id: "investor-report",
        className: "space-y-8 print:space-y-0 print:block",
        "data-ocid": "investor_report.panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "print:h-screen print:flex print:flex-col print:justify-center print:items-center print:page-break-after print:text-center print:border-b-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary/5 border border-primary/10 p-6 print:border-none print:bg-transparent print:p-0 print:rounded-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 print:justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center print:bg-blue-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display font-bold text-foreground print:text-black print:text-3xl", children: "GrowthOS" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-display font-bold text-foreground mb-2 print:text-5xl print:text-black print:mb-4", children: "Investor Report" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm print:text-lg print:text-gray-500", children: [
              "Generated: ",
              generatedDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground print:mt-8 print:p-4 print:border print:border-gray-200 print:rounded print:text-gray-500 print:text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "inline w-3.5 h-3.5 mr-1 print:hidden" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "print:font-semibold", children: "Disclaimer:" }),
              " This report contains estimates based on platform data. Actual results may vary."
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print:page-break-before print:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }), children: "Revenue Snapshot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4 print:gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "MRR",
                  value: fmtLakhs(mrr),
                  sub: `+${fmtLakhs(newMrr)} new`,
                  ocid: "investor_report.mrr"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "ARR",
                  value: fmtLakhs(arr),
                  ocid: "investor_report.arr"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "New MRR",
                  value: fmtLakhs(newMrr),
                  highlight: "success",
                  ocid: "investor_report.new_mrr"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "Churned MRR",
                  value: fmtLakhs(churnedMrr),
                  highlight: "destructive",
                  ocid: "investor_report.churned_mrr"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 flex items-center gap-3 print:border print:border-gray-200 print:shadow-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground print:text-gray-500", children: "Net Revenue Retention (NRR)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: cn(
                      "text-xl font-bold mt-0.5 print:text-black",
                      nrr >= 100 ? "text-success" : "text-warning"
                    ),
                    children: [
                      nrr,
                      "%"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: nrr >= 100 ? "text-success border-success/30 bg-success/5 print:border-green-500 print:text-green-700" : "text-warning border-warning/30 bg-warning/5 print:border-yellow-500 print:text-yellow-700",
                  "data-ocid": "investor_report.nrr_badge",
                  children: nrr >= 100 ? "Expansion > Churn" : "Below 100% — Monitor"
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "print:hidden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print:page-break-before print:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }), children: "Unit Economics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 print:text-gray-500", children: "CAC by Channel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "print:border print:border-gray-200 print:shadow-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm print:text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 print:bg-gray-50 print:border-gray-200", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Channel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Spend" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Share" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                  [
                    { label: "Google Ads", spend: cacByChannel.googleAds },
                    { label: "Meta Ads", spend: cacByChannel.metaAds },
                    { label: "Referral", spend: cacByChannel.referral },
                    { label: "Other", spend: cacByChannel.other }
                  ].map((row) => {
                    const pct = cacByChannel.totalSpend > 0 ? (row.spend / cacByChannel.totalSpend * 100).toFixed(
                      1
                    ) : "0.0";
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: "border-b border-border/50 last:border-0 print:border-gray-100",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground print:text-black", children: row.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-medium text-foreground print:text-black", children: fmtINR(row.spend) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right text-muted-foreground print:text-gray-500", children: [
                            pct,
                            "%"
                          ] })
                        ]
                      },
                      row.label
                    );
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/20 print:bg-gray-50 font-semibold", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground print:text-black", children: "Total Spend" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-foreground print:text-black", children: fmtINR(cacByChannel.totalSpend) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right text-muted-foreground print:text-gray-500", children: "100%" })
                  ] })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4 print:gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "CAC",
                  value: fmtINR(cac),
                  sub: `${cacByChannel.newPaidCustomers} new customers`,
                  ocid: "investor_report.cac"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "LTV",
                  value: fmtINR(ltv),
                  ocid: "investor_report.ltv"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "p-4 print:border print:border-gray-200 print:shadow-none",
                  "data-ocid": "investor_report.ltv_cac",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground print:text-gray-500", children: "LTV:CAC Ratio" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: cn(
                          "text-xl font-bold mt-0.5 print:text-black",
                          statusKey === "healthy" && "text-success",
                          statusKey === "watch" && "text-warning",
                          statusKey === "critical" && "text-destructive"
                        ),
                        children: [
                          ltvCac.toFixed(2),
                          "x"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: cn(
                          "text-[10px] mt-1",
                          LTV_CAC_STATUS[statusKey].cls
                        ),
                        children: LTV_CAC_STATUS[statusKey].label
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "CAC Payback",
                  value: `${cacPayback.toFixed(1)} mo`,
                  sub: "Months to recover CAC",
                  ocid: "investor_report.cac_payback"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "print:hidden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print:page-break-before print:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Retention" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 print:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "Monthly Churn Rate",
                  value: `${churnRate.toFixed(1)}%`,
                  sub: churnRate <= 3 ? "Below 3% SaaS benchmark" : "Above 3% — action needed",
                  highlight: churnRate <= 3 ? "success" : "warning",
                  ocid: "investor_report.churn"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "Revenue Churn",
                  value: `${metrics.revenueChurnRate.toFixed(1)}%`,
                  sub: "Revenue lost from churned users",
                  ocid: "investor_report.revenue_churn"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "Retention (D30)",
                  value: cohorts.length > 0 ? `${cohorts[0].d30}%` : "—",
                  sub: cohorts.length > 0 ? "30-day retention, latest cohort" : "Generate report to see data",
                  highlight: cohorts.length > 0 ? cohorts[0].d30 >= 35 ? "success" : "warning" : void 0,
                  ocid: "investor_report.d30_retention"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 print:text-gray-500", children: "Cohort Retention (last 4 cohorts)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "print:border print:border-gray-200 print:shadow-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm print:text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 print:bg-gray-50 print:border-gray-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Cohort" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Day 1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Day 7" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Day 30" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: cohorts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 4,
                  className: "px-4 py-6 text-center text-sm text-muted-foreground print:text-gray-400",
                  children: "Generate report to see cohort data"
                }
              ) }) : cohorts.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 last:border-0 print:border-gray-100",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-foreground print:text-black", children: c.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right text-foreground print:text-black", children: [
                      c.d1,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 text-right text-foreground print:text-black", children: [
                      c.d7,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        className: cn(
                          "px-4 py-2 text-right font-medium print:text-black",
                          c.d30 >= 40 ? "text-success" : "text-warning"
                        ),
                        children: [
                          c.d30,
                          "%"
                        ]
                      }
                    )
                  ]
                },
                c.label
              )) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "print:hidden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print:page-break-before print:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Acquisition Funnel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "print:border print:border-gray-200 print:shadow-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm print:text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30 print:bg-gray-50 print:border-gray-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Step" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Users" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500", children: "Conversion" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: funnelSteps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 3,
                  className: "px-4 py-6 text-center text-sm text-muted-foreground print:text-gray-400",
                  children: "Generate report to see funnel data"
                }
              ) }) : funnelSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/50 last:border-0 print:border-gray-100",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2 flex items-center gap-2 text-foreground print:text-black", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 print:bg-blue-50 print:text-blue-700", children: i + 1 }),
                      step.name
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2 text-right font-medium text-foreground print:text-black", children: step.count.toLocaleString("en-IN") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "td",
                      {
                        className: cn(
                          "px-4 py-2 text-right font-semibold print:text-black",
                          step.pct >= 50 ? "text-success" : step.pct >= 20 ? "text-warning" : "text-destructive"
                        ),
                        children: [
                          step.pct,
                          "%"
                        ]
                      }
                    )
                  ]
                },
                step.name
              )) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "print:hidden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print:page-break-before print:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }), children: "Customer Metrics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-3 print:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "Total Paying",
                  value: payingCustomers.toLocaleString("en-IN"),
                  sub: "Active subscriptions",
                  ocid: "investor_report.total_customers"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "New This Month",
                  value: `+${newCustomers}`,
                  highlight: "success",
                  sub: "New paid sign-ups",
                  ocid: "investor_report.new_customers"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                KpiCard,
                {
                  label: "Churned This Month",
                  value: churnedCustomers.toString(),
                  highlight: churnedCustomers > 10 ? "destructive" : void 0,
                  sub: "Cancelled subscriptions",
                  ocid: "investor_report.churned_customers"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "print:hidden" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print:page-break-before print:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }), children: "Health Alerts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "investor_report.alerts", children: alerts.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertRow,
              {
                severity: typeof a.severity === "string" ? a.severity : "healthy",
                message: a.message
              },
              a.alertId ?? String(i)
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "print:hidden" }),
          r && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "print:page-break-before print:pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5 print:text-black", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success" }),
                " Highlights"
              ] }),
              r.highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success shrink-0 mt-0.5 print:text-green-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground print:text-gray-600", children: h })
              ] }, h))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-1.5 print:text-black", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-warning" }),
                " Risks"
              ] }),
              r.risks.map((risk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-warning shrink-0 mt-0.5 print:text-yellow-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground print:text-gray-600", children: risk })
              ] }, risk))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground print:text-black", children: "Next Steps" }),
              r.nextSteps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-primary/15 text-primary text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5 print:bg-blue-50 print:text-blue-700", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground print:text-gray-600", children: s })
              ] }, s))
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "print:page-break-before print:pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }), children: "Standard Disclaimers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-muted/30 print:border print:border-gray-200 print:shadow-none print:bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: DISCLAIMERS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2 text-xs text-muted-foreground print:text-gray-600",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-muted-foreground mt-1.5 shrink-0 print:bg-gray-400" }),
                  d
                ]
              },
              d
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden print:block mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-400", children: [
              "GrowthOS · Investor Report · ",
              generatedDate,
              " · Contact: Anees Chaudhary +91 9324073833"
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  InvestorReportPage as default
};
