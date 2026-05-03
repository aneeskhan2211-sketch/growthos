import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

export interface PipelineLead {
  id: string;
  businessName: string;
  city: string;
  score: number;
  budget?: string;
}

interface PipelineColumnProps {
  stageId: string;
  stageName: string;
  stageColor: string;
  leads: PipelineLead[];
  count: number;
  onDragStart: (leadId: string, fromStageId: string) => void;
  onDrop: (leadId: string, toStageId: string) => void;
  isLoading?: boolean;
}

function getScoreMeta(score: number): {
  label: string;
  className: string;
} {
  if (score >= 85)
    return {
      label: `${score}`,
      className: "bg-score-success score-success",
    };
  if (score >= 70)
    return {
      label: `${score}`,
      className: "bg-primary/10 text-primary",
    };
  if (score >= 40)
    return {
      label: `${score}`,
      className: "bg-score-warning score-warning",
    };
  return {
    label: `${score}`,
    className: "bg-score-critical score-critical",
  };
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-3 space-y-2">
      <Skeleton className="h-4 w-3/4 skeleton-shimmer" />
      <Skeleton className="h-3 w-1/2 skeleton-shimmer" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-10 rounded-full skeleton-shimmer" />
        <Skeleton className="h-3 w-16 skeleton-shimmer" />
      </div>
    </div>
  );
}

interface LeadCardProps {
  lead: PipelineLead;
  index: number;
  stageId: string;
  onDragStart: (leadId: string, fromStageId: string) => void;
}

function LeadCard({ lead, index, stageId, onDragStart }: LeadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const scoreMeta = getScoreMeta(lead.score);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("leadId", lead.id);
    e.dataTransfer.setData("fromStageId", stageId);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
    onDragStart(lead.id, stageId);
  };

  const handleDragEnd = () => setIsDragging(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: isDragging ? 0.45 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{
        layout: { type: "spring", stiffness: 420, damping: 30 },
        opacity: { duration: 0.22 },
        y: { duration: 0.22, delay: index * 0.06 },
      }}
    >
      {/* Native div wraps drag events — avoids framer-motion onDragStart type conflict */}
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        data-ocid={`pipeline.lead_card.${index + 1}`}
        className={[
          "group rounded-lg border border-border bg-card p-3 cursor-grab active:cursor-grabbing",
          "shadow-xs hover:shadow-card transition-hover hover-lift-sm select-none",
          isDragging ? "ring-1 ring-primary/40" : "",
        ].join(" ")}
      >
        {/* Business name */}
        <p className="font-semibold text-sm text-foreground text-truncate-1 font-display">
          {lead.businessName}
        </p>

        {/* City */}
        <p className="text-xs text-muted-foreground mt-0.5 text-truncate-1">
          {lead.city}
        </p>

        {/* Score + budget row */}
        <div className="flex items-center justify-between mt-2 gap-2">
          <span
            className={[
              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold tabular-nums",
              scoreMeta.className,
            ].join(" ")}
          >
            {scoreMeta.label}
          </span>

          {lead.budget && (
            <span className="text-xs text-muted-foreground font-medium truncate">
              {lead.budget}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function PipelineColumn({
  stageId,
  stageName,
  stageColor,
  leads,
  count,
  onDragStart,
  onDrop,
  isLoading = false,
}: PipelineColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragOver(false);
    const leadId = e.dataTransfer.getData("leadId");
    if (leadId) onDrop(leadId, stageId);
  };

  const hasLeads = leads.length > 0;
  const isScrollable = leads.length > 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      data-ocid={`pipeline.column.${stageId}`}
      className={[
        "flex flex-col rounded-xl border bg-card transition-smooth min-w-[240px] w-64 flex-shrink-0",
        isDragOver
          ? "border-primary/50 bg-primary/[0.03] shadow-elevated"
          : "border-border shadow-xs",
      ].join(" ")}
      style={{ borderLeftColor: stageColor, borderLeftWidth: "3px" }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: stageColor }}
          />
          <h3 className="text-sm font-semibold text-foreground font-display truncate">
            {stageName}
          </h3>
        </div>
        <span
          className="inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold tabular-nums flex-shrink-0"
          style={{
            backgroundColor: `color-mix(in oklch, ${stageColor} 15%, transparent)`,
            color: stageColor,
          }}
        >
          {count}
        </span>
      </div>

      {/* Divider */}
      <div className="mx-3 h-px bg-border/60 mb-2" />

      {/* Cards list */}
      <div
        className={[
          "flex flex-col gap-2 px-3 pb-3",
          isScrollable ? "overflow-y-auto max-h-[420px] scrollbar-thin" : "",
        ].join(" ")}
      >
        {isLoading ? (
          // Skeleton state
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : hasLeads ? (
          // Lead cards
          <AnimatePresence mode="popLayout" initial={false}>
            {leads.map((lead, index) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                index={index}
                stageId={stageId}
                onDragStart={onDragStart}
              />
            ))}
          </AnimatePresence>
        ) : (
          // Empty state
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            data-ocid={`pipeline.${stageId}.empty_state`}
            className={[
              "flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-8 px-4 text-center transition-smooth",
              isDragOver
                ? "border-primary/50 bg-primary/[0.04]"
                : "border-border",
            ].join(" ")}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-smooth"
              style={{
                backgroundColor: `color-mix(in oklch, ${stageColor} 12%, transparent)`,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="flex-shrink-0"
                style={{ color: stageColor }}
              >
                <path
                  d="M8 3v10M3 8h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              Drop leads here
            </p>
          </motion.div>
        )}
      </div>

      {/* Drop highlight overlay (bottom accent) */}
      <AnimatePresence>
        {isDragOver && (
          <motion.div
            key="drop-indicator"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.15 }}
            className="mx-3 mb-2 h-0.5 rounded-full origin-left"
            style={{ backgroundColor: stageColor }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
