import { prisma } from '../../../lib/prisma.js';
function buildWhere(q) {
    const where = {};
    if (q.q) {
        where.OR = [
            { countryName: { contains: q.q } },
            { countryCode: { contains: q.q } },
        ];
    }
    if (typeof q.isActive === 'boolean')
        where.isActive = q.isActive ? 1 : 0;
    return where;
}
function buildOrder(sortBy) {
    switch (sortBy) {
        case 'latest': return [{ countryId: 'desc' }];
        case 'id_asc': return [{ countryId: 'asc' }];
        case 'id_desc': return [{ countryId: 'desc' }];
        case 'name_asc':
        default: return [{ countryName: 'asc' }, { countryId: 'asc' }];
    }
}
const baseSelect = {
    countryId: true,
    countryName: true,
    pincodeLength: true,
    countryCurrency: true,
    currencySymbol: true,
    distanceCalcOption: true,
    currencyRate: true,
    fuelUnitOption: true,
    isActive: true,
    exchangeCurrencyRate: true,
    countryCode: true,
};
export class CountriesRepo {
    async list(q) {
        const take = Math.max(1, Math.min(q.limit ?? 50, 100));
        const skip = Math.max(0, ((q.page ?? 1) - 1) * take);
        const where = buildWhere(q);
        const orderBy = buildOrder(q.sortBy);
        const [rows, total] = await Promise.all([
            prisma.tblcountries.findMany({ where, orderBy, skip, take, select: baseSelect }),
            prisma.tblcountries.count({ where }),
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
        return prisma.tblcountries.findFirst({ where: { countryId: id }, select: baseSelect });
    }
}
