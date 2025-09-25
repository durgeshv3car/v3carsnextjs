export type FaqSort =
  | 'sequence_asc'
  | 'latest'
  | 'id_asc'
  | 'id_desc';

export interface FaqsListQuery {
  moduleId: number;       // required: which module's FAQs
  q?: string;             // search in question/answer
  page?: number;          // default 1
  limit?: number;         // default 50 (cap 100)
  sortBy?: FaqSort;       // default 'sequence_asc'
}
