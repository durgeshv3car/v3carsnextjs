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

export class ContentRepo {
  /** Today (per contentType): most recent row up to DB NOW() */
  async getToday(contentType: number) {
    const rows = await prisma.$queryRaw<ContentRow[]>(Prisma.sql`
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND publishDateandTime <= NOW()
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
      ORDER BY publishDateandTime DESC, id DESC
      LIMIT 1
    `);
    return rows[0] ?? null;
  }

  /** Latest (date desc); optionally exclude a specific id */
  async listLatest(contentType: number, limit = 9, excludeId?: number) {
    if (typeof excludeId === 'number') {
      return prisma.$queryRaw<ContentRow[]>(Prisma.sql`
        SELECT id, title, pageUrl, publishDateandTime, shortDescription,
               thumbnailAltText, thumbnailUrl, authorId
        FROM tblcontents
        WHERE contentType = ${contentType}
          AND publishDateandTime <= NOW()
          AND contentPublishType IN (1,2)
          AND contentPublishStatus = 2
          AND id <> ${excludeId}
        ORDER BY publishDateandTime DESC, id DESC
        LIMIT ${limit}
      `);
    }
    return prisma.$queryRaw<ContentRow[]>(Prisma.sql`
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND publishDateandTime <= NOW()
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
      ORDER BY publishDateandTime DESC, id DESC
      LIMIT ${limit}
    `);
  }

  /** Trending (no NOW() in your PHP): last_15days_view desc */
  async listTrending(contentType: number, limit = 9) {
    return prisma.tblcontents.findMany({
      where: {
        contentType,
        contentPublishType: { in: [1, 2] as number[] },
        contentPublishStatus: 2,
      },
      orderBy: [{ last_15days_view: 'desc' }, { id: 'desc' }],
      take: limit,
      select: {
        id: true, title: true, pageUrl: true, publishDateandTime: true,
        shortDescription: true, thumbnailAltText: true, thumbnailUrl: true, authorId: true,
      },
    });
  }

  /** Top (no NOW() in your PHP): last_30days_view desc */
  async listTop(contentType: number, limit = 9) {
    return prisma.tblcontents.findMany({
      where: {
        contentType,
        contentPublishType: { in: [1, 2] as number[] },
        contentPublishStatus: 2,
      },
      orderBy: [{ last_30days_view: 'desc' }, { id: 'desc' }],
      take: limit,
      select: {
        id: true, title: true, pageUrl: true, publishDateandTime: true,
        shortDescription: true, thumbnailAltText: true, thumbnailUrl: true, authorId: true,
      },
    });
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
