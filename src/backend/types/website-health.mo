import Common "common";

module {
  /// Unique identifier for a website audit record.
  public type AuditId = Nat;

  /// Severity of an issue found during a website audit.
  public type IssueSeverity = {
    #Critical;
    #Warning;
    #Minor;
  };

  /// Category of action needed to fix an issue.
  /// Maps to actionable fix buttons shown in the UI.
  public type FixCategory = {
    #WhatsApp;    // "Add WhatsApp button"
    #Speed;       // "Improve page speed"
    #Seo;         // "Fix search visibility"
    #Cta;         // "Add call-to-action"
    #Content;     // "Fix headings / content"
    #Security;    // "Fix security issues"
    #Mobile;      // "Fix mobile layout"
    #Images;      // "Optimize images"
  };

  /// Effort level required to apply a fix.
  public type FixDifficulty = {
    #Easy;
    #Medium;
    #Hard;
  };

  /// Maps to the fixType field in API contract.
  public type FixType = {
    #one_click;
    #guided;
    #developer_needed;
  };

  /// A single issue discovered during an audit.
  /// Language is business-outcome focused — no technical jargon.
  public type AuditIssue = {
    /// Plain-language description of the problem (e.g., "You may not appear in search results")
    problem : Text;
    /// Business impact statement (e.g., "You are losing enquiries")
    businessImpact : Text;
    /// Estimated monthly customer loss range. Both in number of customers (not revenue).
    /// Disclaimer: "Based on general usage patterns"
    estimatedLossMin : Nat;
    estimatedLossMax : Nat;
    severity : IssueSeverity;
    fixCategory : FixCategory;
    difficulty : FixDifficulty;
    fixType : FixType;
    /// AI-generated plain-English explanation and step-by-step fix guidance
    aiFixSuggestion : Text;
  };

  /// Category scores breakdown (max points as per spec).
  /// Performance: 25, SEO: 25, Mobile: 15, Security: 15, Conversion: 20
  public type CategoryScores = {
    speed      : Nat;   // 0–25 (performance)
    seo        : Nat;   // 0–25
    mobile     : Nat;   // 0–15
    security   : Nat;   // 0–15
    conversion : Nat;   // 0–20
    // kept for backward compat, unused in new scans
    content    : Nat;   // 0–100 (legacy)
  };

  /// Raw signals parsed from the fetched HTML page.
  /// All fields reflect what was detected in the actual HTTP response.
  public type RawMetrics = {
    // SEO
    hasTitle            : Bool;
    titleLength         : Int;
    hasMetaDesc         : Bool;
    metaDescLength      : Int;
    hasH1               : Bool;
    hasCanonical        : Bool;
    robotsTxtFound      : Bool;
    sitemapFound        : Bool;
    // Mobile
    hasViewport         : Bool;
    hasMediaQueries     : Bool;
    // Security (from URL + headers)
    httpsEnabled        : Bool;
    hasMixedContent     : Bool;
    hasHSTS             : Bool;
    hasXFrame           : Bool;
    hasXContentType     : Bool;
    // Conversion
    hasWhatsAppLink     : Bool;
    hasPhoneNumber      : Bool;
    hasContactForm      : Bool;
    hasCTA              : Bool;
    hasGoogleMap        : Bool;
    // Performance
    imageCount          : Int;
    imagesMissingAlt    : Int;
    renderBlockingScripts : Int;
    // Local business signals
    hasBusinessName     : Bool;
    hasAddress          : Bool;
    hasOpeningHours     : Bool;
    hasTestimonials     : Bool;
    // Links
    internalLinkCount   : Int;
  };

  /// Simulated competitor comparison record stored per audit.
  public type CompetitorRecord = {
    /// Competitor name (e.g., "Competitor A (nearby)") — never a real brand name
    competitorName : Text;
    overallScore   : Nat;
    speedScore     : Nat;
    seoScore       : Nat;
    mobileScore    : Nat;
    securityScore  : Nat;
    conversionScore : Nat;
  };

  /// Monitor record for weekly re-scan scheduling.
  public type MonitorRecord = {
    userId       : Principal;
    url          : Text;
    active       : Bool;
    frequency    : Text;   // "weekly"
    lastScanAt   : Int;    // nanoseconds timestamp; 0 = never scanned
  };

  /// A complete website audit snapshot for one URL at one point in time.
  public type AuditRecord = {
    id              : AuditId;
    userId          : Principal;
    url             : Text;
    createdAt       : Common.Timestamp;
    overallScore    : Nat;              // 0–100 weighted average
    categoryScores  : CategoryScores;
    issues          : [AuditIssue];
    competitors     : [CompetitorRecord]; // 3–5 entries; empty for free tier
    rawMetrics      : ?RawMetrics;        // null for free tier
    scanDurationMs  : Int;
    monitorActive   : Bool;
    lastMonitorScanAt : Int;
  };

  /// Summary used for weekly health report generation.
  public type WeeklyReportData = {
    userId             : Principal;
    url                : Text;
    latestScore        : Nat;
    previousScore      : Nat;
    scoreDelta         : Int;           // positive = improvement
    newIssueCount      : Nat;
    resolvedIssueCount : Nat;
    topRecommendation  : Text;          // plain-language top priority action
    generatedAt        : Common.Timestamp;
  };

  /// Per-user scan rate limit record — enforces premium gating.
  /// free: 1/week · starter: 2/week · growth+: unlimited
  public type ScanLimitRecord = {
    userId        : Principal;
    planTier      : Common.PlanTier;
    scansThisWeek : Nat;
    weekStartedAt : Common.Timestamp;
  };

  /// Counters used internally for ID generation.
  public type WebsiteHealthCounters = {
    var nextAuditId : Nat;
  };

  /// Admin analytics event record.
  public type WHEvent = {
    userId    : Text;   // Principal as text
    eventName : Text;
    metadata  : Text;
    createdAt : Common.Timestamp;
  };
};
