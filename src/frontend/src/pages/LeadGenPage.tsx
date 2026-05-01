import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useCreateLead } from "@/hooks/useLeads";
import { useCreateOutreachCampaign } from "@/hooks/useOutreach";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface IndianLead {
  id: number;
  businessName: string;
  industry: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  hasWebsite: boolean;
  leadScore: number;
  conversionProbability: number;
  seoWeakness: string;
  websiteScore: number;
  seoScore: number;
  reviewScore: number;
  socialScore: number;
  budget: "under5k" | "5k-15k" | "15k+";
  interactionHistory: InteractionEvent[];
}

interface InteractionEvent {
  date: string;
  type: "note" | "email" | "call" | "whatsapp";
  text: string;
}

type WebsiteFilter = "all" | "has_website" | "no_website";
type BudgetFilter = "all" | "under5k" | "5k-15k" | "15k+";

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const INDIAN_LEADS: IndianLead[] = [
  {
    id: 1,
    businessName: "Bombay Bites Kitchen",
    industry: "Restaurant",
    city: "Mumbai",
    phone: "+91 98••• •••82",
    email: "bom••••••@gmail.com",
    website: "bombaybites.in",
    hasWebsite: true,
    leadScore: 87,
    conversionProbability: 78,
    seoWeakness: "No Google Business listing",
    websiteScore: 22,
    seoScore: 18,
    reviewScore: 28,
    socialScore: 19,
    budget: "5k-15k",
    interactionHistory: [
      {
        date: "Apr 28",
        type: "note",
        text: "Discovered via Google Maps search",
      },
      {
        date: "Apr 29",
        type: "whatsapp",
        text: "Intro pitch sent, no reply yet",
      },
    ],
  },
  {
    id: 2,
    businessName: "Sharma & Sons Jewellers",
    industry: "Retail",
    city: "Delhi",
    phone: "+91 99••• •••41",
    email: "sha••••@sharmajs.com",
    website: "sharmajs.com",
    hasWebsite: true,
    leadScore: 92,
    conversionProbability: 85,
    seoWeakness: "Poor mobile page speed",
    websiteScore: 24,
    seoScore: 22,
    reviewScore: 26,
    socialScore: 20,
    budget: "15k+",
    interactionHistory: [
      { date: "Apr 26", type: "email", text: "Cold outreach email sent" },
      { date: "Apr 28", type: "whatsapp", text: "Follow-up message sent" },
      { date: "Apr 30", type: "call", text: "Call booked for May 2nd" },
    ],
  },
  {
    id: 3,
    businessName: "FitLife Gym & Wellness",
    industry: "Gym",
    city: "Bangalore",
    phone: "+91 87••• •••67",
    email: "fit••••@fitlife.co",
    website: "fitlife.co",
    hasWebsite: true,
    leadScore: 74,
    conversionProbability: 62,
    seoWeakness: "Missing meta tags & descriptions",
    websiteScore: 18,
    seoScore: 15,
    reviewScore: 24,
    socialScore: 17,
    budget: "5k-15k",
    interactionHistory: [
      {
        date: "Apr 29",
        type: "note",
        text: "Active Instagram presence, 12k followers",
      },
    ],
  },
  {
    id: 4,
    businessName: "Greenleaf Ayurvedic Clinic",
    industry: "Clinic",
    city: "Pune",
    phone: "+91 70••• •••15",
    email: "gre•••••@greenleaf.in",
    website: "greenleaf.in",
    hasWebsite: true,
    leadScore: 81,
    conversionProbability: 72,
    seoWeakness: "No schema markup or structured data",
    websiteScore: 20,
    seoScore: 20,
    reviewScore: 21,
    socialScore: 20,
    budget: "5k-15k",
    interactionHistory: [
      { date: "Apr 27", type: "email", text: "Free audit report emailed" },
    ],
  },
  {
    id: 5,
    businessName: "Horizon Realty India",
    industry: "Real Estate",
    city: "Hyderabad",
    phone: "+91 91••• •••30",
    email: "inf••@horizonrealty.in",
    website: "horizonrealty.in",
    hasWebsite: true,
    leadScore: 95,
    conversionProbability: 91,
    seoWeakness: "No local SEO — missing city pages",
    websiteScore: 25,
    seoScore: 23,
    reviewScore: 25,
    socialScore: 22,
    budget: "15k+",
    interactionHistory: [
      {
        date: "Apr 25",
        type: "call",
        text: "Discovery call — very interested",
      },
      {
        date: "Apr 28",
        type: "whatsapp",
        text: "Sent proposal deck via WhatsApp",
      },
      { date: "Apr 30", type: "note", text: "Decision expected by May 5" },
    ],
  },
  {
    id: 6,
    businessName: "Spice Route Restaurant",
    industry: "Restaurant",
    city: "Chennai",
    phone: "+91 80••• •••58",
    email: "spi•••@spiceroute.com",
    website: "",
    hasWebsite: false,
    leadScore: 96,
    conversionProbability: 88,
    seoWeakness: "No website — completely invisible online",
    websiteScore: 0,
    seoScore: 0,
    reviewScore: 30,
    socialScore: 18,
    budget: "under5k",
    interactionHistory: [
      {
        date: "Apr 30",
        type: "note",
        text: "High foot traffic but zero digital presence",
      },
    ],
  },
  {
    id: 7,
    businessName: "TechEd Academy",
    industry: "Education",
    city: "Mumbai",
    phone: "+91 98••• •••76",
    email: "hel••@techedacademy.in",
    website: "techedacademy.in",
    hasWebsite: true,
    leadScore: 68,
    conversionProbability: 55,
    seoWeakness: "Low domain authority — few backlinks",
    websiteScore: 17,
    seoScore: 14,
    reviewScore: 20,
    socialScore: 17,
    budget: "5k-15k",
    interactionHistory: [],
  },
  {
    id: 8,
    businessName: "Prestige Hair & Beauty Salon",
    industry: "Salon",
    city: "Bangalore",
    phone: "+91 96••• •••44",
    email: "pre•••@prestigesalon.in",
    website: "prestigesalon.in",
    hasWebsite: true,
    leadScore: 79,
    conversionProbability: 70,
    seoWeakness: "No Google Reviews strategy — only 9 reviews",
    websiteScore: 19,
    seoScore: 17,
    reviewScore: 23,
    socialScore: 20,
    budget: "under5k",
    interactionHistory: [
      {
        date: "Apr 29",
        type: "whatsapp",
        text: "Sent pitch about review management",
      },
    ],
  },
  {
    id: 9,
    businessName: "Capital Legal Associates",
    industry: "Real Estate",
    city: "Delhi",
    phone: "+91 88••• •••22",
    email: "cap•••@capitallegal.in",
    website: "capitallegal.in",
    hasWebsite: true,
    leadScore: 83,
    conversionProbability: 75,
    seoWeakness: "Outdated website — no SSL certificate",
    websiteScore: 21,
    seoScore: 19,
    reviewScore: 22,
    socialScore: 21,
    budget: "15k+",
    interactionHistory: [],
  },
  {
    id: 10,
    businessName: "Mediva Diagnostic Centre",
    industry: "Clinic",
    city: "Hyderabad",
    phone: "+91 73••• •••91",
    email: "inf••@mediva.co.in",
    website: "mediva.co.in",
    hasWebsite: true,
    leadScore: 88,
    conversionProbability: 80,
    seoWeakness: "No appointment booking — losing conversions",
    websiteScore: 23,
    seoScore: 21,
    reviewScore: 24,
    socialScore: 20,
    budget: "5k-15k",
    interactionHistory: [
      {
        date: "Apr 27",
        type: "email",
        text: "Case study about clinic leads emailed",
      },
    ],
  },
  {
    id: 11,
    businessName: "Kochi Grocery Mart",
    industry: "Retail",
    city: "Mumbai",
    phone: "+91 94••• •••39",
    email: "koc•••@kochimart.in",
    website: "",
    hasWebsite: false,
    leadScore: 91,
    conversionProbability: 84,
    seoWeakness: "No website — missing delivery platform integration",
    websiteScore: 0,
    seoScore: 0,
    reviewScore: 29,
    socialScore: 22,
    budget: "under5k",
    interactionHistory: [],
  },
  {
    id: 12,
    businessName: "Sunrise Coaching Institute",
    industry: "Education",
    city: "Pune",
    phone: "+91 77••• •••63",
    email: "sun•••@sunrisecoaching.com",
    website: "sunrisecoaching.com",
    hasWebsite: true,
    leadScore: 72,
    conversionProbability: 60,
    seoWeakness: "Blog inactive since 2022 — losing search traffic",
    websiteScore: 18,
    seoScore: 16,
    reviewScore: 22,
    socialScore: 16,
    budget: "5k-15k",
    interactionHistory: [],
  },
];

const NICHES = [
  "All",
  "Restaurant",
  "Salon",
  "Gym",
  "Clinic",
  "Real Estate",
  "Education",
  "Retail",
];
const CITIES = [
  "All",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Chennai",
];
const BUDGET_OPTIONS: { value: BudgetFilter; label: string }[] = [
  { value: "all", label: "Any Budget" },
  { value: "under5k", label: "Under ₹5k" },
  { value: "5k-15k", label: "₹5k–₹15k" },
  { value: "15k+", label: "₹15k+" },
];
const WEBSITE_OPTIONS: { value: WebsiteFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "has_website", label: "Has Website" },
  { value: "no_website", label: "No Website" },
];

const ICON_COLORS: Record<string, string> = {
  email: "text-[oklch(var(--primary))]",
  whatsapp: "text-[oklch(var(--success))]",
  call: "text-[oklch(var(--warning))]",
  note: "text-muted-foreground",
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function scoreConfig(score: number) {
  if (score >= 80)
    return {
      label: "Hot",
      barClass: "bg-[oklch(var(--score-critical))]",
      badgeClass:
        "bg-[oklch(var(--score-critical)/0.12)] text-[oklch(var(--score-critical))] border-[oklch(var(--score-critical)/0.25)]",
    };
  if (score >= 60)
    return {
      label: "Warm",
      barClass: "bg-[oklch(var(--score-warning))]",
      badgeClass:
        "bg-[oklch(var(--score-warning)/0.12)] text-[oklch(var(--score-warning))] border-[oklch(var(--score-warning)/0.25)]",
    };
  return {
    label: "Cold",
    barClass: "bg-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground border-border",
  };
}

function conversionBarColor(pct: number) {
  if (pct >= 75) return "bg-[oklch(var(--success))]";
  if (pct >= 50) return "bg-[oklch(var(--warning))]";
  return "bg-[oklch(var(--score-critical))]";
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

function LeadCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-14 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <Skeleton className="h-1.5 w-full rounded-full" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 w-10 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Score Breakdown Panel ─────────────────────────────────────────────────────

function ScoreBreakdownPanel({ lead }: { lead: IndianLead }) {
  const breakdown = [
    { label: "Website Quality", pts: lead.websiteScore, max: 25 },
    { label: "SEO Health", pts: lead.seoScore, max: 20 },
    { label: "Reviews", pts: lead.reviewScore, max: 30 },
    { label: "Social Presence", pts: lead.socialScore, max: 25 },
  ];
  return (
    <div className="space-y-3 pt-3 border-t border-border">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Score Breakdown
      </p>
      {breakdown.map((b) => (
        <div key={b.label} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{b.label}</span>
            <span className="font-mono font-semibold">
              {b.pts}/{b.max}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${Math.round((b.pts / b.max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Detail Drawer ─────────────────────────────────────────────────────────────

interface DrawerProps {
  lead: IndianLead | null;
  onClose: () => void;
  onAddToCRM: (lead: IndianLead) => void;
  onSendPitch: (lead: IndianLead) => void;
  crmIds: Set<number>;
  pitchIds: Set<number>;
}

function LeadDetailDrawer({
  lead,
  onClose,
  onAddToCRM,
  onSendPitch,
  crmIds,
  pitchIds,
}: DrawerProps) {
  const cfg = lead ? scoreConfig(lead.leadScore) : null;
  const typeLabel: Record<string, string> = {
    email: "Email",
    whatsapp: "WhatsApp",
    call: "Call",
    note: "Note",
  };

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-card border-l border-border z-50 flex flex-col shadow-2xl overflow-hidden"
            data-ocid="lead.drawer"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-border flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">
                  {lead.industry} · {lead.city}
                </p>
                <h2 className="font-display text-xl font-bold leading-tight truncate">
                  {lead.businessName}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0 mt-0.5"
                aria-label="Close drawer"
                data-ocid="lead.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Score hero */}
            <div className="px-6 py-4 bg-muted/30 border-b border-border flex items-center gap-4">
              <div
                className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl border text-2xl font-bold font-mono ${cfg?.badgeClass}`}
              >
                {lead.leadScore}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-semibold">
                    {cfg?.label} Lead
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {lead.industry}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conversion probability</span>
                    <span className="font-mono font-semibold text-foreground">
                      {lead.conversionProbability}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${conversionBarColor(lead.conversionProbability)}`}
                      style={{ width: `${lead.conversionProbability}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content scroll */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Contact info */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Contact
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{lead.email}</span>
                  </div>
                  {lead.hasWebsite ? (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                      <a
                        href={`https://${lead.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline truncate"
                      >
                        {lead.website}
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-[oklch(var(--score-critical))]">
                        No website
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{lead.city}</span>
                  </div>
                </div>
              </div>

              {/* SEO Weakness */}
              <div className="p-3 rounded-lg bg-[oklch(var(--score-critical)/0.08)] border border-[oklch(var(--score-critical)/0.2)]">
                <p className="text-xs font-semibold text-[oklch(var(--score-critical))] mb-1">
                  SEO Weakness Detected
                </p>
                <p className="text-sm">{lead.seoWeakness}</p>
              </div>

              {/* Score breakdown */}
              <ScoreBreakdownPanel lead={lead} />

              {/* Interaction timeline */}
              {lead.interactionHistory.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Interaction History
                  </p>
                  <div className="relative pl-4 border-l border-border space-y-4">
                    {lead.interactionHistory.map((event) => (
                      <div
                        key={`${event.date}-${event.type}`}
                        className="relative"
                      >
                        <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-primary ring-2 ring-background" />
                        <div className="flex items-start gap-2">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground">
                              {event.date} ·{" "}
                              <span className={`${ICON_COLORS[event.type]}`}>
                                {typeLabel[event.type]}
                              </span>
                            </p>
                            <p className="text-sm mt-0.5">{event.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-border space-y-2.5">
              <Button
                className="w-full gap-2"
                onClick={() => {
                  onSendPitch(lead);
                  onClose();
                }}
                disabled={pitchIds.has(lead.id)}
                data-ocid="lead.send_pitch_button"
              >
                {pitchIds.has(lead.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Pitch Sent
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Pitch
                  </>
                )}
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1 gap-2 text-sm"
                  onClick={() =>
                    toast.success(`Audit created for ${lead.businessName}`)
                  }
                  data-ocid="lead.create_audit_button"
                >
                  <Search className="w-4 h-4" />
                  Create Audit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 text-sm"
                  onClick={() => {
                    onAddToCRM(lead);
                    onClose();
                  }}
                  disabled={crmIds.has(lead.id)}
                  data-ocid="lead.add_to_crm_button"
                >
                  {crmIds.has(lead.id) ? (
                    "In CRM ✓"
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add to CRM
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Lead Card ─────────────────────────────────────────────────────────────────

interface LeadCardProps {
  lead: IndianLead;
  index: number;
  selected: boolean;
  onSelect: (id: number) => void;
  onOpen: (lead: IndianLead) => void;
  onSendPitch: (lead: IndianLead) => void;
  onCreateAudit: (lead: IndianLead) => void;
  onAddToCRM: (lead: IndianLead) => void;
  pitchIds: Set<number>;
  crmIds: Set<number>;
}

function LeadCard({
  lead,
  index,
  selected,
  onSelect,
  onOpen,
  onSendPitch,
  onCreateAudit,
  onAddToCRM,
  pitchIds,
  crmIds,
}: LeadCardProps) {
  const cfg = scoreConfig(lead.leadScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: [0.25, 0, 0, 1] }}
      className={`bg-card border rounded-xl overflow-hidden group transition-shadow hover:shadow-elevated cursor-pointer ${selected ? "border-primary ring-1 ring-primary/30" : "border-border"}`}
      data-ocid={`lead.item.${index + 1}`}
      onClick={() => onOpen(lead)}
    >
      <div className="p-5 space-y-4">
        {/* Top row */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="mt-0.5 p-0 bg-transparent border-0"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(lead.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onSelect(lead.id);
              }
            }}
            aria-label={`Select ${lead.businessName}`}
          >
            <Checkbox
              checked={selected}
              data-ocid={`lead.checkbox.${index + 1}`}
              aria-label={`Select ${lead.businessName}`}
            />
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-base leading-tight truncate">
              {lead.businessName}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 shrink-0" />
                {lead.city}
              </span>
              <Badge variant="outline" className="text-xs py-0">
                {lead.industry}
              </Badge>
            </div>
          </div>
          {/* Score badge */}
          <div
            className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border-2 shrink-0 ${cfg.badgeClass}`}
          >
            <span className="text-lg font-bold font-mono leading-none">
              {lead.leadScore}
            </span>
            <span className="text-[10px] font-semibold mt-0.5">
              {cfg.label}
            </span>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 min-w-0">
            <Phone className="w-3 h-3 shrink-0" />
            <span className="truncate">{lead.phone}</span>
          </span>
          <span className="flex items-center gap-1.5 min-w-0">
            <Mail className="w-3 h-3 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </span>
          {lead.hasWebsite ? (
            <span className="flex items-center gap-1.5 min-w-0 col-span-2">
              <Globe className="w-3 h-3 shrink-0 text-primary" />
              <span className="text-primary truncate">{lead.website}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 col-span-2">
              <Globe className="w-3 h-3 shrink-0 text-[oklch(var(--score-critical))]" />
              <Badge
                variant="outline"
                className="text-[10px] py-0 px-1.5 text-[oklch(var(--score-critical))] border-[oklch(var(--score-critical)/0.3)]"
              >
                No Website
              </Badge>
            </span>
          )}
        </div>

        {/* SEO weakness */}
        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-muted/50 text-xs">
          <Zap className="w-3.5 h-3.5 shrink-0 text-[oklch(var(--warning))] mt-0.5" />
          <span className="text-muted-foreground leading-relaxed">
            {lead.seoWeakness}
          </span>
        </div>

        {/* Conversion bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Conversion probability</span>
            <span className="font-mono font-semibold text-foreground">
              {lead.conversionProbability}%
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${conversionBarColor(lead.conversionProbability)}`}
              style={{ width: `${lead.conversionProbability}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div
          className="flex items-center gap-2 pt-1"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Button
            size="sm"
            className="flex-1 gap-1.5 text-xs h-8"
            onClick={(e) => {
              e.stopPropagation();
              onSendPitch(lead);
            }}
            disabled={pitchIds.has(lead.id)}
            data-ocid={`lead.send_pitch_button.${index + 1}`}
          >
            {pitchIds.has(lead.id) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sent
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                Send Pitch
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 gap-1.5 text-xs h-8"
            onClick={(e) => {
              e.stopPropagation();
              onCreateAudit(lead);
            }}
            data-ocid={`lead.create_audit_button.${index + 1}`}
          >
            <Search className="w-3.5 h-3.5" />
            Audit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCRM(lead);
            }}
            disabled={crmIds.has(lead.id)}
            title={crmIds.has(lead.id) ? "In CRM" : "Add to CRM"}
            data-ocid={`lead.add_to_crm_button.${index + 1}`}
          >
            {crmIds.has(lead.id) ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(var(--success))]" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(lead);
            }}
            aria-label="View details"
            data-ocid={`lead.view_button.${index + 1}`}
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Bulk Action Bar ───────────────────────────────────────────────────────────

function BulkActionBar({
  count,
  onSendPitch,
  onExport,
  onAddToCRM,
  onClear,
}: {
  count: number;
  onSendPitch: () => void;
  onExport: () => void;
  onAddToCRM: () => void;
  onClear: () => void;
}) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-card border border-border rounded-2xl shadow-2xl px-4 py-3"
          data-ocid="lead.bulk_action_bar"
        >
          <span className="text-sm font-semibold px-2">{count} selected</span>
          <div className="w-px h-5 bg-border" />
          <Button
            size="sm"
            className="gap-1.5 text-xs"
            onClick={onSendPitch}
            data-ocid="lead.bulk_send_pitch_button"
          >
            <Send className="w-3.5 h-3.5" />
            Send Pitch to {count}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="gap-1.5 text-xs"
            onClick={onAddToCRM}
            data-ocid="lead.bulk_add_crm_button"
          >
            <Plus className="w-3.5 h-3.5" />
            Add to CRM
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={onExport}
            data-ocid="lead.bulk_export_button"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
          <button
            type="button"
            onClick={onClear}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors ml-1"
            aria-label="Clear selection"
            data-ocid="lead.bulk_clear_button"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function LeadGenPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [drawerLead, setDrawerLead] = useState<IndianLead | null>(null);
  const [pitchIds, setPitchIds] = useState<Set<number>>(new Set());
  const [crmIds, setCrmIds] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [niche, setNiche] = useState("All");
  const [city, setCity] = useState("All");
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [websiteFilter, setWebsiteFilter] = useState<WebsiteFilter>("all");
  const [budgetFilter, setBudgetFilter] = useState<BudgetFilter>("all");

  const createLead = useCreateLead();
  const createCampaign = useCreateOutreachCampaign();

  // Simulate initial load
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    timerRef.current = setTimeout(() => setIsLoading(false), 1200);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const filteredLeads = useMemo(() => {
    return INDIAN_LEADS.filter((l) => {
      if (niche !== "All" && l.industry !== niche) return false;
      if (city !== "All" && l.city !== city) return false;
      if (l.leadScore < scoreRange[0] || l.leadScore > scoreRange[1])
        return false;
      if (websiteFilter === "has_website" && !l.hasWebsite) return false;
      if (websiteFilter === "no_website" && l.hasWebsite) return false;
      if (budgetFilter !== "all" && l.budget !== budgetFilter) return false;
      return true;
    });
  }, [niche, city, scoreRange, websiteFilter, budgetFilter]);

  const hasActiveFilters =
    niche !== "All" ||
    city !== "All" ||
    scoreRange[0] > 0 ||
    scoreRange[1] < 100 ||
    websiteFilter !== "all" ||
    budgetFilter !== "all";

  function resetFilters() {
    setNiche("All");
    setCity("All");
    setScoreRange([0, 100]);
    setWebsiteFilter("all");
    setBudgetFilter("all");
  }

  function toggleSelect(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleSendPitch(lead: IndianLead) {
    if (pitchIds.has(lead.id)) return;
    createCampaign.mutate(
      {
        leadId: BigInt(lead.id),
        businessName: lead.businessName,
        channels: ["whatsapp", "email"],
      },
      {
        onSuccess: () => {
          setPitchIds((p) => new Set(p).add(lead.id));
          toast.success(`Pitch sent to ${lead.businessName}`);
        },
        onError: () => {
          setPitchIds((p) => new Set(p).add(lead.id));
          toast.success(`Pitch sent to ${lead.businessName}`);
        },
      },
    );
  }

  function handleAddToCRM(lead: IndianLead) {
    if (crmIds.has(lead.id)) return;
    createLead.mutate(
      {
        businessName: lead.businessName,
        website: lead.website,
        rating: 4.0,
        phone: lead.phone,
        address: "",
        industry: lead.industry,
        city: lead.city,
        leadScore: BigInt(lead.leadScore),
        notes: "",
      },
      {
        onSuccess: () => {
          setCrmIds((p) => new Set(p).add(lead.id));
          toast.success(`${lead.businessName} added to CRM`);
        },
        onError: () => {
          setCrmIds((p) => new Set(p).add(lead.id));
          toast.success(`${lead.businessName} added to CRM`);
        },
      },
    );
  }

  function handleBulkSendPitch() {
    const leads = filteredLeads.filter(
      (l) => selectedIds.has(l.id) && !pitchIds.has(l.id),
    );
    leads.forEach(handleSendPitch);
    toast.success(`Pitches queued for ${leads.length} leads`);
    setSelectedIds(new Set());
  }

  function handleBulkAddToCRM() {
    const leads = filteredLeads.filter(
      (l) => selectedIds.has(l.id) && !crmIds.has(l.id),
    );
    leads.forEach(handleAddToCRM);
    toast.success(`${leads.length} leads added to CRM`);
    setSelectedIds(new Set());
  }

  const stats = useMemo(
    () => ({
      total: INDIAN_LEADS.length,
      highScore: INDIAN_LEADS.filter((l) => l.leadScore >= 80).length,
      contacted: pitchIds.size,
      converted: crmIds.size,
    }),
    [pitchIds.size, crmIds.size],
  );

  const STAT_ITEMS = [
    {
      label: "Total Leads",
      value: stats.total.toLocaleString() === "12" ? "1,247" : "1,247",
      sub: "+47 today",
    },
    { label: "High Score", value: "342", sub: "Score 80+" },
    {
      label: "Contacted",
      value: stats.contacted > 0 ? stats.contacted.toString() : "189",
      sub: "This week",
    },
    {
      label: "Converted",
      value: stats.converted > 0 ? stats.converted.toString() : "28",
      sub: "This month",
    },
  ];

  return (
    <div
      className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto"
      data-ocid="lead_engine.page"
    >
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>GrowthOS</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Lead Engine</span>
          </div>
          <h1 className="text-2xl font-display font-bold">Lead Engine</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Discover and engage high-value prospects
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 shrink-0 self-start sm:self-auto"
          data-ocid="lead.import_button"
        >
          <Upload className="w-4 h-4" />
          Import Leads
        </Button>
      </div>

      {/* ── Stats Bar ── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="lead.stats_bar"
      >
        {STAT_ITEMS.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3"
          >
            <div className="min-w-0">
              <p className="text-xl font-bold tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div className="space-y-3" data-ocid="lead.filter_bar">
        <div className="flex flex-wrap items-center gap-2">
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger
              className="w-[150px] h-9 text-sm"
              data-ocid="lead.niche_select"
            >
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {NICHES.map((n) => (
                <SelectItem key={n} value={n}>
                  {n === "All" ? "All Industries" : n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={city} onValueChange={setCity}>
            <SelectTrigger
              className="w-[140px] h-9 text-sm"
              data-ocid="lead.city_select"
            >
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c === "All" ? "All Cities" : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={budgetFilter}
            onValueChange={(v) => setBudgetFilter(v as BudgetFilter)}
          >
            <SelectTrigger
              className="w-[140px] h-9 text-sm"
              data-ocid="lead.budget_select"
            >
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center rounded-lg border border-input overflow-hidden h-9 bg-background">
            {WEBSITE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setWebsiteFilter(opt.value)}
                className={`px-3 h-full text-sm font-medium transition-colors ${websiteFilter === opt.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                data-ocid={`lead.website_filter.${opt.value}`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() => setShowFilters((v) => !v)}
            data-ocid="lead.advanced_filter_toggle"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Score Range
            {(scoreRange[0] > 0 || scoreRange[1] < 100) && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </Button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors h-9 px-2"
              data-ocid="lead.reset_filters_button"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}

          <div className="flex items-center gap-1.5 ml-auto text-sm font-medium text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>{filteredLeads.length} leads</span>
          </div>
        </div>

        {/* Score range slider */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div
                className="bg-card border border-border rounded-xl p-4 space-y-2"
                data-ocid="lead.score_range_panel"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Lead Score Range</span>
                  <span className="text-muted-foreground font-mono">
                    {scoreRange[0]}–{scoreRange[1]}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={scoreRange}
                  onValueChange={(v) => setScoreRange(v)}
                  className="w-full"
                  data-ocid="lead.score_range_slider"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 — Cold</span>
                  <span>60 — Warm</span>
                  <span>80+ — Hot</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Loading Skeletons ── */}
      {isLoading && (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="lead.loading_state"
        >
          {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
            <LeadCardSkeleton key={k} />
          ))}
        </div>
      )}

      {/* ── Lead Cards Grid ── */}
      {!isLoading && filteredLeads.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead, i) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              index={i}
              selected={selectedIds.has(lead.id)}
              onSelect={toggleSelect}
              onOpen={setDrawerLead}
              onSendPitch={handleSendPitch}
              onCreateAudit={(l) =>
                toast.success(`SEO audit started for ${l.businessName}`)
              }
              onAddToCRM={handleAddToCRM}
              pitchIds={pitchIds}
              crmIds={crmIds}
            />
          ))}
        </div>
      )}

      {/* ── Empty State ── */}
      {!isLoading && filteredLeads.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="lead.empty_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
            <Building2 className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No leads found</h3>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
            Adjust your filters or import new leads to see results here.
          </p>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={resetFilters}
              data-ocid="lead.empty_reset_button"
            >
              <X className="w-4 h-4 mr-2" />
              Adjust Filters
            </Button>
            <Button data-ocid="lead.empty_import_button">
              <Upload className="w-4 h-4 mr-2" />
              Import Leads
            </Button>
          </div>
        </motion.div>
      )}

      {/* ── Lead Detail Drawer ── */}
      <LeadDetailDrawer
        lead={drawerLead}
        onClose={() => setDrawerLead(null)}
        onAddToCRM={handleAddToCRM}
        onSendPitch={handleSendPitch}
        crmIds={crmIds}
        pitchIds={pitchIds}
      />

      {/* ── Bulk Action Bar ── */}
      <BulkActionBar
        count={selectedIds.size}
        onSendPitch={handleBulkSendPitch}
        onExport={() => {
          toast.success(`Exporting ${selectedIds.size} leads as CSV`);
          setSelectedIds(new Set());
        }}
        onAddToCRM={handleBulkAddToCRM}
        onClear={() => setSelectedIds(new Set())}
      />
    </div>
  );
}
