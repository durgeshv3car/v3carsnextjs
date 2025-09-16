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
  /**
   * Returns the first (best) image row per modelId using priority:
   * isMainImage DESC, position_no ASC, imageId ASC
   */
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
        { isMainImage: 'desc' }, // prefer main image
        { position_no: 'asc' },  // then by position
        { imageId: 'asc' },      // stable
      ],
    });

    for (const r of rows) {
      if (r.modelId == null) continue;
      if (!map.has(r.modelId)) map.set(r.modelId, r as Row);
    }
    return map;
  }
}
