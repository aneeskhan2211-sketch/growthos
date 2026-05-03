import { useEffect } from "react";

export interface MetaTagConfig {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  robots?: string;
  ogType?: string;
  canonical?: string;
  ogImage?: string;
}

const BASE_URL = "https://growthos.app";
const DEFAULT_OG_IMAGE = "/og-image.png";
const DEFAULT_AUTHOR = "GrowthOS";
const SITE_NAME = "GrowthOS";
const OG_LOCALE = "en_IN";

function upsertMeta(selector: string, attr: string, value: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    // parse the attribute from selector, e.g. meta[name="foo"] → name="foo"
    const match = selector.match(/\[(\w+)=["']([^"']+)["']\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useMetaTags(config: MetaTagConfig): void {
  useEffect(() => {
    const {
      title,
      description,
      keywords,
      author = DEFAULT_AUTHOR,
      robots = "noindex, nofollow",
      ogType = "website",
      canonical,
      ogImage = DEFAULT_OG_IMAGE,
    } = config;

    const canonicalUrl = canonical
      ? `${BASE_URL}${canonical}`
      : `${BASE_URL}${window.location.pathname}`;

    // Page title
    document.title = title;

    // Standard meta
    upsertMeta('meta[name="description"]', "content", description);
    upsertMeta('meta[name="author"]', "content", author);
    upsertMeta('meta[name="robots"]', "content", robots);
    if (keywords) {
      upsertMeta('meta[name="keywords"]', "content", keywords);
    }

    // Open Graph
    upsertMeta('meta[property="og:title"]', "content", title);
    upsertMeta('meta[property="og:description"]', "content", description);
    upsertMeta('meta[property="og:type"]', "content", ogType);
    upsertMeta('meta[property="og:url"]', "content", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "content", ogImage);
    upsertMeta('meta[property="og:image:width"]', "content", "1200");
    upsertMeta('meta[property="og:image:height"]', "content", "630");
    upsertMeta('meta[property="og:site_name"]', "content", SITE_NAME);
    upsertMeta('meta[property="og:locale"]', "content", OG_LOCALE);

    // Twitter
    upsertMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "content", title);
    upsertMeta('meta[name="twitter:description"]', "content", description);
    upsertMeta('meta[name="twitter:image"]', "content", ogImage);

    // Canonical link
    upsertLink("canonical", canonicalUrl);

    return () => {
      // Restore base defaults on unmount
      document.title = "GrowthOS — Agency Growth Platform";
      upsertMeta(
        'meta[name="description"]',
        "content",
        "GrowthOS helps digital marketing agencies find leads, close deals, and manage clients automatically.",
      );
      upsertMeta('meta[name="robots"]', "content", "index, follow");
    };
  }, [config]);
}
