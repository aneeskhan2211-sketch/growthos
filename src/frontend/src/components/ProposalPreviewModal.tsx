import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { PdfIcon } from "./icons/PdfIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProposalTier = "Starter" | "Growth" | "Scale";

interface ProposalPreviewModalProps {
  open: boolean;
  tier: ProposalTier | null;
  clientName?: string;
  agencyName?: string;
  onClose: () => void;
}

// ─── Tier Configuration ───────────────────────────────────────────────────────

const TIER_CONFIG: Record<
  ProposalTier,
  {
    price: number;
    validity: number;
    scope: string[];
    roiMultiplier: string;
    roiDescription: string;
    setupFee: number;
  }
> = {
  Starter: {
    price: 15000,
    validity: 30,
    setupFee: 2999,
    scope: [
      "SEO audit & on-page optimization (10 pages)",
      "Google My Business setup & optimization",
      "WhatsApp outreach campaign (10 leads/week)",
      "Basic keyword research & tracking",
      "Monthly performance report",
      "Email support (48-hour response time)",
    ],
    roiMultiplier: "3–5×",
    roiDescription: "Based on 5–8 new clients/month at avg ₹3,000/client",
  },
  Growth: {
    price: 25000,
    validity: 30,
    setupFee: 4999,
    scope: [
      "Full SEO audit & implementation (25 pages)",
      "Google Ads campaign setup & management (₹10k ad budget)",
      "WhatsApp + Email outreach (25 leads/week)",
      "Bi-weekly strategy call",
      "CRM pipeline with lead tracking",
      "Competitor analysis report",
      "Bi-weekly performance report",
      "Priority email + chat support",
    ],
    roiMultiplier: "6–10×",
    roiDescription: "Based on 12–18 new clients/month at avg ₹2,500/client",
  },
  Scale: {
    price: 50000,
    validity: 30,
    setupFee: 9999,
    scope: [
      "Unlimited leads — all channels (WhatsApp, Email, LinkedIn)",
      "Full SEO + Content Engine (50+ pages, blog strategy)",
      "Google Ads + Meta Ads full management",
      "Dedicated account manager",
      "Custom campaign builder & A/B testing",
      "Weekly strategy & reporting calls",
      "ROI dashboard with real-time metrics",
      "White-label reports for your clients",
      "24-hour SLA support",
    ],
    roiMultiplier: "12–20×",
    roiDescription:
      "Based on 30+ new clients/month at avg ₹2,000–₹5,000/client",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function formatINRCompact(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}k`;
  return `₹${n}`;
}

// ─── PDF Generation ───────────────────────────────────────────────────────────

async function generatePDF(
  tier: ProposalTier,
  clientName: string,
  agencyName: string,
  onEvent: (eventName: string, meta: Record<string, string>) => void,
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const config = TIER_CONFIG[tier];
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = 0;

  // ── Gradient header bar ──────────────────────────────────────────────────
  doc.setFillColor(88, 62, 235); // primary purple
  doc.rect(0, 0, pageW, 22, "F");

  // Gradient overlay strip
  doc.setFillColor(108, 82, 255);
  doc.rect(0, 0, pageW / 2, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("GrowthOS Agency", margin, 14);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Digital Marketing Partner", margin, 20);

  // Agency name (right-aligned)
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(agencyName, pageW - margin, 14, { align: "right" });

  y = 32;

  // ── Title ────────────────────────────────────────────────────────────────
  doc.setTextColor(18, 18, 18);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Digital Marketing Proposal", margin, y);
  y += 8;

  // Tier badge
  doc.setFillColor(243, 240, 255);
  doc.setDrawColor(180, 160, 255);
  doc.roundedRect(margin, y, 35, 7, 2, 2, "FD");
  doc.setTextColor(88, 62, 235);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(`${tier.toUpperCase()} PLAN`, margin + 17.5, y + 4.8, {
    align: "center",
  });
  y += 12;

  // ── Meta row ────────────────────────────────────────────────────────────
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 110);

  const today = new Date();
  const validUntil = new Date(today.getTime() + config.validity * 86400000);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  doc.text(`Prepared for: ${clientName}`, margin, y);
  doc.text(`Date: ${fmt(today)}`, pageW - margin, y, { align: "right" });
  y += 5;
  doc.text(`Prepared by: ${agencyName}`, margin, y);
  doc.text(`Valid until: ${fmt(validUntil)}`, pageW - margin, y, {
    align: "right",
  });
  y += 10;

  // Divider
  doc.setDrawColor(220, 220, 230);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  // ── Scope of Work ────────────────────────────────────────────────────────
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(18, 18, 18);
  doc.text("Scope of Work", margin, y);
  y += 7;

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 60);

  for (const item of config.scope) {
    doc.setFillColor(88, 62, 235);
    doc.circle(margin + 2, y - 1.5, 1, "F");
    doc.text(item, margin + 6, y);
    y += 6.5;
  }
  y += 4;

  // ── Pricing Breakdown ────────────────────────────────────────────────────
  doc.setDrawColor(220, 220, 230);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(18, 18, 18);
  doc.text("Pricing Breakdown", margin, y);
  y += 8;

  // Table header
  doc.setFillColor(245, 245, 250);
  doc.rect(margin, y - 4, contentW, 8, "F");
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(80, 80, 100);
  doc.text("Description", margin + 3, y + 0.5);
  doc.text("Amount", pageW - margin - 3, y + 0.5, { align: "right" });
  y += 8;

  // Monthly retainer row
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 50);
  doc.setFontSize(9);
  doc.text(`Monthly Retainer (${tier} Plan)`, margin + 3, y);
  doc.text(formatINR(config.price), pageW - margin - 3, y, { align: "right" });
  y += 6.5;

  // Setup fee row
  doc.setTextColor(100, 100, 110);
  doc.text("One-Time Setup Fee", margin + 3, y);
  doc.text(formatINR(config.setupFee), pageW - margin - 3, y, {
    align: "right",
  });
  y += 6.5;

  // Total row
  doc.setFillColor(88, 62, 235);
  doc.rect(margin, y - 2, contentW, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9.5);
  doc.text("First Month Total", margin + 3, y + 4.5);
  doc.text(
    formatINR(config.price + config.setupFee),
    pageW - margin - 3,
    y + 4.5,
    {
      align: "right",
    },
  );
  y += 16;

  doc.setTextColor(100, 100, 110);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    `* Monthly retainer of ${formatINR(config.price)} applies from Month 2 onwards.`,
    margin,
    y,
  );
  y += 10;

  // ── ROI Estimate ─────────────────────────────────────────────────────────
  doc.setDrawColor(220, 220, 230);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(18, 18, 18);
  doc.text("Estimated ROI", margin, y);
  y += 8;

  // ROI box
  doc.setFillColor(240, 255, 248);
  doc.setDrawColor(150, 220, 190);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y - 3, contentW, 18, 3, 3, "FD");

  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 140, 80);
  doc.text(config.roiMultiplier, margin + contentW / 2, y + 7, {
    align: "center",
  });

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 100, 70);
  doc.text(config.roiDescription, margin + contentW / 2, y + 13.5, {
    align: "center",
  });
  y += 24;

  // ── Footer CTA ───────────────────────────────────────────────────────────
  doc.setFillColor(88, 62, 235);
  doc.rect(0, 278, pageW, 19, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Contact us to get started", pageW / 2, 285, { align: "center" });
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.text("hello@growthos.agency  |  +91 98765 43210", pageW / 2, 292, {
    align: "center",
  });

  // ── Save ─────────────────────────────────────────────────────────────────
  const filename = `GrowthOS-Proposal-${tier}-${clientName.replace(/\s+/g, "-")}.pdf`;
  doc.save(filename);

  onEvent("proposal_pdf_downloaded", { tier, clientName, agencyName });
}

// ─── Close Button ─────────────────────────────────────────────────────────────

function XIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Scope List ───────────────────────────────────────────────────────────────

function ScopeItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
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
      {text}
    </li>
  );
}

// ─── Modal Component ──────────────────────────────────────────────────────────

export function ProposalPreviewModal({
  open,
  tier,
  clientName = "Your Client",
  agencyName = "GrowthOS Agency",
  onClose,
}: ProposalPreviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const config = tier ? TIER_CONFIG[tier] : null;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent scroll leak
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleDownload = async () => {
    if (!tier) return;
    try {
      await generatePDF(tier, clientName, agencyName, (eventName, meta) => {
        console.log("[analytics]", eventName, meta);
        toast.success("✓ PDF downloaded successfully!");
      });
    } catch {
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!tier || !config) return null;

  const isGrowth = tier === "Growth";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          data-ocid="proposals.preview_modal"
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{
            backdropFilter: "blur(4px)",
            background: "oklch(0 0 0 / 0.55)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className={cn(
              "relative w-full max-w-lg rounded-t-3xl bg-card border-t border-x border-border/60 shadow-premium overflow-hidden",
              "max-h-[92dvh] flex flex-col",
            )}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
          >
            {/* Gradient header bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-accent shrink-0" />

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PdfIcon className="w-5 h-5 text-primary" />
                  <span
                    className={cn(
                      "text-[11px] font-bold px-2.5 py-0.5 rounded-full",
                      isGrowth
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {tier.toUpperCase()} PLAN
                  </span>
                </div>
                <h2 className="text-[18px] font-display font-bold text-foreground tracking-tight">
                  Proposal Preview
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {agencyName} → {clientName}
                </p>
              </div>

              <button
                type="button"
                data-ocid="proposals.preview_modal.close_button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors duration-150 shrink-0 mt-0.5"
                aria-label="Close preview"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 pb-2 space-y-4 scrollbar-thin">
              {/* Pricing summary */}
              <div className="rounded-2xl bg-primary/8 border border-primary/20 p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    Monthly Retainer
                  </span>
                  <span className="text-[22px] font-display font-bold text-primary">
                    {formatINR(config.price)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      /mo
                    </span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground">
                    One-time setup fee
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatINR(config.setupFee)}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-primary/20 flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    First month total
                  </span>
                  <span className="text-base font-bold text-foreground">
                    {formatINR(config.price + config.setupFee)}
                  </span>
                </div>
              </div>

              {/* Validity */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-primary/60 shrink-0"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Valid for{" "}
                <span className="font-semibold text-foreground">
                  {config.validity} days
                </span>{" "}
                from date of issue
              </div>

              {/* Scope */}
              <div>
                <p className="text-[13px] font-bold font-display text-foreground mb-2.5">
                  Scope of Work
                </p>
                <ul className="space-y-2">
                  {config.scope.map((item) => (
                    <ScopeItem key={item} text={item} />
                  ))}
                </ul>
              </div>

              {/* ROI Estimate */}
              <div className="rounded-2xl bg-emerald-500/8 border border-emerald-500/20 p-4">
                <p className="text-[13px] font-bold font-display text-foreground mb-2">
                  Estimated ROI
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[28px] font-display font-bold text-emerald-500">
                    {config.roiMultiplier}
                  </span>
                  <span className="text-xs text-muted-foreground leading-snug">
                    {config.roiDescription}
                  </span>
                </div>
              </div>

              {/* Agency info */}
              <div className="text-xs text-muted-foreground text-center px-4 pb-2">
                Prepared by{" "}
                <span className="font-semibold text-foreground">
                  {agencyName}
                </span>{" "}
                ·{" "}
                <span className="text-primary font-semibold">
                  {formatINRCompact(config.price)}/mo
                </span>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-5 pt-3 pb-6 shrink-0 border-t border-border/40 bg-card">
              <motion.button
                type="button"
                data-ocid="proposals.preview_modal.download_button"
                onClick={handleDownload}
                whileTap={{ scale: 0.97 }}
                className="w-full h-13 rounded-2xl flex items-center justify-center gap-2.5 text-[15px] font-bold font-display bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:opacity-95 transition-all duration-200"
              >
                <PdfIcon className="w-5 h-5" />
                Download PDF
              </motion.button>

              <Button
                variant="ghost"
                data-ocid="proposals.preview_modal.cancel_button"
                className="w-full mt-2 text-muted-foreground"
                onClick={onClose}
              >
                Close Preview
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
