import {
  PLATFORM_COLORS,
  PlatformIcon,
  type PlatformName,
} from "@/components/icons/PlatformIcons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlatformMetric {
  label: string;
  value: string;
}

export interface PlatformCardProps {
  platformName: PlatformName;
  status: "connected" | "disconnected" | "syncing";
  metrics: PlatformMetric[];
  onConnect?: () => void;
  isLoading?: boolean;
  index?: number;
  "data-ocid"?: string;
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({
  status,
}: { status: "connected" | "disconnected" | "syncing" }) {
  const config = {
    connected: {
      dot: "bg-success",
      label: "Connected",
      text: "text-success",
      bg: "bg-success/10",
      ping: false,
    },
    disconnected: {
      dot: "bg-destructive",
      label: "Disconnected",
      text: "text-destructive",
      bg: "bg-destructive/10",
      ping: false,
    },
    syncing: {
      dot: "bg-warning",
      label: "Syncing",
      text: "text-warning",
      bg: "bg-warning/10",
      ping: true,
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full",
        config.bg,
        config.text,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={cn("rounded-full h-1.5 w-1.5 flex-shrink-0", config.dot)}
        />
        {config.ping && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              config.dot,
            )}
          />
        )}
      </span>
      {config.label}
    </span>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PlatformCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton-shimmer w-10 h-10 rounded-xl" />
          <div className="skeleton-shimmer h-4 w-24 rounded" />
        </div>
        <div className="skeleton-shimmer h-5 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="skeleton-shimmer h-3 w-16 rounded" />
            <div className="skeleton-shimmer h-4 w-12 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PlatformCard ─────────────────────────────────────────────────────────────

export function PlatformCard({
  platformName,
  status,
  metrics,
  onConnect,
  isLoading = false,
  index = 0,
  "data-ocid": ocid,
}: PlatformCardProps) {
  if (isLoading) return <PlatformCardSkeleton />;

  const accentColor = PLATFORM_COLORS[platformName];

  return (
    <motion.div
      data-ocid={ocid}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.05, ease: "easeOut" }}
      className={cn(
        "group bg-card border border-border rounded-xl p-4 space-y-4",
        "transition-hover hover:-translate-y-[2px] hover:shadow-elevated",
        "relative overflow-hidden",
      )}
      style={{
        // Subtle platform accent on hover via CSS custom prop
        ["--platform-accent" as string]: accentColor,
      }}
    >
      {/* Hover border accent */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-fast"
        style={{
          boxShadow: `inset 0 0 0 1.5px ${accentColor}30`,
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 relative">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${accentColor}18` }}
          >
            <PlatformIcon name={platformName} size={22} />
          </div>
          <span className="font-semibold font-display text-sm text-foreground">
            {platformName}
          </span>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Metrics grid */}
      {metrics.length > 0 && status !== "disconnected" && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 relative">
          {metrics.map((m) => (
            <div key={m.label} className="min-w-0">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide truncate">
                {m.label}
              </p>
              <p className="text-sm font-bold font-display text-foreground tabular-nums mt-0.5 truncate">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Connect CTA for disconnected */}
      {status === "disconnected" && (
        <Button
          size="sm"
          variant="outline"
          className="w-full h-8 text-xs gap-1.5 transition-fast active:scale-[0.98]"
          onClick={onConnect}
          data-ocid={ocid ? `${ocid}.connect_button` : undefined}
        >
          <Link2 className="w-3.5 h-3.5" />
          Connect {platformName}
        </Button>
      )}

      {/* Syncing indicator */}
      {status === "syncing" && (
        <div className="flex items-center gap-1.5 text-xs text-warning">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Syncing data...</span>
        </div>
      )}
    </motion.div>
  );
}
