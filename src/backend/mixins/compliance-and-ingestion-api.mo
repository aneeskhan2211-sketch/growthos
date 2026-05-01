import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import CT "../types/compliance-and-ingestion";
import Lib "../lib/compliance-and-ingestion";

mixin (
  consentLogs : List.List<CT.ConsentLog>,
  importRecords : List.List<CT.ImportRecord>,
  senderIdentities : List.List<CT.SenderIdentity>,
  deliveryStats : List.List<CT.DeliveryStats>,
  complianceCounters : CT.ComplianceCounters,
) {
  // ── Seed guard ────────────────────────────────────────────────────────────

  var complianceSeeded : Bool = false;

  func ensureComplianceSeeded() {
    if (complianceSeeded) return;
    complianceSeeded := true;

    // ── 3 sample consent logs ─────────────────────────────────────────────────
    let id0 = complianceCounters.nextConsentLogId;
    complianceCounters.nextConsentLogId += 1;
    ignore Lib.recordConsentLog(
      consentLogs,
      id0,
      "+91-9876543210",
      "owner@sunrisedental.com",
      #form_submission,
      "Hi [BusinessName], we help [Category] businesses in [City] get more clients.",
      "system",
      "Submitted via free audit form",
      1714000000000000000,
    );

    let id1 = complianceCounters.nextConsentLogId;
    complianceCounters.nextConsentLogId += 1;
    let log1 = Lib.recordConsentLog(
      consentLogs,
      id1,
      "+91-9988776655",
      "contact@peakperformancegym.io",
      #reply_first,
      "Hello [BusinessName]! Noticed your [Category] business in [City].",
      "system",
      "User replied to initial message",
      1714200000000000000,
    );
    // mark second log as withdrawn to demonstrate opt-out
    ignore Lib.updateConsentStatus(consentLogs, log1.id, #withdrawn);

    let id2 = complianceCounters.nextConsentLogId;
    complianceCounters.nextConsentLogId += 1;
    ignore Lib.recordConsentLog(
      consentLogs,
      id2,
      "+91-9123456789",
      "hello@greenleaflandscaping.net",
      #qr_optin,
      "Thanks for scanning our QR! We'd love to help [BusinessName] grow.",
      "system",
      "Opted in via QR code at trade show",
      1714400000000000000,
    );

    // ── 2 sample sender identities ────────────────────────────────────────────
    let sid0 = complianceCounters.nextSenderIdentityId;
    complianceCounters.nextSenderIdentityId += 1;
    let wa = Lib.addSenderIdentity(
      senderIdentities,
      sid0,
      "+91-9876543210 (WhatsApp)",
      #whatsapp,
      1710000000000000000,
    );
    // Update with realistic stats
    ignore Lib.updateSenderReputation(senderIdentities, wa.id, 205, 42, 8, 3);
    // Patch totalSent to reflect actual historical value (234 sent total)
    let waIdx = senderIdentities.findIndex(func(s) { s.id == wa.id });
    switch (waIdx) {
      case (?idx) {
        let existing = senderIdentities.at(idx);
        senderIdentities.put(idx, { existing with totalSent = 234; blockedCount = 1 });
      };
      case null {};
    };

    let sid1 = complianceCounters.nextSenderIdentityId;
    complianceCounters.nextSenderIdentityId += 1;
    let em = Lib.addSenderIdentity(
      senderIdentities,
      sid1,
      "outreach@growthagency.in (Email)",
      #email_domain,
      1710000000000000000,
    );
    ignore Lib.updateSenderReputation(senderIdentities, em.id, 172, 28, 4, 1);
    let emIdx = senderIdentities.findIndex(func(s) { s.id == em.id });
    switch (emIdx) {
      case (?idx) {
        let existing = senderIdentities.at(idx);
        senderIdentities.put(idx, { existing with totalSent = 180 });
      };
      case null {};
    };
  };

  // ── Consent Log ───────────────────────────────────────────────────────────

  public shared ({ caller }) func recordConsentLog(
    phone : Text,
    email : Text,
    consentType : CT.ConsentType,
    template : Text,
    userId : Text,
    notes : Text,
  ) : async CT.ConsentLogId {
    let id = complianceCounters.nextConsentLogId;
    complianceCounters.nextConsentLogId += 1;
    let log = Lib.recordConsentLog(
      consentLogs,
      id,
      phone,
      email,
      consentType,
      template,
      userId,
      notes,
      Time.now(),
    );
    log.id;
  };

  public shared ({ caller }) func updateConsentStatus(
    id : CT.ConsentLogId,
    status : CT.ConsentStatus,
  ) : async Bool {
    Lib.updateConsentStatus(consentLogs, id, status);
  };

  public query ({ caller }) func getConsentLogs() : async [CT.ConsentLog] {
    ensureComplianceSeeded();
    Lib.getConsentLogs(consentLogs);
  };

  // ── CSV Import ────────────────────────────────────────────────────────────

  public shared ({ caller }) func importCSVLeads(
    rows : [CT.ImportRowResult],
    filename : Text,
    userId : Text,
  ) : async CT.ImportRecord {
    let id = complianceCounters.nextImportId;
    complianceCounters.nextImportId += 1;
    Lib.importCSVLeads(importRecords, id, rows, filename, userId, Time.now());
  };

  public query ({ caller }) func getImportHistory() : async [CT.ImportRecord] {
    Lib.getImportHistory(importRecords);
  };

  // ── Sender Identity ───────────────────────────────────────────────────────

  public shared ({ caller }) func addSenderIdentity(
    identifier : Text,
    senderType : CT.SenderType,
  ) : async CT.SenderIdentity {
    let id = complianceCounters.nextSenderIdentityId;
    complianceCounters.nextSenderIdentityId += 1;
    Lib.addSenderIdentity(senderIdentities, id, identifier, senderType, Time.now());
  };

  public shared ({ caller }) func updateSenderReputation(
    id : CT.SenderIdentityId,
    delivered : Nat,
    replied : Nat,
    bounced : Nat,
    optOut : Nat,
  ) : async Bool {
    Lib.updateSenderReputation(senderIdentities, id, delivered, replied, bounced, optOut);
  };

  public query ({ caller }) func getSenderIdentities() : async [CT.SenderIdentity] {
    ensureComplianceSeeded();
    Lib.getSenderIdentities(senderIdentities);
  };

  // ── Deliverability Stats ──────────────────────────────────────────────────

  public shared ({ caller }) func recordDeliveryStats(
    identityId : CT.SenderIdentityId,
    date : Text,
    delivered : Nat,
    replied : Nat,
    bounced : Nat,
    optOut : Nat,
    blocked : Nat,
  ) : async CT.DeliverabilityStatId {
    let id = complianceCounters.nextDeliveryStatId;
    complianceCounters.nextDeliveryStatId += 1;
    let stats = Lib.recordDeliveryStats(
      deliveryStats,
      id,
      identityId,
      date,
      delivered,
      replied,
      bounced,
      optOut,
      blocked,
    );
    // Recalculate reputation after recording stats
    ignore Lib.updateSenderReputation(
      senderIdentities,
      identityId,
      delivered,
      replied,
      bounced,
      optOut,
    );
    stats.id;
  };

  public query ({ caller }) func getDeliverabilityMetrics(
    identityId : CT.SenderIdentityId
  ) : async [CT.DeliveryStats] {
    Lib.getDeliverabilityMetrics(deliveryStats, identityId);
  };

  // ── Opt-out check ─────────────────────────────────────────────────────────

  public query ({ caller }) func checkOptOutStatus(
    leadId : Common.LeadId
  ) : async Bool {
    Lib.checkOptOutStatus(consentLogs, leadId);
  };
};
