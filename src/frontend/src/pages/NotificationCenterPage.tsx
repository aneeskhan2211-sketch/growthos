import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  BarChart2,
  Bell,
  CheckCheck,
  Clock,
  FileText,
  MessageCircle,
  Radar,
  RefreshCw,
  Trash2,
  TrendingUp,
  Trophy,
  UserPlus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  useDeleteNotification,
  useFilteredNotifications,
  useMarkAllRead,
  useMarkRead,
  useNotifications,
  useTriggerSystemNotifications,
} from "../hooks/useNotifications";
import type { AppNotification } from "../hooks/useNotifications";

// ─── Notification type metadata ───────────────────────────────────────────────

type _NotifCategory =
  | "new_lead"
  | "new_reply"
  | "follow_up_due"
  | "upgrade_prompt"
  | "system_alert"
  | "weekly_report"
  | "limit_reached"
  | "milestone_unlocked"
  | "case_study_ready"
  | "competitor_alert";

const TYPE_META: Record<
  string,
  { icon: typeof Bell; color: string; bg: string; label: string }
> = {
  new_lead: {
    icon: UserPlus,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Lead",
  },
  new_reply: {
    icon: MessageCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "Reply",
  },
  follow_up_due: {
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    label: "Follow-up",
  },
  upgrade_prompt: {
    icon: TrendingUp,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    label: "Upgrade",
  },
  system_alert: {
    icon: Bell,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "System",
  },
  weekly_report: {
    icon: BarChart2,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    label: "Report",
  },
  limit_reached: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "Limit",
  },
  milestone_unlocked: {
    icon: Trophy,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    label: "Milestone",
  },
  case_study_ready: {
    icon: FileText,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    label: "Case Study",
  },
  competitor_alert: {
    icon: Radar,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Competitor",
  },
  // fallback for old types
  info: {
    icon: Bell,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Info",
  },
  success: {
    icon: CheckCheck,
    color: "text-success",
    bg: "bg-success/10",
    label: "Success",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    label: "Warning",
  },
  error: {
    icon: Bell,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Error",
  },
};

function getTypeMeta(type: string) {
  return TYPE_META[type] ?? TYPE_META.info;
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "system", label: "System" },
  { key: "leads", label: "Leads" },
  { key: "upgrades", label: "Upgrades" },
] as const;

type FilterKey = (typeof FILTER_TABS)[number]["key"];

function applyFilter(
  notifications: AppNotification[],
  filter: FilterKey,
): AppNotification[] {
  switch (filter) {
    case "unread":
      return notifications.filter((n) => !n.read);
    case "system":
      return notifications.filter((n) =>
        ["system_alert", "weekly_report", "limit_reached"].includes(n.type),
      );
    case "leads":
      return notifications.filter((n) =>
        ["new_lead", "new_reply", "follow_up_due"].includes(n.type),
      );
    case "upgrades":
      return notifications.filter((n) =>
        ["upgrade_prompt", "milestone_unlocked"].includes(n.type),
      );
    default:
      return notifications;
  }
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function NotifSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4">
      <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

// ─── Single notification row ──────────────────────────────────────────────────

interface NotifRowProps {
  notif: AppNotification;
  index: number;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
  onNavigate: (link: string) => void;
}

function NotifRow({
  notif,
  index,
  onRead,
  onDelete,
  onNavigate,
}: NotifRowProps) {
  const meta = getTypeMeta(notif.type);
  const Icon = meta.icon;

  const handleClick = () => {
    if (!notif.read) onRead(notif.id);
    const link =
      (notif as AppNotification & { actionUrl?: string }).actionUrl ??
      notif.link;
    if (link) onNavigate(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.18, delay: index * 0.03 }}
    >
      <div
        className={cn(
          "flex items-start gap-3 p-4 transition-colors duration-150 cursor-pointer group",
          !notif.read
            ? "bg-primary/[0.04] hover:bg-primary/[0.07]"
            : "hover:bg-muted/40",
        )}
        data-ocid={`notifications.item.${index + 1}`}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        aria-label={notif.title}
      >
        {/* Icon */}
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
            meta.bg,
          )}
        >
          <Icon className={cn("w-4 h-4", meta.color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p
                className={cn(
                  "text-sm text-foreground leading-snug",
                  !notif.read ? "font-semibold" : "font-medium",
                )}
              >
                {notif.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {notif.body}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "shrink-0 text-[9px] px-1.5 py-0.5 h-auto font-semibold border-0",
                meta.bg,
                meta.color,
              )}
            >
              {meta.label}
            </Badge>
          </div>

          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[11px] text-muted-foreground/70">
              {formatDistanceToNow(new Date(notif.createdAt), {
                addSuffix: true,
              })}
            </span>
            {!notif.read && (
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            )}
          </div>
        </div>

        {/* Actions — visible on hover */}
        <div
          className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        >
          {!notif.read && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-muted-foreground hover:text-primary"
              onClick={() => onRead(notif.id)}
              aria-label="Mark as read"
              data-ocid={`notifications.item.${index + 1}.mark_read`}
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(notif.id)}
            aria-label="Delete notification"
            data-ocid={`notifications.item.${index + 1}.delete_button`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationCenterPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const {
    data: notifications = [],
    isLoading,
    refetch,
    isFetching,
  } = useNotifications();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();
  const deleteNotif = useDeleteNotification();
  useTriggerSystemNotifications();

  const filtered = applyFilter(notifications, activeFilter);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredUnread = filtered.filter((n) => !n.read).length;

  const handleNavigate = (link: string) => {
    navigate({ to: link as Parameters<typeof navigate>[0]["to"] });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "You're all caught up"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh notifications"
            data-ocid="notifications.refresh_button"
          >
            <RefreshCw
              className={cn("w-3.5 h-3.5", isFetching && "animate-spin")}
            />
            <span className="ml-1.5 hidden sm:inline">Refresh</span>
          </Button>
          {unreadCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
              data-ocid="notifications.mark_all_read"
            >
              <CheckCheck className="w-3.5 h-3.5 mr-1.5" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl border border-border w-fit"
        role="tablist"
        aria-label="Notification filters"
      >
        {FILTER_TABS.map((tab) => {
          const count =
            tab.key === "unread"
              ? unreadCount
              : tab.key === "all"
                ? notifications.length
                : applyFilter(notifications, tab.key).length;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.key}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150",
                activeFilter === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActiveFilter(tab.key)}
              data-ocid={`notifications.filter.${tab.key}`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0 rounded-full",
                    activeFilter === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Notification List */}
      <Card className="overflow-hidden">
        {/* Loading skeletons */}
        {isLoading && (
          <div
            data-ocid="notifications.loading_state"
            className="divide-y divide-border"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
              <NotifSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="notifications.empty_state"
          >
            <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCheck className="w-6 h-6 text-success" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">
                You're all caught up
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeFilter === "all"
                  ? "No notifications yet"
                  : `No ${activeFilter} notifications`}
              </p>
            </div>
          </motion.div>
        )}

        {/* Notification rows */}
        {!isLoading && filtered.length > 0 && (
          <ScrollArea className="max-h-[65vh]">
            <AnimatePresence initial={false}>
              {filtered.map((notif, i) => (
                <div key={notif.id}>
                  <NotifRow
                    notif={notif}
                    index={i}
                    onRead={(id) => markRead.mutate(id)}
                    onDelete={(id) => deleteNotif.mutate(id)}
                    onNavigate={handleNavigate}
                  />
                  {i < filtered.length - 1 && <Separator />}
                </div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        )}
      </Card>

      {/* Stats footer */}
      {!isLoading && notifications.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Showing {filtered.length} of {notifications.length} notifications
          {filteredUnread > 0 && ` · ${filteredUnread} unread`}
        </p>
      )}
    </div>
  );
}
