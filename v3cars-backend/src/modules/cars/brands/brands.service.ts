import type { BrandsListQuery } from './brands.types.js';
import { BrandsRepo } from './brands.repo.js';

// 🔑 Cache façade
import { withCache, cacheKey } from '../../../lib/cache.js';

const repo = new BrandsRepo();

export class BrandsService {

  /** List brands with cache (page 1 hotter ⇒ longer TTL) */
  async list(q: BrandsListQuery) {
    const page = q?.page ?? 1;
    const limit = q?.limit ?? 50;

    // TTL: p1 => 10m, others => 5m
    const ttlMs = page === 1 ? 10 * 60 * 1000 : 5 * 60 * 1000;

    const key = cacheKey({
      ns: 'brands:list',
      v: 1,
      page,
      limit,
      q: (q as any)?.q ?? undefined,
      status: (q as any)?.status ?? undefined,
      hasServiceNetwork: (q as any)?.hasServiceNetwork ?? undefined,
      brandType: (q as any)?.brandType ?? undefined,
      sortBy: (q as any)?.sortBy ?? 'id_asc',
    });

    return withCache(key, async () => {
      return repo.list(q);
    }, ttlMs);
  }

  /** Brand detail (ALL columns) — 30m cache */
  async getById(id: number) {
    const key = cacheKey({ ns: 'brand:detail', v: 2, id }); // v:2 since now returning ALL columns
    const ttlMs = 30 * 60 * 1000;
    return withCache(key, async () => {
      return repo.getById(id);
    }, ttlMs);
  }

  /** 🆕 Discontinued models for a brand — 10m cache */
  async getDiscontinuedModelsByBrand(brandId: number) {
    const key = cacheKey({ ns: 'brand:discontinuedModels', v: 1, brandId });
    const ttlMs = 10 * 60 * 1000;
    return withCache(key, async () => {
      return repo.discontinuedModelsByBrand(brandId);
    }, ttlMs);
  }

  /** Batch by IDs (stable key = sorted uniq ids) */
  async findByIds(ids: number[]) {
    const uniq = Array.from(new Set((ids || []).filter((x) => typeof x === 'number'))).sort((a, b) => a - b);
    if (uniq.length === 0) return [];

    const key = cacheKey({ ns: 'brands:byIds', v: 1, ids: uniq });
    const ttlMs = 30 * 60 * 1000;

    return withCache(key, async () => {
      return repo.findByIds(uniq);
    }, ttlMs);
  }

}
