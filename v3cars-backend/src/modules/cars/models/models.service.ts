// src/modules/cars/models/models.service.ts
import type { ModelBestVariantQuery, ModelsListQuery } from './models.types.js';
import { ModelsRepo } from './models.repo.js';
import { BrandsService } from '../brands/brands.service.js';
import { VariantsService } from '../variants/variants.service.js';
import { PowertrainsService } from '../powertrains/powertrains.service.js';
import { ImagesService } from '../images/images.service.js';
import { prisma } from '../../../lib/prisma.js';

// ⬇️ Cache façade (adapter-aware: Redis if available, else in-memory)
import { withCache, cacheKey } from '../../../lib/cache.js';
import { OnRoadService } from '../../tools/onroad/onroad.service.js';

const repo = new ModelsRepo();
const brandsSvc = new BrandsService();
const variantsSvc = new VariantsService();
const powertrainsSvc = new PowertrainsService();
const imagesSvc = new ImagesService();

const onroadSvc = new OnRoadService();


const rpmRange = (min?: number | null, max?: number | null) => {
  if (min && max && min !== max) return `${min} - ${max}rpm`;
  if (min || max) return `${min ?? max}rpm`;
  return null;
};





function buildAssetPath(name?: string | null): string | null {
  return name ?? null;
}

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

  async resolveModelId(idOrSlug: string): Promise<number | null> {
    if (!idOrSlug) return null;
    if (/^\d+$/.test(idOrSlug)) return Number(idOrSlug);
    const row = await prisma.tblmodels.findFirst({
      where: { modelSlug: idOrSlug },
      select: { modelId: true },
    });
    return row?.modelId ?? null;
  }

  async list(q: ModelsListQuery) {
    const fuelType = q.fuelType?.trim();
    const transmissionType = q.transmissionType?.trim();

    // single-valued fields
    const cylinders = (q as any).cylinders as string | undefined;
    const engineDisplacement = (q as any).engineDisplacement as string | undefined;
    const mileage = (q as any).mileage as string | undefined;
    const seating = (q as any).seating as string | undefined;

    // multi-select lists (may come as arrays or comma-separated strings, validators should normalize them)
    const brandIdsList = (q as any).brandIds as number[] | undefined;
    const bodyTypeIdsList = (q as any).bodyTypeIds as number[] | undefined;
    const cylindersList = (q as any).cylindersList as string[] | undefined;
    const seatingList = (q as any).seatingList as number[] | undefined;

    // 🔑 Stable, versioned cache key for the *final shaped* list payload
    const key = cacheKey({
      ns: 'models:list',
      v: 2,
      page: q.page ?? 1,
      limit: q.limit ?? 12,
      sortBy: q.sortBy ?? 'id_asc',
      q: q.q ?? undefined,
      brandId: q.brandId ?? undefined,
      brandIds: brandIdsList ?? undefined,
      bodyTypeId: q.bodyTypeId ?? undefined,
      bodyTypeIds: bodyTypeIdsList ?? undefined,
      isUpcoming: typeof q.isUpcoming === 'boolean' ? (q.isUpcoming ? 1 : 0) : undefined,
      fuelType: fuelType || undefined,
      transmissionType: transmissionType || undefined,
      cylinders: cylinders ?? undefined,
      cylindersList: cylindersList ?? undefined,
      engineDisplacement: engineDisplacement ?? undefined,
      mileage: mileage ?? undefined,
      seating: seating ?? undefined,
      seatingList: seatingList ?? undefined,
      priceBucket: q.priceBucket ?? undefined,
      launchMonth: (q as any).launchMonth ?? undefined,
      launchFrom: toYmd((q as any).launchFrom),
      launchTo: toYmd((q as any).launchTo),
    });

    // TTL: page 1 combos a bit longer
    const ttlMs = (q.page ?? 1) === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    return withCache(key, async () => {
      /** ------------------------------
       * Pre-filter: get allowed modelIds from powertrains if any powertrain/spec filters provided
       * ------------------------------ */
      let allowedModelIdsArray: number[] | undefined;
      const hasPowertrainFilters =
        !!fuelType ||
        !!transmissionType ||
        !!cylinders ||
        !!cylindersList ||
        !!engineDisplacement ||
        !!mileage;
      if (hasPowertrainFilters) {
        // pass cylindersList (array) if present, otherwise single cylinders value
        const modelIds = await powertrainsSvc.findModelIdsByFilters({
          fuelType,
          transmissionType,
          cylinders: cylindersList ?? cylinders,
          engineDisplacement,
          mileage,
        });
        if (!modelIds.length) {
          return { rows: [], total: 0, page: q.page || 1, pageSize: q.limit || 12, totalPages: 0 };
        }
        allowedModelIdsArray = modelIds;
      }

      // prepare opts to pass to repo functions
      const repoOpts = allowedModelIdsArray ? { allowedModelIds: allowedModelIdsArray } : undefined;

      /** ------------------------------
       * PRICE BUCKET FLOW (variant-based)
       * ------------------------------ */
      if (q.priceBucket) {
        // 1) Pull all base rows for non-price filters (DB-level will apply seatingList, brandIdsList, bodyTypeIdsList, allowedModelIds)
        // ensure we propagate multi-selects via q object (repo.buildWhere reads brandIds/bodyTypeIds/seatingList)
        const baseRows = await repo.listIgnoringPriceBucket(
          // pass q as-is; validators already normalize brandIds/bodyTypeIds/seatingList if present
          q,
          repoOpts
        );

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

        // 6) Paginate (after filter/sort)
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
          const specs =
            specsMap.get(m.modelId) ??
            {
              powerPS: null,
              torqueNM: null,
              mileageKMPL: null,
              powerTrain: null,
              transmissionType: null,
              transmissionSubType: null,
              drivetrain: null,
              isFourByFour: null,
            };
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
            transmissionType: specs.transmissionType,
            transmissionSubType: specs.transmissionSubType,
            drivetrain: specs.drivetrain,
            isFourByFour: specs.isFourByFour,
            image: img,
            imageUrl: img.url,
          };
        });

        return { rows: enriched, total, page, pageSize, totalPages };
      }

      /** ------------------------------
       * FUEL / POWERTRAIN-ONLY FLOW (no priceBucket)
       * ------------------------------ */
      if (fuelType || transmissionType || cylinders || cylindersList || engineDisplacement || mileage) {
        // 1) Pull all base rows (ignore pagination) so we can filter by powertrain/model-spec first
        // Repo will apply seatingList, brandIdsList, bodyTypeIdsList, and allowedModelIds at DB-level
        let baseRows = await repo.listIgnoringPriceBucket(q, repoOpts);

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

        // 4) Paginate (after filter/sort)
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
          const specs =
            specsMap.get(m.modelId) ??
            {
              powerPS: null,
              torqueNM: null,
              mileageKMPL: null,
              powerTrain: null,
              transmissionType: null,
              transmissionSubType: null,
              drivetrain: null,
              isFourByFour: null,
            };
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
            transmissionType: specs.transmissionType,
            transmissionSubType: specs.transmissionSubType,
            drivetrain: specs.drivetrain,
            isFourByFour: specs.isFourByFour,
            image: img,
            imageUrl: img.url,
          };
        });

        return { rows: enriched, total, page, pageSize, totalPages };
      }

      /** ------------------------------
       * ORIGINAL (no priceBucket, no powertrain filters)
       * ------------------------------ */
      // Pass allowedModelIds to repo so DB does filtering + correct count/pagination
      const base = await repo.list(q, repoOpts);
      let rows = base.rows;

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
        const specs =
          specsMap.get(m.modelId) ??
          {
            powerPS: null,
            torqueNM: null,
            mileageKMPL: null,
            powerTrain: null,
            transmissionType: null,
            transmissionSubType: null,
            drivetrain: null,
            isFourByFour: null,
          };
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
          transmissionType: specs.transmissionType,
          transmissionSubType: specs.transmissionSubType,
          drivetrain: specs.drivetrain,
          isFourByFour: specs.isFourByFour,
          image: img,
          imageUrl: img.url,
        };
      });

      return { ...base, rows: enriched };
    }, ttlMs);
  }

  async getById(id: number) {
    const key = cacheKey({ ns: 'model:overview', v: 3, id }); // bump v due to path logic change
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      const m = await repo.getById(id);
      if (!m) return null;

      const brand = m.brandId ? (await brandsSvc.findByIds([m.brandId]))[0] : undefined;

      const bodyType = m.modelBodyTypeId
        ? await prisma.tblmodelbodytype.findFirst({
          where: { modelBodyTypeId: m.modelBodyTypeId },
          select: { modelBodyTypeName: true },
        })
        : null;

      let segmentName: string | null = null;
      if ((m as any).segmentId) {
        const seg = await prisma.tblsegments
          .findFirst({ where: { segmentId: (m as any).segmentId }, select: { segmentName: true } })
          .catch(() => null);
        segmentName = seg?.segmentName ?? null;
      }

      const band = (await variantsSvc.getPriceBandsByModelIds([id])).get(id) ?? { min: null, max: null };
      const priceMin =
        (typeof m.expectedBasePrice === 'number' && m.expectedBasePrice > 0 ? m.expectedBasePrice : band.min) ?? null;
      const priceMax =
        (typeof m.expectedTopPrice === 'number' && m.expectedTopPrice > 0 ? m.expectedTopPrice : band.max) ?? null;
      const isExpected = !(band.min != null || band.max != null) && (m.expectedBasePrice || m.expectedTopPrice);

      const fuelRows = await prisma.tblmodelpowertrains.findMany({
        where: { modelId: id, fuelType: { not: null } },
        select: { fuelType: true },
        distinct: ['fuelType'],
      });
      const fuels = fuelRows.map((r) => (r.fuelType || '').trim().toUpperCase()).filter(Boolean);

      const [primaryMap, images, colors] = await Promise.all([
        imagesSvc.getPrimaryByModelIds([id]),
        imagesSvc.listAllByModelId(id),
        imagesSvc.listColorsByModelId(id),
      ]);
      const primary = primaryMap.get(id) ?? { url: null, alt: null, name: null };

      const brochureUrl = buildAssetPath(m.brochurePath ?? null);

      return {
        model: {
          id: m.modelId,
          name: m.modelName ?? null,
          slug: m.modelSlug ?? null,
          brand: brand ? { id: brand.brandId, name: brand.brandName, slug: brand.brandSlug } : null,
          isUpcoming: !!m.isUpcoming,
          discontinuedYear: m.discontinuedYear ?? null,
          launchedOn: m.launchDate ?? null,
          segment: segmentName,
          bodyType: bodyType?.modelBodyTypeName ?? null,
          seating: m.seats ?? null,
        },
        priceRange: {
          exShowroom: { min: priceMin, max: priceMax },
          isExpected: !!isExpected,
        },
        availableWith: { fuels },
        brochure: { url: brochureUrl },
        media: {
          primaryImage: { url: primary.url, alt: primary.alt },
          images,
          colors,
        },
      };
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
      start.setDate(1); start.setHours(0, 0, 0, 0);

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
          segmentId: true,
          seats: true,
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
      const curDate = new Date(opts.year, opts.month - 1, 1);
      const prevDate = new Date(curDate);
      prevDate.setMonth(curDate.getMonth() - 1);
      const monthFmt = new Intl.DateTimeFormat('en-IN', { month: 'long' });
      const curLabel = `${monthFmt.format(curDate)}`;
      const prevLabel = `${monthFmt.format(prevDate)}`;

      // 8) Build output in the same order as SQL (ranked by that month’s sales)
      const rows = agg.map((r, idx) => {
        const m = modelMap.get(r.modelId);
        if (!m) return null;

        const cur = Number(r.monthSales ?? 0);
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


  // src/modules/cars/models/models.service.ts
async priceList(
  modelId: number,
  q: {
    cityId?: number;
    expandVariantId?: number;
    isLoan?: boolean;
    fuelType?: string;
    transmissionType?: string;
    priceType?: 'ex' | 'onroad' | 'csd';
    citySlug?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'latest' | 'name_asc' | 'name_desc';
    page?: number;
    limit?: number;
  }
) {
  const ftRaw = (q.fuelType || '').trim().toLowerCase();
  const trRaw = (q.transmissionType || '').trim().toLowerCase();

  const key = cacheKey({
    ns: 'models:priceList',
    v: 4, // ⬅️ bump: CSD basis + CSD-aware sorting
    modelId,
    fuelType: ftRaw || undefined,
    transmissionType: trRaw || undefined,
    priceType: q.priceType ?? 'ex',
    cityId: q.cityId ?? undefined,
    citySlug: q.citySlug ?? undefined,
    expandVariantId: q.expandVariantId ?? undefined,
    isLoan: q.isLoan ? 1 : 0,
    sortBy: q.sortBy ?? 'price_asc',
    page: q.page ?? 1,
    limit: q.limit ?? 100,
  });
  const ttlMs = 30 * 60 * 1000;

  return withCache(key, async () => {
    const ft = ftRaw;
    const tr = trRaw;

    const fuelNorm =
      ft === 'petrol' ? 'Petrol' :
      ft === 'diesel' ? 'Diesel' :
      ft === 'cng' ? 'CNG' :
      ft === 'hybrid' ? 'Hybrid' :
      ft === 'electric' ? 'Electric' : undefined;

    const isManual = tr === 'manual';
    const isAutomatic = tr === 'automatic';
    const dbTransmissionType = isManual ? 'MT' : undefined;

    const variants = await variantsSvc.list({
      modelId,
      page: 1,
      limit: 100,
      sortBy: 'price_asc', // we'll do final sort after mapping (to support CSD basis)
      fuelType: fuelNorm,
      transmissionType: dbTransmissionType,
    });

    const autoTokens = ['AT', 'AMT', 'DCT', 'CVT', 'E-CVT', 'AUTOMATIC'];

    let rows = (variants.rows || []).map(v => {
      const bandMin = v.priceMin ?? null;
      const bandMax = v.priceMax ?? null;

      // raw CSD (nullable)
      const csdRaw = (v as any).csdPrice as unknown;
      const csdPrice =
        csdRaw == null ? null : (typeof csdRaw === 'number' ? csdRaw : Number(csdRaw as any));

      // 🆕 primary price basis controlled by priceType
      const useCsd = q.priceType === 'csd';
      const exShowroom = useCsd ? csdPrice : bandMin;
      const exShowroomMax = useCsd ? csdPrice : bandMax;

      // on-road stays estimated from EX showroom band (unchanged)
      const onRoad =
        q.cityId && typeof bandMin === 'number'
          ? onroadSvc.quote({ exShowroom: bandMin, cityId: q.cityId, isLoan: q.isLoan }).total
          : null;

      const base: any = {
        variantId: v.variantId ?? null,
        name: v.variantName ?? null,
        powertrain: v.powertrain ?? null,
        exShowroom,          // ← CSD when priceType=csd, else EX
        exShowroomMax,       // ← same basis as above
        csdPrice,            // (kept separately if UI needs to show chip)
        onRoad,
        updatedDate: v.updatedDate ?? null,
      };

      if (q.expandVariantId && v.variantId === q.expandVariantId && typeof bandMin === 'number') {
        base.breakdown = onroadSvc.quote({
          exShowroom: bandMin,
          cityId: q.cityId,
          isLoan: q.isLoan,
        });
      }
      return base;
    });

    // transmission filter (manual/automatic buckets or substring)
    if (isManual || isAutomatic) {
      rows = rows.filter(r => {
        const raw = (r.powertrain?.transmissionType || '').toString().toUpperCase();
        if (isManual) {
          const isMt = raw.includes('MT');
          const hasAuto = autoTokens.some(tok => raw.includes(tok));
          return isMt && !hasAuto;
        }
        return autoTokens.some(tok => raw.includes(tok));
      });
    } else if (tr) {
      const needle = tr.toUpperCase();
      rows = rows.filter(r =>
        (r.powertrain?.transmissionType || '').toString().toUpperCase().includes(needle)
      );
    }

    // fuel filter
    if (fuelNorm) {
      rows = rows.filter(r =>
        (r.powertrain?.fuelType || '').toString().toLowerCase().includes(fuelNorm.toLowerCase())
      );
    }

    // 🆕 final sort (CSD-aware for price_asc/desc)
    const sortBy = q.sortBy || 'price_asc';
    rows.sort((a, b) => {
      const nameCmp = (x?: string | null, y?: string | null) =>
        (x ?? '').localeCompare(y ?? '', undefined, { sensitivity: 'base' });

      if (sortBy === 'price_asc' || sortBy === 'price_desc') {
        const ax = a.exShowroom ?? Number.POSITIVE_INFINITY;
        const bx = b.exShowroom ?? Number.POSITIVE_INFINITY;
        return sortBy === 'price_asc'
          ? (ax - bx) || nameCmp(a.name, b.name)
          : (bx - ax) || nameCmp(a.name, b.name);
      }
      if (sortBy === 'name_desc') return nameCmp(b.name, a.name);
      if (sortBy === 'name_asc') return nameCmp(a.name, b.name);
      return nameCmp(a.name, b.name); // fallback
    });

    return {
      modelId,
      cityId: q.cityId ?? null,
      rows,
      page: 1,
      pageSize: rows.length,
      total: rows.length,
      totalPages: 1,
    };
  }, ttlMs);
}



  // --- bestVariantToBuy (cached) ---
  async bestVariantToBuy(modelId: number, q: ModelBestVariantQuery) {
    const key = cacheKey({
      ns: 'models:bestVariantToBuy',
      v: 2,
      modelId,
      detailed: q.detailed ? 1 : 0,
      powertrainId: q.powertrainId ?? undefined,
      fuelType: q.fuelType ?? undefined,
      transmissionType: q.transmissionType ?? undefined,
    });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      const detailed = !!q.detailed;

      if (!detailed) {
        const rows = await variantsSvc.bestByModelId(modelId, {
          powertrainId: q.powertrainId,
          fuelType: q.fuelType,
          transmissionType: q.transmissionType,
        });
        return { success: true, rows, total: rows.length };
      }

      const list = await variantsSvc.list({
        modelId,
        page: 1,
        limit: 999,
        sortBy: 'price_asc'
      });

      const byPt = new Map<number, typeof list.rows>();
      for (const v of list.rows) {
        if (!v.modelPowertrainId) continue;
        const arr = byPt.get(v.modelPowertrainId) ?? [];
        arr.push(v);
        byPt.set(v.modelPowertrainId, arr);
      }

      const ptIds = Array.from(byPt.keys());
      const ptMeta = ptIds.length ? await powertrainsSvc.findByIds(ptIds) : [];
      const ptMap = new Map(ptMeta.map(p => [p.modelPowertrainId, p]));

      const wantFuel = q.fuelType?.trim().toLowerCase();
      const wantTrans = q.transmissionType?.trim().toLowerCase();

      const sections: any[] = [];
      for (const [ptId, arr] of byPt.entries()) {
        const meta = ptMap.get(ptId);
        if (wantFuel && (meta?.fuelType ?? '').toLowerCase() !== wantFuel) continue;
        if (wantTrans && (meta?.transmissionType ?? '').toLowerCase() !== wantTrans) continue;

        const rows = arr
          .map(v => {
            const priceMin = v.priceMin ?? null;
            const vfmRaw = (v as any).vfmValue;
            const vfmNum = vfmRaw == null ? null : Number(vfmRaw);
            return {
              variantId: v.variantId ?? null,
              name: v.variantName ?? null,
              vfmPercent: vfmNum != null ? Math.round(vfmNum) : null,
              price: priceMin,
              recommendation: (v as any).variantRecommendation ?? '',
              updatedDate: v.updatedDate ?? null,
            };
          })
          .sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));

        if (!rows.length) continue;

        sections.push({
          powertrain: meta
            ? {
              id: meta.modelPowertrainId,
              fuelType: meta.fuelType ?? null,
              transmissionType: meta.transmissionType ?? null,
              label: meta.powerTrain ?? [meta.fuelType, meta.transmissionType].filter(Boolean).join(' '),
            }
            : { id: ptId, fuelType: null, transmissionType: null, label: null },
          rows,
        });
      }

      sections.sort((a, b) => {
        const af = (a.powertrain.fuelType ?? '').localeCompare(b.powertrain.fuelType ?? '');
        if (af !== 0) return af;
        return (a.powertrain.transmissionType ?? '').localeCompare(b.powertrain.transmissionType ?? '');
      });

      return { success: true, sections, total: sections.reduce((n, s) => n + s.rows.length, 0) };
    }, ttlMs);
  }


  async dimensionsCapacity(
    modelId: number,
    q?: { detailed?: boolean; fuelType?: string; transmissionType?: string }
  ) {
    const key = cacheKey({
      ns: 'model:dimensionsCapacity',
      v: 2,
      modelId,
      detailed: q?.detailed ? 1 : 0,
      fuelType: q?.fuelType ?? undefined,
      transmissionType: q?.transmissionType ?? undefined,
    });


    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {

      const row = await prisma.tblmodels.findFirst({
        where: { modelId },
        select: {
          modelId: true,
          modelName: true,
          length: true,
          width: true,
          height: true,
          wheelBase: true,
          groundClearance: true,
          bootSpace: true,
          tyreSize: true,
          tyreSizeTop: true,
          seats: true,
        },
      });

      if (!row) return null;

      const boot = row.bootSpace ?? null;
      const basePayload: any = {
        modelId: row.modelId,
        modelName: row.modelName ?? null,
        dimensions: {
          length: row.length ?? null,
          width: row.width ?? null,
          height: row.height ?? null,
          wheelbase: row.wheelBase ?? null,
          groundClearance: row.groundClearance ?? null,
        },
        bootSpace: { normal: boot, cng: boot, hybrid: boot },
        tyreSize: { base: row.tyreSize ?? null, top: row.tyreSizeTop ?? null },
      };

      if (!q?.detailed) return basePayload;

      // ---------- detailed sections ----------
      const toCm = (mm?: number | null) => (typeof mm === 'number' ? mm / 10 : null);
      const toIn = (mm?: number | null) => (typeof mm === 'number' ? +(mm / 25.4).toFixed(2) : null);
      const toFt = (mm?: number | null) => (typeof mm === 'number' ? +(mm / 304.8).toFixed(2) : null);

      const conversions = {
        length: { mm: row.length ?? null, cm: toCm(row.length), inches: toIn(row.length), feet: toFt(row.length) },
        width: { mm: row.width ?? null, cm: toCm(row.width), inches: toIn(row.width), feet: toFt(row.width) },
        height: { mm: row.height ?? null, cm: toCm(row.height), inches: toIn(row.height), feet: toFt(row.height) },
        wheelbase: { mm: row.wheelBase ?? null, cm: toCm(row.wheelBase), inches: toIn(row.wheelBase), feet: toFt(row.wheelBase) },
        groundClearance: { mm: row.groundClearance ?? null, cm: toCm(row.groundClearance), inches: toIn(row.groundClearance), feet: toFt(row.groundClearance) },
      };

      // Fuel tank capacity by fuel (from powertrains)
      let tankByFuel: Record<string, number | null> = { Petrol: null, Diesel: null, CNG: null, Hybrid: null };
      const pRows = await prisma.tblmodelpowertrains.findMany({
        where: { modelId, fuelType: { not: null } },
        select: { fuelType: true, fuelTankCapacity: true },
      });
      if (pRows.length) {
        const map = new Map<string, number | null>();
        pRows.forEach(r => {
          const k = (r.fuelType || '').trim();
          if (!k) return;
          if (!map.has(k)) map.set(k, r.fuelTankCapacity ?? null);
        });
        tankByFuel = {
          Petrol: map.get('Petrol') ?? null,
          Diesel: map.get('Diesel') ?? null,
          CNG: map.get('CNG') ?? null,
          Hybrid: map.get('Hybrid') ?? null,
        };
      }

      const capacity = {
        bootSpace: { Petrol: boot, Diesel: boot, CNG: boot, Hybrid: boot },
        fuelTankCapacity: tankByFuel,
        seatingCapacity: row.seats ?? null,
      };

      // Tyre-by-variant list (filterable)
      // 🔧 normalize fuel for equals (no 'mode' here)
      const fuelEq = (() => {
        const s = q?.fuelType?.trim().toLowerCase();
        if (!s) return undefined;
        const m: Record<string, string> = {
          petrol: 'Petrol',
          diesel: 'Diesel',
          cng: 'CNG',
          hybrid: 'Hybrid',
          electric: 'Electric',
        };
        return m[s] ?? q!.fuelType!;
      })();

      const ptIds = q?.fuelType || q?.transmissionType
        ? (
          await prisma.tblmodelpowertrains.findMany({
            where: {
              modelId,
              ...(fuelEq ? { fuelType: { equals: fuelEq } } : {}),
              ...(q?.transmissionType
                ? { transmissionType: { contains: q.transmissionType } } // ← removed mode
                : {}),
            },
            select: { modelPowertrainId: true },
          })
        ).map(r => r.modelPowertrainId)
        : undefined;

      const tyreVariants = await prisma.tblvariants.findMany({
        where: {
          modelId,
          ...(ptIds && ptIds.length ? { modelPowertrainId: { in: ptIds } } : {}),
        },
        select: { variantId: true, variantName: true },
        orderBy: [{ variantName: 'asc' }],
      });

      const tyreByVariant = tyreVariants.map(v => ({
        variantId: v.variantId,
        variantName: v.variantName ?? null,
        tyreSize: null,            // per-variant size not available
        base: row.tyreSize ?? null,
        top: row.tyreSizeTop ?? null,
      }));

      return {
        ...basePayload,
        conversions,
        capacity,
        tyreByVariant,
        filters: {
          fuelType: q?.fuelType ?? null,
          transmissionType: q?.transmissionType ?? null,
        },
      };

    }, ttlMs);
  }


  // --- mileageSpecsFeatures (cached) ---
  async mileageSpecsFeatures(modelId: number, q: { powertrainId?: number }) {
    const key = cacheKey({
      ns: 'models:mileageSpecsFeatures',
      v: 1,
      modelId,
      powertrainId: q.powertrainId ?? undefined,
    });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      const options = await powertrainsSvc.listForModel(modelId);
      if (!options.length) {
        return { success: true, options: [], selectedPowertrainId: null, sections: [] };
      }

      const selectedId = q.powertrainId && options.some(o => o.id === q.powertrainId)
        ? q.powertrainId
        : options[0].id;

      const pt = await powertrainsSvc.getOneWithSpecs(selectedId);
      if (!pt) {
        return { success: true, options, selectedPowertrainId: selectedId, sections: [] };
      }

      const speed = pt.transmissionSpeed ? `${pt.transmissionSpeed}-speed` : null;
      const trans = [speed, pt.transmissionSubType || pt.transmissionType].filter(Boolean).join(' ');
      const powerStr =
        pt.powerPS ? `${pt.powerPS}PS${pt.powerMinRPM || pt.powerMaxRPM ? ` @ ${rpmRange(pt.powerMinRPM || null, pt.powerMaxRPM || null)}` : ''}` : null;
      const torqueStr =
        pt.torqueNM ? `${pt.torqueNM}Nm${pt.torqueMinRPM || pt.torqueMaxRPM ? ` @ ${rpmRange(pt.torqueMinRPM || null, pt.torqueMaxRPM || null)}` : ''}` : null;

      const sections = [
        {
          group: 'Engine & Transmission',
          rows: [
            { label: 'Engine Type', value: (pt.powerTrain?.toLowerCase().includes('turbo') ? 'Turbo' : (pt.powerTrain ?? null)) ?? null },
            { label: 'Transmission', value: trans || null },
          ],
        },
        {
          group: 'Fuel & Performance',
          rows: [
            { label: 'Engine Displacement', value: pt.engineDisplacement != null ? `${Number(pt.engineDisplacement)}L` : null },
          ],
        },
        {
          group: 'Mileage',
          rows: [
            { label: 'Cubic Capacity', value: pt.cubicCapacity != null ? `${pt.cubicCapacity}cc` : null },
            { label: 'Claimed Mileage', value: pt.claimedFE != null ? `${Number(pt.claimedFE)} kmpl` : null },
            { label: 'Real-world Mileage', value: pt.realWorldMileage != null ? `${Number(pt.realWorldMileage)} kmpl` : null },
          ],
        },
        {
          group: 'Features',
          rows: [
            { label: 'Cylinders', value: pt.cylinders ?? null },
            { label: 'Max. Power', value: powerStr },
            { label: 'Max. Torque', value: torqueStr },
          ],
        },
        {
          group: 'Functional',
          rows: [
            { label: 'Kerb Weight', value: pt.kerbWeight != null ? `${pt.kerbWeight}kg` : null },
          ],
        },
        {
          group: 'Style',
          rows: [
            { label: 'Power : Weight', value: pt.powerWeight != null ? `${Number(pt.powerWeight)}PS/tonne` : null },
            { label: 'Torque : Weight', value: pt.torqueWeight != null ? `${Number(pt.torqueWeight)}Nm/tonne` : null },
          ],
        },
      ];

      return {
        success: true,
        options,
        selectedPowertrainId: selectedId,
        header: {
          powertrainLabel: pt.powerTrain ?? [pt.fuelType ?? '', trans].filter(Boolean).join(' '),
          fuelType: pt.fuelType ?? null,
          transmission: trans || null,
        },
        sections,
      };
    }, ttlMs);
  }



  async prosCons(modelId: number) {
    const key = cacheKey({ ns: 'model:prosCons', v: 1, modelId });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      const rows = await prisma.tblmodelproscons.findMany({
        where: { modelId, type: { in: [1, 2] } },
        orderBy: [{ type: 'asc' }, { id: 'asc' }],
        select: {
          id: true,
          type: true,
          prosConsHeading: true,
          prosConsDesc: true,
          addedDateTime: true,
        },
      });

      const pros = rows
        .filter(r => r.type === 1)
        .map(r => ({
          id: r.id,
          heading: r.prosConsHeading ?? null,
          desc: r.prosConsDesc ?? null,
          addedDate: r.addedDateTime ?? null,
        }));

      const cons = rows
        .filter(r => r.type === 2)
        .map(r => ({
          id: r.id,
          heading: r.prosConsHeading ?? null,
          desc: r.prosConsDesc ?? null,
          addedDate: r.addedDateTime ?? null,
        }));

      return {
        success: true,
        modelId,
        total: { pros: pros.length, cons: cons.length },
        pros,
        cons,
      };
    }, ttlMs);
  }


  async competitors(modelId: number) {
    const key = cacheKey({ ns: 'model:competitors', v: 3, modelId }); // v++ after removing powertrains
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      // 1) read rival ids (comma-separated)
      const rivalRow = await prisma.tblmodelrivals.findFirst({
        where: { modelId },
        select: { rivalModelIds: true },
      });

      const rivalIds = (rivalRow?.rivalModelIds || '')
        .split(',')
        .map(s => Number(s.trim()))
        .filter(n => Number.isFinite(n) && n > 0);

      // ✅ exclude the current model; keep rivals order & de-dup
      const ids = Array.from(new Set(rivalIds));
      if (!ids.length) return { success: true, items: [] };

      // 2) fetch models meta
      const models = await prisma.tblmodels.findMany({
        where: { modelId: { in: ids } },
        select: {
          modelId: true,
          modelName: true,
          modelSlug: true,
          brandId: true,
        },
      });
      if (!models.length) return { success: true, items: [] };

      // 3) hydrate price bands + primary image + specs summary (PS/Nm/KMPL)
      const modelIds = models.map(m => m.modelId);
      const [priceBands, imageMap, specsMap] = await Promise.all([
        variantsSvc.getPriceBandsByModelIds(modelIds),
        imagesSvc.getPrimaryByModelIds(modelIds),
        powertrainsSvc.getSpecsByModelIds(modelIds), // { powerPS, torqueNM, mileageKMPL, ... }
      ]);

      // 4) maintain rivalIds order in output
      const order = new Map(ids.map((v, i) => [v, i]));
      const items = models
        .sort((a, b) => (order.get(a.modelId)! - order.get(b.modelId)!))
        .map(m => {
          const band = priceBands.get(m.modelId) ?? { min: null, max: null };
          const img = imageMap.get(m.modelId) ?? { name: null, alt: null, url: null };
          const specs = specsMap.get(m.modelId) ?? { powerPS: null, torqueNM: null, mileageKMPL: null };

          return {
            modelId: m.modelId,
            name: m.modelName ?? null,
            slug: m.modelSlug ?? null,
            image: img,
            priceRange: { min: band.min, max: band.max }, // rupees
            // quick spec summary
            powerPS: specs.powerPS ?? null,
            torqueNM: specs.torqueNM ?? null,
            mileageKMPL: specs.mileageKMPL ?? null,
          };
        });

      return { success: true, items };
    }, ttlMs);
  }

  // --- fuelEfficiency (cached) ---
  // replace the existing fuelEfficiency(...) with this version

  async fuelEfficiency(
    modelId: number,
    q?: { fuelType?: string; transmissionType?: string }
  ) {
    const fuelQ = q?.fuelType?.trim() || undefined;
    const transQ = q?.transmissionType?.trim() || undefined;

    // cache key includes filters
    const key = cacheKey({
      ns: 'model:fuelEfficiency',
      v: 2,
      modelId,
      fuelType: fuelQ ?? undefined,
      transmissionType: transQ ?? undefined,
    });
    const ttlMs = 30 * 60 * 1000; // 30 min

    return withCache(key, async () => {
      // 1) all variants for the model (we’ll show FE per variant row)
      const variants = await variantsSvc.listByModelId(modelId);
      if (!variants.length) return { success: true, rows: [] };

      // 2) powertrain meta used for FE + labels
      const ptIds = Array.from(
        new Set(
          variants.map(v => v.modelPowertrainId).filter((x): x is number => typeof x === 'number')
        )
      );
      const pts = ptIds.length ? await powertrainsSvc.findByIds(ptIds) : [];
      const ptMap = new Map(pts.map(p => [p.modelPowertrainId, p]));

      // helpers for filters
      const wantFuel = fuelQ?.toLowerCase();
      const wantTrans = transQ?.toLowerCase();

      const autoTokens = ['AT', 'AMT', 'DCT', 'CVT', 'E-CVT', 'AUTOMATIC'];

      const transPass = (raw?: string | null) => {
        if (!wantTrans) return true;
        const s = (raw || '').toUpperCase();

        if (wantTrans === 'manual') {
          const isMt = s.includes('MT') || s.includes('MANUAL');
          const hasAuto = autoTokens.some(tok => s.includes(tok));
          return isMt && !hasAuto;
        }
        if (wantTrans === 'automatic') {
          return autoTokens.some(tok => s.includes(tok));
        }
        // fallback: substring contains for specific codes like 'DCT', 'CVT'
        return s.includes(wantTrans.toUpperCase());
      };

      // 3) shape rows (and apply filters)
      const rows = variants
        .map(v => {
          const pt = v.modelPowertrainId ? ptMap.get(v.modelPowertrainId) : undefined;

          // fuel filter (case-insensitive)
          if (wantFuel && (pt?.fuelType || '').toLowerCase() !== wantFuel) return null;
          // transmission filter
          if (!transPass(pt?.transmissionType ?? null)) return null;

          const label =
            (pt?.powerTrain && pt.powerTrain.trim().length > 0)
              ? pt.powerTrain
              : [pt?.fuelType, pt?.transmissionType].filter(Boolean).join(' ');

          return {
            variantId: v.variantId ?? null,
            variantName: v.variantName ?? null,
            powertrain: {
              id: v.modelPowertrainId ?? null,
              label: label || null,
              fuelType: pt?.fuelType ?? null,
              transmissionType: pt?.transmissionType ?? null,
            },
            // FE columns (numbers when present, else null)
            claimedFE: pt?.claimedFE != null ? Number(pt.claimedFE as any) : null,
            realWorldMileage: pt?.realWorldMileage != null ? Number(pt.realWorldMileage as any) : null,
            cityMileage: pt?.cityMileage ?? null,        // DB has strings like "17.40kmpl"
            highwayMileage: pt?.highwayMileage ?? null,  // strings
            // optional source links
            sources: {
              realWorld: pt?.realWorldUrl ?? null,
              city: pt?.cityUrl ?? null,
              highway: pt?.highwayUrl ?? null,
            },
            updatedDate: v.updatedDate ?? null,
          };
        })
        .filter(Boolean) as Array<{
          variantId: number | null;
          variantName: string | null;
          powertrain: {
            id: number | null;
            label: string | null;
            fuelType: string | null;
            transmissionType: string | null;
          };
          claimedFE: number | null;
          realWorldMileage: number | null;
          cityMileage: string | null;
          highwayMileage: string | null;
          sources: { realWorld: string | null; city: string | null; highway: string | null };
          updatedDate: Date | null;
        }>;

      // 4) stable sort: by fuel → transmission → variant name
      rows.sort((a, b) => {
        const af = (a.powertrain.fuelType ?? '').localeCompare(b.powertrain.fuelType ?? '', undefined, { sensitivity: 'base' });
        if (af !== 0) return af;
        const at = (a.powertrain.transmissionType ?? '').localeCompare(b.powertrain.transmissionType ?? '', undefined, { sensitivity: 'base' });
        if (at !== 0) return at;
        return (a.variantName ?? '').localeCompare(b.variantName ?? '', undefined, { sensitivity: 'base' });
      });

      return { success: true, rows };
    }, ttlMs);
  }

  // --- REPLACE ENTIRE FUNCTION ---
  async csdVsOnroad(
    modelId: number,
    q: { cityId: number; fuelType?: string; transmissionType?: string; expandVariantId?: number; isLoan?: boolean }
  ) {
    const ft = q.fuelType?.trim();
    const tr = q.transmissionType?.trim();
    const expandId = q.expandVariantId;

    const key = cacheKey({
      ns: 'model:csdVsOnroad',
      v: 4, // 🔼 bump: fix transmission filtering (manual/automatic) and remove DB transmission pre-filter
      modelId,
      cityId: q.cityId,
      fuelType: ft ?? undefined,
      transmissionType: tr ?? undefined,
      expandVariantId: expandId ?? undefined,
      isLoan: q.isLoan ? 1 : 0,
    });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      const trLower = (tr || '').toLowerCase();
      const isManual = trLower === 'manual';
      const isAutomatic = trLower === 'automatic';

      // ✅ Only pass fuelType to DB; do NOT pre-filter by transmission to avoid missing "Manual" vs "MT" etc.
      const variants = await variantsSvc.list({
        modelId,
        page: 1,
        limit: 500,
        sortBy: 'price_asc',
        fuelType: ft,
        // transmissionType: (removed)
      });

      const autoTokens = ['AT', 'AMT', 'DCT', 'CVT', 'E-CVT', 'AUTOMATIC'];

      const wantFuel = (ft || '').toLowerCase();

      const transPass = (raw?: string | null) => {
        if (!trLower) return true;
        const s = (raw || '').toUpperCase();

        if (isManual) {
          const isMt = s.includes('MT') || s.includes('MANUAL');
          const hasAuto = autoTokens.some(tok => s.includes(tok));
          return isMt && !hasAuto;
        }
        if (isAutomatic) {
          return autoTokens.some(tok => s.includes(tok));
        }
        // Specific gearbox tokens like 'CVT', 'DCT'
        return s.includes(trLower.toUpperCase());
      };

      // Fuel + transmission filter in-memory (more tolerant than DB codes)
      let rows = variants.rows.filter(v => {
        const fuelOk = !wantFuel || (v.powertrain?.fuelType || '').toLowerCase() === wantFuel;
        const transOk = transPass(v.powertrain?.transmissionType ?? null);
        return fuelOk && transOk;
      });

      // 👉 Compute on-road for EVERY row; detailed breakup only for expandVariantId
      const shaped = rows.map(v => {
        const exMin = v.priceMin ?? null;

        const csdRaw = (v as any).csdPrice as unknown;
        const csdPrice =
          csdRaw == null ? null : typeof csdRaw === 'number' ? csdRaw : Number(csdRaw as any);

        const baseBreakdown =
          typeof exMin === 'number'
            ? onroadSvc.quote({ exShowroom: exMin, cityId: q.cityId, isLoan: !!q.isLoan })
            : null;

        const shouldExpand = expandId && v.variantId === expandId;

        const label =
          v.powertrain?.label ||
          [v.powertrain?.fuelType, v.powertrain?.transmissionType].filter(Boolean).join(' ');

        return {
          variantId: v.variantId ?? null,
          variantName: v.variantName ?? null,
          powertrain: {
            id: v.modelPowertrainId ?? null,
            label: label || null,
            fuelType: v.powertrain?.fuelType ?? null,
            transmissionType: v.powertrain?.transmissionType ?? null,
          },
          prices: {
            csd: csdPrice,
            exShowroom: exMin,
            onRoad: baseBreakdown ? baseBreakdown.total : null, // ✅ always filled when exMin present
          },
          onRoadBreakup: shouldExpand && baseBreakdown
            ? {
              csdPrice: csdPrice,
              roadTax: baseBreakdown.roadTax ?? null,
              registration: baseBreakdown.registrationCharges ?? null,
              fastag: baseBreakdown.fastag ?? null,
              hypothecation: baseBreakdown.hypothecationEndorsement ?? null,
              roadSafetyCess: baseBreakdown.roadSafetyCess ?? null,
              otherCharges: baseBreakdown.otherCharges ?? null,
              insurance: baseBreakdown.insurance ?? null,
              total: baseBreakdown.total ?? null,
              cityId: q.cityId,
            }
            : null,
          updatedDate: v.updatedDate ?? null,
        };
      });

      // Stable sort
      shaped.sort((a, b) => {
        const af = (a.powertrain.fuelType ?? '').localeCompare(b.powertrain.fuelType ?? '', undefined, { sensitivity: 'base' });
        if (af !== 0) return af;
        const at = (a.powertrain.transmissionType ?? '').localeCompare(b.powertrain.transmissionType ?? '', undefined, { sensitivity: 'base' });
        if (at !== 0) return at;
        return (a.variantName ?? '').localeCompare(b.variantName ?? '', undefined, { sensitivity: 'base' });
      });

      return {
        modelId,
        cityId: q.cityId,
        filters: { fuelType: ft ?? null, transmissionType: tr ?? null, expandVariantId: expandId ?? null, isLoan: !!q.isLoan },
        rows: shaped,
        total: shaped.length,
      };
    }, ttlMs);
  }

  async offersDiscounts(
    modelId: number,
    q?: { months?: number; cityId?: number; expandQID?: number }
  ) {
    const months = Math.max(1, Math.min(q?.months ?? 12, 24)); // default 12, clamp 1..24
    const key = cacheKey({
      ns: 'model:offersDiscounts',
      v: 4, // 🔼 bump: expandQID behavior
      modelId,
      months,
      cityId: q?.cityId ?? undefined,
      expandQID: q?.expandQID ?? undefined,
    });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      // 1) latest active offer for this model
      const offer = await prisma.tbloffers.findFirst({
        where: { modelId, offerStatus: 2, expireDateTime: { gte: new Date() } },
        orderBy: [{ addedDateTime: 'desc' }],
        select: {
          offerId: true,
          modelId: true,
          title: true,
          imageFile: true,
          imageAltText: true,
          addedDateTime: true,
          expireDateTime: true,
        },
      });

      if (!offer) {
        return { success: true, modelId, rows: [], total: 0 };
      }

      // 2) window start is months back FROM NOW; filter is on tbloffercontent.addedDateTime
      const fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - months);

      // 3) fetch content rows for this offerId within the window
      const content = await prisma.tbloffercontent.findMany({
        where: {
          modelId: offer.offerId, // NOTE: in tbloffercontent, modelId stores offerId
          addedDateTime: { gte: fromDate },
        },
        orderBy: [{ qid: 'desc' }],
        select: {
          qid: true,
          quesText: true,
          ansText: true,
          sequence: true,
          addedDateTime: true,
        },
      });

      const rows = content.map(c => {
        const isExpanded = q?.expandQID != null && Number(q.expandQID) === c.qid;
        const hasAns = !!(c.ansText && c.ansText.trim().length > 0);
        return {
          id: c.qid,
          quesText: c.quesText ?? null,
          hasAnswer: hasAns,
          ansHtml: isExpanded ? (c.ansText ?? null) : null,
          sequence: c.sequence ?? null,
          addedDate: c.addedDateTime ?? null,
        };
      });

      return {
        success: true,
        modelId,
        offer: {
          id: offer.offerId,
          title: offer.title ?? null,
          image: { url: offer.imageFile ?? null, alt: offer.imageAltText ?? null },
          addedDate: offer.addedDateTime ?? null,
          expireDate: offer.expireDateTime ?? null,
        },
        rows,
        total: rows.length,
      };
    }, ttlMs);
  }


  async monthlySales(modelId: number, q: { months?: number }) {
    const months = Math.max(1, Math.min(q.months ?? 6, 24));

    const key = cacheKey({
      ns: 'models:monthlySales',
      v: 1,
      modelId,
      months,
    });
    const ttlMs = 30 * 60 * 1000; // 30 min

    return withCache(key, async () => {
      // 1) Pull the latest available month for this model
      const latest = await prisma.tblmonthlysales.findFirst({
        where: { modelId },
        select: { year: true, month: true },
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
      });

      if (!latest) {
        return { success: true, modelId, rows: [], chart: { points: [] }, total: 0, summary: null };
      }

      // 2) Get last N records (most recent first), then reverse for chart/table ascending order
      const raw = await prisma.tblmonthlysales.findMany({
        where: { modelId },
        select: { year: true, month: true, numSales: true },
        orderBy: [{ year: 'desc' }, { month: 'desc' }],
        take: months,
      });

      // 🔧 drop rows with null month/year, then narrow to numbers
      const cleaned = raw
        .filter((r): r is { year: number; month: number; numSales: number | null } =>
          r.year != null && r.month != null
        );

      if (!cleaned.length) {
        return { success: true, modelId, rows: [], chart: { points: [] }, total: 0, summary: null };
      }

      const ordered = cleaned.slice().reverse(); // oldest -> newest

      const monthLabel = (y: number, m: number) =>
        new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' })
          .format(new Date(y, m - 1, 1));

      const rows = ordered.map(r => ({
        monthKey: `${r.year}-${String(r.month).padStart(2, '0')}`,
        month: monthLabel(r.year, r.month),   // ✅ now both are numbers
        year: r.year,
        monthNum: r.month,
        units: r.numSales ?? 0,
      }));

      // 4) Chart points
      const points = rows.map(r => ({
        key: r.monthKey,
        label: r.month,
        value: r.units,
      }));

      // 5) MoM summary (use last two points if exist)
      let summary: null | {
        month: string;
        units: number;
        prevMonth?: string | null;
        prevUnits?: number | null;
        momChangePct?: number | null; // +ve growth / -ve decline
      } = null;

      const last = rows[rows.length - 1];
      const prev = rows.length > 1 ? rows[rows.length - 2] : undefined;

      if (last) {
        const mom =
          prev && prev.units > 0
            ? +(((last.units - prev.units) / prev.units) * 100).toFixed(2)
            : null;

        summary = {
          month: last.month,
          units: last.units,
          prevMonth: prev?.month ?? null,
          prevUnits: prev?.units ?? null,
          momChangePct: mom,
        };
      }

      return {
        success: true,
        modelId,
        rows,                 // for the table
        chart: { points },    // for the line chart
        total: rows.length,
        summary,              // for the intro sentence
      };
    }, ttlMs);
  }


  // ⬇️ Add this method inside ModelsService class
async upcomingByBrand(
  modelId: number,
  opts?: { limit?: number }
) {
  const limit = Math.max(1, Math.min(opts?.limit ?? 5, 50));

  const key = cacheKey({
    ns: 'models:upcomingByBrand',
    v: 1,
    modelId,
    limit,
  });
  const ttlMs = 30 * 60 * 1000; // 30 min

  return withCache(key, async () => {
    // 1) find the brand for this model
    const base = await prisma.tblmodels.findFirst({
      where: { modelId },
      select: { brandId: true },
    });
    if (!base?.brandId) {
      return { rows: [], total: 0 };
    }

    // 2) upcoming models of the same brand (exclude current)
    const models = await prisma.tblmodels.findMany({
      where: {
        brandId: base.brandId,
        isUpcoming: true,
        modelId: { not: modelId },
      },
      select: {
        modelId: true,
        modelName: true,
        modelSlug: true,
        launchDate: true,
        expectedBasePrice: true,
        expectedTopPrice: true,
      },
      orderBy: [
        { launchDate: 'asc' },
        { modelId: 'asc' },
      ],
      take: limit,
    });
    if (!models.length) return { rows: [], total: 0 };

    const ids = models.map(m => m.modelId);

    // 3) hydrate price bands from variants + primary images
    const [bands, imageMap] = await Promise.all([
      variantsSvc.getPriceBandsByModelIds(ids),  // Map<modelId, {min,max}>
      imagesSvc.getPrimaryByModelIds(ids),       // Map<modelId, {url,alt,name}>
    ]);

    // 4) shape rows (fallback to expected* when no variants)
    const rows = models.map(m => {
      const band = bands.get(m.modelId) ?? { min: null, max: null };
      const priceMin =
        (typeof band.min === 'number' ? band.min : null) ??
        (typeof m.expectedBasePrice === 'number' ? m.expectedBasePrice : null);

      const priceMax =
        (typeof band.max === 'number' ? band.max : null) ??
        (typeof m.expectedTopPrice === 'number' ? m.expectedTopPrice : null);

      const img = imageMap.get(m.modelId) ?? { url: null, alt: null, name: null };

      return {
        modelId: m.modelId,
        name: m.modelName ?? null,
        slug: m.modelSlug ?? null,
        launchDate: m.launchDate ?? null,
        priceRange: { min: priceMin, max: priceMax },
        image: img,
        imageUrl: img.url,
      };
    });

    return { rows, total: rows.length };
  }, ttlMs);
}

// ⬇️ add this method inside ModelsService class
async othersOnSale(
  modelId: number,
  q?: { limit?: number }
) {
  // find current model to get brandId
  const cur = await prisma.tblmodels.findFirst({
    where: { modelId },
    select: { modelId: true, brandId: true },
  });
  if (!cur?.brandId) {
    return { success: true, items: [], total: 0 };
  }

  const limit = Math.max(1, Math.min(q?.limit ?? 5, 20));

  const key = cacheKey({
    ns: 'models:othersOnSale',
    v: 1,
    modelId,
    brandId: cur.brandId,
    limit,
  });
  const ttlMs = 30 * 60 * 1000; // 30 min

  return withCache(key, async () => {
    // same brand, on-sale, exclude current model
    const models = await prisma.tblmodels.findMany({
      where: {
        brandId: cur.brandId,
        isUpcoming: false,            // on sale
        NOT: { modelId: cur.modelId },
      },
      select: {
        modelId: true,
        modelName: true,
        modelSlug: true,
        expectedBasePrice: true,
        expectedTopPrice: true,
        brandId: true,
      },
      orderBy: [{ totalViews: 'desc' }, { modelId: 'asc' }],
      take: limit,
    });

    if (!models.length) return { success: true, items: [], total: 0 };

    const ids = models.map(m => m.modelId);

    // hydrate price bands + primary images
    const [priceBands, imageMap] = await Promise.all([
      variantsSvc.getPriceBandsByModelIds(ids),
      imagesSvc.getPrimaryByModelIds(ids),
    ]);

    const items = models.map(m => {
      const band = priceBands.get(m.modelId) ?? { min: null, max: null };
      // prefer variant band; fall back to expected* if present
      const priceMin =
        (band.min != null ? band.min :
         (typeof m.expectedBasePrice === 'number' && m.expectedBasePrice > 0 ? m.expectedBasePrice : null));
      const priceMax =
        (band.max != null ? band.max :
         (typeof m.expectedTopPrice === 'number' && m.expectedTopPrice > 0 ? m.expectedTopPrice : null));

      const img = imageMap.get(m.modelId) ?? { name: null, alt: null, url: null };

      return {
        modelId: m.modelId,
        name: m.modelName ?? null,
        slug: m.modelSlug ?? null,
        image: img,
        imageUrl: img.url,
        priceRange: { min: priceMin, max: priceMax }, // ₹
      };
    });

    return { success: true, items, total: items.length };
  }, ttlMs);
}


async serviceCost(modelId: number) {
  const key = cacheKey({ ns: 'model:serviceCost', v: 1, modelId });
  const ttlMs = 30 * 60 * 1000; // 30 min

  return withCache(key, async () => {
    const row = await prisma.tblmodelpagecontent.findFirst({
      where: { modelId },
      select: {
        serviceCostContent: true,
        updateDateandTime: true,
        addedDateandTime: true,
      },
    });

    return {
      success: true,
      modelId,
      serviceCostHtml: row?.serviceCostContent ?? null,
      updatedDate: row?.updateDateandTime ?? row?.addedDateandTime ?? null,
    };
  }, ttlMs);
}


// inside ModelsService
async colours(modelId: number) {
  const key = cacheKey({ ns: 'model:colours', v: 1, modelId });
  const ttlMs = 30 * 60 * 1000;

  return withCache(key, async () => {
    // 1) colour palette (with colorCode + image)
    const colors = await imagesSvc.listColorsByModelId(modelId);
    // { id, colorId, name, colorCode, imageUrl }

    // 2) minimal variants list (sorted by name)
    const variants = await prisma.tblvariants.findMany({
      where: { modelId },
      select: { variantId: true, variantName: true },
      orderBy: [{ variantName: 'asc' }],
    });

    // 3) variant–colour availability mapping (best-effort: table may not exist)
    let availability: Array<{ variantId: number; colorId: number }> = [];
    try {
      // expect a mapping table like: tblvariantcolors(modelId, variantId, colorId[, isAvailable])
      const rows: any[] = await (prisma as any).tblvariantcolors.findMany({
        where: { modelId },
        select: { variantId: true, colorId: true, isAvailable: true },
      });

      availability = rows
        .filter(r => r && typeof r.variantId === 'number' && typeof r.colorId === 'number' && (r.isAvailable ?? 1))
        .map(r => ({ variantId: r.variantId, colorId: r.colorId }));
    } catch {
      // no mapping table — return empty availability; UI can hide matrix or show all ✗
      availability = [];
    }

    return {
      success: true,
      modelId,
      // palette for the right-side colour pills
      colors,                // [{id,colorId,name,colorCode,imageUrl}]
      // rows for the table’s first column
      variants: variants.map(v => ({ id: v.variantId, name: v.variantName ?? null })),
      // pairs -> a check mark when (variantId,colorId) exists
      availability,          // e.g., [{variantId: 123, colorId: 45}, ...]
      // helpful counts (optional)
      totals: { colors: colors.length, variants: variants.length, pairs: availability.length },
    };
  }, ttlMs);
}


// add inside ModelsService
async gallery(
  modelId: number,
  q?: { type?: 'all' | 'interior' | 'exterior' | 'other'; limit?: number }
) {
  const type = (q?.type ?? 'all') as 'all'|'interior'|'exterior'|'other';
  const limit = Math.max(1, Math.min(q?.limit ?? 999, 2000));

  const key = cacheKey({ ns: 'model:gallery', v: 1, modelId, type, limit });
  const ttlMs = 30 * 60 * 1000;

  return withCache(key, async () => {
    const items = await imagesSvc.listGalleryByModelId(modelId);

    // groups for tabs
    const byType = {
      interior: items.filter(i => i.type === 'interior'),
      exterior: items.filter(i => i.type === 'exterior'),
      other:    items.filter(i => i.type === 'other'),
    };
    const all = items;

    // featured (hero) image + 8 thumbnails like UI
    const featured = (all.find(i => i.isMain) ?? all[0]) || null;
    const thumbnails = all.filter(i => i.id !== featured?.id).slice(0, 8);

    // optional filter for one-tab only
    const pick = (arr: typeof all) => arr.slice(0, limit);

    return {
      success: true,
      modelId,
      featured,                   // {id,url,alt,type,...}
      thumbnails,                 // 6–8 items for strip
      tabs: {
        all:      { total: all.length, items: pick(all) },
        interior: { total: byType.interior.length, items: pick(byType.interior) },
        exterior: { total: byType.exterior.length, items: pick(byType.exterior) },
        others:   { total: byType.other.length,    items: pick(byType.other) },
      },
      counts: {
        total: all.length,
        interior: byType.interior.length,
        exterior: byType.exterior.length,
        others: byType.other.length,
      },
    };
  }, ttlMs);
}




}
