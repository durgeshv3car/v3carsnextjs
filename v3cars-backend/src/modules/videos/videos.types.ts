export type VideoCard = {
  id: number;                       // videoId
  title: string;                    // video_title
  pageUrl: string;
  publishDateandTime: string;       // ISO (dateTimePublishing)
  thumbnail: { url: string | null; alt: string | null };
  videoYId: string;
  author: { id: number; name: string; slug: string | null } | null;
};

export interface VideosListQuery {
  limit?: number; // default 9
}

export interface LatestVideosQuery extends VideosListQuery {
  excludeToday?: boolean; // default true (global/typed latest me flag allow)
}
