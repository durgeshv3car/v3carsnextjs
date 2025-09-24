// src/modules/location/cities/cities.service.ts
import type { CitiesListQuery } from './cities.types.js';
import { CitiesRepo } from './cities.repo.js';

// 🔑 Cache façade
import { withCache, cacheKey } from '../../../lib/cache.js';

const repo = new CitiesRepo();

export class CitiesService {
  /** List cities (page 1 hotter ⇒ longer TTL) */
  async list(q: CitiesListQuery) {
    const page = q?.page ?? 1;
    const limit = q?.limit ?? 50;

    // TTLs: p1 => 10m, others => 5m
    const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    const key = cacheKey({
      ns: 'cities:list',
      v: 1,
      page,
      limit,
      q: (q as any)?.q ?? undefined,
      stateId: (q as any)?.stateId ?? undefined,
      sortBy: (q as any)?.sortBy ?? 'name_asc',
      isActive: typeof (q as any)?.isActive === 'boolean'
        ? ((q as any).isActive ? 1 : 0)
        : undefined,
    });

    return withCache(key, async () => {
      return repo.list(q);
    }, ttlMs);
  }

  /** City detail — cache 30m */
  async getById(id: number) {
    const key = cacheKey({ ns: 'city:detail', v: 1, id });
    const ttlMs = 30 * 60 * 1000;
    return withCache(key, async () => {
      return repo.getById(id);
    }, ttlMs);
  }
}
