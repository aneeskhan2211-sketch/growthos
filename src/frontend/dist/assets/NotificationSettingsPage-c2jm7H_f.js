import { c as createLucideIcon, u as useActor, a as useQuery, b as useQueryClient, d as useMutation, e as createActor, r as reactExports, j as jsxRuntimeExports, B as Bell, C as Clock, L as Label, f as cn, S as Switch, Z as Zap, M as MessageCircle, g as Calendar, T as TrendingUp, h as Badge, i as Button, I as Input, k as Shield, l as Check, m as ue, n as Card, o as CardHeader, p as CardContent, q as ChevronDown, s as Copy } from "./index-DcPx_5wo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode);
const MOCK_PREFS = {
  userId: "user_demo",
  frequencySettings: {
    maxPerDay: BigInt(2),
    quietHoursEnabled: true,
    quietHoursStart: BigInt(21),
    quietHoursEnd: BigInt(8),
    inactivityReductionEnabled: true
  },
  enabledTriggers: [
    "on_new_reply",
    "on_inactivity_24h",
    "on_inactivity_48h",
    "on_followup_due",
    "on_limit_reached",
    "drip_day_0",
    "on_streak_milestone"
  ],
  whatsappOptIn: false,
  notificationsSentToday: BigInt(0)
};
const WA_STOP_REPLIED_OPTED = [
  "user_replied",
  "user_opted_out"
];
const WA_STOP_ALL = [
  "user_replied",
  "user_opted_out",
  "sequence_completed"
];
const MOCK_WA_SEQUENCE = [
  {
    dayNumber: BigInt(0),
    message: "Hi 👋 your leads are ready. Start by contacting 5 businesses today.",
    stopConditions: WA_STOP_REPLIED_OPTED
  },
  {
    dayNumber: BigInt(1),
    message: "Tip: Reply fast. Many customers choose the first responder.",
    stopConditions: WA_STOP_REPLIED_OPTED
  },
  {
    dayNumber: BigInt(2),
    message: "Follow up with leads who didn't reply yesterday. It works.",
    stopConditions: WA_STOP_REPLIED_OPTED
  },
  {
    dayNumber: BigInt(3),
    message: "Want a simple growth plan for your business?",
    stopConditions: WA_STOP_REPLIED_OPTED
  },
  {
    dayNumber: BigInt(5),
    message: "Keep going. Consistent action builds enquiries.",
    stopConditions: WA_STOP_REPLIED_OPTED
  },
  {
    dayNumber: BigInt(7),
    message: "Check your replies and suggest next steps.",
    stopConditions: WA_STOP_ALL
  }
];
function useNotificationPrefs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
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
    initialData: MOCK_PREFS
  });
}
function useUpdateNotificationPrefs() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) return;
      await actor.setUserNotificationPrefs(
        input.frequencySettings,
        input.enabledTriggers
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPrefs"] });
    }
  });
}
function useOptInWhatsApp() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (phone) => {
      if (!actor) return;
      await actor.setWhatsAppConsent(phone, true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPrefs"] });
    }
  });
}
function useOptOutWhatsApp() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (phone) => {
      if (!actor) return;
      await actor.setWhatsAppConsent(phone, false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationPrefs"] });
    }
  });
}
function useWhatsAppSequence() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["whatsappSequence"],
    queryFn: async () => {
      if (!actor) return MOCK_WA_SEQUENCE;
      try {
        const result = await actor.getWhatsAppSequence();
        return (result == null ? void 0 : result.length) > 0 ? result : MOCK_WA_SEQUENCE;
      } catch {
        return MOCK_WA_SEQUENCE;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_WA_SEQUENCE
  });
}
const TRIGGER_CONFIGS = [
  {
    id: "on_new_reply",
    label: "New Reply Alert",
    desc: "Get notified when a lead replies",
    icon: MessageCircle
  },
  {
    id: "on_inactivity_24h",
    label: "Inactivity Reminder",
    desc: "Reminder if you haven't acted in 24–48 hours",
    icon: Clock
  },
  {
    id: "on_followup_due",
    label: "Follow-up Due",
    desc: "Alert when a follow-up is scheduled",
    icon: Calendar
  },
  {
    id: "on_limit_reached",
    label: "Limit Reached",
    desc: "Notification when daily limits are hit",
    icon: Zap
  },
  {
    id: "drip_day_0",
    label: "Drip Schedule",
    desc: "Daily tips for your first 30 days",
    icon: TrendingUp
  },
  {
    id: "on_streak_milestone",
    label: "Streak Milestones",
    desc: "Celebrate your activity streaks",
    icon: Bell
  }
];
const DRIP_WEEKS = [
  {
    week: 1,
    theme: "Activation",
    messages: [
      "Your first leads are ready. Contact 5 to start.",
      "Quick follow-up tip: message yesterday's leads.",
      "Replies come faster when you respond early.",
      "Send 5 messages now. It takes less than 5 minutes.",
      "You're getting started. Keep the streak going.",
      "Follow up with 3 leads today.",
      "Week 1 summary: continue to build momentum."
    ]
  },
  {
    week: 2,
    theme: "Habit Building",
    messages: [
      "Contact 5 leads each day.",
      "Check replies and respond quickly.",
      "Try one simple offer this week.",
      "Keep your daily routine consistent."
    ]
  },
  {
    week: 3,
    theme: "Conversion Focus",
    messages: [
      "Turn replies into bookings — follow up today.",
      "Share a simple plan with interested leads.",
      "Close conversations by suggesting next steps.",
      "Check your pending replies now."
    ]
  },
  {
    week: 4,
    theme: "Scale + Upgrade",
    messages: [
      "Automate follow-ups to save time.",
      "Increase daily outreach to scale enquiries.",
      "Review your results and improve offers.",
      "Continue the routine for steady growth."
    ]
  }
];
function SectionCard({
  icon: Icon,
  title,
  desc,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-0 pt-5 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-6 pb-5 pt-4", children })
  ] });
}
function CopyButton({ text }) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: handleCopy,
      className: "p-1.5 rounded-md hover:bg-muted/60 transition-colors shrink-0",
      "aria-label": "Copy message",
      "data-ocid": "notification.copy_button",
      children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 text-muted-foreground" })
    }
  );
}
function DripWeekAccordion({ week }) {
  const [open, setOpen] = reactExports.useState(false);
  const themeColors = {
    Activation: "bg-primary/10 text-primary",
    "Habit Building": "bg-accent/60 text-accent-foreground",
    "Conversion Focus": "bg-score-success/10 text-score-success",
    "Scale + Upgrade": "bg-secondary/60 text-secondary-foreground"
  };
  const cls = themeColors[week.theme] ?? "bg-muted text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/60 rounded-lg overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((p) => !p),
        className: "w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/40 transition-colors",
        "data-ocid": `notification.drip_week_${week.week}.toggle`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
              "Week ",
              week.week
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn("text-xs font-medium px-2 py-0.5 rounded-full", cls),
                children: week.theme
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              week.messages.length,
              " messages"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: cn(
                "w-4 h-4 text-muted-foreground transition-transform duration-200",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 pt-1 space-y-1.5 bg-muted/10", children: week.messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-2 p-2.5 rounded-md bg-card border border-border/40",
        "data-ocid": `notification.drip_week_${week.week}.item.${week.messages.indexOf(msg) + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-4 shrink-0 mt-0.5", children: week.messages.indexOf(msg) + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 text-sm text-foreground leading-relaxed", children: msg }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: msg })
        ]
      },
      msg
    )) })
  ] });
}
function NotificationSettingsPage() {
  const { data: prefs, isLoading } = useNotificationPrefs();
  const { data: waSequence } = useWhatsAppSequence();
  const updatePrefs = useUpdateNotificationPrefs();
  const optInMutation = useOptInWhatsApp();
  const optOutMutation = useOptOutWhatsApp();
  const [maxPerDay, setMaxPerDay] = reactExports.useState(
    Number((prefs == null ? void 0 : prefs.frequencySettings.maxPerDay) ?? 2)
  );
  const [quietHours, setQuietHours] = reactExports.useState(
    (prefs == null ? void 0 : prefs.frequencySettings.quietHoursEnabled) ?? true
  );
  const [inactivityReduction, setInactivityReduction] = reactExports.useState(
    (prefs == null ? void 0 : prefs.frequencySettings.inactivityReductionEnabled) ?? true
  );
  const [enabledTriggers, setEnabledTriggers] = reactExports.useState(
    new Set((prefs == null ? void 0 : prefs.enabledTriggers) ?? [])
  );
  const [phoneInput, setPhoneInput] = reactExports.useState("");
  const [showOptInForm, setShowOptInForm] = reactExports.useState(false);
  const isOptedIn = (prefs == null ? void 0 : prefs.whatsappOptIn) ?? false;
  const toggleTrigger = (id) => {
    setEnabledTriggers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleSave = async () => {
    await updatePrefs.mutateAsync({
      frequencySettings: {
        maxPerDay: BigInt(maxPerDay),
        quietHoursEnabled: quietHours,
        quietHoursStart: BigInt(21),
        quietHoursEnd: BigInt(8),
        inactivityReductionEnabled: inactivityReduction
      },
      enabledTriggers: Array.from(enabledTriggers)
    });
    ue.success("Notification preferences saved", {
      description: "Your settings are now active.",
      duration: 4e3
    });
  };
  const handleOptIn = async () => {
    if (!phoneInput.trim()) {
      ue.error("Please enter your WhatsApp number");
      return;
    }
    await optInMutation.mutateAsync(phoneInput.trim());
    setShowOptInForm(false);
    ue.success("WhatsApp opt-in confirmed", {
      description: "You'll receive up to 1 message per day. Easy opt-out anytime.",
      duration: 5e3
    });
  };
  const handleOptOut = async () => {
    await optOutMutation.mutateAsync("");
    ue("WhatsApp messages stopped", {
      description: "You've been removed from the sequence.",
      duration: 4e3
    });
  };
  const formatConsentDate = (ts) => {
    if (!ts) return "—";
    const ms = Number(ts) / 1e6;
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-6 space-y-4 max-w-2xl mx-auto",
        "data-ocid": "notification_settings.loading_state",
        children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-xl bg-muted/40 animate-pulse" }, i))
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-6 max-w-2xl mx-auto space-y-6",
      "data-ocid": "notification_settings.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-5 h-5 text-primary" }),
            "Notification Settings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Control how and when GrowthOS sends you reminders. Max 2/day. No spam." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SectionCard,
          {
            icon: Clock,
            title: "Frequency Settings",
            desc: "Set daily limits and quiet hours to keep notifications useful, not annoying.",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium text-muted-foreground", children: "Max notifications per day" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex gap-2",
                    "data-ocid": "notification.max_per_day.radio",
                    children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setMaxPerDay(n),
                        "data-ocid": `notification.max_per_day.option.${n}`,
                        className: cn(
                          "flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200",
                          maxPerDay === n ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:bg-muted/50"
                        ),
                        children: [
                          n,
                          "/day"
                        ]
                      },
                      n
                    ))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Quiet Hours" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No notifications from 9:00 PM to 8:00 AM" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: quietHours,
                      onCheckedChange: setQuietHours,
                      "data-ocid": "notification.quiet_hours.toggle"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Inactivity Reduction" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Reduce to 1/day if no activity for 7+ days" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Switch,
                    {
                      checked: inactivityReduction,
                      onCheckedChange: setInactivityReduction,
                      "data-ocid": "notification.inactivity_reduction.toggle"
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            icon: Zap,
            title: "Trigger Controls",
            desc: "Choose which events trigger notifications. All enabled by default.",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: TRIGGER_CONFIGS.map((t) => {
              const Icon = t.icon;
              const enabled = enabledTriggers.has(t.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between gap-3 p-3 rounded-lg border border-border/50 bg-muted/20",
                  "data-ocid": `notification.trigger.${t.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: t.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.desc })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: enabled,
                        onCheckedChange: () => toggleTrigger(t.id),
                        "data-ocid": `notification.trigger.${t.id}.toggle`
                      }
                    )
                  ]
                },
                t.id
              );
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SectionCard,
          {
            icon: MessageCircle,
            title: "WhatsApp Re-Engagement",
            desc: "Opt-in only. We send actionable tips — max 1 message/day. Easy opt-out.",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Status:" }),
                isOptedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "bg-score-success/15 text-score-success border-score-success/20",
                    "data-ocid": "notification.whatsapp.opted_in_badge",
                    children: "✓ Opted in"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-muted-foreground",
                    "data-ocid": "notification.whatsapp.not_opted_in_badge",
                    children: "Not opted in"
                  }
                )
              ] }),
              isOptedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg bg-score-success/5 border border-score-success/20 text-sm text-foreground space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Consent date: " }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatConsentDate(prefs == null ? void 0 : prefs.whatsappConsentDate) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You'll receive up to 1 WhatsApp message per day from the sequence below." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleOptOut,
                    disabled: optOutMutation.isPending,
                    className: "gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5",
                    "data-ocid": "notification.whatsapp.opt_out_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-3.5 h-3.5" }),
                      optOutMutation.isPending ? "Opting out…" : "Stop WhatsApp messages"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Your 6-message sequence" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-xs font-semibold text-muted-foreground w-14", children: "Day" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-xs font-semibold text-muted-foreground", children: "Message" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (waSequence ?? []).map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: "border-t border-border/30",
                        "data-ocid": `notification.wa_sequence.item.${Number(msg.dayNumber) + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-xs font-mono text-muted-foreground", children: [
                            "Day ",
                            Number(msg.dayNumber)
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-foreground", children: msg.message })
                        ]
                      },
                      String(msg.dayNumber)
                    )) })
                  ] }) })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                !showOptInForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    onClick: () => setShowOptInForm(true),
                    className: "gap-1.5",
                    "data-ocid": "notification.whatsapp.opt_in_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                      "Opt in to WhatsApp tips"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-4 rounded-lg border border-border/60 bg-muted/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Your WhatsApp number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        type: "tel",
                        placeholder: "+91 98765 43210",
                        value: phoneInput,
                        onChange: (e) => setPhoneInput(e.target.value),
                        className: "h-9 text-sm",
                        "data-ocid": "notification.whatsapp.phone_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-2.5 rounded-md bg-primary/5 border border-primary/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "We will only send actionable tips. Max 1 message/day. Easy opt-out anytime. Consent is logged securely." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "By opting in you agree to receive up to 1 WhatsApp message per day. No spam. Opt out anytime." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        onClick: handleOptIn,
                        disabled: optInMutation.isPending,
                        className: "gap-1.5",
                        "data-ocid": "notification.whatsapp.confirm_opt_in_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                          optInMutation.isPending ? "Confirming…" : "Confirm opt-in"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        onClick: () => {
                          setShowOptInForm(false);
                          setPhoneInput("");
                        },
                        "data-ocid": "notification.whatsapp.cancel_opt_in_button",
                        children: "Cancel"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "What you'd receive (6 messages over 7 days)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 text-left", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-xs font-semibold text-muted-foreground w-14", children: "Day" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-xs font-semibold text-muted-foreground", children: "Message" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (waSequence ?? []).map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "tr",
                      {
                        className: "border-t border-border/30",
                        "data-ocid": `notification.wa_preview.item.${Number(msg.dayNumber) + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-xs font-mono text-muted-foreground", children: [
                            "Day ",
                            Number(msg.dayNumber)
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-foreground", children: msg.message })
                        ]
                      },
                      `preview-${String(msg.dayNumber)}`
                    )) })
                  ] }) })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionCard,
          {
            icon: Calendar,
            title: "30-Day Drip Preview",
            desc: "Messages sent over your first 30 days to build habit and drive action.",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "notification.drip_preview.list", children: DRIP_WEEKS.map((week) => /* @__PURE__ */ jsxRuntimeExports.jsx(DripWeekAccordion, { week }, week.week)) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Changes apply immediately to future notifications." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleSave,
              disabled: updatePrefs.isPending,
              className: "gap-1.5 min-w-32",
              "data-ocid": "notification.save_button",
              children: updatePrefs.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }),
                "Saving…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                "Save Changes"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
export {
  NotificationSettingsPage as default
};
