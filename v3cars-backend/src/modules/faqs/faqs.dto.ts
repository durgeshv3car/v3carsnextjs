import { z } from 'zod';

export const faqIdParamDto = z.object({
  id: z.coerce.number().int().positive(),
});

export const faqsListQueryDto = z.object({
  moduleId: z.coerce.number().int().positive(),
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
  sortBy: z.enum(['sequence_asc', 'latest', 'id_asc', 'id_desc']).optional(),
});

export const modulesListQueryDto = z.object({
  q: z.string().trim().min(1).optional(), // optional search by name
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50).optional(),
});
