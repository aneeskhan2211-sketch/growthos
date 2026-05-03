import { aG as useMetaTags, j as jsxRuntimeExports, h as Badge, y as motion, aN as PAGE_META, r as reactExports, n as Card, o as CardHeader, aw as CardTitle, p as CardContent, bH as useViralLoop, i as Button, A as AnimatePresence, m as ue } from "./index-DcPx_5wo.js";
const FUNNEL_STEPS = [
  { key: "link_generated", label: "Link Generated", count: 4820 },
  { key: "share_clicked", label: "Share Clicked", count: 2176 },
  { key: "landing_view", label: "Landing View", count: 1543 },
  { key: "signup_started", label: "Signup Started", count: 894 },
  { key: "signup_completed", label: "Signup Completed", count: 601 },
  { key: "reward_claimed", label: "Reward Claimed", count: 327 }
];
const TRAFFIC_SOURCES = [
  { label: "Referral", pct: 43, color: "bg-primary" },
  { label: "Organic", pct: 28, color: "bg-success" },
  { label: "Direct", pct: 19, color: "bg-warning" },
  { label: "Ads", pct: 10, color: "bg-destructive" }
];
const FEATURE_GATES = [
  {
    id: "export_leads",
    name: "Export Leads",
    requiredInvites: 3,
    currentInvites: 1,
    isUnlocked: false,
    description: "Download all leads as CSV"
  },
  {
    id: "bulk_send",
    name: "Bulk Send",
    requiredInvites: 3,
    currentInvites: 3,
    isUnlocked: true,
    activeUntil: "May 8, 2026",
    description: "Send messages to 50+ leads at once"
  },
  {
    id: "advanced_analytics",
    name: "Advanced Analytics",
    requiredInvites: 5,
    currentInvites: 1,
    isUnlocked: false,
    description: "Deep-dive funnel & cohort reports"
  }
];
const NUDGE_TYPES = [
  {
    key: "urgency",
    label: "Urgency",
    icon: "⚡",
    sent: 12480,
    actionRate: 18.2,
    bestSegment: "Medium Activity",
    barWidth: 65
  },
  {
    key: "fomo",
    label: "FOMO",
    icon: "👀",
    sent: 9340,
    actionRate: 21.7,
    bestSegment: "New Users",
    barWidth: 78
  },
  {
    key: "reward",
    label: "Reward",
    icon: "🎁",
    sent: 7620,
    actionRate: 28.4,
    bestSegment: "High Intent",
    barWidth: 100
  },
  {
    key: "money",
    label: "Revenue",
    icon: "₹",
    sent: 5180,
    actionRate: 23.1,
    bestSegment: "Paying Users",
    barWidth: 81
  }
];
const WEEK_LABEL = "Week of May 2026";
const CITIES = ["All Cities", "Mumbai", "Pune", "Delhi", "Bangalore"];
function ReferralFunnelSection() {
  const [period, setPeriod] = reactExports.useState("30");
  const steps = FUNNEL_STEPS;
  const maxCount = steps[0].count;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", "data-ocid": "vlm.funnel_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4 flex-row items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Referral Funnel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Step-by-step conversion from link to reward" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-lg border border-border overflow-hidden flex-shrink-0", children: ["7", "30"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setPeriod(d),
          "data-ocid": `vlm.funnel_period_${d}d`,
          className: `px-3 h-7 text-xs font-medium transition-colors ${period === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`,
          children: [
            d,
            "d"
          ]
        },
        d
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: steps.map((step, i) => {
        const prevCount = i === 0 ? step.count : steps[i - 1].count;
        const pct = i === 0 ? 100 : Math.round(step.count / prevCount * 100);
        const barW = Math.round(step.count / maxCount * 100);
        const isDropAlert = i > 0 && pct < 20;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `vlm.funnel_step.${i + 1}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: i + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: step.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground tabular-nums", children: step.count.toLocaleString("en-IN") }),
                  i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-[10px] h-4 px-1.5 ${pct >= 40 ? "bg-success/10 text-success border-success/20" : pct >= 20 ? "bg-warning/10 text-warning border-warning/20" : "bg-destructive/10 text-destructive border-destructive/20"}`,
                      children: [
                        pct,
                        "%"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "h-full bg-primary rounded-full",
                  initial: { width: 0 },
                  animate: { width: `${barW}%` },
                  transition: {
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }
                }
              ) })
            ] })
          ] }),
          isDropAlert && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              className: "ml-8 mt-1.5 flex items-center gap-1.5 text-xs text-destructive bg-destructive/5 border border-destructive/15 rounded-md px-2.5 py-1.5",
              "data-ocid": `vlm.funnel_alert.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "⚠" }),
                "Only ",
                pct,
                "% continue from ",
                steps[i - 1].label,
                " to",
                " ",
                step.label
              ]
            }
          )
        ] }, step.key);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-foreground mb-3", children: [
          "Traffic Sources (last ",
          period,
          " days)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: TRAFFIC_SOURCES.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-14 flex-shrink-0", children: src.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: `h-full rounded-full ${src.color}`,
              initial: { width: 0 },
              animate: { width: `${src.pct}%` },
              transition: { duration: 0.6, ease: "easeOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-foreground w-8 text-right tabular-nums", children: [
            src.pct,
            "%"
          ] })
        ] }, src.label)) })
      ] })
    ] })
  ] });
}
const METRIC_OPTIONS = [
  { value: "leads_generated", label: "Leads Generated" },
  { value: "deal_closed", label: "Deal Closed (₹)" },
  { value: "messages_sent", label: "Messages Sent" }
];
const RECENT_SHARES = [
  {
    id: "s1",
    text: "I generated 47 leads today!",
    platform: "WhatsApp",
    ts: "2h ago",
    icon: "wa"
  },
  {
    id: "s2",
    text: "Closed ₹35,000 deal!",
    platform: "LinkedIn",
    ts: "5h ago",
    icon: "li"
  },
  {
    id: "s3",
    text: "Sent 120 messages today!",
    platform: "Instagram",
    ts: "Yesterday",
    icon: "ig"
  },
  {
    id: "s4",
    text: "I generated 30 leads today!",
    platform: "WhatsApp",
    ts: "2 days ago",
    icon: "wa"
  },
  {
    id: "s5",
    text: "Closed ₹50,000 deal!",
    platform: "LinkedIn",
    ts: "3 days ago",
    icon: "li"
  }
];
function PlatformIcon({ icon }) {
  if (icon === "wa") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex w-5 h-5 rounded-full items-center justify-center bg-[#25D366]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        width: "11",
        height: "11",
        viewBox: "0 0 24 24",
        fill: "white",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
      }
    ) });
  }
  if (icon === "li") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex w-5 h-5 rounded-full items-center justify-center bg-[#0077B5]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        width: "11",
        height: "11",
        viewBox: "0 0 24 24",
        fill: "white",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" })
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex w-5 h-5 rounded-full items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "white",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "17.5", cy: "6.5", r: "0.8", fill: "white", stroke: "none" })
      ]
    }
  ) });
}
function WinSharingPanel() {
  const { wins } = useViralLoop();
  const { createWin } = wins;
  const [metricType, setMetricType] = reactExports.useState("leads_generated");
  const [metricValue, setMetricValue] = reactExports.useState("47");
  const [activePlatform, setActivePlatform] = reactExports.useState(null);
  const referralLink = "https://growthos.app/ref/USR7842";
  const generatePreview = () => {
    const typeLabel = metricType === "leads_generated" ? `${metricValue} leads` : metricType === "deal_closed" ? `₹${metricValue} deal` : `${metricValue} messages`;
    return `I generated ${typeLabel} today! 🎯 [via GrowthOS referral link]`;
  };
  const currentPreview = generatePreview();
  const trackShare = (platform) => {
    setActivePlatform(platform);
    if (platform === "whatsapp") {
      const text = encodeURIComponent(
        `${currentPreview}

Join free → ${referralLink}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
      createWin(
        metricValue,
        metricType === "leads_generated" ? "leads" : "deal"
      );
    } else if (platform === "instagram") {
      const caption = `${currentPreview}

#GrowthOS #DigitalMarketing #IndiaStartup`;
      navigator.clipboard.writeText(caption).then(() => ue.success("Caption copied! Paste on Instagram")).catch(() => ue.info("Caption ready to paste on Instagram"));
    } else if (platform === "linkedin") {
      const url = encodeURIComponent(referralLink);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank"
      );
    }
    ue.success(`Shared on ${platform}!`);
    setTimeout(() => setActivePlatform(null), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", "data-ocid": "vlm.win_sharing_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Share Your Win" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Auto-generate a shareable card for any milestone" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "vlm-metric-type",
              className: "block text-xs font-medium text-muted-foreground mb-1.5",
              children: "Metric Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "vlm-metric-type",
              value: metricType,
              onChange: (e) => setMetricType(e.target.value),
              "data-ocid": "vlm.win_metric_type_select",
              className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
              children: METRIC_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "vlm-metric-value",
              className: "block text-xs font-medium text-muted-foreground mb-1.5",
              children: "Value"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "vlm-metric-value",
              type: "text",
              value: metricValue,
              onChange: (e) => setMetricValue(e.target.value),
              placeholder: "47",
              "data-ocid": "vlm.win_value_input",
              className: "w-full h-9 px-3 rounded-md border border-input bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary mb-1", children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground leading-relaxed", children: [
          '"',
          currentPreview,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => trackShare("whatsapp"),
            disabled: activePlatform === "whatsapp",
            "data-ocid": "vlm.share_whatsapp_button",
            className: "flex-1 gap-1.5 h-8 text-xs bg-[#25D366] hover:bg-[#22c55e] text-white border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { icon: "wa" }),
              "WhatsApp"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => trackShare("instagram"),
            disabled: activePlatform === "instagram",
            "data-ocid": "vlm.share_instagram_button",
            className: "flex-1 gap-1.5 h-8 text-xs border-pink-400/40 text-pink-500 hover:bg-pink-50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { icon: "ig" }),
              "Instagram"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => trackShare("linkedin"),
            disabled: activePlatform === "linkedin",
            "data-ocid": "vlm.share_linkedin_button",
            className: "flex-1 gap-1.5 h-8 text-xs border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { icon: "li" }),
              "LinkedIn"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Recent shares" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: RECENT_SHARES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `vlm.recent_share.${i + 1}`,
            className: "flex items-center gap-2.5 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { icon: s.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 text-foreground truncate min-w-0", children: [
                '"',
                s.text,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground flex-shrink-0 tabular-nums", children: s.ts })
            ]
          },
          s.id
        )) })
      ] })
    ] })
  ] });
}
const LEADERBOARD_DATA = [
  {
    rank: 1,
    userName: "Rohan Sharma",
    city: "Mumbai",
    value: 94,
    avatarInitials: "RS"
  },
  {
    rank: 2,
    userName: "Priya Patel",
    city: "Pune",
    value: 88,
    avatarInitials: "PP"
  },
  {
    rank: 3,
    userName: "Arjun Nair",
    city: "Bangalore",
    value: 81,
    avatarInitials: "AN"
  },
  {
    rank: 4,
    userName: "You",
    city: "Mumbai",
    value: 67,
    avatarInitials: "YO",
    isCurrentUser: true
  },
  {
    rank: 5,
    userName: "Neha Gupta",
    city: "Delhi",
    value: 62,
    avatarInitials: "NG"
  },
  {
    rank: 6,
    userName: "Kiran Rao",
    city: "Bangalore",
    value: 55,
    avatarInitials: "KR"
  },
  {
    rank: 7,
    userName: "Deepak Singh",
    city: "Mumbai",
    value: 49,
    avatarInitials: "DS"
  },
  {
    rank: 8,
    userName: "Sunita Verma",
    city: "Pune",
    value: 41,
    avatarInitials: "SV"
  }
];
const RANK_BORDERS = {
  1: "border-l-4 border-l-amber-400",
  2: "border-l-4 border-l-muted-foreground",
  3: "border-l-4 border-l-amber-700"
};
const RANK_ICONS = { 1: "🥇", 2: "🥈", 3: "🥉" };
function ChallengeLeaderboardSection() {
  const [cityFilter, setCityFilter] = reactExports.useState("All Cities");
  const [joined, setJoined] = reactExports.useState(true);
  const filtered = cityFilter === "All Cities" ? LEADERBOARD_DATA : LEADERBOARD_DATA.filter(
    (e) => e.city === cityFilter || e.isCurrentUser
  );
  const userRow = LEADERBOARD_DATA.find((e) => e.isCurrentUser);
  const userProgress = userRow ? Math.round(userRow.value / 100 * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "vlm.challenge_leaderboard_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex-row items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Challenge Leaderboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              WEEK_LABEL,
              " · Goal: 100 leads"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: cityFilter,
              onChange: (e) => setCityFilter(e.target.value),
              "data-ocid": "vlm.leaderboard_city_filter",
              className: "text-xs border border-border/60 rounded-lg px-2 h-7 bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30",
              children: CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-4 space-y-4", children: [
          userRow && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/15 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary", children: "Your Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-primary tabular-nums", children: [
                userRow.value,
                "/100 leads"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-primary/15 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-primary rounded-full",
                initial: { width: 0 },
                animate: { width: `${userProgress}%` },
                transition: { duration: 0.8, ease: "easeOut" }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
              100 - userRow.value,
              " more leads to win"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filtered.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `vlm.leaderboard_row.${i + 1}`,
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.05 },
              className: `flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${entry.isCurrentUser ? "bg-primary/8 border border-primary/15" : "hover:bg-muted/30"} ${RANK_BORDERS[entry.rank] ?? ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 text-center flex-shrink-0", children: RANK_ICONS[entry.rank] ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: RANK_ICONS[entry.rank] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: entry.rank }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${entry.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
                    children: entry.avatarInitials
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: `text-xs font-medium truncate ${entry.isCurrentUser ? "text-primary" : "text-foreground"}`,
                      children: [
                        entry.userName,
                        entry.isCurrentUser && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 opacity-60", children: "(You)" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: entry.city })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold tabular-nums text-foreground", children: entry.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "leads" })
                ] })
              ]
            },
            entry.userName
          )) }) }),
          !joined ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full gap-2",
              onClick: () => {
                setJoined(true);
                ue.success("Joined the weekly challenge! 🎯");
              },
              "data-ocid": "vlm.join_challenge_button",
              children: "Join Challenge"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-success bg-success/8 border border-success/20 rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "6",
                      cy: "6",
                      r: "5",
                      stroke: "currentColor",
                      strokeWidth: "1.2"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M3.5 6 L5.5 8 L8.5 4",
                      stroke: "currentColor",
                      strokeWidth: "1.3",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "You're participating this week" })
          ] })
        ] })
      ]
    }
  );
}
function FeatureGateCard({
  gate,
  index
}) {
  const { referral } = useViralLoop();
  const { copyLink } = referral;
  const pct = Math.min(
    100,
    Math.round(gate.currentInvites / gate.requiredInvites * 100)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.08 },
      "data-ocid": `vlm.feature_gate.${index + 1}`,
      className: `rounded-xl border p-4 transition-all ${gate.isUnlocked ? "border-success/30 bg-success/5" : "border-border bg-card"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: gate.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: gate.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${gate.isUnlocked ? "bg-success/15" : "bg-muted"}`,
              children: gate.isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 14 14",
                  fill: "none",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: "2.5",
                        y: "6",
                        width: "9",
                        height: "7",
                        rx: "1.2",
                        stroke: "currentColor",
                        strokeWidth: "1.2",
                        className: "text-success"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M5 6 L5 3.5 C5 2.1 5.9 1 7 1 C8.1 1 9 2.1 9 3.5",
                        stroke: "currentColor",
                        strokeWidth: "1.2",
                        strokeLinecap: "round",
                        className: "text-success opacity-40"
                      }
                    )
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 14 14",
                  fill: "none",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "rect",
                      {
                        x: "2.5",
                        y: "6",
                        width: "9",
                        height: "7",
                        rx: "1.2",
                        stroke: "currentColor",
                        strokeWidth: "1.2",
                        className: "text-muted-foreground"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M5 6 L5 3.5 C5 2.1 5.9 1 7 1 C8.1 1 9 2.1 9 3.5 L9 6",
                        stroke: "currentColor",
                        strokeWidth: "1.2",
                        strokeLinecap: "round",
                        className: "text-muted-foreground"
                      }
                    )
                  ]
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              gate.currentInvites,
              "/",
              gate.requiredInvites,
              " invites"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-[10px] font-semibold ${gate.isUnlocked ? "text-success" : "text-primary"}`,
                children: [
                  pct,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: `h-full rounded-full ${gate.isUnlocked ? "bg-success" : "bg-primary"}`,
              initial: { width: 0 },
              animate: { width: `${pct}%` },
              transition: { duration: 0.7, ease: "easeOut" }
            }
          ) })
        ] }),
        gate.isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-success font-medium", children: [
            "Active until ",
            gate.activeUntil
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "w-full h-7 text-xs gap-1 border-success/30 text-success hover:bg-success/10",
              "data-ocid": `vlm.feature_gate_use_button.${index + 1}`,
              onClick: () => ue.success(`Opening ${gate.name}...`),
              children: "Use Now →"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "w-full h-7 text-xs text-primary hover:bg-primary/10",
            "data-ocid": `vlm.feature_gate_invite_button.${index + 1}`,
            onClick: () => {
              copyLink();
              ue.success(
                "Invite link copied! Share it to unlock this feature."
              );
            },
            children: "Share invite link →"
          }
        )
      ]
    }
  );
}
function FeatureGatesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "vlm.feature_gates_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Invite-to-Unlock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Invite friends to temporarily unlock premium features" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: FEATURE_GATES.map((gate, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureGateCard, { gate, index: i }, gate.id)) }) })
      ]
    }
  );
}
function NudgePerformanceSection() {
  const maxRate = Math.max(...NUDGE_TYPES.map((n) => n.actionRate));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "vlm.nudge_performance_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Nudge Performance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Action rates by nudge type and best-performing segment" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3 mb-5", children: NUDGE_TYPES.map((nudge, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.07 },
              "data-ocid": `vlm.nudge_cell.${nudge.key}`,
              className: "rounded-xl border border-border bg-muted/20 p-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: nudge.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: nudge.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                      nudge.sent.toLocaleString("en-IN"),
                      " sent"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-sm font-bold tabular-nums ${nudge.actionRate >= 25 ? "text-success" : "text-primary"}`,
                      children: [
                        nudge.actionRate,
                        "%"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: `h-full rounded-full ${nudge.actionRate >= 25 ? "bg-success" : "bg-primary"}`,
                    initial: { width: 0 },
                    animate: { width: `${nudge.barWidth}%` },
                    transition: {
                      duration: 0.7,
                      delay: i * 0.07,
                      ease: "easeOut"
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                  "Best:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: nudge.bestSegment })
                ] })
              ]
            },
            nudge.key
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-success/5 border border-success/20 rounded-xl px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none",
                "aria-hidden": "true",
                className: "text-success flex-shrink-0 mt-0.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "8",
                      cy: "8",
                      r: "6.5",
                      stroke: "currentColor",
                      strokeWidth: "1.3"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M8 5 L8 8.5",
                      stroke: "currentColor",
                      strokeWidth: "1.4",
                      strokeLinecap: "round"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "8", cy: "11", r: "0.8", fill: "currentColor" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-success", children: "Reward nudges" }),
              " ",
              "perform best for High Intent users with a",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
                maxRate,
                "% action rate"
              ] }),
              " — 1.5× higher than Urgency nudges. Consider increasing reward nudge frequency for users with 3+ lead sessions."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-3", children: "Relative action rates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [...NUDGE_TYPES].sort((a, b) => b.actionRate - a.actionRate).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-14 flex-shrink-0", children: [
                n.icon,
                " ",
                n.label
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: `h-full rounded-full ${n.actionRate >= 25 ? "bg-success" : "bg-primary"}`,
                  initial: { width: 0 },
                  animate: { width: `${n.actionRate / maxRate * 100}%` },
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold tabular-nums text-foreground w-10 text-right", children: [
                n.actionRate,
                "%"
              ] })
            ] }, n.key)) })
          ] })
        ] })
      ]
    }
  );
}
function ViralLoopManagerPage() {
  useMetaTags(PAGE_META["/growth-engine/viral-loop"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-8", "data-ocid": "vlm.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-4 py-4 lg:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Viral Loop" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Referral funnel · Win sharing · Challenges · Growth loops" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "outline",
          className: "bg-success/10 text-success border-success/20 text-xs",
          children: "Live"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 lg:px-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReferralFunnelSection, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.08 },
          className: "grid lg:grid-cols-2 gap-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(WinSharingPanel, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChallengeLeaderboardSection, {})
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.16 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureGatesSection, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.24 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(NudgePerformanceSection, {})
        }
      )
    ] })
  ] });
}
export {
  ViralLoopManagerPage as default
};
