import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CreateNoteInput,
  CreateProposalInput,
  Note,
  Proposal,
} from "../backend";
import { NoteType } from "../backend";

const mockNotes: Note[] = [
  {
    id: BigInt(1),
    leadId: BigInt(1),
    content: "Discussed SEO needs — interested in local search optimization",
    noteType: NoteType.note,
    dueDate: BigInt(Date.now() + 86400000 * 2),
    completed: false,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    leadId: BigInt(2),
    content: "Follow up after proposal review",
    noteType: NoteType.reminder,
    dueDate: BigInt(Date.now() + 86400000 * 5),
    completed: false,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    leadId: BigInt(3),
    content: "Initial discovery call completed",
    noteType: NoteType.note,
    dueDate: undefined,
    completed: true,
    createdAt: BigInt(Date.now() - 86400000 * 3),
  },
];

const mockProposals: Proposal[] = [
  {
    id: BigInt(1),
    leadId: BigInt(3),
    businessName: "Metro Auto Repair",
    niche: "Automotive",
    seoStrategy:
      "Target local keywords: 'auto repair Chicago', 'oil change near me'. Optimize Google Business Profile. Build 20 local citations per month. Expected 40% traffic increase in 90 days.",
    adsStrategy:
      "Google Ads: Target service-based keywords with $500/mo budget. Meta Ads: Retargeting website visitors with special offers. Expected 15-20 leads/month.",
    websiteStrategy:
      "Rebuild with mobile-first design. Add online booking system. Showcase reviews prominently. Add trust signals and SSL.",
    pricingBreakdown:
      "SEO: $799/mo | Google Ads Management: $499/mo | Website Redesign: $2,499 one-time | Total: $1,298/mo + $2,499 setup",
    generatedAt: BigInt(Date.now() - 86400000),
  },
];

export function useNotesByLead(leadId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Note[]>({
    queryKey: ["notes", "lead", leadId.toString()],
    queryFn: async () => {
      if (!actor) return mockNotes.filter((n) => n.leadId === leadId);
      try {
        const result = await actor.listNotesByLead(leadId);
        return result ?? mockNotes.filter((n) => n.leadId === leadId);
      } catch {
        return mockNotes.filter((n) => n.leadId === leadId);
      }
    },
    enabled: !isFetching,
    initialData: mockNotes.filter((n) => n.leadId === leadId),
  });
}

export function useAllNotes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Note[]>({
    queryKey: ["notes", "all"],
    queryFn: async () => {
      if (!actor) return mockNotes;
      return mockNotes;
    },
    enabled: !isFetching,
    initialData: mockNotes,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (note: CreateNoteInput) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.createNote(note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useCompleteNote() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (id: bigint) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.completeNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useProposalsByLead(leadId: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Proposal[]>({
    queryKey: ["proposals", "lead", leadId.toString()],
    queryFn: async () => {
      if (!actor) return mockProposals.filter((p) => p.leadId === leadId);
      try {
        const result = await actor.listProposalsByLead(leadId);
        return result ?? mockProposals.filter((p) => p.leadId === leadId);
      } catch {
        return mockProposals.filter((p) => p.leadId === leadId);
      }
    },
    enabled: !isFetching,
    initialData: mockProposals.filter((p) => p.leadId === leadId),
  });
}

export function useAllProposals() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Proposal[]>({
    queryKey: ["proposals", "all"],
    queryFn: async () => {
      if (!actor) return mockProposals;
      return mockProposals;
    },
    enabled: !isFetching,
    initialData: mockProposals,
  });
}

export function useGenerateProposal() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (input: CreateProposalInput) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.generateProposal(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });
}
