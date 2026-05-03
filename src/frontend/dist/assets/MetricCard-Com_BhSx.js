import { j as jsxRuntimeExports, T as TrendingUp, ba as TrendingDown, f as cn, r as reactExports, R as ResponsiveContainer, N as Tooltip } from "./index-DcPx_5wo.js";
import { M as Minus } from "./minus-BGo421Cc.js";
import { A as AreaChart, a as Area } from "./AreaChart-S7CCCoYI.js";
function useAnimatedNumber(target, duration = 1200, enabled = true) {
  const [current, setCurrent] = reactExports.useState(0);
  const rafRef = reactExports.useRef(null);
  const startTimeRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!enabled || typeof target !== "number") return;
    startTimeRef.current = null;
    const animate = (now) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
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
function SparklineChart({
  data,
  changeType
}) {
  const chartData = data.map((v, i) => ({ i, v }));
  const color = changeType === "up" ? "oklch(var(--success))" : changeType === "down" ? "oklch(var(--destructive))" : "oklch(var(--muted-foreground))";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 150, height: 50 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AreaChart,
    {
      data: chartData,
      margin: { top: 2, right: 2, bottom: 2, left: 2 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "linearGradient",
          {
            id: `spark-${changeType}`,
            x1: "0",
            y1: "0",
            x2: "0",
            y2: "1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: color, stopOpacity: 0.3 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: color, stopOpacity: 0 })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: () => null, cursor: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Area,
          {
            type: "monotone",
            dataKey: "v",
            stroke: color,
            strokeWidth: 1.8,
            fill: `url(#spark-${changeType})`,
            dot: false,
            activeDot: false
          }
        )
      ]
    }
  ) }) });
}
function MetricCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-shimmer h-3 w-24 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-shimmer h-7 w-32 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-shimmer h-4 w-16 rounded" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-shimmer w-9 h-9 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton-shimmer w-[150px] h-[50px] rounded" })
    ] })
  ] }) });
}
function MetricCard({
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
  "data-ocid": ocid
}) {
  const resolvedTitle = title ?? label ?? "";
  const resolvedChangeType = changeType ?? trend ?? "neutral";
  const resolvedTrendData = trendData ?? (sparkline == null ? void 0 : sparkline.map((s) => s.value)) ?? [];
  const numericValue = typeof value === "number" ? value : Number(value) || 0;
  const animated = useAnimatedNumber(numericValue, 1200, !isLoading);
  const displayValue = typeof value === "string" && Number.isNaN(Number(value)) ? value : `${prefix}${animated.toLocaleString("en-IN")}${suffix}`;
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCardSkeleton, {});
  const changeColor = resolvedChangeType === "up" ? "text-success bg-success/10" : resolvedChangeType === "down" ? "text-destructive bg-destructive/10" : "text-muted-foreground bg-muted/40";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: cn(
        "group relative bg-card border border-border rounded-xl p-4",
        "transition-hover hover:-translate-y-[2px] hover:shadow-elevated cursor-default",
        "overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-xl opacity-60 pointer-events-none kpi-background",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 truncate", children: resolvedTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground tabular-nums leading-none mb-3 truncate", children: displayValue }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
                  changeColor
                ),
                children: [
                  resolvedChangeType === "up" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
                  resolvedChangeType === "down" && /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3 h-3" }),
                  resolvedChangeType === "neutral" && /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" }),
                  change > 0 ? "+" : "",
                  change,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
            icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary", children: icon }),
            resolvedTrendData.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              SparklineChart,
              {
                data: resolvedTrendData,
                changeType: resolvedChangeType
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  MetricCard as M
};
