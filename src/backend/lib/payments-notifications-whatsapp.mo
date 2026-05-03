import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import T "../types/payments-notifications-whatsapp";

module {
  // ─────────────────────────────────────────────────────────────────────────────
  // Stripe plans catalogue — amounts in paise (INR × 100)
  // ─────────────────────────────────────────────────────────────────────────────

  public let plans : [T.StripePlan] = [
    { id = "price_starter"; name = "Starter"; amount = 4_900;   currency = "inr"; interval = "month" },
    { id = "price_growth";  name = "Growth";  amount = 29_900;  currency = "inr"; interval = "month" },
    { id = "price_pro";     name = "Pro";     amount = 99_900;  currency = "inr"; interval = "month" },
    { id = "price_agency";  name = "Agency";  amount = 499_900; currency = "inr"; interval = "month" },
  ];
  // ─────────────────────────────────────────────────────────────────────────────
  // Razorpay plans catalogue — amounts in paise (INR × 100)
  // ─────────────────────────────────────────────────────────────────────────────

  public let razorpayPlans : [T.RazorpayPlan] = [
    { id = "rzp_starter"; name = "Starter"; amountPaise = 4_900;   currency = "INR" },
    { id = "rzp_growth";  name = "Growth";  amountPaise = 29_900;  currency = "INR" },
    { id = "rzp_pro";     name = "Pro";     amountPaise = 99_900;  currency = "INR" },
    { id = "rzp_agency";  name = "Agency";  amountPaise = 499_900; currency = "INR" },
  ];

  /// Map a Razorpay plan ID to a tier text label.
  public func razorpayPlanIdToTierText(planId : Text) : Text {
    switch planId {
      case "rzp_starter" "Starter";
      case "rzp_growth"  "Growth";
      case "rzp_pro"     "Pro";
      case "rzp_agency"  "Agency";
      case _             "Free";
    };
  };


  /// Map a Stripe plan ID to a plan tier text label.
  public func planIdToTierText(planId : Text) : Text {
    switch planId {
      case "price_starter" "Starter";
      case "price_growth"  "Growth";
      case "price_pro"     "Pro";
      case "price_agency"  "Agency";
      case _               "Free";
    };
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Payment record helpers
  // ─────────────────────────────────────────────────────────────────────────────

  /// Upsert a payment record for a user after a successful Stripe webhook event.
  public func upsertPaymentRecord(
    paymentRecords   : Map.Map<Principal, T.UserPaymentRecord>,
    userId           : Principal,
    stripeCustomerId : ?Text,
    planId           : Text,
    periodEnd        : ?Int,
    status           : Text,
  ) {
    let now = Time.now();
    let tier = planIdToTierText(planId);
    let existing = paymentRecords.get(userId);
    let record : T.UserPaymentRecord = {
      userId;
      stripeCustomerId = switch (existing) {
        case (?r) switch (stripeCustomerId) { case (?sid) ?sid; case null r.stripeCustomerId };
        case null stripeCustomerId;
      };
      planId;
      tier;
      status;
      currentPeriodEnd = periodEnd;
      cancelledAt = null;
      cancelReason = null;
      createdAt = switch (existing) { case (?r) r.createdAt; case null now };
      updatedAt = now;
    };
    paymentRecords.add(userId, record);
  };

  /// Mark a subscription as cancelled.
  public func cancelPaymentRecord(
    paymentRecords : Map.Map<Principal, T.UserPaymentRecord>,
    userId         : Principal,
    reason         : Text,
  ) {
    let now = Time.now();
    switch (paymentRecords.get(userId)) {
      case null {};
      case (?r) {
        paymentRecords.add(userId, { r with
          status      = "cancelled";
          cancelledAt = ?now;
          cancelReason = ?reason;
          updatedAt   = now;
        });
      };
    };
  };

  /// Return subscription status for a caller.
  public func getSubscriptionStatus(
    paymentRecords : Map.Map<Principal, T.UserPaymentRecord>,
    userId         : Principal,
  ) : T.SubscriptionStatus {
    switch (paymentRecords.get(userId)) {
      case null { { tier = "Free"; status = "none"; currentPeriodEnd = null } };
      case (?r) { { tier = r.tier; status = r.status; currentPeriodEnd = r.currentPeriodEnd } };
    };
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // In-App Notifications
  // ─────────────────────────────────────────────────────────────────────────────

  /// Generate a unique notification ID.
  func nextNotifId(counters : T.NotificationCounters) : Text {
    let id = counters.nextNotificationId;
    counters.nextNotificationId += 1;
    "notif_" # id.toText();
  };

  /// Create and store a new notification for a user.
  public func createNotification(
    notifications : List.List<T.NotificationRecord>,
    counters      : T.NotificationCounters,
    userId        : Text,
    title         : Text,
    body          : Text,
    type_         : Text,
    actionUrl     : ?Text,
  ) : Text {
    let id = nextNotifId(counters);
    let record : T.NotificationRecord = {
      id;
      userId;
      title;
      body;
      type_;
      isRead    = false;
      createdAt = Time.now();
      actionUrl;
      metadata  = null;
    };
    notifications.add(record);
    id;
  };

  /// Return notifications for a user, newest first, with optional unread filter.
  public func listNotifications(
    notifications : List.List<T.NotificationRecord>,
    userId        : Text,
    limit         : Nat,
    onlyUnread    : Bool,
  ) : [T.NotificationRecord] {
    let filtered = notifications
      .filter(func(n : T.NotificationRecord) : Bool {
        n.userId == userId and (not onlyUnread or not n.isRead)
      })
      .toArray();
    // reverse to get newest-first
    let rev = filtered.reverse();
    if (limit == 0 or rev.size() <= limit) {
      rev;
    } else {
      rev.sliceToArray(0, limit.toInt());
    };
  };

  /// Mark one notification as read. Returns #ok id or #err message.
  public func markRead(
    notifications    : List.List<T.NotificationRecord>,
    userId           : Text,
    notificationId   : Text,
  ) : { #ok : Text; #err : Text } {
    var found = false;
    notifications.mapInPlace(func(n : T.NotificationRecord) : T.NotificationRecord {
      if (n.id == notificationId and n.userId == userId) {
        found := true;
        { n with isRead = true };
      } else n;
    });
    if found #ok notificationId else #err "Notification not found";
  };

  /// Mark all notifications for a user as read.
  public func markAllRead(
    notifications : List.List<T.NotificationRecord>,
    userId        : Text,
  ) {
    notifications.mapInPlace(func(n : T.NotificationRecord) : T.NotificationRecord {
      if (n.userId == userId) { { n with isRead = true } } else n;
    });
  };

  /// Count unread notifications for a user.
  public func getUnreadCount(
    notifications : List.List<T.NotificationRecord>,
    userId        : Text,
  ) : Nat {
    notifications
      .filter(func(n : T.NotificationRecord) : Bool { n.userId == userId and not n.isRead })
      .size();
  };

  /// Delete a single notification. Returns #ok id or #err message.
  public func deleteNotification(
    notifications  : List.List<T.NotificationRecord>,
    userId         : Text,
    notificationId : Text,
  ) : { #ok : Text; #err : Text } {
    let before = notifications.size();
    let remaining = notifications.filter(
      func(n : T.NotificationRecord) : Bool {
        not (n.id == notificationId and n.userId == userId)
      }
    );
    notifications.clear();
    notifications.append(remaining);
    if (notifications.size() < before) #ok notificationId
    else #err "Notification not found";
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // System notification triggers
  // ─────────────────────────────────────────────────────────────────────────────

  /// Auto-generate system notifications for all users based on activity signals.
  /// Returns the number of notifications created.
  /// Heuristics:
  ///   - inactivity_48h  → if user has no notification in last 48h AND last notification is not inactivity type
  ///   - follow_up_due   → always create a daily follow_up_due reminder
  ///   - weekly_summary  → create on Monday (every 7th call cycle approximation)
  ///
  /// In this canister model we trigger for the caller only.
  public func triggerSystemNotifications(
    notifications : List.List<T.NotificationRecord>,
    counters      : T.NotificationCounters,
    userId        : Text,
  ) : Nat {
    let now = Time.now();
    let ns48h : Int = 48 * 3600 * 1_000_000_000;
    var created = 0;

    // Inactivity check: find the most recent notification for this user.
    let userNotifs = notifications.filter(
      func(n : T.NotificationRecord) : Bool { n.userId == userId }
    );
    let lastTs : Int = switch (userNotifs.last()) {
      case null 0;
      case (?n) n.createdAt;
    };

    if (now - lastTs >= ns48h) {
      ignore createNotification(
        notifications, counters, userId,
        "Leads are waiting",
        "You haven't been active in 48 hours. Check your pending leads and send a follow-up.",
        "system_alert", ?("/dashboard")
      );
      created += 1;
    };

    // Follow-up due reminder.
    let hasFollowUp = userNotifs.find(
      func(n : T.NotificationRecord) : Bool {
        n.type_ == "follow_up_due" and (now - n.createdAt) < 24 * 3600 * 1_000_000_000
      }
    );
    if (hasFollowUp == null) {
      ignore createNotification(
        notifications, counters, userId,
        "Follow-up pending",
        "A quick message to a pending lead can turn into a booking today.",
        "follow_up_due", ?("/dashboard/leads")
      );
      created += 1;
    };

    // Weekly summary (if no weekly_report in last 6 days).
    let ns6d : Int = 6 * 24 * 3600 * 1_000_000_000;
    let hasWeekly = userNotifs.find(
      func(n : T.NotificationRecord) : Bool {
        n.type_ == "weekly_report" and (now - n.createdAt) < ns6d
      }
    );
    if (hasWeekly == null) {
      ignore createNotification(
        notifications, counters, userId,
        "Your weekly growth summary is ready",
        "Review what worked this week and your top 3 actions for next week.",
        "weekly_report", ?("/dashboard")
      );
      created += 1;
    };

    created;
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // WATI config helpers
  // ─────────────────────────────────────────────────────────────────────────────

  public func saveWatiConfig(
    watiConfigStore : { var value : ?T.WatiConfig },
    apiKey          : Text,
    baseUrl         : Text,
    businessPhoneId : Text,
  ) {
    watiConfigStore.value := ?{ apiKey; baseUrl; businessPhoneId };
  };

  public func getWatiConfig(
    watiConfigStore : { var value : ?T.WatiConfig },
  ) : ?{ baseUrl : Text; businessPhoneId : Text } {
    switch (watiConfigStore.value) {
      case null null;
      case (?cfg) ?{ baseUrl = cfg.baseUrl; businessPhoneId = cfg.businessPhoneId };
    };
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // WATI consent helpers
  // ─────────────────────────────────────────────────────────────────────────────

  public func updateWatiConsent(
    watiConsents : Map.Map<Text, T.WatiConsent>,
    userId       : Text,
    phone        : Text,
    consentGiven : Bool,
  ) {
    let now = Time.now();
    let existing = watiConsents.get(userId);
    let record : T.WatiConsent = {
      userId;
      phone;
      consentGiven;
      consentAt = switch (existing) { case (?c) c.consentAt; case null now };
      optOutAt  = if (not consentGiven) ?now else null;
    };
    watiConsents.add(userId, record);
  };

  public func getWatiConsent(
    watiConsents : Map.Map<Text, T.WatiConsent>,
    userId       : Text,
  ) : ?T.WatiConsent {
    watiConsents.get(userId);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // WATI message log helpers
  // ─────────────────────────────────────────────────────────────────────────────

  /// Store a sent (or failed) WATI message record.
  public func logWatiMessage(
    watiMessages : List.List<T.WatiMessage>,
    counters     : T.WatiCounters,
    userId       : Text,
    phone        : Text,
    templateName : Text,
    params       : [Text],
    status       : Text,
  ) : Text {
    let id = "wati_" # counters.nextWatiMessageId.toText();
    counters.nextWatiMessageId += 1;
    watiMessages.add({
      id; userId; phone; templateName; params;
      sentAt = Time.now();
      status;
    });
    id;
  };

  public func listWatiMessages(
    watiMessages : List.List<T.WatiMessage>,
    userId       : Text,
    limit        : Nat,
  ) : [T.WatiMessage] {
    let all = watiMessages
      .filter(func(m : T.WatiMessage) : Bool { m.userId == userId })
      .toArray()
      .reverse();
    if (limit == 0 or all.size() <= limit) all
    else all.sliceToArray(0, limit.toInt());
  };
};
