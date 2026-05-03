import { PAGE_META } from "@/config/metaTags";
import { defaultABTests } from "@/data/abTests";
import { useMetaTags } from "@/hooks/useMetaTags";
import type { ABTest } from "@/types/conversionEngine";
import { MIN_SAMPLE_SIZE, zTestTwoProportions } from "@/utils/abTestStats";
import type { ZTestResult } from "@/utils/abTestStats";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const LS_RESULTS = "growthosABResults";
const LS_AB = "growthosABTests";

interface VariantStats {
  impressions: number;
  conversions: number;
}

type TestResults = Record<string, Record<string, VariantStats>>;

function readResults(): TestResults {
  try {
    const raw = localStorage.getItem(LS_RESULTS);
    return raw ? (JSON.parse(raw) as TestResults) : {};
  } catch {
    return {};
  }
}

function readAssignments(): Record<string, string> {
  try {
    const raw = localStorage.getItem(LS_AB);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function computeStats(
  test: ABTest,
  results: TestResults,
  assignments: Record<string, string>,
): Record<string, VariantStats> {
  const stats: Record<string, VariantStats> = {};
  for (const v of test.variants) {
    const r = results[test.id]?.[v.id];
    // Count variant assignments as an impression
    const assignmentCount = Object.values(assignments).filter(
      (val) => val === v.id,
    ).length;
    stats[v.id] = {
      impressions: (r?.impressions ?? 0) + assignmentCount,
      conversions: r?.conversions ?? 0,
    };
  }
  return stats;
}

function resetTest(testId: string) {
  try {
    const raw = localStorage.getItem(LS_RESULTS);
    const results: TestResults = raw ? (JSON.parse(raw) as TestResults) : {};
    delete results[testId];
    localStorage.setItem(LS_RESULTS, JSON.stringify(results));
    // Also clear AB assignment for this test so users get re-assigned
    const assignRaw = localStorage.getItem(LS_AB);
    if (assignRaw) {
      const assigns = JSON.parse(assignRaw) as Record<string, string>;
      delete assigns[testId];
      localStorage.setItem(LS_AB, JSON.stringify(assigns));
    }
  } catch {
    // ignore
  }
}

export default function ABTestPage() {
  useMetaTags(PAGE_META["/admin/ab-tests"]);
  const [results, setResults] = useState<TestResults>(readResults);
  const [assignments, setAssignments] =
    useState<Record<string, string>>(readAssignments);

  const totalConversions = Object.values(results).reduce((sum, testData) => {
    return (
      sum +
      Object.values(testData).reduce((s, v) => s + (v.conversions ?? 0), 0)
    );
  }, 0);

  const handleReset = (testId: string) => {
    resetTest(testId);
    setResults(readResults());
    setAssignments(readAssignments());
    toast.success("Test data reset");
  };

  return (
    <div data-ocid="ab_test.page" className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          A/B Tests — Conversion Optimization
        </h1>
        <p className="text-[13px] text-muted-foreground mt-1">
          Track which messaging and timing converts free users to paid faster.
        </p>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-card border border-border/40">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-primary animate-pulse"
            aria-hidden="true"
          />
          <p className="text-[13px] font-semibold text-foreground">
            {defaultABTests.length} active tests
          </p>
        </div>
        <div className="w-px h-4 bg-border/40" />
        <p className="text-[13px] text-muted-foreground">
          <span className="font-semibold text-foreground tabular-nums">
            {totalConversions}
          </span>{" "}
          total conversions tracked
        </p>
        <p className="text-[11px] text-muted-foreground ml-auto">
          Data stored in localStorage — resets on clear
        </p>
      </div>

      {/* Test cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {defaultABTests.map((test, i) => {
          const stats = computeStats(test, results, assignments);
          return (
            <motion.div
              key={test.id}
              data-ocid={`ab_test.card.${i + 1}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="bg-card rounded-2xl border border-border/40 overflow-hidden"
            >
              {/* Card header */}
              <div className="px-4 pt-4 pb-3 border-b border-border/30 flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-bold text-foreground">
                    {test.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                    {test.id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-500/10 px-2 py-0.5 rounded-full border border-green-300/50 dark:border-green-500/20">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                      aria-hidden="true"
                    />
                    Active
                  </span>
                </div>
              </div>

              {/* Variants table */}
              <div className="px-4 py-3">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border/20">
                      <th className="text-left font-semibold pb-2 uppercase text-[10px] tracking-wider">
                        Variant
                      </th>
                      <th className="text-right font-semibold pb-2 uppercase text-[10px] tracking-wider">
                        Impressions
                      </th>
                      <th className="text-right font-semibold pb-2 uppercase text-[10px] tracking-wider">
                        Conversions
                      </th>
                      <th className="text-right font-semibold pb-2 uppercase text-[10px] tracking-wider">
                        Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {test.variants.map((v) => {
                      const s = stats[v.id] ?? {
                        impressions: 0,
                        conversions: 0,
                      };
                      const rate =
                        s.impressions > 0
                          ? ((s.conversions / s.impressions) * 100).toFixed(1)
                          : "0.0";
                      const isLeading =
                        s.conversions ===
                          Math.max(
                            ...test.variants.map(
                              (tv) => stats[tv.id]?.conversions ?? 0,
                            ),
                          ) && s.conversions > 0;
                      return (
                        <tr key={v.id} className="group">
                          <td className="py-2 pr-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-foreground">
                                {v.label}
                              </span>
                              {isLeading && (
                                <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-px rounded-full">
                                  LEADING
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-muted-foreground font-mono">
                              {v.id}
                            </p>
                          </td>
                          <td className="py-2 text-right tabular-nums text-muted-foreground">
                            {s.impressions}
                          </td>
                          <td className="py-2 text-right tabular-nums text-foreground font-semibold">
                            {s.conversions}
                          </td>
                          <td
                            className={[
                              "py-2 text-right tabular-nums font-bold",
                              Number(rate) > 5
                                ? "text-green-600 dark:text-green-400"
                                : Number(rate) > 2
                                  ? "text-amber-500 dark:text-amber-400"
                                  : "text-muted-foreground",
                            ].join(" ")}
                          >
                            {rate}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Statistical significance section */}
              <SignificanceSection test={test} stats={stats} cardIndex={i} />

              {/* Reset button */}
              <div className="px-4 pb-4 pt-1">
                <button
                  type="button"
                  data-ocid={`ab_test.reset_button.${i + 1}`}
                  onClick={() => handleReset(test.id)}
                  className="text-[11px] font-semibold text-muted-foreground hover:text-foreground border border-border/50 px-3 py-1.5 rounded-lg transition-colors duration-150 active:scale-95"
                >
                  Reset test data
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Results summary panel */}
      <SummaryPanel results={results} assignments={assignments} />

      {/* Note */}
      <p className="text-[11px] text-muted-foreground text-center pb-4">
        Impressions and conversions are tracked via localStorage. Numbers will
        be low initially — that's expected. Clear localStorage to reset all
        tests.
      </p>
    </div>
  );
}

/* ── Significance section ─────────────────────────────────────── */

interface SignificanceSectionProps {
  test: ABTest;
  stats: Record<string, VariantStats>;
  cardIndex: number;
}

function SignificanceSection({
  test,
  stats,
  cardIndex,
}: SignificanceSectionProps) {
  if (test.variants.length < 2) return null;

  const [a, b] = test.variants;
  const sA = stats[a.id] ?? { impressions: 0, conversions: 0 };
  const sB = stats[b.id] ?? { impressions: 0, conversions: 0 };

  const result: ZTestResult = zTestTwoProportions(
    sA.impressions,
    sA.conversions,
    sB.impressions,
    sB.conversions,
  );

  return (
    <div
      data-ocid={`ab_test.significance.${cardIndex + 1}`}
      className="mx-4 mb-3 rounded-xl border border-border/30 bg-muted/30 px-4 py-3 space-y-2"
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        Statistical Significance
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <SignificanceBadge result={result} />

        {!result.insufficientData && (
          <>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {result.confidenceLevel}% confidence
            </span>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              p = {result.pValue < 0.001 ? "<0.001" : result.pValue.toFixed(3)}
            </span>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              z = {result.z.toFixed(2)}
            </span>
          </>
        )}
      </div>

      {result.insufficientData && (
        <p className="text-[11px] text-amber-600 dark:text-amber-400">
          Need at least {MIN_SAMPLE_SIZE} impressions per variant
          {result.neededSamples > 0
            ? ` (~${result.neededSamples} more obs for 80% power)`
            : ""}
        </p>
      )}

      {!result.insufficientData &&
        result.neededSamples > 0 &&
        !result.isSignificant && (
          <p className="text-[11px] text-muted-foreground">
            ~{result.neededSamples} more observations for 95% confidence
          </p>
        )}

      {result.isSignificant && result.winnerIndex !== null && (
        <p className="text-[11px] text-green-700 dark:text-green-400 font-semibold">
          Winner: {test.variants[result.winnerIndex].label}
        </p>
      )}
    </div>
  );
}

function SignificanceBadge({ result }: { result: ZTestResult }) {
  if (result.insufficientData) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
        Insufficient data
      </span>
    );
  }
  if (result.isSignificant) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400 border border-green-300/50 dark:border-green-500/30">
        ✓ Statistically significant
      </span>
    );
  }
  if (result.isBorderline) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300/50 dark:border-amber-500/30">
        Borderline result
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
      Not significant
    </span>
  );
}

/* ── Summary panel ────────────────────────────────────────────── */

function SummaryPanel({
  results,
  assignments,
}: {
  results: TestResults;
  assignments: Record<string, string>;
}) {
  type SummaryRow = {
    test: ABTest;
    winner: string | null;
    needsData: boolean;
    confidenceLevel: number;
    pValue: number;
  };

  const rows: SummaryRow[] = defaultABTests.map((test) => {
    const stats = computeStats(test, results, assignments);
    if (test.variants.length < 2) {
      return {
        test,
        winner: null,
        needsData: true,
        confidenceLevel: 0,
        pValue: 1,
      };
    }
    const [a, b] = test.variants;
    const sA = stats[a.id] ?? { impressions: 0, conversions: 0 };
    const sB = stats[b.id] ?? { impressions: 0, conversions: 0 };
    const res = zTestTwoProportions(
      sA.impressions,
      sA.conversions,
      sB.impressions,
      sB.conversions,
    );
    const winnerLabel =
      res.isSignificant && res.winnerIndex !== null
        ? test.variants[res.winnerIndex].label
        : null;
    return {
      test,
      winner: winnerLabel,
      needsData: res.insufficientData,
      confidenceLevel: res.confidenceLevel,
      pValue: res.pValue,
    };
  });

  const significantRows = rows.filter((r) => r.winner !== null);
  const needsDataRows = rows.filter((r) => r.needsData);
  const borderlineRows = rows.filter(
    (r) => !r.needsData && !r.winner && r.pValue < 0.1,
  );

  return (
    <motion.div
      data-ocid="ab_test.summary_panel"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
      className="bg-card rounded-2xl border border-border/40 overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-border/30">
        <p className="text-[14px] font-bold text-foreground">
          Test Results Summary
        </p>
        <p className="text-[12px] text-muted-foreground mt-0.5">
          Overview of all {defaultABTests.length} active experiments
        </p>
      </div>

      <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Significant tests */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
            Significant Results ({significantRows.length})
          </p>
          {significantRows.length === 0 ? (
            <p className="text-[12px] text-muted-foreground">
              No significant results yet
            </p>
          ) : (
            significantRows.map((r) => (
              <div
                key={r.test.id}
                className="rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200/60 dark:border-green-500/20 px-3 py-2"
              >
                <p className="text-[12px] font-semibold text-foreground">
                  {r.test.name}
                </p>
                <p className="text-[11px] text-green-700 dark:text-green-400">
                  Winner: {r.winner} · {r.confidenceLevel}% confidence
                </p>
              </div>
            ))
          )}
        </div>

        {/* Borderline tests */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Borderline ({borderlineRows.length})
          </p>
          {borderlineRows.length === 0 ? (
            <p className="text-[12px] text-muted-foreground">
              No borderline results
            </p>
          ) : (
            borderlineRows.map((r) => (
              <div
                key={r.test.id}
                className="rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200/60 dark:border-amber-500/20 px-3 py-2"
              >
                <p className="text-[12px] font-semibold text-foreground">
                  {r.test.name}
                </p>
                <p className="text-[11px] text-amber-600 dark:text-amber-400">
                  p = {r.pValue.toFixed(3)} · keep collecting data
                </p>
              </div>
            ))
          )}
        </div>

        {/* Needs more data */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Needs More Data ({needsDataRows.length})
          </p>
          {needsDataRows.length === 0 ? (
            <p className="text-[12px] text-muted-foreground">
              All tests have enough data
            </p>
          ) : (
            needsDataRows.map((r) => (
              <div
                key={r.test.id}
                className="rounded-lg bg-muted/40 border border-border/40 px-3 py-2"
              >
                <p className="text-[12px] font-semibold text-foreground">
                  {r.test.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Min {MIN_SAMPLE_SIZE} impressions per variant
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
