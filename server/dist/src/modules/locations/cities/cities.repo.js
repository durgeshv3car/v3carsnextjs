import { prisma } from '../../../lib/prisma.js';
function buildWhere(q) {
    const where = {};
    if (q.q)
        where.cityName = { contains: q.q };
    if (typeof q.status === 'number')
        where.status = q.status;
    if (typeof q.stateId === 'number')
        where.stateId = q.stateId;
    if (typeof q.countryId === 'number')
        where.countryId = q.countryId;
    if (typeof q.isPopular === 'boolean')
        where.isPopularCity = q.isPopular ? 1 : 0;
    if (typeof q.isTop === 'boolean')
        where.isTopCity = q.isTop ? 1 : 0;
    if (q.majorFuel) {
        const map = {
            petrol: 'ismajorCityPetrol',
            diesel: 'ismajorCityDiesel',
            cng: 'ismajorCityCNG',
        };
        where[map[q.majorFuel]] = 1;
    }
    return where;
}
function buildOrderBy(sortBy) {
    switch (sortBy) {
        case 'name_asc': return [{ cityName: 'asc' }, { cityId: 'asc' }];
        case 'name_desc': return [{ cityName: 'desc' }, { cityId: 'asc' }];
        case 'latest': return [{ cityId: 'desc' }];
        default: return [{ cityId: 'asc' }]; // id_asc (fallback)
    }
}
export class CitiesRepo {
    async list(q) {
        const take = Math.max(1, Math.min(q.limit || 50, 100));
        const page = q.page || 1;
        const skip = Math.max(0, (page - 1) * take);
        const where = buildWhere(q);
        // Special JS-side sort for 'popular'
        if (q.sortBy === 'popular') {
            const all = await prisma.tblcities.findMany({
                where,
                select: {
                    cityId: true, cityName: true, stateId: true, countryId: true, status: true,
                    isPopularCity: true, isTopCity: true,
                    ismajorCityPetrol: true, ismajorCityDiesel: true, ismajorCityCNG: true,
                    isImage: true,
                },
            });
            const total = all.length;
            const popular = all.filter(c => (c.isPopularCity ?? 0) === 1)
                .sort((a, b) => String(a.cityName ?? '').localeCompare(String(b.cityName ?? '')));
            const rest = all.filter(c => (c.isPopularCity ?? 0) !== 1)
                .sort((a, b) => String(a.cityName ?? '').localeCompare(String(b.cityName ?? '')));
            const ordered = [...popular, ...rest];
            const rows = ordered.slice(skip, skip + take);
            return {
                rows,
                total,
                page,
                pageSize: take,
                totalPages: Math.max(1, Math.ceil(total / take)),
            };
        }
        // DB-side sorts
        const orderBy = buildOrderBy(q.sortBy);
        const [rows, total] = await Promise.all([
            prisma.tblcities.findMany({
                where, orderBy, skip, take,
                select: {
                    cityId: true, cityName: true, stateId: true, countryId: true, status: true,
                    isPopularCity: true, isTopCity: true,
                    ismajorCityPetrol: true, ismajorCityDiesel: true, ismajorCityCNG: true,
                    isImage: true,
                },
            }),
            prisma.tblcities.count({ where }),
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
        return prisma.tblcities.findFirst({
            where: { cityId: id },
            select: {
                cityId: true, cityName: true, stateId: true, countryId: true, status: true,
                isPopularCity: true, isTopCity: true,
                ismajorCityPetrol: true, ismajorCityDiesel: true, ismajorCityCNG: true,
                isImage: true,
            },
        });
    }
}
