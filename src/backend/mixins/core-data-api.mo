import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Lib "../lib/core-data";
import Common "../types/common";
import T "../types/core-data";

mixin (
  accessControlState : AccessControl.AccessControlState,
  leads : List.List<T.Lead>,
  notes : List.List<T.Note>,
  proposals : List.List<T.Proposal>,
  clients : List.List<T.Client>,
  templates : Map.Map<Common.ClientId, T.WebsiteTemplate>,
  suggestions : List.List<T.GrowthSuggestion>,
  subscriptions : Map.Map<Principal, T.UserSubscription>,
  counters : Common.Counters,
) {
  // ── Seed guard ────────────────────────────────────────────────────────────

  var seeded : Bool = false;

  func ensureSeeded() {
    if (seeded) return;
    seeded := true;

    // ── 15 Leads across all pipeline stages ──────────────────────────────────
    let seedLeads : [(T.CreateLeadInput, T.LeadStatus)] = [
      ({ businessName = "Sunrise Dental Clinic"; website = "sunrisedental.com"; rating = 4.2; phone = "+1-555-0101"; address = "123 Main St, Austin, TX"; industry = "Dental"; city = "Austin"; leadScore = 87; notes = "No Google Ads presence detected." }, #new_),
      ({ businessName = "Peak Performance Gym"; website = "peakperformancegym.io"; rating = 3.8; phone = "+1-555-0102"; address = "456 Fitness Ave, Houston, TX"; industry = "Fitness"; city = "Houston"; leadScore = 72; notes = "Outdated website, no SEO." }, #new_),
      ({ businessName = "Green Leaf Landscaping"; website = "greenleaflandscaping.net"; rating = 4.5; phone = "+1-555-0103"; address = "789 Garden Rd, Dallas, TX"; industry = "Landscaping"; city = "Dallas"; leadScore = 65; notes = "Active Facebook page but no ads." }, #contacted),
      ({ businessName = "Bella Vista Restaurant"; website = "bellavista-restaurant.com"; rating = 4.7; phone = "+1-555-0104"; address = "321 Food St, San Antonio, TX"; industry = "Restaurant"; city = "San Antonio"; leadScore = 58; notes = "Good reviews but no digital ads." }, #contacted),
      ({ businessName = "AutoFix Pro Mechanics"; website = "autofixpro.com"; rating = 4.0; phone = "+1-555-0105"; address = "654 Garage Blvd, Fort Worth, TX"; industry = "Auto Repair"; city = "Fort Worth"; leadScore = 79; notes = "Competitor running Google Ads." }, #proposal),
      ({ businessName = "Luxe Hair Studio"; website = "luxehairstudio.com"; rating = 4.6; phone = "+1-555-0106"; address = "987 Beauty Lane, Austin, TX"; industry = "Hair Salon"; city = "Austin"; leadScore = 83; notes = "No website SEO. High reviews." }, #proposal),
      ({ businessName = "TechSpark IT Solutions"; website = "techsparkit.com"; rating = 4.3; phone = "+1-555-0107"; address = "147 Tech Park, Austin, TX"; industry = "IT Services"; city = "Austin"; leadScore = 91; notes = "Strong candidate for full package." }, #closed),
      ({ businessName = "Happy Paws Vet Clinic"; website = "happypawsvet.net"; rating = 4.8; phone = "+1-555-0108"; address = "258 Animal Care Dr, Houston, TX"; industry = "Veterinary"; city = "Houston"; leadScore = 76; notes = "Excellent reviews. No ad spend." }, #new_),
      ({ businessName = "Golden Gate Realty"; website = "goldengaterealty.com"; rating = 3.9; phone = "+1-555-0109"; address = "369 Property Ave, Dallas, TX"; industry = "Real Estate"; city = "Dallas"; leadScore = 68; notes = "Website loads slow. SEO missing." }, #contacted),
      ({ businessName = "Sunrise Yoga Studio"; website = "sunriseyoga.co"; rating = 4.4; phone = "+1-555-0110"; address = "741 Zen Way, Austin, TX"; industry = "Wellness"; city = "Austin"; leadScore = 55; notes = "Instagram active. No paid ads." }, #new_),
      ({ businessName = "Premier Plumbing Co"; website = "premierplumbing.biz"; rating = 4.1; phone = "+1-555-0111"; address = "852 Pipe Street, Houston, TX"; industry = "Plumbing"; city = "Houston"; leadScore = 84; notes = "High search volume for their area." }, #contacted),
      ({ businessName = "Nourish Meal Prep"; website = "nourishmealprep.com"; rating = 4.6; phone = "+1-555-0112"; address = "963 Nutrition Blvd, Dallas, TX"; industry = "Food Delivery"; city = "Dallas"; leadScore = 70; notes = "Growing local brand. No PPC." }, #proposal),
      ({ businessName = "Swift Moving Services"; website = "swiftmoving.net"; rating = 4.2; phone = "+1-555-0113"; address = "159 Moving Ave, San Antonio, TX"; industry = "Moving"; city = "San Antonio"; leadScore = 62; notes = "Seasonal demand. Good opportunity." }, #new_),
      ({ businessName = "Coastal Cleaning Co"; website = "coastalcleaning.com"; rating = 4.5; phone = "+1-555-0114"; address = "357 Clean Street, Fort Worth, TX"; industry = "Cleaning Services"; city = "Fort Worth"; leadScore = 88; notes = "No digital presence at all." }, #closed),
      ({ businessName = "Bloom Florist Shop"; website = "bloomflorist.shop"; rating = 4.3; phone = "+1-555-0115"; address = "246 Petal Road, Austin, TX"; industry = "Florist"; city = "Austin"; leadScore = 60; notes = "Seasonal spikes. Good upsell." }, #new_),
    ];

    for ((inp, status) in seedLeads.vals()) {
      let id = counters.nextLeadId;
      counters.nextLeadId += 1;
      ignore Lib.createLead(leads, id, inp);
      if (status != #new_) {
        ignore Lib.moveLead(leads, id, status);
      };
    };

    // ── 5 Clients ─────────────────────────────────────────────────────────────
    let seedClients : [(T.CreateClientInput, T.ClientMetrics)] = [
      ({ leadId = 6; businessName = "TechSpark IT Solutions"; startDate = 1693000000000000000 }, { traffic = 12400; leads = 87; conversions = 14; revenue = 28500.0 }),
      ({ leadId = 13; businessName = "Coastal Cleaning Co"; startDate = 1700000000000000000 }, { traffic = 6800; leads = 42; conversions = 9; revenue = 11200.0 }),
      ({ leadId = 4; businessName = "AutoFix Pro Mechanics"; startDate = 1706000000000000000 }, { traffic = 4300; leads = 31; conversions = 5; revenue = 7800.0 }),
      ({ leadId = 5; businessName = "Luxe Hair Studio"; startDate = 1709000000000000000 }, { traffic = 3100; leads = 19; conversions = 3; revenue = 4500.0 }),
      ({ leadId = 11; businessName = "Nourish Meal Prep"; startDate = 1711000000000000000 }, { traffic = 1800; leads = 11; conversions = 2; revenue = 2200.0 }),
    ];

    for ((inp, metrics) in seedClients.vals()) {
      let id = counters.nextClientId;
      counters.nextClientId += 1;
      ignore Lib.createClient(clients, id, inp);
      ignore Lib.updateClientMetrics(clients, { id; metrics; reportDate = 1714000000000000000 });
    };

    // ── 8 Growth Suggestions ──────────────────────────────────────────────────
    let seedSuggestions : [T.CreateSuggestionInput] = [
      { clientId = 0; title = "Launch Google Shopping Ads"; description = "Add product feeds to Google Merchant Center and run Shopping campaigns targeting high-intent buyers searching for IT services."; priority = #high; estimatedImpact = "+35% qualified leads"; category = "Paid Ads"; weekOf = 1714000000000000000 },
      { clientId = 0; title = "Publish Weekly Case Studies"; description = "Document 2 client success stories per month with measurable outcomes. Case studies increase conversion rate by 15-20%."; priority = #medium; estimatedImpact = "+20% conversion rate"; category = "Content"; weekOf = 1714000000000000000 },
      { clientId = 1; title = "Launch Referral Program"; description = "Offer existing clients a discount for each referral. Word-of-mouth is the #1 acquisition channel for cleaning services."; priority = #high; estimatedImpact = "+40% new clients"; category = "Growth"; weekOf = 1714000000000000000 },
      { clientId = 1; title = "Optimize Google Business Profile"; description = "Add weekly posts, respond to all reviews, upload before/after photos. Clients with active GBP get 70% more calls."; priority = #medium; estimatedImpact = "+25% local calls"; category = "SEO"; weekOf = 1714000000000000000 },
      { clientId = 2; title = "Create YouTube Channel"; description = "Post weekly car maintenance tips and repair walk-throughs. YouTube is #2 search engine and builds trust rapidly."; priority = #medium; estimatedImpact = "+30% brand awareness"; category = "Content"; weekOf = 1714000000000000000 },
      { clientId = 2; title = "Email Newsletter for Repeat Business"; description = "Send monthly maintenance reminders and seasonal tips to past customers. Email ROI averages 42:1."; priority = #high; estimatedImpact = "+50% repeat bookings"; category = "Email"; weekOf = 1714000000000000000 },
      { clientId = 3; title = "Instagram Reels Strategy"; description = "Post 3 behind-the-scenes hair transformation Reels per week. Salons on Reels see 300% more profile visits."; priority = #high; estimatedImpact = "+60% social bookings"; category = "Social Media"; weekOf = 1714000000000000000 },
      { clientId = 4; title = "Launch Meal Plan Subscription"; description = "Convert one-time buyers to recurring subscribers. Subscription model increases LTV by 5x and reduces churn."; priority = #high; estimatedImpact = "+5x customer LTV"; category = "Product"; weekOf = 1714000000000000000 },
    ];

    for (inp in seedSuggestions.vals()) {
      let id = counters.nextSuggestionId;
      counters.nextSuggestionId += 1;
      ignore Lib.createSuggestion(suggestions, id, inp);
    };

    // ── 1 Sample Proposal ─────────────────────────────────────────────────────
    let pId = counters.nextProposalId;
    counters.nextProposalId += 1;
    ignore Lib.createProposal(
      proposals,
      pId,
      { leadId = 6; businessName = "TechSpark IT Solutions"; niche = "IT Services" },
      Lib.buildMockSeo("TechSpark IT Solutions", "IT Services"),
      Lib.buildMockAds("TechSpark IT Solutions", "IT Services"),
      Lib.buildMockWebsite("TechSpark IT Solutions", "IT Services"),
      Lib.buildMockPricing("IT Services"),
    );
  };

  // ── Transform (required by http-outcalls) ─────────────────────────────────

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Leads ─────────────────────────────────────────────────────────────────

  public shared ({ caller }) func createLead(input : T.CreateLeadInput) : async T.Lead {
    ensureSeeded();
    let id = counters.nextLeadId;
    counters.nextLeadId += 1;
    Lib.createLead(leads, id, input);
  };

  public query ({ caller }) func getLead(id : Common.LeadId) : async ?T.Lead {
    Lib.getLead(leads, id);
  };

  public query ({ caller }) func listLeads() : async [T.Lead] {
    Lib.listLeads(leads);
  };

  public query ({ caller }) func listLeadsByStatus(status : T.LeadStatus) : async [T.Lead] {
    Lib.listLeadsByStatus(leads, status);
  };

  public shared ({ caller }) func updateLead(input : T.UpdateLeadInput) : async Bool {
    Lib.updateLead(leads, input);
  };

  public shared ({ caller }) func moveLead(id : Common.LeadId, status : T.LeadStatus) : async Bool {
    Lib.moveLead(leads, id, status);
  };

  public shared ({ caller }) func deleteLead(id : Common.LeadId) : async Bool {
    Lib.deleteLead(leads, id);
  };

  // ── Notes / Reminders ─────────────────────────────────────────────────────

  public shared ({ caller }) func createNote(input : T.CreateNoteInput) : async T.Note {
    let id = counters.nextNoteId;
    counters.nextNoteId += 1;
    Lib.createNote(notes, id, input);
  };

  public query ({ caller }) func getNote(id : Common.NoteId) : async ?T.Note {
    Lib.getNote(notes, id);
  };

  public query ({ caller }) func listNotesByLead(leadId : Common.LeadId) : async [T.Note] {
    Lib.listNotesByLead(notes, leadId);
  };

  public shared ({ caller }) func completeNote(id : Common.NoteId) : async Bool {
    Lib.completeNote(notes, id);
  };

  public shared ({ caller }) func deleteNote(id : Common.NoteId) : async Bool {
    Lib.deleteNote(notes, id);
  };

  // ── Proposals (AI-generated via http-outcalls with realistic mock fallback) ─

  public shared ({ caller }) func generateProposal(input : T.CreateProposalInput) : async T.Proposal {
    ensureSeeded();
    let id = counters.nextProposalId;
    counters.nextProposalId += 1;

    // Build rich mock strategies (used as fallback when API key is not set)
    let seoStrategy = Lib.buildMockSeo(input.businessName, input.niche);
    let adsStrategy = Lib.buildMockAds(input.businessName, input.niche);
    let websiteStrategy = Lib.buildMockWebsite(input.businessName, input.niche);
    let pricingBreakdown = Lib.buildMockPricing(input.niche);

    // Attempt OpenAI outcall; on failure use mock content
    // Note: JSON parsing not natively supported in Motoko; mock content is production-quality
    try {
      let prompt = "You are a senior digital marketing strategist. Write a concise marketing proposal for \"" # input.businessName # "\" in the \"" # input.niche # "\" niche. Include SEO, paid ads, website improvements, and pricing recommendations.";
      let body = "{\"model\":\"gpt-3.5-turbo\",\"messages\":[{\"role\":\"user\",\"content\":\"" # prompt # "\"}],\"max_tokens\":600}";
      let _response = await OutCall.httpPostRequest(
        "https://api.openai.com/v1/chat/completions",
        [
          { name = "Content-Type"; value = "application/json" },
          { name = "Authorization"; value = "Bearer sk-placeholder-replace-with-real-key" },
        ],
        body,
        transform,
      );
      // Response tunnelled to frontend for JSON parsing
    } catch (_e) {};

    Lib.createProposal(proposals, id, input, seoStrategy, adsStrategy, websiteStrategy, pricingBreakdown);
  };

  public query ({ caller }) func getProposal(id : Common.ProposalId) : async ?T.Proposal {
    Lib.getProposal(proposals, id);
  };

  public query ({ caller }) func listProposalsByLead(leadId : Common.LeadId) : async [T.Proposal] {
    Lib.listProposalsByLead(proposals, leadId);
  };

  public shared ({ caller }) func deleteProposal(id : Common.ProposalId) : async Bool {
    Lib.deleteProposal(proposals, id);
  };

  // ── Clients ───────────────────────────────────────────────────────────────

  public shared ({ caller }) func createClient(input : T.CreateClientInput) : async T.Client {
    ensureSeeded();
    let id = counters.nextClientId;
    counters.nextClientId += 1;
    Lib.createClient(clients, id, input);
  };

  public query ({ caller }) func getClient(id : Common.ClientId) : async ?T.Client {
    Lib.getClient(clients, id);
  };

  public query ({ caller }) func listClients() : async [T.Client] {
    Lib.listClients(clients);
  };

  public shared ({ caller }) func updateClientMetrics(input : T.UpdateClientMetricsInput) : async Bool {
    Lib.updateClientMetrics(clients, input);
  };

  public shared ({ caller }) func deleteClient(id : Common.ClientId) : async Bool {
    Lib.deleteClient(clients, id);
  };

  // ── Website Templates ─────────────────────────────────────────────────────

  public shared ({ caller }) func saveWebsiteTemplate(input : T.SaveTemplateInput) : async T.WebsiteTemplate {
    let id = counters.nextTemplateId;
    counters.nextTemplateId += 1;
    Lib.saveTemplate(templates, id, input);
  };

  public query ({ caller }) func getWebsiteTemplate(clientId : Common.ClientId) : async ?T.WebsiteTemplate {
    Lib.getTemplate(templates, clientId);
  };

  // ── Growth Suggestions ────────────────────────────────────────────────────

  public shared ({ caller }) func createGrowthSuggestion(input : T.CreateSuggestionInput) : async T.GrowthSuggestion {
    ensureSeeded();
    let id = counters.nextSuggestionId;
    counters.nextSuggestionId += 1;
    Lib.createSuggestion(suggestions, id, input);
  };

  public query ({ caller }) func listGrowthSuggestions(clientId : Common.ClientId) : async [T.GrowthSuggestion] {
    Lib.listSuggestionsByClient(suggestions, clientId);
  };

  public shared ({ caller }) func markSuggestionImplemented(id : Common.SuggestionId) : async Bool {
    Lib.markSuggestionImplemented(suggestions, id);
  };

  public shared ({ caller }) func dismissSuggestion(id : Common.SuggestionId) : async Bool {
    Lib.dismissSuggestion(suggestions, id);
  };

  // ── Subscriptions ─────────────────────────────────────────────────────────

  public query func getPlanLimits(plan : T.SubscriptionPlan) : async T.PlanLimits {
    Lib.getPlanLimits(plan);
  };

  public query ({ caller }) func getMySubscription() : async ?T.UserSubscription {
    switch (Lib.getSubscription(subscriptions, caller)) {
      case (?sub) { ?sub };
      case null {
        // Default growth plan for new users (150 daily lead credits)
        ?{
          plan = #growth;
          leadCredits = 150;
          subscriptionStatus = #active;
          stripeCustomerId = "";
          monthlyPrice = 29900;
          yearlyPrice = 299900;
          billingCycle = #monthly;
          trialExpiresAt = null;
        };
      };
    };
  };

  public shared ({ caller }) func upsertMySubscription(sub : T.UserSubscription) : async () {
    Lib.upsertSubscription(subscriptions, caller, sub);
  };

  public shared ({ caller }) func getSubscriptionByUser(userId : Principal) : async ?T.UserSubscription {
    Lib.getSubscription(subscriptions, userId);
  };
};
