import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, l as MapPin, B as Badge, n as Calendar, p as TrendingUp, m as motion, g as ChevronDown, A as AnimatePresence, R as ResponsiveContainer, q as BarChart, s as XAxis, Y as YAxis, t as Tooltip, u as Bar, v as Cell, w as useLeads, x as useCreateOutreachCampaign, y as useRecordDailyAction, L as LeadStatus, z as Skeleton, Z as Zap, a as Button, D as CircleCheck, E as Rocket, U as Users, F as scoreColor, G as CircleAlert, k as Star, H as MessageSquare, I as LoaderCircle, J as ue, K as FileText, N as Check, O as Copy, Q as useClients, V as useOutreachCampaigns, W as Sparkles, _ as RefreshCw, $ as Link, a0 as Settings, a1 as ChartColumn, a2 as ArrowRight, a3 as useCreateLead, a4 as Plus, a5 as Checkbox, a6 as Globe, a7 as useSaveOnboardingPrefs, a8 as useCompleteOnboarding, a9 as Building2, aa as Label, ab as Select, ac as SelectTrigger, ad as SelectValue, ae as SelectContent, af as SelectItem, ag as ChevronRight, ah as Input, ai as useOnboardingPrefs } from "./index-C-gts07u.js";
import { T as Target } from "./target-D_AhRlrf.js";
import { W as Wallet } from "./wallet-8jFRB8JF.js";
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
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function CampaignPlanAccordion({ plan }) {
  const [openWeeks, setOpenWeeks] = reactExports.useState(/* @__PURE__ */ new Set([1]));
  const toggle = (week) => {
    setOpenWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };
  const WEEK_COLORS = [
    "bg-primary/10 text-primary border-primary/20",
    "bg-score-warning/10 score-warning border-yellow-200",
    "bg-success/10 text-success border-success/20",
    "bg-premium-accent-light text-premium-accent border-purple-200"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "campaign_plan.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Sample Campaign Plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 mr-1" }),
        " ",
        plan.duration
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-premium px-5 py-4 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: plan.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5 text-premium-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: plan.expectedROI })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: plan.weeks.map((week, idx) => {
        const isOpen = openWeeks.has(week.week);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `campaign_plan.week.${week.week}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-smooth text-left",
                  onClick: () => toggle(week.week),
                  "data-ocid": `campaign_plan.week_toggle.${week.week}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: `text-xs font-bold px-2.5 py-0.5 rounded-full border ${WEEK_COLORS[idx % WEEK_COLORS.length]}`,
                          children: [
                            "Week ",
                            week.week
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: week.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        animate: { rotate: isOpen ? 180 : 0 },
                        transition: { duration: 0.2 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.2 },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "px-5 pb-4 space-y-2", children: week.tasks.map((task, tIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-start gap-2.5 text-sm text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" }),
                        task
                      ]
                    },
                    tIdx
                  )) })
                }
              ) })
            ]
          },
          week.week
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-muted/10 border-t border-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Estimated timeline: 30 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/20 text-success border-success/30 text-xs", children: "ROI Positive by Day 25" })
      ] })
    ] })
  ] });
}
function EarningsProjection({ niche, city, budget, leadCount }) {
  const conservative = Math.round(leadCount * 0.02 * budget);
  const realistic = Math.round(leadCount * 0.03 * budget);
  const optimistic = Math.round(leadCount * 0.06 * budget);
  const fmt = (v) => v >= 1e5 ? `₹${(v / 1e5).toFixed(1)}L` : `₹${(v / 1e3).toFixed(0)}k`;
  const data = [
    {
      label: "Conservative",
      value: conservative,
      color: "oklch(0.68 0.18 86)"
    },
    { label: "Realistic", value: realistic, color: "oklch(0.56 0.15 170)" },
    { label: "Optimistic", value: optimistic, color: "oklch(0.53 0.22 253)" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-5 shadow-subtle",
      "data-ocid": "earnings_projection.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-premium-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Earnings Projection" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Based on ",
              leadCount,
              " ",
              niche.toLowerCase(),
              " leads in ",
              city,
              " at ₹",
              (budget / 1e3).toFixed(0),
              "k target budget"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { delay: 0.3 },
              className: "text-right",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-premium-accent", children: fmt(realistic) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "realistic / month" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data,
            barSize: 40,
            margin: { top: 4, right: 4, left: 4, bottom: 4 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fontSize: 11, fill: "oklch(0.55 0 0)" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { hide: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (v) => [fmt(v), "Monthly Earnings"],
                  contentStyle: {
                    background: "oklch(0.16 0 0)",
                    border: "1px solid oklch(0.26 0 0)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", radius: [6, 6, 0, 0], children: data.map((entry, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static chart data
                /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color }, idx)
              )) })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mt-3", children: data.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground", children: fmt(d.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: d.label })
        ] }, d.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 text-center", children: "Assumes 2–6% close rate. Actual results depend on outreach quality and follow-up." })
      ]
    }
  );
}
function generatePitch(lead, niche) {
  const score = Number(lead.leadScore);
  let problem = "weak online presence";
  if (!lead.website) problem = "no website";
  else if (score >= 80) problem = "no active ads running";
  else if (score >= 70) problem = "low Google ranking";
  return `Hi ${lead.businessName}, I noticed your ${niche.toLowerCase()} business in ${lead.city} could benefit from digital marketing. Many similar businesses are losing 30+ customers/month due to ${problem}. We help ${niche.toLowerCase()} businesses get 3x more clients through SEO, Google Ads, and social media. Can we schedule a quick 10-min call this week?`;
}
function OneClickAcquisition({ niche }) {
  const { data: leads, isLoading } = useLeads();
  const createCampaign = useCreateOutreachCampaign();
  const recordAction = useRecordDailyAction();
  const [phase, setPhase] = reactExports.useState("idle");
  const [pitches, setPitches] = reactExports.useState({});
  const [isLaunching, setIsLaunching] = reactExports.useState(false);
  const topLeads = (leads ?? []).filter((l) => Number(l.leadScore) >= 70 && l.status === LeadStatus.new_).sort((a, b) => Number(b.leadScore) - Number(a.leadScore)).slice(0, 5);
  const handleGetClients = () => {
    if (topLeads.length === 0) {
      ue.info("No high-priority leads found. Add more leads first.");
      return;
    }
    setPhase("preview");
  };
  const handleGeneratePitches = () => {
    const generated = {};
    for (const lead of topLeads) {
      generated[lead.id.toString()] = generatePitch(lead, niche || "Business");
    }
    setPitches(generated);
    setPhase("pitches");
  };
  const handleLaunchOutreach = async () => {
    setIsLaunching(true);
    let count = 0;
    for (const lead of topLeads) {
      try {
        await createCampaign.mutateAsync({
          leadId: lead.id,
          businessName: lead.businessName,
          channels: ["whatsapp", "email"]
        });
        count++;
      } catch {
      }
    }
    await recordAction.mutateAsync("launch_outreach");
    setIsLaunching(false);
    setPhase("launched");
    ue.success(`🚀 Outreach launched for ${count} leads!`, {
      description: "Messages are being scheduled. Check Outreach tracker for updates."
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-xl" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle",
      "data-ocid": "one_click.panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-premium px-6 py-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "One-Click Client Acquisition" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                topLeads.length,
                " high-priority leads ready for outreach"
              ] })
            ] })
          ] }),
          phase === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "h-10 font-semibold shadow-elevated",
              onClick: handleGetClients,
              "data-ocid": "one_click.get_clients_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 mr-2" }),
                "Get Clients Now"
              ]
            }
          ),
          phase === "launched" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-success/20 text-success border-success/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 mr-1.5" }),
            "Outreach Active"
          ] })
        ] }) }),
        phase === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "Click",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: '"Get Clients Now"' }),
            " ",
            "to automatically find, pitch, and outreach your top leads."
          ] })
        ] }),
        (phase === "preview" || phase === "pitches" || phase === "launched") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground text-sm", children: [
              "Found ",
              topLeads.length,
              " high-priority leads ready for outreach"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topLeads.map((lead, idx) => {
            const sc = scoreColor(Number(lead.leadScore));
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: idx * 0.07 },
                className: "flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/50",
                "data-ocid": `one_click.lead.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-sm w-8 text-center ${sc}`, children: Number(lead.leadScore) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground text-sm truncate", children: lead.businessName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lead.city }),
                      !lead.website && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-destructive", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3" }),
                        " No website"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
                        " ",
                        lead.rating
                      ] })
                    ] })
                  ] }),
                  phase === "pitches" && pitches[lead.id.toString()] && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3 mr-1" }),
                    " Pitch ready"
                  ] }),
                  phase === "launched" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-success/20 text-success border-success/30 text-xs shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                    " Sent"
                  ] })
                ]
              },
              lead.id.toString()
            );
          }) }),
          phase === "pitches" && topLeads[0] && pitches[topLeads[0].id.toString()] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-4 border border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-medium text-muted-foreground mb-2", children: [
              "Sample pitch — ",
              topLeads[0].businessName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: pitches[topLeads[0].id.toString()] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            phase === "preview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 h-10",
                onClick: handleGeneratePitches,
                "data-ocid": "one_click.generate_pitches_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
                  " Generate Pitches"
                ]
              }
            ),
            phase === "pitches" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 h-10",
                onClick: handleLaunchOutreach,
                disabled: isLaunching,
                "data-ocid": "one_click.launch_outreach_button",
                children: [
                  isLaunching ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-4 h-4 mr-2" }),
                  "Launch Outreach"
                ]
              }
            ),
            phase === "launched" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 h-10",
                onClick: () => setPhase("idle"),
                "data-ocid": "one_click.reset_button",
                children: "Start New Campaign"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const FRAMEWORK_COLORS = {
  PAS: "bg-score-critical score-critical",
  AIDA: "bg-primary/10 text-primary",
  "Value-First": "bg-score-warning score-warning"
};
function renderBody(body) {
  return body.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static template rendering
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: static template rendering
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: part.slice(2, -2) }, j)
            );
          }
          return part;
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
      ] }, i)
    );
  });
}
function PitchTemplates({ templates }) {
  const [copied, setCopied] = reactExports.useState(null);
  const [editing, setEditing] = reactExports.useState(null);
  const [edits, setEdits] = reactExports.useState({});
  const copyTemplate = (tpl) => {
    const text = edits[tpl.id] ?? tpl.body;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(tpl.id);
      ue.success("Pitch copied to clipboard");
      setTimeout(() => setCopied(null), 2e3);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "pitch_templates.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: "Pitch Templates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
        templates.length,
        " ready"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: templates.map((tpl, idx) => {
      const isEditing = editing === tpl.id;
      const body = edits[tpl.id] ?? tpl.body;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: idx * 0.1 },
          className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle",
          "data-ocid": `pitch_templates.item.${idx + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3.5 bg-muted/20 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-bold px-2 py-0.5 rounded-full ${FRAMEWORK_COLORS[tpl.framework] ?? "bg-muted"}`,
                    children: tpl.framework
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: tpl.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 px-2.5 text-xs",
                    onClick: () => setEditing(isEditing ? null : tpl.id),
                    "data-ocid": `pitch_templates.edit_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5 mr-1" }),
                      isEditing ? "Done" : "Edit"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 px-2.5 text-xs",
                    onClick: () => copyTemplate(tpl),
                    "data-ocid": `pitch_templates.copy_button.${idx + 1}`,
                    children: [
                      copied === tpl.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 mr-1 score-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5 mr-1" }),
                      "Copy"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-2.5 bg-muted/10 border-b border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Subject: " }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: tpl.subject })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                className: "w-full text-sm text-foreground bg-muted/20 border border-border rounded-lg p-3 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-ring",
                rows: 8,
                value: body,
                onChange: (e) => setEdits((prev) => ({
                  ...prev,
                  [tpl.id]: e.target.value
                })),
                "data-ocid": `pitch_templates.editor.${idx + 1}`
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground leading-relaxed", children: renderBody(body) }) })
          ]
        },
        tpl.id
      );
    }) })
  ] });
}
const BUSINESS_PREFIXES = {
  Restaurant: [
    "Spice Garden",
    "Royal Kitchen",
    "Flavour Hub",
    "Heritage Dhaba",
    "Saffron Palace",
    "The Food Court",
    "Masala Magic",
    "Curry House",
    "Blue Plate",
    "Golden Fork"
  ],
  Salon: [
    "Glam Studio",
    "Style Zone",
    "Trendy Cuts",
    "Luxe Hair",
    "Bella Beauty",
    "Urban Clips",
    "Elite Salon",
    "Crown Looks",
    "Chic Hair",
    "Mirror Mirror"
  ],
  Gym: [
    "Power Fitness",
    "Iron Zone",
    "FitLife",
    "Peak Gym",
    "Strong Body",
    "Muscle Hub",
    "Elite Fitness",
    "Pro Gym",
    "Steel Body",
    "Flex Zone"
  ],
  Retail: [
    "Style Store",
    "City Mart",
    "Value Shop",
    "Trend Zone",
    "Mega Store",
    "Urban Fashion",
    "The Boutique",
    "Smart Shop",
    "Priya Stores",
    "Metro Retail"
  ],
  Healthcare: [
    "City Clinic",
    "Health Plus",
    "Care Center",
    "Wellness Hub",
    "MediCare",
    "Healthy Life",
    "Prime Hospital",
    "Doctor's Den",
    "Cure Point",
    "Life Care"
  ],
  "Real Estate": [
    "Dream Homes",
    "Prime Properties",
    "City Realty",
    "Green Build",
    "Sky Estates",
    "Urban Homes",
    "Apex Realty",
    "Galaxy Builders",
    "Empire Properties",
    "Golden Gate"
  ],
  Education: [
    "Bright Minds",
    "Excel Academy",
    "Knowledge Hub",
    "Success Point",
    "Star Coaching",
    "Merit Center",
    "Elite Classes",
    "Top Tutors",
    "Wisdom School",
    "Learn Pro"
  ],
  Other: [
    "Growth Co",
    "Service Pro",
    "City Business",
    "Prime Services",
    "Excel Corp",
    "Smart Solutions",
    "Top Ventures",
    "Ace Services",
    "Prime Works",
    "Alpha Co"
  ]
};
const PROBLEMS = [
  "no_website",
  "low_rating",
  "no_ads",
  "weak_seo",
  "no_google_profile"
];
const PROBLEM_LABELS = {
  no_website: "No website found",
  low_rating: "Low customer rating",
  no_ads: "No active ads running",
  weak_seo: "Weak SEO presence",
  no_google_profile: "Incomplete Google profile"
};
function seededRandom(seed) {
  const x = Math.sin(seed) * 1e4;
  return x - Math.floor(x);
}
function generateMockLeads(niche, city, count) {
  const nicheKey = niche || "Other";
  const prefixes = BUSINESS_PREFIXES[nicheKey] ?? BUSINESS_PREFIXES.Other;
  const leads = [];
  for (let i = 0; i < count; i++) {
    const seed = i + city.length * 31 + niche.length * 17;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);
    const r4 = seededRandom(seed + 3);
    const r5 = seededRandom(seed + 4);
    const prefixIdx = Math.floor(r1 * prefixes.length);
    const name = `${prefixes[prefixIdx]} ${city}`;
    const hasWebsite = r2 > 0.5;
    const rating = Number.parseFloat((3.2 + r3 * 1.6).toFixed(1));
    const leadScore = Math.floor(60 + r4 * 35);
    const problemIdx = Math.floor(r5 * PROBLEMS.length);
    const problem = PROBLEMS[problemIdx];
    const slug = name.toLowerCase().replace(/\s+/g, "").slice(0, 16);
    leads.push({
      id: i + 1,
      businessName: name,
      category: nicheKey,
      city,
      phone: `+91${Math.floor(7e9 + seededRandom(seed + 5) * 2999999999)}`,
      email: `info@${slug}.com`,
      website: hasWebsite ? `www.${slug}.com` : null,
      rating,
      leadScore,
      detectedProblem: PROBLEM_LABELS[problem] ?? problem
    });
  }
  return leads.sort((a, b) => b.leadScore - a.leadScore);
}
function generatePitchTemplates(niche, city) {
  return [
    {
      id: "pas",
      name: "Problem–Agitate–Solve",
      framework: "PAS",
      subject: `Most ${niche} businesses in ${city} are losing clients to competitors`,
      body: `Hi **[Business Name]**,

I came across your ${niche} business in **${city}** and noticed something important — your business could be missing out on **dozens of new clients every month**.

Most ${niche.toLowerCase()} businesses in ${city} struggle with weak online presence, no active ads, and poor Google rankings. This means potential customers are choosing competitors instead.

Our agency specializes in helping ${niche.toLowerCase()} businesses like yours get **3x more inbound leads** within 60 days. We handle your SEO, Google Ads, and social media — so you can focus on running your business.

Would you be open to a quick 10-minute call this week?

Best,
[Your Name]`
    },
    {
      id: "aida",
      name: "Attention–Interest–Desire–Action",
      framework: "AIDA",
      subject: `[Business Name] — 3x more customers in ${city} is possible`,
      body: `Hi **[Business Name]**,

**Attention:** Your competitors in ${city} are getting 5x more Google traffic than you right now.

**Interest:** We've helped 20+ ${niche.toLowerCase()} businesses in India grow their customer base through targeted digital marketing.

**Desire:** Imagine having a steady stream of new clients every month — no cold calling, no referral chasing. Just consistent inbound leads from Google and social media.

**Action:** Reply to this message and I'll share a free audit of your current online presence — completely free, no strings attached.

Looking forward to helping you grow,
[Your Name]`
    },
    {
      id: "direct",
      name: "Direct Value Pitch",
      framework: "Value-First",
      subject: `Free marketing audit for your ${niche} business in ${city}`,
      body: `Hi **[Business Name]**,

I've done a quick analysis of ${niche.toLowerCase()} businesses in **${city}**, and I noticed your business has room to grow online.

Here's what I found:
• **[Detected Problem]** — this is costing you potential clients daily
• Your Google ranking for local searches can be significantly improved
• Competitors are running ads and capturing demand you're missing

I'd love to share a **free, personalized growth plan** for your business — no cost, no commitment.

Can I send it over?

Thanks,
[Your Name]`
    }
  ];
}
function generateCampaignPlan(niche, city, budget) {
  const budgetStr = budget >= 1e5 ? "₹1L+" : `₹${(budget / 1e3).toFixed(0)}k`;
  return {
    title: `30-Day ${niche} Client Acquisition Plan — ${city}`,
    duration: "30 Days",
    weeks: [
      {
        week: 1,
        title: "Identify & Reach Out",
        tasks: [
          `Scrape top 50 ${niche.toLowerCase()} businesses in ${city}`,
          "Score leads by revenue potential (website, SEO, ads gaps)",
          "Send Day 1 cold outreach to 20 high-priority leads",
          "Set up WhatsApp template messages"
        ]
      },
      {
        week: 2,
        title: "Follow Up & Qualify",
        tasks: [
          "Send Day 2 follow-up to non-responders",
          "Schedule discovery calls with interested prospects",
          "Send personalized proposals to 5 qualified leads",
          "Launch retargeting ads campaign"
        ]
      },
      {
        week: 3,
        title: "Close & Onboard",
        tasks: [
          "Send Day 4 final message to remaining leads",
          "Follow up on proposal responses",
          "Close 1–2 clients at target budget",
          "Onboard new clients with welcome package"
        ]
      },
      {
        week: 4,
        title: "Scale & Repeat",
        tasks: [
          "Scrape next batch of 50 leads",
          "Start delivery for onboarded clients",
          "Request referrals from new clients",
          "Analyze outreach response rates and optimize"
        ]
      }
    ],
    expectedROI: `${budgetStr} retainer × 1–3 new clients = ₹${(budget / 1e3).toFixed(0)}k–₹${(budget * 3 / 1e3).toFixed(0)}k MRR by day 30`
  };
}
function CommandHub({ prefs, onRestartOnboarding }) {
  const { data: leads = [] } = useLeads();
  const { data: clients = [] } = useClients();
  const { data: campaigns = [] } = useOutreachCampaigns();
  const pitchTemplates = generatePitchTemplates(prefs.niche, prefs.city);
  const campaignPlan = generateCampaignPlan(
    prefs.niche,
    prefs.city,
    prefs.targetBudget
  );
  const mockLeads = generateMockLeads(prefs.niche, prefs.city, 50);
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const budgetLabel = prefs.targetBudget >= 1e5 ? "₹1L+" : prefs.targetBudget > 0 ? `₹${prefs.targetBudget / 1e3}k` : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-8 max-w-[1200px]", "data-ocid": "command_hub.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg gradient-premium flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-premium-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Command Center" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              prefs.niche && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3 h-3 mr-1.5" }),
                prefs.niche
              ] }),
              prefs.city && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs border-border", children: [
                "📍 ",
                prefs.city
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 mr-1.5" }),
                budgetLabel,
                " target"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-success/20 text-success border-success/30 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 mr-1.5" }),
                " Ready"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: onRestartOnboarding,
                className: "gap-1.5 text-xs",
                "data-ocid": "command_hub.restart_onboarding_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                  "Re-run Setup"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 text-xs",
                "data-ocid": "command_hub.settings_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3 h-3" }),
                  "Settings"
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
        "data-ocid": "command_hub.kpi_section",
        children: [
          {
            label: "Total Leads",
            value: leads.length,
            icon: Users,
            cls: "gradient-kpi",
            iconCls: "text-primary",
            link: "/leads"
          },
          {
            label: "Active Campaigns",
            value: activeCampaigns,
            icon: MessageSquare,
            cls: "gradient-premium",
            iconCls: "text-premium-accent",
            link: "/outreach"
          },
          {
            label: "Active Clients",
            value: clients.length,
            icon: ChartColumn,
            cls: "gradient-success",
            iconCls: "text-success",
            link: "/clients"
          },
          {
            label: "Leads Generated",
            value: mockLeads.length,
            icon: Zap,
            cls: "bg-muted/30",
            iconCls: "text-muted-foreground",
            link: "/leads"
          }
        ].map((kpi, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: kpi.link, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.1 + idx * 0.05 },
            className: `${kpi.cls} border border-border rounded-xl p-4 shadow-subtle hover:shadow-elevated transition-smooth cursor-pointer`,
            "data-ocid": `command_hub.kpi.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(kpi.icon, { className: `w-4 h-4 ${kpi.iconCls}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: kpi.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground tabular-nums", children: kpi.value })
            ]
          }
        ) }, kpi.label))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
        className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/leads", "data-ocid": "command_hub.find_leads_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full h-11 gap-2 text-sm font-semibold bg-primary hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
            "Find Leads Now",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-auto" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/outreach", "data-ocid": "command_hub.send_outreach_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full h-11 gap-2 text-sm border-border hover:border-primary/40 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
                "Send Outreach",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-auto text-muted-foreground" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/proposals", "data-ocid": "command_hub.create_proposal_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full h-11 gap-2 text-sm border-border hover:border-success/40 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-success" }),
                "Create Proposal",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-auto text-muted-foreground" })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(OneClickAcquisition, { niche: prefs.niche })
      }
    ),
    prefs.targetBudget > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.25 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EarningsProjection,
          {
            niche: prefs.niche,
            city: prefs.city,
            budget: prefs.targetBudget,
            leadCount: 50
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -12 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.3 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(PitchTemplates, { templates: pitchTemplates })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 12 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.35 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CampaignPlanAccordion, { plan: campaignPlan })
        }
      )
    ] })
  ] });
}
function GeneratedLeadsTable({ leads, niche, city }) {
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [added, setAdded] = reactExports.useState(/* @__PURE__ */ new Set());
  const createLead = useCreateLead();
  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const selectAll = () => {
    if (selected.size === leads.length) setSelected(/* @__PURE__ */ new Set());
    else setSelected(new Set(leads.map((l) => l.id)));
  };
  const addToCRM = async () => {
    const toAdd = leads.filter((l) => selected.has(l.id) && !added.has(l.id));
    let successCount = 0;
    for (const lead of toAdd) {
      try {
        await createLead.mutateAsync({
          businessName: lead.businessName,
          city: lead.city,
          phone: lead.phone,
          website: lead.website ?? "",
          rating: lead.rating,
          leadScore: BigInt(lead.leadScore),
          address: `${lead.city}, India`,
          notes: `Detected: ${lead.detectedProblem}`,
          industry: niche
        });
        setAdded((prev) => /* @__PURE__ */ new Set([...prev, lead.id]));
        successCount++;
      } catch {
      }
    }
    if (successCount > 0) {
      ue.success(`${successCount} leads added to CRM`, {
        description: "You can now view them in the CRM pipeline"
      });
    }
  };
  const displayLeads = leads.slice(0, 25);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl overflow-hidden shadow-subtle",
      "data-ocid": "generated_leads.table",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Generated Leads" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              niche,
              " businesses in ",
              city,
              " — sorted by lead score"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              selected.size,
              " selected"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: addToCRM,
                disabled: selected.size === 0 || createLead.isPending,
                "data-ocid": "generated_leads.add_to_crm_button",
                children: [
                  createLead.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-1.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
                  "Add to CRM"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[24px_1fr_80px_80px_1fr_80px] gap-3 px-5 py-2.5 bg-muted/20 border-b border-border text-xs font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: "select-all-leads",
              checked: selected.size === displayLeads.length,
              onCheckedChange: selectAll,
              "data-ocid": "generated_leads.select_all_checkbox"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Business" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Problem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Website" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-72 overflow-y-auto", children: displayLeads.map((lead, idx) => {
          const isSelected = selected.has(lead.id);
          const isAdded = added.has(lead.id);
          const sc = scoreColor(lead.leadScore);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 4 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: idx * 0.02 },
              className: `grid grid-cols-[24px_1fr_80px_80px_1fr_80px] gap-3 px-5 py-2.5 border-b border-border/50 text-sm items-center transition-smooth ${isSelected ? "bg-primary/5" : "hover:bg-muted/20"}`,
              "data-ocid": `generated_leads.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Checkbox,
                  {
                    id: `lead-check-${lead.id}`,
                    checked: isSelected,
                    onCheckedChange: () => toggle(lead.id),
                    disabled: isAdded,
                    "data-ocid": `generated_leads.checkbox.${idx + 1}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate", children: lead.businessName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: lead.phone })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-sm ${sc}`, children: lead.leadScore }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: lead.rating })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs truncate border-border",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3 h-3 mr-1 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: lead.detectedProblem })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: isAdded ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success score-success" }) : lead.website ? /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: "None" }) })
              ]
            },
            lead.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3 bg-muted/10 text-xs text-muted-foreground", children: "Showing 25 of 50 leads. Add to CRM to unlock all." })
      ]
    }
  );
}
const NICHES = [
  "Restaurant",
  "Salon",
  "Gym",
  "Retail",
  "Healthcare",
  "Real Estate",
  "Education",
  "Other"
];
const BUDGETS = [
  { label: "₹10,000 / month", value: 1e4 },
  { label: "₹25,000 / month", value: 25e3 },
  { label: "₹50,000 / month", value: 5e4 },
  { label: "₹1,00,000+ / month", value: 1e5 }
];
function OnboardingWizard({ onComplete }) {
  const [step, setStep] = reactExports.useState(1);
  const [niche, setNiche] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [budget, setBudget] = reactExports.useState(0);
  const [generatingProgress, setGeneratingProgress] = reactExports.useState(0);
  const savePrefs = useSaveOnboardingPrefs();
  const completeOnboarding = useCompleteOnboarding();
  const mockLeads = generateMockLeads(niche, city, 50);
  reactExports.useEffect(() => {
    if (step !== "generating") return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 8;
      if (progress >= 100) {
        clearInterval(interval);
        setGeneratingProgress(100);
        setTimeout(() => setStep("results"), 300);
      } else {
        setGeneratingProgress(progress);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [step]);
  const handleGenerate = async () => {
    setStep("generating");
    setGeneratingProgress(0);
    await savePrefs.mutateAsync({
      niche,
      city,
      targetBudget: budget,
      completedOnboarding: false
    });
  };
  const handleFinish = async () => {
    await completeOnboarding.mutateAsync();
    onComplete();
  };
  const stepLabels = [
    { num: 1, label: "Your Niche", icon: Building2 },
    { num: 2, label: "Your City", icon: MapPin },
    { num: 3, label: "Target Budget", icon: Wallet }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "h-full flex items-center justify-center p-6",
      "data-ocid": "onboarding.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -16 },
            animate: { opacity: 1, y: 0 },
            className: "text-center mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-premium-accent-light border border-border mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-premium-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-premium-accent", children: "AI-Powered Setup" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Welcome to GrowthOS Command Center" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Answer 3 questions and we'll generate 50 leads, 3 pitch templates, and your first campaign." })
            ]
          }
        ),
        step !== "generating" && step !== "results" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0 mb-8", children: stepLabels.map((s, idx) => {
          const stepNum = s.num;
          const isDone = typeof step === "number" && step > s.num;
          const isCurrent = step === stepNum;
          const Icon = s.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-2 px-3 py-1.5 rounded-full transition-smooth ${isCurrent ? "bg-primary text-primary-foreground" : isDone ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`,
                children: [
                  isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold hidden sm:block", children: s.label })
                ]
              }
            ),
            idx < stepLabels.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-8 h-px mx-1 ${isDone ? "bg-primary/40" : "bg-border"}`
              }
            )
          ] }, s.num);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(StepCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl gradient-premium flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-premium-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "What niche do you serve?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We'll find businesses that need your services most" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "niche-select", className: "text-sm font-medium", children: "Business Niche" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: niche, onValueChange: setNiche, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    id: "niche-select",
                    "data-ocid": "onboarding.niche.select",
                    className: "h-11",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a niche..." })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: NICHES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full mt-6 h-11",
                disabled: !niche,
                onClick: () => setStep(2),
                "data-ocid": "onboarding.step1.next_button",
                children: [
                  "Continue ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                ]
              }
            )
          ] }, "step1"),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(StepCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl gradient-premium flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-premium-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Which city are you targeting?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We'll scrape local businesses in your area" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "city-input", className: "text-sm font-medium", children: "Target City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "city-input",
                  placeholder: "e.g. Mumbai, Delhi, Bangalore...",
                  value: city,
                  onChange: (e) => setCity(e.target.value),
                  className: "h-11",
                  "data-ocid": "onboarding.city.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1 h-11",
                  onClick: () => setStep(1),
                  "data-ocid": "onboarding.step2.back_button",
                  children: "Back"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 h-11",
                  disabled: !city.trim(),
                  onClick: () => setStep(3),
                  "data-ocid": "onboarding.step2.next_button",
                  children: [
                    "Continue ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1" })
                  ]
                }
              )
            ] })
          ] }, "step2"),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(StepCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl gradient-premium flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-5 h-5 text-premium-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Target client budget?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This helps us calculate your earnings potential" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: BUDGETS.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setBudget(b.value),
                "data-ocid": `onboarding.budget.${b.value}`,
                className: `p-4 rounded-xl border-2 text-left transition-smooth cursor-pointer ${budget === b.value ? "border-primary bg-primary/5 text-foreground" : "border-border bg-card text-foreground hover:border-primary/40"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: b.label })
              },
              b.value
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  className: "flex-1 h-11",
                  onClick: () => setStep(2),
                  "data-ocid": "onboarding.step3.back_button",
                  children: "Back"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 h-11",
                  disabled: !budget,
                  onClick: handleGenerate,
                  "data-ocid": "onboarding.step3.generate_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                    " Generate My Leads"
                  ]
                }
              )
            ] })
          ] }, "step3"),
          step === "generating" && /* @__PURE__ */ jsxRuntimeExports.jsx(StepCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-2xl gradient-premium flex items-center justify-center mb-4 shadow-premium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-premium-accent animate-spin" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Generating your leads..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
              "Scanning ",
              city,
              " for top ",
              niche,
              " businesses"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "progress-bar-fill",
                  style: { width: `${generatingProgress}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                Math.round(generatingProgress),
                "% complete"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-2 text-sm text-muted-foreground", children: [
              generatingProgress > 20 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "fade-in-item", children: [
                "✓ Found ",
                niche,
                " businesses in ",
                city
              ] }),
              generatingProgress > 50 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fade-in-item", children: "✓ Scoring leads by revenue potential" }),
              generatingProgress > 75 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fade-in-item", children: "✓ Generating personalized pitches" }),
              generatingProgress > 90 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "fade-in-item", children: "✓ Building campaign plan" })
            ] })
          ] }) }, "generating"),
          step === "results" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
                  { label: "Leads Generated", value: "50", icon: "🎯" },
                  { label: "Pitch Templates", value: "3", icon: "✉️" },
                  { label: "Campaign Ready", value: "1", icon: "🚀" }
                ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-card border border-border rounded-xl p-4 text-center shadow-subtle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: stat.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: stat.value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: stat.label })
                    ]
                  },
                  stat.label
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EarningsProjection,
                  {
                    niche,
                    city,
                    budget,
                    leadCount: 50
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GeneratedLeadsTable,
                  {
                    leads: mockLeads,
                    niche,
                    city
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full h-12 text-base font-semibold mt-4",
                    onClick: handleFinish,
                    disabled: completeOnboarding.isPending,
                    "data-ocid": "onboarding.finish_button",
                    children: [
                      completeOnboarding.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                      "Enter Command Center"
                    ]
                  }
                )
              ]
            }
          ) }, "results")
        ] })
      ] })
    }
  );
}
function StepCard({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: 0.2 },
      className: "bg-card border border-border rounded-2xl p-8 shadow-elevated",
      children
    }
  );
}
function CommandCenterPage() {
  const { data: prefs, isLoading } = useOnboardingPrefs();
  const [forceWizard, setForceWizard] = reactExports.useState(false);
  const handleRestart = reactExports.useCallback(() => setForceWizard(true), []);
  const handleWizardComplete = reactExports.useCallback(() => setForceWizard(false), []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", "data-ocid": "command_center.loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mt-6", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i)) })
    ] });
  }
  const showWizard = forceWizard || !(prefs == null ? void 0 : prefs.completedOnboarding);
  if (showWizard) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      OnboardingWizard,
      {
        initialPrefs: prefs,
        onComplete: handleWizardComplete
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CommandHub, { prefs, onRestartOnboarding: handleRestart });
}
export {
  CommandCenterPage as default
};
