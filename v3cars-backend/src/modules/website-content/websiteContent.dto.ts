import { z } from 'zod';

export const idParamDto = z.object({
  id: z.coerce.number().int().positive(),
});

export const moduleIdParamDto = z.object({
  moduleId: z.coerce.number().int().positive(),
});

export const listQueryDto = z.object({
  moduleId: z.coerce.number().int().positive().optional(),
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20).optional(),
  sortBy: z
    .enum(['latest', 'title_asc', 'title_desc', 'id_asc', 'id_desc'])
    .optional(),
});
