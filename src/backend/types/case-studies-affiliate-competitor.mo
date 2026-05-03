import Common "common";

module {
  // ── Case Study ───────────────────────────────────────────────────────────

  public type ResultMetric = {
    metricLabel : Text;
    before      : Text;
    after       : Text;
  };

  public type CaseStudy = {
    id               : Text;
    userId           : Text;
    clientName       : Text;
    clientCity       : Text;
    clientNiche      : Text;
    problemStatement : Text;
    actionsToken     : [Text];
    resultMetrics    : [ResultMetric];
    testimonialQuote : ?Text;
    createdAt        : Int;
    isPublished      : Bool;
    shareToken       : Text;
  };

  public type CaseStudyUpdate = {
    clientName       : ?Text;
    clientCity       : ?Text;
    clientNiche      : ?Text;
    problemStatement : ?Text;
    actionsToken     : ?[Text];
    resultMetrics    : ?[ResultMetric];
    testimonialQuote : ?Text;
  };

  // ── Affiliate / Commission ────────────────────────────────────────────────

  // status values: "pending" | "paid"
  public type CommissionRecord = {
    id             : Text;
    referrerId     : Text;
    referredUserId : Text;
    planTier       : Text;
    planAmount     : Nat;
    commissionRate : Float;
    commissionAmount : Nat;
    status         : Text;
    createdAt      : Int;
    paidAt         : ?Int;
  };

  public type AffiliateStats = {
    totalEarnings     : Nat;
    pendingEarnings   : Nat;
    paidEarnings      : Nat;
    totalReferrals    : Nat;
    conversionRate    : Float;
    commissionHistory : [CommissionRecord];
  };

  public type PayoutRequest = {
    requestId   : Text;
    userId      : Text;
    amount      : Nat;
    bankDetails : Text;
    status      : Text; // "pending" | "processed"
    createdAt   : Int;
  };

  public type CaseStudyCounters = {
    var nextCaseStudyId   : Nat;
    var nextCommissionId  : Nat;
    var nextPayoutId      : Nat;
  };

  // ── Competitor Intelligence ───────────────────────────────────────────────

  public type SeoSignals = {
    titlePresent   : Bool;
    metaPresent    : Bool;
    h1Count        : Nat;
    internalLinks  : Nat;
    schemaPresent  : Bool;
  };

  public type CompetitorProfile = {
    url              : Text;
    name             : ?Text;
    estimatedTraffic : Text;
    seoSignals       : SeoSignals;
    socialLinks      : [Text];
    ctaPresent       : Bool;
    whatsappPresent  : Bool;
    pageSpeed        : ?Nat;
    lastScannedAt    : Int;
  };

  public type CompetitorIntelReport = {
    userId          : Text;
    yourUrl         : Text;
    competitors     : [CompetitorProfile];
    keywordGaps     : [Text];
    adSpendEstimate : Text;
    lastUpdatedAt   : Int;
  };

  public type SavedCompetitorConfig = {
    userId          : Text;
    yourUrl         : Text;
    competitorUrls  : [Text];
    savedAt         : Int;
  };
};
