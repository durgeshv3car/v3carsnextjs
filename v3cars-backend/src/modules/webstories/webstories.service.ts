// src/modules/webstories/webstories.service.ts
import { prisma } from '../../lib/prisma.js';
import { withCache, cacheKey } from '../../lib/cache.js';
import type { WebStoriesListQuery, WebStoriesListResult } from './webstories.types.js';

const toKey = (v: bigint | number): string => (typeof v === 'bigint' ? v.toString() : String(v));
const toStr = (v: bigint | number | null): string | null => (v == null ? null : typeof v === 'bigint' ? v.toString() : String(v));

export class WebStoriesService {
  async list(q: WebStoriesListQuery): Promise<WebStoriesListResult> {
    const pageSize = Math.max(1, Math.min(q.limit ?? 10, 50));
    const page = Math.max(1, q.page ?? 1);
    const offset = (page - 1) * pageSize;

    const key = cacheKey({
      ns: 'webstories:list',
      v: 1,
      page,
      pageSize,
    });
    const ttlMs = 5 * 60 * 1000; // 5 min

    return withCache(key, async () => {
      // total distinct storyIds with status=true
      const totalRows = await prisma.$queryRaw<Array<{ cnt: bigint | number }>>`
        SELECT COUNT(DISTINCT storyId) AS cnt
        FROM tblwebStories
        WHERE status = 1
      `;
      const total = Number(totalRows[0]?.cnt ?? 0);
      const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0;

      // get paged storyIds ordered by latest createdAt per story
      const latestPerStory = await prisma.$queryRaw<Array<{ storyId: bigint | number; latest: Date | null }>>`
        SELECT storyId, MAX(createdAt) AS latest
        FROM tblwebStories
        WHERE status = 1
        GROUP BY storyId
        ORDER BY latest DESC
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;

      const storyIds = latestPerStory.map(r => r.storyId);
      if (!storyIds.length) {
        return { rows: [], total, page, pageSize, totalPages };
      }

      const latestMap = new Map<string, Date | null>();
      for (const row of latestPerStory) {
        latestMap.set(toKey(row.storyId), row.latest ?? null);
      }

      const stories = await prisma.tblwebStories.findMany({
        where: { storyId: { in: storyIds as any[] }, status: true },
        orderBy: [
          { storyId: 'asc' },
          { subStoryId: 'asc' },
          { createdAt: 'desc' },
        ],
      });

      const grouped = new Map<string, typeof stories>();
      for (const s of stories) {
        const gKey = toKey(s.storyId as any);
        if (!grouped.has(gKey)) grouped.set(gKey, []);
        grouped.get(gKey)!.push(s);
      }

      const rows = storyIds.map(id => {
        const gKey = toKey(id);
        const items = grouped.get(gKey) ?? [];
        const first = items[0];
        return {
          storyId: gKey,
          title: first?.title ?? null,
          slug: first?.slug ?? null,
          authorId: first ? toStr(first.authorId as any) : null,
          status: first?.status ?? null,
          createdAt: latestMap.get(gKey) ?? first?.createdAt ?? null,
          items: items.map(it => ({
            id: it.id ? toStr(it.id as any) : null,
            subStoryId: typeof it.subStoryId === 'number' ? it.subStoryId : null,
            title: it.title ?? null,
            slug: it.slug ?? null,
            contentSlug: it.contentSlug ?? null,
            authorId: toStr(it.authorId as any),
            addedBy: toStr(it.addedBy as any),
            status: it.status ?? null,
            createdAt: it.createdAt ?? null,
            updatedAt: it.updatedAt ?? null,
          })),
        };
      });

      return { rows, total, page, pageSize, totalPages };
    }, ttlMs);
  }
}
