// src/config/env.ts
import { z } from 'zod';
import 'dotenv/config';
const EnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(3121),
    DATABASE_URL: z.string().min(1),
    // Optional media base URL you already had
    MEDIA_BASE_URL: z.string().url().optional(),
    // 🆕 Redis (optional)
    REDIS_URL: z.string().min(1).optional(),
    REDIS_PREFIX: z.string().default('v3cars:'),
    REDIS_TLS: z
        .union([z.string(), z.boolean()])
        .optional()
        .transform((v) => {
        if (typeof v === 'boolean')
            return v;
        if (typeof v === 'string')
            return v === '1' || v.toLowerCase() === 'true';
        return false;
    }),
});
export const env = EnvSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    MEDIA_BASE_URL: process.env.MEDIA_BASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PREFIX: process.env.REDIS_PREFIX,
    REDIS_TLS: process.env.REDIS_TLS,
});
