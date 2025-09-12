// Reusable types for all car modules

export type PriceBucketKey =
  | 'UNDER_5L'
  | 'BETWEEN_5_10L'
  | 'BETWEEN_10_20L'
  | 'BETWEEN_20_40L'
  | 'ABOVE_40L';

export interface Pagination {
  page: number;
  limit: number;
}

export interface SortInput {
  // generic key for simple sorts; module can map this to its fields
  sortBy?: 'launch_asc' | 'latest' | 'popular' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}

export interface BaseListResponse<T> {
  success: boolean;
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface CommonFilters {
  q?: string;                  // free text search
  isUpcoming?: boolean;        // upcoming flag
  bodyTypeId?: number;         // numeric body type id (preferred, fast)
  bodyTypeName?: string;       // optional (if you later want string -> id mapping)
  priceBucket?: PriceBucketKey; // price range bucket
}


