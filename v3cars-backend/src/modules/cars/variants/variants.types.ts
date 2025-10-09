import type { Pagination, SortInput } from '../cars.types.js';
import type { PriceBucketKey } from '../cars.types.js';

export interface VariantsListQuery extends Pagination, SortInput {
  q?: string;
  modelId?: number;
  // price filters
  priceBucket?: PriceBucketKey;
  minPrice?: number; // in ₹
  maxPrice?: number; // in ₹
  // powertrain filters (via tblmodelpowertrains)
  fuelType?: string;          // e.g., "Petrol", "Diesel", "CNG", "EV"
  transmissionType?: string;  // e.g., "MT", "AT", "AMT", "DCT", etc.
}

