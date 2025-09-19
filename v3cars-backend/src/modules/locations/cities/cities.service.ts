import type { CitiesListQuery } from './cities.types.js';
import { CitiesRepo } from './cities.repo.js';

const repo = new CitiesRepo();

export class CitiesService {
  list(q: CitiesListQuery) { return repo.list(q); }
  getById(id: number) { return repo.getById(id); }
}
