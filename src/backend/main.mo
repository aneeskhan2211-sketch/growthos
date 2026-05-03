import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import T "types/core-data";
import OT "types/outreach-and-scraper";
import GT "types/gamification-and-onboarding";
import CT "types/compliance-and-ingestion";
import GA4T "types/ga4-integration";
import RT "types/referral";
import CoreDataMixin "mixins/core-data-api";
import OutreachAndScraperMixin "mixins/outreach-and-scraper-api";
import GamificationAndOnboardingMixin "mixins/gamification-and-onboarding-api";
import ComplianceAndIngestionMixin "mixins/compliance-and-ingestion-api";
import GrowthEngineMixin "mixins/growth-engine-api";
import GA4Mixin "mixins/ga4-integration-api";
import AT "types/analytics-and-tracking";
import AnalyticsAndTrackingMixin "mixins/analytics-and-tracking-api";
import ReferralMixin "mixins/referral-api";
import AAT "types/auto-agency";
import AutoAgencyMixin "mixins/auto-agency-api";
import VL "types/viral-loop-and-niche";
import ViralLoopAndNicheMixin "mixins/viral-loop-and-niche-api";
import RNT "types/retention-notifications";
import RetentionNotificationsMixin "mixins/retention-notifications-api";
import VGT "types/viral-growth-tracking";
import ViralGrowthTrackingMixin "mixins/viral-growth-tracking-api";
import GAIT "types/growth-engine-ai";
import GrowthEngineAIMixin "mixins/growth-engine-ai-api";
import SaasMetricsMixin "mixins/saas-metrics-api";
import CohortsSegmentsApiMixin "mixins/cohorts-segments-api";
import WHT "types/website-health";
import WebsiteHealthMixin "mixins/website-health-api";
import CSOPT "types/content-seo-onboarding-pdf-pagespeed";
import ContentSeoOnboardingPdfPagespeedMixin "mixins/content-seo-onboarding-pdf-pagespeed-api";
import PNW "types/payments-notifications-whatsapp";
import PaymentsNotificationsWhatsappMixin "mixins/payments-notifications-whatsapp-api";
import CSAT "types/case-studies-affiliate-competitor";
import CaseStudiesAffiliateMixin "mixins/case-studies-affiliate-competitor-api";





actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── Core data state ───────────────────────────────────────────────────────
  let leads = List.empty<T.Lead>();
  let notes = List.empty<T.Note>();
  let proposals = List.empty<T.Proposal>();
  let clients = List.empty<T.Client>();
  let templates = Map.empty<Common.ClientId, T.WebsiteTemplate>();
  let suggestions = List.empty<T.GrowthSuggestion>();
  let subscriptions = Map.empty<Principal, T.UserSubscription>();

  let counters : Common.Counters = {
    var nextLeadId = 0;
    var nextNoteId = 0;
    var nextProposalId = 0;
    var nextClientId = 0;
    var nextTemplateId = 0;
    var nextSuggestionId = 0;
    var nextAutoAgencyActionId = 0;
    var nextPlanId = 0;
    var nextListingId = 0;
    var nextReportId = 0;
  };

  include CoreDataMixin(
    accessControlState,
    leads,
    notes,
    proposals,
    clients,
    templates,
    suggestions,
    subscriptions,
    counters,
  );

  // ── Outreach & scraper state ──────────────────────────────────────────────
  let outreachMessages = List.empty<OT.OutreachMessage>();
  let scraperJobs = List.empty<OT.ScraperJob>();
  let outreachCampaigns = List.empty<OT.OutreachCampaign>();

  let outreachCounters : OT.OutreachCounters = {
    var nextOutreachMessageId = 0;
    var nextScraperJobId = 0;
    var nextOutreachCampaignId = 0;
  };

  include OutreachAndScraperMixin(
    outreachMessages,
    scraperJobs,
    outreachCampaigns,
    outreachCounters,
  );

  // ── Gamification & onboarding state ──────────────────────────────────────
  let onboardingPrefs = Map.empty<Principal, GT.OnboardingPrefs>();
  let gamificationStates = Map.empty<Principal, GT.GamificationState>();

  include GamificationAndOnboardingMixin(onboardingPrefs, gamificationStates);

  // ── Compliance & ingestion state ──────────────────────────────────────────
  let consentLogs = List.empty<CT.ConsentLog>();
  let importRecords = List.empty<CT.ImportRecord>();
  let senderIdentities = List.empty<CT.SenderIdentity>();
  let deliveryStats = List.empty<CT.DeliveryStats>();

  let complianceCounters : CT.ComplianceCounters = {
    var nextConsentLogId = 0;
    var nextImportId = 0;
    var nextSenderIdentityId = 0;
    var nextDeliveryStatId = 0;
  };

  include ComplianceAndIngestionMixin(
    consentLogs,
    importRecords,
    senderIdentities,
    deliveryStats,
    complianceCounters,
  );

  // ── Growth engine state ───────────────────────────────────────────────────
  include GrowthEngineMixin();

  // ── GA4 integration state ─────────────────────────────────────────────────
  let ga4Credentials : { var value : ?GA4T.GA4Credentials } = { var value = null };
  let ga4LastUpdated : { var value : ?Int } = { var value = null };

  include GA4Mixin(ga4Credentials, ga4LastUpdated);

  // ── Analytics & tracking state ────────────────────────────────────────────
  let analyticsEvents = List.empty<AT.AnalyticsEvent>();
  let heatmapEvents = List.empty<AT.HeatmapEvent>();
  let retentionMap = Map.empty<Text, AT.RetentionData>();

  let analyticsCounters : AT.AnalyticsCounters = {
    var nextEventId = 0;
    var nextHeatmapId = 0;
  };

  include AnalyticsAndTrackingMixin(
    analyticsEvents,
    heatmapEvents,
    retentionMap,
    analyticsCounters,
  );

  // ── Referral state ────────────────────────────────────────────────────────
  let referrals = List.empty<RT.ReferralRecord>();

  let referralCounters : RT.ReferralCounters = {
    var nextReferralId = 0;
  };

  include ReferralMixin(
    referrals,
    referralCounters,
    analyticsEvents,
    analyticsCounters,
    retentionMap,
  );

  // ── Auto Agency state ─────────────────────────────────────────────────────
  let agencyState : AAT.AutoAgencyState = {
    var toggleEnabled = false;
    var lastRunTime = 0;
    var nextRunTime = 0;
    var dailyLeadsGenerated = 0;
    var dailyOutreachSent = 0;
    var dailyFollowupsSent = 0;
    var runCount = 0;
    var lastActivityFeed = [];
  };

  let dealSuggestions = List.empty<AAT.DealSuggestion>();

  let accountability : AAT.AccountabilityState = {
    var dailyLeadsContacted = 0;
    var dailyFollowupsDone = 0;
    var dailyDealsClosed = 0;
    var targetLeads = 10;
    var targetFollowups = 5;
    var targetDeals = 1;
    var currentStreak = 0;
    var lastTaskDate = 0;
    var streakMilestones = [];
    var todayComplete = false;
  };

  let growthPlans = Map.empty<Common.ClientId, AAT.ClientGrowthPlan>();
  let autoReports = Map.empty<Common.ClientId, AAT.AutoReport>();
  let marketplaceListings = List.empty<AAT.MarketplaceListing>();
  let performanceScores = Map.empty<Text, AAT.PerformanceScore>();

  let autoAgencyCounters : AAT.AutoAgencyCounters = {
    var nextAutoAgencyActionId = 0;
    var nextSuggestionId = 0;
    var nextPlanId = 0;
    var nextListingId = 0;
    var nextReportId = 0;
  };

  include AutoAgencyMixin(
    agencyState,
    dealSuggestions,
    accountability,
    growthPlans,
    autoReports,
    marketplaceListings,
    performanceScores,
    autoAgencyCounters,
    leads,
  );

  // ── Viral Loop & Niche Domination state ───────────────────────────────────
  let socialProofFeed = List.empty<VL.SocialProofEntry>();
  let challengeRecords = Map.empty<Text, VL.WeeklyChallengeRecord>();
  let milestoneClaims = List.empty<VL.MilestoneClaim>();
  let auditLeads = List.empty<VL.AuditLead>();
  let nicheFunnelEvents = List.empty<VL.NicheFunnelEvent>();

  let viralLoopCounters : VL.ViralLoopCounters = {
    var nextSocialProofId = 0;
    var nextAuditLeadId = 0;
    var nextNicheFunnelEventId = 0;
  };

  // Seed 5 Mumbai challenge records for demo leaderboard (week 2026-W18)
  do {
    let seedWeek = "2026-W18";
    let seeds : [(Text, Text, Nat)] = [
      ("user_aman_mumbai",    "Aman Sharma",    142),
      ("user_neha_mumbai",    "Neha Kapoor",    118),
      ("user_ravi_mumbai",    "Ravi Patel",      97),
      ("user_priya_mumbai",   "Priya Desai",     74),
      ("user_arjun_mumbai",   "Arjun Mehta",     55),
    ];
    for ((uid, name, leads) in seeds.values()) {
      let key = uid # ":" # seedWeek;
      challengeRecords.add(key, {
        userId = uid;
        displayName = name;
        city = "mumbai";
        isoWeek = seedWeek;
        leadsGenerated = leads;
        rewardClaimed = false;
      });
    };
  };

  include ViralLoopAndNicheMixin(
    socialProofFeed,
    challengeRecords,
    milestoneClaims,
    auditLeads,
    nicheFunnelEvents,
    viralLoopCounters,
    referrals,
    analyticsEvents,
    analyticsCounters,
  );

  // ── Retention & Notifications state ───────────────────────────────────────
  let notificationEvents = List.empty<RNT.NotificationEvent>();
  let notificationPrefs = Map.empty<Text, RNT.UserNotificationPrefs>();
  // Maps userId → lastSessionAt (Int nanoseconds) — mirrors retentionMap.lastSessionAt
  // for frequency-cap inactivity checks without coupling to AT types
  let retentionLastSessionMap = Map.empty<Text, Int>();

  let notificationCounters : RNT.RetentionNotificationCounters = {
    var nextNotificationEventId = 0;
  };

  include RetentionNotificationsMixin(
    notificationEvents,
    notificationPrefs,
    retentionLastSessionMap,
    notificationCounters,
    consentLogs,
    complianceCounters,
  );

  // ── Viral Growth Tracking state ───────────────────────────────────────────
  let trafficAttributions = List.empty<VGT.TrafficSourceAttribution>();
  let vgtChallengeParticipants = List.empty<VGT.ChallengeParticipant>();
  let featureUnlockSessions = List.empty<VGT.FeatureUnlockSession>();
  let nudgeDeliveries = List.empty<VGT.NudgeDelivery>();
  let referralFunnelEvents = List.empty<VGT.ReferralFunnelEvent>();

  let viralGrowthCounters : VGT.ViralGrowthTrackingCounters = {
    var nextNudgeDeliveryId = 0;
    var nextReferralFunnelEventId = 0;
  };

  include ViralGrowthTrackingMixin(
    trafficAttributions,
    vgtChallengeParticipants,
    featureUnlockSessions,
    nudgeDeliveries,
    referralFunnelEvents,
    viralGrowthCounters,
    referrals,
  );

  // ── Growth Engine AI state ────────────────────────────────────────────────
  let nudgeEvents    = List.empty<GAIT.NudgeEvent>();
  let nudgeCounters  : GAIT.NudgeCounters = { var nextNudgeEventId = 0 };
  let pricingRecs    = Map.empty<Text, GAIT.PricingRecommendation>();
  let paywallStates  = Map.empty<Text, GAIT.PaywallState>();
  let abAssignments  = Map.empty<Text, GAIT.AbAssignment>();
  let abResults      = Map.empty<Text, GAIT.AbTestResult>();

  include GrowthEngineAIMixin(
    nudgeEvents,
    nudgeCounters,
    pricingRecs,
    paywallStates,
    abAssignments,
    abResults,
    analyticsEvents,
  );

  // ── SaaS Metrics state ────────────────────────────────────────────────────
  let subscriptionEvents       = List.empty<AT.SubscriptionEvent>();
  let marketingSpendRecords    = List.empty<AT.MarketingSpend>();
  let subscriptionEventCounter : { var value : Nat } = { var value = 0 };
  let marketingSpendCounter    : { var value : Nat } = { var value = 0 };

  include SaasMetricsMixin(
    subscriptionEvents,
    marketingSpendRecords,
    subscriptionEventCounter,
    marketingSpendCounter,
    analyticsEvents,
  );

  // ── Cohorts & Segments state ──────────────────────────────────────────────
  include CohortsSegmentsApiMixin(
    analyticsEvents,
    subscriptionEvents,
    nudgeEvents,
    retentionMap,
  );

  // ── Content / SEO / Onboarding / PDF / PageSpeed state ────────────────────
  let contentCalendars     = List.empty<CSOPT.ContentCalendar>();
  let contentCounters      : CSOPT.ContentCounters = { var nextCalendarId = 0 };
  let seoPages             = List.empty<CSOPT.SeoPage>();
  let seoCounters          : CSOPT.SeoCounters = { var nextSeoPageId = 0 };
  let tourStates           = Map.empty<Principal, CSOPT.OnboardingTourStateInternal>();
  let latestReport         : { var value : ?CSOPT.InvestorReport } = { var value = null };
  let pageSpeedHistory     = List.empty<CSOPT.PageSpeedResult>();

  include ContentSeoOnboardingPdfPagespeedMixin(
    contentCalendars,
    contentCounters,
    seoPages,
    seoCounters,
    tourStates,
    latestReport,
    pageSpeedHistory,
  );

    // ── Case Studies / Affiliate / Competitor state ────────────────────
  let caseStudies       = List.empty<CSAT.CaseStudy>();
  let commissions       = List.empty<CSAT.CommissionRecord>();
  let payoutRequests    = List.empty<CSAT.PayoutRequest>();
  let competitorReports = Map.empty<Text, CSAT.CompetitorIntelReport>();
  let competitorConfigs = Map.empty<Text, CSAT.SavedCompetitorConfig>();
  let caseStudyCounters : CSAT.CaseStudyCounters = {
    var nextCaseStudyId  = 0;
    var nextCommissionId = 0;
    var nextPayoutId     = 0;
  };

  include CaseStudiesAffiliateMixin(
    caseStudies,
    commissions,
    payoutRequests,
    competitorReports,
    competitorConfigs,
    caseStudyCounters,
    referrals,
  );

// ── Website Health & Growth Score state ───────────────────────────────────
  let whAudits      = List.empty<WHT.AuditRecord>();
  let whScanLimits  = Map.empty<Principal, WHT.ScanLimitRecord>();
  let whCounters    : WHT.WebsiteHealthCounters = { var nextAuditId = 0 };
  let whMonitors    = Map.empty<Text, WHT.MonitorRecord>();
  let whEvents      = List.empty<WHT.WHEvent>();

  // subscriptions is already declared above as Map.Map<Principal, T.UserSubscription>.
  // The mixin expects Map.Map<Principal, { planTier : Common.PlanTier }>.
  // Since Motoko structural typing matches record sub-types, we pass subscriptions directly
  // by creating a shadow map with the required shape.
  let whSubscriptions = Map.empty<Principal, { planTier : Common.PlanTier }>();

  include WebsiteHealthMixin(
    whAudits,
    whScanLimits,
    whCounters,
    whSubscriptions,
    whMonitors,
    whEvents,
  );
  // ── Payments, Notifications & WhatsApp/WATI state ─────────────────────────
  let razorpayKeyId     : { var value : Text } = { var value = "rzp_test_REPLACE_KEY_ID" };
  let razorpayKeySecret : { var value : Text } = { var value = "REPLACE_KEY_SECRET" };
  let paymentRecords  = Map.empty<Principal, PNW.UserPaymentRecord>();
  let pnwNotifications = List.empty<PNW.NotificationRecord>();
  let notifCounters   : PNW.NotificationCounters = { var nextNotificationId = 0 };
  let watiConfigStore : { var value : ?PNW.WatiConfig } = { var value = null };
  let watiConsents    = Map.empty<Text, PNW.WatiConsent>();
  let watiMessages    = List.empty<PNW.WatiMessage>();
  let watiCounters    : PNW.WatiCounters = { var nextWatiMessageId = 0 };

  include PaymentsNotificationsWhatsappMixin(
    paymentRecords,
    razorpayKeyId,
    razorpayKeySecret,
    pnwNotifications,
    notifCounters,
    watiConfigStore,
    watiConsents,
    watiMessages,
    watiCounters,
  );
};
