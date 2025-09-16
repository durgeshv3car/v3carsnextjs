import type { BrandsListQuery } from './brands.types.js';
import { BrandsRepo } from './brands.repo.js';

const repo = new BrandsRepo();

export class BrandsService {
  list(q: BrandsListQuery) { return repo.list(q); }
  getById(id: number) { return repo.getById(id); }

  // ✅ expose for reuse
  findByIds(ids: number[]) { return repo.findByIds(ids); }
}
