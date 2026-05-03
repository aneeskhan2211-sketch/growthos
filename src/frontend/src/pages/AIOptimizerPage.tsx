import { PAGE_META } from "@/config/metaTags";
import { defaultABTests } from "@/data/abTests";
import { useMetaTags } from "@/hooks/useMetaTags";
import type { ABTest } from "@/types/conversionEngine";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart2,
  Brain,
  Eye,
  RefreshCw,
  Sparkles,
  Tag,
  ToggleLeft,
  ToggleRight,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type NudgeRow as BackendNudgeRow,
  useNudgePerformanceBySegment,
  useUserSegments,
} from "../hooks/useGrowthEngineAI";

// ─── Types ────────────────────────────────────────────────────────────────────

type Segment = "low" | "medium" | "high";
type NudgeType = "urgency" | "fomo" | "reward" | "money";

interface SegmentCard {
  id: Segment;
  label: string;
  userCount: number;
  description: string;
  recommendedAction: string;
  trend: "up" | "down";
  trendPct: number;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  dotClass: string;
}

interface NudgeRow {
  segment: Segment;
  nudgeType: NudgeType;
  copyPreview: string;
  sent: number;
  opened: number;
  actedOn: number;
  enabled: boolean;
  isWinner?: boolean;
}

interface PricingRow {
  userId: string;
  name: string;
  city: string;
  segment: Segment;
  recommendedOffer: string;
  offerShown: boolean;
  dateShown: string | null;
}

interface PaywallStatCard {
  label: string;
  value: string;
  description: string;
  isPositive: boolean;
}

// ─── Static segment config ────────────────────────────────────────────────────

const SEGMENT_CONFIG: Record<Segment, Omit<SegmentCard, "userCount">> = {
  low: {
    id: "low",
    label: "Low Activity",
    description: "Signed up but rarely engage. Fewer than 3 actions in 7 days.",
    recommendedAction: "Show 2-day free trial",
    trend: "down",
    trendPct: 4.2,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted/40",
    borderClass: "border-border/40",
    dotClass: "bg-muted-foreground",
  },
  medium: {
    id: "medium",
    label: "Engaged",
    description: "Regular users — send messages, view leads weekly.",
    recommendedAction: "Offer bonus credits",
    trend: "up",
    trendPct: 11.8,
    colorClass: "text-warning",
    bgClass: "bg-warning/8",
    borderClass: "border-warning/30",
    dotClass: "bg-warning",
  },
  high: {
    id: "high",
    label: "High Intent",
    description: "Active daily. Hit free limits. Viewed paywall 2+ times.",
    recommendedAction: "Show limited-time 50% off",
    trend: "up",
    trendPct: 23.5,
    colorClass: "text-success",
    bgClass: "bg-success/8",
    borderClass: "border-success/30",
    dotClass: "bg-success",
  },
};

// ─── Mock nudge data (used when backend rows are empty) ───────────────────────

const nudgeCopyPreview: Record<Segment, Record<NudgeType, string>> = {
  low: {
    urgency: "Follow up today to increase chances.",
    fomo: "Leads active in your area right now.",
    reward: "Strong start. Your first booking is within reach.",
    money: "These leads could convert if contacted today.",
  },
  medium: {
    urgency: "Reply now—fast responses convert better.",
    fomo: "3 prospects checked messages today.",
    reward: "You're on a 5-day streak. Keep it up.",
    money: "Follow-ups often turn into bookings.",
  },
  high: {
    urgency: "Act now. Early responses convert 3x better.",
    fomo: "12 high-quality leads are waiting. Don't miss today.",
    reward: "Great work. You contacted 8 leads today.",
    money: "Your pending leads could be worth ₹35,000.",
  },
};

const MOCK_NUDGE_ROWS: NudgeRow[] = [
  {
    segment: "low",
    nudgeType: "urgency",
    copyPreview: nudgeCopyPreview.low.urgency,
    sent: 412,
    opened: 89,
    actedOn: 21,
    enabled: true,
  },
  {
    segment: "low",
    nudgeType: "fomo",
    copyPreview: nudgeCopyPreview.low.fomo,
    sent: 389,
    opened: 104,
    actedOn: 38,
    enabled: true,
  },
  {
    segment: "low",
    nudgeType: "reward",
    copyPreview: nudgeCopyPreview.low.reward,
    sent: 201,
    opened: 43,
    actedOn: 9,
    enabled: false,
  },
  {
    segment: "medium",
    nudgeType: "urgency",
    copyPreview: nudgeCopyPreview.medium.urgency,
    sent: 623,
    opened: 198,
    actedOn: 87,
    enabled: true,
  },
  {
    segment: "medium",
    nudgeType: "fomo",
    copyPreview: nudgeCopyPreview.medium.fomo,
    sent: 541,
    opened: 167,
    actedOn: 52,
    enabled: true,
  },
  {
    segment: "medium",
    nudgeType: "reward",
    copyPreview: nudgeCopyPreview.medium.reward,
    sent: 298,
    opened: 112,
    actedOn: 31,
    enabled: true,
  },
  {
    segment: "high",
    nudgeType: "urgency",
    copyPreview: nudgeCopyPreview.high.urgency,
    sent: 187,
    opened: 96,
    actedOn: 64,
    enabled: true,
  },
  {
    segment: "high",
    nudgeType: "fomo",
    copyPreview: nudgeCopyPreview.high.fomo,
    sent: 164,
    opened: 91,
    actedOn: 58,
    enabled: true,
  },
  {
    segment: "high",
    nudgeType: "money",
    copyPreview: nudgeCopyPreview.high.money,
    sent: 142,
    opened: 78,
    actedOn: 41,
    enabled: true,
  },
];

function backendRowToNudgeRow(r: BackendNudgeRow): NudgeRow {
  const copyPreviewMap = nudgeCopyPreview[r.segment] ?? nudgeCopyPreview.medium;
  const nudgeType: NudgeType =
    r.copyType === "fomo"
      ? "fomo"
      : r.copyType === "urgency"
        ? "urgency"
        : r.copyType === "money_visibility"
          ? "money"
          : "reward";
  return {
    segment: r.segment,
    nudgeType,
    copyPreview: copyPreviewMap[nudgeType],
    sent: r.sent,
    opened: r.opened,
    actedOn: r.actionTaken,
    enabled: true,
    isWinner: r.isWinner,
  };
}

const PRICING_ROWS: PricingRow[] = [
  {
    userId: "U001",
    name: "Priya Sharma",
    city: "Mumbai",
    segment: "high",
    recommendedOffer: "50% off Growth for 24h",
    offerShown: true,
    dateShown: "2026-04-30",
  },
  {
    userId: "U002",
    name: "Rahul Nair",
    city: "Pune",
    segment: "low",
    recommendedOffer: "2-day free trial",
    offerShown: true,
    dateShown: "2026-04-30",
  },
  {
    userId: "U003",
    name: "Ankit Verma",
    city: "Delhi",
    segment: "medium",
    recommendedOffer: "+50 bonus lead credits",
    offerShown: false,
    dateShown: null,
  },
  {
    userId: "U004",
    name: "Sneha Patil",
    city: "Mumbai",
    segment: "high",
    recommendedOffer: "Limited-time upgrade bonus",
    offerShown: true,
    dateShown: "2026-04-29",
  },
  {
    userId: "U005",
    name: "Deepak Singh",
    city: "Bengaluru",
    segment: "low",
    recommendedOffer: "2-day free trial",
    offerShown: false,
    dateShown: null,
  },
  {
    userId: "U006",
    name: "Kavita Menon",
    city: "Chennai",
    segment: "medium",
    recommendedOffer: "+50 bonus lead credits",
    offerShown: true,
    dateShown: "2026-04-29",
  },
  {
    userId: "U007",
    name: "Raj Kulkarni",
    city: "Pune",
    segment: "high",
    recommendedOffer: "50% off Growth for 24h",
    offerShown: true,
    dateShown: "2026-04-28",
  },
  {
    userId: "U008",
    name: "Sunita Joshi",
    city: "Hyderabad",
    segment: "low",
    recommendedOffer: "2-day free trial",
    offerShown: false,
    dateShown: null,
  },
  {
    userId: "U009",
    name: "Mohit Garg",
    city: "Mumbai",
    segment: "medium",
    recommendedOffer: "+50 bonus lead credits",
    offerShown: true,
    dateShown: "2026-04-28",
  },
  {
    userId: "U010",
    name: "Pooja Iyer",
    city: "Delhi",
    segment: "high",
    recommendedOffer: "Limited-time upgrade bonus",
    offerShown: false,
    dateShown: null,
  },
];

const LS_RESULTS = "growthosABResults";
const LS_AB = "growthosABTests";

interface VariantStats {
  impressions: number;
  conversions: number;
}
type TestResults = Record<string, Record<string, VariantStats>>;

function readResults(): TestResults {
  try {
    const r = localStorage.getItem(LS_RESULTS);
    return r ? (JSON.parse(r) as TestResults) : {};
  } catch {
    return {};
  }
}
function readAssignments(): Record<string, string> {
  try {
    const r = localStorage.getItem(LS_AB);
    return r ? (JSON.parse(r) as Record<string, string>) : {};
  } catch {
    return {};
  }
}
function computeStats(
  test: ABTest,
  results: TestResults,
  assignments: Record<string, string>,
): Record<string, VariantStats> {
  const stats: Record<string, VariantStats> = {};
  for (const v of test.variants) {
    const r = results[test.id]?.[v.id];
    const assign = Object.values(assignments).filter(
      (val) => val === v.id,
    ).length;
    stats[v.id] = {
      impressions: (r?.impressions ?? 0) + assign,
      conversions: r?.conversions ?? 0,
    };
  }
  return stats;
}
function doResetTest(testId: string) {
  try {
    const r = localStorage.getItem(LS_RESULTS);
    const results: TestResults = r ? (JSON.parse(r) as TestResults) : {};
    delete results[testId];
    localStorage.setItem(LS_RESULTS, JSON.stringify(results));
    const a = localStorage.getItem(LS_AB);
    if (a) {
      const assigns = JSON.parse(a) as Record<string, string>;
      delete assigns[testId];
      localStorage.setItem(LS_AB, JSON.stringify(assigns));
    }
  } catch {
    /* ignore */
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ActionRateBar({ rate }: { rate: number }) {
  const color =
    rate >= 20 ? "bg-success" : rate >= 10 ? "bg-warning" : "bg-destructive";
  const textColor =
    rate >= 20
      ? "text-success"
      : rate >= 10
        ? "text-warning"
        : "text-destructive";
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 rounded-full bg-muted/40 overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <span className={`text-[11px] font-bold tabular-nums ${textColor}`}>
        {rate.toFixed(1)}%
      </span>
    </div>
  );
}

function SegmentBadge({ segment }: { segment: Segment }) {
  const cfg = {
    low: "bg-muted/40 text-muted-foreground",
    medium: "bg-warning/10 text-warning",
    high: "bg-success/10 text-success",
  }[segment];
  const label = { low: "Low", medium: "Engaged", high: "High Intent" }[segment];
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg}`}
    >
      {label}
    </span>
  );
}

function SimulateModal({
  row,
  segments,
  onClose,
}: { row: PricingRow; segments: SegmentCard[]; onClose: () => void }) {
  const seg = segments.find((s) => s.id === row.segment) ?? {
    ...SEGMENT_CONFIG[row.segment],
    userCount: 0,
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        aria-label="Close modal"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-border/40 rounded-2xl shadow-premium p-6 w-80 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">
              Preview for {row.name}
            </p>
            <p className="text-[15px] font-bold text-foreground mt-0.5">
              {row.city}
            </p>
          </div>
          <SegmentBadge segment={row.segment} />
        </div>
        <div
          className={`rounded-xl border px-4 py-4 ${seg.bgClass} ${seg.borderClass}`}
        >
          <p className="text-[11px] font-bold uppercase tracking-wider mb-2 text-muted-foreground">
            Personalized offer
          </p>
          <p className={`text-[16px] font-bold ${seg.colorClass}`}>
            {row.recommendedOffer}
          </p>
          <p className="text-[12px] text-muted-foreground mt-2">
            {seg.recommendedAction}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-[13px] font-semibold text-muted-foreground border border-border/40 rounded-lg py-2 hover:bg-muted/30 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AIOptimizerPage() {
  useMetaTags(PAGE_META["/growth-engine/ai-optimizer"]);
  const { data: segmentDist } = useUserSegments();
  const { data: backendNudgeRows } = useNudgePerformanceBySegment();

  // Build real segment cards with live counts from backend
  const SEGMENTS: SegmentCard[] = [
    { ...SEGMENT_CONFIG.low, userCount: segmentDist?.lowActivity ?? 847 },
    {
      ...SEGMENT_CONFIG.medium,
      userCount: segmentDist?.mediumActivity ?? 1234,
    },
    { ...SEGMENT_CONFIG.high, userCount: segmentDist?.highIntent ?? 312 },
  ];

  // Backend nudge rows → local NudgeRow format (with enable toggle state)
  const derivedRows: NudgeRow[] =
    backendNudgeRows && backendNudgeRows.length > 0
      ? backendNudgeRows.map(backendRowToNudgeRow)
      : MOCK_NUDGE_ROWS;

  const [toggleOverrides, setToggleOverrides] = useState<
    Record<string, boolean>
  >({});
  const nudgeRows: NudgeRow[] = derivedRows.map((r) => {
    const key = `${r.segment}-${r.nudgeType}`;
    return key in toggleOverrides ? { ...r, enabled: toggleOverrides[key] } : r;
  });

  const [simulateRow, setSimulateRow] = useState<PricingRow | null>(null);
  const [abResults, setAbResults] = useState<TestResults>(readResults);
  const [abAssignments, setAbAssignments] =
    useState<Record<string, string>>(readAssignments);

  const allTests = defaultABTests;

  // Best performer per segment
  function getBestInSegment(seg: Segment): string | null {
    const rows = nudgeRows.filter((r) => r.segment === seg);
    if (!rows.length) return null;
    // prefer backend winner flag; fall back to action-rate calculation
    const winner = rows.find((r) => r.isWinner);
    if (winner) return `${winner.segment}-${winner.nudgeType}`;
    const best = rows.reduce((a, b) => {
      const aRate = a.sent > 0 ? (a.actedOn / a.sent) * 100 : 0;
      const bRate = b.sent > 0 ? (b.actedOn / b.sent) * 100 : 0;
      return bRate > aRate ? b : a;
    });
    return `${best.segment}-${best.nudgeType}`;
  }

  function toggleNudge(seg: Segment, type: NudgeType) {
    const key = `${seg}-${type}`;
    setToggleOverrides((prev) => {
      const current =
        nudgeRows.find((r) => r.segment === seg && r.nudgeType === type)
          ?.enabled ?? true;
      return { ...prev, [key]: !current };
    });
  }

  function handleResetTest(testId: string) {
    doResetTest(testId);
    setAbResults(readResults());
    setAbAssignments(readAssignments());
    toast.success("Test data reset");
  }

  // Paywall timing AB for section 4
  const paywallTest = defaultABTests.find((t) => t.id === "paywall_timing");
  const paywallStats = paywallTest
    ? computeStats(paywallTest, abResults, abAssignments)
    : {};

  const summaryOffers = {
    freeTrial: PRICING_ROWS.filter((r) => r.recommendedOffer.includes("trial"))
      .length,
    bonusCredits: PRICING_ROWS.filter((r) =>
      r.recommendedOffer.includes("bonus"),
    ).length,
    discount: PRICING_ROWS.filter((r) => r.recommendedOffer.includes("%"))
      .length,
  };

  return (
    <div data-ocid="ai_optimizer.page" className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold font-display text-foreground">
            AI Optimizer
          </h1>
        </div>
        <p className="text-[13px] text-muted-foreground">
          Nudge engine, pricing intelligence, and paywall timing — all in one
          view.
        </p>
      </div>

      {/* ── Section 1: User Segment Overview ───────────────────────────────── */}
      <section data-ocid="ai_optimizer.segment_overview.section">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-primary" />
          <h2 className="text-[15px] font-bold text-foreground">
            User Segment Overview
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SEGMENTS.map((seg, i) => (
            <motion.div
              key={seg.id}
              data-ocid={`ai_optimizer.segment_card.${i + 1}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`rounded-2xl border p-5 ${seg.bgClass} ${seg.borderClass}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${seg.dotClass}`}
                  />
                  <span
                    className={`text-[12px] font-bold uppercase tracking-wider ${seg.colorClass}`}
                  >
                    {seg.label}
                  </span>
                </div>
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-bold ${
                    seg.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {seg.trend === "up" ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {seg.trendPct}% vs last week
                </span>
              </div>
              <p className="text-3xl font-bold font-display text-foreground tabular-nums">
                {seg.userCount.toLocaleString("en-IN")}
              </p>
              <p className="text-[12px] text-muted-foreground mt-2 leading-relaxed">
                {seg.description}
              </p>
              <div className="mt-4 pt-3 border-t border-border/30">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Recommended action
                </p>
                <div
                  className={`flex items-center gap-1.5 text-[13px] font-bold ${seg.colorClass}`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  {seg.recommendedAction}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Nudge Recommendation Panel ─────────────────────────── */}
      <section data-ocid="ai_optimizer.nudge_panel.section">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-primary" />
          <h2 className="text-[15px] font-bold text-foreground">
            Nudge Recommendation Panel
          </h2>
        </div>
        <div className="bg-card rounded-2xl border border-border/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full text-[12px]"
              data-ocid="ai_optimizer.nudge_table"
            >
              <thead>
                <tr className="border-b border-border/30 bg-muted/20">
                  {[
                    "Segment",
                    "Nudge Type",
                    "Copy Preview",
                    "Sent",
                    "Opened",
                    "Acted On",
                    "Action Rate",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {nudgeRows.map((row, i) => {
                  const actionRate =
                    row.sent > 0 ? (row.actedOn / row.sent) * 100 : 0;
                  const rowKey = `${row.segment}-${row.nudgeType}`;
                  const bestKey = getBestInSegment(row.segment);
                  const isBest = rowKey === bestKey;
                  return (
                    <motion.tr
                      key={rowKey}
                      data-ocid={`ai_optimizer.nudge_row.${i + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className={`group hover:bg-muted/10 transition-colors ${isBest ? "bg-primary/4" : ""}`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <SegmentBadge segment={row.segment} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-foreground capitalize">
                            {row.nudgeType}
                          </span>
                          {isBest && (
                            <span className="flex items-center gap-0.5 text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                              <Trophy className="w-2.5 h-2.5" />
                              BEST
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-[220px]">
                        <p className="text-[11px] text-muted-foreground truncate">
                          {row.copyPreview}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-muted-foreground font-medium">
                        {row.sent.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground font-medium">
                        {row.opened.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground font-semibold">
                        {row.actedOn.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3">
                        <ActionRateBar rate={actionRate} />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          data-ocid={`ai_optimizer.nudge_toggle.${i + 1}`}
                          onClick={() =>
                            toggleNudge(row.segment, row.nudgeType)
                          }
                          className="flex items-center gap-1 text-[11px] font-semibold transition-colors hover:opacity-80"
                          aria-label={
                            row.enabled ? "Disable nudge" : "Enable nudge"
                          }
                        >
                          {row.enabled ? (
                            <>
                              <ToggleRight className="w-4 h-4 text-success" />
                              <span className="text-success">On</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Off</span>
                            </>
                          )}
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 3: Pricing Offer Recommendations ──────────────────────── */}
      <section data-ocid="ai_optimizer.pricing_offers.section">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-primary" />
          <h2 className="text-[15px] font-bold text-foreground">
            Pricing Offer Recommendations
          </h2>
        </div>

        {/* Summary Row */}
        <div className="flex flex-wrap gap-3 mb-5">
          {[
            {
              label: "Free trial recommended",
              count: summaryOffers.freeTrial,
              icon: <Tag className="w-3.5 h-3.5" />,
            },
            {
              label: "Bonus credits recommended",
              count: summaryOffers.bonusCredits,
              icon: <Sparkles className="w-3.5 h-3.5" />,
            },
            {
              label: "Discount offer",
              count: summaryOffers.discount,
              icon: <Zap className="w-3.5 h-3.5" />,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border/40 text-[12px]"
            >
              <span className="text-primary">{item.icon}</span>
              <span className="tabular-nums font-bold text-foreground">
                {item.count}
              </span>
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="bg-card rounded-2xl border border-border/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="w-full text-[12px]"
              data-ocid="ai_optimizer.pricing_table"
            >
              <thead>
                <tr className="border-b border-border/30 bg-muted/20">
                  {[
                    "User",
                    "City",
                    "Segment",
                    "Recommended Offer",
                    "Shown",
                    "Date",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {PRICING_ROWS.map((row, i) => (
                  <tr
                    key={row.userId}
                    data-ocid={`ai_optimizer.pricing_row.${i + 1}`}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {row.city}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <SegmentBadge segment={row.segment} />
                    </td>
                    <td className="px-4 py-3 text-foreground font-medium max-w-[180px]">
                      <p className="truncate">{row.recommendedOffer}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          row.offerShown
                            ? "bg-success/10 text-success"
                            : "bg-muted/40 text-muted-foreground"
                        }`}
                      >
                        {row.offerShown ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-[11px] whitespace-nowrap">
                      {row.dateShown ?? "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <button
                        type="button"
                        data-ocid={`ai_optimizer.simulate_button.${i + 1}`}
                        onClick={() => setSimulateRow(row)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/8 hover:bg-primary/14 border border-primary/20 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Simulate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Section 4: Paywall Timing Intelligence ────────────────────────── */}
      <section data-ocid="ai_optimizer.paywall_timing.section">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-primary" />
          <h2 className="text-[15px] font-bold text-foreground">
            Paywall Timing Intelligence
          </h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {(
            [
              {
                label: "Paywalls shown AFTER value moment",
                value: "68%",
                description:
                  "Lead generated, reply received, or proposal sent before paywall.",
                isPositive: true,
              },
              {
                label: "Paywalls shown BEFORE value moment",
                value: "32%",
                description:
                  "Paywall triggered before user experienced meaningful value.",
                isPositive: false,
              },
            ] as PaywallStatCard[]
          ).map((card, i) => (
            <motion.div
              key={card.label}
              data-ocid={`ai_optimizer.paywall_stat.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border p-5 ${
                card.isPositive
                  ? "bg-success/6 border-success/25"
                  : "bg-destructive/6 border-destructive/25"
              }`}
            >
              <p
                className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${card.isPositive ? "text-success" : "text-destructive"}`}
              >
                {card.label}
              </p>
              <p
                className={`text-3xl font-bold font-display tabular-nums ${card.isPositive ? "text-success" : "text-destructive"}`}
              >
                {card.value}
              </p>
              <p className="text-[12px] text-muted-foreground mt-2">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* A/B comparison card */}
        {paywallTest && (
          <div className="bg-card rounded-2xl border border-border/40 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[14px] font-bold text-foreground">
                  Paywall Timing A/B Test
                </p>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  {paywallTest.id}
                </p>
              </div>
              <button
                type="button"
                data-ocid="ai_optimizer.paywall_reset_button"
                onClick={() => handleResetTest(paywallTest.id)}
                className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground border border-border/40 px-3 py-1.5 rounded-lg hover:bg-muted/20 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Reset test
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {paywallTest.variants.map((v) => {
                const s = paywallStats[v.id] ?? {
                  impressions: 0,
                  conversions: 0,
                };
                const rate =
                  s.impressions > 0
                    ? ((s.conversions / s.impressions) * 100).toFixed(1)
                    : "0.0";
                const isWinner = v.id === "delayed";
                return (
                  <div
                    key={v.id}
                    data-ocid={`ai_optimizer.paywall_variant.${v.id}`}
                    className={`rounded-xl border p-4 ${isWinner ? "border-success/50 bg-success/6" : "border-border/30 bg-muted/10"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-[12px] font-bold text-foreground">
                          {v.label}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground">
                          {v.id}
                        </p>
                      </div>
                      {isWinner && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/12 px-2 py-0.5 rounded-full">
                          <Trophy className="w-2.5 h-2.5" />
                          Winner
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-[12px]">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Impressions
                        </span>
                        <span className="font-semibold tabular-nums text-foreground">
                          {s.impressions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Conversions
                        </span>
                        <span className="font-semibold tabular-nums text-foreground">
                          {s.conversions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Conv. rate
                        </span>
                        <span
                          className={`font-bold tabular-nums ${isWinner ? "text-success" : "text-foreground"}`}
                        >
                          {rate}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-2 bg-primary/6 border border-primary/20 rounded-xl px-4 py-3">
              <BarChart2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-[12px] text-foreground font-medium leading-relaxed">
                Users who saw the paywall <strong>after a value moment</strong>{" "}
                converted <span className="text-primary font-bold">2.4×</span>{" "}
                more often than those shown it immediately.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── Section 5: A/B Test Auto-Winner Panel ─────────────────────────── */}
      <section data-ocid="ai_optimizer.ab_tests.section">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 rounded-full bg-primary" />
          <h2 className="text-[15px] font-bold text-foreground">
            A/B Test Auto-Winner Panel
          </h2>
          <span className="ml-auto text-[11px] font-semibold text-muted-foreground">
            Auto-selects winner after 100 impressions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTests.map((test, i) => {
            const stats = computeStats(test, abResults, abAssignments);
            const totalImpressions = Object.values(stats).reduce(
              (s, v) => s + v.impressions,
              0,
            );
            const hasEnoughData = totalImpressions >= 100;
            const winnerVariant = hasEnoughData
              ? test.variants.reduce((a, b) => {
                  const aR =
                    stats[a.id]?.impressions > 0
                      ? stats[a.id].conversions / stats[a.id].impressions
                      : 0;
                  const bR =
                    stats[b.id]?.impressions > 0
                      ? stats[b.id].conversions / stats[b.id].impressions
                      : 0;
                  return bR > aR ? b : a;
                })
              : null;

            const maxConversions = Math.max(
              ...test.variants.map((v) => stats[v.id]?.conversions ?? 0),
              1,
            );

            return (
              <motion.div
                key={test.id}
                data-ocid={`ai_optimizer.ab_card.${i + 1}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="bg-card rounded-2xl border border-border/40 overflow-hidden"
              >
                <div className="px-4 pt-4 pb-3 border-b border-border/30 flex items-start justify-between">
                  <div>
                    <p className="text-[14px] font-bold text-foreground">
                      {test.name}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                      {test.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {winnerVariant && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                        <Trophy className="w-2.5 h-2.5" />
                        Auto-selected winner
                      </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/8 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>

                <div className="px-4 py-3 space-y-2">
                  {test.variants.map((v) => {
                    const s = stats[v.id] ?? { impressions: 0, conversions: 0 };
                    const rate =
                      s.impressions > 0
                        ? ((s.conversions / s.impressions) * 100).toFixed(1)
                        : "0.0";
                    const barWidth =
                      maxConversions > 0
                        ? (s.conversions / maxConversions) * 100
                        : 0;
                    const isW = winnerVariant?.id === v.id;
                    return (
                      <div
                        key={v.id}
                        className={`rounded-xl p-3 border ${isW ? "border-success/40 bg-success/6" : "border-border/20 bg-muted/6"}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12px] font-semibold text-foreground">
                              {v.label}
                            </span>
                            {isW && (
                              <span className="text-[9px] font-bold text-success bg-success/10 px-1.5 py-px rounded-full">
                                WINNER
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-[12px] font-bold tabular-nums ${isW ? "text-success" : "text-muted-foreground"}`}
                          >
                            {rate}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${isW ? "bg-success" : "bg-primary/50"}`}
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground tabular-nums whitespace-nowrap">
                            {s.conversions} / {s.impressions}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {!hasEnoughData && (
                    <div
                      data-ocid={`ai_optimizer.ab_empty.${i + 1}`}
                      className="flex items-center gap-2 text-[11px] text-muted-foreground bg-muted/20 rounded-lg px-3 py-2"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                      No test results yet — tests update after 100 impressions
                    </div>
                  )}
                </div>

                <div className="px-4 pb-4 pt-1 border-t border-border/20">
                  <button
                    type="button"
                    data-ocid={`ai_optimizer.ab_reset_button.${i + 1}`}
                    onClick={() => handleResetTest(test.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border/40 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset test
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Simulate Modal */}
      {simulateRow && (
        <SimulateModal
          row={simulateRow}
          segments={SEGMENTS}
          onClose={() => setSimulateRow(null)}
        />
      )}
    </div>
  );
}
