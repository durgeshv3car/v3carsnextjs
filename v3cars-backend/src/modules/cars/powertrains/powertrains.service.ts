import { PowertrainsRepo } from './powertrains.repo.js';

const repo = new PowertrainsRepo();

export class PowertrainsService {
  findByIds(ids: number[]) {
    return repo.findByIds(ids);
  }
  findIdsByFilters(opts: { fuelType?: string; transmissionType?: string; modelId?: number }) {
    return repo.findIdsByFilters(opts);
  }

  /** ✅ NEW: expose specs aggregation for models */
  getSpecsByModelIds(modelIds: number[]) {
    return repo.getSpecsByModelIds(modelIds);
  }
}
