import type { WebsiteContentListQuery } from './websiteContent.types.js';
import { WebsiteContentRepo } from './websiteContent.repo.js';
import { withCache, cacheKey, delPrefix } from '../../lib/cache.js';

const repo = new WebsiteContentRepo();

export class WebsiteContentService {
  /** List (p1=30m, others=15m) */
  async list(q: WebsiteContentListQuery) {
    const page = q.page ?? 1;
    const ttlMs = page === 1 ? 30 * 60 * 1000 : 15 * 60 * 1000;

    const ns =
      q.moduleId === 3
        ? 'websiteContent:insurance:list'
        : q.moduleId === 6
        ? 'websiteContent:authors:list'
        : 'websiteContent:list';

    const key = cacheKey({
      ns,
      v: 4, // 🔼 bump: include authorId in key
      moduleId: q.moduleId,
      authorId: q.authorId ?? undefined,   // 👈 cache separation for single-author
      page,
      limit: q.limit ?? 50,
      sortBy: q.sortBy ?? 'latest',
      q: q.q ?? undefined,
    });

    return withCache(key, () => repo.list(q), ttlMs);
  }

  /** Detail (30m) */
  async getById(id: number, moduleId?: number) {
    const ns =
      moduleId === 3
        ? 'websiteContent:insurance:detail'
        : moduleId === 6
        ? 'websiteContent:authors:detail'
        : 'websiteContent:detail';

    const key = cacheKey({ ns, v: 3, id, moduleId: moduleId ?? undefined });
    const ttlMs = 30 * 60 * 1000;
    return withCache(key, () => repo.getById(id, moduleId), ttlMs);
  }

  /** Latest by module (30m) */
  async latestByModule(moduleId: number) {
    const ns =
      moduleId === 3
        ? 'websiteContent:insurance:latestByModule'
        : moduleId === 6
        ? 'websiteContent:authors:latestByModule'
        : 'websiteContent:latestByModule';

    const key = cacheKey({ ns, v: 3, moduleId });
    const ttlMs = 30 * 60 * 1000;
    return withCache(key, () => repo.getLatestByModule(moduleId), ttlMs);
  }

  // Invalidation helpers
  async invalidateAfterChange() {
    await Promise.all([
      delPrefix('websiteContent:list'),
      delPrefix('websiteContent:detail'),
      delPrefix('websiteContent:latestByModule'),
      delPrefix('websiteContent:insurance:list'),
      delPrefix('websiteContent:insurance:detail'),
      delPrefix('websiteContent:insurance:latestByModule'),
      delPrefix('websiteContent:authors:list'),
      delPrefix('websiteContent:authors:detail'),
      delPrefix('websiteContent:authors:latestByModule'),
    ]);
  }
}
