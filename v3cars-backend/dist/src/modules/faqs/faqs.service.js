import { FaqsRepo } from './faqs.repo.js';
// cache façade
import { withCache, cacheKey, delPrefix } from '../../lib/cache.js';
const repo = new FaqsRepo();
export class FaqsService {
    /** List FAQs for a module (cache p1=30m, others=15m) */
    async list(q) {
        const page = q.page ?? 1;
        const ttlMs = page === 1 ? 30 * 60 * 1000 : 15 * 60 * 1000;
        const key = cacheKey({
            ns: 'faqs:list',
            v: 2, // 🔺 bump version because of new filters + table switch
            moduleId: q.moduleId,
            page,
            limit: q.limit ?? 50,
            sortBy: q.sortBy ?? 'sequence_asc',
            q: q.q ?? undefined,
            // fuel faq params
            pageType: q.pageType ?? undefined,
            fuelType: q.fuelType ?? undefined,
        });
        return withCache(key, () => repo.list(q), ttlMs);
    }
    /** FAQ detail (30m) */
    async getById(id) {
        const key = cacheKey({ ns: 'faq:detail', v: 1, id });
        const ttlMs = 30 * 60 * 1000;
        return withCache(key, () => repo.getById(id), ttlMs);
    }
    /** List modules (6h) */
    async listModules(q) {
        const key = cacheKey({
            ns: 'faqModules:list',
            v: 1,
            page: q.page ?? 1,
            limit: q.limit ?? 50,
            q: q.q ?? undefined,
        });
        const ttlMs = 6 * 60 * 60 * 1000; // 6h
        return withCache(key, () => repo.listModules(q), ttlMs);
    }
    /** Module detail (6h) */
    async getModuleById(id) {
        const key = cacheKey({ ns: 'faqModule:detail', v: 1, id });
        const ttlMs = 6 * 60 * 60 * 1000;
        return withCache(key, () => repo.getModuleById(id), ttlMs);
    }
    // ------- (optional) invalidation helpers for admin writes -------
    async invalidateAfterFaqChange(moduleId) {
        await Promise.all([
            delPrefix('faqs:list'),
            delPrefix('faq:detail'),
            // module-specific list keys will be removed due to prefix match
        ]);
        if (moduleId) {
            // In case you keep module stats later:
            await delPrefix('faqModule:detail');
        }
    }
    async invalidateAfterModuleChange() {
        await Promise.all([
            delPrefix('faqModules:list'),
            delPrefix('faqModule:detail'),
            delPrefix('faqs:list'), // if module name appears on UI lists
        ]);
    }
}
