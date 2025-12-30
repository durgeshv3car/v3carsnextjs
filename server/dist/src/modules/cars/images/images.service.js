import { ImagesRepo } from './images.repo.js';
// ⬇️ Cache façade
import { withCache, cacheKey } from '../../../lib/cache.js';
const repo = new ImagesRepo();
/** 🔁 Frontend will prepend base URL — return raw file path only */
function buildAssetPath(name) {
    return name ?? null;
}
function mapType(n) {
    if (n === 1)
        return 'interior';
    if (n === 2)
        return 'exterior';
    return 'other';
}
export class ImagesService {
    async getPrimaryByModelIds(modelIds) {
        const ids = Array.from(new Set((modelIds || []).filter((n) => typeof n === 'number'))).sort((a, b) => a - b);
        if (!ids.length)
            return new Map();
        const key = cacheKey({ ns: 'images:primaryByModelIds', v: 2, ids }); // bump v due to path logic change
        const ttlMs = 60 * 60 * 1000;
        const entries = await withCache(key, async () => {
            const raw = await repo.getPrimaryByModelIds(ids); // Map<number, row>
            const arr = [];
            for (const [modelId, r] of raw) {
                const name = r.modelImageName ?? r.variantImageName ?? null;
                const alt = r.modelImageAltText ?? r.variantImageAltText ?? null;
                arr.push([modelId, { name, alt, url: buildAssetPath(name) }]);
            }
            return arr;
        }, ttlMs);
        return new Map(entries);
    }
    /** Full gallery for a model */
    async listAllByModelId(modelId) {
        const key = cacheKey({ ns: 'images:listAllByModel', v: 2, modelId }); // bump v
        const ttlMs = 60 * 60 * 1000;
        return withCache(key, async () => {
            const rows = await repo.listAllByModelId(modelId);
            return rows.map((r) => {
                const name = r.modelImageName ?? r.variantImageName ?? null;
                const alt = r.modelImageAltText ?? r.variantImageAltText ?? null;
                return {
                    id: r.imageId,
                    url: buildAssetPath(name),
                    alt,
                    isMain: !!r.isMainImage,
                    position: r.position_no ?? null,
                };
            });
        }, ttlMs);
    }
    /** Colours for a model */
    async listColorsByModelId(modelId) {
        const key = cacheKey({ ns: 'images:listColorsByModel', v: 3, modelId }); // v++ after adding colorCode
        const ttlMs = 60 * 60 * 1000;
        return withCache(key, async () => {
            const rows = await repo.listColorsByModelId(modelId);
            return rows.map((r) => ({
                id: r.id,
                colorId: r.colorId ?? null,
                // prefer canonical color name from tblcolors; fallback to file alt text
                name: (r._colorName ?? r.fileNameAltText) ?? null,
                colorCode: r._colorCode ?? null, // <-- HEX like "#AABBCC" (may be null if missing)
                imageUrl: buildAssetPath(r.fileName ?? null),
            }));
        }, ttlMs);
    }
    async listGalleryByModelId(modelId) {
        const key = cacheKey({ ns: 'images:galleryByModel', v: 1, modelId });
        const ttlMs = 60 * 60 * 1000;
        return withCache(key, async () => {
            const rows = await repo.listByModelIdWithTypes(modelId);
            return rows.map(r => {
                // prefer model image fields; fallback to variant fields
                const pickedModel = !!r.modelImageName;
                const file = pickedModel ? r.modelImageName : r.variantImageName;
                const alt = pickedModel ? r.modelImageAltText : r.variantImageAltText;
                const tNum = pickedModel ? r.modelImageType : r.variantImageType;
                return {
                    id: r.imageId,
                    url: buildAssetPath(file ?? null),
                    alt: alt ?? null,
                    type: mapType(tNum ?? r.modelImageType ?? r.variantImageType ?? null),
                    isMain: !!r.isMainImage,
                    position: r.position_no ?? null,
                    variantId: r.variantId ?? null,
                    colorId: r.colorId ?? null,
                    is360: !!r.is360view,
                    uploadedAt: r.uploadedDateTime ?? null,
                };
            });
        }, ttlMs);
    }
}
