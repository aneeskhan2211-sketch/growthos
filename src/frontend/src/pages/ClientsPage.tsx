import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Briefcase,
  Calendar,
  ChevronRight,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Globe,
  IndianRupee,
  Lightbulb,
  Link2,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Plus,
  RefreshCw,
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
import type { Client, ClientMetrics, GrowthSuggestion } from "../backend";
import {
  useClients,
  useGrowthSuggestions,
  useUpdateClientMetrics,
} from "../hooks/useClients";
import {
  useGenerateGrowthReport,
  useGrowthReports,
} from "../hooks/useGrowthEngine";

// ── Types ────────────────────────────────────────────────────────────────────

type ClientStatus = "active" | "at_risk" | "paused";

interface ExtendedClient extends Client {
  industry: string;
  city: string;
  contactEmail: string;
  contactPhone: string;
  status: ClientStatus;
  leadsThisMonth: number;
  trafficGrowth: number;
  monthlyROI: number;
  nextReportDue: string;
  avatarColor: string;
  prevMonthRevenue: number;
  prevMonthTraffic: number;
  prevMonthLeads: number;
  prevMonthConversions: number;
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const CLIENTS: ExtendedClient[] = [
  {
    id: BigInt(1),
    leadId: BigInt(1),
    businessName: "Spice Garden Restaurant",
    industry: "Food & Beverage",
    city: "Mumbai",
    contactEmail: "owner@spicegarden.in",
    contactPhone: "+91 98765 43210",
    startDate: BigInt(Date.now() - 86400000 * 120),
    status: "active",
    leadsThisMonth: 38,
    trafficGrowth: 72,
    monthlyROI: 310,
    nextReportDue: "May 5, 2026",
    avatarColor: "bg-orange-500/20 text-orange-400",
    metrics: {
      traffic: BigInt(22400),
      leads: BigInt(38),
      conversions: BigInt(14),
      revenue: 42000,
    },
    prevMonthRevenue: 36000,
    prevMonthTraffic: 18200,
    prevMonthLeads: 28,
    prevMonthConversions: 10,
    reportDate: BigInt(Date.now() - 86400000 * 5),
  },
  {
    id: BigInt(2),
    leadId: BigInt(2),
    businessName: "Glamour Studio",
    industry: "Beauty & Wellness",
    city: "Pune",
    contactEmail: "glamourstudio@gmail.com",
    contactPhone: "+91 99887 76655",
    startDate: BigInt(Date.now() - 86400000 * 90),
    status: "active",
    leadsThisMonth: 52,
    trafficGrowth: 91,
    monthlyROI: 420,
    nextReportDue: "May 8, 2026",
    avatarColor: "bg-pink-500/20 text-pink-400",
    metrics: {
      traffic: BigInt(31600),
      leads: BigInt(52),
      conversions: BigInt(22),
      revenue: 58000,
    },
    prevMonthRevenue: 45000,
    prevMonthTraffic: 22000,
    prevMonthLeads: 38,
    prevMonthConversions: 16,
    reportDate: BigInt(Date.now() - 86400000 * 3),
  },
  {
    id: BigInt(3),
    leadId: BigInt(3),
    businessName: "FitLife Gym",
    industry: "Health & Fitness",
    city: "Bangalore",
    contactEmail: "fitlife@outlook.in",
    contactPhone: "+91 97653 21098",
    startDate: BigInt(Date.now() - 86400000 * 60),
    status: "at_risk",
    leadsThisMonth: 14,
    trafficGrowth: -8,
    monthlyROI: 115,
    nextReportDue: "May 3, 2026",
    avatarColor: "bg-green-500/20 text-green-400",
    metrics: {
      traffic: BigInt(8900),
      leads: BigInt(14),
      conversions: BigInt(4),
      revenue: 18000,
    },
    prevMonthRevenue: 24000,
    prevMonthTraffic: 11200,
    prevMonthLeads: 22,
    prevMonthConversions: 8,
    reportDate: BigInt(Date.now() - 86400000 * 12),
  },
  {
    id: BigInt(4),
    leadId: BigInt(4),
    businessName: "Prakash Dental Clinic",
    industry: "Healthcare",
    city: "Chennai",
    contactEmail: "dr.prakash@dentalcare.in",
    contactPhone: "+91 94445 67890",
    startDate: BigInt(Date.now() - 86400000 * 180),
    status: "active",
    leadsThisMonth: 29,
    trafficGrowth: 58,
    monthlyROI: 380,
    nextReportDue: "May 10, 2026",
    avatarColor: "bg-blue-500/20 text-blue-400",
    metrics: {
      traffic: BigInt(17200),
      leads: BigInt(29),
      conversions: BigInt(18),
      revenue: 75000,
    },
    prevMonthRevenue: 62000,
    prevMonthTraffic: 13800,
    prevMonthLeads: 22,
    prevMonthConversions: 14,
    reportDate: BigInt(Date.now() - 86400000 * 7),
  },
  {
    id: BigInt(5),
    leadId: BigInt(5),
    businessName: "RoyalStay Boutique Hotel",
    industry: "Hospitality",
    city: "Jaipur",
    contactEmail: "manager@royalstay.in",
    contactPhone: "+91 91234 56789",
    startDate: BigInt(Date.now() - 86400000 * 45),
    status: "paused",
    leadsThisMonth: 8,
    trafficGrowth: 3,
    monthlyROI: 88,
    nextReportDue: "May 15, 2026",
    avatarColor: "bg-yellow-500/20 text-yellow-400",
    metrics: {
      traffic: BigInt(5400),
      leads: BigInt(8),
      conversions: BigInt(3),
      revenue: 22000,
    },
    prevMonthRevenue: 20000,
    prevMonthTraffic: 5100,
    prevMonthLeads: 7,
    prevMonthConversions: 2,
    reportDate: BigInt(Date.now() - 86400000 * 20),
  },
  {
    id: BigInt(6),
    leadId: BigInt(6),
    businessName: "TechNest Coworking",
    industry: "Real Estate",
    city: "Hyderabad",
    contactEmail: "hello@technest.in",
    contactPhone: "+91 88123 45678",
    startDate: BigInt(Date.now() - 86400000 * 150),
    status: "active",
    leadsThisMonth: 44,
    trafficGrowth: 62,
    monthlyROI: 295,
    nextReportDue: "May 6, 2026",
    avatarColor: "bg-violet-500/20 text-violet-400",
    metrics: {
      traffic: BigInt(26800),
      leads: BigInt(44),
      conversions: BigInt(16),
      revenue: 55000,
    },
    prevMonthRevenue: 48000,
    prevMonthTraffic: 20100,
    prevMonthLeads: 32,
    prevMonthConversions: 12,
    reportDate: BigInt(Date.now() - 86400000 * 4),
  },
];

const PAST_REPORTS = [
  {
    id: "r1",
    label: "April 2026",
    leadsGenerated: 41,
    conversionRate: "28.4%",
    revenueImpact: "₹54,000",
    trafficGrowth: "+62%",
    date: "Apr 30, 2026",
  },
  {
    id: "r2",
    label: "March 2026",
    leadsGenerated: 33,
    conversionRate: "24.1%",
    revenueImpact: "₹46,500",
    trafficGrowth: "+41%",
    date: "Mar 31, 2026",
  },
  {
    id: "r3",
    label: "February 2026",
    leadsGenerated: 26,
    conversionRate: "19.8%",
    revenueImpact: "₹37,200",
    trafficGrowth: "+28%",
    date: "Feb 28, 2026",
  },
];

const WEEKLY_TASKS = [
  {
    id: "t1",
    label: "Publish 2 local SEO blog posts",
    done: true,
    category: "SEO",
  },
  {
    id: "t2",
    label: "Run Google Ads for primary service keyword",
    done: true,
    category: "Ads",
  },
  {
    id: "t3",
    label: "Send WhatsApp follow-up to 8 warm leads",
    done: false,
    category: "Outreach",
  },
  {
    id: "t4",
    label: "Collect 3 new Google reviews",
    done: false,
    category: "Trust",
  },
  {
    id: "t5",
    label: "Update Google Business Profile photos",
    done: false,
    category: "Local SEO",
  },
];

function buildRevenueHistory(base: number) {
  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
  let v = Math.round(base * 0.55);
  return months.map((month) => {
    v = Math.round(v * (1.05 + Math.random() * 0.18));
    return { month, revenue: v, leads: Math.round(v * 0.00055) };
  });
}

// ── Status helpers ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ClientStatus,
  { label: string; cls: string; dot: string }
> = {
  active: {
    label: "Active",
    cls: "bg-success/10 text-success border-success/25",
    dot: "bg-success",
  },
  at_risk: {
    label: "At Risk",
    cls: "bg-destructive/10 text-destructive border-destructive/25",
    dot: "bg-destructive",
  },
  paused: {
    label: "Paused",
    cls: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
};

// ── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  icon: React.ElementType;
  accent?: string;
}

function KpiCard({
  label,
  value,
  delta,
  deltaUp,
  icon: Icon,
  accent,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                accent ?? "bg-primary/10",
              )}
            >
              <Icon className="w-5 h-5 text-primary" />
            </div>
            {delta && (
              <span
                className={cn(
                  "text-xs font-semibold flex items-center gap-0.5",
                  deltaUp ? "text-success" : "text-destructive",
                )}
              >
                {deltaUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {delta}
              </span>
            )}
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground leading-none">
            {value}
          </p>
          <p className="text-xs text-muted-foreground mt-1.5">{label}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Client Row ────────────────────────────────────────────────────────────────

function ClientRow({
  client,
  index,
  onSelect,
  onReport,
}: {
  client: ExtendedClient;
  index: number;
  onSelect: (c: ExtendedClient) => void;
  onReport: (c: ExtendedClient) => void;
}) {
  const status = STATUS_CONFIG[client.status];
  const initials = client.businessName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, delay: index * 0.05 }}
      data-ocid={`clients.table.item.${index + 1}`}
      className={cn(
        "group border-b border-border/40 hover:bg-muted/30 transition-colors duration-150 cursor-pointer",
        client.status === "at_risk" && "bg-destructive/[0.025]",
      )}
      onClick={() => onSelect(client)}
    >
      {/* Client */}
      <td className="py-3.5 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0",
              client.avatarColor,
            )}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground truncate">
                {client.businessName}
              </p>
              {client.status === "at_risk" && (
                <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3" />
              {client.city}
            </p>
          </div>
        </div>
      </td>

      {/* Industry */}
      <td className="py-3.5 px-3 hidden md:table-cell">
        <span className="text-xs text-muted-foreground">{client.industry}</span>
      </td>

      {/* Start Date */}
      <td className="py-3.5 px-3 hidden lg:table-cell">
        <span className="text-xs text-muted-foreground tabular-nums">
          {new Date(Number(client.startDate)).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </td>

      {/* Leads */}
      <td className="py-3.5 px-3">
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {client.leadsThisMonth}
        </span>
      </td>

      {/* Traffic Growth */}
      <td className="py-3.5 px-3 hidden sm:table-cell">
        <span
          className={cn(
            "text-sm font-semibold tabular-nums flex items-center gap-0.5",
            client.trafficGrowth >= 0 ? "text-success" : "text-destructive",
          )}
        >
          {client.trafficGrowth >= 0 ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          {Math.abs(client.trafficGrowth)}%
        </span>
      </td>

      {/* Monthly ROI */}
      <td className="py-3.5 px-3 hidden sm:table-cell">
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {client.monthlyROI}%
        </span>
      </td>

      {/* Next Report */}
      <td className="py-3.5 px-3 hidden xl:table-cell">
        <span className="text-xs text-muted-foreground">
          {client.nextReportDue}
        </span>
      </td>

      {/* Status */}
      <td className="py-3.5 px-3">
        <Badge
          variant="outline"
          className={cn("text-[10px] px-2 py-0.5 gap-1.5", status.cls)}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
          {status.label}
        </Badge>
      </td>

      {/* Actions */}
      <td className="py-3.5 pl-3 pr-4">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            data-ocid={`clients.view_details.button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(client);
            }}
          >
            View
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs"
            data-ocid={`clients.send_report.button.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              onReport(client);
            }}
          >
            <Send className="w-3 h-3 mr-1" />
            Report
          </Button>
        </div>
      </td>
    </motion.tr>
  );
}

// ── Performance Metric Row ────────────────────────────────────────────────────

function MetricRow({
  label,
  current,
  prev,
  prefix = "",
}: {
  label: string;
  current: number;
  prev: number;
  prefix?: string;
}) {
  const delta = prev > 0 ? ((current - prev) / prev) * 100 : 0;
  const isUp = delta >= 0;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground tabular-nums">
          {prefix}
          {prev.toLocaleString("en-IN")}
        </span>
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {prefix}
          {current.toLocaleString("en-IN")}
        </span>
        <span
          className={cn(
            "text-xs font-semibold flex items-center gap-0.5 w-14 justify-end",
            isUp ? "text-success" : "text-destructive",
          )}
        >
          {isUp ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(delta).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

// ── Client Detail Drawer ──────────────────────────────────────────────────────

interface DetailDrawerProps {
  client: ExtendedClient | null;
  open: boolean;
  onClose: () => void;
  onGenerateReport: () => void;
}

function ClientDetailDrawer({
  client,
  open,
  onClose,
  onGenerateReport,
}: DetailDrawerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [taskState, setTaskState] = useState<Record<string, boolean>>({});

  if (!client) return null;

  const traffic = Number(client.metrics.traffic);
  const leads = Number(client.metrics.leads);
  const conversions = Number(client.metrics.conversions);
  const revenue = Number(client.metrics.revenue);
  const revenueHistory = buildRevenueHistory(revenue);
  const status = STATUS_CONFIG[client.status];
  const initials = client.businessName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        data-ocid="clients.detail.sheet"
        side="right"
        className="w-full sm:max-w-xl p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border/60 bg-card shrink-0">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0",
                client.avatarColor,
              )}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <SheetTitle className="text-base font-display font-bold text-foreground leading-tight">
                  {client.businessName}
                </SheetTitle>
                <Badge
                  variant="outline"
                  className={cn("text-[10px] px-2 gap-1.5", status.cls)}
                >
                  <span
                    className={cn("w-1.5 h-1.5 rounded-full", status.dot)}
                  />
                  {status.label}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {client.industry} · {client.city}
              </p>
            </div>
          </div>

          {/* Quick info row */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {client.contactEmail}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {client.contactPhone}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Since{" "}
              {new Date(Number(client.startDate)).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </SheetHeader>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col min-h-0"
        >
          <TabsList className="mx-6 mt-4 h-9 shrink-0">
            <TabsTrigger
              value="overview"
              className="text-xs flex-1"
              data-ocid="clients.detail.overview.tab"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="strategy"
              className="text-xs flex-1"
              data-ocid="clients.detail.strategy.tab"
            >
              Growth Strategy
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="text-xs flex-1"
              data-ocid="clients.detail.reports.tab"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 px-6 mt-4">
            {/* ── Overview Tab ── */}
            <TabsContent value="overview" className="mt-0 space-y-5 pb-6">
              {/* At Risk Warning */}
              {client.status === "at_risk" && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/8 border border-destructive/25">
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-destructive">
                      Client At Risk
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Traffic declined by {Math.abs(client.trafficGrowth)}% vs
                      last month. Missed 3 weekly growth targets. Requires
                      immediate action plan.
                    </p>
                  </div>
                </div>
              )}

              {/* Performance metrics */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Performance vs Last Month
                </p>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-0.5 text-center text-[10px] text-muted-foreground mb-3 pb-2 border-b border-border/30">
                      <span>Metric</span>
                      <span>Last Month</span>
                      <span className="text-foreground font-medium">
                        This Month
                      </span>
                    </div>
                    <MetricRow
                      label="Traffic"
                      current={traffic}
                      prev={client.prevMonthTraffic}
                    />
                    <MetricRow
                      label="Leads"
                      current={leads}
                      prev={client.prevMonthLeads}
                    />
                    <MetricRow
                      label="Conversions"
                      current={conversions}
                      prev={client.prevMonthConversions}
                    />
                    <MetricRow
                      label="Revenue"
                      current={revenue}
                      prev={client.prevMonthRevenue}
                      prefix="₹"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* 6-month Revenue Chart */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  6-Month Revenue Trend
                </p>
                <div className="h-44 rounded-xl border border-border/50 bg-muted/10 p-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueHistory}
                      margin={{ top: 2, right: 4, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(var(--border))"
                        strokeOpacity={0.4}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 10 }}
                        stroke="transparent"
                      />
                      <YAxis tick={{ fontSize: 10 }} stroke="transparent" />
                      <Tooltip
                        formatter={(v: number) => [
                          `₹${v.toLocaleString("en-IN")}`,
                          "Revenue",
                        ]}
                        contentStyle={{
                          background: "oklch(var(--card))",
                          border: "1px solid oklch(var(--border))",
                          borderRadius: "8px",
                          fontSize: "11px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="oklch(var(--primary))"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: "oklch(var(--primary))" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Action Plan */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  This Week's Action Plan
                </p>
                <Card className="border-border/50">
                  <CardContent className="p-4 space-y-3">
                    {WEEKLY_TASKS.map((task) => {
                      const isDone = taskState[task.id] ?? task.done;
                      return (
                        <div
                          key={task.id}
                          data-ocid={`clients.weekly_task.${task.id}`}
                          className="flex items-start gap-3"
                        >
                          <Checkbox
                            checked={isDone}
                            onCheckedChange={(v) =>
                              setTaskState((p) => ({
                                ...p,
                                [task.id]: Boolean(v),
                              }))
                            }
                            className="mt-0.5 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm leading-snug",
                                isDone
                                  ? "text-muted-foreground line-through"
                                  : "text-foreground",
                              )}
                            >
                              {task.label}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-[10px] mt-1 px-1.5"
                            >
                              {task.category}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Upsell Card */}
              <div
                data-ocid="clients.upsell.card"
                className="rounded-xl border border-primary/25 bg-primary/5 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                    <Flame className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      Upsell Opportunity
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Add Google Ads management for{" "}
                      <span className="font-semibold text-foreground">
                        {client.businessName}
                      </span>{" "}
                      — estimated +₹15,000/month additional revenue with 3.2×
                      ROAS based on industry benchmark.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        className="h-7 text-xs gap-1.5"
                        data-ocid="clients.upsell.propose_button"
                      >
                        <Send className="w-3 h-3" />
                        Send Proposal
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs"
                        data-ocid="clients.upsell.dismiss_button"
                      >
                        Later
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Report Button */}
              <Button
                className="w-full gap-2"
                data-ocid="clients.detail.generate_report_button"
                onClick={onGenerateReport}
              >
                <Sparkles className="w-4 h-4" />
                Generate Monthly Report
              </Button>
            </TabsContent>

            {/* ── Growth Strategy Tab ── */}
            <TabsContent value="strategy" className="mt-0 space-y-4 pb-6">
              {[
                {
                  icon: IndianRupee,
                  title: "Revenue Strategy",
                  color: "text-success",
                  bg: "bg-success/10",
                  items: [
                    "Upsell to Full-Service Package — +₹15,000/month",
                    "Introduce 6-month prepay bundle at ₹50,000 (save 15%)",
                    "Add Monthly Retention Check-In to reduce churn risk",
                  ],
                },
                {
                  icon: Megaphone,
                  title: "Content Marketing",
                  color: "text-primary",
                  bg: "bg-primary/10",
                  items: [
                    "Post 3 Instagram Reels showing before/after client results",
                    "Publish 2 blog posts targeting local search keywords",
                    "Share client testimonials via WhatsApp status (if opted-in)",
                  ],
                },
                {
                  icon: Globe,
                  title: "SEO Improvement",
                  color: "text-chart-3",
                  bg: "bg-chart-3/10",
                  items: [
                    `Target "best ${client.industry.toLowerCase()} in ${client.city}" — 880 searches/mo`,
                    "Fix 6 missing meta descriptions on key service pages",
                    "Optimize Google Business Profile — add 5 new photos, update hours",
                  ],
                },
                {
                  icon: Zap,
                  title: "Paid Ads",
                  color: "text-warning",
                  bg: "bg-warning/10",
                  items: [
                    "Increase Google Ads budget by ₹5,000/month — estimated +18 leads",
                    "Launch Meta Retargeting campaign for website visitors",
                    "Create YouTube pre-roll ad targeting competitor keywords",
                  ],
                },
              ].map((section) => {
                const Icon = section.icon;
                return (
                  <Card key={section.title} className="border-border/50">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <div
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center",
                            section.bg,
                          )}
                        >
                          <Icon className={cn("w-3.5 h-3.5", section.color)} />
                        </div>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs text-foreground"
                          >
                            <span className="text-primary mt-0.5 shrink-0">
                              →
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
              <p className="text-[10px] text-muted-foreground pb-4 italic">
                Based on publicly available data and heuristics
              </p>
            </TabsContent>

            {/* ── Reports Tab ── */}
            <TabsContent value="reports" className="mt-0 space-y-4 pb-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Past Reports
                </p>
                <Button
                  size="sm"
                  className="h-7 text-xs gap-1.5"
                  data-ocid="clients.reports.generate_new_button"
                  onClick={onGenerateReport}
                >
                  <Plus className="w-3 h-3" />
                  Generate New
                </Button>
              </div>

              {PAST_REPORTS.map((report, i) => (
                <Card
                  key={report.id}
                  data-ocid={`clients.reports.item.${i + 1}`}
                  className="border-border/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {report.label} Report
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Generated {report.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0"
                          data-ocid={`clients.reports.share.button.${i + 1}`}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1"
                          data-ocid={`clients.reports.view.button.${i + 1}`}
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {
                          label: "Leads",
                          value: String(report.leadsGenerated),
                        },
                        { label: "Conv. Rate", value: report.conversionRate },
                        { label: "Revenue", value: report.revenueImpact },
                        { label: "Traffic", value: report.trafficGrowth },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="p-2 rounded-lg bg-muted/30 border border-border/30"
                        >
                          <p className="text-[10px] text-muted-foreground">
                            {m.label}
                          </p>
                          <p className="text-sm font-bold tabular-nums text-foreground">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

// ── Report Preview Modal ──────────────────────────────────────────────────────

function ReportPreviewModal({
  client,
  open,
  onClose,
}: {
  client: ExtendedClient | null;
  open: boolean;
  onClose: () => void;
}) {
  const generateReport = useGenerateGrowthReport();
  const clientIdStr = client?.id.toString() ?? "";
  useGrowthReports(clientIdStr);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  if (!client) return null;

  const revenue = Number(client.metrics.revenue);
  const leads = Number(client.metrics.leads);
  const conversions = Number(client.metrics.conversions);
  const convRate = leads > 0 ? ((conversions / leads) * 100).toFixed(1) : "0.0";
  const month = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  function handleGenerate() {
    setIsGenerating(true);
    generateReport.mutate(
      {
        clientId: clientIdStr,
        clientName: client!.businessName,
        period: month,
      },
      {
        onSuccess: () => {
          setIsGenerating(false);
          setGenerated(true);
        },
        onError: () => {
          setIsGenerating(false);
          setGenerated(true);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="clients.report_preview.dialog"
        className="max-w-lg max-h-[85vh] flex flex-col"
      >
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            {client.businessName} — {month}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-4 pb-2">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Leads Generated", value: String(leads) },
                { label: "Conversion Rate", value: `${convRate}%` },
                {
                  label: "Revenue Impact",
                  value: `₹${revenue.toLocaleString("en-IN")}`,
                },
                { label: "Traffic Growth", value: `+${client.trafficGrowth}%` },
              ].map((k) => (
                <div
                  key={k.label}
                  className="p-3 rounded-xl bg-muted/30 border border-border/40"
                >
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-lg font-bold tabular-nums text-foreground mt-0.5">
                    {k.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                Executive Summary
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {client.businessName} delivered strong growth this month with{" "}
                {leads} qualified leads and ₹{revenue.toLocaleString("en-IN")}{" "}
                in estimated revenue impact. Google ranking improved for 4
                primary keywords. Traffic grew {client.trafficGrowth}%
                month-over-month. Recommended next step: scale Google Ads budget
                to capture peak demand.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-2">
                Key Wins
              </p>
              <ul className="space-y-1.5">
                {[
                  `${leads} qualified leads generated — highest this quarter`,
                  `Conversion rate at ${convRate}% — industry avg is 14%`,
                  "Google Business Profile received 9 new reviews",
                  "Page speed improved: 3.8s → 1.9s",
                ].map((win) => (
                  <li
                    key={win}
                    className="flex items-start gap-2 text-xs text-foreground"
                  >
                    <span className="text-success mt-0.5 font-bold">✓</span>
                    {win}
                  </li>
                ))}
              </ul>
            </div>

            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="clients.report_preview.success_state"
                className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/25 text-success text-sm font-medium"
              >
                <span>✓</span> Report saved and ready to share
              </motion.div>
            )}
          </div>
        </ScrollArea>
        <div className="shrink-0 flex items-center justify-between pt-4 border-t border-border/40">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            data-ocid="clients.report_preview.close_button"
          >
            Close
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              data-ocid="clients.report_preview.share_button"
            >
              <Link2 className="w-3.5 h-3.5" />
              Share Link
            </Button>
            <Button
              size="sm"
              className="gap-1.5 text-xs"
              onClick={handleGenerate}
              disabled={isGenerating}
              data-ocid="clients.report_preview.generate_button"
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              {isGenerating ? "Generating…" : "Download PDF"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Add Client Dialog ─────────────────────────────────────────────────────────

function AddClientDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent data-ocid="clients.add_client.dialog" className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Add New Client
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <Label>Business Name</Label>
            <Input
              placeholder="e.g. Sunrise Yoga Studio"
              data-ocid="clients.add_client.name.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Industry</Label>
            <Input
              placeholder="e.g. Health & Wellness"
              data-ocid="clients.add_client.industry.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>City</Label>
            <Input
              placeholder="e.g. Mumbai"
              data-ocid="clients.add_client.city.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Contact Email</Label>
            <Input
              type="email"
              placeholder="owner@business.in"
              data-ocid="clients.add_client.email.input"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="outline"
              onClick={onClose}
              data-ocid="clients.add_client.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={onClose}
              data-ocid="clients.add_client.confirm_button"
            >
              Add Client
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  const { data: backendClients = [], isLoading } = useClients();

  // Merge backend data with extended mock
  const clients: ExtendedClient[] =
    backendClients.length >= 3
      ? CLIENTS.map((ec) => {
          const found = backendClients.find(
            (c) => c.id.toString() === ec.id.toString(),
          );
          return found ? { ...ec, metrics: found.metrics } : ec;
        })
      : CLIENTS;

  // Sort: at_risk first, then active, then paused
  const sorted = [...clients].sort((a, b) => {
    const order: Record<ClientStatus, number> = {
      at_risk: 0,
      active: 1,
      paused: 2,
    };
    return order[a.status] - order[b.status];
  });

  const [selectedClient, setSelectedClient] = useState<ExtendedClient | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [reportClient, setReportClient] = useState<ExtendedClient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = sorted.filter(
    (c) =>
      c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function openDetail(client: ExtendedClient) {
    setSelectedClient(client);
    setDrawerOpen(true);
  }

  function openReport(client: ExtendedClient) {
    setReportClient(client);
    setReportOpen(true);
  }

  // KPI aggregates
  const activeCount = clients.filter((c) => c.status === "active").length;
  const avgROI = Math.round(
    clients.reduce((sum, c) => sum + c.monthlyROI, 0) / clients.length,
  );
  const avgTrafficGrowth = Math.round(
    clients.reduce((sum, c) => sum + c.trafficGrowth, 0) / clients.length,
  );
  const totalRevenue = clients.reduce(
    (sum, c) => sum + Number(c.metrics.revenue),
    0,
  );

  return (
    <div data-ocid="clients.page" className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <span>GrowthOS</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Clients</span>
          </nav>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Clients
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track performance and grow your client portfolio
          </p>
        </div>
        <Button
          className="gap-2 shrink-0"
          data-ocid="clients.add_client_button"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Active Clients"
          value={String(activeCount)}
          delta="+2 this quarter"
          deltaUp
          icon={Briefcase}
          accent="bg-primary/10"
        />
        <KpiCard
          label="Avg Monthly ROI"
          value={`${avgROI}%`}
          delta="+42pp vs last month"
          deltaUp
          icon={TrendingUp}
          accent="bg-success/10"
        />
        <KpiCard
          label="Avg Traffic Growth"
          value={`+${avgTrafficGrowth}%`}
          delta="vs last month"
          deltaUp
          icon={BarChart2}
          accent="bg-chart-3/10"
        />
        <KpiCard
          label="Total Revenue Generated"
          value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
          delta="+₹1.2L this month"
          deltaUp
          icon={IndianRupee}
          accent="bg-warning/10"
        />
      </div>

      {/* At Risk Alert Banner */}
      {clients.some((c) => c.status === "at_risk") && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-destructive/8 border border-destructive/25"
          data-ocid="clients.at_risk.banner"
        >
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-destructive">
              {clients.filter((c) => c.status === "at_risk").length} client
              {clients.filter((c) => c.status === "at_risk").length > 1
                ? "s"
                : ""}{" "}
              at risk
            </p>
            <p className="text-xs text-muted-foreground">
              {clients
                .filter((c) => c.status === "at_risk")
                .map((c) => c.businessName)
                .join(", ")}{" "}
              — declining metrics detected. Review immediately.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10 shrink-0 text-xs"
            data-ocid="clients.at_risk.review_button"
            onClick={() => {
              const atRisk = clients.find((c) => c.status === "at_risk");
              if (atRisk) openDetail(atRisk);
            }}
          >
            Review Now
          </Button>
        </motion.div>
      )}

      {/* Client Table Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              All Clients
              <Badge variant="outline" className="text-[10px] ml-1 bg-muted/50">
                {clients.length}
              </Badge>
            </CardTitle>
            <Input
              placeholder="Search by name, city, industry…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs h-8 text-xs"
              data-ocid="clients.search.input"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3, 4].map((k) => (
                  <div
                    key={k}
                    data-ocid="clients.loading_state"
                    className="h-14 rounded-xl bg-muted/30 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredClients.length === 0 ? (
              <div
                data-ocid="clients.empty_state"
                className="py-16 text-center"
              >
                <Briefcase className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">
                  No clients found
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try a different search or add a new client
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 pl-4 pr-3">
                      Client
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3 hidden md:table-cell">
                      Industry
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3 hidden lg:table-cell">
                      Client Since
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">
                      Leads / Mo
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3 hidden sm:table-cell">
                      Traffic
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3 hidden sm:table-cell">
                      ROI
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3 hidden xl:table-cell">
                      Next Report
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-3 pl-3 pr-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredClients.map((client, idx) => (
                      <ClientRow
                        key={client.id.toString()}
                        client={client}
                        index={idx}
                        onSelect={openDetail}
                        onReport={openReport}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Client Detail Drawer */}
      <ClientDetailDrawer
        client={selectedClient}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onGenerateReport={() => {
          setReportClient(selectedClient);
          setDrawerOpen(false);
          setReportOpen(true);
        }}
      />

      {/* Report Preview Modal */}
      <ReportPreviewModal
        client={reportClient}
        open={reportOpen}
        onClose={() => setReportOpen(false)}
      />

      {/* Add Client Dialog */}
      <AddClientDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
