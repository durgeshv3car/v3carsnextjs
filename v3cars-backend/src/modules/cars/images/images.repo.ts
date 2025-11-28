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
  // 1) fetch color image rows for this model
  const rows = await prisma.tblmodelcolors.findMany({
    where: { modelId },
    select: {
      id: true,
      colorId: true,
      fileName: true,
      fileNameAltText: true,
    },
    orderBy: [{ id: 'asc' }],
  });

  if (!rows.length) return rows as Array<{
    id: number;
    colorId: number | null;
    fileName: string | null;
    fileNameAltText: string | null;
    // appended (empty) fields to keep typing compatible with service mapper
    _colorName?: string | null;
    _colorCode?: string | null;
  }>;

  // 2) hydrate color names/codes from tblcolors
  const ids = Array.from(
    new Set(rows.map(r => r.colorId).filter((n): n is number => typeof n === 'number'))
  );

  const colorMeta = ids.length
    ? await prisma.tblcolors.findMany({
        where: { colorId: { in: ids } },
        select: {
          colorId: true,
          colorName: true,
          colorCode: true,   // e.g. "#3B7F3C"
        },
      })
    : [];

  const metaById = new Map<number, { name: string | null; code: string | null }>(
    colorMeta.map(c => [
      c.colorId,
      {
        name: (c as any).colorName ?? null,
        code: ((c as any).colorCode ?? (c as any).hexCode ?? null) as string | null,
      },
    ])
  );

  return rows.map(r => ({
    ...r,
    _colorName: r.colorId != null ? metaById.get(r.colorId)?.name ?? null : null,
    _colorCode: r.colorId != null ? metaById.get(r.colorId)?.code ?? null : null,
  }));
}

// add to existing ImagesRepo
async listByModelIdWithTypes(modelId: number) {
  return prisma.tblmodelvariantimages.findMany({
    where: { modelId },
    select: {
      imageId: true,
      modelId: true,
      variantId: true,
      modelImageName: true,
      modelImageType: true,
      modelImageAltText: true,
      variantImageName: true,
      variantImageType: true,
      variantImageAltText: true,
      uploadedDateTime: true,
      is360view: true,
      colorId: true,
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

}
