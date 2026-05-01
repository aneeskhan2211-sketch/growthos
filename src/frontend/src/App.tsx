import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import AdsPage from "./pages/AdsPage";
import CRMPage from "./pages/CRMPage";
import ClientsPage from "./pages/ClientsPage";
import DashboardPage from "./pages/DashboardPage";
import GrowthAdvisorPage from "./pages/GrowthAdvisorPage";
import LeadGenPage from "./pages/LeadGenPage";
import LoginPage from "./pages/LoginPage";
import ProposalsPage from "./pages/ProposalsPage";
import SEOPage from "./pages/SEOPage";
import SettingsPage from "./pages/SettingsPage";
import WebsiteBuilderPage from "./pages/WebsiteBuilderPage";

const OutreachPage = lazy(() => import("./pages/OutreachPage"));
const CommandCenterPage = lazy(() => import("./pages/CommandCenterPage"));
const DealCloserPage = lazy(() => import("./pages/DealCloserPage"));
const GrowthHubPage = lazy(() => import("./pages/GrowthHubPage"));
const ImportPage = lazy(() => import("./pages/ImportPage"));
const CompliancePage = lazy(() => import("./pages/CompliancePage"));
const DeliverabilityPage = lazy(() => import("./pages/DeliverabilityPage"));
const RevenuePlanPage = lazy(() => import("./pages/RevenuePlanPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const SocialHubPage = lazy(() => import("./pages/SocialHubPage"));
const AutomationPage = lazy(() => import("./pages/AutomationPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const BillingPage = lazy(() => import("./pages/BillingPage"));

const LazyFallback = () => (
  <div className="flex h-64 items-center justify-center">
    <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

function AuthGuard() {
  const { isAuthenticated, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading GrowthOS…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <LoginPage />;
  return <Outlet />;
}

const rootRoute = createRootRoute({ component: () => <Outlet /> });
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthGuard,
});
const layoutRoute = createRoute({
  getParentRoute: () => authRoute,
  id: "layout",
  component: Layout,
});

const mkLazy =
  (Component: React.LazyExoticComponent<() => React.ReactElement>) => () => (
    <Suspense fallback={<LazyFallback />}>
      <Component />
    </Suspense>
  );

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: DashboardPage,
});
const leadsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/leads",
  component: LeadGenPage,
});
const crmRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/crm",
  component: CRMPage,
});
const proposalsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/proposals",
  component: ProposalsPage,
});
const seoRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/seo",
  component: SEOPage,
});
const adsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/ads",
  component: AdsPage,
});
const clientsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/clients",
  component: ClientsPage,
});
const websiteBuilderRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/website-builder",
  component: WebsiteBuilderPage,
});
const growthAdvisorRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/growth-advisor",
  component: GrowthAdvisorPage,
});
const settingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/settings",
  component: SettingsPage,
});
const outreachRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/outreach",
  component: mkLazy(OutreachPage),
});
const commandCenterRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/command-center",
  component: mkLazy(CommandCenterPage),
});
const dealCloserRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/deal-closer",
  component: mkLazy(DealCloserPage),
});
const growthHubRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/growth-hub",
  component: mkLazy(GrowthHubPage),
});
const importRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/import",
  component: mkLazy(ImportPage),
});
const complianceRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/compliance",
  component: mkLazy(CompliancePage),
});
const deliverabilityRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/deliverability",
  component: mkLazy(DeliverabilityPage),
});
const revenuePlanRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/revenue-plan",
  component: mkLazy(RevenuePlanPage),
});
const analyticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/analytics",
  component: mkLazy(AnalyticsPage),
});
const socialHubRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/social-hub",
  component: mkLazy(SocialHubPage),
});
const automationRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/automation",
  component: mkLazy(AutomationPage),
});
const reportsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/reports",
  component: mkLazy(ReportsPage),
});
const billingRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/billing",
  component: mkLazy(BillingPage),
});

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([
    layoutRoute.addChildren([
      dashboardRoute,
      leadsRoute,
      crmRoute,
      outreachRoute,
      proposalsRoute,
      seoRoute,
      adsRoute,
      clientsRoute,
      websiteBuilderRoute,
      growthAdvisorRoute,
      settingsRoute,
      commandCenterRoute,
      dealCloserRoute,
      growthHubRoute,
      importRoute,
      complianceRoute,
      deliverabilityRoute,
      revenuePlanRoute,
      analyticsRoute,
      socialHubRoute,
      automationRoute,
      reportsRoute,
      billingRoute,
    ]),
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
