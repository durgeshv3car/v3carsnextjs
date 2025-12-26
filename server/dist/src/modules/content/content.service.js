import { env } from '../../config/env.js';
import { ContentRepo } from './content.repo.js';
import { PowertrainsService } from '../cars/powertrains/powertrains.service.js';
import { withCache, cacheKey } from '../../lib/cache.js';
const repo = new ContentRepo();
const powertrains = new PowertrainsService();
function makeUrl(u) {
    if (!u)
        return null;
    if (/^https?:\/\//i.test(u))
        return u;
    const base = (env.MEDIA_BASE_URL || '').replace(/\/+$/, '');
    const path = u.replace(/^\/+/, '');
    return base ? `${base}/${path}` : u;
}
async function hydrate(rows) {
    const authorIds = Array.from(new Set(rows.map(r => r.authorId).filter(x => typeof x === 'number')));
    const contentIds = rows.map(r => r.id);
    const [authors, commentsMap] = await Promise.all([
        repo.findAuthorsByIds(authorIds),
        repo.countCommentsByContentIds(contentIds),
    ]);
    const authorMap = new Map(authors.map(a => [a.id, a]));
    return rows.map(r => ({
        id: r.id,
        title: r.title,
        pageUrl: r.pageUrl,
        publishDateandTime: r.publishDateandTime.toISOString(),
        shortDescription: r.shortDescription,
        thumbnail: { url: makeUrl(r.thumbnailUrl), alt: r.thumbnailAltText },
        author: authorMap.has(r.authorId)
            ? { id: r.authorId, name: authorMap.get(r.authorId).name, slug: authorMap.get(r.authorId).url_slug ?? null }
            : null,
        commentsCount: commentsMap.get(r.id) ?? 0,
    }));
}
export class ContentService {
    /** 🆕 optional fuelType (e.g., Electric) to scope by EV models */
    async modelIdsForFuel(fuelType) {
        const ft = fuelType?.trim();
        if (!ft)
            return undefined;
        const ids = await powertrains.findModelIdsByFuel({ fuelType: ft });
        return ids.length ? ids : undefined;
    }
    // -------------------- existing (site-wide) --------------------
    async today(contentType, q) {
        const ft = q?.fuelType?.trim() || undefined;
        const key = cacheKey({ ns: 'content:today', v: 1, type: contentType, fuelType: ft });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const modelIds = await this.modelIdsForFuel(ft);
            const row = await repo.getToday(contentType, modelIds, ft);
            if (!row)
                return null;
            const [card] = await hydrate([row]);
            return card ?? null;
        }, ttlMs);
    }
    async latest(contentType, q) {
        const limit = q.limit ?? 9;
        const ft = q.fuelType?.trim() || undefined;
        const excludeToday = q.excludeToday !== false;
        const key = cacheKey({ ns: 'content:latest', v: 1, type: contentType, limit, excludeToday, fuelType: ft });
        const ttlMs = 3 * 60 * 1000;
        return withCache(key, async () => {
            const modelIds = await this.modelIdsForFuel(ft);
            let excludeId = undefined;
            if (excludeToday) {
                const today = await repo.getToday(contentType, modelIds, ft);
                excludeId = today?.id;
            }
            const rows = await repo.listLatest(contentType, limit, excludeId, modelIds, ft);
            return hydrate(rows);
        }, ttlMs);
    }
    async trending(contentType, q) {
        const limit = q.limit ?? 9;
        const ft = q.fuelType?.trim() || undefined;
        const key = cacheKey({ ns: 'content:trending', v: 1, type: contentType, limit, fuelType: ft });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const modelIds = await this.modelIdsForFuel(ft);
            const rows = await repo.listTrending(contentType, limit, modelIds, ft);
            return hydrate(rows);
        }, ttlMs);
    }
    async top(contentType, q) {
        const limit = q.limit ?? 9;
        const ft = q.fuelType?.trim() || undefined;
        const key = cacheKey({ ns: 'content:top', v: 1, type: contentType, limit, fuelType: ft });
        const ttlMs = 5 * 60 * 1000;
        return withCache(key, async () => {
            const modelIds = await this.modelIdsForFuel(ft);
            const rows = await repo.listTop(contentType, limit, modelIds, ft);
            return hydrate(rows);
        }, ttlMs);
    }
    async popular(contentType, q) {
        const limit = q.limit ?? 9;
        const ft = q.fuelType?.trim() || undefined;
        const key = cacheKey({ ns: 'content:popular', v: 1, type: contentType, limit, fuelType: ft });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const modelIds = await this.modelIdsForFuel(ft);
            const rows = await repo.listPopular(contentType, limit, modelIds, ft);
            return hydrate(rows);
        }, ttlMs);
    }
    // -------------------- NEW: strict-by-modelId via tbltagging --------------------
    async todayForModel(contentType, modelId) {
        const key = cacheKey({ ns: 'content:today:model', v: 1, type: contentType, modelId });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const row = await repo.getTodayByModel(contentType, modelId);
            if (!row)
                return null;
            const [card] = await hydrate([row]);
            return card ?? null;
        }, ttlMs);
    }
    async latestForModel(contentType, modelId, q) {
        const limit = q.limit ?? 15;
        const excludeToday = q.excludeToday !== false;
        const key = cacheKey({ ns: 'content:latest:model', v: 1, type: contentType, modelId, limit, excludeToday });
        const ttlMs = 3 * 60 * 1000;
        return withCache(key, async () => {
            let excludeId = undefined;
            if (excludeToday) {
                const today = await repo.getTodayByModel(contentType, modelId);
                excludeId = today?.id;
            }
            const rows = await repo.listLatestByModel(contentType, modelId, limit, excludeId);
            return hydrate(rows);
        }, ttlMs);
    }
    async trendingForModel(contentType, modelId, q) {
        const limit = q.limit ?? 9;
        const key = cacheKey({ ns: 'content:trending:model', v: 1, type: contentType, modelId, limit });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const rows = await repo.listTrendingByModel(contentType, modelId, limit);
            return hydrate(rows);
        }, ttlMs);
    }
    async topForModel(contentType, modelId, q) {
        const limit = q.limit ?? 9;
        const key = cacheKey({ ns: 'content:top:model', v: 1, type: contentType, modelId, limit });
        const ttlMs = 5 * 60 * 1000;
        return withCache(key, async () => {
            const rows = await repo.listTopByModel(contentType, modelId, limit);
            return hydrate(rows);
        }, ttlMs);
    }
    async popularForModel(contentType, modelId, q) {
        const limit = q.limit ?? 9;
        const key = cacheKey({ ns: 'content:popular:model', v: 1, type: contentType, modelId, limit });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const rows = await repo.listPopularByModel(contentType, modelId, limit);
            return hydrate(rows);
        }, ttlMs);
    }
}
