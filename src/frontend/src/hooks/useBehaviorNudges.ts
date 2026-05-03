import {
  COPY_LIBRARY,
  TRIGGER_MESSAGES,
  personalizeMessage,
  selectCopyByActivity,
} from "@/data/notificationCopyLibrary";
import type {
  CopyType,
  PersonalizationTokens,
  TriggerType,
} from "@/data/notificationCopyLibrary";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ActiveNudge {
  type: CopyType;
  message: string;
  actionLabel?: string;
  actionPath?: string;
}

interface NudgeHistoryEntry {
  type: CopyType;
  message: string;
  shownAt: number;
  dismissed: boolean;
}

interface NudgePrefs {
  notificationsSentToday: number;
  lastNudgeDate: string; // ISO date string YYYY-MM-DD
  nudgeHistory: NudgeHistoryEntry[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "growthos_nudge_prefs";
const MAX_NUDGES_PER_DAY = 2;
const QUIET_HOUR_START = 21; // 9 PM

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function isQuietHours(): boolean {
  return new Date().getHours() >= QUIET_HOUR_START;
}

function loadPrefs(): NudgePrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs();
    const parsed = JSON.parse(raw) as NudgePrefs;
    // Reset counter if it's a new day
    if (parsed.lastNudgeDate !== todayStr()) {
      return {
        ...parsed,
        notificationsSentToday: 0,
        lastNudgeDate: todayStr(),
      };
    }
    return parsed;
  } catch {
    return defaultPrefs();
  }
}

function savePrefs(prefs: NudgePrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Silently fail if localStorage is not available
  }
}

function defaultPrefs(): NudgePrefs {
  return {
    notificationsSentToday: 0,
    lastNudgeDate: todayStr(),
    nudgeHistory: [],
  };
}

function pickMessage(type: CopyType, tokens: PersonalizationTokens): string {
  const messages = COPY_LIBRARY[type];
  const idx = Math.floor(Math.random() * messages.length);
  return personalizeMessage(messages[idx], tokens as Record<string, string>);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export interface UseBehaviorNudgesOptions {
  /** Number of actions (messages sent, leads contacted) the user completed today */
  actionsToday?: number;
  /** Days since the user last had any activity */
  daysSinceActivity?: number;
  /** Personalization tokens to replace in copy templates */
  tokens?: PersonalizationTokens;
  /** Whether nudges should be suppressed (e.g. not authenticated) */
  disabled?: boolean;
}

export interface UseBehaviorNudgesReturn {
  /** The currently active nudge to display, or null if none */
  currentNudge: ActiveNudge | null;
  /** Dismiss the current nudge */
  dismissNudge: () => void;
  /** Manually trigger a nudge of a given type */
  triggerNudge: (
    type: CopyType,
    message?: string,
    actionLabel?: string,
    actionPath?: string,
  ) => void;
  /** Trigger a nudge from a system event (reply received, inactivity, etc.) */
  triggerEventNudge: (event: TriggerType) => void;
  /** History of nudges shown in this session */
  nudgeHistory: NudgeHistoryEntry[];
  /** True if nudges are suppressed (quiet hours or daily cap reached) */
  isSuppressed: boolean;
}

export function useBehaviorNudges({
  actionsToday = 0,
  daysSinceActivity = 0,
  tokens = {},
  disabled = false,
}: UseBehaviorNudgesOptions = {}): UseBehaviorNudgesReturn {
  const [currentNudge, setCurrentNudge] = useState<ActiveNudge | null>(null);
  const prefsRef = useRef<NudgePrefs>(loadPrefs());
  const mountedRef = useRef(false);

  const prefs = prefsRef.current;
  const isSuppressed =
    disabled ||
    isQuietHours() ||
    prefs.notificationsSentToday >= MAX_NUDGES_PER_DAY;

  // ── Internal: record a nudge shown ──────────────────────────────────────────
  const recordNudgeShown = useCallback((type: CopyType, message: string) => {
    const entry: NudgeHistoryEntry = {
      type,
      message,
      shownAt: Date.now(),
      dismissed: false,
    };
    prefsRef.current = {
      ...prefsRef.current,
      notificationsSentToday: prefsRef.current.notificationsSentToday + 1,
      lastNudgeDate: todayStr(),
      nudgeHistory: [entry, ...prefsRef.current.nudgeHistory].slice(0, 20),
    };
    savePrefs(prefsRef.current);
  }, []);

  // ── Internal: show a nudge (respects caps) ───────────────────────────────────
  const showNudge = useCallback(
    (nudge: ActiveNudge) => {
      // Reload prefs in case of daily reset
      prefsRef.current = loadPrefs();
      if (
        disabled ||
        isQuietHours() ||
        prefsRef.current.notificationsSentToday >= MAX_NUDGES_PER_DAY
      ) {
        return;
      }
      setCurrentNudge(nudge);
      recordNudgeShown(nudge.type, nudge.message);
    },
    [disabled, recordNudgeShown],
  );

  // ── On mount: auto-trigger inactivity nudge if applicable ───────────────────
  useEffect(() => {
    if (mountedRef.current || disabled) return;
    mountedRef.current = true;

    // Small delay so it doesn't flash on initial render
    const timer = setTimeout(() => {
      prefsRef.current = loadPrefs();
      if (
        isQuietHours() ||
        prefsRef.current.notificationsSentToday >= MAX_NUDGES_PER_DAY
      ) {
        return;
      }

      const copyType = selectCopyByActivity(actionsToday, daysSinceActivity);
      const message = pickMessage(copyType, tokens);

      let actionLabel: string | undefined;
      let actionPath: string | undefined;

      if (copyType === "fomo" || copyType === "urgency") {
        actionLabel = "View Leads";
        actionPath = "/leads";
      } else if (copyType === "reward") {
        actionLabel = "See Progress";
        actionPath = "/auto-agency";
      } else if (copyType === "money") {
        actionLabel = "View Potential";
        actionPath = "/revenue-plan";
      }

      showNudge({ type: copyType, message, actionLabel, actionPath });
    }, 1500);

    return () => clearTimeout(timer);
  }, [actionsToday, daysSinceActivity, tokens, disabled, showNudge]);

  // ── Dismiss ──────────────────────────────────────────────────────────────────
  const dismissNudge = useCallback(() => {
    setCurrentNudge(null);
    // Mark last entry as dismissed
    if (prefsRef.current.nudgeHistory.length > 0) {
      const updated = [...prefsRef.current.nudgeHistory];
      updated[0] = { ...updated[0], dismissed: true };
      prefsRef.current = { ...prefsRef.current, nudgeHistory: updated };
      savePrefs(prefsRef.current);
    }
  }, []);

  // ── Manual trigger ───────────────────────────────────────────────────────────
  const triggerNudge = useCallback(
    (
      type: CopyType,
      message?: string,
      actionLabel?: string,
      actionPath?: string,
    ) => {
      const msg = message ?? pickMessage(type, tokens);
      showNudge({ type, message: msg, actionLabel, actionPath });
    },
    [tokens, showNudge],
  );

  // ── Event-based trigger (reply, inactivity, etc.) ────────────────────────────
  const triggerEventNudge = useCallback(
    (event: TriggerType) => {
      const message = personalizeMessage(
        TRIGGER_MESSAGES[event],
        tokens as Record<string, string>,
      );

      // Map events to nudge types
      const typeMap: Record<TriggerType, CopyType> = {
        on_new_reply: "urgency",
        on_inactivity_24h: "fomo",
        on_inactivity_48h: "fomo",
        on_followup_due: "urgency",
        on_limit_reached: "money",
        on_streak_milestone: "reward",
      };

      const actionMap: Record<TriggerType, { label?: string; path?: string }> =
        {
          on_new_reply: { label: "Reply Now", path: "/inbox" },
          on_inactivity_24h: { label: "View Leads", path: "/leads" },
          on_inactivity_48h: { label: "View Leads", path: "/leads" },
          on_followup_due: { label: "Follow Up", path: "/outreach" },
          on_limit_reached: { label: "Upgrade", path: "/pricing" },
          on_streak_milestone: { label: "See Progress", path: "/auto-agency" },
        };

      showNudge({
        type: typeMap[event],
        message,
        actionLabel: actionMap[event].label,
        actionPath: actionMap[event].path,
      });
    },
    [tokens, showNudge],
  );

  return {
    currentNudge,
    dismissNudge,
    triggerNudge,
    triggerEventNudge,
    nudgeHistory: prefsRef.current.nudgeHistory,
    isSuppressed,
  };
}
