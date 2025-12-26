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
  metaDescription?: string | null;
};

export class VideosRepo {
  // ------------------------
  // GLOBAL / TYPE-SCOPED (unchanged from your working version)
  // ------------------------
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

  async listLatest(videoType: number, limit = 9, excludeId?: number) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${excludeId ? Prisma.sql` AND videoId <> ${excludeId} ` : Prisma.empty}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listTrending(videoType: number, limit = 9) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
      ORDER BY last_15days_view DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listTop(videoType: number, limit = 9) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
      ORDER BY last_30days_view DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listLatestGlobal(limit = 9) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, metaDescription, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listPopularGlobal(limit = 9) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT
        videoId, video_title, metaDescription, pageUrl, video_thumbnail,
        videoYId, authorId, dateTimePublishing,
        CAST(uniqueView AS UNSIGNED) AS NumView
      FROM tblwebvideos
      WHERE status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
      ORDER BY NumView DESC, dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async findAuthorsByIds(ids: number[]) {
    if (!ids?.length) return [];
    return prisma.tblauthor.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, url_slug: true },
    });
  }

  // ------------------------
  // ✅ MODEL-SCOPED (LEFT JOIN tbltagging EXACTLY LIKE LEGACY)
  // ------------------------
  async getTodayByModel(videoType: number, modelId: number) {
    const rows = await prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT a.videoId, a.video_title, a.pageUrl, a.video_thumbnail, a.videoYId, a.authorId, a.dateTimePublishing
      FROM tblwebvideos a
      LEFT JOIN tbltagging b ON a.videoId = b.contentId
      WHERE a.status = 1
        AND a.publishStatus = 2
        AND a.dateTimePublishing <= NOW()
        AND b.mbId = ${modelId}
        AND b.type = 1
        AND b.tagContentType = 1
        AND a.videoType = ${videoType}
      ORDER BY a.dateTimePublishing DESC, a.videoId DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  async listLatestByModel(videoType: number, modelId: number, limit = 15) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT a.videoId, a.video_title, a.pageUrl, a.video_thumbnail, a.videoYId, a.authorId, a.dateTimePublishing
      FROM tblwebvideos a
      LEFT JOIN tbltagging b ON a.videoId = b.contentId
      WHERE a.status = 1
        AND a.dateTimePublishing <= NOW()
        AND b.mbId = ${modelId}
        AND b.type = 1
        AND b.tagContentType = 1
        AND a.videoType = ${videoType}
      ORDER BY a.dateTimePublishing DESC, a.videoId DESC
      LIMIT ${limit}
    `);
  }

  async listTrendingByModel(videoType: number, modelId: number, limit = 15) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT a.videoId, a.video_title, a.pageUrl, a.video_thumbnail, a.videoYId, a.authorId, a.dateTimePublishing
      FROM tblwebvideos a
      LEFT JOIN tbltagging b ON a.videoId = b.contentId
      WHERE a.status = 1
        AND b.mbId = ${modelId}
        AND b.type = 1
        AND b.tagContentType = 1
        AND a.videoType = ${videoType}
      ORDER BY a.last_15days_view DESC, a.videoId DESC
      LIMIT ${limit}
    `);
  }

  async listTopByModel(videoType: number, modelId: number, limit = 15) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT a.videoId, a.video_title, a.pageUrl, a.video_thumbnail, a.videoYId, a.authorId, a.dateTimePublishing
      FROM tblwebvideos a
      LEFT JOIN tbltagging b ON a.videoId = b.contentId
      WHERE a.status = 1
        AND b.mbId = ${modelId}
        AND b.type = 1
        AND b.tagContentType = 1
        AND a.videoType = ${videoType}
      ORDER BY a.last_30days_view DESC, a.videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Popular across ALL video types for a model (no videoType filter) */
  async listPopularByModel(modelId: number, limit = 15) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT
        a.videoId, a.video_title, a.metaDescription, a.pageUrl, a.video_thumbnail,
        a.videoYId, a.authorId, a.dateTimePublishing,
        CAST(a.uniqueView AS UNSIGNED) AS NumView
      FROM tblwebvideos a
      LEFT JOIN tbltagging b ON a.videoId = b.contentId
      WHERE a.status = 1
        AND a.publishStatus = 2
        AND a.dateTimePublishing <= NOW()
        AND b.mbId = ${modelId}
        AND b.type = 1
        AND b.tagContentType = 1
      ORDER BY NumView DESC, a.dateTimePublishing DESC, a.videoId DESC
      LIMIT ${limit}
    `);
  }

  
}
