// src/lib/redis.ts
import { env } from '../config/env.js';
import RedisPkg from 'ioredis';
// Constructor ko reliably pick karne ke liye:
const RedisCtor = RedisPkg?.default ?? RedisPkg;
let client = null;
export function getRedis() {
    if (!env.REDIS_URL)
        return null;
    if (client)
        return client;
    const options = {
        lazyConnect: true,
        // ⚡ fast-fail so app can switch to memory quickly if Redis is down
        maxRetriesPerRequest: 1,
        enableReadyCheck: true,
        connectTimeout: 1500,
        commandTimeout: 1500,
        retryStrategy: () => null, // no long exponential retries
        enableOfflineQueue: false, // don't queue commands forever
    };
    if (env.REDIS_TLS) {
        options.tls = { rejectUnauthorized: false };
    }
    // No type annotation on instance — shape-based usage only
    client = new RedisCtor(env.REDIS_URL, options);
    // Optional listeners (replace with your logger if needed)
    if (client && typeof client.on === 'function') {
        client.on('error', (err) => {
            console.error('[redis] error:', err?.message);
        });
    }
    return client;
}
export async function ensureRedisConnected() {
    const r = getRedis();
    if (!r)
        return false;
    try {
        if (r.status !== 'ready') {
            await r.connect();
        }
        await r.ping();
        return true;
    }
    catch {
        return false;
    }
}
export async function closeRedis() {
    const r = getRedis();
    if (!r)
        return;
    try {
        await r.quit();
    }
    catch {
        try {
            await r.disconnect();
        }
        catch { }
    }
}
