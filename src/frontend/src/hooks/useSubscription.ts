import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { UserSubscription } from "../backend";
import { SubscriptionPlan, SubscriptionStatus } from "../backend";

const mockSubscription: UserSubscription = {
  plan: SubscriptionPlan.pro,
  leadCredits: BigInt(47),
  subscriptionStatus: SubscriptionStatus.active,
  stripeCustomerId: "cus_mock123",
};

export function useSubscription() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserSubscription>({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return mockSubscription;
      try {
        const result = await actor.getMySubscription();
        return result ?? mockSubscription;
      } catch {
        return mockSubscription;
      }
    },
    enabled: !isFetching,
    initialData: mockSubscription,
  });
}

export function useUpsertSubscription() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async (subscription: UserSubscription) => {
      const a = actor;
      if (!a) throw new Error("Actor not available");
      return a.upsertMySubscription(subscription);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
}
