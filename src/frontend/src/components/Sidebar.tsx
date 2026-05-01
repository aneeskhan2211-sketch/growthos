import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { CreditCard, X } from "lucide-react";
import type React from "react";
import { SubscriptionPlan } from "../backend";
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

// ─── Nav Items Config ─────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  Icon: () => React.ReactElement;
  path: string;
  ocid: string;
  badge?: string;
  badgeVariant?: "ai" | "new";
}

const PRIMARY_NAV: NavItem[] = [
  { label: "Dashboard", Icon: IconDashboard, path: "/", ocid: "nav.dashboard" },
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
];

// ─── Component ───────────────────────────────────────────────────────────────

interface SidebarProps {
  collapsed?: boolean;
  onClose?: () => void;
}

export function Sidebar({ collapsed = false, onClose }: SidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: subscription } = useSubscription();

  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);

  const planLabel =
    subscription?.plan === SubscriptionPlan.pro
      ? "Agency Pro"
      : subscription?.plan === SubscriptionPlan.starter
        ? "Starter"
        : subscription?.plan === SubscriptionPlan.enterprise
          ? "Enterprise"
          : "Free";

  const isProPlan =
    subscription?.plan === SubscriptionPlan.pro ||
    subscription?.plan === SubscriptionPlan.enterprise;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-smooth shrink-0",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shrink-0 shadow-glow-primary">
            <IconCampaigns />
          </div>
          {!collapsed && (
            <span className="text-sidebar-foreground font-display font-semibold text-lg tracking-tight truncate">
              GrowthOS
            </span>
          )}
        </div>
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
                  {item.badge && (
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
                  )}
                </>
              )}
            </Link>
          );
        })}
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
