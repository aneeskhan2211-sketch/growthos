import { aG as useMetaTags, bI as useWeeklyChallenge, r as reactExports, j as jsxRuntimeExports, y as motion, n as Card, h as Badge, p as CardContent, o as CardHeader, aw as CardTitle, aN as PAGE_META } from "./index-DcPx_5wo.js";
const REWARDS = [
  {
    rank: 1,
    badge: "🥇",
    title: "1st Place",
    credits: "₹500",
    feature: "AI Credits + Gold Badge"
  },
  {
    rank: 2,
    badge: "🥈",
    title: "2nd Place",
    credits: "₹250",
    feature: "AI Credits + Silver Badge"
  },
  {
    rank: 3,
    badge: "🥉",
    title: "3rd Place",
    credits: "₹100",
    feature: "AI Credits + Bronze Badge"
  }
];
const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai"];
function CountdownTimer({
  days,
  hours,
  minutes
}) {
  const pad = (n) => String(n).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-1.5 text-sm font-mono font-semibold text-foreground",
      "aria-label": "Time remaining",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "14",
            height: "14",
            viewBox: "0 0 14 14",
            fill: "none",
            "aria-hidden": "true",
            className: "text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "7", cy: "7", r: "5.5", stroke: "currentColor", strokeWidth: "1.2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M7 4 L7 7 L9.5 9",
                  stroke: "currentColor",
                  strokeWidth: "1.2",
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs mr-0.5", children: "Time left:" }),
        pad(days),
        "d ",
        pad(hours),
        "h ",
        pad(minutes),
        "m"
      ]
    }
  );
}
function ChallengeProgress({
  current,
  target,
  pct
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "challenge.progress_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-foreground tabular-nums", children: current }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground ml-1", children: [
        "/ ",
        target,
        " LEADS GENERATED THIS WEEK"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "h-full bg-primary rounded-full",
        initial: { width: 0 },
        animate: { width: `${pct}%` },
        transition: { duration: 1.2, ease: "easeOut" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        pct,
        "% complete"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        target - current,
        " more to win"
      ] })
    ] })
  ] });
}
const RANK_ICONS = { 1: "🥇", 2: "🥈", 3: "🥉" };
function LeaderboardRow({
  entry,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `challenge.leaderboard_row.${index + 1}`,
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.06, duration: 0.3 },
      className: `flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${entry.isCurrentUser ? "bg-primary/8 border border-primary/15" : "hover:bg-muted/30"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 text-center flex-shrink-0", children: RANK_ICONS[entry.rank] ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: RANK_ICONS[entry.rank] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground", children: entry.rank }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${entry.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
            children: entry.avatarInitials
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: `text-sm font-medium truncate ${entry.isCurrentUser ? "text-primary" : "text-foreground"}`,
              children: [
                entry.userName,
                entry.isCurrentUser && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs text-primary/70", children: "(You)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            entry.city,
            " 🇮🇳"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tabular-nums text-foreground", children: entry.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Leads" }),
          entry.isCurrentUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-primary/20 ml-1",
              children: "You"
            }
          )
        ] })
      ]
    }
  );
}
function RewardBanner({ reward }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-4 flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: "18",
        height: "18",
        viewBox: "0 0 18 18",
        fill: "none",
        "aria-hidden": "true",
        className: "text-primary",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M9 12 C6.2 12 4 9.8 4 7 L4 3 L14 3 L14 7 C14 9.8 11.8 12 9 12 Z",
              stroke: "currentColor",
              strokeWidth: "1.3",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M6.5 15 L11.5 15 M9 12 L9 15",
              stroke: "currentColor",
              strokeWidth: "1.3",
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M4 5 L2 5 C2 7.5 3 9.5 4 10.5",
              stroke: "currentColor",
              strokeWidth: "1.2",
              strokeLinecap: "round",
              opacity: "0.7"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M14 5 L16 5 C16 7.5 15 9.5 14 10.5",
              stroke: "currentColor",
              strokeWidth: "1.2",
              strokeLinecap: "round",
              opacity: "0.7"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-0.5", children: "Weekly Prize" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: reward })
    ] })
  ] });
}
const DAILY_TASKS = [
  { id: "task1", label: "Post 1 reel about your niche", points: 5 },
  { id: "task2", label: "Contact 10 new leads", points: 10 },
  { id: "task3", label: "Follow up 5 warm leads", points: 8 },
  { id: "task4", label: "Ask 3 clients for Google reviews", points: 6 },
  { id: "task5", label: "Share 1 win card on WhatsApp", points: 4 }
];
function DailyTasksCard() {
  const [completed, setCompleted] = reactExports.useState(/* @__PURE__ */ new Set());
  const toggle = (id) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const totalPoints = DAILY_TASKS.filter((t) => completed.has(t.id)).reduce(
    (sum, t) => sum + t.points,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "challenge.daily_tasks_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Today's Lead Tasks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-xs bg-primary/10 text-primary border-primary/20",
              children: [
                "+",
                totalPoints,
                " pts today"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-5 space-y-2", children: [
          DAILY_TASKS.map((task, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle(task.id),
              "data-ocid": `challenge.daily_task.${idx + 1}`,
              className: `w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${completed.has(task.id) ? "bg-success/8 border-success/20" : "bg-muted/20 border-border hover:border-primary/30 hover:bg-primary/5"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${completed.has(task.id) ? "bg-success border-success" : "border-muted-foreground"}`,
                    children: completed.has(task.id) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        width: "10",
                        height: "10",
                        viewBox: "0 0 10 10",
                        fill: "none",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M1.5 5 L4 7.5 L8.5 2.5",
                            stroke: "white",
                            strokeWidth: "1.4",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `flex-1 text-sm ${completed.has(task.id) ? "line-through text-muted-foreground" : "text-foreground"}`,
                    children: task.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
                  "+",
                  task.points
                ] })
              ]
            },
            task.id
          )),
          completed.size === DAILY_TASKS.length && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "text-center pt-2 text-sm font-semibold text-success",
              "data-ocid": "challenge.all_tasks_complete_state",
              children: [
                "🎉 All tasks done! You earned ",
                totalPoints,
                " points today."
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ChallengePage() {
  useMetaTags(PAGE_META["/challenge"]);
  const { challenge, timeLeft, progressPct, topLeaderboard, currentUserEntry } = useWeeklyChallenge();
  const [selectedCity, setSelectedCity] = reactExports.useState("Mumbai");
  const filteredLeaderboard = selectedCity === "All" ? topLeaderboard : topLeaderboard.filter(
    (e) => e.city === selectedCity || e.isCurrentUser
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-8", "data-ocid": "challenge.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-4 py-4 lg:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Weekly Challenges" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Compete, complete tasks, and win rewards" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, { ...timeLeft })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 lg:px-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "bg-card border-border overflow-hidden",
              "data-ocid": "challenge.hero_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-primary/8 to-transparent border-b border-border px-5 py-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-display font-bold text-foreground", children: challenge.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "bg-primary/10 text-primary border-primary/20 text-xs shrink-0",
                        children: "Active"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: challenge.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChallengeProgress,
                    {
                      current: challenge.currentValue,
                      target: challenge.targetValue,
                      pct: progressPct
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RewardBanner, { reward: challenge.reward }),
                  currentUserEntry && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-lg px-4 py-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Your rank:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
                      "#",
                      currentUserEntry.rank
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "— ",
                      currentUserEntry.value,
                      " leads"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs font-medium text-primary", children: [
                      challenge.targetValue - currentUserEntry.value,
                      " to win"
                    ] })
                  ] })
                ] })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "bg-card border-border",
            "data-ocid": "challenge.leaderboard_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex-row items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Weekly Leaderboard" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Top Users This Week" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: selectedCity,
                    onChange: (e) => setSelectedCity(e.target.value),
                    "data-ocid": "challenge.city_filter",
                    className: "text-xs font-semibold border border-border/60 rounded-lg px-2 py-1 bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30 h-7",
                    children: ["All", ...CITIES].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: filteredLeaderboard.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                LeaderboardRow,
                {
                  entry,
                  index: i
                },
                entry.userName
              )) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DailyTasksCard, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.25 },
          "data-ocid": "challenge.rewards_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "🏆 This Week's Rewards" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: REWARDS.map((reward, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 + i * 0.08, duration: 0.3 },
                className: "rounded-2xl border bg-card p-4 text-center",
                "data-ocid": `challenge.reward_card.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl block mb-2", children: reward.badge }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground mb-0.5", children: reward.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-primary", children: reward.credits }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: reward.feature })
                ]
              },
              reward.rank
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-muted/20 border-border",
          "data-ocid": "challenge.scoring_card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "How Scoring Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4", children: [
              { action: "New lead generated", pts: "+2 pts" },
              { action: "Pitch sent to lead", pts: "+3 pts" },
              { action: "Deal closed", pts: "+25 pts" },
              { action: "Win card shared", pts: "+5 pts" },
              { action: "Review collected", pts: "+4 pts" },
              { action: "Daily task completed", pts: "+5–10 pts" }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between text-xs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: item.action }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: item.pts })
                ]
              },
              item.action
            )) })
          ] })
        }
      )
    ] })
  ] });
}
export {
  ChallengePage as default
};
