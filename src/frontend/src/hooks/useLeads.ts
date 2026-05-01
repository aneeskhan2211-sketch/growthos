import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CreateLeadInput, Lead } from "../backend";
import { LeadStatus } from "../backend";

// Mock leads for demo
const mockLeads: Lead[] = [
  {
    id: BigInt(1),
    businessName: "Summit Digital Agency",
    website: "summitdigital.com",
    rating: 4.2,
    phone: "+1 555-0101",
    address: "123 Main St, Austin, TX",
    industry: "Digital Marketing",
    city: "Austin",
    leadScore: BigInt(87),
    status: LeadStatus.new_,
    notes: "",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    businessName: "Bright Horizon Bakery",
    website: "brighthorizon.com",
    rating: 4.8,
    phone: "+1 555-0102",
    address: "456 Oak Ave, Denver, CO",
    industry: "Food & Beverage",
    city: "Denver",
    leadScore: BigInt(72),
    status: LeadStatus.contacted,
    notes: "Interested in SEO",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    businessName: "Metro Auto Repair",
    website: "metroauto.net",
    rating: 3.9,
    phone: "+1 555-0103",
    address: "789 Elm St, Chicago, IL",
    industry: "Automotive",
    city: "Chicago",
    leadScore: BigInt(65),
    status: LeadStatus.proposal,
    notes: "Sent proposal via email",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    businessName: "Pinnacle Law Group",
    website: "pinnaclelaw.com",
    rating: 4.6,
    phone: "+1 555-0104",
    address: "321 Pine Rd, Seattle, WA",
    industry: "Legal Services",
    city: "Seattle",
    leadScore: BigInt(91),
    status: LeadStatus.closed,
    notes: "Signed 6-month contract",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    businessName: "Green Valley Gym",
    website: "greenvalleygym.com",
    rating: 4.1,
    phone: "+1 555-0105",
    address: "654 Maple Dr, Phoenix, AZ",
    industry: "Fitness",
    city: "Phoenix",
    leadScore: BigInt(58),
    status: LeadStatus.new_,
    notes: "",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    businessName: "Pacific Plumbing Co",
    website: "pacificplumbing.com",
    rating: 4.4,
    phone: "+1 555-0106",
    address: "987 Cedar Blvd, Portland, OR",
    industry: "Home Services",
    city: "Portland",
    leadScore: BigInt(79),
    status: LeadStatus.contacted,
    notes: "Follow up next week",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now()),
    updatedAt: BigInt(Date.now()),
  },
];

export function useLeads() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      if (!actor) return mockLeads;
      try {
        const result = await actor.listLeads();
        return result.length > 0 ? result : mockLeads;
      } catch {
        return mockLeads;
      }
    },
    enabled: !isFetching,
    initialData: mockLeads,
  });
}

export function useLeadsByStatus(status: LeadStatus) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Lead[]>({
    queryKey: ["leads", "status", status],
    queryFn: async () => {
      if (!actor) return mockLeads.filter((l) => l.status === status);
      try {
        const result = await actor.listLeadsByStatus(status);
        return result ?? mockLeads.filter((l) => l.status === status);
      } catch {
        return mockLeads.filter((l) => l.status === status);
      }
    },
    enabled: !isFetching,
    initialData: mockLeads.filter((l) => l.status === status),
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (lead: CreateLeadInput) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.createLead(lead);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useMoveLead() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: LeadStatus }) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.moveLead(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: bigint) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.deleteLead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
