export interface WebStoriesListQuery {
  page?: number;
  limit?: number;
}

export interface WebStoryItem {
  id: number | string | null;
  subStoryId: number | null;
  title: string | null;
  mediaUrl: string | null;
  contentUrl: string | null;
  authorId: string | null;
  addedBy: string | null;
  status: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface WebStoryGroup {
  storyId: string;
  title: string | null;
  mediaUrl: string | null;
  contentUrl: string | null;
  authorId: string | null;
  status: boolean | null;
  createdAt: Date | null;
  items: WebStoryItem[];
}

export interface WebStoriesListResult {
  rows: WebStoryGroup[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
