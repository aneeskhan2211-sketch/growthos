import Common "common";

module {
  // ── Consent ───────────────────────────────────────────────────────────────

  public type ConsentType = {
    #form_submission;
    #reply_first;
    #qr_optin;
    #manual_override;
  };

  public type ConsentStatus = {
    #granted;
    #withdrawn;
    #pending;
  };

  public type ConsentLogId = Nat;

  public type ConsentLog = {
    id : ConsentLogId;
    timestamp : Common.Timestamp;
    phone : Text;
    email : Text;
    consentType : ConsentType;
    status : ConsentStatus;
    messageTemplate : Text;
    userId : Text;
    notes : Text;
  };

  // ── CSV Import ────────────────────────────────────────────────────────────

  public type ImportId = Nat;

  public type ImportRecord = {
    id : ImportId;
    filename : Text;
    timestamp : Common.Timestamp;
    userId : Text;
    totalRows : Nat;
    validCount : Nat;
    invalidCount : Nat;
    duplicateCount : Nat;
    importedCount : Nat;
  };

  public type ImportRowStatus = {
    #valid;
    #invalid;
    #duplicate;
  };

  public type ImportRowResult = {
    rowIndex : Nat;
    status : ImportRowStatus;
    reason : Text;
    phone : Text;
    email : Text;
    name : Text;
    website : Text;
    city : Text;
    category : Text;
  };

  // ── Sender Identity & Warmup ──────────────────────────────────────────────

  public type SenderIdentityId = Nat;

  public type SenderType = {
    #whatsapp;
    #email_domain;
  };

  /// phase1 = 1-20/day, phase2 = 21-50/day, phase3 = 51-100/day, unlimited = 100+/day
  public type WarmupPhase = {
    #phase1;
    #phase2;
    #phase3;
    #unlimited;
  };

  public type SenderIdentity = {
    id : SenderIdentityId;
    identifier : Text;
    senderType : SenderType;
    reputationScore : Nat;
    warmupPhase : WarmupPhase;
    totalSent : Nat;
    totalDelivered : Nat;
    totalReplied : Nat;
    totalBounced : Nat;
    totalOptOut : Nat;
    blockedCount : Nat;
    createdAt : Common.Timestamp;
  };

  // ── Deliverability Stats ──────────────────────────────────────────────────

  public type DeliverabilityStatId = Nat;

  public type BounceType = {
    #soft;
    #hard;
    #spam_complaint;
  };

  public type DeliveryStats = {
    id : DeliverabilityStatId;
    identityId : SenderIdentityId;
    date : Text;
    deliveredCount : Nat;
    repliedCount : Nat;
    bouncedCount : Nat;
    optOutCount : Nat;
    blockedCount : Nat;
  };

  // ── Lead Scoring ──────────────────────────────────────────────────────────

  public type LeadScoreBreakdown = {
    website : Nat;
    seo : Nat;
    reviews : Nat;
    social : Nat;
    domainAge : Nat;
  };

  public type PriorityTag = {
    #high;
    #medium;
    #low;
  };

  // ── Compliance Counters ───────────────────────────────────────────────────

  public type ComplianceCounters = {
    var nextConsentLogId : Nat;
    var nextImportId : Nat;
    var nextSenderIdentityId : Nat;
    var nextDeliveryStatId : Nat;
  };
};
