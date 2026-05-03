import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface LeaderboardEntry {
    leadsCount: bigint;
    displayName: string;
    city: string;
    userId: string;
    rank: bigint;
    badge: ChallengeBadge;
}
export type LeadId = bigint;
export type ConsentLogId = bigint;
export interface ScraperJob {
    id: bigint;
    status: string;
    completedAt?: Timestamp;
    totalFound: bigint;
    city: string;
    createdAt: Timestamp;
    leadsGenerated: bigint;
    progress: bigint;
    niche: string;
    processed: bigint;
}
export interface PlanLimits {
    seoChecklist: boolean;
    premiumAutomation: boolean;
    campaignBuilder: boolean;
    unlimitedLeads: boolean;
    advancedAnalytics: boolean;
    whiteLabelReports: boolean;
    crmPipeline: boolean;
    dailyLeads: bigint;
    autoFollowUp: boolean;
    aiProposalGenerator: boolean;
    teamAccess: boolean;
    aiPitchGenerator: boolean;
}
export interface CreateProposalInput {
    businessName: string;
    leadId: LeadId;
    niche: string;
}
export interface CreateOutreachMessageInput {
    personalizedMessage: string;
    businessName: string;
    templateType: string;
    dayNumber: bigint;
    leadId: LeadId;
    channel: string;
    detectedProblem: string;
    scheduledAt: Timestamp;
}
export interface UserActivityScore {
    lastMessageSentAt?: bigint;
    computedAt: bigint;
    userId: string;
    lastProposalCreatedAt?: bigint;
    lastReplyReceivedAt?: bigint;
    segment: ActivitySegment;
}
export interface ResultMetric {
    after: string;
    metricLabel: string;
    before: string;
}
export interface SenderIdentity {
    id: SenderIdentityId;
    reputationScore: bigint;
    warmupPhase: WarmupPhase;
    createdAt: Timestamp;
    totalReplied: bigint;
    totalSent: bigint;
    totalDelivered: bigint;
    totalBounced: bigint;
    blockedCount: bigint;
    senderType: SenderType;
    identifier: string;
    totalOptOut: bigint;
}
export interface RetentionAnalytics {
    totalNotificationsSent: bigint;
    byTriggerType: Array<TriggerStats>;
    totalActionsCompleted: bigint;
    conversionRate: number;
    totalOpened: bigint;
    returnRate: number;
    cohortByDay: Array<CohortDayStats>;
    openRate: number;
    byCopyType: Array<CopyTypeStats>;
}
export interface UserJourneyTimeline {
    userId: string;
    events: Array<UserJourneyEvent>;
}
export interface NotificationRecord {
    id: string;
    title: string;
    actionUrl?: string;
    metadata?: string;
    body: string;
    userId: string;
    createdAt: bigint;
    type: string;
    isRead: boolean;
}
export interface TriggerStats {
    actionCount: bigint;
    count: bigint;
    actionRate: number;
    triggerType: TriggerType;
    openCount: bigint;
    openRate: number;
}
export interface Lead {
    id: LeadId;
    status: LeadStatus;
    scoreBreakdown?: LeadScoreBreakdown;
    consentStatus?: ConsentStatus;
    city: string;
    createdAt: Timestamp;
    leadScore: bigint;
    businessName: string;
    website: string;
    attemptCount: bigint;
    updatedAt: Timestamp;
    referredBy?: LeadId;
    address: string;
    notes: string;
    leadSource: string;
    rating: number;
    phone: string;
    optedOut: boolean;
    priorityTag?: PriorityTag;
    industry: string;
}
export interface GrowthSuggestion {
    id: SuggestionId;
    title: string;
    clientId: ClientId;
    estimatedImpact: string;
    description: string;
    implemented: boolean;
    category: string;
    priority: SuggestionPriority;
    dismissed: boolean;
    weekOf: Timestamp;
}
export interface FunnelMetrics {
    paidUsers: bigint;
    freeToPaidConversion: number;
    steps: Array<FunnelStep>;
    totalUsers: bigint;
}
export interface RazorpayOrder {
    receipt: string;
    orderId: string;
    currency: string;
    amount: bigint;
}
export interface OutreachMessage {
    id: bigint;
    status: string;
    deliveredAt?: Timestamp;
    personalizedMessage: string;
    bounceReason: string;
    businessName: string;
    sentAt?: Timestamp;
    templateType: string;
    retryCount: bigint;
    dayNumber: bigint;
    leadId: LeadId;
    repliedAt?: Timestamp;
    channel: string;
    detectedProblem: string;
    senderId?: SenderIdentityId;
    consentChecked: boolean;
    scheduledAt: Timestamp;
}
export interface DeliveryStats {
    id: DeliverabilityStatId;
    date: string;
    optOutCount: bigint;
    blockedCount: bigint;
    deliveredCount: bigint;
    identityId: SenderIdentityId;
    bouncedCount: bigint;
    repliedCount: bigint;
}
export interface CohortRetentionRow {
    d1: number;
    d7: number;
    d30: number;
    d60: number;
    retainedD1: bigint;
    retainedD7: bigint;
    week: string;
    cohortSize: bigint;
    retainedD30: bigint;
    retainedD60: bigint;
}
export interface ChallengeParticipant {
    leadsCount: bigint;
    isoWeek: string;
    displayName: string;
    city: string;
    userId: string;
    joinedAt: Timestamp;
    rank: bigint;
    rewarded: boolean;
}
export interface GrowthReport {
    id: GrowthReportId;
    clientId: bigint;
    revenueStrategies: Array<string>;
    nextActions: Array<string>;
    createdAt: bigint;
    leadsGenerated: bigint;
    conversionRate: bigint;
    revenueImpact: bigint;
    monthOf: string;
    marketingSuggestions: Array<string>;
    weeklyActions: Array<WeeklyAction>;
    reportNarrative: string;
    weekOf: string;
}
export interface CheckoutSession {
    url: string;
    sessionId: string;
}
export interface WeeklyReportData {
    url: string;
    resolvedIssueCount: bigint;
    scoreDelta: bigint;
    userId: Principal;
    generatedAt: Timestamp;
    topRecommendation: string;
    newIssueCount: bigint;
    latestScore: bigint;
    previousScore: bigint;
}
export type ProposalId = bigint;
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type SenderIdentityId = bigint;
export interface Proposal {
    id: ProposalId;
    generatedAt: Timestamp;
    seoStrategy: string;
    businessName: string;
    leadId: LeadId;
    niche: string;
    websiteStrategy: string;
    adsStrategy: string;
    pricingBreakdown: string;
}
export interface MilestoneInfo {
    status: MilestoneStatus;
    title: string;
    expiresAt?: Timestamp;
    activatedAt?: Timestamp;
    currentInvites: bigint;
    description: string;
    milestoneId: MilestoneId;
    inviteThreshold: bigint;
}
export interface ImportRowResult {
    status: ImportRowStatus;
    city: string;
    name: string;
    rowIndex: bigint;
    email: string;
    website: string;
    category: string;
    phone: string;
    reason: string;
}
export interface CopyTypeStats {
    actionCount: bigint;
    count: bigint;
    actionRate: number;
    openCount: bigint;
    copyType: CopyType;
    openRate: number;
}
export interface WatiConsent {
    optOutAt?: bigint;
    userId: string;
    consentGiven: boolean;
    consentAt: bigint;
    phone: string;
}
export interface ConversionScript {
    id: ConversionScriptId;
    serviceType: string;
    discoveryQuestions: Array<string>;
    opener: string;
    scriptType: ScriptType;
    createdAt: bigint;
    painPoint: string;
    budgetTier: string;
    valueProp: string;
    closingTalk: string;
    objectionHandlers: Array<{
        softResponse: string;
        directResponse: string;
        objection: string;
    }>;
}
export interface CommissionRecord {
    id: string;
    status: string;
    referredUserId: string;
    createdAt: bigint;
    referrerId: string;
    commissionAmount: bigint;
    planAmount: bigint;
    commissionRate: number;
    paidAt?: bigint;
    planTier: string;
}
export interface UpdateClientMetricsInput {
    id: ClientId;
    metrics: ClientMetrics;
    reportDate: Timestamp;
}
export interface UpdateLeadInput {
    id: LeadId;
    status: LeadStatus;
    city: string;
    leadScore: bigint;
    businessName: string;
    website: string;
    address: string;
    notes: string;
    rating: number;
    phone: string;
    industry: string;
}
export interface RevenuePrediction {
    monthlyEstimate: bigint;
    pipelineValue: bigint;
    generatedAt: bigint;
    hotLeadsCount: bigint;
    predictionBasis: string;
    missedOppCount: bigint;
    weeklyEstimate: bigint;
    closingThisWeek: bigint;
}
export interface NudgeDelivery {
    id: bigint;
    userId: string;
    sentAt: Timestamp;
    userSegment: UserSegment;
    actionTakenAt?: Timestamp;
    nudgeType: NudgeType;
    converted: boolean;
}
export interface LandingPage {
    id: LandingPageId;
    status: LandingPageStatus;
    city: string;
    createdAt: bigint;
    serviceDescription: string;
    publishedAt?: bigint;
    estimatedConversionRate: bigint;
    estimatedLeadScore: bigint;
    targetBudget: string;
    niche: LandingPageNiche;
    leadsCaptured: bigint;
    sections: LandingPageSection;
}
export interface DealSuggestion {
    suggestionId: string;
    pricingTier: string;
    createdAt: bigint;
    closeProbability: bigint;
    leadId: LeadId;
    suggestedPitch: string;
    suggestedPrice: bigint;
    bestContactTime: string;
}
export interface CreateOutreachCampaignInput {
    businessName: string;
    channels: Array<string>;
    leadId: LeadId;
}
export interface StripePlan {
    id: string;
    interval: string;
    name: string;
    currency: string;
    amount: bigint;
}
export interface LeadScoreBreakdown {
    seo: bigint;
    reviews: bigint;
    social: bigint;
    domainAge: bigint;
    website: bigint;
}
export type AbVariantId = string;
export interface WhatsAppTemplate {
    id: WhatsAppTemplateId;
    status: WhatsAppTemplateStatus;
    body: string;
    approvedAt?: bigint;
    name: string;
    createdAt: bigint;
    usageCount: bigint;
    rejectionReason?: string;
    submittedAt?: bigint;
    variables: Array<string>;
    category: WhatsAppTemplateCategory;
    replyRate: bigint;
}
export interface FeatureUnlockSession {
    expiresAt: Timestamp;
    unlockedAt: Timestamp;
    userId: string;
    usageCount: bigint;
    featureName: GatedFeatureName;
}
export interface LtvBreakdown {
    byTier: Array<TierLtv>;
    blendedLtv: bigint;
}
export interface TierLtv {
    ltv: bigint;
    avgRetentionMonths: number;
    tier: PlanTier;
    amountRs: bigint;
    userCount: bigint;
}
export type TemplateId = bigint;
export interface CreateLeadInput {
    city: string;
    leadScore: bigint;
    businessName: string;
    website: string;
    address: string;
    notes: string;
    rating: number;
    phone: string;
    industry: string;
}
export interface CreateClientInput {
    businessName: string;
    leadId: LeadId;
    startDate: Timestamp;
}
export interface CaseStudyUpdate {
    clientCity?: string;
    clientName?: string;
    testimonialQuote?: string;
    clientNiche?: string;
    resultMetrics?: Array<ResultMetric>;
    actionsToken?: Array<string>;
    problemStatement?: string;
}
export interface UserChurnRiskRow {
    userId: Principal;
    risk: ChurnRisk;
    openPlanRevenue: bigint;
    daysSinceLastAction: bigint;
    openPlan: PlanTier;
    lastEventType: string;
}
export interface EventDrillDown {
    totalCount: bigint;
    nextEventBreakdown: Array<[string, bigint, number]>;
    eventName: string;
}
export interface CreateNoteInput {
    content: string;
    dueDate?: Timestamp;
    noteType: NoteType;
    leadId: LeadId;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface AutoAgencyStateView {
    dailyOutreachSent: bigint;
    toggleEnabled: boolean;
    dailyLeadsGenerated: bigint;
    runCount: bigint;
    lastActivityFeed: Array<AutoAgencyAction>;
    lastRunTime: bigint;
    nextRunTime: bigint;
    dailyFollowupsSent: bigint;
}
export type LandingPageId = bigint;
export interface NudgePerformanceMetrics {
    totalActedOn: bigint;
    actionRatePct: number;
    variantType: NudgeVariantType;
    totalSent: bigint;
    variantId: string;
    conversionLiftPct: number;
    totalOpened: bigint;
    openRatePct: number;
}
export type ClientId = bigint;
export interface FinalizedChallengeResult {
    creditsAwarded: bigint;
    isoWeek: string;
    displayName: string;
    city: string;
    userId: string;
    finalRank: bigint;
    badgeAwarded: string;
}
export interface GrowthOverview {
    dau: bigint;
    mau: bigint;
    wau: bigint;
    retentionD30: number;
    computedAt: bigint;
    mrrEstimatedInr: bigint;
    retentionD1: number;
    retentionD7: number;
    newSignupsLast30: bigint;
    newSignupsLast7: bigint;
    freeToPaidConversionPct: number;
}
export interface RawMetrics {
    hasContactForm: boolean;
    hasOpeningHours: boolean;
    hasHSTS: boolean;
    robotsTxtFound: boolean;
    imagesMissingAlt: bigint;
    hasH1: boolean;
    hasAddress: boolean;
    hasTestimonials: boolean;
    titleLength: bigint;
    sitemapFound: boolean;
    hasXContentType: boolean;
    imageCount: bigint;
    hasViewport: boolean;
    internalLinkCount: bigint;
    hasWhatsAppLink: boolean;
    httpsEnabled: boolean;
    hasTitle: boolean;
    hasCanonical: boolean;
    hasPhoneNumber: boolean;
    hasCTA: boolean;
    hasBusinessName: boolean;
    renderBlockingScripts: bigint;
    hasXFrame: boolean;
    hasMixedContent: boolean;
    hasGoogleMap: boolean;
    metaDescLength: bigint;
    hasMediaQueries: boolean;
    hasMetaDesc: boolean;
}
export interface PerformanceScore {
    activityScore: bigint;
    overallScore: bigint;
    userId: string;
    rank: string;
    estimatedMonthlyRevenue: bigint;
    updatedAt: bigint;
    conversionRate: bigint;
    percentileRank: bigint;
    revenueScore: bigint;
}
export interface TemplateSections {
    cta: string;
    features: string;
    hero: string;
    testimonials: string;
    footer: string;
}
export interface ConsentLog {
    id: ConsentLogId;
    status: ConsentStatus;
    messageTemplate: string;
    userId: string;
    email: string;
    notes: string;
    timestamp: Timestamp;
    phone: string;
    consentType: ConsentType;
}
export type AuditId = bigint;
export interface SeoPageRequest {
    city: string;
    niche: string;
}
export interface OnboardingPrefs {
    city: string;
    targetBudget: bigint;
    niche: string;
    completedOnboarding: boolean;
}
export type MilestoneId = string;
export interface NudgePerformanceStat {
    actionCount: bigint;
    actionRatePct: number;
    userSegment: UserSegment;
    sentCount: bigint;
    nudgeType: NudgeType;
    conversionLiftPct: number;
}
export interface SeoSignals {
    metaPresent: boolean;
    h1Count: bigint;
    titlePresent: boolean;
    schemaPresent: boolean;
    internalLinks: bigint;
}
export interface AuditLead {
    id: bigint;
    leadName: string;
    city: string;
    whatsappSentAt?: Timestamp;
    submittedAt: Timestamp;
    niche: string;
    phone: string;
    budgetRange: string;
    salonType: string;
}
export interface SubscriptionEvent {
    id: bigint;
    prevPlanTier?: PlanTier;
    userId: Principal;
    amountRs: bigint;
    prevAmountRs?: bigint;
    timestamp: bigint;
    planTier: PlanTier;
    eventKind: SubscriptionEventKind;
}
export interface UserSubscription {
    plan: SubscriptionPlan;
    leadCredits: bigint;
    yearlyPrice: bigint;
    subscriptionStatus: SubscriptionStatus;
    billingCycle: BillingCycle;
    stripeCustomerId: string;
    monthlyPrice: bigint;
    trialExpiresAt?: bigint;
}
export type DeliverabilityStatId = bigint;
export interface LandingPageSection {
    hero: string;
    ctaText: string;
    painPoints: Array<string>;
    formTitle: string;
    beforeAfter: {
        after: string;
        before: string;
    };
    testimonials: Array<{
        name: string;
        quote: string;
        business: string;
    }>;
    subheadline: string;
}
export interface EnhancedFunnelMetrics {
    paidUsers: bigint;
    freeToPaidConversion: number;
    steps: Array<FunnelStepDetail>;
    avgDaysToFirstPayment?: number;
    totalUsers: bigint;
}
export interface SaveTemplateInput {
    clientId: ClientId;
    templateId: string;
    templateName: string;
    sections: TemplateSections;
}
export interface GA4Dashboard {
    topPages: Array<[string, bigint]>;
    trafficSources: Array<[string, bigint]>;
    isLive: boolean;
    avgBounceRate: number;
    conversions: bigint;
    totalUsers: bigint;
    totalSessions: bigint;
}
export interface ReferralStats {
    creditsEarned: bigint;
    completed: bigint;
    signedUp: bigint;
    trialDaysEarned: bigint;
    totalInvited: bigint;
}
export interface GatedFeatureAdminStat {
    totalUsageCount: bigint;
    activeUserCount: bigint;
    featureName: string;
}
export interface GamificationState {
    creditsEarned: bigint;
    totalActions: bigint;
    currentMilestone: bigint;
    lastActionDate: string;
    dailyStreak: bigint;
    unlockedFeatures: Array<string>;
}
export interface MarketplaceListing {
    title: string;
    listingId: string;
    createdAt: bigint;
    tags: Array<string>;
    description: string;
    isActive: boolean;
    listingType: MarketplaceListingType;
    sellerName: string;
    sellerId: string;
    price: bigint;
    reviewCount: bigint;
    avgRating: bigint;
}
export type SuggestionId = bigint;
export interface SaasMetricsResponse {
    arr: bigint;
    ltv: LtvBreakdown;
    mrr: bigint;
    nrr: number;
    activeUsers: bigint;
    newCustomers: bigint;
    churnedMrr: bigint;
    totalPayingCustomers: bigint;
    monthlyChurnRate: number;
    monthlyGrowthRate: number;
    revenueChurnRate: number;
    churnedCustomers: bigint;
    cacPaybackMonths: number;
    closingMrr: bigint;
    newMrr: bigint;
    ltvCacRatio: number;
    cacByChannel: CacBreakdown;
    dateRange: {
        to: bigint;
        from: bigint;
    };
    expansionMrr: bigint;
    ltvCacStatus: HealthStatus;
}
export interface FunnelStep {
    dropOffRate: number;
    count: bigint;
    stepName: string;
    conversionRate: number;
}
export interface ReferralFunnelStats {
    totalLinksGenerated: bigint;
    totalRewardsClaimed: bigint;
    steps: Array<ReferralFunnelStep>;
}
export interface ContentPostPublic {
    id: string;
    postType: string;
    hashtags: Array<string>;
    body: string;
    city: string;
    hook: string;
    isPosted: boolean;
    callToAction: string;
    niche: string;
    caption: string;
    scheduledDay: bigint;
}
export interface ContentCalendarPublic {
    id: string;
    city: string;
    userId: string;
    goal: string;
    createdAt: bigint;
    niche: string;
    posts: Array<ContentPostPublic>;
    monthYear: string;
}
export interface WeeklyAction {
    action: string;
    estimatedImpact: string;
    rationale: string;
    category: Variant_local_seo_run_offer_collect_reviews_upsell_launch_ad_post_content;
}
export interface CohortDayStats {
    day: bigint;
    returnedCount: bigint;
    usersNotified: bigint;
}
export interface SeoAuditItem {
    status: Variant_warning_fail_pass;
    suggestion: string;
    itemLabel: string;
}
export interface WatiMessage {
    id: string;
    status: string;
    userId: string;
    templateName: string;
    sentAt: bigint;
    phone: string;
    params: Array<string>;
}
export interface MonitorRecord {
    url: string;
    lastScanAt: bigint;
    active: boolean;
    userId: Principal;
    frequency: string;
}
export interface Note {
    id: NoteId;
    content: string;
    createdAt: Timestamp;
    completed: boolean;
    dueDate?: Timestamp;
    noteType: NoteType;
    leadId: LeadId;
}
export interface UserNotificationPrefs {
    lastNotificationDate?: bigint;
    frequencySettings: FrequencySettings;
    userId: string;
    whatsappOptIn: boolean;
    whatsappConsentDate?: bigint;
    enabledTriggers: Array<TriggerType>;
    notificationsSentToday: bigint;
    whatsappOptOutDate?: bigint;
}
export interface DripSequenceDay {
    weekNumber: bigint;
    weekTheme: WeekTheme;
    personalizationTokens: Array<string>;
    dayNumber: bigint;
    message: string;
    copyType: CopyType;
}
export interface ClientMetrics {
    revenue: number;
    leads: bigint;
    traffic: bigint;
    conversions: bigint;
}
export interface LiveEventEntry {
    eventId: bigint;
    metadata: Array<[string, string]>;
    userId: string;
    timestamp: bigint;
    eventType: string;
}
export interface RetentionData {
    creditsEarned: bigint;
    weeklyLeadsGenerated: bigint;
    userId: string;
    lastActiveDate: string;
    weeklyRepliesReceived: bigint;
    longestStreak: bigint;
    lastSessionAt: bigint;
    churnRisk: ChurnRisk;
    currentStreak: bigint;
    lastCreditClaim: bigint;
    weeklyProposalsSent: bigint;
}
export interface NudgePerformanceRow {
    opened: bigint;
    sent: bigint;
    variantId: string;
    segment: Segment;
    conversionRate: number;
    isWinner: boolean;
    copyType: string;
    actionTaken: bigint;
    openRate: number;
}
export type WhatsAppTemplateId = bigint;
export interface SocialProofEntry {
    id: bigint;
    activityType: SocialProofActivityType;
    metricValue: bigint;
    city: string;
    userDisplayName: string;
    timestamp: Timestamp;
}
export interface UserSegmentDistribution {
    totalScored: bigint;
    scoredAt: bigint;
    highIntent: bigint;
    mediumActivity: bigint;
    excludedChurned: bigint;
    lowActivity: bigint;
}
export interface CaseStudy {
    id: string;
    isPublished: boolean;
    clientCity: string;
    clientName: string;
    userId: string;
    testimonialQuote?: string;
    createdAt: bigint;
    shareToken: string;
    clientNiche: string;
    resultMetrics: Array<ResultMetric>;
    actionsToken: Array<string>;
    problemStatement: string;
}
export interface PricingRecommendation {
    computedAt: bigint;
    offerLabel: string;
    userId: string;
    shownAt?: bigint;
    currentPlan: string;
    segment: ActivitySegment;
    acceptedAt?: bigint;
    recommendedOffer: OfferType;
}
export interface AnalyticsEvent {
    id: bigint;
    metadata: Array<[string, string]>;
    userId: string;
    timestamp: bigint;
    eventType: AnalyticsEventType;
}
export interface AccountabilityStateView {
    targetLeads: bigint;
    targetFollowups: bigint;
    todayComplete: boolean;
    targetDeals: bigint;
    dailyLeadsContacted: bigint;
    dailyFollowupsDone: bigint;
    dailyDealsClosed: bigint;
    lastTaskDate: bigint;
    streakMilestones: Array<bigint>;
    currentStreak: bigint;
}
export interface AffiliateStats {
    totalReferrals: bigint;
    paidEarnings: bigint;
    pendingEarnings: bigint;
    commissionHistory: Array<CommissionRecord>;
    conversionRate: number;
    totalEarnings: bigint;
}
export interface PageSpeedResult {
    cls: number;
    fcp: number;
    fid: number;
    lcp: number;
    tbt: number;
    tti: number;
    url: string;
    fetchedAt: bigint;
    opportunities: Array<string>;
    mobileScore: bigint;
    desktopScore: bigint;
    diagnostics: Array<string>;
}
export interface ScanLimitRecord {
    scansThisWeek: bigint;
    userId: Principal;
    weekStartedAt: Timestamp;
    planTier: PlanTier;
}
export interface ReferralRecord {
    id: bigint;
    status: ReferralStatus;
    completedAt?: Timestamp;
    referredUserId?: Principal;
    referralCode: string;
    rewardClaimed: boolean;
    createdAt: Timestamp;
    referrerId: Principal;
}
export interface PaywallState {
    userId: string;
    abVariant: PaywallTimingVariant;
    hasExperiencedValueMoment: boolean;
    paywallShownAfterValue: boolean;
    paywallShownAt?: bigint;
}
export interface CompetitorRecord {
    conversionScore: bigint;
    overallScore: bigint;
    mobileScore: bigint;
    seoScore: bigint;
    securityScore: bigint;
    speedScore: bigint;
    competitorName: string;
}
export interface CategoryScores {
    seo: bigint;
    content: bigint;
    security: bigint;
    speed: bigint;
    mobile: bigint;
    conversion: bigint;
}
export interface SeoAuditRecord {
    id: SeoAuditId;
    url: string;
    metaScore: bigint;
    blogOutlines: Array<{
        title: string;
        wordCount: bigint;
        outline: Array<string>;
        targetKeyword: string;
    }>;
    createdAt: bigint;
    headingScore: bigint;
    pageSpeedScore: bigint;
    titleScore: bigint;
    mobileFriendlyScore: bigint;
    items: Array<SeoAuditItem>;
    keywordDensityScore: bigint;
}
export interface CreateSuggestionInput {
    title: string;
    clientId: ClientId;
    estimatedImpact: string;
    description: string;
    category: string;
    priority: SuggestionPriority;
    weekOf: Timestamp;
}
export interface OutreachCampaign {
    id: bigint;
    status: string;
    completedAt?: Timestamp;
    startedAt: Timestamp;
    businessName: string;
    totalMessages: bigint;
    channels: Array<string>;
    leadId: LeadId;
    deliveredCount: bigint;
    repliedCount: bigint;
}
export interface CompetitorIntelReport {
    userId: string;
    keywordGaps: Array<string>;
    lastUpdatedAt: bigint;
    competitors: Array<CompetitorProfile>;
    yourUrl: string;
    adSpendEstimate: string;
}
export type Timestamp = bigint;
export type GrowthReportId = bigint;
export interface AbVariantStats {
    impressions: bigint;
    conversionRatePct: number;
    variantId: AbVariantId;
    conversions: bigint;
}
export interface HealthAlert {
    metric: string;
    actual: string;
    alert: string;
    threshold: string;
    alertId: string;
    timestamp: bigint;
    severity: AlertSeverity;
}
export interface UserPricingRow {
    offerLabel: string;
    userId: string;
    shownAt?: bigint;
    currentPlan: string;
    segment: ActivitySegment;
    recommendedOffer: OfferType;
}
export interface AbTestResult {
    lastResetAt: bigint;
    testName: AbTestName;
    variants: Array<AbVariantStats>;
    isActive: boolean;
    winningVariant?: AbVariantId;
}
export interface ClientGrowthPlan {
    clientId: ClientId;
    adsPlan: Array<GrowthPlanItem>;
    seoPlan: Array<GrowthPlanItem>;
    planId: string;
    generatedAt: bigint;
    approvalStatus: ClientGrowthPlanStatus;
    contentIdeas: Array<GrowthPlanItem>;
    weekOf: bigint;
}
export interface CacBreakdown {
    cac: bigint;
    referral: bigint;
    metaAds: bigint;
    newPaidCustomers: bigint;
    other: bigint;
    googleAds: bigint;
    totalSpend: bigint;
}
export interface MarketingSpend {
    id: bigint;
    month: string;
    amountRs: bigint;
    recordedBy: Principal;
    timestamp: bigint;
    channel: SpendChannel;
}
export interface AuditRecord {
    id: AuditId;
    url: string;
    rawMetrics?: RawMetrics;
    overallScore: bigint;
    userId: Principal;
    createdAt: Timestamp;
    issues: Array<AuditIssue>;
    scanDurationMs: bigint;
    competitors: Array<CompetitorRecord>;
    monitorActive: boolean;
    categoryScores: CategoryScores;
    lastMonitorScanAt: bigint;
}
export interface SeoPagePublic {
    id: string;
    isPublished: boolean;
    pricingHint: string;
    city: string;
    headline: string;
    createdAt: bigint;
    slug: string;
    caseExample: {
        after: string;
        before: string;
    };
    painPoints: Array<string>;
    niche: string;
    benefits: Array<string>;
    subheadline: string;
}
export interface NudgeEvent {
    id: bigint;
    actedOnAt?: bigint;
    userId: string;
    variantType: NudgeVariantType;
    sentAt: bigint;
    variantId: string;
    segment: ActivitySegment;
    openedAt?: bigint;
}
export interface AutoReport {
    roi: bigint;
    status: AutoReportStatus;
    clientId: ClientId;
    nextSteps: Array<string>;
    topChannel: string;
    generatedAt: bigint;
    sentAt?: bigint;
    reportPeriod: string;
    leadsGenerated: bigint;
    conversions: bigint;
    revenueImpact: bigint;
    reportId: string;
}
export interface WHEvent {
    metadata: string;
    userId: string;
    createdAt: Timestamp;
    eventName: string;
}
export interface ShareableWin {
    displayName: string;
    metricValue: bigint;
    city: string;
    date: string;
    winType: ShareWinType;
}
export interface UserJourneyEvent {
    eventId: bigint;
    metadata: Array<[string, string]>;
    timestamp: bigint;
    timeSincePrevMs?: bigint;
    eventType: string;
}
export type NoteId = bigint;
export interface InvestorReport {
    arr: bigint;
    cac: bigint;
    ltv: bigint;
    mrr: bigint;
    nrr: number;
    newCustomers: bigint;
    churnedMrr: bigint;
    disclaimers: Array<string>;
    monthlyChurnRate: number;
    funnelData: Array<string>;
    generatedAt: bigint;
    churnedCustomers: bigint;
    cacPaybackMonths: number;
    newMrr: bigint;
    ltvCacRatio: number;
    cohortData: Array<string>;
    healthAlerts: Array<string>;
    totalCustomers: bigint;
    expansionMrr: bigint;
}
export interface GA4CredentialStatus {
    lastUpdated?: bigint;
    propertyId?: string;
    isConfigured: boolean;
}
export interface ReferralFunnelStep {
    conversionPct: number;
    count: bigint;
    stepName: string;
}
export interface TrafficSourceAttribution {
    referralCode?: string;
    source: TrafficSource;
    userId: string;
    signedUpAt: Timestamp;
}
export type SeoAuditId = bigint;
export interface NicheFunnelMetrics {
    city: string;
    niche: string;
    counts: Array<[string, bigint]>;
}
export interface TrafficSourceBreakdown {
    periodDays: bigint;
    directCount: bigint;
    directPct: number;
    referralPct: number;
    organicCount: bigint;
    referralCount: bigint;
    adsPct: number;
    adsCount: bigint;
    organicPct: number;
}
export interface FrequencySettings {
    maxPerDay: bigint;
    quietHoursEnabled: boolean;
    inactivityReductionEnabled: boolean;
    quietHoursStart: bigint;
    quietHoursEnd: bigint;
}
export interface FeatureUnlockCheck {
    requiredInvites: bigint;
    expiresAt?: Timestamp;
    usageCount: bigint;
    currentInvites: bigint;
    isUnlocked: boolean;
    featureName: GatedFeatureName;
}
export interface WhatsAppMessage {
    dayNumber: bigint;
    message: string;
    stopConditions: Array<WhatsAppStopCondition>;
}
export type ImportId = bigint;
export interface CompetitorProfile {
    url: string;
    pageSpeed?: bigint;
    estimatedTraffic: string;
    lastScannedAt: bigint;
    socialLinks: Array<string>;
    name?: string;
    seoSignals: SeoSignals;
    ctaPresent: boolean;
    whatsappPresent: boolean;
}
export interface AuditIssue {
    estimatedLossMax: bigint;
    estimatedLossMin: bigint;
    aiFixSuggestion: string;
    businessImpact: string;
    difficulty: FixDifficulty;
    fixCategory: FixCategory;
    severity: IssueSeverity;
    fixType: FixType;
    problem: string;
}
export interface SubscriptionStatus__1 {
    status: string;
    tier: string;
    currentPeriodEnd?: bigint;
}
export interface ImportRecord {
    id: ImportId;
    userId: string;
    duplicateCount: bigint;
    totalRows: bigint;
    filename: string;
    importedCount: bigint;
    validCount: bigint;
    timestamp: Timestamp;
    invalidCount: bigint;
}
export interface Client {
    id: ClientId;
    metrics: ClientMetrics;
    businessName: string;
    reportDate: Timestamp;
    leadId: LeadId;
    startDate: Timestamp;
}
export interface GrowthPlanItem {
    status: GrowthPlanItemStatus;
    title: string;
    description: string;
    effort: GrowthPlanItemEffort;
    priorityScore: bigint;
    estimatedRevenue: bigint;
}
export interface FunnelStepDetail {
    step: string;
    dropoffPercent: number;
    avgSecondsToNextStep?: bigint;
    users: bigint;
    conversions: bigint;
}
export type ConversionScriptId = bigint;
export interface AutoAgencyAction {
    leadName: string;
    actionType: AutoAgencyActionType;
    description: string;
    timestamp: bigint;
    outcome: string;
    actionId: string;
}
export interface WebsiteTemplate {
    id: TemplateId;
    clientId: ClientId;
    templateId: string;
    templateName: string;
    sections: TemplateSections;
    lastSaved: Timestamp;
}
export interface OnboardingTourState {
    completedAt?: bigint;
    startedAt: bigint;
    skipped: boolean;
    userId: string;
    completed: boolean;
    currentStep: bigint;
    completedSteps: Array<bigint>;
}
export enum AbTestName {
    nudge_copy_ab = "nudge_copy_ab",
    paywall_timing_ab = "paywall_timing_ab"
}
export enum ActivitySegment {
    Medium = "Medium",
    HighIntent = "HighIntent",
    LowActivity = "LowActivity"
}
export enum AlertSeverity {
    warning = "warning",
    info = "info",
    critical = "critical"
}
export enum AnalyticsEventType {
    city_selected = "city_selected",
    pitch_sent = "pitch_sent",
    get_clients_clicked = "get_clients_clicked",
    payment_failed = "payment_failed",
    onboarding_started = "onboarding_started",
    payment_started = "payment_started",
    reply_received = "reply_received",
    leads_generated = "leads_generated",
    feature_locked_clicked = "feature_locked_clicked",
    onboarding_completed = "onboarding_completed",
    plan_selected = "plan_selected",
    app_opened = "app_opened",
    user_churn_risk = "user_churn_risk",
    niche_selected = "niche_selected",
    paywall_viewed = "paywall_viewed",
    payment_success = "payment_success",
    proposal_created = "proposal_created"
}
export enum AutoAgencyActionType {
    dealSuggested = "dealSuggested",
    outreachSent = "outreachSent",
    followupSent = "followupSent",
    leadFound = "leadFound",
    reportGenerated = "reportGenerated"
}
export enum AutoReportStatus {
    sent = "sent",
    draft = "draft",
    ready = "ready"
}
export enum BillingCycle {
    monthly = "monthly",
    yearly = "yearly"
}
export enum ChallengeBadge {
    bronze = "bronze",
    gold = "gold",
    none = "none",
    silver = "silver"
}
export enum ChurnRisk {
    high = "high",
    none = "none",
    medium = "medium"
}
export enum ClientGrowthPlanStatus {
    pending = "pending",
    approved = "approved",
    executing = "executing"
}
export enum ConsentStatus {
    pending = "pending",
    granted = "granted",
    withdrawn = "withdrawn"
}
export enum ConsentType {
    reply_first = "reply_first",
    form_submission = "form_submission",
    manual_override = "manual_override",
    qr_optin = "qr_optin"
}
export enum FixCategory {
    Cta = "Cta",
    Seo = "Seo",
    Speed = "Speed",
    Security = "Security",
    Images = "Images",
    WhatsApp = "WhatsApp",
    Content = "Content",
    Mobile = "Mobile"
}
export enum FixDifficulty {
    Easy = "Easy",
    Hard = "Hard",
    Medium = "Medium"
}
export enum FixType {
    developer_needed = "developer_needed",
    one_click = "one_click",
    guided = "guided"
}
export enum GatedFeatureName {
    advanced_analytics = "advanced_analytics",
    bulk_send = "bulk_send",
    export_leads = "export_leads"
}
export enum GrowthPlanItemEffort {
    deep = "deep",
    quick = "quick",
    medium = "medium"
}
export enum GrowthPlanItemStatus {
    pending = "pending",
    done = "done",
    approved = "approved"
}
export enum HealthStatus {
    loss = "loss",
    healthy = "healthy",
    moderate = "moderate"
}
export enum HeatmapEventKind {
    tap = "tap",
    scrollDepth = "scrollDepth",
    deadClick = "deadClick",
    screenTime = "screenTime",
    rageTap = "rageTap"
}
export enum ImportRowStatus {
    valid = "valid",
    invalid = "invalid",
    duplicate = "duplicate"
}
export enum IssueSeverity {
    Critical = "Critical",
    Minor = "Minor",
    Warning = "Warning"
}
export enum LandingPageNiche {
    gym = "gym",
    plumber = "plumber",
    cafe = "cafe",
    education = "education",
    agency = "agency",
    salon = "salon",
    real_estate = "real_estate",
    restaurant = "restaurant",
    medical = "medical"
}
export enum LandingPageStatus {
    published = "published",
    draft = "draft",
    archived = "archived"
}
export enum LeadStatus {
    new_ = "new",
    closed = "closed",
    proposal = "proposal",
    contacted = "contacted"
}
export enum MarketplaceListingType {
    buyLeads = "buyLeads",
    hireFreelancer = "hireFreelancer",
    sellService = "sellService"
}
export enum MilestoneStatus {
    locked = "locked",
    unlocked = "unlocked",
    claimed = "claimed"
}
export enum NicheFunnelEventType {
    audit_sent = "audit_sent",
    form_submit = "form_submit",
    landing_view = "landing_view",
    whatsapp_sent = "whatsapp_sent",
    call_booked = "call_booked",
    whatsapp_click = "whatsapp_click",
    share_clicked = "share_clicked"
}
export enum NoteType {
    reminder = "reminder",
    note = "note"
}
export enum NudgeType {
    reward = "reward",
    urgency = "urgency",
    fomo = "fomo",
    money_visibility = "money_visibility"
}
export enum NudgeVariantType {
    reward = "reward",
    urgency = "urgency",
    fomo = "fomo"
}
export enum OfferType {
    limited_discount = "limited_discount",
    bonus_credits = "bonus_credits",
    free_trial_2d = "free_trial_2d"
}
export enum PaywallTimingVariant {
    after_value_moment = "after_value_moment",
    immediate = "immediate"
}
export enum PlanTier {
    Pro = "Pro",
    Starter = "Starter",
    Free = "Free",
    Growth = "Growth",
    Agency = "Agency"
}
export enum PriorityTag {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum ReferralFunnelEventType {
    landing_view = "landing_view",
    reward_claimed = "reward_claimed",
    signup_started = "signup_started",
    link_generated = "link_generated",
    share_clicked = "share_clicked",
    signup_completed = "signup_completed"
}
export enum ReferralStatus {
    created = "created",
    completed = "completed",
    signedUp = "signedUp"
}
export enum ScriptType {
    chat_suggestion = "chat_suggestion",
    call_script = "call_script",
    email_sequence = "email_sequence"
}
export enum SenderType {
    whatsapp = "whatsapp",
    email_domain = "email_domain"
}
export enum ShareWinType {
    streak = "streak",
    deal = "deal",
    leads = "leads"
}
export enum SocialProofActivityType {
    referral_signup = "referral_signup",
    leads_generated = "leads_generated",
    deal_closed = "deal_closed",
    pitches_sent = "pitches_sent"
}
export enum SpendChannel {
    referral = "referral",
    metaAds = "metaAds",
    other = "other",
    googleAds = "googleAds"
}
export enum SubscriptionEventKind {
    plan_cancelled = "plan_cancelled",
    plan_upgraded = "plan_upgraded",
    plan_purchased = "plan_purchased",
    plan_downgraded = "plan_downgraded"
}
export enum SubscriptionPlan {
    pro = "pro",
    growth = "growth",
    starter = "starter",
    free = "free",
    agency = "agency"
}
export enum SubscriptionStatus {
    active = "active",
    canceled = "canceled",
    inactive = "inactive",
    pastDue = "pastDue",
    trialing = "trialing"
}
export enum TrafficSource {
    ads = "ads",
    referral = "referral",
    organic = "organic",
    direct = "direct"
}
export enum TriggerType {
    drip_day_10 = "drip_day_10",
    drip_day_11 = "drip_day_11",
    drip_day_12 = "drip_day_12",
    drip_day_13 = "drip_day_13",
    drip_day_14 = "drip_day_14",
    drip_day_15 = "drip_day_15",
    drip_day_16 = "drip_day_16",
    drip_day_17 = "drip_day_17",
    drip_day_18 = "drip_day_18",
    drip_day_19 = "drip_day_19",
    drip_day_20 = "drip_day_20",
    drip_day_21 = "drip_day_21",
    drip_day_22 = "drip_day_22",
    drip_day_23 = "drip_day_23",
    drip_day_24 = "drip_day_24",
    drip_day_25 = "drip_day_25",
    drip_day_26 = "drip_day_26",
    drip_day_27 = "drip_day_27",
    drip_day_28 = "drip_day_28",
    drip_day_0 = "drip_day_0",
    drip_day_1 = "drip_day_1",
    drip_day_2 = "drip_day_2",
    drip_day_3 = "drip_day_3",
    drip_day_4 = "drip_day_4",
    drip_day_5 = "drip_day_5",
    drip_day_6 = "drip_day_6",
    drip_day_7 = "drip_day_7",
    drip_day_8 = "drip_day_8",
    drip_day_9 = "drip_day_9",
    on_limit_reached = "on_limit_reached",
    on_inactivity_24h = "on_inactivity_24h",
    on_inactivity_48h = "on_inactivity_48h",
    on_new_reply = "on_new_reply",
    on_streak_milestone = "on_streak_milestone",
    on_followup_due = "on_followup_due"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_local_seo_run_offer_collect_reviews_upsell_launch_ad_post_content {
    local_seo = "local_seo",
    run_offer = "run_offer",
    collect_reviews = "collect_reviews",
    upsell = "upsell",
    launch_ad = "launch_ad",
    post_content = "post_content"
}
export enum Variant_warning_fail_pass {
    warning = "warning",
    fail = "fail",
    pass = "pass"
}
export enum WarmupPhase {
    unlimited = "unlimited",
    phase1 = "phase1",
    phase2 = "phase2",
    phase3 = "phase3"
}
export enum WeekTheme {
    habit_building = "habit_building",
    scale_upgrade = "scale_upgrade",
    activation = "activation",
    conversion = "conversion"
}
export enum WhatsAppStopCondition {
    user_opted_out = "user_opted_out",
    user_replied = "user_replied",
    sequence_completed = "sequence_completed"
}
export enum WhatsAppTemplateCategory {
    proposal_sharing = "proposal_sharing",
    lead_outreach = "lead_outreach",
    follow_up = "follow_up"
}
export enum WhatsAppTemplateStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    paused = "paused"
}
export interface backendInterface {
    activateFeatureUnlock(featureName: GatedFeatureName): Promise<FeatureUnlockSession>;
    activateMilestone(milestoneId: MilestoneId): Promise<boolean>;
    addMonitoredUrl(url: string): Promise<void>;
    addSenderIdentity(identifier: string, senderType: SenderType): Promise<SenderIdentity>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    awardCredits(userId: string, amount: bigint): Promise<void>;
    awardWeeklyRewards(city: string, isoWeek: string): Promise<Array<[string, bigint]>>;
    canSendNotification(userId: string): Promise<boolean>;
    cancelSubscription(reason: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    checkChurnRisk(userId: string): Promise<ChurnRisk>;
    checkFeatureUnlock(featureName: GatedFeatureName): Promise<FeatureUnlockCheck>;
    checkOptOutStatus(leadId: LeadId): Promise<boolean>;
    checkValueMoment(userId: string): Promise<boolean>;
    claimMilestoneReward(milestoneIndex: bigint): Promise<boolean>;
    claimReferralByCode(code: string): Promise<boolean>;
    clearGA4Credentials(): Promise<void>;
    completeNote(id: NoteId): Promise<boolean>;
    completeOnboarding(): Promise<void>;
    completeOnboardingTour(): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createCaseStudy(clientName: string, clientCity: string, clientNiche: string, problemStatement: string, actionsToken: Array<string>, resultMetrics: Array<ResultMetric>, testimonialQuote: string | null): Promise<{
        __kind__: "ok";
        ok: CaseStudy;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createCheckoutSession(planId: string, successUrl: string, cancelUrl: string): Promise<{
        __kind__: "ok";
        ok: CheckoutSession;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createClient(input: CreateClientInput): Promise<Client>;
    createConversionScript(serviceType: string, painPoint: string, budgetTier: string): Promise<ConversionScript>;
    createGrowthSuggestion(input: CreateSuggestionInput): Promise<GrowthSuggestion>;
    createLandingPage(niche: LandingPageNiche, city: string, serviceDesc: string, targetBudget: string): Promise<LandingPage>;
    createLead(input: CreateLeadInput): Promise<Lead>;
    createMarketplaceListing(listingType: MarketplaceListingType, title: string, description: string, price: bigint, tags: Array<string>): Promise<MarketplaceListing>;
    createNote(input: CreateNoteInput): Promise<Note>;
    createNotification(title: string, body: string, type: string, actionUrl: string | null): Promise<string>;
    createOutreachCampaign(input: CreateOutreachCampaignInput): Promise<OutreachCampaign>;
    createOutreachMessage(input: CreateOutreachMessageInput): Promise<OutreachMessage>;
    createRazorpayOrder(planId: string): Promise<{
        __kind__: "ok";
        ok: RazorpayOrder;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createReferral(): Promise<ReferralRecord>;
    createScraperJob(niche: string, city: string): Promise<ScraperJob>;
    createWhatsAppTemplate(name: string, category: WhatsAppTemplateCategory, body: string, variables: Array<string>): Promise<WhatsAppTemplate>;
    deleteCaseStudy(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteClient(id: ClientId): Promise<boolean>;
    deleteContentCalendar(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteLead(id: LeadId): Promise<boolean>;
    deleteNote(id: NoteId): Promise<boolean>;
    deleteNotification(notificationId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteProposal(id: ProposalId): Promise<boolean>;
    deleteSeoPage(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    dismissSuggestion(id: SuggestionId): Promise<boolean>;
    finalizeChallengeWeek(isoWeek: string): Promise<Array<FinalizedChallengeResult>>;
    generateAutoReport(clientId: ClientId, reportPeriod: string): Promise<AutoReport>;
    generateClientGrowthPlan(clientId: ClientId): Promise<ClientGrowthPlan>;
    generateContentCalendar(niche: string, city: string, goal: string): Promise<{
        __kind__: "ok";
        ok: ContentCalendarPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    generateGrowthReport(clientId: bigint, weekOf: string, monthOf: string, leadsGenerated: bigint, conversionRate: bigint, revenueImpact: bigint): Promise<GrowthReport>;
    generateInvestorReport(): Promise<{
        __kind__: "ok";
        ok: InvestorReport;
    } | {
        __kind__: "err";
        err: string;
    }>;
    generateProposal(input: CreateProposalInput): Promise<Proposal>;
    generateSeoPages(requests: Array<SeoPageRequest>): Promise<{
        __kind__: "ok";
        ok: Array<SeoPagePublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    generateShareableWin(displayName: string, city: string, isoWeek: string, currentStreak: bigint): Promise<ShareableWin>;
    getAbTestResult(testName: AbTestName): Promise<AbTestResult | null>;
    getAbVariant(testName: AbTestName): Promise<AbVariantId>;
    getAccountabilityState(): Promise<AccountabilityStateView>;
    getAdminEvents(): Promise<Array<WHEvent>>;
    getAffiliateStats(): Promise<AffiliateStats>;
    getAnalyticsEvents(userId: string): Promise<Array<AnalyticsEvent>>;
    getAuditHistory(url: string): Promise<Array<AuditRecord>>;
    getAutoAgencyState(): Promise<AutoAgencyStateView>;
    getAutoReport(clientId: ClientId): Promise<AutoReport | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCampaignsByLead(leadId: LeadId): Promise<Array<OutreachCampaign>>;
    getCaseStudy(id: string): Promise<CaseStudy | null>;
    getChallengeParticipants(isoWeek: string): Promise<Array<ChallengeParticipant>>;
    getCheckoutConfig(): Promise<{
        plans: Array<StripePlan>;
        publishableKey: string;
    }>;
    getChurnRiskUsers(): Promise<Array<UserChurnRiskRow>>;
    getChurnStatus(): Promise<{
        isAtRisk: boolean;
        pendingHotLeads: bigint;
        daysSinceLastSession: bigint;
    }>;
    getCityLeaderboard(city: string, isoWeek: string): Promise<Array<LeaderboardEntry>>;
    getClient(id: ClientId): Promise<Client | null>;
    getClientGrowthPlan(clientId: ClientId): Promise<ClientGrowthPlan | null>;
    getCohortRetention(windowWeeks: bigint | null): Promise<Array<CohortRetentionRow>>;
    getCompetitorComparison(urls: Array<string>): Promise<Array<CompetitorRecord>>;
    getCompetitorIntelReport(): Promise<CompetitorIntelReport | null>;
    getConsentLogs(): Promise<Array<ConsentLog>>;
    getContentCalendar(id: string): Promise<ContentCalendarPublic | null>;
    getDealSuggestions(): Promise<Array<DealSuggestion>>;
    getDeliverabilityMetrics(identityId: SenderIdentityId): Promise<Array<DeliveryStats>>;
    getDripMessage(onboardingDay: bigint): Promise<DripSequenceDay | null>;
    getEnhancedFunnelMetrics(): Promise<EnhancedFunnelMetrics>;
    getEventDrillDown(eventName: string): Promise<EventDrillDown>;
    getFunnelMetrics(): Promise<FunnelMetrics>;
    getGA4CredentialStatus(): Promise<GA4CredentialStatus>;
    getGA4Dashboard(days: bigint): Promise<{
        __kind__: "ok";
        ok: GA4Dashboard;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getGamificationState(): Promise<GamificationState>;
    getGrowthOverview(): Promise<GrowthOverview>;
    getHeatmapSummary(): Promise<Array<[string, bigint]>>;
    getImportHistory(): Promise<Array<ImportRecord>>;
    getLandingPage(id: LandingPageId): Promise<LandingPage | null>;
    getLatestAudit(url: string): Promise<AuditRecord | null>;
    getLatestReport(): Promise<InvestorReport | null>;
    getLead(id: LeadId): Promise<Lead | null>;
    getMarketingSpend(month: string | null): Promise<Array<MarketingSpend>>;
    getMarketplaceListings(): Promise<Array<MarketplaceListing>>;
    getMilestoneStatus(): Promise<Array<MilestoneInfo>>;
    getMonitoredUrls(): Promise<Array<MonitorRecord>>;
    getMonitoredUrlsNeedingRescan(): Promise<Array<MonitorRecord>>;
    getMyActivityScore(): Promise<UserActivityScore>;
    getMyPricingRecommendation(): Promise<PricingRecommendation>;
    getMySubscription(): Promise<UserSubscription | null>;
    getNicheFunnelMetrics(niche: string, city: string): Promise<NicheFunnelMetrics>;
    getNote(id: NoteId): Promise<Note | null>;
    getNudgeDeliveryStats(): Promise<Array<NudgePerformanceStat>>;
    getNudgeMetricsBySegment(segment: ActivitySegment): Promise<Array<NudgePerformanceMetrics>>;
    getNudgePerformanceBySegment(segment: Segment | null): Promise<Array<NudgePerformanceRow>>;
    getNudgePerformanceMetrics(): Promise<Array<NudgePerformanceMetrics>>;
    getOnboardingPrefs(): Promise<OnboardingPrefs | null>;
    getOnboardingState(): Promise<OnboardingTourState>;
    getOutreachMessagesByLead(leadId: LeadId): Promise<Array<OutreachMessage>>;
    getPageSpeedHistory(url: string): Promise<Array<PageSpeedResult>>;
    getPaywallState(userId: string): Promise<PaywallState | null>;
    getPerformanceScore(): Promise<PerformanceScore>;
    getPlanLimits(plan: SubscriptionPlan): Promise<PlanLimits>;
    getProposal(id: ProposalId): Promise<Proposal | null>;
    getPublicCaseStudy(shareToken: string): Promise<CaseStudy | null>;
    getRazorpayConfig(): Promise<{
        __kind__: "ok";
        ok: {
            currency: string;
            keyId: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    getRealTimeEventStream(): Promise<Array<LiveEventEntry>>;
    getReferralFunnelStats(): Promise<ReferralFunnelStats>;
    getReferralStats(): Promise<ReferralStats>;
    getRetentionAnalytics(): Promise<RetentionAnalytics>;
    getRetentionData(userId: string): Promise<RetentionData | null>;
    getRevenuePrediction(): Promise<RevenuePrediction>;
    getSaasHealthAlerts(): Promise<Array<HealthAlert>>;
    getSaasMetrics(monthOffset: bigint | null): Promise<SaasMetricsResponse>;
    getScraperJob(id: bigint): Promise<ScraperJob | null>;
    getSenderIdentities(): Promise<Array<SenderIdentity>>;
    getSeoPage(slug: string): Promise<SeoPagePublic | null>;
    getSubscriptionByUser(userId: Principal): Promise<UserSubscription | null>;
    getSubscriptionHistory(userId: Principal | null): Promise<Array<SubscriptionEvent>>;
    getSubscriptionStatus(): Promise<SubscriptionStatus__1>;
    getTrafficSourceBreakdown(periodDays: bigint): Promise<TrafficSourceBreakdown>;
    getUnreadCount(): Promise<bigint>;
    getUserActivityScore(userId: string): Promise<UserActivityScore>;
    getUserJourneyTimeline(userId: string): Promise<UserJourneyTimeline>;
    getUserNotificationPrefs(): Promise<UserNotificationPrefs>;
    getUserSegments(): Promise<UserSegmentDistribution>;
    getWatiConfig(): Promise<{
        baseUrl: string;
        businessPhoneId: string;
    } | null>;
    getWatiConsent(): Promise<WatiConsent | null>;
    getWatiTemplates(): Promise<{
        __kind__: "ok";
        ok: Array<{
            status: string;
            name: string;
            category: string;
        }>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getWebsiteTemplate(clientId: ClientId): Promise<WebsiteTemplate | null>;
    getWeeklyReportData(): Promise<WeeklyReportData | null>;
    getWhatsAppSequence(): Promise<Array<WhatsAppMessage>>;
    handleStripeWebhook(payload: string, signature: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    importCSVLeads(rows: Array<ImportRowResult>, filename: string, userId: string): Promise<ImportRecord>;
    isCallerAdmin(): Promise<boolean>;
    joinChallenge(displayName: string, city: string, isoWeek: string): Promise<void>;
    listAllCampaigns(): Promise<Array<OutreachCampaign>>;
    listAllOutreachMessages(): Promise<Array<OutreachMessage>>;
    listAuditLeads(): Promise<Array<AuditLead>>;
    listCaseStudies(): Promise<Array<CaseStudy>>;
    listClients(): Promise<Array<Client>>;
    listCommissions(status: string | null): Promise<Array<CommissionRecord>>;
    listContentCalendars(): Promise<Array<ContentCalendarPublic>>;
    listConversionScripts(): Promise<Array<ConversionScript>>;
    listGatedFeatureAdminStats(): Promise<Array<GatedFeatureAdminStat>>;
    listGrowthReports(clientId: bigint): Promise<Array<GrowthReport>>;
    listGrowthSuggestions(clientId: ClientId): Promise<Array<GrowthSuggestion>>;
    listLandingPages(): Promise<Array<LandingPage>>;
    listLeads(): Promise<Array<Lead>>;
    listLeadsByStatus(status: LeadStatus): Promise<Array<Lead>>;
    listNotesByLead(leadId: LeadId): Promise<Array<Note>>;
    listNotifications(limit: bigint, onlyUnread: boolean): Promise<Array<NotificationRecord>>;
    listPayoutRequests(): Promise<Array<{
        status: string;
        requestId: string;
        createdAt: bigint;
        amount: bigint;
    }>>;
    listProposalsByLead(leadId: LeadId): Promise<Array<Proposal>>;
    listRecentSocialProof(): Promise<Array<SocialProofEntry>>;
    listScraperJobs(): Promise<Array<ScraperJob>>;
    listSeoAudits(): Promise<Array<SeoAuditRecord>>;
    listSeoPages(): Promise<Array<SeoPagePublic>>;
    listTrafficAttributions(): Promise<Array<TrafficSourceAttribution>>;
    listUserPricingRows(): Promise<Array<UserPricingRow>>;
    listUserReferrals(): Promise<Array<ReferralRecord>>;
    listWatiMessages(limit: bigint): Promise<Array<WatiMessage>>;
    listWhatsAppTemplates(): Promise<Array<WhatsAppTemplate>>;
    markAllRead(): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markCommissionPaid(commissionId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markNudgeActedOn(nudgeEventId: bigint): Promise<boolean>;
    markNudgeActionTaken(deliveryId: bigint, converted: boolean): Promise<void>;
    markNudgeOpened(nudgeEventId: bigint): Promise<boolean>;
    markPostPosted(calendarId: string, postId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markRead(notificationId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markReportSent(clientId: ClientId): Promise<void>;
    markSuggestionImplemented(id: SuggestionId): Promise<boolean>;
    moveLead(id: LeadId, status: LeadStatus): Promise<boolean>;
    publishCaseStudy(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    publishLandingPage(id: LandingPageId): Promise<boolean>;
    publishSeoPage(id: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    razorpayTransform(input: TransformationInput): Promise<TransformationOutput>;
    recordAbConversion(testName: AbTestName, variantId: AbVariantId): Promise<void>;
    recordAbImpression(testName: AbTestName, variantId: AbVariantId): Promise<void>;
    recordActionCompleted(notificationId: bigint): Promise<boolean>;
    recordAnalyticsEvent(userId: string, eventType: AnalyticsEventType, metadata: Array<[string, string]>): Promise<bigint>;
    recordCommission(referredUserId: string, planTier: string, planAmount: bigint): Promise<{
        __kind__: "ok";
        ok: CommissionRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    recordConsentLog(phone: string, email: string, consentType: ConsentType, template: string, userId: string, notes: string): Promise<ConsentLogId>;
    recordDailyAction(actionType: string): Promise<GamificationState>;
    recordDeliveryStats(identityId: SenderIdentityId, date: string, delivered: bigint, replied: bigint, bounced: bigint, optOut: bigint, blocked: bigint): Promise<DeliverabilityStatId>;
    recordFeatureUnlockUsed(featureName: GatedFeatureName): Promise<void>;
    recordHeatmapEvent(userId: string, screenName: string, elementId: string, eventKind: HeatmapEventKind, scrollDepth: bigint, timeSpentMs: bigint): Promise<bigint>;
    recordMarketingSpend(month: string, channel: SpendChannel, amountRs: bigint): Promise<bigint>;
    recordNicheFunnelEvent(userId: string, eventType: NicheFunnelEventType, niche: string, city: string, metricValue: bigint | null): Promise<void>;
    recordNotificationOpened(notificationId: bigint): Promise<boolean>;
    recordNudgeDelivery(userId: string, nudgeType: NudgeType, userSegment: UserSegment): Promise<NudgeDelivery>;
    recordOfferShown(): Promise<void>;
    recordPaywallShown(userId: string): Promise<PaywallState>;
    recordShareClick(platform: string, winType: string): Promise<void>;
    recordSocialProofEntry(displayName: string, city: string, activityType: SocialProofActivityType, metricValue: bigint): Promise<SocialProofEntry>;
    recordSubscriptionEvent(kind: SubscriptionEventKind, planTier: PlanTier, prevPlanTier: PlanTier | null): Promise<bigint>;
    recordTrafficSourceAttribution(userId: string, source: TrafficSource, referralCode: string | null): Promise<void>;
    refreshDealSuggestions(): Promise<void>;
    requestPayout(bankDetails: string): Promise<{
        __kind__: "ok";
        ok: {
            requestId: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    resetAbTest(testName: AbTestName): Promise<void>;
    resetOnboardingTour(): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    runAgencyCycle(): Promise<void>;
    runCompetitorScan(yourUrl: string, competitorUrls: Array<string>): Promise<{
        __kind__: "ok";
        ok: CompetitorIntelReport;
    } | {
        __kind__: "err";
        err: string;
    }>;
    runPageSpeedScan(url: string): Promise<{
        __kind__: "ok";
        ok: PageSpeedResult;
    } | {
        __kind__: "err";
        err: string;
    }>;
    runSeoAudit(url: string): Promise<SeoAuditRecord>;
    saveCompetitorUrls(yourUrl: string, competitorUrls: Array<string>): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveOnboardingPrefs(niche: string, city: string, targetBudget: bigint): Promise<void>;
    saveWatiConfig(apiKey: string, baseUrl: string, businessPhoneId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveWebsiteTemplate(input: SaveTemplateInput): Promise<WebsiteTemplate>;
    sendWatiTemplate(phone: string, templateName: string, params: Array<string>): Promise<{
        __kind__: "ok";
        ok: {
            messageId: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    setAutoAgencyEnabled(enabled: boolean): Promise<void>;
    setGA4Credentials(propertyId: string, apiKey: string): Promise<void>;
    setUserNotificationPrefs(frequencySettings: FrequencySettings, enabledTriggers: Array<TriggerType>): Promise<void>;
    setWhatsAppConsent(phone: string, optIn: boolean): Promise<void>;
    skipOnboardingTour(): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    submitAudit(url: string): Promise<AuditRecord>;
    submitAuditLead(leadName: string, phone: string, salonType: string, budgetRange: string): Promise<AuditLead>;
    submitTemplateForApproval(id: WhatsAppTemplateId): Promise<boolean>;
    trackReferralFunnelEvent(eventType: ReferralFunnelEventType, referralCode: string, platform: string | null, cardId: string | null): Promise<void>;
    trackReferralLandingView(referralCode: string): Promise<void>;
    trackShareClick(referralCode: string, platform: string, cardId: string | null): Promise<void>;
    trackWebsiteHealthEvent(eventName: string, metadata: string): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    transformCompetitorIntel(input: TransformationInput): Promise<TransformationOutput>;
    transformGA4(input: TransformationInput): Promise<TransformationOutput>;
    transformPageSpeed(input: TransformationInput): Promise<TransformationOutput>;
    transformPaymentsWhatsapp(input: TransformationInput): Promise<TransformationOutput>;
    transformWebsiteHealth(input: TransformationInput): Promise<TransformationOutput>;
    triggerNudgeForUser(userId: string): Promise<NudgeEvent | null>;
    triggerSystemNotifications(): Promise<bigint>;
    updateAuditScanLimit(): Promise<ScanLimitRecord>;
    updateCampaignStats(id: bigint, deliveredCount: bigint, repliedCount: bigint, status: string): Promise<OutreachCampaign>;
    updateCaseStudy(id: string, updates: CaseStudyUpdate): Promise<{
        __kind__: "ok";
        ok: CaseStudy;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateChallengeLeadsCount(isoWeek: string, leadsToAdd: bigint): Promise<void>;
    updateChallengeProgress(displayName: string, city: string, isoWeek: string, leadsToAdd: bigint): Promise<void>;
    updateClientMetrics(input: UpdateClientMetricsInput): Promise<boolean>;
    updateConsentStatus(id: ConsentLogId, status: ConsentStatus): Promise<boolean>;
    updateDailyProgress(leadsContacted: bigint, followupsDone: bigint, dealsClosed: bigint): Promise<void>;
    updateLastSession(): Promise<void>;
    updateLead(input: UpdateLeadInput): Promise<boolean>;
    updateMonitoredUrl(url: string, active: boolean): Promise<void>;
    updateOnboardingStep(step: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateOutreachMessageStatus(id: bigint, status: string, timestamp: Timestamp | null): Promise<OutreachMessage>;
    updateRetentionData(userId: string, weeklyLeads: bigint, weeklyReplies: bigint, weeklyProposals: bigint): Promise<void>;
    updateScraperJobProgress(id: bigint, processed: bigint, progress: bigint, status: string): Promise<ScraperJob>;
    updateSenderReputation(id: SenderIdentityId, delivered: bigint, replied: bigint, bounced: bigint, optOut: bigint): Promise<boolean>;
    updateTemplateApprovalStatus(id: WhatsAppTemplateId, status: WhatsAppTemplateStatus, rejectionReason: string | null): Promise<boolean>;
    updateWatiConsent(phone: string, consentGiven: boolean): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    upsertMySubscription(sub: UserSubscription): Promise<void>;
    verifyRazorpayPayment(paymentId: string, orderId: string, signature: string, planId: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
