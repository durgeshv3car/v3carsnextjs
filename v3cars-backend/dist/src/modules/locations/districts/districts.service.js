import { DistrictsRepo } from './districts.repo.js';
import { withCache, cacheKey } from '../../../lib/cache.js';
const repo = new DistrictsRepo();
export class DistrictsService {
    async list(q) {
        const page = q?.page ?? 1;
        const limit = q?.limit ?? 50;
        const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;
        const key = cacheKey({
            ns: 'districts:list',
            v: 1,
            page,
            limit,
            q: q.q ?? undefined,
            stateId: q.stateId ?? undefined,
            sortBy: q.sortBy ?? 'name_asc',
            popularAny: q.popularAny ? 1 : 0,
            popularRank: q.popularRank ?? undefined,
        });
        return withCache(key, () => repo.list(q), ttlMs);
    }
    async getById(id) {
        const key = cacheKey({ ns: 'district:detail', v: 1, id });
        const ttlMs = 30 * 60 * 1000;
        return withCache(key, () => repo.getById(id), ttlMs);
    }
}
