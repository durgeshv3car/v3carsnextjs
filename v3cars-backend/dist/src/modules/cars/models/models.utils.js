// src/modules/cars/models/models.utils.ts
export const rpmRange = (min, max) => {
    if (min && max && min !== max)
        return `${min} - ${max}rpm`;
    if (min || max)
        return `${min ?? max}rpm`;
    return null;
};
export function sum(ns) { return ns.reduce((a, b) => a + b, 0); }
export function buildAssetPath(name) {
    return name ?? null;
}
/** INR bucket edges (rupees) */
export const priceRanges = {
    UNDER_5L: { max: 5_00_000 },
    BETWEEN_5_10L: { min: 5_00_000, max: 10_00_000 },
    BETWEEN_10_20L: { min: 10_00_000, max: 20_00_000 },
    BETWEEN_20_40L: { min: 20_00_000, max: 40_00_000 },
    ABOVE_40L: { min: 40_00_000 },
};
export function inBucket(min, max, bucket) {
    if (!bucket)
        return true;
    const { min: bmin, max: bmax } = priceRanges[bucket] ?? {};
    if (min == null && max == null)
        return false;
    const lo = min ?? max ?? 0;
    const hi = max ?? min ?? 0;
    if (typeof bmin === 'number' && hi < bmin)
        return false;
    if (typeof bmax === 'number' && lo > bmax)
        return false;
    return true;
}
// Small helper to stringify dates safely for cache key
export const toYmd = (d) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);
