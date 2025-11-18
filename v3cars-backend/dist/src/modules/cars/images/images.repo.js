import { prisma } from '../../../lib/prisma.js';
export class ImagesRepo {
    /**
     * Returns the first (best) image row per modelId using priority:
     * isMainImage DESC, position_no ASC, imageId ASC
     */
    async getPrimaryByModelIds(modelIds) {
        const map = new Map();
        if (!modelIds?.length)
            return map;
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
                { position_no: 'asc' }, // then by position
                { imageId: 'asc' }, // stable
            ],
        });
        for (const r of rows) {
            if (r.modelId == null)
                continue;
            if (!map.has(r.modelId))
                map.set(r.modelId, r);
        }
        return map;
    }
}
