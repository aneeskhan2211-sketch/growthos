import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, K as FileText, k as Star, aM as Share2, m as motion, aj as Card, B as Badge, U as Users, bS as Eye, aK as Link2, ay as Download, D as CircleCheck, n as Calendar, aI as Switch, bT as ArrowUpRight, A as AnimatePresence, f as Send, az as Dialog, aA as DialogContent, aB as DialogHeader, aC as DialogTitle, E as Rocket, W as Sparkles, p as TrendingUp, Z as Zap, R as ResponsiveContainer, bU as LineChart, bE as CartesianGrid, s as XAxis, Y as YAxis, t as Tooltip, bV as Line, aa as Label, ab as Select, ac as SelectTrigger, ad as SelectValue, ae as SelectContent, af as SelectItem, a5 as Checkbox } from "./index-C-gts07u.js";
import { P as PageHeader } from "./PageHeader-Du6c9ARZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "7", x: "3", y: "3", rx: "1", key: "f1a2em" }],
  ["rect", { width: "9", height: "7", x: "3", y: "14", rx: "1", key: "jqznyg" }],
  ["rect", { width: "5", height: "7", x: "16", y: "14", rx: "1", key: "q5h2i8" }]
];
const LayoutTemplate = createLucideIcon("layout-template", __iconNode$1);
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
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
];
const MailOpen = createLucideIcon("mail-open", __iconNode);
const CLIENT_REPORTS = [
  {
    id: "cr1",
    clientName: "Sunrise Salon & Spa",
    reportMonth: "April 2026",
    status: "Viewed",
    leadsGrowth: 42,
    trafficGrowth: 67,
    roi: 320,
    leadsGenerated: 38,
    conversionRate: 4.2,
    revenueImpact: "₹28,500"
  },
  {
    id: "cr2",
    clientName: "FitZone Gym & Wellness",
    reportMonth: "April 2026",
    status: "Sent",
    leadsGrowth: 58,
    trafficGrowth: 82,
    roi: 410,
    leadsGenerated: 54,
    conversionRate: 5.8,
    revenueImpact: "₹42,000"
  },
  {
    id: "cr3",
    clientName: "Dr. Mehta Multi-Specialty Clinic",
    reportMonth: "April 2026",
    status: "Generated",
    leadsGrowth: 31,
    trafficGrowth: 44,
    roi: 280,
    leadsGenerated: 27,
    conversionRate: 3.4,
    revenueImpact: "₹19,800"
  },
  {
    id: "cr4",
    clientName: "TechEdge IT Solutions",
    reportMonth: "April 2026",
    status: "Sent",
    leadsGrowth: 73,
    trafficGrowth: 95,
    roi: 560,
    leadsGenerated: 71,
    conversionRate: 7.2,
    revenueImpact: "₹55,000"
  },
  {
    id: "cr5",
    clientName: "StarBites Cloud Kitchen",
    reportMonth: "April 2026",
    status: "Pending",
    leadsGrowth: 19,
    trafficGrowth: 28,
    roi: 210,
    leadsGenerated: 14,
    conversionRate: 2.1,
    revenueImpact: "₹12,400"
  },
  {
    id: "cr6",
    clientName: "LegalEdge Advocates LLP",
    reportMonth: "April 2026",
    status: "Pending",
    leadsGrowth: 25,
    trafficGrowth: 38,
    roi: 245,
    leadsGenerated: 19,
    conversionRate: 2.9,
    revenueImpact: "₹17,200"
  }
];
const TRAFFIC_TREND = [
  { week: "W1", visits: 1240 },
  { week: "W2", visits: 1680 },
  { week: "W3", visits: 2100 },
  { week: "W4", visits: 2480 }
];
const SCHEDULED_REPORTS = [
  {
    id: "sr1",
    clientName: "Sunrise Salon & Spa",
    scheduledDate: "May 1, 2026",
    format: "Both",
    autoEnabled: true
  },
  {
    id: "sr2",
    clientName: "FitZone Gym & Wellness",
    scheduledDate: "May 1, 2026",
    format: "PDF",
    autoEnabled: true
  },
  {
    id: "sr3",
    clientName: "TechEdge IT Solutions",
    scheduledDate: "May 3, 2026",
    format: "Email",
    autoEnabled: false
  }
];
const REPORT_TEMPLATES = [
  {
    id: "t1",
    name: "Standard Monthly",
    sections: 8,
    description: "Full breakdown — traffic, leads, campaigns, SEO, social, revenue, next steps, and executive summary.",
    badge: "Most Used"
  },
  {
    id: "t2",
    name: "Executive Summary",
    sections: 4,
    description: "Single-page overview for busy clients — key KPIs, wins, and next month action plan only."
  },
  {
    id: "t3",
    name: "Custom",
    sections: 0,
    description: "Pick exactly which sections to include. Ideal for niche reporting or specific campaign focus.",
    badge: "Flexible"
  }
];
const SECTION_OPTIONS = [
  "Traffic Analysis",
  "Lead Generation",
  "Campaign Performance",
  "SEO Ranking",
  "Social Media",
  "Revenue Impact",
  "Next Steps"
];
const SERVICES_DELIVERED = [
  "Google Ads — 3 campaigns launched, ₹18k spend, 2.4x ROAS",
  "SEO — 12 pages optimized, 8 new keywords ranking page 1",
  "Social Media — 24 posts published, +340 followers",
  "Email — 4 campaigns sent, 38% avg open rate",
  "WhatsApp — 120 leads contacted, 31 replies received"
];
const NEXT_MONTH_PLAN = [
  "Scale Google Ads budget to ₹25k with new creative variants",
  "Publish 4 blog posts targeting local keywords (Mumbai + service)",
  "Launch Instagram Reels campaign for product showcasing",
  "Set up automated review collection via WhatsApp",
  "Build a lead magnet landing page for free consultation"
];
function StatusBadge({ status }) {
  const variants = {
    Generated: "bg-primary/10 text-primary border-primary/20",
    Sent: "bg-success/10 text-success border-success/20",
    Viewed: "bg-accent/10 text-accent border-accent/20",
    Pending: "bg-muted/30 text-muted-foreground border-border"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${variants[status]}`,
      children: [
        status === "Viewed" && /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-2.5 h-2.5" }),
        status === "Sent" && /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-2.5 h-2.5" }),
        status === "Generated" && /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-2.5 h-2.5" }),
        status
      ]
    }
  );
}
function ReportPreviewModal({
  report,
  onClose
}) {
  if (!report) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!report, onOpenChange: () => onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin",
      "data-ocid": "reports.preview.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "sr-only", children: "Report Preview" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "GrowthOS Agency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: report.clientName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Monthly Report" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: report.reportMonth })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-primary" }),
            "Executive Summary"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
            report.clientName,
            " had an excellent month in ",
            report.reportMonth,
            ". Organic traffic grew by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold", children: [
              report.trafficGrowth,
              "%"
            ] }),
            ", generating",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold", children: [
              report.leadsGenerated,
              " qualified leads"
            ] }),
            " ",
            "through SEO, paid campaigns, and social media. Revenue impact reached",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: report.revenueImpact }),
            " ",
            "at a",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold", children: [
              report.roi / 100,
              "x ROI"
            ] }),
            ". Conversion rate improved to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-semibold", children: [
              report.conversionRate,
              "%"
            ] }),
            ", above the industry benchmark of 2.8%."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mt-4", children: [
          {
            label: "Leads Generated",
            value: String(report.leadsGenerated),
            icon: Users,
            color: "text-primary",
            bg: "bg-primary/10"
          },
          {
            label: "Traffic Growth",
            value: `+${report.trafficGrowth}%`,
            icon: TrendingUp,
            color: "text-success",
            bg: "bg-success/10"
          },
          {
            label: "Conversion Rate",
            value: `${report.conversionRate}%`,
            icon: Zap,
            color: "text-warning",
            bg: "bg-warning/10"
          },
          {
            label: "Revenue Impact",
            value: report.revenueImpact,
            icon: Star,
            color: "text-accent",
            bg: "bg-accent/10"
          }
        ].map((kpi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-3 rounded-xl border border-border bg-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(kpi.icon, { className: `w-3.5 h-3.5 ${kpi.color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground tabular-nums", children: kpi.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: kpi.label })
              ] })
            ]
          },
          kpi.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Monthly Traffic Trend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-xl border border-border bg-muted/20 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: TRAFFIC_TREND, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CartesianGrid,
              {
                strokeDasharray: "3 3",
                stroke: "oklch(var(--border))",
                opacity: 0.5
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              XAxis,
              {
                dataKey: "week",
                tick: { fontSize: 11 },
                axisLine: false,
                tickLine: false
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              YAxis,
              {
                tick: { fontSize: 11 },
                axisLine: false,
                tickLine: false,
                width: 40
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Tooltip,
              {
                contentStyle: {
                  background: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: 8,
                  fontSize: 12
                },
                labelStyle: { color: "oklch(var(--muted-foreground))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Line,
              {
                type: "monotone",
                dataKey: "visits",
                stroke: "oklch(var(--primary))",
                strokeWidth: 2,
                dot: { r: 3, fill: "oklch(var(--primary))" },
                activeDot: { r: 5 }
              }
            )
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2", children: "Services Delivered" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: SERVICES_DELIVERED.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: s })
          ] }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-2", children: "Next Month Action Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: NEXT_MONTH_PLAN.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: item })
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-xl gradient-hero border border-primary/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground mb-0.5 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-3.5 h-3.5 text-primary" }),
            "Your business is growing — here's what we're doing next month"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Based on this month's results, we're increasing ad spend, doubling down on SEO, and launching a referral campaign to accelerate your pipeline heading into May." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Powered by GrowthOS · Based on publicly available data & heuristics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "text-xs h-7",
                "data-ocid": "reports.preview.share_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-3 h-3 mr-1" }),
                  "Share Link"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "btn-primary-glow text-xs h-7",
                "data-ocid": "reports.preview.download_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 mr-1" }),
                  "Download PDF"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function GeneratorModal({ onClose }) {
  const [selectedClient, setSelectedClient] = reactExports.useState("");
  const [selectedMonth, setSelectedMonth] = reactExports.useState("");
  const [selectedSections, setSelectedSections] = reactExports.useState(SECTION_OPTIONS);
  const toggleSection = (section) => {
    setSelectedSections(
      (prev) => prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "reports.generator.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-base font-bold font-display flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
      "Generate Report"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Select Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedClient, onValueChange: setSelectedClient, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-9 text-sm",
              "data-ocid": "reports.generator.client_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a client…" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLIENT_REPORTS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.id, children: c.clientName }, c.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Report Month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedMonth, onValueChange: setSelectedMonth, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-9 text-sm",
              "data-ocid": "reports.generator.month_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select month…" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["April 2026", "March 2026", "February 2026"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Include Sections" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SECTION_OPTIONS.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2.5",
            "data-ocid": `reports.generator.section.${section.toLowerCase().replace(/\s+/g, "_")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: `section-${section}`,
                  checked: selectedSections.includes(section),
                  onCheckedChange: () => toggleSection(section)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: `section-${section}`,
                  className: "text-sm font-medium cursor-pointer",
                  children: section
                }
              )
            ]
          },
          section
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4 pt-4 border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 text-sm h-9",
          onClick: onClose,
          "data-ocid": "reports.generator.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "flex-1 text-sm h-9",
          disabled: !selectedClient || !selectedMonth,
          "data-ocid": "reports.generator.preview_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 mr-1.5" }),
            "Preview"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          className: "flex-1 btn-primary-glow text-sm h-9",
          disabled: !selectedClient || !selectedMonth,
          "data-ocid": "reports.generator.submit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5 mr-1.5" }),
            "Generate & Send"
          ]
        }
      )
    ] })
  ] }) });
}
function ReportsPage() {
  const [previewReport, setPreviewReport] = reactExports.useState(null);
  const [showGenerator, setShowGenerator] = reactExports.useState(false);
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState("t1");
  const [scheduledReports, setScheduledReports] = reactExports.useState(SCHEDULED_REPORTS);
  const toggleAutoReport = (id) => {
    setScheduledReports(
      (prev) => prev.map(
        (r) => r.id === id ? { ...r, autoEnabled: !r.autoEnabled } : r
      )
    );
  };
  const STATS = [
    {
      label: "Generated This Month",
      value: "12",
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Avg Open Rate",
      value: "78%",
      icon: MailOpen,
      color: "text-success",
      bg: "bg-success/10"
    },
    {
      label: "Client Satisfaction",
      value: "4.7/5",
      icon: Star,
      color: "text-warning",
      bg: "bg-warning/10"
    },
    {
      label: "Reports Shared",
      value: "9",
      icon: Share2,
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Reports",
        description: "Monthly performance reports for all your clients",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "btn-primary-glow",
            onClick: () => setShowGenerator(true),
            "data-ocid": "reports.generate_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Generate Report"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        "data-ocid": `reports.stat.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 hover-lift shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: `w-4 h-4 ${stat.color}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground tabular-nums leading-tight", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label })
          ] })
        ] }) })
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground font-display", children: "Client Reports — April 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] text-muted-foreground",
            children: "6 clients"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "space-y-3",
          initial: "hidden",
          animate: "visible",
          variants: {
            visible: { transition: { staggerChildren: 0.07 } }
          },
          children: CLIENT_REPORTS.map((report, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: {
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              },
              whileHover: { y: -1 },
              transition: { duration: 0.2 },
              "data-ocid": `reports.client.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 transition-smooth hover:shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: report.clientName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: report.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: report.reportMonth })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-success tabular-nums", children: [
                      "+",
                      report.leadsGrowth,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Leads" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary tabular-nums", children: [
                      "+",
                      report.trafficGrowth,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Traffic" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-accent tabular-nums", children: [
                      report.roi / 100,
                      "x"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "ROI" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      className: "text-xs h-7 px-2.5 gap-1",
                      onClick: () => setPreviewReport(report),
                      "data-ocid": `reports.client.view.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "View" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      className: "text-xs h-7 px-2.5 gap-1",
                      "data-ocid": `reports.client.share.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Share" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      className: "text-xs h-7 px-2.5 gap-1",
                      "data-ocid": `reports.client.download.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "PDF" })
                      ]
                    }
                  )
                ] })
              ] }) })
            },
            report.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports.templates.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground font-display", children: "Report Templates" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: REPORT_TEMPLATES.map((tmpl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            whileHover: { y: -1 },
            transition: { duration: 0.15 },
            "data-ocid": `reports.template.${tmpl.id}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: `p-4 cursor-pointer transition-smooth ${selectedTemplate === tmpl.id ? "border-primary/40 bg-primary/5 shadow-card" : "hover:border-border/80 hover:shadow-card"}`,
                onClick: () => setSelectedTemplate(tmpl.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: tmpl.name }),
                      tmpl.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide", children: tmpl.badge }),
                      tmpl.sections > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                        tmpl.sections,
                        " sections"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: tmpl.description })
                  ] }),
                  selectedTemplate === tmpl.id && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" })
                ] })
              }
            )
          },
          tmpl.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports.scheduled.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground font-display", children: "Scheduled Auto-Reports" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          scheduledReports.map((sr, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "p-4",
              "data-ocid": `reports.scheduled.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: sr.clientName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sr.scheduledDate }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold px-1.5 py-0 rounded-full bg-muted/40 text-muted-foreground border border-border", children: sr.format })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Auto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: sr.autoEnabled,
                      onCheckedChange: () => toggleAutoReport(sr.id),
                      "data-ocid": `reports.scheduled.toggle.${i + 1}`
                    }
                  )
                ] })
              ] })
            },
            sr.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl border border-dashed border-border/60 flex items-center justify-between bg-muted/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Enable for more clients" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Auto-generate reports on the 1st of every month" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "text-xs h-7 shrink-0",
                "data-ocid": "reports.scheduled.add_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3 mr-1" }),
                  "Set Up"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
      previewReport && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReportPreviewModal,
        {
          report: previewReport,
          onClose: () => setPreviewReport(null)
        }
      ),
      showGenerator && /* @__PURE__ */ jsxRuntimeExports.jsx(GeneratorModal, { onClose: () => setShowGenerator(false) })
    ] })
  ] });
}
export {
  ReportsPage as default
};
