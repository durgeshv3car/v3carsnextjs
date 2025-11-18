import { prisma } from '../../lib/prisma.js';
function buildFaqWhere(q) {
    const where = { moduleId: q.moduleId };
    if (q.q) {
        where.OR = [{ que: { contains: q.q } }, { ans: { contains: q.q } }];
    }
    return where;
}
function buildFaqOrder(sortBy) {
    switch (sortBy) {
        case 'latest': return [{ updateDateTime: 'desc' }, { id: 'desc' }];
        case 'id_asc': return [{ id: 'asc' }];
        case 'id_desc': return [{ id: 'desc' }];
        case 'sequence_asc':
        default: return [{ sequance: 'asc' }, { id: 'asc' }];
    }
}
const faqSelect = {
    id: true,
    moduleId: true,
    que: true,
    ans: true,
    sequance: true,
    addedBy: true,
    updatedBy: true,
    careateDateTime: true,
    updateDateTime: true,
};
export class FaqsRepo {
    async list(q) {
        const take = Math.max(1, Math.min(q.limit ?? 50, 100));
        const skip = Math.max(0, ((q.page ?? 1) - 1) * take);
        // 🔀 Branch: Fuel price FAQs (moduleId = 16) -> tblfuelpricefaqs
        if (Number(q.moduleId) === 16) {
            // Build where for tblfuelpricefaqs
            const where = {};
            if (q.pageType != null)
                where.pageType = q.pageType;
            if (q.fuelType != null)
                where.fuelType = q.fuelType;
            // NOTE: yahan text search fields different ho sakte hain;
            // agar chahiye ho to quesText/ansText par contains laga sakte hain.
            if (q.q) {
                where.OR = [
                    { quesText: { contains: q.q } },
                    { ansText: { contains: q.q } },
                ];
            }
            const [rows, total] = await Promise.all([
                prisma.tblfuelpricefaqs.findMany({
                    where,
                    skip,
                    take,
                    orderBy: [{ sequence: 'asc' }, { qId: 'asc' }],
                    select: {
                        qId: true,
                        quesText: true,
                        ansText: true,
                        sequence: true,
                        addedBy: true,
                        updatedBy: true,
                        addedDateTime: true,
                        updatedDateTime: true,
                        pageType: true,
                        fuelType: true,
                        fadCityId: true,
                        faqStates: true,
                        faqCityState: true,
                    },
                }),
                prisma.tblfuelpricefaqs.count({ where }),
            ]);
            // 🔁 Normalize to common shape (id/que/ans/sequence …)
            const normalized = rows.map(r => ({
                id: r.qId,
                moduleId: 16,
                que: r.quesText ?? null,
                ans: r.ansText ?? null,
                sequance: r.sequence ?? 0,
                addedBy: r.addedBy ?? null,
                updatedBy: r.updatedBy ?? null,
                careateDateTime: r.addedDateTime ?? null,
                updateDateTime: r.updatedDateTime ?? null,
                // extra (fuel specific) — include if UI needs
                _fuelMeta: {
                    pageType: r.pageType ?? 0,
                    fuelType: r.fuelType ?? 0,
                    fadCityId: r.fadCityId ?? null,
                    faqStates: r.faqStates ?? null,
                    faqCityState: r.faqCityState ?? null,
                },
            }));
            return {
                rows: normalized,
                total,
                page: q.page ?? 1,
                pageSize: take,
                totalPages: Math.max(1, Math.ceil(total / take)),
            };
        }
        // 🔁 Default (non-fuel modules) → tblfaqs
        const where = buildFaqWhere(q);
        const orderBy = buildFaqOrder(q.sortBy);
        const [rows, total] = await Promise.all([
            prisma.tblfaqs.findMany({ where, orderBy, skip, take, select: faqSelect }),
            prisma.tblfaqs.count({ where }),
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
        // NOTE: If you ever need getById for fuel module too, add a similar branch here
        return prisma.tblfaqs.findFirst({ where: { id }, select: faqSelect });
    }
    // --------- modules (for listing/selectors) ----------
    async listModules(opts) {
        const take = Math.max(1, Math.min(opts.limit ?? 50, 100));
        const skip = Math.max(0, ((opts.page ?? 1) - 1) * take);
        const where = {};
        if (opts.q)
            where.name = { contains: opts.q };
        const [rows, total] = await Promise.all([
            prisma.tblmodules.findMany({
                where, skip, take,
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                select: { id: true, name: true, createdAt: true },
            }),
            prisma.tblmodules.count({ where }),
        ]);
        return {
            rows,
            total,
            page: opts.page ?? 1,
            pageSize: take,
            totalPages: Math.max(1, Math.ceil(total / take)),
        };
    }
    async getModuleById(id) {
        return prisma.tblmodules.findFirst({
            where: { id },
            select: { id: true, name: true, createdAt: true },
        });
    }
}
