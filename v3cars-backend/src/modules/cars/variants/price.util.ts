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
