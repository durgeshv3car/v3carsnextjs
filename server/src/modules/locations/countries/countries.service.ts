import type { CountriesListQuery } from './countries.types.js';
import { CountriesRepo } from './countries.repo.js';
import { withCache, cacheKey } from '../../../lib/cache.js';

const repo = new CountriesRepo();

export class CountriesService {
  async list(q: CountriesListQuery) {
    const page = q?.page ?? 1;
    const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    const key = cacheKey({
      ns: 'countries:list',
      v: 1,
      page,
      limit: q?.limit ?? 50,
      q: q?.q ?? undefined,
      isActive: typeof q?.isActive === 'boolean' ? (q.isActive ? 1 : 0) : undefined,
      sortBy: q?.sortBy ?? 'name_asc',
    });

    return withCache(key, () => repo.list(q), ttlMs);
  }

  async getById(id: number) {
    const key = cacheKey({ ns: 'country:detail', v: 1, id });
    const ttlMs = 30 * 60 * 1000;
    return withCache(key, () => repo.getById(id), ttlMs);
  }
}
