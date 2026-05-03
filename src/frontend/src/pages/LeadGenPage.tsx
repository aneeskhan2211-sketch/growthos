import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface MobileLead {
  id: number;
  businessName: string;
  city: string;
  industry: string;
  score: number;
  issue: string;
  saved: boolean;
  archived: boolean;
}

type ScoreTier = "prime" | "hot" | "warm";
type FilterSheet = "niche" | "city" | "score" | null;

// ─── Constants ─────────────────────────────────────────────────────────────────

const NICHES = [
  "Tech",
  "Healthcare",
  "Real Estate",
  "Education",
  "Fitness",
  "Food",
  "Legal",
  "Retail",
];
const CITIES = [
  "Mumbai",
  "Delhi",
  "Pune",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Ahmedabad",
];

const ALL_LEADS: MobileLead[] = [
  {
    id: 1,
    businessName: "Bombay Bites Restaurant",
    city: "Mumbai",
    industry: "Food",
    score: 85,
    issue: "No online ordering",
    saved: false,
    archived: false,
  },
  {
    id: 2,
    businessName: "Sharma Legal Associates",
    city: "Delhi",
    industry: "Legal",
    score: 72,
    issue: "Weak SEO presence",
    saved: false,
    archived: false,
  },
  {
    id: 3,
    businessName: "FitZone Gym",
    city: "Pune",
    industry: "Fitness",
    score: 91,
    issue: "No social media",
    saved: false,
    archived: false,
  },
  {
    id: 4,
    businessName: "Digital Nest Academy",
    city: "Bengaluru",
    industry: "Education",
    score: 68,
    issue: "Low Google rating",
    saved: false,
    archived: false,
  },
  {
    id: 5,
    businessName: "Royal Creations Boutique",
    city: "Mumbai",
    industry: "Retail",
    score: 45,
    issue: "No website",
    saved: false,
    archived: false,
  },
  {
    id: 6,
    businessName: "MediCare Clinic",
    city: "Hyderabad",
    industry: "Healthcare",
    score: 88,
    issue: "Poor reviews management",
    saved: false,
    archived: false,
  },
  {
    id: 7,
    businessName: "TechSpark Solutions",
    city: "Chennai",
    industry: "Tech",
    score: 79,
    issue: "No Google Business profile",
    saved: false,
    archived: false,
  },
  {
    id: 8,
    businessName: "Sunrise Properties",
    city: "Ahmedabad",
    industry: "Real Estate",
    score: 55,
    issue: "Outdated website",
    saved: false,
    archived: false,
  },
  {
    id: 9,
    businessName: "Flavors of India Restaurant",
    city: "Pune",
    industry: "Food",
    score: 94,
    issue: "No delivery integration",
    saved: false,
    archived: false,
  },
  {
    id: 10,
    businessName: "StudyPath Education",
    city: "Delhi",
    industry: "Education",
    score: 62,
    issue: "No landing page",
    saved: false,
    archived: false,
  },
  {
    id: 11,
    businessName: "NexGen Healthcare",
    city: "Mumbai",
    industry: "Healthcare",
    score: 83,
    issue: "No appointment booking",
    saved: false,
    archived: false,
  },
  {
    id: 12,
    businessName: "LegalEdge Advocates",
    city: "Bengaluru",
    industry: "Legal",
    score: 77,
    issue: "No client portal",
    saved: false,
    archived: false,
  },
  {
    id: 13,
    businessName: "PrimeSpace Realty",
    city: "Chennai",
    industry: "Real Estate",
    score: 90,
    issue: "Missing city-specific pages",
    saved: false,
    archived: false,
  },
  {
    id: 14,
    businessName: "CodeCraft Academy",
    city: "Hyderabad",
    industry: "Tech",
    score: 66,
    issue: "Slow website load time",
    saved: false,
    archived: false,
  },
  {
    id: 15,
    businessName: "Spice Garden Restaurant",
    city: "Ahmedabad",
    industry: "Food",
    score: 38,
    issue: "No Google Maps listing",
    saved: false,
    archived: false,
  },
];

const PAGE_SIZE = 20;

// ─── Score Helpers ─────────────────────────────────────────────────────────────

function getScoreTier(score: number): ScoreTier {
  if (score > 70) return "prime";
  if (score >= 40) return "hot";
  return "warm";
}

function scoreTierLabel(tier: ScoreTier): string {
  if (tier === "prime") return "🔥 Prime";
  if (tier === "hot") return "Hot";
  return "Warm";
}

function scoreBadgeStyle(tier: ScoreTier): string {
  if (tier === "prime")
    return "bg-[oklch(var(--score-success)/0.18)] text-[oklch(var(--score-success))] border border-[oklch(var(--score-success)/0.3)]";
  if (tier === "hot")
    return "bg-[oklch(var(--score-warning)/0.18)] text-[oklch(var(--score-warning))] border border-[oklch(var(--score-warning)/0.3)]";
  return "bg-[oklch(var(--score-critical)/0.18)] text-[oklch(var(--score-critical))] border border-[oklch(var(--score-critical)/0.3)]";
}

function cardGradient(tier: ScoreTier): string {
  if (tier === "prime")
    return "from-[oklch(var(--score-success)/0.06)] to-transparent";
  if (tier === "hot")
    return "from-[oklch(var(--score-warning)/0.06)] to-transparent";
  return "from-[oklch(var(--score-critical)/0.06)] to-transparent";
}

// ─── SVG Icons ─────────────────────────────────────────────────────────────────

function PaperPlaneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

function EyeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function StarIcon({
  filled = false,
  size = 20,
}: { filled?: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "oklch(var(--score-warning))" : "none"}
      stroke={filled ? "oklch(var(--score-warning))" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Skeleton Card ─────────────────────────────────────────────────────────────

function LeadCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-3 flex items-center gap-3">
      <div className="flex-1 space-y-2 min-w-0">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <Skeleton className="h-6 w-16 rounded-full" />
        <div className="flex gap-1.5">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-7 h-7 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Swipeable Lead Card ───────────────────────────────────────────────────────

interface LeadCardProps {
  lead: MobileLead;
  index: number;
  onSendPitch: (lead: MobileLead) => void;
  onViewDetails: (lead: MobileLead) => void;
  onToggleSave: (id: number) => void;
  onArchive: (id: number) => void;
  onLongPress: (lead: MobileLead) => void;
}

function SwipeLeadCard({
  lead,
  index,
  onSendPitch,
  onViewDetails,
  onToggleSave,
  onArchive,
  onLongPress,
}: LeadCardProps) {
  const tier = getScoreTier(lead.score);
  const x = useMotionValue(0);
  const archiveOpacity = useTransform(x, [-100, -40], [1, 0]);
  const archiveBg = useTransform(
    x,
    [-100, -40],
    ["oklch(var(--destructive))", "oklch(var(--destructive)/0.3)"],
  );

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const startLongPress = useCallback(() => {
    setIsPressed(true);
    longPressTimer.current = setTimeout(() => {
      setIsPressed(false);
      onLongPress(lead);
    }, 300);
  }, [lead, onLongPress]);

  const cancelLongPress = useCallback(() => {
    setIsPressed(false);
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  }, []);

  function handleDragEnd() {
    if (x.get() < -80) {
      onArchive(lead.id);
    } else {
      x.set(0);
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      data-ocid={`lead.item.${index + 1}`}
    >
      {/* Archive background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end px-5 rounded-2xl"
        style={{ backgroundColor: archiveBg as unknown as string }}
      >
        <motion.div style={{ opacity: archiveOpacity }} className="text-white">
          <TrashIcon />
        </motion.div>
      </motion.div>

      {/* Swipeable card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.1}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className={`relative bg-gradient-to-r ${cardGradient(tier)} bg-card border border-border rounded-2xl cursor-grab active:cursor-grabbing select-none`}
        animate={{ scale: isPressed ? 0.97 : 1 }}
        transition={{ duration: 0.15 }}
      >
        {/* Plain <div> child for touch/press events — NOT motion.div */}
        <div
          className="p-3"
          onPointerDown={startLongPress}
          onPointerUp={cancelLongPress}
          onPointerLeave={cancelLongPress}
        >
          <div className="flex items-start gap-3">
            {/* Lead info */}
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-display font-semibold text-base leading-tight truncate text-foreground">
                {lead.businessName}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground font-medium">
                  {lead.city}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span className="text-xs text-muted-foreground">
                  {lead.industry}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {lead.issue}
              </p>
            </div>

            {/* Right column: score badge + actions */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              {/* Score badge */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${scoreBadgeStyle(tier)}`}
              >
                {scoreTierLabel(tier)}
                <span className="font-mono">{lead.score}</span>
              </span>

              {/* Quick actions */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSendPitch(lead);
                  }}
                  className="w-7 h-7 rounded-full bg-muted/60 hover:bg-primary/20 active:scale-90 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-150"
                  aria-label={`Send pitch to ${lead.businessName}`}
                  data-ocid={`lead.send_pitch_button.${index + 1}`}
                >
                  <PaperPlaneIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(lead);
                  }}
                  className="w-7 h-7 rounded-full bg-muted/60 hover:bg-accent/20 active:scale-90 flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-150"
                  aria-label={`View details for ${lead.businessName}`}
                  data-ocid={`lead.view_button.${index + 1}`}
                >
                  <EyeIcon size={14} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(lead.id);
                  }}
                  className="w-7 h-7 rounded-full bg-muted/60 hover:bg-[oklch(var(--score-warning)/0.2)] active:scale-90 flex items-center justify-center text-muted-foreground transition-all duration-150"
                  aria-label={
                    lead.saved
                      ? "Remove from saved"
                      : `Save ${lead.businessName}`
                  }
                  data-ocid={`lead.save_button.${index + 1}`}
                >
                  <StarIcon filled={lead.saved} size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Filter Pill ───────────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
  "data-ocid": ocid,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  "data-ocid"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
        active
          ? "bg-primary text-primary-foreground shadow-[0_2px_8px_oklch(var(--primary)/0.3)]"
          : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
      }`}
    >
      {label}
      <ChevronDownIcon />
    </button>
  );
}

// ─── Bottom Sheet ──────────────────────────────────────────────────────────────

interface BottomSheetProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl z-50 pb-10"
            data-ocid="lead.filter_sheet"
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <h3 className="font-display font-semibold text-base">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
                aria-label="Close filter"
                data-ocid="lead.filter_sheet_close"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-3" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Long Press Action Sheet ───────────────────────────────────────────────────

interface ActionSheetProps {
  lead: MobileLead | null;
  onClose: () => void;
  onSendPitch: (lead: MobileLead) => void;
  onViewDetails: (lead: MobileLead) => void;
  onToggleSave: (id: number) => void;
  onArchive: (id: number) => void;
}

function LongPressActionSheet({
  lead,
  onClose,
  onSendPitch,
  onViewDetails,
  onToggleSave,
  onArchive,
}: ActionSheetProps) {
  const actions = lead
    ? [
        {
          icon: <PaperPlaneIcon size={18} />,
          label: "Send Pitch",
          color: "text-primary",
          fn: () => {
            onSendPitch(lead);
            onClose();
          },
          ocid: "lead.action_sheet_pitch",
        },
        {
          icon: <EyeIcon size={18} />,
          label: "View Details",
          color: "text-accent",
          fn: () => {
            onViewDetails(lead);
            onClose();
          },
          ocid: "lead.action_sheet_view",
        },
        {
          icon: <StarIcon filled={lead.saved} size={18} />,
          label: lead.saved ? "Remove from Saved" : "Save Lead",
          color: "text-[oklch(var(--score-warning))]",
          fn: () => {
            onToggleSave(lead.id);
            onClose();
          },
          ocid: "lead.action_sheet_save",
        },
        {
          icon: <NoteIcon />,
          label: "Add Note",
          color: "text-muted-foreground",
          fn: () => {
            toast.success("Note panel coming soon");
            onClose();
          },
          ocid: "lead.action_sheet_note",
        },
        {
          icon: <ArchiveIcon />,
          label: "Archive",
          color: "text-destructive",
          fn: () => {
            onArchive(lead.id);
            onClose();
          },
          ocid: "lead.action_sheet_archive",
        },
      ]
    : [];

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl z-50 pb-12"
            data-ocid="lead.action_sheet"
          >
            <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mt-3 mb-4" />
            <div className="px-5 pb-2">
              <p className="font-display font-semibold text-base truncate">
                {lead.businessName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lead.city} · {lead.industry}
              </p>
            </div>
            <div className="mt-1 divide-y divide-border/60">
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.fn}
                  className={`w-full flex items-center gap-4 px-5 py-4 text-sm font-medium hover:bg-muted/50 active:bg-muted transition-colors ${action.color}`}
                  data-ocid={action.ocid}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Lead Detail Drawer ────────────────────────────────────────────────────────

function LeadDetailSheet({
  lead,
  onClose,
  onSendPitch,
}: {
  lead: MobileLead | null;
  onClose: () => void;
  onSendPitch: (lead: MobileLead) => void;
}) {
  if (!lead) return null;
  const tier = getScoreTier(lead.score);

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            key="ds"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 38 }}
            className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl z-50 max-h-[80vh] flex flex-col"
            data-ocid="lead.detail_sheet"
          >
            <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mt-3 mb-4 shrink-0" />
            <div className="overflow-y-auto flex-1 px-5 pb-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-bold text-xl leading-tight">
                    {lead.businessName}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lead.city} · {lead.industry}
                  </p>
                </div>
                <span
                  className={`ml-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold shrink-0 ${scoreBadgeStyle(tier)}`}
                >
                  {scoreTierLabel(tier)} {lead.score}
                </span>
              </div>

              {/* Issue */}
              <div className="bg-[oklch(var(--score-critical)/0.08)] border border-[oklch(var(--score-critical)/0.2)] rounded-xl p-3 mb-4">
                <p className="text-xs font-semibold text-[oklch(var(--score-critical))] mb-1">
                  Issue Detected
                </p>
                <p className="text-sm">{lead.issue}</p>
              </div>

              {/* Score bar */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Lead Score</span>
                  <span className="font-mono font-bold">{lead.score}/100</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lead.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      tier === "prime"
                        ? "bg-[oklch(var(--score-success))]"
                        : tier === "hot"
                          ? "bg-[oklch(var(--score-warning))]"
                          : "bg-[oklch(var(--score-critical))]"
                    }`}
                  />
                </div>
              </div>

              {/* CTA */}
              <Button
                className="w-full h-12 gap-2 font-semibold"
                onClick={() => {
                  onSendPitch(lead);
                  onClose();
                }}
                data-ocid="lead.detail_send_pitch"
              >
                <PaperPlaneIcon size={16} />
                Send Pitch to {lead.businessName}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function LeadGenPage() {
  useMetaTags(PAGE_META["/leads"]);
  const [leads, setLeads] = useState<MobileLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeNiches, setActiveNiches] = useState<string[]>([]);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [minScore, setMinScore] = useState(0);
  const [filterSheet, setFilterSheet] = useState<FilterSheet>(null);
  const [actionLead, setActionLead] = useState<MobileLead | null>(null);
  const [detailLead, setDetailLead] = useState<MobileLead | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Simulate load
  useEffect(() => {
    const t = setTimeout(() => {
      setLeads(ALL_LEADS);
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (isLoading) return;
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((v) => v + PAGE_SIZE);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isLoading]);

  const filteredLeads = leads.filter((l) => {
    if (l.archived) return false;
    if (
      search &&
      !l.businessName.toLowerCase().includes(search.toLowerCase()) &&
      !l.city.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (activeNiches.length > 0 && !activeNiches.includes(l.industry))
      return false;
    if (activeCity && l.city !== activeCity) return false;
    if (l.score < minScore) return false;
    return true;
  });

  const visibleLeads = filteredLeads.slice(0, visibleCount);

  function handleSendPitch(lead: MobileLead) {
    toast.success(`Pitch sent to ${lead.businessName}!`);
  }

  function handleToggleSave(id: number) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l)),
    );
    const lead = leads.find((l) => l.id === id);
    if (lead)
      toast.success(
        lead.saved ? "Removed from saved" : `${lead.businessName} saved!`,
      );
  }

  function handleArchive(id: number) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, archived: true } : l)),
    );
    toast.success("Lead archived. Undo?", {
      action: {
        label: "Undo",
        onClick: () =>
          setLeads((prev) =>
            prev.map((l) => (l.id === id ? { ...l, archived: false } : l)),
          ),
      },
      duration: 5000,
    });
  }

  function toggleNiche(n: string) {
    setActiveNiches((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n],
    );
  }

  const nicheLabel =
    activeNiches.length === 0
      ? "All Niches"
      : activeNiches.length === 1
        ? activeNiches[0]
        : `${activeNiches.length} Niches`;
  const cityLabel = activeCity ?? "All Cities";
  const scoreLabel = minScore > 0 ? `Score: ${minScore}+` : "Score: Any";

  return (
    <div className="flex flex-col h-full bg-background" data-ocid="leads.page">
      {/* ── Top Bar ── */}
      <div className="px-4 pt-4 pb-3 bg-background sticky top-0 z-10 space-y-3">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search businesses..."
            className="w-full h-11 pl-11 pr-4 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            data-ocid="leads.search_input"
          />
        </div>

        {/* Filter pills — horizontal scroll */}
        <div
          className="flex gap-2 overflow-x-auto scrollbar-thin pb-0.5 -mx-4 px-4"
          data-ocid="leads.filter_row"
        >
          <FilterPill
            label={nicheLabel}
            active={activeNiches.length > 0}
            onClick={() => setFilterSheet("niche")}
            data-ocid="leads.niche_filter"
          />
          <FilterPill
            label={cityLabel}
            active={!!activeCity}
            onClick={() => setFilterSheet("city")}
            data-ocid="leads.city_filter"
          />
          <FilterPill
            label={scoreLabel}
            active={minScore > 0}
            onClick={() => setFilterSheet("score")}
            data-ocid="leads.score_filter"
          />
          {(activeNiches.length > 0 || activeCity || minScore > 0) && (
            <button
              type="button"
              onClick={() => {
                setActiveNiches([]);
                setActiveCity(null);
                setMinScore(0);
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium text-muted-foreground bg-muted/60 whitespace-nowrap shrink-0"
              data-ocid="leads.clear_filters"
            >
              <CloseIcon />
              Clear
            </button>
          )}
          <span className="inline-flex items-center px-3 py-2 text-xs text-muted-foreground whitespace-nowrap shrink-0 ml-auto">
            {filteredLeads.length} leads
          </span>
        </div>
      </div>

      {/* ── Lead List ── */}
      <div
        className="flex-1 overflow-y-auto px-4 pb-24 space-y-3"
        data-ocid="leads.list"
      >
        {/* Skeletons */}
        {isLoading &&
          ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
            <LeadCardSkeleton key={k} />
          ))}

        {/* Lead cards */}
        {!isLoading &&
          visibleLeads.map((lead, i) => (
            <SwipeLeadCard
              key={lead.id}
              lead={lead}
              index={i}
              onSendPitch={handleSendPitch}
              onViewDetails={setDetailLead}
              onToggleSave={handleToggleSave}
              onArchive={handleArchive}
              onLongPress={setActionLead}
            />
          ))}

        {/* Load more sentinel */}
        {!isLoading && visibleCount < filteredLeads.length && (
          <div
            ref={loadMoreRef}
            className="py-4 flex items-center justify-center"
            data-ocid="leads.load_more"
          >
            <span className="text-xs text-muted-foreground">Loading more…</span>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredLeads.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="leads.empty_state"
          >
            <div className="text-primary mb-4 opacity-60">
              <TargetIcon />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">
              No leads yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed mb-6">
              Tap ⚡ Get Clients Now to generate your first leads
            </p>
            <Button
              className="h-12 px-6 gap-2 font-semibold"
              onClick={() => window.location.assign("/fab")}
              data-ocid="leads.get_clients_button"
            >
              ⚡ Get Clients Now
            </Button>
          </motion.div>
        )}
      </div>

      {/* ── Niche Filter Sheet ── */}
      <BottomSheet
        open={filterSheet === "niche"}
        title="Select Niches"
        onClose={() => setFilterSheet(null)}
      >
        <div
          className="px-5 pb-4 flex flex-wrap gap-2"
          data-ocid="leads.niche_sheet"
        >
          {NICHES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => toggleNiche(n)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
                activeNiches.includes(n)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
              data-ocid={`leads.niche_option.${n.toLowerCase()}`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="px-5">
          <Button
            className="w-full h-11"
            onClick={() => setFilterSheet(null)}
            data-ocid="leads.niche_apply"
          >
            Apply Filter
          </Button>
        </div>
      </BottomSheet>

      {/* ── City Filter Sheet ── */}
      <BottomSheet
        open={filterSheet === "city"}
        title="Select City"
        onClose={() => setFilterSheet(null)}
      >
        <div
          className="px-5 pb-4 divide-y divide-border/50"
          data-ocid="leads.city_sheet"
        >
          <button
            type="button"
            onClick={() => {
              setActiveCity(null);
              setFilterSheet(null);
            }}
            className={`w-full text-left py-3.5 text-sm font-medium transition-colors ${!activeCity ? "text-primary font-semibold" : "text-foreground"}`}
            data-ocid="leads.city_all"
          >
            All Cities
          </button>
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setActiveCity(c);
                setFilterSheet(null);
              }}
              className={`w-full text-left py-3.5 text-sm font-medium transition-colors ${activeCity === c ? "text-primary font-semibold" : "text-foreground"}`}
              data-ocid={`leads.city_option.${c.toLowerCase()}`}
            >
              {c}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* ── Score Filter Sheet ── */}
      <BottomSheet
        open={filterSheet === "score"}
        title="Minimum Lead Score"
        onClose={() => setFilterSheet(null)}
      >
        <div className="px-5 pb-4 space-y-5" data-ocid="leads.score_sheet">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Score</span>
            <span className="font-mono font-bold text-lg text-primary">
              {minScore}+
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={90}
            step={10}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="w-full accent-primary h-2"
            data-ocid="leads.score_slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Any</span>
            <span className="text-[oklch(var(--score-critical))]">40 Warm</span>
            <span className="text-[oklch(var(--score-warning))]">70 Hot</span>
            <span className="text-[oklch(var(--score-success))]">85 Prime</span>
          </div>
          <Button
            className="w-full h-11"
            onClick={() => setFilterSheet(null)}
            data-ocid="leads.score_apply"
          >
            Apply Score Filter
          </Button>
        </div>
      </BottomSheet>

      {/* ── Long Press Action Sheet ── */}
      <LongPressActionSheet
        lead={actionLead}
        onClose={() => setActionLead(null)}
        onSendPitch={handleSendPitch}
        onViewDetails={(l) => {
          setDetailLead(l);
        }}
        onToggleSave={handleToggleSave}
        onArchive={handleArchive}
      />

      {/* ── Lead Detail Sheet ── */}
      <LeadDetailSheet
        lead={detailLead}
        onClose={() => setDetailLead(null)}
        onSendPitch={handleSendPitch}
      />
    </div>
  );
}
