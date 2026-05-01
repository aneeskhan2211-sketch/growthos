import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Common "../types/common";
import T "../types/outreach-and-scraper";
import Lib "../lib/outreach-and-scraper";

mixin (
  outreachMessages : List.List<T.OutreachMessage>,
  scraperJobs : List.List<T.ScraperJob>,
  outreachCampaigns : List.List<T.OutreachCampaign>,
  outreachCounters : T.OutreachCounters,
) {
  // ── Seed guard ────────────────────────────────────────────────────────────

  var outreachSeeded : Bool = false;

  func ensureOutreachSeeded() {
    if (outreachSeeded) return;
    outreachSeeded := true;

    // ── 5 Sample OutreachMessages ─────────────────────────────────────────────
    let baseTime : Common.Timestamp = 1714000000000000000;
    let day : Common.Timestamp = 86_400_000_000_000;

    let seedMessages : [T.CreateOutreachMessageInput] = [
      {
        leadId = 0;
        businessName = "Sunrise Dental Clinic";
        channel = "email";
        templateType = "initial";
        dayNumber = 1;
        personalizedMessage = "Hi Sunrise Dental Clinic, we noticed your business isn't ranking for 'dentist Austin' — you may be losing 40+ patients per month to competitors. We can fix that in 30 days.";
        scheduledAt = baseTime;
        detectedProblem = "weak_seo";
      },
      {
        leadId = 1;
        businessName = "Peak Performance Gym";
        channel = "whatsapp";
        templateType = "initial";
        dayNumber = 1;
        personalizedMessage = "Hey Peak Performance Gym! Your website isn't showing up in local searches for 'gym Houston'. We estimate you're missing 60+ new members monthly. Let's change that.";
        scheduledAt = baseTime;
        detectedProblem = "weak_seo";
      },
      {
        leadId = 1;
        businessName = "Peak Performance Gym";
        channel = "whatsapp";
        templateType = "reminder";
        dayNumber = 2;
        personalizedMessage = "Following up — Peak Performance Gym still has a big opportunity to capture leads searching for gyms in Houston. Happy to show you a free audit.";
        scheduledAt = baseTime + day;
        detectedProblem = "weak_seo";
      },
      {
        leadId = 2;
        businessName = "Green Leaf Landscaping";
        channel = "email";
        templateType = "initial";
        dayNumber = 1;
        personalizedMessage = "Hello Green Leaf Landscaping, we found that none of your competitors in Dallas are running ads — this is a perfect window to dominate local search. Interested?";
        scheduledAt = baseTime;
        detectedProblem = "no_ads";
      },
      {
        leadId = 3;
        businessName = "Bella Vista Restaurant";
        channel = "email";
        templateType = "initial";
        dayNumber = 1;
        personalizedMessage = "Hi Bella Vista Restaurant — with your 4.7-star rating, you deserve to be at the top of 'best restaurant San Antonio' searches. We can make that happen fast.";
        scheduledAt = baseTime;
        detectedProblem = "weak_seo";
      },
    ];

    let statuses : [Text] = ["delivered", "replied", "sent", "scheduled", "scheduled"];
    let sentTimes : [?Common.Timestamp] = [?(baseTime + 3600_000_000_000), ?(baseTime + 3600_000_000_000), ?(baseTime + 3600_000_000_000), null, null];
    let delivTimes : [?Common.Timestamp] = [?(baseTime + 7200_000_000_000), ?(baseTime + 7200_000_000_000), null, null, null];
    let replyTimes : [?Common.Timestamp] = [null, ?(baseTime + 86400_000_000_000), null, null, null];

    var i = 0;
    for (inp in seedMessages.vals()) {
      let id = outreachCounters.nextOutreachMessageId;
      outreachCounters.nextOutreachMessageId += 1;
      ignore Lib.createOutreachMessage(outreachMessages, id, inp);
      // Only walk through status transitions for messages that were actually sent
      if (statuses[i] != "scheduled") {
        ignore Lib.updateOutreachMessageStatus(outreachMessages, id, "sent", sentTimes[i]);
        if (statuses[i] == "delivered" or statuses[i] == "replied") {
          ignore Lib.updateOutreachMessageStatus(outreachMessages, id, "delivered", delivTimes[i]);
        };
        if (statuses[i] == "replied") {
          ignore Lib.updateOutreachMessageStatus(outreachMessages, id, "replied", replyTimes[i]);
        };
      };
      i += 1;
    };

    // ── 3 Sample ScraperJobs ──────────────────────────────────────────────────
    let job0 = Lib.createScraperJob(scraperJobs, outreachCounters.nextScraperJobId, "Dental Clinics", "Austin", baseTime - day * 3);
    outreachCounters.nextScraperJobId += 1;
    ignore Lib.updateScraperJobProgress(scraperJobs, job0.id, 48, 100, "completed", 15, ?(baseTime - day * 2));

    let job1 = Lib.createScraperJob(scraperJobs, outreachCounters.nextScraperJobId, "Gyms & Fitness Centers", "Houston", baseTime - day);
    outreachCounters.nextScraperJobId += 1;
    ignore Lib.updateScraperJobProgress(scraperJobs, job1.id, 21, 44, "running", 7, null);

    ignore Lib.createScraperJob(scraperJobs, outreachCounters.nextScraperJobId, "Restaurants", "Dallas", baseTime);
    outreachCounters.nextScraperJobId += 1;

    // ── 2 Sample OutreachCampaigns ────────────────────────────────────────────
    let camp0 = Lib.createOutreachCampaign(
      outreachCampaigns,
      outreachCounters.nextOutreachCampaignId,
      { leadId = 0; businessName = "Sunrise Dental Clinic"; channels = ["email"] },
      baseTime,
    );
    outreachCounters.nextOutreachCampaignId += 1;
    ignore Lib.updateCampaignStats(outreachCampaigns, camp0.id, 2, 1, "active", null);

    let camp1 = Lib.createOutreachCampaign(
      outreachCampaigns,
      outreachCounters.nextOutreachCampaignId,
      { leadId = 1; businessName = "Peak Performance Gym"; channels = ["whatsapp", "email"] },
      baseTime,
    );
    outreachCounters.nextOutreachCampaignId += 1;
    ignore Lib.updateCampaignStats(outreachCampaigns, camp1.id, 1, 0, "active", null);
  };

  // ── OutreachMessage ───────────────────────────────────────────────────────

  public shared ({ caller }) func createOutreachMessage(
    input : T.CreateOutreachMessageInput
  ) : async T.OutreachMessage {
    ensureOutreachSeeded();
    let id = outreachCounters.nextOutreachMessageId;
    outreachCounters.nextOutreachMessageId += 1;
    Lib.createOutreachMessage(outreachMessages, id, input);
  };

  public query ({ caller }) func getOutreachMessagesByLead(
    leadId : Common.LeadId
  ) : async [T.OutreachMessage] {
    Lib.getOutreachMessagesByLead(outreachMessages, leadId);
  };

  public query ({ caller }) func listAllOutreachMessages() : async [T.OutreachMessage] {
    Lib.listAllOutreachMessages(outreachMessages);
  };

  public shared ({ caller }) func updateOutreachMessageStatus(
    id : Nat,
    status : Text,
    timestamp : ?Common.Timestamp,
  ) : async T.OutreachMessage {
    ensureOutreachSeeded();
    switch (Lib.updateOutreachMessageStatus(outreachMessages, id, status, timestamp)) {
      case (?msg) msg;
      case null Runtime.trap("OutreachMessage not found: " # id.toText());
    };
  };

  // ── ScraperJob ────────────────────────────────────────────────────────────

  public shared ({ caller }) func createScraperJob(
    niche : Text,
    city : Text,
  ) : async T.ScraperJob {
    ensureOutreachSeeded();
    let id = outreachCounters.nextScraperJobId;
    outreachCounters.nextScraperJobId += 1;
    Lib.createScraperJob(scraperJobs, id, niche, city, Time.now());
  };

  public query ({ caller }) func getScraperJob(id : Nat) : async ?T.ScraperJob {
    Lib.getScraperJob(scraperJobs, id);
  };

  public query ({ caller }) func listScraperJobs() : async [T.ScraperJob] {
    Lib.listScraperJobs(scraperJobs);
  };

  public shared ({ caller }) func updateScraperJobProgress(
    id : Nat,
    processed : Nat,
    progress : Nat,
    status : Text,
  ) : async T.ScraperJob {
    ensureOutreachSeeded();
    let completedAt : ?Common.Timestamp = if (status == "completed" or status == "failed") ?Time.now() else null;
    // leadsGenerated = processed (only qualified leads that passed score threshold)
    let leadsGenerated = processed;
    switch (Lib.updateScraperJobProgress(scraperJobs, id, processed, progress, status, leadsGenerated, completedAt)) {
      case (?job) job;
      case null Runtime.trap("ScraperJob not found: " # id.toText());
    };
  };

  // ── OutreachCampaign ──────────────────────────────────────────────────────

  public shared ({ caller }) func createOutreachCampaign(
    input : T.CreateOutreachCampaignInput
  ) : async T.OutreachCampaign {
    ensureOutreachSeeded();
    let id = outreachCounters.nextOutreachCampaignId;
    outreachCounters.nextOutreachCampaignId += 1;
    Lib.createOutreachCampaign(outreachCampaigns, id, input, Time.now());
  };

  public query ({ caller }) func getCampaignsByLead(
    leadId : Common.LeadId
  ) : async [T.OutreachCampaign] {
    Lib.getCampaignsByLead(outreachCampaigns, leadId);
  };

  public query ({ caller }) func listAllCampaigns() : async [T.OutreachCampaign] {
    Lib.listAllCampaigns(outreachCampaigns);
  };

  public shared ({ caller }) func updateCampaignStats(
    id : Nat,
    deliveredCount : Nat,
    repliedCount : Nat,
    status : Text,
  ) : async T.OutreachCampaign {
    ensureOutreachSeeded();
    let completedAt : ?Common.Timestamp = if (status == "completed") ?Time.now() else null;
    switch (Lib.updateCampaignStats(outreachCampaigns, id, deliveredCount, repliedCount, status, completedAt)) {
      case (?campaign) campaign;
      case null Runtime.trap("OutreachCampaign not found: " # id.toText());
    };
  };
};
