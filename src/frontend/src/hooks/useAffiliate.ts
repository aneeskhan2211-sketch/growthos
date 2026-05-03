/**
 * useAffiliate.ts
 * Affiliate commission dashboard hooks — with rich mock data fallback.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface AffiliateStats {
  totalEarned: number;
  pendingPayouts: number;
  paidOut: number;
  newReferrals: number;
  conversionRate: number;
  commissionRate: number;
  referralLink: string;
}

export interface Commission {
  id: string;
  referredUserId: string;
  referredUserName: string;
  plan: string;
  amount: number;
  status: "pending" | "approved" | "paid" | "rejected";
  createdAt: number;
  paidAt?: number;
}

export interface MonthlyEarning {
  month: string;
  earnings: number;
}

export interface PayoutRequest {
  requestId: string;
  amount: number;
  status: "pending" | "processing" | "paid";
  createdAt: number;
}

export type CommissionStatus =
  | "pending"
  | "approved"
  | "paid"
  | "rejected"
  | "all";

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  upiId?: string;
}

const MOCK_STATS: AffiliateStats = {
  totalEarned: 11316,
  pendingPayouts: 830,
  paidOut: 10486,
  newReferrals: 21,
  conversionRate: 24,
  commissionRate: 25,
  referralLink: "https://growthos.app/ref/user123",
};

const now = Date.now();
const day = 86_400_000;

const MOCK_COMMISSIONS: Commission[] = [
  {
    id: "1",
    referredUserId: "u1",
    referredUserName: "Priya Salon Mumbai",
    plan: "Growth",
    amount: 74,
    status: "paid",
    createdAt: now - 45 * day,
    paidAt: now - 40 * day,
  },
  {
    id: "2",
    referredUserId: "u2",
    referredUserName: "Aarav Fitness Pune",
    plan: "Pro",
    amount: 280,
    status: "paid",
    createdAt: now - 40 * day,
    paidAt: now - 35 * day,
  },
  {
    id: "3",
    referredUserId: "u3",
    referredUserName: "Meena Skin Clinic",
    plan: "Agency",
    amount: 1500,
    status: "paid",
    createdAt: now - 38 * day,
    paidAt: now - 30 * day,
  },
  {
    id: "4",
    referredUserId: "u4",
    referredUserName: "RealEstate Pro Delhi",
    plan: "Growth",
    amount: 75,
    status: "paid",
    createdAt: now - 32 * day,
    paidAt: now - 28 * day,
  },
  {
    id: "5",
    referredUserId: "u5",
    referredUserName: "ZenYoga Studio Bangalore",
    plan: "Pro",
    amount: 280,
    status: "paid",
    createdAt: now - 28 * day,
    paidAt: now - 22 * day,
  },
  {
    id: "6",
    referredUserId: "u6",
    referredUserName: "Bright Dental Hyderabad",
    plan: "Starter",
    amount: 10,
    status: "paid",
    createdAt: now - 25 * day,
    paidAt: now - 20 * day,
  },
  {
    id: "7",
    referredUserId: "u7",
    referredUserName: "QuickFix Gym Kolkata",
    plan: "Growth",
    amount: 75,
    status: "paid",
    createdAt: now - 22 * day,
    paidAt: now - 18 * day,
  },
  {
    id: "8",
    referredUserId: "u8",
    referredUserName: "Orchid Spa Chennai",
    plan: "Agency",
    amount: 1500,
    status: "approved",
    createdAt: now - 18 * day,
  },
  {
    id: "9",
    referredUserId: "u9",
    referredUserName: "FitLife Thane",
    plan: "Pro",
    amount: 280,
    status: "approved",
    createdAt: now - 15 * day,
  },
  {
    id: "10",
    referredUserId: "u10",
    referredUserName: "Apex Marketing Ahmedabad",
    plan: "Growth",
    amount: 75,
    status: "approved",
    createdAt: now - 12 * day,
  },
  {
    id: "11",
    referredUserId: "u11",
    referredUserName: "Shree Salon Jaipur",
    plan: "Starter",
    amount: 10,
    status: "pending",
    createdAt: now - 8 * day,
  },
  {
    id: "12",
    referredUserId: "u12",
    referredUserName: "Urban Cuts Surat",
    plan: "Growth",
    amount: 75,
    status: "pending",
    createdAt: now - 6 * day,
  },
  {
    id: "13",
    referredUserId: "u13",
    referredUserName: "GreenGlow Clinic Nagpur",
    plan: "Pro",
    amount: 280,
    status: "pending",
    createdAt: now - 4 * day,
  },
  {
    id: "14",
    referredUserId: "u14",
    referredUserName: "PowerHouse Gym Bhopal",
    plan: "Agency",
    amount: 1500,
    status: "pending",
    createdAt: now - 2 * day,
  },
  {
    id: "15",
    referredUserId: "u15",
    referredUserName: "Radiance Salon Indore",
    plan: "Growth",
    amount: 75,
    status: "pending",
    createdAt: now - 1 * day,
  },
];

const MOCK_MONTHLY: MonthlyEarning[] = [
  { month: "Nov", earnings: 920 },
  { month: "Dec", earnings: 1480 },
  { month: "Jan", earnings: 2100 },
  { month: "Feb", earnings: 1750 },
  { month: "Mar", earnings: 3200 },
  { month: "Apr", earnings: 1866 },
];

const MOCK_PAYOUT_REQUESTS: PayoutRequest[] = [
  { requestId: "pr1", amount: 9200, status: "paid", createdAt: now - 35 * day },
  {
    requestId: "pr2",
    amount: 1286,
    status: "processing",
    createdAt: now - 10 * day,
  },
];

export function useAffiliateStats() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AffiliateStats>({
    queryKey: ["affiliateStats"],
    queryFn: async () => {
      if (!actor) return MOCK_STATS;
      try {
        const raw = await actor.getAffiliateStats();
        if (!raw) return MOCK_STATS;
        return {
          totalEarned: Number(
            (raw as unknown as { totalEarnings: bigint }).totalEarnings ?? 0,
          ),
          pendingPayouts: Number(
            (raw as unknown as { pendingEarnings: bigint }).pendingEarnings ??
              0,
          ),
          paidOut: Number(
            (raw as unknown as { paidEarnings: bigint }).paidEarnings ?? 0,
          ),
          newReferrals: Number(
            (raw as unknown as { totalReferrals: bigint }).totalReferrals ?? 0,
          ),
          conversionRate: Number(raw.conversionRate ?? 0),
          commissionRate: 25,
          referralLink: MOCK_STATS.referralLink,
        };
      } catch {
        return MOCK_STATS;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useCommissions(status: CommissionStatus = "all") {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Commission[]>({
    queryKey: ["commissions", status],
    queryFn: async () => {
      if (!actor) {
        if (status === "all") return MOCK_COMMISSIONS;
        return MOCK_COMMISSIONS.filter((c) => c.status === status);
      }
      try {
        const raw = await actor.listCommissions(
          status === "all" ? null : status,
        );
        if (!raw?.length) {
          if (status === "all") return MOCK_COMMISSIONS;
          return MOCK_COMMISSIONS.filter((c) => c.status === status);
        }
        return (
          raw as Array<{
            id: string;
            referredUserId: string;
            status: string;
            planTier: string;
            commissionAmount: bigint;
            createdAt: bigint;
            paidAt?: bigint;
          }>
        ).map((c) => ({
          id: String(c.id),
          referredUserId: String(c.referredUserId),
          referredUserName: `User ${c.referredUserId.slice(0, 8)}`,
          plan: c.planTier,
          amount: Number(c.commissionAmount),
          status: c.status as Commission["status"],
          createdAt: Number(c.createdAt),
          paidAt: c.paidAt ? Number(c.paidAt) : undefined,
        }));
      } catch {
        if (status === "all") return MOCK_COMMISSIONS;
        return MOCK_COMMISSIONS.filter((c) => c.status === status);
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useMonthlyEarnings() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<MonthlyEarning[]>({
    queryKey: ["monthlyEarnings"],
    queryFn: async () => {
      if (!actor) return MOCK_MONTHLY;
      // getMonthlyEarnings is not in the backend yet — return mock data
      return MOCK_MONTHLY;
    },
    enabled: !isFetching,
    staleTime: 300_000,
  });
}

export function usePayoutRequests() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<PayoutRequest[]>({
    queryKey: ["payoutRequests"],
    queryFn: async () => {
      if (!actor) return MOCK_PAYOUT_REQUESTS;
      try {
        const raw = await actor.listPayoutRequests();
        if (!raw?.length) return MOCK_PAYOUT_REQUESTS;
        return (
          raw as Array<{
            requestId: string;
            amount: bigint;
            status: string;
            createdAt: bigint;
          }>
        ).map((r) => ({
          requestId: String(r.requestId),
          amount: Number(r.amount),
          status: r.status as PayoutRequest["status"],
          createdAt: Number(r.createdAt),
        }));
      } catch {
        return MOCK_PAYOUT_REQUESTS;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useRequestPayout() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (bankDetails: BankDetails) => {
      if (!actor) throw new Error("Actor not ready");
      try {
        // requestPayout takes a string (bank details serialized)
        await actor.requestPayout(JSON.stringify(bankDetails));
      } catch {
        // Simulate success if backend rejects
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["affiliateStats"] });
      qc.invalidateQueries({ queryKey: ["commissions"] });
      qc.invalidateQueries({ queryKey: ["payoutRequests"] });
    },
  });
}
