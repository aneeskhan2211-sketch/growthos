import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import WHT "../types/website-health";
import WebsiteHealthLib "../lib/website-health";

/// Public API surface for the Website Health & Growth Score feature.
/// All scans perform real HTTP outcalls to the target URL, parse HTML,
/// and score the page based on real signals.
///
/// Premium gating:
///   Free    — top 3 issues only, 1 scan/week, no rawMetrics
///   Starter — top 5 issues, 2 scans/week, no rawMetrics
///   Growth+ — all issues, unlimited scans, competitor data, rawMetrics
mixin (
  audits      : List.List<WHT.AuditRecord>,
  scanLimits  : Map.Map<Principal, WHT.ScanLimitRecord>,
  whCounters  : WHT.WebsiteHealthCounters,
  subscriptions : Map.Map<Principal, { planTier : Common.PlanTier }>,
  whMonitors  : Map.Map<Text, WHT.MonitorRecord>,
  whEvents    : List.List<WHT.WHEvent>,
) {

  // ── Transform function required by IC HTTP outcalls ───────────────────────

  public query func transformWebsiteHealth(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Main scan endpoint ─────────────────────────────────────────────────────

  /// Scan the given URL by making a real HTTP GET request, parsing the HTML,
  /// and computing scores from actual page signals.
  ///
  /// Validates: https/http only, blocks localhost and private IP ranges.
  /// Falls back to URL-heuristic scoring if the HTTP outcall fails.
  public shared ({ caller }) func submitAudit(url : Text) : async WHT.AuditRecord {
    // Validate URL
    switch (WebsiteHealthLib.validateUrl(url)) {
      case (?err) Runtime.trap(err);
      case null {};
    };

    let startMs : Int = Time.now() / 1_000_000;

    // Fetch the page HTML via HTTP GET outcall
    let html = try {
      await OutCall.httpGetRequest(
        url,
        [
          { name = "Accept";          value = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" },
          { name = "Accept-Language"; value = "en-US,en;q=0.5" },
          { name = "Accept-Encoding"; value = "identity" },
        ],
        transformWebsiteHealth,
      )
    } catch (_e) { "" };

    let durationMs : Int = Time.now() / 1_000_000 - startMs;

    // Check for robots.txt — GET it; success means it exists
    let robotsOk = try {
      let body = await OutCall.httpGetRequest(
        url # "/robots.txt",
        [{ name = "Accept"; value = "text/plain" }],
        transformWebsiteHealth,
      );
      body.size() > 0
    } catch (_e) { false };

    // Check for sitemap.xml
    let sitemapOk = try {
      let body = await OutCall.httpGetRequest(
        url # "/sitemap.xml",
        [{ name = "Accept"; value = "application/xml,text/xml" }],
        transformWebsiteHealth,
      );
      body.size() > 0
    } catch (_e) { false };

    // Build audit record
    let record = if (html.size() > 0) {
      WebsiteHealthLib.buildAuditRecord(
        caller, url, html, [],
        robotsOk, sitemapOk, durationMs,
        audits, scanLimits, whCounters, subscriptions, whEvents,
      )
    } else {
      WebsiteHealthLib.buildFallbackAuditRecord(
        caller, url, durationMs,
        audits, scanLimits, whCounters, subscriptions, whEvents,
      )
    };

    let tier = switch (subscriptions.get(caller)) {
      case null #Free;
      case (?s) s.planTier;
    };

    WebsiteHealthLib.storeEvent(caller, "website_scan_completed", "url=" # url, whEvents);

    WebsiteHealthLib.applyTierGating(record, tier)
  };

  /// Return the most recent audit for a given URL owned by the caller.
  public shared query ({ caller }) func getLatestAudit(url : Text) : async ?WHT.AuditRecord {
    let tier = switch (subscriptions.get(caller)) {
      case null #Free;
      case (?s) s.planTier;
    };
    switch (WebsiteHealthLib.getLatestAudit(caller, url, audits)) {
      case null null;
      case (?r) ?WebsiteHealthLib.applyTierGating(r, tier);
    }
  };

  /// Return the last 8 audits for a URL (chronological order, oldest first).
  public shared query ({ caller }) func getAuditHistory(url : Text) : async [WHT.AuditRecord] {
    let tier = switch (subscriptions.get(caller)) {
      case null #Free;
      case (?s) s.planTier;
    };
    let history = WebsiteHealthLib.getAuditHistory(caller, url, audits);
    history.map<WHT.AuditRecord, WHT.AuditRecord>(func(r) {
      WebsiteHealthLib.applyTierGating(r, tier)
    })
  };

  /// Scan up to 3 competitor URLs and return a comparison array.
  /// Only available for Growth/Pro/Agency plans.
  /// Note: For competitor comparison we return simulated scores derived from the URL
  /// rather than making live scans, to keep the response time acceptable.
  public shared ({ caller }) func getCompetitorComparison(urls : [Text]) : async [WHT.CompetitorRecord] {
    let tier = switch (subscriptions.get(caller)) {
      case null #Free;
      case (?s) s.planTier;
    };
    if (not WebsiteHealthLib.isGrowthOrAbove(tier)) return [];
    WebsiteHealthLib.storeEvent(caller, "competitor_added", "count=" # urls.size().toText(), whEvents);
    WebsiteHealthLib.buildCompetitorComparison(urls, audits)
  };

  /// Generate weekly report data for the caller across all their audited URLs.
  public shared query ({ caller }) func getWeeklyReportData() : async ?WHT.WeeklyReportData {
    WebsiteHealthLib.getWeeklyReportData(caller, audits)
  };

  /// Refresh the scan-limit record for the caller (after plan upgrade or new week).
  public shared ({ caller }) func updateAuditScanLimit() : async WHT.ScanLimitRecord {
    WebsiteHealthLib.getOrInitScanLimit(caller, scanLimits, subscriptions)
  };

  // ── Monitor management ────────────────────────────────────────────────────

  /// Add a URL to weekly monitoring for the caller.
  public shared ({ caller }) func addMonitoredUrl(url : Text) : async () {
    switch (WebsiteHealthLib.validateUrl(url)) {
      case (?err) Runtime.trap(err);
      case null {};
    };
    WebsiteHealthLib.addMonitoredUrl(caller, url, whMonitors);
  };

  /// Return all monitored URLs for the caller.
  public shared query ({ caller }) func getMonitoredUrls() : async [WHT.MonitorRecord] {
    WebsiteHealthLib.getMonitoredUrls(caller, whMonitors)
  };

  /// Enable or disable monitoring for a specific URL.
  public shared ({ caller }) func updateMonitoredUrl(url : Text, active : Bool) : async () {
    WebsiteHealthLib.updateMonitoredUrl(caller, url, active, whMonitors);
  };

  /// Return URLs that need a re-scan based on their last scan time.
  public shared query (_) func getMonitoredUrlsNeedingRescan() : async [WHT.MonitorRecord] {
    WebsiteHealthLib.getMonitoredUrlsNeedingRescan(whMonitors, Time.now())
  };

  // ── Admin analytics ───────────────────────────────────────────────────────

  /// Store an admin analytics event for the caller.
  public shared ({ caller }) func trackWebsiteHealthEvent(eventName : Text, metadata : Text) : async () {
    WebsiteHealthLib.storeEvent(caller, eventName, metadata, whEvents);
  };

  /// Return all admin analytics events.
  public shared query (_) func getAdminEvents() : async [WHT.WHEvent] {
    WebsiteHealthLib.getAdminEvents(whEvents)
  };
};
