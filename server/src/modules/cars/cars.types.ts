
// src/modules/cars/cars.types.ts
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

/** NEW: enums / keys for spec-like filters */
export type MileageRangeKey = 'UNDER_10' | 'BETWEEN_10_15' | 'ABOVE_15';
export type CylindersKey = '2' | '3' | '4' | '5' | '6' | '7' | '8_PLUS';
export type SeatingKey = '2' | '4' | '5' | '6' | '7' | '8' | '9';
export type EngineDispKey =
  | '800'
  | '1000'
  | '800_1000'
  | '1000_1500'
  | '1500_2000'
  | '2000_3000'
  | '3000_4000'
  | 'ABOVE_4000';


export interface BaseListResponse<T> {
  success: boolean;
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/** Common filters used across models/variants listing */
export interface CommonFilters {
  q?: string;                  // free text search
  isUpcoming?: boolean;        // upcoming flag
  bodyTypeId?: number;         // numeric body type id (preferred, fast)
  bodyTypeName?: string;       // optional (if you later want string -> id mapping)
  priceBucket?: PriceBucketKey; // price range bucket

  // NEW cross-cutting filters
  brandId?: number;               // numeric brand id
  fuelType?: string;              // e.g., 'Electric', 'Petrol'
  transmissionType?: string;      // 'Automatic', 'Manual', etc.
  cylinders?: CylindersKey;       // '4', '6', '8_PLUS', etc.
  mileage?: MileageRangeKey;      // UNDER_10 / BETWEEN_10_15 / ABOVE_15
  seating?: SeatingKey;           // '5', '7', etc.
  engineDisplacement?: EngineDispKey;

  // numeric min/max price also supported
  minPrice?: number;
  maxPrice?: number;
  fuelPriceType?: 'city' | 'highway' | 'combined';
}
