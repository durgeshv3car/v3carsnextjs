import { prisma } from '../../../lib/prisma.js';
import type { Prisma } from '@prisma/client';
import { extractPriceBand, snapApproxINR } from './price.util.js';

export interface VariantsWhere {
  q?: string;
  modelId?: number;
  powertrainIds?: number[];
}

function buildWhere(q: VariantsWhere): Prisma.tblvariantsWhereInput {
  const where: Prisma.tblvariantsWhereInput = {};
  if (q.q) where.OR = [{ variantName: { contains: q.q } }];
  if (q.modelId) where.modelId = q.modelId;
  if (q.powertrainIds?.length) where.modelPowertrainId = { in: q.powertrainIds };
  return where;
}

export class VariantsRepo {
  async listRaw(q: VariantsWhere) {
    const where = buildWhere(q);
    return prisma.tblvariants.findMany({
      where,
      orderBy: [{ updatedDate: 'desc' }, { variantId: 'asc' }],
      select: {
        variantId: true, variantName: true, modelId: true,
        modelPowertrainId: true, variantPrice: true, updatedDate: true,
      },
    });
  }

  async getById(id: number) {
    return prisma.tblvariants.findFirst({
      where: { variantId: id },
      select: {
        variantId: true, variantName: true, modelId: true,
        modelPowertrainId: true, variantPrice: true, updatedDate: true,
      },
    });
  }

  /** Compute price bands per model from ALL variants' string prices.
   *  - Uses price parsing (₹ .. lakh/cr) → rupees
   *  - Aggregates min/max across variants
   *  - Applies 'snapApproxINR' (e.g., 4.99L → 5.00L)
   */
  async getPriceBandsByModelIds(modelIds: number[]) {
    const map = new Map<number, { min: number | null; max: number | null }>();
    if (!modelIds?.length) return map;

    const rows = await prisma.tblvariants.findMany({
      where: { modelId: { in: modelIds } },
      select: { modelId: true, variantPrice: true },
    });

    for (const r of rows) {
      if (!r.modelId) continue;
      const band = extractPriceBand(r.variantPrice ?? '');
      if (!band) continue;

      const current = map.get(r.modelId) ?? { min: null, max: null };
      current.min = current.min == null ? band.min : Math.min(current.min, band.min);
      current.max = current.max == null ? band.max : Math.max(current.max, band.max);
      map.set(r.modelId, current);
    }

    // Snap to clean values once per model
    for (const [modelId, band] of map.entries()) {
      map.set(modelId, {
        min: snapApproxINR(band.min),
        max: snapApproxINR(band.max),
      });
    }

    return map;
  }
}
