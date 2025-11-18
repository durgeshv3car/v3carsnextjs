import { prisma } from '../../../lib/prisma.js';
export class PowertrainsRepo {
    async findByIds(ids) {
        if (!ids.length)
            return [];
        return prisma.tblmodelpowertrains.findMany({
            where: { modelPowertrainId: { in: ids } },
            select: {
                modelPowertrainId: true,
                modelId: true,
                fuelType: true,
                transmissionType: true,
                powerTrain: true,
                cylinders: true,
                cubicCapacity: true,
                claimedFE: true,
                realWorldMileage: true,
            },
        });
    }
    /** Return powertrain ids matching optional fuel/transmission (optionally scoped by modelId) */
    async findIdsByFilters(opts) {
        const where = {};
        if (opts.fuelType)
            where.fuelType = { contains: opts.fuelType }; // case-insensitive in most MySQL collations
        if (opts.transmissionType)
            where.transmissionType = { contains: opts.transmissionType };
        if (opts.modelId)
            where.modelId = opts.modelId;
        if (!Object.keys(where).length)
            return [];
        const rows = await prisma.tblmodelpowertrains.findMany({
            where,
            select: { modelPowertrainId: true },
        });
        return rows.map((r) => r.modelPowertrainId);
    }
    /** 🆕 Distinct modelIds that have the given fuelType (e.g., 'Electric') */
    async findModelIdsByFuel(opts) {
        const ft = opts.fuelType?.trim();
        if (!ft)
            return [];
        const rows = await prisma.tblmodelpowertrains.findMany({
            where: { fuelType: { contains: ft } }, // avoids 'mode' to keep prisma happy
            select: { modelId: true },
            distinct: ['modelId'],
        });
        const set = new Set();
        for (const r of rows) {
            if (typeof r.modelId === 'number')
                set.add(r.modelId);
        }
        return Array.from(set);
    }
    /** NEW: Distinct modelIds for combined powertrain/spec filters
     *  Handles: fuelType, transmissionType, cylinders (array or single), engineDisplacement ranges (mapped to cubicCapacity),
     *  mileage ranges (claimedFE/realWorldMileage)
     *
     *  NOTE: The DB column used for cc is `cubicCapacity` (INT).
     */
    async findModelIdsByFilters(opts) {
        const where = {};
        if (opts.fuelType)
            where.fuelType = { contains: opts.fuelType };
        if (opts.transmissionType)
            where.transmissionType = { contains: opts.transmissionType };
        // cylinders: allow array OR single value
        if (opts.cylinders) {
            const cyls = Array.isArray(opts.cylinders) ? opts.cylinders : [opts.cylinders];
            const clauses = [];
            for (const cval of cyls) {
                if (cval === '8_PLUS') {
                    clauses.push({ cylinders: { gte: 8 } });
                }
                else {
                    const c = Number(cval);
                    if (!Number.isNaN(c))
                        clauses.push({ cylinders: c });
                }
            }
            if (clauses.length === 1)
                where.AND = [...(where.AND ?? []), clauses[0]];
            else if (clauses.length > 1)
                where.OR = [...(where.OR ?? []), ...clauses];
        }
        // engineDisplacement mapping → use cubicCapacity field (INT)
        if (opts.engineDisplacement) {
            const map = {
                '800': { max: 800 },
                '1000': { min: 1000, max: 1000 },
                '800_1000': { min: 800, max: 1000 },
                '1000_1500': { min: 1000, max: 1500 },
                '1500_2000': { min: 1500, max: 2000 },
                '2000_3000': { min: 2000, max: 3000 },
                '3000_4000': { min: 3000, max: 4000 },
                'ABOVE_4000': { min: 4000 },
            };
            const r = map[opts.engineDisplacement];
            if (r) {
                if (r.min != null && r.max != null)
                    where.cubicCapacity = { gte: r.min, lte: r.max };
                else if (r.min != null)
                    where.cubicCapacity = { gte: r.min };
                else if (r.max != null)
                    where.cubicCapacity = { lte: r.max };
            }
        }
        // mileage mapping — use claimedFE OR realWorldMileage
        if (opts.mileage) {
            if (opts.mileage === 'UNDER_10') {
                where.OR = [...(where.OR ?? []), { claimedFE: { lt: 10 } }, { realWorldMileage: { lt: 10 } }];
            }
            else if (opts.mileage === 'BETWEEN_10_15') {
                where.OR = [...(where.OR ?? []), { claimedFE: { gte: 10, lt: 15 } }, { realWorldMileage: { gte: 10, lt: 15 } }];
            }
            else if (opts.mileage === 'ABOVE_15') {
                where.OR = [...(where.OR ?? []), { claimedFE: { gte: 15 } }, { realWorldMileage: { gte: 15 } }];
            }
        }
        // If no filters were added, return empty
        if (!Object.keys(where).length)
            return [];
        // distinct modelId
        const rows = await prisma.tblmodelpowertrains.findMany({
            where,
            select: { modelId: true },
            distinct: ['modelId'],
        });
        const set = new Set();
        for (const r of rows) {
            if (typeof r.modelId === 'number')
                set.add(r.modelId);
        }
        return Array.from(set);
    }
    /** Per-model specs from the FIRST powertrain row by ASC(modelPowertrainId) */
    async getSpecsByModelIds(modelIds) {
        const map = new Map();
        if (!modelIds?.length)
            return map;
        // Step 1: get the MIN(modelPowertrainId) per modelId
        const mins = await prisma.tblmodelpowertrains.groupBy({
            by: ['modelId'],
            where: { modelId: { in: modelIds } },
            _min: { modelPowertrainId: true },
        });
        const ptIds = [];
        for (const g of mins) {
            const mid = g.modelId;
            const minId = g._min.modelPowertrainId;
            if (typeof mid === 'number' && typeof minId === 'number') {
                ptIds.push(minId);
            }
        }
        if (!ptIds.length)
            return map;
        const rows = await prisma.tblmodelpowertrains.findMany({
            where: { modelPowertrainId: { in: ptIds } },
            select: {
                modelId: true,
                modelPowertrainId: true,
                powerPS: true,
                torqueNM: true,
                claimedFE: true,
                realWorldMileage: true,
                powerTrain: true,
                // ⬇️ NEW fields
                transmissionType: true,
                transmissionSubType: true,
                drivetrain: true,
                isFourByFour: true,
            },
        });
        for (const r of rows) {
            const feRaw = r.claimedFE ?? r.realWorldMileage ?? null;
            const fe = feRaw != null ? Number(feRaw) : null;
            map.set(r.modelId, {
                powerPS: (r.powerPS ?? null),
                torqueNM: (r.torqueNM ?? null),
                mileageKMPL: fe,
                powerTrain: r.powerTrain ?? null,
                // ⬇️ NEW
                transmissionType: r.transmissionType ?? null,
                transmissionSubType: r.transmissionSubType ?? null,
                drivetrain: (r.drivetrain ?? null),
                isFourByFour: (r.isFourByFour ?? null),
            });
        }
        return map;
    }
}
