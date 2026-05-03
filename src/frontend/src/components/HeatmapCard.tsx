import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface HeatmapItem {
  label: string;
  count: number;
  percentage: number;
  color?: string;
  screen?: string;
  fix?: string;
}

interface HeatmapCardProps {
  title: string;
  items: HeatmapItem[];
  showScreen?: boolean;
  showFix?: boolean;
  ocid?: string;
}

export function HeatmapCard({
  title,
  items,
  showScreen,
  showFix,
  ocid,
}: HeatmapCardProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const maxCount = Math.max(...items.map((i) => i.count), 1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-card border border-border/40 rounded-xl p-4 shadow-card"
      data-ocid={ocid ?? "heatmap.card"}
    >
      <h3 className="font-display text-sm font-semibold text-foreground mb-3">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, i) => {
          const barWidth = animated ? (item.count / maxCount) * 100 : 0;
          const color = item.color ?? "oklch(var(--primary))";

          return (
            <div
              key={item.label}
              className="space-y-1"
              data-ocid={`${ocid ?? "heatmap"}.item.${i + 1}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-foreground text-truncate-1 flex-1 min-w-0">
                  {item.label}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  {showScreen && item.screen && (
                    <span className="text-[10px] text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded-full">
                      {item.screen}
                    </span>
                  )}
                  <span className="text-xs font-bold text-foreground tabular-nums">
                    {item.count.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[11px] text-muted-foreground w-10 text-right tabular-nums">
                    {item.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
              {/* Bar */}
              <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </div>
              {showFix && item.fix && (
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  💡 {item.fix}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
