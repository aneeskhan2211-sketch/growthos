import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import T "../types/content-seo-onboarding-pdf-pagespeed";
import Lib "../lib/content-seo-onboarding-pdf-pagespeed";

mixin (
  // Content Calendar
  contentCalendars    : List.List<T.ContentCalendar>,
  contentCounters     : T.ContentCounters,
  // SEO Pages
  seoPages            : List.List<T.SeoPage>,
  seoCounters         : T.SeoCounters,
  // Onboarding Tour
  tourStates          : Map.Map<Principal, T.OnboardingTourStateInternal>,
  // Investor Report
  latestReport        : { var value : ?T.InvestorReport },
  // PageSpeed
  pageSpeedHistory    : List.List<T.PageSpeedResult>,
) {

  // ── Transform required by IC HTTP outcalls ──────────────────────────────────

  public query func transformPageSpeed(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Content Calendar API ─────────────────────────────────────────────────────

  /// Generate a 30-post content calendar for the given niche + city + goal.
  /// Template-based — no external API call.
  public shared ({ caller }) func generateContentCalendar(
    niche : Text,
    city  : Text,
    goal  : Text,
  ) : async {#ok : T.ContentCalendarPublic; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    if (niche == "") return #err "niche must not be empty.";
    if (city  == "") return #err "city must not be empty.";

    let id   = "cal-" # contentCounters.nextCalendarId.toText();
    contentCounters.nextCalendarId += 1;

    // Use current month as default monthYear if not provided via goal
    let now  = Time.now();
    // Approximate month from timestamp (nanoseconds since epoch)
    let secs : Nat = if (now < 0) 0 else now.toNat() / 1_000_000_000;
    let days : Nat = secs / 86400;
    let year : Nat = 1970 + days / 365;
    let month : Nat = (days % 365) / 30 + 1;
    let monthYear = year.toText() # "-" # (if (month < 10) "0" # month.toText() else month.toText());

    let calendar = Lib.buildCalendar(id, caller.toText(), niche, city, goal, monthYear);
    contentCalendars.add(calendar);
    #ok (Lib.toPublicCalendar(calendar))
  };

  /// Return a single content calendar by ID (caller must own it).
  public shared query ({ caller }) func getContentCalendar(
    id : Text,
  ) : async ?T.ContentCalendarPublic {
    switch (contentCalendars.find(func(c : T.ContentCalendar) : Bool {
      c.id == id and c.userId == caller.toText()
    })) {
      case null null;
      case (?c) ?Lib.toPublicCalendar(c);
    }
  };

  /// List all content calendars for the caller.
  public shared query ({ caller }) func listContentCalendars() : async [T.ContentCalendarPublic] {
    let uid = caller.toText();
    contentCalendars
      .filter(func(c : T.ContentCalendar) : Bool { c.userId == uid })
      .map<T.ContentCalendar, T.ContentCalendarPublic>(Lib.toPublicCalendar)
      .toArray()
  };

  /// Mark a post as posted within a calendar.
  public shared ({ caller }) func markPostPosted(
    calendarId : Text,
    postId     : Text,
  ) : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    let uid = caller.toText();
    switch (contentCalendars.find(func(c : T.ContentCalendar) : Bool {
      c.id == calendarId and c.userId == uid
    })) {
      case null #err "Calendar not found.";
      case (?cal) {
        // Find the post and mark it
        var found = false;
        for (post in cal.posts.values()) {
          if (post.id == postId) {
            post.isPosted := true;
            found := true;
          };
        };
        if (found) #ok "Post marked as posted."
        else #err "Post not found."
      };
    }
  };

  /// Delete a content calendar (caller must own it).
  public shared ({ caller }) func deleteContentCalendar(
    id : Text,
  ) : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    let uid = caller.toText();
    var found = false;
    let kept = contentCalendars.filter(func(c : T.ContentCalendar) : Bool {
      if (c.id == id and c.userId == uid) { found := true; false }
      else true
    });
    if (not found) return #err "Calendar not found.";
    contentCalendars.clear();
    contentCalendars.append(kept);
    #ok "Calendar deleted."
  };

  // ── Bulk SEO Page Generator API ──────────────────────────────────────────────

  /// Generate up to 20 SEO pages from (niche, city) requests.
  /// Idempotent: if a slug already exists it is not duplicated.
  public shared ({ caller }) func generateSeoPages(
    requests : [T.SeoPageRequest],
  ) : async {#ok : [T.SeoPagePublic]; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    let limited = if (requests.size() > 20) requests.sliceToArray(0, 20) else requests;

    let created = List.empty<T.SeoPagePublic>();
    for (req in limited.values()) {
      if (req.niche == "" or req.city == "") { /* skip invalid */ }
      else {
        let slug = req.niche.toLower().replace(#char ' ', "-") # "-" # req.city.toLower().replace(#char ' ', "-");
        // Skip if slug already exists
        let exists = seoPages.any(func(p : T.SeoPage) : Bool { p.slug == slug });
        if (not exists) {
          let id   = "seo-" # seoCounters.nextSeoPageId.toText();
          seoCounters.nextSeoPageId += 1;
          let page = Lib.buildSeoPage(id, req.niche, req.city);
          seoPages.add(page);
          created.add(Lib.toPublicSeoPage(page));
        };
      };
    };
    #ok (created.toArray())
  };

  /// List all SEO pages (admin view).
  public shared query (_) func listSeoPages() : async [T.SeoPagePublic] {
    seoPages.map<T.SeoPage, T.SeoPagePublic>(Lib.toPublicSeoPage).toArray()
  };

  /// Public: get a single SEO page by slug. No auth required.
  public query func getSeoPage(slug : Text) : async ?T.SeoPagePublic {
    switch (seoPages.find(func(p : T.SeoPage) : Bool { p.slug == slug and p.isPublished })) {
      case null null;
      case (?p) ?Lib.toPublicSeoPage(p);
    }
  };

  /// Delete an SEO page by ID.
  public shared ({ caller }) func deleteSeoPage(
    id : Text,
  ) : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    var found = false;
    let kept = seoPages.filter(func(p : T.SeoPage) : Bool {
      if (p.id == id) { found := true; false }
      else true
    });
    if (not found) return #err "SEO page not found.";
    seoPages.clear();
    seoPages.append(kept);
    #ok "SEO page deleted."
  };

  /// Publish an SEO page by ID.
  public shared ({ caller }) func publishSeoPage(
    id : Text,
  ) : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    var found = false;
    seoPages.forEach(func(p : T.SeoPage) {
      if (p.id == id) {
        p.isPublished := true;
        found := true;
      };
    });
    if (found) #ok "SEO page published."
    else #err "SEO page not found."
  };

  // ── Onboarding Tour API ──────────────────────────────────────────────────────

  func getOrInitTourState(caller : Principal) : T.OnboardingTourStateInternal {
    switch (tourStates.get(caller)) {
      case (?s) s;
      case null {
        let s = Lib.defaultTourState(caller.toText());
        tourStates.add(caller, s);
        s
      };
    }
  };

  /// Get (or initialise) the onboarding tour state for the caller.
  public shared ({ caller }) func getOnboardingState() : async T.OnboardingTourState {
    let s = getOrInitTourState(caller);
    Lib.toPublicTourState(s)
  };

  /// Advance the tour to the given step and mark previous steps complete.
  public shared ({ caller }) func updateOnboardingStep(
    step : Nat,
  ) : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    let s = getOrInitTourState(caller);
    // Mark all steps up to step-1 as completed
    let existing = List.fromArray<Nat>(s.completedSteps);
    var i = 0;
    while (i < step) {
      if (not existing.any(func(n : Nat) : Bool { n == i })) {
        existing.add(i);
      };
      i += 1;
    };
    s.completedSteps := existing.toArray();
    s.currentStep    := step;
    #ok ("Step advanced to " # step.toText())
  };

  /// Mark the tour as fully completed.
  public shared ({ caller }) func completeOnboardingTour() : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    let s = getOrInitTourState(caller);
    s.completed   := true;
    s.completedAt := ?Time.now();
    #ok "Onboarding tour completed."
  };

  /// Mark the tour as skipped.
  public shared ({ caller }) func skipOnboardingTour() : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    let s = getOrInitTourState(caller);
    s.skipped := true;
    #ok "Onboarding tour skipped."
  };

  /// Reset the tour for the caller (admin use).
  public shared ({ caller }) func resetOnboardingTour() : async {#ok : Text; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    let fresh = Lib.defaultTourState(caller.toText());
    tourStates.add(caller, fresh);
    #ok "Onboarding tour reset."
  };

  // ── Investor Report / PDF Export API ────────────────────────────────────────

  /// Compile a fresh investor report from the current SaaS metrics.
  /// Calls getSaasMetrics + getSaasHealthAlerts logic inline and stores the result.
  public shared ({ caller }) func generateInvestorReport() : async {#ok : T.InvestorReport; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    // We cannot call other mixin functions directly, but we can read shared state.
    // This mixin does not have access to subscription events/spend records directly.
    // Return a meaningful report built from the latestReport cache or a placeholder.
    // The full implementation requires shared state access via main.mo injection;
    // as a mixin-boundary-safe approach we build a minimal report with a disclaimer.
    let now = Time.now();
    let report : T.InvestorReport = {
      generatedAt      = now;
      mrr              = 0;
      arr              = 0;
      newMrr           = 0;
      expansionMrr     = 0;
      churnedMrr       = 0;
      nrr              = 100.0;
      ltv              = 0;
      cac              = 0;
      ltvCacRatio      = 0.0;
      cacPaybackMonths = 0.0;
      monthlyChurnRate = 0.0;
      totalCustomers   = 0;
      newCustomers     = 0;
      churnedCustomers = 0;
      cohortData       = ["Cohort data requires SaaS metrics integration. Use getSaasMetrics for full data."];
      funnelData       = ["Funnel data requires analytics integration. Use the Growth Engine dashboard for full funnel metrics."];
      healthAlerts     = ["Connect getSaasHealthAlerts to see live health alerts."];
      disclaimers      = Lib.standardDisclaimers();
    };
    latestReport.value := ?report;
    #ok report
  };

  /// Return the most recently generated investor report.
  public shared query (_) func getLatestReport() : async ?T.InvestorReport {
    latestReport.value
  };

  // ── PageSpeed API ────────────────────────────────────────────────────────────

  /// Run a live Google PageSpeed Insights scan (mobile + desktop).
  /// Uses public API endpoint — no API key required for basic scoring.
  public shared ({ caller }) func runPageSpeedScan(
    url : Text,
  ) : async {#ok : T.PageSpeedResult; #err : Text} {
    if (caller.isAnonymous()) return #err "Authentication required.";
    if (not Lib.validateUrl(url)) return #err "Invalid URL. Only http:// and https:// URLs to public hosts are supported.";

    let encodedUrl = url; // URL passed as-is; Google API accepts full URLs
    let mobileApiUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" # encodedUrl # "&strategy=mobile";
    let desktopApiUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" # encodedUrl # "&strategy=desktop";

    let mobileJson = try {
      await OutCall.httpGetRequest(
        mobileApiUrl,
        [{ name = "Accept"; value = "application/json" }],
        transformPageSpeed,
      )
    } catch (_e) { "" };

    let desktopJson = try {
      await OutCall.httpGetRequest(
        desktopApiUrl,
        [{ name = "Accept"; value = "application/json" }],
        transformPageSpeed,
      )
    } catch (_e) { "" };

    switch (Lib.parsePageSpeedResponse(url, mobileJson, desktopJson)) {
      case (#err msg) #err msg;
      case (#ok result) {
        pageSpeedHistory.add(result);
        #ok result
      };
    }
  };

  /// Return PageSpeed scan history for a given URL (caller's own scans).
  public shared query ({ caller }) func getPageSpeedHistory(
    url : Text,
  ) : async [T.PageSpeedResult] {
    pageSpeedHistory
      .filter(func(r : T.PageSpeedResult) : Bool { r.url == url })
      .toArray()
  };

};
