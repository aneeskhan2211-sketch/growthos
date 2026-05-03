import { a$ as useNavigate, r as reactExports, j as jsxRuntimeExports, y as motion, A as AnimatePresence } from "./index-DcPx_5wo.js";
const NICHES = [
  { emoji: "🍕", label: "Restaurants" },
  { emoji: "💪", label: "Gyms" },
  { emoji: "🏥", label: "Clinics" },
  { emoji: "🏠", label: "Real Estate" },
  { emoji: "👗", label: "Fashion" },
  { emoji: "📚", label: "Education" },
  { emoji: "💻", label: "Tech" },
  { emoji: "⚖️", label: "Legal" }
];
const CITIES = [
  "Mumbai",
  "Delhi",
  "Pune",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Ahmedabad"
];
const SAMPLE_LEADS = [
  {
    name: "BlueSky Dental Clinic",
    city: "Mumbai",
    score: 91,
    issue: "No Google Business Profile"
  },
  {
    name: "Smile Care Orthodontics",
    city: "Mumbai",
    score: 87,
    issue: "Outdated website"
  },
  {
    name: "DentPro Multispeciality",
    city: "Mumbai",
    score: 84,
    issue: "Missing WhatsApp CTA"
  },
  {
    name: "Sunrise Wellness Clinic",
    city: "Pune",
    score: 82,
    issue: "No reviews online"
  },
  {
    name: "Meridian Health Hub",
    city: "Delhi",
    score: 79,
    issue: "Poor local SEO"
  },
  {
    name: "PrimeCare Medical",
    city: "Bengaluru",
    score: 77,
    issue: "Low social presence"
  },
  {
    name: "Apollo Micro Clinic",
    city: "Chennai",
    score: 76,
    issue: "No appointment booking"
  },
  {
    name: "ZenLife Ayurveda",
    city: "Hyderabad",
    score: 74,
    issue: "No website found"
  },
  {
    name: "Urban Health Clinic",
    city: "Ahmedabad",
    score: 73,
    issue: "Missing contact info"
  },
  {
    name: "Healthwise Diagnostics",
    city: "Mumbai",
    score: 71,
    issue: "Weak online presence"
  },
  {
    name: "Pinnacle Physio",
    city: "Bengaluru",
    score: 70,
    issue: "Outdated GMB listing"
  },
  {
    name: "LifeSpring Wellness",
    city: "Delhi",
    score: 68,
    issue: "No WhatsApp link"
  }
];
const MESSAGE_VARIANTS = [
  {
    id: "friendly",
    label: "Friendly",
    tag: "A",
    preview: (niche, city) => `Hey! 👋 I came across your business in ${city} and noticed there's a huge opportunity to get more customers online. I've helped similar ${niche} businesses 3x their inquiries in 30 days — want a free audit? No strings attached 🎯`
  },
  {
    id: "professional",
    label: "Professional",
    tag: "B",
    preview: (niche, city) => `Hello, I specialize in helping ${niche} businesses in ${city} grow their digital presence. I've identified a few gaps in your current online strategy that could be costing you clients. I'd love to share a complimentary audit — would 15 minutes work?`
  },
  {
    id: "value",
    label: "Value-first",
    tag: "C",
    preview: (niche, city) => `Quick insight for your ${niche} in ${city}: businesses without a verified Google Business Profile lose 40% of local search traffic. I can fix this for you in 48 hours, plus set up WhatsApp booking. Interested in a free walkthrough?`
  }
];
function useAnimatedNumber(target, duration = 1e3) {
  const [value, setValue] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let start = null;
    const from = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - (1 - progress) ** 3;
      setValue(Math.round(from + (target - from) * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}
function ScoreBadge({ score }) {
  const color = score >= 85 ? "oklch(0.56 0.15 170)" : score >= 75 ? "oklch(0.68 0.18 86)" : "oklch(0.65 0.15 40)";
  const bg = score >= 85 ? "oklch(0.56 0.15 170 / 0.15)" : score >= 75 ? "oklch(0.68 0.18 86 / 0.15)" : "oklch(0.65 0.15 40 / 0.15)";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "px-2 py-0.5 rounded-full text-[11px] font-bold",
      style: { background: bg, color },
      children: score
    }
  );
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-card border border-border space-y-3 animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 bg-muted rounded w-32" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-3/5" })
    ] })
  ] });
}
function AnimatedCheckmark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.svg,
    {
      width: "40",
      height: "40",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "text-success",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.path,
        {
          d: "M20 6 9 17l-5-5",
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.5, ease: "easeOut", delay: 0.2 }
        }
      )
    }
  );
}
function ProgressStage({ label, active, done, progress, icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: [
            "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
            done ? "bg-success/20" : active ? "bg-primary/20" : "bg-muted"
          ].join(" "),
          animate: active ? { scale: [1, 1.08, 1] } : { scale: 1 },
          transition: {
            repeat: active ? Number.POSITIVE_INFINITY : 0,
            duration: 1.2
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: done ? "text-success" : active ? "text-primary" : "text-muted-foreground",
              children: icon
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: [
            "text-xs font-semibold",
            done ? "text-success" : active ? "text-foreground" : "text-muted-foreground"
          ].join(" "),
          children: label
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: done ? "h-full bg-success rounded-full" : "h-full bg-primary rounded-full",
        initial: { width: "0%" },
        animate: { width: `${progress}%` },
        transition: { duration: 1, ease: "easeOut" }
      }
    ) })
  ] });
}
function FABFlowPage() {
  var _a;
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(1);
  const [direction, setDirection] = reactExports.useState(1);
  const [selectedNiches, setSelectedNiches] = reactExports.useState([]);
  const [selectedCity, setSelectedCity] = reactExports.useState("");
  const [showAllLeads, setShowAllLeads] = reactExports.useState(false);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [_messagesReady, setMessagesReady] = reactExports.useState(false);
  const [selectedVariant, setSelectedVariant] = reactExports.useState("");
  const [editingVariant, setEditingVariant] = reactExports.useState("");
  const [editText, setEditText] = reactExports.useState("");
  const [sendNow, setSendNow] = reactExports.useState(true);
  const [sendStage, setSendStage] = reactExports.useState(0);
  const [stageProgress, setStageProgress] = reactExports.useState([0, 0, 0]);
  const [allDone, setAllDone] = reactExports.useState(false);
  const sendCounter = useAnimatedNumber(
    allDone ? 12 : sendStage > 0 ? Math.min(sendStage * 4, 12) : 0,
    800
  );
  const leadsCounter = useAnimatedNumber(step >= 2 ? 12 : 0, 1e3);
  const cityRef = reactExports.useRef(null);
  const handleClose = () => navigate({ to: "/" });
  const goToStep = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };
  const goBack = () => {
    if (step > 1) goToStep(step - 1);
  };
  const toggleNiche = (niche) => {
    setSelectedNiches((prev) => {
      if (prev.includes(niche)) return prev.filter((n) => n !== niche);
      if (prev.length >= 3) return prev;
      return [...prev, niche];
    });
  };
  const handleShowLeads = () => {
    goToStep(2);
  };
  const handleGenerateMessages = () => {
    goToStep(3);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setMessagesReady(true);
    }, 1800);
  };
  const handleSend = () => {
    goToStep(5);
    const stages = [0, 1, 2];
    for (const stageIdx of stages) {
      setTimeout(
        () => {
          setSendStage(stageIdx + 1);
          setStageProgress((prev) => {
            const next = [...prev];
            next[stageIdx] = 100;
            return next;
          });
        },
        stageIdx * 1200 + 400
      );
    }
    setTimeout(() => {
      setAllDone(true);
      setTimeout(() => navigate({ to: "/inbox" }), 3e3);
    }, 4200);
  };
  const nicheLabel = selectedNiches.length > 0 ? selectedNiches[0] : "";
  const visibleLeads = showAllLeads ? SAMPLE_LEADS : SAMPLE_LEADS.slice(0, 5);
  const variants = {
    enter: (dir) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir * -60, opacity: 0 })
  };
  const transition = { duration: 0.22, ease: "easeOut" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex flex-col",
      style: { background: "oklch(0.09 0 0)" },
      "data-ocid": "fab.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3 border-b",
            style: { background: "oklch(0.12 0 0)", borderColor: "oklch(0.2 0 0)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: goBack,
                  "aria-label": "Go back",
                  "data-ocid": "fab.back_button",
                  className: [
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                    step === 1 ? "opacity-0 pointer-events-none" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  ].join(" "),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 18l-6-6 6-6" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-6 h-6 rounded-full flex items-center justify-center",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.6 0.25 253), oklch(0.65 0.2 200))"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 24 24",
                        fill: "white",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13 2L4.5 13H11L10 22L20.5 10H14L13 2Z" })
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground", children: "Get Clients Now" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClose,
                  "aria-label": "Close",
                  "data-ocid": "fab.close_button",
                  className: "w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 6 6 18M6 6l12 12" })
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center px-4 pt-3 pb-2 gap-2",
            style: { background: "oklch(0.12 0 0)" },
            children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 relative h-1 rounded-full bg-muted/40 overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "absolute inset-y-0 left-0 rounded-full",
                    style: {
                      background: "linear-gradient(90deg, oklch(0.6 0.25 253), oklch(0.65 0.2 200))"
                    },
                    initial: { width: "0%" },
                    animate: {
                      width: s < step ? "100%" : s === step ? "100%" : "0%"
                    },
                    transition: {
                      duration: 0.4,
                      ease: "easeOut",
                      delay: s === step ? 0.1 : 0
                    }
                  }
                )
              },
              s
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center px-4 pb-3 gap-0",
            style: { background: "oklch(0.12 0 0)" },
            children: ["Niche", "Leads", "Messages", "Preview", "Send"].map(
              (label, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: [
                    "text-[10px] font-medium",
                    i + 1 === step ? "text-primary" : i + 1 < step ? "text-success" : "text-muted-foreground"
                  ].join(" "),
                  children: label
                }
              ) }, label)
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", custom: direction, children: [
          step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: direction,
              variants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition,
              className: "absolute inset-0 overflow-y-auto p-4 space-y-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest mb-1", children: "Step 1 of 5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "What type of businesses?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Select up to 3 niches" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: NICHES.map((n) => {
                  const active = selectedNiches.includes(n.label);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.button,
                    {
                      type: "button",
                      onClick: () => toggleNiche(n.label),
                      whileTap: { scale: 0.96 },
                      className: [
                        "py-3 px-3.5 rounded-2xl border text-sm font-semibold transition-all duration-200 text-left flex items-center gap-2.5",
                        active ? "border-primary bg-primary/15 text-primary" : "border-border/50 bg-card/60 text-foreground"
                      ].join(" "),
                      "data-ocid": `fab.niche.${n.label.toLowerCase()}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: n.emoji }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 min-w-0 truncate", children: n.label }),
                        active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "svg",
                          {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2.5",
                            strokeLinecap: "round",
                            className: "text-primary shrink-0",
                            "aria-hidden": "true",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 6 9 17l-5-5" })
                          }
                        )
                      ]
                    },
                    n.label
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-foreground mb-3", children: "Which city?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      ref: cityRef,
                      className: "flex gap-2.5 overflow-x-auto pb-2 scrollbar-none",
                      children: CITIES.map((c) => {
                        const active = selectedCity === c;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.button,
                          {
                            type: "button",
                            onClick: () => setSelectedCity(c),
                            whileTap: { scale: 0.94 },
                            className: [
                              "shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200",
                              active ? "bg-primary border-primary text-primary-foreground" : "bg-card/60 border-border/50 text-foreground"
                            ].join(" "),
                            "data-ocid": `fab.city.${c.toLowerCase()}`,
                            children: c
                          },
                          c
                        );
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    disabled: selectedNiches.length === 0 || !selectedCity,
                    onClick: handleShowLeads,
                    whileTap: { scale: 0.97 },
                    className: "w-full h-12 rounded-2xl font-semibold text-sm transition-all duration-200 disabled:opacity-40",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.6 0.25 253), oklch(0.55 0.22 220))",
                      color: "oklch(0.98 0 0)"
                    },
                    "data-ocid": "fab.find_leads_button",
                    children: "Find Leads →"
                  }
                ) })
              ]
            },
            "step1"
          ),
          step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: direction,
              variants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition,
              className: "absolute inset-0 overflow-y-auto p-4 space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest mb-1", children: "Step 2 of 5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-xl text-foreground", children: [
                    "Found",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-flex items-center justify-center px-2 py-0.5 rounded-lg text-primary text-xl font-bold",
                        style: { background: "oklch(0.6 0.25 253 / 0.15)" },
                        children: leadsCounter
                      }
                    ),
                    " ",
                    "prime leads"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                    "in ",
                    selectedCity,
                    " for",
                    " ",
                    nicheLabel || selectedNiches.join(", ")
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: visibleLeads.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      delay: i * 0.06,
                      ease: "easeOut",
                      duration: 0.22
                    },
                    className: "p-3.5 rounded-2xl bg-card/70 border border-border/50 flex items-center gap-3",
                    "data-ocid": `fab.lead.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm",
                          style: {
                            background: `color-mix(in oklch, oklch(0.6 0.25 ${200 + i * 15}) 18%, transparent)`,
                            color: `oklch(0.7 0.2 ${200 + i * 15})`
                          },
                          children: lead.name[0]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: lead.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: lead.issue })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBadge, { score: lead.score })
                    ]
                  },
                  lead.name
                )) }),
                !showAllLeads && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowAllLeads(true),
                    className: "w-full py-2.5 rounded-xl text-sm font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors",
                    "data-ocid": "fab.see_all_leads_button",
                    children: "See all 12 leads ↓"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between p-3.5 rounded-2xl",
                    style: {
                      background: "oklch(0.6 0.25 253 / 0.1)",
                      border: "1px solid oklch(0.6 0.25 253 / 0.25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                        leadsCounter,
                        " leads selected"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-medium", children: "Ready to outreach" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    onClick: handleGenerateMessages,
                    whileTap: { scale: 0.97 },
                    className: "w-full h-12 rounded-2xl font-semibold text-sm",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.6 0.25 253), oklch(0.55 0.22 220))",
                      color: "oklch(0.98 0 0)"
                    },
                    "data-ocid": "fab.generate_messages_button",
                    children: "Generate Messages →"
                  }
                ) })
              ]
            },
            "step2"
          ),
          step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: direction,
              variants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition,
              className: "absolute inset-0 overflow-y-auto p-4 space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest mb-1", children: "Step 3 of 5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: isGenerating ? "Generating messages…" : "Choose your style" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isGenerating ? "AI crafting personalized outreach" : "Pick the tone that fits your style" })
                ] }),
                isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {})
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: MESSAGE_VARIANTS.map((v) => {
                  const isSelected = selectedVariant === v.id;
                  const isEditing = editingVariant === v.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: { ease: "easeOut", duration: 0.25 },
                      className: [
                        "rounded-2xl border transition-all duration-200 overflow-hidden",
                        isSelected ? "border-primary bg-primary/8" : "border-border/50 bg-card/70"
                      ].join(" "),
                      "data-ocid": `fab.message_variant.${v.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "w-full p-4 text-left",
                            onClick: () => setSelectedVariant(v.id),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold",
                                      style: {
                                        background: isSelected ? "oklch(0.6 0.25 253)" : "oklch(0.2 0 0)",
                                        color: isSelected ? "oklch(0.98 0 0)" : "oklch(0.7 0 0)"
                                      },
                                      children: v.tag
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: v.label })
                                ] }),
                                isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "svg",
                                  {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    className: "text-primary",
                                    "aria-hidden": "true",
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 6 9 17l-5-5" })
                                  }
                                )
                              ] }),
                              isEditing ? null : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-3", children: v.preview(nicheLabel, selectedCity) })
                            ]
                          }
                        ),
                        isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "textarea",
                          {
                            className: "w-full text-xs text-foreground bg-muted/30 border border-border/50 rounded-xl p-3 leading-relaxed resize-none focus:outline-none focus:border-primary/50",
                            rows: 4,
                            value: editText,
                            onChange: (e) => setEditText(e.target.value),
                            "data-ocid": "fab.message_editor"
                          }
                        ) }),
                        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              if (isEditing) {
                                setEditingVariant("");
                              } else {
                                setEditingVariant(v.id);
                                setEditText(
                                  v.preview(nicheLabel, selectedCity)
                                );
                              }
                            },
                            className: "text-xs font-semibold text-primary",
                            "data-ocid": "fab.edit_message_button",
                            children: isEditing ? "Done editing" : "Edit message"
                          }
                        ) })
                      ]
                    },
                    v.id
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    disabled: !selectedVariant || isGenerating,
                    onClick: () => goToStep(4),
                    whileTap: { scale: 0.97 },
                    className: "w-full h-12 rounded-2xl font-semibold text-sm disabled:opacity-40",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.6 0.25 253), oklch(0.55 0.22 220))",
                      color: "oklch(0.98 0 0)"
                    },
                    "data-ocid": "fab.preview_campaign_button",
                    children: "Preview Campaign →"
                  }
                ) })
              ]
            },
            "step3"
          ),
          step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: direction,
              variants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition,
              className: "absolute inset-0 overflow-y-auto p-4 space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest mb-1", children: "Step 4 of 5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Preview Campaign" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Review before sending" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-2xl p-4 space-y-4",
                    style: {
                      background: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.22 0 0)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                            style: { background: "oklch(0.6 0.25 253 / 0.15)" },
                            children: "📨"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: "12 messages ready" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Personalized for each lead" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "px-3 py-1 rounded-full text-xs font-semibold",
                            style: {
                              background: "oklch(0.6 0.25 253 / 0.15)",
                              color: "oklch(0.7 0.2 253)"
                            },
                            children: nicheLabel
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "px-3 py-1 rounded-full text-xs font-semibold",
                            style: {
                              background: "oklch(0.56 0.15 170 / 0.15)",
                              color: "oklch(0.65 0.15 170)"
                            },
                            children: [
                              "📍 ",
                              selectedCity
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl p-3",
                          style: {
                            background: "oklch(0.11 0 0)",
                            border: "1px solid oklch(0.2 0 0)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1.5", children: "Message preview" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed line-clamp-3", children: (_a = MESSAGE_VARIANTS.find(
                              (v) => v.id === selectedVariant
                            )) == null ? void 0 : _a.preview(nicheLabel, selectedCity) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-px",
                          style: { background: "oklch(0.22 0 0)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Send time" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sendNow ? "Send immediately" : "Schedule for later" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setSendNow((v) => !v),
                            className: [
                              "relative w-11 h-6 rounded-full transition-colors duration-200",
                              sendNow ? "bg-primary" : "bg-muted"
                            ].join(" "),
                            role: "switch",
                            "aria-checked": sendNow,
                            "data-ocid": "fab.send_now_toggle",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.span,
                              {
                                className: "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow",
                                animate: { left: sendNow ? "calc(100% - 22px)" : "2px" },
                                transition: { duration: 0.2, ease: "easeOut" }
                              }
                            )
                          }
                        )
                      ] }),
                      !sendNow && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl p-3 flex items-center gap-3",
                          style: {
                            background: "oklch(0.11 0 0)",
                            border: "1px solid oklch(0.2 0 0)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "svg",
                              {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "1.8",
                                strokeLinecap: "round",
                                className: "text-muted-foreground shrink-0",
                                "aria-hidden": "true",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 6v6l4 2" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tomorrow 9:00 AM (auto-selected)" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
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
                            className: "text-muted-foreground shrink-0",
                            "aria-hidden": "true",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 8v4m0 4h.01" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Messages will be sent via WhatsApp template (compliant)" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Estimated delivery" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-success", children: "Within 2 minutes" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.button,
                  {
                    type: "button",
                    onClick: handleSend,
                    whileTap: { scale: 0.97 },
                    className: "w-full h-14 rounded-2xl font-bold text-base shadow-lg",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.6 0.25 253), oklch(0.55 0.22 220))",
                      color: "oklch(0.98 0 0)"
                    },
                    "data-ocid": "fab.send_button",
                    children: "⚡ Send Now →"
                  }
                ) })
              ]
            },
            "step4"
          ),
          step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              custom: direction,
              variants,
              initial: "enter",
              animate: "center",
              exit: "exit",
              transition,
              className: "absolute inset-0 overflow-y-auto p-4 space-y-6",
              "data-ocid": "fab.sending_state",
              children: !allDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-widest mb-1", children: "Step 5 of 5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Sending campaign" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                    "Sending message ",
                    sendCounter,
                    " of 12…"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-2xl p-5 space-y-5",
                    style: {
                      background: "oklch(0.14 0 0)",
                      border: "1px solid oklch(0.22 0 0)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ProgressStage,
                        {
                          label: "Leads",
                          active: sendStage === 1,
                          done: sendStage > 1,
                          progress: stageProgress[0],
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              "aria-hidden": "true",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "7", r: "4" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
                              ]
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ProgressStage,
                        {
                          label: "Messages",
                          active: sendStage === 2,
                          done: sendStage > 2,
                          progress: stageProgress[1],
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "svg",
                            {
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              "aria-hidden": "true",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ProgressStage,
                        {
                          label: "Replies",
                          active: sendStage === 3,
                          done: sendStage > 3,
                          progress: stageProgress[2],
                          icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              width: "16",
                              height: "16",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              "aria-hidden": "true",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "9 10 4 15 9 20" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 4v7a4 4 0 0 1-4 4H4" })
                              ]
                            }
                          )
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 justify-center", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "w-2 h-2 rounded-full bg-primary/40",
                    animate: { opacity: [0.3, 1, 0.3] },
                    transition: {
                      duration: 1.2,
                      delay: i * 0.2,
                      repeat: Number.POSITIVE_INFINITY
                    }
                  },
                  i
                )) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.35, ease: "easeOut" },
                  className: "flex flex-col items-center text-center pt-10 space-y-5",
                  "data-ocid": "fab.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { scale: 0 },
                        animate: { scale: [0, 1.2, 1] },
                        transition: { duration: 0.4, ease: "easeOut" },
                        className: "w-20 h-20 rounded-full flex items-center justify-center",
                        style: { background: "oklch(0.56 0.15 170 / 0.2)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedCheckmark, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "✓ 12 messages sent!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Replies will arrive in 2–4 hours" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-full rounded-2xl p-4 space-y-2.5",
                        style: {
                          background: "oklch(0.14 0 0)",
                          border: "1px solid oklch(0.22 0 0)"
                        },
                        children: [
                          {
                            label: "Messages sent",
                            value: "12",
                            color: "text-success"
                          },
                          {
                            label: "Target city",
                            value: selectedCity,
                            color: "text-foreground"
                          },
                          {
                            label: "Niche",
                            value: nicheLabel,
                            color: "text-foreground"
                          },
                          {
                            label: "Est. replies",
                            value: "2–4 hrs",
                            color: "text-primary"
                          }
                        ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-center justify-between",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: row.label }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-semibold ${row.color}`, children: row.value })
                            ]
                          },
                          row.label
                        ))
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-3 pb-8", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.button,
                        {
                          type: "button",
                          onClick: () => navigate({ to: "/inbox" }),
                          whileTap: { scale: 0.97 },
                          className: "w-full h-12 rounded-2xl font-semibold text-sm",
                          style: {
                            background: "linear-gradient(135deg, oklch(0.6 0.25 253), oklch(0.55 0.22 220))",
                            color: "oklch(0.98 0 0)"
                          },
                          "data-ocid": "fab.view_inbox_button",
                          children: "View in Inbox →"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handleClose,
                          className: "w-full h-11 rounded-2xl font-semibold text-sm text-muted-foreground border border-border/50 hover:bg-muted/20 transition-colors",
                          "data-ocid": "fab.done_button",
                          children: "Done"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Auto-navigating to Inbox in 3 seconds…" })
                  ]
                }
              )
            },
            "step5"
          )
        ] }) })
      ]
    }
  );
}
export {
  FABFlowPage as default
};
