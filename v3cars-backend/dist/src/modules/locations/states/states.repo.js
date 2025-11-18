import { prisma } from '../../../lib/prisma.js';
function buildWhere(q) {
    const where = {};
    if (q.q) {
        where.OR = [
            { stateName: { contains: q.q } },
            { stateCode: { contains: q.q } },
            { shortCode: { contains: q.q } },
        ];
    }
    if (typeof q.countryId === 'number')
        where.countryId = q.countryId;
    if (typeof q.isTodayFuelPrice === 'boolean')
        where.isTodayFuelPrice = q.isTodayFuelPrice ? 1 : 0;
    return where;
}
function buildOrder(sortBy) {
    switch (sortBy) {
        case 'latest': return [{ stateId: 'desc' }];
        case 'id_asc': return [{ stateId: 'asc' }];
        case 'id_desc': return [{ stateId: 'desc' }];
        case 'name_asc':
        default: return [{ stateName: 'asc' }, { stateId: 'asc' }];
    }
}
const baseSelect = {
    stateId: true,
    stateName: true,
    countryId: true,
    stateCode: true,
    shortCode: true,
    isTodayFuelPrice: true,
};
export class StatesRepo {
    async list(q) {
        const take = Math.max(1, Math.min(q.limit ?? 50, 100));
        const skip = Math.max(0, ((q.page ?? 1) - 1) * take);
        const where = buildWhere(q);
        const orderBy = buildOrder(q.sortBy);
        const [rows, total] = await Promise.all([
            prisma.tblstates.findMany({ where, orderBy, skip, take, select: baseSelect }),
            prisma.tblstates.count({ where }),
        ]);
        return {
            rows,
            total,
            page: q.page ?? 1,
            pageSize: take,
            totalPages: Math.max(1, Math.ceil(total / take)),
        };
    }
    async getById(id) {
        return prisma.tblstates.findFirst({ where: { stateId: id }, select: baseSelect });
    }
}
