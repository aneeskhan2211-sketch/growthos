import List "mo:core/List";
import Nat "mo:core/Nat";
import Common "../types/common";
import CT "../types/compliance-and-ingestion";

module {
  // ── Consent Log helpers ───────────────────────────────────────────────────

  public func recordConsentLog(
    consentLogs : List.List<CT.ConsentLog>,
    nextId : Nat,
    phone : Text,
    email : Text,
    consentType : CT.ConsentType,
    template : Text,
    userId : Text,
    notes : Text,
    timestamp : Common.Timestamp,
  ) : CT.ConsentLog {
    let log : CT.ConsentLog = {
      id = nextId;
      timestamp;
      phone;
      email;
      consentType;
      status = #granted;
      messageTemplate = template;
      userId;
      notes;
    };
    consentLogs.add(log);
    log;
  };

  public func updateConsentStatus(
    consentLogs : List.List<CT.ConsentLog>,
    id : CT.ConsentLogId,
    status : CT.ConsentStatus,
  ) : Bool {
    let found = consentLogs.findIndex(func(l) { l.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = consentLogs.at(idx);
        consentLogs.put(idx, { existing with status });
        true;
      };
    };
  };

  public func getConsentLogs(
    consentLogs : List.List<CT.ConsentLog>
  ) : [CT.ConsentLog] {
    consentLogs.toArray();
  };

  public func getConsentLogByPhone(
    consentLogs : List.List<CT.ConsentLog>,
    phone : Text,
  ) : ?CT.ConsentLog {
    consentLogs.find(func(l) { l.phone == phone });
  };

  // ── Import helpers ────────────────────────────────────────────────────────

  public func importCSVLeads(
    importRecords : List.List<CT.ImportRecord>,
    nextId : Nat,
    rows : [CT.ImportRowResult],
    filename : Text,
    userId : Text,
    timestamp : Common.Timestamp,
  ) : CT.ImportRecord {
    var validCount : Nat = 0;
    var invalidCount : Nat = 0;
    var duplicateCount : Nat = 0;

    for (row in rows.vals()) {
      switch (row.status) {
        case (#valid) { validCount += 1 };
        case (#invalid) { invalidCount += 1 };
        case (#duplicate) { duplicateCount += 1 };
      };
    };

    let record : CT.ImportRecord = {
      id = nextId;
      filename;
      timestamp;
      userId;
      totalRows = rows.size();
      validCount;
      invalidCount;
      duplicateCount;
      importedCount = validCount;
    };
    importRecords.add(record);
    record;
  };

  public func getImportHistory(
    importRecords : List.List<CT.ImportRecord>
  ) : [CT.ImportRecord] {
    importRecords.toArray();
  };

  // ── Sender Identity helpers ───────────────────────────────────────────────

  public func addSenderIdentity(
    senderIdentities : List.List<CT.SenderIdentity>,
    nextId : Nat,
    identifier : Text,
    senderType : CT.SenderType,
    timestamp : Common.Timestamp,
  ) : CT.SenderIdentity {
    let identity : CT.SenderIdentity = {
      id = nextId;
      identifier;
      senderType;
      reputationScore = 100;
      warmupPhase = #phase1;
      totalSent = 0;
      totalDelivered = 0;
      totalReplied = 0;
      totalBounced = 0;
      totalOptOut = 0;
      blockedCount = 0;
      createdAt = timestamp;
    };
    senderIdentities.add(identity);
    identity;
  };

  public func updateSenderReputation(
    senderIdentities : List.List<CT.SenderIdentity>,
    id : CT.SenderIdentityId,
    delivered : Nat,
    replied : Nat,
    bounced : Nat,
    optOut : Nat,
  ) : Bool {
    let found = senderIdentities.findIndex(func(s) { s.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = senderIdentities.at(idx);
        let newDelivered = existing.totalDelivered + delivered;
        let newReplied = existing.totalReplied + replied;
        let newBounced = existing.totalBounced + bounced;
        let newOptOut = existing.totalOptOut + optOut;
        let newSent = existing.totalSent + delivered + bounced;

        // reputationScore = max(0, min(100, 100 - bounced*2 - optOut*3 + replied*1))
        // Use Int arithmetic to handle potential underflow
        let rawScore : Int = 100 - (newBounced * 2 : Nat).toInt() - (newOptOut * 3 : Nat).toInt() + newReplied.toInt();
        let clampedScore : Int = if (rawScore < 0) 0 else if (rawScore > 100) 100 else rawScore;
        let reputationScore : Nat = clampedScore.toNat();

        // warmupPhase based on totalSent
        let warmupPhase : CT.WarmupPhase = if (newSent < 200) #phase1
          else if (newSent < 1000) #phase2
          else if (newSent < 5000) #phase3
          else #unlimited;

        senderIdentities.put(idx, {
          existing with
          totalDelivered = newDelivered;
          totalReplied = newReplied;
          totalBounced = newBounced;
          totalOptOut = newOptOut;
          totalSent = newSent;
          reputationScore;
          warmupPhase;
        });
        true;
      };
    };
  };

  public func getSenderIdentities(
    senderIdentities : List.List<CT.SenderIdentity>
  ) : [CT.SenderIdentity] {
    senderIdentities.toArray();
  };

  // ── Delivery Stats helpers ────────────────────────────────────────────────

  public func recordDeliveryStats(
    deliveryStats : List.List<CT.DeliveryStats>,
    nextId : Nat,
    identityId : CT.SenderIdentityId,
    date : Text,
    delivered : Nat,
    replied : Nat,
    bounced : Nat,
    optOut : Nat,
    blocked : Nat,
  ) : CT.DeliveryStats {
    let stats : CT.DeliveryStats = {
      id = nextId;
      identityId;
      date;
      deliveredCount = delivered;
      repliedCount = replied;
      bouncedCount = bounced;
      optOutCount = optOut;
      blockedCount = blocked;
    };
    deliveryStats.add(stats);
    stats;
  };

  public func getDeliverabilityMetrics(
    deliveryStats : List.List<CT.DeliveryStats>,
    identityId : CT.SenderIdentityId,
  ) : [CT.DeliveryStats] {
    deliveryStats.filter(func(s) { s.identityId == identityId }).toArray();
  };

  // ── Opt-out check helper ──────────────────────────────────────────────────

  // Check if any consent log for this lead (matched by id as a proxy for phone/email)
  // has a withdrawn status. leadId is used to simulate a contact lookup.
  public func checkOptOutStatus(
    consentLogs : List.List<CT.ConsentLog>,
    leadId : Common.LeadId,
  ) : Bool {
    // Simulate: check if any log with an id or pattern matching this leadId is withdrawn
    // In practice, a real impl would join via email/phone; here we check by log.id == leadId
    // as a deterministic simulation
    switch (consentLogs.find(func(l) { l.id == leadId and l.status == #withdrawn })) {
      case (?_) { true };
      case null { false };
    };
  };
};
