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
  year: z.coerce.number().int().min(2000).max(2100),
  month: z.coerce.number().int().min(1).max(12),
  limit: z.coerce.number().int().min(1).max(100).default(25).optional(),
});


export const modelPriceListQueryDto = paginationQuery.merge(
  z.object({
    fuelType: z.string().trim().min(1).max(100).optional(),
    transmissionType: z.string().trim().min(1).max(100).optional(),
    /** ex = Ex-Showroom (default), onroad, csd */
    priceType: z.enum(['ex', 'onroad', 'csd']).default('ex').optional(),
    cityId: z.coerce.number().int().positive().optional(),
    expandVariantId: z.coerce.number().int().positive().optional(), // return detailed breakup for this variant only
    isLoan: z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1').optional(),
    /** required when priceType = onroad | csd (frontend can ensure) */
    citySlug: z.string().trim().min(1).max(100).optional(),
    sortBy: z
      .enum(['price_asc', 'price_desc', 'latest', 'name_asc', 'name_desc'])
      .optional(),
  })


);

export const modelBestVariantQueryDto = z.object({
  powertrainId: z.coerce.number().int().positive().optional(),
});

export const modelMsfQueryDto = z.object({
  /** optional: pick a specific powertrain row */
  powertrainId: z.coerce.number().int().positive().optional(),
});