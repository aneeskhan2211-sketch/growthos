// Website Health & Growth Score — React hooks
// Wired to the real backend actor via submitAudit, getLatestAudit, etc.

import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useRef, useState } from "react";
import { createActor } from "../backend";
import type {
  AuditIssue as BackendAuditIssue,
  AuditRecord as BackendAuditRecord,
  CategoryScores as BackendCategoryScores,
  CompetitorRecord as BackendCompetitorRecord,
  MonitorRecord as BackendMonitorRecord,
  RawMetrics as BackendRawMetrics,
  WeeklyReportData as BackendWeeklyReportData,
} from "../backend";
import type {
  AuditIssue,
  AuditRecord,
  CWVRating,
  CategoryScores,
  CompetitorRecord,
  CoreWebVital,
  MonitorRecord,
  PageSpeedResult,
  RawMetrics,
  WeeklyReportData,
} from "../types/website-health";

// ─── Converters: backend bigint → frontend number ─────────────────────────────

function convertCategoryScores(b: BackendCategoryScores): CategoryScores {
  return {
    speed: Number(b.speed),
    seo: Number(b.seo),
    mobile: Number(b.mobile),
    content: Number(b.content),
    conversion: Number(b.conversion),
    security: Number(b.security),
  };
}

function convertRawMetrics(b: BackendRawMetrics): RawMetrics {
  return {
    hasTitle: b.hasTitle,
    titleLength: Number(b.titleLength),
    hasMetaDesc: b.hasMetaDesc,
    metaDescLength: Number(b.metaDescLength),
    hasH1: b.hasH1,
    hasCanonical: b.hasCanonical,
    robotsTxtFound: b.robotsTxtFound,
    sitemapFound: b.sitemapFound,
    hasViewport: b.hasViewport,
    httpsEnabled: b.httpsEnabled,
    hasMixedContent: b.hasMixedContent,
    hasHSTS: b.hasHSTS,
    hasXFrame: b.hasXFrame,
    hasXContentType: b.hasXContentType,
    hasWhatsAppLink: b.hasWhatsAppLink,
    hasPhoneNumber: b.hasPhoneNumber,
    hasContactForm: b.hasContactForm,
    hasCTA: b.hasCTA,
    hasGoogleMap: b.hasGoogleMap,
    imageCount: Number(b.imageCount),
    imagesMissingAlt: Number(b.imagesMissingAlt),
    hasBusinessName: b.hasBusinessName,
    hasAddress: b.hasAddress,
    hasOpeningHours: b.hasOpeningHours,
    hasTestimonials: b.hasTestimonials,
    internalLinkCount: Number(b.internalLinkCount),
    renderBlockingScripts: Number(b.renderBlockingScripts),
    hasMediaQueries: b.hasMediaQueries,
  };
}

function convertAuditIssue(b: BackendAuditIssue): AuditIssue {
  return {
    problem: b.problem,
    businessImpact: b.businessImpact,
    estimatedLossMin: Number(b.estimatedLossMin),
    estimatedLossMax: Number(b.estimatedLossMax),
    severity: b.severity as AuditIssue["severity"],
    fixCategory: b.fixCategory as AuditIssue["fixCategory"],
    difficulty: b.difficulty as AuditIssue["difficulty"],
    fixType: b.fixType as AuditIssue["fixType"],
    aiFixSuggestion: b.aiFixSuggestion,
  };
}

// ── PageSpeed helpers ────────────────────────────────────────────────

function rateMs(
  ms: number,
  goodThreshold: number,
  poorThreshold: number,
): CWVRating {
  if (ms <= goodThreshold) return "good";
  if (ms <= poorThreshold) return "needs-improvement";
  return "poor";
}

function rateCls(val: number): CWVRating {
  if (val <= 0.1) return "good";
  if (val <= 0.25) return "needs-improvement";
  return "poor";
}

function buildCoreWebVital(
  rawMs: number | undefined,
  rawDisplay: string | undefined,
  rater: (v: number) => CWVRating,
  fallbackLabel: string,
): CoreWebVital {
  const value = rawMs ?? 0;
  return {
    value,
    displayValue: rawDisplay ?? fallbackLabel,
    rating: rater(value),
  };
}

function parsePageSpeedApiResponse(
  data: Record<string, unknown>,
  urlScanned: string,
  strategy: "mobile" | "desktop",
): PageSpeedResult {
  const lhr = (data?.lighthouseResult as Record<string, unknown>) ?? {};
  const cats = (lhr?.categories as Record<string, unknown>) ?? {};
  const audits = (lhr?.audits as Record<string, unknown>) ?? {};

  const catPerf = (cats?.performance as Record<string, unknown>) ?? {};
  const mobileScore = Math.round(((catPerf?.score as number) ?? 0) * 100);
  const _desktopScore = strategy === "desktop" ? mobileScore : 0;

  function auditVal(key: string): number {
    const a = audits?.[key] as Record<string, unknown> | undefined;
    return (a?.numericValue as number | undefined) ?? 0;
  }
  function auditDisplay(key: string): string | undefined {
    const a = audits?.[key] as Record<string, unknown> | undefined;
    return a?.displayValue as string | undefined;
  }

  const fcpMs = auditVal("first-contentful-paint");
  const lcpMs = auditVal("largest-contentful-paint");
  const clsVal = auditVal("cumulative-layout-shift");
  const tbtMs = auditVal("total-blocking-time");

  return {
    url: urlScanned,
    mobileScore: strategy === "mobile" ? mobileScore : 0,
    desktopScore: strategy === "desktop" ? mobileScore : 0,
    fcp: buildCoreWebVital(
      fcpMs,
      auditDisplay("first-contentful-paint"),
      (v) => rateMs(v, 1800, 3000),
      "–",
    ),
    lcp: buildCoreWebVital(
      lcpMs,
      auditDisplay("largest-contentful-paint"),
      (v) => rateMs(v, 2500, 4000),
      "–",
    ),
    cls: buildCoreWebVital(
      clsVal,
      auditDisplay("cumulative-layout-shift"),
      rateCls,
      "–",
    ),
    tbt: buildCoreWebVital(
      tbtMs,
      auditDisplay("total-blocking-time"),
      (v) => rateMs(v, 200, 600),
      "–",
    ),
    fetchedAt: Date.now(),
    strategy,
  };
}

function convertCompetitor(b: BackendCompetitorRecord): CompetitorRecord {
  return {
    competitorName: b.competitorName,
    overallScore: Number(b.overallScore),
    speedScore: Number(b.speedScore),
    seoScore: Number(b.seoScore),
    mobileScore: Number(b.mobileScore),
    securityScore: Number(b.securityScore),
    conversionScore: Number(b.conversionScore),
    pageSpeedScore: undefined,
    lastScannedAt: Date.now(),
    scannedLive: false,
  };
}

function convertAuditRecord(b: BackendAuditRecord): AuditRecord {
  return {
    id: String(b.id),
    userId: String(b.userId),
    url: b.url,
    createdAt: Number(b.createdAt),
    overallScore: Number(b.overallScore),
    categoryScores: convertCategoryScores(b.categoryScores),
    issues: b.issues.map(convertAuditIssue),
    competitors: b.competitors.map(convertCompetitor),
    rawMetrics: b.rawMetrics ? convertRawMetrics(b.rawMetrics) : undefined,
    scanDurationMs: Number(b.scanDurationMs),
    monitorActive: b.monitorActive,
    lastMonitorScanAt: Number(b.lastMonitorScanAt),
  };
}

function convertMonitorRecord(b: BackendMonitorRecord): MonitorRecord {
  return {
    url: b.url,
    active: b.active,
    lastScanAt: Number(b.lastScanAt),
  };
}

function convertWeeklyReport(b: BackendWeeklyReportData): WeeklyReportData {
  return {
    latestScore: Number(b.latestScore),
    previousScore: Number(b.previousScore),
    scoreDelta: Number(b.scoreDelta),
    newIssueCount: Number(b.newIssueCount),
    resolvedIssueCount: Number(b.resolvedIssueCount),
    topRecommendation: b.topRecommendation,
    generatedAt: Number(b.generatedAt),
    url: b.url,
  };
}

// ─── Scan Step Labels ─────────────────────────────────────────────────────────

export const SCAN_STEPS = [
  "Fetching your website…",
  "Reading your content…",
  "Calculating your health score…",
  "Running Google PageSpeed check…",
] as const;

export type ScanStep = (typeof SCAN_STEPS)[number];

// ─── Hook Types ───────────────────────────────────────────────────────────────

export interface WebsiteHealthState {
  url: string;
  isScanning: boolean;
  scanStepIndex: number;
  latestAudit: AuditRecord | null;
  auditHistory: AuditRecord[];
  weeklyReport: WeeklyReportData | null;
  monitoredUrls: MonitorRecord[];
  rescanNeeded: boolean;
  error: string | null;
  pageSpeedResult: PageSpeedResult | null;
  isPageSpeedLoading: boolean;
}

export interface WebsiteHealthActions {
  scanWebsite: (inputUrl: string) => Promise<void>;
  refreshAudit: () => Promise<void>;
  clearResults: () => void;
  toggleMonitor: (inputUrl: string, active: boolean) => Promise<void>;
  fetchCompetitors: (
    competitorUrls: string[],
    yourUrl?: string,
  ) => Promise<CompetitorRecord[]>;
  trackEvent: (eventName: string, metadata?: string) => Promise<void>;
  runPageSpeedScan: (inputUrl: string) => Promise<PageSpeedResult | null>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWebsiteHealth(): WebsiteHealthState & WebsiteHealthActions {
  const { actor } = useActor(createActor);

  const [url, setUrl] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepIndex, setScanStepIndex] = useState<number>(0);
  const [latestAudit, setLatestAudit] = useState<AuditRecord | null>(null);
  const [auditHistory, setAuditHistory] = useState<AuditRecord[]>([]);
  const [weeklyReport, setWeeklyReport] = useState<WeeklyReportData | null>(
    null,
  );
  const [monitoredUrls, setMonitoredUrls] = useState<MonitorRecord[]>([]);
  const [rescanNeeded, setRescanNeeded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageSpeedResult, setPageSpeedResult] =
    useState<PageSpeedResult | null>(null);
  const [isPageSpeedLoading, setIsPageSpeedLoading] = useState<boolean>(false);

  const stepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Advance scanning step every 900ms through the 3-step animation
  const startStepAnimation = useCallback(() => {
    setScanStepIndex(0);
    let idx = 0;
    stepTimerRef.current = setInterval(() => {
      idx = Math.min(idx + 1, SCAN_STEPS.length - 1);
      setScanStepIndex(idx);
    }, 900);
  }, []);

  const stopStepAnimation = useCallback(() => {
    if (stepTimerRef.current) {
      clearInterval(stepTimerRef.current);
      stepTimerRef.current = null;
    }
  }, []);

  const trackEvent = useCallback(
    async (eventName: string, metadata = "") => {
      if (!actor) return;
      try {
        await actor.trackWebsiteHealthEvent(eventName, metadata);
      } catch {
        // analytics errors are non-fatal
      }
    },
    [actor],
  );

  const runScan = useCallback(
    async (inputUrl: string) => {
      const trimmed = inputUrl.trim();
      if (!trimmed) {
        setError("Please enter a website URL to scan.");
        return;
      }

      const withProtocol = /^https?:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed}`;
      try {
        new URL(withProtocol);
      } catch {
        setError("That doesn't look like a valid website address. Try again.");
        return;
      }

      setError(null);
      setPageSpeedResult(null);
      setIsScanning(true);
      startStepAnimation();

      await trackEvent("website_scan_started", withProtocol);

      try {
        let audit: AuditRecord;

        if (actor) {
          const raw = await actor.submitAudit(withProtocol);
          audit = convertAuditRecord(raw);
        } else {
          throw new Error("Actor not available. Please try again.");
        }

        setUrl(withProtocol);
        setLatestAudit(audit);
        setAuditHistory((prev) => [audit, ...prev].slice(0, 10));

        // Fetch history for trend chart
        try {
          if (actor) {
            const historyRaw = await actor.getAuditHistory(withProtocol);
            setAuditHistory(historyRaw.map(convertAuditRecord).slice(0, 10));
          }
        } catch {
          // history is non-fatal
        }

        // Fetch weekly report
        try {
          if (actor) {
            const reportRaw = await actor.getWeeklyReportData();
            if (reportRaw) setWeeklyReport(convertWeeklyReport(reportRaw));
          }
        } catch {
          // report is non-fatal
        }

        await trackEvent("website_scan_completed", withProtocol);

        // ── Auto-run PageSpeed scan after HTML scan completes ────────────────────
        setScanStepIndex(3);
        stopStepAnimation();
        setIsPageSpeedLoading(true);
        try {
          // Try backend runPageSpeedScan first (uses HTTP outcall)
          if (actor) {
            const backendFn = actor.runPageSpeedScan;
            if (typeof backendFn === "function") {
              const raw = await backendFn.call(actor, withProtocol);
              if (raw) {
                const result =
                  typeof raw === "object" && "ok" in raw
                    ? (raw as unknown as { ok: PageSpeedResult }).ok
                    : (raw as unknown as PageSpeedResult);
                setPageSpeedResult(result as PageSpeedResult);
                return;
              }
            }
          }
          // Fallback: call Google PageSpeed Insights directly from browser
          const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(withProtocol)}&strategy=mobile`;
          const resp = await fetch(psUrl);
          if (resp.ok) {
            const data = (await resp.json()) as Record<string, unknown>;
            const psResult = parsePageSpeedApiResponse(
              data,
              withProtocol,
              "mobile",
            );
            setPageSpeedResult(psResult);
          }
        } catch {
          // PageSpeed failures are non-fatal
        } finally {
          setIsPageSpeedLoading(false);
        }
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(message);
      } finally {
        stopStepAnimation();
        setIsScanning(false);
        setIsPageSpeedLoading(false);
      }
    },
    [actor, trackEvent, startStepAnimation, stopStepAnimation],
  );

  const refreshAudit = useCallback(async (): Promise<void> => {
    if (url) await runScan(url);
  }, [url, runScan]);

  const clearResults = useCallback((): void => {
    setUrl("");
    setLatestAudit(null);
    setAuditHistory([]);
    setWeeklyReport(null);
    setError(null);
    setRescanNeeded(false);
  }, []);

  const toggleMonitor = useCallback(
    async (inputUrl: string, active: boolean): Promise<void> => {
      if (!actor) return;
      try {
        if (active) {
          await actor.addMonitoredUrl(inputUrl);
        } else {
          await actor.updateMonitoredUrl(inputUrl, false);
        }
        // Refresh monitored list
        const updated = await actor.getMonitoredUrls();
        setMonitoredUrls(updated.map(convertMonitorRecord));

        // Check rescan
        const needRescan = await actor.getMonitoredUrlsNeedingRescan();
        setRescanNeeded(needRescan.length > 0);
      } catch {
        // monitor toggle errors are non-fatal
      }
    },
    [actor],
  );

  const runPageSpeedScan = useCallback(
    async (inputUrl: string): Promise<PageSpeedResult | null> => {
      setIsPageSpeedLoading(true);
      try {
        // Try backend method first
        if (actor) {
          const backendFn = actor.runPageSpeedScan;
          if (typeof backendFn === "function") {
            const raw = await backendFn.call(actor, inputUrl);
            if (raw) {
              const result =
                typeof raw === "object" && "ok" in raw
                  ? (raw as unknown as { ok: PageSpeedResult }).ok
                  : (raw as unknown as PageSpeedResult);
              setPageSpeedResult(result as PageSpeedResult);
              return result;
            }
          }
        }
        // Fallback: browser direct call
        const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(inputUrl)}&strategy=mobile`;
        const resp = await fetch(psUrl);
        if (!resp.ok) return null;
        const data = (await resp.json()) as Record<string, unknown>;
        const result = parsePageSpeedApiResponse(data, inputUrl, "mobile");
        setPageSpeedResult(result);
        return result;
      } catch {
        return null;
      } finally {
        setIsPageSpeedLoading(false);
      }
    },
    [actor],
  );

  const fetchCompetitors = useCallback(
    async (
      competitorUrls: string[],
      yourUrl?: string,
    ): Promise<CompetitorRecord[]> => {
      if (!actor || competitorUrls.length === 0) return [];
      try {
        // Try live competitor scan (runCompetitorScan) first
        const competitorScanFn = actor.runCompetitorScan;
        if (typeof competitorScanFn === "function" && yourUrl) {
          const raw = await competitorScanFn.call(
            actor,
            yourUrl,
            competitorUrls,
          );
          if (raw && Array.isArray(raw) && raw.length > 0) {
            return raw.map((c) => ({
              ...convertCompetitor(c as BackendCompetitorRecord),
              lastScannedAt: Date.now(),
              scannedLive: true,
            }));
          }
        }
        // Fallback: getCompetitorComparison
        const raw = await actor.getCompetitorComparison(competitorUrls);
        return raw.map((c) => ({
          ...convertCompetitor(c),
          lastScannedAt: Date.now(),
          scannedLive: false,
        }));
      } catch {
        return [];
      }
    },
    [actor],
  );

  return {
    url,
    isScanning,
    scanStepIndex,
    latestAudit,
    auditHistory,
    weeklyReport,
    monitoredUrls,
    rescanNeeded,
    error,
    pageSpeedResult,
    isPageSpeedLoading,
    scanWebsite: runScan,
    refreshAudit,
    clearResults,
    toggleMonitor,
    fetchCompetitors,
    trackEvent,
    runPageSpeedScan,
  };
}
