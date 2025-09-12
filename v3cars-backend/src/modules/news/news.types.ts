export type NewsCard = {
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

export interface NewsListQuery {
  limit?: number; // default 9
}

export interface LatestNewsQuery extends NewsListQuery {
  excludeToday?: boolean; // default true
}
