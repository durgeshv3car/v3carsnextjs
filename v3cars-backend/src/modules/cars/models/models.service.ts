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

export class ModelsService {
  async list(q: ModelsListQuery) {
    const base = await repo.list(q);
    const rows = base.rows;

    // Batch ids
    const modelIds = rows.map((r) => r.modelId).filter((x): x is number => typeof x === 'number');
    const brandIds = Array.from(new Set(rows.map((r) => r.brandId).filter((x): x is number => typeof x === 'number')));

    // Parallel fetch: brands + variant price bands + power specs + images
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
        priceMin,   // integer ₹
        priceMax,   // integer ₹
        powerPS: specs.powerPS,
        torqueNM: specs.torqueNM,
        mileageKMPL: specs.mileageKMPL,

        // ✅ image meta
        image: img,          // { name, alt, url }
        imageUrl: img.url,   // convenience field if frontend expects directly
      };
    });

    return { ...base, rows: enriched };
  }

  async getById(id: number) {
    // (Optionally enrich detail similarly)
    return repo.getById(id);
  }
}
