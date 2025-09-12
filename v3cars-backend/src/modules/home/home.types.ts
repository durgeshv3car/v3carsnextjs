import type { Pagination } from '../cars/cars.types.js';

export interface UpcomingQuery extends Pagination {}

export interface QuickLookQuery extends Pagination {
  type: 'popular' | 'latest';
}

export interface BodyTypeQuery extends Pagination {
  bodyTypeId: number;
  isUpcoming?: boolean;
  sortBy?: 'popular' | 'latest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}

export interface PriceQuery extends Pagination {
  bucket: 'UNDER_5L' | 'BETWEEN_5_10L' | 'BETWEEN_10_20L' | 'BETWEEN_20_40L' | 'ABOVE_40L';
  isUpcoming?: boolean;
  sortBy?: 'popular' | 'latest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}

/** News widget */
export interface HomeLatestNewsQuery {
  limit?: number;
  excludeToday?: boolean; // default true in service
}

/** ✅ Reviews widget */
export interface HomeLatestReviewsQuery {
  limit?: number;
  excludeToday?: boolean; // default false in service
}
