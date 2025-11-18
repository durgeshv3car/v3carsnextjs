import { prisma } from '../../../lib/prisma.js';
function buildWhere(q) {
    const where = {};
    // search by name (MySQL collations are usually case-insensitive already)
    if (q.q)
        where.districtName = { contains: q.q };
    if (typeof q.stateId === 'number')
        where.stateId = q.stateId;
    if (typeof q.popularRank === 'number') {
        where.isPopularCity = q.popularRank;
    }
    else if (q.popularAny === true) {
        where.isPopularCity = { in: [1, 2, 3, 4] };
    }
    return where;
}
function buildOrderBy(sortBy) {
    switch (sortBy) {
        case 'name_asc': return [{ districtName: 'asc' }, { id: 'asc' }];
        case 'name_desc': return [{ districtName: 'desc' }, { id: 'asc' }];
        case 'latest': return [{ id: 'desc' }];
        case 'popular_rank': return [{ isPopularCity: 'asc' }, { districtName: 'asc' }];
        default: return [{ id: 'asc' }]; // id_asc
    }
}
export class DistrictsRepo {
    async list(q) {
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
                },
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
    async getById(id) {
        return prisma.tbldistricts.findFirst({
            where: { id },
            select: {
                id: true,
                districtName: true,
                stateId: true,
                isPopularCity: true,
            },
        });
    }
}
