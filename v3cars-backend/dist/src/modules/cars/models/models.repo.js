import { prisma } from '../../../lib/prisma.js';
import { Prisma } from '@prisma/client'; // ⬅️ value import for Prisma.sql
const priceRanges = {
    UNDER_5L: { max: 5_00_000 },
    BETWEEN_5_10L: { min: 5_00_000, max: 10_00_000 },
    BETWEEN_10_20L: { min: 10_00_000, max: 20_00_000 },
    BETWEEN_20_40L: { min: 20_00_000, max: 40_00_000 },
    ABOVE_40L: { min: 40_00_000 },
};
function normalizeAnd(andInput) {
    return Array.isArray(andInput) ? andInput : andInput ? [andInput] : [];
}
/**
 * Build a Prisma where object from ModelsListQuery.
 * Accepts an optional `opts.allowedModelIds` which will restrict modelId IN (...) at DB-level.
 */
function buildWhere(q, opts) {
    const where = {};
    if (q.q) {
        const term = q.q;
        where.OR = [{ modelName: { contains: term } }, { modelSlug: { contains: term } }];
    }
    if (typeof q.isUpcoming === 'boolean')
        where.isUpcoming = q.isUpcoming;
    // brand: single or multi
    const brandIds = q.brandIds;
    if (brandIds && Array.isArray(brandIds) && brandIds.length) {
        where.brandId = { in: brandIds };
    }
    else if (q.brandId) {
        where.brandId = q.brandId;
    }
    // bodyType: single or multi
    const bodyTypeIds = q.bodyTypeIds;
    if (bodyTypeIds && Array.isArray(bodyTypeIds) && bodyTypeIds.length) {
        where.modelBodyTypeId = { in: bodyTypeIds };
    }
    else if (q.bodyTypeId) {
        where.modelBodyTypeId = q.bodyTypeId;
    }
    // seating (seats) filter on tblmodels (DB-level)
    const seatingVal = q.seating;
    const seatingList = q.seatingList;
    if (seatingList && seatingList.length) {
        where.seats = { in: seatingList };
    }
    else if (typeof seatingVal === 'number') {
        where.seats = seatingVal;
    }
    // optional allowedModelIds (pre-filter from powertrains) -> modelId IN (...)
    if (opts?.allowedModelIds && Array.isArray(opts.allowedModelIds) && opts.allowedModelIds.length) {
        // if where.modelId already exists as something else, combine with AND
        if (where.modelId) {
            const existingAND = normalizeAnd(where.AND);
            existingAND.push({ modelId: { in: opts.allowedModelIds } });
            where.AND = existingAND;
            delete where.modelId;
        }
        else {
            where.modelId = { in: opts.allowedModelIds };
        }
    }
    // (legacy expected* price filter; service overrides for variant-based)
    if (q.priceBucket) {
        const { min, max } = priceRanges[q.priceBucket];
        const baseFilter = {};
        const topFilter = {};
        if (typeof min === 'number') {
            baseFilter.gte = min;
            topFilter.gte = min;
        }
        if (typeof max === 'number') {
            baseFilter.lte = max;
            topFilter.lte = max;
        }
        const existingAND = normalizeAnd(where.AND);
        const overlapAND = [];
        if (typeof min === 'number')
            overlapAND.push({ expectedTopPrice: { gte: min } });
        if (typeof max === 'number')
            overlapAND.push({ expectedBasePrice: { lte: max } });
        where.AND = [
            ...existingAND,
            {
                OR: [
                    Object.keys(baseFilter).length ? { expectedBasePrice: baseFilter } : undefined,
                    Object.keys(topFilter).length ? { expectedTopPrice: topFilter } : undefined,
                    overlapAND.length ? { AND: overlapAND } : undefined,
                ].filter(Boolean),
            },
        ];
    }
    const existingAND = normalizeAnd(where.AND);
    const launchMonth = q.launchMonth;
    if (launchMonth) {
        const [yy, mm] = launchMonth.split('-').map(Number);
        if (yy && mm) {
            const from = new Date(yy, mm - 1, 1, 0, 0, 0, 0);
            const to = new Date(yy, mm, 1, 0, 0, 0, 0);
            existingAND.push({ launchDate: { gte: from } });
            existingAND.push({ launchDate: { lt: to } });
        }
    }
    const lf = q.launchFrom;
    const lt = q.launchTo;
    const launchFrom = lf ? new Date(lf) : undefined;
    const launchTo = lt ? new Date(lt) : undefined;
    if (launchFrom)
        existingAND.push({ launchDate: { gte: launchFrom } });
    if (launchTo)
        existingAND.push({ launchDate: { lte: launchTo } });
    if (q.futureOnly) {
        const now = new Date();
        existingAND.push({ launchDate: { not: null } });
        existingAND.push({ launchDate: { gte: now } });
    }
    if (existingAND.length)
        where.AND = existingAND;
    return where;
}
function buildOrderBy(sortBy) {
    switch (sortBy) {
        case 'launch_asc': return [{ launchDate: 'asc' }, { modelId: 'asc' }];
        case 'latest': return [{ launchDate: 'desc' }, { modelId: 'desc' }];
        case 'popular': return [{ totalViews: 'desc' }, { modelId: 'desc' }];
        case 'price_asc': return [{ expectedBasePrice: 'asc' }, { expectedTopPrice: 'asc' }];
        case 'price_desc': return [{ expectedTopPrice: 'desc' }, { expectedBasePrice: 'desc' }];
        case 'name_desc': return [{ modelName: 'desc' }];
        case 'name_asc': return [{ modelName: 'asc' }];
        default: return [{ modelId: 'asc' }];
    }
}
const baseSelect = {
    modelId: true, modelName: true, modelSlug: true,
    brandId: true, modelBodyTypeId: true, isUpcoming: true,
    launchDate: true, totalViews: true,
    expectedBasePrice: true, expectedTopPrice: true,
    seats: true, // include seats so callers can use it without extra query
};
export class ModelsRepo {
    /**
     * list - fetch paginated models.
     * New optional second param `opts.allowedModelIds` restricts results to modelId IN (...)
     */
    async list(q, opts) {
        const take = Math.max(1, Math.min(q.limit || 12, 100));
        const skip = Math.max(0, ((q.page || 1) - 1) * take);
        const where = buildWhere(q, opts);
        const orderBy = buildOrderBy(q.sortBy);
        const [rows, total] = await Promise.all([
            prisma.tblmodels.findMany({ where, orderBy, skip, take, select: baseSelect }),
            prisma.tblmodels.count({ where }),
        ]);
        return {
            rows,
            total,
            page: q.page || 1,
            pageSize: take,
            totalPages: Math.max(1, Math.ceil(total / take)),
        };
    }
    /**
     * listIgnoringPriceBucket - returns all matching models (no pagination)
     * Accepts same opts for allowedModelIds
     */
    async listIgnoringPriceBucket(q, opts) {
        const q2 = { ...q, priceBucket: undefined };
        const where = buildWhere(q2, opts);
        const rows = await prisma.tblmodels.findMany({ where, select: baseSelect });
        return rows;
    }
    /** 🆕 DB aggregation for current month + next N months (N=months), grouped by month */
    async upcomingMonthlyCount(opts) {
        const horizon = Math.max(1, Math.min(opts.months ?? 12, 24)); // next N months
        const buckets = horizon + 1; // include current month
        const brandSql = opts.brandId ? Prisma.sql ` AND brandId = ${opts.brandId} ` : Prisma.sql ``;
        const bodySql = opts.bodyTypeId ? Prisma.sql ` AND modelBodyTypeId = ${opts.bodyTypeId} ` : Prisma.sql ``;
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT DATE_FORMAT(launchDate, '%Y-%m-01') AS bucket, COUNT(*) AS cnt
      FROM tblmodels
      WHERE isUpcoming = 1
        AND launchDate >= DATE_SUB(DATE(NOW()), INTERVAL DAYOFMONTH(NOW())-1 DAY)  -- first day of current month
        AND launchDate <  DATE_ADD(DATE_SUB(DATE(NOW()), INTERVAL DAYOFMONTH(NOW())-1 DAY), INTERVAL ${buckets} MONTH)
        ${brandSql}
        ${bodySql}
      GROUP BY bucket
      ORDER BY bucket ASC
    `);
        return rows; // service will fill missing months with 0
    }
    async getById(id) {
        return prisma.tblmodels.findFirst({ where: { modelId: id } });
    }
    /** 🆕 Top selling by a specific month (ordered by that month’s sales) */
    async topSellingByMonth(opts) {
        const { year, month } = opts;
        const limit = Math.max(1, Math.min(opts.limit ?? 25, 100));
        // compute previous month in JS to keep SQL simple
        const prev = new Date(year, month - 1, 1);
        prev.setMonth(prev.getMonth() - 1);
        const prevYear = prev.getFullYear();
        const prevMonth = prev.getMonth() + 1;
        // One row per model for current month; join previous month for delta
        const rows = await prisma.$queryRaw(Prisma.sql `
    SELECT
      a.modelId,
      a.numSales AS monthSales,
      b.numSales AS prevSales
    FROM tblmonthlysales AS a
    LEFT JOIN tblmonthlysales AS b
      ON b.modelId = a.modelId
     AND b.year    = ${prevYear}
     AND b.month   = ${prevMonth}
    WHERE a.year  = ${year}
      AND a.month = ${month}
    ORDER BY a.numSales DESC, a.modelId ASC
    LIMIT ${limit}
  `);
        return rows;
    }
    async getSegmentById(segmentId) {
        const row = await prisma.tblsegments.findUnique({
            where: { segmentId },
            select: { segmentId: true, segmentName: true },
        });
        return row ? { id: row.segmentId, name: row.segmentName ?? '' } : null;
    }
    /** Resolve a segment by name (case-insensitive) */
    async getSegmentByName(name) {
        const n = (name || '').trim();
        if (!n)
            return null;
        // Fast path: exact match (most MySQL collations are already CI)
        const exact = await prisma.tblsegments.findFirst({
            where: { segmentName: { equals: n } },
            select: { segmentId: true, segmentName: true },
        });
        if (exact)
            return { id: exact.segmentId, name: exact.segmentName ?? '' };
        // Fallback CI search via LOWER() to be safe across collations
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT segmentId, segmentName
      FROM tblsegments
      WHERE LOWER(segmentName) = LOWER(${n})
      LIMIT 1
    `);
        const r = rows[0];
        return r ? { id: r.segmentId, name: r.segmentName ?? '' } : null;
    }
    /** Latest (year, month) that has sales for any model in a given segment */
    async latestMonthForSegment(segmentId) {
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT a.year AS year, a.month AS month
      FROM tblmonthlysales a
      JOIN tblmodels m ON m.modelId = a.modelId
      WHERE m.segmentId = ${segmentId}
      ORDER BY a.year DESC, a.month DESC
      LIMIT 1
    `);
        return rows[0] ?? null;
    }
    /** Latest (year, month) across all models (global) */
    async latestMonthGlobal() {
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT year, month
      FROM tblmonthlysales
      ORDER BY year DESC, month DESC
      LIMIT 1
    `);
        return rows[0] ?? null;
    }
    /** Top selling within a segment for a specific month (also returns previous month for delta) */
    async topSellingByMonthInSegment(opts) {
        const { segmentId, year, month } = opts;
        const limit = Math.max(1, Math.min(opts.limit ?? 25, 100));
        const prev = new Date(year, month - 1, 1);
        prev.setMonth(prev.getMonth() - 1);
        const prevYear = prev.getFullYear();
        const prevMonth = prev.getMonth() + 1;
        return prisma.$queryRaw(Prisma.sql `
      SELECT
        a.modelId,
        a.numSales AS monthSales,
        b.numSales AS prevSales
      FROM tblmonthlysales AS a
      JOIN tblmodels m ON m.modelId = a.modelId
      LEFT JOIN tblmonthlysales AS b
        ON b.modelId = a.modelId
       AND b.year    = ${prevYear}
       AND b.month   = ${prevMonth}
      WHERE a.year  = ${year}
        AND a.month = ${month}
        AND m.segmentId = ${segmentId}
      ORDER BY a.numSales DESC, a.modelId ASC
      LIMIT ${limit}
    `);
    }
}
