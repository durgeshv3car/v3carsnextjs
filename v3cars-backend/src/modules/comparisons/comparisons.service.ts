import { ContentService } from '../content/content.service.js';
import { CONTENT_TYPES } from '../content/content.constants.js';
import type { ComparisonsListQuery, LatestComparisonsQuery } from './comparisons.types.js';
import { BrandsService } from '../cars/brands/brands.service.js';
import { VariantsService } from '../cars/variants/variants.service.js';
import { PowertrainsService } from '../cars/powertrains/powertrains.service.js';

import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';

// ✅ images module (already in your project)
import { ImagesService } from '../cars/images/images.service.js';

// ✅ cache
import { withCache, cacheKey } from '../../lib/cache.js';

const content = new ContentService();
const images  = new ImagesService();
// ⬆️ NEW instances
const brands  = new BrandsService();
const variants = new VariantsService();
const powertrains = new PowertrainsService();

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

    // bumped v -> 2 (payload changed)
    const key = cacheKey({ ns: 'comparisons:popular', v: 2, limit });
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

      // 2) Collect unique model IDs
      const allIds = new Set<number>();
      for (const u of urls) {
        (u.modelIds ?? '')
          .split(',')
          .map(s => Number(s.trim()))
          .filter(n => Number.isFinite(n))
          .forEach(n => allIds.add(n));
      }
      const modelIds = [...allIds];

      // Short-circuit
      if (!modelIds.length) {
        return urls.map(u => ({
          urlId: u.urlId,
          url: u.cmpUrl,
          totalViews: u.totalViews,
          modelIds: [],
          models: [],
        }));
      }

      // 3) Hydrations (images, model meta, brand names, price bands, powertrain specs)
      const [imgMap, modelRows] = await Promise.all([
        images.getPrimaryByModelIds(modelIds), // Map<modelId, { name, alt, url }>
        prisma.tblmodels.findMany({
          where: { modelId: { in: modelIds } },
          select: {
            modelId: true,
            modelName: true,
            modelSlug: true,
            brandId: true,
            expectedBasePrice: true,
            expectedTopPrice: true,
          },
        }),
      ]);

      const modelMap = new Map(modelRows.map(m => [m.modelId, m]));
      const brandIds = Array.from(new Set(modelRows.map(m => m.brandId).filter((x): x is number => typeof x === 'number')));
      const [brandRows, priceBands, specsMap] = await Promise.all([
        brands.findByIds(brandIds),
        variants.getPriceBandsByModelIds(modelIds),      // Map<modelId, {min,max}>
        powertrains.getSpecsByModelIds(modelIds),        // Map<modelId, { powerPS, torqueNM, mileageKMPL, powerTrain }>
      ]);

      const brandMap = new Map(brandRows.map(b => [b.brandId, b]));

      // 4) Final shape per URL
      return urls.map(u => {
        const mids = (u.modelIds ?? '')
          .split(',')
          .map(s => Number(s.trim()))
          .filter(n => Number.isFinite(n));

        const models = mids.map(modelId => {
          const meta = modelMap.get(modelId);
          const brand = meta?.brandId ? brandMap.get(meta.brandId) : undefined;

          // price: prefer variants band; else fall back to expected*
          const band = priceBands.get(modelId) ?? { min: null, max: null };
          const priceMin = (band.min ?? (meta?.expectedBasePrice ?? null)) ?? null;
          const priceMax = (band.max ?? (meta?.expectedTopPrice ?? null)) ?? null;

          const specs = specsMap.get(modelId) ?? {
            powerPS: null, torqueNM: null, mileageKMPL: null, powerTrain: null,
          };

          const img = imgMap.get(modelId);

          return {
            modelId,
            modelName: meta?.modelName ?? null,
            modelSlug: meta?.modelSlug ?? null,
            brand: brand ? {
              id: brand.brandId,
              name: brand.brandName,
              slug: brand.brandSlug ?? null,
              logo: brand.logoPath ?? null,
            } : null,
            priceRange: { min: priceMin, max: priceMax }, // ex-showroom
            powertrain: {
              powerPS: specs.powerPS,
              torqueNM: specs.torqueNM,
              mileageKMPL: specs.mileageKMPL,
              powerTrain: specs.powerTrain, // e.g. "1.5L Petrol AT"
            },
            imageUrl: img?.url ?? null,
            imageAlt: img?.alt ?? null,
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
