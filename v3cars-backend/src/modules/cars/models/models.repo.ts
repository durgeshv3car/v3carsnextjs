import { prisma } from '../../../lib/prisma.js';
import type { ModelsListQuery } from './models.types.js';
import type { Prisma } from '@prisma/client';

const priceRanges: Record<string, { min?: number; max?: number }> = {
  UNDER_5L: { max: 5_00_000 },
  BETWEEN_5_10L: { min: 5_00_000, max: 10_00_000 },
  BETWEEN_10_20L: { min: 10_00_000, max: 20_00_000 },
  BETWEEN_20_40L: { min: 20_00_000, max: 40_00_000 },
  ABOVE_40L: { min: 40_00_000 },
};

function normalizeAnd(andInput: Prisma.tblmodelsWhereInput | Prisma.tblmodelsWhereInput[] | undefined) {
  return Array.isArray(andInput) ? andInput : andInput ? [andInput] : [];
}

function buildWhere(q: ModelsListQuery): Prisma.tblmodelsWhereInput {
  const where: Prisma.tblmodelsWhereInput = {};

  if (q.q) {
    const term = q.q;
    where.OR = [{ modelName: { contains: term } }, { modelSlug: { contains: term } }];
  }
  if (typeof q.isUpcoming === 'boolean') where.isUpcoming = q.isUpcoming;
  if (q.brandId) where.brandId = q.brandId;
  if (q.bodyTypeId) where.modelBodyTypeId = q.bodyTypeId;

  if (q.priceBucket) {
    const { min, max } = priceRanges[q.priceBucket];
    const baseFilter: Prisma.IntFilter = {};
    const topFilter: Prisma.IntFilter = {};
    if (typeof min === 'number') { baseFilter.gte = min; topFilter.gte = min; }
    if (typeof max === 'number') { baseFilter.lte = max; topFilter.lte = max; }

    const existingAND = normalizeAnd(where.AND);
    const overlapAND: Prisma.tblmodelsWhereInput[] = [];
    if (typeof min === 'number') overlapAND.push({ expectedTopPrice: { gte: min } });
    if (typeof max === 'number') overlapAND.push({ expectedBasePrice: { lte: max } });

    where.AND = [
      ...existingAND,
      {
        OR: [
          Object.keys(baseFilter).length ? { expectedBasePrice: baseFilter } : undefined,
          Object.keys(topFilter).length ? { expectedTopPrice: topFilter } : undefined,
          overlapAND.length ? { AND: overlapAND } : undefined,
        ].filter(Boolean) as Prisma.tblmodelsWhereInput[],
      },
    ];
  }

  if ((q as any).futureOnly) {
    const now = new Date();
    const existingAND = normalizeAnd(where.AND);
    where.AND = [...existingAND, { launchDate: { not: null } }, { launchDate: { gte: now } }];
  }

  return where;
}

function buildOrderBy(sortBy: ModelsListQuery['sortBy']): Prisma.tblmodelsOrderByWithRelationInput[] {
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

export class ModelsRepo {
  async list(q: ModelsListQuery) {
    const take = Math.max(1, Math.min(q.limit || 12, 100));
    const skip = Math.max(0, ((q.page || 1) - 1) * take);

    const where = buildWhere(q);
    const orderBy = buildOrderBy(q.sortBy);

    const [rows, total] = await Promise.all([
      prisma.tblmodels.findMany({
        where, orderBy, skip, take,
        select: {
          modelId: true, modelName: true, modelSlug: true,
          brandId: true, modelBodyTypeId: true, isUpcoming: true,
          launchDate: true, totalViews: true,
          expectedBasePrice: true, expectedTopPrice: true,
        },
      }),
      prisma.tblmodels.count({ where }),
    ]);

    return {
      rows, total, page: q.page || 1, pageSize: take,
      totalPages: Math.max(1, Math.ceil(total / take)),
    };
  }

  async getById(id: number) {
    return prisma.tblmodels.findFirst({ where: { modelId: id } });
  }
}
