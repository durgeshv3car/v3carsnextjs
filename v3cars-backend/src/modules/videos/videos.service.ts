import { env } from '../../config/env.js';
import { VideosRepo } from './videos.repo.js';
import type { VideoCard, LatestVideosQuery, VideosListQuery } from './videos.types.js';
import { PowertrainsService } from '../cars/powertrains/powertrains.service.js';

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

async function modelIdsForFuel(fuelType?: string): Promise<number[] | undefined> {
  const ft = fuelType?.trim();
  if (!ft) return undefined;
  const ids = await powertrains.findModelIdsByFuel({ fuelType: ft });
  return ids.length ? ids : [-1];
}

export class VideosService {
  async today(videoType: number, q?: { fuelType?: string }) {
    const modelIds = await modelIdsForFuel(q?.fuelType);
    const row = await repo.getToday(videoType, modelIds, q?.fuelType);
    if (!row) return null;
    const [card] = await hydrate([row]);
    return card ?? null;
  }

  async latest(videoType: number, q: LatestVideosQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const modelIds = await modelIdsForFuel(q.fuelType);

    let excludeId: number | undefined = undefined;
    if (q.excludeToday !== false) {
      const today = await repo.getToday(videoType, modelIds, q.fuelType);
      excludeId = today?.videoId;
    }
    const rows = await repo.listLatest(videoType, limit, excludeId, modelIds, q.fuelType);
    return hydrate(rows);
  }

  /** Global latest (no videoType) — optional EV scope */
  async latestGlobal(q: LatestVideosQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const modelIds = await modelIdsForFuel(q.fuelType);
    const rows = await repo.listLatestGlobal(limit, modelIds, q.fuelType);
    return hydrate(rows);
  }

  async trending(videoType: number, q: VideosListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const modelIds = await modelIdsForFuel(q.fuelType);
    const rows = await repo.listTrending(videoType, limit, modelIds, q.fuelType);
    return hydrate(rows);
  }

  async top(videoType: number, q: VideosListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const modelIds = await modelIdsForFuel(q.fuelType);
    const rows = await repo.listTop(videoType, limit, modelIds, q.fuelType);
    return hydrate(rows);
  }
}
