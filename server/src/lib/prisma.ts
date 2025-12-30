// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// (ESM-safe singleton: dev me hot-reload par re-use)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // dev me verbose logs chaho to uncomment:
    // log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
