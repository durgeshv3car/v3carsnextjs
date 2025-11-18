import { z } from 'zod';
const fuelTypeDto = z.coerce.number().int().min(1).max(3) as unknown as z.ZodType<1|2|3>;

export const fuelLatestQueryDto = z.object({
  fuelType: fuelTypeDto,
  stateId: z.coerce.number().int().positive().optional(),
  districtId: z.coerce.number().int().positive().optional(),
  cityId: z.coerce.number().int().positive().optional(),   // ✅
}).refine(v => !!(v.cityId || v.districtId || v.stateId), {
  message: 'cityId or districtId or stateId is required',
  path: ['cityId'],
});


export const fuelHistoryQueryDto = z.object({
  fuelType: fuelTypeDto,
  stateId: z.coerce.number().int().positive().optional(),
  districtId: z.coerce.number().int().positive().optional(),
  cityId: z.coerce.number().int().positive().optional(),   // ✅
  days: z.coerce.number().int().min(1).max(90).default(10).optional(),
}).refine(v => !!(v.cityId || v.districtId || v.stateId), {
  message: 'cityId or districtId or stateId is required',
  path: ['cityId'],
});


export const fuelStatesListQueryDto = z.object({
  fuelType: fuelTypeDto,
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
  sortBy: z.enum(['name_asc', 'price_desc', 'price_asc']).optional(),
});
 

export const fuelCitiesListQueryDto = z.object({
  fuelType: fuelTypeDto,
  stateId: z.coerce.number().int().positive(),
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
  sortBy: z.enum(['name_asc', 'price_desc', 'price_asc']).optional(),
  popular: z.coerce.number().int().refine(v => v === 0 || v === 1, { message: 'popular must be 0 or 1' }).optional(),
});


export const fuelHistoryCombinedQueryDto = z.object({
  stateId: z.coerce.number().int().positive().optional(),
  districtId: z.coerce.number().int().positive().optional(),
  days: z.coerce.number().int().min(1).max(90).default(10).optional(),
}).refine(v => !!(v.stateId || v.districtId), {
  message: 'Either stateId or districtId is required',
  path: ['stateId'],
});


export const fuelMetrosQueryDto = z.object({
  fuelType: fuelTypeDto.optional(),
  days: z.coerce.number().int().min(1).max(90).optional(), // NEW: last N days (default handled in service)
});


export const fuelMonthlyTrendsQueryDto = z.object({
  fuelType: fuelTypeDto,
  districtId: z.coerce.number().int().positive().optional(),
  cityId: z.coerce.number().int().positive().optional(),   // NEW
  months: z.coerce.number().int().min(1).max(24).default(6).optional(),
}).refine(v => !!(v.districtId || v.cityId), {
  message: 'Either districtId or cityId is required',
  path: ['districtId'],
});















