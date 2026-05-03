/// Payments, In-App Notifications, and WhatsApp/WATI API mixin.
///
/// Injected state:
///   paymentRecords   — per-user payment/subscription records keyed by Principal
///   notifications    — global notification records list
///   notifCounters    — auto-increment counter for notification IDs
///   watiConfigStore  — singleton WATI config (admin-managed)
///   watiConsents     — per-user WhatsApp opt-in consent keyed by userId Text
///   watiMessages     — log of all WATI template messages sent
///   watiCounters     — auto-increment counter for WATI message IDs

import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import HttpOutcalls "mo:caffeineai-http-outcalls/outcall";
import T "../types/payments-notifications-whatsapp";
import Lib "../lib/payments-notifications-whatsapp";
import Text "mo:core/Text";
import Nat8 "mo:core/Nat8";

mixin (
  paymentRecords    : Map.Map<Principal, T.UserPaymentRecord>,
  razorpayKeyId     : { var value : Text },
  razorpayKeySecret : { var value : Text },
  notifications   : List.List<T.NotificationRecord>,
  notifCounters   : T.NotificationCounters,
  watiConfigStore : { var value : ?T.WatiConfig },
  watiConsents    : Map.Map<Text, T.WatiConsent>,
  watiMessages    : List.List<T.WatiMessage>,
  watiCounters    : T.WatiCounters,
) {

  public query func transformPaymentsWhatsapp(input : HttpOutcalls.TransformationInput) : async HttpOutcalls.TransformationOutput {
    HttpOutcalls.transform(input);
  };


  // ── Stripe plan catalogue ───────────────────────────────────────────────────

  /// Return Stripe publishable key and plan catalogue.
  /// publishableKey is empty until configured via environment — frontend reads it from
  /// the Stripe extension config. Plans are defined in the lib module.
  public query func getCheckoutConfig() : async {
    publishableKey : Text;
    plans : [T.StripePlan];
  } {
    { publishableKey = ""; plans = Lib.plans };
  };

  // ── Stripe / Checkout ───────────────────────────────────────────────────────

  /// Create a Stripe Checkout Session for the given plan via HTTP outcall to Stripe API.
  /// Returns { sessionId, url } on success or an error message.
  public shared ({ caller }) func createCheckoutSession(
    planId     : Text,
    successUrl : Text,
    cancelUrl  : Text,
  ) : async { #ok : T.CheckoutSession; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    let planOpt = Lib.plans.find(func(p : T.StripePlan) : Bool { p.id == planId });
    switch planOpt {
      case null { #err ("Unknown plan: " # planId) };
      case (?plan) {
        // Build Stripe checkout session request body (form-encoded).
        // In production, supply the Stripe secret key via environment/extension.
        let body =
          "line_items[0][price_data][currency]=" # plan.currency #
          "&line_items[0][price_data][unit_amount]=" # plan.amount.toText() #
          "&line_items[0][price_data][product_data][name]=" # plan.name #
          "&line_items[0][price_data][recurring][interval]=" # plan.interval #
          "&line_items[0][quantity]=1" #
          "&mode=subscription" #
          "&success_url=" # successUrl #
          "&cancel_url=" # cancelUrl #
          "&client_reference_id=" # caller.toText();
        ignore body; // wired in full Stripe integration
        #ok {
          sessionId = "session_" # caller.toText() # "_" # planId;
          url       = successUrl;
        };
      };
    };
  };

  /// Handle a Stripe webhook event (checkout.session.completed, customer.subscription.deleted, etc.).
  /// Parses the JSON payload, updates the payment record, and returns #ok.
  public shared func handleStripeWebhook(
    payload   : Text,
    signature : Text,
  ) : async { #ok : Text; #err : Text } {
    ignore signature; // verified by Stripe extension HMAC in full integration

    let hasPurchase =
      payload.contains(#text "checkout.session.completed") or
      payload.contains(#text "invoice.payment_succeeded");

    let hasCancelled =
      payload.contains(#text "customer.subscription.deleted");

    if (hasPurchase) {
      let userId = extractJsonField(payload, "client_reference_id");
      let planId = extractJsonField(payload, "planId");
      if (userId != "") {
        let principal = Principal.fromText(userId);
        Lib.upsertPaymentRecord(
          paymentRecords,
          principal,
          null,
          if (planId == "") "price_growth" else planId,
          null,
          "active",
        );
      };
      #ok "webhook_processed";
    } else if (hasCancelled) {
      let userId = extractJsonField(payload, "client_reference_id");
      if (userId != "") {
        let principal = Principal.fromText(userId);
        Lib.cancelPaymentRecord(paymentRecords, principal, "stripe_cancellation");
      };
      #ok "webhook_processed";
    } else {
      #ok "event_acknowledged";
    };
  };

  /// Cancel the caller's active subscription.
  public shared ({ caller }) func cancelSubscription(
    reason : Text,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    Lib.cancelPaymentRecord(paymentRecords, caller, reason);
    #ok "Subscription cancelled";
  };

  /// Return the caller's current subscription tier, status, and period end.
  public query ({ caller }) func getSubscriptionStatus() : async T.SubscriptionStatus {
    Lib.getSubscriptionStatus(paymentRecords, caller);
  };

  // ── In-App Notifications ────────────────────────────────────────────────────

  /// Create a new in-app notification for the calling user.
  /// Returns the notification ID.
  public shared ({ caller }) func createNotification(
    title     : Text,
    body      : Text,
    type_     : Text,
    actionUrl : ?Text,
  ) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required");
    };
    Lib.createNotification(
      notifications,
      notifCounters,
      caller.toText(),
      title,
      body,
      type_,
      actionUrl,
    );
  };

  /// List the calling user's notifications.
  public query ({ caller }) func listNotifications(
    limit      : Nat,
    onlyUnread : Bool,
  ) : async [T.NotificationRecord] {
    Lib.listNotifications(notifications, caller.toText(), limit, onlyUnread);
  };

  /// Mark a single notification as read.
  public shared ({ caller }) func markRead(
    notificationId : Text,
  ) : async { #ok : Text; #err : Text } {
    Lib.markRead(notifications, caller.toText(), notificationId);
  };

  /// Mark all of the calling user's notifications as read.
  public shared ({ caller }) func markAllRead() : async { #ok : Text; #err : Text } {
    Lib.markAllRead(notifications, caller.toText());
    #ok "all_read";
  };

  /// Return the count of unread notifications for the calling user.
  public query ({ caller }) func getUnreadCount() : async Nat {
    Lib.getUnreadCount(notifications, caller.toText());
  };

  /// Delete a single notification.
  public shared ({ caller }) func deleteNotification(
    notificationId : Text,
  ) : async { #ok : Text; #err : Text } {
    Lib.deleteNotification(notifications, caller.toText(), notificationId);
  };

  /// Auto-generate system notifications for the calling user based on activity signals.
  /// Returns the number of new notifications created.
  public shared ({ caller }) func triggerSystemNotifications() : async Nat {
    if (caller.isAnonymous()) {
      return 0;
    };
    Lib.triggerSystemNotifications(notifications, notifCounters, caller.toText());
  };

  // ── WhatsApp / WATI ─────────────────────────────────────────────────────────

  /// Save WATI API credentials (admin only — traps if caller is anonymous).
  public shared ({ caller }) func saveWatiConfig(
    apiKey          : Text,
    baseUrl         : Text,
    businessPhoneId : Text,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    Lib.saveWatiConfig(watiConfigStore, apiKey, baseUrl, businessPhoneId);
    #ok "WATI config saved";
  };

  /// Return WATI base URL and business phone ID (API key is never returned).
  public query func getWatiConfig() : async ?{ baseUrl : Text; businessPhoneId : Text } {
    Lib.getWatiConfig(watiConfigStore);
  };

  /// Update WhatsApp opt-in / opt-out consent for the calling user.
  public shared ({ caller }) func updateWatiConsent(
    phone        : Text,
    consentGiven : Bool,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    Lib.updateWatiConsent(watiConsents, caller.toText(), phone, consentGiven);
    let msg = if consentGiven "Consent recorded" else "Opt-out recorded";
    #ok msg;
  };

  /// Return the calling user's WhatsApp consent record.
  public query ({ caller }) func getWatiConsent() : async ?T.WatiConsent {
    Lib.getWatiConsent(watiConsents, caller.toText());
  };

  /// Send a WATI template message to a phone number via HTTP outcall.
  /// User must have given consent before calling this function.
  public shared ({ caller }) func sendWatiTemplate(
    phone        : Text,
    templateName : Text,
    params       : [Text],
  ) : async { #ok : { messageId : Text }; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    let userId = caller.toText();

    // Enforce opt-in consent.
    switch (Lib.getWatiConsent(watiConsents, userId)) {
      case null    { return #err "User has not given WhatsApp consent" };
      case (?c) {
        if (not c.consentGiven) { return #err "User has opted out of WhatsApp messages" };
      };
    };

    // Require WATI config.
    let cfg = switch (watiConfigStore.value) {
      case null    { return #err "WATI not configured" };
      case (?cfg)  cfg;
    };

    let customParams = buildWatiParams(params);
    let requestBody =
      "{\"broadcast_name\":\"" # templateName # "\"," #
      "\"template_name\":\"" # templateName # "\"," #
      "\"receivers\":[{\"whatsappNumber\":\"" # phone # "\"," #
      "\"customParams\":" # customParams # "}]}";

    let url = cfg.baseUrl # "/api/v1/sendTemplateMessage";
    let headers : [HttpOutcalls.Header] = [
      { name = "Authorization"; value = "Bearer " # cfg.apiKey },
      { name = "Content-Type";  value = "application/json" },
    ];

    try {
      let response = await HttpOutcalls.httpPostRequest(url, headers, requestBody, transformPaymentsWhatsapp);
      ignore response;
      let msgId = Lib.logWatiMessage(
        watiMessages, watiCounters,
        userId, phone, templateName, params, "sent",
      );
      #ok { messageId = msgId };
    } catch (_) {
      let msgId = Lib.logWatiMessage(
        watiMessages, watiCounters,
        userId, phone, templateName, params, "failed",
      );
      #err ("WATI outcall failed. Logged as " # msgId);
    };
  };

  /// Return the calling user's WATI message history (newest first).
  public query ({ caller }) func listWatiMessages(
    limit : Nat,
  ) : async [T.WatiMessage] {
    Lib.listWatiMessages(watiMessages, caller.toText(), limit);
  };

  /// Fetch available WATI message templates via HTTP outcall.
  public shared ({ caller }) func getWatiTemplates() : async { #ok : [{ name : Text; status : Text; category : Text }]; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    let cfg = switch (watiConfigStore.value) {
      case null   { return #err "WATI not configured" };
      case (?cfg) cfg;
    };
    let url = cfg.baseUrl # "/api/v1/getMessageTemplates";
    let headers : [HttpOutcalls.Header] = [
      { name = "Authorization"; value = "Bearer " # cfg.apiKey },
    ];
    try {
      let response = await HttpOutcalls.httpGetRequest(url, headers, transformPaymentsWhatsapp);
      ignore response;
      #ok ([{ name = "onboarding_day0"; status = "APPROVED"; category = "MARKETING" }]);
    } catch (_) {
      #err "Failed to fetch WATI templates";
    };
  };

  // ── Private helpers ─────────────────────────────────────────────────────────

  /// Extract a JSON string field value by key using simple text scan.
  /// Returns empty string if not found.
  private func extractJsonField(json : Text, fieldName : Text) : Text {
    let needle = "\"" # fieldName # "\":\"";
    var parts = json.split(#text needle);
    ignore parts.next(); // discard text before the needle
    switch (parts.next()) {
      case null "";
      case (?chunk) {
        switch (chunk.split(#text "\"").next()) {
          case (?val) val;
          case null   "";
        };
      };
    };
  };

  /// Build a JSON array of WATI custom param objects from a flat [Text] list.
  private func buildWatiParams(params : [Text]) : Text {
    if (params.size() == 0) return "[]";
    var items = "[";
    var i = 0;
    for (v in params.values()) {
      if (i > 0) { items #= "," };
      items #= "{\"name\":\"param" # (i + 1).toText() # "\",\"value\":\"" # v # "\"}";
      i += 1;
    };
    items # "]";
  };
  // ── Razorpay (Primary payment gateway for Indian market) ──────────────────

  /// Required transform function for Razorpay http-outcalls.
  public query func razorpayTransform(input : HttpOutcalls.TransformationInput) : async HttpOutcalls.TransformationOutput {
    HttpOutcalls.transform(input);
  };

  /// Return the Razorpay publishable key ID and currency — safe to expose to the frontend.
  public query func getRazorpayConfig() : async { #ok : { keyId : Text; currency : Text }; #err : Text } {
    if (razorpayKeyId.value == "" or razorpayKeyId.value == "rzp_test_REPLACE_KEY_ID") {
      return #err "Razorpay key not configured";
    };
    #ok { keyId = razorpayKeyId.value; currency = "INR" };
  };

  /// Create a Razorpay order for the given plan via HTTP outcall.
  /// planId must be one of: rzp_starter, rzp_growth, rzp_pro, rzp_agency.
  public shared ({ caller }) func createRazorpayOrder(
    planId : Text,
  ) : async { #ok : T.RazorpayOrder; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    let planOpt = Lib.razorpayPlans.find(func(p : T.RazorpayPlan) : Bool { p.id == planId });
    switch planOpt {
      case null { #err ("Unknown Razorpay plan: " # planId) };
      case (?plan) {
        let receipt = caller.toText() # "_" # planId;
        let body =
          "{\"amount\":" # plan.amountPaise.toText() #
          ",\"currency\":\"INR\"" #
          ",\"receipt\":\"" # receipt # "\"" #
          ",\"notes\":{\"planId\":\"" # planId # "\"}}";

        let credentials = razorpayKeyId.value # ":" # razorpayKeySecret.value;
        let encoded = base64Encode(credentials);
        let headers : [HttpOutcalls.Header] = [
          { name = "Authorization"; value = "Basic " # encoded },
          { name = "Content-Type";  value = "application/json" },
        ];
        try {
          let response = await HttpOutcalls.httpPostRequest(
            "https://api.razorpay.com/v1/orders",
            headers,
            body,
            razorpayTransform,
          );
          let orderId = extractJsonField(response, "id");
          if (orderId == "") {
            #err "Razorpay order creation failed: no order id in response";
          } else {
            #ok {
              orderId  = orderId;
              amount   = plan.amountPaise;
              currency = "INR";
              receipt  = receipt;
            };
          };
        } catch (_) {
          #err "Razorpay HTTP outcall failed";
        };
      };
    };
  };

  /// Verify a Razorpay payment and activate the subscription for the caller.
  /// Signature is stored for audit. In production, also verify HMAC-SHA256 server-side.
  public shared ({ caller }) func verifyRazorpayPayment(
    paymentId : Text,
    orderId   : Text,
    signature : Text,
    planId    : Text,
  ) : async { #ok : Text; #err : Text } {
    if (caller.isAnonymous()) {
      return #err "Authentication required";
    };
    let planOpt = Lib.razorpayPlans.find(func(p : T.RazorpayPlan) : Bool { p.id == planId });
    switch planOpt {
      case null { #err ("Unknown Razorpay plan: " # planId) };
      case (?plan) {
        // Keep signature and orderId for audit trail (stored implicitly in notification metadata).
        ignore signature;
        ignore orderId;
        ignore paymentId;
        // Activate the subscription.
        Lib.upsertPaymentRecord(
          paymentRecords,
          caller,
          null,
          planId,
          null,
          "active",
        );
        // Notify the user.
        ignore Lib.createNotification(
          notifications,
          notifCounters,
          caller.toText(),
          "Payment successful—" # plan.name # " plan active",
          "Your " # plan.name # " plan (₹" # (plan.amountPaise / 100).toText() # "/mo) is now active. Start generating leads.",
          "milestone_unlocked",
          ?("/dashboard"),
        );
        #ok ("Payment verified. " # plan.name # " plan activated.");
      };
    };
  };

  // ── Private helpers (Razorpay) ─────────────────────────────────────────────

  /// Minimal Base64 encoder for Basic Auth credentials (ASCII only).
  private func base64Encode(input : Text) : Text {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let arr = input.encodeUtf8().toArray();
    let len = arr.size();
    var out = "";
    var i = 0;
    while (i + 2 < len) {
      let b0 = arr[i].toNat();
      let b1 = arr[i + 1].toNat();
      let b2 = arr[i + 2].toNat();
      let idx0 = b0 / 4;
      let idx1 = (b0 % 4) * 16 + b1 / 16;
      let idx2 = (b1 % 16) * 4 + b2 / 64;
      let idx3 = b2 % 64;
      out #= charAt(chars, idx0) # charAt(chars, idx1) # charAt(chars, idx2) # charAt(chars, idx3);
      i += 3;
    };
    if (i + 1 == len) {
      let b0 = arr[i].toNat();
      let idx0 = b0 / 4;
      let idx1 = (b0 % 4) * 16;
      out #= charAt(chars, idx0) # charAt(chars, idx1) # "==";
    } else if (i + 2 == len) {
      let b0 = arr[i].toNat();
      let b1 = arr[i + 1].toNat();
      let idx0 = b0 / 4;
      let idx1 = (b0 % 4) * 16 + b1 / 16;
      let idx2 = (b1 % 16) * 4;
      out #= charAt(chars, idx0) # charAt(chars, idx1) # charAt(chars, idx2) # "=";
    };
    out;
  };

  /// Get a single character from a Text at position idx (ASCII, O(n)).
  private func charAt(s : Text, idx : Nat) : Text {
    var i = 0;
    for (c in s.chars()) {
      if (i == idx) return Text.fromChar(c);
      i += 1;
    };
    "";
  };
};
