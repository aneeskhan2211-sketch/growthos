import List    "mo:core/List";
import Map     "mo:core/Map";
import Text    "mo:core/Text";
import Time    "mo:core/Time";
import Float   "mo:core/Float";
import Nat     "mo:core/Nat";
import Int     "mo:core/Int";
import T       "../types/case-studies-affiliate-competitor";
import RT      "../types/referral";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Set "mo:core/Set";

module {
  // ── Helpers ───────────────────────────────────────────────────────────────

  /// Generate a deterministic share token from the case study id.
  public func makeShareToken(id : Text) : Text {
    // Deterministic token: "share_" + first 8 chars of a simple hash of id
    var hash : Nat = 5381;
    for (c in id.toIter()) {
      let code = c.toNat32().toNat();
      hash := (hash * 33 + code) % 999999997;
    };
    "share_" # hash.toText();
  };

  /// Commission rate for a given plan tier (0.0–1.0).
  public func commissionRate(planTier : Text) : Float {
    switch (planTier) {
      case "Starter" { 0.20 };
      case "Growth"  { 0.25 };
      case "Pro"     { 0.28 };
      case "Agency"  { 0.30 };
      case _         { 0.20 };
    };
  };

  // ── Case Study ────────────────────────────────────────────────────────────

  public func createCaseStudy(
    caseStudies      : List.List<T.CaseStudy>,
    counters         : T.CaseStudyCounters,
    userId           : Text,
    clientName       : Text,
    clientCity       : Text,
    clientNiche      : Text,
    problemStatement : Text,
    actionsToken     : [Text],
    resultMetrics    : [T.ResultMetric],
    testimonialQuote : ?Text,
  ) : T.CaseStudy {
    let id = counters.nextCaseStudyId.toText();
    counters.nextCaseStudyId += 1;
    let cs : T.CaseStudy = {
      id;
      userId;
      clientName;
      clientCity;
      clientNiche;
      problemStatement;
      actionsToken;
      resultMetrics;
      testimonialQuote;
      createdAt = Time.now();
      isPublished = false;
      shareToken = "";
    };
    caseStudies.add(cs);
    cs;
  };

  public func updateCaseStudy(
    caseStudies : List.List<T.CaseStudy>,
    id          : Text,
    userId      : Text,
    updates     : T.CaseStudyUpdate,
  ) : ?T.CaseStudy {
    var updated : ?T.CaseStudy = null;
    caseStudies.mapInPlace(func(cs) {
      if (cs.id == id and cs.userId == userId) {
        let newCs : T.CaseStudy = {
          cs with
          clientName       = switch (updates.clientName)       { case (?v) v; case null cs.clientName };
          clientCity       = switch (updates.clientCity)       { case (?v) v; case null cs.clientCity };
          clientNiche      = switch (updates.clientNiche)      { case (?v) v; case null cs.clientNiche };
          problemStatement = switch (updates.problemStatement) { case (?v) v; case null cs.problemStatement };
          actionsToken     = switch (updates.actionsToken)     { case (?v) v; case null cs.actionsToken };
          resultMetrics    = switch (updates.resultMetrics)    { case (?v) v; case null cs.resultMetrics };
          testimonialQuote = switch (updates.testimonialQuote) { case (?v) ?v; case null cs.testimonialQuote };
        };
        updated := ?newCs;
        newCs;
      } else cs;
    });
    updated;
  };

  public func getCaseStudy(
    caseStudies : List.List<T.CaseStudy>,
    id          : Text,
    userId      : Text,
  ) : ?T.CaseStudy {
    caseStudies.find(func(cs) { cs.id == id and cs.userId == userId });
  };

  public func listCaseStudies(
    caseStudies : List.List<T.CaseStudy>,
    userId      : Text,
  ) : [T.CaseStudy] {
    caseStudies.filter(func(cs) { cs.userId == userId }).toArray();
  };

  public func publishCaseStudy(
    caseStudies : List.List<T.CaseStudy>,
    id          : Text,
    userId      : Text,
  ) : ?Text {
    var token : ?Text = null;
    caseStudies.mapInPlace(func(cs) {
      if (cs.id == id and cs.userId == userId) {
        let t = makeShareToken(id);
        token := ?t;
        { cs with isPublished = true; shareToken = t };
      } else cs;
    });
    token;
  };

  public func deleteCaseStudy(
    caseStudies : List.List<T.CaseStudy>,
    id          : Text,
    userId      : Text,
  ) : Bool {
    let before = caseStudies.size();
    let filtered = caseStudies.filter(func(cs) { not (cs.id == id and cs.userId == userId) });
    caseStudies.clear();
    caseStudies.append(filtered);
    caseStudies.size() < before;
  };

  public func getPublicCaseStudy(
    caseStudies : List.List<T.CaseStudy>,
    shareToken  : Text,
  ) : ?T.CaseStudy {
    caseStudies.find(func(cs) { cs.isPublished and cs.shareToken == shareToken });
  };

  // ── Affiliate / Commission ────────────────────────────────────────────────

  public func recordCommission(
    commissions    : List.List<T.CommissionRecord>,
    counters       : T.CaseStudyCounters,
    referrals      : List.List<RT.ReferralRecord>,
    referredUserId : Text,
    planTier       : Text,
    planAmount     : Nat,
  ) : ?T.CommissionRecord {
    // Find the referrer: look for a completed referral where the referredUserId matches
    let referralOpt = referrals.find(func(r) {
      switch (r.referredUserId) {
        case (?uid) { uid.toText() == referredUserId and r.status == #completed };
        case null   { false };
      };
    });
    switch (referralOpt) {
      case null { null };
      case (?ref) {
        let rate = commissionRate(planTier);
        let amount = (planAmount.toFloat() * rate).toInt().toNat();
        let id = counters.nextCommissionId.toText();
        counters.nextCommissionId += 1;
        let record : T.CommissionRecord = {
          id;
          referrerId     = ref.referrerId.toText();
          referredUserId;
          planTier;
          planAmount;
          commissionRate = rate;
          commissionAmount = amount;
          status         = "pending";
          createdAt      = Time.now();
          paidAt         = null;
        };
        commissions.add(record);
        ?record;
      };
    };
  };

  public func getAffiliateStats(
    commissions : List.List<T.CommissionRecord>,
    referrals   : List.List<RT.ReferralRecord>,
    userId      : Text,
  ) : T.AffiliateStats {
    let myCommissions = commissions.filter(func(c) { c.referrerId == userId });
    let totalEarnings   = myCommissions.foldLeft(0, func(acc, c) { acc + c.commissionAmount });
    let pendingEarnings = myCommissions.filter(func(c) { c.status == "pending" })
                            .foldLeft(0, func(acc, c) { acc + c.commissionAmount });
    let paidEarnings    = myCommissions.filter(func(c) { c.status == "paid" })
                            .foldLeft(0, func(acc, c) { acc + c.commissionAmount });
    let totalReferrals  = referrals.filter(func(r) { r.referrerId.toText() == userId and r.status == #completed }).size();
    let conversionRate  = if (totalReferrals == 0) {
      0.0;
    } else {
      let invited = referrals.filter(func(r) { r.referrerId.toText() == userId }).size();
      if (invited == 0) 0.0
      else totalReferrals.toFloat() / invited.toFloat();
    };
    {
      totalEarnings;
      pendingEarnings;
      paidEarnings;
      totalReferrals;
      conversionRate;
      commissionHistory = myCommissions.toArray();
    };
  };

  public func listCommissions(
    commissions : List.List<T.CommissionRecord>,
    userId      : Text,
    status      : ?Text,
  ) : [T.CommissionRecord] {
    let mine = commissions.filter(func(c) { c.referrerId == userId });
    switch (status) {
      case null     { mine.toArray() };
      case (?s) { mine.filter(func(c) { c.status == s }).toArray() };
    };
  };

  public func markCommissionPaid(
    commissions  : List.List<T.CommissionRecord>,
    commissionId : Text,
  ) : Bool {
    var found = false;
    commissions.mapInPlace(func(c) {
      if (c.id == commissionId and c.status == "pending") {
        found := true;
        { c with status = "paid"; paidAt = ?Time.now() };
      } else c;
    });
    found;
  };

  public func requestPayout(
    payoutRequests : List.List<T.PayoutRequest>,
    counters       : T.CaseStudyCounters,
    userId         : Text,
    pendingAmount  : Nat,
    bankDetails    : Text,
  ) : T.PayoutRequest {
    let requestId = "payout_" # counters.nextPayoutId.toText();
    counters.nextPayoutId += 1;
    let req : T.PayoutRequest = {
      requestId;
      userId;
      amount      = pendingAmount;
      bankDetails;
      status      = "pending";
      createdAt   = Time.now();
    };
    payoutRequests.add(req);
    req;
  };

  public func listPayoutRequests(
    payoutRequests : List.List<T.PayoutRequest>,
    userId         : Text,
  ) : [T.PayoutRequest] {
    payoutRequests.filter(func(r) { r.userId == userId }).toArray();
  };

  // ── Competitor Intelligence ───────────────────────────────────────────────

  /// Parse raw HTML bytes and extract SEO signals, social links, CTA/WhatsApp presence.
  public func parseCompetitorHtml(
    url  : Text,
    html : Text,
  ) : T.CompetitorProfile {
    let lower = html.toLower();

    // Title tag present
    let titlePresent = lower.contains(#text "<title");

    // Meta description present
    let metaPresent = lower.contains(#text "meta name=\"description\"") or
                      lower.contains(#text "meta name='description'");

    // Count H1 occurrences (simple substring count)
    func countSubstring(haystack : Text, needle : Text) : Nat {
      var count = 0;
      var remaining = haystack;
      label countLoop {
        let parts = remaining.split(#text needle);
        let arr = parts.toArray();
        if (arr.size() <= 1) break countLoop;
        count += arr.size() - 1;
        break countLoop;
      };
      count;
    };
    let h1Count = countSubstring(lower, "<h1");

    // Internal links (crude: count <a href
    let internalLinks = countSubstring(lower, "<a href");

    // Schema present
    let schemaPresent = lower.contains(#text "application/ld+json") or
                        lower.contains(#text "schema.org");

    // Social links
    let socialPlatforms : [(Text, Text)] = [
      ("facebook.com", "Facebook"),
      ("instagram.com", "Instagram"),
      ("linkedin.com", "LinkedIn"),
      ("wa.me", "WhatsApp"),
      ("api.whatsapp.com", "WhatsApp"),
      ("twitter.com", "Twitter"),
      ("youtube.com", "YouTube"),
    ];
    let foundSocial = socialPlatforms.filter(func((domain, _)) {
      lower.contains(#text domain);
    });
    let socialLinks = foundSocial.map(func((_, name)) { name });

    // WhatsApp button present
    let whatsappPresent = lower.contains(#text "wa.me") or
                          lower.contains(#text "api.whatsapp.com") or
                          lower.contains(#text "whatsapp");

    // CTA present (common CTA phrases)
    let ctaPresent = lower.contains(#text "book now") or
                     lower.contains(#text "get started") or
                     lower.contains(#text "contact us") or
                     lower.contains(#text "call now") or
                     lower.contains(#text "enquire") or
                     lower.contains(#text "free audit") or
                     lower.contains(#text "free consultation") or
                     lower.contains(#text "sign up");

    // Extract site name from title if present
    let name : ?Text = if (titlePresent) {
      // Very rough: find content between <title> and </title>
      let afterTitle = lower.split(#text "<title>").toArray();
      if (afterTitle.size() > 1) {
        let beforeClose = afterTitle[1].split(#text "</title>").toArray();
        if (beforeClose.size() > 0 and beforeClose[0].size() > 0) {
          ?beforeClose[0]
        } else null
      } else null
    } else null;

    // Traffic estimate based on signals
    let signalScore = (if titlePresent 1 else 0) + (if metaPresent 1 else 0) +
                      (if schemaPresent 1 else 0) + (if (h1Count > 0) 1 else 0) +
                      (if (internalLinks > 5) 1 else 0);
    let estimatedTraffic = if (signalScore >= 4) "Medium–High (estimated 500–2000 visitors/month)"
      else if (signalScore >= 2) "Low–Medium (estimated 100–500 visitors/month)"
      else "Low (estimated < 100 visitors/month)";

    {
      url;
      name;
      estimatedTraffic;
      seoSignals = { titlePresent; metaPresent; h1Count; internalLinks; schemaPresent };
      socialLinks;
      ctaPresent;
      whatsappPresent;
      pageSpeed = null;
      lastScannedAt = Time.now();
    };
  };

  /// Derive keyword gaps by comparing your URL's title/meta tokens with competitors'.
  public func deriveKeywordGaps(
    yourProfile   : T.CompetitorProfile,
    competitors   : [T.CompetitorProfile],
  ) : [Text] {
    // Gaps = signals competitors have that you're missing
    let gaps = List.empty<Text>();
    if (not yourProfile.seoSignals.titlePresent) {
      let anyHas = competitors.any(func(c) { c.seoSignals.titlePresent });
      if anyHas gaps.add("Missing title tag — competitors have optimised page titles");
    };
    if (not yourProfile.seoSignals.metaPresent) {
      let anyHas = competitors.any(func(c) { c.seoSignals.metaPresent });
      if anyHas gaps.add("Missing meta description — competitors appear better in search results");
    };
    if (not yourProfile.seoSignals.schemaPresent) {
      let anyHas = competitors.any(func(c) { c.seoSignals.schemaPresent });
      if anyHas gaps.add("Missing schema markup — competitors show rich results in Google");
    };
    if (not yourProfile.whatsappPresent) {
      let anyHas = competitors.any(func(c) { c.whatsappPresent });
      if anyHas gaps.add("No WhatsApp button — competitors have direct WhatsApp enquiry channel");
    };
    if (not yourProfile.ctaPresent) {
      let anyHas = competitors.any(func(c) { c.ctaPresent });
      if anyHas gaps.add("No clear CTA found — competitors actively prompt visitors to take action");
    };
    if (yourProfile.seoSignals.h1Count == 0) {
      let anyHas = competitors.any(func(c) { c.seoSignals.h1Count > 0 });
      if anyHas gaps.add("Missing H1 heading — competitors have clear page headings for SEO");
    };
    let competitorSocials = competitors.foldLeft<T.CompetitorProfile, [Text]>([], func(acc, c) {
      acc.concat(c.socialLinks)
    });
    let yourSocialSet = Set.fromArray(yourProfile.socialLinks);
    for (s in competitorSocials.values()) {
      if (not yourSocialSet.contains(s)) {
        gaps.add("Missing " # s # " presence — found on competitor sites");
      };
    };
    gaps.deduplicate();
    gaps.toArray();
  };

  /// Produce human-readable ad spend estimate from HTML signals (Google Ads script presence).
  public func estimateAdSpend(
    competitors : [T.CompetitorProfile],
  ) : Text {
    // Conservative estimate based on signals
    let count = competitors.size();
    if (count == 0) {
      return "No competitor data available. Disclaimer: estimates based on website signals, not actual spend data.";
    };
    let withCta = competitors.filter(func(c) { c.ctaPresent }).size();
    let withSchema = competitors.filter(func(c) { c.seoSignals.schemaPresent }).size();
    let signalStrength = withCta + withSchema;
    let estimate = if (signalStrength >= count) {
      "Competitors appear to be investing in digital marketing (₹15,000–₹50,000/month estimated). They have clear CTAs and structured data."
    } else if (signalStrength > 0) {
      "Some competitors show digital marketing signals (₹5,000–₹20,000/month estimated)."
    } else {
      "Competitors show minimal digital marketing investment. Low competition signal."
    };
    estimate # " Disclaimer: These are rough estimates based on website signals only, not actual advertising spend data.";
  };

  public func saveCompetitorConfig(
    competitorConfigs : Map.Map<Text, T.SavedCompetitorConfig>,
    userId            : Text,
    yourUrl           : Text,
    competitorUrls    : [Text],
  ) {
    let config : T.SavedCompetitorConfig = {
      userId;
      yourUrl;
      competitorUrls;
      savedAt = Time.now();
    };
    competitorConfigs.add(userId, config);
  };

  public func getCompetitorConfig(
    competitorConfigs : Map.Map<Text, T.SavedCompetitorConfig>,
    userId            : Text,
  ) : ?T.SavedCompetitorConfig {
    competitorConfigs.get(userId);
  };

  public func storeCompetitorReport(
    competitorReports : Map.Map<Text, T.CompetitorIntelReport>,
    userId            : Text,
    report            : T.CompetitorIntelReport,
  ) {
    competitorReports.add(userId, report);
  };

  public func getCompetitorReport(
    competitorReports : Map.Map<Text, T.CompetitorIntelReport>,
    userId            : Text,
  ) : ?T.CompetitorIntelReport {
    competitorReports.get(userId);
  };
};
