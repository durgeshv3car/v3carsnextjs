import { prisma } from '../../../lib/prisma.js';
import { extractPriceBand, snapApproxINR } from './price.util.js';
function buildWhere(q) {
    const where = {};
    if (q.q)
        where.OR = [{ variantName: { contains: q.q } }];
    if (q.modelId)
        where.modelId = q.modelId;
    if (q.powertrainIds?.length)
        where.modelPowertrainId = { in: q.powertrainIds };
    return where;
}
export class VariantsRepo {
    async listRaw(q) {
        const where = buildWhere(q);
        return prisma.tblvariants.findMany({
            where,
            orderBy: [{ updatedDate: 'desc' }, { variantId: 'asc' }],
            select: {
                variantId: true,
                variantName: true,
                modelId: true,
                modelPowertrainId: true,
                variantPrice: true,
                csdPrice: true, // 🆕 include CSD price
                vfmValue: true,
                vfmRank: true,
                variantRecommendation: true,
                updatedDate: true,
            },
        });
    }
    async getById(id) {
        return prisma.tblvariants.findFirst({
            where: { variantId: id },
            select: {
                variantId: true,
                variantName: true,
                modelId: true,
                modelPowertrainId: true,
                variantPrice: true,
                csdPrice: true, // 🆕 include CSD price
                vfmValue: true,
                vfmRank: true,
                variantRecommendation: true,
                updatedDate: true,
            },
        });
    }
    /** Compute price bands per model from ALL variants' string prices. */
    async getPriceBandsByModelIds(modelIds) {
        const map = new Map();
        if (!modelIds?.length)
            return map;
        const rows = await prisma.tblvariants.findMany({
            where: { modelId: { in: modelIds } },
            select: { modelId: true, variantPrice: true },
        });
        for (const r of rows) {
            if (!r.modelId)
                continue;
            const band = extractPriceBand(r.variantPrice ?? '');
            if (!band)
                continue;
            const current = map.get(r.modelId) ?? { min: null, max: null };
            current.min = current.min == null ? band.min : Math.min(current.min, band.min);
            current.max = current.max == null ? band.max : Math.max(current.max, band.max);
            map.set(r.modelId, current);
        }
        for (const [modelId, band] of map.entries()) {
            map.set(modelId, {
                min: snapApproxINR(band.min),
                max: snapApproxINR(band.max),
            });
        }
        return map;
    }
    async listByModelId(modelId) {
        return prisma.tblvariants.findMany({
            where: { modelId },
            orderBy: [{ updatedDate: 'desc' }, { variantId: 'asc' }],
            select: {
                variantId: true,
                variantName: true,
                modelId: true,
                modelPowertrainId: true,
                variantPrice: true,
                csdPrice: true, // 🆕 include CSD price
                vfmValue: true, // 🆕
                vfmRank: true, // 🆕
                variantRecommendation: true, // 🆕
                updatedDate: true,
            },
        });
    }
    /** Fetch variants by IDs */
    async findByIds(ids) {
        if (!ids?.length)
            return [];
        return prisma.tblvariants.findMany({
            where: { variantId: { in: ids } },
            orderBy: [{ updatedDate: 'desc' }, { variantId: 'asc' }],
            select: {
                variantId: true,
                variantName: true,
                modelId: true,
                modelPowertrainId: true,
                variantPrice: true,
                csdPrice: true, // 🆕 include CSD price
                vfmValue: true, // 🆕
                vfmRank: true, // 🆕
                variantRecommendation: true, // 🆕
                updatedDate: true,
            },
        });
    }
}
