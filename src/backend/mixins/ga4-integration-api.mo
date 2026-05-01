import Time "mo:core/Time";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Lib "../lib/ga4-integration";
import T "../types/ga4-integration";

mixin (
  ga4Credentials : { var value : ?T.GA4Credentials },
  ga4LastUpdated : { var value : ?Int },
) {

  // ── Transform for GA4 HTTP responses (IC consensus normalization) ─────────

  public query func transformGA4(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ── Credential management ─────────────────────────────────────────────────

  /// Store GA4 property ID and API key server-side only.
  /// The API key is NEVER returned to the frontend.
  public shared (_) func setGA4Credentials(propertyId : Text, apiKey : Text) : async () {
    Lib.setCredentials(ga4Credentials, ga4LastUpdated, propertyId, apiKey);
  };

  /// Returns configuration status — never exposes the API key.
  public query (_) func getGA4CredentialStatus() : async T.GA4CredentialStatus {
    Lib.getCredentialStatus(ga4Credentials, ga4LastUpdated);
  };

  /// Clear stored GA4 credentials.
  public shared (_) func clearGA4Credentials() : async () {
    Lib.clearCredentials(ga4Credentials, ga4LastUpdated);
  };

  // ── Analytics dashboard ───────────────────────────────────────────────────

  /// Fetch GA4 analytics for the last `days` days.
  /// Falls back to realistic mock data (isLive=false) if:
  ///   - credentials are not configured
  ///   - the GA4 API call fails for any reason
  public shared (_) func getGA4Dashboard(days : Nat) : async { #ok : T.GA4Dashboard; #err : Text } {
    let creds = switch (ga4Credentials.value) {
      case null { return #ok(Lib.getMockDashboard()) };
      case (?c) c;
    };

    let now = Time.now();
    let endDate = Lib.formatDate(now);
    let startDate = Lib.formatDate(now - days.toInt() * 86400 * 1_000_000_000);

    let url = Lib.buildReportUrl(creds.propertyId, creds.apiKey);
    let body = Lib.buildReportRequestBody(startDate, endDate);

    try {
      let response = await OutCall.httpPostRequest(
        url,
        [{ name = "Content-Type"; value = "application/json" }],
        body,
        transformGA4,
      );
      #ok(Lib.parseGA4Response(response));
    } catch (_e) {
      #ok(Lib.getMockDashboard());
    };
  };
};
