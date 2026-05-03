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
import AppInfoPage from "./pages/AppInfoPage";
import CRMPage from "./pages/CRMPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import ClientsPage from "./pages/ClientsPage";
import DashboardPage from "./pages/DashboardPage";
import GrowthAdvisorPage from "./pages/GrowthAdvisorPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import LeadGenPage from "./pages/LeadGenPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";

import AccountSettingsProfilePage from "./pages/AccountSettingsProfilePage";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import DynamicSeoPage from "./pages/DynamicSeoPage";
import OnboardingSequencesPage from "./pages/OnboardingSequencesPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProposalsPage from "./pages/ProposalsPage";
import SEOPage from "./pages/SEOPage";
import SettingsPage from "./pages/SettingsPage";
import SplashPage from "./pages/SplashPage";
import TermsPage from "./pages/TermsPage";
import UserProfilePage from "./pages/UserProfilePage";
import WebsiteBuilderPage from "./pages/WebsiteBuilderPage";

const NotificationSettingsPage = lazy(
  () => import("./pages/NotificationSettingsPage"),
);

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
const InboxPage = lazy(() => import("./pages/InboxPage"));
const FABFlowPage = lazy(() => import("./pages/FABFlowPage"));
const FunnelDashboardPage = lazy(() => import("./pages/FunnelDashboardPage"));
const PaywallPage = lazy(() => import("./pages/PaywallPage"));
const ReferralPage = lazy(() => import("./pages/ReferralPage"));
const AutoAgencyPage = lazy(() => import("./pages/AutoAgencyPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const SalonLandingPage = lazy(() => import("./pages/SalonLandingPage"));
const ViralLoopPage = lazy(() => import("./pages/ViralLoopPage"));
const ChallengePage = lazy(() => import("./pages/ChallengePage"));
const TrustHubPage = lazy(() => import("./pages/TrustHubPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ABTestPage = lazy(() => import("./pages/ABTestPage"));
const RetentionAnalyticsPage = lazy(
  () => import("./pages/RetentionAnalyticsPage"),
);
const ViralLoopManagerPage = lazy(() => import("./pages/ViralLoopManagerPage"));

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

  if (!isAuthenticated) {
    // Redirect to /login for all unauthenticated access
    return <LoginPage />;
  }
  return <Outlet />;
}

const rootRoute = createRootRoute({ component: () => <Outlet /> });

// Public routes — outside AuthGuard
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/splash",
  component: SplashPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: OnboardingPage,
});

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
const clientDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/clients/$clientId",
  component: ClientDetailPage,
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
const userProfileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/profile",
  component: UserProfilePage,
});
const businessProfileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/profile/business",
  component: BusinessProfilePage,
});
const accountSettingsProfileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/settings/profile",
  component: AccountSettingsProfilePage,
});
const notificationSettingsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/settings/notifications",
  component: mkLazy(NotificationSettingsPage),
});
const inboxRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/inbox",
  component: mkLazy(InboxPage),
});
const fabRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/fab",
  component: mkLazy(FABFlowPage),
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
const funnelDashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/funnel-dashboard",
  component: mkLazy(FunnelDashboardPage),
});
const paywallRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/paywall",
  component: () => (
    <Suspense fallback={<LazyFallback />}>
      <PaywallPage />
    </Suspense>
  ),
});
const privacyPolicyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});
const termsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/terms",
  component: TermsPage,
});
const helpRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/help",
  component: HelpSupportPage,
});
const appInfoRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/app-info",
  component: AppInfoPage,
});
const referralRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/referral",
  component: mkLazy(ReferralPage),
});
const autoAgencyRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/auto-agency",
  component: mkLazy(AutoAgencyPage),
});
const marketplaceRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/marketplace",
  component: mkLazy(MarketplacePage),
});

// New routes: /salon-marketing-mumbai (public), /viral-loop (protected), /challenge (protected)
const salonLandingPublicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/salon-marketing-mumbai",
  component: mkLazy(SalonLandingPage),
});
const viralLoopRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/viral-loop",
  component: mkLazy(ViralLoopPage),
});
const challengeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/challenge",
  component: mkLazy(ChallengePage),
});
const trustHubRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/trust-hub",
  component: mkLazy(TrustHubPage),
});

// Public pricing route — accessible without auth
const pricingPublicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: mkLazy(PricingPage),
});

const onboardingSequencesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/onboarding-sequences",
  component: OnboardingSequencesPage,
});

const abTestRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/admin/ab-tests",
  component: mkLazy(ABTestPage),
});

const retentionAnalyticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/retention-analytics",
  component: mkLazy(RetentionAnalyticsPage),
});

const GrowthEngineAnalyticsPage = lazy(
  () => import("./pages/GrowthEngineAnalyticsPage"),
);
const growthEngineAnalyticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/growth-engine/analytics",
  component: mkLazy(GrowthEngineAnalyticsPage),
});

const AIOptimizerPage = lazy(() => import("./pages/AIOptimizerPage"));
const aiOptimizerRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/growth-engine/ai-optimizer",
  component: mkLazy(AIOptimizerPage),
});

const viralLoopManagerRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/growth-engine/viral-loop",
  component: mkLazy(ViralLoopManagerPage),
});

const SaasMetricsPage = lazy(() => import("./pages/SaasMetricsPage"));
const saasMetricsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/saas-metrics",
  component: mkLazy(SaasMetricsPage),
});

const WebsiteHealthPage = lazy(() => import("./pages/WebsiteHealthPage"));
const websiteHealthRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/website-health",
  component: mkLazy(WebsiteHealthPage),
});

const WebsiteHealthFixToolsPage = lazy(
  () => import("./pages/WebsiteHealthFixToolsPage"),
);
const websiteHealthFixToolsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/website-health/fix-tools",
  component: mkLazy(WebsiteHealthFixToolsPage),
});

const SalonMumbaiPage = lazy(() => import("./pages/SalonMumbaiPage"));
const salonMumbaiPublicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/salon-mumbai",
  component: mkLazy(SalonMumbaiPage),
});

// ─── New feature routes ───────────────────────────────────────────────────────

const StripeCheckoutPage = lazy(() => import("./pages/StripeCheckoutPage"));
const RazorpayCheckoutPage = lazy(() => import("./pages/RazorpayCheckoutPage"));
const checkoutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/checkout",
  component: mkLazy(RazorpayCheckoutPage),
});
const stripeCheckoutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/checkout-stripe",
  component: mkLazy(StripeCheckoutPage),
});

const NotificationCenterPage = lazy(
  () => import("./pages/NotificationCenterPage"),
);
const notificationCenterRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/notifications",
  component: mkLazy(NotificationCenterPage),
});

const CaseStudyBuilderPage = lazy(() => import("./pages/CaseStudyBuilderPage"));
const caseStudiesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/case-studies",
  component: mkLazy(CaseStudyBuilderPage),
});

const PublicCaseStudyPage = lazy(() => import("./pages/PublicCaseStudyPage"));
const publicCaseStudyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies/$shareToken",
  component: mkLazy(PublicCaseStudyPage),
});

const AffiliateCommissionPage = lazy(
  () => import("./pages/AffiliateCommissionPage"),
);
const affiliateRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/affiliate",
  component: mkLazy(AffiliateCommissionPage),
});

const CompetitorIntelPage = lazy(() => import("./pages/CompetitorIntelPage"));
const competitorIntelRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/competitor-intel",
  component: mkLazy(CompetitorIntelPage),
});

const ContentCalendarPage = lazy(() => import("./pages/ContentCalendarPage"));
const contentCalendarRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/content-calendar",
  component: mkLazy(ContentCalendarPage),
});

const BulkSeoGeneratorPage = lazy(() => import("./pages/BulkSeoGeneratorPage"));
const seoGeneratorRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/seo-generator",
  component: mkLazy(BulkSeoGeneratorPage),
});
const dynamicSeoPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/seo-page/$slug",
  component: DynamicSeoPage,
});

const InvestorReportPage = lazy(() => import("./pages/InvestorReportPage"));
const investorReportRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/investor-report",
  component: mkLazy(InvestorReportPage),
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  splashRoute,
  onboardingRoute,
  salonLandingPublicRoute,
  pricingPublicRoute,
  salonMumbaiPublicRoute,
  publicCaseStudyRoute,
  dynamicSeoPageRoute,
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
      clientDetailRoute,
      websiteBuilderRoute,
      growthAdvisorRoute,
      settingsRoute,
      notificationSettingsRoute,
      inboxRoute,
      fabRoute,
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
      funnelDashboardRoute,
      paywallRoute,
      privacyPolicyRoute,
      termsRoute,
      helpRoute,
      appInfoRoute,
      referralRoute,
      autoAgencyRoute,
      marketplaceRoute,
      viralLoopRoute,
      challengeRoute,
      trustHubRoute,
      onboardingSequencesRoute,
      abTestRoute,
      retentionAnalyticsRoute,
      growthEngineAnalyticsRoute,
      aiOptimizerRoute,
      viralLoopManagerRoute,
      saasMetricsRoute,
      websiteHealthRoute,
      websiteHealthFixToolsRoute,
      userProfileRoute,
      businessProfileRoute,
      accountSettingsProfileRoute,
      checkoutRoute,
      stripeCheckoutRoute,
      notificationCenterRoute,
      caseStudiesRoute,
      affiliateRoute,
      competitorIntelRoute,
      contentCalendarRoute,
      seoGeneratorRoute,
      investorReportRoute,
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
