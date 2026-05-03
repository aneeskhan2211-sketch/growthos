import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Float "mo:core/Float";
import T "../types/retention-notifications";
import CT "../types/compliance-and-ingestion";

module {

  // ── Default frequency settings ────────────────────────────────────────────

  let defaultFrequency : T.FrequencySettings = {
    maxPerDay = 2;
    quietHoursStart = 21; // 9 PM UTC
    quietHoursEnd = 8;    // 8 AM UTC
    quietHoursEnabled = true;
    inactivityReductionEnabled = true;
  };

  let allTriggers : [T.TriggerType] = [
    #drip_day_0, #drip_day_1, #drip_day_2, #drip_day_3, #drip_day_4,
    #drip_day_5, #drip_day_6, #drip_day_7, #drip_day_8, #drip_day_9,
    #drip_day_10, #drip_day_11, #drip_day_12, #drip_day_13, #drip_day_14,
    #drip_day_15, #drip_day_16, #drip_day_17, #drip_day_18, #drip_day_19,
    #drip_day_20, #drip_day_21, #drip_day_22, #drip_day_23, #drip_day_24,
    #drip_day_25, #drip_day_26, #drip_day_27, #drip_day_28,
    #on_new_reply, #on_inactivity_24h, #on_inactivity_48h,
    #on_followup_due, #on_limit_reached, #on_streak_milestone,
  ];

  // ── Day-in-nanoseconds constant ────────────────────────────────────────────

  let dayNs : Int = 86_400_000_000_000;

  // ── Drip Copy Library ─────────────────────────────────────────────────────
  // 28-day schedule indexed by dayNumber (1-28)

  let dripMessages : [(Nat, Text, T.CopyType, T.WeekTheme, Nat)] = [
    // (dayNumber, message, copyType, weekTheme, weekNumber)
    // Week 1 — Activation
    (1,  "Your first leads are ready. Contact 5 to start.", #urgency, #activation, 1),
    (2,  "Quick follow-up tip: message yesterday's leads.", #urgency, #activation, 1),
    (3,  "Replies come faster when you respond early.", #urgency, #activation, 1),
    (4,  "Send 5 messages now. It takes less than 5 minutes.", #urgency, #activation, 1),
    (5,  "You are getting started. Keep the streak going.", #reward, #activation, 1),
    (6,  "Follow up with 3 leads today.", #urgency, #activation, 1),
    (7,  "Week 1 complete. Continue building momentum.", #reward, #activation, 1),
    // Week 2 — Habit Building
    (8,  "Contact 5 leads each day.", #urgency, #habit_building, 2),
    (9,  "Check replies and respond quickly.", #fomo, #habit_building, 2),
    (10, "Try one simple offer this week.", #money_visibility, #habit_building, 2),
    (11, "Keep your daily routine consistent.", #reward, #habit_building, 2),
    (12, "Contact 5 leads each day.", #urgency, #habit_building, 2),
    (13, "Check replies and respond quickly.", #fomo, #habit_building, 2),
    (14, "Keep your daily routine consistent.", #reward, #habit_building, 2),
    // Week 3 — Conversion Focus
    (15, "Turn replies into bookings—follow up today.", #money_visibility, #conversion, 3),
    (16, "Share a simple plan with interested leads.", #urgency, #conversion, 3),
    (17, "Close conversations by suggesting next steps.", #urgency, #conversion, 3),
    (18, "Check your pending replies now.", #fomo, #conversion, 3),
    (19, "Turn replies into bookings—follow up today.", #money_visibility, #conversion, 3),
    (20, "Share a simple plan with interested leads.", #urgency, #conversion, 3),
    (21, "Close conversations by suggesting next steps.", #urgency, #conversion, 3),
    // Week 4 — Scale + Upgrade
    (22, "Automate follow-ups to save time.", #money_visibility, #scale_upgrade, 4),
    (23, "Increase daily outreach to scale enquiries.", #fomo, #scale_upgrade, 4),
    (24, "Review your results and improve offers.", #reward, #scale_upgrade, 4),
    (25, "Continue the routine for steady growth.", #reward, #scale_upgrade, 4),
    (26, "Automate follow-ups to save time.", #money_visibility, #scale_upgrade, 4),
    (27, "Increase daily outreach to scale enquiries.", #fomo, #scale_upgrade, 4),
    (28, "Continue the routine for steady growth.", #reward, #scale_upgrade, 4),
  ];

  // ── Get drip message for a given onboarding day ───────────────────────────

  public func getDripMessage(onboardingDay : Nat) : ?T.DripSequenceDay {
    let found = dripMessages.find(func(entry : (Nat, Text, T.CopyType, T.WeekTheme, Nat)) : Bool {
      entry.0 == onboardingDay
    });
    switch (found) {
      case null { null };
      case (?(day, msg, copyType, theme, week)) {
        ?{
          dayNumber = day;
          weekNumber = week;
          weekTheme = theme;
          message = msg;
          copyType;
          personalizationTokens = ["{niche}", "{city}"];
        };
      };
    };
  };

  // ── Trigger-based templates ───────────────────────────────────────────────

  public func getTriggerTemplate(triggerType : T.TriggerType) : ?T.NotificationTemplate {
    let (id, copyType, message, tokens) : (Text, T.CopyType, Text, [Text]) = switch (triggerType) {
      case (#on_new_reply) {
        ("tpl_new_reply", #urgency, "New reply received. Respond now.", []);
      };
      case (#on_inactivity_24h) {
        ("tpl_inactive_24h", #fomo, "Leads are waiting. Take 5 minutes to act.", ["{pendingLeads}"]);
      };
      case (#on_inactivity_48h) {
        ("tpl_inactive_48h", #fomo, "12 high-quality leads are waiting. Do not miss today.", []);
      };
      case (#on_followup_due) {
        ("tpl_followup_due", #urgency, "Follow-up pending. A quick message can help.", []);
      };
      case (#on_limit_reached) {
        ("tpl_limit_reached", #money_visibility, "Upgrade to remove limits and continue outreach.", []);
      };
      case (#on_streak_milestone) {
        ("tpl_streak_milestone", #reward, "You are on a {streak}-day streak. Keep going.", ["{streak}"]);
      };
      case (_) { return null };
    };
    ?{
      id;
      copyType;
      message;
      personalizationTokens = tokens;
      triggerType;
      weekNumber = 0;
      dayNumber = 0;
    };
  };

  // ── FOMO / Urgency / Reward / Money Visibility templates ──────────────────

  public func getFomoCopyTemplates() : [Text] {
    [
      "Leads active in your area right now.",
      "{pendingLeads} prospects checked messages today.",
    ];
  };

  public func getUrgencyCopyTemplates() : [Text] {
    [
      "Reply now—fast responses convert better.",
      "Follow up today to increase chances.",
    ];
  };

  public func getRewardCopyTemplates() : [Text] {
    [
      "Nice—keep going. You are close to your first booking.",
      "Good progress. Consistency builds enquiries.",
    ];
  };

  public func getMoneyVisibilityCopyTemplates() : [Text] {
    [
      "These leads could convert if contacted today.",
      "Follow-ups often turn into bookings.",
    ];
  };

  // ── WhatsApp drip sequence (opt-in only) ──────────────────────────────────

  public func getWhatsAppSequence() : [T.WhatsAppMessage] {
    let stopConditions : [T.WhatsAppStopCondition] = [
      #user_replied,
      #user_opted_out,
      #sequence_completed,
    ];
    [
      { dayNumber = 0; message = "Hi your leads are ready. Start with 5 messages today."; stopConditions },
      { dayNumber = 1; message = "Tip: reply quickly—first responses convert better."; stopConditions },
      { dayNumber = 2; message = "Follow up with yesterday's leads. It often works."; stopConditions },
      { dayNumber = 3; message = "Want a simple growth plan for your business?"; stopConditions },
      { dayNumber = 5; message = "Keep going. Consistent action builds enquiries."; stopConditions },
      { dayNumber = 7; message = "Check your replies and suggest next steps."; stopConditions },
    ];
  };

  // ── Quiet hours check ─────────────────────────────────────────────────────
  // Returns true if the current time (UTC hour derived from nanoseconds) falls
  // within the quiet window [quietHoursStart, 23] ∪ [0, quietHoursEnd).

  public func isInQuietHours(settings : T.FrequencySettings) : Bool {
    if (not settings.quietHoursEnabled) return false;
    let nowNs : Int = Time.now();
    // Seconds since epoch → hour of day (UTC)
    let secondsSinceEpoch : Int = nowNs / 1_000_000_000;
    let hourOfDay : Nat = ((secondsSinceEpoch / 3600) % 24).toNat();
    let start = settings.quietHoursStart;
    let end_  = settings.quietHoursEnd;
    if (start > end_) {
      // Window wraps midnight: [start..23] or [0..end)
      hourOfDay >= start or hourOfDay < end_
    } else {
      hourOfDay >= start and hourOfDay < end_
    };
  };

  // ── Frequency cap check ───────────────────────────────────────────────────
  // Returns true when it is safe to send a notification to the user.

  public func canSendNotification(
    prefsMap : Map.Map<Text, T.UserNotificationPrefs>,
    retentionLastSessionMap : Map.Map<Text, Int>,
    userId : Text,
  ) : Bool {
    let prefs = getUserNotificationPrefs(prefsMap, userId);

    // Quiet hours gate
    if (isInQuietHours(prefs.frequencySettings)) return false;

    // WhatsApp-style daily cap (also covers in-app)
    let maxPerDay : Nat = if (prefs.frequencySettings.inactivityReductionEnabled) {
      // Check inactivity: look up last session time
      switch (retentionLastSessionMap.get(userId)) {
        case null { prefs.frequencySettings.maxPerDay };
        case (?lastSession) {
          let elapsed : Int = Time.now() - lastSession;
          if (elapsed > 7 * dayNs) 1 else prefs.frequencySettings.maxPerDay;
        };
      };
    } else {
      prefs.frequencySettings.maxPerDay;
    };

    prefs.notificationsSentToday < maxPerDay;
  };

  // ── Personalization ───────────────────────────────────────────────────────

  public func personalizeMessage(
    message : Text,
    niche : Text,
    city : Text,
    pendingLeads : Nat,
    streak : Nat,
    possibleRevenue : Text,
  ) : Text {
    let m1 = message.replace(#text "{niche}", niche);
    let m2 = m1.replace(#text "{city}", city);
    let m3 = m2.replace(#text "{pendingLeads}", pendingLeads.toText());
    let m4 = m3.replace(#text "{streak}", streak.toText());
    m4.replace(#text "{possibleRevenue}", possibleRevenue);
  };

  // ── Notification preferences ──────────────────────────────────────────────

  public func getUserNotificationPrefs(
    prefsMap : Map.Map<Text, T.UserNotificationPrefs>,
    userId : Text,
  ) : T.UserNotificationPrefs {
    switch (prefsMap.get(userId)) {
      case (?prefs) { prefs };
      case null {
        {
          userId;
          frequencySettings = defaultFrequency;
          enabledTriggers = allTriggers;
          whatsappOptIn = false;
          whatsappConsentDate = null;
          whatsappOptOutDate = null;
          lastNotificationDate = null;
          notificationsSentToday = 0;
        };
      };
    };
  };

  public func setUserNotificationPrefs(
    prefsMap : Map.Map<Text, T.UserNotificationPrefs>,
    userId : Text,
    frequencySettings : T.FrequencySettings,
    enabledTriggers : [T.TriggerType],
  ) {
    let existing = getUserNotificationPrefs(prefsMap, userId);
    prefsMap.add(userId, {
      existing with
      frequencySettings;
      enabledTriggers;
    });
  };

  // ── WhatsApp consent ──────────────────────────────────────────────────────

  public func setWhatsAppConsent(
    prefsMap : Map.Map<Text, T.UserNotificationPrefs>,
    consentLogs : List.List<CT.ConsentLog>,
    counters : { var nextConsentLogId : Nat },
    userId : Text,
    phone : Text,
    optIn : Bool,
  ) {
    let now = Time.now();
    let existing = getUserNotificationPrefs(prefsMap, userId);

    // Log consent to ConsentLog system
    let logEntry : CT.ConsentLog = {
      id = counters.nextConsentLogId;
      timestamp = now;
      phone;
      email = "";
      consentType = #form_submission;
      status = if (optIn) #granted else #withdrawn;
      messageTemplate = "whatsapp_retention_sequence";
      userId;
      notes = if (optIn) "WhatsApp retention opt-in" else "WhatsApp retention opt-out";
    };
    counters.nextConsentLogId += 1;
    consentLogs.add(logEntry);

    // Update prefs
    let updated : T.UserNotificationPrefs = if (optIn) {
      { existing with whatsappOptIn = true; whatsappConsentDate = ?now; whatsappOptOutDate = null };
    } else {
      { existing with whatsappOptIn = false; whatsappOptOutDate = ?now };
    };
    prefsMap.add(userId, updated);
  };

  // ── Record notification sent ──────────────────────────────────────────────

  public func recordNotificationSent(
    notificationEvents : List.List<T.NotificationEvent>,
    prefsMap : Map.Map<Text, T.UserNotificationPrefs>,
    counters : T.RetentionNotificationCounters,
    userId : Text,
    templateId : Text,
    triggerType : T.TriggerType,
    copyType : T.CopyType,
  ) : Nat {
    let id = counters.nextNotificationEventId;
    counters.nextNotificationEventId += 1;
    let event : T.NotificationEvent = {
      id;
      userId;
      templateId;
      sentAt = Time.now();
      openedAt = null;
      actionCompletedAt = null;
      triggerType;
      copyType;
    };
    notificationEvents.add(event);

    // Increment daily counter in prefs
    let prefs = getUserNotificationPrefs(prefsMap, userId);
    prefsMap.add(userId, {
      prefs with
      notificationsSentToday = prefs.notificationsSentToday + 1;
      lastNotificationDate = ?Time.now();
    });
    id;
  };

  // ── Record notification opened ────────────────────────────────────────────

  public func recordNotificationOpened(
    notificationEvents : List.List<T.NotificationEvent>,
    userId : Text,
    notificationId : Nat,
  ) : Bool {
    let idx = notificationEvents.findIndex(func(e : T.NotificationEvent) : Bool {
      e.id == notificationId and e.userId == userId
    });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = notificationEvents.at(i);
        notificationEvents.put(i, { existing with openedAt = ?Time.now() });
        true;
      };
    };
  };

  // ── Record action completed ───────────────────────────────────────────────

  public func recordActionCompleted(
    notificationEvents : List.List<T.NotificationEvent>,
    userId : Text,
    notificationId : Nat,
  ) : Bool {
    let idx = notificationEvents.findIndex(func(e : T.NotificationEvent) : Bool {
      e.id == notificationId and e.userId == userId
    });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = notificationEvents.at(i);
        notificationEvents.put(i, { existing with actionCompletedAt = ?Time.now() });
        true;
      };
    };
  };

  // ── Retention analytics aggregation ──────────────────────────────────────

  public func getRetentionAnalytics(
    notificationEvents : List.List<T.NotificationEvent>,
  ) : T.RetentionAnalytics {
    let total = notificationEvents.size();
    let opened = notificationEvents.filter(func(e : T.NotificationEvent) : Bool {
      e.openedAt != null
    }).size();
    let acted = notificationEvents.filter(func(e : T.NotificationEvent) : Bool {
      e.actionCompletedAt != null
    }).size();

    let safeDiv = func(num : Nat, den : Nat) : Float {
      if (den == 0) 0.0
      else Float.div(num.toFloat(), den.toFloat()) * 100.0;
    };

    let openRate = safeDiv(opened, total);
    let returnRate = safeDiv(opened, total);
    let conversionRate = safeDiv(acted, total);

    // Aggregate by trigger type
    let triggerTypes : [T.TriggerType] = [
      #on_new_reply, #on_inactivity_24h, #on_inactivity_48h,
      #on_followup_due, #on_limit_reached, #on_streak_milestone,
      #drip_day_1, #drip_day_7, #drip_day_14, #drip_day_28,
    ];
    let byTriggerType : [T.TriggerStats] = triggerTypes.map<T.TriggerType, T.TriggerStats>(
      func(tt) {
        let evts = notificationEvents.filter(func(e : T.NotificationEvent) : Bool { e.triggerType == tt });
        let c = evts.size();
        let o = evts.filter(func(e : T.NotificationEvent) : Bool { e.openedAt != null }).size();
        let a = evts.filter(func(e : T.NotificationEvent) : Bool { e.actionCompletedAt != null }).size();
        { triggerType = tt; count = c; openCount = o; actionCount = a; openRate = safeDiv(o, c); actionRate = safeDiv(a, c) };
      }
    );

    // Aggregate by copy type
    let copyTypes : [T.CopyType] = [#fomo, #urgency, #reward, #money_visibility];
    let byCopyType : [T.CopyTypeStats] = copyTypes.map<T.CopyType, T.CopyTypeStats>(
      func(ct) {
        let evts = notificationEvents.filter(func(e : T.NotificationEvent) : Bool { e.copyType == ct });
        let c = evts.size();
        let o = evts.filter(func(e : T.NotificationEvent) : Bool { e.openedAt != null }).size();
        let a = evts.filter(func(e : T.NotificationEvent) : Bool { e.actionCompletedAt != null }).size();
        { copyType = ct; count = c; openCount = o; actionCount = a; openRate = safeDiv(o, c); actionRate = safeDiv(a, c) };
      }
    );

    // Cohort by day (days 1-7 for week 1 summary)
    let cohortByDay : [T.CohortDayStats] = [1, 2, 3, 4, 5, 6, 7].map<Nat, T.CohortDayStats>(
      func(d) {
        let dayUsers = notificationEvents.filter(func(e : T.NotificationEvent) : Bool {
          e.triggerType == #drip_day_1 and d == 1 or
          e.triggerType == #drip_day_2 and d == 2 or
          e.triggerType == #drip_day_3 and d == 3 or
          e.triggerType == #drip_day_4 and d == 4 or
          e.triggerType == #drip_day_5 and d == 5 or
          e.triggerType == #drip_day_6 and d == 6 or
          e.triggerType == #drip_day_7 and d == 7
        }).size();
        let returned = notificationEvents.filter(func(e : T.NotificationEvent) : Bool {
          e.openedAt != null and (
            e.triggerType == #drip_day_1 and d == 1 or
            e.triggerType == #drip_day_2 and d == 2 or
            e.triggerType == #drip_day_3 and d == 3 or
            e.triggerType == #drip_day_4 and d == 4 or
            e.triggerType == #drip_day_5 and d == 5 or
            e.triggerType == #drip_day_6 and d == 6 or
            e.triggerType == #drip_day_7 and d == 7
          )
        }).size();
        { day = d; usersNotified = dayUsers; returnedCount = returned };
      }
    );

    {
      totalNotificationsSent = total;
      totalOpened = opened;
      totalActionsCompleted = acted;
      openRate;
      returnRate;
      conversionRate;
      byTriggerType;
      byCopyType;
      cohortByDay;
    };
  };
};
