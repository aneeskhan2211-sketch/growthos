import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type CohortRow,
  type FunnelStepRow,
  useGenerateInvestorReport,
  useLatestInvestorReport,
} from "../hooks/useInvestorReport";
import { fmtINR, fmtLakhs } from "../hooks/useSaasMetrics";
import { useSaasMetrics } from "../hooks/useSaasMetrics";
import { exportInvestorReportPDF } from "../utils/pdfExport";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LTV_CAC_STATUS = {
  healthy: {
    label: "Healthy (≥3x)",
    cls: "text-success border-success/30 bg-success/5 print:border-green-600 print:text-green-700",
  },
  watch: {
    label: "Watch (1–3x)",
    cls: "text-warning border-warning/30 bg-warning/5 print:border-yellow-600 print:text-yellow-700",
  },
  critical: {
    label: "Critical (<1x)",
    cls: "text-destructive border-destructive/30 bg-destructive/5 print:border-red-600 print:text-red-700",
  },
};

function ltvCacStatus(ratio: number): keyof typeof LTV_CAC_STATUS {
  if (ratio >= 3) return "healthy";
  if (ratio >= 1) return "watch";
  return "critical";
}

const DISCLAIMERS = [
  "Revenue figures are based on subscription event data recorded in the platform.",
  "CAC is based on manually entered marketing spend.",
  "LTV is estimated using tier-weighted ARPU and monthly churn rate.",
  "This report is for informational purposes only and does not constitute financial advice.",
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionTitle({
  children,
  icon,
}: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3 print:mb-2">
      {icon && <span className="text-primary print:text-blue-600">{icon}</span>}
      <h2 className="text-base font-semibold text-foreground print:text-black">
        {children}
      </h2>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  highlight,
  ocid,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: "success" | "warning" | "destructive";
  ocid?: string;
}) {
  return (
    <Card
      className="p-4 print:border print:border-gray-200 print:shadow-none print:p-3"
      data-ocid={ocid}
    >
      <p className="text-xs text-muted-foreground print:text-gray-500">
        {label}
      </p>
      <p
        className={cn(
          "text-xl font-bold mt-0.5 print:text-black",
          highlight === "success" && "text-success",
          highlight === "warning" && "text-warning",
          highlight === "destructive" && "text-destructive",
          !highlight && "text-foreground",
        )}
      >
        {value}
      </p>
      {sub && (
        <p className="text-xs text-muted-foreground mt-0.5 print:text-gray-500">
          {sub}
        </p>
      )}
    </Card>
  );
}

function AlertRow({
  severity,
  message,
}: { severity: string; message: string }) {
  const isRed = severity === "critical";
  const isOrange = severity === "warning";
  return (
    <div
      className={cn(
        "flex items-start gap-2 p-2.5 rounded-lg border text-sm print:border print:rounded",
        isRed &&
          "bg-destructive/5 border-destructive/20 text-destructive print:border-red-300 print:text-red-700 print:bg-red-50",
        isOrange &&
          "bg-warning/5 border-warning/20 text-warning print:border-yellow-300 print:text-yellow-700 print:bg-yellow-50",
        !isRed &&
          !isOrange &&
          "bg-success/5 border-success/20 text-success print:border-green-300 print:text-green-700 print:bg-green-50",
      )}
    >
      {isRed && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
      {isOrange && <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />}
      {!isRed && !isOrange && (
        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
      )}
      <span>{message}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InvestorReportPage() {
  const { data: report, isLoading, refetch } = useLatestInvestorReport();
  const generate = useGenerateInvestorReport();
  const { metrics, healthAlerts } = useSaasMetrics();
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await generate.mutateAsync();
      await refetch();
      toast.success("Investor report updated");
    } finally {
      setGenerating(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const cohorts: CohortRow[] =
        report?.cohortData && report.cohortData.length > 0
          ? report.cohortData
          : [];
      const funnelSteps: FunnelStepRow[] =
        report?.funnelData && report.funnelData.length > 0
          ? report.funnelData
          : [];
      exportInvestorReportPDF({
        metrics,
        cohorts,
        funnelSteps,
        highlights: report?.highlights,
        risks: report?.risks,
      });
      toast.success("PDF downloaded");
    } catch (err) {
      toast.error("Export failed — please try again");
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const r = report;
  const cohorts: CohortRow[] =
    r?.cohortData && r.cohortData.length > 0 ? r.cohortData : [];
  const funnelSteps: FunnelStepRow[] =
    r?.funnelData && r.funnelData.length > 0 ? r.funnelData : [];
  const generatedDate = r
    ? new Date(r.generatedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  const mrr = r?.mrr ?? metrics.mrr;
  const arr = r?.arr ?? metrics.arr;
  const nrr = r?.nrr ?? metrics.nrr;
  const churnRate = r?.churnRate ?? metrics.monthlyChurnRate;
  const ltv = r?.ltv ?? metrics.ltv;
  const cac = r?.cac ?? metrics.cac;
  const ltvCac = r?.ltvCacRatio ?? metrics.ltvCacRatio;
  const payingCustomers = r?.payingCustomers ?? metrics.totalPayingCustomers;
  const newCustomers = metrics.newCustomers;
  const churnedCustomers = metrics.churnedCustomers;
  const cacByChannel = metrics.cacByChannel;
  const newMrr = metrics.newMrr;
  const churnedMrr = metrics.churnedMrr;
  const cacPayback = metrics.cacPaybackMonths;
  const statusKey = ltvCacStatus(ltvCac);

  const alerts =
    healthAlerts.length > 0
      ? healthAlerts
      : [
          {
            severity: "healthy",
            message: "All key SaaS metrics are within healthy benchmarks.",
          },
        ];

  if (isLoading) {
    return (
      <div className="space-y-4 p-2">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
            <Skeleton key={k} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ─── Screen-only action bar ─────────────────────────────────────────────────────────── */}
      <div className="print:hidden flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Investor Report
          </h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
            <Clock className="w-3.5 h-3.5" />
            Last generated: {generatedDate}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={generating}
            data-ocid="investor_report.regenerate_button"
          >
            <RefreshCw
              className={cn("w-3.5 h-3.5 mr-1.5", generating && "animate-spin")}
            />
            {generating ? "Generating…" : "Generate Latest"}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleExport}
            disabled={exporting}
            data-ocid="investor_report.export_button"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            {exporting ? "Generating…" : "Export as PDF"}
          </Button>
        </div>
      </div>

      {/* ─── Printable Report ─────────────────────────────────────────────────────────── */}
      <div
        id="investor-report"
        className="space-y-8 print:space-y-0 print:block"
        data-ocid="investor_report.panel"
      >
        {/* ── COVER ─────────────────────────────────────────────────────────────── */}
        <section className="print:h-screen print:flex print:flex-col print:justify-center print:items-center print:page-break-after print:text-center print:border-b-0">
          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6 print:border-none print:bg-transparent print:p-0 print:rounded-none">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4 print:justify-center">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center print:bg-blue-600">
                <TrendingUp className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground print:text-black print:text-3xl">
                GrowthOS
              </span>
            </div>

            <h2 className="text-3xl font-display font-bold text-foreground mb-2 print:text-5xl print:text-black print:mb-4">
              Investor Report
            </h2>
            <p className="text-muted-foreground text-sm print:text-lg print:text-gray-500">
              Generated: {generatedDate}
            </p>

            <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground print:mt-8 print:p-4 print:border print:border-gray-200 print:rounded print:text-gray-500 print:text-sm">
              <ShieldCheck className="inline w-3.5 h-3.5 mr-1 print:hidden" />
              <strong className="print:font-semibold">Disclaimer:</strong> This
              report contains estimates based on platform data. Actual results
              may vary.
            </div>
          </div>
        </section>

        {/* ── REVENUE SNAPSHOT ────────────────────────────────────────────────────── */}
        <section className="print:page-break-before print:pt-8">
          <SectionTitle icon={<TrendingUp className="w-4 h-4" />}>
            Revenue Snapshot
          </SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4 print:gap-3">
            <KpiCard
              label="MRR"
              value={fmtLakhs(mrr)}
              sub={`+${fmtLakhs(newMrr)} new`}
              ocid="investor_report.mrr"
            />
            <KpiCard
              label="ARR"
              value={fmtLakhs(arr)}
              ocid="investor_report.arr"
            />
            <KpiCard
              label="New MRR"
              value={fmtLakhs(newMrr)}
              highlight="success"
              ocid="investor_report.new_mrr"
            />
            <KpiCard
              label="Churned MRR"
              value={fmtLakhs(churnedMrr)}
              highlight="destructive"
              ocid="investor_report.churned_mrr"
            />
          </div>
          {/* NRR */}
          <div className="mt-3">
            <Card className="p-4 flex items-center gap-3 print:border print:border-gray-200 print:shadow-none">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground print:text-gray-500">
                  Net Revenue Retention (NRR)
                </p>
                <p
                  className={cn(
                    "text-xl font-bold mt-0.5 print:text-black",
                    nrr >= 100 ? "text-success" : "text-warning",
                  )}
                >
                  {nrr}%
                </p>
              </div>
              <Badge
                variant="outline"
                className={
                  nrr >= 100
                    ? "text-success border-success/30 bg-success/5 print:border-green-500 print:text-green-700"
                    : "text-warning border-warning/30 bg-warning/5 print:border-yellow-500 print:text-yellow-700"
                }
                data-ocid="investor_report.nrr_badge"
              >
                {nrr >= 100 ? "Expansion > Churn" : "Below 100% — Monitor"}
              </Badge>
            </Card>
          </div>
        </section>

        <Separator className="print:hidden" />

        {/* ── UNIT ECONOMICS ──────────────────────────────────────────────────────── */}
        <section className="print:page-break-before print:pt-8">
          <SectionTitle icon={<FileText className="w-4 h-4" />}>
            Unit Economics
          </SectionTitle>

          {/* CAC channel breakdown */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 print:text-gray-500">
              CAC by Channel
            </h3>
            <Card className="print:border print:border-gray-200 print:shadow-none overflow-hidden">
              <table className="w-full text-sm print:text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/30 print:bg-gray-50 print:border-gray-200">
                    <th className="text-left px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                      Channel
                    </th>
                    <th className="text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                      Spend
                    </th>
                    <th className="text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                      Share
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Google Ads", spend: cacByChannel.googleAds },
                    { label: "Meta Ads", spend: cacByChannel.metaAds },
                    { label: "Referral", spend: cacByChannel.referral },
                    { label: "Other", spend: cacByChannel.other },
                  ].map((row) => {
                    const pct =
                      cacByChannel.totalSpend > 0
                        ? ((row.spend / cacByChannel.totalSpend) * 100).toFixed(
                            1,
                          )
                        : "0.0";
                    return (
                      <tr
                        key={row.label}
                        className="border-b border-border/50 last:border-0 print:border-gray-100"
                      >
                        <td className="px-4 py-2 text-foreground print:text-black">
                          {row.label}
                        </td>
                        <td className="px-4 py-2 text-right font-medium text-foreground print:text-black">
                          {fmtINR(row.spend)}
                        </td>
                        <td className="px-4 py-2 text-right text-muted-foreground print:text-gray-500">
                          {pct}%
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-muted/20 print:bg-gray-50 font-semibold">
                    <td className="px-4 py-2 text-foreground print:text-black">
                      Total Spend
                    </td>
                    <td className="px-4 py-2 text-right text-foreground print:text-black">
                      {fmtINR(cacByChannel.totalSpend)}
                    </td>
                    <td className="px-4 py-2 text-right text-muted-foreground print:text-gray-500">
                      100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>

          {/* LTV, CAC, ratio, payback */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-4 print:gap-3">
            <KpiCard
              label="CAC"
              value={fmtINR(cac)}
              sub={`${cacByChannel.newPaidCustomers} new customers`}
              ocid="investor_report.cac"
            />
            <KpiCard
              label="LTV"
              value={fmtINR(ltv)}
              ocid="investor_report.ltv"
            />
            <Card
              className="p-4 print:border print:border-gray-200 print:shadow-none"
              data-ocid="investor_report.ltv_cac"
            >
              <p className="text-xs text-muted-foreground print:text-gray-500">
                LTV:CAC Ratio
              </p>
              <p
                className={cn(
                  "text-xl font-bold mt-0.5 print:text-black",
                  statusKey === "healthy" && "text-success",
                  statusKey === "watch" && "text-warning",
                  statusKey === "critical" && "text-destructive",
                )}
              >
                {ltvCac.toFixed(2)}x
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] mt-1",
                  LTV_CAC_STATUS[statusKey].cls,
                )}
              >
                {LTV_CAC_STATUS[statusKey].label}
              </Badge>
            </Card>
            <KpiCard
              label="CAC Payback"
              value={`${cacPayback.toFixed(1)} mo`}
              sub="Months to recover CAC"
              ocid="investor_report.cac_payback"
            />
          </div>
        </section>

        <Separator className="print:hidden" />

        {/* ── RETENTION ─────────────────────────────────────────────────────────────── */}
        <section className="print:page-break-before print:pt-8">
          <SectionTitle>Retention</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 print:grid-cols-3">
            <KpiCard
              label="Monthly Churn Rate"
              value={`${churnRate.toFixed(1)}%`}
              sub={
                churnRate <= 3
                  ? "Below 3% SaaS benchmark"
                  : "Above 3% — action needed"
              }
              highlight={churnRate <= 3 ? "success" : "warning"}
              ocid="investor_report.churn"
            />
            <KpiCard
              label="Revenue Churn"
              value={`${metrics.revenueChurnRate.toFixed(1)}%`}
              sub="Revenue lost from churned users"
              ocid="investor_report.revenue_churn"
            />
            <KpiCard
              label="Retention (D30)"
              value={cohorts.length > 0 ? `${cohorts[0].d30}%` : "—"}
              sub={
                cohorts.length > 0
                  ? "30-day retention, latest cohort"
                  : "Generate report to see data"
              }
              highlight={
                cohorts.length > 0
                  ? cohorts[0].d30 >= 35
                    ? "success"
                    : "warning"
                  : undefined
              }
              ocid="investor_report.d30_retention"
            />
          </div>

          {/* Cohort retention table */}
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 print:text-gray-500">
            Cohort Retention (last 4 cohorts)
          </h3>
          <Card className="print:border print:border-gray-200 print:shadow-none overflow-hidden">
            <table className="w-full text-sm print:text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30 print:bg-gray-50 print:border-gray-200">
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                    Cohort
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                    Day 1
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                    Day 7
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                    Day 30
                  </th>
                </tr>
              </thead>
              <tbody>
                {cohorts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-sm text-muted-foreground print:text-gray-400"
                    >
                      Generate report to see cohort data
                    </td>
                  </tr>
                ) : (
                  cohorts.map((c) => (
                    <tr
                      key={c.label}
                      className="border-b border-border/50 last:border-0 print:border-gray-100"
                    >
                      <td className="px-4 py-2 text-foreground print:text-black">
                        {c.label}
                      </td>
                      <td className="px-4 py-2 text-right text-foreground print:text-black">
                        {c.d1}%
                      </td>
                      <td className="px-4 py-2 text-right text-foreground print:text-black">
                        {c.d7}%
                      </td>
                      <td
                        className={cn(
                          "px-4 py-2 text-right font-medium print:text-black",
                          c.d30 >= 40 ? "text-success" : "text-warning",
                        )}
                      >
                        {c.d30}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        </section>

        <Separator className="print:hidden" />

        {/* ── FUNNEL ─────────────────────────────────────────────────────────────── */}
        <section className="print:page-break-before print:pt-8">
          <SectionTitle>Acquisition Funnel</SectionTitle>
          <Card className="print:border print:border-gray-200 print:shadow-none overflow-hidden">
            <table className="w-full text-sm print:text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30 print:bg-gray-50 print:border-gray-200">
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                    Step
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                    Users
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium print:text-gray-500">
                    Conversion
                  </th>
                </tr>
              </thead>
              <tbody>
                {funnelSteps.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-sm text-muted-foreground print:text-gray-400"
                    >
                      Generate report to see funnel data
                    </td>
                  </tr>
                ) : (
                  funnelSteps.map((step, i) => (
                    <tr
                      key={step.name}
                      className="border-b border-border/50 last:border-0 print:border-gray-100"
                    >
                      <td className="px-4 py-2 flex items-center gap-2 text-foreground print:text-black">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 print:bg-blue-50 print:text-blue-700">
                          {i + 1}
                        </span>
                        {step.name}
                      </td>
                      <td className="px-4 py-2 text-right font-medium text-foreground print:text-black">
                        {step.count.toLocaleString("en-IN")}
                      </td>
                      <td
                        className={cn(
                          "px-4 py-2 text-right font-semibold print:text-black",
                          step.pct >= 50
                            ? "text-success"
                            : step.pct >= 20
                              ? "text-warning"
                              : "text-destructive",
                        )}
                      >
                        {step.pct}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        </section>

        <Separator className="print:hidden" />

        {/* ── CUSTOMER METRICS ─────────────────────────────────────────────────────────── */}
        <section className="print:page-break-before print:pt-8">
          <SectionTitle icon={<TrendingUp className="w-4 h-4" />}>
            Customer Metrics
          </SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 print:grid-cols-3">
            <KpiCard
              label="Total Paying"
              value={payingCustomers.toLocaleString("en-IN")}
              sub="Active subscriptions"
              ocid="investor_report.total_customers"
            />
            <KpiCard
              label="New This Month"
              value={`+${newCustomers}`}
              highlight="success"
              sub="New paid sign-ups"
              ocid="investor_report.new_customers"
            />
            <KpiCard
              label="Churned This Month"
              value={churnedCustomers.toString()}
              highlight={churnedCustomers > 10 ? "destructive" : undefined}
              sub="Cancelled subscriptions"
              ocid="investor_report.churned_customers"
            />
          </div>
        </section>

        <Separator className="print:hidden" />

        {/* ── HEALTH ALERTS ───────────────────────────────────────────────────────────── */}
        <section className="print:page-break-before print:pt-8">
          <SectionTitle icon={<AlertTriangle className="w-4 h-4" />}>
            Health Alerts
          </SectionTitle>
          <div className="space-y-2" data-ocid="investor_report.alerts">
            {alerts.map((a, i) => (
              <AlertRow
                key={(a as { alertId?: string }).alertId ?? String(i)}
                severity={
                  typeof (a as { severity: unknown }).severity === "string"
                    ? (a as { severity: string }).severity
                    : "healthy"
                }
                message={(a as { message: string }).message}
              />
            ))}
          </div>
        </section>

        <Separator className="print:hidden" />

        {/* ── HIGHLIGHTS & RISKS ──────────────────────────────────────────────────────────── */}
        {r && (
          <section className="print:page-break-before print:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5 print:text-black">
                  <CheckCircle2 className="w-4 h-4 text-success" /> Highlights
                </h3>
                {r.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5 print:text-green-600" />
                    <p className="text-xs text-muted-foreground print:text-gray-600">
                      {h}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5 print:text-black">
                  <AlertTriangle className="w-4 h-4 text-warning" /> Risks
                </h3>
                {r.risks.map((risk) => (
                  <div key={risk} className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0 mt-0.5 print:text-yellow-600" />
                    <p className="text-xs text-muted-foreground print:text-gray-600">
                      {risk}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground print:text-black">
                  Next Steps
                </h3>
                {r.nextSteps.map((s, i) => (
                  <div key={s} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/15 text-primary text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5 print:bg-blue-50 print:text-blue-700">
                      {i + 1}
                    </span>
                    <p className="text-xs text-muted-foreground print:text-gray-600">
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── DISCLAIMERS ────────────────────────────────────────────────────────────── */}
        <section className="print:page-break-before print:pt-8">
          <SectionTitle icon={<ShieldCheck className="w-4 h-4" />}>
            Standard Disclaimers
          </SectionTitle>
          <Card className="p-4 bg-muted/30 print:border print:border-gray-200 print:shadow-none print:bg-gray-50">
            <ul className="space-y-1.5">
              {DISCLAIMERS.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 text-xs text-muted-foreground print:text-gray-600"
                >
                  <span className="w-1 h-1 rounded-full bg-muted-foreground mt-1.5 shrink-0 print:bg-gray-400" />
                  {d}
                </li>
              ))}
            </ul>
          </Card>
          {/* Print footer */}
          <div className="hidden print:block mt-8 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
            GrowthOS · Investor Report · {generatedDate} · Contact: Anees
            Chaudhary +91 9324073833
          </div>
        </section>
      </div>
    </>
  );
}
