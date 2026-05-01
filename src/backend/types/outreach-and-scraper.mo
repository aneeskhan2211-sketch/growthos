import Common "common";
import CI "compliance-and-ingestion";

module {
  // ── OutreachMessage ───────────────────────────────────────────────────────

  public type OutreachMessage = {
    id : Nat;
    leadId : Common.LeadId;
    businessName : Text;
    channel : Text; // "whatsapp" | "email"
    templateType : Text; // "initial" | "reminder" | "final"
    dayNumber : Nat; // 1, 2, or 4
    status : Text; // "scheduled" | "sent" | "delivered" | "replied" | "failed"
    personalizedMessage : Text;
    scheduledAt : Common.Timestamp;
    sentAt : ?Common.Timestamp;
    deliveredAt : ?Common.Timestamp;
    repliedAt : ?Common.Timestamp;
    detectedProblem : Text; // "no_website" | "low_rating" | "no_ads" | "weak_seo" | "multiple"
    // Compliance & deliverability extensions
    senderId : ?CI.SenderIdentityId;
    retryCount : Nat;
    bounceReason : Text;
    consentChecked : Bool;
  };

  public type CreateOutreachMessageInput = {
    leadId : Common.LeadId;
    businessName : Text;
    channel : Text;
    templateType : Text;
    dayNumber : Nat;
    personalizedMessage : Text;
    scheduledAt : Common.Timestamp;
    detectedProblem : Text;
  };

  // ── ScraperJob ────────────────────────────────────────────────────────────

  public type ScraperJob = {
    id : Nat;
    niche : Text;
    city : Text;
    status : Text; // "queued" | "running" | "completed" | "failed"
    totalFound : Nat;
    processed : Nat;
    progress : Nat; // 0-100
    createdAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    leadsGenerated : Nat;
  };

  // ── OutreachCampaign ──────────────────────────────────────────────────────

  public type OutreachCampaign = {
    id : Nat;
    leadId : Common.LeadId;
    businessName : Text;
    startedAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    totalMessages : Nat;
    deliveredCount : Nat;
    repliedCount : Nat;
    status : Text; // "active" | "paused" | "completed"
    channels : [Text];
  };

  public type CreateOutreachCampaignInput = {
    leadId : Common.LeadId;
    businessName : Text;
    channels : [Text];
  };

  // ── Counters extension ────────────────────────────────────────────────────

  public type OutreachCounters = {
    var nextOutreachMessageId : Nat;
    var nextScraperJobId : Nat;
    var nextOutreachCampaignId : Nat;
  };
};
