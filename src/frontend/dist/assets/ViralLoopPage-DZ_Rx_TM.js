import { aG as useMetaTags, j as jsxRuntimeExports, h as Badge, aN as PAGE_META, bH as useViralLoop, r as reactExports, n as Card, o as CardHeader, aw as CardTitle, p as CardContent, i as Button, A as AnimatePresence, y as motion, m as ue } from "./index-DcPx_5wo.js";
function SocialProofTicker() {
  const { ticker } = useViralLoop();
  const { feed, activeEntry, refresh } = ticker;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "viral_loop.social_proof_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex-row items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-success animate-pulse" }),
            "Live Activity Feed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: refresh,
              className: "h-7 px-2 text-xs text-muted-foreground",
              "data-ocid": "viral_loop.refresh_feed_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 14 14",
                    fill: "none",
                    "aria-hidden": "true",
                    className: "mr-1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M13 2 L13 6 L9 6",
                          stroke: "currentColor",
                          strokeWidth: "1.3",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M1 12 C1 7.6 4.6 4 9 4 L13 4",
                          stroke: "currentColor",
                          strokeWidth: "1.3",
                          strokeLinecap: "round"
                        }
                      )
                    ]
                  }
                ),
                "Refresh"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-lg px-4 py-3 mb-3 min-h-[44px] flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: activeEntry && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.3 },
              className: "text-sm text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: activeEntry.userName }),
                " ",
                "from",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: activeEntry.city }),
                " ",
                activeEntry.action,
                activeEntry.metricValue && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-bold text-success", children: activeEntry.metricValue })
              ]
            },
            activeEntry.id
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-48 overflow-y-auto", children: feed.slice(0, 6).map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2.5 py-1.5 px-2 rounded hover:bg-muted/30 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${entry.type === "deal" ? "bg-success" : entry.type === "lead" ? "bg-primary" : entry.type === "pitch" ? "bg-amber-400" : "bg-muted-foreground"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground min-w-0 truncate", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: entry.userName }),
                  " ",
                  "(",
                  entry.city,
                  ") ",
                  entry.action,
                  entry.metricValue && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-semibold text-success", children: entry.metricValue })
                ] })
              ]
            },
            entry.id
          )) })
        ] })
      ]
    }
  );
}
function WinCard({
  win,
  onShareWhatsApp,
  onShareLinkedIn
}) {
  const handleInstagram = () => {
    const caption = `🚀 NEW WIN!
${win.metricValue} ${win.metricLabel}

Using GrowthOS to grow my salon in Mumbai! 💪

#MumbaiSalon #GrowthOS #SalonMarketing`;
    navigator.clipboard.writeText(caption).then(() => {
      ue.success("Caption copied! Share it on Instagram 📸");
    }).catch(() => ue.info("Caption ready — paste it on Instagram!"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", "data-ocid": "viral_loop.win_card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `w-full max-w-xs aspect-square rounded-2xl bg-gradient-to-br ${win.gradient} flex flex-col items-center justify-center shadow-2xl text-white relative overflow-hidden`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 w-16 h-16 rounded-full border border-white" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center px-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-widest opacity-80 mb-2", children: "NEW WIN!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-5xl font-display font-bold mb-1 leading-none", children: win.metricValue }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold tracking-wider opacity-90 mb-4", children: win.metricLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-bold", children: win.userName.slice(0, 2).toUpperCase() }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: win.userName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-75", children: win.city }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-60 mt-2", children: win.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 right-4 flex items-center gap-1 opacity-70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded bg-white/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[8px] font-bold", children: "G" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white", children: "GrowthOS" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 mb-3", children: "Win Card Mockup (1080×1080)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => onShareWhatsApp(win),
          className: "gap-2 h-9 px-4 bg-[#25D366] hover:bg-[#22c55e] text-white",
          "data-ocid": "viral_loop.share_whatsapp_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
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
          onClick: handleInstagram,
          className: "gap-2 h-9 px-3 border-pink-500/30 text-pink-500 hover:bg-pink-500/10",
          "data-ocid": "viral_loop.share_instagram_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "circle",
                    {
                      cx: "17.5",
                      cy: "6.5",
                      r: "0.8",
                      fill: "currentColor",
                      stroke: "none"
                    }
                  )
                ]
              }
            ),
            "Instagram"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "outline",
          onClick: () => onShareLinkedIn(win),
          className: "gap-2 h-9 px-4 border-border",
          "data-ocid": "viral_loop.share_linkedin_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                className: "text-[#0077B5]",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" })
              }
            ),
            "LinkedIn"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "gap-2 h-9 px-3 text-muted-foreground text-xs",
          "data-ocid": "viral_loop.go_to_social_button",
          onClick: () => window.open("https://instagram.com", "_blank"),
          children: "Go to social media"
        }
      )
    ] })
  ] });
}
function CreateWinSection() {
  const { wins } = useViralLoop();
  const { wins: winList, createWin, shareOnWhatsApp, shareOnLinkedIn } = wins;
  const [winValue, setWinValue] = reactExports.useState("₹15,000");
  const [winType, setWinType] = reactExports.useState("deal");
  const currentWin = winList[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "viral_loop.create_win_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Create Your 'Win Cards'" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mockup and share your Win Card to social media." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 items-start", children: [
          currentWin ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            WinCard,
            {
              win: currentWin,
              onShareWhatsApp: shareOnWhatsApp,
              onShareLinkedIn: shareOnLinkedIn
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-2xl aspect-square flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No wins yet — create one!" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "winType",
                  className: "block text-xs font-medium text-muted-foreground mb-1.5",
                  children: "Win Type"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "winType",
                  value: winType,
                  onChange: (e) => setWinType(e.target.value),
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                  "data-ocid": "viral_loop.win_type_select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "deal", children: "Deal Closed" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "leads", children: "Leads Generated" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "revenue", children: "Revenue Milestone" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "winValue",
                  className: "block text-xs font-medium text-muted-foreground mb-1.5",
                  children: winType === "deal" ? "Deal Value (₹)" : winType === "leads" ? "Leads Count" : "Revenue Amount (₹)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "winValue",
                  type: "text",
                  value: winValue,
                  onChange: (e) => setWinValue(e.target.value),
                  placeholder: winType === "leads" ? "50 leads" : "₹25,000",
                  className: "w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30",
                  "data-ocid": "viral_loop.win_value_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full gap-2",
                onClick: () => createWin(winValue, winType),
                "data-ocid": "viral_loop.customize_share_button",
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
                          d: "M7 1 L7 13 M1 7 L13 7",
                          stroke: "currentColor",
                          strokeWidth: "1.5",
                          strokeLinecap: "round"
                        }
                      )
                    }
                  ),
                  "Customize & Share"
                ]
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
function MilestoneCardItem({
  milestone,
  isJustUnlocked
}) {
  const badgeColors = {
    bronze: "from-amber-700 to-amber-500",
    silver: "from-slate-500 to-slate-400",
    gold: "from-yellow-500 to-amber-400"
  };
  const pct = Math.min(
    100,
    Math.round(milestone.currentInvites / milestone.requiredInvites * 100)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      animate: isJustUnlocked ? { scale: [1, 1.04, 1] } : {},
      transition: { duration: 0.5 },
      "data-ocid": `viral_loop.milestone_card.${milestone.tier}`,
      className: `relative rounded-xl border p-4 transition-colors ${milestone.status === "unlocked" ? "bg-success/5 border-success/20" : milestone.status === "in_progress" ? "bg-primary/5 border-primary/20" : "bg-muted/20 border-border"}`,
      children: [
        milestone.status === "locked" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "14",
            height: "14",
            viewBox: "0 0 14 14",
            fill: "none",
            "aria-hidden": "true",
            className: "text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  x: "3",
                  y: "6",
                  width: "8",
                  height: "6",
                  rx: "1",
                  stroke: "currentColor",
                  strokeWidth: "1.2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M5 6 L5 4 C5 2.9 5.9 2 7 2 C8.1 2 9 2.9 9 4 L9 6",
                  stroke: "currentColor",
                  strokeWidth: "1.2",
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-8 h-8 rounded-full bg-gradient-to-br ${badgeColors[milestone.badge]} flex items-center justify-center flex-shrink-0 shadow-sm`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white text-xs font-bold", children: [
                "T",
                milestone.tier
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-tight", children: milestone.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 leading-tight", children: [
              "Unlock",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: milestone.unlock })
            ] }),
            milestone.status !== "locked" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2", children: milestone.unlockDetail })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              milestone.currentInvites,
              "/",
              milestone.requiredInvites,
              " Invites"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: `text-[10px] h-5 px-1.5 ${milestone.status === "unlocked" ? "bg-success/10 text-success border-success/20" : milestone.status === "in_progress" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground border-border"}`,
                children: milestone.status === "unlocked" ? "Unlocked" : milestone.status === "in_progress" ? "Active" : "Locked"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: `h-full rounded-full ${milestone.status === "unlocked" ? "bg-success" : "bg-primary"}`,
              initial: { width: 0 },
              animate: { width: `${pct}%` },
              transition: { duration: 0.8, ease: "easeOut" }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: milestone.status === "locked" ? "ghost" : "outline",
            className: `w-full h-8 text-xs ${milestone.status === "unlocked" ? "bg-success/10 text-success border-success/20" : ""}`,
            disabled: milestone.status === "locked",
            onClick: () => {
              if (milestone.status === "unlocked") {
                ue.success(`${milestone.unlock} activated! 🎉`);
              }
            },
            "data-ocid": `viral_loop.milestone_unlock_button.${milestone.tier}`,
            children: milestone.status === "unlocked" ? `✓ ${milestone.unlock}` : milestone.unlock
          }
        )
      ]
    }
  );
}
function MilestonesSection() {
  const { milestones: ms } = useViralLoop();
  const { milestones, justUnlocked, referralInfo, updateMilestoneProgress } = ms;
  const { copied, copyLink } = useViralLoop().referral;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border-border",
      "data-ocid": "viral_loop.milestones_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3 flex-row items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Invite-to-Unlock Milestone Cards" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Your code:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-primary", children: referralInfo.referralCode }),
              " · ",
              referralInfo.bonusLeadsEarned,
              " leads earned"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 text-xs gap-1.5 shrink-0",
              onClick: copyLink,
              "data-ocid": "viral_loop.copy_invite_link_button",
              children: copied ? "✓ Copied" : "Copy Link"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MilestoneCardItem,
            {
              milestone: m,
              isJustUnlocked: justUnlocked === m.id
            },
            m.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Simulate referrals (demo):" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "range",
                  min: 0,
                  max: 25,
                  defaultValue: 1,
                  onChange: (e) => updateMilestoneProgress(Number(e.target.value)),
                  className: "flex-1 accent-primary",
                  "data-ocid": "viral_loop.invite_simulator_slider"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-12 text-right", children: [
                referralInfo.totalReferrals,
                "/25"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ViralLoopPage() {
  useMetaTags(PAGE_META["/viral-loop"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background pb-8",
      "data-ocid": "viral_loop.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-card border-b border-border px-4 py-4 lg:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground", children: "Growth Labs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Share wins · Invite friends · Unlock features" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-6 lg:px-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreateWinSection, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SocialProofTicker, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MilestonesSection, {})
        ] })
      ]
    }
  );
}
export {
  ViralLoopPage as default
};
