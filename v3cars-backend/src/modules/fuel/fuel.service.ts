import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma.js';
import { FuelRepo } from './fuel.repo.js';
import type {
  FuelLatestQuery, FuelHistoryQuery,
  FuelStatesListQuery, FuelCitiesListQuery,
  FuelMetrosQuery,
  FuelMonthlyTrendsQuery
} from './fuel.types.js';
import { withCache, cacheKey } from '../../lib/cache.js';

const METRO_IDS = [612, 353, 280, 465]; // New Delhi, Chennai, Mumbai, Kolkata

const repo = new FuelRepo();

/** Robust mapper:
 * - if districtId is a real tbldistricts.id → keep it
 * - else if cityId is given → map cityId -> tbldistricts.id
 * - else if districtId is actually a cityId → map it
 */


async function resolveDistrictId(opts: { districtId?: number; cityId?: number }): Promise<number | undefined> {
  // 1) If a real tbldistricts id
  if (opts.districtId) {
    const found = await prisma.$queryRaw<Array<{ id: number }>>(Prisma.sql`
      SELECT id FROM tbldistricts WHERE id = ${opts.districtId} LIMIT 1
    `);
    if (found.length) return opts.districtId;
  }

  // 2) Map cityId -> districtId (state+name join)
  const tryMap = async (cityId: number) => {
    const rows = await prisma.$queryRaw<Array<{ districtId: number }>>(Prisma.sql`
      SELECT d.id AS districtId
      FROM tblcities c
      JOIN tbldistricts d
        ON d.stateId = c.stateId
       AND d.districtName = c.cityName
      WHERE c.cityId = ${cityId}
      LIMIT 1
    `);
    return rows.length ? rows[0].districtId : undefined;
  };

  if (opts.cityId) {
    const mapped = await tryMap(opts.cityId);
    if (mapped) return mapped;
  }

  // 3) If districtId was actually a cityId
  if (opts.districtId) {
    const mapped = await tryMap(opts.districtId);
    if (mapped) return mapped;
  }

  return undefined;
}


export class FuelService {

  // REPLACE the whole `metros` method with this version
  async metros(q: FuelMetrosQuery) {
    const fuels = q.fuelType ? [q.fuelType] : [1, 2, 3] as const;
    const hasDays = Number.isFinite(q.days as number);
    const days = hasDays ? Number(q.days) : undefined;

    const key = cacheKey({
      ns: 'fuel:metros',
      v: 2,                               // bump cache
      fuels: fuels.join(','),
      days: days ?? 'latest',             // cache key includes days vs latest
    });
    const ttlMs = 10 * 60 * 1000;

    return withCache(key, async () => {
      // If days requested → return last N days history
      if (hasDays && days) {
        const raw = await repo.metrosHistory(METRO_IDS, [...fuels], days);

        if (q.fuelType) {
          // Single fuel → flat list: one item per city with history[]
          const byCity: Record<number, {
            districtId: number;
            cityName: string | null;
            stateId: number | null;
            stateName: string | null;
            fuelType: number;
            history: { day: string; price: number | null }[];
          }> = {};

          for (const r of raw) {
            if (r.fuelType !== q.fuelType) continue;
            if (!byCity[r.districtId]) {
              byCity[r.districtId] = {
                districtId: r.districtId,
                cityName: r.cityName,
                stateId: r.stateId,
                stateName: r.stateName,
                fuelType: r.fuelType,
                history: [],
              };
            }
            byCity[r.districtId].history.push({
              day: r.day,
              price: r.price == null ? null : Number(r.price),
            });
          }

          // Keep fixed METRO_IDS order
          return METRO_IDS
            .map(id => byCity[id])
            .filter(Boolean);
        }

        // All fuels → group by city, then fuel → history[]
        const byCity: Record<number, any> = {};
        for (const r of raw) {
          if (!byCity[r.districtId]) {
            byCity[r.districtId] = {
              districtId: r.districtId,
              cityName: r.cityName,
              stateId: r.stateId,
              stateName: r.stateName,
              petrol: { history: [] as Array<{ day: string; price: number | null }> },
              diesel: { history: [] as Array<{ day: string; price: number | null }> },
              cng: { history: [] as Array<{ day: string; price: number | null }> },
            };
          }
          const entry = { day: r.day, price: r.price == null ? null : Number(r.price) };
          if (r.fuelType === 1) byCity[r.districtId].petrol.history.push(entry);
          if (r.fuelType === 2) byCity[r.districtId].diesel.history.push(entry);
          if (r.fuelType === 3) byCity[r.districtId].cng.history.push(entry);
        }

        return METRO_IDS
          .map(id => byCity[id])
          .filter(Boolean);
      }

      // No days → behave as earlier (latest + prev)
      const raw = await repo.metrosLatest(METRO_IDS, [...fuels]);

      if (q.fuelType) {
        // return flat rows for a single fuel
        return raw
          .filter(r => r.fuelType === q.fuelType)
          .map(r => ({
            districtId: r.districtId,
            cityName: r.cityName,
            stateId: r.stateId,
            stateName: r.stateName,
            fuelType: r.fuelType,
            price: r.price == null ? null : Number(r.price),
            prevPrice: r.prevPrice == null ? null : Number(r.prevPrice),
            change: (r.price == null || r.prevPrice == null)
              ? null : Number((Number(r.price) - Number(r.prevPrice)).toFixed(2)),
            updatedAt: r.ts ? new Date(r.ts).toISOString() : null,
          }));
      }

      // combined (three fuels) grouped by city
      const byCity: Record<number, any> = {};
      for (const r of raw) {
        if (!byCity[r.districtId]) {
          byCity[r.districtId] = {
            districtId: r.districtId,
            cityName: r.cityName,
            stateId: r.stateId,
            stateName: r.stateName,
            petrol: null, diesel: null, cng: null,
          };
        }
        const block = {
          price: r.price == null ? null : Number(r.price),
          prevPrice: r.prevPrice == null ? null : Number(r.prevPrice),
          change: (r.price == null || r.prevPrice == null)
            ? null : Number((Number(r.price) - Number(r.prevPrice)).toFixed(2)),
          updatedAt: r.ts ? new Date(r.ts).toISOString() : null,
        };
        if (r.fuelType === 1) byCity[r.districtId].petrol = block;
        if (r.fuelType === 2) byCity[r.districtId].diesel = block;
        if (r.fuelType === 3) byCity[r.districtId].cng = block;
      }

      return METRO_IDS
        .map(id => byCity[id])
        .filter(Boolean);
    }, ttlMs);
  }


  async latestPopularByState(stateId: number, fuelType: number) {
    const key = cacheKey({ ns: 'fuel:latestPopularByState', v: 1, stateId, fuelType });
    const ttlMs = 5 * 60 * 1000;
    return withCache(key, async () => {
      const rows = await repo.latestPopularByState(stateId, fuelType);
      return rows.map(r => ({
        districtId: r.districtId,
        cityName: r.cityName,
        stateId: r.stateId,
        isPopularCity: r.isPopularCity ?? null,
        price: r.price == null ? null : Number(r.price),
        prevPrice: r.prevPrice == null ? null : Number(r.prevPrice),
        change: (r.price == null || r.prevPrice == null)
          ? null
          : Number((Number(r.price) - Number(r.prevPrice)).toFixed(2)),
        updatedAt: r.ts ? new Date(r.ts).toISOString() : null,
      }));
    }, ttlMs);
  }

  /** latest for city/state with delta */
  async latest(q: FuelLatestQuery) {
    const districtId = await resolveDistrictId({ districtId: q.districtId, cityId: q.cityId });
    const scope = districtId ? { key: `dist:${districtId}` } : { key: `state:${q.stateId}` };
    const key = cacheKey({ ns: 'fuel:latest', v: 4, fuelType: q.fuelType, scope: scope.key });
    const ttlMs = 5 * 60 * 1000;

    return withCache(key, async () => {
      return districtId
        ? repo.latestByDistrict(districtId, q.fuelType)
        : repo.latestByState(q.stateId!, q.fuelType);
    }, ttlMs);
  }

  /** history last N days for city/state */
  async history(q: FuelHistoryQuery) {
    const days = q.days ?? 10;
    const districtId = await resolveDistrictId({ districtId: q.districtId, cityId: q.cityId });
    const scope = districtId ? { key: `dist:${districtId}` } : { key: `state:${q.stateId}` };
    const key = cacheKey({ ns: 'fuel:history', v: 3, fuelType: q.fuelType, days, scope: scope.key });
    const ttlMs = 10 * 60 * 1000;

    return withCache(key, async () => {
      return districtId
        ? repo.historyByDistrict(districtId, q.fuelType, days)
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
          change: (r.prevPrice == null || r.price == null)
            ? null
            : Number((Number(r.price) - Number(r.prevPrice)).toFixed(2)),
          updatedAt: r.ts ? new Date(r.ts).toISOString() : null,
        })),
        page, pageSize: limit, total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      };
    }, ttlMs);
  }

  /** city list within a state (popular filter supported) */
  async cities(q: FuelCitiesListQuery) {
    const page = q.page ?? 1;
    const limit = Math.max(1, Math.min(q.limit ?? 50, 100));
    const skip = (page - 1) * limit;

    const key = cacheKey({
      ns: 'fuel:cities', v: 1,
      fuelType: q.fuelType, stateId: q.stateId,
      page, limit, sortBy: q.sortBy ?? 'name_asc',
      q: q.q ?? undefined,
      popular: typeof q.popular === 'number' ? q.popular : undefined,
    });
    const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    return withCache(key, async () => {
      const { rows, total } = await repo.citiesLatest(q.stateId, q.fuelType, {
        q: q.q, skip, take: limit, sortBy: q.sortBy, popular: q.popular,
      });
      return {
        rows: rows.map(r => ({
          districtId: r.districtId,
          cityName: r.cityName,
          stateId: r.stateId,
          price: r.price == null ? null : Number(r.price),
          prevPrice: r.prevPrice == null ? null : Number(r.prevPrice),
          change: (r.prevPrice == null || r.price == null)
            ? null
            : Number((Number(r.price) - Number(r.prevPrice)).toFixed(2)),
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

      // per-day delta
      let prevP: number | null = null, prevD: number | null = null, prevC: number | null = null;
      const rows = raw.map(r => {
        const p = r.petrol == null ? null : Number(r.petrol);
        const d = r.diesel == null ? null : Number(r.diesel);
        const c = r.cng == null ? null : Number(r.cng);

        const petrolChange = (p == null || prevP == null) ? null : Number((p - prevP).toFixed(2));
        const dieselChange = (d == null || prevD == null) ? null : Number((d - prevD).toFixed(2));
        const cngChange = (c == null || prevC == null) ? null : Number((c - prevC).toFixed(2));

        prevP = p ?? prevP;
        prevD = d ?? prevD;
        prevC = c ?? prevC;

        return { day: r.day, petrol: p, petrolChange, diesel: d, dieselChange, cng: c, cngChange };
      });

      return rows;
    }, ttlMs);
  }

  /** monthly trends (one fuel, city or cityId->district mapped) */
  async monthlyTrends(q: FuelMonthlyTrendsQuery) {
    const months = q.months ?? 6;

    // 🔁 Resolve districtId from cityId if needed
    let districtId = q.districtId ?? null;
    if (!districtId && q.cityId) {
      districtId = await repo.mapCityIdToDistrictId(q.cityId);
    }
    if (!districtId) {
      return { city: null, fuelType: q.fuelType, months: [] }; // nothing to do
    }

    const key = cacheKey({
      ns: 'fuel:monthlyTrends', v: 2,     // bump cache version
      fuelType: q.fuelType, districtId, months,
    });
    const ttlMs = 10 * 60 * 1000;

    return withCache(key, async () => {
      const meta = await repo.getDistrictMeta(districtId!);
      const rows = await repo.monthlyTrendsByDistrict(districtId!, q.fuelType, months);

      const monthsData = rows.map(r => ({
        month: r.ym, // 'YYYY-MM'
        firstPrice: r.firstPrice == null ? null : Number(r.firstPrice),
        lastPrice: r.lastPrice == null ? null : Number(r.lastPrice),
        netChange: (r.firstPrice == null || r.lastPrice == null) ? null :
          Number((Number(r.lastPrice) - Number(r.firstPrice)).toFixed(2)),
        avgPrice: r.avgPrice == null ? null : Number(Number(r.avgPrice).toFixed(2)),
        highest: r.highestPrice == null ? null : {
          price: Number(r.highestPrice),
          date: r.highestDate ? new Date(r.highestDate).toISOString().slice(0, 10) : null
        },
        lowest: r.lowestPrice == null ? null : {
          price: Number(r.lowestPrice),
          date: r.lowestDate ? new Date(r.lowestDate).toISOString().slice(0, 10) : null
        },
      }));

      return {
        city: {
          districtId,
          name: meta?.districtName ?? null,
          stateId: meta?.stateId ?? null,
          stateName: meta?.stateName ?? null,
        },
        fuelType: q.fuelType,
        months: monthsData, // newest → oldest
      };
    }, ttlMs);
  }

}

