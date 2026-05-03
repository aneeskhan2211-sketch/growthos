
module {
  // ── Stripe / Payments ────────────────────────────────────────────────────────
  // ── Razorpay ─────────────────────────────────────────────────────────────────

  /// Razorpay plan definitions — amounts in paise (₹1 = 100 paise)
  public type RazorpayPlan = {
    id          : Text;   // e.g. "rzp_starter"
    name        : Text;
    amountPaise : Nat;    // in paise
    currency    : Text;   // "INR"
  };

  /// Razorpay order returned after POST /v1/orders
  public type RazorpayOrder = {
    orderId  : Text;
    amount   : Nat;
    currency : Text;
    receipt  : Text;
  };

  /// Razorpay payment details supplied by the frontend after checkout
  public type RazorpayPayment = {
    paymentId : Text;
    orderId   : Text;
    signature : Text;
    planId    : Text;
  };

  /// Webhook event from Razorpay
  public type RazorpayWebhookEvent = {
    event     : Text;
    paymentId : Text;
    orderId   : Text;
    userId    : Text;
  };


  /// Stripe plan definitions — amounts in paise (1 INR = 100 paise)
  public type StripePlan = {
    id       : Text;   // e.g. "price_starter"
    name     : Text;
    amount   : Nat;    // in paise
    currency : Text;   // "inr"
    interval : Text;   // "month" | "year"
  };

  public type CheckoutSession = {
    sessionId : Text;
    url       : Text;
  };

  public type SubscriptionStatus = {
    tier             : Text;
    status           : Text;   // "active" | "cancelled" | "trialing" | "none"
    currentPeriodEnd : ?Int;   // Unix timestamp nanoseconds
  };

  /// Persisted per-user subscription record (updated via webhook).
  public type UserPaymentRecord = {
    userId           : Principal;
    stripeCustomerId : ?Text;
    planId           : Text;
    tier             : Text;
    status           : Text;
    currentPeriodEnd : ?Int;
    cancelledAt      : ?Int;
    cancelReason     : ?Text;
    createdAt        : Int;
    updatedAt        : Int;
  };

  // ── In-App Notifications ─────────────────────────────────────────────────────

  public type NotificationRecord = {
    id        : Text;
    userId    : Text;
    title     : Text;
    body      : Text;
    type_     : Text;   // NotificationType as text key
    isRead    : Bool;
    createdAt : Int;
    actionUrl : ?Text;
    metadata  : ?Text;
  };

  /// Valid notification type keys.
  public type NotificationType = {
    #new_lead;
    #new_reply;
    #follow_up_due;
    #upgrade_prompt;
    #system_alert;
    #weekly_report;
    #limit_reached;
    #milestone_unlocked;
    #case_study_ready;
    #competitor_alert;
  };

  public type NotificationCounters = {
    var nextNotificationId : Nat;
  };

  // ── WhatsApp / WATI ──────────────────────────────────────────────────────────

  /// WATI integration config stored per-canister (admin-managed).
  public type WatiConfig = {
    apiKey          : Text;
    baseUrl         : Text;
    businessPhoneId : Text;
  };

  /// Per-user WhatsApp opt-in consent record.
  public type WatiConsent = {
    userId       : Text;
    phone        : Text;
    consentGiven : Bool;
    consentAt    : Int;
    optOutAt     : ?Int;
  };

  /// Record of every template message sent via WATI.
  public type WatiMessage = {
    id           : Text;
    userId       : Text;
    phone        : Text;
    templateName : Text;
    params       : [Text];
    sentAt       : Int;
    status       : Text;   // "sent" | "failed" | "queued"
  };

  public type WatiCounters = {
    var nextWatiMessageId : Nat;
  };
};
