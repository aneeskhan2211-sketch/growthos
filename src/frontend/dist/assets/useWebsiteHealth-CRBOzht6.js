import { c as createLucideIcon, u as useActor, r as reactExports, e as createActor } from "./index-DcPx_5wo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
function convertCategoryScores(b) {
  return {
    speed: Number(b.speed),
    seo: Number(b.seo),
    mobile: Number(b.mobile),
    content: Number(b.content),
    conversion: Number(b.conversion),
    security: Number(b.security)
  };
}
function convertRawMetrics(b) {
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
    hasMediaQueries: b.hasMediaQueries
  };
}
function convertAuditIssue(b) {
  return {
    problem: b.problem,
    businessImpact: b.businessImpact,
    estimatedLossMin: Number(b.estimatedLossMin),
    estimatedLossMax: Number(b.estimatedLossMax),
    severity: b.severity,
    fixCategory: b.fixCategory,
    difficulty: b.difficulty,
    fixType: b.fixType,
    aiFixSuggestion: b.aiFixSuggestion
  };
}
function rateMs(ms, goodThreshold, poorThreshold) {
  if (ms <= goodThreshold) return "good";
  if (ms <= poorThreshold) return "needs-improvement";
  return "poor";
}
function rateCls(val) {
  if (val <= 0.1) return "good";
  if (val <= 0.25) return "needs-improvement";
  return "poor";
}
function buildCoreWebVital(rawMs, rawDisplay, rater, fallbackLabel) {
  const value = rawMs ?? 0;
  return {
    value,
    displayValue: rawDisplay ?? fallbackLabel,
    rating: rater(value)
  };
}
function parsePageSpeedApiResponse(data, urlScanned, strategy) {
  const lhr = (data == null ? void 0 : data.lighthouseResult) ?? {};
  const cats = (lhr == null ? void 0 : lhr.categories) ?? {};
  const audits = (lhr == null ? void 0 : lhr.audits) ?? {};
  const catPerf = (cats == null ? void 0 : cats.performance) ?? {};
  const mobileScore = Math.round(((catPerf == null ? void 0 : catPerf.score) ?? 0) * 100);
  function auditVal(key) {
    const a = audits == null ? void 0 : audits[key];
    return (a == null ? void 0 : a.numericValue) ?? 0;
  }
  function auditDisplay(key) {
    const a = audits == null ? void 0 : audits[key];
    return a == null ? void 0 : a.displayValue;
  }
  const fcpMs = auditVal("first-contentful-paint");
  const lcpMs = auditVal("largest-contentful-paint");
  const clsVal = auditVal("cumulative-layout-shift");
  const tbtMs = auditVal("total-blocking-time");
  return {
    url: urlScanned,
    mobileScore,
    desktopScore: 0,
    fcp: buildCoreWebVital(
      fcpMs,
      auditDisplay("first-contentful-paint"),
      (v) => rateMs(v, 1800, 3e3),
      "–"
    ),
    lcp: buildCoreWebVital(
      lcpMs,
      auditDisplay("largest-contentful-paint"),
      (v) => rateMs(v, 2500, 4e3),
      "–"
    ),
    cls: buildCoreWebVital(
      clsVal,
      auditDisplay("cumulative-layout-shift"),
      rateCls,
      "–"
    ),
    tbt: buildCoreWebVital(
      tbtMs,
      auditDisplay("total-blocking-time"),
      (v) => rateMs(v, 200, 600),
      "–"
    ),
    fetchedAt: Date.now(),
    strategy
  };
}
function convertCompetitor(b) {
  return {
    competitorName: b.competitorName,
    overallScore: Number(b.overallScore),
    speedScore: Number(b.speedScore),
    seoScore: Number(b.seoScore),
    mobileScore: Number(b.mobileScore),
    securityScore: Number(b.securityScore),
    conversionScore: Number(b.conversionScore),
    pageSpeedScore: void 0,
    lastScannedAt: Date.now(),
    scannedLive: false
  };
}
function convertAuditRecord(b) {
  return {
    id: String(b.id),
    userId: String(b.userId),
    url: b.url,
    createdAt: Number(b.createdAt),
    overallScore: Number(b.overallScore),
    categoryScores: convertCategoryScores(b.categoryScores),
    issues: b.issues.map(convertAuditIssue),
    competitors: b.competitors.map(convertCompetitor),
    rawMetrics: b.rawMetrics ? convertRawMetrics(b.rawMetrics) : void 0,
    scanDurationMs: Number(b.scanDurationMs),
    monitorActive: b.monitorActive,
    lastMonitorScanAt: Number(b.lastMonitorScanAt)
  };
}
function convertMonitorRecord(b) {
  return {
    url: b.url,
    active: b.active,
    lastScanAt: Number(b.lastScanAt)
  };
}
function convertWeeklyReport(b) {
  return {
    latestScore: Number(b.latestScore),
    previousScore: Number(b.previousScore),
    scoreDelta: Number(b.scoreDelta),
    newIssueCount: Number(b.newIssueCount),
    resolvedIssueCount: Number(b.resolvedIssueCount),
    topRecommendation: b.topRecommendation,
    generatedAt: Number(b.generatedAt),
    url: b.url
  };
}
const SCAN_STEPS = [
  "Fetching your website…",
  "Reading your content…",
  "Calculating your health score…",
  "Running Google PageSpeed check…"
];
function useWebsiteHealth() {
  const { actor } = useActor(createActor);
  const [url, setUrl] = reactExports.useState("");
  const [isScanning, setIsScanning] = reactExports.useState(false);
  const [scanStepIndex, setScanStepIndex] = reactExports.useState(0);
  const [latestAudit, setLatestAudit] = reactExports.useState(null);
  const [auditHistory, setAuditHistory] = reactExports.useState([]);
  const [weeklyReport, setWeeklyReport] = reactExports.useState(
    null
  );
  const [monitoredUrls, setMonitoredUrls] = reactExports.useState([]);
  const [rescanNeeded, setRescanNeeded] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [pageSpeedResult, setPageSpeedResult] = reactExports.useState(null);
  const [isPageSpeedLoading, setIsPageSpeedLoading] = reactExports.useState(false);
  const stepTimerRef = reactExports.useRef(null);
  const startStepAnimation = reactExports.useCallback(() => {
    setScanStepIndex(0);
    let idx = 0;
    stepTimerRef.current = setInterval(() => {
      idx = Math.min(idx + 1, SCAN_STEPS.length - 1);
      setScanStepIndex(idx);
    }, 900);
  }, []);
  const stopStepAnimation = reactExports.useCallback(() => {
    if (stepTimerRef.current) {
      clearInterval(stepTimerRef.current);
      stepTimerRef.current = null;
    }
  }, []);
  const trackEvent = reactExports.useCallback(
    async (eventName, metadata = "") => {
      if (!actor) return;
      try {
        await actor.trackWebsiteHealthEvent(eventName, metadata);
      } catch {
      }
    },
    [actor]
  );
  const runScan = reactExports.useCallback(
    async (inputUrl) => {
      const trimmed = inputUrl.trim();
      if (!trimmed) {
        setError("Please enter a website URL to scan.");
        return;
      }
      const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
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
        let audit;
        if (actor) {
          const raw = await actor.submitAudit(withProtocol);
          audit = convertAuditRecord(raw);
        } else {
          throw new Error("Actor not available. Please try again.");
        }
        setUrl(withProtocol);
        setLatestAudit(audit);
        setAuditHistory((prev) => [audit, ...prev].slice(0, 10));
        try {
          if (actor) {
            const historyRaw = await actor.getAuditHistory(withProtocol);
            setAuditHistory(historyRaw.map(convertAuditRecord).slice(0, 10));
          }
        } catch {
        }
        try {
          if (actor) {
            const reportRaw = await actor.getWeeklyReportData();
            if (reportRaw) setWeeklyReport(convertWeeklyReport(reportRaw));
          }
        } catch {
        }
        await trackEvent("website_scan_completed", withProtocol);
        setScanStepIndex(3);
        stopStepAnimation();
        setIsPageSpeedLoading(true);
        try {
          if (actor) {
            const backendFn = actor.runPageSpeedScan;
            if (typeof backendFn === "function") {
              const raw = await backendFn.call(actor, withProtocol);
              if (raw) {
                const result = typeof raw === "object" && "ok" in raw ? raw.ok : raw;
                setPageSpeedResult(result);
                return;
              }
            }
          }
          const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(withProtocol)}&strategy=mobile`;
          const resp = await fetch(psUrl);
          if (resp.ok) {
            const data = await resp.json();
            const psResult = parsePageSpeedApiResponse(
              data,
              withProtocol,
              "mobile"
            );
            setPageSpeedResult(psResult);
          }
        } catch {
        } finally {
          setIsPageSpeedLoading(false);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
      } finally {
        stopStepAnimation();
        setIsScanning(false);
        setIsPageSpeedLoading(false);
      }
    },
    [actor, trackEvent, startStepAnimation, stopStepAnimation]
  );
  const refreshAudit = reactExports.useCallback(async () => {
    if (url) await runScan(url);
  }, [url, runScan]);
  const clearResults = reactExports.useCallback(() => {
    setUrl("");
    setLatestAudit(null);
    setAuditHistory([]);
    setWeeklyReport(null);
    setError(null);
    setRescanNeeded(false);
  }, []);
  const toggleMonitor = reactExports.useCallback(
    async (inputUrl, active) => {
      if (!actor) return;
      try {
        if (active) {
          await actor.addMonitoredUrl(inputUrl);
        } else {
          await actor.updateMonitoredUrl(inputUrl, false);
        }
        const updated = await actor.getMonitoredUrls();
        setMonitoredUrls(updated.map(convertMonitorRecord));
        const needRescan = await actor.getMonitoredUrlsNeedingRescan();
        setRescanNeeded(needRescan.length > 0);
      } catch {
      }
    },
    [actor]
  );
  const runPageSpeedScan = reactExports.useCallback(
    async (inputUrl) => {
      setIsPageSpeedLoading(true);
      try {
        if (actor) {
          const backendFn = actor.runPageSpeedScan;
          if (typeof backendFn === "function") {
            const raw = await backendFn.call(actor, inputUrl);
            if (raw) {
              const result2 = typeof raw === "object" && "ok" in raw ? raw.ok : raw;
              setPageSpeedResult(result2);
              return result2;
            }
          }
        }
        const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(inputUrl)}&strategy=mobile`;
        const resp = await fetch(psUrl);
        if (!resp.ok) return null;
        const data = await resp.json();
        const result = parsePageSpeedApiResponse(data, inputUrl, "mobile");
        setPageSpeedResult(result);
        return result;
      } catch {
        return null;
      } finally {
        setIsPageSpeedLoading(false);
      }
    },
    [actor]
  );
  const fetchCompetitors = reactExports.useCallback(
    async (competitorUrls, yourUrl) => {
      if (!actor || competitorUrls.length === 0) return [];
      try {
        const competitorScanFn = actor.runCompetitorScan;
        if (typeof competitorScanFn === "function" && yourUrl) {
          const raw2 = await competitorScanFn.call(
            actor,
            yourUrl,
            competitorUrls
          );
          if (raw2 && Array.isArray(raw2) && raw2.length > 0) {
            return raw2.map((c) => ({
              ...convertCompetitor(c),
              lastScannedAt: Date.now(),
              scannedLive: true
            }));
          }
        }
        const raw = await actor.getCompetitorComparison(competitorUrls);
        return raw.map((c) => ({
          ...convertCompetitor(c),
          lastScannedAt: Date.now(),
          scannedLive: false
        }));
      } catch {
        return [];
      }
    },
    [actor]
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
    runPageSpeedScan
  };
}
export {
  CircleCheckBig as C,
  SCAN_STEPS as S,
  useWebsiteHealth as u
};
