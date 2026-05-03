module {
  // ── Copy Psychology Variants ───────────────────────────────────────────────

  public type CopyType = {
    #fomo;
    #urgency;
    #reward;
    #money_visibility;
  };

  // ── Trigger Types ──────────────────────────────────────────────────────────

  public type TriggerType = {
    #drip_day_0;
    #drip_day_1;
    #drip_day_2;
    #drip_day_3;
    #drip_day_4;
    #drip_day_5;
    #drip_day_6;
    #drip_day_7;
    #drip_day_8;
    #drip_day_9;
    #drip_day_10;
    #drip_day_11;
    #drip_day_12;
    #drip_day_13;
    #drip_day_14;
    #drip_day_15;
    #drip_day_16;
    #drip_day_17;
    #drip_day_18;
    #drip_day_19;
    #drip_day_20;
    #drip_day_21;
    #drip_day_22;
    #drip_day_23;
    #drip_day_24;
    #drip_day_25;
    #drip_day_26;
    #drip_day_27;
    #drip_day_28;
    #on_new_reply;
    #on_inactivity_24h;
    #on_inactivity_48h;
    #on_followup_due;
    #on_limit_reached;
    #on_streak_milestone;
  };

  // ── Week Themes ────────────────────────────────────────────────────────────

  public type WeekTheme = {
    #activation;
    #habit_building;
    #conversion;
    #scale_upgrade;
  };

  // ── Notification Template ──────────────────────────────────────────────────

  public type NotificationTemplate = {
    id : Text;
    copyType : CopyType;
    message : Text;
    personalizationTokens : [Text];
    triggerType : TriggerType;
    weekNumber : Nat;
    dayNumber : Nat;
  };

  // ── Notification Event (immutable record logged per send) ──────────────────

  public type NotificationEvent = {
    id : Nat;
    userId : Text;
    templateId : Text;
    sentAt : Int;
    openedAt : ?Int;
    actionCompletedAt : ?Int;
    triggerType : TriggerType;
    copyType : CopyType;
  };

  // ── Frequency Settings ─────────────────────────────────────────────────────

  public type FrequencySettings = {
    maxPerDay : Nat; // 1-3, default 2
    quietHoursStart : Nat; // 0-23, default 21 (9 PM)
    quietHoursEnd : Nat; // 0-23, default 8 (8 AM)
    quietHoursEnabled : Bool;
    inactivityReductionEnabled : Bool;
  };

  // ── User Notification Preferences ─────────────────────────────────────────

  public type UserNotificationPrefs = {
    userId : Text;
    frequencySettings : FrequencySettings;
    enabledTriggers : [TriggerType];
    whatsappOptIn : Bool;
    whatsappConsentDate : ?Int;
    whatsappOptOutDate : ?Int;
    lastNotificationDate : ?Int;
    notificationsSentToday : Nat;
  };

  // ── Drip Sequence Day ──────────────────────────────────────────────────────

  public type DripSequenceDay = {
    dayNumber : Nat; // 0-30
    weekNumber : Nat; // 1-4
    weekTheme : WeekTheme;
    message : Text;
    copyType : CopyType;
    personalizationTokens : [Text];
  };

  // ── WhatsApp Message ───────────────────────────────────────────────────────

  public type WhatsAppStopCondition = {
    #user_replied;
    #user_opted_out;
    #sequence_completed;
  };

  public type WhatsAppMessage = {
    dayNumber : Nat;
    message : Text;
    stopConditions : [WhatsAppStopCondition];
  };

  // ── Retention Analytics ────────────────────────────────────────────────────

  public type TriggerStats = {
    triggerType : TriggerType;
    count : Nat;
    openCount : Nat;
    actionCount : Nat;
    openRate : Float;
    actionRate : Float;
  };

  public type CopyTypeStats = {
    copyType : CopyType;
    count : Nat;
    openCount : Nat;
    actionCount : Nat;
    openRate : Float;
    actionRate : Float;
  };

  public type CohortDayStats = {
    day : Nat;
    usersNotified : Nat;
    returnedCount : Nat;
  };

  public type RetentionAnalytics = {
    totalNotificationsSent : Nat;
    totalOpened : Nat;
    totalActionsCompleted : Nat;
    openRate : Float;
    returnRate : Float;
    conversionRate : Float;
    byTriggerType : [TriggerStats];
    byCopyType : [CopyTypeStats];
    cohortByDay : [CohortDayStats];
  };

  // ── Counters ───────────────────────────────────────────────────────────────

  public type RetentionNotificationCounters = {
    var nextNotificationEventId : Nat;
  };
};
