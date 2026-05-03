import Common "common";
import CI "compliance-and-ingestion";

module {
  // ── Lead ──────────────────────────────────────────────────────────────────

  public type LeadStatus = {
    #new_;
    #contacted;
    #proposal;
    #closed;
  };

  public type Lead = {
    id : Common.LeadId;
    businessName : Text;
    website : Text;
    rating : Float;
    phone : Text;
    address : Text;
    industry : Text;
    city : Text;
    leadScore : Nat; // 0-100
    status : LeadStatus;
    notes : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    // Compliance & scoring extensions
    scoreBreakdown : ?CI.LeadScoreBreakdown;
    priorityTag : ?CI.PriorityTag;
    consentStatus : ?CI.ConsentStatus;
    optedOut : Bool;
    attemptCount : Nat;
    leadSource : Text; // "organic" | "paid_ads" | "referral" | "lead_magnet" | "manual_import"
    referredBy : ?Common.LeadId;
  };

  public type CreateLeadInput = {
    businessName : Text;
    website : Text;
    rating : Float;
    phone : Text;
    address : Text;
    industry : Text;
    city : Text;
    leadScore : Nat;
    notes : Text;
  };

  public type UpdateLeadInput = {
    id : Common.LeadId;
    businessName : Text;
    website : Text;
    rating : Float;
    phone : Text;
    address : Text;
    industry : Text;
    city : Text;
    leadScore : Nat;
    status : LeadStatus;
    notes : Text;
  };

  // ── Note / Reminder ───────────────────────────────────────────────────────

  public type NoteType = {
    #note;
    #reminder;
  };

  public type Note = {
    id : Common.NoteId;
    leadId : Common.LeadId;
    content : Text;
    noteType : NoteType;
    dueDate : ?Common.Timestamp;
    completed : Bool;
    createdAt : Common.Timestamp;
  };

  public type CreateNoteInput = {
    leadId : Common.LeadId;
    content : Text;
    noteType : NoteType;
    dueDate : ?Common.Timestamp;
  };

  // ── Proposal ──────────────────────────────────────────────────────────────

  public type Proposal = {
    id : Common.ProposalId;
    leadId : Common.LeadId;
    businessName : Text;
    niche : Text;
    seoStrategy : Text;
    adsStrategy : Text;
    websiteStrategy : Text;
    pricingBreakdown : Text;
    generatedAt : Common.Timestamp;
  };

  public type CreateProposalInput = {
    leadId : Common.LeadId;
    businessName : Text;
    niche : Text;
  };

  // ── Client ────────────────────────────────────────────────────────────────

  public type ClientMetrics = {
    traffic : Nat;
    leads : Nat;
    conversions : Nat;
    revenue : Float;
  };

  public type Client = {
    id : Common.ClientId;
    leadId : Common.LeadId;
    businessName : Text;
    startDate : Common.Timestamp;
    metrics : ClientMetrics;
    reportDate : Common.Timestamp;
  };

  public type CreateClientInput = {
    leadId : Common.LeadId;
    businessName : Text;
    startDate : Common.Timestamp;
  };

  public type UpdateClientMetricsInput = {
    id : Common.ClientId;
    metrics : ClientMetrics;
    reportDate : Common.Timestamp;
  };

  // ── Website Template ──────────────────────────────────────────────────────

  public type TemplateSections = {
    hero : Text;
    features : Text;
    testimonials : Text;
    cta : Text;
    footer : Text;
  };

  public type WebsiteTemplate = {
    id : Common.TemplateId;
    clientId : Common.ClientId;
    templateId : Text;
    templateName : Text;
    sections : TemplateSections;
    lastSaved : Common.Timestamp;
  };

  public type SaveTemplateInput = {
    clientId : Common.ClientId;
    templateId : Text;
    templateName : Text;
    sections : TemplateSections;
  };

  // ── Growth Suggestion ─────────────────────────────────────────────────────

  public type SuggestionPriority = {
    #high;
    #medium;
    #low;
  };

  public type GrowthSuggestion = {
    id : Common.SuggestionId;
    clientId : Common.ClientId;
    title : Text;
    description : Text;
    priority : SuggestionPriority;
    estimatedImpact : Text;
    category : Text;
    implemented : Bool;
    dismissed : Bool;
    weekOf : Common.Timestamp;
  };

  public type CreateSuggestionInput = {
    clientId : Common.ClientId;
    title : Text;
    description : Text;
    priority : SuggestionPriority;
    estimatedImpact : Text;
    category : Text;
    weekOf : Common.Timestamp;
  };

  // ── Subscription ──────────────────────────────────────────────────────────

  public type SubscriptionPlan = {
    #free;
    #starter;
    #growth;
    #pro;
    #agency;
  };

  public type SubscriptionStatus = {
    #active;
    #inactive;
    #trialing;
    #pastDue;
    #canceled;
  };

  public type BillingCycle = {
    #monthly;
    #yearly;
  };

  public type PlanLimits = {
    dailyLeads : Nat;
    aiPitchGenerator : Bool;
    autoFollowUp : Bool;
    crmPipeline : Bool;
    seoChecklist : Bool;
    aiProposalGenerator : Bool;
    campaignBuilder : Bool;
    advancedAnalytics : Bool;
    whiteLabelReports : Bool;
    teamAccess : Bool;
    unlimitedLeads : Bool;
    premiumAutomation : Bool;
  };

  public type UserSubscription = {
    plan : SubscriptionPlan;
    leadCredits : Nat;
    subscriptionStatus : SubscriptionStatus;
    stripeCustomerId : Text;
    monthlyPrice : Nat;
    yearlyPrice : Nat;
    billingCycle : BillingCycle;
    trialExpiresAt : ?Int;
  };
};
