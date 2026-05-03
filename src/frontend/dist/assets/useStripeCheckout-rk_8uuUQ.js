import { u as useActor, a as useQuery, d as useMutation, b as useQueryClient, r as reactExports, m as ue, e as createActor } from "./index-DcPx_5wo.js";
const FALLBACK_PLANS = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["10 leads/day", "Manual outreach", "Basic tracking"],
    highlighted: false
  },
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 49,
    priceYearly: 470,
    features: ["50 leads/day", "Message templates", "Basic follow-ups"],
    highlighted: false
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 299,
    priceYearly: 2870,
    features: [
      "150 leads/day",
      "Auto follow-ups",
      "CRM pipeline",
      "Simple reports"
    ],
    highlighted: true
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 999,
    priceYearly: 9590,
    features: [
      "500 leads/day",
      "Proposal generator",
      "Campaign tools",
      "Advanced tracking"
    ],
    highlighted: false
  },
  {
    id: "agency",
    name: "Agency",
    priceMonthly: 4999,
    priceYearly: 47990,
    features: [
      "White-label reports",
      "Team access",
      "High-volume usage",
      "Priority support"
    ],
    highlighted: false
  }
];
function useCheckoutConfig() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["checkoutConfig"],
    queryFn: async () => {
      var _a, _b;
      if (!actor) return { publishableKey: "", plans: FALLBACK_PLANS };
      try {
        const raw = await ((_a = actor.getCheckoutConfig) == null ? void 0 : _a.call(actor));
        if (!raw) return { publishableKey: "", plans: FALLBACK_PLANS };
        const mappedPlans = ((_b = raw.plans) == null ? void 0 : _b.length) ? raw.plans.map((sp) => {
          const fallback = FALLBACK_PLANS.find((fp) => fp.id === sp.id) ?? FALLBACK_PLANS[2];
          return {
            id: sp.id,
            name: sp.name,
            priceMonthly: fallback.priceMonthly,
            priceYearly: fallback.priceYearly,
            features: fallback.features,
            highlighted: fallback.highlighted,
            stripePriceIdMonthly: sp.interval === "month" ? sp.id : void 0,
            stripePriceIdYearly: sp.interval === "year" ? sp.id : void 0
          };
        }) : FALLBACK_PLANS;
        return {
          publishableKey: raw.publishableKey,
          plans: mappedPlans
        };
      } catch {
        return { publishableKey: "", plans: FALLBACK_PLANS };
      }
    },
    enabled: !isFetching,
    staleTime: 3e5
  });
}
function useCreateCheckoutSession() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      planId,
      successUrl,
      cancelUrl
    }) => {
      var _a;
      if (!actor) throw new Error("Actor not ready");
      const result = await ((_a = actor.createCheckoutSession) == null ? void 0 : _a.call(
        actor,
        planId,
        successUrl,
        cancelUrl
      ));
      if (!result) throw new Error("No response from backend");
      if (typeof result === "object" && "ok" in result) {
        const ok = result.ok;
        return ok.url;
      }
      if (typeof result === "object" && "err" in result) {
        throw new Error(String(result.err));
      }
      if (typeof result === "string") return result;
      throw new Error("Could not create checkout session");
    }
  });
}
function useSubscriptionStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["subscriptionStatus"],
    queryFn: async () => {
      if (!actor)
        return { plan: "free", status: "inactive", cancelAtPeriodEnd: false };
      try {
        const sub = await actor.getMySubscription();
        if (!sub)
          return { plan: "free", status: "inactive", cancelAtPeriodEnd: false };
        return {
          plan: String(sub.plan),
          status: String(
            sub.subscriptionStatus
          ),
          cancelAtPeriodEnd: false
        };
      } catch {
        return { plan: "free", status: "inactive", cancelAtPeriodEnd: false };
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useCheckoutSuccess() {
  const queryClient = useQueryClient();
  const [succeeded, setSucceeded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isSuccess = params.get("checkout_success") === "1" || params.get("success") === "1";
    if (!isSuccess) return;
    setSucceeded(true);
    ue.success("Payment successful! Your plan has been upgraded.", {
      description: "Welcome to your new plan. Enjoy the full GrowthOS experience.",
      duration: 6e3
    });
    void queryClient.invalidateQueries({ queryKey: ["subscriptionStatus"] });
    void queryClient.invalidateQueries({ queryKey: ["checkoutConfig"] });
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, "", cleanUrl);
  }, [queryClient]);
  return { succeeded };
}
export {
  FALLBACK_PLANS as F,
  useCheckoutConfig as a,
  useCreateCheckoutSession as b,
  useCheckoutSuccess as c,
  useSubscriptionStatus as u
};
