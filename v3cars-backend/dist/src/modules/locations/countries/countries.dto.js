import { z } from 'zod';
export const countryIdParamDto = z.object({
    id: z.coerce.number().int().positive(),
});
export const countriesListQueryDto = z.object({
    q: z.string().trim().min(1).optional(),
    isActive: z
        .union([z.literal('1'), z.literal('0')])
        .transform(v => v === '1')
        .optional(),
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
    sortBy: z.enum(['name_asc', 'latest', 'id_asc', 'id_desc']).optional(),
});
