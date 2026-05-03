import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  FrequencySettings,
  TriggerType,
  UserNotificationPrefs,
  WhatsAppMessage,
  WhatsAppStopCondition,
} from "../backend";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_PREFS: UserNotificationPrefs = {
  userId: "user_demo",
  frequencySettings: {
    maxPerDay: BigInt(2),
    quietHoursEnabled: true,
    quietHoursStart: BigInt(21),
    quietHoursEnd: BigInt(8),
    inactivityReductionEnabled: true,
  },
  enabledTriggers: [
    "on_new_reply",
    "on_inactivity_24h",
    "on_inactivity_48h",
    "on_followup_due",
    "on_limit_reached",
    "drip_day_0",
    "on_streak_milestone",
  ] as TriggerType[],
  whatsappOptIn: false,
  notificationsSentToday: BigInt(0),
};

const WA_STOP_REPLIED_OPTED: WhatsAppStopCondition[] = [
  "user_replied" as WhatsAppStopCondition,
  "user_opted_out" as WhatsAppStopCondition,
];

const WA_STOP_ALL: WhatsAppStopCondition[] = [
  "user_replied" as WhatsAppStopCondition,
  "user_opted_out" as WhatsAppStopCondition,
  "sequence_completed" as WhatsAppStopCondition,
];

const MOCK_WA_SEQUENCE: WhatsAppMessage[] = [
  {
    dayNumber: BigInt(0),
    message:
      "Hi 👋 your leads are ready. Start by contacting 5 businesses today.",
    stopConditions: WA_STOP_REPLIED_OPTED,
  },
  {
    dayNumber: BigInt(1),
    message: "Tip: Reply fast. Many customers choose the first responder.",
    stopConditions: WA_STOP_REPLIED_OPTED,
  },
  {
    dayNumber: BigInt(2),
    message: "Follow up with leads who didn't reply yesterday. It works.",
    stopConditions: WA_STOP_REPLIED_OPTED,
  },
  {
    dayNumber: BigInt(3),
    message: "Want a simple growth plan for your business?",
    stopConditions: WA_STOP_REPLIED_OPTED,
  },
  {
    dayNumber: BigInt(5),
    message: "Keep going. Consistent action builds enquiries.",
    stopConditions: WA_STOP_REPLIED_OPTED,
  },
  {
    dayNumber: BigInt(7),
    message: "Check your replies and suggest next steps.",
    stopConditions: WA_STOP_ALL,
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useNotificationPrefs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserNotificationPrefs>({
    queryKey: ["notificationPrefs"],
    queryFn: async () => {
      if (!actor) return MOCK_PREFS;
      try {
        const result = await actor.getUserNotificationPrefs();
        return result ?? MOCK_PREFS;
      } catch {
        return MOCK_PREFS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_PREFS,
  });
}

export function useUpdateNotificationPrefs() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      frequencySettings: FrequencySettings;
      enabledTriggers: TriggerType[];
    }) => {
      if (!actor) return;
      await actor.setUserNotificationPrefs(
        input.frequencySettings,
        input.enabledTriggers,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPrefs"] });
    },
  });
}

export function useOptInWhatsApp() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (phone: string) => {
      if (!actor) return;
      await actor.setWhatsAppConsent(phone, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPrefs"] });
    },
  });
}

export function useOptOutWhatsApp() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (phone: string) => {
      if (!actor) return;
      await actor.setWhatsAppConsent(phone, false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPrefs"] });
    },
  });
}

export function useWhatsAppSequence() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WhatsAppMessage[]>({
    queryKey: ["whatsappSequence"],
    queryFn: async () => {
      if (!actor) return MOCK_WA_SEQUENCE;
      try {
        const result = await actor.getWhatsAppSequence();
        return result?.length > 0 ? result : MOCK_WA_SEQUENCE;
      } catch {
        return MOCK_WA_SEQUENCE;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_WA_SEQUENCE,
  });
}
