/**
 * OnboardingTour.tsx
 * 6-step guided overlay tour for first-time GrowthOS users.
 * Shown once; never again after completion or skip.
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useOnboardingTour } from "../hooks/useOnboardingTour";

// ─── Tour step definitions ─────────────────────────────────────────────────

interface TourStep {
  id: string;
  title: string;
  copy: string;
  targetSelector: string | null;
  position: "center" | "bottom" | "top";
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to GrowthOS 🎉",
    copy: "This is your control center. Everything you need to grow your business is here.",
    targetSelector: "[data-ocid='dashboard.greeting_section']",
    position: "bottom",
  },
  {
    id: "kpi-cards",
    title: "Your KPIs",
    copy: "These 4 numbers tell you how your business is doing today.",
    targetSelector: "[data-tour='kpi-cards']",
    position: "bottom",
  },
  {
    id: "fab-button",
    title: "Get Clients Now",
    copy: "Tap this button anytime to start the 'Get Clients' workflow — it takes under 2 minutes.",
    targetSelector: "[data-tour='fab-button']",
    position: "top",
  },
  {
    id: "lead-list",
    title: "Your Leads",
    copy: "These are your potential clients. The ones marked 'hot' are most likely to respond today.",
    targetSelector: "[data-tour='lead-list']",
    position: "bottom",
  },
  {
    id: "inbox",
    title: "Inbox",
    copy: "All your replies and conversations are here. Fast responses convert better.",
    targetSelector: "[data-ocid='nav.inbox']",
    position: "bottom",
  },
  {
    id: "ready",
    title: "Ready to grow? 🚀",
    copy: "You're set up. Start by contacting 5 leads today. Most first bookings happen within 48 hours.",
    targetSelector: null,
    position: "center",
  },
];

const TOTAL_STEPS = TOUR_STEPS.length;

// ─── Spotlight rect ────────────────────────────────────────────────────────

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getElementRect(selector: string): SpotlightRect | null {
  const el = document.querySelector(selector);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    top: r.top + window.scrollY,
    left: r.left + window.scrollX,
    width: r.width,
    height: r.height,
  };
}

// ─── Tooltip card ─────────────────────────────────────────────────────────

interface TooltipProps {
  step: TourStep;
  stepIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
  isFirst: boolean;
  isLast: boolean;
  spotlightRect: SpotlightRect | null;
}

function TourTooltip({
  step,
  stepIndex,
  onPrev,
  onNext,
  onSkip,
  isFirst,
  isLast,
  spotlightRect,
}: TooltipProps) {
  const vpHeight = window.innerHeight;
  const vpWidth = window.innerWidth;
  const CARD_WIDTH = Math.min(320, vpWidth - 32);
  const CARD_MARGIN = 12;
  const ARROW_OFFSET = 24;

  let style: React.CSSProperties = {};
  let arrowClass = "";

  if (step.targetSelector === null || !spotlightRect) {
    // centered
    style = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: CARD_WIDTH,
      zIndex: 9999,
    };
  } else {
    const rect = spotlightRect;
    const absTop = rect.top - window.scrollY;
    const absLeft = rect.left - window.scrollX;
    const centerX = absLeft + rect.width / 2;
    let left = Math.max(
      16,
      Math.min(centerX - CARD_WIDTH / 2, vpWidth - CARD_WIDTH - 16),
    );

    if (step.position === "bottom") {
      style = {
        position: "fixed",
        top: absTop + rect.height + CARD_MARGIN,
        left,
        width: CARD_WIDTH,
        zIndex: 9999,
      };
      arrowClass = "top";
    } else {
      const cardHeight = 200; // approx
      style = {
        position: "fixed",
        top: absTop - cardHeight - CARD_MARGIN,
        left,
        width: CARD_WIDTH,
        zIndex: 9999,
      };
      arrowClass = "bottom";
    }

    // Clamp vertically
    if (typeof style.top === "number") {
      style.top = Math.max(16, Math.min(style.top as number, vpHeight - 220));
    }

    void ARROW_OFFSET; // suppress unused warning
  }

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={style}
      className="rounded-2xl bg-card border border-border/50 shadow-premium p-4"
      aria-modal="true"
      aria-label={`Onboarding step ${stepIndex + 1} of ${TOTAL_STEPS}: ${step.title}`}
      data-ocid="onboarding.tooltip"
    >
      {/* Skip button */}
      <button
        type="button"
        data-ocid="onboarding.skip_button"
        onClick={onSkip}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors duration-150 p-1 rounded-lg hover:bg-muted/50"
        aria-label="Skip tour"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 1L13 13M13 1L1 13" />
        </svg>
      </button>

      {/* Step dots */}
      <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length step indicators, stable order
            key={`dot-${i}`}
            className={`rounded-full transition-all duration-300 ${
              i === stepIndex
                ? "w-4 h-2 bg-primary"
                : i < stepIndex
                  ? "w-2 h-2 bg-primary/40"
                  : "w-2 h-2 bg-muted/60"
            }`}
          />
        ))}
        <span className="ml-auto text-[11px] font-semibold text-muted-foreground">
          {stepIndex + 1} of {TOTAL_STEPS}
        </span>
      </div>

      {/* Arrow indicator for positioned tooltip */}
      {arrowClass === "top" && (
        <div
          className="absolute -top-2 left-6 w-4 h-2 overflow-hidden"
          aria-hidden="true"
        >
          <div className="w-3 h-3 bg-card border-l border-t border-border/50 rotate-45 translate-y-1.5 translate-x-0.5" />
        </div>
      )}
      {arrowClass === "bottom" && (
        <div
          className="absolute -bottom-2 left-6 w-4 h-2 overflow-hidden"
          aria-hidden="true"
        >
          <div className="w-3 h-3 bg-card border-r border-b border-border/50 rotate-45 -translate-y-1.5 translate-x-0.5" />
        </div>
      )}

      {/* Content */}
      <h3 className="text-[15px] font-bold text-foreground font-display leading-snug mb-1 pr-6">
        {step.title}
      </h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
        {step.copy}
      </p>

      {/* Action row */}
      {isLast ? (
        <div className="flex gap-2">
          <button
            type="button"
            data-ocid="onboarding.start_now_button"
            onClick={onNext}
            className="flex-1 h-10 rounded-xl text-[13px] font-bold text-primary-foreground"
            style={{ background: "oklch(var(--primary))" }}
          >
            Start now
          </button>
          <button
            type="button"
            data-ocid="onboarding.explore_button"
            onClick={onNext}
            className="flex-1 h-10 rounded-xl text-[13px] font-semibold text-foreground bg-muted/60 border border-border/50"
          >
            Explore first
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          {!isFirst && (
            <button
              type="button"
              data-ocid="onboarding.prev_button"
              onClick={onPrev}
              className="h-10 px-4 rounded-xl text-[13px] font-semibold text-muted-foreground bg-muted/40 border border-border/40"
            >
              Back
            </button>
          )}
          <button
            type="button"
            data-ocid="onboarding.next_button"
            onClick={onNext}
            className="flex-1 h-10 rounded-xl text-[13px] font-bold text-primary-foreground flex items-center justify-center gap-1.5"
            style={{ background: "oklch(var(--primary))" }}
          >
            Next
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="4 2 8 6 4 10" />
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export function OnboardingTour() {
  const { state, shouldShowTour, updateStep, completeTour, skipTour } =
    useOnboardingTour();

  const [stepIndex, setStepIndex] = useState(() =>
    Math.min(state.currentStep, TOTAL_STEPS - 1),
  );
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(
    null,
  );
  const [highlightVisible, setHighlightVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const currentStep = TOUR_STEPS[stepIndex];

  // Update spotlight rect on step change and on resize
  useEffect(() => {
    if (!shouldShowTour) return;

    function updateRect() {
      if (!currentStep.targetSelector) {
        setSpotlightRect(null);
        setHighlightVisible(false);
        return;
      }
      const rect = getElementRect(currentStep.targetSelector);
      setSpotlightRect(rect);
      setHighlightVisible(!!rect);
    }

    // slight delay so DOM is painted
    const t = setTimeout(updateRect, 80);
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [shouldShowTour, currentStep.targetSelector]);

  // Scroll element into view
  useEffect(() => {
    if (!shouldShowTour || !currentStep.targetSelector) return;
    const el = document.querySelector(currentStep.targetSelector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [shouldShowTour, currentStep.targetSelector]);

  // Trap focus inside tooltip
  useEffect(() => {
    if (!shouldShowTour) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowTour]);

  // Cleanup raf on unmount
  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  if (!shouldShowTour) return null;

  function handleNext() {
    const next = stepIndex + 1;
    if (next >= TOTAL_STEPS) {
      completeTour();
      return;
    }
    updateStep(next);
    setStepIndex(next);
  }

  function handlePrev() {
    if (stepIndex === 0) return;
    const prev = stepIndex - 1;
    setStepIndex(prev);
    updateStep(prev);
  }

  function handleSkip() {
    skipTour();
  }

  const PAD = 8;
  const sr = spotlightRect;

  return (
    <>
      {/* ── Backdrop ── */}
      <motion.div
        data-ocid="onboarding.backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9990] pointer-events-auto"
        style={{ background: "rgba(0,0,0,0.60)" }}
        onClick={handleSkip}
        aria-hidden="true"
      />

      {/* ── Spotlight cutout (SVG overlay) ── */}
      {highlightVisible && sr && (
        <motion.div
          key={`spot-${stepIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9991] pointer-events-none"
          aria-hidden="true"
        >
          <svg
            width="100%"
            height="100%"
            aria-hidden="true"
            style={{ position: "fixed", inset: 0, overflow: "visible" }}
          >
            <defs>
              <mask id="tour-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect
                  x={sr.left - window.scrollX - PAD}
                  y={sr.top - window.scrollY - PAD}
                  width={sr.width + PAD * 2}
                  height={sr.height + PAD * 2}
                  rx="12"
                  ry="12"
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="transparent"
              mask="url(#tour-mask)"
            />
          </svg>
          {/* Glow border around spotlight */}
          <div
            className="absolute rounded-[12px] pointer-events-none"
            style={{
              top: sr.top - window.scrollY - PAD,
              left: sr.left - window.scrollX - PAD,
              width: sr.width + PAD * 2,
              height: sr.height + PAD * 2,
              border: "2px solid oklch(var(--primary))",
              boxShadow:
                "0 0 0 4px oklch(var(--primary) / 0.2), 0 0 20px oklch(var(--primary) / 0.3)",
            }}
          />
        </motion.div>
      )}

      {/* ── Tooltip card ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            <TourTooltip
              key={stepIndex}
              step={currentStep}
              stepIndex={stepIndex}
              onPrev={handlePrev}
              onNext={handleNext}
              onSkip={handleSkip}
              isFirst={stepIndex === 0}
              isLast={stepIndex === TOTAL_STEPS - 1}
              spotlightRect={spotlightRect}
            />
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
