import { VariantsRepo } from './variants.repo.js';
import { PowertrainsService } from '../powertrains/powertrains.service.js';
import { extractPriceBand } from './price.util.js';
// ⬇️ Cache façade
import { withCache, cacheKey } from '../../../lib/cache.js';
const repo = new VariantsRepo();
const powertrains = new PowertrainsService();
// ---- helpers ----
function priceInBucket(min, max, bucket) {
    if (!bucket)
        return true;
    const ranges = {
        UNDER_5L: { max: 5_00_000 },
        BETWEEN_5_10L: { min: 5_00_000, max: 10_00_000 },
        BETWEEN_10_20L: { min: 10_00_000, max: 20_00_000 },
        BETWEEN_20_40L: { min: 20_00_000, max: 40_00_000 },
        ABOVE_40L: { min: 40_00_000 },
    };
    const r = ranges[bucket];
    if (!r)
        return true;
    // treat as overlap between [min,max] and [r.min,r.max]
    const vMin = min ?? max ?? null;
    const vMax = max ?? min ?? null;
    if (vMin == null && vMax == null)
        return false;
    if (typeof r.min === 'number' && vMax < r.min)
        return false;
    if (typeof r.max === 'number' && vMin > r.max)
        return false;
    return true;
}
function cmp(a, b, dir) {
    const an = a ?? Number.POSITIVE_INFINITY;
    const bn = b ?? Number.POSITIVE_INFINITY;
    return dir === 'asc' ? an - bn : bn - an;
}
export class VariantsService {
    async list(q) {
        // 1) Powertrain pre-filter → ids (so DB work is reduced)
        let powertrainIds = undefined;
        if (q.fuelType || q.transmissionType) {
            powertrainIds = await powertrains.findIdsByFilters({
                fuelType: q.fuelType,
                transmissionType: q.transmissionType,
                modelId: q.modelId,
            });
            if (!powertrainIds.length) {
                const limit = Math.max(1, Math.min(q.limit || 12, 100));
                return { success: true, rows: [], page: q.page || 1, pageSize: limit, total: 0, totalPages: 0 };
            }
        }
        // 2) Fetch raw variants (DB filters: modelId, q, powertrainIds)
        const raw = await repo.listRaw({
            q: q.q,
            modelId: q.modelId,
            powertrainIds,
        });
        // 3) Enrich with numeric prices & powertrain meta
        const ptMap = new Map();
        const ptIds = Array.from(new Set(raw.map((v) => v.modelPowertrainId).filter((x) => typeof x === 'number')));
        if (ptIds.length) {
            const pts = await powertrains.findByIds(ptIds);
            pts.forEach((p) => ptMap.set(p.modelPowertrainId, {
                fuelType: p.fuelType ?? undefined,
                transmissionType: p.transmissionType ?? undefined,
                powerTrain: p.powerTrain ?? undefined,
            }));
        }
        const enriched = raw.map((v) => {
            const band = extractPriceBand(v.variantPrice ?? '');
            const priceMin = band?.min ?? null;
            const priceMax = band?.max ?? null;
            const pt = v.modelPowertrainId ? ptMap.get(v.modelPowertrainId) : undefined;
            return {
                ...v,
                priceMin,
                priceMax,
                powertrain: pt
                    ? {
                        id: v.modelPowertrainId,
                        fuelType: pt.fuelType,
                        transmissionType: pt.transmissionType,
                        label: pt.powerTrain,
                    }
                    : null,
            };
        });
        // 4) Price-based filters (bucket/min/max)
        let filtered = enriched.filter((v) => priceInBucket(v.priceMin, v.priceMax, q.priceBucket));
        if (q.minPrice != null)
            filtered = filtered.filter((v) => (v.priceMax ?? v.priceMin ?? Infinity) >= q.minPrice);
        if (q.maxPrice != null)
            filtered = filtered.filter((v) => (v.priceMin ?? v.priceMax ?? 0) <= q.maxPrice);
        // 5) Sorting
        switch (q.sortBy) {
            case 'price_asc':
                filtered.sort((a, b) => cmp(a.priceMin ?? a.priceMax, b.priceMin ?? b.priceMax, 'asc'));
                break;
            case 'price_desc':
                filtered.sort((a, b) => cmp(a.priceMax ?? a.priceMin, b.priceMax ?? b.priceMin, 'desc'));
                break;
            case 'name_asc':
                filtered.sort((a, b) => (a.variantName ?? '').localeCompare(b.variantName ?? ''));
                break;
            case 'name_desc':
                filtered.sort((a, b) => (b.variantName ?? '').localeCompare(a.variantName ?? ''));
                break;
            case 'latest':
            default:
                filtered.sort((a, b) => {
                    const ad = a.updatedDate ? new Date(a.updatedDate).getTime() : 0;
                    const bd = b.updatedDate ? new Date(b.updatedDate).getTime() : 0;
                    if (bd !== ad)
                        return bd - ad;
                    return (a.variantId ?? 0) - (b.variantId ?? 0);
                });
                break;
        }
        // 6) Pagination (after filter/sort)
        const page = q.page || 1;
        const limit = Math.max(1, Math.min(q.limit || 12, 100));
        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const start = (page - 1) * limit;
        const rows = filtered.slice(start, start + limit);
        return { success: true, rows, page, pageSize: limit, total, totalPages };
    }
    async getById(id) {
        const v = await repo.getById(id);
        if (!v)
            return null;
        const band = extractPriceBand(v.variantPrice ?? '');
        return { ...v, priceMin: band?.min ?? null, priceMax: band?.max ?? null };
    }
    // 🔥 expose price bands for Models enrichment — now cached
    async getPriceBandsByModelIds(modelIds) {
        const ids = Array.from(new Set((modelIds || []).filter((n) => typeof n === 'number'))).sort((a, b) => a - b);
        if (!ids.length)
            return new Map();
        const key = cacheKey({ ns: 'variants:priceBandsByModelIds', v: 1, ids });
        const ttlMs = 30 * 60 * 1000; // 30 min
        // Cache me entries array store karo, wapas Map banao
        const entries = await withCache(key, async () => {
            const map = await repo.getPriceBandsByModelIds(ids); // already returns Map
            return Array.from(map.entries());
        }, ttlMs);
        return new Map(entries);
    }
    // (optional) frequently used helpers can also be cached similarly:
    async listByModelId(modelId) {
        const key = cacheKey({ ns: 'variants:listByModel', v: 1, modelId });
        const ttlMs = 30 * 60 * 1000;
        return withCache(key, async () => repo.listByModelId(modelId), ttlMs);
    }
    async findByIds(variantIds) {
        const ids = Array.from(new Set((variantIds || []).filter((n) => typeof n === 'number'))).sort((a, b) => a - b);
        if (!ids.length)
            return [];
        const key = cacheKey({ ns: 'variants:byIds', v: 1, ids });
        const ttlMs = 30 * 60 * 1000;
        return withCache(key, async () => repo.findByIds(ids), ttlMs);
    }
}
