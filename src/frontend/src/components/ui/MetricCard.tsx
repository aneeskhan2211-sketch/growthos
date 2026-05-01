import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import type { SparklinePoint } from "../../types";

// ─── Mini sparkline SVG ───────────────────────────────────────────────────────

function Sparkline({
  data,
  trend,
}: { data: SparklinePoint[]; trend: "up" | "down" | "neutral" }) {
  if (!data || data.length < 2) return null;
  const W = 64;
  const H = 24;
  const min = Math.min(...data.map((d) => d.value));
  const max = Math.max(...data.map((d) => d.value));
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((d.value - min) / range) * (H - 4) - 2;
    return `${x},${y}`;
  });
  const color =
    trend === "up"
      ? "oklch(var(--success))"
      : trend === "down"
        ? "oklch(var(--destructive))"
        : "oklch(var(--muted-foreground))";

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      className="sparkline-container shrink-0"
      aria-hidden="true"
    >
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
  sparkline?: SparklinePoint[];
  statusLabel?: string;
  icon?: ReactNode;
  gradient?: string;
  className?: string;
  "data-ocid"?: string;
}

export function MetricCard({
  label,
  value,
  change,
  changeLabel,
  trend = "neutral",
  sparkline,
  statusLabel,
  icon,
  gradient,
  className,
  "data-ocid": ocid,
}: MetricCardProps) {
  const trendColor =
    trend === "up"
      ? "text-success"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <div
      data-ocid={ocid}
      className={cn(
        "group relative bg-card border border-border rounded-xl p-4 transition-smooth hover:shadow-card-hover hover:-translate-y-0.5 overflow-hidden",
        className,
      )}
    >
      {/* Background gradient tint */}
      {gradient && (
        <div
          className={cn("absolute inset-0 rounded-xl opacity-60", gradient)}
          aria-hidden="true"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        {/* Left: label + value + trend */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 truncate">
            {label}
          </p>
          <p className="text-2xl font-bold text-foreground tabular-nums leading-none mb-2 truncate">
            {value}
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {change !== undefined && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-semibold",
                  trendColor,
                )}
              >
                {trend === "up" && <TrendingUp className="w-3 h-3" />}
                {trend === "down" && <TrendingDown className="w-3 h-3" />}
                {change > 0 ? "+" : ""}
                {change}%
              </span>
            )}
            {changeLabel && (
              <span className="text-xs text-muted-foreground">
                {changeLabel}
              </span>
            )}
          </div>

          {statusLabel && (
            <span className="mt-2 inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">
              {statusLabel}
            </span>
          )}
        </div>

        {/* Right: icon + sparkline */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          {sparkline && <Sparkline data={sparkline} trend={trend} />}
        </div>
      </div>
    </div>
  );
}
