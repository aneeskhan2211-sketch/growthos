import { r as reactExports, a$ as useNavigate, j as jsxRuntimeExports, bO as MetaTags, aN as PAGE_META, i as Button, y as motion, A as AnimatePresence, X, a0 as CircleCheck, G as Star, Z as Zap, ab as Sparkles, bw as Crown, q as ChevronDown } from "./index-DcPx_5wo.js";
import { u as useSubscriptionStatus } from "./useStripeCheckout-rk_8uuUQ.js";
const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    leads: "10 leads/day",
    features: ["10 leads/day", "Manual outreach", "Basic tracking"],
    cta: "Start free",
    isFree: true
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    leads: "50 leads/day",
    features: ["50 leads/day", "Message templates", "Basic follow-ups"],
    cta: "Get started"
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 299,
    yearlyPrice: 239,
    leads: "150 leads/day",
    features: [
      "150 leads/day",
      "Auto follow-ups",
      "CRM pipeline",
      "Simple reports"
    ],
    cta: "Upgrade to Growth",
    badge: "Most businesses start here",
    highlighted: true
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 999,
    yearlyPrice: 799,
    leads: "500 leads/day",
    features: [
      "500 leads/day",
      "Proposal generator",
      "Campaign tools",
      "Advanced tracking"
    ],
    cta: "Go Pro"
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    leads: "High-volume usage",
    features: [
      "High-volume usage",
      "White-label reports",
      "Team access",
      "Priority support"
    ],
    cta: "Start Agency plan",
    isAgency: true
  }
];
const FREE_FEATURES = [
  "Manual work",
  "Limited leads",
  "No automation",
  "Slow follow-ups"
];
const PAID_FEATURES = [
  "Faster outreach",
  "Automated follow-ups",
  "Better conversion visibility",
  "Scheduled messages"
];
const FAQS = [
  {
    q: "Will this work for my business?",
    a: "If your customers search online or use WhatsApp, this system can help you reach them."
  },
  {
    q: "Do I need experience?",
    a: "No. The app guides you step by step."
  },
  {
    q: "Is there a contract?",
    a: "No. Cancel anytime."
  }
];
function FAQItem({ faq, index }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-xl overflow-hidden",
      "data-ocid": `pricing.faq.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((p) => !p),
            className: "w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors duration-200",
            "aria-expanded": open,
            "data-ocid": `pricing.faq.toggle.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: faq.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`
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
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 pb-4 text-sm text-muted-foreground", children: faq.a })
          }
        ) })
      ]
    }
  );
}
function PlanCard({
  plan,
  index,
  isYearly,
  isCurrentPlan,
  onCTA
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.4 },
      className: `relative flex flex-col rounded-2xl border p-6 ${plan.highlighted ? "border-primary shadow-elevated bg-card scale-[1.02] z-10" : "border-border bg-card"}`,
      "data-ocid": `pricing.plan.${index + 1}`,
      children: [
        isCurrentPlan && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 right-4 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary/15 text-primary border border-primary/30 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap", children: "Current plan" }) }),
        plan.badge && !isCurrentPlan && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-success text-success-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 whitespace-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5" }),
          plan.badge
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-1", children: plan.isFree ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-muted-foreground" }) : plan.highlighted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }) : plan.isAgency ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-warning" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: plan.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 mb-1 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-foreground tabular-nums", children: plan.isFree ? "₹0" : `₹${price.toLocaleString("en-IN")}` }),
          !plan.isFree && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/month" })
        ] }),
        isYearly && !plan.isFree && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-success font-semibold mb-3", children: [
          "Save",
          " ",
          Math.round(
            (plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice * 100
          ),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 flex-1 mt-4 mb-6", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f })
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: `w-full h-10 font-semibold ${plan.highlighted ? "btn-primary-glow" : ""} ${isCurrentPlan ? "opacity-60 cursor-default pointer-events-none" : ""}`,
            variant: isCurrentPlan ? "outline" : plan.highlighted ? "default" : "outline",
            onClick: isCurrentPlan ? void 0 : onCTA,
            disabled: isCurrentPlan,
            "data-ocid": `pricing.plan.cta.${plan.id}`,
            children: isCurrentPlan ? "Current plan" : plan.cta
          }
        )
      ]
    }
  );
}
function ROICalculator() {
  const [servicePrice, setServicePrice] = reactExports.useState(1e3);
  const [extraCustomers, setExtraCustomers] = reactExports.useState(10);
  const addedRevenue = servicePrice * extraCustomers;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-6 max-w-xl mx-auto",
      "data-ocid": "pricing.roi.calculator",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "service-price",
                className: "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide",
                children: "Your average service price (₹)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "service-price",
                type: "number",
                min: 0,
                value: servicePrice,
                onChange: (e) => setServicePrice(Math.max(0, Number(e.target.value))),
                className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary tabular-nums",
                "data-ocid": "pricing.roi.service_price.input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "extra-customers",
                className: "block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide",
                children: "Extra customers per month"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "extra-customers",
                type: "number",
                min: 0,
                value: extraCustomers,
                onChange: (e) => setExtraCustomers(Math.max(0, Number(e.target.value))),
                className: "w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary tabular-nums",
                "data-ocid": "pricing.roi.extra_customers.input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-success/10 border border-success/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Added revenue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-2xl font-bold text-success tabular-nums",
                "data-ocid": "pricing.roi.result",
                children: [
                  "₹",
                  addedRevenue.toLocaleString("en-IN")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Starter plan costs",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "₹49" }),
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Added revenue:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-success", children: [
                "₹",
                addedRevenue.toLocaleString("en-IN")
              ] }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-3", children: "Estimates based on example inputs. Actual results depend on your location, offer, and follow-up." })
      ]
    }
  );
}
function PricingPage() {
  const [isYearly, setIsYearly] = reactExports.useState(false);
  const navigate = useNavigate();
  const { data: subStatus } = useSubscriptionStatus();
  const currentPlan = (subStatus == null ? void 0 : subStatus.plan) ?? "free";
  function handlePlanCTA(plan) {
    if (plan.isFree) {
      navigate({ to: "/login" });
    } else {
      navigate({
        to: "/checkout",
        search: { plan: plan.id, yearly: isYearly ? "1" : void 0 }
      });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTags, { ...PAGE_META["/pricing"] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "pricing.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border sticky top-0 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 h-14 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground tracking-tight", children: "GrowthOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: () => navigate({ to: "/login" }),
            className: "btn-primary-glow",
            "data-ocid": "pricing.nav.start_free.button",
            children: "Start free"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-6 text-center bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "max-w-2xl mx-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-4", children: "Simple pricing. Built to get you more enquiries." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground mb-8 max-w-xl mx-auto", children: "Start free. Upgrade when you want faster results and less manual work." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-semibold ${!isYearly ? "text-foreground" : "text-muted-foreground"}`,
                  children: "Monthly"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "switch",
                  "aria-checked": isYearly,
                  onClick: () => setIsYearly((p) => !p),
                  className: `relative w-12 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${isYearly ? "bg-primary" : "bg-muted"}`,
                  "data-ocid": "pricing.billing_toggle",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-subtle transition-transform duration-200 ${isYearly ? "translate-x-6" : "translate-x-0"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-sm font-semibold ${isYearly ? "text-foreground" : "text-muted-foreground"}`,
                  children: "Yearly"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isYearly && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.8 },
                  className: "text-[11px] font-bold px-2 py-0.5 rounded-full bg-warning/15 text-warning",
                  "data-ocid": "pricing.yearly_savings_badge",
                  children: "Save 20%"
                }
              ) })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          className: "py-16 px-6 bg-background",
          "data-ocid": "pricing.plans.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start pt-4", children: PLANS.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              PlanCard,
              {
                plan,
                index: i,
                isYearly,
                isCurrentPlan: currentPlan === plan.id,
                onCTA: () => handlePlanCTA(plan)
              },
              plan.id
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: "No card required for the free plan. Cancel anytime." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Payments secured by",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#528FF0]", children: "Razorpay" })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          className: "py-16 px-6 bg-muted/30 border-y border-border",
          "data-ocid": "pricing.comparison.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground text-center mb-10", children: "What changes when you upgrade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4", children: "Free plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: FREE_FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground/50 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: f })
                ] }, f)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-primary/40 bg-card p-6 shadow-glow-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-primary mb-4", children: "Paid plans" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: PAID_FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2.5 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: f })
                ] }, f)) })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "py-16 px-6 bg-background",
          "data-ocid": "pricing.roi.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-3", children: "Even 1 new customer can cover your monthly plan." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Use the calculator below to see what a few extra bookings are worth to your business." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ROICalculator, {})
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          className: "py-16 px-6 bg-muted/30 border-y border-border",
          "data-ocid": "pricing.faq.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground text-center mb-8", children: "Common questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FAQItem, { faq, index: i }, faq.q)) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          className: "py-20 px-6 bg-card text-center border-b border-border",
          "data-ocid": "pricing.final_cta.section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "max-w-xl mx-auto",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground mb-3", children: "Start free. Upgrade when you're ready to scale." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-8", children: "Join businesses using GrowthOS to run a repeatable process for getting enquiries." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "lg",
                    className: "btn-primary-glow px-10 h-12 text-base font-semibold",
                    onClick: () => navigate({
                      to: "/checkout",
                      search: { plan: "growth" }
                    }),
                    "data-ocid": "pricing.final_cta.start_free.primary_button",
                    children: "Get started"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "No card required for the free plan" })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "py-8 px-6 bg-muted/40 text-center space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Logos shown for identification only. No official partnership is claimed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Results depend on your location, offer, and follow-up." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cancel anytime. No contracts." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ".",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : ""
              )}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:underline",
              children: "Built with love using caffeine.ai"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  PricingPage as default
};
