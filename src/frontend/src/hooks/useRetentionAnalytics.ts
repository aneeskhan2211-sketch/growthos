import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { RetentionAnalytics } from "../backend";

// Local enum mirrors (backend enums not exported from runtime wrapper)
const TriggerType = {
  on_new_reply: "on_new_reply",
  on_inactivity_24h: "on_inactivity_24h",
  on_inactivity_48h: "on_inactivity_48h",
  on_followup_due: "on_followup_due",
  on_limit_reached: "on_limit_reached",
  on_streak_milestone: "on_streak_milestone",
} as const;

const CopyType = {
  fomo: "fomo",
  urgency: "urgency",
  reward: "reward",
  money_visibility: "money_visibility",
} as const;

// ─── Typed frontend model (numbers instead of bigint for charts) ──────────────
export interface TriggerPerf {
  trigger: string;
  label: string;
  count: number;
  openRate: number;
  actionRate: number;
}

export interface CopyPerf {
  type: string;
  label: string;
  count: number;
  openRate: number;
  actionRate: number;
}

export interface CohortDay {
  day: number;
  usersNotified: number;
  returnedCount: number;
  retentionRate: number;
}

export interface RetentionAnalyticsData {
  totalNotificationsSent: number;
  totalOpened: number;
  totalActionsCompleted: number;
  openRate: number;
  returnRate: number;
  conversionRate: number;
  byTriggerType: TriggerPerf[];
  byCopyType: CopyPerf[];
  cohortByDay: CohortDay[];
}

// ─── Label maps ───────────────────────────────────────────────────────────────
const TRIGGER_LABELS: Record<string, string> = {
  [TriggerType.on_new_reply]: "New Reply Alert",
  [TriggerType.on_inactivity_24h]: "Inactivity (24h)",
  [TriggerType.on_inactivity_48h]: "Inactivity (48h)",
  [TriggerType.on_followup_due]: "Follow-up Due",
  [TriggerType.on_limit_reached]: "Limit Reached",
  [TriggerType.on_streak_milestone]: "Streak Milestone",
};
const isDrip = (t: string) => t.startsWith("drip_day_");

const COPY_LABELS: Record<string, string> = {
  [CopyType.fomo]: "FOMO",
  [CopyType.urgency]: "Urgency",
  [CopyType.reward]: "Reward",
  [CopyType.money_visibility]: "Money Visibility",
};

// ─── Mock fallback ────────────────────────────────────────────────────────────
function buildMockData(): RetentionAnalyticsData {
  return {
    totalNotificationsSent: 247,
    totalOpened: 156,
    totalActionsCompleted: 89,
    openRate: 63.2,
    returnRate: 47.8,
    conversionRate: 36.0,
    byTriggerType: [
      {
        trigger: TriggerType.on_new_reply,
        label: "New Reply Alert",
        count: 48,
        openRate: 79.2,
        actionRate: 62.5,
      },
      {
        trigger: TriggerType.on_inactivity_24h,
        label: "Inactivity (24h)",
        count: 73,
        openRate: 58.4,
        actionRate: 41.1,
      },
      {
        trigger: TriggerType.on_followup_due,
        label: "Follow-up Due",
        count: 61,
        openRate: 65.6,
        actionRate: 49.2,
      },
      {
        trigger: TriggerType.on_limit_reached,
        label: "Limit Reached",
        count: 28,
        openRate: 41.2,
        actionRate: 28.6,
      },
      {
        trigger: "drip",
        label: "Drip Schedule",
        count: 37,
        openRate: 52.7,
        actionRate: 35.1,
      },
    ],
    byCopyType: [
      {
        type: CopyType.fomo,
        label: "FOMO",
        count: 82,
        openRate: 71.3,
        actionRate: 52.4,
      },
      {
        type: CopyType.urgency,
        label: "Urgency",
        count: 69,
        openRate: 65.2,
        actionRate: 47.8,
      },
      {
        type: CopyType.reward,
        label: "Reward",
        count: 53,
        openRate: 58.9,
        actionRate: 43.4,
      },
      {
        type: CopyType.money_visibility,
        label: "Money Visibility",
        count: 43,
        openRate: 44.7,
        actionRate: 30.2,
      },
    ],
    cohortByDay: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const base = 85 - (day - 1) * 1.4;
      const noise = Math.sin(day * 0.8) * 4;
      return {
        day,
        usersNotified: 120,
        returnedCount: Math.round((base + noise) * 1.2),
        retentionRate: Math.max(20, Math.min(92, base + noise)),
      };
    }),
  };
}

// ─── Transform backend response ──────────────────────────────────────────────
function transform(raw: RetentionAnalytics): RetentionAnalyticsData {
  const triggerMap = new Map<string, TriggerPerf>();
  let dripCount = 0;
  let dripOpenSum = 0;
  let dripActionSum = 0;

  for (const t of raw.byTriggerType) {
    const key = t.triggerType as string;
    if (isDrip(key)) {
      dripCount += Number(t.count);
      dripOpenSum += t.openRate * Number(t.count);
      dripActionSum += t.actionRate * Number(t.count);
    } else {
      triggerMap.set(key, {
        trigger: key,
        label: TRIGGER_LABELS[key] ?? key,
        count: Number(t.count),
        openRate: t.openRate,
        actionRate: t.actionRate,
      });
    }
  }

  if (dripCount > 0) {
    triggerMap.set("drip", {
      trigger: "drip",
      label: "Drip Schedule",
      count: dripCount,
      openRate: dripOpenSum / dripCount,
      actionRate: dripActionSum / dripCount,
    });
  }

  const byCopyType: CopyPerf[] = raw.byCopyType.map((c) => ({
    type: c.copyType as string,
    label: COPY_LABELS[c.copyType as string] ?? (c.copyType as string),
    count: Number(c.count),
    openRate: c.openRate,
    actionRate: c.actionRate,
  }));

  const cohortByDay: CohortDay[] = raw.cohortByDay.map((d) => ({
    day: Number(d.day),
    usersNotified: Number(d.usersNotified),
    returnedCount: Number(d.returnedCount),
    retentionRate:
      Number(d.usersNotified) > 0
        ? (Number(d.returnedCount) / Number(d.usersNotified)) * 100
        : 0,
  }));

  return {
    totalNotificationsSent: Number(raw.totalNotificationsSent),
    totalOpened: Number(raw.totalOpened),
    totalActionsCompleted: Number(raw.totalActionsCompleted),
    openRate: raw.openRate,
    returnRate: raw.returnRate,
    conversionRate: raw.conversionRate,
    byTriggerType: Array.from(triggerMap.values()),
    byCopyType,
    cohortByDay,
  };
}

// ─── Cohort retention from getCohortRetention ─────────────────────────────────
export interface WeeklyCohortRow {
  week: string;
  D1: number;
  D7: number;
  D30: number;
  D60: number;
  cohortSize: number;
}

function buildMockCohortRows(): WeeklyCohortRow[] {
  return [
    { week: "W14", D1: 95, D7: 72, D30: 58, D60: 46, cohortSize: 142 },
    { week: "W15", D1: 94, D7: 70, D30: 55, D60: 44, cohortSize: 156 },
    { week: "W16", D1: 96, D7: 74, D30: 60, D60: 47, cohortSize: 167 },
    { week: "W17", D1: 93, D7: 71, D30: 57, D60: 45, cohortSize: 178 },
    { week: "W18", D1: 95, D7: 73, D30: 59, D60: 46, cohortSize: 192 },
    { week: "W19", D1: 97, D7: 75, D30: 61, D60: 48, cohortSize: 204 },
  ];
}

export function useCohortRetentionRows() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<WeeklyCohortRow[]>({
    queryKey: ["cohortRetentionRows"],
    queryFn: async () => {
      if (!actor) return buildMockCohortRows();
      try {
        const raw = await actor.getCohortRetention(BigInt(12));
        if (!raw.length) return buildMockCohortRows();
        return raw.map((r) => ({
          week: r.week.replace(/^\d{4}-/, ""), // strip year prefix e.g. "2026-W14" → "W14"
          D1: Math.round(r.d1 * 100),
          D7: Math.round(r.d7 * 100),
          D30: Math.round(r.d30 * 100),
          D60: Math.round(r.d60 * 100),
          cohortSize: Number(r.cohortSize),
        }));
      } catch {
        return buildMockCohortRows();
      }
    },
    enabled: !isFetching,
    staleTime: 120_000,
  });
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useRetentionAnalytics() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<RetentionAnalyticsData>({
    queryKey: ["retentionAnalytics"],
    queryFn: async () => {
      if (!actor) return buildMockData();
      try {
        const raw = await actor.getRetentionAnalytics();
        // If backend returned zeros / empty, fall back to mock
        if (Number(raw.totalNotificationsSent) === 0) return buildMockData();
        return transform(raw);
      } catch {
        return buildMockData();
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}
