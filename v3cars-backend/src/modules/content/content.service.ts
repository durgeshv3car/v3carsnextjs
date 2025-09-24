import { env } from '../../config/env.js';
import { ContentRepo } from './content.repo.js';
import type { ContentCard, ContentLatestQuery, ContentListQuery } from './content.types.js';
import { PowertrainsService } from '../cars/powertrains/powertrains.service.js';

// 🔑 Cache façade
import { withCache, cacheKey } from '../../lib/cache.js';

const repo = new ContentRepo();
const powertrains = new PowertrainsService();

function makeUrl(u?: string | null): string | null {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  const base = (env.MEDIA_BASE_URL || '').replace(/\/+$/, '');
  const path = u.replace(/^\/+/, '');
  return base ? `${base}/${path}` : u;
}

async function hydrate(rows: Array<{
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: Date;
  shortDescription: string | null;
  thumbnailAltText: string | null;
  thumbnailUrl: string | null;
  authorId: number;
}>): Promise<ContentCard[]> {
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
      ? { id: r.authorId, name: authorMap.get(r.authorId)!.name, slug: authorMap.get(r.authorId)!.url_slug ?? null }
      : null,
    commentsCount: commentsMap.get(r.id) ?? 0,
  }));
}

export class ContentService {
  /** 🆕 optional fuelType (e.g., Electric) to scope by EV models */
  private async modelIdsForFuel(fuelType?: string): Promise<number[] | undefined> {
    const ft = fuelType?.trim();
    if (!ft) return undefined;
    // NOTE: empty => undefined (so fallback title LIKE filters remain possible in repo)
    const ids = await powertrains.findModelIdsByFuel({ fuelType: ft });
    return ids.length ? ids : undefined;
  }

  /** Single most-recent item for a contentType (e.g., NEWS) */
  async today(contentType: number, q?: { fuelType?: string }): Promise<ContentCard | null> {
    const ft = q?.fuelType?.trim() || undefined;
    const key = cacheKey({ ns: 'content:today', v: 1, type: contentType, fuelType: ft });
    const ttlMs = 2 * 60 * 1000; // 2m — fresh but cacheable

    return withCache(key, async () => {
      const modelIds = await this.modelIdsForFuel(ft);
      const row = await repo.getToday(contentType, modelIds, ft);
      if (!row) return null;
      const [card] = await hydrate([row as any]);
      return card ?? null;
    }, ttlMs);
  }

  /** Latest list (date DESC); optionally exclude the "today" item */
  async latest(contentType: number, q: ContentLatestQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;
    const excludeToday = q.excludeToday !== false; // default true

    const key = cacheKey({
      ns: 'content:latest',
      v: 1,
      type: contentType,
      limit,
      excludeToday,
      fuelType: ft,
    });
    const ttlMs = 3 * 60 * 1000; // 3m

    return withCache(key, async () => {
      const modelIds = await this.modelIdsForFuel(ft);

      let excludeId: number | undefined = undefined;
      if (excludeToday) {
        const today = await repo.getToday(contentType, modelIds, ft);
        excludeId = today?.id;
      }

      const rows = await repo.listLatest(contentType, limit, excludeId, modelIds, ft);
      return hydrate(rows as any);
    }, ttlMs);
  }

  /** Trending (last_15days_view DESC) */
  async trending(contentType: number, q: ContentListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;

    const key = cacheKey({
      ns: 'content:trending',
      v: 1,
      type: contentType,
      limit,
      fuelType: ft,
    });
    const ttlMs = 2 * 60 * 1000; // 2m

    return withCache(key, async () => {
      const modelIds = await this.modelIdsForFuel(ft);
      const rows = await repo.listTrending(contentType, limit, modelIds, ft);
      return hydrate(rows as any);
    }, ttlMs);
  }

  /** Top (last_30days_view DESC) */
  async top(contentType: number, q: ContentListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const ft = q.fuelType?.trim() || undefined;

    const key = cacheKey({
      ns: 'content:top',
      v: 1,
      type: contentType,
      limit,
      fuelType: ft,
    });
    const ttlMs = 5 * 60 * 1000; // 5m

    return withCache(key, async () => {
      const modelIds = await this.modelIdsForFuel(ft);
      const rows = await repo.listTop(contentType, limit, modelIds, ft);
      return hydrate(rows as any);
    }, ttlMs);
  }
}
