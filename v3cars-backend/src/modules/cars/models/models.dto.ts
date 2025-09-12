import { z } from 'zod';
import { paginationQuery, commonFiltersQuery, sortQuery } from '../cars.validators.js';

export const modelsListQueryDto = paginationQuery
  .merge(commonFiltersQuery)
  .merge(sortQuery)
  .extend({
    brandId: z.coerce.number().int().positive().optional(),
  });

export const modelIdParamDto = z.object({
  id: z.coerce.number().int().positive(),
});
