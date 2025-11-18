import { CitiesRepo } from './cities.repo.js';
// 🔑 Cache façade
import { withCache, cacheKey } from '../../../lib/cache.js';
const repo = new CitiesRepo();
export class CitiesService {
    /** List cities (page 1 hotter ⇒ longer TTL) */
    async list(q) {
        const page = q?.page ?? 1;
        const limit = q?.limit ?? 50;
        // TTLs: p1 => 10m, others => 5m
        const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;
        const key = cacheKey({
            ns: 'cities:list',
            v: 1,
            page,
            limit,
            q: q?.q ?? undefined,
            stateId: q?.stateId ?? undefined,
            sortBy: q?.sortBy ?? 'name_asc',
            isActive: typeof q?.isActive === 'boolean'
                ? (q.isActive ? 1 : 0)
                : undefined,
        });
        return withCache(key, async () => {
            return repo.list(q);
        }, ttlMs);
    }
    /** City detail — cache 30m */
    async getById(id) {
        const key = cacheKey({ ns: 'city:detail', v: 1, id });
        const ttlMs = 30 * 60 * 1000;
        return withCache(key, async () => {
            return repo.getById(id);
        }, ttlMs);
    }
}
