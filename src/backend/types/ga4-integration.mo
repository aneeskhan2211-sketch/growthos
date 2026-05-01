module {
  /// Credentials stored server-side only — never exposed to frontend
  public type GA4Credentials = {
    propertyId : Text;
    apiKey : Text;
  };

  /// Cached OAuth access token (not used in API-key flow, reserved for future)
  public type GA4TokenCache = {
    accessToken : Text;
    expiresAt : Int;
  };

  public type GA4Metric = {
    name : Text;
    value : Text;
  };

  public type GA4Dimension = {
    name : Text;
    value : Text;
  };

  public type GA4Row = {
    dimensions : [GA4Dimension];
    metrics : [GA4Metric];
  };

  public type GA4ReportResponse = {
    rows : [GA4Row];
    rowCount : Nat;
  };

  public type GA4Dashboard = {
    totalSessions : Int;
    totalUsers : Int;
    avgBounceRate : Float;
    topPages : [(Text, Int)];
    trafficSources : [(Text, Int)];
    conversions : Int;
    isLive : Bool;
  };

  /// Safe status — never includes the apiKey
  public type GA4CredentialStatus = {
    isConfigured : Bool;
    propertyId : ?Text;
    lastUpdated : ?Int;
  };
};
