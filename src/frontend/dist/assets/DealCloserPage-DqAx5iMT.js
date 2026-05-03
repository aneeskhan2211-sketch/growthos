import { b as useQueryClient, u as useActor, d as useMutation, e as createActor, U as useLeads, r as reactExports, m as ue, j as jsxRuntimeExports, Z as Zap, h as Badge, y as motion, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem, T as TrendingUp, G as Star, s as Copy, i as Button, n as Card, o as CardHeader, aw as CardTitle, p as CardContent, z as Textarea, ax as Lightbulb, ac as RefreshCw, A as AnimatePresence, P as Phone, ab as Sparkles, a6 as LoaderCircle, E as ChevronUp, q as ChevronDown, ay as Save, a5 as MessageSquare, a0 as CircleCheck } from "./index-DcPx_5wo.js";
function useCreateConversionScript() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) {
        const mock = {
          id: `script-${Date.now()}`,
          ...input,
          createdAt: Date.now()
        };
        return mock;
      }
      return actor.createConversionScript(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["growth-engine", "scripts"] });
    }
  });
}
const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    priceINR: 1e4,
    tagline: "Launch your digital presence",
    features: [
      "SEO basics + on-page optimization",
      "1 social media platform managed",
      "Monthly performance report",
      "Google Business Profile setup",
      "3 blog posts per month",
      "Basic keyword tracking (10 keywords)"
    ],
    roi: "Expected return: 2x within 90 days",
    expectedClients: 2,
    avgClientValue: 15e3
  },
  {
    id: "growth",
    name: "Growth",
    priceINR: 25e3,
    tagline: "Accelerate with paid & organic",
    features: [
      "Full SEO (technical + content + link building)",
      "2 social media platforms managed",
      "Google Ads + Meta Ads campaigns",
      "Weekly performance reports",
      "WhatsApp support (8am–8pm)",
      "Competitor tracking dashboard"
    ],
    roi: "Expected return: 3x within 90 days",
    popular: true,
    expectedClients: 5,
    avgClientValue: 2e4
  },
  {
    id: "scale",
    name: "Scale",
    priceINR: 5e4,
    tagline: "Full-suite agency partnership",
    features: [
      "Full digital marketing suite (SEO + Ads + Social)",
      "Dedicated account manager",
      "Daily reporting + live dashboard",
      "Guaranteed 10 leads/month or refund",
      "Video ad creatives included",
      "Priority 24/7 support"
    ],
    roi: "Expected return: 5x within 90 days",
    expectedClients: 10,
    avgClientValue: 25e3
  }
];
const OBJECTIONS = [
  {
    id: "price",
    title: "Price is too high",
    response: "I understand budget is a real concern. But consider this — you're currently losing ₹30,000+ every month from clients who can't find you online. Our Growth plan at ₹25,000 pays for itself within 30 days of new clients. Would a 30-day money-back guarantee ease that concern?"
  },
  {
    id: "think",
    title: "Need to think about it",
    response: "Absolutely, take your time. While you think, your competitors are running ads today targeting your exact customers. I'll send you a 1-page summary with the projected ROI so you have all the numbers handy. When's a good time to reconnect — Thursday or Friday?"
  },
  {
    id: "cheaper",
    title: "Our competitor is cheaper",
    response: "Cheaper services often mean lower quality links, templated content, and zero strategy. We've seen businesses pay ₹5,000/month for 6 months with zero results. Our pricing reflects real strategy, dedicated execution, and a results guarantee. Would you like to see a case study from a similar business?"
  },
  {
    id: "roi",
    title: "Not sure about ROI",
    response: "Fair point — let me show you the math. At ₹25,000/month, if we bring you just 3 new clients at ₹15,000 each, that's ₹45,000 in new revenue — a 1.8x return in month one alone. We track this transparently in weekly reports."
  },
  {
    id: "timing",
    title: "Bad timing right now",
    response: "The best time to plant a tree was 20 years ago — the second best is today. SEO takes 3–6 months to compound. Starting now means results by Q3. Every month you delay is a month of ranking you'll never recover. Want to start small with our Starter plan and scale up?"
  },
  {
    id: "tried",
    title: "Already tried digital marketing",
    response: "That's valuable context. Bad experiences usually come from agencies who set it and forget it. We do things differently — weekly check-ins, transparent reporting, and a dedicated point of contact who knows your business. What specifically didn't work before? That tells us exactly what to fix."
  },
  {
    id: "partner",
    title: "Need to talk to my partner",
    response: "Of course — major decisions need alignment. I'll send a concise PDF with the plan, pricing, and expected outcomes — designed so your partner can review it in under 5 minutes. Can I schedule a 15-minute call with both of you this week to answer questions together?"
  }
];
const NEGOTIATION_TIPS = [
  "Focus on ROI, not cost — show the math clearly",
  "Offer a 30-day money-back guarantee to remove risk",
  "Reference a local success story from their niche",
  "Ask what didn't work before — solve that specific problem",
  "Create urgency: every month delayed = lost rankings",
  "Offer a pilot month to demonstrate value before full commitment",
  "Let them choose the plan — autonomy increases close rate by 40%"
];
const SERVICE_OPTIONS = [
  { value: "digital_marketing", label: "Digital Marketing" },
  { value: "seo_content", label: "SEO & Content" },
  { value: "social_media", label: "Social Media Management" },
  { value: "website_design", label: "Website Design" },
  { value: "google_ads", label: "Google Ads" },
  { value: "all_in_one", label: "All-in-One Growth Package" }
];
const PAIN_POINTS = [
  { value: "not_ranking", label: "Not ranking on Google" },
  { value: "low_traffic", label: "Low website traffic" },
  { value: "no_leads", label: "No consistent leads" },
  { value: "bad_roi", label: "Spending on ads with no ROI" },
  { value: "competitor_outranking", label: "Competitor is outranking them" },
  { value: "no_presence", label: "No online presence" }
];
const BUDGET_TIERS = [
  {
    value: "budget",
    label: "Budget",
    sub: "Under ₹10k/month",
    price: "₹10,000"
  },
  {
    value: "mid",
    label: "Mid-Range",
    sub: "₹10k–₹25k/month",
    price: "₹25,000"
  },
  { value: "premium", label: "Premium", sub: "₹25k+/month", price: "₹50,000" }
];
const SITUATION_CARDS = [
  {
    id: "price_high",
    situation: "Prospect says price is too high",
    suggestion: "Share ROI math: If we get you 20 clients at ₹5k average, that's ₹1L/month. Our fee is ₹15k. That's 6.7x ROI in month 1."
  },
  {
    id: "need_time",
    situation: "Prospect says they need to think about it",
    suggestion: "Acknowledge + create urgency: 'I totally get it. Can I share one thing — your competitor in [City] just hired us last week. First-mover advantage matters here.'"
  },
  {
    id: "discount",
    situation: "Prospect asks for a discount",
    suggestion: "Offer value, not discount: 'Instead of reducing price, let me add a bonus: free competitor analysis report worth ₹5,000. Is that fair?'"
  },
  {
    id: "not_interested",
    situation: "Prospect is not interested",
    suggestion: "Value hook: 'No worries. Can I send you a free audit? No commitment. You'll see exactly what you're missing. Takes 2 minutes to review.'"
  },
  {
    id: "compare",
    situation: "Prospect wants to compare with others",
    suggestion: "Comparison redirect: 'Great idea — while you're comparing, I'll prepare your custom growth roadmap. You'll have something no other agency will give you in the meeting.'"
  }
];
function buildValueProp(painPoint) {
  const map = {
    not_ranking: "Most [Niche] businesses in [City] are invisible on Google for their best keywords. We've helped 50+ businesses rank in the top 3 results in 60–90 days. That typically means 15–30 new qualified leads every month.",
    low_traffic: "The average [Niche] business in [City] misses 200–400 local searches every month because their website isn't optimized. We fix that — our clients see 40–60% more organic traffic within 60 days.",
    no_leads: "Inconsistent leads are usually a top-of-funnel problem. We build a predictable lead system using local SEO + retargeting ads so you get 10–20 new inquiries every month, not just when you're lucky.",
    bad_roi: "Ad spend without a conversion funnel is money burned. We audit your current campaigns, fix the targeting, and add a landing page that converts. Most clients see ROAS improve from 0.8x to 3x within 45 days.",
    competitor_outranking: "Your competitor ranking above you is costing you real customers every single day. We do a deep competitor audit, identify the exact gaps, and execute a plan to overtake them in 60–90 days.",
    no_presence: "If you don't exist on Google, you don't exist to your customers. We build your entire digital presence from scratch — Google Business Profile, website SEO, and local citations — in 30 days."
  };
  return map[painPoint];
}
function buildObjectionHandlers(painPoint) {
  const baseHandlers = [
    {
      objection: "Too expensive",
      softResponse: "I completely understand — let me share the numbers so you can see the math clearly. If we bring you just 3 new clients this month at ₹8,000 average, that's ₹24,000 in new revenue from a ₹10,000 investment.",
      directResponse: "Your competitor is already spending ₹15k/month on ads. If you don't, you lose. Every month of delay is market share you can't recover."
    },
    {
      objection: "Not the right time",
      softResponse: "Completely fair. The thing is, SEO takes 60–90 days to show results. Starting today means you see results by the time the season picks up. Waiting means you miss that window entirely.",
      directResponse: "There is never a 'perfect' time. The businesses growing right now are the ones who started during slower periods. This is your advantage window."
    },
    {
      objection: "We tried it before, didn't work",
      softResponse: "That's really helpful to know. What specifically didn't work — was it the traffic, the leads, or the conversions? Because if I know the weak link, I can show you exactly how we fix it differently.",
      directResponse: "Generic agencies fail because they use cookie-cutter strategies. We do a niche-specific plan for your exact market in [City]. That's why our clients see results where others didn't."
    }
  ];
  if (painPoint === "bad_roi") {
    baseHandlers[0].directResponse = "You're already spending money with zero return. Our fee replaces wasted ad spend and actually drives results. You're not adding cost — you're replacing it with something that works.";
  }
  return baseHandlers.slice(0, 4);
}
function generateScript(serviceType, painPoint, budgetTier) {
  var _a, _b, _c;
  const tierLabel = ((_a = BUDGET_TIERS.find((b) => b.value === budgetTier)) == null ? void 0 : _a.label) ?? "Mid-Range";
  const price = ((_b = BUDGET_TIERS.find((b) => b.value === budgetTier)) == null ? void 0 : _b.price) ?? "₹25,000";
  const serviceLabel = ((_c = SERVICE_OPTIONS.find((s) => s.value === serviceType)) == null ? void 0 : _c.label) ?? "Digital Marketing";
  return {
    opener: `Hi [BusinessName], this is [YourName] from [Agency]. I noticed your [Niche] business in [City] isn't showing up when people search for [ServiceKeyword] nearby. I've been helping businesses like yours add 20–40 new customers per month using ${serviceLabel}. Do you have 5 minutes to hear a quick idea?`,
    discoveryQuestions: [
      "How are you currently getting new customers each month?",
      "Have you tried Google Ads or SEO before? What happened?",
      "If you could double your monthly customers, what would that mean for your revenue?",
      "What's your biggest challenge right now — getting found online, or converting visitors who find you?"
    ],
    valueProp: buildValueProp(painPoint),
    closingTalk: `Based on what you've shared, I think we can get you [X] new customers in the first 90 days. Our ${tierLabel} package at ${price}/month includes everything you need for ${serviceLabel}. Shall we start with a free audit this week so I can show you exactly what's possible?`,
    objectionHandlers: buildObjectionHandlers(painPoint)
  };
}
function ScoreBadge({ score }) {
  const n = Number(score);
  const cls = n >= 80 ? "bg-score-critical/15 score-critical" : n >= 60 ? "bg-score-warning/15 score-warning" : "bg-score-success/15 score-success";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`, children: n });
}
function CopyButton({
  text,
  label = "Copy"
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = reactExports.useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    ue.success("Copied!");
    setTimeout(() => setCopied(false), 2e3);
  }, [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "ghost",
      size: "sm",
      className: "gap-1.5 text-xs h-7 shrink-0",
      onClick: handleCopy,
      children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
        copied ? "Copied!" : label
      ]
    }
  );
}
function PricingCard({
  plan,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: `relative flex flex-col rounded-xl border-2 transition-smooth cursor-pointer ${selected ? "border-primary shadow-premium bg-card" : plan.popular ? "border-premium-accent bg-card" : "border-border bg-card hover:border-primary/50"}`,
      onClick: onSelect,
      "data-ocid": `deal_closer.plan_card.${plan.id}`,
      children: [
        plan.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-premium text-primary text-xs font-bold px-4 py-1 rounded-full border border-premium-accent shadow-subtle", children: "✦ Most Popular" }) }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-primary fill-primary/20" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-6 pb-4 ${plan.popular ? "pt-8" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1", children: plan.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-4xl font-bold text-foreground leading-none", children: [
            "₹",
            plan.priceINR.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "/month" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: plan.tagline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-4", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f })
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-premium-accent bg-premium-accent-light rounded-lg px-3 py-2 mb-4", children: plan.roi })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full",
            variant: selected ? "default" : plan.popular ? "default" : "outline",
            onClick: (e) => {
              e.stopPropagation();
              onSelect();
            },
            "data-ocid": `deal_closer.select_plan.${plan.id}`,
            children: selected ? "✓ Selected" : "Select Plan"
          }
        ) })
      ]
    }
  );
}
function ROITable({ selectedTier }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-semibold text-muted-foreground", children: "Metric" }),
      PRICING_PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "th",
        {
          className: `text-right px-4 py-3 font-semibold ${p.id === selectedTier ? "text-primary" : "text-muted-foreground"}`,
          children: [
            p.name,
            p.id === selectedTier && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs", children: "●" })
          ]
        },
        p.id
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
      {
        label: "Monthly Investment",
        values: PRICING_PLANS.map(
          (p) => `₹${p.priceINR.toLocaleString("en-IN")}`
        )
      },
      {
        label: "Expected New Clients/mo",
        values: PRICING_PLANS.map((p) => `${p.expectedClients} clients`)
      },
      {
        label: "Avg. Client Value",
        values: PRICING_PLANS.map(
          (p) => `₹${p.avgClientValue.toLocaleString("en-IN")}`
        )
      },
      {
        label: "Projected Monthly Revenue",
        values: PRICING_PLANS.map(
          (p) => `₹${(p.expectedClients * p.avgClientValue).toLocaleString("en-IN")}`
        )
      },
      {
        label: "ROI",
        values: PRICING_PLANS.map((p) => {
          const rev = p.expectedClients * p.avgClientValue;
          const roi = Math.round((rev - p.priceINR) / p.priceINR * 100);
          return `${roi}%`;
        }),
        highlight: true
      }
    ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border last:border-0",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground font-medium", children: row.label }),
          PRICING_PLANS.map((p, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              className: `px-4 py-3 text-right font-${row.highlight ? "bold" : "normal"} ${p.id === selectedTier ? row.highlight ? "text-primary text-base" : "text-foreground" : row.highlight ? "text-muted-foreground" : "text-foreground/70"}`,
              children: row.values[j]
            },
            p.id
          ))
        ]
      },
      row.label
    )) })
  ] }) });
}
function ObjectionCard({ obj }) {
  const [open, setOpen] = reactExports.useState(false);
  const copy = reactExports.useCallback(() => {
    navigator.clipboard.writeText(obj.response);
    ue.success("Response copied!");
  }, [obj.response]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-xl bg-card overflow-hidden transition-smooth",
      "data-ocid": `deal_closer.objection.${obj.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-smooth",
            onClick: () => setOpen((o) => !o),
            "aria-expanded": open,
            "data-ocid": `deal_closer.objection_toggle.${obj.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm text-foreground", children: [
                '"',
                obj.title,
                '"'
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 border-t border-border/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: obj.response }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "mt-3 gap-1.5 text-xs h-7",
                  onClick: copy,
                  "data-ocid": `deal_closer.copy_response.${obj.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                    "Copy Response"
                  ]
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
function generateProposalText(lead, tier) {
  const plan = PRICING_PLANS.find((p) => p.id === tier);
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const name = (lead == null ? void 0 : lead.businessName) ?? "[Business Name]";
  const city = (lead == null ? void 0 : lead.city) ?? "[City]";
  return `DIGITAL MARKETING PROPOSAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prepared for: ${name}
Location: ${city}
Date: ${today}
Plan: ${plan.name} — ₹${plan.priceINR.toLocaleString("en-IN")}/month
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
─────────────────
${name} has significant untapped growth potential in ${city}. Based on our analysis, this business is currently losing an estimated ₹${(plan.expectedClients * plan.avgClientValue * 0.6).toLocaleString("en-IN")}/month in revenue due to limited online visibility and no structured digital marketing strategy.

Our ${plan.name} plan is designed to reverse this within 90 days.

SERVICES INCLUDED
─────────────────
${plan.features.map((f, i) => `${i + 1}. ${f}`).join("\n")}

ROI PROJECTION
─────────────────
• Monthly Investment: ₹${plan.priceINR.toLocaleString("en-IN")}
• Expected New Clients/month: ${plan.expectedClients}
• Average Client Value: ₹${plan.avgClientValue.toLocaleString("en-IN")}
• Projected Monthly Revenue: ₹${(plan.expectedClients * plan.avgClientValue).toLocaleString("en-IN")}
• ROI: ${Math.round((plan.expectedClients * plan.avgClientValue - plan.priceINR) / plan.priceINR * 100)}%

${plan.roi}

90-DAY MILESTONE PLAN
──────────────────────
📅 Days 1–30 (Foundation):
   • Website audit & on-page SEO optimization
   • Google Business Profile optimization
   • Social media accounts setup & content calendar
   • First ad campaigns launched with A/B testing

📅 Days 31–60 (Traction):
   • Content publishing begins (blogs/reels/ads)
   • First ranking improvements visible (20–30 keywords)
   • Lead generation pipeline active
   • Weekly performance review calls

📅 Days 61–90 (Results):
   • ${plan.expectedClients} new clients acquired
   • Monthly traffic increased by 40–60%
   • Paid ads achieving positive ROAS
   • Full reporting dashboard live

WHY CHOOSE US
─────────────────
✓ Transparent weekly reporting — no black boxes
✓ Dedicated account manager for ${name}
✓ 30-day money-back guarantee if zero results
✓ Proven track record in ${city} market

NEXT STEPS
─────────────────
1. Confirm this proposal (reply or call)
2. Sign simple 3-page agreement
3. Onboarding call scheduled within 48 hours
4. Campaign live within 7 business days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ready to get started? Let's grow ${name} together.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}
function CallScriptGenerator() {
  const [serviceType, setServiceType] = reactExports.useState("digital_marketing");
  const [painPoint, setPainPoint] = reactExports.useState("not_ranking");
  const [budgetTier, setBudgetTier] = reactExports.useState("mid");
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const [script, setScript] = reactExports.useState(null);
  const [openObjIdx, setOpenObjIdx] = reactExports.useState(null);
  const { mutateAsync: createScript } = useCreateConversionScript();
  const handleGenerate = reactExports.useCallback(async () => {
    setIsGenerating(true);
    setScript(null);
    await new Promise((r) => setTimeout(r, 1500));
    setScript(generateScript(serviceType, painPoint, budgetTier));
    setIsGenerating(false);
  }, [serviceType, painPoint, budgetTier]);
  const handleSave = reactExports.useCallback(async () => {
    var _a, _b;
    if (!script) return;
    const serviceLabel = ((_a = SERVICE_OPTIONS.find((s) => s.value === serviceType)) == null ? void 0 : _a.label) ?? "";
    const painLabel = ((_b = PAIN_POINTS.find((p) => p.value === painPoint)) == null ? void 0 : _b.label) ?? "";
    await createScript({
      type: "discovery_call",
      title: `${serviceLabel} — ${painLabel}`,
      niche: serviceType,
      steps: [
        { step: 1, label: "Opener", script: script.opener },
        {
          step: 2,
          label: "Discovery",
          script: script.discoveryQuestions.join("\n")
        },
        { step: 3, label: "Value Prop", script: script.valueProp },
        { step: 4, label: "Close", script: script.closingTalk }
      ]
    });
    ue.success("Script saved to your library!");
  }, [script, serviceType, painPoint, createScript]);
  const allQuestionsText = reactExports.useMemo(
    () => (script == null ? void 0 : script.discoveryQuestions.map((q, i) => `${i + 1}. ${q}`).join("\n")) ?? "",
    [script]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.04 },
      "data-ocid": "deal_closer.script_generator_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "AI Call Script Generator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "gradient-premium text-primary border-premium-accent text-xs px-2 py-0.5 gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3" }),
            "Powered by AI"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Service Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: serviceType,
                  onValueChange: (v) => setServiceType(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "bg-background border-border h-10",
                        "data-ocid": "deal_closer.script_service_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SERVICE_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Prospect Pain Point" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: painPoint,
                  onValueChange: (v) => setPainPoint(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "bg-background border-border h-10",
                        "data-ocid": "deal_closer.script_pain_select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAIN_POINTS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3", children: "Budget Tier" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: BUDGET_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setBudgetTier(tier.value),
                className: `rounded-xl border-2 px-4 py-3 text-left transition-smooth ${budgetTier === tier.value ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40"}`,
                "data-ocid": `deal_closer.script_budget.${tier.value}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${budgetTier === tier.value ? "border-primary bg-primary" : "border-muted-foreground"}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: tier.label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-5", children: tier.sub })
                ]
              },
              tier.value
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "w-full gap-2 h-11",
              onClick: handleGenerate,
              disabled: isGenerating,
              "data-ocid": "deal_closer.generate_script_button",
              children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Generating Script…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
                "Generate Script"
              ] })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: script && !isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 8 },
            transition: { duration: 0.3 },
            className: "mt-5 space-y-4",
            "data-ocid": "deal_closer.generated_script_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "py-3 px-4 bg-muted/30 border-b border-border flex-row items-center justify-between space-y-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center", children: "A" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Call Opener" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyButton,
                    {
                      text: script.opener,
                      "data-ocid": "deal_closer.copy_opener_button"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed italic", children: [
                  '"',
                  script.opener,
                  '"'
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "py-3 px-4 bg-muted/30 border-b border-border flex-row items-center justify-between space-y-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center", children: "B" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Discovery Questions" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyButton,
                    {
                      text: allQuestionsText,
                      label: "Copy All",
                      "data-ocid": "deal_closer.copy_questions_button"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2.5", children: script.discoveryQuestions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0 mt-0.5", children: i + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    '"',
                    q,
                    '"'
                  ] })
                ] }, q)) }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "py-3 px-4 bg-muted/30 border-b border-border flex-row items-center justify-between space-y-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center", children: "C" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Value Proposition" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyButton,
                    {
                      text: script.valueProp,
                      "data-ocid": "deal_closer.copy_value_prop_button"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: script.valueProp }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "py-3 px-4 bg-muted/30 border-b border-border flex-row items-center justify-between space-y-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center", children: "D" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold", children: "Closing Talk" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CopyButton,
                    {
                      text: script.closingTalk,
                      "data-ocid": "deal_closer.copy_closing_button"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed italic", children: [
                  '"',
                  script.closingTalk,
                  '"'
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-1", children: "E — Objection Handlers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: script.objectionHandlers.map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "border border-border rounded-xl bg-card overflow-hidden",
                    "data-ocid": `deal_closer.script_objection.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          className: "w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-smooth",
                          onClick: () => setOpenObjIdx(openObjIdx === idx ? null : idx),
                          "aria-expanded": openObjIdx === idx,
                          "data-ocid": `deal_closer.script_objection_toggle.${idx + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm text-foreground", children: [
                              '"',
                              h.objection,
                              '"'
                            ] }),
                            openObjIdx === idx ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: openObjIdx === idx && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { height: 0, opacity: 0 },
                          animate: { height: "auto", opacity: 1 },
                          exit: { height: 0, opacity: 0 },
                          transition: { duration: 0.2 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 border-t border-border/60 space-y-3 pt-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide", children: "Soft Response" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-success/5 border border-success/20 rounded-lg p-3 flex items-start gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed flex-1", children: h.softResponse }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: h.softResponse })
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide", children: "Direct Response" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-start gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed flex-1", children: h.directResponse }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { text: h.directResponse })
                              ] })
                            ] })
                          ] })
                        }
                      ) })
                    ]
                  },
                  h.objection
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  className: "gap-2",
                  onClick: handleSave,
                  "data-ocid": "deal_closer.save_script_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                    "Save Script to Library"
                  ]
                }
              ) })
            ]
          }
        ) })
      ]
    }
  );
}
function LiveChatSuggestions() {
  const [isExpanded, setIsExpanded] = reactExports.useState(true);
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const handleCopy = reactExports.useCallback((card) => {
    navigator.clipboard.writeText(card.suggestion);
    setCopiedId(card.id);
    ue.success("Suggestion copied!");
    setTimeout(() => setCopiedId(null), 2e3);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.08 },
      "data-ocid": "deal_closer.live_chat_section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between mb-4 group",
            onClick: () => setIsExpanded((v) => !v),
            "aria-expanded": isExpanded,
            "data-ocid": "deal_closer.live_chat_toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Live Negotiation Assistant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Real-time" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-smooth", children: [
                isExpanded ? "Collapse" : "Expand",
                isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Real-time suggestions during your prospect calls. Click any card to copy." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: SITUATION_CARDS.map((card, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  type: "button",
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: idx * 0.05 },
                  className: `text-left rounded-xl border transition-smooth p-4 group relative overflow-hidden ${copiedId === card.id ? "border-success bg-success/5" : "border-border bg-card hover:border-primary/50 hover:shadow-subtle"}`,
                  onClick: () => handleCopy(card),
                  "data-ocid": `deal_closer.situation_card.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-premium opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide leading-tight", children: card.situation }),
                        copiedId === card.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 text-muted-foreground/50 flex-shrink-0 group-hover:text-primary transition-smooth" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: card.suggestion })
                    ] })
                  ]
                },
                card.id
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-4 text-center italic", children: "Based on publicly available sales frameworks and heuristics" })
            ]
          }
        ) })
      ]
    }
  );
}
function DealCloserPage() {
  var _a;
  const { data: leads = [] } = useLeads();
  const [selectedLeadId, setSelectedLeadId] = reactExports.useState("");
  const [selectedTier, setSelectedTier] = reactExports.useState("growth");
  const [proposalText, setProposalText] = reactExports.useState("");
  const [tipIndex, setTipIndex] = reactExports.useState(0);
  const selectedLead = leads.find((l) => l.id.toString() === selectedLeadId);
  const handleGenerateProposal = reactExports.useCallback(() => {
    const text = generateProposalText(selectedLead, selectedTier);
    setProposalText(text);
    ue.success("Proposal generated!");
  }, [selectedLead, selectedTier]);
  const handleCopyProposal = reactExports.useCallback(() => {
    if (!proposalText) return;
    navigator.clipboard.writeText(proposalText);
    ue.success("Proposal copied to clipboard!");
  }, [proposalText]);
  const rotateTip = reactExports.useCallback(() => {
    setTipIndex((i) => (i + 1) % NEGOTIATION_TIPS.length);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-6 py-5 shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-primary" }),
          "AI Deal Closer"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Generate proposals, handle objections, and close deals faster" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "gradient-premium text-primary border-premium-accent px-3 py-1", children: "Conversion Engine" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CallScriptGenerator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LiveChatSuggestions, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.12 },
          "data-ocid": "deal_closer.lead_selector_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-3", children: "Select a Lead" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedLeadId, onValueChange: setSelectedLeadId, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "bg-card border-border h-11",
                    "data-ocid": "deal_closer.lead_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a lead to build a proposal for…" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: leads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectItem,
                  {
                    value: lead.id.toString(),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: lead.businessName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
                        "· ",
                        lead.city
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBadge, { score: lead.leadScore })
                    ] })
                  },
                  lead.id.toString()
                )) })
              ] }),
              selectedLead && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                selectedLead.industry,
                " · ",
                selectedLead.city,
                " · Score:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: Number(selectedLead.leadScore) })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          "data-ocid": "deal_closer.pricing_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground mb-6", children: "Pricing Plans" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: PRICING_PLANS.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.15 + i * 0.08 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PricingCard,
                  {
                    plan,
                    selected: selectedTier === plan.id,
                    onSelect: () => setSelectedTier(plan.id)
                  }
                )
              },
              plan.id
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.22 },
          "data-ocid": "deal_closer.roi_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "ROI Breakdown" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ROITable, { selectedTier })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.27 },
          "data-ocid": "deal_closer.objections_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Objection Handling Scripts" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Ready-to-use responses for every common sales objection. Click to expand, copy to clipboard." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: OBJECTIONS.map((obj) => /* @__PURE__ */ jsxRuntimeExports.jsx(ObjectionCard, { obj }, obj.id)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.32 },
          "data-ocid": "deal_closer.proposal_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-5 h-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Proposal Generator" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: handleGenerateProposal,
                    className: "gap-1.5",
                    "data-ocid": "deal_closer.generate_proposal_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" }),
                      "Generate Proposal"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    disabled: !proposalText,
                    onClick: handleCopyProposal,
                    className: "gap-1.5",
                    "data-ocid": "deal_closer.copy_proposal_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                      "Copy All"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-elevated", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 border-b border-border bg-muted/20 rounded-t-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-destructive/60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-warning/60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full bg-success/60" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-mono text-muted-foreground font-normal", children: "proposal_document.txt" }),
                selectedLead && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs ml-auto", children: [
                  selectedLead.businessName,
                  " ·",
                  " ",
                  (_a = PRICING_PLANS.find((p) => p.id === selectedTier)) == null ? void 0 : _a.name
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: proposalText ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: proposalText,
                  onChange: (e) => setProposalText(e.target.value),
                  className: "font-mono text-xs border-0 rounded-none rounded-b-xl bg-card min-h-[420px] resize-y focus-visible:ring-0 leading-relaxed",
                  "data-ocid": "deal_closer.proposal_textarea"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center min-h-[280px] text-center px-6",
                  "data-ocid": "deal_closer.proposal_empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl gradient-premium flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-6 h-6 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No proposal yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground max-w-xs", children: [
                      "Select a lead and pricing plan above, then click",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Generate Proposal" }),
                      " to create a full client document."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        className: "mt-4 gap-1.5",
                        onClick: handleGenerateProposal,
                        "data-ocid": "deal_closer.generate_proposal_empty_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                          "Generate Now"
                        ]
                      }
                    )
                  ]
                }
              ) })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        transition: { delay: 0.5, type: "spring", stiffness: 260, damping: 20 },
        className: "fixed bottom-6 right-6 z-50 w-72",
        "data-ocid": "deal_closer.negotiation_coach",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-premium-accent shadow-premium bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg gradient-premium flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-semibold text-foreground", children: "Live Negotiation Tips" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-muted-foreground hover:text-foreground",
                onClick: rotateTip,
                "aria-label": "Next tip",
                "data-ocid": "deal_closer.next_tip_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.p,
              {
                initial: { opacity: 0, x: 10 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -10 },
                transition: { duration: 0.2 },
                className: "text-sm text-muted-foreground leading-relaxed",
                children: [
                  '"',
                  NEGOTIATION_TIPS[tipIndex],
                  '"'
                ]
              },
              tipIndex
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mt-3", children: NEGOTIATION_TIPS.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `h-1 rounded-full transition-smooth ${i === tipIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"}`,
                onClick: () => setTipIndex(i),
                "aria-label": `Tip ${i + 1}`,
                "data-ocid": `deal_closer.tip_dot.${i + 1}`
              },
              tip.slice(0, 20)
            )) })
          ] })
        ] })
      }
    )
  ] });
}
export {
  DealCloserPage as default
};
