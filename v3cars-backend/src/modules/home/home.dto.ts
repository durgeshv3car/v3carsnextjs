import { z } from 'zod';
import { paginationQuery } from '../cars/cars.validators.js';

export const upcomingQueryDto = paginationQuery;

export const quickLookQueryDto = paginationQuery.merge(
  z.object({
    type: z.enum(['popular', 'latest']).default('popular'),
  })
);

export const bodyTypeQueryDto = paginationQuery.merge(
  z.object({
    bodyTypeId: z.coerce.number().int().positive(),
    isUpcoming: z.union([z.literal('1'), z.literal('0')]).transform((v) => v === '1').optional(),
    sortBy: z
      .enum(['popular', 'latest', 'price_asc', 'price_desc', 'name_asc', 'name_desc'])
      .optional(),
  })
);

export const priceQueryDto = paginationQuery.merge(
  z.object({
    bucket: z.enum(['UNDER_5L','BETWEEN_5_10L','BETWEEN_10_20L','BETWEEN_20_40L','ABOVE_40L']),
    isUpcoming: z.union([z.literal('1'), z.literal('0')]).transform((v) => v === '1').optional(),
    sortBy: z
      .enum(['popular', 'latest', 'price_asc', 'price_desc', 'name_asc', 'name_desc'])
      .optional(),
  })
);

/** News widget */
export const homeLatestNewsDto = z.object({
  limit: z.coerce.number().int().positive().max(50).default(9).optional(),
  excludeToday: z.union([z.literal('1'), z.literal('0')]).transform((v) => v === '1').optional(),
});

/** Reviews widget */
export const homeLatestReviewsDto = z.object({
  limit: z.coerce.number().int().positive().max(50).default(6).optional(),
  excludeToday: z.union([z.literal('1'), z.literal('0')]).transform((v) => v === '1').optional(),
});

/** 🆕 Latest videos (global) */
export const homeLatestVideosDto = z.object({
  limit: z.coerce.number().int().positive().max(50).default(9).optional(),
});

/** 🆕 Variants Explained (articles) */
export const homeLatestVariantExplainedDto = z.object({
  limit: z.coerce.number().int().positive().max(50).default(6).optional(),
  excludeToday: z.union([z.literal('1'), z.literal('0')]).transform((v) => v === '1').optional(),
});
