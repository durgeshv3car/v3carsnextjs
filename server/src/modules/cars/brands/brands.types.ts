import type { Pagination, SortInput } from '../cars.types.js';

export interface BrandsListQuery extends Pagination, SortInput {
  q?: string;                 // search by name/slug
  status?: number;            // brandStatus (0/1 or other codes)
  hasServiceNetwork?: boolean;
  brandType?: number;         // tinyint flags if you use them
}
