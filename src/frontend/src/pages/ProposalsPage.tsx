import { ProposalPreviewModal } from "@/components/ProposalPreviewModal";
import { PdfIcon } from "@/components/icons/PdfIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────────

type PackageTier = "Starter" | "Growth" | "Scale";
type ProposalStatus = "Sent" | "Opened" | "Accepted";

interface RecentProposal {
  id: number;
  clientName: string;
  tier: PackageTier;
  amount: number;
  status: ProposalStatus;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const TIER_PRICE: Record<PackageTier, number> = {
  Starter: 15000,
  Growth: 25000,
  Scale: 50000,
};

interface PackageConfig {
  tier: PackageTier;
  price: number;
  popular?: boolean;
  features: string[];
}

const PACKAGES: PackageConfig[] = [
  {
    tier: "Starter",
    price: 15000,
    features: ["10 leads/week", "WhatsApp outreach", "Monthly report"],
  },
  {
    tier: "Growth",
    price: 25000,
    popular: true,
    features: [
      "25 leads/week",
      "WhatsApp + Email",
      "SEO audit",
      "Bi-weekly report",
      "Priority support",
    ],
  },
  {
    tier: "Scale",
    price: 50000,
    features: [
      "Unlimited leads",
      "All channels",
      "SEO + Ads management",
      "Weekly report",
      "Dedicated manager",
      "Custom campaigns",
      "ROI dashboard",
      "24h SLA support",
    ],
  },
];

const RECENT_PROPOSALS: RecentProposal[] = [
  {
    id: 1,
    clientName: "Apex Dental Clinic",
    tier: "Growth",
    amount: 25000,
    status: "Accepted",
  },
  {
    id: 2,
    clientName: "FitZone Gym",
    tier: "Scale",
    amount: 50000,
    status: "Opened",
  },
  {
    id: 3,
    clientName: "Sharma Legal Associates",
    tier: "Starter",
    amount: 15000,
    status: "Sent",
  },
];

const STATUS_STYLES: Record<ProposalStatus, string> = {
  Sent: "bg-blue-500/15 text-blue-400 border-blue-400/20",
  Opened: "bg-amber-500/15 text-amber-400 border-amber-400/20",
  Accepted: "bg-emerald-500/15 text-emerald-400 border-emerald-400/20",
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}k`;
  return `₹${n}`;
}

function formatRupee(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

// ─── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);
  const startTimeRef = useRef(0);
  const displayRef = useRef(0);

  // Keep displayRef in sync so the effect can snapshot without adding display as dep
  displayRef.current = display;

  useEffect(() => {
    startRef.current = displayRef.current;
    startTimeRef.current = performance.now();
    const duration = 300;
    const target = value;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      const current = Math.round(
        startRef.current + (target - startRef.current) * eased,
      );
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

// ─── Paper Plane SVG ───────────────────────────────────────────────────────────

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9l20-7z" />
    </svg>
  );
}

// ─── Check SVG Animated ────────────────────────────────────────────────────────

function AnimatedCheckmark() {
  return (
    <motion.svg
      viewBox="0 0 52 52"
      className="w-7 h-7"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1.0], opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      aria-hidden="true"
    >
      <circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-emerald-500"
      />
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 27 l8 8 l16-16"
        className="text-emerald-400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.2, duration: 0.35, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

// ─── Chevron SVG ───────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
}

// ─── Tier Card ─────────────────────────────────────────────────────────────────

function TierCard({
  pkg,
  selected,
  index,
  onSelect,
  onDownload,
}: {
  pkg: PackageConfig;
  selected: boolean;
  index: number;
  onSelect: () => void;
  onDownload: () => void;
}) {
  const isGrowth = pkg.tier === "Growth";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        data-ocid={`proposals.tier.${pkg.tier.toLowerCase()}`}
        animate={{ scale: selected ? 1.02 : 1 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "relative w-full text-left p-4 rounded-2xl border-2 transition-colors duration-150",
          selected
            ? isGrowth
              ? "border-primary bg-primary/8 shadow-lg shadow-primary/20"
              : "border-primary/70 bg-primary/5 shadow-md"
            : isGrowth
              ? "border-primary/30 bg-card hover:border-primary/60"
              : "border-border bg-card hover:border-border/80",
        )}
      >
        {/* Popular badge */}
        {pkg.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-0.5 rounded-full tracking-wide shadow-lg">
              ★ Most Popular
            </span>
          </div>
        )}

        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <button type="button" className="flex-1 text-left" onClick={onSelect}>
            <p
              className={cn(
                "text-base font-bold font-display",
                isGrowth ? "text-primary" : "text-foreground",
              )}
            >
              {pkg.tier}
            </p>
          </button>
          {/* Selection indicator */}
          <button
            type="button"
            onClick={onSelect}
            aria-label={`Select ${pkg.tier} plan`}
            className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150",
              selected ? "border-primary bg-primary" : "border-border/60",
            )}
          >
            <AnimatePresence>
              {selected && (
                <motion.svg
                  viewBox="0 0 12 12"
                  className="w-3 h-3 text-primary-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.15 }}
                  aria-hidden="true"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Price — clickable to select */}
        <button
          type="button"
          className="w-full text-left mb-3"
          onClick={onSelect}
        >
          <span
            className={cn(
              "font-display font-bold tracking-tight",
              isGrowth
                ? "text-[32px] text-primary"
                : "text-[28px] text-foreground",
            )}
          >
            {formatRupee(pkg.price)}
          </span>
          <span className="text-sm text-muted-foreground ml-1">/month</span>
        </button>

        {/* Features */}
        <ul className="space-y-1.5 mb-4">
          {pkg.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <svg
                viewBox="0 0 12 12"
                className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/80"
                aria-hidden="true"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        {/* Action buttons row */}
        <div className="flex gap-2">
          {/* Select button */}
          <button
            type="button"
            onClick={onSelect}
            className={cn(
              "flex-1 h-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-150",
              selected
                ? "bg-primary/90 text-primary-foreground"
                : isGrowth
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/80 text-foreground bg-transparent hover:bg-muted/30",
            )}
          >
            {selected ? (
              <span className="flex items-center gap-1.5">
                <svg
                  viewBox="0 0 12 12"
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                Selected
              </span>
            ) : (
              "Select"
            )}
          </button>

          {/* Download Proposal button */}
          <motion.button
            type="button"
            data-ocid={`proposals.tier.${pkg.tier.toLowerCase()}.download_button`}
            onClick={onDownload}
            whileTap={{ scale: 0.95 }}
            title="Download Proposal PDF"
            aria-label={`Download ${pkg.tier} proposal PDF`}
            className={cn(
              "h-9 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold border transition-all duration-150",
              isGrowth
                ? "border-primary/40 text-primary bg-primary/8 hover:bg-primary/15"
                : "border-border/70 text-muted-foreground bg-transparent hover:bg-muted/30 hover:text-foreground",
            )}
          >
            <PdfIcon className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── ROI Calculator ────────────────────────────────────────────────────────────

function ROICalculator({ selectedTier }: { selectedTier: PackageTier }) {
  const [customers, setCustomers] = useState(20);
  const [avgValue, setAvgValue] = useState(1500);

  const tierPrice = TIER_PRICE[selectedTier];
  const monthlyRevenue = customers * avgValue;
  const annualRevenue = monthlyRevenue * 12;
  const roi = tierPrice > 0 ? monthlyRevenue / tierPrice : 0;

  return (
    <div
      data-ocid="proposals.roi_calculator"
      className="rounded-2xl bg-card border border-border/60 p-4 space-y-4"
    >
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">
          💡
        </span>
        <p className="text-[15px] font-bold font-display text-foreground">
          Estimate Your ROI
        </p>
      </div>

      <div className="space-y-3">
        {/* Customers input */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground font-medium">
            Estimated new customers/month
          </Label>
          <Input
            type="number"
            min={1}
            value={customers}
            onChange={(e) =>
              setCustomers(Math.max(1, Number(e.target.value) || 1))
            }
            placeholder="e.g. 20"
            className="h-11 text-[15px] rounded-xl"
            data-ocid="proposals.roi_customers_input"
          />
        </div>

        {/* Avg spend input */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground font-medium">
            Average spend per customer (₹)
          </Label>
          <Input
            type="number"
            min={1}
            value={avgValue}
            onChange={(e) =>
              setAvgValue(Math.max(1, Number(e.target.value) || 1))
            }
            placeholder="e.g. 1500"
            className="h-11 text-[15px] rounded-xl"
            data-ocid="proposals.roi_avg_value_input"
          />
        </div>
      </div>

      {/* Live output */}
      <div className="rounded-xl bg-muted/30 border border-border/40 p-3 space-y-2">
        {/* Monthly Revenue */}
        <div
          data-ocid="proposals.roi_monthly_revenue"
          className="flex items-baseline justify-between"
        >
          <span className="text-xs text-muted-foreground">Monthly Revenue</span>
          <span className="text-[22px] font-display font-bold text-emerald-400 tabular-nums">
            <AnimatedCounter value={monthlyRevenue} prefix="₹" />
          </span>
        </div>

        {/* Annual Revenue */}
        <div
          data-ocid="proposals.roi_annual_revenue"
          className="flex items-baseline justify-between"
        >
          <span className="text-xs text-muted-foreground">Annual Revenue</span>
          <span className="text-[17px] font-semibold text-foreground tabular-nums">
            {annualRevenue >= 100000 ? (
              <>
                <AnimatedCounter
                  value={Math.round(annualRevenue / 10000) / 10}
                />
                L
              </>
            ) : (
              <AnimatedCounter value={annualRevenue} prefix="₹" />
            )}
          </span>
        </div>

        {/* ROI */}
        <div
          data-ocid="proposals.roi_multiplier"
          className="flex items-baseline justify-between border-t border-border/40 pt-2"
        >
          <span className="text-xs text-muted-foreground">
            ROI at {formatINR(tierPrice)}/month
          </span>
          <span className="text-[17px] font-bold text-primary tabular-nums">
            <AnimatedCounter value={Math.round(roi * 10) / 10} suffix="x" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Send Button ───────────────────────────────────────────────────────────────

type SendState = "idle" | "sending" | "done";

function SendButton({
  disabled,
  onSend,
}: { disabled: boolean; onSend: () => void }) {
  const [sendState, setSendState] = useState<SendState>("idle");

  const handleClick = () => {
    if (sendState !== "idle" || disabled) return;
    setSendState("sending");
    setTimeout(() => {
      setSendState("done");
      toast.success("✓ Proposal sent successfully!");
      setTimeout(() => setSendState("idle"), 2500);
    }, 500);
    onSend();
  };

  return (
    <motion.button
      type="button"
      data-ocid="proposals.send_button"
      onClick={handleClick}
      disabled={disabled || sendState === "sending"}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      className={cn(
        "relative w-full h-14 rounded-2xl flex items-center justify-center gap-2.5 text-[15px] font-bold font-display transition-all duration-200",
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed"
          : sendState === "done"
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
            : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:opacity-95",
      )}
    >
      <AnimatePresence mode="wait">
        {sendState === "idle" && (
          <motion.span
            key="idle"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <PaperPlaneIcon className="w-5 h-5" />
            Send Proposal
          </motion.span>
        )}
        {sendState === "sending" && (
          <motion.span
            key="sending"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
            Sending...
          </motion.span>
        )}
        {sendState === "done" && (
          <motion.span
            key="done"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatedCheckmark />
            Send Another
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Recent Proposals ──────────────────────────────────────────────────────────

function RecentProposals() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-ocid="proposals.recent_section"
      className="rounded-2xl border border-border/60 bg-card overflow-hidden"
    >
      <button
        type="button"
        data-ocid="proposals.recent_toggle"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/20 transition-colors duration-150"
      >
        <span className="text-[14px] font-semibold text-foreground font-display">
          Sent Proposals ({RECENT_PROPOSALS.length})
        </span>
        <ChevronIcon open={expanded} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/40 divide-y divide-border/30">
              {RECENT_PROPOSALS.map((p, i) => (
                <div
                  key={p.id}
                  data-ocid={`proposals.recent.item.${i + 1}`}
                  className={cn(
                    "flex items-center justify-between px-4 py-3",
                    p.status === "Accepted" && "bg-emerald-500/5",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm font-semibold truncate",
                        p.status === "Accepted"
                          ? "text-emerald-400"
                          : "text-foreground",
                      )}
                    >
                      {p.clientName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.tier} · {formatINR(p.amount)}/mo
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[11px] border ml-2 shrink-0",
                      STATUS_STYLES[p.status],
                    )}
                  >
                    {p.status}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ProposalsPage() {
  useMetaTags(PAGE_META["/proposals"]);
  const [selectedTier, setSelectedTier] = useState<PackageTier | null>(null);
  const [previewTier, setPreviewTier] = useState<PackageTier | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const openPreview = (tier: PackageTier) => {
    setPreviewTier(tier);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  return (
    <div data-ocid="proposals.page" className="min-h-full bg-background">
      <div className="max-w-lg mx-auto px-4 pb-32 pt-5 space-y-6">
        {/* Header */}
        <div data-ocid="proposals.header">
          <h1 className="text-[24px] font-display font-bold text-foreground tracking-tight">
            Create Proposal
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Send to a client in seconds
          </p>
        </div>

        {/* Tier Selection */}
        <div data-ocid="proposals.tiers_section" className="space-y-4">
          {PACKAGES.map((pkg, i) => (
            <TierCard
              key={pkg.tier}
              pkg={pkg}
              selected={selectedTier === pkg.tier}
              index={i}
              onSelect={() => setSelectedTier(pkg.tier)}
              onDownload={() => openPreview(pkg.tier)}
            />
          ))}
        </div>

        {/* ROI Calculator */}
        <ROICalculator selectedTier={selectedTier ?? "Growth"} />

        {/* Send Button */}
        <div data-ocid="proposals.send_section">
          {!selectedTier && (
            <p className="text-xs text-muted-foreground text-center mb-2">
              Select a tier above to enable sending
            </p>
          )}
          <SendButton disabled={!selectedTier} onSend={() => {}} />

          {/* Download Proposal shortcut when tier selected */}
          {selectedTier && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3"
            >
              <Button
                variant="outline"
                data-ocid="proposals.download_proposal_button"
                className="w-full h-11 rounded-2xl gap-2 border-border/60 text-muted-foreground hover:text-foreground"
                onClick={() => openPreview(selectedTier)}
              >
                <PdfIcon className="w-4 h-4 text-primary" />
                Download Proposal PDF
              </Button>
            </motion.div>
          )}
        </div>

        {/* Recent Proposals */}
        <RecentProposals />
      </div>

      {/* Proposal Preview Modal */}
      <ProposalPreviewModal
        open={previewOpen}
        tier={previewTier}
        clientName="Your Client"
        agencyName="GrowthOS Agency"
        onClose={closePreview}
      />
    </div>
  );
}
