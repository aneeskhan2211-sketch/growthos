/**
 * useInvestorReport.ts
 * Investor report generation and retrieval hooks.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { fmtINR, fmtLakhs } from "./useSaasMetrics";
// Re-export helpers so page can import from one place
export { fmtINR, fmtLakhs };

export interface InvestorReportSection {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  description: string;
}

export interface CohortRow {
  label: string;
  d1: number;
  d7: number;
  d30: number;
}

export interface FunnelStepRow {
  name: string;
  count: number;
  pct: number;
}

export interface InvestorReport {
  id: string;
  generatedAt: number;
  periodLabel: string;
  mrr: number;
  arr: number;
  nrr: number;
  churnRate: number;
  ltv: number;
  cac: number;
  ltvCacRatio: number;
  activeUsers: number;
  payingCustomers: number;
  monthlyGrowthRate: number;
  sections: InvestorReportSection[];
  highlights: string[];
  risks: string[];
  nextSteps: string[];
  healthScore: "healthy" | "watch" | "critical";
  cohortData: CohortRow[];
  funnelData: FunnelStepRow[];
}

const MOCK_REPORT: InvestorReport = {
  id: "1",
  generatedAt: Date.now(),
  periodLabel: new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  }),
  mrr: 485_000,
  arr: 5_820_000,
  nrr: 106,
  churnRate: 2.1,
  ltv: 18_640,
  cac: 5_240,
  ltvCacRatio: 3.56,
  activeUsers: 1_847,
  payingCustomers: 342,
  monthlyGrowthRate: 8.3,
  cohortData: [],
  funnelData: [],
  sections: [
    {
      title: "MRR",
      value: "₹4,85,000",
      change: "+8.3%",
      positive: true,
      description: "Monthly Recurring Revenue from active subscriptions.",
    },
    {
      title: "Net Revenue Retention",
      value: "106%",
      change: "+2pp",
      positive: true,
      description: "NRR above 100% means expansion revenue exceeds churn.",
    },
    {
      title: "LTV:CAC",
      value: "3.56x",
      change: "+0.2x",
      positive: true,
      description:
        "Healthy ratio — every ₹1 spent on acquisition returns ₹3.56.",
    },
    {
      title: "Churn Rate",
      value: "2.1%",
      change: "-0.3pp",
      positive: true,
      description: "Monthly revenue churn — below 3% is SaaS benchmark.",
    },
  ],
  highlights: [
    "MRR grew 8.3% month-over-month, above the 5% SaaS growth benchmark.",
    "NRR of 106% indicates strong expansion revenue from plan upgrades.",
    "LTV:CAC ratio of 3.56x is within the healthy 3–5x range.",
  ],
  risks: [
    "CAC payback period of 3.7 months could increase if ad costs rise.",
    "Free plan conversion rate below 10% — onboarding improvements needed.",
  ],
  nextSteps: [
    "Improve free-to-paid onboarding to increase conversion above 15%.",
    "Focus expansion revenue by upselling Growth users to Pro plan.",
    "Add annual billing option to reduce churn and improve cash flow.",
  ],
  healthScore: "healthy",
};

function parseCohortData(raw: Array<string>): CohortRow[] {
  return raw.flatMap((s) => {
    try {
      const parsed = JSON.parse(s) as unknown;
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "label" in parsed &&
        "d1" in parsed &&
        "d7" in parsed &&
        "d30" in parsed
      ) {
        return [parsed as CohortRow];
      }
      return [];
    } catch {
      return [];
    }
  });
}

function parseFunnelData(raw: Array<string>): FunnelStepRow[] {
  return raw.flatMap((s) => {
    try {
      const parsed = JSON.parse(s) as unknown;
      if (
        typeof parsed === "object" &&
        parsed !== null &&
        "name" in parsed &&
        "count" in parsed &&
        "pct" in parsed
      ) {
        return [parsed as FunnelStepRow];
      }
      return [];
    } catch {
      return [];
    }
  });
}

export function useLatestInvestorReport() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<InvestorReport | null>({
    queryKey: ["investorReport", "latest"],
    queryFn: async () => {
      if (!actor) return MOCK_REPORT;
      try {
        const raw = (await actor.getLatestReport?.()) as
          | Record<string, unknown>
          | null
          | undefined;
        if (!raw) return MOCK_REPORT;
        return {
          ...MOCK_REPORT,
          ...raw,
          mrr:
            typeof raw.mrr === "bigint"
              ? Number(raw.mrr)
              : ((raw.mrr as number) ?? MOCK_REPORT.mrr),
          arr:
            typeof raw.arr === "bigint"
              ? Number(raw.arr)
              : ((raw.arr as number) ?? MOCK_REPORT.arr),
          ltv:
            typeof raw.ltv === "bigint"
              ? Number(raw.ltv)
              : ((raw.ltv as number) ?? MOCK_REPORT.ltv),
          cac:
            typeof raw.cac === "bigint"
              ? Number(raw.cac)
              : ((raw.cac as number) ?? MOCK_REPORT.cac),
          payingCustomers:
            typeof raw.payingCustomers === "bigint"
              ? Number(raw.payingCustomers)
              : ((raw.payingCustomers as number) ??
                MOCK_REPORT.payingCustomers),
          cohortData: parseCohortData((raw.cohortData as Array<string>) ?? []),
          funnelData: parseFunnelData((raw.funnelData as Array<string>) ?? []),
        } as InvestorReport;
      } catch {
        return MOCK_REPORT;
      }
    },
    enabled: !isFetching,
    staleTime: 300_000,
  });
}

export function useGenerateInvestorReport() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return MOCK_REPORT;
      try {
        const raw = (await actor.generateInvestorReport?.()) as
          | Record<string, unknown>
          | null
          | undefined;
        if (!raw) return MOCK_REPORT;
        return {
          ...MOCK_REPORT,
          ...raw,
          mrr:
            typeof raw.mrr === "bigint"
              ? Number(raw.mrr)
              : ((raw.mrr as number) ?? MOCK_REPORT.mrr),
          arr:
            typeof raw.arr === "bigint"
              ? Number(raw.arr)
              : ((raw.arr as number) ?? MOCK_REPORT.arr),
          ltv:
            typeof raw.ltv === "bigint"
              ? Number(raw.ltv)
              : ((raw.ltv as number) ?? MOCK_REPORT.ltv),
          cac:
            typeof raw.cac === "bigint"
              ? Number(raw.cac)
              : ((raw.cac as number) ?? MOCK_REPORT.cac),
          payingCustomers:
            typeof raw.payingCustomers === "bigint"
              ? Number(raw.payingCustomers)
              : ((raw.payingCustomers as number) ??
                MOCK_REPORT.payingCustomers),
          cohortData: parseCohortData((raw.cohortData as Array<string>) ?? []),
          funnelData: parseFunnelData((raw.funnelData as Array<string>) ?? []),
        } as InvestorReport;
      } catch {
        return MOCK_REPORT;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["investorReport"] }),
  });
}
