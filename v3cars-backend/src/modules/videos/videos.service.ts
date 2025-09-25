import { env } from '../../config/env.js';
import { VideosRepo } from './videos.repo.js';
import type { VideoCard, LatestVideosQuery, VideosListQuery } from './videos.types.js';
import { PowertrainsService } from '../cars/powertrains/powertrains.service.js';

// 🔑 Cache façade
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
    metaDescription: r.metaDescription,
    pageUrl: r.pageUrl,
    publishDateandTime: r.dateTimePublishing.toISOString(),
    thumbnail: { url: makeUrl(r.video_thumbnail), alt: r.video_title },
    videoYId: r.videoYId,
    author: authorMap.has(r.authorId)
      ? { id: r.authorId, name: authorMap.get(r.authorId)!.name, slug: authorMap.get(r.authorId)!.url_slug ?? null }
      : null,
  }));
}

/** Optional EV scope helper (keeps existing behaviour of returning [-1] when empty) */
async function modelIdsForFuel(fuelType?: string): Promise<number[] | undefined> {
  const ft = fuelType?.trim();
  if (!ft) return undefined;
  const ids = await powertrains.findModelIdsByFuel({ fuelType: ft });
  return ids.length ? ids : [-1];
}

export class VideosService {

  /** Single most recent video of a type */
  async today(videoType: number, q?: { fuelType?: string }) {
    const ft = q?.fuelType?.trim() || undefined;
    const key = cacheKey({ ns: 'videos:today', v: 1, type: videoType, fuelType: ft });
    const ttlMs = 2 * 60 * 1000; // 2m

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const row = await repo.getToday(videoType, modelIds, ft);
      if (!row) return null;
      const [card] = await hydrate([row]);
      return card ?? null;
    }, ttlMs);
  }

  /** Latest list within a videoType (optionally exclude today's) */
  async latest(videoType: number, q: LatestVideosQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;
    const excludeToday = q.excludeToday !== false; // default true

    const key = cacheKey({
      ns: 'videos:latest',
      v: 1,
      type: videoType,
      limit,
      excludeToday,
      fuelType: ft,
    });
    const ttlMs = 3 * 60 * 1000; // 3m

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      let excludeId: number | undefined = undefined;

      if (excludeToday) {
        const today = await repo.getToday(videoType, modelIds, ft);
        excludeId = today?.videoId;
      }

      const rows = await repo.listLatest(videoType, limit, excludeId, modelIds, ft);
      return hydrate(rows);
    }, ttlMs);
  }

  /** Global latest (no videoType) — optional EV scope */
  async latestGlobal(q: LatestVideosQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;

    const key = cacheKey({
      ns: 'videos:latestGlobal',
      v: 1,
      limit,
      fuelType: ft,
    });
    const ttlMs = 3 * 60 * 1000; // 3m

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listLatestGlobal(limit, modelIds, ft);
      return hydrate(rows);
    }, ttlMs);
  }

  /** Trending (last_15days_view desc) by type */
  async trending(videoType: number, q: VideosListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;

    const key = cacheKey({
      ns: 'videos:trending',
      v: 1,
      type: videoType,
      limit,
      fuelType: ft,
    });
    const ttlMs = 2 * 60 * 1000; // 2m

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listTrending(videoType, limit, modelIds, ft);
      return hydrate(rows);
    }, ttlMs);
  }

  /** Top (last_30days_view desc) by type */
  async top(videoType: number, q: VideosListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;

    const key = cacheKey({
      ns: 'videos:top',
      v: 1,
      type: videoType,
      limit,
      fuelType: ft,
    });
    const ttlMs = 5 * 60 * 1000; // 5m

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listTop(videoType, limit, modelIds, ft);
      return hydrate(rows);
    }, ttlMs);
  }

  /** 🆕 Popular (GLOBAL; no type) — uniqueView DESC */
  async popularGlobal(q: VideosListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;

    const key = cacheKey({
      ns: 'videos:popularGlobal',
      v: 1,
      limit,
      fuelType: ft,
    });
    const ttlMs = 2 * 60 * 1000; // 2m

    return withCache(key, async () => {
      const modelIds = await modelIdsForFuel(ft);
      const rows = await repo.listPopularGlobal(limit, modelIds, ft);
      return hydrate(rows);
    }, ttlMs);
  }
}
