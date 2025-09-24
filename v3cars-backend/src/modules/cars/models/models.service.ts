import type { ModelsListQuery } from './models.types.js';
import { ModelsRepo } from './models.repo.js';
import { BrandsService } from '../brands/brands.service.js';
import { VariantsService } from '../variants/variants.service.js';
import { PowertrainsService } from '../powertrains/powertrains.service.js';
import { ImagesService } from '../images/images.service.js';
import { prisma } from '../../../lib/prisma.js';

// ⬇️ Cache façade (adapter-aware: Redis if available, else in-memory)
import { withCache, cacheKey } from '../../../lib/cache.js';

const repo = new ModelsRepo();
const brandsSvc = new BrandsService();
const variantsSvc = new VariantsService();
const powertrainsSvc = new PowertrainsService();
const imagesSvc = new ImagesService();

/** INR bucket edges (rupees) */
const priceRanges: Record<string, { min?: number; max?: number }> = {
  UNDER_5L: { max: 5_00_000 },
  BETWEEN_5_10L: { min: 5_00_000, max: 10_00_000 },
  BETWEEN_10_20L: { min: 10_00_000, max: 20_00_000 },
  BETWEEN_20_40L: { min: 20_00_000, max: 40_00_000 },
  ABOVE_40L: { min: 40_00_000 },
};

function inBucket(min: number | null, max: number | null, bucket?: keyof typeof priceRanges): boolean {
  if (!bucket) return true;
  const { min: bmin, max: bmax } = priceRanges[bucket] ?? {};
  if (min == null && max == null) return false;

  const lo = min ?? max ?? 0;
  const hi = max ?? min ?? 0;

  if (typeof bmin === 'number' && hi < bmin) return false;
  if (typeof bmax === 'number' && lo > bmax) return false;
  return true;
}

// Small helper to stringify dates safely for cache key
const toYmd = (d?: Date | string) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);

export class ModelsService {
  async list(q: ModelsListQuery) {
    const fuelType = q.fuelType?.trim();

    // 🔑 Stable, versioned cache key for the *final shaped* list payload
    const key = cacheKey({
      ns: 'models:list',
      v: 1,
      page: q.page ?? 1,
      limit: q.limit ?? 12,
      sortBy: q.sortBy ?? 'id_asc',
      q: q.q ?? undefined,
      brandId: q.brandId ?? undefined,
      bodyTypeId: q.bodyTypeId ?? undefined,
      isUpcoming: typeof q.isUpcoming === 'boolean' ? (q.isUpcoming ? 1 : 0) : undefined,
      fuelType: fuelType || undefined,
      priceBucket: q.priceBucket ?? undefined,
      launchMonth: (q as any).launchMonth ?? undefined,
      launchFrom: toYmd((q as any).launchFrom),
      launchTo: toYmd((q as any).launchTo),
    });

    // TTL: page 1 combos a bit longer
    const ttlMs = (q.page ?? 1) === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    return withCache(key, async () => {
      /** ------------------------------
       * PRICE BUCKET FLOW (variant-based)
       * ------------------------------ */
      if (q.priceBucket) {
        // 1) Pull all base rows for non-price filters
        let baseRows = await repo.listIgnoringPriceBucket(q);

        // 1b) Apply fuelType filter (if any) BEFORE band computation
        if (fuelType) {
          const allowedModelIds = new Set(await powertrainsSvc.findModelIdsByFuel({ fuelType }));
          baseRows = baseRows.filter(m => allowedModelIds.has(m.modelId));
        }

        const allIds = baseRows.map(r => r.modelId);
        if (!allIds.length) {
          return { rows: [], total: 0, page: q.page || 1, pageSize: q.limit || 12, totalPages: 0 };
        }

        // 2) Compute variant price bands
        const bands = await variantsSvc.getPriceBandsByModelIds(allIds);

        // 3) Attach computed min/max strictly from variants; exclude models without bands
        const withComputed = baseRows
          .map((m) => {
            const b = bands.get(m.modelId) ?? { min: null, max: null };
            return { ...m, computedMin: b.min, computedMax: b.max };
          })
          .filter((m) => m.computedMin != null || m.computedMax != null);

        // 4) Apply bucket filter
        const filtered = withComputed.filter((m) =>
          inBucket(m.computedMin ?? null, m.computedMax ?? null, q.priceBucket as any)
        );

        // 5) Sort
        const sortBy = q.sortBy;
        const sorted = filtered.sort((a, b) => {
          const nameCmp = (x?: string | null, y?: string | null) =>
            (x ?? '').localeCompare(y ?? '', undefined, { sensitivity: 'base' });
          switch (sortBy) {
            case 'price_asc': {
              const ax = a.computedMin ?? Number.POSITIVE_INFINITY;
              const bx = b.computedMin ?? Number.POSITIVE_INFINITY;
              return ax - bx || a.modelId - b.modelId;
            }
            case 'price_desc': {
              const ax = a.computedMax ?? Number.NEGATIVE_INFINITY;
              const bx = b.computedMax ?? Number.NEGATIVE_INFINITY;
              return bx - ax || b.modelId - a.modelId;
            }
            case 'latest':
              return (b.launchDate?.getTime() ?? 0) - (a.launchDate?.getTime() ?? 0) || b.modelId - a.modelId;
            case 'popular':
              return (b.totalViews ?? 0) - (a.totalViews ?? 0) || b.modelId - a.modelId;
            case 'name_desc':
              return nameCmp(b.modelName, a.modelName) || b.modelId - a.modelId;
            case 'name_asc':
              return nameCmp(a.modelName, b.modelName) || a.modelId - b.modelId;
            default:
              return a.modelId - b.modelId;
          }
        });

        // 6) Paginate
        const pageSize = Math.max(1, Math.min(q.limit || 12, 100));
        const page = Math.max(1, q.page || 1);
        const total = sorted.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const pageRows = sorted.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

        // 7) Enrich (brands, specs, images)
        const pageIds = pageRows.map((r) => r.modelId);
        const brandIds = Array.from(new Set(pageRows.map((r) => r.brandId).filter((x): x is number => typeof x === 'number')));

        const [brandRows, specsMap, imageMap] = await Promise.all([
          brandsSvc.findByIds(brandIds),
          powertrainsSvc.getSpecsByModelIds(pageIds),
          imagesSvc.getPrimaryByModelIds(pageIds),
        ]);
        const brandMap = new Map(brandRows.map((b) => [b.brandId, b]));

        const enriched = pageRows.map((m) => {
          const b = m.brandId ? brandMap.get(m.brandId) : undefined;
          const specs = specsMap.get(m.modelId) ?? { powerPS: null, torqueNM: null, mileageKMPL: null, powerTrain: null };
          const img = imageMap.get(m.modelId) ?? { name: null, alt: null, url: null };
          const priceMin = (m as any).computedMin ?? null;
          const priceMax = (m as any).computedMax ?? null;

          return {
            ...m,
            brand: b ? { id: b.brandId, name: b.brandName, slug: b.brandSlug, logo: b.logoPath } : null,
            priceMin,
            priceMax,
            powerPS: specs.powerPS,
            torqueNM: specs.torqueNM,
            mileageKMPL: specs.mileageKMPL,
            powerTrain: specs.powerTrain,
            image: img,
            imageUrl: img.url,
          };
        });

        return { rows: enriched, total, page, pageSize, totalPages };
      }

      /** ------------------------------
       * FUEL-ONLY FLOW (no priceBucket)
       * ------------------------------ */
      if (fuelType) {
        // 1) Pull all base rows (ignore pagination) so we can filter by fuel first
        let baseRows = await repo.listIgnoringPriceBucket(q);

        // 2) Apply fuelType filter via powertrains
        const allowedModelIds = new Set(await powertrainsSvc.findModelIdsByFuel({ fuelType }));
        baseRows = baseRows.filter(m => allowedModelIds.has(m.modelId));

        // 3) If sorting by price, compute bands for sorting
        const sortBy = q.sortBy;
        let sorted = baseRows;
        if (sortBy === 'price_asc' || sortBy === 'price_desc') {
          const bands = await variantsSvc.getPriceBandsByModelIds(baseRows.map(m => m.modelId));
          const withBands = baseRows.map(m => ({ ...m, computedMin: bands.get(m.modelId)?.min ?? null, computedMax: bands.get(m.modelId)?.max ?? null }));
          sorted = withBands.sort((a, b) => {
            if (sortBy === 'price_asc') {
              const ax = a.computedMin ?? Number.POSITIVE_INFINITY;
              const bx = b.computedMin ?? Number.POSITIVE_INFINITY;
              return ax - bx || a.modelId - b.modelId;
            } else {
              const ax = a.computedMax ?? Number.NEGATIVE_INFINITY;
              const bx = b.computedMax ?? Number.NEGATIVE_INFINITY;
              return bx - ax || b.modelId - a.modelId;
            }
          });
        } else {
          sorted = baseRows.sort((a, b) => {
            const nameCmp = (x?: string | null, y?: string | null) =>
              (x ?? '').localeCompare(y ?? '', undefined, { sensitivity: 'base' });
            switch (sortBy) {
              case 'latest':
                return (b.launchDate?.getTime() ?? 0) - (a.launchDate?.getTime() ?? 0) || b.modelId - a.modelId;
              case 'popular':
                return (b.totalViews ?? 0) - (a.totalViews ?? 0) || b.modelId - a.modelId;
              case 'name_desc':
                return nameCmp(b.modelName, a.modelName) || b.modelId - a.modelId;
              case 'name_asc':
                return nameCmp(a.modelName, b.modelName) || a.modelId - b.modelId;
              case 'launch_asc':
                return (a.launchDate?.getTime() ?? 0) - (b.launchDate?.getTime() ?? 0) || a.modelId - b.modelId;
              default:
                return a.modelId - b.modelId;
            }
          });
        }

        // 4) Paginate
        const pageSize = Math.max(1, Math.min(q.limit || 12, 100));
        const page = Math.max(1, q.page || 1);
        const total = sorted.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const pageRows = sorted.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

        // 5) Enrich (brands, price band fallback, specs, images)
        const pageIds = pageRows.map((r) => r.modelId);
        const brandIds = Array.from(new Set(pageRows.map((r) => r.brandId).filter((x): x is number => typeof x === 'number')));

        const [brandRows, priceBands, specsMap, imageMap] = await Promise.all([
          brandsSvc.findByIds(brandIds),
          variantsSvc.getPriceBandsByModelIds(pageIds),
          powertrainsSvc.getSpecsByModelIds(pageIds),
          imagesSvc.getPrimaryByModelIds(pageIds),
        ]);
        const brandMap = new Map(brandRows.map((b) => [b.brandId, b]));

        const enriched = pageRows.map((m) => {
          const b = m.brandId ? brandMap.get(m.brandId) : undefined;
          const band = priceBands.get(m.modelId) ?? { min: null, max: null };
          const specs = specsMap.get(m.modelId) ?? { powerPS: null, torqueNM: null, mileageKMPL: null, powerTrain: null };
          const img = imageMap.get(m.modelId) ?? { name: null, alt: null, url: null };

          // Fallback policy: use expected* if > 0 else use variant band
          const priceMin =
            (typeof m.expectedBasePrice === 'number' && m.expectedBasePrice > 0 ? m.expectedBasePrice : band.min) ?? null;
          const priceMax =
            (typeof m.expectedTopPrice === 'number' && m.expectedTopPrice > 0 ? m.expectedTopPrice : band.max) ?? null;

          return {
            ...m,
            brand: b ? { id: b.brandId, name: b.brandName, slug: b.brandSlug, logo: b.logoPath } : null,
            priceMin,
            priceMax,
            powerPS: specs.powerPS,
            torqueNM: specs.torqueNM,
            mileageKMPL: specs.mileageKMPL,
            powerTrain: specs.powerTrain,
            image: img,
            imageUrl: img.url,
          };
        });

        return { rows: enriched, total, page, pageSize, totalPages };
      }

      /** ------------------------------
       * ORIGINAL (no priceBucket, no fuelType)
       * ------------------------------ */
      const base = await repo.list(q);
      const rows = base.rows;

      const modelIds = rows.map((r) => r.modelId).filter((x): x is number => typeof x === 'number');
      const brandIds = Array.from(new Set(rows.map((r) => r.brandId).filter((x): x is number => typeof x === 'number')));

      const [brandRows, priceBands, specsMap, imageMap] = await Promise.all([
        brandsSvc.findByIds(brandIds),
        variantsSvc.getPriceBandsByModelIds(modelIds),
        powertrainsSvc.getSpecsByModelIds(modelIds),
        imagesSvc.getPrimaryByModelIds(modelIds),
      ]);

      const brandMap = new Map(brandRows.map((b) => [b.brandId, b]));

      const enriched = rows.map((m) => {
        const b = m.brandId ? brandMap.get(m.brandId) : undefined;
        const band = priceBands.get(m.modelId) ?? { min: null, max: null };
        const specs = specsMap.get(m.modelId) ?? { powerPS: null, torqueNM: null, mileageKMPL: null, powerTrain: null };
        const img = imageMap.get(m.modelId) ?? { name: null, alt: null, url: null };

        // Fallback policy: use expected* if > 0 else use variant band
        const priceMin =
          (typeof m.expectedBasePrice === 'number' && m.expectedBasePrice > 0 ? m.expectedBasePrice : band.min) ?? null;
        const priceMax =
          (typeof m.expectedTopPrice === 'number' && m.expectedTopPrice > 0 ? m.expectedTopPrice : band.max) ?? null;

        return {
          ...m,
          brand: b ? { id: b.brandId, name: b.brandName, slug: b.brandSlug, logo: b.logoPath } : null,
          priceMin,
          priceMax,
          powerPS: specs.powerPS,
          torqueNM: specs.torqueNM,
          mileageKMPL: specs.mileageKMPL,
          powerTrain: specs.powerTrain,
          image: img,
          imageUrl: img.url,
        };
      });

      return { ...base, rows: enriched };
    }, ttlMs);
  }

  async getById(id: number) {
    const key = cacheKey({ ns: 'model:detail', v: 1, id });
    const ttlMs = 30 * 60 * 1000; // 30 min
    return withCache(key, async () => {
      return repo.getById(id);
    }, ttlMs);
  }

  async upcomingMonthlyCount(opts: { months?: number; brandId?: number; bodyTypeId?: number }) {
    const horizon = Math.max(1, Math.min(opts.months ?? 12, 24)); // next N months
    const key = cacheKey({
      ns: 'models:upcomingCount',
      v: 1,
      months: horizon,
      brandId: opts.brandId ?? undefined,
      bodyTypeId: opts.bodyTypeId ?? undefined,
    });
    const ttlMs = 30 * 60 * 1000; // 30 min

    return withCache(key, async () => {
      const rows = await repo.upcomingMonthlyCount(opts);

      const start = new Date();
      start.setDate(1); start.setHours(0,0,0,0);

      const fmt = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' });

      const countsByKey = new Map<string, number>(
        rows.map((r) => [r.bucket.slice(0, 7), Number((r as any).cnt) || 0])
      );

      const out: Array<{ key: string; month: string; count: number }> = [];
      for (let i = 0; i <= horizon; i++) {
        const d = new Date(start);
        d.setMonth(d.getMonth() + i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const month = fmt.format(d);
        const count = countsByKey.get(key) ?? 0;
        out.push({ key, month, count });
      }

      return out;
    }, ttlMs);
  }

  /** 🆕 Top selling list for a given month (with brand slug, primary image, % change) */
  async topSellingModelsByMonth(opts: { year: number; month: number; limit?: number }) {
    const key = cacheKey({ ns: 'models:topSelling', v: 1, year: opts.year, month: opts.month, limit: opts.limit ?? 25 });
    const ttlMs = 30 * 60 * 1000; // 30 min

    return withCache(key, async () => {
      const agg = await repo.topSellingByMonth(opts);
      if (!agg.length) return { rows: [], total: 0 };

      const modelIds = agg.map(r => r.modelId);

      // 1) Model meta we’ll need to hydrate everything
      const modelRows = await prisma.tblmodels.findMany({
        where: { modelId: { in: modelIds } },
        select: {
          modelId: true,
          modelName: true,
          modelSlug: true,
          brandId: true,
          modelBodyTypeId: true,
          // NOTE: assuming there is a foreign key to segments on tblmodels (commonly: segmentId)
          // If your column name differs, change it here:
          segmentId: true,
        },
      });
      const modelMap = new Map(modelRows.map(m => [m.modelId, m]));

      // 2) Brand names
      const brandIds = Array.from(
        new Set(modelRows.map(m => m.brandId).filter((x): x is number => typeof x === 'number'))
      );
      const brandRows = await brandsSvc.findByIds(brandIds);
      const brandNameById = new Map(brandRows.map(b => [b.brandId, b.brandName]));
      const brandSlugById = new Map(brandRows.map(b => [b.brandId, b.brandSlug]));

      // 3) Body style (body type)
      const bodyTypeIds = Array.from(
        new Set(modelRows.map(m => m.modelBodyTypeId).filter((x): x is number => typeof x === 'number'))
      );
      const bodyTypeRows = bodyTypeIds.length
        ? await prisma.tblmodelbodytype.findMany({
            where: { modelBodyTypeId: { in: bodyTypeIds } },
            select: { modelBodyTypeId: true, modelBodyTypeName: true },
          })
        : [];
      const bodyTypeNameById = new Map(
        bodyTypeRows.map(bt => [bt.modelBodyTypeId, bt.modelBodyTypeName ?? null])
      );

      // 4) Segment name
      const segmentIds = Array.from(
        new Set(modelRows.map(m => (m as any).segmentId).filter((x: any) => typeof x === 'number'))
      );
      const segmentRows = segmentIds.length
        ? await prisma.tblsegments.findMany({
            where: { segmentId: { in: segmentIds } },
            select: { segmentId: true, segmentName: true },
          })
        : [];
      const segmentNameById = new Map(segmentRows.map(s => [s.segmentId, s.segmentName ?? null]));

      // 5) Primary images
      const imageMap = await imagesSvc.getPrimaryByModelIds(modelIds);

      // 6) Price range (variants)
      const priceBands = await variantsSvc.getPriceBandsByModelIds(modelIds);

      // 7) Month labels + % change
      const curDate  = new Date(opts.year, opts.month - 1, 1);
      const prevDate = new Date(curDate);
      prevDate.setMonth(curDate.getMonth() - 1);
      const monthFmt = new Intl.DateTimeFormat('en-IN', { month: 'long' });
      const curLabel  = `${monthFmt.format(curDate)}`;
      const prevLabel = `${monthFmt.format(prevDate)}`;

      // 8) Build output in the same order as SQL (ranked by that month’s sales)
      const rows = agg.map((r, idx) => {
        const m = modelMap.get(r.modelId);
        if (!m) return null;

        const cur  = Number(r.monthSales ?? 0);
        const prev = Number(r.prevSales ?? 0);
        const percentChange = prev > 0 ? ((cur - prev) / prev) * 100 : null;

        const img = imageMap.get(r.modelId) ?? { name: null, alt: null, url: null };
        const brandName = m.brandId ? (brandNameById.get(m.brandId) ?? null) : null;
        const brandSlug = m.brandId ? (brandSlugById.get(m.brandId) ?? null) : null;

        const bodyStyle =
          (m.modelBodyTypeId ? bodyTypeNameById.get(m.modelBodyTypeId) : null) ?? null;

        const segmentName =
          ((m as any).segmentId ? segmentNameById.get((m as any).segmentId) : null) ?? null;

        const band = priceBands.get(m.modelId) ?? { min: null, max: null };
        const priceMin = band.min ?? null;
        const priceMax = band.max ?? null;

        return {
          rank: idx + 1,
          modelId: m.modelId,
          modelName: m.modelName,
          modelSlug: m.modelSlug,

          // 🆕 brand + taxonomy
          brandName,
          brandSlug,
          bodyStyle,      // e.g., "MUV"
          segment: segmentName, // e.g., "C1-Segment"

          // 🆕 price range (ex-showroom)
          priceRange: { min: priceMin, max: priceMax },

          // sales meta (for the month widget)
          month: curLabel,
          monthSales: cur,
          prevMonth: prevLabel,
          prevSales: prev,
          percentChange,  // 11.09 => +11.09%

          // image
          image: img,
          imageUrl: img.url,
        };
      }).filter(Boolean) as any[];

      return { rows, total: rows.length };
    }, ttlMs);
  }
}
