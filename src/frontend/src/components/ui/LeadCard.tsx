import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Briefcase, Eye, MapPin, Zap } from "lucide-react";
import { motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeadCardLead {
  id: string;
  businessName: string;
  city: string;
  score: number;
  issue: string;
  industry: string;
  budget?: string;
}

export interface LeadCardProps {
  lead: LeadCardLead;
  onSendPitch: (id: string) => void;
  onViewDetails: (id: string) => void;
  isLoading?: boolean;
  index?: number;
  "data-ocid"?: string;
}

// ─── Score badge ──────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const { bg, text, ring } =
    score >= 85
      ? { bg: "bg-success/12", text: "text-success", ring: "ring-success/30" }
      : score >= 70
        ? { bg: "bg-primary/12", text: "text-primary", ring: "ring-primary/30" }
        : score >= 40
          ? {
              bg: "bg-warning/12",
              text: "text-warning",
              ring: "ring-warning/30",
            }
          : {
              bg: "bg-destructive/12",
              text: "text-destructive",
              ring: "ring-destructive/30",
            };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ring-2 shrink-0",
        bg,
        text,
        ring,
      )}
      title={`Lead score: ${score}`}
    >
      {score}
    </span>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function LeadCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="skeleton-shimmer w-10 h-10 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton-shimmer h-4 w-40 rounded" />
          <div className="skeleton-shimmer h-3 w-24 rounded" />
        </div>
        <div className="skeleton-shimmer h-5 w-16 rounded-full" />
      </div>
      <div className="skeleton-shimmer h-3 w-full rounded" />
      <div className="flex gap-2">
        <div className="skeleton-shimmer h-8 flex-1 rounded" />
        <div className="skeleton-shimmer h-8 flex-1 rounded" />
      </div>
    </div>
  );
}

// ─── LeadCard ─────────────────────────────────────────────────────────────────

export function LeadCard({
  lead,
  onSendPitch,
  onViewDetails,
  isLoading = false,
  index = 0,
  "data-ocid": ocid,
}: LeadCardProps) {
  if (isLoading) return <LeadCardSkeleton />;

  const { id, businessName, city, score, issue, industry, budget } = lead;

  return (
    <motion.div
      data-ocid={ocid}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06, ease: "easeOut" }}
      className={cn(
        "group bg-card border border-border rounded-xl p-4 space-y-3",
        "transition-hover hover:-translate-y-[2px] hover:shadow-elevated hover:border-border/80",
      )}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <ScoreBadge score={score} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold font-display text-foreground text-sm leading-snug truncate">
            {businessName}
          </h3>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{city}</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Briefcase className="w-3 h-3 shrink-0" />
              <span className="truncate">{industry}</span>
            </span>
          </div>
        </div>
        {budget && (
          <span className="shrink-0 text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
            {budget}
          </span>
        )}
      </div>

      {/* Issue summary */}
      <div className="flex items-start gap-1.5 bg-warning/8 border border-warning/20 rounded-lg px-2.5 py-2">
        <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5" />
        <p className="text-xs text-warning font-medium leading-snug truncate">
          {issue}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 btn-primary-glow h-8 text-xs gap-1.5"
          onClick={() => onSendPitch(id)}
          data-ocid={ocid ? `${ocid}.send_pitch_button` : undefined}
        >
          <Zap className="w-3.5 h-3.5" />
          Send Pitch
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 h-8 text-xs gap-1.5 transition-fast active:scale-[0.98]"
          onClick={() => onViewDetails(id)}
          data-ocid={ocid ? `${ocid}.view_details_button` : undefined}
        >
          <Eye className="w-3.5 h-3.5" />
          View Details
        </Button>
      </div>
    </motion.div>
  );
}
