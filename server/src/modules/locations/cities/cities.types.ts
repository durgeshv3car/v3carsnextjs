// ✅ Local, no dependency on cars module
export interface Pagination {
  page?: number;     // 1-based
  limit?: number;    // page size
}

export type SortBy = 'id_asc' | 'latest' | 'name_asc' | 'name_desc' | 'popular';

export interface SortInput {
  sortBy?: SortBy;
}

export type MajorFuel = 'petrol' | 'diesel' | 'cng';

export interface CitiesListQuery extends Pagination, SortInput {
  q?: string;
  status?: number;
  stateId?: number;
  countryId?: number;
  isPopular?: boolean;
  isTop?: boolean;
  majorFuel?: MajorFuel;
}
