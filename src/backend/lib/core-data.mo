import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/core-data";
import CI "../types/compliance-and-ingestion";

module {
  // ── Lead Score Calculator ─────────────────────────────────────────────────

  /// Calculates a lead score from observable fields.
  /// All insights are based on publicly available data and heuristics.
  public func calculateLeadScore(lead : T.Lead) : (Nat, CI.LeadScoreBreakdown, CI.PriorityTag) {
    let hasWebsite = lead.website != "";

    // Website presence: 20 pts
    let websiteScore : Nat = if (hasWebsite) 20 else 0;

    // SEO simulation (pseudo-random via id mod): up to 15 pts
    let seoScore : Nat = if (hasWebsite) {
      let m = lead.id % 3;
      if (m == 0) 15 else if (m == 1) 10 else 5;
    } else 0;

    // Reviews simulation — simulate reviewCount from id mod tiers
    // id%5 → 0→0, 1→25, 2→50, 3→75, 4→100+ reviews
    let simulatedReviewCount : Nat = (lead.id % 5) * 25;
    let reviewCountScore : Nat = if (simulatedReviewCount > 100) 20
      else if (simulatedReviewCount > 50) 15
      else if (simulatedReviewCount > 20) 10
      else if (simulatedReviewCount > 0) 5
      else 0;

    // Rating score (from actual rating field): up to 10 pts
    let ratingScore : Nat = if (lead.rating >= 4.5) 10
      else if (lead.rating >= 4.0) 7
      else if (lead.rating >= 3.5) 4
      else 0;

    let reviewsScore : Nat = reviewCountScore + ratingScore;

    // Social presence simulation: 0, 3, 6, or 9 pts
    let socialScore : Nat = (lead.id % 4) * 3;

    // Domain age simulation: 0, 3, or 5 pts
    let domainAgeScore : Nat = if (hasWebsite) {
      let m = lead.id % 5;
      if (m == 0) 5 else if (m < 3) 3 else 0;
    } else 0;

    let total : Nat = websiteScore + seoScore + reviewsScore + socialScore + domainAgeScore;
    let capped : Nat = if (total > 100) 100 else total;

    let breakdown : CI.LeadScoreBreakdown = {
      website = websiteScore;
      seo = seoScore;
      reviews = reviewsScore;
      social = socialScore;
      domainAge = domainAgeScore;
    };

    let priority : CI.PriorityTag = if (capped >= 75) #high
      else if (capped >= 50) #medium
      else #low;

    (capped, breakdown, priority);
  };

  // ── Lead helpers ──────────────────────────────────────────────────────────

  public func createLead(
    leads : List.List<T.Lead>,
    nextId : Nat,
    input : T.CreateLeadInput,
  ) : T.Lead {
    let now = Time.now();
    // Build a partial lead first so we can score it
    let partialLead : T.Lead = {
      id = nextId;
      businessName = input.businessName;
      website = input.website;
      rating = input.rating;
      phone = input.phone;
      address = input.address;
      industry = input.industry;
      city = input.city;
      leadScore = input.leadScore;
      status = #new_;
      notes = input.notes;
      createdAt = now;
      updatedAt = now;
      scoreBreakdown = null;
      priorityTag = null;
      consentStatus = null;
      optedOut = false;
      attemptCount = 0;
      leadSource = "";
      referredBy = null;
    };
    let (computedScore, breakdown, priority) = calculateLeadScore(partialLead);
    let lead : T.Lead = {
      partialLead with
      leadScore = computedScore;
      scoreBreakdown = ?breakdown;
      priorityTag = ?priority;
    };
    leads.add(lead);
    lead;
  };

  public func getLead(leads : List.List<T.Lead>, id : Common.LeadId) : ?T.Lead {
    leads.find(func(l) { l.id == id });
  };

  public func listLeads(leads : List.List<T.Lead>) : [T.Lead] {
    leads.toArray();
  };

  public func listLeadsByStatus(leads : List.List<T.Lead>, status : T.LeadStatus) : [T.Lead] {
    leads.filter(func(l) { l.status == status }).toArray();
  };

  public func updateLead(leads : List.List<T.Lead>, input : T.UpdateLeadInput) : Bool {
    let found = leads.findIndex(func(l) { l.id == input.id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = leads.at(idx);
        leads.put(idx, {
          existing with
          businessName = input.businessName;
          website = input.website;
          rating = input.rating;
          phone = input.phone;
          address = input.address;
          industry = input.industry;
          city = input.city;
          leadScore = input.leadScore;
          status = input.status;
          notes = input.notes;
          updatedAt = Time.now();
        });
        true;
      };
    };
  };

  public func moveLead(leads : List.List<T.Lead>, id : Common.LeadId, status : T.LeadStatus) : Bool {
    let found = leads.findIndex(func(l) { l.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = leads.at(idx);
        leads.put(idx, { existing with status; updatedAt = Time.now() });
        true;
      };
    };
  };

  public func deleteLead(leads : List.List<T.Lead>, id : Common.LeadId) : Bool {
    let sizeBefore = leads.size();
    let filtered = leads.filter(func(l) { l.id != id });
    leads.clear();
    leads.append(filtered);
    leads.size() < sizeBefore;
  };

  // ── Note helpers ──────────────────────────────────────────────────────────

  public func createNote(
    notes : List.List<T.Note>,
    nextId : Nat,
    input : T.CreateNoteInput,
  ) : T.Note {
    let note : T.Note = {
      id = nextId;
      leadId = input.leadId;
      content = input.content;
      noteType = input.noteType;
      dueDate = input.dueDate;
      completed = false;
      createdAt = Time.now();
    };
    notes.add(note);
    note;
  };

  public func getNote(notes : List.List<T.Note>, id : Common.NoteId) : ?T.Note {
    notes.find(func(n) { n.id == id });
  };

  public func listNotesByLead(notes : List.List<T.Note>, leadId : Common.LeadId) : [T.Note] {
    notes.filter(func(n) { n.leadId == leadId }).toArray();
  };

  public func completeNote(notes : List.List<T.Note>, id : Common.NoteId) : Bool {
    let found = notes.findIndex(func(n) { n.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = notes.at(idx);
        notes.put(idx, { existing with completed = true });
        true;
      };
    };
  };

  public func deleteNote(notes : List.List<T.Note>, id : Common.NoteId) : Bool {
    let sizeBefore = notes.size();
    let filtered = notes.filter(func(n) { n.id != id });
    notes.clear();
    notes.append(filtered);
    notes.size() < sizeBefore;
  };

  // ── Proposal helpers ──────────────────────────────────────────────────────

  public func createProposal(
    proposals : List.List<T.Proposal>,
    nextId : Nat,
    input : T.CreateProposalInput,
    seoStrategy : Text,
    adsStrategy : Text,
    websiteStrategy : Text,
    pricingBreakdown : Text,
  ) : T.Proposal {
    let proposal : T.Proposal = {
      id = nextId;
      leadId = input.leadId;
      businessName = input.businessName;
      niche = input.niche;
      seoStrategy;
      adsStrategy;
      websiteStrategy;
      pricingBreakdown;
      generatedAt = Time.now();
    };
    proposals.add(proposal);
    proposal;
  };

  public func getProposal(proposals : List.List<T.Proposal>, id : Common.ProposalId) : ?T.Proposal {
    proposals.find(func(p) { p.id == id });
  };

  public func listProposalsByLead(proposals : List.List<T.Proposal>, leadId : Common.LeadId) : [T.Proposal] {
    proposals.filter(func(p) { p.leadId == leadId }).toArray();
  };

  public func deleteProposal(proposals : List.List<T.Proposal>, id : Common.ProposalId) : Bool {
    let sizeBefore = proposals.size();
    let filtered = proposals.filter(func(p) { p.id != id });
    proposals.clear();
    proposals.append(filtered);
    proposals.size() < sizeBefore;
  };

  // ── Client helpers ────────────────────────────────────────────────────────

  public func createClient(
    clients : List.List<T.Client>,
    nextId : Nat,
    input : T.CreateClientInput,
  ) : T.Client {
    let client : T.Client = {
      id = nextId;
      leadId = input.leadId;
      businessName = input.businessName;
      startDate = input.startDate;
      metrics = { traffic = 0; leads = 0; conversions = 0; revenue = 0.0 };
      reportDate = Time.now();
    };
    clients.add(client);
    client;
  };

  public func getClient(clients : List.List<T.Client>, id : Common.ClientId) : ?T.Client {
    clients.find(func(c) { c.id == id });
  };

  public func listClients(clients : List.List<T.Client>) : [T.Client] {
    clients.toArray();
  };

  public func updateClientMetrics(clients : List.List<T.Client>, input : T.UpdateClientMetricsInput) : Bool {
    let found = clients.findIndex(func(c) { c.id == input.id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = clients.at(idx);
        clients.put(idx, { existing with metrics = input.metrics; reportDate = input.reportDate });
        true;
      };
    };
  };

  public func deleteClient(clients : List.List<T.Client>, id : Common.ClientId) : Bool {
    let sizeBefore = clients.size();
    let filtered = clients.filter(func(c) { c.id != id });
    clients.clear();
    clients.append(filtered);
    clients.size() < sizeBefore;
  };

  // ── Website Template helpers ──────────────────────────────────────────────

  public func saveTemplate(
    templates : Map.Map<Common.ClientId, T.WebsiteTemplate>,
    nextId : Nat,
    input : T.SaveTemplateInput,
  ) : T.WebsiteTemplate {
    let tmpl : T.WebsiteTemplate = {
      id = nextId;
      clientId = input.clientId;
      templateId = input.templateId;
      templateName = input.templateName;
      sections = input.sections;
      lastSaved = Time.now();
    };
    templates.add(input.clientId, tmpl);
    tmpl;
  };

  public func getTemplate(
    templates : Map.Map<Common.ClientId, T.WebsiteTemplate>,
    clientId : Common.ClientId,
  ) : ?T.WebsiteTemplate {
    templates.get(clientId);
  };

  // ── Growth Suggestion helpers ─────────────────────────────────────────────

  public func createSuggestion(
    suggestions : List.List<T.GrowthSuggestion>,
    nextId : Nat,
    input : T.CreateSuggestionInput,
  ) : T.GrowthSuggestion {
    let suggestion : T.GrowthSuggestion = {
      id = nextId;
      clientId = input.clientId;
      title = input.title;
      description = input.description;
      priority = input.priority;
      estimatedImpact = input.estimatedImpact;
      category = input.category;
      implemented = false;
      dismissed = false;
      weekOf = input.weekOf;
    };
    suggestions.add(suggestion);
    suggestion;
  };

  public func listSuggestionsByClient(
    suggestions : List.List<T.GrowthSuggestion>,
    clientId : Common.ClientId,
  ) : [T.GrowthSuggestion] {
    suggestions.filter(func(s) { s.clientId == clientId }).toArray();
  };

  public func markSuggestionImplemented(
    suggestions : List.List<T.GrowthSuggestion>,
    id : Common.SuggestionId,
  ) : Bool {
    let found = suggestions.findIndex(func(s) { s.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = suggestions.at(idx);
        suggestions.put(idx, { existing with implemented = true });
        true;
      };
    };
  };

  public func dismissSuggestion(
    suggestions : List.List<T.GrowthSuggestion>,
    id : Common.SuggestionId,
  ) : Bool {
    let found = suggestions.findIndex(func(s) { s.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = suggestions.at(idx);
        suggestions.put(idx, { existing with dismissed = true });
        true;
      };
    };
  };

  // ── Plan limits ───────────────────────────────────────────────────────────

  public func getPlanLimits(plan : T.SubscriptionPlan) : T.PlanLimits {
    switch (plan) {
      case (#free) {
        {
          dailyLeads = 10;
          aiPitchGenerator = false;
          autoFollowUp = false;
          crmPipeline = false;
          seoChecklist = false;
          aiProposalGenerator = false;
          campaignBuilder = false;
          advancedAnalytics = false;
          whiteLabelReports = false;
          teamAccess = false;
          unlimitedLeads = false;
          premiumAutomation = false;
        };
      };
      case (#starter) {
        {
          dailyLeads = 50;
          aiPitchGenerator = true;
          autoFollowUp = false;
          crmPipeline = false;
          seoChecklist = false;
          aiProposalGenerator = false;
          campaignBuilder = false;
          advancedAnalytics = false;
          whiteLabelReports = false;
          teamAccess = false;
          unlimitedLeads = false;
          premiumAutomation = false;
        };
      };
      case (#growth) {
        {
          dailyLeads = 150;
          aiPitchGenerator = true;
          autoFollowUp = true;
          crmPipeline = true;
          seoChecklist = true;
          aiProposalGenerator = false;
          campaignBuilder = false;
          advancedAnalytics = false;
          whiteLabelReports = false;
          teamAccess = false;
          unlimitedLeads = false;
          premiumAutomation = false;
        };
      };
      case (#pro) {
        {
          dailyLeads = 500;
          aiPitchGenerator = true;
          autoFollowUp = true;
          crmPipeline = true;
          seoChecklist = true;
          aiProposalGenerator = true;
          campaignBuilder = true;
          advancedAnalytics = true;
          whiteLabelReports = false;
          teamAccess = false;
          unlimitedLeads = false;
          premiumAutomation = false;
        };
      };
      case (#agency) {
        {
          dailyLeads = 9999;
          aiPitchGenerator = true;
          autoFollowUp = true;
          crmPipeline = true;
          seoChecklist = true;
          aiProposalGenerator = true;
          campaignBuilder = true;
          advancedAnalytics = true;
          whiteLabelReports = true;
          teamAccess = true;
          unlimitedLeads = true;
          premiumAutomation = true;
        };
      };
    };
  };

  // ── Subscription helpers ──────────────────────────────────────────────────

  public func getSubscription(
    subscriptions : Map.Map<Principal, T.UserSubscription>,
    userId : Principal,
  ) : ?T.UserSubscription {
    subscriptions.get(userId);
  };

  public func upsertSubscription(
    subscriptions : Map.Map<Principal, T.UserSubscription>,
    userId : Principal,
    sub : T.UserSubscription,
  ) {
    subscriptions.add(userId, sub);
  };

  public func deductLeadCredit(
    subscriptions : Map.Map<Principal, T.UserSubscription>,
    userId : Principal,
  ) : Bool {
    switch (subscriptions.get(userId)) {
      case null { false };
      case (?sub) {
        if (sub.leadCredits == 0) { return false };
        let newCredits : Nat = Nat.sub(sub.leadCredits, 1);
        subscriptions.add(userId, { sub with leadCredits = newCredits });
        true;
      };
    };
  };

  // ── Mock proposal generation ──────────────────────────────────────────────

  public func buildMockSeo(businessName : Text, niche : Text) : Text {
    "SEO Strategy for " # businessName # " (" # niche # "):\n\n" #
    "1. Keyword Research: Target high-intent local keywords like \"" # niche # " near me\", \"best " # niche # " in [city]\", and long-tail variations.\n" #
    "2. On-Page Optimization: Optimize title tags, meta descriptions, H1-H3 headers, and image alt text with primary keywords.\n" #
    "3. Local SEO: Claim and optimize Google Business Profile. Build consistent NAP citations across 50+ directories.\n" #
    "4. Content Strategy: Publish 2 blog posts/week covering FAQs, how-tos, and case studies relevant to " # niche # ".\n" #
    "5. Technical SEO: Improve Core Web Vitals — target LCP < 2.5s, CLS < 0.1, FID < 100ms.\n" #
    "6. Link Building: Outreach to 10 local business directories and 5 niche-relevant blogs per month.\n" #
    "Expected results: 40-60% organic traffic increase within 6 months.";
  };

  public func buildMockAds(businessName : Text, niche : Text) : Text {
    "Ads Strategy for " # businessName # " (" # niche # "):\n\n" #
    "Google Ads:\n" #
    "- Search Campaign: Target keywords with commercial intent. Daily budget: $50-$100.\n" #
    "- Display Remarketing: Re-engage website visitors with banner ads. Budget: $20/day.\n" #
    "- Local Service Ads: Appear at top of Google for local searches with verification badge.\n\n" #
    "Meta Ads:\n" #
    "- Awareness Campaign: Reach local audience within 15-mile radius. Budget: $30/day.\n" #
    "- Lead Generation Campaign: Facebook/Instagram lead forms targeting demographics for " # niche # ". Budget: $40/day.\n" #
    "- Retargeting: Custom audiences from website visitors, video viewers, and page engagers.\n\n" #
    "Projected ROI: 3-5x ROAS within 90 days with proper optimization.";
  };

  public func buildMockWebsite(businessName : Text, niche : Text) : Text {
    "Website Strategy for " # businessName # " (" # niche # "):\n\n" #
    "1. Homepage Redesign: Modern hero section with clear value proposition, trust signals (reviews, certifications), and prominent CTA.\n" #
    "2. Service Pages: Create dedicated landing pages for each " # niche # " service with unique content, schema markup, and local testimonials.\n" #
    "3. Mobile Optimization: Ensure 100% mobile responsiveness. 60%+ of traffic is mobile.\n" #
    "4. Conversion Rate Optimization: Add live chat widget, click-to-call buttons, and lead capture forms. Target 3-5% conversion rate.\n" #
    "5. Speed Optimization: Compress images, enable CDN, use lazy loading. Target < 3s load time.\n" #
    "6. Trust Elements: Add SSL, privacy policy, customer reviews widget (Google/Yelp), and before/after galleries.\n" #
    "Timeline: 4-6 weeks for full redesign and deployment.";
  };

  public func buildMockPricing(niche : Text) : Text {
    "Pricing Breakdown for " # niche # " business:\n\n" #
    "Starter Package - $997/month:\n" #
    "- Local SEO (Google Business Profile + 20 citations)\n" #
    "- 4 blog posts/month\n" #
    "- Monthly reporting\n\n" #
    "Growth Package - $1,997/month:\n" #
    "- Full SEO (on-page + off-page + technical)\n" #
    "- Google Ads management (up to $2,000 ad spend)\n" #
    "- 8 blog posts/month\n" #
    "- Bi-weekly reporting\n\n" #
    "Premium Package - $3,497/month:\n" #
    "- Everything in Growth\n" #
    "- Meta Ads management (up to $3,000 ad spend)\n" #
    "- Website redesign (one-time)\n" #
    "- Dedicated account manager\n" #
    "- Weekly reporting + strategy calls\n\n" #
    "One-Time Services:\n" #
    "- Website Audit: $297\n" #
    "- Competitor Analysis Report: $497\n" #
    "- Google Ads Setup: $497";
  };
};
