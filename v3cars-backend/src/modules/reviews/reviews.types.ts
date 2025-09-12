// Same shape as news cards
export type ReviewsCard = {
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: string; // ISO
  shortDescription: string | null;
  thumbnail: {
    url: string | null; // absolute if MEDIA_BASE_URL set
    alt: string | null;
  };
  author: {
    id: number;
    name: string;
    slug: string | null;
  } | null;
  commentsCount: number;
};

export interface ReviewsListQuery {
  limit?: number; // default 9
}

export interface LatestReviewsQuery extends ReviewsListQuery {
  excludeToday?: boolean; // default false here (reviews list usually shows all)
}
