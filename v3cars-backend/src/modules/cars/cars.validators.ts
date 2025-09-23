import { z } from 'zod';

export const paginationQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
});

export const commonFiltersQuery = z.object({
  q: z.string().trim().min(1).max(100).optional(),
  isUpcoming: z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1').optional(),
  bodyTypeId: z.coerce.number().int().positive().optional(),
  bodyTypeName: z.string().trim().min(2).max(50).optional(),
  priceBucket: z.enum(['UNDER_5L','BETWEEN_5_10L','BETWEEN_10_20L','BETWEEN_20_40L','ABOVE_40L']).optional(),
  futureOnly: z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1').optional(),

  /** 🆕 fuel/transmission filters (service-level using powertrains) */
  fuelType: z.string().trim().max(50).optional(),           // e.g., 'Electric'
  transmissionType: z.string().trim().max(50).optional(),   // optional (future use)
});

export const sortQuery = z.object({
  sortBy: z.enum([
     'latest','popular','price_asc','price_desc','name_asc','name_desc',
    'launch_asc'
  ]).optional(),
});
