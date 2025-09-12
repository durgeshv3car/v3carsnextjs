import { ImagesRepo } from './images.repo.js';
import { env } from '../../../config/env.js';

const repo = new ImagesRepo();

/** Build absolute URL if MEDIA_BASE_URL is set; else return the name as-is */
function buildAssetUrl(name?: string | null): string | null {
  if (!name) return null;
  const base = (env.MEDIA_BASE_URL || '').trim();
  if (!base) return name;
  const b = base.replace(/\/+$/, '');
  const p = name.replace(/^\/+/, '');
  return `${b}/${p}`;
}

export class ImagesService {
  async getPrimaryByModelIds(modelIds: number[]) {
    const raw = await repo.getPrimaryByModelIds(modelIds);
    const map = new Map<number, { name: string | null; alt: string | null; url: string | null }>();

    for (const [modelId, r] of raw) {
      const name = r.modelImageName ?? r.variantImageName ?? null;
      const alt = r.modelImageAltText ?? r.variantImageAltText ?? null;
      map.set(modelId, {
        name,
        alt,
        url: buildAssetUrl(name),
      });
    }
    return map;
  }
}
