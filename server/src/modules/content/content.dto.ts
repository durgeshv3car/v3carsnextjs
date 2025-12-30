import { z } from 'zod';

export const limitDto = z.object({
  limit: z.coerce.number().int().positive().max(50).default(9).optional(),
  /** 🆕 EV / fuel filter */
  fuelType: z.string().trim().max(50).optional(), // e.g., "Electric"
});

export const latestDto = z.object({
  limit: z.coerce.number().int().positive().max(50).default(9).optional(),
  excludeToday: z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1').optional(),
  /** 🆕 EV / fuel filter */
  fuelType: z.string().trim().max(50).optional(),
});
