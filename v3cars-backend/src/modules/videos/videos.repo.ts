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

function buildModelTaggingSql(modelIds?: number[]) {
  if (!modelIds || modelIds.length === 0) return Prisma.empty;
  const pattern = `(^|,)(${modelIds.join('|')})(,|$)`;
  return Prisma.sql` AND REPLACE(modelTagging, ' ', '') REGEXP ${pattern} `;
}

export class VideosRepo {

  /** Today (per videoType): most recent up to DB NOW() — optional EV scope */
  async getToday(videoType: number, modelIds?: number[]) {
    const rows = await prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${buildModelTaggingSql(modelIds)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  /** Latest list (scoped to videoType) — optional excludeId + EV scope */
  async listLatest(videoType: number, limit = 9, excludeId?: number, modelIds?: number[]) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${excludeId ? Prisma.sql` AND videoId <> ${excludeId} ` : Prisma.empty}
        ${buildModelTaggingSql(modelIds)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Global latest (no videoType) — optional EV scope */
  async listLatestGlobal(limit = 9, modelIds?: number[]) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${buildModelTaggingSql(modelIds)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Trending (per type): last_15days_view DESC — optional EV scope */
  async listTrending(videoType: number, limit = 9, modelIds?: number[]) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        ${buildModelTaggingSql(modelIds)}
      ORDER BY last_15days_view DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Top (per type): last_30days_view DESC — optional EV scope */
  async listTop(videoType: number, limit = 9, modelIds?: number[]) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        ${buildModelTaggingSql(modelIds)}
      ORDER BY last_30days_view DESC, videoId DESC
      LIMIT ${limit}
    `);
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
