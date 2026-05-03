import { c as createLucideIcon, a$ as useNavigate, r as reactExports, cE as useNotifications, cF as useMarkRead, cG as useMarkAllRead, cH as useDeleteNotification, cI as useTriggerSystemNotifications, j as jsxRuntimeExports, i as Button, ac as RefreshCw, f as cn, n as Card, y as motion, x as ScrollArea, A as AnimatePresence, b3 as Separator, $ as Skeleton, h as Badge, cJ as formatDistanceToNow, cK as Trash2, B as Bell, aC as TriangleAlert, a7 as FileText, b2 as ChartNoAxesColumn, T as TrendingUp, C as Clock, M as MessageCircle, cL as UserPlus } from "./index-DcPx_5wo.js";
import { T as Trophy } from "./trophy-SLj1qkKb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34", key: "z3du51" }],
  ["path", { d: "M4 6h.01", key: "oypzma" }],
  ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35", key: "qzzz0" }],
  ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67", key: "1yjesh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67", key: "1u2y91" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "m13.41 10.59 5.66-5.66", key: "mhq4k0" }]
];
const Radar = createLucideIcon("radar", __iconNode);
const TYPE_META = {
  new_lead: {
    icon: UserPlus,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    label: "Lead"
  },
  new_reply: {
    icon: MessageCircle,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    label: "Reply"
  },
  follow_up_due: {
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    label: "Follow-up"
  },
  upgrade_prompt: {
    icon: TrendingUp,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    label: "Upgrade"
  },
  system_alert: {
    icon: Bell,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "System"
  },
  weekly_report: {
    icon: ChartNoAxesColumn,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    label: "Report"
  },
  limit_reached: {
    icon: TriangleAlert,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    label: "Limit"
  },
  milestone_unlocked: {
    icon: Trophy,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    label: "Milestone"
  },
  case_study_ready: {
    icon: FileText,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    label: "Case Study"
  },
  competitor_alert: {
    icon: Radar,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Competitor"
  },
  // fallback for old types
  info: {
    icon: Bell,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Info"
  },
  success: {
    icon: CheckCheck,
    color: "text-success",
    bg: "bg-success/10",
    label: "Success"
  },
  warning: {
    icon: TriangleAlert,
    color: "text-warning",
    bg: "bg-warning/10",
    label: "Warning"
  },
  error: {
    icon: Bell,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Error"
  }
};
function getTypeMeta(type) {
  return TYPE_META[type] ?? TYPE_META.info;
}
const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "system", label: "System" },
  { key: "leads", label: "Leads" },
  { key: "upgrades", label: "Upgrades" }
];
function applyFilter(notifications, filter) {
  switch (filter) {
    case "unread":
      return notifications.filter((n) => !n.read);
    case "system":
      return notifications.filter(
        (n) => ["system_alert", "weekly_report", "limit_reached"].includes(n.type)
      );
    case "leads":
      return notifications.filter(
        (n) => ["new_lead", "new_reply", "follow_up_due"].includes(n.type)
      );
    case "upgrades":
      return notifications.filter(
        (n) => ["upgrade_prompt", "milestone_unlocked"].includes(n.type)
      );
    default:
      return notifications;
  }
}
function NotifSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/3" })
    ] })
  ] });
}
function NotifRow({
  notif,
  index,
  onRead,
  onDelete,
  onNavigate
}) {
  const meta = getTypeMeta(notif.type);
  const Icon = meta.icon;
  const handleClick = () => {
    if (!notif.read) onRead(notif.id);
    const link = notif.actionUrl ?? notif.link;
    if (link) onNavigate(link);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 8 },
      transition: { duration: 0.18, delay: index * 0.03 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "flex items-start gap-3 p-4 transition-colors duration-150 cursor-pointer group",
            !notif.read ? "bg-primary/[0.04] hover:bg-primary/[0.07]" : "hover:bg-muted/40"
          ),
          "data-ocid": `notifications.item.${index + 1}`,
          onClick: handleClick,
          onKeyDown: (e) => e.key === "Enter" && handleClick(),
          "aria-label": notif.title,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                  meta.bg
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", meta.color) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: cn(
                        "text-sm text-foreground leading-snug",
                        !notif.read ? "font-semibold" : "font-medium"
                      ),
                      children: notif.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: notif.body })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: cn(
                      "shrink-0 text-[9px] px-1.5 py-0.5 h-auto font-semibold border-0",
                      meta.bg,
                      meta.color
                    ),
                    children: meta.label
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground/70", children: formatDistanceToNow(new Date(notif.createdAt), {
                  addSuffix: true
                }) }),
                !notif.read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary shrink-0" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity",
                onClick: (e) => e.stopPropagation(),
                onKeyDown: (e) => {
                  e.stopPropagation();
                },
                children: [
                  !notif.read && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "w-7 h-7 text-muted-foreground hover:text-primary",
                      onClick: () => onRead(notif.id),
                      "aria-label": "Mark as read",
                      "data-ocid": `notifications.item.${index + 1}.mark_read`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "w-7 h-7 text-muted-foreground hover:text-destructive",
                      onClick: () => onDelete(notif.id),
                      "aria-label": "Delete notification",
                      "data-ocid": `notifications.item.${index + 1}.delete_button`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function NotificationCenterPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const {
    data: notifications = [],
    isLoading,
    refetch,
    isFetching
  } = useNotifications();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();
  const deleteNotif = useDeleteNotification();
  useTriggerSystemNotifications();
  const filtered = applyFilter(notifications, activeFilter);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredUnread = filtered.filter((n) => !n.read).length;
  const handleNavigate = (link) => {
    navigate({ to: link });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}` : "You're all caught up" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "h-8",
            onClick: () => refetch(),
            disabled: isFetching,
            "aria-label": "Refresh notifications",
            "data-ocid": "notifications.refresh_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: cn("w-3.5 h-3.5", isFetching && "animate-spin")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 hidden sm:inline", children: "Refresh" })
            ]
          }
        ),
        unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "h-8",
            onClick: () => markAllRead.mutate(),
            disabled: markAllRead.isPending,
            "data-ocid": "notifications.mark_all_read",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Mark all read"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center gap-1 p-1 bg-muted/50 rounded-xl border border-border w-fit",
        role: "tablist",
        "aria-label": "Notification filters",
        children: FILTER_TABS.map((tab) => {
          const count = tab.key === "unread" ? unreadCount : tab.key === "all" ? notifications.length : applyFilter(notifications, tab.key).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeFilter === tab.key,
              className: cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150",
                activeFilter === tab.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              ),
              onClick: () => setActiveFilter(tab.key),
              "data-ocid": `notifications.filter.${tab.key}`,
              children: [
                tab.label,
                count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-[10px] font-bold px-1.5 py-0 rounded-full",
                      activeFilter === tab.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    ),
                    children: count
                  }
                )
              ]
            },
            tab.key
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "notifications.loading_state",
          className: "divide-y divide-border",
          children: Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
            /* @__PURE__ */ jsxRuntimeExports.jsx(NotifSkeleton, {}, i)
          ))
        }
      ),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "flex flex-col items-center justify-center py-16 gap-3",
          "data-ocid": "notifications.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-success/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-6 h-6 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "You're all caught up" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: activeFilter === "all" ? "No notifications yet" : `No ${activeFilter} notifications` })
            ] })
          ]
        }
      ),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "max-h-[65vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: filtered.map((notif, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NotifRow,
          {
            notif,
            index: i,
            onRead: (id) => markRead.mutate(id),
            onDelete: (id) => deleteNotif.mutate(id),
            onNavigate: handleNavigate
          }
        ),
        i < filtered.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {})
      ] }, notif.id)) }) })
    ] }),
    !isLoading && notifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
      "Showing ",
      filtered.length,
      " of ",
      notifications.length,
      " notifications",
      filteredUnread > 0 && ` · ${filteredUnread} unread`
    ] })
  ] });
}
export {
  NotificationCenterPage as default
};
