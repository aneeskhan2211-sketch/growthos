import { selectHotLeads, useGrowthStore } from "@/store/useGrowthStore";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

interface StreakBannerProps {
  streak: number;
  credits: number;
  todayDone: boolean;
}

function FireIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2Z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const MILESTONE_DAYS = [3, 7, 14, 30, 60, 100];

export function StreakBanner({
  streak,
  credits,
  todayDone,
}: StreakBannerProps) {
  const hotLeads = useGrowthStore(useShallow(selectHotLeads));
  const hasNewLeads = hotLeads.length > 0;
  const [showMilestone, setShowMilestone] = useState(false);
  const isMilestone = MILESTONE_DAYS.includes(streak);

  useEffect(() => {
    if (isMilestone && streak > 0) {
      setShowMilestone(true);
      const t = setTimeout(() => setShowMilestone(false), 3000);
      return () => clearTimeout(t);
    }
  }, [streak, isMilestone]);

  return (
    <motion.div
      data-ocid="streak.banner"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl bg-card border border-border/40 px-4 py-3 relative overflow-hidden"
    >
      {/* Subtle gold glow layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 10% 50%, oklch(0.78 0.18 60 / 0.5), transparent 55%)",
        }}
      />

      <div className="relative flex items-center gap-3">
        {/* Streak Badge */}
        <motion.div
          data-ocid="streak.badge"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.78 0.18 60), oklch(0.70 0.20 45))",
          }}
          animate={{
            boxShadow: [
              "0 0 6px oklch(0.78 0.18 60 / 0.4)",
              "0 0 14px oklch(0.78 0.18 60 / 0.65)",
              "0 0 6px oklch(0.78 0.18 60 / 0.4)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <span className="text-white">
            <FireIcon />
          </span>
          <span className="text-[13px] font-bold text-white tabular-nums leading-none">
            {streak}d
          </span>
        </motion.div>

        {/* Middle info */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {showMilestone ? (
              <motion.p
                key="milestone"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-[12px] font-bold text-foreground"
                style={{ color: "oklch(0.78 0.18 60)" }}
              >
                🎉 {streak}-day milestone unlocked!
              </motion.p>
            ) : todayDone ? (
              <motion.p
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] font-medium text-foreground"
              >
                ✅ Streak kept! Come back tomorrow.
              </motion.p>
            ) : (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] font-medium text-muted-foreground"
              >
                Contact a lead to keep your streak!
              </motion.p>
            )}
          </AnimatePresence>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5">
            {streak} day streak
          </p>
        </div>

        {/* Credits */}
        <div
          data-ocid="streak.credits"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0"
        >
          <span className="text-primary">
            <BoltIcon />
          </span>
          <span className="text-[12px] font-bold text-primary tabular-nums">
            {credits}
          </span>
        </div>
      </div>

      {/* New leads badge */}
      <AnimatePresence>
        {hasNewLeads && (
          <motion.div
            data-ocid="streak.new_leads_badge"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2.5 pt-2.5 border-t border-border/30"
          >
            <p className="text-[11px] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse inline-block" />
              <span className="text-success">
                {hotLeads.length} new hot leads ready
              </span>
              <span className="text-muted-foreground">— tap Leads to view</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
