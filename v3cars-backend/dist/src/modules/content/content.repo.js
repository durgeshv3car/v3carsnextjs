import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';
/** modelTagging -> comma-separated IDs; match as full tokens */
function modelTaggingExpr(modelIds) {
    if (!modelIds || modelIds.length === 0)
        return null;
    const pattern = `(^|,)(${modelIds.join('|')})(,|$)`;
    return Prisma.sql `REPLACE(modelTagging, ' ', '') REGEXP ${pattern}`;
}
/** PHP-style EV keyword fallback on title */
function evTitleExpr(fuelType) {
    if (!fuelType)
        return null;
    if (fuelType.trim().toLowerCase() !== 'electric')
        return null;
    return Prisma.sql `(LOWER(title) LIKE CONCAT('%',' ev ','%') OR LOWER(title) LIKE CONCAT('%',' electric ','%'))`;
}
/** Combine modelTagging OR EV-title conditions into a single AND (...) clause */
function buildEvScope(modelIds, fuelType) {
    const conds = [];
    const a = modelTaggingExpr(modelIds);
    const b = evTitleExpr(fuelType);
    if (a)
        conds.push(a);
    if (b)
        conds.push(b);
    if (!conds.length)
        return Prisma.empty;
    // 🔧 IMPORTANT: use string separator for Prisma.join to avoid TS error
    return Prisma.sql ` AND ( ${Prisma.join(conds, ' OR ')} ) `;
}
export class ContentRepo {
    async getToday(contentType, modelIds, fuelType) {
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND publishDateandTime <= NOW()
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${buildEvScope(modelIds, fuelType)}
      ORDER BY publishDateandTime DESC, id DESC
      LIMIT 1
    `);
        return rows[0] ?? null;
    }
    async listLatest(contentType, limit = 9, excludeId, modelIds, fuelType) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND publishDateandTime <= NOW()
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${excludeId ? Prisma.sql ` AND id <> ${excludeId} ` : Prisma.empty}
        ${buildEvScope(modelIds, fuelType)}
      ORDER BY publishDateandTime DESC, id DESC
      LIMIT ${limit}
    `);
    }
    async listTrending(contentType, limit = 9, modelIds, fuelType) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${buildEvScope(modelIds, fuelType)}
      ORDER BY last_15days_view DESC, id DESC
      LIMIT ${limit}
    `);
    }
    async listTop(contentType, limit = 9, modelIds, fuelType) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT id, title, pageUrl, publishDateandTime, shortDescription,
             thumbnailAltText, thumbnailUrl, authorId
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${buildEvScope(modelIds, fuelType)}
      ORDER BY last_30days_view DESC, id DESC
      LIMIT ${limit}
    `);
    }
    async listPopular(contentType, limit = 9, modelIds, fuelType) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT
        id,
        title,
        pageUrl,
        shortDescription,
        thumbnailAltText,
        thumbnailUrl,
        authorId,
        publishDateandTime,
        CAST(uniqueUsers AS UNSIGNED) AS NumView
      FROM tblcontents
      WHERE contentType = ${contentType}
        AND publishDateandTime <= NOW()
        AND contentPublishType IN (1,2)
        AND contentPublishStatus = 2
        ${buildEvScope(modelIds, fuelType)}
      ORDER BY NumView DESC, publishDateandTime DESC, id DESC
      LIMIT ${limit}
    `);
    }
    async findAuthorsByIds(ids) {
        if (!ids.length)
            return [];
        return prisma.tblauthor.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true, url_slug: true },
        });
    }
    async countCommentsByContentIds(ids) {
        if (!ids.length)
            return new Map();
        const grouped = await prisma.tblcomments.groupBy({
            by: ['contentId'],
            where: { contentId: { in: ids } },
            _count: { contentId: true },
        });
        const map = new Map();
        grouped.forEach(g => map.set(g.contentId, g._count.contentId));
        return map;
    }
}
