import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ConsentLogId = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type LeadId = bigint;
export interface SaveTemplateInput {
    clientId: ClientId;
    templateId: string;
    templateName: string;
    sections: TemplateSections;
}
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
export interface GA4Dashboard {
    topPages: Array<[string, bigint]>;
    trafficSources: Array<[string, bigint]>;
    isLive: boolean;
    avgBounceRate: number;
    conversions: bigint;
    totalUsers: bigint;
    totalSessions: bigint;
}
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
export interface GamificationState {
    creditsEarned: bigint;
    totalActions: bigint;
    currentMilestone: bigint;
    lastActionDate: string;
    dailyStreak: bigint;
    unlockedFeatures: Array<string>;
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
export type SuggestionId = bigint;
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
export interface WeeklyAction {
    action: string;
    estimatedImpact: string;
    rationale: string;
    category: Variant_local_seo_run_offer_collect_reviews_upsell_launch_ad_post_content;
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
export interface SeoAuditItem {
    status: Variant_warning_fail_pass;
    suggestion: string;
    itemLabel: string;
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
export interface ClientMetrics {
    revenue: number;
    leads: bigint;
    traffic: bigint;
    conversions: bigint;
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
export type WhatsAppTemplateId = bigint;
export type ProposalId = bigint;
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
export interface UpdateClientMetricsInput {
    id: ClientId;
    metrics: ClientMetrics;
    reportDate: Timestamp;
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
export interface CreateOutreachCampaignInput {
    businessName: string;
    channels: Array<string>;
    leadId: LeadId;
}
export interface LeadScoreBreakdown {
    seo: bigint;
    reviews: bigint;
    social: bigint;
    domainAge: bigint;
    website: bigint;
}
export type Timestamp = bigint;
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
export type GrowthReportId = bigint;
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
export type TemplateId = bigint;
export interface CreateClientInput {
    businessName: string;
    leadId: LeadId;
    startDate: Timestamp;
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
export type LandingPageId = bigint;
export interface GA4CredentialStatus {
    lastUpdated?: bigint;
    propertyId?: string;
    isConfigured: boolean;
}
export type ClientId = bigint;
export interface Client {
    id: ClientId;
    metrics: ClientMetrics;
    businessName: string;
    reportDate: Timestamp;
    leadId: LeadId;
    startDate: Timestamp;
}
export type NoteId = bigint;
export type SeoAuditId = bigint;
export interface TemplateSections {
    cta: string;
    features: string;
    hero: string;
    testimonials: string;
    footer: string;
}
export type ImportId = bigint;
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
export interface OnboardingPrefs {
    city: string;
    targetBudget: bigint;
    niche: string;
    completedOnboarding: boolean;
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
export interface UserSubscription {
    plan: SubscriptionPlan;
    leadCredits: bigint;
    subscriptionStatus: SubscriptionStatus;
    stripeCustomerId: string;
}
export type ConversionScriptId = bigint;
export interface WebsiteTemplate {
    id: TemplateId;
    clientId: ClientId;
    templateId: string;
    templateName: string;
    sections: TemplateSections;
    lastSaved: Timestamp;
}
export type DeliverabilityStatId = bigint;
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
export enum ImportRowStatus {
    valid = "valid",
    invalid = "invalid",
    duplicate = "duplicate"
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
export enum NoteType {
    reminder = "reminder",
    note = "note"
}
export enum PriorityTag {
    low = "low",
    high = "high",
    medium = "medium"
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
export enum SubscriptionPlan {
    pro = "pro",
    enterprise = "enterprise",
    starter = "starter"
}
export enum SubscriptionStatus {
    active = "active",
    canceled = "canceled",
    inactive = "inactive",
    pastDue = "pastDue",
    trialing = "trialing"
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
    addSenderIdentity(identifier: string, senderType: SenderType): Promise<SenderIdentity>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkOptOutStatus(leadId: LeadId): Promise<boolean>;
    claimMilestoneReward(milestoneIndex: bigint): Promise<boolean>;
    clearGA4Credentials(): Promise<void>;
    completeNote(id: NoteId): Promise<boolean>;
    completeOnboarding(): Promise<void>;
    createClient(input: CreateClientInput): Promise<Client>;
    createConversionScript(serviceType: string, painPoint: string, budgetTier: string): Promise<ConversionScript>;
    createGrowthSuggestion(input: CreateSuggestionInput): Promise<GrowthSuggestion>;
    createLandingPage(niche: LandingPageNiche, city: string, serviceDesc: string, targetBudget: string): Promise<LandingPage>;
    createLead(input: CreateLeadInput): Promise<Lead>;
    createNote(input: CreateNoteInput): Promise<Note>;
    createOutreachCampaign(input: CreateOutreachCampaignInput): Promise<OutreachCampaign>;
    createOutreachMessage(input: CreateOutreachMessageInput): Promise<OutreachMessage>;
    createScraperJob(niche: string, city: string): Promise<ScraperJob>;
    createWhatsAppTemplate(name: string, category: WhatsAppTemplateCategory, body: string, variables: Array<string>): Promise<WhatsAppTemplate>;
    deleteClient(id: ClientId): Promise<boolean>;
    deleteLead(id: LeadId): Promise<boolean>;
    deleteNote(id: NoteId): Promise<boolean>;
    deleteProposal(id: ProposalId): Promise<boolean>;
    dismissSuggestion(id: SuggestionId): Promise<boolean>;
    generateGrowthReport(clientId: bigint, weekOf: string, monthOf: string, leadsGenerated: bigint, conversionRate: bigint, revenueImpact: bigint): Promise<GrowthReport>;
    generateProposal(input: CreateProposalInput): Promise<Proposal>;
    getCallerUserRole(): Promise<UserRole>;
    getCampaignsByLead(leadId: LeadId): Promise<Array<OutreachCampaign>>;
    getClient(id: ClientId): Promise<Client | null>;
    getConsentLogs(): Promise<Array<ConsentLog>>;
    getDeliverabilityMetrics(identityId: SenderIdentityId): Promise<Array<DeliveryStats>>;
    getGA4CredentialStatus(): Promise<GA4CredentialStatus>;
    getGA4Dashboard(days: bigint): Promise<{
        __kind__: "ok";
        ok: GA4Dashboard;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getGamificationState(): Promise<GamificationState>;
    getImportHistory(): Promise<Array<ImportRecord>>;
    getLandingPage(id: LandingPageId): Promise<LandingPage | null>;
    getLead(id: LeadId): Promise<Lead | null>;
    getMySubscription(): Promise<UserSubscription | null>;
    getNote(id: NoteId): Promise<Note | null>;
    getOnboardingPrefs(): Promise<OnboardingPrefs | null>;
    getOutreachMessagesByLead(leadId: LeadId): Promise<Array<OutreachMessage>>;
    getProposal(id: ProposalId): Promise<Proposal | null>;
    getScraperJob(id: bigint): Promise<ScraperJob | null>;
    getSenderIdentities(): Promise<Array<SenderIdentity>>;
    getSubscriptionByUser(userId: Principal): Promise<UserSubscription | null>;
    getWebsiteTemplate(clientId: ClientId): Promise<WebsiteTemplate | null>;
    importCSVLeads(rows: Array<ImportRowResult>, filename: string, userId: string): Promise<ImportRecord>;
    isCallerAdmin(): Promise<boolean>;
    listAllCampaigns(): Promise<Array<OutreachCampaign>>;
    listAllOutreachMessages(): Promise<Array<OutreachMessage>>;
    listClients(): Promise<Array<Client>>;
    listConversionScripts(): Promise<Array<ConversionScript>>;
    listGrowthReports(clientId: bigint): Promise<Array<GrowthReport>>;
    listGrowthSuggestions(clientId: ClientId): Promise<Array<GrowthSuggestion>>;
    listLandingPages(): Promise<Array<LandingPage>>;
    listLeads(): Promise<Array<Lead>>;
    listLeadsByStatus(status: LeadStatus): Promise<Array<Lead>>;
    listNotesByLead(leadId: LeadId): Promise<Array<Note>>;
    listProposalsByLead(leadId: LeadId): Promise<Array<Proposal>>;
    listScraperJobs(): Promise<Array<ScraperJob>>;
    listSeoAudits(): Promise<Array<SeoAuditRecord>>;
    listWhatsAppTemplates(): Promise<Array<WhatsAppTemplate>>;
    markSuggestionImplemented(id: SuggestionId): Promise<boolean>;
    moveLead(id: LeadId, status: LeadStatus): Promise<boolean>;
    publishLandingPage(id: LandingPageId): Promise<boolean>;
    recordConsentLog(phone: string, email: string, consentType: ConsentType, template: string, userId: string, notes: string): Promise<ConsentLogId>;
    recordDailyAction(actionType: string): Promise<GamificationState>;
    recordDeliveryStats(identityId: SenderIdentityId, date: string, delivered: bigint, replied: bigint, bounced: bigint, optOut: bigint, blocked: bigint): Promise<DeliverabilityStatId>;
    runSeoAudit(url: string): Promise<SeoAuditRecord>;
    saveOnboardingPrefs(niche: string, city: string, targetBudget: bigint): Promise<void>;
    saveWebsiteTemplate(input: SaveTemplateInput): Promise<WebsiteTemplate>;
    setGA4Credentials(propertyId: string, apiKey: string): Promise<void>;
    submitTemplateForApproval(id: WhatsAppTemplateId): Promise<boolean>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    transformGA4(input: TransformationInput): Promise<TransformationOutput>;
    updateCampaignStats(id: bigint, deliveredCount: bigint, repliedCount: bigint, status: string): Promise<OutreachCampaign>;
    updateClientMetrics(input: UpdateClientMetricsInput): Promise<boolean>;
    updateConsentStatus(id: ConsentLogId, status: ConsentStatus): Promise<boolean>;
    updateLead(input: UpdateLeadInput): Promise<boolean>;
    updateOutreachMessageStatus(id: bigint, status: string, timestamp: Timestamp | null): Promise<OutreachMessage>;
    updateScraperJobProgress(id: bigint, processed: bigint, progress: bigint, status: string): Promise<ScraperJob>;
    updateSenderReputation(id: SenderIdentityId, delivered: bigint, replied: bigint, bounced: bigint, optOut: bigint): Promise<boolean>;
    updateTemplateApprovalStatus(id: WhatsAppTemplateId, status: WhatsAppTemplateStatus, rejectionReason: string | null): Promise<boolean>;
    upsertMySubscription(sub: UserSubscription): Promise<void>;
}
