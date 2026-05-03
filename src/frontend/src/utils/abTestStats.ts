/**
 * A/B Test Statistical Significance Utilities
 * Uses z-test for two proportions with error function approximation.
 */

export const MIN_SAMPLE_SIZE = 30;

/**
 * Error function complement approximation (Abramowitz & Stegun 7.1.26)
 * erfc(x) ≈ (a1*t + a2*t² + a3*t³) * exp(-x²), t = 1/(1+0.47047*x)
 * Accurate to ±2.5e-5
 */
function erfc(x: number): number {
  const t = 1 / (1 + 0.47047 * Math.abs(x));
  const poly = t * (0.3480242 + t * (-0.0958798 + t * 0.7478556));
  const result = poly * Math.exp(-(x * x));
  return x >= 0 ? result : 2 - result;
}

/**
 * Cumulative normal distribution function (CDF).
 * normalCDF(z) = P(Z <= z) for standard normal Z.
 */
export function normalCDF(z: number): number {
  return 1 - erfc(z / Math.SQRT2) / 2;
}

/**
 * Two-tailed p-value from a z-score.
 * p = P(|Z| >= |z|) = erfc(|z| / sqrt(2))
 */
export function zScoreToP(z: number): number {
  return erfc(Math.abs(z) / Math.SQRT2);
}

export interface ZTestResult {
  z: number;
  pValue: number;
  confidenceLevel: number;
  isSignificant: boolean; // p < 0.05
  isBorderline: boolean; // 0.05 <= p < 0.10
  insufficientData: boolean; // either group < MIN_SAMPLE_SIZE
  neededSamples: number; // extra obs needed to reach 80% power at α=0.05
  winnerIndex: 0 | 1 | null; // which variant has higher conversion rate
}

/**
 * Two-proportion z-test.
 * @param n1 impressions for variant A
 * @param c1 conversions for variant A
 * @param n2 impressions for variant B
 * @param c2 conversions for variant B
 */
export function zTestTwoProportions(
  n1: number,
  c1: number,
  n2: number,
  c2: number,
): ZTestResult {
  const insufficientData = n1 < MIN_SAMPLE_SIZE || n2 < MIN_SAMPLE_SIZE;

  if (n1 === 0 || n2 === 0 || (c1 === 0 && c2 === 0)) {
    return {
      z: 0,
      pValue: 1,
      confidenceLevel: 0,
      isSignificant: false,
      isBorderline: false,
      insufficientData: true,
      neededSamples: estimateNeededSamples(n1, c1, n2, c2),
      winnerIndex: null,
    };
  }

  const p1 = c1 / n1;
  const p2 = c2 / n2;
  const pPooled = (c1 + c2) / (n1 + n2);
  const se = Math.sqrt(pPooled * (1 - pPooled) * (1 / n1 + 1 / n2));

  const z = se === 0 ? 0 : (p1 - p2) / se;
  const pValue = zScoreToP(z);
  const confidenceLevel = Math.round((1 - pValue) * 100);

  const isSignificant = pValue < 0.05;
  const isBorderline = !isSignificant && pValue < 0.1;

  let winnerIndex: 0 | 1 | null = null;
  if (isSignificant) {
    winnerIndex = p1 > p2 ? 0 : 1;
  }

  return {
    z,
    pValue,
    confidenceLevel,
    isSignificant,
    isBorderline,
    insufficientData,
    neededSamples: insufficientData ? estimateNeededSamples(n1, c1, n2, c2) : 0,
    winnerIndex,
  };
}

/**
 * Estimate additional observations needed for 80% power at α=0.05.
 * Uses simplified formula: n = (z_alpha/2 + z_beta)^2 * 2*p*(1-p) / delta^2
 * where delta is the observed difference.
 */
function estimateNeededSamples(
  n1: number,
  c1: number,
  n2: number,
  c2: number,
): number {
  const z_alpha_2 = 1.96; // 95% confidence
  const z_beta = 0.842; // 80% power
  const currentN = Math.min(n1, n2);

  const p1 = n1 > 0 ? c1 / n1 : 0.05;
  const p2 = n2 > 0 ? c2 / n2 : 0.05;
  const pAvg = (p1 + p2) / 2 || 0.05;
  const delta = Math.abs(p1 - p2) || 0.05;

  const nRequired = Math.ceil(
    ((z_alpha_2 + z_beta) ** 2 * 2 * pAvg * (1 - pAvg)) / delta ** 2,
  );

  return Math.max(0, nRequired - currentN);
}
