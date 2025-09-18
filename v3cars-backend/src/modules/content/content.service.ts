import { env } from '../../config/env.js';
import { ContentRepo } from './content.repo.js';
import type { ContentCard, ContentLatestQuery, ContentListQuery } from './content.types.js';
import { PowertrainsService } from '../cars/powertrains/powertrains.service.js';

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
    const ids = await powertrains.findModelIdsByFuel({ fuelType: ft });
    return ids.length ? ids : [-1]; // -1 ensures empty match if none
  }

  async today(contentType: number, q?: { fuelType?: string }): Promise<ContentCard | null> {
    const modelIds = await this.modelIdsForFuel(q?.fuelType);
    const row = await repo.getToday(contentType, modelIds);
    if (!row) return null;
    const [card] = await hydrate([row as any]);
    return card ?? null;
  }

  async latest(contentType: number, q: ContentLatestQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const modelIds = await this.modelIdsForFuel(q.fuelType);

    let excludeId: number | undefined = undefined;
    if (q.excludeToday !== false) {
      const today = await repo.getToday(contentType, modelIds);
      excludeId = today?.id;
    }

    const rows = await repo.listLatest(contentType, limit, excludeId, modelIds);
    return hydrate(rows as any);
  }

  async trending(contentType: number, q: ContentListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const modelIds = await this.modelIdsForFuel(q.fuelType);
    const rows = await repo.listTrending(contentType, limit, modelIds);
    return hydrate(rows as any);
  }

  async top(contentType: number, q: ContentListQuery & { fuelType?: string }) {
    const limit = q.limit ?? 9;
    const modelIds = await this.modelIdsForFuel(q.fuelType);
    const rows = await repo.listTop(contentType, limit, modelIds);
    return hydrate(rows as any);
  }
}
