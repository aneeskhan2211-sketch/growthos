import { u as useActor, b as useQueryClient, a$ as useNavigate, r as reactExports, m as ue, e as createActor, cD as useSearch, j as jsxRuntimeExports, cC as ArrowLeft, y as motion, h as Badge, i as Button, a6 as LoaderCircle, Z as Zap, k as Shield, a0 as CircleCheck, n as Card, ab as Sparkles, bw as Crown, G as Star, b3 as Separator, cB as Lock } from "./index-DcPx_5wo.js";
import { R as RefreshCcw } from "./refresh-ccw-BO9h6Y22.js";
const RAZORPAY_PLANS = [
  {
    id: "free",
    name: "Free",
    amountPaise: 0,
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ["10 leads/day", "Manual outreach", "Basic tracking"]
  },
  {
    id: "rzp_starter",
    name: "Starter",
    amountPaise: 4900,
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: ["50 leads/day", "Message templates", "Basic follow-ups"]
  },
  {
    id: "rzp_growth",
    name: "Growth",
    amountPaise: 29900,
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: [
      "150 leads/day",
      "Auto follow-ups",
      "CRM pipeline",
      "Simple reports"
    ],
    highlighted: true
  },
  {
    id: "rzp_pro",
    name: "Pro",
    amountPaise: 99900,
    monthlyPrice: 999,
    yearlyPrice: 9990,
    features: [
      "500 leads/day",
      "Proposal generator",
      "Campaign tools",
      "Advanced tracking"
    ]
  },
  {
    id: "rzp_agency",
    name: "Agency",
    amountPaise: 499900,
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    features: [
      "High-volume usage",
      "White-label reports",
      "Team access",
      "Priority support"
    ]
  }
];
function loadRazorpaySDK() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}
function callActorMethod(actor, method, ...args) {
  const fn = actor[method];
  if (typeof fn === "function") {
    return fn(...args);
  }
  return void 0;
}
function useRazorpayCheckout() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const initiatePayment = reactExports.useCallback(
    async (planId) => {
      const plan = RAZORPAY_PLANS.find((p) => p.id === planId);
      if (!plan) {
        setError("Invalid plan selected");
        return;
      }
      if (plan.amountPaise === 0) {
        ue.success("You are on the Free plan.");
        void navigate({ to: "/" });
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        await loadRazorpaySDK();
        const configResult = await callActorMethod(actor, "getRazorpayConfig");
        let keyId = "rzp_test_REPLACE_KEY_ID";
        if (configResult && typeof configResult === "object" && "ok" in configResult && configResult.ok && typeof configResult.ok === "object" && "keyId" in configResult.ok) {
          keyId = String(configResult.ok.keyId);
        }
        const orderResult = await callActorMethod(
          actor,
          "createRazorpayOrder",
          planId
        );
        let orderId = "order_test_123";
        let orderAmount = plan.amountPaise;
        if (orderResult && typeof orderResult === "object" && "__kind__" in orderResult && orderResult.__kind__ === "ok" && "ok" in orderResult && orderResult.ok && typeof orderResult.ok === "object" && "orderId" in orderResult.ok) {
          const ok = orderResult.ok;
          orderId = ok.orderId;
          orderAmount = Number(ok.amount);
        }
        if (!window.Razorpay) {
          throw new Error("Razorpay SDK not loaded");
        }
        await new Promise((resolve, reject) => {
          const rzp = new window.Razorpay({
            key: keyId,
            amount: orderAmount,
            currency: "INR",
            name: "GrowthOS",
            description: `${plan.name} Plan`,
            order_id: orderId,
            prefill: { contact: "" },
            theme: { color: "#6366f1" },
            handler: (response) => {
              void (async () => {
                try {
                  await callActorMethod(
                    actor,
                    "verifyRazorpayPayment",
                    response.razorpay_payment_id,
                    response.razorpay_order_id,
                    response.razorpay_signature,
                    planId
                  );
                } catch {
                }
                ue.success(`Plan activated! Welcome to ${plan.name}.`, {
                  description: "You now have access to all features of your new plan.",
                  duration: 6e3
                });
                void queryClient.invalidateQueries({
                  queryKey: ["subscriptionStatus"]
                });
                void queryClient.invalidateQueries({
                  queryKey: ["checkoutConfig"]
                });
                void navigate({ to: "/" });
                resolve();
              })();
            },
            modal: {
              ondismiss: () => {
                reject(new Error("Payment cancelled"));
              }
            }
          });
          rzp.open();
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Payment failed";
        if (msg !== "Payment cancelled") {
          setError(msg);
          ue.error("Payment failed", { description: msg });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [actor, navigate, queryClient]
  );
  return { initiatePayment, isLoading, error };
}
function fmtPrice(n) {
  return n.toLocaleString("en-IN");
}
function RazorpayBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-[#528FF0]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secured by" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#528FF0]", children: "Razorpay" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "·" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "UPI, Cards, Net Banking, Wallets" })
  ] });
}
function PlanSummaryCard({
  planId,
  yearly,
  onChangePlan
}) {
  const plan = RAZORPAY_PLANS.find((p) => p.id === planId);
  if (!plan || plan.id === "free") return null;
  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border border-border rounded-2xl space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: plan.highlighted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-primary" }) : plan.name === "Agency" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 text-warning" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display font-bold text-foreground", children: [
            plan.name,
            " Plan"
          ] }),
          plan.highlighted && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border-primary/30 text-[10px] font-bold", children: "Most Popular" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-bold text-foreground tabular-nums", children: [
            "₹",
            fmtPrice(price)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/month" })
        ] }),
        yearly && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-success mt-0.5 font-medium", children: [
          "₹",
          fmtPrice(price * 12),
          " billed annually — save 10%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onChangePlan,
          className: "text-xs text-primary hover:underline font-semibold shrink-0 mt-1",
          "data-ocid": "rzp_checkout.change_plan.button",
          children: "Change"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center gap-2 text-sm text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success shrink-0" }),
          f
        ]
      },
      f
    )) })
  ] });
}
function SmallPlanPicker({
  selectedId,
  yearly,
  onSelect
}) {
  const paid = RAZORPAY_PLANS.filter((p) => p.id !== "free");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-2 gap-3",
      "data-ocid": "rzp_checkout.plan_picker",
      children: paid.map((plan) => {
        const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
        const isSelected = plan.id === selectedId;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onSelect(plan.id),
            "data-ocid": `rzp_checkout.plan_option.${plan.id}`,
            className: [
              "relative flex flex-col gap-1 rounded-xl border p-4 text-left transition-smooth cursor-pointer",
              isSelected ? "border-primary bg-primary/5 shadow-glow-primary" : "border-border hover:border-primary/40 bg-card"
            ].join(" "),
            children: [
              plan.highlighted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2.5 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground", children: "Popular" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: plan.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground tabular-nums", children: [
                "₹",
                fmtPrice(price),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "/mo" })
              ] })
            ]
          },
          plan.id
        );
      })
    }
  );
}
function RazorpayCheckoutPage() {
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false });
  const urlPlan = (rawSearch == null ? void 0 : rawSearch.plan) ?? null;
  const urlYearly = (rawSearch == null ? void 0 : rawSearch.yearly) === "1";
  const defaultPlan = (urlPlan ? RAZORPAY_PLANS.find((p) => p.id === urlPlan) : null) ?? RAZORPAY_PLANS.find((p) => p.highlighted) ?? RAZORPAY_PLANS[2];
  const [selectedPlanId, setSelectedPlanId] = reactExports.useState(
    (defaultPlan == null ? void 0 : defaultPlan.id) ?? "rzp_growth"
  );
  const [yearly, setYearly] = reactExports.useState(urlYearly);
  const [showPicker, setShowPicker] = reactExports.useState(!urlPlan);
  const { initiatePayment, isLoading, error } = useRazorpayCheckout();
  const selectedPlan = reactExports.useMemo(
    () => RAZORPAY_PLANS.find((p) => p.id === selectedPlanId) ?? RAZORPAY_PLANS[2],
    [selectedPlanId]
  );
  const displayPrice = yearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
  const handlePay = async () => {
    await initiatePayment(selectedPlanId);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto py-6 px-4 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/pricing" }),
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150",
        "data-ocid": "rzp_checkout.back.button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to pricing"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Complete your upgrade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You're one step away from more leads, faster follow-ups, and better results." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `font-semibold ${!yearly ? "text-foreground" : "text-muted-foreground"}`,
          children: "Monthly"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          role: "switch",
          "aria-checked": yearly,
          onClick: () => setYearly((v) => !v),
          className: `relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${yearly ? "bg-primary" : "bg-muted"}`,
          "data-ocid": "rzp_checkout.billing_toggle",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-subtle transition-transform duration-200 ${yearly ? "translate-x-5" : "translate-x-0"}`
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `font-semibold ${yearly ? "text-foreground" : "text-muted-foreground"}`,
          children: "Yearly"
        }
      ),
      yearly && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/15 text-success border-success/20 text-[10px] font-bold", children: "Save 10%" })
    ] }),
    showPicker && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Select a plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SmallPlanPicker,
        {
          selectedId: selectedPlanId,
          yearly,
          onSelect: (id) => {
            setSelectedPlanId(id);
            setShowPicker(false);
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PlanSummaryCard,
      {
        planId: selectedPlanId,
        yearly,
        onChangePlan: () => setShowPicker((v) => !v)
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive",
        "data-ocid": "rzp_checkout.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-4 h-4 shrink-0 mt-0.5" }),
          error
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        className: "w-full h-12 text-base font-bold btn-primary-glow",
        disabled: isLoading || selectedPlan.id === "free",
        onClick: handlePay,
        "data-ocid": "rzp_checkout.pay.primary_button",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          "Opening payment window…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
          "Pay ₹",
          fmtPrice(displayPrice),
          " with Razorpay"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RazorpayBadge, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-3.5 h-3.5 text-primary" }),
          "Cancel anytime"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary" }),
          "Data privacy compliant"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }),
          "Instant activation"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-muted/30 border-border rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Even 1 new customer can cover your monthly plan." }),
      " ",
      "If your service is ₹1,000 and you get 10 extra customers, that's",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-success", children: "₹10,000 added revenue" }),
      " ",
      "in a single month."
    ] }) })
  ] });
}
export {
  RazorpayCheckoutPage as default
};
