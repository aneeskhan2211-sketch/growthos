import { useMetaTags } from "@/hooks/useMetaTags";
import type { MetaTagConfig } from "@/hooks/useMetaTags";

/**
 * Drop-in component for per-page meta tag management.
 * Renders nothing in the DOM — manipulates document.head directly.
 *
 * Usage: <MetaTags {...PAGE_META["/pricing"]} />
 */
export function MetaTags(props: MetaTagConfig) {
  useMetaTags(props);
  return null;
}
