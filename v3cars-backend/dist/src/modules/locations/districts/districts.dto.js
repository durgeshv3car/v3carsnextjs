import { z } from 'zod';
// pagination + sort
const pageDto = z.object({ page: z.coerce.number().int().positive().default(1).optional() });
const limitDto = z.object({ limit: z.coerce.number().int().positive().max(100).default(50).optional() });
const sortByDto = z.object({
    sortBy: z.enum(['id_asc', 'latest', 'name_asc', 'name_desc', 'popular_rank'])
        .default('name_asc')
        .optional(),
});
// popular rank 1..4
const rankDto = z.coerce.number().int()
    .refine(v => [1, 2, 3, 4].includes(v), { message: 'popularRank must be 1|2|3|4' });
export const districtsListQueryDto = pageDto
    .merge(limitDto)
    .merge(sortByDto)
    .merge(z.object({
    /** search text e.g. ?q=jaipur */
    q: z.string().trim().min(1).max(100).optional(),
    stateId: z.coerce.number().int().positive().optional(),
    /** any popular rank (1..4) when true */
    popularAny: z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1').optional(),
    /** exact rank 1|2|3|4 */
    popularRank: rankDto.optional(),
}));
export const districtIdParamDto = z.object({
    id: z.coerce.number().int().positive(), // tbldistricts.id
});
