export type CountriesSort = 'name_asc' | 'latest' | 'id_asc' | 'id_desc';

export interface CountriesListQuery {
  q?: string;          // search in countryName / countryCode
  isActive?: boolean;  // 1/0 -> true/false
  page?: number;       // default 1
  limit?: number;      // default 50 (cap 100)
  sortBy?: CountriesSort; // default 'name_asc'
}
