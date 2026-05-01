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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  Calendar,
  Check,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProposalStatus = "Sent" | "Viewed" | "Accepted" | "Declined";
type PackageTier = "Starter" | "Growth" | "Scale";

interface SavedProposal {
  id: number;
  clientName: string;
  sentDate: string;
  status: ProposalStatus;
  tier: PackageTier;
  value: number;
  city: string;
  industry: string;
}

interface PackageOption {
  tier: PackageTier;
  price: number;
  features: string[];
  popular?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SAVED_PROPOSALS: SavedProposal[] = [
  {
    id: 1,
    clientName: "Apex Dental Clinic",
    sentDate: "Apr 28, 2026",
    status: "Accepted",
    tier: "Growth",
    value: 25000,
    city: "Mumbai",
    industry: "Healthcare",
  },
  {
    id: 2,
    clientName: "FitZone Gym",
    sentDate: "Apr 25, 2026",
    status: "Viewed",
    tier: "Scale",
    value: 50000,
    city: "Pune",
    industry: "Fitness",
  },
  {
    id: 3,
    clientName: "Sharma Legal Associates",
    sentDate: "Apr 22, 2026",
    status: "Sent",
    tier: "Starter",
    value: 15000,
    city: "Delhi",
    industry: "Legal",
  },
  {
    id: 4,
    clientName: "Prestige Realty",
    sentDate: "Apr 19, 2026",
    status: "Accepted",
    tier: "Scale",
    value: 50000,
    city: "Bangalore",
    industry: "Real Estate",
  },
  {
    id: 5,
    clientName: "Café Aroma",
    sentDate: "Apr 15, 2026",
    status: "Declined",
    tier: "Starter",
    value: 15000,
    city: "Hyderabad",
    industry: "F&B",
  },
  {
    id: 6,
    clientName: "AutoCare Pro",
    sentDate: "Apr 10, 2026",
    status: "Viewed",
    tier: "Growth",
    value: 25000,
    city: "Chennai",
    industry: "Automotive",
  },
];

const PACKAGES: PackageOption[] = [
  {
    tier: "Starter",
    price: 15000,
    features: [
      "Google Business Profile setup",
      "Basic SEO audit report",
      "5 social media posts/month",
    ],
  },
  {
    tier: "Growth",
    price: 25000,
    popular: true,
    features: [
      "Everything in Starter",
      "Google Ads management",
      "Meta Ads campaign",
      "Monthly performance report",
      "WhatsApp follow-up automation",
      "Content calendar (12 posts)",
    ],
  },
  {
    tier: "Scale",
    price: 50000,
    features: [
      "Everything in Growth",
      "Full SEO optimization",
      "Advanced analytics dashboard",
      "Weekly strategy calls",
      "Competitor analysis",
      "Website audit & fixes",
      "Blog content (4 posts/mo)",
      "Local SEO & citations",
      "Priority support (24h SLA)",
      "ROI tracking & reporting",
    ],
  },
];

const SERVICES = [
  "Google Ads Management",
  "Meta Ads (Facebook/Instagram)",
  "SEO Optimization",
  "Social Media Management",
  "Website Audit",
  "Monthly Performance Reports",
  "WhatsApp Marketing",
  "Content Creation",
];

const INDUSTRIES = [
  "Healthcare / Dental",
  "Legal Services",
  "Real Estate",
  "Fitness & Wellness",
  "Food & Beverage",
  "Automotive",
  "Retail",
  "Education",
  "Beauty & Salon",
  "Finance",
  "Technology",
  "Other",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatINR(n: number): string {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}k`;
  return `₹${n}`;
}

const STATUS_CONFIG: Record<
  ProposalStatus,
  { label: string; className: string }
> = {
  Sent: {
    label: "Sent",
    className:
      "bg-blue-500/10 text-blue-400 border-blue-400/20 dark:text-blue-300",
  },
  Viewed: {
    label: "Viewed",
    className:
      "bg-amber-500/10 text-amber-500 border-amber-400/20 dark:text-amber-300",
  },
  Accepted: {
    label: "Accepted",
    className:
      "bg-emerald-500/10 text-emerald-600 border-emerald-400/20 dark:text-emerald-300",
  },
  Declined: {
    label: "Declined",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const TIER_CONFIG: Record<PackageTier, { className: string }> = {
  Starter: {
    className: "bg-secondary text-secondary-foreground border-border",
  },
  Growth: {
    className: "bg-primary/10 text-primary border-primary/20",
  },
  Scale: {
    className:
      "bg-amber-500/10 text-amber-600 border-amber-400/20 dark:text-amber-300",
  },
};

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const displayRef = useRef(0);

  useEffect(() => {
    const start = displayRef.current;
    const diff = value - start;
    if (diff === 0) return;
    const steps = 20;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const next = Math.round(start + (diff * step) / steps);
      displayRef.current = next;
      setDisplay(next);
      if (step >= steps) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [value]);

  return <span>{display}</span>;
}

// ─── Stats Card ───────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconClass,
  ocid,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  iconClass: string;
  ocid: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card data-ocid={ocid} className="border-border/60 bg-card">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {label}
              </p>
              <p className="text-2xl font-display font-bold text-foreground tracking-tight">
                {value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
            <div className={cn("p-2.5 rounded-xl", iconClass)}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Proposal List Item ───────────────────────────────────────────────────────

function ProposalListItem({
  proposal,
  selected,
  onClick,
  idx,
}: {
  proposal: SavedProposal;
  selected: boolean;
  onClick: () => void;
  idx: number;
}) {
  const statusCfg = STATUS_CONFIG[proposal.status];
  const tierCfg = TIER_CONFIG[proposal.tier];

  return (
    <motion.button
      type="button"
      data-ocid={`proposals.list.item.${idx}`}
      onClick={onClick}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "w-full text-left p-3.5 rounded-xl border transition-all duration-200 group",
        selected
          ? "border-primary/50 bg-primary/5 shadow-sm"
          : "border-border/50 bg-card hover:border-primary/30 hover:bg-muted/30",
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-semibold truncate transition-colors",
              selected ? "text-primary" : "text-foreground",
            )}
          >
            {proposal.clientName}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 shrink-0" />
            {proposal.industry} · {proposal.city}
          </p>
        </div>
        <ChevronRight
          className={cn(
            "w-3.5 h-3.5 shrink-0 mt-0.5 transition-all duration-200",
            selected
              ? "text-primary"
              : "text-muted-foreground/40 group-hover:text-muted-foreground",
          )}
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-1.5 py-0 h-4 border",
              statusCfg.className,
            )}
          >
            {statusCfg.label}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "text-[10px] px-1.5 py-0 h-4 border",
              tierCfg.className,
            )}
          >
            {proposal.tier}
          </Badge>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-foreground tabular-nums">
            {formatINR(proposal.value)}
            <span className="font-normal text-muted-foreground">/mo</span>
          </span>
        </div>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1">
        <Calendar className="w-3 h-3 shrink-0" />
        Sent {proposal.sentDate}
      </p>
    </motion.button>
  );
}

// ─── Package Card ─────────────────────────────────────────────────────────────

function PackageCard({
  pkg,
  selected,
  onSelect,
}: {
  pkg: PackageOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      data-ocid={`proposals.package.${pkg.tier.toLowerCase()}`}
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "relative w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border/60 bg-card hover:border-primary/30",
      )}
    >
      {pkg.popular && (
        <div className="absolute -top-2 left-4">
          <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">
            Popular
          </span>
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-foreground">{pkg.tier}</p>
          <p className="text-xl font-display font-bold text-foreground mt-0.5">
            {formatINR(pkg.price)}
            <span className="text-xs font-normal text-muted-foreground">
              /mo
            </span>
          </p>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 mt-0.5",
            selected ? "border-primary bg-primary" : "border-border",
          )}
        >
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="w-3 h-3 text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ul className="space-y-1">
        {pkg.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-1.5 text-xs text-muted-foreground"
          >
            <Check className="w-3 h-3 shrink-0 mt-0.5 text-primary/70" />
            {f}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}

// ─── ROI Calculator ───────────────────────────────────────────────────────────

function ROICalculator({
  selectedTier,
}: {
  selectedTier: PackageTier;
}) {
  const [customers, setCustomers] = useState(50);
  const [avgTicket, setAvgTicket] = useState(2000);

  const tierMultiplier = { Starter: 0.2, Growth: 0.35, Scale: 0.55 }[
    selectedTier
  ];
  const pkgCost = { Starter: 15000, Growth: 25000, Scale: 50000 }[selectedTier];

  const projectedNewCustomers = Math.round(customers * tierMultiplier);
  const projectedAddlRevenue = projectedNewCustomers * avgTicket;
  const sixMonthROI = (projectedAddlRevenue * 6 - pkgCost * 6) / (pkgCost * 6);
  const breakEven = pkgCost / (projectedAddlRevenue || 1);

  return (
    <div
      data-ocid="proposals.roi_calculator"
      className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-emerald-500/15">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            ROI Calculator
          </p>
          <p className="text-xs text-muted-foreground">Live projections</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <Label className="text-xs mb-1 block">Current customers/month</Label>
          <div className="space-y-1.5">
            <Input
              type="number"
              value={customers}
              onChange={(e) =>
                setCustomers(Math.max(1, Number(e.target.value)))
              }
              className="h-8 text-sm"
              data-ocid="proposals.roi_customers_input"
            />
            <input
              type="range"
              min={10}
              max={500}
              value={customers}
              onChange={(e) => setCustomers(Number(e.target.value))}
              className="w-full accent-primary h-1.5 rounded cursor-pointer"
              data-ocid="proposals.roi_customers_slider"
            />
          </div>
        </div>
        <div>
          <Label className="text-xs mb-1 block">Avg. order value (₹)</Label>
          <Input
            type="number"
            value={avgTicket}
            onChange={(e) =>
              setAvgTicket(Math.max(100, Number(e.target.value)))
            }
            className="h-8 text-sm"
            data-ocid="proposals.roi_ticket_input"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[
          {
            label: "New customers/mo",
            value: `+${projectedNewCustomers}`,
            sub: `+${Math.round(tierMultiplier * 100)}% increase`,
            ocid: "proposals.roi_new_customers",
          },
          {
            label: "Added revenue/mo",
            value: formatINR(projectedAddlRevenue),
            sub: "Projected",
            ocid: "proposals.roi_added_revenue",
          },
          {
            label: "6-month ROI",
            value: `${Math.round(sixMonthROI * 100)}%`,
            sub: "After costs",
            ocid: "proposals.roi_6month",
          },
          {
            label: "Break-even",
            value: `${breakEven < 1 ? "<1" : breakEven.toFixed(1)} mo`,
            sub: "Months to profit",
            ocid: "proposals.roi_breakeven",
          },
        ].map((item) => (
          <div
            key={item.label}
            data-ocid={item.ocid}
            className="p-2.5 rounded-lg bg-background border border-border/50"
          >
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-base font-display font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              <AnimatedNumber
                value={
                  Number.parseFloat(item.value.replace(/[^0-9.]/g, "")) || 0
                }
              />
              {item.value.replace(/[0-9.]/g, "")}
            </p>
            <p className="text-[10px] text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PDF Preview Modal ────────────────────────────────────────────────────────

function PDFPreviewModal({
  open,
  onClose,
  clientName,
  contactName,
  city,
  industry,
  selectedTier,
  selectedServices,
  note,
}: {
  open: boolean;
  onClose: () => void;
  clientName: string;
  contactName: string;
  city: string;
  industry: string;
  selectedTier: PackageTier;
  selectedServices: string[];
  note: string;
}) {
  const pkg = PACKAGES.find((p) => p.tier === selectedTier)!;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        data-ocid="proposals.preview_dialog"
        className="max-w-2xl max-h-[90vh] overflow-hidden p-0"
      >
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-semibold">
              Proposal Preview
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-xs"
                onClick={() => {
                  toast.success("PDF downloaded");
                  onClose();
                }}
                data-ocid="proposals.download_pdf_button"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-xs"
                onClick={() => {
                  toast.success("Proposal link copied — share via WhatsApp");
                  onClose();
                }}
                data-ocid="proposals.share_whatsapp_button"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp
              </Button>
              <Button
                size="sm"
                className="h-8 gap-1.5 text-xs"
                onClick={() => {
                  toast.success("Proposal sent via email");
                  onClose();
                }}
                data-ocid="proposals.send_email_button"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[70vh]">
          <div className="p-6 space-y-6 font-body">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">
                      GrowthOS Agency
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Premium Digital Marketing
                    </p>
                  </div>
                </div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Growth Proposal
                </h1>
                <p className="text-sm text-muted-foreground">
                  Prepared for {clientName || "Your Business"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date().toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-muted-foreground mt-2">Valid for</p>
                <p className="text-sm font-medium text-foreground">14 days</p>
              </div>
            </div>

            <Separator />

            {/* Client info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Client
                </p>
                <p className="text-sm font-bold text-foreground">
                  {clientName || "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {contactName || "—"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {city && industry
                    ? `${city} · ${industry}`
                    : city || industry || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Package
                </p>
                <p className="text-sm font-bold text-foreground">
                  {selectedTier} Plan
                </p>
                <p className="text-xl font-display font-bold text-primary">
                  {formatINR(pkg.price)}/mo
                </p>
              </div>
            </div>

            <Separator />

            {/* Services */}
            {selectedServices.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Included Services
                </p>
                <div className="rounded-xl overflow-hidden border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/40 border-b border-border">
                        <th className="text-left p-3 font-semibold text-foreground text-xs">
                          Service
                        </th>
                        <th className="text-right p-3 font-semibold text-foreground text-xs">
                          Included
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedServices.map((svc, i) => (
                        <tr
                          key={svc}
                          className={cn(
                            "border-b border-border/40 last:border-0",
                            i % 2 === 0 ? "" : "bg-muted/20",
                          )}
                        >
                          <td className="p-3 text-foreground text-xs">{svc}</td>
                          <td className="p-3 text-right">
                            <Check className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Package features */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                What You Get
              </p>
              <div className="grid grid-cols-2 gap-2">
                {pkg.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* ROI */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                ROI Projection
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Est. new clients/mo",
                    value:
                      selectedTier === "Scale"
                        ? "15–25"
                        : selectedTier === "Growth"
                          ? "8–15"
                          : "3–8",
                  },
                  {
                    label: "6-month ROI",
                    value:
                      selectedTier === "Scale"
                        ? "320%"
                        : selectedTier === "Growth"
                          ? "210%"
                          : "140%",
                  },
                  {
                    label: "Break-even",
                    value: selectedTier === "Scale" ? "~2 mo" : "~1.5 mo",
                  },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-lg font-display font-bold text-primary">
                      {item.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            {note && (
              <>
                <Separator />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Personalized Note
                  </p>
                  <p className="text-sm text-foreground bg-muted/30 rounded-lg p-3 leading-relaxed">
                    {note}
                  </p>
                </div>
              </>
            )}

            {/* Terms */}
            <Separator />
            <div className="text-[10px] text-muted-foreground space-y-0.5">
              <p>
                • All prices are in Indian Rupees (INR) and exclusive of GST
                (18%).
              </p>
              <p>• Minimum contract period: 3 months. Monthly billing cycle.</p>
              <p>
                • Results are projected based on industry benchmarks and are not
                guaranteed.
              </p>
              <p>• This proposal is valid for 14 days from the date above.</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// ─── Send Proposal Modal ──────────────────────────────────────────────────────

function SendProposalModal({
  open,
  onClose,
  clientName,
}: {
  open: boolean;
  onClose: () => void;
  clientName: string;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!email && !phone) {
      toast.error("Enter at least one contact method");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success(
        `Proposal sent to ${clientName || "client"} with tracking link`,
      );
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-ocid="proposals.send_dialog" className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Send Proposal</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <p className="text-sm text-muted-foreground">
            Send to{" "}
            <span className="font-medium text-foreground">
              {clientName || "client"}
            </span>{" "}
            via email or WhatsApp. A tracking link will be included
            automatically.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="send-email" className="text-xs">
              Email address
            </Label>
            <Input
              id="send-email"
              type="email"
              placeholder="contact@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-ocid="proposals.send_email_input"
              className="h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="send-phone" className="text-xs">
              WhatsApp number
            </Label>
            <Input
              id="send-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-ocid="proposals.send_phone_input"
              className="h-9"
            />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={onClose}
              data-ocid="proposals.send_cancel_button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="flex-1 h-9 gap-1.5"
              onClick={handleSend}
              disabled={sending}
              data-ocid="proposals.send_confirm_button"
            >
              {sending ? (
                <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Proposal Builder (right panel) ──────────────────────────────────────────

function ProposalBuilder({
  onPreview,
  onSend,
}: {
  onPreview: (data: BuilderState) => void;
  onSend: (name: string) => void;
}) {
  const [clientName, setClientName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectedTier, setSelectedTier] = useState<PackageTier>("Growth");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Google Ads Management",
    "SEO Optimization",
    "Monthly Performance Reports",
  ]);
  const [note, setNote] = useState(
    "We've reviewed your online presence and believe there's a strong opportunity to grow your client base significantly in the next 3–6 months. This proposal outlines our recommended strategy tailored specifically for your business.",
  );

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc],
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-6">
        {/* Client Info */}
        <div data-ocid="proposals.client_info_section">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Users className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Client Information
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="clientName" className="text-xs">
                Business name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clientName"
                placeholder="e.g. Apex Dental"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="h-8 text-sm"
                data-ocid="proposals.client_name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactName" className="text-xs">
                Contact name
              </Label>
              <Input
                id="contactName"
                placeholder="Dr. Sharma"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="h-8 text-sm"
                data-ocid="proposals.contact_name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clientEmail" className="text-xs">
                Email
              </Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="contact@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-8 text-sm"
                data-ocid="proposals.client_email_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clientCity" className="text-xs">
                City
              </Label>
              <Input
                id="clientCity"
                placeholder="Mumbai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-8 text-sm"
                data-ocid="proposals.client_city_input"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="industry" className="text-xs">
                Industry
              </Label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                data-ocid="proposals.industry_select"
                className="flex h-8 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring text-foreground"
              >
                <option value="" disabled>
                  Select industry…
                </option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Package Selection */}
        <div data-ocid="proposals.package_section">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Star className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Package Selection
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.tier}
                pkg={pkg}
                selected={selectedTier === pkg.tier}
                onSelect={() => setSelectedTier(pkg.tier)}
              />
            ))}
          </div>
        </div>

        <Separator />

        {/* Services Checklist */}
        <div data-ocid="proposals.services_section">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Zap className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Services to Include
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SERVICES.map((svc) => {
              const svcId = `svc-${svc
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")}`;
              return (
                <div
                  key={svc}
                  data-ocid={`proposals.service.${svc
                    .toLowerCase()
                    .replace(/\s+/g, "_")
                    .replace(/[^a-z0-9_]/g, "")}`}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <Checkbox
                    id={svcId}
                    checked={selectedServices.includes(svc)}
                    onCheckedChange={() => toggleService(svc)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={svcId}
                    className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-tight cursor-pointer font-normal"
                  >
                    {svc}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* ROI Calculator */}
        <ROICalculator selectedTier={selectedTier} />

        <Separator />

        {/* Proposal Note */}
        <div data-ocid="proposals.note_section">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <FileText className="w-3.5 h-3.5 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Personalized Note
            </p>
          </div>
          <Textarea
            placeholder="Add a personalized message to make this proposal stand out…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="text-sm resize-none"
            data-ocid="proposals.note_textarea"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pb-2">
          <Button
            variant="outline"
            className="flex-1 gap-2 h-9"
            onClick={() =>
              onPreview({
                clientName,
                contactName,
                email,
                city,
                industry,
                selectedTier,
                selectedServices,
                note,
              })
            }
            data-ocid="proposals.preview_button"
          >
            <Eye className="w-4 h-4" />
            Preview Proposal
          </Button>
          <Button
            className="flex-1 gap-2 h-9"
            onClick={() => {
              onSend(clientName);
            }}
            data-ocid="proposals.send_button"
          >
            <Send className="w-4 h-4" />
            Send Proposal
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

interface BuilderState {
  clientName: string;
  contactName: string;
  email: string;
  city: string;
  industry: string;
  selectedTier: PackageTier;
  selectedServices: string[];
  note: string;
}

// ─── Proposal Detail View ─────────────────────────────────────────────────────

function ProposalDetailView({
  proposal,
  onSend,
}: {
  proposal: SavedProposal;
  onSend: () => void;
}) {
  const statusCfg = STATUS_CONFIG[proposal.status];
  const tierCfg = TIER_CONFIG[proposal.tier];
  const pkg = PACKAGES.find((p) => p.tier === proposal.tier)!;

  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-display font-bold text-foreground leading-tight truncate">
              {proposal.clientName}
            </h2>
            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
              <p className="text-sm text-muted-foreground">
                {proposal.industry} · {proposal.city}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant="outline"
                className={cn("text-xs border", statusCfg.className)}
              >
                {statusCfg.label}
              </Badge>
              <Badge
                variant="outline"
                className={cn("text-xs border", tierCfg.className)}
              >
                {proposal.tier} Plan
              </Badge>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Value</p>
            <p className="text-2xl font-display font-bold text-foreground tabular-nums">
              {formatINR(proposal.value)}
              <span className="text-sm font-normal text-muted-foreground">
                /mo
              </span>
            </p>
          </div>
        </div>

        <Separator />

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Sent date", value: proposal.sentDate, icon: Calendar },
            {
              label: "Annual value",
              value: formatINR(proposal.value * 12),
              icon: TrendingUp,
            },
            {
              label: "Package tier",
              value: `${proposal.tier} Plan`,
              icon: Star,
            },
            { label: "Status", value: proposal.status, icon: BarChart3 },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-xl bg-muted/30 border border-border/50"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <item.icon className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Package features */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Package Includes
          </p>
          <div className="space-y-1.5">
            {pkg.features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* ROI projection */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
            Projected ROI
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "New clients/mo",
                value:
                  proposal.tier === "Scale"
                    ? "15–25"
                    : proposal.tier === "Growth"
                      ? "8–15"
                      : "3–8",
              },
              {
                label: "6-month ROI",
                value:
                  proposal.tier === "Scale"
                    ? "320%"
                    : proposal.tier === "Growth"
                      ? "210%"
                      : "140%",
              },
              {
                label: "Break-even",
                value: proposal.tier === "Scale" ? "~2 mo" : "~1.5 mo",
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xl font-display font-bold text-primary">
                  {item.value}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pb-2">
          <Button
            variant="outline"
            className="flex-1 gap-2 h-9"
            onClick={() => toast.info("PDF download coming soon")}
            data-ocid="proposals.detail_download_button"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            className="flex-1 gap-2 h-9"
            onClick={onSend}
            data-ocid="proposals.detail_resend_button"
          >
            <Send className="w-4 h-4" />
            Resend
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProposalsPage() {
  const [view, setView] = useState<"new" | number>("new");
  const [showPreview, setShowPreview] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [previewData, setPreviewData] = useState<BuilderState | null>(null);
  const [sendName, setSendName] = useState("");

  const selectedProposal =
    typeof view === "number"
      ? (SAVED_PROPOSALS.find((p) => p.id === view) ?? null)
      : null;

  const handlePreview = (data: BuilderState) => {
    setPreviewData(data);
    setShowPreview(true);
  };

  const handleSend = (name: string) => {
    setSendName(name);
    setShowSend(true);
  };

  const stats = [
    {
      label: "Total Sent",
      value: "28",
      sub: "All time",
      icon: Send,
      iconClass: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
      ocid: "proposals.stat_sent",
    },
    {
      label: "Viewed",
      value: "19",
      sub: "68% open rate",
      icon: Eye,
      iconClass: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
      ocid: "proposals.stat_viewed",
    },
    {
      label: "Accepted",
      value: "11",
      sub: "39% win rate",
      icon: Check,
      iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      ocid: "proposals.stat_accepted",
    },
    {
      label: "Revenue Won",
      value: "₹2.75L",
      sub: "Total contract value",
      icon: TrendingUp,
      iconClass: "bg-primary/10 text-primary",
      ocid: "proposals.stat_revenue",
    },
  ];

  return (
    <div data-ocid="proposals.page" className="h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span>GrowthOS</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Proposals</span>
          </div>
          <h1 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Proposals
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create and send winning proposals
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2 h-9 shrink-0"
          onClick={() => setView("new")}
          data-ocid="proposals.new_proposal_button"
        >
          <Plus className="w-4 h-4" />
          New Proposal
        </Button>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5"
        data-ocid="proposals.stats_section"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Two-panel layout */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-4 min-h-0">
        {/* Left: Proposal List */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Proposals
            </p>
            <Badge variant="secondary" className="text-xs">
              {SAVED_PROPOSALS.length}
            </Badge>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-2 pr-1" data-ocid="proposals.list">
              {SAVED_PROPOSALS.map((p, i) => (
                <ProposalListItem
                  key={p.id}
                  proposal={p}
                  selected={view === p.id}
                  onClick={() => setView(p.id)}
                  idx={i + 1}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right: Builder or Detail */}
        <motion.div
          key={typeof view === "number" ? `detail-${view}` : "builder"}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-0 rounded-xl border border-border/60 bg-card overflow-hidden flex flex-col"
        >
          {/* Panel Header */}
          <div className="px-5 py-3.5 border-b border-border/50 flex items-center justify-between shrink-0 bg-card">
            <div className="flex items-center gap-2">
              {typeof view === "number" && selectedProposal ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    {selectedProposal.clientName}
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs border ml-1",
                      STATUS_CONFIG[selectedProposal.status].className,
                    )}
                  >
                    {selectedProposal.status}
                  </Badge>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    New Proposal Builder
                  </p>
                </>
              )}
            </div>
            {typeof view === "number" && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
                onClick={() => setView("new")}
                data-ocid="proposals.back_to_builder_button"
              >
                <Plus className="w-3.5 h-3.5" />
                New
              </Button>
            )}
          </div>

          {/* Panel Body */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {typeof view === "number" && selectedProposal ? (
              <ProposalDetailView
                proposal={selectedProposal}
                onSend={() => handleSend(selectedProposal.clientName)}
              />
            ) : (
              <ProposalBuilder onPreview={handlePreview} onSend={handleSend} />
            )}
          </div>
        </motion.div>
      </div>

      {/* PDF Preview Modal */}
      {previewData && (
        <PDFPreviewModal
          open={showPreview}
          onClose={() => setShowPreview(false)}
          clientName={previewData.clientName}
          contactName={previewData.contactName}
          city={previewData.city}
          industry={previewData.industry}
          selectedTier={previewData.selectedTier}
          selectedServices={previewData.selectedServices}
          note={previewData.note}
        />
      )}

      {/* Send Proposal Modal */}
      <SendProposalModal
        open={showSend}
        onClose={() => setShowSend(false)}
        clientName={sendName}
      />
    </div>
  );
}
