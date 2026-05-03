import List "mo:core/List";
import Map "mo:core/Map";
import Lib "../lib/retention-notifications";
import T "../types/retention-notifications";
import CT "../types/compliance-and-ingestion";

mixin (
  notificationEvents : List.List<T.NotificationEvent>,
  notificationPrefs : Map.Map<Text, T.UserNotificationPrefs>,
  retentionLastSessionMap : Map.Map<Text, Int>,
  notificationCounters : T.RetentionNotificationCounters,
  consentLogs : List.List<CT.ConsentLog>,
  complianceCounters : CT.ComplianceCounters,
) {
  // ── Notification Preferences ──────────────────────────────────────────────

  public query ({ caller }) func getUserNotificationPrefs() : async T.UserNotificationPrefs {
    Lib.getUserNotificationPrefs(notificationPrefs, caller.toText());
  };

  public shared ({ caller }) func setUserNotificationPrefs(
    frequencySettings : T.FrequencySettings,
    enabledTriggers : [T.TriggerType],
  ) : async () {
    Lib.setUserNotificationPrefs(notificationPrefs, caller.toText(), frequencySettings, enabledTriggers);
  };

  // ── WhatsApp Consent (opt-in / opt-out) ───────────────────────────────────

  public shared ({ caller }) func setWhatsAppConsent(phone : Text, optIn : Bool) : async () {
    Lib.setWhatsAppConsent(
      notificationPrefs,
      consentLogs,
      complianceCounters,
      caller.toText(),
      phone,
      optIn,
    );
  };

  // ── WhatsApp Sequence ─────────────────────────────────────────────────────

  public query func getWhatsAppSequence() : async [T.WhatsAppMessage] {
    Lib.getWhatsAppSequence();
  };

  // ── Drip Message ──────────────────────────────────────────────────────────

  public query func getDripMessage(onboardingDay : Nat) : async ?T.DripSequenceDay {
    Lib.getDripMessage(onboardingDay);
  };

  // ── Frequency Cap ─────────────────────────────────────────────────────────

  public query func canSendNotification(userId : Text) : async Bool {
    Lib.canSendNotification(notificationPrefs, retentionLastSessionMap, userId);
  };

  // ── Notification Event Recording ──────────────────────────────────────────

  public shared ({ caller }) func recordNotificationOpened(notificationId : Nat) : async Bool {
    Lib.recordNotificationOpened(notificationEvents, caller.toText(), notificationId);
  };

  public shared ({ caller }) func recordActionCompleted(notificationId : Nat) : async Bool {
    Lib.recordActionCompleted(notificationEvents, caller.toText(), notificationId);
  };

  // ── Retention Analytics (admin only) ──────────────────────────────────────

  public query func getRetentionAnalytics() : async T.RetentionAnalytics {
    Lib.getRetentionAnalytics(notificationEvents);
  };
};
