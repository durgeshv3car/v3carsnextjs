export type FuelTypeNum = 1 | 2 | 3; // 1=Petrol, 2=Diesel, 3=CNG

export interface FuelLatestQuery {
  fuelType: FuelTypeNum;
  stateId?: number;      // either stateId or districtId
  districtId?: number;   // precedence to districtId if both present
}

export interface FuelHistoryQuery {
  fuelType: FuelTypeNum;
  stateId?: number;
  districtId?: number;
  days?: number;         // default 10, max 90
}

export type FuelStatesSort = 'name_asc' | 'price_desc' | 'price_asc';

export interface FuelStatesListQuery {
  fuelType: FuelTypeNum;
  q?: string;            // state name filter
  page?: number;         // default 1
  limit?: number;        // default 50 (cap 100)
  sortBy?: FuelStatesSort;
}

export type FuelCitiesSort = 'name_asc' | 'price_desc' | 'price_asc';

export interface FuelCitiesListQuery {
  fuelType: FuelTypeNum;
  stateId: number;       // required
  q?: string;            // city name filter
  page?: number;         // default 1
  limit?: number;        // default 50
  sortBy?: FuelCitiesSort;
  /** NEW: filter popular cities only (tblcities.isPopularCity = 1) */
  popular?: 0 | 1;
}
