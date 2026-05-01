import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Lock,
  Rocket,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { LeadStatus } from "../backend";
import { useClients } from "../hooks/useClients";
import { useLeads } from "../hooks/useLeads";
import {
  useOutreachCampaigns,
  useOutreachMessages,
} from "../hooks/useOutreach";
import {
  useGamificationState,
  useRecordDailyAction,
} from "../hooks/usePremium";

function fmtINR(amount: number) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}k`;
  return `₹${amount}`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function useAnimatedCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef<boolean>(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

const KPI_DATA = [
  {
    id: "hot_leads",
    label: "Hot Leads",
    rawValue: 142,
    displayValue: "142",
    change: 18,
    status: "Hot",
    statusColor: "text-destructive",
    statusBg: "bg-destructive/10",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    sparkline: [28, 42, 38, 55, 67, 82, 95, 110, 125, 142],
    lineColor: "oklch(0.65 0.19 22)",
  },
  {
    id: "messages_sent",
    label: "Messages Sent",
    rawValue: 389,
    displayValue: "389",
    change: 24,
    status: "Active",
    statusColor: "text-primary",
    statusBg: "bg-primary/10",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    sparkline: [120, 155, 178, 210, 245, 280, 310, 345, 368, 389],
    lineColor: "oklch(0.6 0.25 253)",
  },
  {
    id: "replies",
    label: "Replies",
    rawValue: 67,
    displayValue: "67",
    change: 12,
    status: "Growing",
    statusColor: "text-success",
    statusBg: "bg-success/10",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    sparkline: [18, 24, 31, 38, 42, 48, 53, 58, 62, 67],
    lineColor: "oklch(0.64 0.18 170)",
  },
  {
    id: "deals_closed",
    label: "Deals Closed",
    rawValue: 8,
    displayValue: "8",
    change: 33,
    status: "Excellent",
    statusColor: "text-warning",
    statusBg: "bg-warning/10",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    sparkline: [1, 2, 2, 3, 4, 5, 5, 6, 7, 8],
    lineColor: "oklch(0.74 0.2 86)",
  },
  {
    id: "revenue_potential",
    label: "Revenue Potential",
    rawValue: 420000,
    displayValue: "₹4.2L",
    change: 28,
    status: "Strong",
    statusColor: "text-premium-accent",
    statusBg: "bg-premium-accent-light",
    iconBg: "bg-premium-accent-light",
    iconColor: "text-premium-accent",
    sparkline: [
      80000, 120000, 155000, 200000, 240000, 280000, 320000, 365000, 395000,
      420000,
    ],
    lineColor: "oklch(0.58 0.28 253)",
  },
  {
    id: "campaign_roi",
    label: "Campaign ROI",
    rawValue: 380,
    displayValue: "380%",
    change: 15,
    status: "Top Tier",
    statusColor: "text-success",
    statusBg: "bg-success/10",
    iconBg: "bg-success/10",
    iconColor: "text-success",
    sparkline: [180, 210, 240, 265, 285, 310, 330, 350, 368, 380],
    lineColor: "oklch(0.64 0.18 170)",
  },
];

const MOCK_LEADS = [
  {
    id: "lead-1",
    name: "Arjun Fitness Studio",
    city: "Mumbai",
    industry: "Fitness",
    score: 94,
  },
  {
    id: "lead-2",
    name: "Priya Beauty Salon",
    city: "Delhi",
    industry: "Beauty",
    score: 88,
  },
  {
    id: "lead-3",
    name: "Mumbai Bites Restaurant",
    city: "Mumbai",
    industry: "F&B",
    score: 85,
  },
  {
    id: "lead-4",
    name: "TechFlow Solutions",
    city: "Bangalore",
    industry: "Tech",
    score: 82,
  },
  {
    id: "lead-5",
    name: "Radiance Clinic",
    city: "Pune",
    industry: "Healthcare",
    score: 79,
  },
  {
    id: "lead-6",
    name: "Sunrise Auto Works",
    city: "Chennai",
    industry: "Auto",
    score: 76,
  },
  {
    id: "lead-7",
    name: "Om Jewellers",
    city: "Surat",
    industry: "Retail",
    score: 73,
  },
  {
    id: "lead-8",
    name: "Green Leaf Organic",
    city: "Hyderabad",
    industry: "Food",
    score: 68,
  },
  {
    id: "lead-9",
    name: "Skyline Real Estate",
    city: "Ahmedabad",
    industry: "Real Estate",
    score: 65,
  },
  {
    id: "lead-10",
    name: "Craft Brew House",
    city: "Goa",
    industry: "Hospitality",
    score: 61,
  },
];

const PIPELINE_STAGES = [
  {
    id: "new",
    label: "New Lead",
    bgClass: "bg-primary/10",
    textClass: "text-primary",
    leads: [
      { id: "p-n-1", name: "Arjun Fitness Studio", score: 94, time: "2h ago" },
      { id: "p-n-2", name: "Delhi Dine House", score: 78, time: "4h ago" },
      { id: "p-n-3", name: "Swift Movers Co.", score: 65, time: "6h ago" },
    ],
  },
  {
    id: "contacted",
    label: "Contacted",
    bgClass: "bg-warning/10",
    textClass: "text-warning",
    leads: [
      { id: "p-c-1", name: "Priya Beauty Salon", score: 88, time: "1d ago" },
      { id: "p-c-2", name: "Cloud Kitchen 9", score: 72, time: "2d ago" },
    ],
  },
  {
    id: "interested",
    label: "Interested",
    bgClass: "bg-success/10",
    textClass: "text-success",
    leads: [
      { id: "p-i-1", name: "TechFlow Solutions", score: 82, time: "3d ago" },
      { id: "p-i-2", name: "Sunrise Auto Works", score: 76, time: "4d ago" },
    ],
  },
  {
    id: "proposal",
    label: "Proposal Sent",
    bgClass: "bg-premium-accent-light",
    textClass: "text-premium-accent",
    leads: [
      { id: "p-pr-1", name: "Radiance Clinic", score: 79, time: "5d ago" },
      { id: "p-pr-2", name: "Om Jewellers", score: 73, time: "6d ago" },
    ],
  },
  {
    id: "closed",
    label: "Closed",
    bgClass: "bg-success/15",
    textClass: "text-success",
    leads: [
      { id: "p-cl-1", name: "Skyline Real Estate", score: 91, time: "1w ago" },
      { id: "p-cl-2", name: "Craft Brew House", score: 85, time: "2w ago" },
      { id: "p-cl-3", name: "Green Leaf Organic", score: 77, time: "2w ago" },
    ],
  },
];

const CAMPAIGN_PLATFORMS = [
  {
    id: "google_ads",
    name: "Google Ads",
    spend: "₹18,400",
    reach: "42,000",
    leads: 38,
    roi: "312%",
    roiNum: 312,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        aria-label="Google Ads"
      >
        <title>Google Ads</title>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: "meta_ads",
    name: "Meta Ads",
    spend: "₹12,800",
    reach: "68,500",
    leads: 55,
    roi: "428%",
    roiNum: 428,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="#1877F2"
        aria-label="Meta Ads"
      >
        <title>Meta Ads</title>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    spend: "₹8,200",
    reach: "31,000",
    leads: 22,
    roi: "268%",
    roiNum: 268,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="#FF0000"
        aria-label="YouTube"
      >
        <title>YouTube</title>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    spend: "₹9,600",
    reach: "54,200",
    leads: 41,
    roi: "427%",
    roiNum: 427,
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Instagram">
        <title>Instagram</title>
        <defs>
          <linearGradient id="ig-dash-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-dash-grad)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    spend: "₹6,800",
    reach: "18,400",
    leads: 19,
    roi: "279%",
    roiNum: 279,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="#0A66C2"
        aria-label="LinkedIn"
      >
        <title>LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const CLIENT_DATA = [
  {
    id: "cl-1",
    name: "Arjun Fitness Studio",
    leads: 34,
    traffic: 68,
    roi: "₹42k",
  },
  {
    id: "cl-2",
    name: "Priya Beauty Salon",
    leads: 28,
    traffic: 52,
    roi: "₹31k",
  },
  {
    id: "cl-3",
    name: "TechFlow Solutions",
    leads: 19,
    traffic: 41,
    roi: "₹58k",
  },
  { id: "cl-4", name: "Radiance Clinic", leads: 23, traffic: 35, roi: "₹27k" },
  { id: "cl-5", name: "Om Jewellers", leads: 15, traffic: 29, roi: "₹19k" },
];

const SEO_KEYWORDS = [
  { id: "kw-1", keyword: "digital marketing agency mumbai", pos: 3, change: 2 },
  { id: "kw-2", keyword: "lead generation services india", pos: 7, change: -1 },
  { id: "kw-3", keyword: "seo services for restaurants", pos: 5, change: 4 },
  { id: "kw-4", keyword: "social media marketing pune", pos: 9, change: 3 },
  { id: "kw-5", keyword: "google ads management india", pos: 12, change: -2 },
];

const AI_ACTIONS = [
  {
    id: "ai-1",
    text: "Contact 10 high-score leads in Mumbai",
    sub: "Potential ₹1.5L revenue opportunity",
    action: "Contact Now",
    to: "/leads",
  },
  {
    id: "ai-2",
    text: "Follow up with 5 interested leads",
    sub: "Replies within 24h have 3× close rate",
    action: "Follow Up",
    to: "/outreach",
  },
  {
    id: "ai-3",
    text: "SEO audit for 3 restaurant owners in Delhi",
    sub: "Easy close opportunity — high intent niche",
    action: "Create Audit",
    to: "/seo",
  },
];

// ─── Sparkline ────────────────────────────────────────────────────────────────

function SparklineChart({ data, color }: { data: number[]; color: string }) {
  const points = data.map((v) => ({ v }));
  const ck = color.replace(/[^a-z0-9]/gi, "");
  return (
    <ResponsiveContainer width="100%" height={40}>
      <AreaChart
        data={points}
        margin={{ top: 2, right: 0, bottom: 2, left: 0 }}
      >
        <defs>
          <linearGradient id={`spark-${ck}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          fill={`url(#spark-${ck})`}
          dot={false}
          isAnimationActive
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function LeadScoreBadge({ score }: { score: number }) {
  const cls =
    score >= 80
      ? "bg-destructive/10 text-destructive"
      : score >= 60
        ? "bg-warning/10 text-warning"
        : "bg-muted text-muted-foreground";
  const label = score >= 80 ? "Hot" : score >= 60 ? "Warm" : "Cold";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold",
        cls,
      )}
    >
      <span>{score}</span>
      <span className="font-medium opacity-75">{label}</span>
    </span>
  );
}

function ChecklistItem({
  id,
  label,
  done,
  target,
}: { id: string; label: string; done: number; target: number }) {
  const pct = Math.min(100, Math.round((done / target) * 100));
  const isDone = done >= target;
  return (
    <div data-ocid={`dashboard.checklist.${id}`} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isDone ? (
            <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
          <span
            className={cn(
              "text-sm",
              isDone ? "line-through text-muted-foreground" : "text-foreground",
            )}
          >
            {label}
          </span>
        </div>
        <span className="text-xs text-muted-foreground tabular-nums font-mono">
          {done}/{target}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className={cn("progress-bar-fill", isDone && "bg-success")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── KPI Icon ─────────────────────────────────────────────────────────────────

function KpiIcon({ id, className }: { id: string; className?: string }) {
  if (id === "hot_leads") return <Flame className={className} />;
  if (id === "messages_sent")
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-label="Messages"
      >
        <title>Messages</title>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  if (id === "replies")
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-label="Replies"
      >
        <title>Replies</title>
        <polyline points="9 14 4 9 9 4" />
        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
      </svg>
    );
  if (id === "deals_closed") return <CheckCircle2 className={className} />;
  if (id === "revenue_potential")
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-label="Revenue"
      >
        <title>Revenue</title>
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  return <TrendingUp className={className} />;
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function AnimatedValue({
  rawValue,
  displayValue,
}: { rawValue: number; displayValue: string }) {
  const counted = useAnimatedCounter(rawValue);
  let shown = displayValue;
  if (displayValue.endsWith("%")) shown = `${counted}%`;
  else if (displayValue.startsWith("₹"))
    shown = fmtINR((counted / rawValue) * rawValue);
  else shown = String(counted);
  return (
    <p className="text-xl font-bold font-display text-foreground tabular-nums mt-0.5">
      {shown}
    </p>
  );
}

function KpiCard({ kpi, index }: { kpi: (typeof KPI_DATA)[0]; index: number }) {
  const isPositive = kpi.change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.4 }}
    >
      <Card
        data-ocid={`dashboard.kpi.${kpi.id}`}
        className="shadow-card border-border/60 hover:shadow-elevated transition-smooth hover-lift cursor-default"
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider truncate">
                {kpi.label}
              </p>
              <AnimatedValue
                rawValue={kpi.rawValue}
                displayValue={kpi.displayValue}
              />
            </div>
            <div
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ml-2",
                kpi.iconBg,
              )}
            >
              <KpiIcon id={kpi.id} className={cn("w-4 h-4", kpi.iconColor)} />
            </div>
          </div>
          <div className="sparkline-container h-10">
            <SparklineChart data={kpi.sparkline} color={kpi.lineColor} />
          </div>
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-xs font-bold px-1.5 py-0.5 rounded-full",
                kpi.statusBg,
                kpi.statusColor,
              )}
            >
              {kpi.status}
            </span>
            <span
              className={cn(
                "text-xs font-semibold flex items-center gap-0.5",
                isPositive ? "text-success" : "text-destructive",
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {isPositive ? "+" : ""}
              {kpi.change}%
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: leads = [] } = useLeads();
  const { data: clients = [] } = useClients();
  const { data: messages = [] } = useOutreachMessages();
  const { data: campaigns = [] } = useOutreachCampaigns();
  const { data: gamification } = useGamificationState();
  const recordAction = useRecordDailyAction();

  const _newLeads = leads.filter((l) => l.status === LeadStatus.new_);
  const contactedLeads = leads.filter((l) => l.status === LeadStatus.contacted);
  const proposalLeads = leads.filter((l) => l.status === LeadStatus.proposal);
  const closedLeads = leads.filter((l) => l.status === LeadStatus.closed);

  const actualRevenue =
    clients.length > 0
      ? clients.reduce((sum, c) => sum + Number(c.metrics.revenue), 0)
      : closedLeads.length * 25000;

  const todaysMessages = messages.length;
  const repliedMessages = messages.filter(
    (m) => m.status === "replied" || m.status === "delivered",
  ).length;

  const checklistItems = [
    {
      id: "contact",
      label: "Contact 10 leads",
      done: Math.min(10, todaysMessages),
      target: 10,
    },
    {
      id: "launch",
      label: "Launch 1 campaign",
      done: Math.min(1, campaigns.length),
      target: 1,
    },
    {
      id: "followup",
      label: "Follow up 5 leads",
      done: Math.min(5, repliedMessages),
      target: 5,
    },
  ];

  function roiBadgeClass(roi: number) {
    if (roi >= 400) return "bg-success/10 text-success";
    if (roi >= 250) return "bg-warning/10 text-warning";
    return "bg-muted text-muted-foreground";
  }

  function posChange(change: number) {
    if (change > 0)
      return (
        <span className="text-success text-xs font-semibold">▲{change}</span>
      );
    if (change < 0)
      return (
        <span className="text-destructive text-xs font-semibold">
          ▼{Math.abs(change)}
        </span>
      );
    return <span className="text-muted-foreground text-xs">—</span>;
  }

  const seoScore = 72;
  const seoRadius = 38;
  const seoCircumference = 2 * Math.PI * seoRadius;
  const seoScoreDash = (seoScore / 100) * seoCircumference;

  return (
    <div data-ocid="dashboard.page" className="space-y-6 max-w-[1440px]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden border border-border/50 gradient-hero"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[40%] h-full opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at top right, oklch(0.6 0.25 253 / 0.3), transparent 70%)",
            }}
          />
        </div>
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                {gamification && (
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/50 bg-card/60"
                    data-ocid="dashboard.streak_badge"
                  >
                    <Flame className="w-3.5 h-3.5 text-warning" />
                    <span className="text-xs font-bold text-foreground">
                      {gamification.dailyStreak} day streak
                    </span>
                  </div>
                )}
                <Badge
                  className="gradient-premium border-primary/20 text-premium-accent font-semibold text-xs"
                  data-ocid="dashboard.plan_badge"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Pro Plan
                </Badge>
              </div>
              <div>
                <h1 className="text-3xl font-bold font-display text-foreground">
                  {greeting()}, Rajesh 👋
                </h1>
                <p className="text-base text-muted-foreground mt-1">
                  Today's Growth Plan —{" "}
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/command-center"
                  data-ocid="dashboard.hero.get_clients_button"
                >
                  <Button
                    size="lg"
                    className="h-11 gap-2.5 font-bold btn-primary-glow border-0"
                  >
                    <Zap className="w-4 h-4" />
                    Get Clients Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link
                  to="/ads"
                  data-ocid="dashboard.hero.create_campaign_button"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 gap-2 font-semibold border-border/60 hover:border-primary/40 transition-smooth"
                  >
                    <Rocket className="w-4 h-4 text-primary" />
                    Create Campaign
                  </Button>
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              data-ocid="dashboard.hero.revenue_card"
              className="lg:w-72 rounded-xl border border-primary/20 bg-card/80 backdrop-blur-sm p-5 shadow-elevated"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-warning" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  Revenue Opportunity
                </span>
              </div>
              <p className="text-2xl font-bold font-display text-foreground mb-1">
                ₹25,000–₹75,000
              </p>
              <p className="text-sm text-muted-foreground">
                Estimated opportunity today
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Today's target progress
                  </span>
                  <span className="font-semibold text-foreground">
                    {Math.min(100, Math.round((actualRevenue / 100000) * 100))}%
                  </span>
                </div>
                <Progress
                  value={Math.min(
                    100,
                    Math.round((actualRevenue / 100000) * 100),
                  )}
                  className="h-1.5"
                  data-ocid="dashboard.hero.revenue_progress"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {KPI_DATA.map((kpi, i) => (
          <KpiCard key={kpi.id} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Lead Opportunities + AI Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-3"
        >
          <Card
            data-ocid="dashboard.lead_opportunities"
            className="shadow-card border-border/60 h-full"
          >
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-destructive/10">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-destructive fill-none stroke-current stroke-2"
                      aria-label="Leads"
                    >
                      <title>Leads</title>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <CardTitle className="text-sm font-semibold">
                    Top Lead Opportunities
                  </CardTitle>
                  <Badge className="bg-destructive/10 text-destructive border-0 font-bold text-xs">
                    {MOCK_LEADS.length}
                  </Badge>
                </div>
                <Link
                  to="/leads"
                  className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                  data-ocid="dashboard.lead_opportunities.view_all"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[380px]">
                <div className="divide-y divide-border/30">
                  {MOCK_LEADS.map((lead, idx) => (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                      data-ocid={`dashboard.lead_opportunities.item.${idx + 1}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-fast"
                    >
                      <span className="w-5 text-xs text-muted-foreground font-mono tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {lead.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {lead.city}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 border-border/50 font-medium"
                          >
                            {lead.industry}
                          </Badge>
                        </div>
                      </div>
                      <LeadScoreBadge score={lead.score} />
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2.5 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60 shrink-0 transition-fast"
                        data-ocid={`dashboard.lead_opportunities.send_pitch.${idx + 1}`}
                        onClick={() =>
                          toast.success(`Pitch sent to ${lead.name}!`)
                        }
                      >
                        Send Pitch
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 space-y-4"
        >
          <Card
            data-ocid="dashboard.ai_panel"
            className="shadow-card border-primary/20 gradient-premium"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Zap className="w-4 h-4 text-premium-accent" />
                </div>
                <CardTitle className="text-sm font-semibold">
                  AI Recommendations
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {AI_ACTIONS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  data-ocid={`dashboard.ai_panel.item.${idx + 1}`}
                  className="rounded-lg border border-border/40 bg-card/60 p-3 space-y-2 hover-lift transition-hover"
                >
                  <p className="text-xs font-semibold text-foreground leading-snug">
                    {item.text}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {item.sub}
                  </p>
                  <Link
                    to={item.to}
                    data-ocid={`dashboard.ai_panel.action.${idx + 1}`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2.5 text-[11px] font-semibold border-primary/30 text-primary hover:bg-primary/5 w-full"
                    >
                      {item.action} <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card
            data-ocid="dashboard.checklist"
            className="shadow-card border-border/60"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg gradient-premium">
                  <Flame className="w-3.5 h-3.5 text-premium-accent" />
                </div>
                <CardTitle className="text-sm font-semibold">
                  Daily Checklist
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {checklistItems.map((item) => (
                <ChecklistItem key={item.id} {...item} />
              ))}
              <Button
                className="w-full h-8 text-xs font-semibold gap-1.5 mt-1 gradient-funnel border-0"
                onClick={() => {
                  recordAction.mutate("daily-review");
                  toast.success("Daily actions recorded! 🔥");
                }}
                data-ocid="dashboard.checklist.complete_button"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark All Complete
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sales Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card
          data-ocid="dashboard.pipeline"
          className="shadow-card border-border/60"
        >
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-warning/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-none stroke-warning stroke-2"
                    aria-label="Pipeline"
                  >
                    <title>Pipeline</title>
                    <rect x="3" y="3" width="4" height="18" rx="1" />
                    <rect x="10" y="6" width="4" height="15" rx="1" />
                    <rect x="17" y="9" width="4" height="12" rx="1" />
                  </svg>
                </div>
                <CardTitle className="text-sm font-semibold">
                  Sales Pipeline
                </CardTitle>
              </div>
              <Link
                to="/crm"
                className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                data-ocid="dashboard.pipeline.view_crm"
              >
                Open CRM <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
              {PIPELINE_STAGES.map((stage, sIdx) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sIdx * 0.07 }}
                  data-ocid={`dashboard.pipeline.${stage.id}`}
                  className="rounded-xl border border-border/40 bg-muted/20 p-3 space-y-2 hover-lift transition-hover"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      {stage.label}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold px-1.5 py-0.5 rounded-full",
                        stage.bgClass,
                        stage.textClass,
                      )}
                    >
                      {stage.leads.length}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {stage.leads.map((lead, lIdx) => (
                      <div
                        key={lead.id}
                        data-ocid={`dashboard.pipeline.${stage.id}.item.${lIdx + 1}`}
                        className="rounded-lg bg-card border border-border/30 p-2 space-y-1"
                      >
                        <p className="text-[11px] font-semibold text-foreground leading-tight truncate">
                          {lead.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <LeadScoreBadge score={lead.score} />
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {lead.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Campaign Performance + SEO Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card
            data-ocid="dashboard.campaigns"
            className="shadow-card border-border/60 h-full"
          >
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Rocket className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-sm font-semibold">
                    Active Campaigns
                  </CardTitle>
                </div>
                <Link
                  to="/ads"
                  className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                  data-ocid="dashboard.campaigns.manage"
                >
                  Manage <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {CAMPAIGN_PLATFORMS.map((platform, idx) => (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.07 }}
                    data-ocid={`dashboard.campaigns.platform.${idx + 1}`}
                    className="flex items-center gap-4 p-3 rounded-xl border border-border/40 hover:bg-muted/20 transition-fast hover-lift transition-hover"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-card border border-border/40 shrink-0">
                      {platform.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {platform.name}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          Spend:{" "}
                          <span className="font-medium text-foreground">
                            {platform.spend}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Reach:{" "}
                          <span className="font-medium text-foreground">
                            {platform.reach}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Leads:{" "}
                          <span className="font-medium text-foreground">
                            {platform.leads}
                          </span>
                        </span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold shrink-0",
                        roiBadgeClass(platform.roiNum),
                      )}
                    >
                      {platform.roi} ROI
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Card
            data-ocid="dashboard.seo_health"
            className="shadow-card border-border/60 h-full"
          >
            <CardHeader className="pb-3 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
                    <BarChart3 className="w-4 h-4 text-success" />
                  </div>
                  <CardTitle className="text-sm font-semibold">
                    SEO Health
                  </CardTitle>
                </div>
                <Link
                  to="/seo"
                  className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                  data-ocid="dashboard.seo_health.view_seo"
                >
                  Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    aria-label={`SEO score ${seoScore} out of 100`}
                  >
                    <title>SEO Score</title>
                    <circle
                      cx="50"
                      cy="50"
                      r={seoRadius}
                      fill="none"
                      stroke="oklch(var(--border))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={seoRadius}
                      fill="none"
                      stroke="oklch(var(--success))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${seoScoreDash} ${seoCircumference}`}
                      transform="rotate(-90 50 50)"
                      style={{ transition: "stroke-dasharray 1s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold font-display text-foreground tabular-nums">
                      {seoScore}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      /100
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                  Keyword Rankings
                </p>
                <div className="space-y-1.5">
                  {SEO_KEYWORDS.map((kw, idx) => (
                    <div
                      key={kw.id}
                      data-ocid={`dashboard.seo_health.keyword.${idx + 1}`}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-xs text-foreground truncate flex-1">
                        {kw.keyword}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs font-mono font-bold text-foreground">
                          #{kw.pos}
                        </span>
                        {posChange(kw.change)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-warning font-semibold">
                    ⚠ 3 technical issues found
                  </span>
                  <Link
                    to="/seo"
                    className="text-primary hover:underline"
                    data-ocid="dashboard.seo_health.fix_issues"
                  >
                    Fix
                  </Link>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Content gaps</span>
                  <span className="font-semibold text-foreground">
                    12 opportunities
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">
                      Local SEO score
                    </span>
                    <span className="font-bold text-foreground">68/100</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "68%" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Client Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card
          data-ocid="dashboard.client_performance"
          className="shadow-card border-border/60"
        >
          <CardHeader className="pb-3 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-success/10">
                  <Users className="w-4 h-4 text-success" />
                </div>
                <CardTitle className="text-sm font-semibold">
                  Client Performance
                </CardTitle>
              </div>
              <Link
                to="/clients"
                className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
                data-ocid="dashboard.client_performance.view_all"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left text-xs text-muted-foreground font-semibold pb-2 uppercase tracking-wide">
                      Client
                    </th>
                    <th className="text-right text-xs text-muted-foreground font-semibold pb-2 uppercase tracking-wide">
                      Leads
                    </th>
                    <th className="text-right text-xs text-muted-foreground font-semibold pb-2 uppercase tracking-wide">
                      Traffic
                    </th>
                    <th className="text-right text-xs text-muted-foreground font-semibold pb-2 uppercase tracking-wide">
                      Monthly ROI
                    </th>
                    <th className="text-right text-xs text-muted-foreground font-semibold pb-2 uppercase tracking-wide" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {CLIENT_DATA.map((client, idx) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      data-ocid={`dashboard.client_performance.item.${idx + 1}`}
                      className="hover:bg-muted/20 transition-fast"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full gradient-kpi flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-primary">
                              {client.name.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-semibold text-foreground text-sm truncate">
                            {client.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right tabular-nums font-semibold text-foreground">
                        {client.leads}
                      </td>
                      <td className="py-3 text-right">
                        <span className="text-success font-semibold text-xs flex items-center justify-end gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {client.traffic}%
                        </span>
                      </td>
                      <td className="py-3 text-right tabular-nums font-bold text-foreground font-display">
                        {client.roi}
                      </td>
                      <td className="py-3 text-right pl-3">
                        <Link
                          to="/clients"
                          data-ocid={`dashboard.client_performance.report.${idx + 1}`}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2.5 text-[11px] font-semibold border-border/50 hover:border-primary/40 hover:text-primary"
                          >
                            Report{" "}
                            <ArrowUpRight className="w-2.5 h-2.5 ml-0.5" />
                          </Button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Premium Locked + Upgrade Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card
            data-ocid="dashboard.premium_locked"
            className="shadow-card border-primary/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/80 backdrop-blur-[3px]">
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full gradient-premium">
                  <Lock className="w-5 h-5 text-premium-accent" />
                </div>
                <Badge className="gradient-premium border-primary/30 text-premium-accent font-bold text-xs px-3">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Premium Feature
                </Badge>
                <p className="font-bold font-display text-lg text-foreground">
                  AI Competitor Intelligence
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Track competitors' ad spend, traffic trends, and SEO rankings
                  to outmaneuver them automatically.
                </p>
                <Link
                  to="/billing"
                  data-ocid="dashboard.premium_locked.upgrade_button"
                >
                  <Button className="gap-2 btn-primary-glow border-0 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground/50">
                Competitor Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 filter blur-[2px] pointer-events-none select-none">
              {["Rival Agency A", "Digital Boost Co", "MarketPro India"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/30"
                  >
                    <span className="text-sm font-medium">{name}</span>
                    <div className="flex gap-2">
                      <Badge variant="outline">Ad Spend ₹2.4L</Badge>
                      <Badge className="bg-destructive/10 text-destructive">
                        Gaining
                      </Badge>
                    </div>
                  </div>
                ),
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-4"
        >
          <Card
            data-ocid="dashboard.upgrade_banner"
            className="shadow-card border-primary/20 gradient-premium"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-premium-accent" />
                <p className="text-sm font-bold text-foreground">
                  Unlock Full Power
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Unlimited leads, AI outreach automation, competitor insights,
                and advanced analytics.
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">AI Credits</span>
                  <span className="font-semibold text-foreground">
                    {gamification?.creditsEarned ?? 240}/500
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${((gamification?.creditsEarned ?? 240) / 500) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">AI Automations</span>
                  <span className="font-semibold text-foreground">38/50</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: "76%" }} />
                </div>
              </div>
              <Link
                to="/billing"
                data-ocid="dashboard.upgrade_banner.upgrade_button"
              >
                <Button
                  size="sm"
                  className="w-full gap-1.5 font-semibold btn-primary-glow border-0"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Upgrade Plan
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card
            data-ocid="dashboard.revenue_snapshot"
            className="shadow-card border-border/60"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Revenue Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  id: "rv-1",
                  label: "Pipeline Value",
                  value: fmtINR(
                    proposalLeads.length * 25000 +
                      contactedLeads.length * 10000,
                  ),
                  color: "text-foreground",
                },
                {
                  id: "rv-2",
                  label: "Actual Revenue",
                  value: fmtINR(actualRevenue),
                  color: "text-success",
                },
                {
                  id: "rv-3",
                  label: "Avg Deal Size",
                  value: "₹25k",
                  color: "text-foreground",
                },
              ].map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0"
                >
                  <span className="text-xs text-muted-foreground">
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold font-display tabular-nums",
                      row.color,
                    )}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">
                    Monthly target (₹1L)
                  </span>
                  <span className="font-bold text-foreground">
                    {Math.min(100, Math.round((actualRevenue / 100000) * 100))}%
                  </span>
                </div>
                <Progress
                  value={Math.min(
                    100,
                    Math.round((actualRevenue / 100000) * 100),
                  )}
                  className="h-1.5"
                  data-ocid="dashboard.revenue_snapshot.progress"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground/60 pb-2">
        Platform logos are trademarks of their respective owners. GrowthOS is
        not affiliated with or endorsed by these platforms.
      </p>
    </div>
  );
}
