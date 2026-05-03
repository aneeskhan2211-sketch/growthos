import { c as createLucideIcon, u as useActor, a as useQuery, b as useQueryClient, d as useMutation, e as createActor, r as reactExports, j as jsxRuntimeExports, g as Calendar, i as Button, aH as Download, n as Card, ab as Sparkles, L as Label, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem, I as Input, ac as RefreshCw, t as Tabs, v as TabsList, w as TabsTrigger, y as motion, o as CardHeader, aw as CardTitle, h as Badge, p as CardContent, A as AnimatePresence, m as ue, a0 as CircleCheck, aD as Progress, T as TrendingUp, X, s as Copy, b3 as Separator, bc as Layers, au as ChevronRight } from "./index-DcPx_5wo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const POST_TYPES_CYCLE = [
  "Reel",
  "Carousel",
  "Story",
  "Reel",
  "Ad",
  "Carousel",
  "Story"
];
const HOOKS = [
  "Is your salon losing 30+ customers a month? Here's why.",
  "The 3-minute routine that boosted bookings by 40%.",
  "Before vs After: One change. Massive results.",
  "Your competitors are doing this — are you?",
  "3 things every salon in Mumbai should post this week.",
  "How to get 50 new clients without spending on ads.",
  "The booking tip no one tells you about.",
  "What your customers search before booking a salon.",
  "One offer that converts 8 out of 10 inquiries.",
  "Why 'near me' searches are your best free leads."
];
const CAPTIONS = [
  "Transform your look today. Limited slots available this week. DM to book now! 💫",
  "Your hair, your story. See the difference our experts make every visit.",
  "Weekend special — Book any 2 services and get 20% off. Valid this weekend only.",
  "Client love speaks louder than ads. Here's what they're saying about us 💬",
  "New month, new look. Our stylists are ready — are you?",
  "5 stars and counting. Join hundreds of happy clients. Link in bio to book.",
  "Walk in, walk out amazing. That's the promise.",
  "Limited slots — first 5 bookings today get a complimentary hair spa."
];
const HASHTAG_SETS = [
  [
    "#SalonMumbai",
    "#MumbaiSalon",
    "#HairGoals",
    "#BeautyMumbai",
    "#SalonLife",
    "#HairCare",
    "#BookNow"
  ],
  [
    "#GymmingMumbai",
    "#FitnessGoals",
    "#GymLife",
    "#WorkoutMotivation",
    "#HealthyLiving",
    "#FitIndia"
  ],
  [
    "#ClinicCare",
    "#HealthFirst",
    "#WellnessMumbai",
    "#DoctorAdvice",
    "#HealthyIndia"
  ],
  [
    "#FoodMumbai",
    "#MumbaiFoodies",
    "#RestaurantLife",
    "#FoodLovers",
    "#EatWellLiveBetter"
  ],
  [
    "#RealEstateMumbai",
    "#PropertyIndia",
    "#HomeGoals",
    "#BuyHome",
    "#MumbaiProperty"
  ]
];
function generateMockPosts(niche = "Salon") {
  const posts = [];
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const nicheIdx = [
    "Salon",
    "Gym",
    "Clinic",
    "Restaurant",
    "Real Estate"
  ].indexOf(niche);
  const hashtagSet = HASHTAG_SETS[Math.max(0, nicheIdx)] ?? HASHTAG_SETS[0];
  for (let day = 1; day <= 30; day++) {
    const d = new Date(year, month, day);
    const hookIdx = (day - 1) % HOOKS.length;
    const captionIdx = (day - 1) % CAPTIONS.length;
    posts.push({
      id: String(day),
      day,
      date: d.toISOString().split("T")[0],
      postType: POST_TYPES_CYCLE[(day - 1) % POST_TYPES_CYCLE.length],
      title: [
        `Before/After transformation spotlight — ${niche} edition`,
        "Client testimonial: 'Best decision I ever made'",
        `5 tips for getting the most from your ${niche.toLowerCase()} visit`,
        "Weekend special offer — Limited slots available",
        "Behind the scenes: a day in our team's life",
        "How to maintain results between visits",
        "New services now available — see what's new"
      ][(day - 1) % 7],
      hook: HOOKS[hookIdx],
      caption: CAPTIONS[captionIdx],
      hashtags: [...hashtagSet, `#${niche}India`, "#LocalBusiness"],
      platform: [
        "Instagram",
        "Facebook",
        "WhatsApp",
        "Instagram",
        "Google",
        "Instagram",
        "Instagram"
      ][(day - 1) % 7],
      posted: day < now.getDate()
    });
  }
  return posts;
}
function makeMockCalendar(niche = "Salon", city = "Mumbai", goal = "Get 50 new clients") {
  return {
    id: `${niche}-${city}-${Date.now()}`.replace(/\s/g, "-").toLowerCase(),
    niche,
    city,
    goal,
    posts: generateMockPosts(niche),
    generatedAt: Date.now(),
    month: (/* @__PURE__ */ new Date()).toLocaleString("default", {
      month: "long",
      year: "numeric"
    })
  };
}
const DEFAULT_CALENDAR = makeMockCalendar();
function useContentCalendars() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["contentCalendars"],
    queryFn: async () => {
      var _a;
      if (!actor) return [DEFAULT_CALENDAR];
      try {
        const raw = await ((_a = actor.listContentCalendars) == null ? void 0 : _a.call(actor));
        if (!(raw == null ? void 0 : raw.length)) return [DEFAULT_CALENDAR];
        return raw;
      } catch {
        return [DEFAULT_CALENDAR];
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useGenerateContentCalendar() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      niche,
      city,
      goal
    }) => {
      var _a;
      if (!actor) return makeMockCalendar(niche, city, goal);
      try {
        const result = await ((_a = actor.generateContentCalendar) == null ? void 0 : _a.call(actor, niche, city, goal));
        return result ?? makeMockCalendar(niche, city, goal);
      } catch {
        return makeMockCalendar(niche, city, goal);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contentCalendars"] })
  });
}
function useMarkPostPosted() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      calendarId,
      postId
    }) => {
      var _a;
      if (!actor) return;
      await ((_a = actor.markPostPosted) == null ? void 0 : _a.call(actor, calendarId, postId));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contentCalendars"] })
  });
}
const NICHES = [
  "Salon",
  "Gym",
  "Clinic",
  "Restaurant",
  "Real Estate",
  "Coaching",
  "Other"
];
const GOALS = [
  "Get 50 new clients",
  "Increase bookings by 20%",
  "Grow Instagram to 5,000 followers",
  "Generate 100 enquiries",
  "Boost revenue by 30%"
];
const POST_TYPE_CONFIG = {
  Reel: {
    label: "Reel",
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-300/40 dark:border-purple-700/40",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3" })
  },
  Carousel: {
    label: "Carousel",
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-300/40 dark:border-blue-700/40",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3 h-3" })
  },
  Story: {
    label: "Story",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-300/40 dark:border-emerald-700/40",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
  },
  Ad: {
    label: "Ad",
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-300/40 dark:border-orange-700/40",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-3 h-3" })
  },
  Blog: {
    label: "Blog",
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" })
  },
  Social: {
    label: "Social",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-300/40",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3 h-3" })
  },
  Email: {
    label: "Email",
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/20",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-3 h-3" })
  },
  Video: {
    label: "Video",
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3" })
  }
};
const MOTIVATIONAL = [
  "Keep going! Consistency builds enquiries.",
  "You're on a streak! Daily posts = daily leads.",
  "Every post is a touchpoint with a future client.",
  "Halfway there — keep showing up for your audience.",
  "Almost done — your best month ever starts now!"
];
function copyText(text, label = "Copied!") {
  navigator.clipboard.writeText(text).then(() => ue.success(label));
}
function PostTypePill({ type }) {
  const cfg = POST_TYPE_CONFIG[type] ?? POST_TYPE_CONFIG.Reel;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`,
      children: [
        cfg.icon,
        cfg.label
      ]
    }
  );
}
function PostDetailPanel({ post, calendarId, onClose }) {
  const markPosted = useMarkPostPosted();
  const cfg = POST_TYPE_CONFIG[post.postType] ?? POST_TYPE_CONFIG.Reel;
  const copyAll = () => {
    var _a;
    const parts = [
      post.hook ? `Hook:
${post.hook}` : "",
      post.caption ? `Caption:
${post.caption}` : "",
      ((_a = post.hashtags) == null ? void 0 : _a.length) ? `Hashtags:
${post.hashtags.join(" ")}` : ""
    ].filter(Boolean).join("\n\n");
    copyText(parts, "All content copied!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
      transition: { type: "spring", stiffness: 320, damping: 30 },
      className: "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col",
      "data-ocid": "content_calendar.post_detail.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `w-8 h-8 rounded-lg flex items-center justify-center ${cfg.bg}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cfg.text, children: cfg.icon })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Day ",
                post.day
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PostTypePill, { type: post.postType })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "p-1.5 rounded-md hover:bg-muted transition-colors",
              "data-ocid": "content_calendar.post_detail.close_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [
          post.hook && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Hook" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => copyText(post.hook, "Hook copied!"),
                  className: "p-1 rounded hover:bg-muted transition-colors",
                  "data-ocid": "content_calendar.post_detail.copy_hook",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground leading-snug", children: post.hook })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Script / Body" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: post.title })
          ] }),
          post.caption && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Caption" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => copyText(post.caption, "Caption copied!"),
                    className: "p-1 rounded hover:bg-muted transition-colors",
                    "data-ocid": "content_calendar.post_detail.copy_caption",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground bg-muted/40 rounded-lg p-3 leading-relaxed", children: post.caption })
            ] })
          ] }),
          post.hashtags && post.hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3 h-3" }),
                  " Hashtags"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => copyText(post.hashtags.join(" "), "Hashtags copied!"),
                    className: "p-1 rounded hover:bg-muted transition-colors",
                    "data-ocid": "content_calendar.post_detail.copy_hashtags",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 text-muted-foreground" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: post.hashtags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs text-primary bg-primary/10 rounded-full px-2.5 py-1 font-medium",
                  children: tag.startsWith("#") ? tag : `#${tag}`
                },
                tag
              )) })
            ] })
          ] }),
          post.platform && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Platform" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: post.platform })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-border space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "w-full",
              variant: "outline",
              onClick: copyAll,
              "data-ocid": "content_calendar.post_detail.copy_all_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 mr-2" }),
                "Copy All"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "w-full",
              variant: post.posted ? "outline" : "default",
              disabled: markPosted.isPending,
              onClick: () => markPosted.mutate({ calendarId, postId: post.id }),
              "data-ocid": "content_calendar.post_detail.mark_posted_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 mr-2" }),
                post.posted ? "Marked as Posted ✓" : "Mark as Posted"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CalendarGrid({ calendar, onDayClick }) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDate = calendar.posts.length > 0 ? new Date(calendar.posts[0].date) : /* @__PURE__ */ new Date();
  const leadingCount = firstDate.getDay();
  const today = (/* @__PURE__ */ new Date()).toDateString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 border-b border-border min-w-[560px]", children: weekdays.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center text-[11px] font-semibold text-muted-foreground py-2 border-r last:border-r-0 border-border bg-muted/30",
        children: d
      },
      d
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 min-w-[560px]", children: [
      Array.from({ length: leadingCount }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "min-h-[90px] border-r border-b border-border bg-muted/10"
        },
        `empty-${i}`
      )),
      calendar.posts.map((post, idx) => {
        const date = new Date(post.date);
        const isToday = date.toDateString() === today;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            type: "button",
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: idx * 0.015, duration: 0.2 },
            onClick: () => onDayClick(post),
            className: [
              "min-h-[90px] border-r border-b border-border p-1.5 text-left relative group",
              "hover:bg-primary/5 transition-colors cursor-pointer",
              isToday ? "bg-primary/5 ring-1 ring-inset ring-primary/40" : "",
              post.posted ? "opacity-60" : "",
              (idx + leadingCount) % 7 === 6 ? "border-r-0" : ""
            ].join(" "),
            "data-ocid": `content_calendar.post.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[11px] font-semibold ${isToday ? "text-primary" : "text-muted-foreground"}`,
                    children: date.getDate()
                  }
                ),
                post.posted && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-emerald-500 shrink-0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PostTypePill, { type: post.postType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-tight", children: post.hook ?? post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 rounded-[1px] pointer-events-none transition-all" })
            ]
          },
          post.id
        );
      })
    ] })
  ] });
}
function CalendarStats({ calendar }) {
  const typeCounts = {};
  for (const p of calendar.posts) {
    typeCounts[p.postType] = (typeCounts[p.postType] ?? 0) + 1;
  }
  const totalPosts = calendar.posts.length;
  const postedCount = calendar.posts.filter((p) => p.posted).length;
  const pct = totalPosts > 0 ? Math.round(postedCount / totalPosts * 100) : 0;
  const motivationalIdx = Math.min(
    Math.floor(pct / 20),
    MOTIVATIONAL.length - 1
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
          postedCount,
          " of ",
          totalPosts,
          " posts completed"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-primary", children: [
          pct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          value: pct,
          className: "h-2",
          "data-ocid": "content_calendar.progress_bar"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: MOTIVATIONAL[motivationalIdx] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: Object.keys(typeCounts).map((type) => {
      const cfg = POST_TYPE_CONFIG[type];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-7 h-7 rounded-md flex items-center justify-center mb-2 ${(cfg == null ? void 0 : cfg.bg) ?? "bg-muted"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: (cfg == null ? void 0 : cfg.text) ?? "text-foreground", children: cfg == null ? void 0 : cfg.icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: typeCounts[type] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          type,
          "s"
        ] })
      ] }, type);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-muted/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Estimated Monthly Reach" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground", children: [
        (totalPosts * 1200).toLocaleString("en-IN"),
        "–",
        (totalPosts * 3500).toLocaleString("en-IN")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Based on industry averages. Actual reach may vary by niche and audience." })
    ] })
  ] });
}
function ContentCalendarPage() {
  const { data: calendars = [], isLoading } = useContentCalendars();
  const generate = useGenerateContentCalendar();
  const [niche, setNiche] = reactExports.useState("Salon");
  const [city, setCity] = reactExports.useState("Mumbai");
  const [goal, setGoal] = reactExports.useState(GOALS[0]);
  const [activeCalendarIdx, setActiveCalendarIdx] = reactExports.useState(0);
  const [selectedPost, setSelectedPost] = reactExports.useState(null);
  const activeCalendar = calendars[activeCalendarIdx] ?? null;
  const handleGenerate = async () => {
    try {
      await generate.mutateAsync({ niche, city, goal });
      ue.success("30-day content calendar generated!");
      setActiveCalendarIdx(0);
    } catch {
      ue.error("Failed to generate. Please try again.");
    }
  };
  const handleDayClick = reactExports.useCallback((post) => {
    setSelectedPost(post);
  }, []);
  const handleCloseDetail = reactExports.useCallback(() => {
    setSelectedPost(null);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-20 md:pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-6 h-6 text-primary" }),
          "Content Calendar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "30 posts/month, auto-generated for your niche and city." })
      ] }),
      activeCalendar && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => {
            const csv = activeCalendar.posts.map(
              (p) => `Day ${p.day},${p.postType},"${p.title}","${p.caption ?? ""}","${(p.hashtags ?? []).join(" ")}"`
            ).join("\n");
            const blob = new Blob(
              [`Day,Type,Title,Caption,Hashtags
${csv}`],
              { type: "text/csv" }
            );
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `content-calendar-${activeCalendar.niche}-${activeCalendar.city}.csv`;
            a.click();
          },
          "data-ocid": "content_calendar.export_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1.5" }),
            "Export CSV"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border-primary/20 bg-gradient-to-br from-card to-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Generate 30 Posts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cal-niche", className: "text-xs", children: "Niche" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: niche, onValueChange: setNiche, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "cal-niche",
                "data-ocid": "content_calendar.niche_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: NICHES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cal-city", className: "text-xs", children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cal-city",
              value: city,
              onChange: (e) => setCity(e.target.value),
              placeholder: "e.g. Mumbai",
              "data-ocid": "content_calendar.city_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cal-goal", className: "text-xs", children: "Monthly Goal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: goal, onValueChange: setGoal, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "cal-goal",
                "data-ocid": "content_calendar.goal_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GOALS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: handleGenerate,
            disabled: generate.isPending,
            className: "gap-2",
            "data-ocid": "content_calendar.generate_submit_button",
            children: generate.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }),
              " Generating…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
              " Generate 30 Posts"
            ] })
          }
        ),
        generate.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Creating your personalised content plan…" })
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading calendars…" })
    ] }) }),
    !isLoading && calendars.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      calendars.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Tabs,
        {
          value: String(activeCalendarIdx),
          onValueChange: (v) => setActiveCalendarIdx(Number(v)),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "h-8", children: calendars.map((cal, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsTrigger,
            {
              value: String(idx),
              className: "text-xs px-3",
              "data-ocid": `content_calendar.tab.${idx + 1}`,
              children: [
                cal.niche,
                " — ",
                cal.city
              ]
            },
            cal.id
          )) })
        }
      ),
      activeCalendar && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between py-3 px-5 border-b border-border bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold", children: [
                    activeCalendar.month,
                    " — ",
                    activeCalendar.niche,
                    " in",
                    " ",
                    activeCalendar.city
                  ] }),
                  activeCalendar.goal && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] hidden sm:inline-flex",
                      children: activeCalendar.goal
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex items-center gap-2", children: ["Reel", "Carousel", "Story", "Ad"].map(
                    (t) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostTypePill, { type: t }, t)
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    activeCalendar.posts.filter((p) => p.posted).length,
                    "/",
                    activeCalendar.posts.length,
                    " posted"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CalendarGrid,
                {
                  calendar: activeCalendar,
                  onDayClick: handleDayClick
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarStats, { calendar: activeCalendar })
          ]
        },
        activeCalendar.id
      )
    ] }),
    !isLoading && calendars.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "content_calendar.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-1", children: "No calendar yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Fill in your niche, city, and goal above — then generate your first 30-day content plan." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedPost && activeCalendar && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
          onClick: handleCloseDetail
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PostDetailPanel,
        {
          post: selectedPost,
          calendarId: activeCalendar.id,
          onClose: handleCloseDetail
        }
      )
    ] }) })
  ] });
}
export {
  ContentCalendarPage as default
};
