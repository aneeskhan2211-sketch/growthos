import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  CalendarDays,
  CreditCard,
  Eye,
  FileText,
  FlaskConical,
  Globe,
  Mail,
  Settings2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { SubscriptionPlan } from "../backend";
import { useUnreadCount } from "../hooks/useNotifications";
import { useSubscription } from "../hooks/useSubscription";

// ─── Custom SVG Icons ─────────────────────────────────────────────────────────

const IconDashboard = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M8 8 L8 4"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M8 8 L11 9.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <path
      d="M4.5 11.5 L5.5 10"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M11.5 11.5 L10.5 10"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M3 8 L4 8"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
    />
    <path
      d="M12 8 L13 8"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

const IconLeadEngine = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 12 C2 12 4 8 7 7 C8.5 6.5 10 7 11 8"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <circle
      cx="11.5"
      cy="5.5"
      r="2.5"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M11.5 8 L11.5 10"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <circle cx="8" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="4" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

const IconCampaigns = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8 13 L8 3"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M8 3 L5 6 M8 3 L11 6"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 10 Q8 8 12 10"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <circle cx="4" cy="11" r="1" fill="currentColor" opacity="0.7" />
    <circle cx="12" cy="11" r="1" fill="currentColor" opacity="0.7" />
    <path
      d="M6 13 L10 13"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconSEO = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M9.5 9.5 L13 13"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M3.5 6.5 L5 5 M5 8 L9 4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M4 9 L9 9"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);

const IconAnalytics = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="9"
      width="2.5"
      height="5"
      rx="0.5"
      fill="currentColor"
      opacity="0.6"
    />
    <rect
      x="6"
      y="6"
      width="2.5"
      height="8"
      rx="0.5"
      fill="currentColor"
      opacity="0.8"
    />
    <rect x="10" y="3" width="2.5" height="11" rx="0.5" fill="currentColor" />
    <path
      d="M2 9 L4.5 7 L7 5 L11.5 3"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeDasharray="1.5 1"
      opacity="0.5"
    />
  </svg>
);

const IconSocialHub = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="3" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="13" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="3" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="13" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <path
      d="M4.3 5.8 L6.6 7.2 M9.4 7.2 L11.7 5.8 M4.3 10.2 L6.6 8.8 M9.4 8.8 L11.7 10.2"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const IconWebsite = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="1.5"
      y="2.5"
      width="13"
      height="11"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path d="M1.5 6 L14.5 6" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="4" cy="4.25" r="0.75" fill="currentColor" opacity="0.6" />
    <circle cx="6.5" cy="4.25" r="0.75" fill="currentColor" opacity="0.4" />
    <circle cx="9" cy="4.25" r="0.75" fill="currentColor" opacity="0.3" />
    <rect
      x="3.5"
      y="8"
      width="4"
      height="3.5"
      rx="0.5"
      fill="currentColor"
      opacity="0.15"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M9 8.5 L12.5 8.5 M9 10 L11 10"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
  </svg>
);

const IconProposals = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="1.5"
      width="10"
      height="13"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M5.5 5 L10.5 5 M5.5 7.5 L10.5 7.5 M5.5 10 L8.5 10"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <text
      x="7.5"
      y="12.5"
      textAnchor="middle"
      fontSize="4"
      fill="currentColor"
      fontWeight="700"
    >
      ₹
    </text>
  </svg>
);

const IconInbox = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 4 Q2 2.5 3.5 2.5 L12.5 2.5 Q14 2.5 14 4 L14 9 Q14 10.5 12.5 10.5 L9 10.5 L6.5 13 L6.5 10.5 L3.5 10.5 Q2 10.5 2 9 Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M5 6 L11 6 M5 8 L8.5 8"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const IconClients = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="9.5"
      width="12"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M5 9.5 L5 8 Q5 5 8 5 Q11 5 11 8 L11 9.5"
      stroke="currentColor"
      strokeWidth="1.1"
    />
    <circle cx="8" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <path
      d="M4.5 12 L7.5 12 M9.5 12 L11.5 12"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

const IconAutomation = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="3" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="13" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="3" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="13" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.1" />
    <path
      d="M4.5 4 L6.5 7 M9.5 7 L11.5 4 M4.5 12 L6.5 9 M9.5 9 L11.5 12"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const IconReports = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="2.5"
      y="2"
      width="11"
      height="12"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M5 5.5 L11 5.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M5 8 L11 8"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M5 10.5 L8.5 10.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M9.5 9 L11.5 11 M9.5 11 L11.5 9"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

const IconBilling = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="1.5"
      y="4"
      width="13"
      height="9"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path d="M1.5 7 L14.5 7" stroke="currentColor" strokeWidth="1.1" />
    <rect
      x="3"
      y="9"
      width="3"
      height="1.5"
      rx="0.4"
      fill="currentColor"
      opacity="0.5"
    />
    <rect
      x="7.5"
      y="9"
      width="2"
      height="1.5"
      rx="0.4"
      fill="currentColor"
      opacity="0.3"
    />
    <path
      d="M4.5 4 L4.5 2 M11.5 4 L11.5 2"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

const IconSettings = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M8 1.5 L8 3 M8 13 L8 14.5 M1.5 8 L3 8 M13 8 L14.5 8"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M3.4 3.4 L4.5 4.5 M11.5 11.5 L12.6 12.6 M3.4 12.6 L4.5 11.5 M11.5 4.5 L12.6 3.4"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

const IconReferral = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8 10.5 C5.8 10.5 4 8.7 4 6.5 L4 3.5 L12 3.5 L12 6.5 C12 8.7 10.2 10.5 8 10.5 Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M6 12.5 L10 12.5 M8 10.5 L8 12.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M4 5 L2.5 5 L2.5 7.5 C2.5 9 3.2 9.8 4 10.2"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.7"
    />
    <path
      d="M12 5 L13.5 5 L13.5 7.5 C13.5 9 12.8 9.8 12 10.2"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.7"
    />
  </svg>
);

const IconShieldCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8 1.5 L13 3.5 L13 7.5 C13 10.5 10.8 13.1 8 14 C5.2 13.1 3 10.5 3 7.5 L3 3.5 Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 8 L7 9.5 L10.5 6"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Growth Engine Icons ──────────────────────────────────────────────────────

const IconWebsiteHealth = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M2.5 8 L4.5 8 L6 5 L8 11 L10 7 L11.5 8 L13.5 8"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconGrowthEngine = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 11 L5 8 L7.5 10 L10 6 L13 9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="13" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M13 6 L13 9"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const IconAIOptimizer = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
    <path
      d="M8 2 L8 3.5 M8 12.5 L8 14 M2 8 L3.5 8 M12.5 8 L14 8"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M4 4 L5 5 M11 11 L12 12 M4 12 L5 11 M11 5 L12 4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const IconViralLoop = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8 2 C5 2 3 4 3 6 C3 9 6 10 8 10"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M8 10 C10 10 13 9 13 6 C13 4 11 2 8 2"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeDasharray="2 1.2"
    />
    <path
      d="M6 8 L8 10 L6 12"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Nav Items Config ─────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  Icon: () => React.ReactElement;
  path: string;
  ocid: string;
  badge?: string;
  badgeVariant?: "ai" | "new";
}

interface NavGroup {
  groupLabel: string;
  GroupIcon: () => React.ReactElement;
  items: NavItem[];
}

const GROWTH_ENGINE_GROUP: NavGroup = {
  groupLabel: "Growth Engine",
  GroupIcon: IconGrowthEngine,
  items: [
    {
      label: "Analytics",
      Icon: IconAnalytics,
      path: "/growth-engine/analytics",
      ocid: "nav.growth-engine.analytics",
      badge: "New",
      badgeVariant: "new",
    },
    {
      label: "AI Optimizer",
      Icon: IconAIOptimizer,
      path: "/growth-engine/ai-optimizer",
      ocid: "nav.growth-engine.ai-optimizer",
      badge: "AI",
      badgeVariant: "ai",
    },
    {
      label: "Viral Loop",
      Icon: IconViralLoop,
      path: "/growth-engine/viral-loop",
      ocid: "nav.growth-engine.viral-loop",
      badge: "New",
      badgeVariant: "new",
    },
  ],
};

const PRIMARY_NAV: NavItem[] = [
  { label: "Dashboard", Icon: IconDashboard, path: "/", ocid: "nav.dashboard" },
  {
    label: "My Profile",
    Icon: IconClients,
    path: "/profile",
    ocid: "nav.profile",
  },
  {
    label: "Business Profile",
    Icon: IconProposals,
    path: "/profile/business",
    ocid: "nav.profile.business",
  },
  {
    label: "Account Settings",
    Icon: () => (
      <Settings2 width={16} height={16} strokeWidth={1.5} aria-hidden />
    ),
    path: "/settings/profile",
    ocid: "nav.account-settings",
  },
  {
    label: "Lead Engine",
    Icon: IconLeadEngine,
    path: "/leads",
    ocid: "nav.leads",
    badge: "AI",
    badgeVariant: "ai",
  },
  {
    label: "Campaigns",
    Icon: IconCampaigns,
    path: "/ads",
    ocid: "nav.campaigns",
  },
  { label: "SEO Center", Icon: IconSEO, path: "/seo", ocid: "nav.seo" },
  {
    label: "Website Health",
    Icon: IconWebsiteHealth,
    path: "/website-health",
    ocid: "nav.website-health",
    badge: "New",
    badgeVariant: "new",
  },
  {
    label: "Analytics",
    Icon: IconAnalytics,
    path: "/analytics",
    ocid: "nav.analytics",
    badge: "New",
    badgeVariant: "new",
  },
  {
    label: "Social Hub",
    Icon: IconSocialHub,
    path: "/social-hub",
    ocid: "nav.social-hub",
  },
  {
    label: "Website Builder",
    Icon: IconWebsite,
    path: "/website-builder",
    ocid: "nav.website-builder",
  },
  {
    label: "Proposals",
    Icon: IconProposals,
    path: "/proposals",
    ocid: "nav.proposals",
    badge: "AI",
    badgeVariant: "ai",
  },
  { label: "Inbox", Icon: IconInbox, path: "/outreach", ocid: "nav.inbox" },
  {
    label: "Clients",
    Icon: IconClients,
    path: "/clients",
    ocid: "nav.clients",
  },
  {
    label: "Automation",
    Icon: IconAutomation,
    path: "/automation",
    ocid: "nav.automation",
    badge: "AI",
    badgeVariant: "ai",
  },
  {
    label: "Reports",
    Icon: IconReports,
    path: "/reports",
    ocid: "nav.reports",
    badge: "New",
    badgeVariant: "new",
  },
  {
    label: "Billing",
    Icon: IconBilling,
    path: "/billing",
    ocid: "nav.billing",
  },
  {
    label: "Settings",
    Icon: IconSettings,
    path: "/settings",
    ocid: "nav.settings",
  },
  {
    label: "Refer & Earn",
    Icon: IconReferral,
    path: "/referral",
    ocid: "nav.referral",
    badge: "New",
    badgeVariant: "new",
  },
  {
    label: "Trust Hub",
    Icon: IconShieldCheck,
    path: "/trust-hub",
    ocid: "nav.trust-hub",
    badge: "New",
    badgeVariant: "new",
  },
  {
    label: "Sequences",
    Icon: () => <Mail width={16} height={16} strokeWidth={1.5} aria-hidden />,
    path: "/onboarding-sequences",
    ocid: "nav.onboarding-sequences",
  },
  {
    label: "Test Labs",
    Icon: () => (
      <FlaskConical width={16} height={16} strokeWidth={1.5} aria-hidden />
    ),
    path: "/admin/ab-tests",
    ocid: "nav.ab-tests",
    badge: "New",
    badgeVariant: "new",
  },
  {
    label: "Notifications",
    Icon: () => <Bell width={16} height={16} strokeWidth={1.5} aria-hidden />,
    path: "/notifications",
    ocid: "nav.notifications",
  },
  {
    label: "Notification Analytics",
    Icon: () => <Bell width={16} height={16} strokeWidth={1.5} aria-hidden />,
    path: "/retention-analytics",
    ocid: "nav.retention-analytics",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "SaaS Metrics",
    Icon: () => (
      <TrendingUp width={16} height={16} strokeWidth={1.5} aria-hidden />
    ),
    path: "/saas-metrics",
    ocid: "nav.saas-metrics",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "Investor Report",
    Icon: () => (
      <FileText width={16} height={16} strokeWidth={1.5} aria-hidden />
    ),
    path: "/investor-report",
    ocid: "nav.investor-report",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "Competitor Intel",
    Icon: () => <Eye width={16} height={16} strokeWidth={1.5} aria-hidden />,
    path: "/competitor-intel",
    ocid: "nav.competitor-intel",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "Case Studies",
    Icon: () => (
      <Briefcase width={16} height={16} strokeWidth={1.5} aria-hidden />
    ),
    path: "/case-studies",
    ocid: "nav.case-studies",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "Content Calendar",
    Icon: () => (
      <CalendarDays width={16} height={16} strokeWidth={1.5} aria-hidden />
    ),
    path: "/content-calendar",
    ocid: "nav.content-calendar",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "Affiliate",
    Icon: () => <Users width={16} height={16} strokeWidth={1.5} aria-hidden />,
    path: "/affiliate",
    ocid: "nav.affiliate",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "SEO Generator",
    Icon: () => <Globe width={16} height={16} strokeWidth={1.5} aria-hidden />,
    path: "/seo-generator",
    ocid: "nav.seo-generator",
    badge: "New",
    badgeVariant: "new" as const,
  },
  {
    label: "Upgrade Plan",
    Icon: IconBilling,
    path: "/checkout",
    ocid: "nav.checkout",
  },
];

// ─── Growth Engine Group Component ───────────────────────────────────────────

function GrowthEngineGroup({
  group,
  isActive,
  collapsed,
  onClose,
}: {
  group: NavGroup;
  isActive: (path: string) => boolean;
  collapsed: boolean;
  onClose?: () => void;
}) {
  const isAnyActive = group.items.some((item) => isActive(item.path));
  const [open, setOpen] = useState(isAnyActive);

  return (
    <div>
      {/* Group header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-ocid="nav.growth-engine.group"
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group relative mt-2",
          isAnyActive
            ? "gradient-sidebar-active text-sidebar-primary"
            : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        )}
      >
        {isAnyActive && (
          <span className="absolute left-0 inset-y-1.5 w-0.5 rounded-full bg-sidebar-primary" />
        )}
        <span
          className={cn(
            "shrink-0",
            isAnyActive
              ? "text-sidebar-primary"
              : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70",
          )}
        >
          <group.GroupIcon />
        </span>
        {!collapsed && (
          <>
            <span className="flex-1 min-w-0 truncate text-left">
              {group.groupLabel}
            </span>
            <span
              className={cn(
                "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                "bg-primary/15 text-primary",
              )}
            >
              New
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              role="img"
              className={cn(
                "shrink-0 transition-transform duration-200",
                open ? "rotate-180" : "",
              )}
            >
              <title>chevron</title>
              <path
                d="M2 4 L6 8 L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>

      {/* Sub-items */}
      {(open || collapsed) && (
        <div
          className={
            collapsed
              ? "space-y-0.5"
              : "ml-4 border-l border-sidebar-border/40 pl-2 space-y-0.5 mt-0.5"
          }
        >
          {group.items.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                data-ocid={item.ocid}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth group relative",
                  active
                    ? "gradient-sidebar-active text-sidebar-primary"
                    : "text-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                {active && (
                  <span className="absolute left-0 inset-y-1.5 w-0.5 rounded-full bg-sidebar-primary" />
                )}
                <span
                  className={cn(
                    "shrink-0",
                    active
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/30 group-hover:text-sidebar-foreground/60",
                  )}
                >
                  <item.Icon />
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1 min-w-0 truncate text-xs">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                          item.badgeVariant === "ai"
                            ? "bg-primary/15 text-primary"
                            : "bg-success/15 text-success",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

interface SidebarProps {
  collapsed?: boolean;
  onClose?: () => void;
}

export function Sidebar({ collapsed = false, onClose }: SidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: subscription } = useSubscription();
  const { data: unreadCount = 0 } = useUnreadCount();

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  const planLabel =
    subscription?.plan === SubscriptionPlan.agency
      ? "Agency"
      : subscription?.plan === SubscriptionPlan.pro
        ? "Pro"
        : subscription?.plan === SubscriptionPlan.growth
          ? "Growth"
          : subscription?.plan === SubscriptionPlan.starter
            ? "Starter"
            : "Free";

  const isProPlan =
    subscription?.plan === SubscriptionPlan.pro ||
    subscription?.plan === SubscriptionPlan.agency;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-smooth shrink-0",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2.5 min-w-0 cursor-pointer"
          aria-label="GrowthOS home"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shrink-0 shadow-glow-primary">
            <IconCampaigns />
          </div>
          {!collapsed && (
            <span className="text-sidebar-foreground font-display font-semibold text-lg tracking-tight truncate">
              GrowthOS
            </span>
          )}
        </Link>
        {/* Mobile close */}
        {onClose && !collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-sidebar-foreground/50 hover:text-sidebar-foreground lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {PRIMARY_NAV.map((item) => {
          const active = isActive(item.path);
          const isNotificationsItem = item.path === "/notifications";
          return (
            <Link
              key={item.path}
              to={item.path}
              data-ocid={item.ocid}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group relative",
                active
                  ? "gradient-sidebar-active text-sidebar-primary"
                  : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              {/* Active left accent bar */}
              {active && (
                <span className="absolute left-0 inset-y-1.5 w-0.5 rounded-full bg-sidebar-primary" />
              )}

              <span
                className={cn(
                  "shrink-0",
                  active
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70",
                )}
              >
                <item.Icon />
              </span>

              {!collapsed && (
                <>
                  <span className="flex-1 min-w-0 truncate">{item.label}</span>
                  {/* Unread badge for notifications nav item */}
                  {isNotificationsItem && unreadCount > 0 ? (
                    <span
                      className="shrink-0 min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center px-1 tabular-nums"
                      aria-label={`${unreadCount} unread`}
                    >
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  ) : item.badge ? (
                    <span
                      className={cn(
                        "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                        item.badgeVariant === "ai"
                          ? "bg-primary/15 text-primary dark:text-primary"
                          : "bg-success/15 text-success dark:text-success",
                      )}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </>
              )}
            </Link>
          );
        })}

        {/* Growth Engine Group */}
        <GrowthEngineGroup
          group={GROWTH_ENGINE_GROUP}
          isActive={isActive}
          collapsed={collapsed}
          onClose={onClose}
        />
      </nav>

      {/* Plan badge + credits */}
      {!collapsed && (
        <div className="px-3 py-4 border-t border-sidebar-border shrink-0 space-y-3">
          <Link
            to="/billing"
            data-ocid="sidebar.subscription_badge"
            className="block group"
          >
            <div className="flex items-center justify-between rounded-lg bg-sidebar-accent border border-sidebar-border px-3 py-2.5 transition-smooth group-hover:border-sidebar-primary/30">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-0.5">
                  Current Plan
                </p>
                <p className="text-sm font-semibold text-sidebar-foreground truncate">
                  {planLabel}
                </p>
              </div>
              <Badge
                className={cn(
                  "text-[10px] shrink-0",
                  isProPlan
                    ? "bg-primary/20 text-primary border-primary/20"
                    : "bg-muted/20 text-muted-foreground border-muted/20",
                )}
                variant="outline"
              >
                <CreditCard className="w-2.5 h-2.5 mr-1" />
                {subscription?.subscriptionStatus === "active"
                  ? "Active"
                  : "Free"}
              </Badge>
            </div>
          </Link>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-sidebar-foreground/50">
              Lead Credits
            </span>
            <span
              data-ocid="sidebar.lead_credits"
              className="text-sm font-bold text-sidebar-primary tabular-nums"
            >
              {subscription ? Number(subscription.leadCredits) : 0}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
