import { prisma } from '../../../lib/prisma.js';
import type { ModelsListQuery } from './models.types.js';
import { Prisma } from '@prisma/client'; // ⬅️ value import for Prisma.sql
import type { Prisma as PrismaTypes } from '@prisma/client';

const priceRanges: Record<string, { min?: number; max?: number }> = {
  UNDER_5L: { max: 5_00_000 },
  BETWEEN_5_10L: { min: 5_00_000, max: 10_00_000 },
  BETWEEN_10_20L: { min: 10_00_000, max: 20_00_000 },
  BETWEEN_20_40L: { min: 20_00_000, max: 40_00_000 },
  ABOVE_40L: { min: 40_00_000 },
};

function normalizeAnd(andInput: PrismaTypes.tblmodelsWhereInput | PrismaTypes.tblmodelsWhereInput[] | undefined) {
  return Array.isArray(andInput) ? andInput : andInput ? [andInput] : [];
}

function buildWhere(q: ModelsListQuery): PrismaTypes.tblmodelsWhereInput {
  const where: PrismaTypes.tblmodelsWhereInput = {};

  if (q.q) {
    const term = q.q;
    where.OR = [{ modelName: { contains: term } }, { modelSlug: { contains: term } }];
  }
  if (typeof q.isUpcoming === 'boolean') where.isUpcoming = q.isUpcoming;
  if (q.brandId) where.brandId = q.brandId;
  if (q.bodyTypeId) where.modelBodyTypeId = q.bodyTypeId;

  // (legacy expected* price filter; service overrides for variant-based)
  if (q.priceBucket) {
    const { min, max } = priceRanges[q.priceBucket];
    const baseFilter: PrismaTypes.IntFilter = {};
    const topFilter: PrismaTypes.IntFilter = {};
    if (typeof min === 'number') { baseFilter.gte = min; topFilter.gte = min; }
    if (typeof max === 'number') { baseFilter.lte = max; topFilter.lte = max; }

    const existingAND = normalizeAnd(where.AND);
    const overlapAND: PrismaTypes.tblmodelsWhereInput[] = [];
    if (typeof min === 'number') overlapAND.push({ expectedTopPrice: { gte: min } });
    if (typeof max === 'number') overlapAND.push({ expectedBasePrice: { lte: max } });

    where.AND = [
      ...existingAND,
      {
        OR: [
          Object.keys(baseFilter).length ? { expectedBasePrice: baseFilter } : undefined,
          Object.keys(topFilter).length ? { expectedTopPrice: topFilter } : undefined,
          overlapAND.length ? { AND: overlapAND } : undefined,
        ].filter(Boolean) as PrismaTypes.tblmodelsWhereInput[],
      },
    ];
  }

  const existingAND = normalizeAnd(where.AND);

  const launchMonth = (q as any).launchMonth as string | undefined;
  if (launchMonth) {
    const [yy, mm] = launchMonth.split('-').map(Number);
    if (yy && mm) {
      const from = new Date(yy, mm - 1, 1, 0, 0, 0, 0);
      const to = new Date(yy, mm, 1, 0, 0, 0, 0);
      existingAND.push({ launchDate: { gte: from } });
      existingAND.push({ launchDate: { lt: to } });
    }
  }

  const lf = (q as any).launchFrom as Date | string | undefined;
  const lt = (q as any).launchTo as Date | string | undefined;
  const launchFrom = lf ? new Date(lf) : undefined;
  const launchTo = lt ? new Date(lt) : undefined;

  if (launchFrom) existingAND.push({ launchDate: { gte: launchFrom } });
  if (launchTo) existingAND.push({ launchDate: { lte: launchTo } });

  if ((q as any).futureOnly) {
    const now = new Date();
    existingAND.push({ launchDate: { not: null } });
    existingAND.push({ launchDate: { gte: now } });
  }

  if (existingAND.length) where.AND = existingAND;

  return where;
}

function buildOrderBy(sortBy: ModelsListQuery['sortBy']): PrismaTypes.tblmodelsOrderByWithRelationInput[] {
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
} satisfies PrismaTypes.tblmodelsSelect;

export class ModelsRepo {
  async list(q: ModelsListQuery) {
    const take = Math.max(1, Math.min(q.limit || 12, 100));
    const skip = Math.max(0, ((q.page || 1) - 1) * take);

    const where = buildWhere(q);
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

  async listIgnoringPriceBucket(q: ModelsListQuery) {
    const q2 = { ...q, priceBucket: undefined } as ModelsListQuery;
    const where = buildWhere(q2);
    const rows = await prisma.tblmodels.findMany({ where, select: baseSelect });
    return rows;
  }

  /** 🆕 DB aggregation for current month + next N months (N=months), grouped by month */
  async upcomingMonthlyCount(opts: { months?: number; brandId?: number; bodyTypeId?: number }) {
    const horizon = Math.max(1, Math.min(opts.months ?? 12, 24)); // next N months
    const buckets = horizon + 1; // include current month

    const brandSql = opts.brandId ? Prisma.sql` AND brandId = ${opts.brandId} ` : Prisma.sql``;
    const bodySql = opts.bodyTypeId ? Prisma.sql` AND modelBodyTypeId = ${opts.bodyTypeId} ` : Prisma.sql``;

    const rows = await prisma.$queryRaw<Array<{ bucket: string; cnt: number }>>(Prisma.sql`
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

  async getById(id: number) {
    return prisma.tblmodels.findFirst({ where: { modelId: id } });
  }

  // add inside export class ModelsRepo { ... }

  /** 🆕 Top selling by a specific month (ordered by that month’s sales) */
  async topSellingByMonth(opts: { year: number; month: number; limit?: number }) {
    const { year, month } = opts;
    const limit = Math.max(1, Math.min(opts.limit ?? 25, 100));

    // compute previous month in JS to keep SQL simple
    const prev = new Date(year, month - 1, 1);
    prev.setMonth(prev.getMonth() - 1);
    const prevYear = prev.getFullYear();
    const prevMonth = prev.getMonth() + 1;

    // One row per model for current month; join previous month for delta
    const rows = await prisma.$queryRaw<Array<{
      modelId: number;
      monthSales: number | null;
      prevSales: number | null;
    }>>(Prisma.sql`
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

}
