import Time "mo:core/Time";

module {

  // ── Content Calendar ────────────────────────────────────────────────────────

  public type ContentPost = {
    id          : Text;
    niche       : Text;
    city        : Text;
    postType    : Text;   // "reel" | "carousel" | "story" | "ad"
    hook        : Text;
    body        : Text;
    caption     : Text;
    hashtags    : [Text];
    callToAction: Text;
    scheduledDay: Nat;    // 1-30
    var isPosted: Bool;
  };

  public type ContentCalendar = {
    id        : Text;
    userId    : Text;
    niche     : Text;
    city      : Text;
    goal      : Text;
    monthYear : Text;     // e.g. "2026-05"
    posts     : [ContentPost];
    createdAt : Int;
  };

  // Shared (no var fields) for API boundary
  public type ContentPostPublic = {
    id          : Text;
    niche       : Text;
    city        : Text;
    postType    : Text;
    hook        : Text;
    body        : Text;
    caption     : Text;
    hashtags    : [Text];
    callToAction: Text;
    scheduledDay: Nat;
    isPosted    : Bool;
  };

  public type ContentCalendarPublic = {
    id        : Text;
    userId    : Text;
    niche     : Text;
    city      : Text;
    goal      : Text;
    monthYear : Text;
    posts     : [ContentPostPublic];
    createdAt : Int;
  };

  public type ContentCounters = {
    var nextCalendarId : Nat;
  };

  // ── Bulk SEO Page Generator ──────────────────────────────────────────────────

  public type SeoPage = {
    id           : Text;
    niche        : Text;
    city         : Text;
    slug         : Text;   // e.g. "gym-pune"
    headline     : Text;
    subheadline  : Text;
    painPoints   : [Text];
    benefits     : [Text];
    caseExample  : { before : Text; after : Text };
    pricingHint  : Text;
    createdAt    : Int;
    var isPublished : Bool;
  };

  public type SeoPagePublic = {
    id           : Text;
    niche        : Text;
    city         : Text;
    slug         : Text;
    headline     : Text;
    subheadline  : Text;
    painPoints   : [Text];
    benefits     : [Text];
    caseExample  : { before : Text; after : Text };
    pricingHint  : Text;
    createdAt    : Int;
    isPublished  : Bool;
  };

  public type SeoPageRequest = {
    niche : Text;
    city  : Text;
  };

  public type SeoCounters = {
    var nextSeoPageId : Nat;
  };

  // ── Onboarding Tour ──────────────────────────────────────────────────────────

  public type OnboardingTourState = {
    userId         : Text;
    completed      : Bool;
    currentStep    : Nat;
    completedSteps : [Nat];
    startedAt      : Int;
    completedAt    : ?Int;
    skipped        : Bool;
  };

  // Internal (mutable fields)
  public type OnboardingTourStateInternal = {
    userId             : Text;
    var completed      : Bool;
    var currentStep    : Nat;
    var completedSteps : [Nat];
    startedAt          : Int;
    var completedAt    : ?Int;
    var skipped        : Bool;
  };

  // ── Investor Report / PDF Export ─────────────────────────────────────────────

  public type InvestorReport = {
    generatedAt      : Int;
    mrr              : Nat;
    arr              : Nat;
    newMrr           : Nat;
    expansionMrr     : Nat;
    churnedMrr       : Nat;
    nrr              : Float;
    ltv              : Nat;
    cac              : Nat;
    ltvCacRatio      : Float;
    cacPaybackMonths : Float;
    monthlyChurnRate : Float;
    totalCustomers   : Nat;
    newCustomers     : Nat;
    churnedCustomers : Nat;
    cohortData       : [Text];
    funnelData       : [Text];
    healthAlerts     : [Text];
    disclaimers      : [Text];
  };

  // ── PageSpeed API ────────────────────────────────────────────────────────────

  public type PageSpeedResult = {
    url          : Text;
    mobileScore  : Nat;
    desktopScore : Nat;
    fcp          : Float;   // First Contentful Paint (s)
    lcp          : Float;   // Largest Contentful Paint (s)
    cls          : Float;   // Cumulative Layout Shift
    fid          : Float;   // First Input Delay (ms) — approximated from TBT
    tbt          : Float;   // Total Blocking Time (ms)
    tti          : Float;   // Time to Interactive (s)
    opportunities: [Text];
    diagnostics  : [Text];
    fetchedAt    : Int;
  };

};
