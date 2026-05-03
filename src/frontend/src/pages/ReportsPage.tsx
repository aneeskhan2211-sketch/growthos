import { PaywallTrigger } from "@/components/PaywallTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAutoAgency } from "@/hooks/useAutoAgency";
import { useClients } from "@/hooks/useClients";
import type { AutoReport, AutoReportStatus } from "@/types/auto-agency";
import {
  BarChart2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Loader2,
  Rocket,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ClientReportEntry {
  clientId: bigint;
  clientName: string;
  period: string;
  status: AutoReportStatus;
  report: AutoReport | null;
  autoSendEnabled: boolean;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: bigint): string {
  const num = Number(n);
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}k`;
  return `₹${num.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: AutoReportStatus }) {
  const map: Record<AutoReportStatus, { label: string; cls: string }> = {
    draft: {
      label: "Draft",
      cls: "bg-muted/40 text-muted-foreground border-border",
    },
    ready: {
      label: "Ready",
      cls: "bg-primary/10 text-primary border-primary/20",
    },
    sent: {
      label: "Sent",
      cls: "bg-success/10 text-success border-success/20",
    },
  };
  const v = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${v.cls}`}
    >
      {v.label}
    </span>
  );
}

// ─── Report Bar Chart ──────────────────────────────────────────────────────────

const CHART_DATA = [
  { month: "Jan", leads: 28, conversions: 5 },
  { month: "Feb", leads: 34, conversions: 6 },
  { month: "Mar", leads: 39, conversions: 7 },
  { month: "Apr", leads: 47, conversions: 8 },
  { month: "May", leads: 52, conversions: 10 },
];

function ReportBarChart() {
  return (
    <div className="h-36 rounded-xl border border-border bg-muted/20 p-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={CHART_DATA} barSize={10} barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(var(--border))"
            opacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              borderRadius: 8,
              fontSize: 11,
            }}
          />
          <Bar
            dataKey="leads"
            name="Leads"
            fill="oklch(var(--primary))"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            dataKey="conversions"
            name="Conversions"
            fill="oklch(var(--success))"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Success Checkmark ─────────────────────────────────────────────────────────

function SuccessCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-success/10 border border-success/30 shrink-0"
    >
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        <CheckCircle2 className="w-4 h-4 text-success" />
      </motion.div>
    </motion.div>
  );
}

// ─── Expanded Report Preview ───────────────────────────────────────────────────

function ReportPreviewExpanded({
  entry,
  onSend,
  onDownload,
  isSending,
  justSent,
}: {
  entry: ClientReportEntry;
  onSend: () => void;
  onDownload: () => void;
  isSending: boolean;
  justSent: boolean;
}) {
  const r = entry.report!;
  const kpis = [
    {
      label: "Leads Generated",
      value: String(r.leadsGenerated),
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Conversions",
      value: String(r.conversions),
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Revenue Impact",
      value: fmt(r.revenueImpact),
      icon: Zap,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "ROI",
      value: `${r.roi}%`,
      icon: BarChart2,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden"
    >
      <div className="border-t border-border/60 mt-2 pt-4 px-1 pb-1">
        {/* Report header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Rocket className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                GrowthOS Agency
              </p>
              <p className="text-xs font-bold text-foreground">
                {entry.clientName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">Monthly Report</p>
            <p className="text-xs font-semibold text-foreground">
              {r.reportPeriod}
            </p>
          </div>
        </div>

        {/* Top channel badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
          <Sparkles className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-semibold text-accent">
            Top Channel: {r.topChannel}
          </span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-card"
            >
              <div
                className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`}
              >
                <kpi.icon className={`w-3 h-3 ${kpi.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground tabular-nums leading-tight">
                  {kpi.value}
                </p>
                <p className="text-[9px] text-muted-foreground truncate">
                  {kpi.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-muted-foreground" />
            5-Month Performance Trend
          </p>
          <ReportBarChart />
        </div>

        {/* Next steps */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            Recommended Next Steps
          </p>
          <ul className="space-y-1.5">
            {r.nextSteps.slice(0, 3).map((step, i) => (
              <li key={step} className="flex items-start gap-2 text-xs">
                <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-border/60">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8 gap-1.5"
            onClick={onDownload}
            data-ocid="reports.preview.download_button"
          >
            <Download className="w-3 h-3" />
            Download PDF
          </Button>

          <PaywallTrigger feature="client-report" requiredPlan="growth">
            <Button
              type="button"
              size="sm"
              className="flex-1 btn-primary-glow text-xs h-8 gap-1.5"
              onClick={onSend}
              disabled={isSending || justSent || entry.status === "sent"}
              data-ocid="reports.preview.send_button"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Sending…
                </>
              ) : justSent || entry.status === "sent" ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-success" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  Send to Client
                </>
              )}
            </Button>
          </PaywallTrigger>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Client Report Row ─────────────────────────────────────────────────────────

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
  onAutoToggle,
}: {
  entry: ClientReportEntry;
  index: number;
  onToggleExpand: () => void;
  isExpanded: boolean;
  onGenerate: () => void;
  isGenerating: boolean;
  onSend: () => void;
  isSending: boolean;
  justSent: boolean;
  onDownload: () => void;
  onAutoToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      data-ocid={`reports.client.item.${index + 1}`}
    >
      <Card className="overflow-hidden transition-smooth hover:shadow-elevated">
        {/* Row header */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-foreground truncate">
                {entry.clientName}
              </p>
              <StatusBadge status={entry.status} />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {entry.period}
            </p>
          </div>

          {/* Metrics snapshot (desktop) */}
          {entry.report && (
            <div className="hidden md:flex items-center gap-5 shrink-0">
              <div className="text-center">
                <p className="text-sm font-bold text-primary tabular-nums">
                  {String(entry.report.leadsGenerated)}
                </p>
                <p className="text-[10px] text-muted-foreground">Leads</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-success tabular-nums">
                  {String(entry.report.conversions)}
                </p>
                <p className="text-[10px] text-muted-foreground">Converts</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-accent tabular-nums">
                  {fmt(entry.report.revenueImpact)}
                </p>
                <p className="text-[10px] text-muted-foreground">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-warning tabular-nums">
                  {String(entry.report.roi)}%
                </p>
                <p className="text-[10px] text-muted-foreground">ROI</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            {entry.report ? (
              <button
                type="button"
                onClick={onToggleExpand}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/40"
                data-ocid={`reports.client.expand.${index + 1}`}
              >
                {isExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">Preview</span>
              </button>
            ) : (
              <PaywallTrigger feature="client-report" requiredPlan="growth">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="text-xs h-7 gap-1"
                  onClick={onGenerate}
                  disabled={isGenerating}
                  data-ocid={`reports.client.generate.${index + 1}`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3" />
                      Generate
                    </>
                  )}
                </Button>
              </PaywallTrigger>
            )}
          </div>
        </div>

        {/* Expanded preview */}
        <AnimatePresence>
          {isExpanded && entry.report && (
            <ReportPreviewExpanded
              entry={entry}
              onSend={onSend}
              onDownload={onDownload}
              isSending={isSending}
              justSent={justSent}
            />
          )}
        </AnimatePresence>

        {/* Auto-send footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/40 bg-muted/10">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">
              {entry.autoSendEnabled
                ? "Auto-send on: June 1, 2026"
                : "Auto monthly send: off"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">
              Monthly auto
            </span>
            <Switch
              checked={entry.autoSendEnabled}
              onCheckedChange={onAutoToggle}
              data-ocid={`reports.client.auto_toggle.${index + 1}`}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const INITIAL_ENTRIES = (
  clients: { id: bigint; businessName: string }[],
): ClientReportEntry[] => {
  const statuses: AutoReportStatus[] = [
    "sent",
    "ready",
    "draft",
    "sent",
    "draft",
    "ready",
  ];
  return clients.slice(0, 6).map((c, i) => ({
    clientId: c.id,
    clientName: c.businessName,
    period: "May 2026",
    status: statuses[i] ?? "draft",
    report: null,
    autoSendEnabled: i < 2,
  }));
};

export default function ReportsPage() {
  const { data: clients = [] } = useClients();
  const { generateAutoReport, markReportSent } = useAutoAgency();

  const [entries, setEntries] = useState<ClientReportEntry[]>([]);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const [generatingId, setGeneratingId] = useState<bigint | null>(null);
  const [sendingId, setSendingId] = useState<bigint | null>(null);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [autoGeneratingAll, setAutoGeneratingAll] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(true);
  const initRef = useRef(false);

  // Seed entries from clients once
  useEffect(() => {
    if (!initRef.current && clients.length > 0) {
      initRef.current = true;
      setEntries(INITIAL_ENTRIES(clients));
    }
  }, [clients]);

  const handleGenerate = async (clientId: bigint) => {
    setGeneratingId(clientId);
    try {
      const report = await generateAutoReport(clientId);
      setEntries((prev) =>
        prev.map((e) =>
          e.clientId === clientId ? { ...e, report, status: "ready" } : e,
        ),
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
        setEntries((prev) =>
          prev.map((e) =>
            e.clientId === entry.clientId
              ? { ...e, report, status: "ready" }
              : e,
          ),
        );
      } catch {
        // continue others
      }
    }
    setAutoGeneratingAll(false);
    toast.success("All reports generated", {
      description: "Review and send each report to your clients.",
    });
  };

  const handleSend = async (entry: ClientReportEntry) => {
    if (!entry.report) return;
    setSendingId(entry.clientId);
    try {
      await markReportSent(entry.report.reportId);
      setEntries((prev) =>
        prev.map((e) =>
          e.clientId === entry.clientId ? { ...e, status: "sent" } : e,
        ),
      );
      setSentIds((prev) => new Set(prev).add(entry.clientId.toString()));
      toast.success(`Report sent to ${entry.clientName}`, {
        description: "Client will receive the monthly performance report.",
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        duration: 5000,
      });
    } finally {
      setSendingId(null);
    }
  };

  const handleDownload = async (entry: ClientReportEntry) => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const r = entry.report!;

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
      `ROI: ${r.roi}%`,
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
      280,
    );

    doc.save(
      `GrowthOS_Report_${entry.clientName.replace(/\s+/g, "_")}_${r.reportPeriod.replace(/\s+/g, "_")}.pdf`,
    );
    toast.success("PDF downloaded");
  };

  const toggleAutoSend = (clientId: bigint) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.clientId === clientId
          ? { ...e, autoSendEnabled: !e.autoSendEnabled }
          : e,
      ),
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
      bg: "bg-primary/10",
    },
    {
      label: "Sent to Clients",
      value: String(sentCount),
      icon: Send,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Pending Generation",
      value: String(pendingCount),
      icon: Sparkles,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Auto-Schedule ON",
      value: String(entries.filter((e) => e.autoSendEnabled).length),
      icon: Calendar,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div data-ocid="reports.page">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Auto Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monthly performance reports for your clients
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Schedule toggle */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card"
            data-ocid="reports.schedule_toggle"
          >
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">
              Schedule Monthly
            </span>
            <Switch
              checked={scheduleEnabled}
              onCheckedChange={setScheduleEnabled}
              data-ocid="reports.schedule_switch"
            />
          </div>

          {/* Auto-generate all */}
          <PaywallTrigger feature="client-report" requiredPlan="growth">
            <Button
              type="button"
              size="sm"
              className="btn-primary-glow gap-1.5"
              onClick={handleGenerateAll}
              disabled={autoGeneratingAll || pendingCount === 0}
              data-ocid="reports.generate_all_button"
            >
              {autoGeneratingAll ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Generating All…
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-Generate All
                </>
              )}
            </Button>
          </PaywallTrigger>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            data-ocid={`reports.stat.${i + 1}`}
          >
            <Card className="p-4 hover-lift shadow-card">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}
                >
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground tabular-nums leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ── Client Reports List ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground font-display">
            Client Reports — May 2026
          </h2>
          <Badge
            variant="outline"
            className="text-[10px] text-muted-foreground"
          >
            {entries.length} clients
          </Badge>
        </div>

        {entries.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="reports.empty_state"
          >
            <div className="w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center mb-3">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1">
              No clients yet
            </p>
            <p className="text-xs text-muted-foreground">
              Add clients to start generating reports
            </p>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="reports.client.list">
            {entries.map((entry, i) => (
              <ClientReportRow
                key={entry.clientId.toString()}
                entry={entry}
                index={i}
                isExpanded={expandedId === entry.clientId}
                onToggleExpand={() =>
                  setExpandedId((prev) =>
                    prev === entry.clientId ? null : entry.clientId,
                  )
                }
                onGenerate={() => handleGenerate(entry.clientId)}
                isGenerating={generatingId === entry.clientId}
                onSend={() => handleSend(entry)}
                isSending={sendingId === entry.clientId}
                justSent={sentIds.has(entry.clientId.toString())}
                onDownload={() => handleDownload(entry)}
                onAutoToggle={() => toggleAutoSend(entry.clientId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Monthly Schedule Banner ── */}
      {scheduleEnabled && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          data-ocid="reports.schedule.section"
        >
          <Card className="p-5 border-primary/20 bg-primary/5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Monthly Auto-Send Scheduled
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Next auto-send:{" "}
                    <span className="text-foreground font-medium">
                      June 1, 2026
                    </span>{" "}
                    ·{" "}
                    <span className="text-success font-medium">
                      {entries.filter((e) => e.autoSendEnabled).length} clients
                    </span>{" "}
                    will receive reports automatically
                  </p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <SuccessCheckmark key="schedule-check" />
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
