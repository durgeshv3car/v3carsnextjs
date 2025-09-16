import { prisma } from '../../../lib/prisma.js';

export class PowertrainsRepo {
  async findByIds(ids: number[]) {
    if (!ids.length) return [];
    return prisma.tblmodelpowertrains.findMany({
      where: { modelPowertrainId: { in: ids } },
      select: {
        modelPowertrainId: true,
        modelId: true,
        fuelType: true,
        transmissionType: true,
        powerTrain: true,
      },
    });
  }

  /** Return ids matching optional fuel/transmission (optionally scoped by modelId) */
  async findIdsByFilters(opts: { fuelType?: string; transmissionType?: string; modelId?: number }) {
    const where: any = {};
    if (opts.fuelType) where.fuelType = opts.fuelType;
    if (opts.transmissionType) where.transmissionType = opts.transmissionType;
    if (opts.modelId) where.modelId = opts.modelId;

    if (!Object.keys(where).length) return [];

    const rows = await prisma.tblmodelpowertrains.findMany({
      where,
      select: { modelPowertrainId: true },
    });
    return rows.map((r) => r.modelPowertrainId);
  }

    /** Per-model specs from the FIRST powertrain row by ASC(modelPowertrainId) */
  async getSpecsByModelIds(modelIds: number[]) {
    const map = new Map<number, { powerPS: number | null; torqueNM: number | null; mileageKMPL: number | null }>();
    if (!modelIds?.length) return map;

    // Step 1: get the MIN(modelPowertrainId) per modelId
    const mins = await prisma.tblmodelpowertrains.groupBy({
      by: ['modelId'],
      where: { modelId: { in: modelIds } },
      _min: { modelPowertrainId: true },
    });

    const idByModel = new Map<number, number>();
    const ptIds: number[] = [];
    for (const g of mins) {
      const mid = g.modelId as number;
      const minId = g._min.modelPowertrainId as number | null;
      if (typeof mid === 'number' && typeof minId === 'number') {
        idByModel.set(mid, minId);
        ptIds.push(minId);
      }
    }

    if (!ptIds.length) return map;

    // Step 2: fetch those first powertrain rows
    const rows = await prisma.tblmodelpowertrains.findMany({
      where: { modelPowertrainId: { in: ptIds } },
      select: {
        modelId: true,
        modelPowertrainId: true,
        powerPS: true,
        torqueNM: true,
        claimedFE: true,
        realWorldMileage: true,
      },
    });

    // Step 3: map → { powerPS, torqueNM, mileageKMPL } (claimedFE preferred)
    for (const r of rows) {
      const feRaw = r.claimedFE ?? r.realWorldMileage ?? null;
      const fe = feRaw != null ? Number(feRaw as unknown as any) : null;

      map.set(r.modelId, {
        powerPS: (r.powerPS ?? null) as number | null,
        torqueNM: (r.torqueNM ?? null) as number | null,
        mileageKMPL: fe,
      });
    }

    return map;
  }

}
