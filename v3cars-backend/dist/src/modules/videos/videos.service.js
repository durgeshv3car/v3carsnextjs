import { env } from '../../config/env.js';
import { VideosRepo } from './videos.repo.js';
import { withCache, cacheKey } from '../../lib/cache.js';
const repo = new VideosRepo();
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
    const authors = await repo.findAuthorsByIds(authorIds);
    const authorMap = new Map(authors.map(a => [a.id, a]));
    return rows.map(r => ({
        id: r.videoId,
        title: r.video_title,
        pageUrl: r.pageUrl,
        publishDateandTime: r.dateTimePublishing.toISOString(),
        thumbnail: { url: makeUrl(r.video_thumbnail), alt: r.video_title },
        videoYId: r.videoYId,
        author: authorMap.has(r.authorId)
            ? { id: r.authorId, name: authorMap.get(r.authorId).name, slug: authorMap.get(r.authorId).url_slug ?? null }
            : null,
    }));
}
// ------------------------
// GLOBAL / TYPE-SCOPED (unchanged)
// ------------------------
export class VideosService {
    async today(videoType) {
        const key = cacheKey({ ns: 'videos:today', v: 3, type: videoType });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const row = await repo.getToday(videoType);
            if (!row)
                return null;
            const [card] = await hydrate([row]);
            return card ?? null;
        }, ttlMs);
    }
    async latest(videoType, q) {
        const limit = q.limit ?? 9;
        const excludeToday = q.excludeToday !== false;
        const key = cacheKey({ ns: 'videos:latest', v: 3, type: videoType, limit, excludeToday });
        const ttlMs = 3 * 60 * 1000;
        return withCache(key, async () => {
            let excludeId = undefined;
            if (excludeToday) {
                const today = await repo.getToday(videoType);
                excludeId = today?.videoId;
            }
            const rows = await repo.listLatest(videoType, limit, excludeId);
            return hydrate(rows);
        }, ttlMs);
    }
    async trending(videoType, q) {
        const limit = q.limit ?? 9;
        const key = cacheKey({ ns: 'videos:trending', v: 3, type: videoType, limit });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => hydrate(await repo.listTrending(videoType, limit)), ttlMs);
    }
    async top(videoType, q) {
        const limit = q.limit ?? 9;
        const key = cacheKey({ ns: 'videos:top', v: 3, type: videoType, limit });
        const ttlMs = 5 * 60 * 1000;
        return withCache(key, async () => hydrate(await repo.listTop(videoType, limit)), ttlMs);
    }
    async latestGlobal(q) {
        const limit = q.limit ?? 9;
        const key = cacheKey({ ns: 'videos:latestGlobal', v: 3, limit });
        const ttlMs = 3 * 60 * 1000;
        return withCache(key, async () => hydrate(await repo.listLatestGlobal(limit)), ttlMs);
    }
    async popularGlobal(q) {
        const limit = q.limit ?? 9;
        const key = cacheKey({ ns: 'videos:popularGlobal', v: 3, limit });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => hydrate(await repo.listPopularGlobal(limit)), ttlMs);
    }
    // ------------------------
    // ✅ MODEL-SCOPED using LEFT JOIN tbltagging (legacy-compatible)
    // ------------------------
    async todayByModel(videoType, modelId) {
        const key = cacheKey({ ns: 'videos:model:today', v: 1, type: videoType, modelId });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => {
            const row = await repo.getTodayByModel(videoType, modelId);
            if (!row)
                return null;
            const [card] = await hydrate([row]);
            return card ?? null;
        }, ttlMs);
    }
    async latestByModel(videoType, modelId, q) {
        const limit = q.limit ?? 15;
        const key = cacheKey({ ns: 'videos:model:latest', v: 1, type: videoType, modelId, limit });
        const ttlMs = 3 * 60 * 1000;
        return withCache(key, async () => {
            const rows = await repo.listLatestByModel(videoType, modelId, limit);
            return hydrate(rows);
        }, ttlMs);
    }
    async trendingByModel(videoType, modelId, q) {
        const limit = q.limit ?? 15;
        const key = cacheKey({ ns: 'videos:model:trending', v: 1, type: videoType, modelId, limit });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => hydrate(await repo.listTrendingByModel(videoType, modelId, limit)), ttlMs);
    }
    async topByModel(videoType, modelId, q) {
        const limit = q.limit ?? 15;
        const key = cacheKey({ ns: 'videos:model:top', v: 1, type: videoType, modelId, limit });
        const ttlMs = 5 * 60 * 1000;
        return withCache(key, async () => hydrate(await repo.listTopByModel(videoType, modelId, limit)), ttlMs);
    }
    /** popular across ALL types for a model */
    async popularByModel(modelId, q) {
        const limit = q.limit ?? 15;
        const key = cacheKey({ ns: 'videos:model:popular', v: 1, modelId, limit });
        const ttlMs = 2 * 60 * 1000;
        return withCache(key, async () => hydrate(await repo.listPopularByModel(modelId, limit)), ttlMs);
    }
}
