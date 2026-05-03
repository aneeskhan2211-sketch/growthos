/**
 * useNotifications.ts
 * In-app notification system hooks.
 * Polls listNotifications / getUnreadCount every 30s.
 * Falls back gracefully when backend methods are not yet available.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";

// ─── Types ────────────────────────────────────────────────────────────────

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type:
    | "new_lead"
    | "new_reply"
    | "follow_up_due"
    | "upgrade_prompt"
    | "system_alert"
    | "weekly_report"
    | "limit_reached"
    | "milestone_unlocked"
    | "case_study_ready"
    | "competitor_alert"
    | "info"
    | "success"
    | "warning"
    | "error";
  read: boolean;
  createdAt: number;
  link?: string;
  actionUrl?: string;
}

// ─── Mock fallback ──────────────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "1",
    title: "12 new leads available in your area",
    body: "High-quality leads for salons in Mumbai are ready for outreach.",
    type: "new_lead",
    read: false,
    createdAt: Date.now() - 300_000,
    actionUrl: "/leads",
  },
  {
    id: "2",
    title: "Sunrise Salon replied to your message",
    body: "They asked about your pricing. Reply now to keep the conversation going.",
    type: "new_reply",
    read: false,
    createdAt: Date.now() - 900_000,
    actionUrl: "/outreach",
  },
  {
    id: "3",
    title: "5 follow-ups are due today",
    body: "Don't miss these conversations — follow-up responses convert 40% better.",
    type: "follow_up_due",
    read: false,
    createdAt: Date.now() - 1_800_000,
    actionUrl: "/outreach",
  },
  {
    id: "4",
    title: "You're 1 step away from closing this lead",
    body: "Upgrade to send proposals and track deal progress automatically.",
    type: "upgrade_prompt",
    read: false,
    createdAt: Date.now() - 3_600_000,
    actionUrl: "/billing",
  },
  {
    id: "5",
    title: "Website scan complete",
    body: "Your website scored 72/100. 3 issues may be costing you leads.",
    type: "system_alert",
    read: true,
    createdAt: Date.now() - 7_200_000,
    actionUrl: "/dashboard/website-health",
  },
  {
    id: "6",
    title: "Weekly Growth Report is ready",
    body: "You generated 47 leads last week. Here's what worked and what to improve.",
    type: "weekly_report",
    read: true,
    createdAt: Date.now() - 86_400_000,
    actionUrl: "/reports",
  },
  {
    id: "7",
    title: "Daily outreach limit reached",
    body: "You've sent 10 messages today. Upgrade to Growth for 150 messages/day.",
    type: "limit_reached",
    read: true,
    createdAt: Date.now() - 43_200_000,
    actionUrl: "/billing",
  },
  {
    id: "8",
    title: "Milestone unlocked: First 10 leads!",
    body: "You've generated 10 leads. Keep going — you're 30% closer to your first booking.",
    type: "milestone_unlocked",
    read: true,
    createdAt: Date.now() - 172_800_000,
    actionUrl: "/leads",
  },
];

// ─── Hook: list notifications ─────────────────────────────────────────────────────

export function useNotifications() {
  const { actor, isFetching } = useActor(createActor);
  const prevCountRef = useRef<number>(-1);

  const query = useQuery<AppNotification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return MOCK_NOTIFICATIONS;
      try {
        const raw = await actor.listNotifications?.(BigInt(50), false);
        if (!raw || !Array.isArray(raw)) return MOCK_NOTIFICATIONS;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return raw.map((n: any) => ({
          id: String(n.id),
          title: n.title,
          body: n.body,
          type: (n.notifType ?? n.type ?? "info") as AppNotification["type"],
          read: n.read,
          createdAt: Number(n.createdAt),
          actionUrl: n.actionUrl ?? n.link ?? undefined,
          link: n.link ?? undefined,
        }));
      } catch {
        return MOCK_NOTIFICATIONS;
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });

  // Toast on new notification arrival
  useEffect(() => {
    const count = query.data?.length ?? 0;
    const unread = query.data?.filter((n) => !n.read).length ?? 0;
    if (
      prevCountRef.current >= 0 &&
      count > prevCountRef.current &&
      unread > 0
    ) {
      const newest = query.data?.[0];
      if (newest) {
        toast(newest.title, {
          description: newest.body.slice(0, 80),
          duration: 4000,
        });
      }
    }
    prevCountRef.current = count;
  }, [query.data]);

  return query;
}

// ─── Hook: filtered notifications ────────────────────────────────────────────────

export function useFilteredNotifications(type?: string, onlyUnread?: boolean) {
  const { data: all = [], ...rest } = useNotifications();
  const filtered = all.filter((n) => {
    if (type && n.type !== type) return false;
    if (onlyUnread && n.read) return false;
    return true;
  });
  return { data: filtered, ...rest };
}

// ─── Hook: unread count ─────────────────────────────────────────────────────────

export function useUnreadCount() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<number>({
    queryKey: ["notifications", "unreadCount"],
    queryFn: async () => {
      if (!actor) return MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
      try {
        const raw = await actor.getUnreadCount?.();
        if (raw === undefined || raw === null) {
          return MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
        }
        return Number(raw);
      } catch {
        return 0;
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

// ─── Hook: trigger system notifications on mount ────────────────────────────────

export function useTriggerSystemNotifications() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const didRun = useRef(false);

  useEffect(() => {
    if (!actor || didRun.current) return;
    didRun.current = true;
    (async () => {
      try {
        await actor.triggerSystemNotifications?.();
        qc.invalidateQueries({ queryKey: ["notifications"] });
      } catch {
        // silent — backend may not support this yet
      }
    })();
  }, [actor, qc]);
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function useMarkRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return;
      await actor.markRead?.(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.markAllRead?.();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteNotification() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return;
      await actor.deleteNotification?.(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
