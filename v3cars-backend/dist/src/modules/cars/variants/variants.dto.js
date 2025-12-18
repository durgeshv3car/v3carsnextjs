// variants.dto.ts
import { z } from 'zod';
import { paginationQuery } from '../cars.validators.js';
export const variantsListQueryDto = paginationQuery.merge(z.object({
    q: z.string().trim().min(1).max(100).optional(),
    modelId: z.coerce.number().int().positive().optional(),
    powertrainId: z.coerce.number().int().positive().optional(), // 🆕 modelPowertrainId filter
    priceBucket: z
        .enum(['UNDER_5L', 'BETWEEN_5_10L', 'BETWEEN_10_20L', 'BETWEEN_20_40L', 'ABOVE_40L'])
        .optional(),
    minPrice: z.coerce.number().int().positive().optional(),
    maxPrice: z.coerce.number().int().positive().optional(),
    fuelType: z.string().trim().min(1).max(100).optional(),
    transmissionType: z.string().trim().min(1).max(100).optional(),
    sortBy: z
        .enum(['price_asc', 'price_desc', 'latest', 'name_asc', 'name_desc'])
        .optional(),
}));
export const variantIdParamDto = z.object({
    id: z.coerce.number().int().positive(),
});
