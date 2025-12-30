import { prisma } from '../../../lib/prisma.js';
function buildWhere(q) {
    const where = {};
    if (q.q) {
        const term = q.q;
        where.OR = [{ brandName: { contains: term } }, { brandSlug: { contains: term } }];
    }
    if (typeof q.status === 'number')
        where.brandStatus = q.status;
    if (typeof q.hasServiceNetwork === 'boolean')
        where.serviceNetwork = q.hasServiceNetwork;
    if (typeof q.brandType === 'number')
        where.brandType = q.brandType;
    return where;
}
function buildOrderBy(sortBy) {
    switch (sortBy) {
        // "popular" JS-side handle होगा
        case 'name_asc': return [{ brandName: 'asc' }, { brandId: 'asc' }];
        case 'name_desc': return [{ brandName: 'desc' }, { brandId: 'asc' }];
        case 'latest': return [{ brandId: 'desc' }];
        default: return [{ brandId: 'asc' }];
    }
}
function popNum(s) {
    if (s == null)
        return null;
    const t = String(s).trim();
    if (!t)
        return null;
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
}
export class BrandsRepo {
    async list(q) {
        const take = Math.max(1, Math.min(q.limit || 12, 100));
        const page = q.page || 1;
        const where = buildWhere(q);
        // ✅ Special handling for "popular": numeric ASC; empty popularity last
        if (q.sortBy === 'popular') {
            const all = await prisma.tblbrands.findMany({
                where,
                // list view can stay lean; detail returns all columns
                select: {
                    brandId: true, brandName: true, brandSlug: true, logoPath: true,
                    popularity: true, unquieViews: true, brandStatus: true,
                    serviceNetwork: true, brandType: true,
                },
            });
            const total = all.length;
            const withPop = all
                .filter(b => popNum(b.popularity) !== null)
                .sort((a, b) => {
                const ap = popNum(a.popularity);
                const bp = popNum(b.popularity);
                return ap - bp || (a.brandId - b.brandId);
            });
            const withoutPop = all
                .filter(b => popNum(b.popularity) === null)
                .sort((a, b) => a.brandId - b.brandId);
            const ordered = [...withPop, ...withoutPop];
            const skip = Math.max(0, (page - 1) * take);
            const rows = ordered.slice(skip, skip + take);
            return {
                rows,
                total,
                page,
                pageSize: take,
                totalPages: Math.max(1, Math.ceil(total / take)),
            };
        }
        // 🟢 Other sorts use DB orderBy
        const orderBy = buildOrderBy(q.sortBy);
        const skip = Math.max(0, (page - 1) * take);
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
        return {
            rows,
            total,
            page,
            pageSize: take,
            totalPages: Math.max(1, Math.ceil(total / take)),
        };
    }
    /** 🔁 Detail: return ALL columns for brand */
    async getById(id) {
        // No 'select' => Prisma returns full row (all columns)
        return prisma.tblbrands.findFirst({
            where: { brandId: id },
        });
    }
    async findByIds(ids) {
        if (!ids?.length)
            return [];
        return prisma.tblbrands.findMany({
            where: { brandId: { in: ids } },
            select: { brandId: true, brandName: true, brandSlug: true, logoPath: true },
        });
    }
    /** 🆕 Discontinued models for a brand (isUpcoming = 2)
     * We use a raw query so this works even if Prisma model types map isUpcoming to boolean.
     */
    async discontinuedModelsByBrand(brandId) {
        // Minimal columns returned; expand if you need more
        const rows = await prisma.$queryRaw `
      SELECT modelId, modelName, modelSlug, discontinuedYear, isUpcoming, brandId
      FROM tblmodels
      WHERE brandId = ${brandId}
        AND isUpcoming = 2
      ORDER BY discontinuedYear DESC, modelId DESC
    `;
        return rows;
    }
}
