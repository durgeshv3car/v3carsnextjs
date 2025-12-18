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

export interface ModelPriceListQuery extends Pagination, SortInput {
  fuelType?: string;
  transmissionType?: string;
  priceType?: 'ex' | 'onroad' | 'csd';
  citySlug?: string; // used for on-road / csd pricing
}

export interface ModelBestVariantQuery {
  powertrainId?: number;
  fuelType?: string;
  transmissionType?: string;
  detailed?: boolean;
}


export interface ModelFuelEfficiencyQuery {
  fuelType?: string;
  transmissionType?: string;
}

export interface ModelCsdVsOnroadQuery {
  cityId: number;
  fuelType?: string;
  transmissionType?: string;
  expandVariantId?: number;
  isLoan?: boolean;
}