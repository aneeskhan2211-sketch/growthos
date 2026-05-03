import { aG as useMetaTags, r as reactExports, j as jsxRuntimeExports, y as motion, n as Card, p as CardContent, o as CardHeader, aw as CardTitle, I as Input, A as AnimatePresence, i as Button, $ as Skeleton, aN as PAGE_META, u as useActor, a as useQuery, bC as ReferralStatus, h as Badge, bD as useMilestones, a$ as useNavigate, e as createActor } from "./index-DcPx_5wo.js";
function useReferralStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["referral-stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getReferralStats();
    },
    enabled: !!actor && !isFetching
  });
}
function useUserReferrals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["user-referrals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUserReferrals();
    },
    enabled: !!actor && !isFetching
  });
}
const REFERRAL_CODE = "GROW-X7K2";
const REFERRAL_URL = `${typeof window !== "undefined" ? window.location.origin : "https://growthos.app"}?ref=${REFERRAL_CODE}`;
const SHARE_MSG = `🚀 I use GrowthOS to get leads and close clients for my agency. Join with my link and we BOTH get 50 bonus credits + 7 days free! ${REFERRAL_URL}`;
function logShare(channel) {
  try {
    if (typeof window !== "undefined" && "analytics" in window) {
    }
  } catch {
  }
  console.info("[analytics] referral_shared", { channel });
}
function StatusBadge({ status }) {
  if (status === ReferralStatus.completed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        className: "bg-success/15 text-success border-success/20 gap-1.5",
        variant: "outline",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ),
          "Rewarded"
        ]
      }
    );
  }
  if (status === ReferralStatus.signedUp) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        className: "bg-primary/15 text-primary border-primary/20 gap-1.5",
        variant: "outline",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ),
          "Signed Up"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      className: "bg-muted/60 text-muted-foreground border-border",
      variant: "outline",
      children: "Pending"
    }
  );
}
function StatTile({ label, value, icon, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": ocid, className: "bg-card border-border text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-5 pb-4 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mx-auto mb-3", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground tabular-nums mb-0.5", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: label })
  ] }) });
}
function MiniMilestoneCard({ milestone: m }) {
  const pct = Math.min(
    100,
    Math.round(m.currentInvites / m.requiredInvites * 100)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `referral.milestone_card.${m.tier}`,
      className: `rounded-xl border p-4 flex flex-col gap-2.5 ${m.status === "unlocked" ? "border-primary/30 bg-primary/5" : "border-border/50 bg-card"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: m.title }),
          m.status === "locked" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              width: "14",
              height: "14",
              viewBox: "0 0 14 14",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "text-muted-foreground",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "6", width: "8", height: "6", rx: "1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 6 L5 4 C5 2.9 5.9 2 7 2 C8.1 2 9 2.9 9 4 L9 6" })
              ]
            }
          ),
          m.status === "unlocked" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-bold", children: "✓ Active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: m.unlockDetail }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              m.currentInvites,
              "/",
              m.requiredInvites,
              " invites"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-muted-foreground", children: [
              pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-muted/50 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-primary",
              initial: { width: 0 },
              animate: { width: `${pct}%` },
              transition: { duration: 0.8, ease: "easeOut" }
            }
          ) })
        ] })
      ]
    }
  );
}
function MilestoneProgressSection() {
  const { milestones } = useMilestones();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex-row items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Milestone Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Refer friends to unlock powerful features for free" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "outline",
          className: "h-8 text-xs gap-1.5 shrink-0",
          onClick: () => navigate({ to: "/viral-loop" }),
          "data-ocid": "referral.share_to_unlock_button",
          children: "Share to unlock →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MiniMilestoneCard, { milestone: m }, m.id)) }) })
  ] });
}
function ReferralPage() {
  useMetaTags(PAGE_META["/referral"]);
  const [copied, setCopied] = reactExports.useState(false);
  const { data: stats, isLoading: statsLoading } = useReferralStats();
  const { data: referrals, isLoading: referralsLoading } = useUserReferrals();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_URL);
    } catch {
      const el = document.createElement("textarea");
      el.value = REFERRAL_URL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    logShare("copy");
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleWhatsApp = () => {
    logShare("whatsapp");
    window.open(
      `https://wa.me/?text=${encodeURIComponent(SHARE_MSG)}`,
      "_blank"
    );
  };
  const handleEmail = () => {
    logShare("email");
    window.open(
      `mailto:?subject=${encodeURIComponent("Join GrowthOS — Get 50 Credits Free")}&body=${encodeURIComponent(SHARE_MSG)}`,
      "_blank"
    );
  };
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join GrowthOS",
          text: SHARE_MSG,
          url: REFERRAL_URL
        });
        logShare("native");
      } catch {
      }
    } else {
      await handleCopy();
    }
  };
  const rewardsLabel = stats ? `${Number(stats.creditsEarned)} credits + ${Number(stats.trialDaysEarned)} days` : "0 credits + 0 days";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-24 lg:pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-4 py-4 lg:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Refer & Earn" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 lg:px-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: "easeOut" },
          "data-ocid": "referral.hero_card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-8 pb-6 px-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 mx-auto mb-4 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "28",
                height: "28",
                viewBox: "0 0 28 28",
                fill: "none",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M14 18 C9.5 18 6 14.5 6 10 L6 5 L22 5 L22 10 C22 14.5 18.5 18 14 18 Z",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinejoin: "round",
                      className: "text-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M10 22 L18 22 M14 18 L14 22",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      className: "text-primary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M6 7 L3 7 L3 11 C3 13 4.5 14.5 6 15",
                      stroke: "currentColor",
                      strokeWidth: "1.4",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: "text-primary",
                      opacity: "0.7"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M22 7 L25 7 L25 11 C25 13 23.5 14.5 22 15",
                      stroke: "currentColor",
                      strokeWidth: "1.4",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: "text-primary",
                      opacity: "0.7"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M11 9.5 L13 11.5 L17 7.5",
                      stroke: "currentColor",
                      strokeWidth: "1.6",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: "text-primary"
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground mb-2", children: "Invite friends, earn together" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed", children: [
              "When a friend signs up using your link, you",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "BOTH" }),
              " get:"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mt-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-primary/12 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20", children: [
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
                          d: "M6 3.5 L6 6.5 L8 8",
                          stroke: "currentColor",
                          strokeWidth: "1.2",
                          strokeLinecap: "round"
                        }
                      )
                    ]
                  }
                ),
                "50 bonus lead credits"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-success/12 text-success text-xs font-semibold px-3 py-1.5 rounded-full border border-success/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12",
                    fill: "none",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "path",
                      {
                        d: "M2 6 L5 9 L10 3",
                        stroke: "currentColor",
                        strokeWidth: "1.4",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                ),
                "7 days free trial"
              ] })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.08, ease: "easeOut" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Your referral link" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    "data-ocid": "referral.link_input",
                    readOnly: true,
                    value: REFERRAL_URL,
                    className: "flex-1 bg-muted/40 border-border text-xs text-muted-foreground font-mono select-all",
                    "aria-label": "Referral link"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0.88, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.88, opacity: 0 },
                    transition: { duration: 0.18 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "secondary",
                        className: "gap-1.5 shrink-0 bg-success/15 text-success border-success/20 hover:bg-success/20",
                        "data-ocid": "referral.copied_state",
                        disabled: true,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "svg",
                            {
                              width: "14",
                              height: "14",
                              viewBox: "0 0 14 14",
                              fill: "none",
                              "aria-hidden": "true",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "path",
                                {
                                  d: "M2 7 L5.5 10.5 L12 3.5",
                                  stroke: "currentColor",
                                  strokeWidth: "1.6",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                }
                              )
                            }
                          ),
                          "Copied!"
                        ]
                      }
                    )
                  },
                  "copied"
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0.88, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.88, opacity: 0 },
                    transition: { duration: 0.18 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "default",
                        className: "gap-1.5 shrink-0",
                        onClick: handleCopy,
                        "data-ocid": "referral.copy_button",
                        "aria-label": "Copy referral link",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                                    x: "4",
                                    y: "4",
                                    width: "8",
                                    height: "9",
                                    rx: "1.2",
                                    stroke: "currentColor",
                                    strokeWidth: "1.3"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "path",
                                  {
                                    d: "M4 4 L4 3 C4 2.4 4.4 2 5 2 L11 2 C11.6 2 12 2.4 12 3 L12 10 C12 10.6 11.6 11 11 11 L10 11",
                                    stroke: "currentColor",
                                    strokeWidth: "1.2",
                                    strokeLinecap: "round"
                                  }
                                )
                              ]
                            }
                          ),
                          "Copy Link"
                        ]
                      }
                    )
                  },
                  "copy"
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mr-1", children: "Share via:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "gap-1.5 h-8 px-3 text-xs border-border hover:border-[#25D366]/40 hover:text-[#25D366]",
                    onClick: handleWhatsApp,
                    "data-ocid": "referral.share_whatsapp",
                    "aria-label": "Share on WhatsApp",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          width: "13",
                          height: "13",
                          viewBox: "0 0 24 24",
                          fill: "currentColor",
                          "aria-hidden": "true",
                          className: "shrink-0",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                        }
                      ),
                      "WhatsApp"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "gap-1.5 h-8 px-3 text-xs border-border hover:border-primary/40 hover:text-primary",
                    onClick: handleEmail,
                    "data-ocid": "referral.share_email",
                    "aria-label": "Share via email",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "svg",
                        {
                          width: "13",
                          height: "13",
                          viewBox: "0 0 14 14",
                          fill: "none",
                          "aria-hidden": "true",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "rect",
                              {
                                x: "1.5",
                                y: "3",
                                width: "11",
                                height: "8",
                                rx: "1.2",
                                stroke: "currentColor",
                                strokeWidth: "1.2"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M1.5 4 L7 7.5 L12.5 4",
                                stroke: "currentColor",
                                strokeWidth: "1.2",
                                strokeLinecap: "round"
                              }
                            )
                          ]
                        }
                      ),
                      "Email"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "gap-1.5 h-8 px-3 text-xs border-border",
                    onClick: handleNativeShare,
                    "data-ocid": "referral.share_native",
                    "aria-label": "Share via other apps",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "svg",
                        {
                          width: "13",
                          height: "13",
                          viewBox: "0 0 14 14",
                          fill: "none",
                          "aria-hidden": "true",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                cx: "11",
                                cy: "3",
                                r: "1.5",
                                stroke: "currentColor",
                                strokeWidth: "1.2"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                cx: "3",
                                cy: "7",
                                r: "1.5",
                                stroke: "currentColor",
                                strokeWidth: "1.2"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "circle",
                              {
                                cx: "11",
                                cy: "11",
                                r: "1.5",
                                stroke: "currentColor",
                                strokeWidth: "1.2"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                d: "M4.4 6.2 L9.6 3.8 M4.4 7.8 L9.6 10.2",
                                stroke: "currentColor",
                                strokeWidth: "1.1",
                                strokeLinecap: "round"
                              }
                            )
                          ]
                        }
                      ),
                      "More"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.15, ease: "easeOut" },
          "data-ocid": "referral.stats_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Your referral stats" }),
            statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatTile,
                {
                  ocid: "referral.stat_shared",
                  label: "Links Shared",
                  value: stats ? String(Number(stats.totalInvited)) : "0",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 18 18",
                      fill: "none",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "14",
                            cy: "4",
                            r: "2",
                            stroke: "currentColor",
                            strokeWidth: "1.25",
                            className: "text-primary"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "4",
                            cy: "9",
                            r: "2",
                            stroke: "currentColor",
                            strokeWidth: "1.25",
                            className: "text-primary"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "14",
                            cy: "14",
                            r: "2",
                            stroke: "currentColor",
                            strokeWidth: "1.25",
                            className: "text-primary"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M5.8 7.8 L12.2 5.2 M5.8 10.2 L12.2 12.8",
                            stroke: "currentColor",
                            strokeWidth: "1.2",
                            strokeLinecap: "round",
                            className: "text-primary"
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatTile,
                {
                  ocid: "referral.stat_signups",
                  label: "Friends Signed Up",
                  value: stats ? String(Number(stats.signedUp)) : "0",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 18 18",
                      fill: "none",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "9",
                            cy: "6",
                            r: "2.5",
                            stroke: "currentColor",
                            strokeWidth: "1.25",
                            className: "text-primary"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M4 15 C4 12.2 6.2 10 9 10 C11.8 10 14 12.2 14 15",
                            stroke: "currentColor",
                            strokeWidth: "1.25",
                            strokeLinecap: "round",
                            className: "text-primary"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M14 6.5 L15.5 8 L18 5",
                            stroke: "currentColor",
                            strokeWidth: "1.3",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            className: "text-primary"
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatTile,
                {
                  ocid: "referral.stat_rewards",
                  label: "Rewards Earned",
                  value: rewardsLabel,
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 18 18",
                      fill: "none",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M9 12 C6.2 12 4 9.8 4 7 L4 3 L14 3 L14 7 C14 9.8 11.8 12 9 12 Z",
                            stroke: "currentColor",
                            strokeWidth: "1.25",
                            strokeLinejoin: "round",
                            className: "text-primary"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M6.5 15 L11.5 15 M9 12 L9 15",
                            stroke: "currentColor",
                            strokeWidth: "1.25",
                            strokeLinecap: "round",
                            className: "text-primary"
                          }
                        )
                      ]
                    }
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.22, ease: "easeOut" },
          "data-ocid": "referral.list_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Recent referrals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: referralsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-4 py-3.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
                ]
              },
              i
            )) }) : !referrals || referrals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "referral.empty_state",
                className: "flex flex-col items-center justify-center py-10 px-4 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-2xl bg-muted/60 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "22",
                      height: "22",
                      viewBox: "0 0 22 22",
                      fill: "none",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "11",
                            cy: "9",
                            r: "3.5",
                            stroke: "currentColor",
                            strokeWidth: "1.3",
                            className: "text-muted-foreground"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M5 19 C5 15.7 7.7 13 11 13 C14.3 13 17 15.7 17 19",
                            stroke: "currentColor",
                            strokeWidth: "1.3",
                            strokeLinecap: "round",
                            className: "text-muted-foreground"
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No referrals yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share your link above to invite friends and start earning rewards." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: referrals.map((ref, idx) => {
              const dateStr = ref.createdAt ? new Date(
                Number(ref.createdAt) / 1e6
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              }) : "—";
              const userLabel = ref.referredUserId ? `...${String(ref.referredUserId).slice(-6)}` : "Invited";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  "data-ocid": `referral.item.${idx + 1}`,
                  initial: { opacity: 0, x: -10 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: idx * 0.06, duration: 0.25 },
                  className: "flex items-center justify-between px-4 py-3.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: userLabel }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: dateStr })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: ref.status })
                  ]
                },
                String(ref.id)
              );
            }) }) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.28, ease: "easeOut" },
          "data-ocid": "referral.milestones_section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MilestoneProgressSection, {})
        }
      )
    ] })
  ] });
}
export {
  ReferralPage as default
};
