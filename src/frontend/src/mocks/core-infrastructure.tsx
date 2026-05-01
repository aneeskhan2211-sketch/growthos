/**
 * Mock for @caffeineai/core-infrastructure
 * Used when VITE_USE_MOCK=true to bypass Internet Identity authentication.
 */
import type { PropsWithChildren } from "react";
import { mockBackend } from "./backend";

export const useInternetIdentity = () => ({
  identity: {
    getPrincipal: () => ({
      isAnonymous: () => false,
      toString: () => "mock-principal",
    }),
  },
  login: () => {},
  clear: () => {},
  loginStatus: "success" as const,
  isInitializing: false,
  isLoginIdle: false,
  isLoggingIn: false,
  isLoginSuccess: true,
  isLoginError: false,
  isAuthenticated: true,
  loginError: undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useActor(_createActor: any) {
  return { actor: mockBackend as any, isFetching: false }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function InternetIdentityProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}
