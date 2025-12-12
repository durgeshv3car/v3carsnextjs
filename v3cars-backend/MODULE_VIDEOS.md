## Videos Module
Base path: `/v1/videos`

Video types (path `:type`):
- `reviews`
- `compare`
- `variant-explained`
- `more`
- `auto-expo`

Common query params:
- `limit` 1..50 (default 9 for lists; 15 for model lists)
- `excludeToday` `"1"|"0"` (Latest only, default `1` exclude)
- `fuelType` string (EV scope) — applies to global lists (latest/popular/global latest/popular)
- `authorId` number (optional filter where supported by DTO)

Card shape: see service `hydrate` (id, title, pageUrl, publishDateandTime, thumbnail {url,alt}, videoYId, author).

---

### Global (all types mixed)
- Latest global: `GET /v1/videos/latest?limit=&excludeToday=`  
- Popular global: `GET /v1/videos/popular?limit=`
- Optional `fuelType`, `authorId` supported.

### Type-scoped (global)
- Today: `GET /v1/videos/:type/today`
- Latest: `GET /v1/videos/:type/latest?limit=&excludeToday=`
- Trending: `GET /v1/videos/:type/trending?limit=`
- Top: `GET /v1/videos/:type/top?limit=`

### Model-scoped (id or slug)
Base: `/v1/videos/model/:modelIdOrSlug/:type/*`
- Today: `.../today`
- Latest: `.../latest?limit=&excludeToday=`
- Trending: `.../trending?limit=`
- Top: `.../top?limit=`

Popular across all types for a model:  
`GET /v1/videos/model/:modelIdOrSlug/popular?limit=`

Examples:
- `/v1/videos/reviews/today`
- `/v1/videos/reviews/latest?limit=9&excludeToday=0`
- `/v1/videos/compare/trending?limit=9&fuelType=Electric`
- `/v1/videos/latest?limit=12&fuelType=Electric`
- `/v1/videos/popular?limit=5&fuelType=Electric`
- `/v1/videos/model/fronx/reviews/latest?limit=15`
- `/v1/videos/model/444/popular?limit=12`

Notes:
- `:modelIdOrSlug` accepts numeric id or model slug.
- Caching is applied via `setCache` per route (120–300s with stale-while-revalidate).
- Thumbnails use `MEDIA_BASE_URL` when present; otherwise raw path.
