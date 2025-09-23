import { z } from 'zod';
import { paginationQuery, commonFiltersQuery, sortQuery } from '../cars.validators.js';

/**
 * List params (unchanged + earlier additions like launchMonth/From/To if you already merged)
 */
export const modelsListQueryDto = paginationQuery
  .merge(commonFiltersQuery)
  .merge(sortQuery)
  .extend({
    brandId: z.coerce.number().int().positive().optional(),
    launchMonth: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(),
    launchFrom: z.coerce.date().optional(),
    launchTo: z.coerce.date().optional(),
  });

export const modelIdParamDto = z.object({
  id: z.coerce.number().int().positive(),
});

/** 🆕 Monthly count params */
export const upcomingMonthlyCountDto = z.object({
  months: z.coerce.number().int().min(1).max(24).default(12).optional(), // horizon (next N months) + current
  brandId: z.coerce.number().int().positive().optional(),
  bodyTypeId: z.coerce.number().int().positive().optional(),
});


export const topSellingMonthlyDto = z.object({
  year:  z.coerce.number().int().min(2000).max(2100),
  month: z.coerce.number().int().min(1).max(12),
  limit: z.coerce.number().int().min(1).max(100).default(25).optional(),
});