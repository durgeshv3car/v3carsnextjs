import type { CommonFilters, Pagination, SortInput } from '../cars.types.js';

export interface ModelsListQuery extends CommonFilters, Pagination, SortInput {
  brandId?: number; // optional constrain within a brand
}
