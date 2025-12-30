import { z } from 'zod';
// local pagination + sort
const pageDto = z.object({ page: z.coerce.number().int().positive().default(1).optional() });
const limitDto = z.object({ limit: z.coerce.number().int().positive().max(100).default(50).optional() });
const sortByDto = z.object({
    sortBy: z.enum(['id_asc', 'latest', 'name_asc', 'name_desc', 'popular']).default('name_asc').optional(),
});
// '1' | '0' -> boolean (consistent with your content.dto style)
const flag = z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1');
export const citiesListQueryDto = pageDto
    .merge(limitDto)
    .merge(sortByDto)
    .merge(z.object({
    q: z.string().trim().min(1).max(100).optional(),
    status: z.coerce.number().int().optional(),
    stateId: z.coerce.number().int().positive().optional(),
    countryId: z.coerce.number().int().nonnegative().optional(), // schema default 0
    isPopular: flag.optional(),
    isTop: flag.optional(),
    majorFuel: z.enum(['petrol', 'diesel', 'cng']).optional(),
}));
export const cityIdParamDto = z.object({
    id: z.coerce.number().int().positive(),
});
