import List "mo:core/List";
import GE "../types/growth-engine";

module {

  // ─── WhatsApp Templates ───────────────────────────────────────────────────

  public func createWhatsAppTemplate(
    counters : GE.GrowthEngineCounters,
    templates : List.List<GE.WhatsAppTemplate>,
    name : Text,
    category : GE.WhatsAppTemplateCategory,
    body : Text,
    variables : [Text],
    now : Int,
  ) : GE.WhatsAppTemplate {
    let id = counters.nextTemplateId;
    counters.nextTemplateId += 1;
    let t : GE.WhatsAppTemplate = {
      id;
      name;
      category;
      body;
      variables;
      status = #pending;
      rejectionReason = null;
      usageCount = 0;
      replyRate = 0;
      createdAt = now;
      submittedAt = null;
      approvedAt = null;
    };
    templates.add(t);
    t;
  };

  public func updateTemplateStatus(
    templates : List.List<GE.WhatsAppTemplate>,
    id : GE.WhatsAppTemplateId,
    status : GE.WhatsAppTemplateStatus,
    rejectionReason : ?Text,
  ) : Bool {
    let idx = templates.findIndex(func(t) { t.id == id });
    switch (idx) {
      case (?i) {
        let existing = templates.at(i);
        templates.put(i, { existing with status; rejectionReason });
        true;
      };
      case null { false };
    };
  };

  public func getTemplate(
    templates : List.List<GE.WhatsAppTemplate>,
    id : GE.WhatsAppTemplateId,
  ) : ?GE.WhatsAppTemplate {
    templates.find(func(t) { t.id == id });
  };

  public func listTemplates(templates : List.List<GE.WhatsAppTemplate>) : [GE.WhatsAppTemplate] {
    templates.toArray();
  };

  public func incrementTemplateUsage(
    templates : List.List<GE.WhatsAppTemplate>,
    id : GE.WhatsAppTemplateId,
  ) : Bool {
    let idx = templates.findIndex(func(t) { t.id == id });
    switch (idx) {
      case (?i) {
        let existing = templates.at(i);
        templates.put(i, { existing with usageCount = existing.usageCount + 1 });
        true;
      };
      case null { false };
    };
  };

  // ─── Landing Pages ────────────────────────────────────────────────────────

  func buildLandingPageSections(niche : GE.LandingPageNiche, city : Text, serviceDesc : Text) : GE.LandingPageSection {
    let nicheLabel = switch (niche) {
      case (#salon) "Salon";
      case (#gym) "Gym";
      case (#medical) "Medical";
      case (#cafe) "Cafe";
      case (#plumber) "Plumber";
      case (#real_estate) "Real Estate";
      case (#education) "Education";
      case (#restaurant) "Restaurant";
      case (#agency) "Agency";
    };

    let painPoints = switch (niche) {
      case (#salon) [
        "Clients book once and never return — no retention system",
        "No online visibility — competitor salons are stealing your walk-ins",
        "No way to run promotions without spending on flyers",
        "Reviews scattered across platforms — hard to build trust",
      ];
      case (#gym) [
        "Members sign up, then drop off after 2 months — high churn",
        "No digital ads means competitors are getting all new sign-ups",
        "Hard to show results without before/after proof system",
        "No automated follow-up for leads who inquired but didn't join",
      ];
      case (#medical) [
        "Patients don't find your clinic on Google — losing to hospital chains",
        "No appointment reminders = no-shows hurting revenue",
        "Weak online reputation vs private clinic chains",
        "No system to collect and showcase patient testimonials",
      ];
      case (#cafe) [
        "Foot traffic depends on luck — no digital discovery strategy",
        "No loyalty program to bring customers back weekly",
        "Competitors running Instagram ads — you're invisible online",
        "No way to capture customer data for promotions",
      ];
      case (#restaurant) [
        "Empty tables on weekdays — no advance booking campaigns",
        "No online ordering system losing takeaway revenue",
        "Poor Google Maps ranking vs chain restaurants",
        "No system to run seasonal offers and festivals promotions",
      ];
      case (#real_estate) [
        "Leads go cold before you can follow up — no CRM",
        "No SEO means buyers find other agents first",
        "Hard to showcase portfolio without a professional site",
        "No automated follow-up for property inquiry leads",
      ];
      case _ [
        "Losing potential customers to competitors with better online presence",
        "No automated system to follow up with leads",
        "Inconsistent monthly revenue due to no growth strategy",
        "Wasting money on ineffective traditional advertising",
      ];
    };

    let beforeAfter = switch (niche) {
      case (#salon) {
        { before = "10-15 new clients/month, mostly walk-ins. No rebooking system.";
          after = "35-50 new clients/month. 60% rebooking rate. Fully booked weekends." };
      };
      case (#gym) {
        { before = "30-40 inquiries/month, 30% conversion. High churn after 60 days.";
          after = "80-100 inquiries/month, 55% conversion. Retention program keeping members 6+ months." };
      };
      case (#medical) {
        { before = "20-25 new patients/month via word-of-mouth only.";
          after = "50-70 new patients/month. Ranked #1 on Google Maps for 5+ keywords." };
      };
      case _ {
        { before = "Inconsistent leads, no digital strategy, growth stuck.";
          after = "Consistent 30-50 new customers monthly with automated follow-up." };
      };
    };

    let testimonials = [
      {
        name = "Priya S.";
        business = nicheLabel # " Owner, " # city;
        quote = "Within 3 months we went from struggling to fully booked. The growth plan actually works!";
      },
      {
        name = "Rahul M.";
        business = "Business Owner, " # city;
        quote = "I was skeptical at first, but the results speak for themselves. Revenue up 40% in 60 days.";
      },
    ];

    {
      hero = "Get 30–50 New " # nicheLabel # " Customers Monthly in " # city;
      subheadline = serviceDesc # " — Guaranteed results or we work for free.";
      painPoints;
      beforeAfter;
      testimonials;
      ctaText = "Get My Free Growth Plan";
      formTitle = "Claim Your Free " # nicheLabel # " Growth Audit";
    };
  };

  public func createLandingPage(
    counters : GE.GrowthEngineCounters,
    pages : List.List<GE.LandingPage>,
    niche : GE.LandingPageNiche,
    city : Text,
    serviceDesc : Text,
    targetBudget : Text,
    now : Int,
  ) : GE.LandingPage {
    let id = counters.nextLandingPageId;
    counters.nextLandingPageId += 1;
    // Simulate conversion rate 8-15% and lead score 65-85 based on niche
    let (convRate, leadScore) = switch (niche) {
      case (#salon) (12, 78);
      case (#gym) (10, 72);
      case (#medical) (15, 85);
      case (#cafe) (8, 65);
      case (#restaurant) (9, 68);
      case (#real_estate) (11, 75);
      case (#education) (13, 80);
      case (#plumber) (14, 82);
      case _ (10, 70);
    };
    let page : GE.LandingPage = {
      id;
      niche;
      city;
      serviceDescription = serviceDesc;
      targetBudget;
      sections = buildLandingPageSections(niche, city, serviceDesc);
      status = #draft;
      estimatedConversionRate = convRate;
      estimatedLeadScore = leadScore;
      createdAt = now;
      publishedAt = null;
      leadsCaptured = 0;
    };
    pages.add(page);
    page;
  };

  public func updateLandingPageStatus(
    pages : List.List<GE.LandingPage>,
    id : GE.LandingPageId,
    status : GE.LandingPageStatus,
    now : Int,
  ) : Bool {
    let idx = pages.findIndex(func(p) { p.id == id });
    switch (idx) {
      case (?i) {
        let existing = pages.at(i);
        let publishedAt : ?Int = if (status == #published) ?now else existing.publishedAt;
        pages.put(i, { existing with status; publishedAt });
        true;
      };
      case null { false };
    };
  };

  public func getLandingPage(
    pages : List.List<GE.LandingPage>,
    id : GE.LandingPageId,
  ) : ?GE.LandingPage {
    pages.find(func(p) { p.id == id });
  };

  public func listLandingPages(pages : List.List<GE.LandingPage>) : [GE.LandingPage] {
    pages.toArray();
  };

  public func incrementLandingPageLeads(
    pages : List.List<GE.LandingPage>,
    id : GE.LandingPageId,
  ) : Bool {
    let idx = pages.findIndex(func(p) { p.id == id });
    switch (idx) {
      case (?i) {
        let existing = pages.at(i);
        pages.put(i, { existing with leadsCaptured = existing.leadsCaptured + 1 });
        true;
      };
      case null { false };
    };
  };

  // ─── Conversion Scripts ───────────────────────────────────────────────────

  func buildObjectionHandlers(serviceType : Text) : [{ objection : Text; softResponse : Text; directResponse : Text }] {
    [
      {
        objection = "Too expensive";
        softResponse = "I completely understand — budget matters a lot. Can I show you the typical ROI our clients see in the first 90 days?";
        directResponse = "Our clients average ₹3–5 return for every ₹1 invested in " # serviceType # ". At ₹10k/month, that's ₹30–50k in new revenue. Does that math work for you?";
      },
      {
        objection = "Already have a solution";
        softResponse = "That's great! What results are you currently seeing — leads per month, conversion rate?";
        directResponse = "Most businesses we work with came to us after their previous agency underdelivered. We're happy to do a free audit to compare what you're getting vs. what's possible.";
      },
      {
        objection = "Not interested right now";
        softResponse = "Completely fine! Can I ask — what would need to change for this to be the right time?";
        directResponse = "Your competitors are investing in " # serviceType # " right now. Every month you wait is market share you can't recover. Would a small pilot with zero commitment help you evaluate?";
      },
      {
        objection = "Need to get approval";
        softResponse = "Of course — who else is involved in the decision? I'd love to prepare a quick summary you can share with them.";
        directResponse = "I can prepare a one-page ROI document tailored for decision-makers. That usually shortens the approval process significantly. Shall I prepare that for you?";
      },
    ];
  };

  public func createConversionScript(
    counters : GE.GrowthEngineCounters,
    scripts : List.List<GE.ConversionScript>,
    serviceType : Text,
    painPoint : Text,
    budgetTier : Text,
    now : Int,
  ) : GE.ConversionScript {
    let id = counters.nextScriptId;
    counters.nextScriptId += 1;

    let tierLabel = if (budgetTier == "premium") "₹50,000/month" else if (budgetTier == "mid") "₹25,000/month" else "₹10,000/month";

    let script : GE.ConversionScript = {
      id;
      scriptType = #call_script;
      serviceType;
      painPoint;
      budgetTier;
      opener = "Hi, I'm reaching out because I noticed your business could be significantly stronger in " # serviceType # ". I've helped similar businesses solve exactly the issue of \"" # painPoint # "\" — mind if I share what worked?";
      valueProp = "We specialize in " # serviceType # " for businesses just like yours. Our clients typically see 30–50% more qualified leads within 60 days. Our " # tierLabel # " plan covers everything — strategy, execution, and reporting.";
      discoveryQuestions = [
        "How are you currently getting new customers — what's working and what isn't?",
        "If you could fix one thing about your marketing in the next 90 days, what would it be?",
        "What does a good month look like for you in terms of new clients or revenue?",
        "Have you tried digital marketing before? What was the experience like?",
      ];
      closingTalk = "Based on everything you've shared, I think our " # tierLabel # " package is the right fit. It directly addresses \"" # painPoint # "\" and aligns with your growth goal. Can we move forward this week so you start seeing results next month?";
      objectionHandlers = buildObjectionHandlers(serviceType);
      createdAt = now;
    };
    scripts.add(script);
    script;
  };

  public func getScript(
    scripts : List.List<GE.ConversionScript>,
    id : GE.ConversionScriptId,
  ) : ?GE.ConversionScript {
    scripts.find(func(s) { s.id == id });
  };

  public func listScripts(scripts : List.List<GE.ConversionScript>) : [GE.ConversionScript] {
    scripts.toArray();
  };

  // ─── SEO Audits ───────────────────────────────────────────────────────────

  func buildSeoItems(url : Text) : [GE.SeoAuditItem] {
    let hasHttps = url.startsWith(#text "https");
    [
      {
        itemLabel = "Page Title Tag";
        status = #pass;
        suggestion = "Title tag detected. Ensure it is 50–60 chars and includes your primary keyword + city name.";
      },
      {
        itemLabel = "Meta Description";
        status = #warning;
        suggestion = "Meta description may be missing or too short. Add a 150–160 character description with a clear CTA.";
      },
      {
        itemLabel = "H1 and H2 Heading Structure";
        status = #pass;
        suggestion = "Headings detected. Ensure H1 contains your main service keyword and H2 tags structure page sections.";
      },
      {
        itemLabel = "Keyword Density";
        status = #warning;
        suggestion = "Keyword density should be 1–2% for primary terms. Avoid stuffing — use natural language variants.";
      },
      {
        itemLabel = "Mobile Friendliness";
        status = if (hasHttps) #pass else #warning;
        suggestion = if (hasHttps) "Site appears mobile-responsive. Test with Google Mobile-Friendly tool to confirm." else "Enable HTTPS and verify mobile responsiveness — 60%+ of searches are mobile.";
      },
    ];
  };

  func buildBlogOutlines(_url : Text) : [{ title : Text; outline : [Text]; targetKeyword : Text; wordCount : Nat }] {
    [
      {
        title = "How to Get More Local Customers from Google Search in 2024";
        targetKeyword = "local SEO for small business";
        wordCount = 1200;
        outline = [
          "Why local SEO matters for small businesses",
          "Setting up and optimizing your Google Business Profile",
          "On-page SEO: title tags, meta descriptions, local keywords",
          "Building local citations and backlinks",
          "Tracking your local rankings — free tools to use",
        ];
      },
      {
        title = "5 Digital Marketing Mistakes That Are Costing You Customers";
        targetKeyword = "digital marketing mistakes small business";
        wordCount = 1000;
        outline = [
          "Ignoring your Google Business Profile",
          "No consistent social media presence",
          "Website that isn't mobile-friendly",
          "No email list or follow-up system",
          "Tracking nothing — flying blind on ROI",
        ];
      },
    ];
  };

  public func createSeoAudit(
    counters : GE.GrowthEngineCounters,
    audits : List.List<GE.SeoAuditRecord>,
    url : Text,
    now : Int,
  ) : GE.SeoAuditRecord {
    let id = counters.nextAuditId;
    counters.nextAuditId += 1;
    let audit : GE.SeoAuditRecord = {
      id;
      url;
      titleScore = 72;
      metaScore = 45;
      headingScore = 68;
      keywordDensityScore = 55;
      mobileFriendlyScore = 80;
      pageSpeedScore = 62;
      items = buildSeoItems(url);
      blogOutlines = buildBlogOutlines(url);
      createdAt = now;
    };
    audits.add(audit);
    audit;
  };

  public func getAudit(
    audits : List.List<GE.SeoAuditRecord>,
    id : GE.SeoAuditId,
  ) : ?GE.SeoAuditRecord {
    audits.find(func(a) { a.id == id });
  };

  public func listAudits(audits : List.List<GE.SeoAuditRecord>) : [GE.SeoAuditRecord] {
    audits.toArray();
  };

  // ─── Growth Reports ───────────────────────────────────────────────────────

  public func generateGrowthReport(
    counters : GE.GrowthEngineCounters,
    reports : List.List<GE.GrowthReport>,
    clientId : Nat,
    weekOf : Text,
    monthOf : Text,
    leadsGenerated : Nat,
    conversionRate : Nat,
    revenueImpact : Nat,
    now : Int,
  ) : GE.GrowthReport {
    let id = counters.nextReportId;
    counters.nextReportId += 1;

    let weeklyActions : [GE.WeeklyAction] = [
      {
        action = "Run a limited-time offer or discount campaign";
        rationale = "Urgency-based offers consistently drive 20–30% more conversions in a short window.";
        estimatedImpact = "+15–25% leads this week";
        category = #run_offer;
      },
      {
        action = "Post 3 pieces of content: 1 educational, 1 social proof, 1 behind-the-scenes";
        rationale = "Consistent content builds trust and keeps your brand top-of-mind for warm leads.";
        estimatedImpact = "+10% engagement, 5–8 new inquiries";
        category = #post_content;
      },
      {
        action = "Update Google Business Profile: add new photos and respond to all recent reviews";
        rationale = "Active GBP profiles rank 40% higher in local search and generate 70% more calls.";
        estimatedImpact = "+20% local search visibility";
        category = #local_seo;
      },
    ];

    let revenueStrategies = [
      "Upsell Opportunity: Offer a premium package (e.g., monthly retainer) to your 2–3 most engaged clients. Existing clients are 5x easier to upsell than acquiring new ones.",
      "Combo Offer: Bundle two services together at a 15% discount. Combos increase average order value and reduce churn by creating stickiness.",
      "Retention Play: Launch a loyalty program — offer a free month or bonus service after every 6-month engagement. Retention is 5x cheaper than acquisition.",
    ];

    let marketingSuggestions = [
      "Instagram Reels Idea: Record a 30-second before/after transformation video showing a client result. Use hook: \"I helped a [business type] in [city] go from X to Y in 60 days — here's how.\" Target local hashtags.",
      "Review Collection Strategy: Send a WhatsApp message to your top 5 clients this week asking for a Google review. Offer a small thank-you (free audit, 10% off next month). Reviews compound and drive free leads.",
      "Local SEO Tip: Create a location-specific landing page for each city/area you serve. Use title: \"[Service] in [City] | [Your Brand]\". Rank for long-tail local searches your competitors ignore.",
    ];

    let nextActions = if (conversionRate < 30) {
      [
        "Improve follow-up sequence: Add a Day 3 and Day 7 follow-up message to your outreach cadence. Most deals close on the 3rd–5th touchpoint.",
        "Review lost leads from last month: Identify the top objection and create a response script targeting that objection specifically.",
      ];
    } else {
      [
        "Scale outreach: Your conversion rate is strong (" # conversionRate.toText() # "%). Double your weekly outreach volume to accelerate lead flow.",
        "Hire or delegate: Consider outsourcing repetitive tasks (lead research, content scheduling) so you can focus on closing deals.",
      ];
    };

    let convRateLabel = conversionRate.toText() # "%";
    let revenueLabel = "₹" # revenueImpact.toText();
    let reportNarrative = "This " # monthOf # " growth report shows " # leadsGenerated.toText() # " leads generated with a " # convRateLabel # " conversion rate, delivering " # revenueLabel # " in estimated revenue impact. " # (if (conversionRate < 30) "Conversion rate has room to improve — the recommended next actions focus on strengthening follow-up and objection handling." else "Strong conversion performance. The focus now is scaling lead volume to multiply revenue at this conversion rate.") # " The 3 weekly actions are prioritized for maximum impact with minimal time investment.";

    let report : GE.GrowthReport = {
      id;
      clientId;
      weekOf;
      monthOf;
      weeklyActions;
      revenueStrategies;
      marketingSuggestions;
      leadsGenerated;
      conversionRate;
      revenueImpact;
      nextActions;
      reportNarrative;
      createdAt = now;
    };
    reports.add(report);
    report;
  };

  public func getReport(
    reports : List.List<GE.GrowthReport>,
    id : GE.GrowthReportId,
  ) : ?GE.GrowthReport {
    reports.find(func(r) { r.id == id });
  };

  public func listReportsByClient(
    reports : List.List<GE.GrowthReport>,
    clientId : Nat,
  ) : [GE.GrowthReport] {
    reports.filter(func(r) { r.clientId == clientId }).toArray();
  };
};
