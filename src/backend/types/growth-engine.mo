module {
  // ─── WhatsApp Template Manager ───────────────────────────────────────────────

  public type WhatsAppTemplateId = Nat;

  public type WhatsAppTemplateCategory = {
    #lead_outreach;
    #follow_up;
    #proposal_sharing;
  };

  public type WhatsAppTemplateStatus = {
    #pending;
    #approved;
    #rejected;
    #paused;
  };

  public type WhatsAppTemplate = {
    id : WhatsAppTemplateId;
    name : Text;
    category : WhatsAppTemplateCategory;
    body : Text; // template body with {{variable}} placeholders
    variables : [Text]; // list of variable names used
    status : WhatsAppTemplateStatus;
    rejectionReason : ?Text;
    usageCount : Nat;
    replyRate : Nat; // 0-100
    createdAt : Int;
    submittedAt : ?Int;
    approvedAt : ?Int;
  };

  public type WhatsAppTemplateCounters = { var nextTemplateId : Nat };

  // ─── Niche Landing Page ───────────────────────────────────────────────────────

  public type LandingPageId = Nat;

  public type LandingPageNiche = {
    #salon;
    #gym;
    #medical;
    #cafe;
    #plumber;
    #real_estate;
    #education;
    #restaurant;
    #agency;
  };

  public type LandingPageStatus = {
    #draft;
    #published;
    #archived;
  };

  public type LandingPageSection = {
    hero : Text; // headline text
    subheadline : Text;
    painPoints : [Text]; // 3-5 pain point bullets
    beforeAfter : { before : Text; after : Text };
    testimonials : [{ name : Text; business : Text; quote : Text }];
    ctaText : Text;
    formTitle : Text;
  };

  public type LandingPage = {
    id : LandingPageId;
    niche : LandingPageNiche;
    city : Text;
    serviceDescription : Text;
    targetBudget : Text;
    sections : LandingPageSection;
    status : LandingPageStatus;
    estimatedConversionRate : Nat; // simulated %
    estimatedLeadScore : Nat; // simulated 0-100
    createdAt : Int;
    publishedAt : ?Int;
    leadsCaptured : Nat;
  };

  public type LandingPageCounters = { var nextLandingPageId : Nat };

  // ─── Conversion Script ────────────────────────────────────────────────────────

  public type ConversionScriptId = Nat;

  public type ScriptType = {
    #call_script;
    #email_sequence;
    #chat_suggestion;
  };

  public type ConversionScript = {
    id : ConversionScriptId;
    scriptType : ScriptType;
    serviceType : Text;
    painPoint : Text;
    budgetTier : Text; // "budget" | "mid" | "premium"
    opener : Text;
    valueProp : Text;
    discoveryQuestions : [Text];
    closingTalk : Text;
    objectionHandlers : [{ objection : Text; softResponse : Text; directResponse : Text }];
    createdAt : Int;
  };

  public type ConversionScriptCounters = { var nextScriptId : Nat };

  // ─── SEO Audit ────────────────────────────────────────────────────────────────

  public type SeoAuditId = Nat;

  public type SeoAuditItem = {
    itemLabel : Text;
    status : { #pass; #fail; #warning };
    suggestion : Text;
  };

  public type SeoAuditRecord = {
    id : SeoAuditId;
    url : Text;
    titleScore : Nat; // 0-100
    metaScore : Nat;
    headingScore : Nat;
    keywordDensityScore : Nat;
    mobileFriendlyScore : Nat;
    pageSpeedScore : Nat;
    items : [SeoAuditItem];
    blogOutlines : [{ title : Text; outline : [Text]; targetKeyword : Text; wordCount : Nat }];
    createdAt : Int;
  };

  public type SeoAuditCounters = { var nextAuditId : Nat };

  // ─── Client Growth Report ─────────────────────────────────────────────────────

  public type GrowthReportId = Nat;

  public type WeeklyAction = {
    action : Text;
    rationale : Text;
    estimatedImpact : Text;
    category : {
      #run_offer;
      #post_content;
      #launch_ad;
      #collect_reviews;
      #local_seo;
      #upsell;
    };
  };

  public type GrowthReport = {
    id : GrowthReportId;
    clientId : Nat; // references ClientId
    weekOf : Text; // ISO date string "YYYY-WW"
    monthOf : Text; // "YYYY-MM"
    weeklyActions : [WeeklyAction];
    revenueStrategies : [Text]; // upsell/combo/retention suggestions
    marketingSuggestions : [Text]; // instagram reels, local SEO, review collection
    leadsGenerated : Nat;
    conversionRate : Nat; // 0-100
    revenueImpact : Nat; // in INR
    nextActions : [Text];
    reportNarrative : Text; // plain language summary
    createdAt : Int;
  };

  public type GrowthReportCounters = { var nextReportId : Nat };

  // ─── Combined Counters ────────────────────────────────────────────────────────

  public type GrowthEngineCounters = {
    var nextTemplateId : Nat;
    var nextLandingPageId : Nat;
    var nextScriptId : Nat;
    var nextAuditId : Nat;
    var nextReportId : Nat;
  };
};
