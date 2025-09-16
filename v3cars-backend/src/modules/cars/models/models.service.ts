import type { ModelsListQuery } from './models.types.js';
import { ModelsRepo } from './models.repo.js';
import { BrandsService } from '../brands/brands.service.js';
import { VariantsService } from '../variants/variants.service.js';
import { PowertrainsService } from '../powertrains/powertrains.service.js';
import { ImagesService } from '../images/images.service.js';

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

  if (typeof bmin === 'number' && hi < bmin) return false; // model entirely below bucket
  if (typeof bmax === 'number' && lo > bmax) return false; // model entirely above bucket
  return true; // overlap
}

export class ModelsService {
  async list(q: ModelsListQuery) {
    // 🔸 If priceBucket not present → old path (expected* columns + variant fallback for display)
    if (!q.priceBucket) {
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
        const specs = specsMap.get(m.modelId) ?? { powerPS: null, torqueNM: null, mileageKMPL: null };
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
          image: img,
          imageUrl: img.url,
        };
      });

      return { ...base, rows: enriched };
    }

    // ✅ Variant-based price filtering path (for priceBucket)
    // 1) Pull all base rows for non-price filters
    const baseRows = await repo.listIgnoringPriceBucket(q);
    const allIds = baseRows.map((r) => r.modelId);
    if (!allIds.length) {
      return { rows: [], total: 0, page: q.page || 1, pageSize: q.limit || 12, totalPages: 0 };
    }

    // 2) Compute variant price bands (already 'snapped' by repo util)
    const bands = await variantsSvc.getPriceBandsByModelIds(allIds);

    // 3) Attach computed min/max strictly from variants; exclude models without bands
    const withComputed = baseRows
      .map((m) => {
        const b = bands.get(m.modelId) ?? { min: null, max: null };
        return {
          ...m,
          computedMin: b.min,
          computedMax: b.max,
        };
      })
      .filter((m) => m.computedMin != null || m.computedMax != null);

    // 4) Apply bucket filter (overlap)
    const filtered = withComputed.filter((m) => inBucket(m.computedMin ?? null, m.computedMax ?? null, q.priceBucket as any));

    // 5) Sort (price sorting uses computed bands; others use base fields)
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

    // 7) Enrich (brands, specs, images) for page rows only
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
      const specs = specsMap.get(m.modelId) ?? { powerPS: null, torqueNM: null, mileageKMPL: null };
      const img = imageMap.get(m.modelId) ?? { name: null, alt: null, url: null };

      // For price-bucket flow, ALWAYS use computed (variant-based) prices for display
      const priceMin = m.computedMin ?? null;
      const priceMax = m.computedMax ?? null;

      return {
        ...m,
        brand: b ? { id: b.brandId, name: b.brandName, slug: b.brandSlug, logo: b.logoPath } : null,
        priceMin,
        priceMax,
        powerPS: specs.powerPS,
        torqueNM: specs.torqueNM,
        mileageKMPL: specs.mileageKMPL,
        image: img,
        imageUrl: img.url,
      };
    });

    return { rows: enriched, total, page, pageSize, totalPages };
  }

  async getById(id: number) {
    // (Optionally enrich detail similarly)
    return repo.getById(id);
  }
}
