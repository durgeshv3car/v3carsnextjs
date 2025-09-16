import { z } from 'zod';

const Env = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  PORT: z.coerce.number().default(3121),

  // Optional: if set, image URLs become absolute: `${MEDIA_BASE_URL}/${fileName}`
  // e.g. MEDIA_BASE_URL=https://cdn.v3cars.com/images
  MEDIA_BASE_URL: z.string().optional().default(''),
});

export const env = Env.parse(process.env);


