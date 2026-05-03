import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/auto-agency";
import CoreT "../types/core-data";
import AutoAgencyLib "../lib/auto-agency";

mixin (
  agencyState : T.AutoAgencyState,
  dealSuggestions : List.List<T.DealSuggestion>,
  accountability : T.AccountabilityState,
  growthPlans : Map.Map<Common.ClientId, T.ClientGrowthPlan>,
  autoReports : Map.Map<Common.ClientId, T.AutoReport>,
  marketplaceListings : List.List<T.MarketplaceListing>,
  performanceScores : Map.Map<Text, T.PerformanceScore>,
  autoAgencyCounters : T.AutoAgencyCounters,
  leads : List.List<CoreT.Lead>,
) {
  // Seed marketplace listings on first access
  AutoAgencyLib.seedMarketplaceListings(marketplaceListings, autoAgencyCounters);

  // ─── Auto Agency Toggle & State ───────────────────────────────────────────────

  public query func getAutoAgencyState() : async T.AutoAgencyStateView {
    AutoAgencyLib.getAutoAgencyState(agencyState)
  };

  public shared func setAutoAgencyEnabled(enabled : Bool) : async () {
    AutoAgencyLib.setAutoAgencyEnabled(agencyState, enabled)
  };

  public shared func runAgencyCycle() : async () {
    AutoAgencyLib.runAgencyCycle(agencyState, autoAgencyCounters, leads, dealSuggestions, accountability)
  };

  // ─── Deal Suggestions ─────────────────────────────────────────────────────────

  public query func getDealSuggestions() : async [T.DealSuggestion] {
    AutoAgencyLib.getDealSuggestions(dealSuggestions)
  };

  public shared func refreshDealSuggestions() : async () {
    AutoAgencyLib.refreshDealSuggestions(dealSuggestions, autoAgencyCounters, leads)
  };

  // ─── Accountability ───────────────────────────────────────────────────────────

  public query func getAccountabilityState() : async T.AccountabilityStateView {
    AutoAgencyLib.getAccountabilityState(accountability)
  };

  public shared func updateDailyProgress(
    leadsContacted : Nat,
    followupsDone : Nat,
    dealsClosed : Nat,
  ) : async () {
    AutoAgencyLib.updateDailyProgress(accountability, leadsContacted, followupsDone, dealsClosed)
  };

  // ─── Revenue Prediction ───────────────────────────────────────────────────────

  public query func getRevenuePrediction() : async T.RevenuePrediction {
    AutoAgencyLib.getRevenuePrediction(leads, dealSuggestions)
  };

  // ─── Performance Score ────────────────────────────────────────────────────────

  public query ({ caller }) func getPerformanceScore() : async T.PerformanceScore {
    AutoAgencyLib.getPerformanceScore(caller.toText(), accountability, leads, performanceScores)
  };

  // ─── Marketplace ──────────────────────────────────────────────────────────────

  public query func getMarketplaceListings() : async [T.MarketplaceListing] {
    AutoAgencyLib.getMarketplaceListings(marketplaceListings)
  };

  public shared ({ caller }) func createMarketplaceListing(
    listingType : T.MarketplaceListingType,
    title : Text,
    description : Text,
    price : Nat,
    tags : [Text],
  ) : async T.MarketplaceListing {
    AutoAgencyLib.createMarketplaceListing(
      marketplaceListings,
      autoAgencyCounters,
      caller.toText(),
      caller.toText(),
      listingType,
      title,
      description,
      price,
      tags,
    )
  };

  // ─── Client Growth Plan ───────────────────────────────────────────────────────

  public query func getClientGrowthPlan(clientId : Common.ClientId) : async ?T.ClientGrowthPlan {
    AutoAgencyLib.getClientGrowthPlan(growthPlans, clientId)
  };

  public shared func generateClientGrowthPlan(clientId : Common.ClientId) : async T.ClientGrowthPlan {
    AutoAgencyLib.generateClientGrowthPlan(growthPlans, autoAgencyCounters, clientId)
  };

  // ─── Auto Report ──────────────────────────────────────────────────────────────

  public query func getAutoReport(clientId : Common.ClientId) : async ?T.AutoReport {
    AutoAgencyLib.getAutoReport(autoReports, clientId)
  };

  public shared func generateAutoReport(
    clientId : Common.ClientId,
    reportPeriod : Text,
  ) : async T.AutoReport {
    AutoAgencyLib.generateAutoReport(autoReports, autoAgencyCounters, clientId, reportPeriod, leads)
  };

  public shared func markReportSent(clientId : Common.ClientId) : async () {
    AutoAgencyLib.markReportSent(autoReports, clientId, Time.now())
  };
};
