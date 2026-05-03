import List     "mo:core/List";
import Map      "mo:core/Map";
import Text     "mo:core/Text";
import Array    "mo:core/Array";
import OutCall  "mo:caffeineai-http-outcalls/outcall";
import Principal "mo:core/Principal";
import Runtime  "mo:core/Runtime";
import T        "../types/case-studies-affiliate-competitor";
import RT       "../types/referral";
import Lib      "../lib/case-studies-affiliate-competitor";

mixin (
  caseStudies       : List.List<T.CaseStudy>,
  commissions       : List.List<T.CommissionRecord>,
  payoutRequests    : List.List<T.PayoutRequest>,
  competitorReports : Map.Map<Text, T.CompetitorIntelReport>,
  competitorConfigs : Map.Map<Text, T.SavedCompetitorConfig>,
  caseStudyCounters : T.CaseStudyCounters,
  referrals         : List.List<RT.ReferralRecord>,
) {

  public query func transformCompetitorIntel(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Case Study ───────────────────────────────────────────────

  public shared ({ caller }) func createCaseStudy(
    clientName       : Text,
    clientCity       : Text,
    clientNiche      : Text,
    problemStatement : Text,
    actionsToken     : [Text],
    resultMetrics    : [T.ResultMetric],
    testimonialQuote : ?Text,
  ) : async { #ok : T.CaseStudy; #err : Text } {
    let cs = Lib.createCaseStudy(
      caseStudies, caseStudyCounters,
      caller.toText(), clientName, clientCity, clientNiche,
      problemStatement, actionsToken, resultMetrics, testimonialQuote,
    );
    #ok cs;
  };

  public shared ({ caller }) func updateCaseStudy(
    id      : Text,
    updates : T.CaseStudyUpdate,
  ) : async { #ok : T.CaseStudy; #err : Text } {
    switch (Lib.updateCaseStudy(caseStudies, id, caller.toText(), updates)) {
      case null  { #err "Case study not found or access denied" };
      case (?cs) { #ok cs };
    };
  };

  public query ({ caller }) func getCaseStudy(
    id : Text,
  ) : async ?T.CaseStudy {
    Lib.getCaseStudy(caseStudies, id, caller.toText());
  };

  public query ({ caller }) func listCaseStudies() : async [T.CaseStudy] {
    Lib.listCaseStudies(caseStudies, caller.toText());
  };

  public shared ({ caller }) func publishCaseStudy(
    id : Text,
  ) : async { #ok : Text; #err : Text } {
    switch (Lib.publishCaseStudy(caseStudies, id, caller.toText())) {
      case null      { #err "Case study not found or access denied" };
      case (?token)  { #ok token };
    };
  };

  public shared ({ caller }) func deleteCaseStudy(
    id : Text,
  ) : async { #ok : Text; #err : Text } {
    if (Lib.deleteCaseStudy(caseStudies, id, caller.toText())) {
      #ok "Deleted"
    } else {
      #err "Case study not found or access denied"
    };
  };

  /// Public — no authentication required.
  public query func getPublicCaseStudy(
    shareToken : Text,
  ) : async ?T.CaseStudy {
    Lib.getPublicCaseStudy(caseStudies, shareToken);
  };

  // ── Affiliate / Commission ─────────────────────────────────────

  /// Called from payment flow when a referred user upgrades their plan.
  public shared ({ caller }) func recordCommission(
    referredUserId : Text,
    planTier       : Text,
    planAmount     : Nat,
  ) : async { #ok : T.CommissionRecord; #err : Text } {
    switch (Lib.recordCommission(
      commissions, caseStudyCounters, referrals, referredUserId, planTier, planAmount,
    )) {
      case null    { #err "No completed referral found for this user" };
      case (?rec)  { #ok rec };
    };
  };

  public query ({ caller }) func getAffiliateStats() : async T.AffiliateStats {
    Lib.getAffiliateStats(commissions, referrals, caller.toText());
  };

  public query ({ caller }) func listCommissions(
    status : ?Text,
  ) : async [T.CommissionRecord] {
    Lib.listCommissions(commissions, caller.toText(), status);
  };

  /// Admin only — marks a commission record as paid.
  public shared ({ caller }) func markCommissionPaid(
    commissionId : Text,
  ) : async { #ok : Text; #err : Text } {
    if (not caller.isController()) {
      Runtime.trap("Admin only");
    };
    if (Lib.markCommissionPaid(commissions, commissionId)) {
      #ok "Commission marked as paid"
    } else {
      #err "Commission not found or already paid"
    };
  };

  public shared ({ caller }) func requestPayout(
    bankDetails : Text,
  ) : async { #ok : { requestId : Text }; #err : Text } {
    let stats = Lib.getAffiliateStats(commissions, referrals, caller.toText());
    if (stats.pendingEarnings == 0) {
      return #err "No pending earnings to request payout for";
    };
    let req = Lib.requestPayout(
      payoutRequests, caseStudyCounters, caller.toText(), stats.pendingEarnings, bankDetails,
    );
    #ok { requestId = req.requestId };
  };

  public query ({ caller }) func listPayoutRequests()
    : async [{ requestId : Text; amount : Nat; status : Text; createdAt : Int }] {
    let reqs = Lib.listPayoutRequests(payoutRequests, caller.toText());
    reqs.map<T.PayoutRequest, { requestId : Text; amount : Nat; status : Text; createdAt : Int }>(
      func(r) { { requestId = r.requestId; amount = r.amount; status = r.status; createdAt = r.createdAt } },
    );
  };

  // ── Competitor Intelligence ──────────────────────────────────────

  /// Makes HTTP outcalls to fetch each URL, parses HTML signals,
  /// and returns a full CompetitorIntelReport. Report is persisted per user.
  public shared ({ caller }) func runCompetitorScan(
    yourUrl        : Text,
    competitorUrls : [Text],
  ) : async { #ok : T.CompetitorIntelReport; #err : Text } {
    if (not yourUrl.startsWith(#text "http")) {
      return #err "Invalid URL: must start with http:// or https://";
    };
    let yourHtml = try {
      await OutCall.httpGetRequest(yourUrl, [], transformCompetitorIntel)
    } catch (_) { "" };
    let yourProfile = Lib.parseCompetitorHtml(yourUrl, yourHtml);

    let maxCompetitors = if (competitorUrls.size() > 3) 3 else competitorUrls.size();
    let competitorProfiles = List.empty<T.CompetitorProfile>();
    var i = 0;
    while (i < maxCompetitors) {
      let cUrl = competitorUrls[i];
      if (cUrl.startsWith(#text "http")) {
        let html = try {
                  await OutCall.httpGetRequest(cUrl, [], transformCompetitorIntel)
        } catch (_) { "" };
        competitorProfiles.add(Lib.parseCompetitorHtml(cUrl, html));
      };
      i += 1;
    };
    let competitorsArr = competitorProfiles.toArray();
    let keywordGaps    = Lib.deriveKeywordGaps(yourProfile, competitorsArr);
    let adSpendEst     = Lib.estimateAdSpend(competitorsArr);

    let report : T.CompetitorIntelReport = {
      userId          = caller.toText();
      yourUrl;
      competitors     = competitorsArr;
      keywordGaps;
      adSpendEstimate = adSpendEst;
      lastUpdatedAt   = Time.now();
    };
    Lib.storeCompetitorReport(competitorReports, caller.toText(), report);
    Lib.saveCompetitorConfig(competitorConfigs, caller.toText(), yourUrl, competitorUrls);
    #ok report;
  };

  public query ({ caller }) func getCompetitorIntelReport()
    : async ?T.CompetitorIntelReport {
    Lib.getCompetitorReport(competitorReports, caller.toText());
  };

  public shared ({ caller }) func saveCompetitorUrls(
    yourUrl        : Text,
    competitorUrls : [Text],
  ) : async { #ok : Text; #err : Text } {
    if (competitorUrls.size() > 3) {
      return #err "Maximum 3 competitor URLs allowed";
    };
    Lib.saveCompetitorConfig(competitorConfigs, caller.toText(), yourUrl, competitorUrls);
    #ok "Saved";
  };
};
