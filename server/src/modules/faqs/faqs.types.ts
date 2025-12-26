

export type FaqSort =
  | 'sequence_asc'
  | 'latest'
  | 'id_asc'
  | 'id_desc';



export interface FaqsListQuery {
  moduleId: number;       // required
  q?: string;             // search (only non-fuel modules)
  page?: number;          // default 1
  limit?: number;         // default 50 (cap 100)
  sortBy?: FaqSort;       // default 'sequence_asc'

  /** Fuel module (id=16) specific filters */
  pageType?: number;      // 1 | 2 | 3 | 4
  fuelType?: 1 | 2 | 3;   // 1=Petrol, 2=Diesel, 3=CNG (optional)
}


