// src/modules/cars/models/models.service.ts
import type { ModelBestVariantQuery, ModelPriceListQuery, ModelsListQuery } from './models.types.js';
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

const join = (...parts: (string | null | undefined)[]) => parts.filter(Boolean).join(' ');
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


  async priceList(
    modelId: number,
    q: {
      cityId?: number;
      expandVariantId?: number;
      isLoan?: boolean;
      fuelType?: string;
      transmissionType?: string; // 🆕 separate gearbox filter
    }
  ) {
    // --- normalize filters ---
    const ft = (q.fuelType || '').trim().toLowerCase();
    const tr = (q.transmissionType || '').trim().toLowerCase();

    const fuelNorm =
      ft === 'petrol' ? 'Petrol' :
        ft === 'diesel' ? 'Diesel' :
          ft === 'cng' ? 'CNG' :
            ft === 'hybrid' ? 'Hybrid' :
              ft === 'electric' ? 'Electric' :
                undefined;

    const isManual = tr === 'manual';
    const isAutomatic = tr === 'automatic';

    // ⚠️ Only pass transmissionType to DB when it's an unambiguous single code.
    // "manual" → MT (safe). "automatic" spans AT/AMT/DCT/CVT/e-CVT → post-filter in memory.
    const dbTransmissionType = isManual ? 'MT' : undefined;

    // --- fetch variants (DB filters where safe) ---
    const variants = await variantsSvc.list({
      modelId,
      page: 1,
      limit: 100,
      sortBy: 'price_asc',
      fuelType: fuelNorm,
      transmissionType: dbTransmissionType,
    });

    const autoTokens = ['AT', 'AMT', 'DCT', 'CVT', 'E-CVT', 'AUTOMATIC'];

    // --- map to rows + compute optional on-road breakdown ---
    let rows = (variants.rows || []).map(v => {
      const bandMin = v.priceMin ?? null;
      const bandMax = v.priceMax ?? null;

      const onRoad =
        q.cityId && typeof bandMin === 'number'
          ? onroadSvc.quote({ exShowroom: bandMin, cityId: q.cityId, isLoan: q.isLoan }).total
          : null;

      const base: any = {
        variantId: v.variantId ?? null,
        name: v.variantName ?? null,
        powertrain: v.powertrain ?? null,
        exShowroom: bandMin,
        exShowroomMax: bandMax,
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

    // --- apply transmission filter (in-memory) ---
    if (isManual || isAutomatic) {
      rows = rows.filter(r => {
        const raw = (r.powertrain?.transmissionType || '').toString().toUpperCase();
        if (isManual) {
          // keep pure MT (and avoid anything that contains auto codes)
          const isMt = raw.includes('MT');
          const hasAuto = autoTokens.some(tok => raw.includes(tok));
          return isMt && !hasAuto;
        }
        // automatic bucket = AT / AMT / DCT / CVT / e-CVT / "AUTOMATIC"
        return autoTokens.some(tok => raw.includes(tok));
      });
    } else if (tr) {
      // fallback: if a specific code like "DCT" or "CVT" is ever sent directly
      const needle = tr.toUpperCase();
      rows = rows.filter(r => (r.powertrain?.transmissionType || '').toString().toUpperCase().includes(needle));
    }

    // --- (fuelNorm already applied at DB level; keep a defensive contains check) ---
    if (fuelNorm) {
      rows = rows.filter(r =>
        (r.powertrain?.fuelType || '').toString().toLowerCase().includes(fuelNorm.toLowerCase())
      );
    }

    return {
      modelId,
      cityId: q.cityId ?? null,
      rows,
      page: variants.page,
      pageSize: variants.pageSize,
      total: rows.length,   // after in-memory filter
      totalPages: 1,
    };
  }

  async bestVariantToBuy(modelId: number, q: ModelBestVariantQuery) {
    const detailed = !!q.detailed;

    // SIMPLE: one-row-per-powertrain "best" (now with fuel/trans filters)
    if (!detailed) {
      const rows = await variantsSvc.bestByModelId(modelId, {
        powertrainId: q.powertrainId,
        fuelType: q.fuelType,
        transmissionType: q.transmissionType,
      });

      return {
        success: true,
        rows,
        total: rows.length,
      };

    }

    // DETAILED: section per powertrain with all variants (apply filters here too)
    const list = await variantsSvc.list({
      modelId,
      page: 1,
      limit: 999,         // we’ll paginate on UI if needed
      sortBy: 'price_asc' // rows sorted by price
    });

    // group by powertrain id
    const byPt = new Map<number, typeof list.rows>();
    for (const v of list.rows) {
      if (!v.modelPowertrainId) continue;
      const arr = byPt.get(v.modelPowertrainId) ?? [];
      arr.push(v);
      byPt.set(v.modelPowertrainId, arr);
    }

    // load powertrain meta for labeling + filtering
    const ptIds = Array.from(byPt.keys());
    const ptMeta = ptIds.length ? await powertrainsSvc.findByIds(ptIds) : [];
    const ptMap = new Map(ptMeta.map(p => [p.modelPowertrainId, p]));

    const wantFuel = q.fuelType?.trim().toLowerCase();
    const wantTrans = q.transmissionType?.trim().toLowerCase();

    const sections = [];
    for (const [ptId, arr] of byPt.entries()) {
      const meta = ptMap.get(ptId);

      // 🆕 apply filters if provided
      if (wantFuel && (meta?.fuelType ?? '').toLowerCase() !== wantFuel) continue;
      if (wantTrans && (meta?.transmissionType ?? '').toLowerCase() !== wantTrans) continue;

      // shape rows
      const rows = arr
        .map(v => {
          const priceMin = v.priceMin ?? null;

          // 👇 Prisma Decimal → number (or null)
          const vfmRaw = (v as any).vfmValue;
          const vfmNum = vfmRaw == null ? null : Number(vfmRaw);

          return {
            variantId: v.variantId ?? null,
            name: v.variantName ?? null,
            vfmPercent: vfmNum != null ? Math.round(vfmNum) : null, // ✅ fixed
            price: priceMin,
            recommendation: (v as any).variantRecommendation ?? '',
            updatedDate: v.updatedDate ?? null,
          };
        })
        .sort((a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY));

      // keep section only if it has visible rows after filter
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

    // sort sections stable
    sections.sort((a, b) => {
      const af = (a.powertrain.fuelType ?? '').localeCompare(b.powertrain.fuelType ?? '');
      if (af !== 0) return af;
      return (a.powertrain.transmissionType ?? '').localeCompare(b.powertrain.transmissionType ?? '');
    });

    return {
      success: true,
      sections,
      total: sections.reduce((n, s) => n + s.rows.length, 0),
    };
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

  async mileageSpecsFeatures(modelId: number, q: { powertrainId?: number }) {
    // options for top-right dropdown
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
    const trans = join(speed, pt.transmissionSubType || pt.transmissionType);

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
      options,                    // dropdown list [{id,label,fuelType,transmissionType}]
      selectedPowertrainId: selectedId,
      header: {
        powertrainLabel: pt.powerTrain ?? join(pt.fuelType ?? '', trans),
        fuelType: pt.fuelType ?? null,
        transmission: trans || null,
      },
      sections,
    };
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


}





