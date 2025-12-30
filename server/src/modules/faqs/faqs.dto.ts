import { z } from 'zod';

export const faqIdParamDto = z.object({
  id: z.coerce.number().int().positive(),
});

const fuelTypeDto = z.coerce.number().int().refine(v => [1,2,3].includes(v), {
  message: 'fuelType must be 1|2|3',
});

export const faqsListQueryDto = z.object({
  moduleId: z.coerce.number().int().positive(),
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
  sortBy: z.enum(['sequence_asc', 'latest', 'id_asc', 'id_desc']).optional(),

  // Fuel-price module (id=16)
  pageType: z.coerce.number().int().refine(v => [1,2,3,4].includes(v), {
    message: 'pageType must be 1|2|3|4',
  }).optional(),
  fuelType: fuelTypeDto.optional(),
});

export const modulesListQueryDto = z.object({
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
});
