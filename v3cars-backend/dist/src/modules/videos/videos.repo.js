import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';
/** (unchanged) EV scope helper */
function buildEVScope(modelIds, fuelType) {
    const clauses = [];
    if (modelIds && modelIds.length > 0) {
        const pattern = `(^|,)(${modelIds.join('|')})(,|$)`;
        clauses.push(Prisma.sql `REPLACE(modelTagging, ' ', '') REGEXP ${pattern}`);
    }
    if (fuelType && fuelType.trim()) {
        clauses.push(Prisma.sql `
      (
        LOWER(CONCAT(' ', REPLACE(REPLACE(video_title, '-', ' '), '.', ' '), ' '))
          REGEXP '(^|[^a-z])ev([^a-z]|$)'
        OR LOWER(CONCAT(' ', video_title, ' ')) LIKE '% electric %'
      )
    `);
    }
    if (!clauses.length)
        return Prisma.empty;
    let combined = clauses[0];
    for (let i = 1; i < clauses.length; i++) {
        combined = Prisma.sql `${combined} OR ${clauses[i]}`;
    }
    return Prisma.sql ` AND ( ${combined} ) `;
}
/** 🆕 author filter helper */
function byAuthor(authorId) {
    return typeof authorId === 'number' && Number.isFinite(authorId)
        ? Prisma.sql ` AND authorId = ${authorId} `
        : Prisma.empty;
}
export class VideosRepo {
    async getToday(videoType, modelIds, fuelType, authorId) {
        const rows = await prisma.$queryRaw(Prisma.sql `
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
    async listLatest(videoType, limit = 9, excludeId, modelIds, fuelType, authorId) {
        return prisma.$queryRaw(Prisma.sql `
      SELECT videoId, video_title, pageUrl, video_thumbnail, videoYId, authorId, dateTimePublishing
      FROM tblwebvideos
      WHERE videoType = ${videoType}
        AND status = 1
        AND publishStatus = 2
        AND dateTimePublishing <= NOW()
        ${excludeId ? Prisma.sql ` AND videoId <> ${excludeId} ` : Prisma.empty}
        ${byAuthor(authorId)}                 -- 🆕
        ${buildEVScope(modelIds, fuelType)}
      ORDER BY dateTimePublishing DESC, videoId DESC
      LIMIT ${limit}
    `);
    }
    async listLatestGlobal(limit = 9, modelIds, fuelType, authorId) {
        return prisma.$queryRaw(Prisma.sql `
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
    async listTrending(videoType, limit = 9, modelIds, fuelType, authorId) {
        return prisma.$queryRaw(Prisma.sql `
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
    async listTop(videoType, limit = 9, modelIds, fuelType, authorId) {
        return prisma.$queryRaw(Prisma.sql `
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
    async listPopularGlobal(limit = 9, modelIds, fuelType, authorId) {
        return prisma.$queryRaw(Prisma.sql `
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
    async findAuthorsByIds(ids) {
        if (!ids.length)
            return [];
        return prisma.tblauthor.findMany({
            where: { id: { in: ids } },
            select: { id: true, name: true, url_slug: true },
        });
    }
}
