import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';

type VideoRow = {
  videoId: number;
  video_title: string;
  pageUrl: string;
  video_thumbnail: string | null;
  videoYId: string;
  authorId: number;
  dateTimePublishing: Date;
  last_15days_view?: number;
  last_30days_view?: number;
};


export class VideosRepo {
  
  /** Today (per videoType): most recent up to DB NOW() */
  async getToday(videoType: number) {
    const rows = await prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  /** Latest list (scoped to videoType); optionally exclude the "today" row */
  async listLatest(videoType: number, limit = 9) {
    
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** ✅ Global latest (no videoType filter) */
  async listLatestGlobal(limit = 9) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Trending (per type): last_15days_view DESC (no NOW() constraint, matches legacy pattern) */
  async listTrending(videoType: number, limit = 9) {
    const rows = await prisma.tblwebvideos.findMany({
      where: { videoType, status: true, publishStatus: 2 },
      orderBy: [{ last_15days_view: 'desc' }, { videoId: 'desc' }],
      take: limit,
      select: {
        videoId: true, video_title: true, pageUrl: true, video_thumbnail: true, videoYId: true,
        authorId: true, dateTimePublishing: true,
      },
    });
    return rows as unknown as VideoRow[];
  }

  /** Top (per type): last_30days_view DESC */
  async listTop(videoType: number, limit = 9) {
    const rows = await prisma.tblwebvideos.findMany({
      where: { videoType, status: true, publishStatus: 2 },
      orderBy: [{ last_30days_view: 'desc' }, { videoId: 'desc' }],
      take: limit,
      select: {
        videoId: true, video_title: true, pageUrl: true, video_thumbnail: true, videoYId: true,
        authorId: true, dateTimePublishing: true,
      },
    });
    return rows as unknown as VideoRow[];
  }

  /** Authors hydrate */
  async findAuthorsByIds(ids: number[]) {
    if (!ids.length) return [];
    return prisma.tblauthor.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, url_slug: true },
    });
  }
}
