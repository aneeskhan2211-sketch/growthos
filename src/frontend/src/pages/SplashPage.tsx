import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { useOnboardingPrefs } from "../hooks/usePremium";

export default function SplashPage() {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  const { data: onboardingPrefs, isLoading: loadingPrefs } =
    useOnboardingPrefs();
  const { trackEvent } = useAnalytics();
  const navigate = useNavigate();
  const tracked = useRef(false);
  const navigated = useRef(false);

  // Track app_opened once
  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackEvent("app_opened");
    }
  }, [trackEvent]);

  // Navigate after 2 seconds minimum, or when data is ready
  useEffect(() => {
    if (navigated.current) return;
    if (isInitializing) return;

    const decide = () => {
      if (navigated.current) return;
      navigated.current = true;

      if (!isAuthenticated) {
        navigate({ to: "/login" });
        return;
      }

      if (!loadingPrefs && onboardingPrefs !== undefined) {
        if (onboardingPrefs.completedOnboarding) {
          void navigate({ to: "/" });
        } else {
          void navigate({ to: "/onboarding" });
        }
      }
    };

    const timer = setTimeout(decide, 2000);
    return () => clearTimeout(timer);
  }, [
    isAuthenticated,
    isInitializing,
    loadingPrefs,
    onboardingPrefs,
    navigate,
  ]);

  // Also navigate immediately when auth+data are ready and 2s have passed
  useEffect(() => {
    if (navigated.current) return;
    if (isInitializing || loadingPrefs) return;
    if (!isAuthenticated) return;
    if (onboardingPrefs === undefined) return;

    const timer = setTimeout(() => {
      if (navigated.current) return;
      navigated.current = true;
      if (onboardingPrefs.completedOnboarding) {
        void navigate({ to: "/" });
      } else {
        void navigate({ to: "/onboarding" });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [
    isAuthenticated,
    isInitializing,
    loadingPrefs,
    onboardingPrefs,
    navigate,
  ]);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.09 0 0) 0%, oklch(0.13 0.04 253) 50%, oklch(0.09 0 0) 100%)",
        }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.6 0.25 253 / 0.25) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="relative z-10 flex flex-col items-center gap-5"
        >
          {/* Icon */}
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.6 0.25 253) 0%, oklch(0.5 0.28 270) 100%)",
              boxShadow:
                "0 0 40px oklch(0.6 0.25 253 / 0.5), 0 0 80px oklch(0.6 0.25 253 / 0.2)",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="GrowthOS logo"
              role="img"
            >
              <path
                d="M8 36L18 22L26 30L34 14L42 24"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="42" cy="24" r="3" fill="white" />
              <path
                d="M8 36 L14 36"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
          >
            <h1
              className="text-4xl font-extrabold tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "oklch(0.97 0 0)",
              }}
            >
              GrowthOS
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="text-base font-medium text-center px-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "oklch(0.75 0.05 253)",
                maxWidth: "260px",
              }}
            >
              Grow your agency.{" "}
              <span style={{ color: "oklch(0.85 0.15 253)" }}>
                Get clients faster.
              </span>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="absolute bottom-16 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: "oklch(0.6 0.25 253)" }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
