import { aG as useMetaTags, a$ as useNavigate, r as reactExports, j as jsxRuntimeExports, i as Button, y as motion, a0 as CircleCheck, ag as ArrowRight, n as Card, p as CardContent, h as Badge, aN as PAGE_META, a2 as Users, cA as Search, a5 as MessageSquare, af as ChartColumn, C as Clock, T as TrendingUp, a4 as CircleAlert, Z as Zap, q as ChevronDown, A as AnimatePresence } from "./index-DcPx_5wo.js";
function LeadsMockup() {
  const leads = [
    { name: "Priya Sharma", loc: "Andheri", score: 92, status: "Hot" },
    { name: "Style Zone Salon", loc: "Bandra", score: 87, status: "New" },
    { name: "Elegance Studio", loc: "Powai", score: 81, status: "New" },
    { name: "Radiance Beauty", loc: "Malad", score: 76, status: "Warm" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-lg overflow-hidden text-sm w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 border-b border-border px-4 py-2.5 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-destructive/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-warning/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-success/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground font-medium", children: "GrowthOS — Leads" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 px-4 py-2 bg-muted/30 text-xs text-muted-foreground font-semibold uppercase tracking-wide border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-5", children: "Business" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-3", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-right", children: "Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-right", children: "Status" })
    ] }),
    leads.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `grid grid-cols-12 px-4 py-3 items-center border-b border-border/50 last:border-0 ${i === 0 ? "bg-primary/5" : "bg-card"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-5 flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-primary", children: l.name[0] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate text-xs", children: l.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-3 text-muted-foreground text-xs", children: l.loc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2 text-right font-bold text-foreground text-xs", children: l.score }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-[10px] font-semibold px-2 py-0.5 rounded-full ${l.status === "Hot" ? "bg-destructive/10 text-destructive" : l.status === "Warm" ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`,
              children: l.status
            }
          ) })
        ]
      },
      l.name
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 bg-muted/20 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "4 leads ready today" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
            "Get Clients Now"
          ]
        }
      )
    ] })
  ] });
}
function InboxMockup() {
  const threads = [
    {
      name: "Priya Sharma",
      msg: "Hi, interested in your pricing",
      time: "2m ago",
      status: "replied",
      unread: true
    },
    {
      name: "Style Zone",
      msg: "Can we schedule a call?",
      time: "15m ago",
      status: "pending",
      unread: false
    },
    {
      name: "Elegance Studio",
      msg: "Thanks for the follow-up",
      time: "1h ago",
      status: "booked",
      unread: false
    },
    {
      name: "Radiance Beauty",
      msg: "Sent follow-up message",
      time: "3h ago",
      status: "sent",
      unread: false
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card shadow-lg overflow-hidden text-sm w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/60 border-b border-border px-4 py-2.5 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-destructive/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-warning/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-success/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-muted-foreground font-medium", children: "GrowthOS — Inbox" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: threads.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-start gap-3 px-4 py-3 ${t.unread ? "bg-primary/5" : "bg-card"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-primary", children: t.name[0] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold ${t.unread ? "text-foreground" : "text-muted-foreground"}`,
                  children: t.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: t.time })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground truncate mt-0.5", children: t.msg })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${t.status === "booked" ? "bg-success/10 text-success" : t.status === "replied" ? "bg-primary/10 text-primary" : t.status === "pending" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`,
              children: t.status
            }
          )
        ]
      },
      t.name
    )) })
  ] });
}
function FAQItem({ q, a, index }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border/60 rounded-xl overflow-hidden bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(!open),
        "aria-expanded": open,
        "data-ocid": `salon_mumbai.faq_item.${index}`,
        className: "w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              animate: { rotate: open ? 180 : 0 },
              transition: { duration: 0.2 },
              className: "shrink-0 text-muted-foreground",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
        transition: { duration: 0.22 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 pb-4 text-sm text-muted-foreground leading-relaxed", children: a })
      },
      "body"
    ) })
  ] });
}
function SalonMumbaiPage() {
  useMetaTags(PAGE_META["/salon-mumbai"]);
  const navigate = useNavigate();
  const goLogin = () => navigate({ to: "/login" });
  const scrollTo = (id) => {
    var _a;
    (_a = document.getElementById(id)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  const [urlInput, setUrlInput] = reactExports.useState("");
  const problemCards = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5" }),
      title: "Irregular walk-ins",
      desc: "You can't predict daily footfall. Slots stay empty while costs keep running."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5" }),
      title: "Not showing in 'near me' searches",
      desc: "Customers searching online find your competitors first."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5" }),
      title: "No follow-up system",
      desc: "Warm enquiries go cold because there's no process to follow up."
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5" }),
      title: "No tracking of results",
      desc: "You don't know which actions are bringing in customers."
    }
  ];
  const steps = [
    {
      num: "01",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-6 h-6" }),
      title: "Get local prospects",
      desc: "Find businesses in your area that are actively searching for services."
    },
    {
      num: "02",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-6 h-6" }),
      title: "Send messages properly",
      desc: "Use structured templates that get replies instead of being ignored."
    },
    {
      num: "03",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-6 h-6" }),
      title: "Follow up",
      desc: "Most bookings close on the second or third touch. Reminders make it easy."
    },
    {
      num: "04",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-6 h-6" }),
      title: "Convert to bookings",
      desc: "Track each conversation from first contact to confirmed booking."
    }
  ];
  const faqs = [
    {
      q: "Will this work for my business?",
      a: "If your customers search online or use WhatsApp, this system can help you reach them. Results depend on your location, offer, and follow-up speed."
    },
    {
      q: "Do I need marketing experience?",
      a: "No. The app guides you through each step with simple tasks and templates. No technical knowledge required."
    },
    {
      q: "How soon can I start?",
      a: "You can start the same day. Sign up, set your niche and city, and your first leads will be ready to contact."
    },
    {
      q: "What if I don't have a website?",
      a: "You don't need a website. Many businesses use just WhatsApp and Google to get enquiries. The app works with both."
    }
  ];
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/mo",
      features: ["10 leads/day", "Manual outreach", "Basic tracking"],
      cta: "Start free",
      highlight: false
    },
    {
      name: "Growth",
      price: "₹299",
      period: "/mo",
      features: [
        "150 leads/day",
        "Follow-up reminders",
        "Simple tracking",
        "CRM pipeline"
      ],
      cta: "Get Growth Plan",
      highlight: true
    },
    {
      name: "Pro",
      price: "₹999",
      period: "/mo",
      features: ["Higher limits", "Proposals + reporting", "Campaign tools"],
      cta: "Go Pro",
      highlight: false
    }
  ];
  const sampleIssues = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive" }),
      label: "Slow load → visitors leave",
      severity: "high"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-warning" }),
      label: "No clear CTA → no enquiries",
      severity: "medium"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-warning" }),
      label: "Weak SEO → low visibility",
      severity: "medium"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground pb-16 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "header",
      {
        className: "sticky top-0 z-50 h-16 bg-background border-b border-border flex items-center",
        "data-ocid": "salon_mumbai.navbar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/" }),
              className: "font-bold text-xl text-primary hover:opacity-80 transition-opacity",
              "data-ocid": "salon_mumbai.logo_button",
              children: "GrowthOS"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6", children: [
            [
              { label: "How it works", id: "solution" },
              { label: "Pricing", id: "pricing" },
              { label: "Case examples", id: "case-examples" }
            ].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => scrollTo(link.id),
                className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
                "data-ocid": `salon_mumbai.nav_${link.id}`,
                children: link.label
              },
              link.id
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                onClick: goLogin,
                "data-ocid": "salon_mumbai.nav_audit_button",
                children: "Get Free Audit"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "how-it-works",
        className: "bg-background py-16 md:py-24",
        "data-ocid": "salon_mumbai.hero_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-10 md:gap-16 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "md:col-span-7",
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl font-bold leading-tight text-foreground", children: [
                  "Get more salon enquiries",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: " in Mumbai" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-muted-foreground mt-4 leading-relaxed", children: "Simple system to find prospects, contact them, and turn replies into bookings." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2.5", children: [
                  "Local leads in your area",
                  "Structured messages + follow-ups",
                  "Track enquiries → bookings"
                ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2.5 text-sm md:text-base text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success shrink-0" }),
                      item
                    ]
                  },
                  item
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "h-11 px-8 font-semibold",
                      onClick: goLogin,
                      "data-ocid": "salon_mumbai.hero_primary_button",
                      children: [
                        "Get Free Audit",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1.5" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "h-11 px-8",
                      onClick: () => scrollTo("solution"),
                      "data-ocid": "salon_mumbai.hero_secondary_button",
                      children: "See how it works"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "Works with standard tools used by businesses" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "md:col-span-5",
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.15 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadsMockup, {})
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "problems",
        className: "bg-muted/40 py-16",
        "data-ocid": "salon_mumbai.problems_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-2xl md:text-3xl font-bold text-center text-foreground mb-10",
              children: "Sound familiar?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4", children: problemCards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              "data-ocid": `salon_mumbai.problem_card.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border rounded-xl h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4", children: card.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1.5", children: card.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: card.desc })
              ] }) })
            },
            card.title
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground italic mt-8 text-sm", children: "This leads to missed enquiries every day." })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "solution",
        className: "bg-background py-18 md:py-24",
        "data-ocid": "salon_mumbai.solution_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: [
                  "A simple ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "4-step system" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Repeatable. No guesswork. Works from day one." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:grid grid-cols-4 gap-0", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative flex flex-col items-center text-center px-4",
              children: [
                i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-6 left-1/2 w-full h-0.5 bg-border",
                    style: { left: "50%" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 16 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { delay: i * 0.1 },
                    className: "flex flex-col items-center z-10",
                    "data-ocid": `salon_mumbai.step.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary mb-4 bg-background relative z-10", children: step.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary mb-1", children: step.num }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1.5", children: step.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: step.desc })
                    ]
                  }
                )
              ]
            },
            step.num
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden space-y-4", children: steps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              className: "flex gap-4 items-start",
              "data-ocid": `salon_mumbai.step_mobile.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: step.num }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: step.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: step.desc })
                ] })
              ]
            },
            step.num
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: goLogin,
              "data-ocid": "salon_mumbai.solution_cta_button",
              children: [
                "Start with 20 leads",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-1.5" })
              ]
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-18 md:py-24",
        "data-ocid": "salon_mumbai.product_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 md:gap-16 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.45 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(InboxMockup, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.45, delay: 0.1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-4", children: "Do the work in minutes, not hours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed mb-6", children: "Contact leads, track replies, and move conversations to bookings. Everything from one place — no spreadsheets, no switching apps." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    onClick: goLogin,
                    "data-ocid": "salon_mumbai.product_try_button",
                    children: "Try it free"
                  }
                )
              ]
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "health",
        className: "bg-background py-18 md:py-24",
        "data-ocid": "salon_mumbai.health_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "max-w-2xl mx-auto",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border shadow-sm rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-1", children: "See how your website is performing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Enter any URL and get a quick health scan." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "url",
                    placeholder: "https://yoursalon.in",
                    value: urlInput,
                    onChange: (e) => setUrlInput(e.target.value),
                    "data-ocid": "salon_mumbai.health_url_input",
                    className: "flex-1 h-11 px-4 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "h-11 shrink-0",
                    onClick: goLogin,
                    "data-ocid": "salon_mumbai.health_scan_button",
                    children: "Scan my website"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-6 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "96",
                      height: "96",
                      viewBox: "0 0 96 96",
                      className: "rotate-[-90deg]",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "48",
                            cy: "48",
                            r: "38",
                            fill: "none",
                            stroke: "oklch(var(--border))",
                            strokeWidth: "8"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "circle",
                          {
                            cx: "48",
                            cy: "48",
                            r: "38",
                            fill: "none",
                            stroke: "oklch(var(--success))",
                            strokeWidth: "8",
                            strokeLinecap: "round",
                            strokeDasharray: `${2 * Math.PI * 38}`,
                            strokeDashoffset: `${2 * Math.PI * 38 * (1 - 0.72)}`
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-foreground leading-none", children: "72" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "/100" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-3", children: "Sample issues found:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sampleIssues.map((issue) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2.5",
                      children: [
                        issue.icon,
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: issue.label })
                      ]
                    },
                    issue.label
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full h-11",
                  onClick: goLogin,
                  "data-ocid": "salon_mumbai.health_run_scan_button",
                  children: "Run free scan"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-3", children: "* Sample score for illustration. Enter your URL for a real scan." })
            ] }) })
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "case-examples",
        className: "bg-muted/40 py-18 md:py-24",
        "data-ocid": "salon_mumbai.case_examples_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Real examples" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "What happened when businesses started using a structured system." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-5", children: [
            {
              badge: "Salon, Mumbai",
              before: "Irregular walk-ins and unpredictable bookings",
              after: "Consistent inbound enquiries after setting up local SEO and a follow-up sequence"
            },
            {
              badge: "Gym, Pune",
              before: "Low trial sign-ups, relying on referrals only",
              after: "Steady local enquiries using a simple ad + reply system"
            }
          ].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              "data-ocid": `salon_mumbai.case_example.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-2xl border bg-card shadow-sm h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-4 bg-primary/8 text-primary border-primary/20 text-xs font-semibold",
                    children: c.badge
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/5 border border-destructive/10 rounded-xl p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wide text-destructive/70 mb-1.5", children: "Before" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: c.before })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-success/5 border border-success/15 rounded-xl p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-wide text-success mb-1.5", children: "After" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: c.after })
                  ] })
                ] })
              ] }) })
            },
            c.badge
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "pricing",
        className: "bg-background py-18 md:py-24",
        "data-ocid": "salon_mumbai.pricing_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-12",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Simple pricing. No hidden fees." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Start free. Upgrade when you want faster results." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5 max-w-3xl mx-auto", children: plans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: plan.highlight ? "md:-mt-4 md:mb-4" : "",
              "data-ocid": `salon_mumbai.pricing_plan.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: `h-full relative border ${plan.highlight ? "border-primary ring-2 ring-primary shadow-lg scale-105" : "border-border"}`,
                  children: [
                    plan.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground px-3 text-xs font-semibold", children: "Most popular" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground mb-1", children: plan.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 mb-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-foreground", children: plan.price }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: plan.period })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-6", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-start gap-2 text-sm text-foreground",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success shrink-0 mt-0.5" }),
                            f
                          ]
                        },
                        f
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          className: "w-full",
                          variant: plan.highlight ? "default" : "outline",
                          onClick: goLogin,
                          "data-ocid": `salon_mumbai.plan_cta.${i + 1}`,
                          children: plan.cta
                        }
                      )
                    ] })
                  ]
                }
              )
            },
            plan.name
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground mt-8", children: "Even a few extra customers can cover your monthly plan cost." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: goLogin,
              "data-ocid": "salon_mumbai.pricing_start_free_button",
              children: "Start free"
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "form",
        className: "bg-muted/40 py-18 md:py-24",
        "data-ocid": "salon_mumbai.form_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Get your free growth plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Tell us a bit about your business. We'll respond within a few hours." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: (e) => {
                  e.preventDefault();
                  goLogin();
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "sm-name",
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        children: "Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "sm-name",
                        type: "text",
                        placeholder: "Your name",
                        "data-ocid": "salon_mumbai.name_input",
                        className: "w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "sm-phone",
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        children: "Phone *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "sm-phone",
                        type: "tel",
                        required: true,
                        placeholder: "+91 98765 43210",
                        "data-ocid": "salon_mumbai.phone_input",
                        className: "w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "sm-btype",
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        children: "Business type"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "sm-btype",
                        "data-ocid": "salon_mumbai.business_type_select",
                        className: "w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "salon", children: "Salon" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gym", children: "Gym" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "clinic", children: "Clinic" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "realestate", children: "Real Estate" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other" })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "sm-city",
                        className: "block text-sm font-medium text-foreground mb-1.5",
                        children: "City"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "sm-city",
                        type: "text",
                        defaultValue: "Mumbai",
                        readOnly: true,
                        "data-ocid": "salon_mumbai.city_input",
                        className: "w-full h-11 px-3 rounded-xl border border-input bg-muted/30 text-sm text-muted-foreground cursor-not-allowed"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "w-full h-11 font-semibold",
                      "data-ocid": "salon_mumbai.form_submit_button",
                      children: "Get Free Growth Plan"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: goLogin,
                "data-ocid": "salon_mumbai.whatsapp_cta_button",
                className: "w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/8 text-sm font-semibold text-foreground hover:bg-[#25D366]/15 transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 24 24",
                      fill: "#25D366",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                    }
                  ),
                  "Chat on WhatsApp"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-center text-muted-foreground pt-1", children: [
              "For help, call Anees Chaudhary:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "tel:+919324073833",
                  className: "text-primary hover:underline",
                  children: "+91 9324073833"
                }
              )
            ] })
          ] }) })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "faq",
        className: "bg-background py-18 md:py-24",
        "data-ocid": "salon_mumbai.faq_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-2xl md:text-3xl font-bold text-foreground text-center mb-10",
              children: "Common questions"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-3 max-w-3xl mx-auto", children: faqs.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FAQItem, { q: faq.q, a: faq.a, index: i + 1 }, faq.q)) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary text-primary-foreground py-18 md:py-24",
        "data-ocid": "salon_mumbai.final_cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1200px] mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Stop guessing. Start getting enquiries." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 mb-8 text-base", children: "Start free. No card required. Works from day one." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  variant: "secondary",
                  className: "h-12 px-10 font-semibold text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90",
                  onClick: goLogin,
                  "data-ocid": "salon_mumbai.final_cta_button",
                  children: [
                    "Start free",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 ml-2" })
                  ]
                }
              )
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "footer",
      {
        className: "bg-card border-t border-border py-10",
        "data-ocid": "salon_mumbai.footer",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg text-foreground", children: "GrowthOS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Helping local businesses get more enquiries." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Need help?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "tel:+919324073833",
                  className: "text-primary font-semibold hover:underline",
                  "data-ocid": "salon_mumbai.footer_contact_link",
                  children: "Call Anees Chaudhary: +91 9324073833"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-xs text-muted-foreground mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: goLogin,
                className: "hover:text-foreground transition-colors",
                children: "Privacy policy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: goLogin,
                className: "hover:text-foreground transition-colors",
                children: "Terms"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: goLogin,
                className: "hover:text-foreground transition-colors",
                children: "Contact"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Results depend on execution, location, and offer. No guarantees are made. Platform integrations shown are not official partnerships." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " GrowthOS. Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "growthos")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline",
                children: "caffeine.ai"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-3 md:hidden",
        "data-ocid": "salon_mumbai.sticky_cta",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full h-11 font-semibold",
            onClick: goLogin,
            "data-ocid": "salon_mumbai.sticky_cta_button",
            children: "Get Free Audit"
          }
        )
      }
    )
  ] });
}
export {
  SalonMumbaiPage as default
};
