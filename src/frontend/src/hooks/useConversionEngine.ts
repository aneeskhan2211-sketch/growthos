import { useCallback, useEffect, useRef, useState } from "react";
import type { RetargetBanner } from "../types/conversionEngine";
import { useAnalytics } from "./useAnalytics";

// ── localStorage keys ──────────────────────────────────────────────────────────
const LS_QUOTA_DATE = "growthosQuotaDate";
const LS_QUOTA = "growthosQuota";
const LS_ACTIVITY = "growthosActivity";
const LS_COUNTDOWN = "growthosCountdown";
const LS_EXIT = "growthosExitShown";
const LS_SUCCESS = "growthosSuccessMoment";
const LS_AB = "growthosABTests";

// ── helpers ────────────────────────────────────────────────────────────────────
function todayUTC(): string {
  return new Date().toISOString().slice(0, 10);
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — fail silently
  }
}

// ── plan helpers (free = 10/5, growth = 150/50) ─────────────────────────────
function getPlanLimits(): { leadsLimit: number; messagesLimit: number } {
  try {
    const raw = localStorage.getItem("growthosSubscriptionPlan");
    const plan: string = raw ? JSON.parse(raw) : "free";
    if (plan === "growth" || plan === "pro" || plan === "agency") {
      return { leadsLimit: 150, messagesLimit: 50 };
    }
  } catch {
    // ignore
  }
  return { leadsLimit: 10, messagesLimit: 5 };
}

// ── quota state ────────────────────────────────────────────────────────────────
interface QuotaStore {
  dailyLeadsUsed: number;
  dailyMessagesUsed: number;
}

function initQuota(): QuotaStore {
  const storedDate = localStorage.getItem(LS_QUOTA_DATE);
  const today = todayUTC();
  if (storedDate !== today) {
    localStorage.setItem(LS_QUOTA_DATE, today);
    writeJSON(LS_QUOTA, { dailyLeadsUsed: 2, dailyMessagesUsed: 1 });
    return { dailyLeadsUsed: 2, dailyMessagesUsed: 1 };
  }
  return readJSON<QuotaStore>(LS_QUOTA, {
    dailyLeadsUsed: 2,
    dailyMessagesUsed: 1,
  });
}

// ── activity state ─────────────────────────────────────────────────────────────
interface ActivityStore {
  lastActiveAt: number;
  lastContactedLeadAt: number;
}

function initActivity(): ActivityStore {
  return readJSON<ActivityStore>(LS_ACTIVITY, {
    lastActiveAt: Date.now(),
    lastContactedLeadAt: Date.now(),
  });
}

// ── countdown state ────────────────────────────────────────────────────────────
interface CountdownStore {
  activeUntil: number | null;
  dismissedAt: number | null;
}

function initCountdown(): CountdownStore {
  return readJSON<CountdownStore>(LS_COUNTDOWN, {
    activeUntil: null,
    dismissedAt: null,
  });
}

// ── exit intent state ──────────────────────────────────────────────────────────
interface ExitStore {
  shown: boolean;
  dismissedAt: number | null;
}

function initExit(): ExitStore {
  return readJSON<ExitStore>(LS_EXIT, { shown: false, dismissedAt: null });
}

// ── success moment state ───────────────────────────────────────────────────────
interface SuccessStore {
  shown: boolean;
  type: "first_reply" | "first_enquiry" | null;
}

function initSuccess(): SuccessStore {
  return readJSON<SuccessStore>(LS_SUCCESS, { shown: false, type: null });
}

// ── The hook ───────────────────────────────────────────────────────────────────
export default function useConversionEngine() {
  const { trackEvent } = useAnalytics();

  const [quota, setQuotaRaw] = useState<QuotaStore>(initQuota);
  const [activity, setActivityRaw] = useState<ActivityStore>(initActivity);
  const [countdown, setCountdownRaw] = useState<CountdownStore>(initCountdown);
  const [exit, setExitRaw] = useState<ExitStore>(initExit);
  const [success, setSuccessRaw] = useState<SuccessStore>(initSuccess);

  // live seconds counter — re-renders every second when countdown is active
  const [now, setNow] = useState(Date.now());
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    tickRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  // ── daily reset check ─────────────────────────────────────────────────────
  useEffect(() => {
    const storedDate = localStorage.getItem(LS_QUOTA_DATE);
    const today = todayUTC();
    if (storedDate !== today) {
      localStorage.setItem(LS_QUOTA_DATE, today);
      const fresh = { dailyLeadsUsed: 0, dailyMessagesUsed: 0 };
      writeJSON(LS_QUOTA, fresh);
      setQuotaRaw(fresh);
    }
  }, []);

  // ── derived values ────────────────────────────────────────────────────────
  const { leadsLimit, messagesLimit } = getPlanLimits();

  const inactiveDays = Math.floor((now - activity.lastActiveAt) / 86_400_000);

  const countdownSecondsLeft = countdown.activeUntil
    ? Math.max(0, Math.floor((countdown.activeUntil - now) / 1000))
    : 0;

  const isCountdownActive =
    countdown.activeUntil !== null && countdown.activeUntil > now;

  // ── quota actions ─────────────────────────────────────────────────────────
  const incrementLeadsUsed = useCallback(() => {
    setQuotaRaw((prev) => {
      const next = { ...prev, dailyLeadsUsed: prev.dailyLeadsUsed + 1 };
      writeJSON(LS_QUOTA, next);
      return next;
    });
  }, []);

  const incrementMessagesUsed = useCallback(() => {
    setQuotaRaw((prev) => {
      const next = {
        ...prev,
        dailyMessagesUsed: prev.dailyMessagesUsed + 1,
      };
      writeJSON(LS_QUOTA, next);
      return next;
    });
  }, []);

  // ── activity actions ──────────────────────────────────────────────────────
  const setActivity = useCallback(() => {
    setActivityRaw((prev) => {
      const next = { ...prev, lastActiveAt: Date.now() };
      writeJSON(LS_ACTIVITY, next);
      return next;
    });
  }, []);

  const setLeadContacted = useCallback(() => {
    setActivityRaw((prev) => {
      const next = {
        ...prev,
        lastActiveAt: Date.now(),
        lastContactedLeadAt: Date.now(),
      };
      writeJSON(LS_ACTIVITY, next);
      return next;
    });
  }, []);

  // ── countdown actions ─────────────────────────────────────────────────────
  const triggerCountdown = useCallback(() => {
    const dismissed = countdown.dismissedAt;
    const oneDayMs = 86_400_000;
    if (dismissed && Date.now() - dismissed < oneDayMs) return; // dismissed within 24h
    const activeUntil = Date.now() + 10 * 60 * 1000; // 10 min
    const next: CountdownStore = { activeUntil, dismissedAt: dismissed };
    writeJSON(LS_COUNTDOWN, next);
    setCountdownRaw(next);
  }, [countdown.dismissedAt]);

  const dismissCountdown = useCallback(() => {
    const next: CountdownStore = {
      activeUntil: null,
      dismissedAt: Date.now(),
    };
    writeJSON(LS_COUNTDOWN, next);
    setCountdownRaw(next);
  }, []);

  // ── exit intent actions ───────────────────────────────────────────────────
  const triggerExitIntent = useCallback(() => {
    const dismissed = exit.dismissedAt;
    const sevenDaysMs = 7 * 86_400_000;
    if (dismissed && Date.now() - dismissed < sevenDaysMs) return;
    const next: ExitStore = { shown: true, dismissedAt: exit.dismissedAt };
    writeJSON(LS_EXIT, next);
    setExitRaw(next);
  }, [exit.dismissedAt]);

  const dismissExitIntent = useCallback(() => {
    const next: ExitStore = { shown: false, dismissedAt: Date.now() };
    writeJSON(LS_EXIT, next);
    setExitRaw(next);
  }, []);

  // ── success moment actions ────────────────────────────────────────────────
  const triggerSuccessMoment = useCallback(
    (type: "first_reply" | "first_enquiry") => {
      const next: SuccessStore = { shown: true, type };
      writeJSON(LS_SUCCESS, next);
      setSuccessRaw(next);
    },
    [],
  );

  const dismissSuccessMoment = useCallback(() => {
    const next: SuccessStore = { shown: false, type: null };
    writeJSON(LS_SUCCESS, next);
    setSuccessRaw(next);
  }, []);

  // ── retarget banner ───────────────────────────────────────────────────────
  const getRetargetBanner = useCallback((): RetargetBanner => {
    if (inactiveDays < 1) return null;
    if (inactiveDays === 1)
      return {
        day: 1,
        message: "You have 12 new leads waiting. Contact them now.",
      };
    if (inactiveDays === 2)
      return {
        day: 2,
        message:
          "Follow up to increase reply chances. Most deals close on the 2nd touch.",
      };
    return {
      day: 3,
      message: "Upgrade to automate follow-ups and save 3+ hours daily.",
    };
  }, [inactiveDays]);

  // ── A/B variant assignment ─────────────────────────────────────────────────
  const getVariant = useCallback(
    (testId: string, variants: string[]): string => {
      const stored = readJSON<Record<string, string>>(LS_AB, {});
      if (stored[testId]) return stored[testId];
      const picked = variants[Math.floor(Math.random() * variants.length)];
      const next = { ...stored, [testId]: picked };
      writeJSON(LS_AB, next);
      return picked;
    },
    [],
  );

  const trackVariantEvent = useCallback(
    (
      testId: string,
      variantId: string,
      event: string,
      properties?: Record<string, string>,
    ) => {
      trackEvent(event, {
        ...properties,
        ab_test_id: testId,
        ab_variant_id: variantId,
      });
    },
    [trackEvent],
  );

  return {
    // quota
    dailyLeadsUsed: quota.dailyLeadsUsed,
    dailyMessagesUsed: quota.dailyMessagesUsed,
    dailyLeadsLimit: leadsLimit,
    dailyMessagesLimit: messagesLimit,
    incrementLeadsUsed,
    incrementMessagesUsed,
    // activity
    lastActiveAt: activity.lastActiveAt,
    lastContactedLeadAt: activity.lastContactedLeadAt,
    inactiveDays,
    setActivity,
    setLeadContacted,
    // countdown offer
    countdownActiveUntil: countdown.activeUntil,
    countdownSecondsLeft,
    isCountdownActive,
    triggerCountdown,
    dismissCountdown,
    // exit intent
    exitIntentShown: exit.shown,
    exitIntentDismissedAt: exit.dismissedAt,
    triggerExitIntent,
    dismissExitIntent,
    // success moment
    successMomentShown: success.shown,
    successMomentType: success.type,
    triggerSuccessMoment,
    dismissSuccessMoment,
    // retarget
    getRetargetBanner,
    // A/B
    getVariant,
    trackVariantEvent,
  };
}
