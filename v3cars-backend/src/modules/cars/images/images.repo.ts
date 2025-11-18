import { prisma } from '../../../lib/prisma.js';

type Row = {
  imageId: number;
  modelId: number | null;
  modelImageName: string | null;
  variantImageName: string | null;
  modelImageAltText: string | null;
  variantImageAltText: string | null;
  isMainImage: number | null;
  position_no: number | null;
};

export class ImagesRepo {
  /** Returns the first (best) image row per modelId */
  async getPrimaryByModelIds(modelIds: number[]) {
    const map = new Map<number, Row>();
    if (!modelIds?.length) return map;

    const rows = await prisma.tblmodelvariantimages.findMany({
      where: { modelId: { in: modelIds } },
      select: {
        imageId: true,
        modelId: true,
        modelImageName: true,
        variantImageName: true,
        modelImageAltText: true,
        variantImageAltText: true,
        isMainImage: true,
        position_no: true,
      },
      orderBy: [
        { isMainImage: 'desc' },
        { position_no: 'asc' },
        { imageId: 'asc' },
      ],
    });

    for (const r of rows) {
      if (r.modelId == null) continue;
      if (!map.has(r.modelId)) map.set(r.modelId, r as Row);
    }
    return map;
  }

  /** 🆕 All images for a model (ordered by main → position → id) */
  async listAllByModelId(modelId: number) {
    return prisma.tblmodelvariantimages.findMany({
      where: { modelId },
      select: {
        imageId: true,
        modelImageName: true,
        variantImageName: true,
        modelImageAltText: true,
        variantImageAltText: true,
        isMainImage: true,
        position_no: true,
      },
      orderBy: [
        { isMainImage: 'desc' },
        { position_no: 'asc' },
        { imageId: 'asc' },
      ],
    });
  }

  /** 🆕 Colour assets for a model */
  async listColorsByModelId(modelId: number) {
    return prisma.tblmodelcolors.findMany({
      where: { modelId },
      select: {
        id: true,
        colorId: true,
        fileName: true,
        fileNameAltText: true,
      },
      orderBy: [{ id: 'asc' }],
    });
  }
}
