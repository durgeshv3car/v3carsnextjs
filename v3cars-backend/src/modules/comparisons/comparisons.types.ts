// Same card shape as news/reviews/content
export type ComparisonsCard = {
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: string; // ISO
  shortDescription: string | null;
  thumbnail: { url: string | null; alt: string | null };
  author: { id: number; name: string; slug: string | null } | null;
  commentsCount: number;
};

export interface ComparisonsListQuery {
  limit?: number; // default 9
}

export interface LatestComparisonsQuery extends ComparisonsListQuery {
  // comparison listing me alag "today" card usually nahi hota; default: include
  excludeToday?: boolean; // default false in service
}
