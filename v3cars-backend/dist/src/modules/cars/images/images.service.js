import { ImagesRepo } from './images.repo.js';
import { env } from '../../../config/env.js';
// ⬇️ Cache façade
import { withCache, cacheKey } from '../../../lib/cache.js';
const repo = new ImagesRepo();
/** Build absolute URL if MEDIA_BASE_URL is set; else return the name as-is */
function buildAssetUrl(name) {
    if (!name)
        return null;
    const base = (env.MEDIA_BASE_URL || '').trim();
    if (!base)
        return name;
    const b = base.replace(/\/+$/, '');
    const p = name.replace(/^\/+/, '');
    return `${b}/${p}`;
}
export class ImagesService {
    async getPrimaryByModelIds(modelIds) {
        const ids = Array.from(new Set((modelIds || []).filter((n) => typeof n === 'number'))).sort((a, b) => a - b);
        if (!ids.length)
            return new Map();
        const key = cacheKey({ ns: 'images:primaryByModelIds', v: 1, ids });
        const ttlMs = 60 * 60 * 1000; // 60 min
        const entries = await withCache(key, async () => {
            const raw = await repo.getPrimaryByModelIds(ids); // Map<number, row>
            const arr = [];
            for (const [modelId, r] of raw) {
                const name = r.modelImageName ?? r.variantImageName ?? null;
                const alt = r.modelImageAltText ?? r.variantImageAltText ?? null;
                arr.push([modelId, { name, alt, url: buildAssetUrl(name) }]);
            }
            return arr;
        }, ttlMs);
        return new Map(entries);
    }
}
