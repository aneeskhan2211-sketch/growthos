import Common "common";

module {
  // ─── Auto Agency State ────────────────────────────────────────────────────────

  public type AutoAgencyActionType = {
    #leadFound;
    #outreachSent;
    #followupSent;
    #dealSuggested;
    #reportGenerated;
  };

  public type AutoAgencyAction = {
    actionId : Text;
    actionType : AutoAgencyActionType;
    timestamp : Int;
    description : Text;
    leadName : Text;
    outcome : Text;
  };

  public type AutoAgencyState = {
    var toggleEnabled : Bool;
    var lastRunTime : Int;
    var nextRunTime : Int;
    var dailyLeadsGenerated : Nat;
    var dailyOutreachSent : Nat;
    var dailyFollowupsSent : Nat;
    var runCount : Nat;
    var lastActivityFeed : [AutoAgencyAction];
  };

  public type AutoAgencyStateView = {
    toggleEnabled : Bool;
    lastRunTime : Int;
    nextRunTime : Int;
    dailyLeadsGenerated : Nat;
    dailyOutreachSent : Nat;
    dailyFollowupsSent : Nat;
    runCount : Nat;
    lastActivityFeed : [AutoAgencyAction];
  };

  // ─── Deal Suggestion ──────────────────────────────────────────────────────────

  public type DealSuggestion = {
    suggestionId : Text;
    leadId : Common.LeadId;
    closeProbability : Nat;
    suggestedPrice : Nat;
    suggestedPitch : Text;
    bestContactTime : Text;
    pricingTier : Text;
    createdAt : Int;
  };

  // ─── Accountability ───────────────────────────────────────────────────────────

  public type AccountabilityState = {
    var dailyLeadsContacted : Nat;
    var dailyFollowupsDone : Nat;
    var dailyDealsClosed : Nat;
    var targetLeads : Nat;
    var targetFollowups : Nat;
    var targetDeals : Nat;
    var currentStreak : Nat;
    var lastTaskDate : Int;
    var streakMilestones : [Nat];
    var todayComplete : Bool;
  };

  public type AccountabilityStateView = {
    dailyLeadsContacted : Nat;
    dailyFollowupsDone : Nat;
    dailyDealsClosed : Nat;
    targetLeads : Nat;
    targetFollowups : Nat;
    targetDeals : Nat;
    currentStreak : Nat;
    lastTaskDate : Int;
    streakMilestones : [Nat];
    todayComplete : Bool;
  };

  // ─── Client Growth Plan ───────────────────────────────────────────────────────

  public type GrowthPlanItemStatus = {
    #pending;
    #approved;
    #done;
  };

  public type GrowthPlanItemEffort = {
    #quick;
    #medium;
    #deep;
  };

  public type GrowthPlanItem = {
    title : Text;
    description : Text;
    effort : GrowthPlanItemEffort;
    priorityScore : Nat;
    estimatedRevenue : Nat;
    status : GrowthPlanItemStatus;
  };

  public type ClientGrowthPlanStatus = {
    #pending;
    #approved;
    #executing;
  };

  public type ClientGrowthPlan = {
    planId : Text;
    clientId : Common.ClientId;
    weekOf : Int;
    seoPlan : [GrowthPlanItem];
    adsPlan : [GrowthPlanItem];
    contentIdeas : [GrowthPlanItem];
    approvalStatus : ClientGrowthPlanStatus;
    generatedAt : Int;
  };

  // ─── Performance Score ────────────────────────────────────────────────────────

  public type PerformanceScore = {
    userId : Text;
    activityScore : Nat;
    conversionRate : Nat;
    revenueScore : Nat;
    overallScore : Nat;
    percentileRank : Nat;
    estimatedMonthlyRevenue : Nat;
    rank : Text;
    updatedAt : Int;
  };

  // ─── Revenue Prediction ───────────────────────────────────────────────────────

  public type RevenuePrediction = {
    weeklyEstimate : Nat;
    monthlyEstimate : Nat;
    pipelineValue : Nat;
    missedOppCount : Nat;
    hotLeadsCount : Nat;
    closingThisWeek : Nat;
    predictionBasis : Text;
    generatedAt : Int;
  };

  // ─── Marketplace ──────────────────────────────────────────────────────────────

  public type MarketplaceListingType = {
    #buyLeads;
    #sellService;
    #hireFreelancer;
  };

  public type MarketplaceListing = {
    listingId : Text;
    listingType : MarketplaceListingType;
    title : Text;
    description : Text;
    price : Nat;
    sellerId : Text;
    sellerName : Text;
    reviewCount : Nat;
    avgRating : Nat;
    tags : [Text];
    isActive : Bool;
    createdAt : Int;
  };

  // ─── Auto Report ──────────────────────────────────────────────────────────────

  public type AutoReportStatus = {
    #draft;
    #ready;
    #sent;
  };

  public type AutoReport = {
    reportId : Text;
    clientId : Common.ClientId;
    reportPeriod : Text;
    leadsGenerated : Nat;
    conversions : Nat;
    revenueImpact : Nat;
    roi : Nat;
    topChannel : Text;
    nextSteps : [Text];
    status : AutoReportStatus;
    generatedAt : Int;
    sentAt : ?Int;
  };

  // ─── Counters ─────────────────────────────────────────────────────────────────

  public type AutoAgencyCounters = {
    var nextAutoAgencyActionId : Nat;
    var nextSuggestionId : Nat;
    var nextPlanId : Nat;
    var nextListingId : Nat;
    var nextReportId : Nat;
  };
};
