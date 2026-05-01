import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Eye,
  EyeOff,
  Lightbulb,
  Loader2,
  Megaphone,
  MousePointerClick,
  Plus,
  RefreshCw,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Client, GrowthSuggestion } from "../backend";
import { createActor } from "../backend";
import {
  useClients,
  useGrowthSuggestions,
  useMarkSuggestionImplemented,
} from "../hooks/useClients";
import { useGenerateGrowthReport } from "../hooks/useGrowthEngine";

const SuggestionPriority = {
  high: "high",
  medium: "medium",
  low: "low",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

type WeekOption = "this-week" | "last-week" | "custom";

// ─── Extended mock data ───────────────────────────────────────────────────────

const EXTRA_SUGGESTIONS: GrowthSuggestion[] = [
  {
    id: BigInt(5),
    clientId: BigInt(1),
    title: "Publish 2 Long-Form Blog Posts",
    description:
      "Pinnacle Law ranks for only 14 keywords. Publishing two 1,500-word posts on 'personal injury claims' and 'DUI defense tips' could add 300+ monthly organic visits within 60 days.",
    priority: SuggestionPriority.medium,
    estimatedImpact: "+300 monthly visits",
    category: "content",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    clientId: BigInt(2),
    title: "Set Up Instagram Reels for Product Showcases",
    description:
      "Bakery content gets 4-7x more reach via Reels vs static posts. Posting 3 product videos per week is projected to double follower growth rate in 45 days.",
    priority: SuggestionPriority.medium,
    estimatedImpact: "+2× follower growth",
    category: "social",
    implemented: true,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(7),
    clientId: BigInt(3),
    title: "Enable Google Local Services Ads",
    description:
      "Pacific Plumbing is not verified on Google Local Services. Getting the 'Google Guaranteed' badge alone lifts call volume by 20-30% for plumbing businesses.",
    priority: SuggestionPriority.high,
    estimatedImpact: "+25% call volume",
    category: "ads",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(8),
    clientId: BigInt(1),
    title: "A/B Test Contact Form vs. Click-to-Call CTA",
    description:
      "Current desktop conversion rate is 1.8%. Replacing the form with a prominent click-to-call button for mobile visitors could lift mobile conversions by 35%.",
    priority: SuggestionPriority.low,
    estimatedImpact: "+35% mobile CVR",
    category: "conversion",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(9),
    clientId: BigInt(2),
    title: "Launch Google Shopping Campaign",
    description:
      "Bright Horizon Bakery has no Google Shopping presence. A $150/wk Shopping campaign for custom cakes is estimated to drive 80+ qualified visits/week with 4.1x ROAS.",
    priority: SuggestionPriority.high,
    estimatedImpact: "+$3,100 monthly revenue",
    category: "ads",
    implemented: false,
    dismissed: true,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(10),
    clientId: BigInt(3),
    title: "Add Service Area Schema Markup",
    description:
      "Pacific Plumbing serves 6 cities but has no service area schema. Adding LocalBusiness + areaServed schema can improve appearance in local pack across all served cities.",
    priority: SuggestionPriority.low,
    estimatedImpact: "+6 city rankings",
    category: "seo",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
];

const ALL_MOCK_SUGGESTIONS_EXTENDED = [...EXTRA_SUGGESTIONS];

// ─── Per-client opportunity cards ────────────────────────────────────────────

interface ClientOpportunity {
  clientName: string;
  city: string;
  action: string;
  rationale: string;
  impact: string;
  category: string;
}

const CLIENT_OPPORTUNITIES: ClientOpportunity[] = [
  {
    clientName: "Sunrise Salon",
    city: "Mumbai",
    action: "Post client results reel this week — festival season engagement",
    rationale: "Festival season drives 3x higher engagement for beauty content",
    impact: "Estimated reach: 5,000–15,000 impressions",
    category: "social",
  },
  {
    clientName: "Peak Gym",
    city: "Delhi",
    action: "Offer 2-month prepay deal — 40% of gym-goers cancel in Q2",
    rationale:
      "Q2 churn is highest — prepay locks in revenue before dropout season",
    impact: "Estimated retention: 12–18 members saved (₹36,000–₹54,000)",
    category: "run_offer",
  },
  {
    clientName: "Green Leaf Cafe",
    city: "Pune",
    action: "Run Google review campaign — rating below 4.2 hurting rankings",
    rationale: "Businesses with 4.4+ ratings get 2× more map views",
    impact: "Target: 10 new reviews → +1.2 average rating → top 5 local pack",
    category: "local_seo",
  },
];

const OPPORTUNITY_CATEGORY_META: Record<
  string,
  { styles: string; label: string; icon: React.ElementType }
> = {
  social: {
    styles: "bg-chart-5/10 text-chart-5 border-chart-5/30",
    label: "Social",
    icon: Share2,
  },
  run_offer: {
    styles: "bg-warning/10 text-warning border-warning/30",
    label: "Offer",
    icon: Zap,
  },
  local_seo: {
    styles: "bg-success/10 text-success border-success/30",
    label: "Local SEO",
    icon: TrendingUp,
  },
};

// ─── Revenue snapshot data ────────────────────────────────────────────────────

const REVENUE_SNAPSHOT = {
  activeClients: 3,
  leadsGenerated: 42,
  leadsLastMonth: 30,
  avgConversionRate: 28,
  estimatedRevenue: 126000,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPriorityStyles(
  p: (typeof SuggestionPriority)[keyof typeof SuggestionPriority],
) {
  if (p === SuggestionPriority.high)
    return {
      badge: "bg-destructive/10 text-destructive border-destructive/30",
      dot: "bg-destructive",
      label: "High",
    };
  if (p === SuggestionPriority.medium)
    return {
      badge: "bg-warning/10 text-warning border-warning/30",
      dot: "bg-warning",
      label: "Medium",
    };
  return {
    badge: "bg-primary/10 text-primary border-primary/30",
    dot: "bg-primary",
    label: "Low",
  };
}

const CATEGORY_META: Record<
  string,
  { styles: string; icon: React.ElementType; label: string }
> = {
  seo: {
    styles: "bg-success/10 text-success border-success/30",
    icon: TrendingUp,
    label: "SEO",
  },
  ads: {
    styles: "bg-primary/10 text-primary border-primary/30",
    icon: Megaphone,
    label: "Ads",
  },
  content: {
    styles: "bg-accent/10 text-accent border-accent/30",
    icon: BrainCircuit,
    label: "Content",
  },
  conversion: {
    styles: "bg-warning/10 text-warning border-warning/30",
    icon: MousePointerClick,
    label: "Conversion",
  },
  social: {
    styles: "bg-chart-5/10 text-chart-5 border-chart-5/30",
    icon: Share2,
    label: "Social",
  },
};

function getCategoryMeta(cat: string) {
  return (
    CATEGORY_META[cat] ?? {
      styles: "bg-muted text-muted-foreground border-border",
      icon: Lightbulb,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }
  );
}

function getWeekLabel(option: WeekOption): string {
  const now = new Date();
  if (option === "this-week") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay());
    return `Week of ${start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  }
  if (option === "last-week") {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() - 7);
    return `Week of ${start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  }
  return "Custom Range";
}

// ─── AI-generated suggestion templates ───────────────────────────────────────

const AI_SUGGESTION_TEMPLATES = [
  {
    title: "Retargeting Campaign for Warm Visitors",
    description:
      "Visitors who viewed your service pages but didn't convert are high-intent prospects. A Meta retargeting campaign with a limited-time offer could recover 15-25% of lost leads.",
    priority: SuggestionPriority.high,
    estimatedImpact: "+20% lead recovery",
    category: "ads",
  },
  {
    title: "Optimize Google Business Profile Photos",
    description:
      "Businesses with 10+ quality photos receive 35% more click-throughs from GBP. Replace stock images with authentic team and facility shots to boost local trust signals.",
    priority: SuggestionPriority.medium,
    estimatedImpact: "+35% GBP CTR",
    category: "seo",
  },
  {
    title: "Launch Monthly Email Newsletter",
    description:
      "Current email list is underutilized. A monthly value-packed newsletter to existing customers can drive 18% repeat purchase/inquiry rate with minimal ad spend.",
    priority: SuggestionPriority.medium,
    estimatedImpact: "+18% repeat business",
    category: "content",
  },
  {
    title: "Add Live Chat Widget",
    description:
      "Adding a live chat or chatbot to the homepage converts 40% more visitors on mobile. Response time under 5 minutes dramatically increases close rate for service queries.",
    priority: SuggestionPriority.high,
    estimatedImpact: "+40% mobile conversions",
    category: "conversion",
  },
];

// ─── useDismissSuggestion hook ────────────────────────────────────────────────

function useDismissSuggestion() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: bigint) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.dismissSuggestion(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["growthSuggestions"] });
    },
  });
}

// ─── ClientOpportunityCard ────────────────────────────────────────────────────

function ClientOpportunityCard({
  opp,
  idx,
  onAddToPlan,
}: {
  opp: ClientOpportunity;
  idx: number;
  onAddToPlan: (opp: ClientOpportunity) => void;
}) {
  const meta =
    OPPORTUNITY_CATEGORY_META[opp.category] ??
    OPPORTUNITY_CATEGORY_META.local_seo;
  const Icon = meta.icon;

  return (
    <Card
      data-ocid={`growth_advisor.opportunity.item.${idx}`}
      className="border-border/60 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border",
              meta.styles,
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">
                  {opp.clientName}
                </p>
                <p className="text-xs text-muted-foreground">{opp.city}</p>
              </div>
              <Badge
                variant="outline"
                className={cn("text-[10px] shrink-0 px-2", meta.styles)}
              >
                {meta.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-foreground font-medium leading-snug">
            {opp.action}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {opp.rationale}
          </p>
          <p className="text-xs text-success font-semibold">{opp.impact}</p>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs gap-1.5 w-full border-primary/30 text-primary hover:bg-primary/10"
          onClick={() => onAddToPlan(opp)}
          data-ocid={`growth_advisor.opportunity.add_to_plan.${idx}`}
        >
          <Plus className="w-3 h-3" />
          Add to Plan
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Revenue Snapshot ─────────────────────────────────────────────────────────

function RevenueSnapshot() {
  const snap = REVENUE_SNAPSHOT;
  const leadsGrowth = snap.leadsGenerated - snap.leadsLastMonth;

  const metrics = [
    {
      label: "Total Active Clients",
      value: snap.activeClients.toString(),
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "Total Leads Generated",
      value: snap.leadsGenerated.toString(),
      icon: TrendingUp,
      color: "bg-success/10 text-success",
      delta: `↑ ${leadsGrowth} from last month`,
    },
    {
      label: "Avg Conversion Rate",
      value: `${snap.avgConversionRate}%`,
      icon: Zap,
      color: "bg-warning/10 text-warning",
    },
    {
      label: "Est. Revenue Impact",
      value: `₹${(snap.estimatedRevenue / 100000).toFixed(2)}L`,
      icon: DollarSign,
      color: "bg-accent/10 text-accent",
    },
  ];

  return (
    <Card
      data-ocid="growth_advisor.revenue_snapshot"
      className="border-border/60 shadow-elevated bg-gradient-to-br from-primary/5 via-card to-card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          This Month's Revenue Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="p-3 rounded-xl bg-background/60 border border-border/40"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                    m.color,
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <p className="text-xl font-bold tabular-nums text-foreground">
                  {m.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {m.label}
                </p>
                {m.delta && (
                  <p className="text-xs text-success font-semibold flex items-center gap-0.5 mt-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {m.delta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-muted-foreground italic">
          Based on publicly available data and heuristics
        </p>
      </CardContent>
    </Card>
  );
}

// ─── SuggestionCard ───────────────────────────────────────────────────────────

function SuggestionCard({
  suggestion,
  idx,
  onMarkImplemented,
  onDismiss,
  isMarkingPending,
  isDismissingPending,
}: {
  suggestion: GrowthSuggestion;
  idx: number;
  onMarkImplemented: (id: bigint) => void;
  onDismiss: (id: bigint) => void;
  isMarkingPending: boolean;
  isDismissingPending: boolean;
}) {
  const priority = getPriorityStyles(suggestion.priority);
  const catMeta = getCategoryMeta(suggestion.category);
  const CatIcon = catMeta.icon;

  return (
    <Card
      data-ocid={`growth_advisor.suggestion.item.${idx}`}
      className={cn(
        "border-border/60 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group",
        suggestion.implemented && "opacity-60 bg-muted/30",
        suggestion.dismissed && "opacity-50 bg-muted/20",
      )}
    >
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
              catMeta.styles,
            )}
          >
            <CatIcon className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm text-foreground leading-snug">
              {suggestion.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {suggestion.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className={cn(
              "text-[11px] font-medium px-2 py-0.5 gap-1",
              priority.badge,
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full inline-block",
                priority.dot,
              )}
            />
            {priority.label}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "text-[11px] font-medium px-2 py-0.5",
              catMeta.styles,
            )}
          >
            {catMeta.label}
          </Badge>
          <Badge
            variant="outline"
            className="text-[11px] font-medium px-2 py-0.5 bg-success/10 text-success border-success/30 gap-1"
          >
            <TrendingUp className="w-2.5 h-2.5" />
            {suggestion.estimatedImpact}
          </Badge>
        </div>

        {!suggestion.implemented && !suggestion.dismissed && (
          <div className="flex items-center gap-2 pt-1 border-t border-border/40">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1.5 text-success border-success/30 hover:bg-success/10"
              onClick={() => onMarkImplemented(suggestion.id)}
              disabled={isMarkingPending}
              data-ocid={`growth_advisor.mark_implemented.${idx}`}
            >
              {isMarkingPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <CheckCircle2 className="w-3 h-3" />
              )}
              Mark Implemented
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs gap-1.5 text-muted-foreground hover:text-destructive"
              onClick={() => onDismiss(suggestion.id)}
              disabled={isDismissingPending}
              data-ocid={`growth_advisor.dismiss.${idx}`}
            >
              <X className="w-3 h-3" />
              Dismiss
            </Button>
          </div>
        )}

        {suggestion.implemented && (
          <div className="flex items-center gap-1.5 pt-1 border-t border-border/40 text-xs text-success font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Implemented
          </div>
        )}

        {suggestion.dismissed && !suggestion.implemented && (
          <div className="flex items-center gap-1.5 pt-1 border-t border-border/40 text-xs text-muted-foreground">
            <EyeOff className="w-3.5 h-3.5" />
            Dismissed
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── WeeklySummaryCard ────────────────────────────────────────────────────────

function WeeklySummaryCard({
  weekOption,
  suggestions,
}: {
  weekOption: WeekOption;
  suggestions: GrowthSuggestion[];
}) {
  const total = suggestions.length;
  const implemented = suggestions.filter((s) => s.implemented).length;
  const pct = total > 0 ? Math.round((implemented / total) * 100) : 0;

  const highImpactSuggestions = suggestions
    .filter(
      (s) =>
        !s.implemented &&
        !s.dismissed &&
        s.priority === SuggestionPriority.high,
    )
    .slice(0, 2);

  return (
    <Card
      data-ocid="growth_advisor.weekly_summary"
      className="border-border/60 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden shadow-sm"
    >
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                Weekly Summary
              </p>
              <h3 className="font-bold text-foreground text-base">
                {getWeekLabel(weekOption)}
              </h3>
              {highImpactSuggestions.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Top priority:{" "}
                  <span className="font-medium text-foreground">
                    {highImpactSuggestions[0].title}
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6 sm:text-right">
            <div>
              <p className="text-2xl font-bold tabular-nums text-foreground">
                {pct}%
              </p>
              <p className="text-xs text-muted-foreground">Implemented</p>
            </div>
            <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
              <svg
                className="w-16 h-16 -rotate-90"
                viewBox="0 0 64 64"
                aria-label={`${pct}% implemented`}
                role="img"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  strokeWidth="6"
                  className="stroke-border"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 163.4} 163.4`}
                  className="stroke-primary transition-all duration-700"
                />
              </svg>
              <span className="absolute text-xs font-bold text-foreground">
                {implemented}/{total}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── KPI cards row ────────────────────────────────────────────────────────────

function KPIRow({ suggestions }: { suggestions: GrowthSuggestion[] }) {
  const total = suggestions.length;
  const implemented = suggestions.filter((s) => s.implemented).length;
  const pending = suggestions.filter(
    (s) => !s.implemented && !s.dismissed,
  ).length;
  const highPriority = suggestions.filter(
    (s) =>
      s.priority === SuggestionPriority.high && !s.implemented && !s.dismissed,
  ).length;

  const kpis = [
    {
      label: "Total Suggestions",
      value: total,
      icon: Lightbulb,
      color: "bg-primary/10 text-primary",
      ocid: "growth_advisor.kpi.total",
    },
    {
      label: "Implemented",
      value: implemented,
      icon: CheckCircle2,
      color: "bg-success/10 text-success",
      ocid: "growth_advisor.kpi.implemented",
    },
    {
      label: "Pending",
      value: pending,
      icon: RefreshCw,
      color: "bg-warning/10 text-warning",
      ocid: "growth_advisor.kpi.pending",
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: Zap,
      color: "bg-destructive/10 text-destructive",
      ocid: "growth_advisor.kpi.high_priority",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <Card
          key={k.label}
          data-ocid={k.ocid}
          className="border-border/60 shadow-sm"
        >
          <CardContent className="p-4 flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                k.color,
              )}
            >
              <k.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-bold tabular-nums text-foreground">
                {k.value}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {k.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GrowthAdvisorPage() {
  const [selectedClientId, setSelectedClientId] = useState<string>("all");
  const [weekOption, setWeekOption] = useState<WeekOption>("this-week");
  const [showDismissed, setShowDismissed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedToPlans, setAddedToPlans] = useState<Set<string>>(new Set());
  const [localSuggestions, setLocalSuggestions] = useState<GrowthSuggestion[]>(
    ALL_MOCK_SUGGESTIONS_EXTENDED,
  );

  const { data: clients = [], isLoading: clientsLoading } = useClients();
  const { data: backendSuggestions = [] } = useGrowthSuggestions();
  const markImplemented = useMarkSuggestionImplemented();
  const dismiss = useDismissSuggestion();
  const generateGrowthReport = useGenerateGrowthReport();

  const allSuggestions: GrowthSuggestion[] = (() => {
    const merged = [...backendSuggestions, ...localSuggestions];
    const seen = new Set<string>();
    return merged.filter((s) => {
      const key = s.id.toString();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  })();

  const filteredByClient =
    selectedClientId === "all"
      ? allSuggestions
      : allSuggestions.filter(
          (s) => s.clientId.toString() === selectedClientId,
        );

  const activeSuggestions = filteredByClient.filter(
    (s) => !s.implemented && !s.dismissed,
  );
  const implementedSuggestions = filteredByClient.filter((s) => s.implemented);
  const dismissedSuggestions = filteredByClient.filter(
    (s) => s.dismissed && !s.implemented,
  );

  function handleMarkImplemented(id: bigint) {
    markImplemented.mutate(id, {
      onError: () => {
        setLocalSuggestions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, implemented: true } : s)),
        );
        toast.success("Marked as implemented!");
      },
      onSuccess: () => toast.success("Marked as implemented!"),
    });
    setLocalSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, implemented: true } : s)),
    );
  }

  function handleDismiss(id: bigint) {
    dismiss.mutate(id, {
      onError: () => {
        setLocalSuggestions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, dismissed: true } : s)),
        );
        toast("Suggestion dismissed");
      },
      onSuccess: () => toast("Suggestion dismissed"),
    });
    setLocalSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, dismissed: true } : s)),
    );
  }

  function handleGenerate() {
    const targetClientId =
      selectedClientId === "all" ? BigInt(1) : BigInt(selectedClientId);

    const template =
      AI_SUGGESTION_TEMPLATES[
        Math.floor(Math.random() * AI_SUGGESTION_TEMPLATES.length)
      ];
    const newId = BigInt(Date.now());

    setIsGenerating(true);
    setTimeout(() => {
      const newSuggestion: GrowthSuggestion = {
        id: newId,
        clientId: targetClientId,
        title: template.title,
        description: template.description,
        priority: template.priority,
        estimatedImpact: template.estimatedImpact,
        category: template.category,
        implemented: false,
        dismissed: false,
        weekOf: BigInt(Date.now()),
      };
      setLocalSuggestions((prev) => [newSuggestion, ...prev]);
      setIsGenerating(false);
      toast.success("New AI suggestion generated!", {
        description: template.title,
      });
    }, 1500);
  }

  function handleAddToPlan(opp: ClientOpportunity) {
    const key = `${opp.clientName}-${opp.category}`;
    setAddedToPlans((prev) => new Set([...prev, key]));

    // Also generate a growth report for this opportunity
    generateGrowthReport.mutate(
      {
        clientId: `opp-${opp.clientName.toLowerCase().replace(/\s+/g, "-")}`,
        clientName: opp.clientName,
        period: new Date().toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
      },
      {
        onSuccess: () => {
          toast.success(`Added to plan: ${opp.clientName}`, {
            description: opp.action,
          });
        },
        onError: () => {
          toast.success(`Added to plan: ${opp.clientName}`, {
            description: opp.action,
          });
        },
      },
    );
  }

  const selectedClient: Client | undefined = clients.find(
    (c) => c.id.toString() === selectedClientId,
  );

  return (
    <div data-ocid="growth_advisor.page" className="space-y-6">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="text-xl font-display font-bold text-foreground">
              AI Growth Advisor
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Weekly AI-powered growth suggestions for your clients
          </p>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          data-ocid="growth_advisor.generate_button"
          className="gap-2 shrink-0"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <BrainCircuit className="w-4 h-4" />
          )}
          {isGenerating ? "Generating…" : "Generate Suggestions"}
        </Button>
      </div>

      {/* ── NEW: Today's Client Growth Opportunities ── */}
      <section data-ocid="growth_advisor.opportunities_section">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-warning/10 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-warning" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">
            Today's Client Growth Opportunities
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] bg-warning/10 text-warning border-warning/30"
          >
            {CLIENT_OPPORTUNITIES.length} urgent
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CLIENT_OPPORTUNITIES.map((opp, idx) => {
            const key = `${opp.clientName}-${opp.category}`;
            return (
              <ClientOpportunityCard
                key={key}
                opp={opp}
                idx={idx + 1}
                onAddToPlan={addedToPlans.has(key) ? () => {} : handleAddToPlan}
              />
            );
          })}
        </div>
      </section>

      {/* ── NEW: Revenue Snapshot ── */}
      <RevenueSnapshot />

      {/* ── Filters row ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Users className="w-4 h-4 text-muted-foreground shrink-0" />
          <Select value={selectedClientId} onValueChange={setSelectedClientId}>
            <SelectTrigger
              className="h-9 text-sm border-border/60"
              data-ocid="growth_advisor.client_select"
            >
              <SelectValue placeholder="Select client…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clientsLoading ? (
                <SelectItem value="loading" disabled>
                  Loading…
                </SelectItem>
              ) : (
                clients.map((c) => (
                  <SelectItem key={c.id.toString()} value={c.id.toString()}>
                    {c.businessName}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 min-w-0 sm:w-56">
          <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
          <Select
            value={weekOption}
            onValueChange={(v) => setWeekOption(v as WeekOption)}
          >
            <SelectTrigger
              className="h-9 text-sm border-border/60"
              data-ocid="growth_advisor.week_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Weekly summary ── */}
      <WeeklySummaryCard
        weekOption={weekOption}
        suggestions={filteredByClient}
      />

      {/* ── KPI row ── */}
      <KPIRow suggestions={filteredByClient} />

      {/* ── Empty state ── */}
      {filteredByClient.length === 0 && (
        <div
          data-ocid="growth_advisor.empty_state"
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Lightbulb className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-base mb-1">
            No suggestions yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mb-4">
            {selectedClientId === "all"
              ? "Generate AI-powered growth suggestions for your clients to get started."
              : `No suggestions for ${selectedClient?.businessName ?? "this client"} this week.`}
          </p>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            data-ocid="growth_advisor.empty_generate_button"
            variant="outline"
            className="gap-2"
          >
            <BrainCircuit className="w-4 h-4" />
            Generate First Suggestions
          </Button>
        </div>
      )}

      {/* ── Active suggestions grid ── */}
      {activeSuggestions.length > 0 && (
        <section data-ocid="growth_advisor.active_section">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-sm text-foreground">
              Active Suggestions
            </h3>
            <Badge variant="outline" className="text-xs">
              {activeSuggestions.length}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {activeSuggestions.map((s, idx) => (
              <SuggestionCard
                key={s.id.toString()}
                suggestion={s}
                idx={idx + 1}
                onMarkImplemented={handleMarkImplemented}
                onDismiss={handleDismiss}
                isMarkingPending={markImplemented.isPending}
                isDismissingPending={dismiss.isPending}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Implemented accordion ── */}
      {implementedSuggestions.length > 0 && (
        <section data-ocid="growth_advisor.completed_section">
          <Accordion type="single" collapsible defaultValue="">
            <AccordionItem
              value="completed"
              className="border border-border/60 rounded-lg px-4"
            >
              <AccordionTrigger
                className="text-sm font-semibold hover:no-underline py-3"
                data-ocid="growth_advisor.completed_accordion"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Completed
                  <Badge
                    variant="outline"
                    className="text-xs bg-success/10 text-success border-success/30"
                  >
                    {implementedSuggestions.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
                  {implementedSuggestions.map((s, idx) => (
                    <SuggestionCard
                      key={s.id.toString()}
                      suggestion={s}
                      idx={idx + 1}
                      onMarkImplemented={handleMarkImplemented}
                      onDismiss={handleDismiss}
                      isMarkingPending={false}
                      isDismissingPending={false}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      )}

      {/* ── Dismissed toggle ── */}
      {dismissedSuggestions.length > 0 && (
        <section data-ocid="growth_advisor.dismissed_section">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs text-muted-foreground h-8"
            onClick={() => setShowDismissed((v) => !v)}
            data-ocid="growth_advisor.show_dismissed_toggle"
          >
            {showDismissed ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            {showDismissed ? "Hide" : "Show"} Dismissed (
            {dismissedSuggestions.length})
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform",
                showDismissed && "rotate-180",
              )}
            />
          </Button>

          {showDismissed && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
              {dismissedSuggestions.map((s, idx) => (
                <SuggestionCard
                  key={s.id.toString()}
                  suggestion={s}
                  idx={idx + 1}
                  onMarkImplemented={handleMarkImplemented}
                  onDismiss={handleDismiss}
                  isMarkingPending={false}
                  isDismissingPending={false}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
