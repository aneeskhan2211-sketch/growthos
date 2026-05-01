import Time "mo:core/Time";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import T "../types/ga4-integration";

module {

  // ── Credential management ─────────────────────────────────────────────────

  public func setCredentials(
    credentials : { var value : ?T.GA4Credentials },
    lastUpdated : { var value : ?Int },
    propertyId : Text,
    apiKey : Text,
  ) {
    credentials.value := ?{ propertyId; apiKey };
    lastUpdated.value := ?Time.now();
  };

  public func getCredentialStatus(
    credentials : { var value : ?T.GA4Credentials },
    lastUpdated : { var value : ?Int },
  ) : T.GA4CredentialStatus {
    switch (credentials.value) {
      case (?creds) {
        {
          isConfigured = true;
          propertyId = ?creds.propertyId;
          lastUpdated = lastUpdated.value;
        };
      };
      case null {
        {
          isConfigured = false;
          propertyId = null;
          lastUpdated = null;
        };
      };
    };
  };

  public func clearCredentials(
    credentials : { var value : ?T.GA4Credentials },
    lastUpdated : { var value : ?Int },
  ) {
    credentials.value := null;
    lastUpdated.value := null;
  };

  // ── Mock dashboard data ───────────────────────────────────────────────────

  public func getMockDashboard() : T.GA4Dashboard {
    {
      totalSessions = 1247;
      totalUsers = 893;
      avgBounceRate = 0.42;
      topPages = [
        ("/dashboard", 312),
        ("/", 287),
        ("/leads", 198),
        ("/proposals", 143),
        ("/settings", 98),
      ];
      trafficSources = [
        ("Organic Search", 420),
        ("Direct", 380),
        ("Social", 220),
        ("Referral", 120),
        ("Email", 60),
      ];
      conversions = 47;
      isLive = false;
    };
  };

  // ── Date helpers ──────────────────────────────────────────────────────────

  /// Format a Time.Time (nanoseconds) as YYYY-MM-DD for GA4 API
  public func formatDate(timeNs : Int) : Text {
    // Gregorian calendar algorithm using Int to avoid underflow
    let secs : Int = Int.abs(timeNs).toInt() / 1_000_000_000;
    let days : Int = secs / 86400;
    let z : Int = days + 719468;
    let era : Int = (if (z >= 0) z else z - 146096) / 146097;
    let doe : Int = z - era * 146097;
    let yoe : Int = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let d : Int = doy - (153 * mp + 2) / 5 + 1;
    let m : Int = if (mp < 10) mp + 3 else mp - 9;
    let yr : Int = if (m <= 2) y + 1 else y;

    let yrText = yr.toText();
    let mAbs = Int.abs(m);
    let dAbs = Int.abs(d);
    let mText = if (mAbs < 10) "0" # mAbs.toText() else mAbs.toText();
    let dText = if (dAbs < 10) "0" # dAbs.toText() else dAbs.toText();
    yrText # "-" # mText # "-" # dText;
  };

  // ── Simple JSON field extraction ──────────────────────────────────────────

  /// Extract the first string or numeric value for a given JSON key.
  func extractJsonValue(json : Text, key : Text) : ?Text {
    let needle = "\"" # key # "\"";
    let segs = json.split(#text needle).toArray();
    if (segs.size() < 2) return null;
    let after = segs[1];
    let colonSegs = after.split(#char ':').toArray();
    if (colonSegs.size() < 2) return null;
    // Rejoin all segments after the first colon
    var valSection = colonSegs[1];
    var ki = 2;
    while (ki < colonSegs.size()) {
      valSection := valSection # ":" # colonSegs[ki];
      ki += 1;
    };
    let trimmed = valSection
      .trimStart(#char ' ')
      .trimStart(#char '\n')
      .trimStart(#char '\r')
      .trimStart(#char '\t');
    if (trimmed.size() == 0) return null;
    let chars = trimmed.toArray();
    if (chars.size() == 0) return null;
    if (chars[0] == '\"') {
      // String: extract between first pair of quotes
      let rest = Text.fromArray(chars.sliceToArray(1, chars.size().toInt()));
      let innerSegs = rest.split(#char '\"').toArray();
      if (innerSegs.size() >= 1) ?innerSegs[0] else null;
    } else {
      // Numeric or keyword: collect chars until delimiter
      var acc = "";
      var stopped = false;
      for (c in chars.vals()) {
        if (not stopped) {
          if (c == ',' or c == '}' or c == ']' or c == '\n' or c == '\r' or c == ' ') {
            stopped := true;
          } else {
            acc := acc # Text.fromChar(c);
          };
        };
      };
      if (acc.size() > 0) ?acc else null;
    };
  };

  /// Parse Int from text, default 0
  public func parseInt(t : Text) : Int {
    switch (Int.fromText(t)) {
      case (?n) n;
      case null 0;
    };
  };

  /// Parse Float from text (e.g. "0.42"), default 0.0
  /// Handles simple decimal format returned by GA4 API.
  public func parseFloat(t : Text) : Float {
    // Split on decimal point
    let parts = t.split(#char '.').toArray();
    if (parts.size() == 0) return 0.0;
    let intPart = switch (Int.fromText(parts[0])) {
      case (?n) n;
      case null 0;
    };
    if (parts.size() == 1) return intPart.toFloat();
    // Parse fractional digits
    let fracText = parts[1];
    let fracVal = switch (Nat.fromText(fracText)) {
      case (?n) n;
      case null 0;
    };
    let divisor = pow10(fracText.size());
    intPart.toFloat() + fracVal.toInt().toFloat() / divisor.toInt().toFloat();
  };

  func pow10(n : Nat) : Nat {
    var result = 1;
    var i = 0;
    while (i < n) {
      result *= 10;
      i += 1;
    };
    result;
  };

  // ── Pair accumulation helpers ─────────────────────────────────────────────

  public func addToPairs(pairs : [(Text, Int)], key : Text, count : Int) : [(Text, Int)] {
    var found = false;
    var result : [(Text, Int)] = [];
    for ((k, v) in pairs.vals()) {
      if (k == key) {
        result := result.concat([(k, v + count)]);
        found := true;
      } else {
        result := result.concat([(k, v)]);
      };
    };
    if (not found) result.concat([(key, count)]) else result;
  };

  /// Sort (Text, Int) pairs descending by Int
  public func sortPairsDesc(pairs : [(Text, Int)]) : [(Text, Int)] {
    let arr = pairs.toVarArray();
    let n = arr.size();
    var i = 0;
    while (i < n) {
      var j = i + 1;
      while (j < n) {
        let (_, ci) = arr[i];
        let (_, cj) = arr[j];
        if (cj > ci) {
          let tmp = arr[i];
          arr[i] := arr[j];
          arr[j] := tmp;
        };
        j += 1;
      };
      i += 1;
    };
    arr.vals().toArray();
  };

  // ── GA4 response parsing ──────────────────────────────────────────────────

  /// Parse a GA4 runReport JSON response into a GA4Dashboard.
  /// Expects: dimensions=[sessionDefaultChannelGrouping, pagePath],
  ///          metrics=[sessions, totalUsers, bounceRate, conversions]
  public func parseGA4Response(body : Text) : T.GA4Dashboard {
    var totalSessions : Int = 0;
    var totalUsers : Int = 0;
    var totalBounceSum : Float = 0.0;
    var totalConversions : Int = 0;
    var rowCount : Nat = 0;
    var pageMap : [(Text, Int)] = [];
    var sourceMap : [(Text, Int)] = [];

    // Split on "dimensionValues" — each split after index 0 is a row block
    let rowBlocks = body.split(#text "\"dimensionValues\"").toArray();

    var blockIdx = 1;
    while (blockIdx < rowBlocks.size()) {
      let block = rowBlocks[blockIdx];

      // Extract dimension value blocks (channel = first, pagePath = second)
      let dimValueBlocks = block.split(#text "\"value\"").toArray();
      var channelName = "(other)";
      var pagePath = "/";

      if (dimValueBlocks.size() >= 2) {
        switch (extractJsonValue("\"value\"" # dimValueBlocks[1], "value")) {
          case (?v) { channelName := v };
          case null {};
        };
      };
      if (dimValueBlocks.size() >= 3) {
        switch (extractJsonValue("\"value\"" # dimValueBlocks[2], "value")) {
          case (?v) { pagePath := v };
          case null {};
        };
      };

      // Extract metric value blocks from "metricValues" section
      var rowSessions : Int = 0;
      var rowUsers : Int = 0;
      var rowBounce : Float = 0.0;
      var rowConversions : Int = 0;

      let mSections = block.split(#text "\"metricValues\"").toArray();
      if (mSections.size() >= 2) {
        let mBlock = mSections[1];
        let mValBlocks = mBlock.split(#text "\"value\"").toArray();
        if (mValBlocks.size() >= 2) {
          switch (extractJsonValue("\"value\"" # mValBlocks[1], "value")) {
            case (?v) { rowSessions := parseInt(v) };
            case null {};
          };
        };
        if (mValBlocks.size() >= 3) {
          switch (extractJsonValue("\"value\"" # mValBlocks[2], "value")) {
            case (?v) { rowUsers := parseInt(v) };
            case null {};
          };
        };
        if (mValBlocks.size() >= 4) {
          switch (extractJsonValue("\"value\"" # mValBlocks[3], "value")) {
            case (?v) { rowBounce := parseFloat(v) };
            case null {};
          };
        };
        if (mValBlocks.size() >= 5) {
          switch (extractJsonValue("\"value\"" # mValBlocks[4], "value")) {
            case (?v) { rowConversions := parseInt(v) };
            case null {};
          };
        };
      };

      totalSessions += rowSessions;
      totalUsers += rowUsers;
      totalBounceSum += rowBounce;
      totalConversions += rowConversions;
      rowCount += 1;
      pageMap := addToPairs(pageMap, pagePath, rowSessions);
      sourceMap := addToPairs(sourceMap, channelName, rowSessions);
      blockIdx += 1;
    };

    if (rowCount == 0) return getMockDashboard();

    let avgBounce = totalBounceSum / rowCount.toInt().toFloat();
    let sortedPages = sortPairsDesc(pageMap);
    let topPages = if (sortedPages.size() > 5) sortedPages.sliceToArray(0, 5) else sortedPages;
    let sortedSources = sortPairsDesc(sourceMap);

    {
      totalSessions;
      totalUsers;
      avgBounceRate = avgBounce;
      topPages;
      trafficSources = sortedSources;
      conversions = totalConversions;
      isLive = true;
    };
  };

  // ── GA4 request body builder ──────────────────────────────────────────────

  public func buildReportRequestBody(startDate : Text, endDate : Text) : Text {
    "{" #
      "\"dateRanges\":[{\"startDate\":\"" # startDate # "\",\"endDate\":\"" # endDate # "\"}]," #
      "\"metrics\":[{\"name\":\"sessions\"},{\"name\":\"totalUsers\"},{\"name\":\"bounceRate\"},{\"name\":\"conversions\"}]," #
      "\"dimensions\":[{\"name\":\"sessionDefaultChannelGrouping\"},{\"name\":\"pagePath\"}]," #
      "\"limit\":50" #
    "}";
  };

  public func buildReportUrl(propertyId : Text, apiKey : Text) : Text {
    "https://analyticsdata.googleapis.com/v1beta/properties/" # propertyId # ":runReport?key=" # apiKey;
  };
};
