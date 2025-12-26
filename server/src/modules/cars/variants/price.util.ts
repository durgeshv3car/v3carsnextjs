/** Utilities to parse string prices like:
 *  "₹ 7.99 - 12.49 Lakh", "₹ 1.05 Cr", "₹ 6,99,000", "7.49 lakh", "1.25 cr"
 */

export function detectMultiplier(raw: string): number {
  const s = raw.toLowerCase();
  if (s.includes('cr') || s.includes('crore')) return 10_000_000; // 1 Cr
  if (s.includes('lakh') || s.includes('lac') || s.includes('lk')) return 100_000; // 1 Lakh
  return 1; // assume absolute rupees when unit not present
}

export function extractNumbers(raw: string): number[] {
  const matches = raw.match(/(?:\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?/g);
  if (!matches) return [];
  return matches.map((t) => parseFloat(t.replace(/,/g, ''))).filter((n) => !Number.isNaN(n));
}

/** Parse a single variant price string to INR band (rupees) */
export function extractPriceBand(raw: string): { min: number; max: number } | null {
  if (!raw) return null;
  const mult = detectMultiplier(raw);
  const nums = extractNumbers(raw);
  if (!nums.length) return null;
  const values = nums.map((n) => Math.round(n * mult));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max };
}


/** Snap INR to a 'clean' auto-price:
 *  - Work in lakhs (₹1,00,000) → round to 2 decimals.
 *  - If fractional part >= 0.95, bump to next whole lakh (e.g. 4.99L → 5.00L)
 */
export function snapApproxINR(n: number | null | undefined): number | null {
  if (n == null || !isFinite(n)) return null;
  const inLakhs = n / 100_000;
  const frac = inLakhs - Math.floor(inLakhs);
  let snappedLakhs = Math.round(inLakhs * 100) / 100; // 2 decimals in Lakh
  if (frac >= 0.95) snappedLakhs = Math.ceil(inLakhs); // e.g. 4.96..4.99 → 5.00
  return Math.round(snappedLakhs * 100_000);
}
     

