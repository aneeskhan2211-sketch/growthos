import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, a as Button, a4 as Plus, ag as ChevronRight, Z as Zap, aG as Play, U as Users, D as CircleCheck, B as Badge, W as Sparkles, at as TriangleAlert, bG as ChartNoAxesColumn, H as MessageSquare, aj as Card, _ as RefreshCw, bI as Table, bJ as TableHeader, bK as TableRow, bL as TableHead, bM as TableBody, bN as TableCell, bA as TrendingDown, K as FileText, aF as Pause, X, ab as Select, ac as SelectTrigger, ad as SelectValue, ae as SelectContent, af as SelectItem, bO as Funnel, bP as Layers, bQ as Bell, bR as Briefcase, i as Mail, o as Clock, aI as Switch } from "./index-C-gts07u.js";
import { P as PageHeader } from "./PageHeader-Du6c9ARZ.js";
import { T as Target } from "./target-D_AhRlrf.js";
import { B as Bot, P as PenLine } from "./pen-line-C5Fbc1L4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m2 9 3-3 3 3", key: "1ltn5i" }],
  ["path", { d: "M13 18H7a2 2 0 0 1-2-2V6", key: "1r6tfw" }],
  ["path", { d: "m22 15-3 3-3-3", key: "4rnwn2" }],
  ["path", { d: "M11 6h6a2 2 0 0 1 2 2v10", key: "2f72bc" }]
];
const Repeat2 = createLucideIcon("repeat-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
const TRIGGER_OPTIONS = [
  { value: "new_lead", label: "New Lead Added" },
  { value: "proposal_viewed", label: "Proposal Viewed" },
  { value: "lead_replied", label: "Lead Replied" },
  { value: "scheduled", label: "Scheduled Time" },
  { value: "traffic_drop", label: "Traffic Drop" }
];
const CONDITION_OPTIONS = [
  { value: "score_70", label: "Lead Score > 70" },
  { value: "city_mumbai", label: "City = Mumbai" },
  { value: "industry_restaurant", label: "Industry = Restaurant" },
  { value: "none", label: "No condition (always run)" }
];
const ACTION_OPTIONS = [
  {
    value: "whatsapp",
    label: "Send WhatsApp",
    config: "Template: Welcome message"
  },
  {
    value: "email",
    label: "Send Email",
    config: "Subject: Quick idea for you"
  },
  { value: "crm", label: "Update CRM Stage", config: "Stage: Contacted" },
  { value: "task", label: "Create Task", config: "Assign to: Me" },
  { value: "wait", label: "Wait X Days", config: "Duration: 24 hours" },
  { value: "notify", label: "Send Notification", config: "Alert user in-app" }
];
const ACTION_ICONS = {
  whatsapp: MessageSquare,
  email: Mail,
  crm: Target,
  task: Briefcase,
  wait: Timer,
  notify: Bell
};
const ACTION_COLORS = {
  whatsapp: "bg-success/10 text-success",
  email: "bg-primary/10 text-primary",
  crm: "bg-chart-5/10 text-chart-5",
  task: "bg-warning/10 text-warning",
  wait: "bg-muted text-muted-foreground",
  notify: "bg-chart-4/10 text-chart-4"
};
const CATEGORY_COLORS = {
  outreach: "bg-primary/10 text-primary",
  followup: "bg-warning/10 text-warning",
  reporting: "bg-success/10 text-success",
  crm: "bg-chart-5/10 text-chart-5",
  alert: "bg-destructive/10 text-destructive"
};
const CATEGORY_ICONS = {
  outreach: MessageSquare,
  followup: Repeat2,
  reporting: ChartNoAxesColumn,
  crm: Target,
  alert: TriangleAlert
};
const AUTOMATIONS = [
  {
    id: "a1",
    name: "New Lead Welcome Sequence",
    trigger: "New Lead Added",
    triggerDetail: "Fires when a new lead with score > 60 is imported or captured",
    category: "outreach",
    status: "active",
    lastRun: "12 min ago",
    runsToday: 14,
    totalRuns: 312,
    successRate: 96,
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send WhatsApp",
        config: "Template: Welcome pitch"
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 24h",
        config: "Duration: 24 hours"
      },
      {
        id: "x3",
        type: "email",
        label: "Send Email",
        config: "Subject: Quick idea for your business"
      },
      {
        id: "x4",
        type: "crm",
        label: "Add to CRM",
        config: "Stage: Contacted"
      }
    ]
  },
  {
    id: "a2",
    name: "Follow-up Sequence",
    trigger: "No Reply After 48h",
    triggerDetail: "Fires 48 hours after first contact with no reply detected",
    category: "followup",
    status: "active",
    lastRun: "2 hrs ago",
    runsToday: 28,
    totalRuns: 1087,
    successRate: 88,
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send Reminder",
        config: "Template: Follow-up #2"
      },
      {
        id: "x2",
        type: "crm",
        label: "Update CRM",
        config: "Stage: Follow-up Sent"
      }
    ]
  },
  {
    id: "a3",
    name: "Proposal Follow-up",
    trigger: "Proposal Viewed",
    triggerDetail: "Fires when the prospect opens the proposal link",
    category: "outreach",
    status: "active",
    lastRun: "45 min ago",
    runsToday: 5,
    totalRuns: 89,
    successRate: 92,
    actions: [
      {
        id: "x1",
        type: "notify",
        label: "Alert User",
        config: "Prospect just viewed your proposal!"
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 24h",
        config: "Duration: 24 hours"
      },
      {
        id: "x3",
        type: "whatsapp",
        label: "Send Follow-up",
        config: "Template: Proposal check-in"
      }
    ]
  },
  {
    id: "a4",
    name: "Monthly Report Generator",
    trigger: "Scheduled: 1st of Month",
    triggerDetail: "Runs automatically on the 1st at 9:00 AM IST every month",
    category: "reporting",
    status: "active",
    lastRun: "Apr 1, 2026",
    runsToday: 0,
    totalRuns: 54,
    successRate: 100,
    actions: [
      {
        id: "x1",
        type: "task",
        label: "Generate Report",
        config: "Auto-build monthly growth PDF"
      },
      {
        id: "x2",
        type: "email",
        label: "Send to Client",
        config: "Attach report + summary"
      }
    ]
  },
  {
    id: "a5",
    name: "At-Risk Client Alert",
    trigger: "Traffic Drop > 20%",
    triggerDetail: "Fires when a client's website traffic drops more than 20% week-over-week",
    category: "alert",
    status: "paused",
    lastRun: "3 days ago",
    runsToday: 0,
    totalRuns: 18,
    successRate: 100,
    actions: [
      {
        id: "x1",
        type: "notify",
        label: "Alert User",
        config: "Client traffic dropped — act now"
      },
      {
        id: "x2",
        type: "task",
        label: "Create Action Plan",
        config: "Auto-generate recovery checklist"
      }
    ]
  }
];
const EXEC_HISTORY = [
  {
    id: "r1",
    automation: "New Lead Welcome Sequence",
    trigger: "New lead: Sharma Salon, Pune",
    timestamp: "Today, 10:42 AM",
    leadsAffected: 1,
    status: "Success"
  },
  {
    id: "r2",
    automation: "Follow-up Sequence",
    trigger: "No reply: 28 leads",
    timestamp: "Today, 10:15 AM",
    leadsAffected: 28,
    status: "Success"
  },
  {
    id: "r3",
    automation: "Proposal Follow-up",
    trigger: "Proposal viewed: Nair Fitness",
    timestamp: "Today, 09:57 AM",
    leadsAffected: 1,
    status: "Success"
  },
  {
    id: "r4",
    automation: "New Lead Welcome Sequence",
    trigger: "New lead: Delhi Gym Co.",
    timestamp: "Today, 09:30 AM",
    leadsAffected: 1,
    status: "Partial"
  },
  {
    id: "r5",
    automation: "Follow-up Sequence",
    trigger: "No reply: 14 leads",
    timestamp: "Today, 08:00 AM",
    leadsAffected: 14,
    status: "Success"
  },
  {
    id: "r6",
    automation: "At-Risk Client Alert",
    trigger: "Traffic drop: FreshJuice Mumbai",
    timestamp: "Yesterday, 6:00 PM",
    leadsAffected: 1,
    status: "Failed"
  },
  {
    id: "r7",
    automation: "Proposal Follow-up",
    trigger: "Proposal viewed: Apex Tech",
    timestamp: "Yesterday, 3:22 PM",
    leadsAffected: 1,
    status: "Success"
  },
  {
    id: "r8",
    automation: "Monthly Report Generator",
    trigger: "Scheduled trigger: Apr 1",
    timestamp: "Apr 1, 9:00 AM",
    leadsAffected: 12,
    status: "Success"
  },
  {
    id: "r9",
    automation: "New Lead Welcome Sequence",
    trigger: "New lead: Luxe Salon, Jaipur",
    timestamp: "Apr 29, 11:15 AM",
    leadsAffected: 1,
    status: "Success"
  },
  {
    id: "r10",
    automation: "Follow-up Sequence",
    trigger: "No reply: 7 leads",
    timestamp: "Apr 29, 8:00 AM",
    leadsAffected: 7,
    status: "Success"
  }
];
const TEMPLATES = [
  {
    id: "t1",
    name: "Lead Nurture",
    steps: 5,
    useCase: "Warm up new leads with a multi-touch sequence over 7 days",
    category: "outreach",
    trigger: "New Lead Added",
    triggerDetail: "Fires when a new lead score > 60 is added",
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send WhatsApp",
        config: "Template: Welcome pitch"
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 24h",
        config: "Duration: 24 hours"
      },
      {
        id: "x3",
        type: "email",
        label: "Send Email",
        config: "Subject: Free audit for you"
      },
      {
        id: "x4",
        type: "wait",
        label: "Wait 3 days",
        config: "Duration: 72 hours"
      },
      { id: "x5", type: "crm", label: "Update CRM", config: "Stage: Nurtured" }
    ]
  },
  {
    id: "t2",
    name: "Client Onboarding",
    steps: 3,
    useCase: "Automatically onboard new clients with a welcome sequence",
    category: "crm",
    trigger: "CRM Stage = Closed",
    triggerDetail: "Fires when a deal moves to Closed Won",
    actions: [
      {
        id: "x1",
        type: "email",
        label: "Send Welcome Email",
        config: "Subject: Welcome to GrowthOS!"
      },
      {
        id: "x2",
        type: "task",
        label: "Create Onboarding Task",
        config: "Assign kickoff call"
      },
      {
        id: "x3",
        type: "notify",
        label: "Alert User",
        config: "New client onboarded!"
      }
    ]
  },
  {
    id: "t3",
    name: "Monthly Reporting",
    steps: 2,
    useCase: "Auto-generate and email growth reports on the 1st of each month",
    category: "reporting",
    trigger: "Scheduled: 1st of Month",
    triggerDetail: "Scheduled on 1st of every month at 9 AM",
    actions: [
      {
        id: "x1",
        type: "task",
        label: "Generate Report",
        config: "Build monthly growth PDF"
      },
      {
        id: "x2",
        type: "email",
        label: "Send to Client",
        config: "Attach report + summary"
      }
    ]
  },
  {
    id: "t4",
    name: "Follow-up Sequence",
    steps: 4,
    useCase: "Re-engage leads that haven't responded to your first outreach",
    category: "followup",
    trigger: "No Reply After 48h",
    triggerDetail: "48 hours after first contact",
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send Reminder #1",
        config: "Template: Follow-up #2"
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 3 days",
        config: "Duration: 72 hours"
      },
      {
        id: "x3",
        type: "whatsapp",
        label: "Send Final Reminder",
        config: "Template: Last follow-up"
      },
      {
        id: "x4",
        type: "crm",
        label: "Update CRM",
        config: "Stage: No Response"
      }
    ]
  },
  {
    id: "t5",
    name: "Cold Lead Reactivation",
    steps: 3,
    useCase: "Re-engage leads that went cold after 14+ days of no activity",
    category: "followup",
    trigger: "Lead Inactive 14 Days",
    triggerDetail: "Fires after 14 days of no lead activity",
    actions: [
      {
        id: "x1",
        type: "email",
        label: "Send Reactivation Email",
        config: "Subject: Still interested?"
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 2 days",
        config: "Duration: 48 hours"
      },
      {
        id: "x3",
        type: "crm",
        label: "Tag Lead",
        config: "Tag: Cold — Re-engage"
      }
    ]
  }
];
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.35 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-4 flex items-center gap-3 hover-lift",
          "data-ocid": `automation.stat.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color.replace("text-", "bg-").replace(/text-\S+/, "")} bg-opacity-10`,
                style: { background: "var(--icon-bg, oklch(var(--primary)/0.1))" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4.5 h-4.5 ${color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-bold tabular-nums font-display ${color}`, children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none mt-0.5", children: label })
            ] })
          ]
        }
      )
    }
  );
}
function ActionBlockItem({
  block,
  index,
  onRemove
}) {
  const Icon = ACTION_ICONS[block.type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 8 },
      transition: { duration: 0.22 },
      className: "flex flex-col items-center",
      children: [
        index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-border flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border w-full ${ACTION_COLORS[block.type]} bg-opacity-10 relative group`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ACTION_COLORS[block.type]}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: block.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: block.config })
              ] }),
              onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onRemove(block.id),
                  className: "opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0",
                  "aria-label": `Remove ${block.label}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function AutomationCard({
  automation,
  index,
  onToggle,
  onEdit
}) {
  const CatIcon = CATEGORY_ICONS[automation.category];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      variants: {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      },
      transition: { duration: 0.3 },
      "data-ocid": `automation.flow.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 hover-lift transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${CATEGORY_COLORS[automation.category]}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "w-4.5 h-4.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: automation.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-[10px] px-1.5 py-0 h-4 capitalize border-0 ${CATEGORY_COLORS[automation.category]}`,
                children: automation.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${automation.status === "active" ? "status-active" : "status-paused"}`,
                children: automation.status === "active" ? "Active" : "Paused"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: automation.trigger })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 flex-wrap mb-2.5", children: automation.actions.map((a) => {
            const AIcon = ACTION_ICONS[a.type];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md ${ACTION_COLORS[a.type]}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AIcon, { className: "w-2.5 h-2.5" }),
                  a.label
                ]
              },
              a.id
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }),
              automation.runsToday,
              " runs today"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-success font-medium", children: [
              automation.successRate,
              "% success"
            ] }),
            automation.lastRun && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              automation.lastRun
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 ml-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "w-7 h-7 text-muted-foreground hover:text-foreground",
              "aria-label": `Edit ${automation.name}`,
              onClick: () => onEdit(automation),
              "data-ocid": `automation.flow.edit.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              checked: automation.status === "active",
              onCheckedChange: () => onToggle(automation.id),
              "aria-label": `Toggle ${automation.name}`,
              "data-ocid": `automation.flow.toggle.${index + 1}`
            }
          )
        ] })
      ] }) })
    }
  );
}
function WorkflowBuilderPanel({
  onClose,
  initialData
}) {
  const [state, setState] = reactExports.useState({
    name: (initialData == null ? void 0 : initialData.name) ?? "My New Workflow",
    trigger: initialData ? initialData.trigger : "new_lead",
    condition: "score_70",
    actions: (initialData == null ? void 0 : initialData.actions) ?? [
      {
        id: "b1",
        type: "whatsapp",
        label: "Send WhatsApp",
        config: "Template: Welcome message"
      }
    ]
  });
  const addAction = (opt) => {
    setState((prev) => ({
      ...prev,
      actions: [
        ...prev.actions,
        {
          id: `b${Date.now()}`,
          type: opt.value,
          label: opt.label,
          config: opt.config
        }
      ]
    }));
  };
  const removeAction = (id) => {
    setState((prev) => ({
      ...prev,
      actions: prev.actions.filter((a) => a.id !== id)
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 40 },
      transition: { duration: 0.3 },
      className: "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card border-l border-border shadow-premium flex flex-col",
      "data-ocid": "automation.builder.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display", children: initialData ? "Edit Workflow" : "New Workflow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Configure trigger, condition, and actions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: onClose,
              className: "w-8 h-8",
              "data-ocid": "automation.builder.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "workflow-name",
                className: "text-xs font-medium text-muted-foreground block mb-1.5",
                children: "Workflow Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "workflow-name",
                type: "text",
                value: state.name,
                onChange: (e) => setState((p) => ({ ...p, name: e.target.value })),
                className: "w-full h-9 px-3 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                "data-ocid": "automation.builder.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3 text-primary" }),
              "TRIGGER"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-primary/30 bg-primary/5 rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "When this happens…" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: state.trigger,
                  onValueChange: (v) => setState((p) => ({ ...p, trigger: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 text-xs",
                        "data-ocid": "automation.builder.trigger_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TRIGGER_OPTIONS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t.value, className: "text-xs", children: t.label }, t.value)) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3 h-3 text-warning" }),
              "CONDITION (optional)"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-warning/30 bg-warning/5 rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3.5 h-3.5 text-warning" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Only if…" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: state.condition,
                  onValueChange: (v) => setState((p) => ({ ...p, condition: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-8 text-xs",
                        "data-ocid": "automation.builder.condition_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CONDITION_OPTIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, className: "text-xs", children: c.label }, c.value)) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3 h-3 text-success" }),
              "ACTIONS"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: state.actions.map((block, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionBlockItem,
              {
                block,
                index: i,
                onRemove: state.actions.length > 1 ? removeAction : void 0
              },
              block.id
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border mx-auto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-dashed border-border rounded-xl p-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center mb-2", children: "Add action" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: ACTION_OPTIONS.map((opt) => {
                  const Icon = ACTION_ICONS[opt.value];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => addAction(opt),
                      className: `flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-[10px] font-medium transition-fast hover:opacity-80 ${ACTION_COLORS[opt.value]}`,
                      "data-ocid": `automation.builder.add_action.${opt.value}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                        opt.label
                      ]
                    },
                    opt.value
                  );
                }) })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t border-border flex gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "flex-1 text-xs h-9",
              onClick: onClose,
              "data-ocid": "automation.builder.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "flex-1 btn-primary-glow text-xs h-9",
              onClick: onClose,
              "data-ocid": "automation.builder.save_button",
              children: "Save Workflow"
            }
          )
        ] })
      ]
    }
  );
}
function AutomationPage() {
  const [automations, setAutomations] = reactExports.useState(AUTOMATIONS);
  const [builderOpen, setBuilderOpen] = reactExports.useState(false);
  const [editTarget, setEditTarget] = reactExports.useState(
    void 0
  );
  const toggleAutomation = (id) => setAutomations(
    (prev) => prev.map(
      (a) => a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a
    )
  );
  const openNew = () => {
    setEditTarget(void 0);
    setBuilderOpen(true);
  };
  const openEdit = (a) => {
    setEditTarget(a);
    setBuilderOpen(true);
  };
  const closeBuilder = () => {
    setBuilderOpen(false);
    setEditTarget(void 0);
  };
  const applyTemplate = (t) => {
    setEditTarget({
      id: `new-${t.id}`,
      name: t.name,
      trigger: t.trigger,
      triggerDetail: t.triggerDetail,
      category: t.category,
      actions: t.actions,
      status: "paused",
      lastRun: "Never",
      runsToday: 0,
      totalRuns: 0,
      successRate: 0
    });
    setBuilderOpen(true);
  };
  const activeCount = automations.filter((a) => a.status === "active").length;
  const runsToday = automations.reduce((s, a) => s + a.runsToday, 0);
  const leadsContacted = 89;
  const avgSuccess = Math.round(
    automations.reduce((s, a) => s + a.successRate, 0) / automations.length
  );
  const runStatusColors = {
    Success: "status-active",
    Failed: "status-error",
    Partial: "status-paused"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "automation.page", className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: builderOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 bg-background/60 backdrop-blur-sm z-40",
          onClick: closeBuilder,
          "data-ocid": "automation.builder.overlay"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        WorkflowBuilderPanel,
        {
          onClose: closeBuilder,
          initialData: editTarget
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Automation",
        description: "Set it once, grow continuously",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            className: "btn-primary-glow",
            onClick: openNew,
            "data-ocid": "automation.new_workflow_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
              "New Workflow"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-6",
        "aria-label": "breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GrowthOS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Automation" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
      {
        label: "Active Automations",
        value: activeCount,
        icon: Zap,
        color: "text-primary"
      },
      {
        label: "Runs Today",
        value: runsToday,
        icon: Play,
        color: "text-success"
      },
      {
        label: "Leads Contacted",
        value: leadsContacted,
        icon: Users,
        color: "text-chart-5"
      },
      {
        label: "Success Rate",
        value: `${avgSuccess}%`,
        icon: CircleCheck,
        color: "text-success"
      }
    ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s, index: i }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", "data-ocid": "automation.flows.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground font-display", children: "Active Automations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
          automations.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "space-y-3",
          initial: "hidden",
          animate: "visible",
          variants: { visible: { transition: { staggerChildren: 0.08 } } },
          children: automations.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AutomationCard,
            {
              automation: a,
              index: i,
              onToggle: toggleAutomation,
              onEdit: openEdit
            },
            a.id
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", "data-ocid": "automation.templates.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground font-display", children: "Start from Template" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3", children: TEMPLATES.map((t, i) => {
        const CatIcon = CATEGORY_ICONS[t.category];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.06 },
            "data-ocid": `automation.template.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "p-4 flex flex-col gap-3 hover-lift transition-smooth cursor-pointer group border-border hover:border-primary/30",
                onClick: () => applyTemplate(t),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 rounded-xl flex items-center justify-center ${CATEGORY_COLORS[t.category]}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CatIcon, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed text-truncate-2", children: t.useCase })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-[10px] h-4 px-1.5", children: [
                      t.steps,
                      " steps"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-fast flex items-center gap-0.5", children: [
                      "Use ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                    ] })
                  ] })
                ]
              }
            )
          },
          t.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "automation.history.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground font-display", children: "Execution History" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Last 10 runs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-b border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-medium text-muted-foreground py-3", children: "Automation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-medium text-muted-foreground py-3 hidden md:table-cell", children: "Trigger" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-medium text-muted-foreground py-3 hidden sm:table-cell", children: "Timestamp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-medium text-muted-foreground py-3 text-right", children: "Leads" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-medium text-muted-foreground py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-medium text-muted-foreground py-3 w-8" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: EXEC_HISTORY.map((run, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: i * 0.04 },
            className: "border-b border-border/60 last:border-0 hover:bg-muted/40 transition-fast",
            "data-ocid": `automation.history.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                run.status === "Failed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-3.5 h-3.5 text-destructive shrink-0" }) : run.status === "Partial" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-warning shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate max-w-[120px] md:max-w-[160px]", children: run.automation })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3 hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[180px]", children: run.trigger }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground whitespace-nowrap", children: run.timestamp }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium tabular-nums text-foreground", children: run.leadsAffected }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold px-2 py-0.5 rounded-full ${runStatusColors[run.status]}`,
                  children: run.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "w-6 h-6 text-muted-foreground",
                  "aria-label": "View run details",
                  "data-ocid": `automation.history.view.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" })
                }
              ) })
            ]
          },
          run.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.6 },
        className: "mt-6 flex items-start gap-3 p-4 rounded-xl bg-primary/6 border border-primary/20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-5 h-5 text-primary mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "AI Automation Tip" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Leads from Mumbai gyms have a 68% reply rate on Monday mornings. Schedule your welcome sequence to trigger at 10:00 AM IST every Monday for best results." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              className: "text-xs h-7 shrink-0",
              "data-ocid": "automation.ai_tip.apply_button",
              children: "Apply"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.7 },
        className: "mt-4 flex items-center gap-3 p-4 rounded-xl gradient-premium border border-primary/15",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Unlock Unlimited Automations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Free plan is limited to 5 automations and 500 runs/month. Upgrade to Scale for unlimited workflows, multi-channel actions, and priority queue." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              className: "btn-primary-glow text-xs shrink-0",
              "data-ocid": "automation.upgrade_button",
              children: "Upgrade"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.75 },
        className: "mt-4",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Repeat2, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "AI Automation Credits" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "247 / 500 used" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "progress-bar-fill",
              initial: { width: "0%" },
              animate: { width: "49.4%" },
              transition: { delay: 0.9, duration: 0.7, ease: "easeOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Resets monthly · 253 remaining" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "link",
                size: "sm",
                className: "text-[10px] h-auto p-0 text-primary",
                "data-ocid": "automation.buy_credits_button",
                children: "Buy more credits"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "text-xs gap-1.5",
          onClick: () => setAutomations(
            (prev) => prev.map((a) => ({ ...a, status: "paused" }))
          ),
          "data-ocid": "automation.pause_all_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }),
            "Pause All"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "text-xs gap-1.5",
          onClick: () => setAutomations(
            (prev) => prev.map((a) => ({ ...a, status: "active" }))
          ),
          "data-ocid": "automation.resume_all_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
            "Resume All"
          ]
        }
      )
    ] })
  ] });
}
export {
  AutomationPage as default
};
