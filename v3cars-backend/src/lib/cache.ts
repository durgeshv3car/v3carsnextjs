// Lightweight in-memory cache (TTL-based). Drop-in Redis replacement later.

// Toggle cache via env (useful in dev). Default = true.
const ENABLED = process.env.CACHE_ENABLED !== 'false';

type Entry<T> = { value: T; expiresAt: number };
const store = new Map<string, Entry<unknown>>();

export function cacheGet<T = unknown>(key: string): T | null {
  if (!ENABLED) return null;
  const hit = store.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    store.delete(key);
    return null;
  }
  return hit.value as T;
}

export function cacheSet<T = unknown>(key: string, value: T, ttlMs = 60_000): void {
  if (!ENABLED) return;
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export function cacheDel(key: string): void {
  store.delete(key);
}

export function cacheClear(namespace?: string): void {
  if (!namespace) {
    store.clear();
    return;
  }
  const prefix = namespace + '|';
  for (const k of store.keys()) {
    if (k.startsWith(prefix)) store.delete(k);
  }
}

/**
 * Stable key builder. Pass a small plain object (no functions/Date/BigInt).
 * Example: cacheKey({ scope:'cities:list', page:1, q:'gur' })
 */

export function cacheKey(parts: Record<string, unknown>): string {
  const entries = Object.entries(parts).sort(([a], [b]) => a.localeCompare(b));
  return entries
    .map(([k, v]) => `${k}=${stableStringify(v)}`)
    .join('&');
}

// Helper to stringify values consistently (handles arrays/objects)
function stableStringify(val: unknown): string {
  if (val === null || typeof val !== 'object') return JSON.stringify(val);
  if (Array.isArray(val)) return `[${val.map(stableStringify).join(',')}]`;
  const obj = val as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return `{${keys.map(k => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(',')}}`;
}

/**
 * Convenience wrapper:
 * await withCache({key, ttlMs: 60000}, async () => expensiveFetch())
 */

export async function withCache<T>(
  key: string,
  producer: () => Promise<T>,
  ttlMs = 60_000
): Promise<T> {
  const cached = cacheGet<T>(key);
  if (cached !== null) return cached;
  const value = await producer();
  cacheSet(key, value, ttlMs);
  return value;
}
