import { be as useAutoAgency, r as reactExports, j as jsxRuntimeExports, y as motion, Z as Zap, b3 as Separator, A as AnimatePresence, n as Card, o as CardHeader, aw as CardTitle, i as Button, ac as RefreshCw, p as CardContent, a0 as CircleCheck, bE as useSubscription, bf as PaywallTrigger, E as ChevronUp, q as ChevronDown, h as Badge, a2 as Users, aa as Target, aU as Flame, bF as Circle, C as Clock, D as Send, b2 as ChartNoAxesColumn, ax as Lightbulb, T as TrendingUp } from "./index-DcPx_5wo.js";
function formatINR(val) {
  const n = Number(val);
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)}L`;
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
}
function relativeTime(nsBigint) {
  const ms = Number(nsBigint / BigInt(1e6));
  const diffMs = Date.now() - ms;
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
function formatTime(nsBigint) {
  const ms = Number(nsBigint / BigInt(1e6));
  return new Date(ms).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
const ACTION_META = {
  leadFound: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
    colorClass: "text-[oklch(var(--primary))] bg-[oklch(var(--primary)/0.1)]",
    label: "Lead Found"
  },
  outreachSent: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
    colorClass: "text-[oklch(var(--success))] bg-[oklch(var(--success)/0.1)]",
    label: "Outreach Sent"
  },
  followupSent: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
    colorClass: "text-[oklch(var(--warning))] bg-[oklch(var(--warning)/0.1)]",
    label: "Follow-up"
  },
  dealSuggested: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4" }),
    colorClass: "text-[oklch(var(--premium-accent))] bg-[oklch(var(--premium-accent)/0.1)]",
    label: "Deal Flagged"
  },
  reportGenerated: {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4" }),
    colorClass: "text-[oklch(var(--chart-5))] bg-[oklch(var(--chart-5)/0.1)]",
    label: "Report Ready"
  }
};
function closeProbColor(prob) {
  const n = Number(prob);
  if (n >= 85)
    return "bg-[oklch(var(--success)/0.15)] text-[oklch(var(--success))] border-[oklch(var(--success)/0.3)]";
  if (n >= 70)
    return "bg-[oklch(var(--warning)/0.15)] text-[oklch(var(--warning))] border-[oklch(var(--warning)/0.3)]";
  return "bg-[oklch(var(--primary)/0.12)] text-[oklch(var(--primary))] border-[oklch(var(--primary)/0.3)]";
}
const EFFORT_META = {
  quick: { label: "Quick Win", color: "text-[oklch(var(--success))]" },
  medium: { label: "Medium", color: "text-[oklch(var(--warning))]" },
  deep: { label: "Deep Work", color: "text-[oklch(var(--primary))]" }
};
const COACH_TYPE_META = {
  revenueTactic: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }), badge: "Revenue" },
  nicheTargeting: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4" }), badge: "Niche" },
  growthHack: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4" }), badge: "Growth" }
};
function Section({
  title,
  subtitle,
  children,
  collapsible = false,
  ocid,
  rightSlot
}) {
  const [open, setOpen] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.3 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border/40 shadow-subtle", "data-ocid": ocid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
            title && /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-bold text-foreground", children: title }),
            subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            rightSlot,
            collapsible && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setOpen((v) => !v),
                "data-ocid": `${ocid}.collapse_button`,
                "aria-expanded": open,
                className: "w-7 h-7 rounded-lg bg-muted/40 hover:bg-muted flex items-center justify-center transition-colors",
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            style: { overflow: "hidden" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-0 px-4 pb-4", children })
          },
          "content"
        ) })
      ] })
    }
  );
}
function AgencyToggle({
  enabled,
  toggling,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center justify-between gap-4",
      "data-ocid": "agency.toggle_row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Auto Agency Mode" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Runs daily: finds leads, sends outreach, follows up" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            role: "switch",
            "aria-checked": enabled,
            "data-ocid": "agency.toggle",
            onClick: () => !toggling && onToggle(!enabled),
            className: `relative shrink-0 h-7 w-12 rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${enabled ? "bg-[oklch(var(--success))] border-[oklch(var(--success)/0.6)]" : "bg-muted border-border"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                layout: true,
                transition: { type: "spring", stiffness: 500, damping: 35 },
                className: `absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-elevated flex items-center justify-center ${enabled ? "left-[calc(100%-22px)]" : "left-0.5"}`,
                children: toggling && /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-2.5 h-2.5 text-muted-foreground animate-spin" })
              }
            )
          }
        )
      ]
    }
  );
}
function StatusBanner({
  enabled,
  runCount,
  lastRunTime
}) {
  if (!enabled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/40 border border-border/40",
        "data-ocid": "agency.status_banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-muted-foreground/30 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Agency Paused — toggle ON to start automation" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      className: "agency-mode-banner",
      "data-ocid": "agency.status_banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "agency-mode-indicator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Agency Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            Number(runCount),
            " runs · Last at ",
            formatTime(lastRunTime)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[oklch(var(--success)/0.15)] text-[oklch(var(--success))] border-[oklch(var(--success)/0.3)] text-xs font-bold", children: "LIVE" })
      ]
    },
    "active-banner"
  );
}
function MiniKPIRow({
  leadsGenerated,
  outreachSent,
  followupsSent,
  runCount
}) {
  const kpis = [
    {
      label: "Leads",
      value: Number(leadsGenerated),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }),
      color: "text-[oklch(var(--primary))]"
    },
    {
      label: "Outreach",
      value: Number(outreachSent),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
      color: "text-[oklch(var(--success))]"
    },
    {
      label: "Follow-ups",
      value: Number(followupsSent),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
      color: "text-[oklch(var(--warning))]"
    },
    {
      label: "Runs",
      value: Number(runCount),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
      color: "text-[oklch(var(--premium-accent))]"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", "data-ocid": "agency.kpi_row", children: kpis.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center gap-1 py-3 rounded-xl bg-card border border-border/30 shadow-xs",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${k.color} flex items-center`, children: k.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground counter-number", children: k.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: k.label })
      ]
    },
    k.label
  )) });
}
function ActivityFeed({ feed }) {
  if (feed.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-10",
        "data-ocid": "agency.activity.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "No activity yet. Enable Auto Agency Mode to start." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col gap-0 max-h-72 overflow-y-auto scrollbar-thin",
      "data-ocid": "agency.activity.list",
      children: feed.slice(0, 20).map((item, i) => {
        const meta = ACTION_META[item.actionType];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.04 },
            className: "flex gap-3 py-3 border-b border-border/20 last:border-0",
            "data-ocid": `agency.activity.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${meta.colorClass}`,
                  children: meta.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground truncate", children: item.leadName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: relativeTime(item.timestamp) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-truncate-2", children: item.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-[oklch(var(--success))] mt-0.5", children: item.outcome })
              ] })
            ]
          },
          item.actionId
        );
      })
    }
  );
}
function DealSuggestionsPanel({
  deals,
  isRefreshing,
  onRefresh,
  onSendPitch,
  sentId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
        "Top ",
        Math.min(deals.length, 5),
        " suggestions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onRefresh,
          "data-ocid": "agency.deals.refresh_button",
          disabled: isRefreshing,
          className: "flex items-center gap-1.5 text-xs font-semibold text-[oklch(var(--primary))] hover:opacity-80 transition-opacity disabled:opacity-50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`
              }
            ),
            isRefreshing ? "Refreshing…" : "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "agency.deals.list", children: deals.slice(0, 5).map((deal, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.06 },
        className: "rounded-xl border border-border/30 bg-muted/20 p-4",
        "data-ocid": `agency.deals.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-3 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `deal-score-badge text-xs border ${closeProbColor(deal.closeProbability)}`,
                  children: [
                    Number(deal.closeProbability),
                    "% Close"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] font-semibold capitalize",
                  children: deal.pricingTier
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: formatINR(deal.suggestedPrice) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2 text-truncate-3 italic leading-relaxed", children: [
            '"',
            deal.suggestedPitch,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3 text-[11px] text-muted-foreground font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 shrink-0" }),
            "Best time: ",
            deal.bestContactTime
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "w-full h-8 text-xs font-semibold",
              "data-ocid": `agency.deals.send_pitch.${i + 1}`,
              onClick: () => onSendPitch(deal.suggestionId),
              variant: sentId === deal.suggestionId ? "outline" : "default",
              children: sentId === deal.suggestionId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1.5 text-[oklch(var(--success))]" }),
                "Pitch Sent!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Send Pitch"
              ] })
            }
          )
        ]
      },
      deal.suggestionId
    )) })
  ] });
}
function AccountabilityCard({
  daily,
  target,
  streak,
  todayComplete
}) {
  const tasks = [
    {
      label: "Contact leads",
      done: Number(daily.leads),
      total: Number(target.leads),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" })
    },
    {
      label: "Follow up leads",
      done: Number(daily.followups),
      total: Number(target.followups),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
    },
    {
      label: "Close a deal",
      done: Number(daily.deals),
      total: Number(target.deals),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3.5 h-3.5" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "agency.accountability_card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Today's Tasks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "streak-badge text-xs py-1 px-2 gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          Number(streak),
          " day streak"
        ] })
      ] })
    ] }),
    todayComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-[oklch(var(--success)/0.1)] border border-[oklch(var(--success)/0.3)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-[oklch(var(--success))]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-[oklch(var(--success))]", children: "All tasks complete today! 🎉" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: tasks.map((t, i) => {
      const isComplete = t.done >= t.total;
      const pct = Math.min(100, t.done / t.total * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "accountability-task",
          "data-ocid": `agency.task.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `accountability-checkbox ${isComplete ? "completed" : ""}`,
                children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-card" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-3 h-3 text-muted-foreground/50" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accountability-text text-xs", children: t.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold text-foreground", children: [
                  t.done,
                  "/",
                  t.total
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "progress-bar-fill",
                  style: { width: `${pct}%` }
                }
              ) })
            ] })
          ]
        },
        t.label
      );
    }) })
  ] });
}
function AutomationSettings({ enabled }) {
  const [freq, setFreq] = reactExports.useState("daily");
  const [threshold, setThreshold] = reactExports.useState(70);
  const [autoOutreach, setAutoOutreach] = reactExports.useState(true);
  const [autoFollowup, setAutoFollowup] = reactExports.useState(true);
  const [reportGen, setReportGen] = reactExports.useState(true);
  function ToggleRow({
    label,
    desc,
    checked,
    onToggle,
    ocid
  }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 py-3 border-b border-border/20 last:border-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-muted-foreground", children: desc })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "data-ocid": ocid,
          onClick: onToggle,
          disabled: !enabled,
          className: `relative shrink-0 h-6 w-10 rounded-full border transition-all duration-200 disabled:opacity-40 ${checked ? "bg-[oklch(var(--primary))] border-[oklch(var(--primary)/0.5)]" : "bg-muted border-border"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-0.5 h-4 w-4 rounded-full bg-card shadow-sm transition-all duration-200 ${checked ? "left-[calc(100%-18px)]" : "left-0.5"}`
            }
          )
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "agency.settings_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Run Frequency" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["daily", "twice"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => enabled && setFreq(f),
          disabled: !enabled,
          "data-ocid": `agency.settings.freq.${f}`,
          className: `flex-1 h-9 rounded-lg text-xs font-semibold border transition-all duration-200 disabled:opacity-40 ${freq === f ? "bg-[oklch(var(--primary)/0.12)] border-[oklch(var(--primary)/0.4)] text-[oklch(var(--primary))]" : "bg-card border-border text-muted-foreground"}`,
          children: f === "daily" ? "Daily" : "Twice Daily"
        },
        f
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Min Lead Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [60, 70, 80].map((score) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => enabled && setThreshold(score),
          disabled: !enabled,
          "data-ocid": `agency.settings.threshold.${score}`,
          className: `flex-1 h-9 rounded-lg text-xs font-semibold border transition-all duration-200 disabled:opacity-40 ${threshold === score ? "bg-[oklch(var(--primary)/0.12)] border-[oklch(var(--primary)/0.4)] text-[oklch(var(--primary))]" : "bg-card border-border text-muted-foreground"}`,
          children: [
            score,
            "+"
          ]
        },
        score
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToggleRow,
      {
        label: "Auto Outreach",
        desc: "Send first pitch automatically",
        checked: autoOutreach,
        onToggle: () => setAutoOutreach((v) => !v),
        ocid: "agency.settings.auto_outreach"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToggleRow,
      {
        label: "Auto Follow-up",
        desc: "Follow up unreplied leads after 48h",
        checked: autoFollowup,
        onToggle: () => setAutoFollowup((v) => !v),
        ocid: "agency.settings.auto_followup"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ToggleRow,
      {
        label: "Report Generation",
        desc: "Auto-generate monthly client reports",
        checked: reportGen,
        onToggle: () => setReportGen((v) => !v),
        ocid: "agency.settings.report_gen"
      }
    )
  ] });
}
function CoachSuggestionsSection({
  suggestions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col gap-3",
      "data-ocid": "agency.coach_suggestions.list",
      children: suggestions.slice(0, 4).map((s, i) => {
        const typeMeta = COACH_TYPE_META[s.type];
        const effortMeta = EFFORT_META[s.effort];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            className: "rounded-xl border border-border/30 bg-muted/20 p-4",
            "data-ocid": `agency.coach_suggestions.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 w-8 h-8 rounded-lg bg-[oklch(var(--primary)/0.08)] flex items-center justify-center text-[oklch(var(--primary))]", children: typeMeta.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] font-semibold",
                        children: typeMeta.badge
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] font-semibold ${effortMeta.color}`,
                        children: effortMeta.label
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: s.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-truncate-2", children: s.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-[oklch(var(--success))] mt-1.5", children: s.expectedROI })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full mt-3 h-8 text-xs font-semibold",
                  "data-ocid": `agency.coach_suggestions.action.${i + 1}`,
                  children: s.actionLabel
                }
              )
            ]
          },
          s.id
        );
      })
    }
  );
}
function PlanGate({ children }) {
  const { data: sub } = useSubscription();
  const plan = String((sub == null ? void 0 : sub.plan) ?? "free").toLowerCase();
  const tiers = {
    free: 0,
    starter: 1,
    growth: 2,
    pro: 3,
    agency: 4
  };
  const tier = tiers[plan] ?? 0;
  if (tier >= 3) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "auto-follow-up", requiredPlan: "pro", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none select-none", children }) });
}
function AutoAgencyPage() {
  const {
    agencyState,
    accountabilityState,
    dealSuggestions,
    isAutoAgencyEnabled,
    toggleAutoAgency,
    isToggling,
    runAgencyCycle,
    isRunning,
    refreshDealSuggestions,
    coachSuggestions
  } = useAutoAgency();
  const [pitchSentId, setPitchSentId] = reactExports.useState(null);
  function handleSendPitch(id) {
    setPitchSentId(id);
    setTimeout(() => setPitchSentId(null), 2500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlanGate, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: "hidden",
      animate: "show",
      variants: {
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } }
      },
      className: "flex flex-col gap-4 px-4 pt-4 pb-6 mobile-safe-content",
      "data-ocid": "auto_agency.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "flex flex-col gap-0.5",
            "data-ocid": "auto_agency.header",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-[oklch(var(--primary)/0.12)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-[oklch(var(--primary))]" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground", children: "Auto Agency Mode" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-10", children: "Your AI-powered marketing assistant" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "", ocid: "agency.control_section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AgencyToggle,
            {
              enabled: isAutoAgencyEnabled,
              toggling: isToggling,
              onToggle: toggleAutoAgency
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3 opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatusBanner,
            {
              enabled: isAutoAgencyEnabled,
              runCount: agencyState.runCount,
              lastRunTime: agencyState.lastRunTime
            },
            isAutoAgencyEnabled ? "on" : "off"
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isAutoAgencyEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.25 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MiniKPIRow,
              {
                leadsGenerated: agencyState.dailyLeadsGenerated,
                outreachSent: agencyState.dailyOutreachSent,
                followupsSent: agencyState.dailyFollowupsSent,
                runCount: agencyState.runCount
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isAutoAgencyEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "border-[oklch(var(--success)/0.2)] bg-card shadow-subtle",
                "data-ocid": "agency.status_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-bold", children: "Agency Running" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        className: "h-7 px-3 text-xs font-semibold",
                        onClick: runAgencyCycle,
                        disabled: isRunning,
                        "data-ocid": "agency.run_now_button",
                        children: isRunning ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 mr-1.5 animate-spin" }),
                          "Running…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 mr-1.5" }),
                          "Run Now"
                        ] })
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-semibold uppercase tracking-wide", children: "Last Run" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: relativeTime(agencyState.lastRunTime) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-semibold uppercase tracking-wide", children: "Next Run" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: relativeTime(agencyState.nextRunTime) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 px-3 py-2 rounded-lg bg-[oklch(var(--success)/0.06)] border border-[oklch(var(--success)/0.15)] text-xs text-muted-foreground font-medium leading-relaxed", children: "Your agency is running in the background — leads contacted, replies waiting, deals ready to close." })
                  ] })
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            title: "Daily Accountability",
            subtitle: "Stay consistent to grow faster",
            ocid: "agency.accountability_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AccountabilityCard,
              {
                daily: {
                  leads: accountabilityState.dailyLeadsContacted,
                  followups: accountabilityState.dailyFollowupsDone,
                  deals: accountabilityState.dailyDealsClosed
                },
                target: {
                  leads: accountabilityState.targetLeads,
                  followups: accountabilityState.targetFollowups,
                  deals: accountabilityState.targetDeals
                },
                streak: accountabilityState.currentStreak,
                todayComplete: accountabilityState.todayComplete
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            title: "Deal Suggestions",
            subtitle: "Highest probability deals to close today",
            ocid: "agency.deals_section",
            rightSlot: pitchSentId != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-[oklch(var(--success))] flex items-center gap-1 checkmark", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
              " Sent!"
            ] }) : void 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DealSuggestionsPanel,
              {
                deals: dealSuggestions,
                isRefreshing: false,
                onRefresh: refreshDealSuggestions,
                onSendPitch: handleSendPitch,
                sentId: pitchSentId
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            title: "Activity Feed",
            subtitle: "What your agency did today",
            ocid: "agency.activity_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityFeed, { feed: agencyState.lastActivityFeed })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            title: "AI Business Coach",
            subtitle: "Daily tactics to grow your agency faster",
            ocid: "agency.coach_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoachSuggestionsSection, { suggestions: coachSuggestions })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Section,
          {
            title: "Automation Settings",
            subtitle: "Configure how the agency runs",
            collapsible: true,
            ocid: "agency.automation_settings_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutomationSettings, { enabled: isAutoAgencyEnabled })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.5 },
            className: "text-[11px] text-center text-muted-foreground px-4",
            children: "All outreach is consent-based and rate-limited. GrowthOS never spams."
          }
        )
      ]
    }
  ) });
}
export {
  AutoAgencyPage as default
};
