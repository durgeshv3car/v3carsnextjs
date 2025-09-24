import { PowertrainsRepo } from './powertrains.repo.js';
// ⬇️ Cache façade
import { withCache, cacheKey } from '../../../lib/cache.js';

const repo = new PowertrainsRepo();

export class PowertrainsService {
  async findByIds(ids: number[]) {
    const uniq = Array.from(new Set((ids || []).filter((x) => typeof x === 'number'))).sort((a, b) => a - b);
    if (!uniq.length) return [];

    const key = cacheKey({ ns: 'powertrains:byIds', v: 1, ids: uniq });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => repo.findByIds(uniq), ttlMs);
  }

  async findIdsByFilters(opts: { fuelType?: string; transmissionType?: string; modelId?: number }) {
    const key = cacheKey({
      ns: 'powertrains:idsByFilters',
      v: 1,
      fuelType: opts.fuelType ?? undefined,
      transmissionType: opts.transmissionType ?? undefined,
      modelId: opts.modelId ?? undefined,
    });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => repo.findIdsByFilters(opts), ttlMs);
  }

  /** 🆕 Distinct modelIds for a given fuelType (e.g., 'Electric') */
  async findModelIdsByFuel(opts: { fuelType: string }) {
    const key = cacheKey({ ns: 'powertrains:modelIdsByFuel', v: 1, fuelType: (opts.fuelType || '').trim() });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => repo.findModelIdsByFuel(opts), ttlMs);
  }

  /** Specs aggregation for models */
 async getSpecsByModelIds(modelIds: number[]) {
  const ids = Array.from(new Set((modelIds || []).filter((n) => typeof n === 'number'))).sort((a, b) => a - b);
  if (!ids.length) {
    return new Map<number, { powerPS: number | null; torqueNM: number | null; mileageKMPL: number | null; powerTrain: string | null }>();
  }

  const key = cacheKey({ ns: 'powertrains:specsByModelIds', v: 1, ids });
  const ttlMs = 30 * 60 * 1000;

  const entries = await withCache<
    [number, { powerPS: number | null; torqueNM: number | null; mileageKMPL: number | null; powerTrain: string | null }][]
  >(key, async () => {
    const map = await repo.getSpecsByModelIds(ids); // returns Map
    return Array.from(map.entries());
  }, ttlMs);

  return new Map(entries);
}
}
