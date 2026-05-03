import type { CopyType } from "@/data/notificationCopyLibrary";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RetentionNudgeBannerProps {
  type: CopyType;
  message: string;
  actionLabel?: string;
  onDismiss: () => void;
  onAction?: () => void;
}

// ─── Theme config per nudge type ─────────────────────────────────────────────

interface NudgeTheme {
  gradient: string;
  border: string;
  iconBg: string;
  iconColor: string;
  actionBg: string;
  actionText: string;
  icon: React.ReactNode;
}

function BellIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="8 21 12 17 16 21" />
      <path d="M4 3H20" />
      <path d="M18 3v5a6 6 0 0 1-12 0V3" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function RupeeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="6" y1="5" x2="18" y2="5" />
      <line x1="6" y1="10" x2="18" y2="10" />
      <path d="M6 15l6 5 6-5" />
      <path d="M6 5a4 4 0 0 1 4 4 4 4 0 0 1-4 4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function getTheme(type: CopyType): NudgeTheme {
  switch (type) {
    case "fomo":
      return {
        gradient:
          "linear-gradient(135deg, oklch(0.78 0.16 75 / 0.12), oklch(0.72 0.18 60 / 0.08))",
        border: "oklch(0.72 0.18 60 / 0.35)",
        iconBg: "oklch(0.72 0.18 60 / 0.18)",
        iconColor: "oklch(0.62 0.18 60)",
        actionBg: "oklch(0.68 0.18 60)",
        actionText: "oklch(0.98 0 0)",
        icon: <BellIcon />,
      };
    case "urgency":
      return {
        gradient:
          "linear-gradient(135deg, oklch(0.65 0.22 25 / 0.12), oklch(0.70 0.20 35 / 0.08))",
        border: "oklch(0.60 0.22 25 / 0.35)",
        iconBg: "oklch(0.60 0.22 25 / 0.18)",
        iconColor: "oklch(0.55 0.22 25)",
        actionBg: "oklch(0.55 0.22 25)",
        actionText: "oklch(0.98 0 0)",
        icon: <ZapIcon />,
      };
    case "reward":
      return {
        gradient:
          "linear-gradient(135deg, oklch(0.60 0.15 170 / 0.12), oklch(0.65 0.14 155 / 0.08))",
        border: "oklch(0.56 0.15 170 / 0.35)",
        iconBg: "oklch(0.56 0.15 170 / 0.18)",
        iconColor: "oklch(0.50 0.15 170)",
        actionBg: "oklch(0.56 0.15 170)",
        actionText: "oklch(0.98 0 0)",
        icon: <TrophyIcon />,
      };
    case "money":
      return {
        gradient:
          "linear-gradient(135deg, oklch(0.55 0.22 280 / 0.12), oklch(0.58 0.20 265 / 0.08))",
        border: "oklch(0.53 0.22 280 / 0.35)",
        iconBg: "oklch(0.53 0.22 280 / 0.18)",
        iconColor: "oklch(0.50 0.22 280)",
        actionBg: "oklch(0.53 0.22 280)",
        actionText: "oklch(0.98 0 0)",
        icon: <RupeeIcon />,
      };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

const AUTO_DISMISS_MS = 8000;

export function RetentionNudgeBanner({
  type,
  message,
  actionLabel,
  onDismiss,
  onAction,
}: RetentionNudgeBannerProps) {
  const theme = getTheme(type);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interactedRef = useRef(false);

  // Auto-dismiss after 8s if no interaction
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!interactedRef.current) onDismiss();
    }, AUTO_DISMISS_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onDismiss]);

  function handleAction() {
    interactedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    onAction?.();
    onDismiss();
  }

  function handleDismiss() {
    interactedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    onDismiss();
  }

  return (
    <motion.div
      data-ocid={`retention_nudge.${type}_banner`}
      role="alert"
      aria-live="polite"
      initial={{ opacity: 0, y: -12, scaleX: 0.97 }}
      animate={{ opacity: 1, y: 0, scaleX: 1 }}
      exit={{ opacity: 0, y: -8, scaleX: 0.97 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="mx-4 mb-3 rounded-2xl overflow-hidden"
      style={{
        background: theme.gradient,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Auto-dismiss progress bar */}
      <motion.div
        className="h-[2px] w-full origin-left"
        style={{ background: theme.actionBg }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-3 px-4 py-3">
        {/* Icon */}
        <div
          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: theme.iconBg, color: theme.iconColor }}
          aria-hidden="true"
        >
          {theme.icon}
        </div>

        {/* Message */}
        <p
          className="flex-1 min-w-0 text-[13px] font-semibold leading-snug text-foreground"
          style={{ color: "oklch(var(--foreground))" }}
        >
          {message}
        </p>

        {/* Action button */}
        {actionLabel && onAction && (
          <button
            type="button"
            data-ocid={`retention_nudge.${type}_action_button`}
            onClick={handleAction}
            className="shrink-0 text-[12px] font-bold px-3 py-1.5 rounded-lg transition-all duration-150 active:scale-95"
            style={{ background: theme.actionBg, color: theme.actionText }}
          >
            {actionLabel}
          </button>
        )}

        {/* Dismiss */}
        <button
          type="button"
          data-ocid={`retention_nudge.${type}_close_button`}
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="shrink-0 p-1 rounded-lg text-muted-foreground transition-colors duration-150 hover:text-foreground active:scale-95"
        >
          <CloseIcon />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Animated wrapper for mount/unmount ──────────────────────────────────────

export function RetentionNudgeBannerContainer({
  nudge,
  onDismiss,
  onAction,
}: {
  nudge: {
    type: CopyType;
    message: string;
    actionLabel?: string;
  } | null;
  onDismiss: () => void;
  onAction?: () => void;
}) {
  return (
    <AnimatePresence>
      {nudge && (
        <RetentionNudgeBanner
          key={`${nudge.type}-${nudge.message}`}
          type={nudge.type}
          message={nudge.message}
          actionLabel={nudge.actionLabel}
          onDismiss={onDismiss}
          onAction={onAction}
        />
      )}
    </AnimatePresence>
  );
}
