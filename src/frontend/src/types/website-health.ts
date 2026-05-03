// Website Health & Growth Score — frontend types
// Mirrors the backend contract. All bigint fields from backend are converted to
// number at the hook layer so the UI works cleanly with plain JS numbers.

// ── Re-exported backend enums ─────────────────────────────────────────────────
// Import from backend for type-safe comparisons

export type IssueSeverity = "Critical" | "Warning" | "Minor";
export type FixCategory =
  | "WhatsApp"
  | "Speed"
  | "Seo"
  | "Cta"
  | "Content"
  | "Security"
  | "Mobile"
  | "Images";
export type FixDifficulty = "Easy" | "Medium" | "Hard";
export type FixType = "one_click" | "guided" | "developer_needed";
// ── PageSpeed / Core Web Vitals Types ────────────────────────────────────────

export type CWVRating = "good" | "needs-improvement" | "poor";

export interface CoreWebVital {
  value: number;
  displayValue: string;
  rating: CWVRating;
}

export interface PageSpeedResult {
  url: string;
  mobileScore: number;
  desktopScore: number;
  fcp: CoreWebVital; // First Contentful Paint
  lcp: CoreWebVital; // Largest Contentful Paint
  cls: CoreWebVital; // Cumulative Layout Shift
  tbt: CoreWebVital; // Total Blocking Time
  fetchedAt: number; // ms timestamp
  strategy: "mobile" | "desktop";
}

// ── Score Types ───────────────────────────────────────────────────────────────

export interface CategoryScores {
  speed: number;
  seo: number;
  mobile: number;
  content: number;
  conversion: number;
  security: number;
}

// ── Raw Metrics ───────────────────────────────────────────────────────────────

export interface RawMetrics {
  hasTitle: boolean;
  titleLength: number;
  hasMetaDesc: boolean;
  metaDescLength: number;
  hasH1: boolean;
  hasCanonical: boolean;
  robotsTxtFound: boolean;
  sitemapFound: boolean;
  hasViewport: boolean;
  httpsEnabled: boolean;
  hasMixedContent: boolean;
  hasHSTS: boolean;
  hasXFrame: boolean;
  hasXContentType: boolean;
  hasWhatsAppLink: boolean;
  hasPhoneNumber: boolean;
  hasContactForm: boolean;
  hasCTA: boolean;
  hasGoogleMap: boolean;
  imageCount: number;
  imagesMissingAlt: number;
  hasBusinessName: boolean;
  hasAddress: boolean;
  hasOpeningHours: boolean;
  hasTestimonials: boolean;
  internalLinkCount: number;
  renderBlockingScripts: number;
  hasMediaQueries: boolean;
}

// ── Issue Types ───────────────────────────────────────────────────────────────

export interface AuditIssue {
  problem: string;
  businessImpact: string;
  estimatedLossMin: number;
  estimatedLossMax: number;
  severity: IssueSeverity;
  fixCategory: FixCategory;
  difficulty: FixDifficulty;
  fixType: FixType;
  aiFixSuggestion: string;
}

// ── Competitor Types ──────────────────────────────────────────────────────────

export interface CompetitorRecord {
  pageSpeedScore?: number;
  lastScannedAt?: number;
  scannedLive?: boolean;

  competitorName: string;
  overallScore: number;
  speedScore: number;
  seoScore: number;
  mobileScore: number;
  securityScore: number;
  conversionScore: number;
}

// ── Monitor Types ─────────────────────────────────────────────────────────────

export interface MonitorRecord {
  url: string;
  active: boolean;
  lastScanAt: number; // ms timestamp
}

// ── Audit Record ──────────────────────────────────────────────────────────────

export type AuditId = string;

export interface AuditRecord {
  id: AuditId;
  userId: string;
  url: string;
  createdAt: number;
  overallScore: number;
  categoryScores: CategoryScores;
  issues: AuditIssue[];
  competitors: CompetitorRecord[];
  rawMetrics?: RawMetrics;
  scanDurationMs: number;
  monitorActive: boolean;
  lastMonitorScanAt: number;
}

// ── Weekly Report ─────────────────────────────────────────────────────────────

export interface WeeklyReportData {
  latestScore: number;
  previousScore: number;
  scoreDelta: number;
  newIssueCount: number;
  resolvedIssueCount: number;
  topRecommendation: string;
  generatedAt: number;
  url: string;
}
