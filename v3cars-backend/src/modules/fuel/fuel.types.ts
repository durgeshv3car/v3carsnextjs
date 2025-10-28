export type FuelTypeNum = 1 | 2 | 3; // 1=Petrol, 2=Diesel, 3=CNG

export interface FuelLatestQuery {
  fuelType: 1|2|3;
  stateId?: number;
  districtId?: number;  // tbldistricts.id
  cityId?: number;      // tblcities.cityId  ✅
}

export interface FuelHistoryQuery {
  fuelType: 1|2|3;
  stateId?: number;
  districtId?: number;
  cityId?: number;      // ✅
  days?: number;
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
  /** filter popular cities only (tblcities.isPopularCity = 1) */
  popular?: 0 | 1;
}

export interface FuelMetrosQuery {
  /** optional, if missing we return all (1,2,3) */
  fuelType?: FuelTypeNum;
}

export interface FuelMonthlyTrendsQuery {
  fuelType: FuelTypeNum;
  districtId?: number;  // either districtId or cityId
  cityId?: number;
  months?: number;      // default 6
}