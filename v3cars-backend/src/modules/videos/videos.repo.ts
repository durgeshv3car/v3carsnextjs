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

/** (unchanged) EV scope helper */
function buildEVScope(modelIds?: number[], fuelType?: string) {
  const clauses: Prisma.Sql[] = [];
  if (modelIds && modelIds.length > 0) {
    const pattern = `(^|,)(${modelIds.join('|')})(,|$)`;
    clauses.push(Prisma.sql`REPLACE(modelTagging, ' ', '') REGEXP ${pattern}`);
  }
  if (fuelType && fuelType.trim()) {
    clauses.push(Prisma.sql`
      (
        LOWER(CONCAT(' ', REPLACE(REPLACE(video_title, '-', ' '), '.', ' '), ' '))
          REGEXP '(^|[^a-z])ev([^a-z]|$)'
        OR LOWER(CONCAT(' ', video_title, ' ')) LIKE '% electric %'
      )
    `);
  }
  if (!clauses.length) return Prisma.empty;
  let combined = clauses[0]!;
  for (let i = 1; i < clauses.length; i++) {
    combined = Prisma.sql`${combined} OR ${clauses[i]}`;
  }
  return Prisma.sql` AND ( ${combined} ) `;
}

/** 🆕 author filter helper */
function byAuthor(authorId?: number) {
  return typeof authorId === 'number' && Number.isFinite(authorId)
    ? Prisma.sql` AND authorId = ${authorId} `
    : Prisma.empty;
}

export class VideosRepo {
  async getToday(videoType: number, modelIds?: number[], fuelType?: string, authorId?: number) {
    const rows = await prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${byAuthor(authorId)}                 -- 🆕
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  async listLatest(videoType: number, limit = 9, excludeId?: number, modelIds?: number[], fuelType?: string, authorId?: number) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${excludeId ? Prisma.sql` AND videoId <> ${excludeId} ` : Prisma.empty}
        ${byAuthor(authorId)}                 -- 🆕
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listLatestGlobal(limit = 9, modelIds?: number[], fuelType?: string, authorId?: number) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, metaDescription, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${byAuthor(authorId)}                 -- 🆕
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listTrending(videoType: number, limit = 9, modelIds?: number[], fuelType?: string, authorId?: number) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        ${byAuthor(authorId)}                 -- 🆕
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY last_15days_view DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listTop(videoType: number, limit = 9, modelIds?: number[], fuelType?: string, authorId?: number) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        ${byAuthor(authorId)}                 -- 🆕
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY last_30days_view DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async listPopularGlobal(limit = 9, modelIds?: number[], fuelType?: string, authorId?: number) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT
        videoId, video_title, metaDescription, pageUrl, video_thumbnail,
        videoYId, authorId, dateTimePublishing,
        CAST(uniqueView AS UNSIGNED) AS NumView
      FROM tblwebvideos
      WHERE status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${byAuthor(authorId)}                 -- 🆕
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY NumView DESC, dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  async findAuthorsByIds(ids: number[]) {
    if (!ids.length) return [];
    return prisma.tblauthor.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, url_slug: true },
    });
  }
}
