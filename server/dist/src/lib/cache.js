// src/lib/cache.ts
import { ensureRedisConnected, getRedis } from './redis.js';
import { inMemoryCache, makeRedisCache } from './cache.adapters.js';
/** Selected adapter + mode (decided at runtime) */
let adapter = null;
let mode = null;
/** Choose adapter once; prefer Redis if healthy, else memory */
async function chooseAdapter() {
    if (adapter)
        return adapter;
    const redis = getRedis(); // returns null if REDIS_URL not set
    if (redis) {
        const ok = await ensureRedisConnected();
        if (ok) {
            adapter = makeRedisCache(redis);
            mode = 'redis';
            return adapter;
        }
    }
    adapter = inMemoryCache;
    mode = 'memory';
    return adapter;
}
/** If Redis fails mid-flight, fall back to memory so requests stay fast */
async function recoverToMemory() {
    adapter = inMemoryCache;
    mode = 'memory';
}
/** Public API — keep these names stable across the codebase */
export async function cacheGet(key) {
    try {
        const a = await chooseAdapter();
        return a.get(key);
    }
    catch {
        if (mode === 'redis')
            await recoverToMemory();
        return null;
    }
}
export async function cacheSet(key, value, ttlMs) {
    const ttlSec = Math.max(0, Math.floor(ttlMs / 1000));
    try {
        const a = await chooseAdapter();
        await a.set(key, value, ttlSec);
    }
    catch {
        if (mode === 'redis')
            await recoverToMemory();
        try {
            await inMemoryCache.set(key, value, ttlSec);
        }
        catch { }
    }
}
export async function cacheDel(key) {
    try {
        const a = await chooseAdapter();
        await a.del(key);
    }
    catch {
        if (mode === 'redis')
            await recoverToMemory();
    }
}
export async function delPrefix(prefix) {
    try {
        const a = await chooseAdapter();
        return await a.delPrefix(prefix);
    }
    catch {
        if (mode === 'redis')
            await recoverToMemory();
        return 0;
    }
}
/**
 * withCache: (1) read, (2) if miss → single-producer lock, (3) write, (4) return
 * Uses Redis lock when available; otherwise in-memory lock.
 */
export async function withCache(key, producer, ttlMs) {
    const ttlSec = Math.max(1, Math.floor(ttlMs / 1000));
    try {
        // 1) Try read
        const a = await chooseAdapter();
        const hit = await a.get(key);
        if (hit !== null && hit !== undefined)
            return hit;
        // 2) Use adapter’s lock to avoid stampede
        return a.withLock(key, ttlSec, async () => {
            // double-check inside lock
            const again = await a.get(key);
            if (again !== null && again !== undefined)
                return again;
            const data = await producer();
            await a.set(key, data, ttlSec);
            return data;
        });
    }
    catch {
        // If Redis had an issue, flip to memory and proceed
        if (mode === 'redis')
            await recoverToMemory();
        const data = await producer();
        try {
            await inMemoryCache.set(key, data, ttlSec);
        }
        catch { }
        return data;
    }
}
/** Deterministic cache key builder: stable-ordered object → string */
export function cacheKey(obj) {
    const stable = (o) => {
        if (o === null || typeof o !== 'object')
            return o;
        if (Array.isArray(o))
            return o.map(stable);
        const out = {};
        for (const k of Object.keys(o).sort())
            out[k] = stable(o[k]);
        return out;
    };
    return JSON.stringify(stable(obj));
}
/** Optional: warm-up/health used by /ready */
export async function cacheHealth() {
    const r = getRedis();
    if (r) {
        const ok = await ensureRedisConnected();
        return { backend: 'redis', ok };
    }
    return { backend: 'memory', ok: true };
}
