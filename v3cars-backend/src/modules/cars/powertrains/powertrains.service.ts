import { PowertrainsRepo } from './powertrains.repo.js';

const repo = new PowertrainsRepo();

export class PowertrainsService {
  findByIds(ids: number[]) {
    return repo.findByIds(ids);
  }
  findIdsByFilters(opts: { fuelType?: string; transmissionType?: string; modelId?: number }) {
    return repo.findIdsByFilters(opts);
  }

  /** 🆕 Distinct modelIds for a given fuelType (e.g., 'Electric') */
  findModelIdsByFuel(opts: { fuelType: string }) {
    return repo.findModelIdsByFuel(opts);
  }

  /** Specs aggregation for models */
  getSpecsByModelIds(modelIds: number[]) {
    return repo.getSpecsByModelIds(modelIds);
  }
}
