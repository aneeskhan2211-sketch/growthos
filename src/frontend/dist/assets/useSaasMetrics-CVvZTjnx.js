import { u as useActor, a as useQuery, e as createActor } from "./index-DcPx_5wo.js";
function formatIndian(n) {
  const s = Math.round(n).toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${formatted},${last3}`;
}
function fmtINR(n) {
  return `₹${formatIndian(n)}`;
}
function fmtLakhs(n) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)}Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)}L`;
  return fmtINR(n);
}
function buildMockMetrics() {
  return {
    mrr: 485e3,
    arr: 582e4,
    newMrr: 72e3,
    expansionMrr: 28500,
    churnedMrr: 18200,
    closingMrr: 567300,
    nrr: 106,
    totalPayingCustomers: 342,
    newCustomers: 29,
    churnedCustomers: 7,
    activeUsers: 1847,
    monthlyChurnRate: 2.1,
    revenueChurnRate: 1.8,
    monthlyGrowthRate: 8.3,
    cacByChannel: {
      googleAds: 84100,
      metaAds: 52200,
      referral: 15660,
      other: 0,
      totalSpend: 151960,
      newPaidCustomers: 29
    },
    cac: 5240,
    ltv: 18640,
    ltvCacRatio: 3.56,
    ltvCacStatus: "healthy",
    cacPaybackMonths: 3.7,
    arpu: 1418
  };
}
function computeArpu(mrr, paying) {
  return paying > 0 ? Math.round(mrr / paying) : 0;
}
function computeLtv(ltv) {
  return Number(ltv.blendedLtv);
}
function computeCac(cac) {
  return Number(cac.cac);
}
function transformMetrics(raw) {
  const mrr = Number(raw.mrr);
  const paying = Number(raw.totalPayingCustomers);
  const arpu = computeArpu(mrr, paying);
  return {
    mrr,
    arr: Number(raw.arr),
    newMrr: Number(raw.newMrr),
    expansionMrr: Number(raw.expansionMrr),
    churnedMrr: Number(raw.churnedMrr),
    closingMrr: Number(raw.closingMrr),
    nrr: raw.nrr,
    totalPayingCustomers: paying,
    newCustomers: Number(raw.newCustomers),
    churnedCustomers: Number(raw.churnedCustomers),
    activeUsers: Number(raw.activeUsers),
    monthlyChurnRate: raw.monthlyChurnRate,
    revenueChurnRate: raw.revenueChurnRate,
    monthlyGrowthRate: raw.monthlyGrowthRate,
    cacByChannel: {
      googleAds: Number(raw.cacByChannel.googleAds),
      metaAds: Number(raw.cacByChannel.metaAds),
      referral: Number(raw.cacByChannel.referral),
      other: Number(raw.cacByChannel.other),
      totalSpend: Number(raw.cacByChannel.totalSpend),
      newPaidCustomers: Number(raw.cacByChannel.newPaidCustomers)
    },
    cac: computeCac(raw.cacByChannel),
    ltv: computeLtv(raw.ltv),
    ltvCacRatio: raw.ltvCacRatio,
    ltvCacStatus: raw.ltvCacStatus,
    cacPaybackMonths: raw.cacPaybackMonths,
    arpu
  };
}
function useSaasMetrics(monthOffset) {
  const { actor, isFetching } = useActor(createActor);
  const metricsQuery = useQuery({
    queryKey: ["saasMetrics", 0],
    queryFn: async () => {
      if (!actor) return buildMockMetrics();
      try {
        const offset = monthOffset !== void 0 ? BigInt(monthOffset) : null;
        const raw = await actor.getSaasMetrics(offset);
        if (Number(raw.mrr) === 0 && Number(raw.totalPayingCustomers) === 0) {
          return buildMockMetrics();
        }
        return transformMetrics(raw);
      } catch {
        return buildMockMetrics();
      }
    },
    enabled: !isFetching,
    staleTime: 12e4
  });
  const alertsQuery = useQuery({
    queryKey: ["saasHealthAlerts"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getSaasHealthAlerts();
      } catch {
        return [];
      }
    },
    enabled: !isFetching,
    staleTime: 12e4
  });
  return {
    metrics: metricsQuery.data ?? buildMockMetrics(),
    healthAlerts: alertsQuery.data ?? [],
    isLoading: metricsQuery.isLoading,
    refetch: metricsQuery.refetch
  };
}
export {
  fmtLakhs as a,
  fmtINR as f,
  useSaasMetrics as u
};
