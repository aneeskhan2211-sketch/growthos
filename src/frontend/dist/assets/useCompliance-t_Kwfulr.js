import { u as useActor, a as useQuery, b as useQueryClient, d as useMutation, e as createActor } from "./index-DcPx_5wo.js";
const now = BigInt(Date.now()) * BigInt(1e6);
const MOCK_CONSENT_LOGS = [
  {
    id: BigInt(1),
    timestamp: now - BigInt(5 * 86400 * 1e9),
    phone: "+91 98765 43210",
    email: "ravi@brightsalon.com",
    consentType: "form_submission",
    status: "granted",
    messageTemplate: "salon_intro_v2",
    userId: "user_1",
    notes: "Submitted free audit form on landing page"
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
    notes: "Opted in via website contact form"
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
    notes: "Scanned QR code at trade fair"
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
    notes: "Replied STOP — removed from all lists"
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
    notes: "Met at local business networking event"
  }
];
const MOCK_IMPORT_HISTORY = [
  {
    id: BigInt(1),
    filename: "leads_mumbai_salons.csv",
    timestamp: now - BigInt(3 * 86400 * 1e9),
    userId: "user_1",
    totalRows: 200,
    validCount: 180,
    invalidCount: 12,
    duplicateCount: 8,
    importedCount: 172
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
    importedCount: 66
  }
];
const MOCK_SENDER_IDENTITIES = [
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
    createdAt: now - BigInt(30 * 86400 * 1e9)
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
    createdAt: now - BigInt(45 * 86400 * 1e9)
  }
];
function buildMockDeliveryStats() {
  const stats = [];
  const base = [20, 25, 22, 30, 35, 38, 42];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5);
    const sent = base[6 - i];
    stats.push({
      id: BigInt(7 - i),
      identityId: BigInt(1),
      date: d.toISOString().slice(0, 10),
      deliveredCount: Math.floor(sent * 0.93),
      repliedCount: Math.floor(sent * 0.21),
      bouncedCount: Math.floor(sent * 0.04),
      optOutCount: i === 3 ? 1 : 0,
      blockedCount: 0
    });
  }
  return stats;
}
const MOCK_DELIVERY_STATS = buildMockDeliveryStats();
function useConsentLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["consentLogs"],
    queryFn: async () => {
      if (!actor) return MOCK_CONSENT_LOGS;
      try {
        const result = await actor.getConsentLogs();
        return (result == null ? void 0 : result.length) > 0 ? result : MOCK_CONSENT_LOGS;
      } catch {
        return MOCK_CONSENT_LOGS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_CONSENT_LOGS
  });
}
function useRecordConsentLog() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) {
        return BigInt(Date.now());
      }
      return actor.recordConsentLog(
        input.phone,
        input.email,
        input.consentType,
        input.template,
        input.userId,
        input.notes
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consentLogs"] });
    }
  });
}
function useUpdateConsentStatus() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      if (!actor) return true;
      return actor.updateConsentStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consentLogs"] });
    }
  });
}
function useImportHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["importHistory"],
    queryFn: async () => {
      if (!actor) return MOCK_IMPORT_HISTORY;
      try {
        const result = await actor.getImportHistory();
        return (result == null ? void 0 : result.length) > 0 ? result : MOCK_IMPORT_HISTORY;
      } catch {
        return MOCK_IMPORT_HISTORY;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_IMPORT_HISTORY
  });
}
function useImportCSVLeads() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) {
        const record = {
          id: BigInt(Date.now()),
          filename: input.filename,
          timestamp: BigInt(Date.now()) * BigInt(1e6),
          userId: input.userId,
          totalRows: input.rows.length,
          validCount: input.rows.length,
          invalidCount: 0,
          duplicateCount: 0,
          importedCount: input.rows.length
        };
        return record;
      }
      return actor.importCSVLeads(
        input.rows,
        input.filename,
        input.userId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["importHistory"] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    }
  });
}
function useSenderIdentities() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["senderIdentities"],
    queryFn: async () => {
      if (!actor) return MOCK_SENDER_IDENTITIES;
      try {
        const result = await actor.getSenderIdentities();
        return (result == null ? void 0 : result.length) > 0 ? result : MOCK_SENDER_IDENTITIES;
      } catch {
        return MOCK_SENDER_IDENTITIES;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_SENDER_IDENTITIES
  });
}
function useAddSenderIdentity() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) {
        const identity = {
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
          createdAt: BigInt(Date.now()) * BigInt(1e6)
        };
        return identity;
      }
      return actor.addSenderIdentity(
        input.identifier,
        input.senderType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["senderIdentities"] });
    }
  });
}
function useDeliverabilityMetrics() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["deliverabilityMetrics"],
    queryFn: async () => {
      if (!actor) return MOCK_DELIVERY_STATS;
      try {
        const result = await actor.getDeliverabilityMetrics(BigInt(0));
        return (result == null ? void 0 : result.length) > 0 ? result : MOCK_DELIVERY_STATS;
      } catch {
        return MOCK_DELIVERY_STATS;
      }
    },
    enabled: !isFetching,
    initialData: MOCK_DELIVERY_STATS,
    refetchInterval: 3e4
  });
}
export {
  useImportCSVLeads as a,
  useConsentLogs as b,
  useUpdateConsentStatus as c,
  useRecordConsentLog as d,
  useSenderIdentities as e,
  useDeliverabilityMetrics as f,
  useAddSenderIdentity as g,
  useImportHistory as u
};
