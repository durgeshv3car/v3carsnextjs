export type StatesSort = 'name_asc' | 'latest' | 'id_asc' | 'id_desc';

export interface StatesListQuery {
  q?: string;            // search stateName / stateCode / shortCode
  countryId?: number;    // filter by country
  isTodayFuelPrice?: boolean; // 1/0 -> true/false
  page?: number;         // default 1
  limit?: number;        // default 50 (cap 100)
  sortBy?: StatesSort;   // default 'name_asc'
}
