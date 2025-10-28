export type DistrictsSort =
  | 'id_asc'
  | 'latest'
  | 'name_asc'
  | 'name_desc'
  | 'popular_rank';

export interface DistrictsListQuery {
  q?: string;          // search: districtName LIKE %q%
  page?: number;
  limit?: number;
  sortBy?: DistrictsSort;
  stateId?: number;
  popularAny?: boolean;        // true => isPopularCity IN (1,2,3,4)
  popularRank?: 1 | 2 | 3 | 4; // exact rank
}
