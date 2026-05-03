import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  Eye,
  Globe,
  Lock,
  Minus,
  Plus,
  RefreshCw,
  Search,
  TrendingUp,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type CompetitorIntelEntry,
  SCAN_STEPS,
  type SeoSignals,
  type SocialLinks,
  useCompetitorIntelReport,
  useRunCompetitorScan,
} from "../hooks/useCompetitorIntel";

// ── Social platform icons (inline SVG) ───────────────────────────────────────
function FBIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${active ? "text-blue-500" : "text-muted-foreground opacity-30"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function IGIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${active ? "text-pink-500" : "text-muted-foreground opacity-30"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function LIIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${active ? "text-blue-600" : "text-muted-foreground opacity-30"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function WAIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-4 h-4 ${active ? "text-green-500" : "text-muted-foreground opacity-30"}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Helper components ────────────────────────────────────────────────────────
function SignalDot({ on, label }: { on: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {on ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
      ) : (
        <XCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
      )}
      <span
        className={`text-xs ${on ? "text-foreground" : "text-muted-foreground line-through"}`}
      >
        {label}
      </span>
    </div>
  );
}

function TrendIcon({ trend }: { trend: CompetitorIntelEntry["trend"] }) {
  if (trend === "up") return <ArrowUp className="w-3.5 h-3.5 text-success" />;
  if (trend === "down")
    return <ArrowDown className="w-3.5 h-3.5 text-destructive" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
}

function ScorePill({ score, vsYours }: { score: number; vsYours?: number }) {
  const diff = vsYours !== undefined ? score - vsYours : 0;
  const color =
    vsYours === undefined
      ? "text-primary"
      : diff > 0
        ? "text-destructive"
        : diff < 0
          ? "text-success"
          : "text-muted-foreground";
  return <span className={`font-bold tabular-nums ${color}`}>{score}</span>;
}

function SeoSignalsGrid({ signals }: { signals: SeoSignals }) {
  return (
    <div className="grid grid-cols-2 gap-1">
      <SignalDot on={signals.hasTitle} label="Title tag" />
      <SignalDot on={signals.hasMetaDesc} label="Meta desc" />
      <SignalDot on={signals.h1Count > 0} label={`H1 (${signals.h1Count})`} />
      <SignalDot on={signals.hasSchemaMarkup} label="Schema markup" />
      <SignalDot on={signals.hasCanonical} label="Canonical" />
      <SignalDot on={signals.hasSitemap} label="Sitemap" />
    </div>
  );
}

function SocialLinksRow({ links }: { links: SocialLinks }) {
  return (
    <div className="flex items-center gap-2">
      <FBIcon active={links.facebook} />
      <IGIcon active={links.instagram} />
      <LIIcon active={links.linkedin} />
      <WAIcon active={links.whatsapp} />
    </div>
  );
}

const SCORE_CATEGORIES = [
  { key: "seoScore" as const, label: "SEO" },
  { key: "speedScore" as const, label: "Speed" },
  { key: "mobileScore" as const, label: "Mobile" },
  { key: "conversionScore" as const, label: "Conv." },
  { key: "securityScore" as const, label: "Security" },
];

// ── Main page ────────────────────────────────────────────────────────────────
export default function CompetitorIntelPage() {
  const { data: report, isLoading, refetch } = useCompetitorIntelReport();
  const { mutateAsync: runScan, isPending, scanStep } = useRunCompetitorScan();

  const [yourUrl, setYourUrl] = useState("");
  const [compUrls, setCompUrls] = useState(["competitor1.com", ""]);
  const [hasScanned, setHasScanned] = useState(false);

  // Simulate premium: show results by default (demo), lock deep-scan for free users
  const isPremium = true; // In real app, derive from user plan

  const addCompUrl = () => {
    if (compUrls.length < 3) setCompUrls([...compUrls, ""]);
  };
  const removeCompUrl = (idx: number) => {
    setCompUrls(compUrls.filter((_, i) => i !== idx));
  };

  const handleScan = async () => {
    if (!yourUrl.trim()) {
      toast.error("Enter your website URL first");
      return;
    }
    const valid = compUrls.filter((u) => u.trim());
    if (valid.length === 0) {
      toast.error("Add at least one competitor URL");
      return;
    }
    try {
      await runScan({ yourUrl: yourUrl.trim(), competitorUrls: valid });
      setHasScanned(true);
      toast.success("Intelligence scan complete");
    } catch {
      toast.error("Scan failed. Please try again.");
    }
  };

  const displayReport = report ?? null;
  const showResults = displayReport && (hasScanned || !isLoading);

  return (
    <div className="space-y-6 pb-20">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Competitor Intelligence
          </h1>
          <p className="text-sm text-muted-foreground">
            Discover where rivals outrank you and close the gap fast.
          </p>
        </div>
        {showResults && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            data-ocid="competitor_intel.refresh_button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh
          </Button>
        )}
      </div>

      {/* ── SETUP PANEL ────────────────────────────────────────────────── */}
      <Card
        className="p-5 space-y-5 border-border"
        data-ocid="competitor_intel.setup_panel"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-foreground">
            Run Intelligence Scan
          </h2>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">
            Your website URL
          </p>
          <Input
            value={yourUrl}
            onChange={(e) => setYourUrl(e.target.value)}
            placeholder="yourbusiness.com"
            data-ocid="competitor_intel.your_url_input"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Competitor URLs (up to 3)
            </p>
            {compUrls.length < 3 && (
              <button
                type="button"
                onClick={addCompUrl}
                className="text-xs text-primary flex items-center gap-0.5 hover:underline"
                data-ocid="competitor_intel.add_competitor_button"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            )}
          </div>
          {compUrls.map((url, idx) => (
            <div key={url || `comp-${idx}`} className="flex items-center gap-2">
              <Input
                value={url}
                onChange={(e) => {
                  const updated = [...compUrls];
                  updated[idx] = e.target.value;
                  setCompUrls(updated);
                }}
                placeholder={`competitor${idx + 1}.com`}
                data-ocid={`competitor_intel.competitor_url_input.${idx + 1}`}
              />
              {compUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCompUrl(idx)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  data-ocid={`competitor_intel.remove_competitor_button.${idx + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Scan step progress */}
        <AnimatePresence>
          {isPending && scanStep >= 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
                <span className="text-xs text-primary font-medium">
                  {SCAN_STEPS[scanStep] ?? "Processing…"}
                </span>
              </div>
              <Progress
                value={Math.round(((scanStep + 1) / SCAN_STEPS.length) * 100)}
                className="h-1.5"
                data-ocid="competitor_intel.scan_progress"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-4 flex-wrap">
          {isPremium ? (
            <Button
              type="button"
              onClick={handleScan}
              disabled={isPending}
              data-ocid="competitor_intel.scan_button"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full border border-primary-foreground border-t-transparent animate-spin" />
                  Scanning…
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Run Intelligence Scan
                </span>
              )}
            </Button>
          ) : (
            <div className="relative" data-ocid="competitor_intel.premium_lock">
              <Button type="button" disabled className="opacity-60">
                <Lock className="w-4 h-4 mr-1.5" /> Run Scan (Growth Plan+)
              </Button>
            </div>
          )}
          <p className="text-[11px] text-muted-foreground self-center">
            Analysis based on publicly available website data. Estimated figures
            are indicative only.
          </p>
        </div>
      </Card>

      {/* ── LOADING ─────────────────────────────────────────────────────── */}
      {isLoading && !isPending && (
        <div className="flex items-center justify-center h-40">
          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {/* ── RESULTS VIEW ────────────────────────────────────────────────── */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Key insight banner */}
          <Card className="p-4 bg-primary/5 border-primary/20 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {displayReport.keyInsight}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Based on publicly available website signals only.
              </p>
            </div>
          </Card>

          {/* ── YOUR SITE + COMPETITOR CARDS ─────────────────────────────── */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Side-by-Side Comparison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Your site card */}
              <Card
                className="p-4 space-y-4 border-primary/40 bg-primary/5 relative overflow-hidden"
                data-ocid="competitor_intel.your_site_card"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Your Site
                    </p>
                    <p className="text-sm font-medium text-foreground truncate max-w-[130px]">
                      {displayReport.yourDomain}
                    </p>
                  </div>
                  <div className="text-2xl font-display font-bold text-primary">
                    {displayReport.yourScore}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    SEO Signals
                  </p>
                  <SeoSignalsGrid signals={displayReport.yourSeoSignals} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Social
                  </p>
                  <SocialLinksRow links={displayReport.yourSocialLinks} />
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    {displayReport.yourHasCta ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-destructive" />
                    )}
                    <span className="text-muted-foreground">CTA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {displayReport.yourHasWhatsapp ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-destructive" />
                    )}
                    <span className="text-muted-foreground">WhatsApp</span>
                  </div>
                </div>
              </Card>

              {/* Competitor cards */}
              {displayReport.competitors.map((comp, i) => (
                <Card
                  key={comp.domain}
                  className="p-4 space-y-4 relative overflow-hidden"
                  data-ocid={`competitor_intel.competitor_card.${i + 1}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-muted" />
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Competitor {i + 1}
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {comp.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {comp.domain}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <ScorePill
                        score={comp.overallScore}
                        vsYours={displayReport.yourScore}
                      />
                      <TrendIcon trend={comp.trend} />
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      SEO Signals
                    </p>
                    <SeoSignalsGrid signals={comp.seoSignals} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Social
                    </p>
                    <SocialLinksRow links={comp.socialLinks} />
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      {comp.hasCta ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-destructive" />
                      )}
                      <span className="text-muted-foreground">CTA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {comp.hasWhatsapp ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-destructive" />
                      )}
                      <span className="text-muted-foreground">WhatsApp</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* ── SCORE TABLE ───────────────────────────────────────────────── */}
          <Card className="overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <h2 className="text-sm font-semibold text-foreground">
                Score Breakdown
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                      Website
                    </th>
                    <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                      Overall
                    </th>
                    {SCORE_CATEGORIES.map((c) => (
                      <th
                        key={c.key}
                        className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground"
                      >
                        {c.label}
                      </th>
                    ))}
                    <th className="text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border bg-primary/5">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-foreground">
                            {displayReport.yourDomain}
                          </p>
                          <Badge className="text-[9px] mt-0.5 bg-primary/15 text-primary border-0 px-1 py-0 h-4">
                            You
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-primary">
                        {displayReport.yourScore}
                      </span>
                    </td>
                    {SCORE_CATEGORIES.map((c) => (
                      <td key={c.key} className="px-4 py-3">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-medium text-foreground">
                            —
                          </span>
                          <Progress
                            value={displayReport.yourScore}
                            className="h-1 w-12"
                          />
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-center">
                      <Minus className="w-3.5 h-3.5 text-muted-foreground mx-auto" />
                    </td>
                  </tr>
                  {displayReport.competitors.map((comp, i) => (
                    <tr
                      key={comp.domain}
                      className="border-b border-border hover:bg-muted/20 transition-colors"
                      data-ocid={`competitor_intel.score_row.${i + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-foreground">
                              {comp.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate max-w-[100px]">
                              {comp.domain}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <ScorePill
                          score={comp.overallScore}
                          vsYours={displayReport.yourScore}
                        />
                      </td>
                      {SCORE_CATEGORIES.map((c) => {
                        const val = comp[c.key];
                        const diff = val - displayReport.yourScore;
                        return (
                          <td key={c.key} className="px-4 py-3">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className={`text-xs font-medium ${diff > 5 ? "text-destructive" : diff < -5 ? "text-success" : "text-foreground"}`}
                              >
                                {val}
                              </span>
                              <Progress value={val} className="h-1 w-12" />
                            </div>
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center">
                        <TrendIcon trend={comp.trend} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* ── KEYWORD GAPS TABLE ───────────────────────────────────────── */}
          <Card
            className="overflow-hidden"
            data-ocid="competitor_intel.keyword_gaps_table"
          >
            <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Keyword Gaps vs Competitors
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  <span className="text-success font-medium">Green</span> = you
                  rank for this.{" "}
                  <span className="text-destructive font-medium">Red</span> =
                  you're missing it.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[380px]">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">
                      Keyword
                    </th>
                    <th className="text-center px-3 py-2.5 font-semibold text-primary">
                      You
                    </th>
                    {displayReport.competitors.map((c) => (
                      <th
                        key={c.domain}
                        className="text-center px-3 py-2.5 font-semibold text-muted-foreground"
                      >
                        {c.domain.slice(0, 4)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayReport.keywordGaps.map((gap, i) => (
                    <tr
                      key={gap.keyword}
                      className="border-b border-border hover:bg-muted/20 transition-colors"
                      data-ocid={`competitor_intel.keyword_gap_row.${i + 1}`}
                    >
                      <td className="px-4 py-2.5 font-medium text-foreground">
                        {gap.keyword}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        {gap.yourSite ? (
                          <CheckCircle2 className="w-4 h-4 text-success mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive mx-auto" />
                        )}
                      </td>
                      {gap.competitors.map((has, ci) => (
                        <td
                          key={`${gap.keyword}-${ci}`}
                          className="px-3 py-2.5 text-center"
                        >
                          {has ? (
                            <CheckCircle2 className="w-4 h-4 text-success mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-muted-foreground opacity-30 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* ── AD SPEND ESTIMATE ────────────────────────────────────────── */}
          <Card className="p-4" data-ocid="competitor_intel.ad_spend_card">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Zap className="w-4 h-4 text-warning" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-sm font-semibold text-foreground">
                  Estimated Ad Activity
                </h3>
                <p className="text-sm text-muted-foreground">
                  {displayReport.adSpendSummary}
                </p>
                <p className="text-[11px] text-muted-foreground border-l-2 border-border pl-2">
                  Disclaimer: Based on website code signals only (ad scripts,
                  tracking pixels). Not actual ad spend data. Treat as
                  indicative only.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {displayReport.competitors.map((comp, compIdx) => (
                <div
                  key={comp.domain}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-[10px] font-bold text-muted-foreground">
                      C{compIdx + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">
                      {comp.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {comp.adSpendEstimate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ── RECOMMENDED ACTIONS ──────────────────────────────────────── */}
          <div data-ocid="competitor_intel.recommended_actions">
            <h2 className="text-sm font-semibold text-foreground mb-3">
              Recommended Actions
            </h2>
            <div className="space-y-2">
              {displayReport.recommendedActions.map((action, actionIdx) => (
                <motion.div
                  key={action}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: actionIdx * 0.07 }}
                >
                  <Card
                    className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors"
                    data-ocid={`competitor_intel.action_card.${actionIdx + 1}`}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-primary">
                        {actionIdx + 1}
                      </span>
                    </div>
                    <p className="text-sm text-foreground flex-1">{action}</p>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── LAST SCANNED ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>
              Last scanned:{" "}
              {displayReport.generatedAt
                ? new Date(displayReport.generatedAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "—"}
            </span>
            <button
              type="button"
              onClick={handleScan}
              className="text-primary hover:underline flex items-center gap-1 ml-auto"
              data-ocid="competitor_intel.rescan_button"
            >
              <RefreshCw className="w-3 h-3" /> Rescan
            </button>
          </div>
        </motion.div>
      )}

      {/* ── EMPTY STATE (no report yet, not loading) ────────────────────── */}
      {!showResults && !isLoading && !isPending && (
        <Card
          className="p-10 flex flex-col items-center justify-center text-center gap-4"
          data-ocid="competitor_intel.empty_state"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">No scan results yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your URL and up to 3 competitor URLs above, then run a scan.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleScan}
            data-ocid="competitor_intel.empty_state_scan_button"
          >
            <Eye className="w-4 h-4 mr-1.5" /> Run First Scan
          </Button>
        </Card>
      )}

      {/* ── FREE USER LOCK OVERLAY ────────────────────────────────────────── */}
      {!isPremium && (
        <Card
          className="p-8 flex flex-col items-center justify-center text-center gap-4 border-primary/20 bg-primary/5"
          data-ocid="competitor_intel.upgrade_prompt"
        >
          <Lock className="w-8 h-8 text-primary" />
          <div>
            <p className="font-semibold text-foreground">
              Unlock Competitor Intelligence
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Full competitor scans, keyword gaps, and ad activity insights are
              available on the Growth plan and above.
            </p>
          </div>
          <Button type="button" data-ocid="competitor_intel.upgrade_button">
            Upgrade to Growth Plan
          </Button>
        </Card>
      )}
    </div>
  );
}
