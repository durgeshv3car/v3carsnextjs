import { env } from '../../config/env.js';
import { VideosRepo } from './videos.repo.js';
import type { VideoCard, LatestVideosQuery, VideosListQuery } from './videos.types.js';
import { PowertrainsService } from '../cars/powertrains/powertrains.service.js';
import { withCache, cacheKey } from '../../lib/cache.js';

const repo = new VideosRepo();
const powertrains = new PowertrainsService();

function makeUrl(u?: string | null): string | null {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  const base = (env.MEDIA_BASE_URL || '').replace(/\/+$/, '');
  const path = u.replace(/^\/+/, '');
  return base ? `${base}/${path}` : u;
}

async function hydrate(rows: Array<{
  videoId: number;
  video_title: string;
  metaDescription?: string | null;
  pageUrl: string;
  video_thumbnail: string | null;
  videoYId: string;
  authorId: number;
  dateTimePublishing: Date;
}>): Promise<VideoCard[]> {
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
      ? { id: r.authorId, name: authorMap.get(r.authorId)!.name, slug: authorMap.get(r.authorId)!.url_slug ?? null }
      : null,
  }));
}

async function modelIdsForFuel(fuelType?: string): Promise<number[] | undefined> {
  const ft = fuelType?.trim();
  if (!ft) return undefined;
  const ids = await powertrains.findModelIdsByFuel({ fuelType: ft });
  return ids.length ? ids : [-1];
}

export class VideosService {
  async today(videoType: number, q?: { fuelType?: string; authorId?: number }) {
    const ft = q?.fuelType?.trim() || undefined;
    const authorId = q?.authorId;
    const key = cacheKey({ ns: 'videos:today', v: 2, type: videoType, fuelType: ft, authorId }); // 🔺v bump

    const ttlMs = 2 * 60 * 1000;
    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const row = await repo.getToday(videoType, modelIds, ft, authorId);
      if (!row) return null;
      const [card] = await hydrate([row]);
      return card ?? null;
    }, ttlMs);
  }

  async latest(videoType: number, q: LatestVideosQuery & { fuelType?: string; authorId?: number }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;
    const authorId = q.authorId;
    const excludeToday = q.excludeToday !== false;

    const key = cacheKey({
      ns: 'videos:latest',
      v: 2, // 🔺
      type: videoType,
      limit,
      excludeToday,
      fuelType: ft,
      authorId,
    });
    const ttlMs = 3 * 60 * 1000;

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      let excludeId: number | undefined = undefined;
      if (excludeToday) {
        const today = await repo.getToday(videoType, modelIds, ft, authorId);
        excludeId = today?.videoId;
      }
      const rows = await repo.listLatest(videoType, limit, excludeId, modelIds, ft, authorId);
      return hydrate(rows);
    }, ttlMs);
  }

  async latestGlobal(q: LatestVideosQuery & { fuelType?: string; authorId?: number }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;
    const authorId = q.authorId;

    const key = cacheKey({ ns: 'videos:latestGlobal', v: 2, limit, fuelType: ft, authorId }); // 🔺
    const ttlMs = 3 * 60 * 1000;

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listLatestGlobal(limit, modelIds, ft, authorId);
      return hydrate(rows);
    }, ttlMs);
  }

  async trending(videoType: number, q: VideosListQuery & { fuelType?: string; authorId?: number }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;
    const authorId = q.authorId;

    const key = cacheKey({ ns: 'videos:trending', v: 2, type: videoType, limit, fuelType: ft, authorId }); // 🔺
    const ttlMs = 2 * 60 * 1000;

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listTrending(videoType, limit, modelIds, ft, authorId);
      return hydrate(rows);
    }, ttlMs);
  }

  async top(videoType: number, q: VideosListQuery & { fuelType?: string; authorId?: number }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;
    const authorId = q.authorId;

    const key = cacheKey({ ns: 'videos:top', v: 2, type: videoType, limit, fuelType: ft, authorId }); // 🔺
    const ttlMs = 5 * 60 * 1000;

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listTop(videoType, limit, modelIds, ft, authorId);
      return hydrate(rows);
    }, ttlMs);
  }

  async popularGlobal(q: VideosListQuery & { fuelType?: string; authorId?: number }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;
    const authorId = q.authorId;

    const key = cacheKey({ ns: 'videos:popularGlobal', v: 2, limit, fuelType: ft, authorId }); // 🔺
    const ttlMs = 2 * 60 * 1000;

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listPopularGlobal(limit, modelIds, ft, authorId);
      return hydrate(rows);
    }, ttlMs);
  }
}
