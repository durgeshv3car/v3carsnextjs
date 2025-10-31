// src/modules/cars/powertrains/powertrains.service.ts
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

  /**
   * Legacy helper that returns powertrain ids for simple filters (fuel/transmission/modelId).
   * Kept for backwards compatibility with callers that expect only these params.
   */
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

  /** 🆕 Distinct modelIds that have the given fuelType (e.g., 'Electric') */
  async findModelIdsByFuel(opts: { fuelType: string }) {
    const key = cacheKey({ ns: 'powertrains:modelIdsByFuel', v: 1, fuelType: (opts.fuelType || '').trim() });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => repo.findModelIdsByFuel(opts), ttlMs);
  }

  /**
   * 🆕 Distinct modelIds for combined powertrain/spec filters
   *
   * Accepts:
   *   - fuelType?: string
   *   - transmissionType?: string
   *   - cylinders?: string | string[]     (e.g. '4' or ['4','6'] or '8_PLUS')
   *   - engineDisplacement?: string       (mapped to cubicCapacity ranges, e.g. '1000_1500')
   *   - mileage?: string                  ('UNDER_10' | 'BETWEEN_10_15' | 'ABOVE_15')
   *
   * Returns an array of unique modelIds that match ANY of the provided filters combined.
   * Results are cached.
   */
  async findModelIdsByFilters(opts: {
    fuelType?: string;
    transmissionType?: string;
    cylinders?: string | string[];
    engineDisplacement?: string;
    mileage?: string;
  }) {
    // normalize cylinders for cache key: array -> comma string; single -> as-is
    const cylKey =
      opts.cylinders == null
        ? undefined
        : Array.isArray(opts.cylinders)
          ? opts.cylinders.join(',')
          : String(opts.cylinders);

    const key = cacheKey({
      ns: 'powertrains:modelIdsByFilters',
      v: 1,
      fuelType: opts.fuelType ?? undefined,
      transmissionType: opts.transmissionType ?? undefined,
      cylinders: cylKey,
      engineDisplacement: opts.engineDisplacement ?? undefined,
      mileage: opts.mileage ?? undefined,
    });

    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => repo.findModelIdsByFilters(opts), ttlMs);
  }

  /** Specs aggregation for models */

  async getSpecsByModelIds(modelIds: number[]) {
    const ids = Array.from(new Set((modelIds || []).filter((n) => typeof n === 'number'))).sort((a, b) => a - b);
    if (!ids.length) {
      return new Map<
        number,
        {
          powerPS: number | null;
          torqueNM: number | null;
          mileageKMPL: number | null;
          powerTrain: string | null;
          transmissionType: string | null;
          transmissionSubType: string | null;
          drivetrain: number | null;
          isFourByFour: boolean | null;
        }
      >();
    }

    const key = cacheKey({ ns: 'powertrains:specsByModelIds', v: 2, ids }); // bump v:2 due to shape change
    const ttlMs = 30 * 60 * 1000;

    const entries = await withCache<
      [
        number,
        {
          powerPS: number | null;
          torqueNM: number | null;
          mileageKMPL: number | null;
          powerTrain: string | null;
          transmissionType: string | null;
          transmissionSubType: string | null;
          drivetrain: number | null;
          isFourByFour: boolean | null;
        }
      ][]
    >(key, async () => {
      const map = await repo.getSpecsByModelIds(ids); // returns Map
      return Array.from(map.entries());
    }, ttlMs);

    return new Map(entries);
  }

}
