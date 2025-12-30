export type ContentCard = {
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: string; // ISO
  shortDescription: string | null;
  thumbnail: { url: string | null; alt: string | null };
  author: { id: number; name: string; slug: string | null } | null;
  commentsCount: number;
};

export interface ContentListQuery {
  limit?: number;        // default 9
}
export interface ContentLatestQuery extends ContentListQuery {
  excludeToday?: boolean; // default true
}
