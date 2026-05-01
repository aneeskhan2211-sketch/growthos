import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  ConsentLog,
  ConsentStatus,
  ConsentType,
  DeliveryStats,
  ImportRecord,
  SenderIdentity,
  SenderType,
} from "../types/compliance";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const now = BigInt(Date.now()) * BigInt(1_000_000);

const MOCK_CONSENT_LOGS: ConsentLog[] = [
  {
    id: BigInt(1),
    timestamp: now - BigInt(5 * 86400 * 1e9),
    phone: "+91 98765 43210",
    email: "ravi@brightsalon.com",
    consentType: "form_submission",
    status: "granted",
    messageTemplate: "salon_intro_v2",
    userId: "user_1",
    notes: "Submitted free audit form on landing page",
  },
  {
    id: BigInt(2),
    timestamp: now - BigInt(4 * 86400 * 1e9),
    phone: "+91 91234 56789",
    email: "priya@fitzone.in",
    consentType: "form_submission",
    status: "granted",
    messageTemplate: "gym_followup_v1",
    userId: "user_1",
    notes: "Opted in via website contact form",
  },
  {
    id: BigInt(3),
    timestamp: now - BigInt(3 * 86400 * 1e9),
    phone: "+91 99887 76655",
    email: "amit@restaurantmumbai.com",
    consentType: "qr_optin",
    status: "granted",
    messageTemplate: "restaurant_intro_v1",
    userId: "user_1",
    notes: "Scanned QR code at trade fair",
  },
  {
    id: BigInt(4),
    timestamp: now - BigInt(2 * 86400 * 1e9),
    phone: "+91 90000 11223",
    email: "sunita@yogastudio.in",
    consentType: "reply_first",
    status: "withdrawn",
    messageTemplate: "yoga_intro_v1",
    userId: "user_1",
    notes: "Replied STOP — removed from all lists",
  },
  {
    id: BigInt(5),
    timestamp: now - BigInt(1 * 86400 * 1e9),
    phone: "+91 88776 54321",
    email: "rahul@cliniccare.com",
    consentType: "manual_override",
    status: "pending",
    messageTemplate: "clinic_intro_v2",
    userId: "user_1",
    notes: "Met at local business networking event",
  },
];

const MOCK_IMPORT_HISTORY: ImportRecord[] = [
  {
    id: BigInt(1),
    filename: "leads_mumbai_salons.csv",
    timestamp: now - BigInt(3 * 86400 * 1e9),
    userId: "user_1",
    totalRows: 200,
    validCount: 180,
    invalidCount: 12,
    duplicateCount: 8,
    importedCount: 172,
  },
  {
    id: BigInt(2),
    filename: "contacts_export.csv",
    timestamp: now - BigInt(7 * 86400 * 1e9),
    userId: "user_1",
    totalRows: 85,
    validCount: 71,
    invalidCount: 9,
    duplicateCount: 5,
    importedCount: 66,
  },
];

const MOCK_SENDER_IDENTITIES: SenderIdentity[] = [
  {
    id: BigInt(1),
    identifier: "+91 98001 23456",
    senderType: "whatsapp",
    reputationScore: 87,
    warmupPhase: "phase2",
    totalSent: 342,
    totalDelivered: 318,
    totalReplied: 74,
    totalBounced: 8,
    totalOptOut: 4,
    blockedCount: 2,
    createdAt: now - BigInt(30 * 86400 * 1e9),
  },
  {
    id: BigInt(2),
    identifier: "outreach@growthos.in",
    senderType: "email_domain",
    reputationScore: 92,
    warmupPhase: "phase2",
    totalSent: 520,
    totalDelivered: 498,
    totalReplied: 112,
    totalBounced: 14,
    totalOptOut: 6,
    blockedCount: 0,
    createdAt: now - BigInt(45 * 86400 * 1e9),
  },
];

function buildMockDeliveryStats(): DeliveryStats[] {
  const stats: DeliveryStats[] = [];
  const base = [20, 25, 22, 30, 35, 38, 42];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const sent = base[6 - i];
    stats.push({
      id: BigInt(7 - i),
      identityId: BigInt(1),
      date: d.toISOString().slice(0, 10),
      deliveredCount: Math.floor(sent * 0.93),
      repliedCount: Math.floor(sent * 0.21),
      bouncedCount: Math.floor(sent * 0.04),
      optOutCount: i === 3 ? 1 : 0,
      blockedCount: 0,
    });
  }
  return stats;
}

const MOCK_DELIVERY_STATS = buildMockDeliveryStats();

// ─── Consent Logs ─────────────────────────────────────────────────────────────

export function useConsentLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ConsentLog[]>({
    queryKey: ["consentLogs"],
    queryFn: async () => {
      if (!actor) return MOCK_CONSENT_LOGS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getConsentLogs();
        return result?.length > 0 ? result : MOCK_CONSENT_LOGS;
      } catch {
        return MOCK_CONSENT_LOGS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_CONSENT_LOGS,
  });
}

export function useRecordConsentLog() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      phone: string;
      email: string;
      consentType: ConsentType;
      template: string;
      userId: string;
      notes: string;
    }) => {
      if (!actor) {
        return BigInt(Date.now());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).recordConsentLog(
        input.phone,
        input.email,
        input.consentType,
        input.template,
        input.userId,
        input.notes,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consentLogs"] });
    },
  });
}

export function useUpdateConsentStatus() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: bigint; status: ConsentStatus }) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateConsentStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consentLogs"] });
    },
  });
}

// ─── Import History ───────────────────────────────────────────────────────────

export function useImportHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ImportRecord[]>({
    queryKey: ["importHistory"],
    queryFn: async () => {
      if (!actor) return MOCK_IMPORT_HISTORY;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getImportHistory();
        return result?.length > 0 ? result : MOCK_IMPORT_HISTORY;
      } catch {
        return MOCK_IMPORT_HISTORY;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_IMPORT_HISTORY,
  });
}

export function useImportCSVLeads() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      rows: Record<string, string>[];
      filename: string;
      userId: string;
    }) => {
      if (!actor) {
        const record: ImportRecord = {
          id: BigInt(Date.now()),
          filename: input.filename,
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
          userId: input.userId,
          totalRows: input.rows.length,
          validCount: input.rows.length,
          invalidCount: 0,
          duplicateCount: 0,
          importedCount: input.rows.length,
        };
        return record;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).importCSVLeads(
        input.rows,
        input.filename,
        input.userId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["importHistory"] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

// ─── Sender Identities ────────────────────────────────────────────────────────

export function useSenderIdentities() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<SenderIdentity[]>({
    queryKey: ["senderIdentities"],
    queryFn: async () => {
      if (!actor) return MOCK_SENDER_IDENTITIES;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getSenderIdentities();
        return result?.length > 0 ? result : MOCK_SENDER_IDENTITIES;
      } catch {
        return MOCK_SENDER_IDENTITIES;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_SENDER_IDENTITIES,
  });
}

export function useAddSenderIdentity() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      identifier: string;
      senderType: SenderType;
    }) => {
      if (!actor) {
        const identity: SenderIdentity = {
          id: BigInt(Date.now()),
          identifier: input.identifier,
          senderType: input.senderType,
          reputationScore: 50,
          warmupPhase: "phase1",
          totalSent: 0,
          totalDelivered: 0,
          totalReplied: 0,
          totalBounced: 0,
          totalOptOut: 0,
          blockedCount: 0,
          createdAt: BigInt(Date.now()) * BigInt(1_000_000),
        };
        return identity;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).addSenderIdentity(
        input.identifier,
        input.senderType,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["senderIdentities"] });
    },
  });
}

export function useUpdateSenderReputation() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      id: bigint;
      delivered: number;
      replied: number;
      bounced: number;
      optOut: number;
    }) => {
      if (!actor) return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).updateSenderReputation(
        input.id,
        input.delivered,
        input.replied,
        input.bounced,
        input.optOut,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["senderIdentities"] });
    },
  });
}

export function useRecordDeliveryStats() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: {
      identityId: bigint;
      date: string;
      delivered: number;
      replied: number;
      bounced: number;
      optOut: number;
      blocked: number;
    }) => {
      if (!actor) return BigInt(Date.now());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).recordDeliveryStats(
        input.identityId,
        input.date,
        input.delivered,
        input.replied,
        input.bounced,
        input.optOut,
        input.blocked,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deliverabilityMetrics"] });
    },
  });
}

// ─── Deliverability Metrics ───────────────────────────────────────────────────

export function useDeliverabilityMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DeliveryStats[]>({
    queryKey: ["deliverabilityMetrics"],
    queryFn: async () => {
      if (!actor) return MOCK_DELIVERY_STATS;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (actor as any).getDeliverabilityMetrics(BigInt(0));
        return result?.length > 0 ? result : MOCK_DELIVERY_STATS;
      } catch {
        return MOCK_DELIVERY_STATS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_DELIVERY_STATS,
    refetchInterval: 30000,
  });
}

export function useCheckOptOut() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (leadId: bigint) => {
      if (!actor) return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (actor as any).checkOptOutStatus(leadId);
    },
  });
}
