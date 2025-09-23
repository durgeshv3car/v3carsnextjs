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

/** Build EV scope:
 *  - modelTagging contains any of the modelIds
 *  - OR title contains " EV " or " Electric " (robust, hyphen-safe)
 */
function buildEVScope(modelIds?: number[], fuelType?: string) {
  const clauses: Prisma.Sql[] = [];

  if (modelIds && modelIds.length > 0) {
    const pattern = `(^|,)(${modelIds.join('|')})(,|$)`;
    clauses.push(Prisma.sql`REPLACE(modelTagging, ' ', '') REGEXP ${pattern}`);
  }

  if (fuelType && fuelType.trim()) {
    // Title keyword fallback (space padded + hyphen/dot stripped → word boundary-ish)
    clauses.push(Prisma.sql`
      (
        LOWER(CONCAT(' ', REPLACE(REPLACE(video_title, '-', ' '), '.', ' '), ' '))
          REGEXP '(^|[^a-z])ev([^a-z]|$)'
        OR LOWER(CONCAT(' ', video_title, ' ')) LIKE '% electric %'
      )
    `);
  }

  if (!clauses.length) return Prisma.empty;

  // 🔧 Manually compose (clause1 OR clause2 OR ...)
  let combined = clauses[0]!;
  for (let i = 1; i < clauses.length; i++) {
    combined = Prisma.sql`${combined} OR ${clauses[i]}`;
  }

  return Prisma.sql` AND ( ${combined} ) `;
}

export class VideosRepo {
  /** Today (per videoType) — optional EV scope */
  async getToday(videoType: number, modelIds?: number[], fuelType?: string) {
    const rows = await prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  /** Latest list (scoped to videoType) — optional excludeId + EV scope */
  async listLatest(videoType: number, limit = 9, excludeId?: number, modelIds?: number[], fuelType?: string) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${excludeId ? Prisma.sql` AND videoId <> ${excludeId} ` : Prisma.empty}
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Global latest (no videoType) — optional EV scope */
  async listLatestGlobal(limit = 9, modelIds?: number[], fuelType?: string) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Trending (per type): last_15days_view DESC — optional EV scope */
  async listTrending(videoType: number, limit = 9, modelIds?: number[], fuelType?: string) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY last_15days_view DESC, videoId DESC
      LIMIT ${limit}
    `);
  }

  /** Top (per type): last_30days_view DESC — optional EV scope */
  async listTop(videoType: number, limit = 9, modelIds?: number[], fuelType?: string) {
    return prisma.$queryRaw<VideoRow[]>(Prisma.sql`
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        ${buildEVScope(modelIds, fuelType)}
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
