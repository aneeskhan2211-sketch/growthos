import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Client,
  GrowthSuggestion,
  SaveTemplateInput,
  UpdateClientMetricsInput,
  WebsiteTemplate,
} from "../backend";
const SuggestionPriority = {
  high: "high",
  medium: "medium",
  low: "low",
} as const;

const mockClients: Client[] = [
  {
    id: BigInt(1),
    leadId: BigInt(4),
    businessName: "Pinnacle Law Group",
    startDate: BigInt(Date.now() - 86400000 * 90),
    metrics: {
      traffic: BigInt(48325),
      leads: BigInt(162),
      conversions: BigInt(39),
      revenue: 24500,
    },
    reportDate: BigInt(Date.now() - 86400000 * 5),
  },
  {
    id: BigInt(2),
    leadId: BigInt(2),
    businessName: "Bright Horizon Bakery",
    startDate: BigInt(Date.now() - 86400000 * 60),
    metrics: {
      traffic: BigInt(12400),
      leads: BigInt(48),
      conversions: BigInt(12),
      revenue: 8200,
    },
    reportDate: BigInt(Date.now() - 86400000 * 3),
  },
  {
    id: BigInt(3),
    leadId: BigInt(6),
    businessName: "Pacific Plumbing Co",
    startDate: BigInt(Date.now() - 86400000 * 30),
    metrics: {
      traffic: BigInt(6800),
      leads: BigInt(22),
      conversions: BigInt(8),
      revenue: 5400,
    },
    reportDate: BigInt(Date.now() - 86400000 * 1),
  },
];

const mockSuggestions: GrowthSuggestion[] = [
  {
    id: BigInt(1),
    clientId: BigInt(1),
    title: "Launch Google Review Campaign",
    description:
      "Pinnacle Law has only 28 reviews. Sending a review request email to past clients could add 15-20 new reviews and lift local pack ranking.",
    priority: SuggestionPriority.high,
    estimatedImpact: "+35% local visibility",
    category: "seo",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    clientId: BigInt(1),
    title: "Add FAQ Schema to Service Pages",
    description:
      "Adding FAQ schema markup to 8 service pages will trigger rich snippets, boosting CTR by an estimated 25-30%.",
    priority: SuggestionPriority.medium,
    estimatedImpact: "+28% CTR",
    category: "seo",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    clientId: BigInt(2),
    title: "Run Summer Promotion Ads",
    description:
      "Launch a Meta carousel ad featuring summer baked goods. Budget: $200/week. Estimated 3.5x ROAS based on past campaigns.",
    priority: SuggestionPriority.high,
    estimatedImpact: "+$2,800 revenue",
    category: "ads",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    clientId: BigInt(3),
    title: "Add Emergency Call CTA",
    description:
      "Placing a sticky 'Emergency Plumbing' call button on mobile increases call conversions by ~40% for home service businesses.",
    priority: SuggestionPriority.high,
    estimatedImpact: "+40% call leads",
    category: "conversion",
    implemented: false,
    dismissed: false,
    weekOf: BigInt(Date.now()),
  },
];

export function useClients() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      if (!actor) return mockClients;
      try {
        const result = await actor.listClients();
        return result.length > 0 ? result : mockClients;
      } catch {
        return mockClients;
      }
    },
    enabled: !isFetching,
    initialData: mockClients,
  });
}

export function useUpdateClientMetrics() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: UpdateClientMetricsInput) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.updateClientMetrics(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useGrowthSuggestions(clientId?: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GrowthSuggestion[]>({
    queryKey: ["growthSuggestions", clientId?.toString()],
    queryFn: async () => {
      const filtered = clientId
        ? mockSuggestions.filter((s) => s.clientId === clientId)
        : mockSuggestions;
      if (!actor) return filtered;
      try {
        if (clientId) {
          const result = await actor.listGrowthSuggestions(clientId);
          return result.length > 0 ? result : filtered;
        }
        return mockSuggestions;
      } catch {
        return filtered;
      }
    },
    enabled: !isFetching,
    initialData: clientId
      ? mockSuggestions.filter((s) => s.clientId === clientId)
      : mockSuggestions,
  });
}

export function useMarkSuggestionImplemented() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: bigint) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.markSuggestionImplemented(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["growthSuggestions"] });
    },
  });
}

export function useWebsiteTemplate(clientId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<WebsiteTemplate | null>({
    queryKey: ["websiteTemplate", clientId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getWebsiteTemplate(clientId);
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
    initialData: null,
  });
}

export function useSaveWebsiteTemplate() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: SaveTemplateInput) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.saveWebsiteTemplate(input);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["websiteTemplate", variables.clientId.toString()],
      });
    },
  });
}
