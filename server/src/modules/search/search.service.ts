import { cacheKey, withCache } from '../../lib/cache.js';
import { SearchRepo } from './search.repo.js';

type Suggestion =
  | { type: 'brand'; label: string; href: string; id: number | null }
  | {
      type: 'model';
      label: string;
      href: string;
      id: number | null;
      brandId: number | null;
    }
  | {
      type: 'model_page';
      subType: string;
      label: string;
      href: string;
      modelId: number | null;
      brandId: number | null;
    };

const repo = new SearchRepo();


function toSlug(v?: string | null): string | null {
  if (!v) return null;
  return v
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function dedupe(rows: Suggestion[]): Suggestion[] {
  const seen = new Set<string>();
  const out: Suggestion[] = [];
  for (const r of rows) {
    if (!r.href) continue;
    if (seen.has(r.href)) continue;
    seen.add(r.href);
    out.push(r);
  }
  return out;
}

export class SearchService {
  async universal(opts: { q: string; citySlug?: string; cityName?: string; limit?: number }) {
    const q = opts.q?.trim() ?? '';
    if (q.length < 2) return { query: q, rows: [] as Suggestion[] };

    const limit = Math.max(1, Math.min(opts.limit ?? 20, 50));
    const tokens = q
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 1); // keep it lean (first token only, PHP parity)

    const citySlug = toSlug(opts.citySlug) || 'delhi';
    const cityLabel = opts.cityName?.trim() || citySlug.replace(/-/g, ' ');

    const key = cacheKey({ ns: 'search:universal', v: 3, q: tokens.join(' '), citySlug, limit });
    const ttlMs = 60 * 1000; // 1 minute to keep cache fresh yet responsive

    return withCache(key, async () => {
      const [brands, models] = await Promise.all([
        repo.searchBrands(tokens, 6),
        repo.searchModels(tokens, 15),
      ]);

      const rows: Suggestion[] = [];

      for (const b of brands) {
        const href = b.brandSlug ? `/${b.brandSlug}` : '';
        rows.push({
          type: 'brand',
          label: b.brandName ?? b.brandSlug ?? '',
          href,
          id: b.brandId ?? null,
        });
      }

      for (const m of models) {
        if (!m.modelSlug || !m.brandSlug) continue;
        const baseLabel = `${m.brandName ?? ''} ${m.modelName ?? ''}`.trim();
        const baseHref = `/${m.brandSlug}/${m.modelSlug}`;

        rows.push({
          type: 'model',
          label: baseLabel,
          href: baseHref,
          id: m.modelId ?? null,
          brandId: m.brandId ?? null,
        });

        const tpl = (subType: string, label: string, path: string) => ({
          type: 'model_page' as const,
          subType,
          label,
          href: path,
          modelId: m.modelId ?? null,
          brandId: m.brandId ?? null,
        });

        rows.push(
          tpl('onroad', `${baseLabel} On-Road Price`, `${baseHref}/on-road-price-in-${citySlug}`),
          tpl('priceInCity', `${baseLabel} Price in ${cityLabel}`, `${baseHref}/price-in-${citySlug}`),
          tpl('specs', `${baseLabel} Specifications`, `${baseHref}/engine-specifications`),
          tpl('dimensions', `${baseLabel} Dimensions`, `${baseHref}/dimensions`),
          tpl('mileage', `${baseLabel} Mileage`, `${baseHref}/mileage`),
          tpl('reviews', `${baseLabel} Reviews`, `${baseHref}/reviews`),
          tpl('videos', `${baseLabel} Videos`, `${baseHref}/videos`),
          tpl('news', `${baseLabel} News`, `${baseHref}/news`),
          tpl('competitors', `${baseLabel} Comparison`, `${baseHref}/competitors`),
          tpl('images', `${baseLabel} Images`, `${baseHref}/images`),
          tpl('colors', `${baseLabel} Colors`, `${baseHref}/colors`),
          tpl('offers', `${baseLabel} Offers & Discounts`, `${baseHref}/offers-discounts`),
          tpl('monthlySales', `${baseLabel} Monthly Sales`, `${baseHref}/monthly-sales`),
          tpl('csd', `${baseLabel} CSD Price`, `${baseHref}/csd-price`),
          tpl('whichVariant', `${baseLabel} Which Variant To Buy`, `${baseHref}/which-variant-to-buy`),
          tpl('maintenance', `${baseLabel} Maintenance Cost`, `${baseHref}/maintenance-cost`),
          tpl('costOfOwnership', `${baseLabel} Cost Of Ownership`, `${baseHref}/cost-of-ownership`)
        );
      }

      // keep order: brands first, then models & pages; enforce limit
      const finalRows = dedupe(rows).slice(0, limit);
      return { query: q, rows: finalRows };
    }, ttlMs);
  }
}









