import { u as useActor, a as useQuery, b as useQueryClient, d as useMutation, e as createActor } from "./index-DcPx_5wo.js";
function mapRaw(c) {
  return {
    id: String(c.id),
    title: String(c.title ?? ""),
    clientName: String(c.clientName ?? ""),
    niche: String(c.niche ?? ""),
    city: String(c.city ?? ""),
    challenge: String(c.challenge ?? ""),
    solution: String(c.solution ?? ""),
    actionsTaken: Array.isArray(c.actionsTaken) ? c.actionsTaken : [],
    results: Array.isArray(c.results) ? c.results : [],
    metrics: Array.isArray(c.metrics) ? c.metrics : [],
    beforeMetric: String(c.beforeMetric ?? ""),
    afterMetric: String(c.afterMetric ?? ""),
    testimonial: c.testimonial ? String(c.testimonial) : void 0,
    published: Boolean(c.published),
    shareToken: c.shareToken ? String(c.shareToken) : void 0,
    createdAt: Number(c.createdAt),
    updatedAt: Number(c.updatedAt)
  };
}
function generateShareUrl(shareToken) {
  return `${window.location.origin}/case-studies/${shareToken}`;
}
const MOCK_CASE_STUDIES = [
  {
    id: "1",
    title: "Salon Mumbai: From Irregular Walk-ins to Daily Enquiries",
    clientName: "Glamour Studio",
    niche: "Salon",
    city: "Mumbai",
    challenge: "Irregular walk-in traffic with no consistent digital presence or follow-up system.",
    solution: "Implemented local SEO, Google Business Profile optimization, and daily follow-up workflows.",
    actionsTaken: [
      "Set up Google Business Profile with photos and hours",
      "Started posting daily Instagram reels with before/after transformations",
      "Launched WhatsApp follow-up sequence for enquiries"
    ],
    metrics: [
      { label: "Monthly Enquiries", before: "8", after: "52" },
      { label: "Bookings", before: "5", after: "38" },
      { label: "Monthly Revenue", before: "₹45k", after: "₹1.8L" }
    ],
    results: [
      { label: "Monthly Leads", value: "+280%", positive: true },
      { label: "Bookings", value: "+65", positive: true },
      { label: "Revenue Increase", value: "₹1.2L/mo", positive: true }
    ],
    beforeMetric: "8–12 enquiries/month",
    afterMetric: "45–60 enquiries/month",
    testimonial: "GrowthOS transformed how we get clients. We now have a predictable pipeline every month.",
    published: true,
    shareToken: "salon-mumbai-growth",
    createdAt: Date.now() - 7776e6,
    updatedAt: Date.now() - 6048e5
  },
  {
    id: "2",
    title: "Gym Pune: Steady Trial Sign-ups Through Local Campaigns",
    clientName: "FitZone Pune",
    niche: "Gym",
    city: "Pune",
    challenge: "Low trial sign-ups with no structured outreach process.",
    solution: "Local WhatsApp outreach campaigns, offer builder, and follow-up reminders.",
    actionsTaken: [
      "Created local Google Ads targeting 5km radius",
      "Built WhatsApp broadcast list of 200 local contacts",
      "Launched 7-day free trial offer with urgency deadline"
    ],
    metrics: [
      { label: "Trial Sign-ups", before: "10", after: "28" },
      { label: "Conversion Rate", before: "18%", after: "34%" },
      { label: "Monthly Revenue", before: "₹1.2L", after: "₹2.05L" }
    ],
    results: [
      { label: "Trial Sign-ups", value: "+120%", positive: true },
      { label: "Conversion Rate", value: "34%", positive: true },
      { label: "Monthly Revenue", value: "+₹85k", positive: true }
    ],
    beforeMetric: "10 trials/month",
    afterMetric: "28 trials/month",
    published: true,
    shareToken: "gym-pune-growth",
    createdAt: Date.now() - 5184e6,
    updatedAt: Date.now() - 432e6
  }
];
function useCaseStudies() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["caseStudies"],
    queryFn: async () => {
      var _a;
      if (!actor) return MOCK_CASE_STUDIES;
      try {
        const raw = await ((_a = actor.listCaseStudies) == null ? void 0 : _a.call(actor));
        if (!(raw == null ? void 0 : raw.length)) return MOCK_CASE_STUDIES;
        return raw.map(mapRaw);
      } catch {
        return MOCK_CASE_STUDIES;
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function usePublicCaseStudy(shareToken) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["publicCaseStudy", shareToken],
    queryFn: async () => {
      var _a;
      if (actor) {
        try {
          const raw = await ((_a = actor.getPublicCaseStudy) == null ? void 0 : _a.call(actor, shareToken));
          if (raw) return mapRaw(raw);
        } catch {
        }
      }
      return MOCK_CASE_STUDIES.find((c) => c.shareToken === shareToken) ?? null;
    },
    enabled: !isFetching,
    staleTime: 3e5
  });
}
function useCreateCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      var _a;
      if (!actor) {
        return { id: String(Date.now()), ...input };
      }
      const result = await ((_a = actor.createCaseStudy) == null ? void 0 : _a.call(
        actor,
        input,
        input,
        input,
        input,
        input,
        input,
        input
      ));
      if (!result) throw new Error("Failed to create case study");
      return result;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] })
  });
}
function useUpdateCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      var _a;
      if (!actor) return input;
      const result = await ((_a = actor.updateCaseStudy) == null ? void 0 : _a.call(
        actor,
        input.id,
        input
      ));
      return result ?? input;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] })
  });
}
function usePublishCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      var _a;
      if (!actor) return;
      await ((_a = actor.publishCaseStudy) == null ? void 0 : _a.call(actor, id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] })
  });
}
function useDeleteCaseStudy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      var _a;
      if (!actor) return;
      await ((_a = actor.deleteCaseStudy) == null ? void 0 : _a.call(actor, id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["caseStudies"] })
  });
}
export {
  useCreateCaseStudy as a,
  useUpdateCaseStudy as b,
  usePublishCaseStudy as c,
  useDeleteCaseStudy as d,
  usePublicCaseStudy as e,
  generateShareUrl as g,
  useCaseStudies as u
};
