import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';

type ContentRow = {
  id: number;
  title: string;
  pageUrl: string;
  publishDateandTime: Date;
  shortDescription: string | null;
  thumbnailAltText: string | null;
  thumbnailUrl: string | null;
  authorId: number;
};

function buildModelTaggingSql(modelIds?: number[]) {
  if (!modelIds || modelIds.length === 0) return Prisma.empty;
  const pattern = `(^|,)(${modelIds.join('|')})(,|$)`;
  // normalize spaces in modelTagging
  return Prisma.sql` AND REPLACE(modelTagging, ' ', '') REGEXP ${pattern} `;
}

export class ContentRepo {
  /** Today (per contentType) — optional EV scope by modelIds */
  async getToday(contentType: number, modelIds?: number[]) {
    const rows = await prisma.$queryRaw<ContentRow[]>(Prisma.sql`
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND publishDateandTime <= NOW()
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${buildModelTaggingSql(modelIds)}
      ORDER BY publishDateandTime DESC, id DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  /** Latest (date desc) — optional excludeId + EV scope */
  async listLatest(contentType: number, limit = 9, excludeId?: number, modelIds?: number[]) {
    return prisma.$queryRaw<ContentRow[]>(Prisma.sql`
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND publishDateandTime <= NOW()
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${excludeId ? Prisma.sql` AND id <> ${excludeId} ` : Prisma.empty}
        ${buildModelTaggingSql(modelIds)}
      ORDER BY publishDateandTime DESC, id DESC
      LIMIT ${limit}
    `);
  }

  /** Trending: last_15days_view desc — optional EV scope */
  async listTrending(contentType: number, limit = 9, modelIds?: number[]) {
    return prisma.$queryRaw<ContentRow[]>(Prisma.sql`
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${buildModelTaggingSql(modelIds)}
      ORDER BY last_15days_view DESC, id DESC
      LIMIT ${limit}
    `);
  }

  /** Top: last_30days_view desc — optional EV scope */
  async listTop(contentType: number, limit = 9, modelIds?: number[]) {
    return prisma.$queryRaw<ContentRow[]>(Prisma.sql`
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${buildModelTaggingSql(modelIds)}
      ORDER BY last_30days_view DESC, id DESC
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

  async countCommentsByContentIds(ids: number[]) {
    if (!ids.length) return new Map<number, number>();
    const grouped = await prisma.tblcomments.groupBy({
      by: ['contentId'],
      where: { contentId: { in: ids } },
      _count: { contentId: true },
    });
    const map = new Map<number, number>();
    grouped.forEach(g => map.set(g.contentId, g._count.contentId));
    return map;
  }
}
