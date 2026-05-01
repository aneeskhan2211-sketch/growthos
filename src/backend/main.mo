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
import CoreDataMixin "mixins/core-data-api";
import OutreachAndScraperMixin "mixins/outreach-and-scraper-api";
import GamificationAndOnboardingMixin "mixins/gamification-and-onboarding-api";
import ComplianceAndIngestionMixin "mixins/compliance-and-ingestion-api";
import GrowthEngineMixin "mixins/growth-engine-api";
import GA4Mixin "mixins/ga4-integration-api";



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
};
