import { z } from 'zod';
export const searchQueryDto = z.object({
    q: z.string().trim().min(1),
    citySlug: z.string().trim().min(1).max(100).optional(),
    cityName: z.string().trim().min(1).max(100).optional(),
    limit: z.coerce.number().int().min(1).max(50).default(20).optional(),
});
