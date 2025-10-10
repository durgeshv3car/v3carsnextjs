// src/modules/cars/models/models.types.ts
import type { CommonFilters, Pagination, SortInput } from '../cars.types.js';

export interface ModelsListQuery extends CommonFilters, Pagination, SortInput {
  brandId?: number;          // optional constrain within a brand
  /** 🆕 service-level filters via powertrains */
  fuelType?: string;         // e.g., 'Electric'
  transmissionType?: string; // optional (future use)

  // note: other spec-like keys (cylinders, mileage, seating, engineDisplacement, minPrice, maxPrice)
  // are inherited from CommonFilters
}
