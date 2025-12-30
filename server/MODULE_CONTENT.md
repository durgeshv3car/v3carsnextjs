## Content Module (Unified: News, Reviews, Guides, etc.)
Base path: `/v1/content/:type/*`  
Legacy aliases: `/v1/news/*` (type fixed to `news`)

### Type Map
| type param | contentType |
| --- | --- |
| news | 1 |
| reviews / expert-review(s) | 2 |
| variant-explained | 3 |
| comparison | 4 |
| user-reviews | 5 |
| features-explained | 6 |
| car-guide | 7 |
| auto-expo | 8 |
| press-release | 9 |

### Card Shape (ContentCard)
```json
{
  "id": 123,
  "title": "Title",
  "pageUrl": "/news/...",
  "publishDateandTime": "2025-09-11T09:00:00.000Z",
  "shortDescription": "...",
  "thumbnail": { "url": "https://cdn.../thumb.webp", "alt": "..." },
  "author": { "id": 4, "name": "Author", "slug": "author-slug" },
  "commentsCount": 12
}
```
`MEDIA_BASE_URL` is used to build absolute thumbnail URLs when present.

### Common Query Params
- `limit` integer 1..50 (default 9)
- `excludeToday` `"1"|"0"` → boolean (default `1`, i.e., exclude today) — only for Latest
- `fuelType` string (optional, e.g., `Electric`) → EV-scoped using modelTagging + powertrains

---

## Site-wide Feeds
1) **Today** — `GET /v1/content/:type/today`  
   - Optional: `fuelType`  
   - Picks most recent row with `publishDateandTime <= NOW()`

2) **Latest** — `GET /v1/content/:type/latest`  
   - Params: `limit`, `excludeToday` (default 1), optional `fuelType`  
   - Order: `publishDateandTime DESC, id DESC`

3) **Trending** — `GET /v1/content/:type/trending`  
   - Params: `limit`, optional `fuelType`  
   - Order: `last_15days_view DESC`

4) **Top** — `GET /v1/content/:type/top`  
   - Params: `limit`, optional `fuelType`  
   - Order: `last_30days_view DESC`

5) **Popular** — `GET /v1/content/:type/popular`  
   - Params: `limit`, optional `fuelType`  
   - Order: `uniqueUsers (NumView) DESC`

Examples:
- `/v1/content/news/latest?limit=9`
- `/v1/content/news/latest?excludeToday=0`
- `/v1/content/reviews/latest?fuelType=Electric`
- `/v1/content/news/trending?limit=9`
- `/v1/content/news/top?limit=9`
- `/v1/content/news/popular?limit=5`
- Comparisons popular: `/v1/comparisons/popular?limit=15`

**Legacy news aliases (same params/shape, type=news):**  
`/v1/news/today`, `/v1/news/latest`, `/v1/news/trending`, `/v1/news/top`, `/v1/news/popular`

---

## Model-scoped Feeds (id or slug via :model)
Base: `/v1/content/:type/by-model/:model/*`

- Today: `GET .../today`
- Latest: `GET .../latest?limit=&excludeToday=`
- Trending: `GET .../trending?limit=`
- Top: `GET .../top?limit=`
- Popular: `GET .../popular?limit=`

Rules:
- `:model` accepts numeric id or modelSlug.
- `excludeToday` only for Latest (default 1).
- Defaults: latest limit=15, others limit=9 (service defaults).

Examples:
- `/v1/content/reviews/by-model/444/latest?limit=15&excludeToday=1`
- `/v1/content/reviews/by-model/grand-vitara/trending?limit=9`
- `/v1/content/reviews/by-model/444/popular?limit=9`

---

## Notes
- DB time (`NOW()`) gates Today/Latest inclusion.
- Author + commentsCount hydrated for all cards.
- `fuelType` scoping: matches tagged models; for Electric also does EV keyword fallback on titles.
- Further scoping (brand/model) can be added easily in service/repo.

---

## Cross-links
- Videos feeds: see `MODULE_VIDEOS.md`.
- News legacy paths: see `MODULE_NEWS.md` (delegates here).

