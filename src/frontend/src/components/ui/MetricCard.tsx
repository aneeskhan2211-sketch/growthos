import { cn } from "@/lib/utils";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

// ─── Animated Counter ─────────────────────────────────────────────────────────

function useAnimatedNumber(
  target: number,
  duration = 1200,
  enabled = true,
): number {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || typeof target !== "number") return;
    startTimeRef.current = null;

    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(target * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, enabled]);

  return current;
}

// ─── Sparkline Area Chart ─────────────────────────────────────────────────────

function SparklineChart({
  data,
  changeType,
}: {
  data: number[];
  changeType: "up" | "down" | "neutral";
}) {
  const chartData = data.map((v, i) => ({ i, v }));
  const color =
    changeType === "up"
      ? "oklch(var(--success))"
      : changeType === "down"
        ? "oklch(var(--destructive))"
        : "oklch(var(--muted-foreground))";

  return (
    <div style={{ width: 150, height: 50 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
        >
          <defs>
            <linearGradient
              id={`spark-${changeType}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip content={() => null} cursor={false} />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.8}
            fill={`url(#spark-${changeType})`}
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function MetricCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="skeleton-shimmer h-3 w-24 rounded" />
          <div className="skeleton-shimmer h-7 w-32 rounded" />
          <div className="skeleton-shimmer h-4 w-16 rounded" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="skeleton-shimmer w-9 h-9 rounded-lg" />
          <div className="skeleton-shimmer w-[150px] h-[50px] rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

export interface MetricCardProps {
  title?: string;
  value: number | string;
  change: number;
  changeType?: "up" | "down" | "neutral";
  icon?: ReactNode;
  trendData?: number[];
  prefix?: string;
  suffix?: string;
  isLoading?: boolean;
  className?: string;
  /** @deprecated use title instead */
  label?: string;
  /** @deprecated use changeType instead */
  trend?: "up" | "down" | "neutral";
  /** @deprecated use trendData instead */
  sparkline?: { value: number }[];
  /** @deprecated */
  changeLabel?: string;
  /** @deprecated */
  statusLabel?: string;
  /** @deprecated */
  gradient?: string;
  "data-ocid"?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon,
  trendData,
  prefix = "",
  suffix = "",
  isLoading = false,
  className,
  // legacy compat
  label,
  trend,
  sparkline,
  "data-ocid": ocid,
}: MetricCardProps) {
  // Resolve legacy props
  const resolvedTitle = title ?? label ?? "";
  const resolvedChangeType = changeType ?? trend ?? "neutral";
  const resolvedTrendData = trendData ?? sparkline?.map((s) => s.value) ?? [];

  const numericValue = typeof value === "number" ? value : Number(value) || 0;
  const animated = useAnimatedNumber(numericValue, 1200, !isLoading);
  const displayValue =
    typeof value === "string" && Number.isNaN(Number(value))
      ? value
      : `${prefix}${animated.toLocaleString("en-IN")}${suffix}`;

  if (isLoading) return <MetricCardSkeleton />;

  const changeColor =
    resolvedChangeType === "up"
      ? "text-success bg-success/10"
      : resolvedChangeType === "down"
        ? "text-destructive bg-destructive/10"
        : "text-muted-foreground bg-muted/40";

  return (
    <div
      data-ocid={ocid}
      className={cn(
        "group relative bg-card border border-border rounded-xl p-4",
        "transition-hover hover:-translate-y-[2px] hover:shadow-elevated cursor-default",
        "overflow-hidden",
        className,
      )}
    >
      {/* Subtle tinted bg */}
      <div
        className="absolute inset-0 rounded-xl opacity-60 pointer-events-none kpi-background"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 truncate">
            {resolvedTitle}
          </p>
          <p className="text-2xl font-bold font-display text-foreground tabular-nums leading-none mb-3 truncate">
            {displayValue}
          </p>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
              changeColor,
            )}
          >
            {resolvedChangeType === "up" && <TrendingUp className="w-3 h-3" />}
            {resolvedChangeType === "down" && (
              <TrendingDown className="w-3 h-3" />
            )}
            {resolvedChangeType === "neutral" && <Minus className="w-3 h-3" />}
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        </div>

        {/* Right: icon + sparkline */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          )}
          {resolvedTrendData.length >= 2 && (
            <SparklineChart
              data={resolvedTrendData}
              changeType={resolvedChangeType}
            />
          )}
        </div>
      </div>
    </div>
  );
}
