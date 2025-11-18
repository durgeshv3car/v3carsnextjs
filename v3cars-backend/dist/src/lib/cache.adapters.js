// src/lib/cache.adapters.ts
import { env } from '../config/env.js';
const memStore = new Map();
const memInflight = new Map();
const now = () => Date.now();
export const inMemoryCache = {
    async get(key) {
        const e = memStore.get(key);
        if (!e)
            return null;
        if (e.exp > 0 && e.exp < now()) {
            memStore.delete(key);
            return null;
        }
        return e.v;
    },
    async set(key, value, ttlSec) {
        const exp = ttlSec > 0 ? now() + ttlSec * 1000 : 0;
        memStore.set(key, { v: value, exp });
    },
    async del(key) {
        memStore.delete(key);
    },
    async delPrefix(prefix) {
        let n = 0;
        for (const k of memStore.keys()) {
            if (k.startsWith(prefix)) {
                memStore.delete(k);
                n++;
            }
        }
        return n;
    },
    async withLock(key, _ttlSec, fn) {
        const lk = `__lock:${key}`;
        if (memInflight.has(lk)) {
            return memInflight.get(lk);
        }
        const p = (async () => {
            try {
                return await fn();
            }
            finally {
                memInflight.delete(lk);
            }
        })();
        memInflight.set(lk, p);
        return p;
    },
};
/* -----------------------------
 * Redis Adapter (primary)
 * ----------------------------- */
// `redis` ko `any` shape me accept kar rahe hain: get/set/del/scan/quit/etc. honi chahiye.
export function makeRedisCache(redis, prefix = env.REDIS_PREFIX) {
    const pfx = prefix ?? '';
    const jget = async (k) => {
        const s = await redis.get(pfx + k);
        return s ? JSON.parse(s) : null;
        // NOTE: agar aapne RedisJSON use kiya ho to yaha JSON.parse ki zarurat nahi hogi.
    };
    const jset = async (k, v, ttlSec) => {
        const s = JSON.stringify(v);
        if (ttlSec > 0)
            await redis.set(pfx + k, s, 'EX', ttlSec);
        else
            await redis.set(pfx + k, s);
    };
    const jdel = async (k) => {
        await redis.del(pfx + k);
    };
    const scanDel = async (prefixKey) => {
        let cursor = '0';
        let deleted = 0;
        const match = pfx + prefixKey + '*';
        do {
            const [next, keys] = await redis.scan(cursor, 'MATCH', match, 'COUNT', 500);
            cursor = next;
            if (keys.length) {
                deleted += await redis.del(keys);
            }
        } while (cursor !== '0');
        return deleted;
    };
    // SET NX based lock to prevent cache stampede
    const withLock = async (key, ttlSec, fn) => {
        const lockKey = pfx + '__lock:' + key;
        const got = await redis.set(lockKey, '1', 'NX', 'EX', Math.max(1, ttlSec));
        if (!got) {
            // someone else computing → brief wait then try read
            await new Promise((r) => setTimeout(r, 80));
            const cached = await jget(key);
            if (cached != null)
                return cached;
        }
        try {
            return await fn();
        }
        finally {
            try {
                await redis.del(lockKey);
            }
            catch { }
        }
    };
    return {
        get: jget,
        set: jset,
        del: jdel,
        delPrefix: scanDel,
        withLock,
    };
}
