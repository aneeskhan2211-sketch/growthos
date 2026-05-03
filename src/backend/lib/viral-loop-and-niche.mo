import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import T "../types/viral-loop-and-niche";
import RT "../types/referral";

module {
  // ── Social Proof Feed ──────────────────────────────────────────────────────

  let MAX_FEED_SIZE : Nat = 200;
  let ONE_DAY_NS : Int = 86_400_000_000_000;

  /// Record a social proof entry with a real timestamp (used by the mixin).
  public func recordSocialProofEntryAt(
    feed : List.List<T.SocialProofEntry>,
    counters : T.ViralLoopCounters,
    displayName : Text,
    city : Text,
    activityType : T.SocialProofActivityType,
    metricValue : Nat,
    nowNs : Int,
  ) : T.SocialProofEntry {
    // Drop oldest entries beyond cap
    while (feed.size() >= MAX_FEED_SIZE) {
      ignore feed.removeLast();
    };
    let id = counters.nextSocialProofId;
    counters.nextSocialProofId += 1;
    let entry : T.SocialProofEntry = {
      id;
      userDisplayName = displayName;
      city;
      activityType;
      metricValue;
      timestamp = nowNs;
    };
    // Insert at front so newest is first
    let tmp = feed.clone();
    feed.clear();
    feed.add(entry);
    feed.append(tmp);
    entry;
  };

  /// Record a social proof entry (signature required by contract — nowNs unused, mixin uses At variant).
  public func recordSocialProofEntry(
    feed : List.List<T.SocialProofEntry>,
    counters : T.ViralLoopCounters,
    displayName : Text,
    city : Text,
    activityType : T.SocialProofActivityType,
    metricValue : Nat,
  ) : T.SocialProofEntry {
    recordSocialProofEntryAt(feed, counters, displayName, city, activityType, metricValue, 0);
  };

  /// Return up to 50 entries from the last 24 hours, sorted by time desc.
  public func listRecentSocialProof(
    feed : List.List<T.SocialProofEntry>,
    nowNs : Int,
  ) : [T.SocialProofEntry] {
    let cutoff = nowNs - ONE_DAY_NS;
    let arr = feed.toArray();
    let recent = arr.filter(func(e : T.SocialProofEntry) : Bool {
      e.timestamp >= cutoff
    });
    if (recent.size() <= 50) recent
    else recent.sliceToArray(0, 50);
  };

  // ── Weekly Challenge & City Leaderboard ────────────────────────────────────

  func challengeKey(userId : Text, isoWeek : Text) : Text {
    userId # ":" # isoWeek
  };

  /// Upsert a user's weekly challenge progress.
  public func updateChallengeProgress(
    challengeRecords : Map.Map<Text, T.WeeklyChallengeRecord>,
    userId : Text,
    displayName : Text,
    city : Text,
    isoWeek : Text,
    leadsToAdd : Nat,
  ) : () {
    let key = challengeKey(userId, isoWeek);
    let existing = challengeRecords.get(key);
    let updated : T.WeeklyChallengeRecord = switch existing {
      case (?rec) {
        { rec with leadsGenerated = rec.leadsGenerated + leadsToAdd }
      };
      case null {
        {
          userId;
          displayName;
          city;
          isoWeek;
          leadsGenerated = leadsToAdd;
          rewardClaimed = false;
        };
      };
    };
    challengeRecords.add(key, updated);
  };

  /// Return the top 10 leaderboard entries for a given city and ISO week.
  public func getCityLeaderboard(
    challengeRecords : Map.Map<Text, T.WeeklyChallengeRecord>,
    city : Text,
    isoWeek : Text,
  ) : [T.LeaderboardEntry] {
    let allEntries = challengeRecords.entries().toArray();
    let filtered = allEntries.filter(func((_, r) : (Text, T.WeeklyChallengeRecord)) : Bool {
      r.city == city and r.isoWeek == isoWeek
    });
    let sorted = filtered.sort(func((_, a) : (Text, T.WeeklyChallengeRecord), (_, b) : (Text, T.WeeklyChallengeRecord)) : Order.Order {
      if (a.leadsGenerated > b.leadsGenerated) #less
      else if (a.leadsGenerated < b.leadsGenerated) #greater
      else #equal
    });
    let top10 = if (sorted.size() <= 10) sorted
                else sorted.sliceToArray(0, 10);

    top10.mapEntries<(Text, T.WeeklyChallengeRecord), T.LeaderboardEntry>(func((_, r), idx) {
      let rank = idx + 1;
      let badge : T.ChallengeBadge = if (rank == 1) #gold
        else if (rank == 2) #silver
        else if (rank == 3) #bronze
        else #none;
      {
        rank;
        userId = r.userId;
        displayName = r.displayName;
        city = r.city;
        leadsCount = r.leadsGenerated;
        badge;
      };
    });
  };

  /// Award end-of-week credits to top 3 users for the given city and ISO week.
  public func awardWeeklyRewards(
    challengeRecords : Map.Map<Text, T.WeeklyChallengeRecord>,
    city : Text,
    isoWeek : Text,
  ) : [(Text, Nat)] {
    let leaderboard = getCityLeaderboard(challengeRecords, city, isoWeek);
    let creditsByRank : [Nat] = [500, 250, 100];
    var awards : [(Text, Nat)] = [];

    for (entry in leaderboard.values()) {
      if (entry.rank <= 3) {
        let key = challengeKey(entry.userId, isoWeek);
        switch (challengeRecords.get(key)) {
          case (?rec) {
            if (not rec.rewardClaimed) {
              challengeRecords.add(key, { rec with rewardClaimed = true });
              let credits = creditsByRank[entry.rank - 1];
              awards := awards.concat([(entry.userId, credits)]);
            };
          };
          case null {};
        };
      };
    };
    awards;
  };

  // ── Invite-to-Unlock Milestones ────────────────────────────────────────────

  type MilestoneDef = {
    milestoneId : T.MilestoneId;
    title : Text;
    description : Text;
    inviteThreshold : Nat;
    durationNs : Int;
  };

  let MILESTONES : [MilestoneDef] = [
    {
      milestoneId = "pro_48h";
      title = "Pro Trial (48h)";
      description = "Unlock Pro features for 48 hours";
      inviteThreshold = 3;
      durationNs = 172_800_000_000_000;
    },
    {
      milestoneId = "auto_followups_7d";
      title = "Auto Follow-ups (7 days)";
      description = "Unlock Auto Follow-ups for 7 days";
      inviteThreshold = 10;
      durationNs = 604_800_000_000_000;
    },
    {
      milestoneId = "agency_7d";
      title = "Agency Features (7 days)";
      description = "Unlock Agency features for 7 days";
      inviteThreshold = 25;
      durationNs = 604_800_000_000_000;
    },
  ];

  func countCompletedReferrals(referrals : List.List<RT.ReferralRecord>, userId : Text) : Nat {
    referrals.foldLeft(0, func(acc : Nat, r : RT.ReferralRecord) : Nat {
      if (r.referrerId.toText() == userId and r.status == #completed) acc + 1
      else acc
    })
  };

  /// Activate a milestone for a user. Returns false if already claimed or insufficient invites.
  public func activateMilestone(
    milestoneClaims : List.List<T.MilestoneClaim>,
    referrals : List.List<RT.ReferralRecord>,
    userId : Text,
    milestoneId : T.MilestoneId,
    nowNs : Int,
  ) : Bool {
    let defOpt = MILESTONES.find(func(m : MilestoneDef) : Bool { m.milestoneId == milestoneId });
    let def = switch defOpt {
      case null { return false };
      case (?d) d;
    };
    let alreadyClaimed = milestoneClaims.find(func(c : T.MilestoneClaim) : Bool {
      c.userId == userId and c.milestoneId == milestoneId
    });
    switch alreadyClaimed {
      case (?_) { return false };
      case null {};
    };
    let completedCount = countCompletedReferrals(referrals, userId);
    if (completedCount < def.inviteThreshold) { return false };
    let claim : T.MilestoneClaim = {
      userId;
      milestoneId;
      activatedAt = nowNs;
      expiresAt = nowNs + def.durationNs;
    };
    milestoneClaims.add(claim);
    true;
  };

  /// Return full milestone status list for a user.
  public func getMilestoneStatus(
    milestoneClaims : List.List<T.MilestoneClaim>,
    referrals : List.List<RT.ReferralRecord>,
    userId : Text,
    nowNs : Int,
  ) : [T.MilestoneInfo] {
    let completedCount = countCompletedReferrals(referrals, userId);
    MILESTONES.map(func(def : MilestoneDef) : T.MilestoneInfo {
      let claimOpt = milestoneClaims.find(func(c : T.MilestoneClaim) : Bool {
        c.userId == userId and c.milestoneId == def.milestoneId
      });
      let (status, activatedAt, expiresAt) : (T.MilestoneStatus, ?Int, ?Int) = switch claimOpt {
        case (?claim) (#claimed, ?claim.activatedAt, ?claim.expiresAt);
        case null {
          if (completedCount >= def.inviteThreshold) (#unlocked, null, null)
          else (#locked, null, null)
        };
      };
      {
        milestoneId = def.milestoneId;
        title = def.title;
        description = def.description;
        inviteThreshold = def.inviteThreshold;
        status;
        currentInvites = completedCount;
        activatedAt;
        expiresAt;
      };
    });
  };

  // ── Audit Lead Form ────────────────────────────────────────────────────────

  /// Save an audit lead submission and simulate WhatsApp send.
  public func submitAuditLead(
    auditLeads : List.List<T.AuditLead>,
    counters : T.ViralLoopCounters,
    leadName : Text,
    phone : Text,
    salonType : Text,
    budgetRange : Text,
    nowNs : Int,
  ) : T.AuditLead {
    if (leadName == "") Runtime.trap("leadName is required");
    if (phone == "") Runtime.trap("phone is required");
    if (salonType == "") Runtime.trap("salonType is required");
    if (budgetRange == "") Runtime.trap("budgetRange is required");

    let id = counters.nextAuditLeadId;
    counters.nextAuditLeadId += 1;

    let lead : T.AuditLead = {
      id;
      leadName;
      phone;
      salonType;
      budgetRange;
      niche = "salons";
      city = "mumbai";
      submittedAt = nowNs;
      whatsappSentAt = ?nowNs;
    };
    auditLeads.add(lead);
    lead;
  };

  /// Return all audit lead submissions sorted by submittedAt desc.
  public func listAuditLeads(auditLeads : List.List<T.AuditLead>) : [T.AuditLead] {
    let arr = auditLeads.toArray();
    arr.sort(func(a : T.AuditLead, b : T.AuditLead) : Order.Order {
      Int.compare(b.submittedAt, a.submittedAt)
    });
  };

  // ── Niche Funnel Events ────────────────────────────────────────────────────

  func eventTypeToText(et : T.NicheFunnelEventType) : Text {
    switch et {
      case (#landing_view) "landing_view";
      case (#form_submit) "form_submit";
      case (#whatsapp_sent) "whatsapp_sent";
      case (#whatsapp_click) "whatsapp_click";
      case (#audit_sent) "audit_sent";
      case (#call_booked) "call_booked";
      case (#share_clicked) "share_clicked";
    }
  };

  /// Record a niche funnel event.
  public func recordNicheFunnelEvent(
    nicheFunnelEvents : List.List<T.NicheFunnelEvent>,
    counters : T.ViralLoopCounters,
    userId : Text,
    eventType : T.NicheFunnelEventType,
    niche : Text,
    city : Text,
    metricValue : ?Nat,
    nowNs : Int,
  ) : () {
    let id = counters.nextNicheFunnelEventId;
    counters.nextNicheFunnelEventId += 1;
    let event : T.NicheFunnelEvent = {
      id;
      userId;
      eventType;
      niche;
      city;
      metricValue;
      timestamp = nowNs;
    };
    nicheFunnelEvents.add(event);
  };

  /// Aggregate event counts per type for a given niche+city funnel.
  public func getNicheFunnelMetrics(
    nicheFunnelEvents : List.List<T.NicheFunnelEvent>,
    niche : Text,
    city : Text,
  ) : T.NicheFunnelMetrics {
    let allTypes : [T.NicheFunnelEventType] = [
      #landing_view, #form_submit, #whatsapp_sent, #whatsapp_click,
      #audit_sent, #call_booked, #share_clicked,
    ];
    let counts : [(Text, Nat)] = allTypes.map<T.NicheFunnelEventType, (Text, Nat)>(func(et : T.NicheFunnelEventType) : (Text, Nat) {
      let typeName = eventTypeToText(et);
      let count = nicheFunnelEvents.foldLeft(0, func(acc : Nat, e : T.NicheFunnelEvent) : Nat {
        if (e.niche == niche and e.city == city and e.eventType == et) acc + 1
        else acc
      });
      (typeName, count);
    });
    { niche; city; counts };
  };

  // ── Shareable Win ──────────────────────────────────────────────────────────

  func timestampToDate(nowNs : Int) : Text {
    let epochDays = Int.abs(nowNs) / 86_400_000_000_000;
    let y400 : Nat = 146097;
    let y100 : Nat = 36524;
    let y4 : Nat = 1461;
    let y1 : Nat = 365;
    var n = epochDays;
    let z = n / y400;
    n := n - z * y400;
    let a = Nat.min(n / y100, 3);
    n := n - a * y100;
    let b = n / y4;
    n := n - b * y4;
    let c = Nat.min(n / y1, 3);
    n := n - c * y1;
    let year = 400 * z + 100 * a + 4 * b + c + 1;
    let leapYear = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
    let monthDays : [Nat] = if leapYear
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    else
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month = 1;
    var remaining = n;
    for (days in monthDays.values()) {
      if (remaining >= days and month < 12) {
        remaining -= days;
        month += 1;
      };
    };
    let day = remaining + 1;
    let pad2 = func(v : Nat) : Text {
      if (v < 10) "0" # v.toText() else v.toText()
    };
    year.toText() # "-" # pad2(month) # "-" # pad2(day);
  };

  /// Compute the best shareable win for a user based on their activity.
  public func generateShareableWin(
    challengeRecords : Map.Map<Text, T.WeeklyChallengeRecord>,
    userId : Text,
    displayName : Text,
    city : Text,
    isoWeek : Text,
    currentStreak : Nat,
    nowNs : Int,
  ) : T.ShareableWin {
    let key = challengeKey(userId, isoWeek);
    let leadsGenerated = switch (challengeRecords.get(key)) {
      case (?rec) rec.leadsGenerated;
      case null 0;
    };
    let date = timestampToDate(nowNs);
    if (leadsGenerated >= 10) {
      { winType = #leads; metricValue = leadsGenerated; displayName; city; date };
    } else if (currentStreak >= 7) {
      { winType = #streak; metricValue = currentStreak; displayName; city; date };
    } else {
      let dealValues : [Nat] = [15_000, 25_000, 50_000];
      let pick = (leadsGenerated + currentStreak) % 3;
      { winType = #deal; metricValue = dealValues[pick]; displayName; city; date };
    };
  };
};
