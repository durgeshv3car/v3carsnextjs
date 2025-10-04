import { FuelRepo } from './fuel.repo.js';
import type {
  FuelLatestQuery, FuelHistoryQuery,
  FuelStatesListQuery, FuelCitiesListQuery
} from './fuel.types.js';
import { withCache, cacheKey } from '../../lib/cache.js';

const repo = new FuelRepo();

export class FuelService {

  /** latest for city/state with delta */
  async latest(q: FuelLatestQuery) {
    const scope = q.districtId ? { key: `dist:${q.districtId}` } : { key: `state:${q.stateId}` };
    const key = cacheKey({ ns: 'fuel:latest', v: 1, fuelType: q.fuelType, scope: scope.key });
    const ttlMs = 5 * 60 * 1000; // 5m
    return withCache(key, async () => {
      return q.districtId
        ? repo.latestByDistrict(q.districtId!, q.fuelType)
        : repo.latestByState(q.stateId!, q.fuelType);
    }, ttlMs);
  }

  /** history last N days for city/state */
  async history(q: FuelHistoryQuery) {
    const days = q.days ?? 10;
    const scope = q.districtId ? { key: `dist:${q.districtId}` } : { key: `state:${q.stateId}` };
    const key = cacheKey({ ns: 'fuel:history', v: 1, fuelType: q.fuelType, days, scope: scope.key });
    const ttlMs = 10 * 60 * 1000; // 10m
    return withCache(key, async () => {
      return q.districtId
        ? repo.historyByDistrict(q.districtId!, q.fuelType, days)
        : repo.historyByState(q.stateId!, q.fuelType, days);
    }, ttlMs);
  }

  /** state-wise list */
  async states(q: FuelStatesListQuery) {
    const page = q.page ?? 1;
    const limit = Math.max(1, Math.min(q.limit ?? 50, 100));
    const skip = (page - 1) * limit;

    const key = cacheKey({
      ns: 'fuel:states', v: 1,
      fuelType: q.fuelType,
      page, limit, sortBy: q.sortBy ?? 'name_asc',
      q: q.q ?? undefined,
    });
    const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    return withCache(key, async () => {
      const { rows, total } = await repo.statesLatest(q.fuelType, {
        q: q.q, skip, take: limit, sortBy: q.sortBy,
      });
      return {
        rows: rows.map(r => ({
          stateId: r.stateId,
          stateName: r.stateName,
          price: r.price == null ? null : Number(r.price),
          prevPrice: r.prevPrice == null ? null : Number(r.prevPrice),
          change: r.prevPrice == null || r.price == null ? null : Number((Number(r.price) - Number(r.prevPrice)).toFixed(2)),
          updatedAt: r.ts ? new Date(r.ts).toISOString() : null,
        })),
        page, pageSize: limit, total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      };
    }, ttlMs);
  }

  /** city list within a state */
  async cities(q: FuelCitiesListQuery) {
    const page = q.page ?? 1;
    const limit = Math.max(1, Math.min(q.limit ?? 50, 100));
    const skip = (page - 1) * limit;

    const key = cacheKey({
      ns: 'fuel:cities', v: 1,
      fuelType: q.fuelType, stateId: q.stateId,
      page, limit, sortBy: q.sortBy ?? 'name_asc',
      q: q.q ?? undefined,
    });
    const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    return withCache(key, async () => {
      const { rows, total } = await repo.citiesLatest(q.stateId, q.fuelType, {
        q: q.q, skip, take: limit, sortBy: q.sortBy,
      });
      return {
        rows: rows.map(r => ({
          districtId: r.districtId,
          cityName: r.cityName,
          stateId: r.stateId,
          price: r.price == null ? null : Number(r.price),
          prevPrice: r.prevPrice == null ? null : Number(r.prevPrice),
          change: r.prevPrice == null || r.price == null ? null : Number((Number(r.price) - Number(r.prevPrice)).toFixed(2)),
          updatedAt: r.ts ? new Date(r.ts).toISOString() : null,
        })),
        page, pageSize: limit, total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      };
    }, ttlMs);
  }

    async statesCombined(q: { q?: string; page?: number; limit?: number }) {
    const page = q.page ?? 1;
    const limit = Math.max(1, Math.min(q.limit ?? 50, 100));
    const skip = (page - 1) * limit;

    const key = cacheKey({ ns: 'fuel:statesCombined', v: 1, q: q.q ?? undefined, page, limit });
    const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    return withCache(key, async () => {
      const { rows, total } = await repo.statesLatestCombined({ q: q.q, skip, take: limit });
      const shaped = rows.map(r => ({
        stateId: r.stateId,
        stateName: r.stateName,
        petrol: r.petrol == null ? null : Number(r.petrol),
        petrolPrev: r.petrolPrev == null ? null : Number(r.petrolPrev),
        petrolChange: (r.petrol == null || r.petrolPrev == null) ? null : Number((Number(r.petrol) - Number(r.petrolPrev)).toFixed(2)),
        diesel: r.diesel == null ? null : Number(r.diesel),
        dieselPrev: r.dieselPrev == null ? null : Number(r.dieselPrev),
        dieselChange: (r.diesel == null || r.dieselPrev == null) ? null : Number((Number(r.diesel) - Number(r.dieselPrev)).toFixed(2)),
        cng: r.cng == null ? null : Number(r.cng),
        cngPrev: r.cngPrev == null ? null : Number(r.cngPrev),
        cngChange: (r.cng == null || r.cngPrev == null) ? null : Number((Number(r.cng) - Number(r.cngPrev)).toFixed(2)),
        updatedAt: [r.petrolTs, r.dieselTs, r.cngTs].filter(Boolean).sort().pop() ?? null,
      }));
      return {
        rows: shaped,
        page, pageSize: limit, total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      };
    }, ttlMs);
  }

  async historyCombined(q: { stateId?: number; districtId?: number; days?: number }) {
    const days = q.days ?? 10;
    const key = cacheKey({
      ns: 'fuel:historyCombined', v: 1,
      scope: q.districtId ? `dist:${q.districtId}` : `state:${q.stateId}`,
      days
    });
    const ttlMs = 10 * 60 * 1000; // 10m

    return withCache(key, async () => {
      const raw = q.districtId
        ? await repo.historyCombinedByDistrict(q.districtId!, days)
        : await repo.historyCombinedByState(q.stateId!, days);

      // add per-day change = today - previousDay (for each fuel)
      let prevP: number | null = null, prevD: number | null = null, prevC: number | null = null;
      const rows = raw.map(r => {
        const p = r.petrol == null ? null : Number(r.petrol);
        const d = r.diesel == null ? null : Number(r.diesel);
        const c = r.cng    == null ? null : Number(r.cng);

        const petrolChange = (p == null || prevP == null) ? null : Number((p - prevP).toFixed(2));
        const dieselChange = (d == null || prevD == null) ? null : Number((d - prevD).toFixed(2));
        const cngChange    = (c == null || prevC == null) ? null : Number((c - prevC).toFixed(2));

        prevP = p ?? prevP;
        prevD = d ?? prevD;
        prevC = c ?? prevC;

        return {
          day: r.day,
          petrol: p, petrolChange,
          diesel: d, dieselChange,
          cng: c,   cngChange,
        };
      });

      return rows;
    }, ttlMs);
  }

}
