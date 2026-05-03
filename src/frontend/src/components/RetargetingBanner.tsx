import { useAnalytics } from "@/hooks/useAnalytics";
import useConversionEngine from "@/hooks/useConversionEngine";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const DAY_CONFIG = {
  1: {
    bg: "bg-amber-50 border-amber-300 dark:bg-amber-500/10 dark:border-amber-500/30",
    text: "text-amber-800 dark:text-amber-300",
    btnClass: "text-amber-700 hover:text-amber-900 dark:text-amber-400",
    ctaLabel: "View Leads →",
    ctaTo: "/leads",
  },
  2: {
    bg: "bg-orange-50 border-orange-300 dark:bg-orange-500/10 dark:border-orange-500/30",
    text: "text-orange-800 dark:text-orange-300",
    btnClass: "text-orange-700 hover:text-orange-900 dark:text-orange-400",
    ctaLabel: "Follow Up Now →",
    ctaTo: "/outreach",
  },
  3: {
    bg: "bg-red-50 border-red-300 dark:bg-red-500/10 dark:border-red-500/30",
    text: "text-red-800 dark:text-red-300",
    btnClass: "text-red-700 hover:text-red-900 dark:text-red-400",
    ctaLabel: "See Plans →",
    ctaTo: "/pricing",
  },
} as const;

export function RetargetingBanner() {
  const { getRetargetBanner, setActivity } = useConversionEngine();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  const banner = getRetargetBanner();

  useEffect(() => {
    setActivity();
  }, [setActivity]);

  useEffect(() => {
    if (banner && !dismissed) {
      trackEvent("retarget_banner_shown", { day: String(banner.day) });
    }
  }, [banner, dismissed, trackEvent]);

  if (!banner || dismissed) return null;

  const config = DAY_CONFIG[banner.day];

  const handleCta = () => {
    navigate({ to: config.ctaTo as "/" });
  };

  return (
    <AnimatePresence>
      <motion.div
        data-ocid="retarget_banner.section"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border mb-4 ${config.bg}`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`shrink-0 ${config.text}`}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p
            className={`flex-1 min-w-0 text-[12px] font-medium leading-snug ${config.text}`}
          >
            {banner.message}
          </p>
          <button
            type="button"
            data-ocid="retarget_banner.link"
            onClick={handleCta}
            className={`shrink-0 text-[11px] font-bold whitespace-nowrap transition-colors duration-150 ${config.btnClass}`}
          >
            {config.ctaLabel}
          </button>
          <button
            type="button"
            data-ocid="retarget_banner.close_button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className={`shrink-0 ${config.text} opacity-50 hover:opacity-80 transition-opacity duration-150`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M1 1 L11 11 M11 1 L1 11" />
            </svg>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
