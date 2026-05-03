import { a$ as useNavigate, cD as useSearch, r as reactExports, j as jsxRuntimeExports, cC as ArrowLeft, y as motion, a0 as CircleCheck, h as Badge, i as Button, a6 as LoaderCircle, bx as CreditCard, cB as Lock, k as Shield, Z as Zap, n as Card, b3 as Separator } from "./index-DcPx_5wo.js";
import { a as useCheckoutConfig, b as useCreateCheckoutSession, c as useCheckoutSuccess, F as FALLBACK_PLANS } from "./useStripeCheckout-rk_8uuUQ.js";
import { R as RefreshCcw } from "./refresh-ccw-BO9h6Y22.js";
function fmtPrice(n) {
  return n.toLocaleString("en-IN");
}
function PlanSummaryCard({
  plan,
  yearly,
  onChangePlan
}) {
  const price = yearly ? plan.priceYearly : plan.priceMonthly;
  const annualTotal = price * 12;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-card border border-border rounded-2xl space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
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
          fmtPrice(annualTotal),
          " billed annually — save 20%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onChangePlan,
          className: "text-xs text-primary hover:underline font-semibold shrink-0 mt-1",
          "data-ocid": "checkout.change_plan.button",
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
  plans,
  selectedId,
  yearly,
  onSelect,
  loading
}) {
  const paid = plans.filter((p) => p.id !== "free");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", "data-ocid": "checkout.plan_picker", children: paid.map((plan) => {
    const price = yearly ? plan.priceYearly : plan.priceMonthly;
    const isSelected = plan.id === selectedId;
    const isLoading = loading === plan.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => onSelect(plan.id),
        disabled: !!loading,
        "data-ocid": `checkout.plan_option.${plan.id}`,
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
          ] }),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin text-primary absolute top-2 right-2" })
        ]
      },
      plan.id
    );
  }) });
}
function StripeCheckoutPage() {
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false });
  const urlPlan = (rawSearch == null ? void 0 : rawSearch.plan) ?? null;
  const urlYearly = (rawSearch == null ? void 0 : rawSearch.yearly) === "1";
  const { data: config } = useCheckoutConfig();
  const createSession = useCreateCheckoutSession();
  const { succeeded } = useCheckoutSuccess();
  const plans = (config == null ? void 0 : config.plans) ?? FALLBACK_PLANS;
  const paidPlans = plans.filter((p) => p.id !== "free");
  const defaultPlan = (urlPlan ? paidPlans.find((p) => p.id === urlPlan) : null) ?? paidPlans.find((p) => p.highlighted) ?? paidPlans[1];
  const [selectedPlanId, setSelectedPlanId] = reactExports.useState(
    (defaultPlan == null ? void 0 : defaultPlan.id) ?? "growth"
  );
  const [yearly, setYearly] = reactExports.useState(urlYearly);
  const [processingPlanId, setProcessingPlanId] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [showPicker, setShowPicker] = reactExports.useState(!urlPlan);
  reactExports.useEffect(() => {
    if (urlPlan) {
      setSelectedPlanId(urlPlan);
      setShowPicker(false);
    }
  }, [urlPlan]);
  const selectedPlan = reactExports.useMemo(
    () => paidPlans.find((p) => p.id === selectedPlanId) ?? paidPlans[1],
    [paidPlans, selectedPlanId]
  );
  const selectedPrice = yearly ? selectedPlan == null ? void 0 : selectedPlan.priceYearly : selectedPlan == null ? void 0 : selectedPlan.priceMonthly;
  const handlePay = async () => {
    if (!selectedPlan) return;
    setProcessingPlanId(selectedPlan.id);
    setError(null);
    try {
      const successUrl = `${window.location.origin}/?checkout_success=1`;
      const cancelUrl = `${window.location.origin}/checkout?plan=${selectedPlan.id}${yearly ? "&yearly=1" : ""}`;
      const url = await createSession.mutateAsync({
        planId: selectedPlan.id,
        successUrl,
        cancelUrl
      });
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      if (msg.includes("Actor not ready") || msg.includes("No response") || msg.includes("Could not create")) {
        navigate({ to: "/billing" });
      } else {
        setError(msg);
      }
    } finally {
      setProcessingPlanId(null);
    }
  };
  const isProcessing = !!processingPlanId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto py-6 px-4 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/pricing" }),
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150",
        "data-ocid": "checkout.back.button",
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
    succeeded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-success/10 border border-success/30",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-success shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Payment successful!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your plan has been upgraded. Enjoy the full GrowthOS experience." })
          ] })
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
          "data-ocid": "checkout.billing_toggle",
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
      yearly && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/15 text-success border-success/20 text-[10px] font-bold", children: "Save 20%" })
    ] }),
    showPicker && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Select a plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SmallPlanPicker,
        {
          plans,
          selectedId: selectedPlanId,
          yearly,
          onSelect: (id) => {
            setSelectedPlanId(id);
            setShowPicker(false);
          },
          loading: processingPlanId
        }
      )
    ] }),
    selectedPlan && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PlanSummaryCard,
      {
        plan: selectedPlan,
        yearly,
        onChangePlan: () => setShowPicker((v) => !v)
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive",
        "data-ocid": "checkout.error_state",
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
        disabled: isProcessing || !selectedPlan,
        onClick: handlePay,
        "data-ocid": "checkout.pay.primary_button",
        children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          "Redirecting to Stripe…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
          "Pay ₹",
          fmtPrice(selectedPrice ?? 0),
          "/month"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-success" }),
        "Secured by Stripe"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-3.5 h-3.5 text-primary" }),
        "Cancel anytime"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary" }),
        "₹ Indian Rupees"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-warning" }),
        "Instant activation"
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
  StripeCheckoutPage as default
};
