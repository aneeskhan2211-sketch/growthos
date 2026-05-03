import { MiniReportModal } from "@/components/MiniReportModal";
import type { MonthReport } from "@/components/MiniReportModal";
import { PageTransition } from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PAGE_META } from "@/config/metaTags";
import { useAutoAgency } from "@/hooks/useAutoAgency";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import type {
  ClientGrowthPlan,
  ClientGrowthPlanApprovalStatus,
  GrowthPlanItem,
  GrowthPlanItemEffort,
  GrowthPlanItemStatus,
} from "@/types/auto-agency";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────

type ClientStatus = "active" | "paused" | "at_risk";
type ActiveTab = "overview" | "roi" | "reports" | "growth";

type ExtendedStatus = "Active" | "Inactive" | "Paused" | "Churned";
type LeadSource =
  | "Referral"
  | "Google Ads"
  | "Meta Ads"
  | "Organic"
  | "WhatsApp"
  | "Other";
type ServiceTier = "Starter ₹49" | "Growth ₹299" | "Pro ₹999";
type BusinessType =
  | "Salon"
  | "Gym"
  | "Clinic"
  | "Real Estate"
  | "Local Services"
  | "Agency"
  | "Other";

interface ClientEditForm {
  name: string;
  businessType: BusinessType;
  city: string;
  phone: string;
  email: string;
  websiteUrl: string;
  serviceTier: ServiceTier;
  monthlyBudget: string;
  notes: string;
  assignedManager: string;
  leadSource: LeadSource;
  status: ExtendedStatus;
}

interface StatusHistoryEntry {
  status: ExtendedStatus;
  date: string;
  note: string;
}

interface ClientDetailData {
  id: string;
  name: string;
  businessType: string;
  city: string;
  status: ClientStatus;
  gradientFrom: string;
  gradientTo: string;
  kpis: {
    revenueGenerated: number;
    leadsDelivered: number;
    roi: number;
    conversionRate: number;
  };
  pipeline: {
    leadsContacted: number;
    replies: number;
    proposalsSent: number;
    dealsClosed: number;
  };
  revenueTrend: { month: string; revenue: number }[];
  monthlyReports: MonthReport[];
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const CLIENT_DETAILS: Record<string, ClientDetailData> = {
  "1": {
    id: "1",
    name: "Bombay Bites",
    businessType: "Food & Beverage",
    city: "Mumbai",
    status: "active",
    gradientFrom: "oklch(0.62 0.22 45)",
    gradientTo: "oklch(0.72 0.18 55)",
    kpis: {
      revenueGenerated: 120000,
      leadsDelivered: 47,
      roi: 3.2,
      conversionRate: 18.4,
    },
    pipeline: {
      leadsContacted: 47,
      replies: 19,
      proposalsSent: 11,
      dealsClosed: 8,
    },
    revenueTrend: [
      { month: "Nov", revenue: 42000 },
      { month: "Dec", revenue: 55000 },
      { month: "Jan", revenue: 68000 },
      { month: "Feb", revenue: 72000 },
      { month: "Mar", revenue: 88000 },
      { month: "Apr", revenue: 120000 },
    ],
    monthlyReports: [
      {
        month: "April 2026",
        revenue: 120000,
        leads: 16,
        closeRate: 28,
        revenuePerLead: 7500,
        replyRate: 38,
        actionItems: [
          "Launch Instagram Reels to boost engagement",
          "Run a limited-time offer campaign",
        ],
      },
      {
        month: "March 2026",
        revenue: 88000,
        leads: 14,
        closeRate: 22,
        revenuePerLead: 6286,
        replyRate: 32,
        actionItems: [
          "A/B test two WhatsApp message templates",
          "Follow up with 5 cold leads",
        ],
      },
      {
        month: "February 2026",
        revenue: 72000,
        leads: 12,
        closeRate: 19,
        revenuePerLead: 6000,
        replyRate: 29,
        actionItems: [
          "Optimize Google Business Profile",
          "Collect 10 new reviews",
        ],
      },
      {
        month: "January 2026",
        revenue: 68000,
        leads: 11,
        closeRate: 17,
        revenuePerLead: 6182,
        replyRate: 26,
        actionItems: [
          "Set up weekly email newsletter",
          "Create referral incentive for existing customers",
        ],
      },
      {
        month: "December 2025",
        revenue: 55000,
        leads: 10,
        closeRate: 16,
        revenuePerLead: 5500,
        replyRate: 24,
        actionItems: ["Holiday promotion campaign", "Add website booking form"],
      },
      {
        month: "November 2025",
        revenue: 42000,
        leads: 8,
        closeRate: 14,
        revenuePerLead: 5250,
        replyRate: 21,
        actionItems: [
          "Expand to Instagram Stories",
          "Build local business partnerships",
        ],
      },
    ],
  },
  "2": {
    id: "2",
    name: "FitZone Gym",
    businessType: "Health & Fitness",
    city: "Pune",
    status: "active",
    gradientFrom: "oklch(0.56 0.15 170)",
    gradientTo: "oklch(0.66 0.13 180)",
    kpis: {
      revenueGenerated: 85000,
      leadsDelivered: 34,
      roi: 2.8,
      conversionRate: 16.2,
    },
    pipeline: {
      leadsContacted: 34,
      replies: 14,
      proposalsSent: 8,
      dealsClosed: 5,
    },
    revenueTrend: [
      { month: "Nov", revenue: 28000 },
      { month: "Dec", revenue: 36000 },
      { month: "Jan", revenue: 44000 },
      { month: "Feb", revenue: 52000 },
      { month: "Mar", revenue: 68000 },
      { month: "Apr", revenue: 85000 },
    ],
    monthlyReports: [
      {
        month: "April 2026",
        revenue: 85000,
        leads: 10,
        closeRate: 25,
        revenuePerLead: 8500,
        replyRate: 35,
        actionItems: [
          "Launch Google Ads for gym memberships",
          "Set up automated follow-up sequence",
        ],
      },
      {
        month: "March 2026",
        revenue: 68000,
        leads: 9,
        closeRate: 21,
        revenuePerLead: 7556,
        replyRate: 31,
        actionItems: [
          "Create transformation testimonial posts",
          "Partner with local nutrition brands",
        ],
      },
      {
        month: "February 2026",
        revenue: 52000,
        leads: 8,
        closeRate: 18,
        revenuePerLead: 6500,
        replyRate: 28,
        actionItems: [
          "Send monthly fitness tips newsletter",
          "Offer free trial class to warm leads",
        ],
      },
      {
        month: "January 2026",
        revenue: 44000,
        leads: 7,
        closeRate: 16,
        revenuePerLead: 6286,
        replyRate: 24,
        actionItems: [
          "New Year campaign targeting resolutions",
          "Build referral system for members",
        ],
      },
      {
        month: "December 2025",
        revenue: 36000,
        leads: 6,
        closeRate: 15,
        revenuePerLead: 6000,
        replyRate: 22,
        actionItems: [
          "Holiday discount promotion",
          "Improve website lead capture form",
        ],
      },
      {
        month: "November 2025",
        revenue: 28000,
        leads: 5,
        closeRate: 13,
        revenuePerLead: 5600,
        replyRate: 20,
        actionItems: [
          "Set up Google Business Profile",
          "Start posting 3x/week on Instagram",
        ],
      },
    ],
  },
  "3": {
    id: "3",
    name: "Sharma Legal",
    businessType: "Legal Services",
    city: "Delhi",
    status: "paused",
    gradientFrom: "oklch(0.58 0.22 300)",
    gradientTo: "oklch(0.68 0.18 315)",
    kpis: {
      revenueGenerated: 210000,
      leadsDelivered: 89,
      roi: 4.1,
      conversionRate: 22.5,
    },
    pipeline: {
      leadsContacted: 89,
      replies: 37,
      proposalsSent: 24,
      dealsClosed: 20,
    },
    revenueTrend: [
      { month: "Nov", revenue: 95000 },
      { month: "Dec", revenue: 112000 },
      { month: "Jan", revenue: 128000 },
      { month: "Feb", revenue: 145000 },
      { month: "Mar", revenue: 182000 },
      { month: "Apr", revenue: 210000 },
    ],
    monthlyReports: [
      {
        month: "April 2026",
        revenue: 210000,
        leads: 20,
        closeRate: 35,
        revenuePerLead: 10500,
        replyRate: 42,
        actionItems: [
          "Resume LinkedIn outreach campaign in June",
          "Prepare Q3 growth strategy proposal",
        ],
      },
      {
        month: "March 2026",
        revenue: 182000,
        leads: 18,
        closeRate: 31,
        revenuePerLead: 10111,
        replyRate: 38,
        actionItems: [
          "Expand to corporate legal segment",
          "Add client testimonials to website",
        ],
      },
      {
        month: "February 2026",
        revenue: 145000,
        leads: 15,
        closeRate: 28,
        revenuePerLead: 9667,
        replyRate: 34,
        actionItems: [
          "Build thought leadership content",
          "Target startup legal needs",
        ],
      },
      {
        month: "January 2026",
        revenue: 128000,
        leads: 14,
        closeRate: 26,
        revenuePerLead: 9143,
        replyRate: 31,
        actionItems: [
          "Partner with CA/CS professionals",
          "Create FAQ on legal process",
        ],
      },
      {
        month: "December 2025",
        revenue: 112000,
        leads: 12,
        closeRate: 24,
        revenuePerLead: 9333,
        replyRate: 28,
        actionItems: [
          "Year-end contract review outreach",
          "Send holiday client gifts",
        ],
      },
      {
        month: "November 2025",
        revenue: 95000,
        leads: 10,
        closeRate: 22,
        revenuePerLead: 9500,
        replyRate: 26,
        actionItems: [
          "Launch LinkedIn thought-leadership series",
          "Improve case study landing page",
        ],
      },
    ],
  },
  "4": {
    id: "4",
    name: "MediCare Clinic",
    businessType: "Healthcare",
    city: "Bangalore",
    status: "active",
    gradientFrom: "oklch(0.56 0.15 215)",
    gradientTo: "oklch(0.66 0.13 230)",
    kpis: {
      revenueGenerated: 60000,
      leadsDelivered: 21,
      roi: 2.1,
      conversionRate: 14.3,
    },
    pipeline: {
      leadsContacted: 21,
      replies: 8,
      proposalsSent: 5,
      dealsClosed: 3,
    },
    revenueTrend: [
      { month: "Nov", revenue: 18000 },
      { month: "Dec", revenue: 24000 },
      { month: "Jan", revenue: 30000 },
      { month: "Feb", revenue: 38000 },
      { month: "Mar", revenue: 50000 },
      { month: "Apr", revenue: 60000 },
    ],
    monthlyReports: [
      {
        month: "April 2026",
        revenue: 60000,
        leads: 6,
        closeRate: 20,
        revenuePerLead: 10000,
        replyRate: 30,
        actionItems: [
          "Deliver SEO audit report to client",
          "Set up Google Business Profile",
        ],
      },
      {
        month: "March 2026",
        revenue: 50000,
        leads: 5,
        closeRate: 18,
        revenuePerLead: 10000,
        replyRate: 27,
        actionItems: [
          "Launch patient review collection campaign",
          "Optimize for 'clinic near me' keywords",
        ],
      },
      {
        month: "February 2026",
        revenue: 38000,
        leads: 4,
        closeRate: 15,
        revenuePerLead: 9500,
        replyRate: 24,
        actionItems: [
          "Create health tips newsletter",
          "Add appointment booking widget",
        ],
      },
      {
        month: "January 2026",
        revenue: 30000,
        leads: 4,
        closeRate: 14,
        revenuePerLead: 7500,
        replyRate: 22,
        actionItems: [
          "Set up Google Ads for local patients",
          "Build patient testimonial page",
        ],
      },
      {
        month: "December 2025",
        revenue: 24000,
        leads: 3,
        closeRate: 13,
        revenuePerLead: 8000,
        replyRate: 20,
        actionItems: [
          "Holiday health checkup campaign",
          "Add payment options to website",
        ],
      },
      {
        month: "November 2025",
        revenue: 18000,
        leads: 3,
        closeRate: 12,
        revenuePerLead: 6000,
        replyRate: 18,
        actionItems: [
          "Create before/after patient journey",
          "Launch WhatsApp appointment reminders",
        ],
      },
    ],
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatRevenue(val: number): string {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
}

function getMondayDate(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  return monday.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STATUS_CONFIG: Record<
  ClientStatus,
  { label: string; cls: string; dot: string }
> = {
  active: {
    label: "Active",
    cls: "bg-success/15 text-success border-success/30",
    dot: "bg-success",
  },
  paused: {
    label: "Paused",
    cls: "bg-warning/15 text-warning border-warning/30",
    dot: "bg-warning",
  },
  at_risk: {
    label: "At Risk",
    cls: "bg-destructive/15 text-destructive border-destructive/30",
    dot: "bg-destructive",
  },
};

const APPROVAL_STATUS_CONFIG: Record<
  ClientGrowthPlanApprovalStatus,
  { label: string; cls: string }
> = {
  pending: {
    label: "Pending",
    cls: "bg-warning/15 text-warning border-warning/30",
  },
  approved: {
    label: "Approved",
    cls: "bg-success/15 text-success border-success/30",
  },
  executing: {
    label: "Executing",
    cls: "bg-primary/15 text-primary border-primary/30",
  },
};

const EFFORT_CONFIG: Record<
  GrowthPlanItemEffort,
  { label: string; cls: string }
> = {
  quick: {
    label: "Quick Win",
    cls: "bg-success/15 text-success border-success/30",
  },
  medium: {
    label: "Medium",
    cls: "bg-warning/15 text-warning border-warning/30",
  },
  deep: {
    label: "Deep Work",
    cls: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

// ── Animated Counter ──────────────────────────────────────────────────────────

function useAnimatedNumber(target: number, duration = 1000): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    start.current = null;
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(target * eased));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return value;
}

// ── KPI Tile ──────────────────────────────────────────────────────────────────

function KPITile({
  label,
  value,
  isRevenue = false,
  isPercent = false,
  isMultiplier = false,
  colorClass = "text-foreground",
  ocid,
}: {
  label: string;
  value: number;
  isRevenue?: boolean;
  isPercent?: boolean;
  isMultiplier?: boolean;
  colorClass?: string;
  ocid: string;
}) {
  const animated = useAnimatedNumber(
    isMultiplier ? Math.round(value * 10) : value,
    1100,
  );

  let display = "";
  if (isRevenue) display = formatRevenue(animated);
  else if (isMultiplier) display = `${(animated / 10).toFixed(1)}x`;
  else if (isPercent) display = `${animated.toFixed(0)}%`;
  else display = animated.toLocaleString("en-IN");

  return (
    <div
      data-ocid={ocid}
      className="rounded-xl bg-card border border-border/50 p-3 text-center"
    >
      <p
        className={`text-xl font-bold tabular-nums leading-none ${colorClass} font-display`}
      >
        {display}
      </p>
      <p className="text-[10px] text-muted-foreground mt-1.5 leading-tight">
        {label}
      </p>
    </div>
  );
}

// ── Pipeline Card ─────────────────────────────────────────────────────────────

function PipelineMetricCard({
  label,
  value,
  ocid,
}: {
  label: string;
  value: number;
  ocid: string;
}) {
  const animated = useAnimatedNumber(value, 900);
  return (
    <div
      data-ocid={ocid}
      className="rounded-xl bg-muted/40 border border-border/40 p-3 text-center"
    >
      <p className="text-lg font-bold text-foreground tabular-nums leading-none font-display">
        {animated}
      </p>
      <p className="text-[10px] text-muted-foreground mt-1 leading-tight">
        {label}
      </p>
    </div>
  );
}

// ── Month Report Card ─────────────────────────────────────────────────────────

function MonthCard({
  report,
  index,
  onTap,
}: {
  report: MonthReport;
  index: number;
  onTap: (r: MonthReport) => void;
}) {
  return (
    <motion.button
      type="button"
      data-ocid={`client_detail.month_report.item.${index + 1}`}
      className="w-full text-left rounded-xl border border-border/50 bg-card p-4 active:scale-[0.98] transition-transform duration-150"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25, ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onTap(report)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-foreground font-display">
            {report.month}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {report.leads} leads · {report.closeRate}% close rate
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-primary tabular-nums">
            {formatRevenue(report.revenue)}
          </p>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground/60"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

// ── Growth Plan Item Card ────────────────────────────────────────────────────

function GrowthItemCard({
  item,
  index,
  accentClass,
  onApprove,
  onSkip,
}: {
  item: GrowthPlanItem;
  index: number;
  accentClass: string;
  onApprove: () => void;
  onSkip: () => void;
}) {
  const effort = EFFORT_CONFIG[item.effort];
  const isHighPriority = Number(item.priorityScore) >= 85;
  const isDone = item.status === "approved" || item.status === "done";

  return (
    <motion.div
      data-ocid={`growth_plan.item.${index + 1}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.28, ease: "easeOut" }}
      className={cn(
        "rounded-xl border bg-card p-4 transition-all duration-200",
        isHighPriority ? "border-warning/40 shadow-sm" : "border-border/50",
        isDone && "opacity-60",
      )}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-[13px] font-semibold text-foreground font-display leading-snug">
              {item.title}
            </p>
            {isHighPriority && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-warning px-1.5 py-0.5 rounded-full bg-warning/10 border border-warning/20 shrink-0">
                High Priority
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>
        {isDone && (
          <span className="shrink-0 w-6 h-6 rounded-full bg-success/15 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-success"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>

      {/* Metrics row */}
      <div className="flex items-center gap-3 mb-3">
        <Badge
          variant="outline"
          className={cn("text-[10px] px-2 py-0.5", effort.cls)}
        >
          {effort.label}
        </Badge>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className={cn("h-full rounded-full", accentClass)}
              initial={{ width: 0 }}
              animate={{ width: `${Number(item.priorityScore)}%` }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground tabular-nums shrink-0">
            {Number(item.priorityScore)}
          </span>
        </div>
        <span className="text-[11px] font-bold text-success tabular-nums shrink-0">
          +{formatRevenue(Number(item.estimatedRevenue))}
        </span>
      </div>

      {/* Actions */}
      {!isDone && (
        <div className="flex gap-2">
          <motion.button
            type="button"
            data-ocid={`growth_plan.approve_button.${index + 1}`}
            whileTap={{ scale: 0.94 }}
            onClick={onApprove}
            className="flex-1 h-8 rounded-lg text-[12px] font-semibold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors duration-150 active:scale-95"
          >
            ✓ Approve
          </motion.button>
          <motion.button
            type="button"
            data-ocid={`growth_plan.skip_button.${index + 1}`}
            whileTap={{ scale: 0.94 }}
            onClick={onSkip}
            className="h-8 px-4 rounded-lg text-[12px] font-medium text-muted-foreground bg-muted/60 border border-border/40 hover:bg-muted transition-colors duration-150 active:scale-95"
          >
            Skip
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// ── Growth Plan Section ───────────────────────────────────────────────────────

function GrowthPlanSection({
  title,
  icon,
  items,
  accentClass,
  sectionOcid,
  onApproveItem,
  onSkipItem,
}: {
  title: string;
  icon: React.ReactNode;
  items: GrowthPlanItem[];
  accentClass: string;
  sectionOcid: string;
  onApproveItem: (index: number) => void;
  onSkipItem: (index: number) => void;
}) {
  return (
    <motion.div
      data-ocid={sectionOcid}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="flex-shrink-0">{icon}</span>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        <span className="text-[10px] text-muted-foreground/60 font-medium ml-auto">
          {
            items.filter((i) => i.status === "approved" || i.status === "done")
              .length
          }
          /{items.length} approved
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <GrowthItemCard
            key={`${item.title}-${i}`}
            item={item}
            index={i}
            accentClass={accentClass}
            onApprove={() => onApproveItem(i)}
            onSkip={() => onSkipItem(i)}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Executing Plan Animation ──────────────────────────────────────────────────

function ExecutingPlanBanner() {
  return (
    <motion.div
      data-ocid="growth_plan.executing_banner"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-xl border border-primary/30 bg-primary/8 p-5 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary mx-auto mb-3 flex items-center justify-center"
      >
        <span className="text-base">⚡</span>
      </motion.div>
      <p className="text-sm font-bold text-foreground font-display mb-1">
        Executing Growth Plan
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        All items approved — the system is now running your plan in the
        background.
      </p>
      <div className="mt-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex-1 h-1.5 rounded-full bg-primary/20 overflow-hidden"
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Growth Plan Tab ───────────────────────────────────────────────────────────

function GrowthPlanTab({ clientId }: { clientId: string }) {
  const { getClientGrowthPlan, generateClientGrowthPlan } = useAutoAgency();
  const [plan, setPlan] = useState<ClientGrowthPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadPlan = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getClientGrowthPlan(BigInt(clientId));
      setPlan(result);
    } catch {
      setPlan(null);
    } finally {
      setIsLoading(false);
    }
  }, [clientId, getClientGrowthPlan]);

  useEffect(() => {
    void loadPlan();
  }, [loadPlan]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateClientGrowthPlan(BigInt(clientId));
      setPlan(result);
      toast.success("Growth plan generated!");
    } catch {
      toast.error("Failed to generate plan");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveAll = () => {
    if (!plan) return;
    const updateItems = (items: GrowthPlanItem[]): GrowthPlanItem[] =>
      items.map((item) => ({
        ...item,
        status: "approved" as GrowthPlanItemStatus,
      }));
    setPlan({
      ...plan,
      approvalStatus: "executing",
      seoPlan: updateItems(plan.seoPlan),
      adsPlan: updateItems(plan.adsPlan),
      contentIdeas: updateItems(plan.contentIdeas),
    });
    toast.success("All items approved! Plan is now executing.");
  };

  const handleApproveItem = (
    section: "seoPlan" | "adsPlan" | "contentIdeas",
    index: number,
  ) => {
    if (!plan) return;
    const updated = [...plan[section]];
    updated[index] = { ...updated[index], status: "approved" };
    const newPlan = { ...plan, [section]: updated };
    const allApproved = [
      ...newPlan.seoPlan,
      ...newPlan.adsPlan,
      ...newPlan.contentIdeas,
    ].every((i) => i.status === "approved" || i.status === "done");
    setPlan({
      ...newPlan,
      approvalStatus: allApproved ? "executing" : newPlan.approvalStatus,
    });
    if (allApproved)
      toast.success("All items approved! Plan is now executing.");
  };

  const handleSkipItem = (
    section: "seoPlan" | "adsPlan" | "contentIdeas",
    index: number,
  ) => {
    if (!plan) return;
    const updated = [...plan[section]];
    updated[index] = { ...updated[index], status: "done" };
    setPlan({ ...plan, [section]: updated });
  };

  if (isLoading) {
    return (
      <div data-ocid="growth_plan.loading_state" className="space-y-3 pt-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/40 bg-card p-4 animate-pulse"
          >
            <div className="h-3.5 w-2/3 bg-muted rounded mb-2" />
            <div className="h-3 w-full bg-muted/60 rounded mb-3" />
            <div className="h-1.5 w-full bg-muted/40 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!plan) {
    return (
      <motion.div
        data-ocid="growth_plan.empty_state"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-12 px-4 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <p className="text-sm font-bold text-foreground font-display mb-1.5">
          No Growth Plan Yet
        </p>
        <p className="text-xs text-muted-foreground mb-5 leading-relaxed max-w-[240px]">
          Generate a personalized weekly growth plan with SEO, ads, and content
          strategy.
        </p>
        <Button
          data-ocid="growth_plan.generate_button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="h-10 px-5 text-sm font-semibold gap-2"
        >
          {isGenerating ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="inline-block"
              >
                ⚙️
              </motion.span>
              Generating…
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-.23-8.66" />
              </svg>
              Generate Plan
            </>
          )}
        </Button>
      </motion.div>
    );
  }

  const approvalCfg = APPROVAL_STATUS_CONFIG[plan.approvalStatus];
  const allExecuting = plan.approvalStatus === "executing";

  return (
    <div className="space-y-5 pt-1">
      {/* Plan header */}
      <motion.div
        data-ocid="growth_plan.header"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border border-border/50 bg-card p-4"
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-[13px] font-bold text-foreground font-display">
              Weekly Growth Plan
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Week of {getMondayDate()}
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn("text-[10px] px-2 shrink-0", approvalCfg.cls)}
          >
            {approvalCfg.label}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            data-ocid="growth_plan.regenerate_button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex-1 h-8 text-[12px] font-semibold gap-1.5"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-.23-8.66" />
            </svg>
            {isGenerating ? "Generating…" : "Regenerate"}
          </Button>
          {!allExecuting && (
            <Button
              size="sm"
              data-ocid="growth_plan.approve_all_button"
              onClick={handleApproveAll}
              className="flex-1 h-8 text-[12px] font-semibold gap-1.5"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Approve All
            </Button>
          )}
        </div>
      </motion.div>

      {/* Executing state */}
      {allExecuting && <ExecutingPlanBanner />}

      {/* SEO Section */}
      <GrowthPlanSection
        title="SEO Recommendations"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-success"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        }
        items={plan.seoPlan}
        accentClass="bg-success"
        sectionOcid="growth_plan.seo_section"
        onApproveItem={(i) => handleApproveItem("seoPlan", i)}
        onSkipItem={(i) => handleSkipItem("seoPlan", i)}
      />

      {/* Ads Section */}
      <GrowthPlanSection
        title="Ads Strategy"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            aria-hidden="true"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        }
        items={plan.adsPlan}
        accentClass="bg-primary"
        sectionOcid="growth_plan.ads_section"
        onApproveItem={(i) => handleApproveItem("adsPlan", i)}
        onSkipItem={(i) => handleSkipItem("adsPlan", i)}
      />

      {/* Content Section */}
      <GrowthPlanSection
        title="Content Ideas"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-chart-5"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        }
        items={plan.contentIdeas}
        accentClass="bg-chart-5"
        sectionOcid="growth_plan.content_section"
        onApproveItem={(i) => handleApproveItem("contentIdeas", i)}
        onSkipItem={(i) => handleSkipItem("contentIdeas", i)}
      />
    </div>
  );
}

// ── Back Button ───────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

// ── Tab Nav ────────────────────────────────────────────────────────────────────

const TABS: { id: ActiveTab; label: string; isNew?: boolean }[] = [
  { id: "overview", label: "Overview" },
  { id: "roi", label: "ROI" },
  { id: "reports", label: "Reports" },
  { id: "growth", label: "Growth Plan", isNew: true },
];

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ClientDetailPage() {
  useMetaTags({
    title: "Client Details | GrowthOS",
    description: "View and manage client details.",
    robots: "noindex, nofollow",
  });
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = useParams({ from: "/clients/$clientId" as any });
  const clientId = params.clientId as string;
  const client = CLIENT_DETAILS[clientId];

  const [selectedReport, setSelectedReport] = useState<MonthReport | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<ClientEditForm>({
    name: client?.name ?? "",
    businessType: "Salon",
    city: client?.city ?? "",
    phone: "+91 9000000000",
    email: "contact@example.com",
    websiteUrl: "https://example.com",
    serviceTier: "Growth ₹299",
    monthlyBudget: "25000",
    notes: "Consistent progress. Needs focus on Google visibility.",
    assignedManager: "Anees Chaudhary",
    leadSource: "Referral",
    status: "Active",
  });

  const statusHistory: StatusHistoryEntry[] = [
    {
      status: "Active",
      date: "Apr 15, 2026",
      note: "Onboarded — campaign live",
    },
    { status: "Active", date: "Mar 2, 2026", note: "Upgraded to Growth plan" },
    {
      status: "Paused",
      date: "Feb 10, 2026",
      note: "Client requested 2-week pause",
    },
    {
      status: "Active",
      date: "Jan 5, 2026",
      note: "Resumed after holiday break",
    },
  ];

  const setField = <K extends keyof ClientEditForm>(
    k: K,
    v: ClientEditForm[K],
  ) => setEditForm((f) => ({ ...f, [k]: v }));

  const handleSaveEdit = () => {
    setEditMode(false);
    toast.success("Client profile updated!");
  };

  useEffect(() => {
    console.debug("[analytics] client_detail_viewed", clientId);
  }, [clientId]);

  const handleRevenueBreakdownView = () => {
    console.debug("[analytics] client_revenue_breakdown_viewed", clientId);
  };

  const handleReportExpanded = (report: MonthReport) => {
    console.debug("[analytics] client_report_expanded", report.month);
    setSelectedReport(report);
  };

  if (!client) {
    return (
      <PageTransition>
        <div
          data-ocid="client_detail.not_found"
          className="flex flex-col items-center justify-center py-20 px-6 text-center"
        >
          <p className="text-base font-bold text-foreground mb-2">
            Client not found
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/clients" })}
            className="text-sm text-primary font-semibold"
          >
            ← Back to Clients
          </button>
        </div>
      </PageTransition>
    );
  }

  const status = STATUS_CONFIG[client.status];

  return (
    <PageTransition>
      <div data-ocid="client_detail.page" className="flex flex-col pb-24">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="bg-card border-b border-border/60 px-4 py-4 shrink-0">
          {/* Back + title */}
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              data-ocid="client_detail.back_button"
              onClick={() => navigate({ to: "/clients" })}
              className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center text-foreground active:scale-95 transition-transform"
              aria-label="Back to clients"
            >
              <BackIcon />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold font-display text-foreground truncate leading-tight">
                {client.name}
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {client.businessType} · {client.city}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn("text-[10px] px-2 gap-1 shrink-0", status.cls)}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
              {status.label}
            </Badge>
            <Button
              size="sm"
              variant={editMode ? "default" : "outline"}
              data-ocid="client_detail.edit_button"
              onClick={() => (editMode ? handleSaveEdit() : setEditMode(true))}
              className="h-8 px-3 text-xs font-semibold gap-1.5 shrink-0"
            >
              {editMode ? (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Save
                </>
              ) : (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </>
              )}
            </Button>
          </div>

          {/* KPI Row */}
          <div
            data-ocid="client_detail.kpi_section"
            className="grid grid-cols-4 gap-2 mb-4"
          >
            <KPITile
              label="Revenue"
              value={client.kpis.revenueGenerated}
              isRevenue
              colorClass="text-primary"
              ocid="client_detail.kpi.revenue"
            />
            <KPITile
              label="Leads"
              value={client.kpis.leadsDelivered}
              colorClass="text-foreground"
              ocid="client_detail.kpi.leads"
            />
            <KPITile
              label="ROI"
              value={client.kpis.roi}
              isMultiplier
              colorClass="text-success"
              ocid="client_detail.kpi.roi"
            />
            <KPITile
              label="Conv. Rate"
              value={client.kpis.conversionRate}
              isPercent
              colorClass="text-foreground"
              ocid="client_detail.kpi.conversion_rate"
            />
          </div>

          {/* Tab Nav */}
          <div
            data-ocid="client_detail.tab_nav"
            className="flex gap-1 bg-muted/50 rounded-xl p-1"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-ocid={`client_detail.tab.${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1 h-8 rounded-lg text-[11px] font-semibold transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
                {tab.isNew && (
                  <span className="text-[8px] font-bold bg-primary text-primary-foreground px-1 rounded-full leading-tight py-0.5">
                    New
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-4 py-4">
            <AnimatePresence mode="wait">
              {/* ── Overview Tab ──────────────────────────────────────── */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Revenue Trend */}
                  <motion.div
                    data-ocid="client_detail.revenue_trend_section"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    onViewportEnter={handleRevenueBreakdownView}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                      Revenue Trend (6 Months)
                    </p>
                    <div
                      className="rounded-xl border border-border/50 bg-card p-3"
                      style={{ height: 200 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={client.revenueTrend}
                          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id={`bar-grad-${client.id}`}
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="oklch(0.6 0.25 253)"
                                stopOpacity={1}
                              />
                              <stop
                                offset="100%"
                                stopColor="oklch(0.53 0.22 253)"
                                stopOpacity={0.7}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="oklch(var(--border))"
                            strokeOpacity={0.4}
                            vertical={false}
                          />
                          <XAxis
                            dataKey="month"
                            tick={{
                              fontSize: 10,
                              fill: "oklch(var(--muted-foreground))",
                            }}
                            stroke="transparent"
                          />
                          <YAxis
                            tick={{
                              fontSize: 10,
                              fill: "oklch(var(--muted-foreground))",
                            }}
                            stroke="transparent"
                            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                          />
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
                          <Bar dataKey="revenue" radius={[5, 5, 0, 0]}>
                            {client.revenueTrend.map((entry, i) => (
                              <Cell
                                key={entry.month}
                                fill={
                                  i === client.revenueTrend.length - 1
                                    ? `url(#bar-grad-${client.id})`
                                    : "oklch(0.53 0.22 253 / 0.5)"
                                }
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Pipeline Breakdown */}
                  <motion.div
                    data-ocid="client_detail.pipeline_section"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                      Pipeline Breakdown
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      <PipelineMetricCard
                        label="Contacted"
                        value={client.pipeline.leadsContacted}
                        ocid="client_detail.pipeline.contacted"
                      />
                      <PipelineMetricCard
                        label="Replies"
                        value={client.pipeline.replies}
                        ocid="client_detail.pipeline.replies"
                      />
                      <PipelineMetricCard
                        label="Proposals"
                        value={client.pipeline.proposalsSent}
                        ocid="client_detail.pipeline.proposals"
                      />
                      <PipelineMetricCard
                        label="Closed"
                        value={client.pipeline.dealsClosed}
                        ocid="client_detail.pipeline.closed"
                      />
                    </div>
                  </motion.div>

                  {/* Edit Form */}
                  {editMode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      data-ocid="client_detail.edit_form"
                      className="rounded-xl border border-primary/30 bg-card p-4 space-y-4"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        Edit Client Profile
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="edit-name"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Client Name
                          </label>
                          <input
                            id="edit-name"
                            data-ocid="client_detail.edit.name_input"
                            value={editForm.name}
                            onChange={(e) => setField("name", e.target.value)}
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edit-btype"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Business Type
                          </label>
                          <select
                            id="edit-btype"
                            data-ocid="client_detail.edit.business_type_select"
                            value={editForm.businessType}
                            onChange={(e) =>
                              setField(
                                "businessType",
                                e.target.value as BusinessType,
                              )
                            }
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {(
                              [
                                "Salon",
                                "Gym",
                                "Clinic",
                                "Real Estate",
                                "Local Services",
                                "Agency",
                                "Other",
                              ] as const
                            ).map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="edit-city"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            City
                          </label>
                          <input
                            id="edit-city"
                            data-ocid="client_detail.edit.city_input"
                            value={editForm.city}
                            onChange={(e) => setField("city", e.target.value)}
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edit-phone"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Phone
                          </label>
                          <input
                            id="edit-phone"
                            data-ocid="client_detail.edit.phone_input"
                            value={editForm.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edit-email"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Email
                          </label>
                          <input
                            id="edit-email"
                            data-ocid="client_detail.edit.email_input"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setField("email", e.target.value)}
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edit-website"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Website URL
                          </label>
                          <input
                            id="edit-website"
                            data-ocid="client_detail.edit.website_input"
                            value={editForm.websiteUrl}
                            onChange={(e) =>
                              setField("websiteUrl", e.target.value)
                            }
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edit-tier"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Service Tier
                          </label>
                          <select
                            id="edit-tier"
                            data-ocid="client_detail.edit.service_tier_select"
                            value={editForm.serviceTier}
                            onChange={(e) =>
                              setField(
                                "serviceTier",
                                e.target.value as ServiceTier,
                              )
                            }
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {(
                              [
                                "Starter ₹49",
                                "Growth ₹299",
                                "Pro ₹999",
                              ] as const
                            ).map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="edit-budget"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Monthly Budget (₹)
                          </label>
                          <input
                            id="edit-budget"
                            data-ocid="client_detail.edit.budget_input"
                            value={editForm.monthlyBudget}
                            onChange={(e) =>
                              setField("monthlyBudget", e.target.value)
                            }
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edit-leadsrc"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Lead Source
                          </label>
                          <select
                            id="edit-leadsrc"
                            data-ocid="client_detail.edit.lead_source_select"
                            value={editForm.leadSource}
                            onChange={(e) =>
                              setField(
                                "leadSource",
                                e.target.value as LeadSource,
                              )
                            }
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {(
                              [
                                "Referral",
                                "Google Ads",
                                "Meta Ads",
                                "Organic",
                                "WhatsApp",
                                "Other",
                              ] as const
                            ).map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="edit-status"
                            className="text-xs text-muted-foreground mb-1 block"
                          >
                            Status
                          </label>
                          <select
                            id="edit-status"
                            data-ocid="client_detail.edit.status_select"
                            value={editForm.status}
                            onChange={(e) =>
                              setField(
                                "status",
                                e.target.value as ExtendedStatus,
                              )
                            }
                            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {(
                              [
                                "Active",
                                "Inactive",
                                "Paused",
                                "Churned",
                              ] as const
                            ).map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="edit-manager"
                          className="text-xs text-muted-foreground mb-1 block"
                        >
                          Assigned Manager
                        </label>
                        <input
                          id="edit-manager"
                          data-ocid="client_detail.edit.manager_input"
                          value={editForm.assignedManager}
                          onChange={(e) =>
                            setField("assignedManager", e.target.value)
                          }
                          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="edit-notes"
                          className="text-xs text-muted-foreground mb-1 block"
                        >
                          Notes
                        </label>
                        <textarea
                          data-ocid="client_detail.edit.notes_textarea"
                          value={editForm.notes}
                          onChange={(e) => setField("notes", e.target.value)}
                          rows={3}
                          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                          id="edit-notes"
                        />
                      </div>

                      {/* Status History Timeline */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
                          Status History
                        </p>
                        <div
                          data-ocid="client_detail.status_history"
                          className="relative space-y-3"
                        >
                          {statusHistory.map((entry, i) => (
                            <div
                              key={`${entry.status}-${entry.date}`}
                              className="flex gap-3 relative"
                            >
                              <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-primary mt-0.5 shrink-0" />
                                {i < statusHistory.length - 1 && (
                                  <div className="w-px flex-1 bg-border/60 mt-1" />
                                )}
                              </div>
                              <div className="pb-3">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                      entry.status === "Active"
                                        ? "bg-success/15 text-success"
                                        : entry.status === "Paused"
                                          ? "bg-warning/15 text-warning"
                                          : entry.status === "Churned"
                                            ? "bg-destructive/15 text-destructive"
                                            : "bg-muted text-muted-foreground"
                                    }`}
                                  >
                                    {entry.status}
                                  </span>
                                  <span className="text-[11px] text-muted-foreground">
                                    {entry.date}
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {entry.note}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <Button
                          data-ocid="client_detail.edit.save_button"
                          onClick={handleSaveEdit}
                          className="flex-1 h-10 text-sm font-semibold"
                        >
                          Save Changes
                        </Button>
                        <Button
                          data-ocid="client_detail.edit.cancel_button"
                          variant="outline"
                          onClick={() => setEditMode(false)}
                          className="h-10 px-4 text-sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col gap-2.5 pt-1"
                  >
                    <Button
                      className="w-full h-12 text-sm font-semibold gap-2"
                      data-ocid="client_detail.generate_report_button"
                      onClick={() => toast.success("Report generation queued")}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      Generate Full Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-12 text-sm font-semibold gap-2"
                      data-ocid="client_detail.send_proposal_button"
                      onClick={() => navigate({ to: "/proposals" })}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send Proposal
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* ── ROI Tab ───────────────────────────────────────────── */}
              {activeTab === "roi" && (
                <motion.div
                  key="roi"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl border border-border/50 bg-card p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                      ROI Summary
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xl font-bold text-success font-display tabular-nums">
                          {client.kpis.roi.toFixed(1)}x
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Return on Investment
                        </p>
                      </div>
                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xl font-bold text-primary font-display tabular-nums">
                          {client.kpis.conversionRate}%
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Conversion Rate
                        </p>
                      </div>
                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xl font-bold text-foreground font-display tabular-nums">
                          {formatRevenue(
                            Math.round(
                              client.kpis.revenueGenerated /
                                client.kpis.leadsDelivered,
                            ),
                          )}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Revenue Per Lead
                        </p>
                      </div>
                      <div className="rounded-xl bg-muted/40 p-3">
                        <p className="text-xl font-bold text-foreground font-display tabular-nums">
                          {client.kpis.leadsDelivered}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Total Leads
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── Reports Tab ───────────────────────────────────────── */}
              {activeTab === "reports" && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-2">
                    {client.monthlyReports.map((report, i) => (
                      <MonthCard
                        key={report.month}
                        report={report}
                        index={i}
                        onTap={handleReportExpanded}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Growth Plan Tab ───────────────────────────────────── */}
              {activeTab === "growth" && (
                <motion.div
                  key="growth"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <GrowthPlanTab clientId={clientId} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Mini Report Modal */}
        <AnimatePresence>
          <MiniReportModal
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
          />
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
