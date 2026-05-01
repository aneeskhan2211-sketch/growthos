import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  CheckCheck,
  Megaphone,
  MessageCircle,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { NotificationItem } from "../../types";

// ─── Mock notifications ───────────────────────────────────────────────────────

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    type: "reply",
    title: "Lead replied!",
    description:
      "Sunrise Salon (Mumbai) replied to your outreach. Respond now.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    actionLabel: "Reply",
    actionPath: "/outreach",
  },
  {
    id: "n2",
    type: "deal",
    title: "Deal moved to Proposal",
    description: "FitZone Gym progressed from Interested → Proposal Sent.",
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
    read: false,
    actionLabel: "View",
    actionPath: "/crm",
  },
  {
    id: "n3",
    type: "lead",
    title: "47 new leads found",
    description:
      "Your Lead Engine scan for 'Gyms in Pune' completed successfully.",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    read: false,
    actionLabel: "View Leads",
    actionPath: "/leads",
  },
  {
    id: "n4",
    type: "campaign",
    title: "Campaign ROI alert",
    description: "Google Ads campaign 'Q2 Salons' reached 3.2x ROI target.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    read: true,
    actionLabel: "Analytics",
    actionPath: "/analytics",
  },
  {
    id: "n5",
    type: "system",
    title: "Weekly report ready",
    description: "Your growth summary for April W4 is ready to view.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20),
    read: true,
    actionLabel: "View Report",
    actionPath: "/reports",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(date: Date): string {
  const diff = (Date.now() - date.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const TYPE_ICON: Record<NotificationItem["type"], typeof Bell> = {
  lead: Zap,
  reply: MessageCircle,
  deal: Briefcase,
  campaign: Megaphone,
  system: Bell,
  alert: TrendingUp,
};

const TYPE_COLOR: Record<NotificationItem["type"], string> = {
  lead: "bg-primary/10 text-primary",
  reply: "bg-success/10 text-success",
  deal: "bg-warning/10 text-warning",
  campaign: "bg-chart-5/10 text-chart-5",
  system: "bg-muted text-muted-foreground",
  alert: "bg-destructive/10 text-destructive",
};

// ─── Component ───────────────────────────────────────────────────────────────

interface NotificationPanelProps {
  onClose?: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const navigate = useNavigate();
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const handleAction = (notif: NotificationItem) => {
    markRead(notif.id);
    if (notif.actionPath) {
      navigate({ to: notif.actionPath });
      onClose?.();
    }
  };

  return (
    <div
      data-ocid="notifications.panel"
      className="w-80 bg-card border border-border rounded-xl shadow-premium overflow-hidden animate-slide-in-up"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-foreground" />
          <h3 className="text-sm font-semibold text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-muted-foreground hover:text-foreground"
              onClick={markAllRead}
              aria-label="Mark all as read"
              data-ocid="notifications.mark_all_read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-muted-foreground hover:text-foreground"
              onClick={onClose}
              aria-label="Close notifications"
              data-ocid="notifications.close_button"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="max-h-[380px] overflow-y-auto scrollbar-thin divide-y divide-border">
        {notifications.length === 0 ? (
          <div
            data-ocid="notifications.empty_state"
            className="flex flex-col items-center py-10 px-4 text-center"
          >
            <Bell className="w-8 h-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        ) : (
          notifications.map((notif, idx) => {
            const Icon = TYPE_ICON[notif.type];
            return (
              <div
                key={notif.id}
                data-ocid={`notifications.item.${idx + 1}`}
                className={cn(
                  "flex gap-3 px-4 py-3 transition-fast hover:bg-muted/40",
                  !notif.read && "bg-primary/3",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    TYPE_COLOR[notif.type],
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={cn(
                        "text-xs font-semibold text-foreground leading-snug",
                        !notif.read && "font-bold",
                      )}
                    >
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 text-truncate-2">
                    {notif.description}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px] text-muted-foreground/60">
                      {timeAgo(notif.timestamp)}
                    </span>
                    {notif.actionLabel && (
                      <button
                        type="button"
                        className="text-[10px] font-semibold text-primary hover:text-primary/80 transition-fast"
                        onClick={() => handleAction(notif)}
                        data-ocid={`notifications.action.${idx + 1}`}
                      >
                        {notif.actionLabel} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border">
        <button
          type="button"
          className="text-xs text-muted-foreground hover:text-foreground transition-fast w-full text-center font-medium"
          onClick={() => {
            navigate({ to: "/reports" });
            onClose?.();
          }}
          data-ocid="notifications.view_all_button"
        >
          View all activity →
        </button>
      </div>
    </div>
  );
}
