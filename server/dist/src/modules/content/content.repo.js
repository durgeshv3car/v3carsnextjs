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
    return Prisma.sql ` AND ( ${Prisma.join(conds, ' OR ')} ) `;
}
export class ContentRepo {
    // -------- Site-wide (unchanged) --------
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
    // -------- By-model (FIXED ALIASES) --------
    /** latest single strictly tagged to model via tbltagging */
    async getTodayByModel(contentType, modelId) {
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT a.id, a.title, a.pageUrl, a.publishDateandTime, a.shortDescription,
             a.thumbnailAltText, a.thumbnailUrl, a.authorId
      FROM tblcontents AS a
      LEFT JOIN tbltagging AS t ON t.contentId = a.id
      WHERE a.contentType = ${contentType}
        AND a.publishDateandTime <= NOW()
        AND a.contentPublishType IN (1,2)
        AND a.contentPublishStatus = 2
        AND t.mbId = ${modelId}
        AND t.type = 1
        AND t.tagContentType = 0
      ORDER BY a.publishDateandTime DESC, a.id DESC
      LIMIT 1
    `);
        return rows[0] ?? null;
    }
    async listLatestByModel(contentType, modelId, limit = 9, excludeId) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT a.id, a.title, a.pageUrl, a.publishDateandTime, a.shortDescription,
             a.thumbnailAltText, a.thumbnailUrl, a.authorId
      FROM tblcontents AS a
      LEFT JOIN tbltagging AS t ON t.contentId = a.id
      WHERE a.contentType = ${contentType}
        AND a.publishDateandTime <= NOW()
        AND a.contentPublishType IN (1,2)
        AND a.contentPublishStatus = 2
        ${excludeId ? Prisma.sql ` AND a.id <> ${excludeId} ` : Prisma.empty}
        AND t.mbId = ${modelId}
        AND t.type = 1
        AND t.tagContentType = 0
      ORDER BY a.publishDateandTime DESC, a.id DESC
      LIMIT ${limit}
    `);
    }
    async listTrendingByModel(contentType, modelId, limit = 9) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT a.id, a.title, a.pageUrl, a.publishDateandTime, a.shortDescription,
             a.thumbnailAltText, a.thumbnailUrl, a.authorId
      FROM tblcontents AS a
      LEFT JOIN tbltagging AS t ON t.contentId = a.id
      WHERE a.contentType = ${contentType}
        AND a.contentPublishType IN (1,2)
        AND a.contentPublishStatus = 2
        AND t.mbId = ${modelId}
        AND t.type = 1
        AND t.tagContentType = 0
      ORDER BY a.last_15days_view DESC, a.id DESC
      LIMIT ${limit}
    `);
    }
    async listTopByModel(contentType, modelId, limit = 9) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT a.id, a.title, a.pageUrl, a.publishDateandTime, a.shortDescription,
             a.thumbnailAltText, a.thumbnailUrl, a.authorId
      FROM tblcontents AS a
      LEFT JOIN tbltagging AS t ON t.contentId = a.id
      WHERE a.contentType = ${contentType}
        AND a.contentPublishType IN (1,2)
        AND a.contentPublishStatus = 2
        AND t.mbId = ${modelId}
        AND t.type = 1
        AND t.tagContentType = 0
      ORDER BY a.last_30days_view DESC, a.id DESC
      LIMIT ${limit}
    `);
    }
    async listPopularByModel(contentType, modelId, limit = 9) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT
        a.id,
        a.title,
        a.pageUrl,
        a.shortDescription,
        a.thumbnailAltText,
        a.thumbnailUrl,
        a.authorId,
        a.publishDateandTime,
        CAST(a.uniqueUsers AS UNSIGNED) AS NumView
      FROM tblcontents AS a
      LEFT JOIN tbltagging AS t ON t.contentId = a.id
      WHERE a.contentType = ${contentType}
        AND a.publishDateandTime <= NOW()
        AND a.contentPublishType IN (1,2)
        AND a.contentPublishStatus = 2
        AND t.mbId = ${modelId}
        AND t.type = 1
        AND t.tagContentType = 0
      ORDER BY NumView DESC, a.publishDateandTime DESC, a.id DESC
      LIMIT ${limit}
    `);
    }
    // helpers
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
