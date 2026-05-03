import List "mo:core/List";
import Map "mo:core/Map";
import Lib "../lib/analytics-and-tracking";
import T "../types/analytics-and-tracking";

mixin (
  analyticsEvents : List.List<T.AnalyticsEvent>,
  heatmapEvents : List.List<T.HeatmapEvent>,
  retentionMap : Map.Map<Text, T.RetentionData>,
  analyticsCounters : T.AnalyticsCounters,
) {
  // ── Analytics Events ──────────────────────────────────────────────────────

  public shared func recordAnalyticsEvent(
    userId : Text,
    eventType : T.AnalyticsEventType,
    metadata : [(Text, Text)],
  ) : async Nat {
    Lib.recordAnalyticsEvent(analyticsEvents, analyticsCounters, userId, eventType, metadata);
  };

  public query func getAnalyticsEvents(userId : Text) : async [T.AnalyticsEvent] {
    Lib.getAnalyticsEvents(analyticsEvents, userId);
  };

  // ── Heatmap Events ────────────────────────────────────────────────────────

  public shared func recordHeatmapEvent(
    userId : Text,
    screenName : Text,
    elementId : Text,
    eventKind : T.HeatmapEventKind,
    scrollDepth : Nat,
    timeSpentMs : Nat,
  ) : async Nat {
    Lib.recordHeatmapEvent(heatmapEvents, analyticsCounters, userId, screenName, elementId, eventKind, scrollDepth, timeSpentMs);
  };

  public query func getHeatmapSummary() : async [(Text, Nat)] {
    Lib.getHeatmapSummary(heatmapEvents);
  };

  // ── Funnel Metrics ────────────────────────────────────────────────────────

  public query func getFunnelMetrics() : async T.FunnelMetrics {
    Lib.getFunnelMetrics(analyticsEvents);
  };

  // ── Retention Data ────────────────────────────────────────────────────────

  public shared func updateRetentionData(
    userId : Text,
    weeklyLeads : Nat,
    weeklyReplies : Nat,
    weeklyProposals : Nat,
  ) : async () {
    Lib.updateRetentionData(retentionMap, userId, weeklyLeads, weeklyReplies, weeklyProposals);
  };

  public query func getRetentionData(userId : Text) : async ?T.RetentionData {
    Lib.getRetentionData(retentionMap, userId);
  };

  public shared func awardCredits(userId : Text, amount : Nat) : async () {
    Lib.awardCredits(retentionMap, userId, amount);
  };

  // ── Churn Risk ────────────────────────────────────────────────────────────

  /// Update the caller's last session timestamp to now (call on every Home screen load).
  public shared ({ caller }) func updateLastSession() : async () {
    Lib.updateLastSession(retentionMap, caller.toText());
  };

  /// Compute and persist churn risk for a given user.
  public query func checkChurnRisk(userId : Text) : async T.ChurnRisk {
    Lib.checkChurnRisk(retentionMap, userId);
  };

  /// Return churn status for the caller (isAtRisk, daysSinceLastSession, pendingHotLeads).
  public query ({ caller }) func getChurnStatus() : async { isAtRisk : Bool; daysSinceLastSession : Nat; pendingHotLeads : Nat } {
    Lib.getChurnStatus(retentionMap, analyticsEvents, caller.toText());
  };
};
