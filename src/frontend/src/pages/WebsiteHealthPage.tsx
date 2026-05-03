import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Globe,
  Lock,
  Plus,
  RefreshCw,
  Search,
  Shield,
  TrendingDown,
  TrendingUp,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SubscriptionPlan } from "../backend";
import { useSubscription } from "../hooks/useSubscription";
import { SCAN_STEPS, useWebsiteHealth } from "../hooks/useWebsiteHealth";
import type {
  AuditIssue,
  CWVRating,
  CategoryScores,
  CompetitorRecord,
  IssueSeverity,
  PageSpeedResult,
} from "../types/website-health";
import { exportWebsiteHealthPDF } from "../utils/pdfExport";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreColor(score: number): "success" | "warning" | "critical" {
  if (score >= 70) return "success";
  if (score >= 40) return "warning";
  return "critical";
}

function getScoreClass(score: number): string {
  if (score >= 70) return "score-success";
  if (score >= 40) return "score-warning";
  return "score-critical";
}

function getBarClass(score: number): string {
  if (score >= 70) return "success";
  if (score >= 40) return "warning";
  return "critical";
}

const SEVERITY_LABELS: Record<IssueSeverity, string> = {
  Critical: "Urgent",
  Warning: "Medium",
  Minor: "Low",
};

const FIX_LABELS: Record<string, string> = {
  WhatsApp: "Add WhatsApp Button",
  Speed: "Improve Page Speed",
  Seo: "Fix Search Visibility",
  Cta: "Add Call-to-Action",
  Content: "Improve Content",
  Security: "Fix Security Issue",
  Mobile: "Fix Mobile Issue",
  Images: "Optimise Images",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  Easy: "Easy Fix",
  Medium: "Medium",
  Hard: "Advanced",
};

function difficultyClass(d: string): string {
  if (d === "Easy")
    return "score-success text-xs font-semibold px-2 py-0.5 rounded bg-score-success";
  if (d === "Hard")
    return "text-destructive text-xs font-semibold px-2 py-0.5 rounded bg-destructive/10";
  return "score-warning text-xs font-semibold px-2 py-0.5 rounded bg-score-warning";
}

// ─── PageSpeed Ring ────────────────────────────────────────────────────────────

function PageSpeedRing({
  score,
  label,
  size = 80,
}: {
  score: number;
  label: string;
  size?: number;
}) {
  const [animated, setAnimated] = useState(0);
  const r = size * 0.38;
  const circumference = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;

  const color =
    score >= 90
      ? "oklch(var(--score-success))"
      : score >= 50
        ? "oklch(var(--score-warning))"
        : "oklch(var(--score-critical))";

  const textClass =
    score >= 90
      ? "score-success"
      : score >= 50
        ? "score-warning"
        : "score-critical";

  useEffect(() => {
    const start = Date.now();
    const duration = 700;
    let raf: number;
    function step() {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setAnimated(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const dashOffset = circumference - (animated / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`${label} score ${score}`}
      >
        <title>{label} PageSpeed score</title>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="oklch(var(--muted)/0.3)"
          strokeWidth={size * 0.08}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.08}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 0.04s linear" }}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          className={textClass}
          fontSize={size * 0.24}
          fontWeight={700}
          fill="currentColor"
        >
          {animated}
        </text>
      </svg>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
  );
}

const CWV_RATING_LABELS: Record<CWVRating, string> = {
  good: "Good",
  "needs-improvement": "Needs Work",
  poor: "Poor",
};

const CWV_RATING_CLASSES: Record<CWVRating, string> = {
  good: "score-success bg-score-success",
  "needs-improvement": "score-warning bg-score-warning",
  poor: "text-destructive bg-destructive/10",
};

function CwvRow({
  label,
  vital,
}: { label: string; vital: { displayValue: string; rating: CWVRating } }) {
  return (
    <tr className="border-b border-border/40 last:border-0">
      <td className="py-2 pr-3 text-xs font-medium text-foreground w-40">
        {label}
      </td>
      <td className="py-2 pr-3 text-xs text-muted-foreground font-mono">
        {vital.displayValue}
      </td>
      <td className="py-2">
        <span
          className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded",
            CWV_RATING_CLASSES[vital.rating],
          )}
        >
          {CWV_RATING_LABELS[vital.rating]}
        </span>
      </td>
    </tr>
  );
}

function PageSpeedSection({
  result,
  isLoading,
}: {
  result: PageSpeedResult | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <motion.section
        className="bg-card border rounded-xl p-5 shadow-card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        data-ocid="pagespeed.loading_state"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-sm font-semibold text-foreground">
            Fetching real performance data from Google…
          </span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="w-20 h-20 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-5 bg-muted rounded animate-pulse"
                style={{ width: `${60 + n * 8}%` }}
              />
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  if (!result) return null;

  return (
    <motion.section
      className="bg-card border rounded-xl p-5 shadow-card"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid="pagespeed.section"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-primary" />
          <h2 className="text-base font-bold text-foreground font-display">
            Performance Metrics
          </h2>
          <Badge variant="secondary" className="text-xs gap-1">
            <CheckCircle size={11} />
            Verified by Google PageSpeed
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          Real data from Google’s testing servers
        </span>
      </div>

      {/* Score Rings */}
      <div className="flex gap-6 items-start mb-5 flex-wrap">
        <PageSpeedRing score={result.mobileScore} label="Mobile" size={100} />
        {result.desktopScore > 0 && (
          <PageSpeedRing
            score={result.desktopScore}
            label="Desktop"
            size={72}
          />
        )}
        <div className="flex-1 min-w-48">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Core Web Vitals
          </p>
          <table className="w-full">
            <tbody>
              <CwvRow label="First Contentful Paint" vital={result.fcp} />
              <CwvRow label="Largest Contentful Paint" vital={result.lcp} />
              <CwvRow label="Cumulative Layout Shift" vital={result.cls} />
              <CwvRow label="Total Blocking Time" vital={result.tbt} />
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2">
        <Globe size={12} className="text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Powered by{" "}
          <a
            href="https://developers.google.com/speed/pagespeed/insights/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google PageSpeed Insights
          </a>{" "}
          · Real performance data. Not an estimate.
        </p>
      </div>
    </motion.section>
  );
}

// ─── Circular Score Meter ─────────────────────────────────────────────────────

function ScoreMeter({ score, delta }: { score: number; delta?: number }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 80;
  const colorType = getScoreColor(score);
  const strokeColor =
    colorType === "success"
      ? "oklch(var(--score-success))"
      : colorType === "warning"
        ? "oklch(var(--score-warning))"
        : "oklch(var(--score-critical))";

  useEffect(() => {
    const start = Date.now();
    const duration = 900;
    let rafId: number;
    function step() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [score]);

  const dashOffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="health-score-meter" data-ocid="score.meter">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="health-score-meter-svg"
        aria-label={`Website score ${score} out of 100`}
      >
        <title>Website health score gauge</title>
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="oklch(var(--muted)/0.25)"
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 100 100)"
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn("health-score-meter-value", getScoreClass(score))}
          style={{ fontSize: 44 }}
        >
          {animatedScore}
        </span>
        <span className="health-score-meter-label">/ 100</span>
        {delta !== undefined && delta !== 0 && (
          <span
            className={cn(
              "text-xs font-semibold mt-1 flex items-center gap-0.5",
              delta > 0 ? "score-success" : "score-critical",
            )}
          >
            {delta > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {delta > 0 ? "+" : ""}
            {delta} from last scan
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Category Bar ─────────────────────────────────────────────────────────────

function CategoryBar({
  label,
  score,
  delay = 0,
}: { label: string; score: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 80 + delay);
    return () => clearTimeout(t);
  }, [score, delay]);

  return (
    <div className="health-category-bar">
      <span className="health-category-label">{label}</span>
      <div className="health-category-bar-container">
        <div
          className={`health-category-bar-fill ${getBarClass(score)}`}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className={cn("health-category-score", getScoreClass(score))}>
        {score}
      </span>
    </div>
  );
}

// ─── Issue Card ───────────────────────────────────────────────────────────────

function IssueCard({
  issue,
  index,
  isLocked,
  onExpand,
}: {
  issue: AuditIssue;
  index: number;
  isLocked: boolean;
  onExpand?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const severityIcon =
    issue.severity === "Critical" ? (
      <XCircle size={16} />
    ) : (
      <AlertTriangle size={16} />
    );
  const fixSteps = issue.aiFixSuggestion
    .split(/\.\s+/)
    .filter(Boolean)
    .slice(0, 5);

  function handleFixClick() {
    if (isLocked) return;
    const next = !expanded;
    setExpanded(next);
    if (next && onExpand) onExpand();
  }

  return (
    <motion.div
      className={cn(
        "health-issue-card",
        isLocked && "relative overflow-hidden",
      )}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      data-ocid={`issue.item.${index + 1}`}
    >
      {isLocked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[var(--radius)] backdrop-blur-sm bg-card/70">
          <Lock size={22} className="text-muted-foreground mb-2" />
          <p className="text-sm font-semibold text-foreground text-center px-4">
            Upgrade to see all issues &amp; AI fix guides
          </p>
          <Button
            size="sm"
            className="mt-3 btn-primary-glow"
            data-ocid="issue.upgrade_button"
            onClick={() => {
              window.location.href = "/paywall";
            }}
          >
            Growth Plan · ₹299/month
          </Button>
        </div>
      )}

      <div className="health-issue-header">
        <div className={`health-issue-icon ${issue.severity.toLowerCase()}`}>
          {severityIcon}
        </div>
        <div className="health-issue-content min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h4 className="health-issue-title flex-1">{issue.problem}</h4>
            <span
              className={`health-issue-severity ${issue.severity.toLowerCase()}`}
            >
              {severityIcon}
              <span>{SEVERITY_LABELS[issue.severity]}</span>
            </span>
          </div>
          <p className="health-issue-impact mt-1">{issue.businessImpact}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap mb-3">
        <span className="text-xs text-muted-foreground bg-score-warning rounded px-2 py-0.5 font-medium">
          May affect {issue.estimatedLossMin}–{issue.estimatedLossMax}{" "}
          customers/month
        </span>
        <span className={difficultyClass(issue.difficulty)}>
          {DIFFICULTY_LABELS[issue.difficulty]}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          className="btn-primary-glow sm:flex-none"
          data-ocid={`issue.fix_button.${index + 1}`}
          onClick={handleFixClick}
          disabled={isLocked}
        >
          <Zap size={14} className="mr-1" />
          {FIX_LABELS[issue.fixCategory] ?? "Fix Now"}
          {expanded ? (
            <ChevronUp size={14} className="ml-1" />
          ) : (
            <ChevronDown size={14} className="ml-1" />
          )}
        </Button>
        <Link to="/website-health/fix-tools">
          <Button
            size="sm"
            variant="outline"
            data-ocid={`issue.view_fix_tools.${index + 1}`}
            disabled={isLocked}
          >
            <Wrench size={14} className="mr-1" />
            Fix Tools
          </Button>
        </Link>
      </div>

      <div
        className={cn("health-fix-guide", expanded && !isLocked && "open")}
        data-ocid={`issue.fix_guide.${index + 1}`}
      >
        <div className="health-fix-guide-content">
          <p className="health-fix-guide-title">
            How to fix this — step by step
          </p>
          <div className="health-fix-guide-steps">
            <ol>
              {fixSteps.map((step) => (
                <li key={step.slice(0, 40)}>
                  {step.endsWith(".") ? step : `${step}.`}
                </li>
              ))}
            </ol>
          </div>
          <button
            className="health-fix-guide-cta mt-3"
            onClick={() => setExpanded(false)}
            data-ocid={`issue.got_it.${index + 1}`}
            type="button"
          >
            Got it
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Competitor Comparison ────────────────────────────────────────────────────

function CompetitorCard({
  competitor,
  userScores,
  userOverall,
  index,
}: {
  competitor: CompetitorRecord;
  userScores: CategoryScores;
  userOverall: number;
  index: number;
}) {
  const metrics: Array<{ label: string; userVal: number; compVal: number }> = [
    {
      label: "Speed",
      userVal: userScores.speed,
      compVal: competitor.pageSpeedScore ?? competitor.speedScore,
    },
    { label: "SEO", userVal: userScores.seo, compVal: competitor.seoScore },
    {
      label: "Mobile",
      userVal: userScores.mobile,
      compVal: competitor.mobileScore,
    },
    {
      label: "Conversion",
      userVal: userScores.conversion,
      compVal: competitor.conversionScore,
    },
    {
      label: "Overall",
      userVal: userOverall,
      compVal: competitor.overallScore,
    },
  ];

  const lastScanned = competitor.lastScannedAt
    ? Math.round((Date.now() - competitor.lastScannedAt) / 60000)
    : null;

  return (
    <div
      className="health-competitor-card fade-in-item"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-ocid={`competitor.card.${index + 1}`}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="health-competitor-header mb-0 truncate text-sm">
          {competitor.competitorName || `Competitor ${index + 1}`}
        </p>
        <span
          className={cn(
            "text-lg font-bold font-display",
            getScoreClass(competitor.overallScore),
          )}
        >
          {competitor.overallScore}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        {competitor.scannedLive && (
          <Badge variant="secondary" className="text-xs gap-1 py-0">
            <CheckCircle size={10} />
            Live scan
          </Badge>
        )}
        {lastScanned !== null && (
          <span className="text-xs text-muted-foreground">
            Last scanned: {lastScanned < 1 ? "just now" : `${lastScanned}m ago`}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {metrics.map(({ label, userVal, compVal }) => {
          const isAhead = userVal >= compVal;
          return (
            <div key={label} className="health-competitor-metric">
              <div
                className={`health-competitor-icon ${isAhead ? "strength" : "gap"}`}
              >
                {isAhead ? (
                  <CheckCircle size={12} />
                ) : (
                  <AlertTriangle size={12} />
                )}
              </div>
              <span className="health-competitor-label text-xs w-14">
                {label}
              </span>
              <span
                className={cn(
                  "health-competitor-value text-xs font-semibold",
                  isAhead ? "score-success" : "score-critical",
                )}
              >
                You {userVal} vs {compVal}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Score History Chart ──────────────────────────────────────────────────────

function ScoreHistoryChart({
  history,
  isPaid,
}: { history: number[]; isPaid: boolean }) {
  const displayHistory = isPaid ? history : history.slice(0, 2);
  const data = displayHistory.map((score, i) => ({
    scan: `Scan ${i + 1}`,
    score,
  }));

  return (
    <div className="health-trend-chart relative" data-ocid="history.chart">
      <p className="health-trend-label">Your score over time</p>
      {!isPaid && history.length > 2 && (
        <div className="absolute inset-x-0 bottom-0 top-8 z-10 flex flex-col items-center justify-center rounded-b-[var(--radius)] backdrop-blur-sm bg-card/80">
          <Lock size={18} className="text-muted-foreground mb-1" />
          <p className="text-xs font-semibold text-foreground text-center px-4">
            Upgrade to see full history
          </p>
        </div>
      )}
      <ResponsiveContainer width="100%" height={140}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 12, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="scan"
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border)/0.3)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="oklch(var(--primary))"
            strokeWidth={2.5}
            dot={{ fill: "oklch(var(--primary))", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── 3-Step Scanning Animation ────────────────────────────────────────────────

function ScanningIndicator({
  url,
  stepIndex,
}: { url: string; stepIndex: number }) {
  return (
    <motion.div
      className="bg-card border rounded-xl p-8 text-center shadow-card max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      data-ocid="scanning.loading_state"
    >
      <div className="flex justify-center mb-4">
        <div className="relative w-16 h-16">
          <Globe size={40} className="text-primary absolute inset-0 m-auto" />
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-3 truncate">{url}</p>

      {/* Step progress dots */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {SCAN_STEPS.map((_, i) => (
          <div
            key={SCAN_STEPS[i]}
            className={cn(
              "flex items-center justify-center rounded-full text-xs font-bold transition-all duration-500",
              i < stepIndex
                ? "w-6 h-6 bg-primary/20 text-primary"
                : i === stepIndex
                  ? "w-8 h-8 bg-primary text-primary-foreground shadow-md"
                  : "w-6 h-6 bg-muted text-muted-foreground",
            )}
          >
            {i < stepIndex ? <CheckCircle size={14} /> : i + 1}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={stepIndex}
          className="text-base font-semibold text-foreground"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
        >
          {SCAN_STEPS[stepIndex]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-4 w-full bg-muted rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "5%" }}
          animate={{ width: `${((stepIndex + 1) / SCAN_STEPS.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

// ─── Business Impact Panel ────────────────────────────────────────────────────

function BusinessImpactPanel({ issues }: { issues: AuditIssue[] }) {
  const topIssues = issues.filter((i) => i.severity === "Critical").slice(0, 4);
  if (topIssues.length === 0) return null;

  return (
    <motion.div
      className="bg-destructive/5 border border-destructive/20 rounded-xl p-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid="health.business_impact_panel"
    >
      <div className="flex items-center gap-2 mb-3">
        <TrendingDown size={18} className="text-destructive" />
        <h3 className="font-bold text-foreground text-sm">
          Your website may be losing enquiries because:
        </h3>
      </div>
      <ul className="space-y-2 mb-3">
        {topIssues.map((issue) => (
          <li
            key={`${issue.fixCategory}-${issue.problem.slice(0, 20)}`}
            className="flex items-start gap-2 text-sm"
          >
            <XCircle size={14} className="text-destructive mt-0.5 shrink-0" />
            <span className="text-foreground">{issue.businessImpact}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        * Impact is estimated based on website signals, not guaranteed results.
      </p>
    </motion.div>
  );
}

// ─── Monitor Toggle ───────────────────────────────────────────────────────────

function MonitorToggle({
  url,
  isActive,
  rescanNeeded,
  onToggle,
}: {
  url: string;
  isActive: boolean;
  rescanNeeded: boolean;
  onToggle: (active: boolean) => void;
}) {
  return (
    <div
      className="flex items-center justify-between bg-card border rounded-xl p-4 shadow-card"
      data-ocid="health.monitor_section"
    >
      <div className="flex items-center gap-3">
        <Bell
          size={18}
          className={isActive ? "text-primary" : "text-muted-foreground"}
        />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Weekly Monitoring
          </p>
          <p className="text-xs text-muted-foreground">
            {isActive
              ? `Scanning ${url} every week`
              : "Get notified when your score drops"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rescanNeeded && isActive && (
          <Badge
            variant="destructive"
            className="text-xs"
            data-ocid="health.rescan_badge"
          >
            Rescan due
          </Badge>
        )}
        <button
          type="button"
          onClick={() => onToggle(!isActive)}
          className={cn(
            "w-10 h-6 rounded-full transition-colors duration-200 relative",
            isActive ? "bg-primary" : "bg-muted",
          )}
          data-ocid="health.monitor_toggle"
          aria-label="Toggle weekly monitoring"
        >
          <span
            className={cn(
              "absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow transition-transform duration-200",
              isActive ? "left-4" : "left-0.5",
            )}
          />
        </button>
      </div>
    </div>
  );
}

// ─── Competitor Input Section ─────────────────────────────────────────────────

function CompetitorInputSection({
  isPaid,
  userScores,
  userOverall,
  yourUrl,
  onCompare,
}: {
  isPaid: boolean;
  userScores: CategoryScores;
  userOverall: number;
  yourUrl: string;
  onCompare: (urls: string[], yourUrl: string) => Promise<CompetitorRecord[]>;
}) {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [results, setResults] = useState<CompetitorRecord[]>([]);
  const [comparing, setComparing] = useState(false);

  async function handleCompare() {
    const validUrls = inputs.map((u) => u.trim()).filter(Boolean);
    if (validUrls.length === 0) return;
    setComparing(true);
    try {
      const comps = await onCompare(validUrls, yourUrl);
      setResults(comps);
    } finally {
      setComparing(false);
    }
  }

  async function handleRescan() {
    if (results.length === 0) return;
    const existingUrls = inputs.map((u) => u.trim()).filter(Boolean);
    if (existingUrls.length === 0) return;
    setComparing(true);
    try {
      const comps = await onCompare(existingUrls, yourUrl);
      setResults(comps);
    } finally {
      setComparing(false);
    }
  }

  if (!isPaid) {
    return (
      <div
        className="relative rounded-xl border border-border overflow-hidden"
        style={{ minHeight: 180 }}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/90 backdrop-blur-md">
          <Lock size={24} className="text-muted-foreground mb-2" />
          <p className="text-sm font-bold text-foreground mb-1">
            Competitor data is a paid feature
          </p>
          <p className="text-xs text-muted-foreground text-center max-w-xs px-4 mb-3">
            See how you compare on Speed, SEO, and Mobile against top businesses
            in your area.
          </p>
          <Button
            size="sm"
            className="btn-primary-glow"
            onClick={() => {
              window.location.href = "/paywall";
            }}
            data-ocid="competitors.upgrade_button"
          >
            Unlock Competitor Insights
          </Button>
        </div>
        <div className="blur-sm pointer-events-none p-4 grid sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="health-competitor-card opacity-40">
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-ocid="competitors.section">
      <div className="bg-card border rounded-xl p-4">
        <p className="text-sm font-semibold text-foreground mb-3">
          Enter up to 3 competitor URLs for live comparison
        </p>
        <div className="space-y-2 mb-3">
          {inputs.map((val, i) => (
            <div
              key={`competitor-input-${i + 1}`}
              className="flex gap-2 items-center"
            >
              <span className="text-xs text-muted-foreground w-4 shrink-0">
                {i + 1}.
              </span>
              <input
                type="text"
                value={val}
                onChange={(e) => {
                  const next = [...inputs];
                  next[i] = e.target.value;
                  setInputs(next);
                }}
                placeholder={`Competitor website ${i + 1} (e.g. www.rival.com)`}
                className="flex-1 h-9 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid={`competitor.url_input.${i + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            onClick={handleCompare}
            disabled={comparing || inputs.every((u) => !u.trim())}
            className="btn-primary-glow"
            data-ocid="competitor.compare_button"
          >
            {comparing ? (
              <RefreshCw size={14} className="mr-1 animate-spin" />
            ) : (
              <Search size={14} className="mr-1" />
            )}
            {comparing ? "Scanning live…" : "Compare Live"}
          </Button>
          {results.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleRescan}
              disabled={comparing}
              data-ocid="competitor.rescan_button"
            >
              <RefreshCw size={14} className="mr-1" />
              Rescan
            </Button>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-3">
          {results.map((comp, i) => (
            <CompetitorCard
              key={`${comp.competitorName}-${i}`}
              competitor={comp}
              userScores={userScores}
              userOverall={userOverall}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Category rows config ─────────────────────────────────────────────────────

type CategoryKey =
  | "speed"
  | "seo"
  | "mobile"
  | "content"
  | "conversion"
  | "security";

const CATEGORY_ROWS: Array<{ label: string; key: CategoryKey; delay: number }> =
  [
    { label: "Page Speed", key: "speed", delay: 0 },
    { label: "Search Visibility", key: "seo", delay: 80 },
    { label: "Mobile Experience", key: "mobile", delay: 160 },
    { label: "Content Quality", key: "content", delay: 240 },
    { label: "Conversion", key: "conversion", delay: 320 },
    { label: "Security", key: "security", delay: 400 },
  ];

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      data-ocid="health.empty_state"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
        <Globe size={36} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">
        Check your website for free
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Enter your website URL above to discover what's hurting your enquiries —
        and get a simple action plan to fix it.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {[
          "Page Speed",
          "Search Visibility",
          "Mobile",
          "Security",
          "Conversion",
        ].map((label) => (
          <span
            key={label}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary"
          >
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WebsiteHealthPage() {
  useMetaTags(PAGE_META["/website-health"]);
  const {
    isScanning,
    scanStepIndex,
    latestAudit,
    auditHistory,
    weeklyReport,
    rescanNeeded,
    error,
    pageSpeedResult,
    isPageSpeedLoading,
    scanWebsite,
    refreshAudit,
    clearResults,
    toggleMonitor,
    fetchCompetitors,
    trackEvent,
  } = useWebsiteHealth();

  const [inputUrl, setInputUrl] = useState("");
  const [monitorActive, setMonitorActive] = useState(false);
  const [exporting, setExporting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleExportPDF() {
    if (!latestAudit) return;
    setExporting(true);
    try {
      exportWebsiteHealthPDF({
        audit: latestAudit,
        competitors:
          latestAudit.competitors.length > 0
            ? latestAudit.competitors
            : undefined,
      });
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  }

  const { data: subscription } = useSubscription();
  const isPaid =
    subscription?.plan === SubscriptionPlan.growth ||
    subscription?.plan === SubscriptionPlan.pro ||
    subscription?.plan === SubscriptionPlan.agency;

  const visibleIssues = latestAudit?.issues ?? [];
  const lockedFromIndex = isPaid ? visibleIssues.length : 3;
  const historyScores = auditHistory.map((a) => a.overallScore).reverse();

  // Score delta vs previous scan
  const scoreDelta =
    auditHistory.length >= 2
      ? auditHistory[0].overallScore - auditHistory[1].overallScore
      : weeklyReport?.scoreDelta;

  // Sync monitor state from audit
  useEffect(() => {
    if (latestAudit) setMonitorActive(latestAudit.monitorActive);
  }, [latestAudit]);

  function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!isScanning) scanWebsite(inputUrl);
  }

  async function handleMonitorToggle(active: boolean) {
    if (!latestAudit) return;
    setMonitorActive(active);
    await toggleMonitor(latestAudit.url, active);
  }

  async function handleIssueExpand(index: number) {
    await trackEvent("issue_viewed", `index:${index}`);
  }

  // Whether PageSpeed section should appear (loading or has result)
  const showPageSpeed = !!(isPageSpeedLoading || pageSpeedResult);

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-6 space-y-8"
      data-ocid="website_health.page"
    >
      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">
              Website Health Check
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Find out what’s hurting your enquiries — and fix it today.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/website-health/fix-tools">
              <Button
                variant="outline"
                size="sm"
                data-ocid="health.fix_tools_button"
              >
                <Wrench size={14} className="mr-1.5" />
                Fix Tools
              </Button>
            </Link>
            {latestAudit && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={exporting}
                data-ocid="health.export_pdf_button"
              >
                <Download size={14} className="mr-1.5" />
                {exporting ? "Generating…" : "Export PDF"}
              </Button>
            )}
            {latestAudit && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearResults}
                data-ocid="health.clear_button"
              >
                <XCircle size={14} className="mr-1.5" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── URL Input ───────────────────────────────────────────────── */}
      <div
        className="bg-card border rounded-xl p-5 shadow-card"
        data-ocid="health.input_section"
      >
        <form onSubmit={handleScan} className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              ref={inputRef}
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter your website URL (e.g. www.mysalon.com)"
              className="w-full h-11 pl-9 pr-4 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              disabled={isScanning}
              data-ocid="health.url_input"
              aria-label="Website URL"
            />
          </div>
          <Button
            type="submit"
            disabled={isScanning || !inputUrl.trim()}
            className="btn-primary-glow h-11 px-6 font-semibold shrink-0"
            data-ocid="health.scan_button"
          >
            {isScanning ? (
              <RefreshCw size={15} className="mr-2 animate-spin" />
            ) : (
              <Zap size={15} className="mr-2" />
            )}
            {isScanning ? "Scanning…" : "Scan Now"}
          </Button>
        </form>
        {error && (
          <p
            className="mt-3 text-sm text-destructive flex items-center gap-1.5"
            data-ocid="health.error_state"
          >
            <AlertTriangle size={14} />
            {error}
          </p>
        )}
      </div>

      {/* ── 3-Step Scanning Animation ──────────────────────────────────── */}
      <AnimatePresence>
        {isScanning && (
          <ScanningIndicator url={inputUrl} stepIndex={scanStepIndex} />
        )}
      </AnimatePresence>

      {/* ── Results ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {latestAudit && !isScanning && (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* ── Overall Score + Category Breakdown ────────────────── */}
            <motion.section
              className="bg-card border rounded-xl p-6 shadow-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              data-ocid="health.score_section"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <ScoreMeter
                    score={latestAudit.overallScore}
                    delta={
                      typeof scoreDelta === "number" ? scoreDelta : undefined
                    }
                  />
                  <p className="text-xl font-bold font-display text-foreground text-center">
                    Website Score:{" "}
                    <span className={getScoreClass(latestAudit.overallScore)}>
                      {latestAudit.overallScore}
                    </span>{" "}
                    / 100
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Badge
                      variant="secondary"
                      className="text-xs"
                      data-ocid="health.last_checked_badge"
                    >
                      Just scanned
                    </Badge>
                    <button
                      type="button"
                      onClick={refreshAudit}
                      className="text-primary text-xs font-semibold flex items-center gap-1 hover:underline"
                      data-ocid="health.refresh_button"
                    >
                      <RefreshCw size={11} />
                      Re-scan
                    </button>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  {CATEGORY_ROWS.map(({ label, key, delay }) => (
                    <CategoryBar
                      key={key}
                      label={label}
                      score={latestAudit.categoryScores[key]}
                      delay={delay}
                    />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* ── Google PageSpeed Performance Metrics ─────────────── */}
            {showPageSpeed && (
              <PageSpeedSection
                result={pageSpeedResult}
                isLoading={isPageSpeedLoading}
              />
            )}

            {/* ── Business Impact Panel ───────────────────────────── */}
            <BusinessImpactPanel issues={visibleIssues} />

            {/* ── Issues ─────────────────────────────────────────────── */}
            <section data-ocid="health.issues_section">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h2 className="text-base font-bold text-foreground font-display">
                  What to fix right now
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">
                    {visibleIssues.length} issues found
                  </Badge>
                  <Link to="/website-health/fix-tools">
                    <Button
                      size="sm"
                      variant="outline"
                      data-ocid="health.all_fix_tools_button"
                    >
                      <Plus size={13} className="mr-1" />
                      All Fix Tools
                    </Button>
                  </Link>
                </div>
              </div>

              <div>
                {visibleIssues.map((issue, i) => (
                  <IssueCard
                    key={`${issue.fixCategory}-${issue.severity}-${issue.problem.slice(0, 10)}`}
                    issue={issue}
                    index={i}
                    isLocked={i >= lockedFromIndex}
                    onExpand={() => handleIssueExpand(i)}
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                * Estimated customer impact is based on general usage patterns.
                Results depend on your website, location, and offer. Not a
                guarantee of specific outcomes.
              </p>

              {!isPaid && visibleIssues.length > 3 && (
                <div
                  className="mt-4 bg-premium-accent-light border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3"
                  data-ocid="health.upgrade_cta"
                >
                  <Lock size={20} className="text-premium-accent shrink-0" />
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-sm font-bold text-foreground">
                      {visibleIssues.length - 3} more issues are hidden
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Upgrade to Growth Plan (₹299/month) to see all issues, AI
                      fix guides, and competitor insights.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="btn-primary-glow shrink-0"
                    onClick={() => {
                      window.location.href = "/paywall";
                    }}
                    data-ocid="health.upgrade_primary_button"
                  >
                    Upgrade · ₹299/month
                  </Button>
                </div>
              )}
            </section>

            {/* ── Weekly Monitor Toggle ─────────────────────────────── */}
            <MonitorToggle
              url={latestAudit.url}
              isActive={monitorActive}
              rescanNeeded={rescanNeeded}
              onToggle={handleMonitorToggle}
            />

            {/* ── Competitor Comparison ────────────────────────────── */}
            <section data-ocid="health.competitors_section">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={18} className="text-primary" />
                <h2 className="text-base font-bold text-foreground font-display">
                  Compare with competitors
                </h2>
              </div>
              <CompetitorInputSection
                isPaid={isPaid}
                userScores={latestAudit.categoryScores}
                userOverall={latestAudit.overallScore}
                yourUrl={latestAudit.url}
                onCompare={fetchCompetitors}
              />
            </section>

            {/* ── Score History ────────────────────────────────────────── */}
            {historyScores.length > 0 && (
              <section data-ocid="health.history_section">
                <h2 className="text-base font-bold text-foreground font-display mb-3">
                  Score trend
                </h2>
                <ScoreHistoryChart history={historyScores} isPaid={isPaid} />
              </section>
            )}

            {/* ── Weekly Report ────────────────────────────────────────── */}
            {weeklyReport && (
              <motion.section
                className="bg-card border rounded-xl p-5 shadow-card"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="health.weekly_report_section"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-primary" />
                  <h2 className="text-base font-bold text-foreground font-display">
                    Last week’s summary
                  </h2>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p
                      className={cn(
                        "text-2xl font-bold font-display",
                        weeklyReport.scoreDelta >= 0
                          ? "score-success"
                          : "score-critical",
                      )}
                    >
                      {weeklyReport.scoreDelta >= 0 ? "+" : ""}
                      {weeklyReport.scoreDelta}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Score change
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-display text-foreground">
                      {weeklyReport.newIssueCount}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      New issues
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-display score-success">
                      {weeklyReport.resolvedIssueCount}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Resolved
                    </p>
                  </div>
                </div>
                <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    Top recommendation
                  </p>
                  <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                    {weeklyReport.topRecommendation}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * Score changes and recommendations are based on general usage
                  patterns. Results vary.
                </p>
              </motion.section>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Empty State ───────────────────────────────────────────────── */}
      {!latestAudit && !isScanning && <EmptyState />}
    </div>
  );
}
