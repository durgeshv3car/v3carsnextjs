## Module: News (Legacy convenience)
Base path: `/v1/news` (delegates to Content with `contentType=1`).  
Response shape matches `ContentCard` (thumbnail, author, commentsCount).

Common query params:
- `limit` 1..50 (default 9)
- `excludeToday` `"1"|"0"` → boolean (Latest only, default exclude)
- `fuelType` string (optional, EV-scoped like Content)

---

### Today
`GET /v1/news/today`  
- Most recent published item up to DB `NOW()`  
- 204 No Content when none  
- Optional: `fuelType`

### Latest
`GET /v1/news/latest?limit=&excludeToday=`  
- Default: `limit=9`, `excludeToday=1`
- Optional: `fuelType`

### Trending
`GET /v1/news/trending?limit=`  
- Ordered by `last_15days_view DESC`
- Optional: `fuelType`

### Top
`GET /v1/news/top?limit=`  
- Ordered by `last_30days_view DESC`
- Optional: `fuelType`

### Popular
`GET /v1/news/popular?limit=`  
- Ordered by `uniqueUsers DESC`, published up to `NOW()`
- Optional: `fuelType`

---

Notes:
- Thumbnails are absolute when `MEDIA_BASE_URL` is set; otherwise raw path.
- Author + commentsCount hydrated in service layer.
- For type-agnostic APIs, use `/v1/content/:type/*` (see `MODULE_CONTENT.md`).
