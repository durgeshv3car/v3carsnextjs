
import { z } from 'zod';
import { paginationQuery, sortQuery } from '../cars.validators.js';

export const brandsListQueryDto = paginationQuery
  .merge(sortQuery)
  .merge(
    z.object({
      q: z.string().trim().min(1).max(100).optional(),
      status: z.coerce.number().int().optional(),
      hasServiceNetwork: z
        .union([z.literal('1'), z.literal('0')])
        .transform((v) => v === '1')
        .optional(),
      brandType: z.coerce.number().int().optional(),
    })
  );

export const brandIdParamDto = z.object({
  id: z.coerce.number().int().positive(),
});
