import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  LayoutTemplate,
  Link2,
  MailOpen,
  Rocket,
  Send,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ReportStatus = "Generated" | "Sent" | "Viewed" | "Pending";

interface ClientReport {
  id: string;
  clientName: string;
  reportMonth: string;
  status: ReportStatus;
  leadsGrowth: number;
  trafficGrowth: number;
  roi: number;
  leadsGenerated: number;
  conversionRate: number;
  revenueImpact: string;
}

interface ScheduledReport {
  id: string;
  clientName: string;
  scheduledDate: string;
  format: "PDF" | "Email" | "Both";
  autoEnabled: boolean;
}

interface ReportTemplate {
  id: string;
  name: string;
  sections: number;
  description: string;
  badge?: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const CLIENT_REPORTS: ClientReport[] = [
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
    revenueImpact: "₹28,500",
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
    revenueImpact: "₹42,000",
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
    revenueImpact: "₹19,800",
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
    revenueImpact: "₹55,000",
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
    revenueImpact: "₹12,400",
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
    revenueImpact: "₹17,200",
  },
];

const TRAFFIC_TREND = [
  { week: "W1", visits: 1240 },
  { week: "W2", visits: 1680 },
  { week: "W3", visits: 2100 },
  { week: "W4", visits: 2480 },
];

const SCHEDULED_REPORTS: ScheduledReport[] = [
  {
    id: "sr1",
    clientName: "Sunrise Salon & Spa",
    scheduledDate: "May 1, 2026",
    format: "Both",
    autoEnabled: true,
  },
  {
    id: "sr2",
    clientName: "FitZone Gym & Wellness",
    scheduledDate: "May 1, 2026",
    format: "PDF",
    autoEnabled: true,
  },
  {
    id: "sr3",
    clientName: "TechEdge IT Solutions",
    scheduledDate: "May 3, 2026",
    format: "Email",
    autoEnabled: false,
  },
];

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "t1",
    name: "Standard Monthly",
    sections: 8,
    description:
      "Full breakdown — traffic, leads, campaigns, SEO, social, revenue, next steps, and executive summary.",
    badge: "Most Used",
  },
  {
    id: "t2",
    name: "Executive Summary",
    sections: 4,
    description:
      "Single-page overview for busy clients — key KPIs, wins, and next month action plan only.",
  },
  {
    id: "t3",
    name: "Custom",
    sections: 0,
    description:
      "Pick exactly which sections to include. Ideal for niche reporting or specific campaign focus.",
    badge: "Flexible",
  },
];

const SECTION_OPTIONS = [
  "Traffic Analysis",
  "Lead Generation",
  "Campaign Performance",
  "SEO Ranking",
  "Social Media",
  "Revenue Impact",
  "Next Steps",
];

const SERVICES_DELIVERED = [
  "Google Ads — 3 campaigns launched, ₹18k spend, 2.4x ROAS",
  "SEO — 12 pages optimized, 8 new keywords ranking page 1",
  "Social Media — 24 posts published, +340 followers",
  "Email — 4 campaigns sent, 38% avg open rate",
  "WhatsApp — 120 leads contacted, 31 replies received",
];

const NEXT_MONTH_PLAN = [
  "Scale Google Ads budget to ₹25k with new creative variants",
  "Publish 4 blog posts targeting local keywords (Mumbai + service)",
  "Launch Instagram Reels campaign for product showcasing",
  "Set up automated review collection via WhatsApp",
  "Build a lead magnet landing page for free consultation",
];

// ─── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ReportStatus }) {
  const variants: Record<ReportStatus, string> = {
    Generated: "bg-primary/10 text-primary border-primary/20",
    Sent: "bg-success/10 text-success border-success/20",
    Viewed: "bg-accent/10 text-accent border-accent/20",
    Pending: "bg-muted/30 text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${variants[status]}`}
    >
      {status === "Viewed" && <Eye className="w-2.5 h-2.5" />}
      {status === "Sent" && <Send className="w-2.5 h-2.5" />}
      {status === "Generated" && <FileText className="w-2.5 h-2.5" />}
      {status}
    </span>
  );
}

// ─── Report Preview Modal ──────────────────────────────────────────────────────

function ReportPreviewModal({
  report,
  onClose,
}: {
  report: ClientReport | null;
  onClose: () => void;
}) {
  if (!report) return null;
  return (
    <Dialog open={!!report} onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-thin"
        data-ocid="reports.preview.dialog"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">Report Preview</DialogTitle>
        </DialogHeader>

        {/* Report Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                GrowthOS Agency
              </p>
              <p className="text-sm font-bold text-foreground">
                {report.clientName}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Monthly Report</p>
            <p className="text-sm font-semibold text-foreground">
              {report.reportMonth}
            </p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Executive Summary
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {report.clientName} had an excellent month in {report.reportMonth}.
            Organic traffic grew by{" "}
            <span className="text-foreground font-semibold">
              {report.trafficGrowth}%
            </span>
            , generating{" "}
            <span className="text-foreground font-semibold">
              {report.leadsGenerated} qualified leads
            </span>{" "}
            through SEO, paid campaigns, and social media. Revenue impact
            reached{" "}
            <span className="text-foreground font-semibold">
              {report.revenueImpact}
            </span>{" "}
            at a{" "}
            <span className="text-foreground font-semibold">
              {report.roi / 100}x ROI
            </span>
            . Conversion rate improved to{" "}
            <span className="text-foreground font-semibold">
              {report.conversionRate}%
            </span>
            , above the industry benchmark of 2.8%.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            {
              label: "Leads Generated",
              value: String(report.leadsGenerated),
              icon: Users,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: "Traffic Growth",
              value: `+${report.trafficGrowth}%`,
              icon: TrendingUp,
              color: "text-success",
              bg: "bg-success/10",
            },
            {
              label: "Conversion Rate",
              value: `${report.conversionRate}%`,
              icon: Zap,
              color: "text-warning",
              bg: "bg-warning/10",
            },
            {
              label: "Revenue Impact",
              value: report.revenueImpact,
              icon: Star,
              color: "text-accent",
              bg: "bg-accent/10",
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
            >
              <div
                className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`}
              >
                <kpi.icon className={`w-3.5 h-3.5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  {kpi.value}
                </p>
                <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Traffic Trend Chart */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Monthly Traffic Trend
          </h3>
          <div className="h-40 rounded-xl border border-border bg-muted/20 p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TRAFFIC_TREND}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "oklch(var(--muted-foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="oklch(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "oklch(var(--primary))" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Services Delivered */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Services Delivered
          </h3>
          <ul className="space-y-1.5">
            {SERVICES_DELIVERED.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Month Action Plan */}
        <div className="mt-5">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Next Month Action Plan
          </h3>
          <ul className="space-y-1.5">
            {NEXT_MONTH_PLAN.map((item, i) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Motivational Close */}
        <div className="mt-5 p-4 rounded-xl gradient-hero border border-primary/15">
          <p className="text-sm font-semibold text-foreground mb-0.5 flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-primary" />
            Your business is growing — here&apos;s what we&apos;re doing next
            month
          </p>
          <p className="text-xs text-muted-foreground">
            Based on this month&apos;s results, we&apos;re increasing ad spend,
            doubling down on SEO, and launching a referral campaign to
            accelerate your pipeline heading into May.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <p className="text-[10px] text-muted-foreground">
            Powered by GrowthOS · Based on publicly available data & heuristics
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="text-xs h-7"
              data-ocid="reports.preview.share_button"
            >
              <Link2 className="w-3 h-3 mr-1" />
              Share Link
            </Button>
            <Button
              type="button"
              size="sm"
              className="btn-primary-glow text-xs h-7"
              data-ocid="reports.preview.download_button"
            >
              <Download className="w-3 h-3 mr-1" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Generator Modal ───────────────────────────────────────────────────────────

function GeneratorModal({ onClose }: { onClose: () => void }) {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSections, setSelectedSections] =
    useState<string[]>(SECTION_OPTIONS);

  const toggleSection = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-ocid="reports.generator.dialog">
        <DialogHeader>
          <DialogTitle className="text-base font-bold font-display flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Generate Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Client */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Select Client
            </Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger
                className="h-9 text-sm"
                data-ocid="reports.generator.client_select"
              >
                <SelectValue placeholder="Choose a client…" />
              </SelectTrigger>
              <SelectContent>
                {CLIENT_REPORTS.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.clientName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Month */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Report Month
            </Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger
                className="h-9 text-sm"
                data-ocid="reports.generator.month_select"
              >
                <SelectValue placeholder="Select month…" />
              </SelectTrigger>
              <SelectContent>
                {["April 2026", "March 2026", "February 2026"].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sections */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Include Sections
            </Label>
            <div className="space-y-2">
              {SECTION_OPTIONS.map((section) => (
                <div
                  key={section}
                  className="flex items-center gap-2.5"
                  data-ocid={`reports.generator.section.${section.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  <Checkbox
                    id={`section-${section}`}
                    checked={selectedSections.includes(section)}
                    onCheckedChange={() => toggleSection(section)}
                  />
                  <Label
                    htmlFor={`section-${section}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {section}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            className="flex-1 text-sm h-9"
            onClick={onClose}
            data-ocid="reports.generator.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1 text-sm h-9"
            disabled={!selectedClient || !selectedMonth}
            data-ocid="reports.generator.preview_button"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Preview
          </Button>
          <Button
            type="button"
            className="flex-1 btn-primary-glow text-sm h-9"
            disabled={!selectedClient || !selectedMonth}
            data-ocid="reports.generator.submit_button"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Generate &amp; Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const [previewReport, setPreviewReport] = useState<ClientReport | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("t1");
  const [scheduledReports, setScheduledReports] =
    useState<ScheduledReport[]>(SCHEDULED_REPORTS);

  const toggleAutoReport = (id: string) => {
    setScheduledReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, autoEnabled: !r.autoEnabled } : r,
      ),
    );
  };

  const STATS = [
    {
      label: "Generated This Month",
      value: "12",
      icon: FileText,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Avg Open Rate",
      value: "78%",
      icon: MailOpen,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Client Satisfaction",
      value: "4.7/5",
      icon: Star,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      label: "Reports Shared",
      value: "9",
      icon: Share2,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div data-ocid="reports.page">
      {/* Header */}
      <PageHeader
        title="Reports"
        description="Monthly performance reports for all your clients"
        actions={
          <Button
            type="button"
            size="sm"
            className="btn-primary-glow"
            onClick={() => setShowGenerator(true)}
            data-ocid="reports.generate_button"
          >
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Generate Report
          </Button>
        }
      />

      {/* Stats Row */}
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
                  <p className="text-xl font-bold text-foreground tabular-nums leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Client Report List */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground font-display">
            Client Reports — April 2026
          </h2>
          <Badge
            variant="outline"
            className="text-[10px] text-muted-foreground"
          >
            6 clients
          </Badge>
        </div>

        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {CLIENT_REPORTS.map((report, i) => (
            <motion.div
              key={report.id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
              data-ocid={`reports.client.item.${i + 1}`}
            >
              <Card className="p-4 transition-smooth hover:shadow-elevated">
                <div className="flex items-center gap-4">
                  {/* Client Info */}
                  <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {report.clientName}
                      </p>
                      <StatusBadge status={report.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {report.reportMonth}
                    </p>
                  </div>

                  {/* Metrics Snapshot */}
                  <div className="hidden md:flex items-center gap-5 shrink-0">
                    <div className="text-center">
                      <p className="text-sm font-bold text-success tabular-nums">
                        +{report.leadsGrowth}%
                      </p>
                      <p className="text-[10px] text-muted-foreground">Leads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-primary tabular-nums">
                        +{report.trafficGrowth}%
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Traffic
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-accent tabular-nums">
                        {report.roi / 100}x
                      </p>
                      <p className="text-[10px] text-muted-foreground">ROI</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 px-2.5 gap-1"
                      onClick={() => setPreviewReport(report)}
                      data-ocid={`reports.client.view.${i + 1}`}
                    >
                      <Eye className="w-3 h-3" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 px-2.5 gap-1"
                      data-ocid={`reports.client.share.${i + 1}`}
                    >
                      <Link2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="text-xs h-7 px-2.5 gap-1"
                      data-ocid={`reports.client.download.${i + 1}`}
                    >
                      <Download className="w-3 h-3" />
                      <span className="hidden sm:inline">PDF</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Grid: Templates + Scheduled */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Report Templates */}
        <div data-ocid="reports.templates.section">
          <div className="flex items-center gap-2 mb-4">
            <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-bold text-foreground font-display">
              Report Templates
            </h2>
          </div>
          <div className="space-y-3">
            {REPORT_TEMPLATES.map((tmpl) => (
              <motion.div
                key={tmpl.id}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
                data-ocid={`reports.template.${tmpl.id}`}
              >
                <Card
                  className={`p-4 cursor-pointer transition-smooth ${
                    selectedTemplate === tmpl.id
                      ? "border-primary/40 bg-primary/5 shadow-card"
                      : "hover:border-border/80 hover:shadow-card"
                  }`}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-foreground">
                          {tmpl.name}
                        </p>
                        {tmpl.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                            {tmpl.badge}
                          </span>
                        )}
                        {tmpl.sections > 0 && (
                          <span className="text-[10px] text-muted-foreground">
                            {tmpl.sections} sections
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {tmpl.description}
                      </p>
                    </div>
                    {selectedTemplate === tmpl.id && (
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div data-ocid="reports.scheduled.section">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-bold text-foreground font-display">
              Scheduled Auto-Reports
            </h2>
          </div>
          <div className="space-y-3">
            {scheduledReports.map((sr, i) => (
              <Card
                key={sr.id}
                className="p-4"
                data-ocid={`reports.scheduled.item.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {sr.clientName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground">
                        {sr.scheduledDate}
                      </p>
                      <span className="text-[10px] font-semibold px-1.5 py-0 rounded-full bg-muted/40 text-muted-foreground border border-border">
                        {sr.format}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">Auto</span>
                    <Switch
                      checked={sr.autoEnabled}
                      onCheckedChange={() => toggleAutoReport(sr.id)}
                      data-ocid={`reports.scheduled.toggle.${i + 1}`}
                    />
                  </div>
                </div>
              </Card>
            ))}

            <div className="p-4 rounded-xl border border-dashed border-border/60 flex items-center justify-between bg-muted/10">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Enable for more clients
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Auto-generate reports on the 1st of every month
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="text-xs h-7 shrink-0"
                data-ocid="reports.scheduled.add_button"
              >
                <ArrowUpRight className="w-3 h-3 mr-1" />
                Set Up
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {previewReport && (
          <ReportPreviewModal
            report={previewReport}
            onClose={() => setPreviewReport(null)}
          />
        )}
        {showGenerator && (
          <GeneratorModal onClose={() => setShowGenerator(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
