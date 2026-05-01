import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Info,
  Loader2,
  MapPin,
  MessageSquare,
  Play,
  Plus,
  RefreshCw,
  Search,
  SearchCheck,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  XCircle,
  ZapIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type AuditStatus = "pass" | "warning" | "fail";
type OpportunityLevel = "High" | "Medium" | "Low";

interface AuditCheckItem {
  label: string;
  status: AuditStatus;
  fixSuggestion: string;
  category: "technical" | "onpage" | "content";
}

interface KeywordRow {
  keyword: string;
  position: number;
  prevPosition: number;
  searchVolume: string;
  difficulty: "easy" | "medium" | "hard";
  url: string;
}

interface CompetitorGapRow {
  keyword: string;
  competitorRank: number;
  searchVolume: string;
  opportunity: OpportunityLevel;
}

interface BlogOutline {
  title: string;
  wordCount: number;
  targetKeyword: string;
  metaDescription: string;
  sections: string[];
}

interface GBPItem {
  label: string;
  status: boolean;
}

interface ReviewItem {
  name: string;
  rating: number;
  text: string;
  date: string;
  responded: boolean;
}

interface GoogleMapsRank {
  keyword: string;
  position: number;
  change: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const AUDIT_CHECKS: AuditCheckItem[] = [
  // Technical
  {
    label: "Page Speed Score",
    status: "warning",
    fixSuggestion:
      "Optimize images with WebP format and enable browser caching. Current score is 68/100.",
    category: "technical",
  },
  {
    label: "Mobile-Friendly",
    status: "pass",
    fixSuggestion:
      "Your site is mobile responsive. Test periodically on real devices.",
    category: "technical",
  },
  {
    label: "HTTPS / SSL Certificate",
    status: "pass",
    fixSuggestion: "SSL is active. Renew before expiry to avoid ranking drops.",
    category: "technical",
  },
  {
    label: "XML Sitemap Submitted",
    status: "pass",
    fixSuggestion: "Re-submit sitemap after major content changes.",
    category: "technical",
  },
  {
    label: "Robots.txt Configured",
    status: "pass",
    fixSuggestion: "Ensure staging environment is blocked in robots.txt.",
    category: "technical",
  },
  {
    label: "Core Web Vitals (LCP, CLS)",
    status: "warning",
    fixSuggestion:
      "CLS score 0.18 exceeds 0.1 threshold. Reserve space for ads and images.",
    category: "technical",
  },
  {
    label: "Structured Data / Schema",
    status: "fail",
    fixSuggestion:
      "Add LocalBusiness JSON-LD schema. Missing rich snippet eligibility.",
    category: "technical",
  },
  // On-Page
  {
    label: "Title Tags (All Pages)",
    status: "pass",
    fixSuggestion: "Titles are under 60 chars with keywords. Review quarterly.",
    category: "onpage",
  },
  {
    label: "Meta Descriptions",
    status: "warning",
    fixSuggestion:
      "3 pages missing meta descriptions. Add 155-char compelling descriptions.",
    category: "onpage",
  },
  {
    label: "H1 Tags (One per page)",
    status: "fail",
    fixSuggestion: "4 pages have multiple H1 tags. Use a single H1 per page.",
    category: "onpage",
  },
  {
    label: "Image Alt Text",
    status: "warning",
    fixSuggestion:
      "38% of images missing alt text. Add descriptive alt for accessibility and SEO.",
    category: "onpage",
  },
  {
    label: "Canonical Tags",
    status: "warning",
    fixSuggestion:
      "2 pages have conflicting canonicals. Audit paginated and filtered URLs.",
    category: "onpage",
  },
  // Content
  {
    label: "Keyword Density (1–3%)",
    status: "pass",
    fixSuggestion:
      "Primary keywords at correct density. Use LSI keywords to improve authority.",
    category: "content",
  },
  {
    label: "Word Count (>600 words)",
    status: "pass",
    fixSuggestion: "Content length is good. Longer pages tend to rank better.",
    category: "content",
  },
  {
    label: "Internal Links Structure",
    status: "fail",
    fixSuggestion:
      "Multiple orphan pages with zero internal links. Create hub-and-spoke model.",
    category: "content",
  },
  {
    label: "Content Freshness",
    status: "warning",
    fixSuggestion:
      "3 service pages not updated in 6+ months. Add recent stats or case studies.",
    category: "content",
  },
  {
    label: "Duplicate Content",
    status: "pass",
    fixSuggestion:
      "No significant duplicate content found across indexed pages.",
    category: "content",
  },
  {
    label: "Readability Score",
    status: "pass",
    fixSuggestion:
      "Flesch reading ease is 68 (good). Target 60–70 for service business pages.",
    category: "content",
  },
];

const KEYWORD_ROWS: KeywordRow[] = [
  {
    keyword: "restaurant digital marketing mumbai",
    position: 4,
    prevPosition: 7,
    searchVolume: "1,900/mo",
    difficulty: "medium",
    url: "/services/restaurants",
  },
  {
    keyword: "salon social media management delhi",
    position: 8,
    prevPosition: 11,
    searchVolume: "1,400/mo",
    difficulty: "medium",
    url: "/services/salons",
  },
  {
    keyword: "digital marketing agency mumbai",
    position: 12,
    prevPosition: 12,
    searchVolume: "6,600/mo",
    difficulty: "hard",
    url: "/",
  },
  {
    keyword: "gym marketing services india",
    position: 6,
    prevPosition: 9,
    searchVolume: "880/mo",
    difficulty: "easy",
    url: "/services/gyms",
  },
  {
    keyword: "local seo for small business",
    position: 18,
    prevPosition: 23,
    searchVolume: "2,400/mo",
    difficulty: "medium",
    url: "/services/local-seo",
  },
  {
    keyword: "google ads management pune",
    position: 3,
    prevPosition: 5,
    searchVolume: "720/mo",
    difficulty: "easy",
    url: "/services/google-ads",
  },
  {
    keyword: "social media marketing bangalore",
    position: 22,
    prevPosition: 19,
    searchVolume: "4,400/mo",
    difficulty: "hard",
    url: "/services/social",
  },
  {
    keyword: "seo services for dental clinics",
    position: 5,
    prevPosition: 5,
    searchVolume: "590/mo",
    difficulty: "easy",
    url: "/services/dental",
  },
  {
    keyword: "lead generation agency india",
    position: 14,
    prevPosition: 20,
    searchVolume: "3,200/mo",
    difficulty: "medium",
    url: "/services/lead-gen",
  },
  {
    keyword: "whatsapp marketing for restaurants",
    position: 2,
    prevPosition: 4,
    searchVolume: "1,100/mo",
    difficulty: "easy",
    url: "/services/whatsapp",
  },
];

const COMPETITOR_GAPS: CompetitorGapRow[] = [
  {
    keyword: "digital marketing for real estate india",
    competitorRank: 3,
    searchVolume: "5,400/mo",
    opportunity: "High",
  },
  {
    keyword: "instagram marketing for salons",
    competitorRank: 5,
    searchVolume: "2,100/mo",
    opportunity: "High",
  },
  {
    keyword: "content marketing agency pune",
    competitorRank: 4,
    searchVolume: "1,600/mo",
    opportunity: "Medium",
  },
  {
    keyword: "email marketing for small business india",
    competitorRank: 7,
    searchVolume: "3,600/mo",
    opportunity: "High",
  },
  {
    keyword: "affordable seo mumbai",
    competitorRank: 2,
    searchVolume: "1,900/mo",
    opportunity: "Medium",
  },
];

const BLOG_OUTLINES: BlogOutline[] = [
  {
    title:
      "How to Get 50+ Monthly Customers for Your Mumbai Restaurant Using Google Ads",
    wordCount: 1400,
    targetKeyword: "restaurant digital marketing mumbai",
    metaDescription:
      "Discover proven Google Ads strategies that help Mumbai restaurants attract 50+ new customers every month. Real-world results, step-by-step guide.",
    sections: [
      "Why Mumbai Restaurants Are Losing Customers to Competitors Online",
      "Setting Up Your First Google Ads Campaign (Step-by-Step)",
      "Targeting the Right Customers: Location, Time, and Intent Signals",
      "Budget Optimization: Getting ₹5 Leads Instead of ₹50 Leads",
      "5 Restaurant Owners Who 10x'd Their Revenue With Google Ads",
    ],
  },
  {
    title:
      "The Complete Guide to Salon Marketing on Instagram in 2025 (Delhi Edition)",
    wordCount: 1200,
    targetKeyword: "salon social media management delhi",
    metaDescription:
      "Step-by-step Instagram marketing guide for Delhi salons. Learn posting schedules, reel ideas, and how to convert followers into walk-in clients.",
    sections: [
      "Why Delhi Salons Fail on Instagram (And How to Fix It)",
      "Content Calendar: What to Post and When",
      "Before/After Reels That Get 100K+ Views",
      "Converting Instagram Followers Into Paying Clients",
      "Free Tools Every Delhi Salon Owner Should Use",
    ],
  },
  {
    title: "7 Proven Local SEO Strategies for Small Business Owners in India",
    wordCount: 1100,
    targetKeyword: "local seo for small business",
    metaDescription:
      "Local SEO tactics that helped 200+ Indian small businesses rank on page 1 in 90 days. No technical expertise required.",
    sections: [
      "What Is Local SEO and Why It Matters for Indian Businesses",
      "Google Business Profile Optimization Checklist",
      "How to Get 50+ 5-Star Reviews in 30 Days",
      "Local Citations: The Fastest Way to Rank in Your City",
      "Monthly Local SEO Action Plan (Free Template)",
    ],
  },
];

const GBP_CHECKLIST: GBPItem[] = [
  { label: "Business listing claimed and verified", status: true },
  { label: "Business hours updated (incl. holidays)", status: true },
  { label: "10+ high-quality photos added", status: false },
  { label: "All reviews responded to within 48 hours", status: false },
  { label: "Weekly posts/updates published", status: false },
  { label: "Products/services listed with prices", status: true },
  { label: "Q&A section answered", status: false },
];

const REVIEWS: ReviewItem[] = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "Excellent service! Got 40+ new clients within the first month of working with them. Highly recommended for Mumbai businesses.",
    date: "2 days ago",
    responded: true,
  },
  {
    name: "Rahul Mehta",
    rating: 4,
    text: "Good results overall. Campaign ROI was around 3x which is solid for a new agency. Would like more frequent updates.",
    date: "5 days ago",
    responded: false,
  },
  {
    name: "Sneha Patel",
    rating: 5,
    text: "They transformed our salon's Instagram presence. From 400 to 12,000 followers in 3 months. Absolutely worth every rupee.",
    date: "1 week ago",
    responded: true,
  },
  {
    name: "Kiran Nair",
    rating: 3,
    text: "Decent keyword rankings but the onboarding process was a bit slow. Service improved after the first month.",
    date: "2 weeks ago",
    responded: false,
  },
  {
    name: "Aditya Gupta",
    rating: 5,
    text: "Best digital marketing agency in Bangalore. Our dental clinic now ranks #1 for all our target keywords. Revenue is up 65%.",
    date: "3 weeks ago",
    responded: true,
  },
];

const GOOGLE_MAPS_RANKS: GoogleMapsRank[] = [
  { keyword: "digital marketing agency near me", position: 3, change: 1 },
  { keyword: "social media management mumbai", position: 5, change: 2 },
  { keyword: "seo services near me", position: 7, change: -1 },
];

// Rank trend chart data for top 5 keywords (30 days, positions improve = lower number)
const RANK_TREND_DATA = Array.from({ length: 8 }, (_, i) => ({
  date: [
    "Apr 3",
    "Apr 7",
    "Apr 10",
    "Apr 14",
    "Apr 17",
    "Apr 21",
    "Apr 25",
    "Apr 30",
  ][i],
  "Restaurant Marketing": [14, 12, 11, 9, 7, 5, 4, 4][i],
  "Salon Social Media": [18, 16, 14, 12, 11, 9, 8, 8][i],
  "Google Ads Pune": [8, 7, 6, 5, 4, 3, 3, 3][i],
  "Local SEO": [28, 25, 23, 22, 21, 20, 18, 18][i],
  "Lead Generation": [24, 23, 21, 19, 18, 16, 14, 14][i],
}));

// ─── Shared Sub-Components ────────────────────────────────────────────────────

function AuditStatusIcon({ status }: { status: AuditStatus }) {
  if (status === "pass")
    return <CheckCircle2 className="w-4 h-4 shrink-0 text-success" />;
  if (status === "fail")
    return <XCircle className="w-4 h-4 shrink-0 text-destructive" />;
  return <AlertTriangle className="w-4 h-4 shrink-0 text-warning" />;
}

function StatusBadge({ status }: { status: AuditStatus }) {
  const cfg = {
    pass: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    fail: "bg-destructive/10 text-destructive border-destructive/20",
  };
  const labels = { pass: "Pass", warning: "Warning", fail: "Fail" };
  return (
    <Badge variant="outline" className={`text-xs font-semibold ${cfg[status]}`}>
      {labels[status]}
    </Badge>
  );
}

function CircularProgress({
  score,
  size = 120,
}: { score: number; size?: number }) {
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 75
      ? "oklch(var(--success))"
      : score >= 50
        ? "oklch(var(--warning))"
        : "oklch(var(--destructive))";
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        role="img"
        aria-label={`Score ${score}/100`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="oklch(var(--muted))"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease-in-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-display tabular-nums text-foreground">
          {score}
        </span>
        <span className="text-[10px] text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────

const STAT_CARDS = [
  {
    id: "score",
    label: "Overall SEO Score",
    value: 72,
    unit: "/100",
    change: "+8 pts this month",
    positive: true,
    icon: <BarChart2 className="w-5 h-5" />,
    isScore: true,
  },
  {
    id: "keywords",
    label: "Keywords Ranking",
    value: 47,
    unit: "keywords",
    change: "+12 since last audit",
    positive: true,
    icon: <Search className="w-5 h-5" />,
    isScore: false,
  },
  {
    id: "traffic",
    label: "Organic Traffic",
    value: "2,840",
    unit: "/mo",
    change: "+18% vs last month",
    positive: true,
    icon: <TrendingUp className="w-5 h-5" />,
    isScore: false,
  },
  {
    id: "issues",
    label: "Technical Issues",
    value: 8,
    unit: "issues",
    change: "3 critical, 5 warnings",
    positive: false,
    icon: <AlertTriangle className="w-5 h-5" />,
    isScore: false,
  },
];

// ─── Audit Tab ────────────────────────────────────────────────────────────────

const CATEGORY_META = {
  technical: { label: "Technical", icon: <ZapIcon className="w-4 h-4" /> },
  onpage: { label: "On-Page", icon: <FileText className="w-4 h-4" /> },
  content: { label: "Content", icon: <BookOpen className="w-4 h-4" /> },
} as const;

function AuditTab() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const passed = AUDIT_CHECKS.filter((c) => c.status === "pass").length;
  const warnings = AUDIT_CHECKS.filter((c) => c.status === "warning").length;
  const failed = AUDIT_CHECKS.filter((c) => c.status === "fail").length;

  const categories = ["technical", "onpage", "content"] as const;

  return (
    <div className="space-y-5">
      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Passed",
            count: passed,
            cls: "bg-success/10 text-success border-success/20",
          },
          {
            label: "Warnings",
            count: warnings,
            cls: "bg-warning/10 text-warning border-warning/20",
          },
          {
            label: "Failed",
            count: failed,
            cls: "bg-destructive/10 text-destructive border-destructive/20",
          },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl border px-4 py-3 text-center ${item.cls}`}
          >
            <p className="text-2xl font-bold font-display tabular-nums">
              {item.count}
            </p>
            <p className="text-xs font-semibold mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Per-Category Checklists */}
      {categories.map((cat) => {
        const items = AUDIT_CHECKS.filter((c) => c.category === cat);
        const catPassed = items.filter((c) => c.status === "pass").length;
        return (
          <Card
            key={cat}
            className="border-border/60 shadow-subtle"
            data-ocid={`seo.audit.${cat}.section`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <span className="text-primary">
                    {CATEGORY_META[cat].icon}
                  </span>
                  {CATEGORY_META[cat].label}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Progress
                    value={(catPassed / items.length) * 100}
                    className="w-16 h-1.5"
                  />
                  <Badge variant="outline" className="text-xs">
                    {catPassed}/{items.length}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-1 pb-4 space-y-1">
              {items.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  data-ocid={`seo.audit.${cat}.item.${idx + 1}`}
                >
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-smooth text-left group"
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                  >
                    <AuditStatusIcon status={item.status} />
                    <span
                      className={`text-sm flex-1 min-w-0 ${item.status === "fail" ? "text-destructive" : item.status === "warning" ? "text-warning" : "text-foreground"}`}
                    >
                      {item.label}
                    </span>
                    <StatusBadge status={item.status} />
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-muted-foreground shrink-0 ml-1 transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-7 mr-3 mb-2 px-3 py-3 rounded-lg bg-muted/40 border border-border/40">
                          <div className="flex items-start gap-2">
                            <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              <span className="font-semibold text-primary">
                                Fix:{" "}
                              </span>
                              {item.fixSuggestion}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// ─── Keywords Tab ─────────────────────────────────────────────────────────────

function PositionChange({ current, prev }: { current: number; prev: number }) {
  const diff = prev - current; // positive = improved
  if (diff > 0)
    return (
      <div className="flex items-center gap-1 text-success">
        <TrendingUp className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold tabular-nums">↑{diff}</span>
      </div>
    );
  if (diff < 0)
    return (
      <div className="flex items-center gap-1 text-destructive">
        <TrendingDown className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold tabular-nums">
          ↓{Math.abs(diff)}
        </span>
      </div>
    );
  return <span className="text-xs text-muted-foreground tabular-nums">→</span>;
}

const DIFF_STYLES = {
  easy: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20",
};

const OPPORTUNITY_STYLES: Record<OpportunityLevel, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground",
};

function KeywordsTab() {
  return (
    <div className="space-y-5">
      {/* Rank Trend Chart */}
      <Card
        className="border-border/60 shadow-subtle"
        data-ocid="seo.keywords.chart"
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Rank Trend — Top 5 Keywords (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={RANK_TREND_DATA}
                margin={{ top: 4, right: 8, bottom: 4, left: -8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="date"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  reversed
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  tickLine={false}
                  axisLine={false}
                  domain={[1, 35]}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  labelStyle={{
                    color: "oklch(var(--foreground))",
                    fontWeight: 600,
                  }}
                  formatter={(value: number) => [`#${value}`, ""]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11 }}
                />
                <Line
                  type="monotone"
                  dataKey="Restaurant Marketing"
                  stroke="oklch(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Salon Social Media"
                  stroke="oklch(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Google Ads Pune"
                  stroke="oklch(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Local SEO"
                  stroke="oklch(var(--chart-4))"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="4 2"
                />
                <Line
                  type="monotone"
                  dataKey="Lead Generation"
                  stroke="oklch(var(--chart-5))"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="4 2"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Keyword Tracker Table */}
      <Card
        className="border-border/60 shadow-subtle"
        data-ocid="seo.keywords.table"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <SearchCheck className="w-4 h-4 text-primary" />
              Keyword Tracker
              <Badge variant="secondary" className="text-xs ml-1">
                {KEYWORD_ROWS.length} keywords
              </Badge>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 h-8 text-xs"
              data-ocid="seo.keywords.refresh_button"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5 text-xs uppercase tracking-wide">
                    Keyword
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-right">
                    Position
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-right">
                    Previous
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide">
                    Change
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-right">
                    Volume
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide">
                    Difficulty
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide pr-5 max-w-[120px]">
                    URL
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {KEYWORD_ROWS.map((row, idx) => (
                  <motion.tr
                    key={row.keyword}
                    data-ocid={`seo.keywords.item.${idx + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="pl-5 py-3 font-medium text-sm text-foreground max-w-[200px]">
                      <span className="truncate block">{row.keyword}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`text-sm font-bold tabular-nums ${row.position <= 10 ? "text-success" : row.position <= 20 ? "text-warning" : "text-muted-foreground"}`}
                      >
                        #{row.position}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground tabular-nums">
                      #{row.prevPosition}
                    </TableCell>
                    <TableCell>
                      <PositionChange
                        current={row.position}
                        prev={row.prevPosition}
                      />
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground tabular-nums">
                      {row.searchVolume}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs capitalize ${DIFF_STYLES[row.difficulty]}`}
                      >
                        {row.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5">
                      <span className="text-xs font-mono text-muted-foreground truncate block max-w-[110px]">
                        {row.url}
                      </span>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Gap */}
      <Card
        className="border-border/60 shadow-subtle"
        data-ocid="seo.keywords.gap"
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-warning" />
            Competitor Keyword Gaps
            <Badge
              variant="outline"
              className="text-xs ml-1 bg-warning/10 text-warning border-warning/20"
            >
              5 opportunities
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="pl-5 text-xs uppercase tracking-wide">
                    Keyword
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-right">
                    Competitor Rank
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-right">
                    Search Vol.
                  </TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-right pr-5">
                    Opportunity
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPETITOR_GAPS.map((row, idx) => (
                  <TableRow
                    key={row.keyword}
                    data-ocid={`seo.keywords.gap.item.${idx + 1}`}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="pl-5 font-medium text-sm text-foreground">
                      {row.keyword}
                    </TableCell>
                    <TableCell className="text-right text-sm font-bold text-success tabular-nums">
                      #{row.competitorRank}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground tabular-nums">
                      {row.searchVolume}
                    </TableCell>
                    <TableCell className="text-right pr-5">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${OPPORTUNITY_STYLES[row.opportunity]}`}
                      >
                        {row.opportunity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="px-5 py-3 border-t border-border/40 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground italic">
              Based on publicly available data and heuristics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Content Tab ──────────────────────────────────────────────────────────────

const NICHES = [
  "Salons & Beauty",
  "Restaurants & Food",
  "Gyms & Fitness",
  "Dental Clinics",
  "Real Estate",
  "Legal Services",
  "Healthcare",
];

function ContentTab() {
  const [keyword, setKeyword] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setGenerated(false);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setGenerated(true);
    toast.success("3 blog outlines generated!");
  };

  return (
    <div className="space-y-5">
      <Card className="border-border/60 shadow-subtle">
        <CardContent className="pt-5 pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="blog-keyword" className="text-sm font-medium">
                Topic or Keyword
              </Label>
              <Input
                id="blog-keyword"
                data-ocid="seo.content.keyword_input"
                placeholder="e.g. best salon in Mumbai"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="blog-niche" className="text-sm font-medium">
                Business Niche
              </Label>
              <Select value={niche} onValueChange={setNiche}>
                <SelectTrigger
                  id="blog-niche"
                  data-ocid="seo.content.niche_select"
                  className="bg-background"
                >
                  <SelectValue placeholder="Select niche" />
                </SelectTrigger>
                <SelectContent>
                  {NICHES.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:self-end">
              <Button
                data-ocid="seo.content.generate_button"
                onClick={handleGenerate}
                disabled={loading || !keyword.trim()}
                className="w-full gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {loading ? "Generating…" : "Generate Ideas"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="flex flex-col items-center gap-3 py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Generating blog outlines…
          </p>
        </div>
      )}

      {!loading && !generated && (
        <div
          data-ocid="seo.content.empty_state"
          className="flex flex-col items-center gap-3 py-16 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <p className="font-semibold text-foreground">
            Generate SEO Blog Content
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">
            Enter a keyword and niche to get 3 ready-to-publish blog outlines
            with meta descriptions and section headings.
          </p>
        </div>
      )}

      {!loading && generated && (
        <div className="space-y-3" data-ocid="seo.content.results">
          {BLOG_OUTLINES.map((outline, idx) => (
            <motion.div
              key={outline.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card
                className="border-border/60 shadow-subtle"
                data-ocid={`seo.content.outline.item.${idx + 1}`}
              >
                <CardHeader className="pb-0">
                  <button
                    type="button"
                    className="flex items-start justify-between gap-3 text-left w-full"
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                    data-ocid={`seo.content.outline.toggle.${idx + 1}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge
                          variant="outline"
                          className="text-xs bg-primary/8 text-primary border-primary/20 shrink-0"
                        >
                          Blog {idx + 1}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ~{outline.wordCount} words
                        </span>
                      </div>
                      <CardTitle className="text-sm leading-snug text-foreground">
                        {outline.title}
                      </CardTitle>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 ${expanded === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                </CardHeader>
                <AnimatePresence>
                  {expanded === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <CardContent className="pt-4 pb-5 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                            <p className="text-xs text-muted-foreground mb-1">
                              Target Keyword
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {outline.targetKeyword}
                            </p>
                          </div>
                          <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                            <p className="text-xs text-muted-foreground mb-1">
                              Est. Word Count
                            </p>
                            <p className="text-sm font-semibold text-foreground">
                              {outline.wordCount} words
                            </p>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/40 border border-border/40">
                          <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                            Meta Description
                          </p>
                          <p className="text-sm text-foreground leading-relaxed">
                            {outline.metaDescription}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
                            5 Section Headings
                          </p>
                          <ol className="space-y-1.5">
                            {outline.sections.map((s, si) => (
                              <li key={s} className="flex items-start gap-2">
                                <span className="text-xs font-bold text-primary tabular-nums shrink-0 mt-0.5">
                                  {si + 1}.
                                </span>
                                <span className="text-sm text-foreground">
                                  {s}
                                </span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1.5 text-xs"
                            data-ocid={`seo.content.copy_button.${idx + 1}`}
                          >
                            <Plus className="w-3.5 h-3.5" /> Add to Calendar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1.5 text-xs"
                            data-ocid={`seo.content.export_button.${idx + 1}`}
                          >
                            <Download className="w-3.5 h-3.5" /> Export
                          </Button>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Local SEO Tab ────────────────────────────────────────────────────────────

function LocalSEOTab() {
  const gbpCompleted = GBP_CHECKLIST.filter((i) => i.status).length;
  const gbpScore = Math.round((gbpCompleted / GBP_CHECKLIST.length) * 100);

  return (
    <div className="space-y-5">
      {/* GBP + Citation Score Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* GBP Checklist */}
        <Card
          className="border-border/60 shadow-subtle"
          data-ocid="seo.local.gbp"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Google Business Profile
              </CardTitle>
              <div className="flex items-center gap-2">
                <Progress value={gbpScore} className="w-16 h-1.5" />
                <span className="text-xs font-bold text-foreground tabular-nums">
                  {gbpScore}%
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            {GBP_CHECKLIST.map((item, idx) => (
              <motion.div
                key={item.label}
                data-ocid={`seo.local.gbp.item.${idx + 1}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-smooth"
              >
                {item.status ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-success" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-border/60 shrink-0" />
                )}
                <span
                  className={`text-sm flex-1 ${item.status ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {item.label}
                </span>
                {!item.status && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-muted text-muted-foreground shrink-0"
                  >
                    Fix
                  </Badge>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Citation Score + Maps Rankings */}
        <div className="space-y-4">
          <Card
            className="border-border/60 shadow-subtle"
            data-ocid="seo.local.citation"
          >
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-4">
                <CircularProgress score={67} size={80} />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Local Citation Score
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Listed on 67% of key directories
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs bg-success/10 text-success border-success/20"
                    >
                      Google ✓
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs bg-success/10 text-success border-success/20"
                    >
                      Yelp ✓
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs bg-muted text-muted-foreground"
                    >
                      JD ✗
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-border/60 shadow-subtle"
            data-ocid="seo.local.maps_rank"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Google Maps Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pb-4">
              {GOOGLE_MAPS_RANKS.map((item, idx) => (
                <div
                  key={item.keyword}
                  data-ocid={`seo.local.maps.item.${idx + 1}`}
                  className="flex items-center justify-between gap-3 py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-smooth"
                >
                  <span className="text-sm text-foreground flex-1 min-w-0 truncate">
                    {item.keyword}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-sm font-bold tabular-nums ${item.position <= 5 ? "text-success" : "text-warning"}`}
                    >
                      #{item.position}
                    </span>
                    {item.change > 0 ? (
                      <span className="text-xs text-success font-semibold">
                        ↑{item.change}
                      </span>
                    ) : item.change < 0 ? (
                      <span className="text-xs text-destructive font-semibold">
                        ↓{Math.abs(item.change)}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Management */}
      <Card
        className="border-border/60 shadow-subtle"
        data-ocid="seo.local.reviews"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-warning" />
              Review Management
              <Badge variant="outline" className="text-xs ml-1">
                4.4 ★ avg
              </Badge>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              data-ocid="seo.local.respond_button"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Respond All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pb-5">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.name}
              data-ocid={`seo.local.review.item.${idx + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-smooth"
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </div>
                {review.responded ? (
                  <Badge
                    variant="outline"
                    className="text-xs bg-success/10 text-success border-success/20 shrink-0"
                  >
                    Responded
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1 shrink-0"
                    data-ocid={`seo.local.review.respond_button.${idx + 1}`}
                  >
                    <MessageSquare className="w-3 h-3" /> Reply
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed text-truncate-2">
                {review.text}
              </p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 px-1">
        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground italic">
          Local data based on publicly available signals. Connect Google
          Business Profile for real-time sync.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState("audit");

  return (
    <div data-ocid="seo.page" className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <span>GrowthOS</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">SEO Center</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
            SEO Center
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Rank higher, get more organic leads
          </p>
        </div>
        <Button
          className="btn-primary-glow gap-2 shrink-0 self-start"
          data-ocid="seo.run_audit_button"
        >
          <SearchCheck className="w-4 h-4" />
          Run New Audit
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map((card, idx) => (
          <motion.div
            key={card.id}
            data-ocid={`seo.stat.${card.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
          >
            <Card className="border-border/60 shadow-subtle hover-lift-sm cursor-default">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {card.icon}
                  </div>
                  {card.isScore ? (
                    <div className="text-right">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl font-bold font-display tabular-nums text-foreground">
                          {card.value}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {card.unit}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
                {!card.isScore && (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold font-display tabular-nums text-foreground">
                      {card.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {card.unit}
                    </span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mb-1">
                  {card.label}
                </p>
                <p
                  className={`text-xs font-medium ${card.positive ? "text-success" : "text-warning"}`}
                >
                  {card.change}
                </p>
                {card.isScore && <Progress value={72} className="h-1 mt-2" />}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-5"
      >
        <div className="overflow-x-auto">
          <TabsList
            className="bg-muted/60 border border-border/60 w-max"
            data-ocid="seo.tabs"
          >
            <TabsTrigger
              value="audit"
              data-ocid="seo.tab.audit"
              className="gap-1.5"
            >
              <SearchCheck className="w-3.5 h-3.5" />
              Audit
            </TabsTrigger>
            <TabsTrigger
              value="keywords"
              data-ocid="seo.tab.keywords"
              className="gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              Keywords
            </TabsTrigger>
            <TabsTrigger
              value="content"
              data-ocid="seo.tab.content"
              className="gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Content
            </TabsTrigger>
            <TabsTrigger
              value="local"
              data-ocid="seo.tab.local"
              className="gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              Local SEO
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="audit" className="mt-0">
          <AuditTab />
        </TabsContent>
        <TabsContent value="keywords" className="mt-0">
          <KeywordsTab />
        </TabsContent>
        <TabsContent value="content" className="mt-0">
          <ContentTab />
        </TabsContent>
        <TabsContent value="local" className="mt-0">
          <LocalSEOTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
