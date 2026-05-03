import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/auto-agency";
import CoreT "../types/core-data";

module {
  // ─── Helpers ──────────────────────────────────────────────────────────────────

  func natToText(n : Nat) : Text { debug_show(n) };

  // Heuristic: leads contacted 2-7 days ago (window in nanoseconds)
  let DAY_NS : Int = 86_400_000_000_000;

  func pitchForIndustry(industry : Text) : Text {
    if (industry == "Gym" or industry == "gym") {
      "Hi! We help gyms grow memberships by 40% with targeted digital ads. Would you like a free audit?"
    } else if (industry == "Salon" or industry == "salon") {
      "Hi! We help salons attract 50+ new clients/month via Google & Instagram. Free 15-min strategy call?"
    } else if (industry == "Restaurant" or industry == "restaurant") {
      "Hi! We help restaurants fill seats with local SEO & social ads. Interested in a free growth plan?"
    } else if (industry == "Clinic" or industry == "clinic") {
      "Hi! We help clinics generate quality patient leads. Can we share a free audit of your online presence?"
    } else if (industry == "Real Estate" or industry == "real estate") {
      "Hi! We help real estate agents close deals faster with targeted digital campaigns. Free consult?"
    } else {
      "Hi! We help local businesses like yours grow with digital marketing. Free audit available — interested?"
    }
  };

  func bestTimeForIndustry(industry : Text) : Text {
    if (industry == "Gym" or industry == "gym" or industry == "Salon" or industry == "salon") {
      "Morning (9-11 AM)"
    } else if (industry == "Restaurant" or industry == "restaurant") {
      "Afternoon (2-4 PM)"
    } else {
      "Morning (10 AM - 12 PM)"
    }
  };

  // ─── Auto Agency State ────────────────────────────────────────────────────────

  public func getAutoAgencyState(state : T.AutoAgencyState) : T.AutoAgencyStateView {
    {
      toggleEnabled = state.toggleEnabled;
      lastRunTime = state.lastRunTime;
      nextRunTime = state.nextRunTime;
      dailyLeadsGenerated = state.dailyLeadsGenerated;
      dailyOutreachSent = state.dailyOutreachSent;
      dailyFollowupsSent = state.dailyFollowupsSent;
      runCount = state.runCount;
      lastActivityFeed = state.lastActivityFeed;
    }
  };

  public func setAutoAgencyEnabled(state : T.AutoAgencyState, enabled : Bool) {
    state.toggleEnabled := enabled;
  };

  public func runAgencyCycle(
    state : T.AutoAgencyState,
    counters : T.AutoAgencyCounters,
    leads : List.List<CoreT.Lead>,
    dealSuggestions : List.List<T.DealSuggestion>,
    accountability : T.AccountabilityState,
  ) {
    if (not state.toggleEnabled) return;

    // 1) Refresh deal suggestions
    refreshDealSuggestions(dealSuggestions, counters, leads);

    // 2) Simulate finding 10 new leads
    state.dailyLeadsGenerated := state.dailyLeadsGenerated + 10;

    // 3) Outreach: min(5, count of new leads with score > 60)
    let highScoreNew = leads.filter(func(l : CoreT.Lead) : Bool {
      l.leadScore > 60 and l.status == #new_
    });
    let outreachCount = if (highScoreNew.size() < 5) highScoreNew.size() else 5;
    state.dailyOutreachSent := state.dailyOutreachSent + outreachCount;

    // 4) Follow-ups: leads contacted 2-7 days ago
    let now = Time.now();
    let followupLeads = leads.filter(func(l : CoreT.Lead) : Bool {
      let age = now - l.updatedAt;
      l.status == #contacted and age >= 2 * DAY_NS and age <= 7 * DAY_NS
    });
    state.dailyFollowupsSent := state.dailyFollowupsSent + followupLeads.size();

    // 5) Build activity feed entries (max 20, FIFO)
    let newActions : [T.AutoAgencyAction] = [
      {
        actionId = natToText(counters.nextAutoAgencyActionId);
        actionType = #leadFound;
        timestamp = now;
        description = "Found 10 new leads in your target niche";
        leadName = "Multiple leads";
        outcome = "Added to pipeline";
      },
      {
        actionId = natToText(counters.nextAutoAgencyActionId + 1);
        actionType = #outreachSent;
        timestamp = now;
        description = "Sent outreach to " # natToText(outreachCount) # " high-score leads";
        leadName = "High-score leads";
        outcome = "Awaiting reply";
      },
      {
        actionId = natToText(counters.nextAutoAgencyActionId + 2);
        actionType = #followupSent;
        timestamp = now;
        description = "Sent follow-ups to " # natToText(followupLeads.size()) # " leads";
        leadName = "Contacted leads";
        outcome = "Follow-up queued";
      },
    ];
    counters.nextAutoAgencyActionId := counters.nextAutoAgencyActionId + 3;

    // Merge new actions with existing feed, keep last 20
    let combined = state.lastActivityFeed.concat(newActions);
    let feedSize = combined.size();
    state.lastActivityFeed := if (feedSize <= 20) {
      combined
    } else {
      combined.sliceToArray(feedSize - 20, feedSize)
    };

    // 6-7) Update timestamps
    let nowInt = now;
    state.lastRunTime := nowInt;
    state.nextRunTime := nowInt + DAY_NS;
    state.runCount := state.runCount + 1;
  };

  // ─── Deal Suggestions ────────────────────────────────────────────────────────

  public func getDealSuggestions(dealSuggestions : List.List<T.DealSuggestion>) : [T.DealSuggestion] {
    dealSuggestions.toArray()
  };

  public func refreshDealSuggestions(
    dealSuggestions : List.List<T.DealSuggestion>,
    counters : T.AutoAgencyCounters,
    leads : List.List<CoreT.Lead>,
  ) {
    // Clear existing suggestions
    dealSuggestions.clear();

    // Collect eligible leads: score > 70, not closed
    let eligible = leads.filter(func(l : CoreT.Lead) : Bool {
      l.leadScore > 70 and l.status != #closed
    });

    // Build suggestions
    let now = Time.now();
    for (lead in eligible.values()) {
      let price : Nat = if (lead.leadScore > 90) 50000 else if (lead.leadScore > 75) 25000 else 15000;
      let tier : Text = if (lead.leadScore > 90) "Premium (₹50k)" else if (lead.leadScore > 75) "Growth (₹25k)" else "Starter (₹15k)";
      let suggestion : T.DealSuggestion = {
        suggestionId = natToText(counters.nextSuggestionId);
        leadId = lead.id;
        closeProbability = lead.leadScore;
        suggestedPrice = price;
        suggestedPitch = pitchForIndustry(lead.industry);
        bestContactTime = bestTimeForIndustry(lead.industry);
        pricingTier = tier;
        createdAt = now;
      };
      counters.nextSuggestionId := counters.nextSuggestionId + 1;
      dealSuggestions.add(suggestion);
    };

    // Sort by closeProbability descending, keep top 10
    let sorted = dealSuggestions.sort(func(a : T.DealSuggestion, b : T.DealSuggestion) : { #less; #equal; #greater } {
      if (a.closeProbability > b.closeProbability) #less
      else if (a.closeProbability < b.closeProbability) #greater
      else #equal
    });
    dealSuggestions.clear();
    var count = 0;
    for (s in sorted.values()) {
      if (count < 10) {
        dealSuggestions.add(s);
        count := count + 1;
      };
    };
  };

  // ─── Accountability ───────────────────────────────────────────────────────────

  public func getAccountabilityState(accountability : T.AccountabilityState) : T.AccountabilityStateView {
    {
      dailyLeadsContacted = accountability.dailyLeadsContacted;
      dailyFollowupsDone = accountability.dailyFollowupsDone;
      dailyDealsClosed = accountability.dailyDealsClosed;
      targetLeads = accountability.targetLeads;
      targetFollowups = accountability.targetFollowups;
      targetDeals = accountability.targetDeals;
      currentStreak = accountability.currentStreak;
      lastTaskDate = accountability.lastTaskDate;
      streakMilestones = accountability.streakMilestones;
      todayComplete = accountability.todayComplete;
    }
  };

  public func updateDailyProgress(
    accountability : T.AccountabilityState,
    leadsContacted : Nat,
    followupsDone : Nat,
    dealsClosed : Nat,
  ) {
    accountability.dailyLeadsContacted := accountability.dailyLeadsContacted + leadsContacted;
    accountability.dailyFollowupsDone := accountability.dailyFollowupsDone + followupsDone;
    accountability.dailyDealsClosed := accountability.dailyDealsClosed + dealsClosed;

    // Check if daily targets met
    let targetsComplete =
      accountability.dailyLeadsContacted >= accountability.targetLeads and
      accountability.dailyFollowupsDone >= accountability.targetFollowups and
      accountability.dailyDealsClosed >= accountability.targetDeals;

    if (targetsComplete and not accountability.todayComplete) {
      accountability.todayComplete := true;
      accountability.currentStreak := accountability.currentStreak + 1;
      accountability.lastTaskDate := Time.now();

      // Record streak milestones (3, 7, 14, 30)
      let newStreak = accountability.currentStreak;
      if (newStreak == 3 or newStreak == 7 or newStreak == 14 or newStreak == 30) {
        accountability.streakMilestones := accountability.streakMilestones.concat([newStreak]);
      };
    };
  };

  // ─── Revenue Prediction ───────────────────────────────────────────────────────

  public func getRevenuePrediction(
    leads : List.List<CoreT.Lead>,
    _dealSuggestions : List.List<T.DealSuggestion>,
  ) : T.RevenuePrediction {
    let now = Time.now();

    var newCount : Nat = 0;
    var contactedCount : Nat = 0;
    var interestedCount : Nat = 0; // contacted + score > 60 treated as "interested"
    var proposalCount : Nat = 0;
    var closedCount : Nat = 0;
    var hotLeadsCount : Nat = 0;
    var missedOppCount : Nat = 0;

    for (lead in leads.values()) {
      switch (lead.status) {
        case (#new_) { newCount := newCount + 1 };
        case (#contacted) {
          contactedCount := contactedCount + 1;
          if (lead.leadScore > 60) {
            interestedCount := interestedCount + 1;
          };
          // Missed opp: contacted > 7 days ago with no follow-up (score > 60)
          let age = now - lead.updatedAt;
          if (age > 7 * DAY_NS and lead.leadScore > 60) {
            missedOppCount := missedOppCount + 1;
          };
        };
        case (#proposal) { proposalCount := proposalCount + 1 };
        case (#closed) { closedCount := closedCount + 1 };
      };
      if (lead.leadScore > 80) {
        hotLeadsCount := hotLeadsCount + 1;
      };
    };

    let weeklyEstimate = interestedCount * 15_000 + proposalCount * 35_000;
    let monthlyEstimate = weeklyEstimate * 4;

    // Pipeline value: all non-closed leads estimated
    let pipelineValue = (newCount + contactedCount) * 15_000 + proposalCount * 35_000;

    let totalLeads = leads.size();
    let basis = "Based on " # natToText(totalLeads) # " leads in pipeline and " #
      (if (totalLeads > 0) natToText(closedCount * 100 / totalLeads) else "0") # "% avg conversion";

    {
      weeklyEstimate;
      monthlyEstimate;
      pipelineValue;
      missedOppCount;
      hotLeadsCount;
      closingThisWeek = proposalCount;
      predictionBasis = basis;
      generatedAt = now;
    }
  };

  // ─── Performance Score ────────────────────────────────────────────────────────

  public func getPerformanceScore(
    userId : Text,
    accountability : T.AccountabilityState,
    leads : List.List<CoreT.Lead>,
    _performanceScores : Map.Map<Text, T.PerformanceScore>,
  ) : T.PerformanceScore {
    let now = Time.now();

    // Activity score
    let rawActivity = accountability.dailyLeadsContacted * 5 +
      accountability.dailyFollowupsDone * 10 +
      accountability.dailyDealsClosed * 20;
    let activityScore : Nat = if (rawActivity > 100) 100 else rawActivity;

    // Conversion rate
    var closedCount : Nat = 0;
    let totalLeads = leads.size();
    for (lead in leads.values()) {
      if (lead.status == #closed) {
        closedCount := closedCount + 1;
      };
    };
    let conversionRate : Nat = if (totalLeads > 0) (closedCount * 100 / totalLeads) else 0;

    // Revenue score
    let rawRevenue = closedCount * 10;
    let revenueScore : Nat = if (rawRevenue > 100) 100 else rawRevenue;

    // Overall score (weighted)
    let overallScore : Nat = (activityScore * 30 + conversionRate * 40 + revenueScore * 30) / 100;

    // Percentile and rank
    let (percentileRank, rank) : (Nat, Text) = if (overallScore > 80) {
      (10, "Top 10% — Elite Agency")
    } else if (overallScore > 60) {
      (30, "Top 30% — Growth Agency")
    } else {
      (50, "Top 50% — Rising Agency")
    };

    let estimatedMonthlyRevenue = closedCount * 25_000;

    {
      userId;
      activityScore;
      conversionRate;
      revenueScore;
      overallScore;
      percentileRank;
      estimatedMonthlyRevenue;
      rank;
      updatedAt = now;
    }
  };

  // ─── Marketplace ──────────────────────────────────────────────────────────────

  public func getMarketplaceListings(listings : List.List<T.MarketplaceListing>) : [T.MarketplaceListing] {
    listings.filter(func(l : T.MarketplaceListing) : Bool { l.isActive }).toArray()
  };

  public func createMarketplaceListing(
    listings : List.List<T.MarketplaceListing>,
    counters : T.AutoAgencyCounters,
    sellerId : Text,
    sellerName : Text,
    listingType : T.MarketplaceListingType,
    title : Text,
    description : Text,
    price : Nat,
    tags : [Text],
  ) : T.MarketplaceListing {
    let listing : T.MarketplaceListing = {
      listingId = natToText(counters.nextListingId);
      listingType;
      title;
      description;
      price;
      sellerId;
      sellerName;
      reviewCount = 0;
      avgRating = 0;
      tags;
      isActive = true;
      createdAt = Time.now();
    };
    counters.nextListingId := counters.nextListingId + 1;
    listings.add(listing);
    listing
  };

  // ─── Seed marketplace listings ────────────────────────────────────────────────

  public func seedMarketplaceListings(
    listings : List.List<T.MarketplaceListing>,
    counters : T.AutoAgencyCounters,
  ) {
    if (listings.size() > 0) return; // Already seeded

    let now = Time.now();
    let seeds : [(T.MarketplaceListingType, Text, Text, Nat, Text, [Text])] = [
      // Buy Leads
      (#buyLeads, "Premium Gym Leads – Mumbai", "50 verified gym leads with contact details, avg score 80+", 2999, "LeadFactory", ["gym", "mumbai", "fitness"]),
      (#buyLeads, "Salon & Spa Leads – Delhi NCR", "100 salon leads ready for outreach, all score > 70", 4999, "ProLeads", ["salon", "delhi", "beauty"]),
      (#buyLeads, "Restaurant Leads – Bangalore", "75 restaurant leads with owner contact, avg rating 4+", 3499, "DataPro", ["restaurant", "bangalore", "food"]),
      // Sell Services
      (#sellService, "SEO Audit & Strategy Report", "Full SEO audit with 3-month growth roadmap for local businesses", 7999, "AgencyPro", ["seo", "audit", "strategy"]),
      (#sellService, "Google Ads Setup & Management", "Campaign setup, keyword research & 30-day management included", 12999, "AdsExpert", ["google-ads", "ppc", "management"]),
      (#sellService, "Social Media Content Pack – 30 Days", "30 custom posts + captions + hashtag sets for Instagram & Facebook", 5999, "ContentStudio", ["social-media", "content", "instagram"]),
      // Hire Freelancers
      (#hireFreelancer, "Performance Marketing Specialist", "3+ years experience in Google & Meta Ads. ₹800/hr", 800, "Ravi Kumar", ["google-ads", "meta-ads", "performance"]),
      (#hireFreelancer, "SEO Content Writer – Local Businesses", "Specialist in local SEO articles and landing pages. ₹500/hr", 500, "Priya Sharma", ["seo", "writing", "content"]),
      (#hireFreelancer, "WhatsApp Marketing Automation Expert", "Set up WhatsApp Business API flows and follow-up sequences. ₹1200/hr", 1200, "Arjun Singh", ["whatsapp", "automation", "crm"]),
    ];

    for ((listingType, title, description, price, sellerName, tags) in seeds.values()) {
      let listing : T.MarketplaceListing = {
        listingId = natToText(counters.nextListingId);
        listingType;
        title;
        description;
        price;
        sellerId = "system";
        sellerName;
        reviewCount = 0;
        avgRating = 5;
        tags;
        isActive = true;
        createdAt = now;
      };
      counters.nextListingId := counters.nextListingId + 1;
      listings.add(listing);
    };
  };

  // ─── Client Growth Plan ───────────────────────────────────────────────────────

  public func getClientGrowthPlan(
    plans : Map.Map<Common.ClientId, T.ClientGrowthPlan>,
    clientId : Common.ClientId,
  ) : ?T.ClientGrowthPlan {
    plans.get(clientId)
  };

  public func generateClientGrowthPlan(
    plans : Map.Map<Common.ClientId, T.ClientGrowthPlan>,
    counters : T.AutoAgencyCounters,
    clientId : Common.ClientId,
  ) : T.ClientGrowthPlan {
    let now = Time.now();
    let planId = natToText(counters.nextPlanId);
    counters.nextPlanId := counters.nextPlanId + 1;

    let seoPlan : [T.GrowthPlanItem] = [
      {
        title = "Target local keyword";
        description = "Optimize for '[industry] near me' and '[city] [industry]' keywords on homepage";
        effort = #medium;
        priorityScore = 90;
        estimatedRevenue = 15_000;
        status = #pending;
      },
      {
        title = "Fix meta tags & descriptions";
        description = "Update title tags, meta descriptions, and H1s on all key pages for click-through improvement";
        effort = #quick;
        priorityScore = 85;
        estimatedRevenue = 8_000;
        status = #pending;
      },
      {
        title = "Build local backlinks";
        description = "Get listed on 5 local business directories (JustDial, Sulekha, IndiaMART) for authority";
        effort = #deep;
        priorityScore = 75;
        estimatedRevenue = 20_000;
        status = #pending;
      },
    ];

    let adsPlan : [T.GrowthPlanItem] = [
      {
        title = "Run Instagram lead gen ads";
        description = "₹3,000 test budget targeting 25-45 age group in client's city with lead form ad";
        effort = #medium;
        priorityScore = 88;
        estimatedRevenue = 25_000;
        status = #pending;
      },
      {
        title = "Test audience segments";
        description = "Split test 3 interest audiences: competitors' followers, similar businesses, local interests";
        effort = #quick;
        priorityScore = 80;
        estimatedRevenue = 12_000;
        status = #pending;
      },
      {
        title = "Set up retargeting campaign";
        description = "Retarget website visitors and Instagram engagers with conversion-focused creatives";
        effort = #deep;
        priorityScore = 82;
        estimatedRevenue = 30_000;
        status = #pending;
      },
    ];

    let contentIdeas : [T.GrowthPlanItem] = [
      {
        title = "Post a before/after transformation reel";
        description = "Hook: 'This client went from 0 to ₹2L/month in 90 days' — show results with permission";
        effort = #quick;
        priorityScore = 92;
        estimatedRevenue = 5_000;
        status = #pending;
      },
      {
        title = "Share a quick-tip carousel";
        description = "5 tips for [industry] businesses to get more customers this month — high share potential";
        effort = #quick;
        priorityScore = 78;
        estimatedRevenue = 4_000;
        status = #pending;
      },
      {
        title = "Publish a client case study post";
        description = "Detail the client's growth story: problem, solution, results — builds trust and attracts leads";
        effort = #medium;
        priorityScore = 85;
        estimatedRevenue = 10_000;
        status = #pending;
      },
    ];

    let plan : T.ClientGrowthPlan = {
      planId;
      clientId;
      weekOf = now;
      seoPlan;
      adsPlan;
      contentIdeas;
      approvalStatus = #pending;
      generatedAt = now;
    };

    plans.add(clientId, plan);
    plan
  };

  // ─── Auto Report ──────────────────────────────────────────────────────────────

  public func getAutoReport(
    reports : Map.Map<Common.ClientId, T.AutoReport>,
    clientId : Common.ClientId,
  ) : ?T.AutoReport {
    reports.get(clientId)
  };

  public func generateAutoReport(
    reports : Map.Map<Common.ClientId, T.AutoReport>,
    counters : T.AutoAgencyCounters,
    clientId : Common.ClientId,
    reportPeriod : Text,
    leads : List.List<CoreT.Lead>,
  ) : T.AutoReport {
    let now = Time.now();

    var clientLeadsTotal : Nat = 0;
    var closedDeals : Nat = 0;

    // Aggregate leads for this client (using leadId matching clientId as a heuristic)
    for (lead in leads.values()) {
      clientLeadsTotal := clientLeadsTotal + 1;
      if (lead.status == #closed) {
        closedDeals := closedDeals + 1;
      };
    };

    let totalLeads = if (clientLeadsTotal > 0) clientLeadsTotal else 1;
    let conversionPct = closedDeals * 100 / totalLeads;
    let avgDealValue : Nat = 25_000;
    let revenueImpact = closedDeals * avgDealValue;
    let roi : Nat = if (revenueImpact > 0) (revenueImpact * 100 / 10_000) else 0;

    let nextSteps : [Text] = if (conversionPct < 10) {
      [
        "Increase outreach volume — contact 20+ leads per day to build momentum",
        "Improve pitch quality — personalize opening line with business-specific insight",
        "Follow up faster — reply within 2 hours to boost conversion by 3x",
      ]
    } else if (conversionPct < 30) {
      [
        "Upsell active clients to growth plan — they're already convinced of value",
        "Launch referral campaign — ask closed clients for 2 introductions",
        "Run re-engagement outreach on stale contacted leads with a new offer angle",
      ]
    } else {
      [
        "Scale outreach to new niches — your conversion rate is strong, expand territory",
        "Build case studies from top clients — social proof will accelerate closes",
        "Consider white-label reports for clients — adds perceived value and retention",
      ]
    };

    let reportId = natToText(counters.nextReportId);
    counters.nextReportId := counters.nextReportId + 1;

    let topChannel = if (closedDeals > 5) "WhatsApp Outreach" else "Direct Pitch";

    let report : T.AutoReport = {
      reportId;
      clientId;
      reportPeriod;
      leadsGenerated = clientLeadsTotal;
      conversions = closedDeals;
      revenueImpact;
      roi;
      topChannel;
      nextSteps;
      status = #ready;
      generatedAt = now;
      sentAt = null;
    };

    reports.add(clientId, report);
    report
  };

  public func markReportSent(
    reports : Map.Map<Common.ClientId, T.AutoReport>,
    clientId : Common.ClientId,
    sentAt : Int,
  ) {
    switch (reports.get(clientId)) {
      case (?report) {
        reports.add(clientId, { report with status = #sent; sentAt = ?sentAt });
      };
      case null {};
    };
  };
};
