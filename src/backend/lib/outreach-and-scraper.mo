import List "mo:core/List";
import Common "../types/common";
import T "../types/outreach-and-scraper";

module {
  // ── OutreachMessage helpers ───────────────────────────────────────────────

  public func createOutreachMessage(
    messages : List.List<T.OutreachMessage>,
    id : Nat,
    input : T.CreateOutreachMessageInput,
  ) : T.OutreachMessage {
    let msg : T.OutreachMessage = {
      id;
      leadId = input.leadId;
      businessName = input.businessName;
      channel = input.channel;
      templateType = input.templateType;
      dayNumber = input.dayNumber;
      status = "scheduled";
      personalizedMessage = input.personalizedMessage;
      scheduledAt = input.scheduledAt;
      sentAt = null;
      deliveredAt = null;
      repliedAt = null;
      detectedProblem = input.detectedProblem;
      senderId = null;
      retryCount = 0;
      bounceReason = "";
      consentChecked = false;
    };
    messages.add(msg);
    msg;
  };

  public func getOutreachMessagesByLead(
    messages : List.List<T.OutreachMessage>,
    leadId : Common.LeadId,
  ) : [T.OutreachMessage] {
    messages.filter(func(m) { m.leadId == leadId }).toArray();
  };

  public func listAllOutreachMessages(
    messages : List.List<T.OutreachMessage>
  ) : [T.OutreachMessage] {
    messages.toArray();
  };

  public func updateOutreachMessageStatus(
    messages : List.List<T.OutreachMessage>,
    id : Nat,
    status : Text,
    timestamp : ?Common.Timestamp,
  ) : ?T.OutreachMessage {
    var updated : ?T.OutreachMessage = null;
    messages.mapInPlace(func(m) {
      if (m.id == id) {
        let sentAt = if (status == "sent") timestamp else m.sentAt;
        let deliveredAt = if (status == "delivered") timestamp else m.deliveredAt;
        let repliedAt = if (status == "replied") timestamp else m.repliedAt;
        let msg = { m with status; sentAt; deliveredAt; repliedAt };
        updated := ?msg;
        msg;
      } else { m };
    });
    updated;
  };

  // ── ScraperJob helpers ────────────────────────────────────────────────────

  public func createScraperJob(
    jobs : List.List<T.ScraperJob>,
    id : Nat,
    niche : Text,
    city : Text,
    createdAt : Common.Timestamp,
  ) : T.ScraperJob {
    let job : T.ScraperJob = {
      id;
      niche;
      city;
      status = "queued";
      totalFound = 0;
      processed = 0;
      progress = 0;
      createdAt;
      completedAt = null;
      leadsGenerated = 0;
    };
    jobs.add(job);
    job;
  };

  public func getScraperJob(
    jobs : List.List<T.ScraperJob>,
    id : Nat,
  ) : ?T.ScraperJob {
    jobs.find(func(j) { j.id == id });
  };

  public func listScraperJobs(
    jobs : List.List<T.ScraperJob>
  ) : [T.ScraperJob] {
    jobs.toArray();
  };

  public func updateScraperJobProgress(
    jobs : List.List<T.ScraperJob>,
    id : Nat,
    processed : Nat,
    progress : Nat,
    status : Text,
    leadsGenerated : Nat,
    completedAt : ?Common.Timestamp,
  ) : ?T.ScraperJob {
    var updated : ?T.ScraperJob = null;
    jobs.mapInPlace(func(j) {
      if (j.id == id) {
        let job = { j with processed; progress; status; leadsGenerated; completedAt };
        updated := ?job;
        job;
      } else { j };
    });
    updated;
  };

  // ── OutreachCampaign helpers ──────────────────────────────────────────────

  public func createOutreachCampaign(
    campaigns : List.List<T.OutreachCampaign>,
    id : Nat,
    input : T.CreateOutreachCampaignInput,
    startedAt : Common.Timestamp,
  ) : T.OutreachCampaign {
    let campaign : T.OutreachCampaign = {
      id;
      leadId = input.leadId;
      businessName = input.businessName;
      startedAt;
      completedAt = null;
      totalMessages = 3; // Day 1, Day 2, Day 4 follow-ups
      deliveredCount = 0;
      repliedCount = 0;
      status = "active";
      channels = input.channels;
    };
    campaigns.add(campaign);
    campaign;
  };

  public func getCampaignsByLead(
    campaigns : List.List<T.OutreachCampaign>,
    leadId : Common.LeadId,
  ) : [T.OutreachCampaign] {
    campaigns.filter(func(c) { c.leadId == leadId }).toArray();
  };

  public func listAllCampaigns(
    campaigns : List.List<T.OutreachCampaign>
  ) : [T.OutreachCampaign] {
    campaigns.toArray();
  };

  public func updateCampaignStats(
    campaigns : List.List<T.OutreachCampaign>,
    id : Nat,
    deliveredCount : Nat,
    repliedCount : Nat,
    status : Text,
    completedAt : ?Common.Timestamp,
  ) : ?T.OutreachCampaign {
    var updated : ?T.OutreachCampaign = null;
    campaigns.mapInPlace(func(c) {
      if (c.id == id) {
        let campaign = { c with deliveredCount; repliedCount; status; completedAt };
        updated := ?campaign;
        campaign;
      } else { c };
    });
    updated;
  };
};
