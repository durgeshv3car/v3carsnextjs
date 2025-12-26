// src/server.ts
import { env } from './config/env.js';
import app from './app.js';
import { prisma } from './lib/prisma.js';
import { closeRedis } from './lib/redis.js';
const server = app.listen(env.PORT, () => {
    console.log(`[server] listening on :${env.PORT}`);
});
async function shutdown(code = 0) {
    try {
        await new Promise((resolve) => server.close(() => resolve()));
    }
    catch { }
    try {
        await closeRedis();
    }
    catch { }
    try {
        await prisma.$disconnect();
    }
    catch { }
    process.exit(code);
}
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
process.on('SIGQUIT', () => shutdown(0));
process.on('uncaughtException', (err) => {
    console.error('[fatal] uncaughtException', err);
    shutdown(1);
});
process.on('unhandledRejection', (err) => {
    console.error('[fatal] unhandledRejection', err);
    shutdown(1);
});
