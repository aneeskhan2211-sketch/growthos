/**
 * pdfExport.ts
 * Shared PDF export utility using jsPDF's built-in text/drawing API.
 * No html2canvas, no DOM screenshots — fully programmatic layout.
 */
import { jsPDF } from "jspdf";
import type { SaasMetrics } from "../hooks/useSaasMetrics";
import { fmtINR, fmtLakhs } from "../hooks/useSaasMetrics";
import type { AuditRecord, CompetitorRecord } from "../types/website-health";

// ─── Color Palette ────────────────────────────────────────────────────────────
const C = {
  primary: [99, 102, 241] as [number, number, number], // #6366f1
  success: [34, 197, 94] as [number, number, number], // #22c55e
  warning: [245, 158, 11] as [number, number, number], // #f59e0b
  danger: [239, 68, 68] as [number, number, number], // #ef4444
  text: [30, 41, 59] as [number, number, number], // #1e293b
  muted: [100, 116, 139] as [number, number, number], // #64748b
  light: [241, 245, 249] as [number, number, number], // #f1f5f9
  border: [226, 232, 240] as [number, number, number], // #e2e8f0
  white: [255, 255, 255] as [number, number, number],
};

// ─── Page Geometry ────────────────────────────────────────────────────────────
const PAGE_W = 210;
const PAGE_H = 297;
const ML = 20; // margin left
const MR = 20; // margin right
const MT = 20; // margin top
const MB = 25; // margin bottom
const CONTENT_W = PAGE_W - ML - MR;
const BOTTOM_LIMIT = PAGE_H - MB - 6;

// ─── Cursor tracker ───────────────────────────────────────────────────────────
interface Ctx {
  doc: jsPDF;
  y: number;
  page: number;
}

function newCtx(doc: jsPDF): Ctx {
  return { doc, y: MT + 18, page: 1 }; // start below header
}

function checkPageBreak(ctx: Ctx, needed = 10): void {
  if (ctx.y + needed > BOTTOM_LIMIT) {
    ctx.doc.addPage();
    ctx.page++;
    ctx.y = MT + 10;
  }
}

// ─── Shared drawing helpers ───────────────────────────────────────────────────
export function addPageHeader(
  doc: jsPDF,
  title: string,
  subtitle?: string,
): void {
  // Header bar
  doc.setFillColor(...C.primary);
  doc.rect(0, 0, PAGE_W, 16, "F");

  // Logo text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...C.white);
  doc.text("GrowthOS", ML, 10);

  // Title
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(title, PAGE_W / 2, 10, { align: "center" });

  // Date on right
  if (subtitle) {
    doc.text(subtitle, PAGE_W - MR, 10, { align: "right" });
  }

  // Thin accent line below header
  doc.setDrawColor(...C.primary);
  doc.setLineWidth(0.3);
  doc.line(0, 16, PAGE_W, 16);
}

export function addFooter(doc: jsPDF, page: number, totalPages?: number): void {
  const y = PAGE_H - 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.muted);
  doc.text("Anees Chaudhary  |  +91 9324073833  |  GrowthOS", ML, y);
  const pageLabel = totalPages
    ? `Page ${page} of ${totalPages}`
    : `Page ${page}`;
  doc.text(pageLabel, PAGE_W - MR, y, { align: "right" });
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.2);
  doc.line(ML, y - 3, PAGE_W - MR, y - 3);
}

export function addSectionTitle(ctx: Ctx, text: string): void {
  checkPageBreak(ctx, 14);
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(11);
  ctx.doc.setTextColor(...C.primary);
  ctx.doc.text(text, ML, ctx.y);
  // underline
  const tw = ctx.doc.getTextWidth(text);
  ctx.doc.setDrawColor(...C.primary);
  ctx.doc.setLineWidth(0.4);
  ctx.doc.line(ML, ctx.y + 1.5, ML + tw, ctx.y + 1.5);
  ctx.y += 8;
}

export function addDivider(ctx: Ctx): void {
  checkPageBreak(ctx, 6);
  ctx.doc.setDrawColor(...C.border);
  ctx.doc.setLineWidth(0.2);
  ctx.doc.line(ML, ctx.y, PAGE_W - MR, ctx.y);
  ctx.y += 5;
}

export function addTextBlock(
  ctx: Ctx,
  text: string,
  fontSize = 8.5,
  color: [number, number, number] = C.muted,
): void {
  const lines = ctx.doc.splitTextToSize(text, CONTENT_W) as string[];
  checkPageBreak(ctx, lines.length * 4.5 + 2);
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(fontSize);
  ctx.doc.setTextColor(...color);
  ctx.doc.text(lines, ML, ctx.y);
  ctx.y += lines.length * 4.5 + 2;
}

export function addMetricCard(
  ctx: Ctx,
  label: string,
  value: string,
  sub?: string,
  highlight?: "success" | "warning" | "danger",
): void {
  const cardH = sub ? 18 : 14;
  checkPageBreak(ctx, cardH + 3);
  const x = ML;
  const w = CONTENT_W;

  // Card background
  ctx.doc.setFillColor(...C.light);
  ctx.doc.roundedRect(x, ctx.y, w, cardH, 2, 2, "F");
  ctx.doc.setDrawColor(...C.border);
  ctx.doc.setLineWidth(0.2);
  ctx.doc.roundedRect(x, ctx.y, w, cardH, 2, 2, "S");

  // Accent left bar
  const barColor =
    highlight === "success"
      ? C.success
      : highlight === "warning"
        ? C.warning
        : highlight === "danger"
          ? C.danger
          : C.primary;
  ctx.doc.setFillColor(...barColor);
  ctx.doc.rect(x, ctx.y, 2.5, cardH, "F");

  // Label
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(7.5);
  ctx.doc.setTextColor(...C.muted);
  ctx.doc.text(label, x + 6, ctx.y + 5.5);

  // Value
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(11);
  ctx.doc.setTextColor(...barColor);
  ctx.doc.text(value, x + 6, ctx.y + 11.5);

  // Sub
  if (sub) {
    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setFontSize(7);
    ctx.doc.setTextColor(...C.muted);
    ctx.doc.text(sub, x + 6, ctx.y + 16);
  }

  ctx.y += cardH + 3;
}

/** Render a small grid of KPI cards side by side (2–4 columns) */
function addKpiRow(
  ctx: Ctx,
  cards: Array<{
    label: string;
    value: string;
    sub?: string;
    highlight?: "success" | "warning" | "danger";
  }>,
): void {
  const n = cards.length;
  const gap = 3;
  const cardW = (CONTENT_W - gap * (n - 1)) / n;
  const cardH = 18;
  checkPageBreak(ctx, cardH + 4);

  cards.forEach((card, i) => {
    const x = ML + i * (cardW + gap);
    const barColor =
      card.highlight === "success"
        ? C.success
        : card.highlight === "warning"
          ? C.warning
          : card.highlight === "danger"
            ? C.danger
            : C.primary;

    ctx.doc.setFillColor(...C.light);
    ctx.doc.roundedRect(x, ctx.y, cardW, cardH, 2, 2, "F");
    ctx.doc.setDrawColor(...C.border);
    ctx.doc.setLineWidth(0.2);
    ctx.doc.roundedRect(x, ctx.y, cardW, cardH, 2, 2, "S");
    ctx.doc.setFillColor(...barColor);
    ctx.doc.rect(x, ctx.y, 2, cardH, "F");

    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setFontSize(7);
    ctx.doc.setTextColor(...C.muted);
    ctx.doc.text(card.label, x + 4, ctx.y + 5.5);

    ctx.doc.setFont("helvetica", "bold");
    ctx.doc.setFontSize(9.5);
    ctx.doc.setTextColor(...barColor);
    ctx.doc.text(card.value, x + 4, ctx.y + 12);

    if (card.sub) {
      ctx.doc.setFont("helvetica", "normal");
      ctx.doc.setFontSize(6.5);
      ctx.doc.setTextColor(...C.muted);
      const subLines = ctx.doc.splitTextToSize(card.sub, cardW - 6) as string[];
      ctx.doc.text(subLines[0], x + 4, ctx.y + 16.5);
    }
  });

  ctx.y += cardH + 4;
}

/** Simple two-column table */
function addTable(
  ctx: Ctx,
  headers: string[],
  rows: string[][],
  colWidths?: number[],
): void {
  const rowH = 7.5;
  const colW = colWidths ?? headers.map(() => CONTENT_W / headers.length);
  const tableH = (rows.length + 1) * rowH + 2;
  checkPageBreak(ctx, tableH);

  // Header row
  ctx.doc.setFillColor(...C.primary);
  ctx.doc.rect(ML, ctx.y, CONTENT_W, rowH, "F");
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(7.5);
  ctx.doc.setTextColor(...C.white);
  let xOff = ML + 2;
  headers.forEach((h, i) => {
    ctx.doc.text(h, xOff, ctx.y + 5);
    xOff += colW[i];
  });
  ctx.y += rowH;

  // Data rows
  rows.forEach((row, ri) => {
    const isEven = ri % 2 === 0;
    if (isEven) {
      ctx.doc.setFillColor(...C.light);
      ctx.doc.rect(ML, ctx.y, CONTENT_W, rowH, "F");
    }
    ctx.doc.setDrawColor(...C.border);
    ctx.doc.setLineWidth(0.15);
    ctx.doc.line(ML, ctx.y + rowH, ML + CONTENT_W, ctx.y + rowH);

    ctx.doc.setFont("helvetica", "normal");
    ctx.doc.setFontSize(7.5);
    ctx.doc.setTextColor(...C.text);
    let rx = ML + 2;
    row.forEach((cell, ci) => {
      // right-align numeric-looking cells in non-first columns
      if (ci > 0 && /^[₹\d%+\-.]/.test(cell.trim())) {
        ctx.doc.text(cell, rx + colW[ci] - 4, ctx.y + 5, { align: "right" });
      } else {
        ctx.doc.text(cell, rx, ctx.y + 5);
      }
      rx += colW[ci];
    });
    ctx.y += rowH;
  });

  ctx.y += 4;
}

/** Render a score bar (ASCII-style filled rectangle) */
function addScoreBar(
  ctx: Ctx,
  label: string,
  score: number,
  width = CONTENT_W,
): void {
  checkPageBreak(ctx, 8);
  const barMaxW = width * 0.45;
  const filledW = (score / 100) * barMaxW;
  const barY = ctx.y + 1;
  const barH = 4.5;

  const barColor = score >= 70 ? C.success : score >= 40 ? C.warning : C.danger;

  // Label
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(8);
  ctx.doc.setTextColor(...C.text);
  ctx.doc.text(label, ML, ctx.y + 4);

  // Track
  const barX = ML + 55;
  ctx.doc.setFillColor(...C.border);
  ctx.doc.roundedRect(barX, barY, barMaxW, barH, 1, 1, "F");

  // Fill
  if (filledW > 1) {
    ctx.doc.setFillColor(...barColor);
    ctx.doc.roundedRect(barX, barY, filledW, barH, 1, 1, "F");
  }

  // Score value
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(8);
  ctx.doc.setTextColor(...barColor);
  ctx.doc.text(`${score}/100`, barX + barMaxW + 4, ctx.y + 4);

  ctx.y += 8;
}

export function addIssueRow(
  ctx: Ctx,
  title: string,
  severity: string,
  impact: string,
  fix?: string,
): void {
  const rowH = fix ? 20 : 16;
  checkPageBreak(ctx, rowH + 3);

  const sevColor =
    severity === "Critical" || severity === "high"
      ? C.danger
      : severity === "Warning" || severity === "medium"
        ? C.warning
        : C.muted;

  // Card background
  ctx.doc.setFillColor(248, 250, 252);
  ctx.doc.roundedRect(ML, ctx.y, CONTENT_W, rowH, 2, 2, "F");
  ctx.doc.setDrawColor(...C.border);
  ctx.doc.setLineWidth(0.15);
  ctx.doc.roundedRect(ML, ctx.y, CONTENT_W, rowH, 2, 2, "S");

  // Severity bar
  ctx.doc.setFillColor(...sevColor);
  ctx.doc.rect(ML, ctx.y, 2.5, rowH, "F");

  // Severity badge
  const sevLabel =
    severity === "Critical"
      ? "HIGH"
      : severity === "Warning"
        ? "MEDIUM"
        : "LOW";
  ctx.doc.setFillColor(...sevColor);
  ctx.doc.roundedRect(PAGE_W - MR - 22, ctx.y + 2, 20, 6, 1, 1, "F");
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(6.5);
  ctx.doc.setTextColor(...C.white);
  ctx.doc.text(sevLabel, PAGE_W - MR - 12, ctx.y + 5.8, { align: "center" });

  // Title
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(8.5);
  ctx.doc.setTextColor(...C.text);
  const titleLines = ctx.doc.splitTextToSize(title, CONTENT_W - 30) as string[];
  ctx.doc.text(titleLines[0], ML + 5, ctx.y + 6.5);

  // Impact
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(7.5);
  ctx.doc.setTextColor(...C.muted);
  const impactLines = ctx.doc.splitTextToSize(
    impact,
    CONTENT_W - 10,
  ) as string[];
  ctx.doc.text(impactLines[0], ML + 5, ctx.y + 12);

  // Fix
  if (fix) {
    ctx.doc.setTextColor(...C.primary);
    ctx.doc.setFontSize(7);
    const fixLines = ctx.doc.splitTextToSize(
      `Fix: ${fix}`,
      CONTENT_W - 10,
    ) as string[];
    ctx.doc.text(fixLines[0], ML + 5, ctx.y + 17);
  }

  ctx.y += rowH + 2;
}

// ─── Helper: stamp all pages with headers + footers ──────────────────────────
function stampAllPages(
  doc: jsPDF,
  pageTitle: string,
  subtitle: string,
  totalPages: number,
): void {
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    addPageHeader(doc, pageTitle, subtitle);
    addFooter(doc, p, totalPages);
  }
}

// ─── Investor Report PDF ─────────────────────────────────────────────────────

export interface InvestorReportData {
  metrics: SaasMetrics;
  cohorts?: Array<{ label: string; d1: number; d7: number; d30: number }>;
  funnelSteps?: Array<{ name: string; count: number; pct: number }>;
  highlights?: string[];
  risks?: string[];
}

export function exportInvestorReportPDF(data: InvestorReportData): void {
  const { metrics } = data;
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const ctx = newCtx(doc);

  // ── Page 1 ── Revenue Snapshot ──────────────────────────────────────────────
  addSectionTitle(ctx, "Revenue Snapshot");

  addKpiRow(ctx, [
    {
      label: "MRR",
      value: fmtLakhs(metrics.mrr),
      sub: `+${fmtLakhs(metrics.newMrr)} new`,
    },
    { label: "ARR", value: fmtLakhs(metrics.arr) },
    {
      label: "NRR",
      value: `${metrics.nrr}%`,
      highlight: metrics.nrr >= 100 ? "success" : "warning",
    },
    {
      label: "Monthly Growth",
      value: `${metrics.monthlyGrowthRate.toFixed(1)}%`,
      highlight: "success",
    },
  ]);

  ctx.y += 2;
  addSectionTitle(ctx, "MRR Waterfall");
  addTable(
    ctx,
    ["Component", "Amount", "Change"],
    [
      [
        "Opening MRR",
        fmtINR(
          metrics.mrr -
            metrics.newMrr -
            metrics.expansionMrr +
            metrics.churnedMrr,
        ),
        "",
      ],
      ["+  New MRR", fmtINR(metrics.newMrr), "+"],
      ["+  Expansion MRR", fmtINR(metrics.expansionMrr), "+"],
      ["-  Churned MRR", fmtINR(metrics.churnedMrr), "-"],
      ["=  Closing MRR", fmtINR(metrics.closingMrr), ""],
    ],
    [90, 60, 20],
  );

  ctx.y += 2;
  addSectionTitle(ctx, "Unit Economics");

  // LTV:CAC ratio
  const ltvCacStatus =
    metrics.ltvCacRatio >= 3
      ? "Healthy (≥3x)"
      : metrics.ltvCacRatio >= 1
        ? "Watch (1–3x)"
        : "Critical (<1x)";
  const ltvCacHL =
    metrics.ltvCacRatio >= 3
      ? "success"
      : metrics.ltvCacRatio >= 1
        ? "warning"
        : ("danger" as "success" | "warning" | "danger");

  addKpiRow(ctx, [
    {
      label: "CAC",
      value: fmtINR(metrics.cac),
      sub: `${metrics.cacByChannel.newPaidCustomers} new customers`,
    },
    { label: "LTV", value: fmtINR(metrics.ltv) },
    {
      label: "LTV:CAC Ratio",
      value: `${metrics.ltvCacRatio.toFixed(2)}x`,
      sub: ltvCacStatus,
      highlight: ltvCacHL,
    },
    {
      label: "CAC Payback",
      value: `${metrics.cacPaybackMonths.toFixed(1)} mo`,
      sub: "Months to recover",
    },
  ]);

  ctx.y += 2;
  addSectionTitle(ctx, "CAC by Channel");
  const totalSpend = metrics.cacByChannel.totalSpend;
  addTable(
    ctx,
    ["Channel", "Spend", "Share"],
    [
      [
        "Google Ads",
        fmtINR(metrics.cacByChannel.googleAds),
        totalSpend > 0
          ? `${((metrics.cacByChannel.googleAds / totalSpend) * 100).toFixed(1)}%`
          : "0%",
      ],
      [
        "Meta Ads",
        fmtINR(metrics.cacByChannel.metaAds),
        totalSpend > 0
          ? `${((metrics.cacByChannel.metaAds / totalSpend) * 100).toFixed(1)}%`
          : "0%",
      ],
      [
        "Referral",
        fmtINR(metrics.cacByChannel.referral),
        totalSpend > 0
          ? `${((metrics.cacByChannel.referral / totalSpend) * 100).toFixed(1)}%`
          : "0%",
      ],
      [
        "Other",
        fmtINR(metrics.cacByChannel.other),
        totalSpend > 0
          ? `${((metrics.cacByChannel.other / totalSpend) * 100).toFixed(1)}%`
          : "0%",
      ],
      ["Total", fmtINR(totalSpend), "100%"],
    ],
    [80, 60, 30],
  );

  // ── Page 2 ── Customer Metrics + Retention ──────────────────────────────────
  doc.addPage();
  ctx.page++;
  ctx.y = MT + 18;

  addSectionTitle(ctx, "Customer Metrics");
  addKpiRow(ctx, [
    {
      label: "Total Paying",
      value: metrics.totalPayingCustomers.toLocaleString("en-IN"),
      sub: "Active subscriptions",
    },
    {
      label: "New This Month",
      value: `+${metrics.newCustomers}`,
      highlight: "success",
      sub: "New paid sign-ups",
    },
    {
      label: "Churned This Month",
      value: metrics.churnedCustomers.toString(),
      highlight: metrics.churnedCustomers > 10 ? "danger" : undefined,
      sub: "Cancelled subscriptions",
    },
    {
      label: "Active Users",
      value: metrics.activeUsers.toLocaleString("en-IN"),
      sub: "vs paying users",
    },
  ]);

  ctx.y += 2;
  addSectionTitle(ctx, "Churn & Retention");
  addKpiRow(ctx, [
    {
      label: "Monthly Churn Rate",
      value: `${metrics.monthlyChurnRate.toFixed(1)}%`,
      sub:
        metrics.monthlyChurnRate <= 3
          ? "Below 3% benchmark"
          : "Above 3% — action needed",
      highlight: metrics.monthlyChurnRate <= 3 ? "success" : "warning",
    },
    {
      label: "Revenue Churn Rate",
      value: `${metrics.revenueChurnRate.toFixed(1)}%`,
      sub: "Revenue lost from churn",
    },
    {
      label: "ARPU",
      value: fmtINR(metrics.arpu),
      sub: "Avg revenue per user",
    },
  ]);

  // Cohort table
  if (data.cohorts && data.cohorts.length > 0) {
    ctx.y += 2;
    addSectionTitle(ctx, "Retention Cohorts");
    addTable(
      ctx,
      ["Cohort", "Day 1", "Day 7", "Day 30"],
      data.cohorts
        .slice(0, 6)
        .map((c) => [c.label, `${c.d1}%`, `${c.d7}%`, `${c.d30}%`]),
      [70, 40, 40, 20],
    );
  }

  // Funnel table
  if (data.funnelSteps && data.funnelSteps.length > 0) {
    ctx.y += 2;
    addSectionTitle(ctx, "Acquisition Funnel");
    addTable(
      ctx,
      ["Step", "Users", "Conversion %"],
      data.funnelSteps.map((s) => [
        s.name,
        s.count.toLocaleString("en-IN"),
        `${s.pct}%`,
      ]),
      [80, 50, 40],
    );
  }

  // Disclaimer
  checkPageBreak(ctx, 20);
  ctx.y += 4;
  addDivider(ctx);
  addTextBlock(
    ctx,
    "Disclaimer: Revenue figures are based on subscription event data recorded in the platform. " +
      "CAC is based on manually entered marketing spend. LTV is estimated using tier-weighted ARPU and monthly churn rate. " +
      "Metrics calculated from subscription events. Results depend on execution and market conditions. " +
      "This report is for informational purposes only and does not constitute financial advice.",
    7.5,
    C.muted,
  );

  // Stamp headers + footers on all pages
  const totalPages = doc.getNumberOfPages();
  stampAllPages(doc, "Investor Report", dateStr, totalPages);

  // Download
  const fileName = `investor-report-${now.toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
}

// ─── Website Health PDF ───────────────────────────────────────────────────────

export interface WebsiteHealthExportData {
  audit: AuditRecord;
  competitors?: CompetitorRecord[];
}

export function exportWebsiteHealthPDF(data: WebsiteHealthExportData): void {
  const { audit } = data;
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Domain name for filename
  let domain = audit.url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0];
  if (!domain) domain = "website";

  const ctx = newCtx(doc);

  // ── Page 1 ── Overview ──────────────────────────────────────────────────────
  // Scanned URL subtitle
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(8);
  ctx.doc.setTextColor(...C.muted);
  ctx.doc.text(`Scanned: ${audit.url}`, ML, ctx.y - 2);
  ctx.y += 2;

  // Overall Score prominent display
  const scoreColor =
    audit.overallScore >= 70
      ? C.success
      : audit.overallScore >= 40
        ? C.warning
        : C.danger;
  ctx.doc.setFillColor(...scoreColor);
  ctx.doc.circle(ML + 15, ctx.y + 15, 14, "F");
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(18);
  ctx.doc.setTextColor(...C.white);
  ctx.doc.text(audit.overallScore.toString(), ML + 15, ctx.y + 16.5, {
    align: "center",
  });
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(7);
  ctx.doc.text("/100", ML + 15, ctx.y + 22, { align: "center" });

  // Score label
  ctx.doc.setFont("helvetica", "bold");
  ctx.doc.setFontSize(14);
  ctx.doc.setTextColor(...C.text);
  ctx.doc.text("Website Health Score", ML + 34, ctx.y + 14);
  const scoreLabel =
    audit.overallScore >= 70
      ? "Good — Keep improving"
      : audit.overallScore >= 40
        ? "Needs Attention"
        : "Critical Issues Found";
  ctx.doc.setFont("helvetica", "normal");
  ctx.doc.setFontSize(9);
  ctx.doc.setTextColor(...scoreColor);
  ctx.doc.text(scoreLabel, ML + 34, ctx.y + 21);
  ctx.y += 36;

  // Category scores
  addSectionTitle(ctx, "Category Breakdown");
  const categories: Array<[string, number]> = [
    ["Page Speed", audit.categoryScores.speed],
    ["Search Visibility (SEO)", audit.categoryScores.seo],
    ["Mobile Experience", audit.categoryScores.mobile],
    ["Content Quality", audit.categoryScores.content],
    ["Conversion", audit.categoryScores.conversion],
    ["Security", audit.categoryScores.security],
  ];
  for (const [label, score] of categories) {
    addScoreBar(ctx, label, score);
  }

  // Business impact summary
  ctx.y += 2;
  addSectionTitle(ctx, "Business Impact Summary");
  const criticalIssues = audit.issues.filter((i) => i.severity === "Critical");
  if (criticalIssues.length > 0) {
    addTextBlock(
      ctx,
      "Your website may be losing enquiries because:",
      8.5,
      C.text,
    );
    for (const issue of criticalIssues.slice(0, 4)) {
      addTextBlock(ctx, `  • ${issue.businessImpact}`, 8, C.danger);
    }
    addTextBlock(
      ctx,
      "* Impact is estimated based on website signals, not guaranteed results.",
      7.5,
      C.muted,
    );
  } else {
    addTextBlock(
      ctx,
      "No critical issues were found. Continue monitoring to maintain your score.",
      8.5,
      C.success,
    );
  }

  // ── Page 2+ ── Issue List ──────────────────────────────────────────────────
  if (audit.issues.length > 0) {
    doc.addPage();
    ctx.page++;
    ctx.y = MT + 18;

    addSectionTitle(ctx, "Issues — High Priority First");

    // Sort: Critical first, then Warning, then Minor
    const sorted = [...audit.issues].sort((a, b) => {
      const order = { Critical: 0, Warning: 1, Minor: 2 };
      return order[a.severity] - order[b.severity];
    });

    for (const issue of sorted) {
      addIssueRow(
        ctx,
        issue.problem,
        issue.severity,
        issue.businessImpact,
        issue.aiFixSuggestion ? issue.aiFixSuggestion.split(".")[0] : undefined,
      );
    }
  }

  // ── Competitor Comparison ─────────────────────────────────────────────────
  if (data.competitors && data.competitors.length > 0) {
    doc.addPage();
    ctx.page++;
    ctx.y = MT + 18;

    addSectionTitle(ctx, "Competitor Comparison");
    const headers = [
      "Metric",
      "You",
      ...data.competitors.map((c, i) => c.competitorName || `Comp ${i + 1}`),
    ];
    const colW = [
      50,
      ...Array(headers.length - 1).fill(
        (CONTENT_W - 50) / (headers.length - 1),
      ),
    ];
    const metricKeys: Array<[string, keyof CompetitorRecord | "overall"]> = [
      ["Overall Score", "overallScore"],
      ["Page Speed", "speedScore"],
      ["SEO", "seoScore"],
      ["Mobile", "mobileScore"],
      ["Security", "securityScore"],
      ["Conversion", "conversionScore"],
    ];
    const tableRows = metricKeys.map(([label, key]) => {
      const userVal =
        key === "overallScore"
          ? audit.overallScore
          : key === "speedScore"
            ? audit.categoryScores.speed
            : key === "seoScore"
              ? audit.categoryScores.seo
              : key === "mobileScore"
                ? audit.categoryScores.mobile
                : key === "securityScore"
                  ? audit.categoryScores.security
                  : audit.categoryScores.conversion;
      const compVals = data.competitors!.map((c) =>
        String(c[key as keyof CompetitorRecord] ?? "—"),
      );
      return [label, String(userVal), ...compVals];
    });
    addTable(ctx, headers, tableRows, colW);
  }

  // Disclaimer footer section
  checkPageBreak(ctx, 20);
  ctx.y += 4;
  addDivider(ctx);
  addTextBlock(
    ctx,
    "Impact estimates are based on website signals, not guaranteed results. " +
      "Scores reflect our analysis of publicly accessible website signals. " +
      "Results depend on your website, location, and offer.",
    7.5,
    C.muted,
  );

  // Stamp headers + footers on all pages
  const totalPages = doc.getNumberOfPages();
  const subtitle = `${domain}  ·  ${dateStr}`;
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    addPageHeader(doc, "Website Health Report", subtitle);
    addFooter(doc, p, totalPages);
  }

  // Download
  const fileName = `website-health-${domain}.pdf`;
  doc.save(fileName);
}
