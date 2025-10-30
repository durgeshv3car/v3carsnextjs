import { ContentService } from '../content/content.service.js';
import { CONTENT_TYPES } from '../content/content.constants.js';
import type { ComparisonsListQuery, LatestComparisonsQuery } from './comparisons.types.js';

import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';

// ✅ images module (already in your project)
import { ImagesService } from '../cars/images/images.service.js';

// ✅ cache
import { withCache, cacheKey } from '../../lib/cache.js';

const content = new ContentService();
const images  = new ImagesService();

/** Comparison Reviews (contentType = 4) */
export class ComparisonsService {
  /** Single most recent comparison review (up to DB NOW()) */
  today() {
    return content.today(CONTENT_TYPES.COMPARISON_REVIEW);
  }

  /** Latest list (publishDateandTime DESC) */
  latest(q: LatestComparisonsQuery) {
    return content.latest(CONTENT_TYPES.COMPARISON_REVIEW, {
      limit: q.limit,
      excludeToday: q.excludeToday ?? false,
    });
  }

  /** Trending (last_15days_view DESC) */
  trending(q: ComparisonsListQuery) {
    return content.trending(CONTENT_TYPES.COMPARISON_REVIEW, { limit: q.limit });
  }

  /** Top (last_30days_view DESC) */
  top(q: ComparisonsListQuery) {
    return content.top(CONTENT_TYPES.COMPARISON_REVIEW, { limit: q.limit });
  }

  /** 🆕 Popular compare URLs (by totalViews) + model images (CACHED) */
  async popular(q: ComparisonsListQuery) {
    const limit = q.limit ?? 15;

    const key = cacheKey({ ns: 'comparisons:popular', v: 1, limit });
    const ttlMs = 5 * 60 * 1000; // 5 minutes

    return withCache(key, async () => {
      // 1) Base rows from tblcomparecarsurls
      const urls = await prisma.$queryRaw<Array<{
        urlId: number;
        cmpUrl: string;
        modelIds: string | null;
        totalViews: number;
      }>>(Prisma.sql`
        SELECT urlId, cmpUrl, modelIds, totalViews
        FROM tblcomparecarsurls
        WHERE urlId NOT IN (1058281, 751)
        ORDER BY totalViews DESC
        LIMIT ${limit}
      `);

      // 2) Collect model IDs
      const allIds = new Set<number>();
      for (const u of urls) {
        (u.modelIds ?? '')
          .split(',')
          .map(s => Number(s.trim()))
          .filter(n => Number.isFinite(n))
          .forEach(n => allIds.add(n));
      }
      const ids = [...allIds];

      // 3) Hydrate images using ImagesService (internally cached 60m)
      const imgMap = ids.length
        ? await images.getPrimaryByModelIds(ids) // Map<modelId, { name, alt, url }>
        : new Map<number, { name: string | null; alt: string | null; url: string | null }>();

      // 4) Final shape
      return urls.map(u => {
        const mids = (u.modelIds ?? '')
          .split(',')
          .map(s => Number(s.trim()))
          .filter(n => Number.isFinite(n));

        const models = mids.map(modelId => {
          const im = imgMap.get(modelId);
          return {
            modelId,
            imageUrl: im?.url ?? null,
            imageAlt: im?.alt ?? null,
          };
        });

        return {
          urlId: u.urlId,
          url: u.cmpUrl,
          totalViews: u.totalViews,
          modelIds: mids,
          models,
        };
      });
    }, ttlMs);
  }
}
