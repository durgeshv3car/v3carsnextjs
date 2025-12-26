export type VideoCard = {
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: string;
  thumbnail: { url: string | null; alt: string | null };
  videoYId: string;
  author: { id: number; name: string; slug: string | null } | null;
};

export interface VideosListQuery {
  limit?: number;
  /** 🆕 filter by author */
  authorId?: number;
}


export interface LatestVideosQuery extends VideosListQuery {
  excludeToday?: boolean;
}












