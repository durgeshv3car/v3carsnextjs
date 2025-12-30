import { StatesRepo } from './states.repo.js';
import { withCache, cacheKey } from '../../../lib/cache.js';
const repo = new StatesRepo();
export class StatesService {
    /** List (p1 10m, others 5m) */
    async list(q) {
        const page = q?.page ?? 1;
        const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;
        const key = cacheKey({
            ns: 'states:list',
            v: 1,
            page,
            limit: q?.limit ?? 50,
            q: q?.q ?? undefined,
            countryId: q?.countryId ?? undefined,
            isTodayFuelPrice: typeof q?.isTodayFuelPrice === 'boolean' ? (q.isTodayFuelPrice ? 1 : 0) : undefined,
            sortBy: q?.sortBy ?? 'name_asc',
        });
        return withCache(key, () => repo.list(q), ttlMs);
    }
    /** Detail (30m) */
    async getById(id) {
        const key = cacheKey({ ns: 'state:detail', v: 1, id });
        const ttlMs = 30 * 60 * 1000;
        return withCache(key, () => repo.getById(id), ttlMs);
    }
}
