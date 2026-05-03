import type { MetaTagConfig } from "@/hooks/useMetaTags";

export const DEFAULT_META: MetaTagConfig = {
  title: "GrowthOS — Client Acquisition Platform for Local Businesses",
  description:
    "Turn online searches into daily enquiries. GrowthOS helps salons, gyms, clinics, and local services find prospects, send outreach, and convert replies into bookings.",
  keywords:
    "client acquisition, local business marketing, lead generation, enquiry management, business growth India",
  robots: "index, follow",
  ogType: "website",
  canonical: "/",
};

export const PAGE_META: Record<string, MetaTagConfig> = {
  "/": {
    title: "GrowthOS — Client Acquisition Platform for Local Businesses",
    description:
      "Turn online searches into daily enquiries. GrowthOS helps salons, gyms, clinics, and local services find prospects, send outreach, and convert replies into bookings.",
    keywords:
      "client acquisition, local business marketing, lead generation, enquiry management, business growth India",
    robots: "index, follow",
    ogType: "website",
    canonical: "/",
  },
  "/login": {
    title: "Sign In | GrowthOS",
    description:
      "Sign in to GrowthOS to manage your leads, outreach, and business growth dashboard.",
    robots: "noindex, nofollow",
    canonical: "/login",
  },
  "/pricing": {
    title: "Pricing | GrowthOS — Simple Plans for Every Business",
    description:
      "Simple, transparent pricing from Free to Agency. Start free and upgrade when you want faster results. Plans from ₹49/month.",
    keywords:
      "GrowthOS pricing, marketing platform plans, lead generation pricing India, ₹49 marketing tool",
    robots: "index, follow",
    ogType: "product",
    canonical: "/pricing",
  },
  "/salon-mumbai": {
    title: "Salon Marketing Mumbai | Get More Enquiries | GrowthOS",
    description:
      "Get more salon enquiries in Mumbai. Simple system to find local prospects, send messages, and convert replies into bookings. Start free.",
    keywords:
      "salon marketing Mumbai, get salon clients, salon enquiries Mumbai, local business marketing Mumbai",
    robots: "index, follow",
    canonical: "/salon-mumbai",
  },
  "/salon-marketing-mumbai": {
    title: "Salon Marketing Mumbai — Grow Your Salon Business | GrowthOS",
    description:
      "Proven system for Mumbai salons to generate 30–70 new enquiries per month through Google, Instagram, and WhatsApp outreach.",
    keywords:
      "salon marketing Mumbai, grow salon business, salon clients Mumbai, beauty business marketing",
    robots: "index, follow",
    canonical: "/salon-marketing-mumbai",
  },
  "/trust-hub": {
    title: "Trust & Integrations | GrowthOS",
    description:
      "GrowthOS integrates with industry-leading platforms including Google Analytics, Meta Ads, WhatsApp Business, and more to power your business growth.",
    keywords:
      "GrowthOS integrations, Google Analytics, Meta Ads, WhatsApp Business, marketing platform trust",
    robots: "index, follow",
    canonical: "/trust-hub",
  },
  "/growth-advisor": {
    title: "AI Growth Advisor | GrowthOS",
    description:
      "Get personalised business growth strategies, competitor insights, and actionable recommendations from your AI Growth Advisor.",
    robots: "noindex, nofollow",
    canonical: "/growth-advisor",
  },
  "/website-health": {
    title: "Website Health Scanner | GrowthOS",
    description:
      "Scan your website and get a health score out of 100. Understand what's costing you enquiries and how to fix it — in plain business language.",
    robots: "noindex, nofollow",
    canonical: "/website-health",
  },
  "/website-health/fix-tools": {
    title: "Website Fix Tools | GrowthOS",
    description:
      "One-click fix tools for your website — WhatsApp button generator, meta tag generator, schema markup, CTA generator, and more.",
    robots: "noindex, nofollow",
    canonical: "/website-health/fix-tools",
  },
  "/leads": {
    title: "Lead Generation | GrowthOS",
    description:
      "Find and manage high-quality local leads for your business niche and city.",
    robots: "noindex, nofollow",
    canonical: "/leads",
  },
  "/crm": {
    title: "CRM | GrowthOS",
    description:
      "Manage your clients and track every conversation from enquiry to booking.",
    robots: "noindex, nofollow",
    canonical: "/crm",
  },
  "/proposals": {
    title: "Proposals | GrowthOS",
    description:
      "Create and send professional proposals to prospects and track their status.",
    robots: "noindex, nofollow",
    canonical: "/proposals",
  },
  "/clients": {
    title: "Clients | GrowthOS",
    description: "View and manage all your clients in one place.",
    robots: "noindex, nofollow",
    canonical: "/clients",
  },
  "/inbox": {
    title: "Inbox | GrowthOS",
    description:
      "All your leads, replies, and follow-ups in one unified inbox.",
    robots: "noindex, nofollow",
    canonical: "/inbox",
  },
  "/saas-metrics": {
    title: "SaaS Metrics Dashboard | GrowthOS",
    description:
      "Investor-ready metrics dashboard — MRR, ARR, LTV, CAC, churn rate, and retention cohorts.",
    robots: "noindex, nofollow",
    canonical: "/saas-metrics",
  },
  "/growth-engine/analytics": {
    title: "Growth Analytics | GrowthOS",
    description:
      "Mixpanel-style analytics dashboard with DAU, funnel analysis, cohort data, and event tracking.",
    robots: "noindex, nofollow",
    canonical: "/growth-engine/analytics",
  },
  "/growth-engine/ai-optimizer": {
    title: "AI Optimizer | GrowthOS",
    description:
      "AI-powered user segmentation, nudge recommendations, and pricing optimisation engine.",
    robots: "noindex, nofollow",
    canonical: "/growth-engine/ai-optimizer",
  },
  "/growth-engine/viral-loop": {
    title: "Viral Loop Manager | GrowthOS",
    description:
      "Manage referrals, social proof feeds, and weekly challenge leaderboards.",
    robots: "noindex, nofollow",
    canonical: "/growth-engine/viral-loop",
  },
  "/viral-loop": {
    title: "Share Your Wins | GrowthOS",
    description:
      "Share your business results and invite others to GrowthOS for rewards and feature unlocks.",
    robots: "noindex, nofollow",
    canonical: "/viral-loop",
  },
  "/challenge": {
    title: "Weekly Challenge | GrowthOS",
    description:
      "Compete in the weekly city-wise lead generation challenge and win credits.",
    robots: "noindex, nofollow",
    canonical: "/challenge",
  },
  "/referral": {
    title: "Referral Programme | GrowthOS",
    description:
      "Invite businesses to GrowthOS and unlock premium features — 3 invites gets a Pro trial.",
    robots: "noindex, nofollow",
    canonical: "/referral",
  },
  "/retention-analytics": {
    title: "Retention Analytics | GrowthOS",
    description:
      "Track user retention cohorts, behaviour patterns, and engagement trends.",
    robots: "noindex, nofollow",
    canonical: "/retention-analytics",
  },
  "/onboarding-sequences": {
    title: "Onboarding Sequences | GrowthOS",
    description:
      "Ready-to-use email and WhatsApp onboarding templates to guide new users to their first booking.",
    robots: "noindex, nofollow",
    canonical: "/onboarding-sequences",
  },
  "/settings": {
    title: "Settings | GrowthOS",
    description:
      "Manage your GrowthOS settings, integrations, API keys, and white-label branding.",
    robots: "noindex, nofollow",
    canonical: "/settings",
  },
  "/settings/notifications": {
    title: "Notification Settings | GrowthOS",
    description:
      "Control your notification preferences, quiet hours, and WhatsApp consent.",
    robots: "noindex, nofollow",
    canonical: "/settings/notifications",
  },
  "/profile": {
    title: "My Profile | GrowthOS",
    description:
      "Update your personal details, business name, niche, city, and social links.",
    robots: "noindex, nofollow",
    canonical: "/profile",
  },
  "/profile/business": {
    title: "Business Profile | GrowthOS",
    description:
      "Set up your agency or business profile for proposals, reports, and white-label branding.",
    robots: "noindex, nofollow",
    canonical: "/profile/business",
  },
  "/settings/profile": {
    title: "Account Settings | GrowthOS",
    description:
      "Manage your account name, email, phone, password, and privacy settings.",
    robots: "noindex, nofollow",
    canonical: "/settings/profile",
  },
  "/help": {
    title: "Help & Support | GrowthOS",
    description:
      "Get help with GrowthOS. Contact Anees Chaudhary at +91 9324073833 for support.",
    keywords: "GrowthOS support, help, contact Anees Chaudhary",
    robots: "index, follow",
    canonical: "/help",
  },
  "/terms": {
    title: "Terms of Service | GrowthOS",
    description: "Read the GrowthOS terms of service and usage policies.",
    robots: "index, follow",
    canonical: "/terms",
  },
  "/privacy-policy": {
    title: "Privacy Policy | GrowthOS",
    description:
      "GrowthOS privacy policy — how we handle your data and protect your information.",
    robots: "index, follow",
    canonical: "/privacy-policy",
  },
  "/compliance": {
    title: "Compliance | GrowthOS",
    description:
      "GrowthOS compliance information including data handling, messaging consent, and legal policies.",
    robots: "index, follow",
    canonical: "/compliance",
  },
  "/app-info": {
    title: "App Info | GrowthOS",
    description:
      "GrowthOS application information, version details, and developer contact.",
    robots: "index, follow",
    canonical: "/app-info",
  },
  "/admin/ab-tests": {
    title: "A/B Test Admin | GrowthOS",
    description:
      "Manage A/B tests for pricing, paywalls, and CTA copy across GrowthOS.",
    robots: "noindex, nofollow",
    canonical: "/admin/ab-tests",
  },
  "/onboarding": {
    title: "Get Started | GrowthOS",
    description:
      "Set up your GrowthOS account and get ready to start generating enquiries.",
    robots: "noindex, nofollow",
    canonical: "/onboarding",
  },
  "/splash": {
    title: "Welcome to GrowthOS",
    description:
      "GrowthOS — the client acquisition platform for local businesses in India.",
    robots: "noindex, nofollow",
    canonical: "/splash",
  },
};
