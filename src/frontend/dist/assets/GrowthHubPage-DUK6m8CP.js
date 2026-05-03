import { az as useGamificationState, j as jsxRuntimeExports, h as Badge, y as motion, aA as useClaimMilestoneReward, r as reactExports, n as Card, o as CardHeader, aw as CardTitle, p as CardContent, aB as MILESTONES, i as Button, W as useRecordDailyAction, ad as Link, R as ResponsiveContainer, J as BarChart, K as XAxis, Y as YAxis, N as Tooltip, O as Bar, Q as Cell, m as ue } from "./index-DcPx_5wo.js";
const DAILY_ACTIONS = [
  {
    id: "contact-lead",
    title: "Contact a Lead",
    description: "Reach out to a new prospect via WhatsApp or email",
    xpLabel: "+1 action"
  },
  {
    id: "send-pitch",
    title: "Send a Pitch",
    description: "Send a personalized pitch proposal to a lead",
    xpLabel: "+1 action"
  },
  {
    id: "create-campaign",
    title: "Create a Campaign",
    description: "Launch a new ad or outreach campaign",
    xpLabel: "+1 action"
  },
  {
    id: "generate-proposal",
    title: "Generate a Proposal",
    description: "Use AI to create a client-ready proposal",
    xpLabel: "+1 action"
  },
  {
    id: "follow-up-lead",
    title: "Follow Up on a Lead",
    description: "Send a follow-up message to a contacted lead",
    xpLabel: "+1 action"
  }
];
const REWARD_DETAILS = [
  {
    milestoneIndex: 0,
    credits: 50,
    feature: "Bulk Campaign Builder",
    featureKey: "bulk-campaigns",
    icon: "📦",
    route: "/outreach",
    description: "Send campaigns to 100+ leads at once"
  },
  {
    milestoneIndex: 1,
    credits: 100,
    feature: "AI Pitch Generator",
    featureKey: "ai-proposals",
    icon: "🤖",
    route: "/command-center",
    description: "Auto-generate hyper-personalised pitches"
  },
  {
    milestoneIndex: 2,
    credits: 200,
    feature: "Advanced Analytics",
    featureKey: "competitor-intel",
    icon: "📊",
    route: "/clients",
    description: "Deep competitor intelligence and ROI dashboards"
  }
];
const WEEKLY_ACTIONS_DATA = [
  { day: "Mon", actions: 4 },
  { day: "Tue", actions: 7 },
  { day: "Wed", actions: 5 },
  { day: "Thu", actions: 9 },
  { day: "Fri", actions: 6 },
  { day: "Sat", actions: 3 },
  { day: "Sun", actions: 8 }
];
const BAR_COLORS = [
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253)",
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253 / 0.4)",
  "oklch(0.53 0.22 253 / 0.6)"
];
function StreakSection({
  streak,
  totalActions
}) {
  const isOnFire = streak >= 7;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45 },
      className: "relative rounded-2xl overflow-hidden shadow-premium bg-card border border-border",
      "data-ocid": "growth-hub.streak.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-premium opacity-40 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-8 flex flex-col items-center gap-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-5xl leading-none",
                style: {
                  animation: isOnFire ? "streak-pulse 1.6s ease-in-out infinite" : void 0
                },
                children: "🔥"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                initial: { scale: 0.6, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                transition: { type: "spring", stiffness: 260, damping: 18 },
                className: "text-6xl font-display font-bold text-foreground",
                style: { animation: "streak-pulse 2s ease-in-out infinite" },
                "data-ocid": "growth-hub.streak.number",
                children: streak
              },
              streak
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-display text-foreground font-semibold", children: "Day Streak" }),
            isOnFire && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "badge-milestone-gold text-xs font-bold px-2 py-0.5 border-0",
                style: {
                  boxShadow: "0 0 12px oklch(0.68 0.15 86 / 0.6)",
                  animation: "streak-pulse 1.4s ease-in-out infinite"
                },
                "data-ocid": "growth-hub.streak.on-fire-badge",
                children: "ON FIRE 🔥"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: totalActions }),
            " ",
            "total actions taken across all time"
          ] })
        ] })
      ]
    }
  );
}
function MilestoneTrack({
  totalActions,
  currentMilestone,
  unlockedFeatures
}) {
  const claimReward = useClaimMilestoneReward();
  const [claimed, setClaimed] = reactExports.useState([]);
  function handleClaim(index) {
    claimReward.mutate(index, {
      onSuccess: () => {
        setClaimed((prev) => [...prev, index]);
        ue.success("🎉 Milestone reward claimed!", {
          description: `You've unlocked ${MILESTONES[index].label} rewards!`,
          duration: 5e3
        });
      },
      onError: () => {
        ue.error("Failed to claim reward. Please try again.");
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-elevated border-border",
      "data-ocid": "growth-hub.milestones.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: "🏆 Milestone Progress" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-4", children: MILESTONES.map((m, idx) => {
          const progress = Math.min(totalActions / m.threshold, 1);
          const reached = totalActions >= m.threshold;
          const isCurrentOrPast = idx <= currentMilestone;
          const isClaimable = reached && !unlockedFeatures.includes(m.unlocks) && !claimed.includes(idx);
          const badgeClass = m.badgeColor === "bronze" ? "badge-milestone-bronze" : m.badgeColor === "silver" ? "badge-milestone-silver" : "badge-milestone-gold";
          const medalEmoji = m.badgeColor === "bronze" ? "🥉" : m.badgeColor === "silver" ? "🥈" : "🥇";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: idx * 0.1, duration: 0.4 },
              className: `rounded-xl border p-4 transition-smooth ${isCurrentOrPast ? "border-border bg-card" : "border-dashed border-border/50 bg-muted/20 opacity-60"}`,
              "data-ocid": `growth-hub.milestone.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-2xl ${reached ? "" : "grayscale opacity-50"}`,
                        style: reached ? { animation: "milestone-unlock 0.5s ease-out" } : void 0,
                        children: medalEmoji
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: m.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: `text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass}`,
                            children: [
                              m.threshold,
                              " actions"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        "+",
                        m.credits,
                        " credits · Unlocks",
                        " ",
                        m.unlocks.replace("-", " ")
                      ] })
                    ] })
                  ] }),
                  reached && !isClaimable && !claimed.includes(idx) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "badge-milestone-gold shrink-0 border-0 text-xs",
                      "data-ocid": `growth-hub.milestone.claimed-badge.${idx + 1}`,
                      children: "✓ Claimed"
                    }
                  ),
                  isClaimable && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      className: "shrink-0 text-xs font-semibold",
                      onClick: () => handleClaim(idx),
                      disabled: claimReward.isPending,
                      "data-ocid": `growth-hub.milestone.claim-button.${idx + 1}`,
                      children: "Claim Reward"
                    }
                  ),
                  claimed.includes(idx) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "badge-milestone-gold shrink-0 border-0 text-xs",
                      "data-ocid": `growth-hub.milestone.just-claimed-badge.${idx + 1}`,
                      children: "✓ Claimed"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "progress-bar-fill",
                    initial: { width: 0 },
                    animate: { width: `${Math.round(progress * 100)}%` },
                    transition: {
                      duration: 0.8,
                      delay: idx * 0.15,
                      ease: "easeOut"
                    },
                    style: reached ? {
                      background: "linear-gradient(90deg, oklch(0.68 0.15 86), oklch(0.68 0.15 86 / 0.8))"
                    } : void 0
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    Math.min(totalActions, m.threshold),
                    " / ",
                    m.threshold
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    Math.round(progress * 100),
                    "%"
                  ] })
                ] })
              ]
            },
            m.index
          );
        }) })
      ]
    }
  );
}
function RewardUnlocksGrid({
  unlockedFeatures
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-elevated border-border",
      "data-ocid": "growth-hub.rewards.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: "🎁 Reward Unlocks" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: REWARD_DETAILS.map((r, idx) => {
          const isUnlocked = unlockedFeatures.includes(r.featureKey);
          const milestone = MILESTONES[r.milestoneIndex];
          const badgeClass = milestone.badgeColor === "bronze" ? "badge-milestone-bronze" : milestone.badgeColor === "silver" ? "badge-milestone-silver" : "badge-milestone-gold";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: isUnlocked ? 1 : 0.5, scale: 1 },
              transition: { delay: idx * 0.1, duration: 0.35 },
              className: `rounded-xl border p-4 flex flex-col gap-2 transition-smooth ${isUnlocked ? "border-border bg-card hover:shadow-elevated cursor-pointer" : "border-dashed border-border/50 bg-muted/20 grayscale"}`,
              "data-ocid": `growth-hub.reward.card.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: isUnlocked ? r.icon : "🔒" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs px-2 py-0.5 rounded-full font-semibold ${badgeClass}`,
                      children: milestone.badgeColor
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: r.feature }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: r.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-primary", children: [
                  "+",
                  r.credits,
                  " credits"
                ] }),
                !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Reach ",
                  milestone.threshold,
                  " actions to unlock"
                ] })
              ]
            },
            r.featureKey
          );
        }) }) })
      ]
    }
  );
}
function DailyActionsSection({ totalActions }) {
  const recordAction = useRecordDailyAction();
  const [completedToday, setCompletedToday] = reactExports.useState([]);
  const [localTotal, setLocalTotal] = reactExports.useState(totalActions);
  function handleMarkDone(actionId) {
    if (completedToday.includes(actionId)) return;
    recordAction.mutate(actionId, {
      onSuccess: () => {
        setCompletedToday((prev) => [...prev, actionId]);
        setLocalTotal((prev) => prev + 1);
        ue.success("Action logged! +1 progress", {
          description: "Keep it up — your streak is growing 🔥",
          duration: 3500
        });
      },
      onError: () => {
        ue.error("Could not record action. Try again.");
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-elevated border-border",
      "data-ocid": "growth-hub.daily-actions.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: "✅ Today's Actions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-xs font-semibold",
              "data-ocid": "growth-hub.daily-actions.total-badge",
              children: [
                localTotal,
                " total actions"
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: DAILY_ACTIONS.map((action, idx) => {
          const done = completedToday.includes(action.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: idx * 0.07, duration: 0.3 },
              className: `flex items-center justify-between gap-3 rounded-lg p-3 transition-smooth border ${done ? "bg-score-success border-transparent" : "bg-muted/30 border-border/50 hover:bg-muted/50"}`,
              "data-ocid": `growth-hub.daily-action.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-smooth ${done ? "bg-success/20" : "bg-muted border border-border"}`,
                      children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.span,
                        {
                          initial: { scale: 0 },
                          animate: { scale: 1 },
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 14
                          },
                          className: "text-base",
                          children: "✅"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground", children: idx + 1 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: `text-sm font-semibold truncate ${done ? "line-through text-muted-foreground" : "text-foreground"}`,
                        children: action.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: action.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-semibold", children: action.xpLabel }),
                  !done && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "text-xs h-7 px-3",
                      onClick: () => handleMarkDone(action.id),
                      disabled: recordAction.isPending,
                      "data-ocid": `growth-hub.daily-action.mark-done.${idx + 1}`,
                      children: "Mark Done"
                    }
                  )
                ] })
              ]
            },
            action.id
          );
        }) })
      ]
    }
  );
}
function CreditsCard({
  creditsEarned,
  streak
}) {
  const bonusFromStreak = streak >= 7 ? 50 : streak >= 3 ? 20 : 0;
  const fromMilestones = creditsEarned;
  const total = fromMilestones + bonusFromStreak;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-elevated border-border",
      "data-ocid": "growth-hub.credits.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: "💎 Credits Balance" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { type: "spring", stiffness: 200, damping: 16 },
              className: "text-center py-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-5xl font-display font-bold text-primary",
                    "data-ocid": "growth-hub.credits.total-balance",
                    children: total
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "credits available" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1 border-b border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Earned from milestones" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: fromMilestones })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1 border-b border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Streak bonus" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `font-semibold ${bonusFromStreak > 0 ? "text-warning" : "text-foreground"}`,
                  children: [
                    "+",
                    bonusFromStreak
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Total available" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: total })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full font-semibold",
              asChild: true,
              "data-ocid": "growth-hub.credits.use-button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/leads", children: "Use Credits → Get More Leads" })
            }
          )
        ] })
      ]
    }
  );
}
function LeaderboardTeaser() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-elevated border-border",
      "data-ocid": "growth-hub.leaderboard.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: "📈 Your Agency Rank" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-4xl font-display font-bold text-foreground",
                  "data-ocid": "growth-hub.leaderboard.rank",
                  children: "#12"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                "out of ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "247" }),
                " ",
                "agencies"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "badge-milestone-bronze border-0 text-xs mb-1", children: "Top 5%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide", children: "Actions this week" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: WEEKLY_ACTIONS_DATA, barCategoryGap: "30%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "day",
                  tick: { fontSize: 10, fill: "oklch(0.55 0 0)" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { hide: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  cursor: { fill: "oklch(0.53 0.22 253 / 0.06)" },
                  contentStyle: {
                    background: "oklch(0.16 0 0)",
                    border: "1px solid oklch(0.26 0 0)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "oklch(0.96 0 0)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "actions", radius: [4, 4, 0, 0], children: WEEKLY_ACTIONS_DATA.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: BAR_COLORS[index] }, entry.day)) })
            ] }) })
          ] })
        ] })
      ]
    }
  );
}
function UnlockedFeaturesPanel({
  unlockedFeatures
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "shadow-elevated border-border",
      "data-ocid": "growth-hub.unlocked-features.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg flex items-center gap-2", children: "🚀 Feature Access" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: REWARD_DETAILS.map((r, idx) => {
          const isUnlocked = unlockedFeatures.includes(r.featureKey);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: idx * 0.08, duration: 0.3 },
              className: `flex items-center justify-between gap-3 rounded-lg p-3 border transition-smooth ${isUnlocked ? "bg-muted/30 border-border/50 hover:bg-muted/60" : "bg-muted/10 border-dashed border-border/30 opacity-50"}`,
              "data-ocid": `growth-hub.feature.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl shrink-0", children: isUnlocked ? r.icon : "🔒" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: r.feature }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: r.description })
                  ] })
                ] }),
                isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "shrink-0 text-xs h-7 px-3",
                    asChild: true,
                    "data-ocid": `growth-hub.feature.open-button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: r.route, children: "Open →" })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: "Locked" })
              ]
            },
            r.featureKey
          );
        }) }) })
      ]
    }
  );
}
function GrowthHubPage() {
  const { data: gamification, isLoading } = useGamificationState();
  const streak = (gamification == null ? void 0 : gamification.dailyStreak) ?? 0;
  const totalActions = (gamification == null ? void 0 : gamification.totalActions) ?? 0;
  const creditsEarned = (gamification == null ? void 0 : gamification.creditsEarned) ?? 0;
  const currentMilestone = (gamification == null ? void 0 : gamification.currentMilestone) ?? 0;
  const unlockedFeatures = (gamification == null ? void 0 : gamification.unlockedFeatures) ?? [];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-6 flex flex-col gap-4 animate-pulse",
        "data-ocid": "growth-hub.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-2xl bg-muted/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 h-64 rounded-xl bg-muted/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-xl bg-muted/40" })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 md:p-6 space-y-5 max-w-6xl mx-auto",
      "data-ocid": "growth-hub.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Growth Hub" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Complete daily actions, unlock features, and climb the leaderboard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "border-primary/40 text-primary bg-primary/5 font-semibold",
              "data-ocid": "growth-hub.streak.badge",
              children: [
                "🔥 ",
                streak,
                " day streak"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StreakSection, { streak, totalActions }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MilestoneTrack,
              {
                totalActions,
                currentMilestone,
                unlockedFeatures
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RewardUnlocksGrid, { unlockedFeatures }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DailyActionsSection, { totalActions })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditsCard, { creditsEarned, streak }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardTeaser, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(UnlockedFeaturesPanel, { unlockedFeatures })
          ] })
        ] })
      ]
    }
  );
}
export {
  GrowthHubPage as default
};
