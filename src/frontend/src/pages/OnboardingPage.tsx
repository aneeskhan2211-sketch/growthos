import { useNavigate } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnalytics, useScreenTracking } from "../hooks/useAnalytics";
import {
  useCompleteOnboarding,
  useSaveOnboardingPrefs,
} from "../hooks/usePremium";

// ─── Types ──────────────────────────────────────────────────────────────────
interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  state: OnboardingState;
  setState: React.Dispatch<React.SetStateAction<OnboardingState>>;
}

interface OnboardingState {
  businessType: string;
  consentChecked: boolean;
  niche: string;
  city: string;
  goal: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const NICHES = [
  { value: "salon", label: "Salon", emoji: "💇" },
  { value: "gym", label: "Gym", emoji: "🏋️" },
  { value: "real-estate", label: "Real Estate", emoji: "🏠" },
  { value: "restaurant", label: "Restaurant", emoji: "🍽️" },
  { value: "clinic", label: "Clinic", emoji: "🏥" },
  { value: "coaching", label: "Coaching", emoji: "📚" },
  { value: "local-store", label: "Local Store", emoji: "🛒" },
];

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
];

const GOALS = [
  {
    value: "get-leads",
    label: "Get leads",
    emoji: "🎯",
    desc: "Find businesses that need your services",
  },
  {
    value: "run-ads",
    label: "Run ads",
    emoji: "📢",
    desc: "Launch targeted ad campaigns",
  },
  {
    value: "improve-seo",
    label: "Improve SEO",
    emoji: "🔍",
    desc: "Rank higher on Google",
  },
  {
    value: "more-clients",
    label: "Get more clients",
    emoji: "🤝",
    desc: "Convert leads into paying clients",
  },
];

const MOCK_LEADS = [
  { businessName: "Sharma Salon & Spa", city: "Mumbai", score: 88 },
  { businessName: "FitLife Gym", city: "Delhi", score: 76 },
  { businessName: "Prime Properties", city: "Bangalore", score: 94 },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────
function ProgressDots({ current, total }: { current: number; total: number }) {
  const dots = Array.from({ length: total }, (_, i) => ({
    id: `dot-step-${total}-${i}`,
    index: i,
  }));
  return (
    <div
      className="flex gap-2 justify-center"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      tabIndex={0}
    >
      {dots.map(({ id, index: i }) => (
        <motion.div
          key={id}
          animate={{
            width: i === current ? 24 : 8,
            opacity: i <= current ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
          className="h-2 rounded-full"
          style={{
            background: i <= current ? "oklch(0.6 0.25 253)" : "oklch(0.4 0 0)",
          }}
        />
      ))}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const bg =
    score >= 85
      ? "oklch(0.56 0.15 170)"
      : score >= 70
        ? "oklch(0.68 0.18 86)"
        : "oklch(0.55 0.22 25)";
  return (
    <span
      className="text-xs font-bold px-2 py-0.5 rounded-full"
      style={{ background: bg, color: "oklch(0.98 0 0)" }}
    >
      {score}
    </span>
  );
}

function ContinueButton({
  disabled,
  onClick,
  label = "Continue",
  ocid,
}: {
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  ocid: string;
}) {
  return (
    <motion.button
      data-ocid={ocid}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="w-full h-14 rounded-2xl font-semibold text-base transition-opacity"
      style={{
        fontFamily: "var(--font-display)",
        background: disabled
          ? "oklch(0.3 0 0)"
          : "linear-gradient(135deg, oklch(0.6 0.25 253) 0%, oklch(0.5 0.28 270) 100%)",
        color: disabled ? "oklch(0.5 0 0)" : "oklch(0.98 0 0)",
        boxShadow: disabled ? "none" : "0 4px 20px oklch(0.6 0.25 253 / 0.35)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </motion.button>
  );
}

// ─── Step 1: Welcome ──────────────────────────────────────────────────────────
function Step1({ onNext, state, setState }: StepProps) {
  const { trackEvent } = useAnalytics();
  const handleContinue = () => {
    trackEvent("onboarding_started", { business: state.businessType });
    onNext();
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(0.97 0 0)",
          }}
        >
          What business do you want clients for?
        </h2>
        <p className="text-sm" style={{ color: "oklch(0.65 0 0)" }}>
          Tell us about your agency to personalise your experience.
        </p>
      </div>

      <input
        data-ocid="onboarding.business_type.input"
        type="text"
        placeholder="e.g. Digital Marketing Agency"
        value={state.businessType}
        onChange={(e) =>
          setState((s) => ({ ...s, businessType: e.target.value }))
        }
        className="w-full h-14 rounded-xl px-4 text-base outline-none border transition-colors"
        style={{
          background: "oklch(0.16 0 0)",
          border: state.businessType
            ? "1.5px solid oklch(0.6 0.25 253)"
            : "1.5px solid oklch(0.25 0 0)",
          color: "oklch(0.97 0 0)",
          fontFamily: "var(--font-body)",
        }}
      />

      <label
        className="flex items-start gap-3 cursor-pointer"
        data-ocid="onboarding.consent.checkbox"
      >
        <input
          type="checkbox"
          className="mt-0.5 w-5 h-5 flex-shrink-0 accent-primary cursor-pointer"
          checked={state.consentChecked}
          onChange={(e) =>
            setState((s) => ({ ...s, consentChecked: e.target.checked }))
          }
          aria-label="I agree to the terms of service and privacy policy"
        />
        <span
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.65 0 0)" }}
        >
          I agree to the{" "}
          <a
            href="/terms"
            className="underline"
            style={{ color: "oklch(0.7 0.15 253)" }}
          >
            terms of service
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className="underline"
            style={{ color: "oklch(0.7 0.15 253)" }}
          >
            privacy policy
          </a>
        </span>
      </label>

      <ContinueButton
        disabled={!state.businessType.trim() || !state.consentChecked}
        onClick={handleContinue}
        ocid="onboarding.step1.continue_button"
      />
    </div>
  );
}

// ─── Step 2: Niche ────────────────────────────────────────────────────────────
function Step2({ onNext, state, setState }: StepProps) {
  const { trackEvent } = useAnalytics();
  const handleContinue = () => {
    trackEvent("niche_selected", { niche: state.niche });
    onNext();
  };
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(0.97 0 0)",
          }}
        >
          Choose your business niche
        </h2>
        <p className="text-sm" style={{ color: "oklch(0.65 0 0)" }}>
          Select the niche you want to get clients for.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3" data-ocid="onboarding.niche.list">
        {NICHES.map((niche, i) => (
          <motion.button
            key={niche.value}
            data-ocid={`onboarding.niche.item.${i + 1}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setState((s) => ({ ...s, niche: niche.value }))}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors"
            style={{
              background:
                state.niche === niche.value
                  ? "oklch(0.6 0.25 253 / 0.12)"
                  : "oklch(0.16 0 0)",
              borderColor:
                state.niche === niche.value
                  ? "oklch(0.6 0.25 253)"
                  : "oklch(0.22 0 0)",
            }}
          >
            <span className="text-2xl" aria-hidden="true">
              {niche.emoji}
            </span>
            <span
              className="text-sm font-semibold"
              style={{
                color:
                  state.niche === niche.value
                    ? "oklch(0.7 0.2 253)"
                    : "oklch(0.85 0 0)",
                fontFamily: "var(--font-body)",
              }}
            >
              {niche.label}
            </span>
          </motion.button>
        ))}
      </div>

      <ContinueButton
        disabled={!state.niche}
        onClick={handleContinue}
        ocid="onboarding.step2.continue_button"
      />
    </div>
  );
}

// ─── Step 3: City ─────────────────────────────────────────────────────────────
function Step3({ onNext, state, setState }: StepProps) {
  const { trackEvent } = useAnalytics();
  const [search, setSearch] = useState("");
  const filtered = CITIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase()),
  );
  const handleContinue = () => {
    trackEvent("city_selected", { city: state.city });
    onNext();
  };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(0.97 0 0)",
          }}
        >
          Which city are you targeting?
        </h2>
        <p className="text-sm" style={{ color: "oklch(0.65 0 0)" }}>
          We'll find local leads in this city for you.
        </p>
      </div>

      <input
        data-ocid="onboarding.city.search_input"
        type="text"
        placeholder="Search cities…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-12 rounded-xl px-4 text-base outline-none border"
        style={{
          background: "oklch(0.16 0 0)",
          border: "1.5px solid oklch(0.25 0 0)",
          color: "oklch(0.97 0 0)",
          fontFamily: "var(--font-body)",
        }}
      />

      <div
        className="overflow-y-auto rounded-2xl border"
        style={{
          maxHeight: "240px",
          borderColor: "oklch(0.22 0 0)",
          background: "oklch(0.13 0 0)",
        }}
        data-ocid="onboarding.city.list"
      >
        {filtered.map((city, i) => (
          <motion.button
            key={city}
            data-ocid={`onboarding.city.item.${i + 1}`}
            whileTap={{ scale: 0.98 }}
            onClick={() => setState((s) => ({ ...s, city }))}
            className="w-full flex items-center justify-between px-4 py-3.5 text-left border-b transition-colors"
            style={{
              borderColor: "oklch(0.2 0 0)",
              background:
                state.city === city
                  ? "oklch(0.6 0.25 253 / 0.1)"
                  : "transparent",
            }}
          >
            <span
              className="text-sm font-medium"
              style={{
                color:
                  state.city === city
                    ? "oklch(0.7 0.2 253)"
                    : "oklch(0.85 0 0)",
                fontFamily: "var(--font-body)",
              }}
            >
              {city}
            </span>
            {state.city === city && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8L7 12L13 4"
                  stroke="oklch(0.6 0.25 253)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.button>
        ))}
      </div>

      <ContinueButton
        disabled={!state.city}
        onClick={handleContinue}
        ocid="onboarding.step3.continue_button"
      />
    </div>
  );
}

// ─── Step 4: Goal ─────────────────────────────────────────────────────────────
function Step4({ onNext, state, setState }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(0.97 0 0)",
          }}
        >
          What's your main goal?
        </h2>
        <p className="text-sm" style={{ color: "oklch(0.65 0 0)" }}>
          We'll build your personalised growth plan around this.
        </p>
      </div>

      <div className="flex flex-col gap-3" data-ocid="onboarding.goal.list">
        {GOALS.map((goal, i) => (
          <motion.button
            key={goal.value}
            data-ocid={`onboarding.goal.item.${i + 1}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setState((s) => ({ ...s, goal: goal.value }))}
            className="flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-colors"
            style={{
              background:
                state.goal === goal.value
                  ? "oklch(0.6 0.25 253 / 0.12)"
                  : "oklch(0.16 0 0)",
              borderColor:
                state.goal === goal.value
                  ? "oklch(0.6 0.25 253)"
                  : "oklch(0.22 0 0)",
            }}
          >
            <span className="text-2xl flex-shrink-0" aria-hidden="true">
              {goal.emoji}
            </span>
            <div>
              <p
                className="text-sm font-semibold"
                style={{
                  color:
                    state.goal === goal.value
                      ? "oklch(0.7 0.2 253)"
                      : "oklch(0.9 0 0)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {goal.label}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                {goal.desc}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <ContinueButton
        disabled={!state.goal}
        onClick={onNext}
        ocid="onboarding.step4.continue_button"
      />
    </div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target }: { target: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = { stop: () => {} };
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      start = Math.round(eased * target);
      count.set(start);
      setDisplay(start);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
    return () => controls.stop();
  }, [target, count]);

  void rounded; // suppress unused warning
  return <span>{display}</span>;
}

// ─── Step 5: Reveal ───────────────────────────────────────────────────────────
function Step5({ state }: StepProps & { onFinish: () => void }) {
  const savePrefs = useSaveOnboardingPrefs();
  const completeOnboarding = useCompleteOnboarding();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      await savePrefs.mutateAsync({
        niche: state.niche,
        city: state.city,
        targetBudget: 0,
        completedOnboarding: true,
      });
      await completeOnboarding.mutateAsync();
      trackEvent("onboarding_completed", {
        niche: state.niche,
        city: state.city,
        goal: state.goal,
      });
      void navigate({ to: "/login" });
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="text-6xl font-extrabold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(0.97 0 0)",
          }}
        >
          <AnimatedCounter target={20} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(0.97 0 0)",
          }}
        >
          Your first 20 leads are ready! 🎉
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm mt-1"
          style={{ color: "oklch(0.65 0 0)" }}
        >
          Tailored for{" "}
          <span style={{ color: "oklch(0.7 0.2 253)" }}>
            {state.city || "your city"}
          </span>{" "}
          · {NICHES.find((n) => n.value === state.niche)?.label || "your niche"}
        </motion.p>
      </div>

      <div className="flex flex-col gap-3" data-ocid="onboarding.leads.list">
        {MOCK_LEADS.map((lead, i) => (
          <motion.div
            key={lead.businessName}
            data-ocid={`onboarding.leads.item.${i + 1}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.12 }}
            className="flex items-center justify-between px-4 py-3.5 rounded-2xl"
            style={{
              background: "oklch(0.16 0 0)",
              border: "1px solid oklch(0.22 0 0)",
            }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{
                  color: "oklch(0.92 0 0)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {lead.businessName}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.55 0 0)" }}
              >
                {lead.city}
              </p>
            </div>
            <ScoreBadge score={lead.score} />
          </motion.div>
        ))}
      </div>

      <motion.button
        data-ocid="onboarding.start_button"
        onClick={handleStart}
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="w-full h-14 rounded-2xl font-semibold text-base"
        style={{
          fontFamily: "var(--font-display)",
          background: loading
            ? "oklch(0.3 0 0)"
            : "linear-gradient(135deg, oklch(0.6 0.25 253) 0%, oklch(0.55 0.18 170) 100%)",
          color: loading ? "oklch(0.5 0 0)" : "oklch(0.98 0 0)",
          boxShadow: loading ? "none" : "0 4px 24px oklch(0.6 0.25 253 / 0.4)",
        }}
      >
        {loading ? "Setting up…" : "Start Getting Clients ⚡"}
      </motion.button>
    </div>
  );
}

// ─── Main OnboardingPage ──────────────────────────────────────────────────────
const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  useScreenTracking("onboarding");
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<OnboardingState>({
    businessType: "",
    consentChecked: false,
    niche: "",
    city: "",
    goal: "",
  });

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const stepProps: StepProps = {
    onNext: goNext,
    onBack: step > 0 ? goBack : undefined,
    onSkip: step < 4 ? goNext : undefined,
    state,
    setState,
  };

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "oklch(0.09 0 0)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <button
          type="button"
          data-ocid="onboarding.back_button"
          onClick={step > 0 ? goBack : undefined}
          className="w-11 h-11 flex items-center justify-center rounded-xl transition-opacity"
          style={{
            opacity: step > 0 ? 1 : 0,
            pointerEvents: step > 0 ? "auto" : "none",
            background: "oklch(0.16 0 0)",
          }}
          aria-label="Go back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M13 15L8 10L13 5"
              stroke="oklch(0.8 0 0)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <ProgressDots current={step} total={TOTAL_STEPS} />

        <button
          type="button"
          data-ocid="onboarding.skip_button"
          onClick={step < 4 ? goNext : undefined}
          className="w-11 h-11 flex items-center justify-center text-sm font-medium transition-opacity"
          style={{
            opacity: step < 4 ? 1 : 0,
            pointerEvents: step < 4 ? "auto" : "none",
            color: "oklch(0.55 0 0)",
            fontFamily: "var(--font-body)",
          }}
        >
          Skip
        </button>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 overflow-y-auto px-6 py-4"
          >
            {step === 0 && <Step1 {...stepProps} />}
            {step === 1 && <Step2 {...stepProps} />}
            {step === 2 && <Step3 {...stepProps} />}
            {step === 3 && <Step4 {...stepProps} />}
            {step === 4 && <Step5 {...stepProps} onFinish={goNext} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
