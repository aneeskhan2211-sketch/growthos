import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export interface FunnelStepData {
  name: string;
  count: number;
  conversionRate: number;
  dropOffRate: number;
  avgMinToNext?: number; // average minutes to reach next step
}

interface FunnelChartProps {
  steps: FunnelStepData[];
}

function getBarColor(index: number, total: number): string {
  // Gradient from primary (violet) → success (green) across steps
  const t = index / Math.max(total - 1, 1);
  const hue = 253 + (170 - 253) * t; // 253=violet, 170=green
  const chroma = 0.25 - 0.05 * t;
  const lightness = 0.6 + 0.06 * t;
  return `oklch(${lightness.toFixed(2)} ${chroma.toFixed(2)} ${hue.toFixed(0)})`;
}

export function FunnelChart({ steps }: FunnelChartProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const maxCount = Math.max(...steps.map((s) => s.count), 1);

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
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2" data-ocid="funnel.chart">
      {steps.map((step, i) => {
        const widthPct = animated ? (step.count / maxCount) * 100 : 0;
        const barColor = getBarColor(i, steps.length);

        return (
          <div
            key={step.name}
            className="funnel-step group relative"
            data-ocid={`funnel.step.${i + 1}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="funnel-label text-foreground text-truncate-1 w-36 shrink-0">
                {i + 1}. {step.name}
              </span>
              <div
                className="funnel-bar flex-1 relative"
                style={{ height: 32 }}
              >
                {/* Track */}
                <div className="absolute inset-0 rounded-lg bg-muted/30" />
                {/* Fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-lg flex items-center overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.07,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    background: barColor,
                    minWidth: widthPct > 0 ? 48 : 0,
                  }}
                >
                  {widthPct > 18 && (
                    <span className="funnel-percentage ml-auto mr-2 text-[11px] font-bold text-white/90 whitespace-nowrap">
                      {step.count.toLocaleString("en-IN")}
                    </span>
                  )}
                </motion.div>

                {/* Tooltip on hover */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-popover border border-border rounded-lg px-2.5 py-1.5 shadow-elevated text-xs whitespace-nowrap z-10">
                    <p className="font-semibold text-foreground">{step.name}</p>
                    <p className="text-muted-foreground">
                      {step.count.toLocaleString("en-IN")} users
                    </p>
                    <p className="text-muted-foreground">
                      Conv: {(step.conversionRate * 100).toFixed(1)}%
                    </p>
                    {step.avgMinToNext !== undefined && (
                      <p className="text-muted-foreground">
                        Avg {step.avgMinToNext} min to next step
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <span
                className="funnel-dropoff w-16 shrink-0 text-right"
                style={{ color: "oklch(var(--destructive))" }}
              >
                -{(step.dropOffRate * 100).toFixed(0)}%
              </span>
            </div>

            {/* Drop-off badge connector */}
            {i < steps.length - 1 && (
              <div className="flex items-center pl-36 mb-1">
                <div className="flex items-center gap-1.5 ml-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    style={{ color: "oklch(var(--destructive))" }}
                  >
                    <path
                      d="M6 2v8M3 7l3 3 3-3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "oklch(var(--destructive) / 0.12)",
                      color: "oklch(var(--destructive))",
                    }}
                  >
                    -{(step.dropOffRate * 100).toFixed(0)}% Drop-off
                  </span>
                  {step.avgMinToNext !== undefined && (
                    <span className="text-[10px] text-muted-foreground font-medium ml-1">
                      · Avg {step.avgMinToNext} min
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
