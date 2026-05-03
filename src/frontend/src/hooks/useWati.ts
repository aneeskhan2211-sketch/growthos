/**
 * useWati.ts
 * Hook for saving WATI (WhatsApp) credentials via the backend actor.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export function useSaveWatiConfig() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      apiKey,
      baseUrl,
      businessPhoneId,
    }: {
      apiKey: string;
      baseUrl: string;
      businessPhoneId: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveWatiConfig?.(
        apiKey,
        baseUrl,
        businessPhoneId,
      );
      if (result && "__kind__" in result && result.__kind__ === "err") {
        throw new Error(String((result as { err: unknown }).err));
      }
      return result;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["wati"] }),
  });
}
