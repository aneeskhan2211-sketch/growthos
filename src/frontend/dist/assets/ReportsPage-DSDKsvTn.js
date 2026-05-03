const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-DtXcvIPA.js","assets/index-DcPx_5wo.js","assets/index-C06sC65B.css"])))=>i.map(i=>d[i]);
import { a8 as useClients, be as useAutoAgency, r as reactExports, a7 as FileText, D as Send, ab as Sparkles, g as Calendar, j as jsxRuntimeExports, S as Switch, bf as PaywallTrigger, i as Button, a6 as LoaderCircle, y as motion, n as Card, h as Badge, A as AnimatePresence, m as ue, a0 as CircleCheck, bg as __vitePreload, a2 as Users, E as ChevronUp, q as ChevronDown, T as TrendingUp, Z as Zap, b2 as ChartNoAxesColumn, a1 as Rocket, aH as Download, R as ResponsiveContainer, J as BarChart, b1 as CartesianGrid, K as XAxis, Y as YAxis, N as Tooltip, O as Bar } from "./index-DcPx_5wo.js";
function fmt(n) {
  const num = Number(n);
  if (num >= 1e5) return `₹${(num / 1e5).toFixed(1)}L`;
  if (num >= 1e3) return `₹${(num / 1e3).toFixed(1)}k`;
  return `₹${num.toLocaleString("en-IN")}`;
}
function StatusBadge({ status }) {
  const map = {
    draft: {
      label: "Draft",
      cls: "bg-muted/40 text-muted-foreground border-border"
    },
    ready: {
      label: "Ready",
      cls: "bg-primary/10 text-primary border-primary/20"
    },
    sent: {
      label: "Sent",
      cls: "bg-success/10 text-success border-success/20"
    }
  };
  const v = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${v.cls}`,
      children: v.label
    }
  );
}
const CHART_DATA = [
  { month: "Jan", leads: 28, conversions: 5 },
  { month: "Feb", leads: 34, conversions: 6 },
  { month: "Mar", leads: 39, conversions: 7 },
  { month: "Apr", leads: 47, conversions: 8 },
  { month: "May", leads: 52, conversions: 10 }
];
function ReportBarChart() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36 rounded-xl border border-border bg-muted/20 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: CHART_DATA, barSize: 10, barGap: 4, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CartesianGrid,
      {
        strokeDasharray: "3 3",
        stroke: "oklch(var(--border))",
        opacity: 0.5,
        vertical: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "month",
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
        width: 28
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          background: "oklch(var(--card))",
          border: "1px solid oklch(var(--border))",
          borderRadius: 8,
          fontSize: 11
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Bar,
      {
        dataKey: "leads",
        name: "Leads",
        fill: "oklch(var(--primary))",
        radius: [3, 3, 0, 0]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Bar,
      {
        dataKey: "conversions",
        name: "Conversions",
        fill: "oklch(var(--success))",
        radius: [3, 3, 0, 0]
      }
    )
  ] }) }) });
}
function SuccessCheckmark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0, opacity: 0 },
      transition: { type: "spring", stiffness: 380, damping: 22 },
      className: "flex items-center justify-center w-8 h-8 rounded-full bg-success/10 border border-success/30 shrink-0",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.35, delay: 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success" })
        }
      )
    }
  );
}
function ReportPreviewExpanded({
  entry,
  onSend,
  onDownload,
  isSending,
  justSent
}) {
  const r = entry.report;
  const kpis = [
    {
      label: "Leads Generated",
      value: String(r.leadsGenerated),
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Conversions",
      value: String(r.conversions),
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10"
    },
    {
      label: "Revenue Impact",
      value: fmt(r.revenueImpact),
      icon: Zap,
      color: "text-warning",
      bg: "bg-warning/10"
    },
    {
      label: "ROI",
      value: `${r.roi}%`,
      icon: ChartNoAxesColumn,
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" },
      exit: { opacity: 0, height: 0 },
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      className: "overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 mt-2 pt-4 px-1 pb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-3.5 h-3.5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-medium", children: "GrowthOS Agency" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: entry.clientName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Monthly Report" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: r.reportPeriod })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold text-accent", children: [
            "Top Channel: ",
            r.topChannel
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4", children: kpis.map((kpi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-2.5 rounded-xl border border-border bg-card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(kpi.icon, { className: `w-3 h-3 ${kpi.color}` })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground tabular-nums leading-tight", children: kpi.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground truncate", children: kpi.label })
              ] })
            ]
          },
          kpi.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            "5-Month Performance Trend"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ReportBarChart, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }),
            "Recommended Next Steps"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: r.nextSteps.slice(0, 3).map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground leading-relaxed", children: step })
          ] }, step)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-3 border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              className: "flex-1 text-xs h-8 gap-1.5",
              onClick: onDownload,
              "data-ocid": "reports.preview.download_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
                "Download PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "client-report", requiredPlan: "growth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              className: "flex-1 btn-primary-glow text-xs h-8 gap-1.5",
              onClick: onSend,
              disabled: isSending || justSent || entry.status === "sent",
              "data-ocid": "reports.preview.send_button",
              children: isSending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                "Sending…"
              ] }) : justSent || entry.status === "sent" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-success" }),
                "Sent!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3 h-3" }),
                "Send to Client"
              ] })
            }
          ) })
        ] })
      ] })
    }
  );
}
function ClientReportRow({
  entry,
  index,
  onToggleExpand,
  isExpanded,
  onGenerate,
  isGenerating,
  onSend,
  isSending,
  justSent,
  onDownload,
  onAutoToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06, duration: 0.25 },
      "data-ocid": `reports.client.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden transition-smooth hover:shadow-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: entry.clientName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: entry.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: entry.period })
          ] }),
          entry.report && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-5 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-primary tabular-nums", children: String(entry.report.leadsGenerated) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Leads" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-success tabular-nums", children: String(entry.report.conversions) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Converts" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-accent tabular-nums", children: fmt(entry.report.revenueImpact) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Revenue" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-warning tabular-nums", children: [
                String(entry.report.roi),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "ROI" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 shrink-0 ml-auto", children: entry.report ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onToggleExpand,
              className: "flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/40",
              "data-ocid": `reports.client.expand.${index + 1}`,
              children: [
                isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Preview" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "client-report", requiredPlan: "growth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              className: "text-xs h-7 gap-1",
              onClick: onGenerate,
              disabled: isGenerating,
              "data-ocid": `reports.client.generate.${index + 1}`,
              children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                "Generating…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
                "Generate"
              ] })
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && entry.report && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReportPreviewExpanded,
          {
            entry,
            onSend,
            onDownload,
            isSending,
            justSent
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-t border-border/40 bg-muted/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: entry.autoSendEnabled ? "Auto-send on: June 1, 2026" : "Auto monthly send: off" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "Monthly auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: entry.autoSendEnabled,
                onCheckedChange: onAutoToggle,
                "data-ocid": `reports.client.auto_toggle.${index + 1}`
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
const INITIAL_ENTRIES = (clients) => {
  const statuses = [
    "sent",
    "ready",
    "draft",
    "sent",
    "draft",
    "ready"
  ];
  return clients.slice(0, 6).map((c, i) => ({
    clientId: c.id,
    clientName: c.businessName,
    period: "May 2026",
    status: statuses[i] ?? "draft",
    report: null,
    autoSendEnabled: i < 2
  }));
};
function ReportsPage() {
  const { data: clients = [] } = useClients();
  const { generateAutoReport, markReportSent } = useAutoAgency();
  const [entries, setEntries] = reactExports.useState([]);
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [generatingId, setGeneratingId] = reactExports.useState(null);
  const [sendingId, setSendingId] = reactExports.useState(null);
  const [sentIds, setSentIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [autoGeneratingAll, setAutoGeneratingAll] = reactExports.useState(false);
  const [scheduleEnabled, setScheduleEnabled] = reactExports.useState(true);
  const initRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!initRef.current && clients.length > 0) {
      initRef.current = true;
      setEntries(INITIAL_ENTRIES(clients));
    }
  }, [clients]);
  const handleGenerate = async (clientId) => {
    setGeneratingId(clientId);
    try {
      const report = await generateAutoReport(clientId);
      setEntries(
        (prev) => prev.map(
          (e) => e.clientId === clientId ? { ...e, report, status: "ready" } : e
        )
      );
      setExpandedId(clientId);
    } finally {
      setGeneratingId(null);
    }
  };
  const handleGenerateAll = async () => {
    setAutoGeneratingAll(true);
    const pending = entries.filter((e) => !e.report);
    for (const entry of pending) {
      try {
        const report = await generateAutoReport(entry.clientId);
        setEntries(
          (prev) => prev.map(
            (e) => e.clientId === entry.clientId ? { ...e, report, status: "ready" } : e
          )
        );
      } catch {
      }
    }
    setAutoGeneratingAll(false);
    ue.success("All reports generated", {
      description: "Review and send each report to your clients."
    });
  };
  const handleSend = async (entry) => {
    if (!entry.report) return;
    setSendingId(entry.clientId);
    try {
      await markReportSent(entry.report.reportId);
      setEntries(
        (prev) => prev.map(
          (e) => e.clientId === entry.clientId ? { ...e, status: "sent" } : e
        )
      );
      setSentIds((prev) => new Set(prev).add(entry.clientId.toString()));
      ue.success(`Report sent to ${entry.clientName}`, {
        description: "Client will receive the monthly performance report.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success" }),
        duration: 5e3
      });
    } finally {
      setSendingId(null);
    }
  };
  const handleDownload = async (entry) => {
    const { default: jsPDF } = await __vitePreload(async () => {
      const { default: jsPDF2 } = await import("./jspdf.es.min-DtXcvIPA.js").then((n) => n.j);
      return { default: jsPDF2 };
    }, true ? __vite__mapDeps([0,1,2]) : void 0);
    const doc = new jsPDF();
    const r = entry.report;
    doc.setFontSize(20);
    doc.setTextColor(80, 50, 200);
    doc.text("GrowthOS Agency — Monthly Report", 20, 20);
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 30);
    doc.text(entry.clientName, 20, 32);
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Period: ${r.reportPeriod}`, 20, 42);
    doc.text(`Top Channel: ${r.topChannel}`, 20, 50);
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    doc.text("Key Metrics", 20, 64);
    doc.setFontSize(11);
    const metrics = [
      `Leads Generated: ${r.leadsGenerated}`,
      `Conversions: ${r.conversions}`,
      `Revenue Impact: ${fmt(r.revenueImpact)}`,
      `ROI: ${r.roi}%`
    ];
    metrics.forEach((m, i) => doc.text(m, 24, 74 + i * 8));
    doc.setFontSize(12);
    doc.text("Next Steps", 20, 114);
    doc.setFontSize(10);
    r.nextSteps.slice(0, 3).forEach((s, i) => {
      const lines = doc.splitTextToSize(`${i + 1}. ${s}`, 170);
      doc.text(lines, 24, 124 + i * 12);
    });
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Powered by GrowthOS · Based on publicly available data & heuristics",
      20,
      280
    );
    doc.save(
      `GrowthOS_Report_${entry.clientName.replace(/\s+/g, "_")}_${r.reportPeriod.replace(/\s+/g, "_")}.pdf`
    );
    ue.success("PDF downloaded");
  };
  const toggleAutoSend = (clientId) => {
    setEntries(
      (prev) => prev.map(
        (e) => e.clientId === clientId ? { ...e, autoSendEnabled: !e.autoSendEnabled } : e
      )
    );
  };
  const readyCount = entries.filter((e) => e.status === "ready").length;
  const sentCount = entries.filter((e) => e.status === "sent").length;
  const pendingCount = entries.filter((e) => !e.report).length;
  const STATS = [
    {
      label: "Reports Ready",
      value: String(readyCount),
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      label: "Sent to Clients",
      value: String(sentCount),
      icon: Send,
      color: "text-success",
      bg: "bg-success/10"
    },
    {
      label: "Pending Generation",
      value: String(pendingCount),
      icon: Sparkles,
      color: "text-warning",
      bg: "bg-warning/10"
    },
    {
      label: "Auto-Schedule ON",
      value: String(entries.filter((e) => e.autoSendEnabled).length),
      icon: Calendar,
      color: "text-accent",
      bg: "bg-accent/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground tracking-tight", children: "Auto Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Monthly performance reports for your clients" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card",
            "data-ocid": "reports.schedule_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "Schedule Monthly" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: scheduleEnabled,
                  onCheckedChange: setScheduleEnabled,
                  "data-ocid": "reports.schedule_switch"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "client-report", requiredPlan: "growth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            className: "btn-primary-glow gap-1.5",
            onClick: handleGenerateAll,
            disabled: autoGeneratingAll || pendingCount === 0,
            "data-ocid": "reports.generate_all_button",
            children: autoGeneratingAll ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }),
              "Generating All…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
              "Auto-Generate All"
            ] })
          }
        ) })
      ] })
    ] }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground tabular-nums leading-tight", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: stat.label })
          ] })
        ] }) })
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-foreground font-display", children: "Client Reports — May 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] text-muted-foreground",
            children: [
              entries.length,
              " clients"
            ]
          }
        )
      ] }),
      entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 text-center",
          "data-ocid": "reports.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "No clients yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Add clients to start generating reports" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "reports.client.list", children: entries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ClientReportRow,
        {
          entry,
          index: i,
          isExpanded: expandedId === entry.clientId,
          onToggleExpand: () => setExpandedId(
            (prev) => prev === entry.clientId ? null : entry.clientId
          ),
          onGenerate: () => handleGenerate(entry.clientId),
          isGenerating: generatingId === entry.clientId,
          onSend: () => handleSend(entry),
          isSending: sendingId === entry.clientId,
          justSent: sentIds.has(entry.clientId.toString()),
          onDownload: () => handleDownload(entry),
          onAutoToggle: () => toggleAutoSend(entry.clientId)
        },
        entry.clientId.toString()
      )) })
    ] }),
    scheduleEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        "data-ocid": "reports.schedule.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Monthly Auto-Send Scheduled" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "Next auto-send:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "June 1, 2026" }),
                " ",
                "·",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success font-medium", children: [
                  entries.filter((e) => e.autoSendEnabled).length,
                  " clients"
                ] }),
                " ",
                "will receive reports automatically"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessCheckmark, {}, "schedule-check") })
        ] }) })
      }
    )
  ] });
}
export {
  ReportsPage as default
};
