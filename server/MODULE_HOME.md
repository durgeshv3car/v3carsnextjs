## Home Module (Homepage Sections)
Base path: `/v1/home`

All endpoints are read-only aggregations that reuse other services (cars, content, videos). Pagination defaults: `page=1`, `limit` varies per endpoint as noted.

---

### Hero Banners
`GET /v1/home/hero-banners`
- `limit` number (default 6, max 50)
- Returns: array of `{ bannerId, imagePath, imageAltTag, redirectLink }`

---

### Upcoming Cars
`GET /v1/home/upcoming-cars`
- `page` (default 1), `limit` (default 8)
- Internals: `isUpcoming=1`, `futureOnly=1`, `sortBy=launch_asc` via `ModelsService.list`
- Returns enriched model cards (see `MODULE_CARS.md` models list shape)

---

### Quick Look (popular/latest on-sale)
`GET /v1/home/quick-look`
- `type` `popular | latest` (default `popular`)
- `page` (default 1), `limit` (default 8)
- Internals: `isUpcoming=false`, sort by `type`
- Returns model cards

---

### Search By Body Type
`GET /v1/home/search-by-body-type`
- `bodyTypeId` (required)
- `isUpcoming` 0|1 (optional)
- `sortBy` `popular | latest | price_asc | price_desc | name_asc | name_desc` (default `popular`)
- `page` (default 1), `limit` (default 8)
- Returns model cards

---

### Search By Price Bucket
`GET /v1/home/search-by-price`
- `bucket` `UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L` (required)
- `isUpcoming` 0|1 (optional, default false)
- `sortBy` `popular | latest | price_asc | price_desc | name_asc | name_desc` (default `price_asc`)
- `page` (default 1), `limit` (default 8)
- Returns model cards

---

### Latest News (homepage widget)
`GET /v1/home/latest-news`
- `limit` (default 9, max 50)
- `excludeToday` 0|1 (default 1 → today card excluded)
- Returns news cards (see `MODULE_NEWS.md` / `MODULE_CONTENT.md`)

### Latest Expert Reviews
`GET /v1/home/latest-reviews`
- `limit` (default 6, max 50)
- `excludeToday` 0|1 (default 0 → today included)
- Returns review cards (content type: Expert Review)

### Latest Variant Explained
`GET /v1/home/latest-variant-explained`
- `limit` (default 6, max 50)
- `excludeToday` 0|1 (default 0)
- Returns variant-explained article cards

### Latest Videos (global)
`GET /v1/home/latest-videos`
- `limit` (default 9, max 50)
- No videoType filter (global latest)
- Returns video cards (see `MODULE_VIDEOS.md`)

---

## Response Shapes (references)
- Models: see `MODULE_CARS.md` (list response with brand, priceMin/Max, powertrain, image)
- News/Reviews/Variant Explained: see `MODULE_NEWS.md` or `MODULE_CONTENT.md`
- Videos: see `MODULE_VIDEOS.md`
