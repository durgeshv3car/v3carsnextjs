import { prisma } from '../../../lib/prisma.js';
import type { Prisma } from '@prisma/client';
import type { DistrictsListQuery } from './districts.types.js';

function buildWhere(q: DistrictsListQuery): Prisma.tbldistrictsWhereInput {
  const where: Prisma.tbldistrictsWhereInput = {};

  // search by name (MySQL collations are usually case-insensitive already)
  if (q.q) where.districtName = { contains: q.q };

  if (typeof q.stateId === 'number') where.stateId = q.stateId;

  if (typeof q.popularRank === 'number') {
    (where as any).isPopularCity = q.popularRank;
  } else if (q.popularAny === true) {
    (where as any).isPopularCity = { in: [1,2,3,4] as number[] } as any;
  }

  return where;
}

function buildOrderBy(sortBy: DistrictsListQuery['sortBy']): Prisma.tbldistrictsOrderByWithRelationInput[] {
  switch (sortBy) {
    case 'name_asc':      return [{ districtName: 'asc' }, { id: 'asc' }];
    case 'name_desc':     return [{ districtName: 'desc' }, { id: 'asc' }];
    case 'latest':        return [{ id: 'desc' }];
    case 'popular_rank':  return [{ isPopularCity: 'asc' as any }, { districtName: 'asc' }];
    default:              return [{ id: 'asc' }]; // id_asc
  }
}

export class DistrictsRepo {

  async list(q: DistrictsListQuery) {
    const take = Math.max(1, Math.min(q.limit || 50, 100));
    const page = q.page || 1;
    const skip = Math.max(0, (page - 1) * take);

    const where = buildWhere(q);
    const orderBy = buildOrderBy(q.sortBy);

    const [rows, total] = await Promise.all([

      prisma.tbldistricts.findMany({
        where, orderBy, skip, take,
        select: {
          id: true,
          districtName: true,
          stateId: true,
          isPopularCity: true, // 1..4 or null
        } as any,
      }),
      prisma.tbldistricts.count({ where }),
    ]);

    return {
      rows,
      total,
      page,
      pageSize: take,
      totalPages: Math.max(1, Math.ceil(total / take)),
    };

  }

  async getById(id: number) {
    return prisma.tbldistricts.findFirst({
      where: { id },
      select: {
        id: true,
        districtName: true,
        stateId: true,
        isPopularCity: true,
      } as any,
    });
  }

}


