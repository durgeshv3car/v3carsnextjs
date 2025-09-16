import { prisma } from '../../../lib/prisma.js';
import type { Prisma } from '@prisma/client';
import type { BrandsListQuery } from './brands.types.js';

function buildWhere(q: BrandsListQuery): Prisma.tblbrandsWhereInput {
  const where: Prisma.tblbrandsWhereInput = {};
  if (q.q) {
    const term = q.q;
    where.OR = [{ brandName: { contains: term } }, { brandSlug: { contains: term } }];
  }
  if (typeof q.status === 'number') where.brandStatus = q.status;
  if (typeof q.hasServiceNetwork === 'boolean') where.serviceNetwork = q.hasServiceNetwork;
  if (typeof q.brandType === 'number') where.brandType = q.brandType;
  return where;
}

function buildOrderBy(sortBy: BrandsListQuery['sortBy']): Prisma.tblbrandsOrderByWithRelationInput[] {
  switch (sortBy) {
    case 'popular': return [{ popularity: 'desc' }, { brandId: 'asc' }];
    case 'name_asc': return [{ brandName: 'asc' }, { brandId: 'asc' }];
    case 'name_desc': return [{ brandName: 'desc' }, { brandId: 'asc' }];
    case 'latest': return [{ brandId: 'desc' }];
    default: return [{ brandId: 'asc' }];
  }
}

export class BrandsRepo {
  async list(q: BrandsListQuery) {
    const take = Math.max(1, Math.min(q.limit || 12, 100));
    const page = q.page || 1;
    const skip = Math.max(0, (page - 1) * take);

    const where = buildWhere(q);
    const orderBy = buildOrderBy(q.sortBy);

    const [rows, total] = await Promise.all([
      prisma.tblbrands.findMany({
        where, orderBy, skip, take,
        select: {
          brandId: true, brandName: true, brandSlug: true, logoPath: true,
          popularity: true, unquieViews: true, brandStatus: true,
          serviceNetwork: true, brandType: true,
        },
      }),
      prisma.tblbrands.count({ where }),
    ]);

    return { rows, total, page, pageSize: take, totalPages: Math.max(1, Math.ceil(total / take)) };
  }

  async getById(id: number) {
    return prisma.tblbrands.findFirst({
      where: { brandId: id },
      select: {
        brandId: true, brandName: true, brandSlug: true, logoPath: true,
        popularity: true, unquieViews: true, brandStatus: true,
        serviceNetwork: true, brandType: true, brandDescription: true,
        bannerImage: true, bannerImageAltTag: true, websiteUrl: true,
        introContent: true, displayName: true,
      },
    });
  }

  // ✅ Added: batch fetch by ids (for Models enrichment)
  async findByIds(ids: number[]) {
    if (!ids?.length) return [];
    return prisma.tblbrands.findMany({
      where: { brandId: { in: ids } },
      select: { brandId: true, brandName: true, brandSlug: true, logoPath: true },
    });
  }
}
