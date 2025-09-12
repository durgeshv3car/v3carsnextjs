# Module: Content (Unified — News, Reviews, Guides, etc.)

Generic content APIs for **all content types**. These power both `/v1/content/:type/*` and the legacy `/v1/news/*` routes.

**Type Map**

| `:type`             | contentType |
|---------------------|-------------|
| `news`              | 1 |
| `reviews`           | 2 |
| `variant-explained` | 3 |
| `comparison`        | 4 |
| `user-reviews`      | 5 |
| `features-explained`| 6 |
| `car-guide`         | 7 |
| `auto-expo`         | 8 |
| `press-release`     | 9 |

**Card Shape (ContentCard)**
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

---

## Endpoints

### Today
```
GET /v1/content/:type/today
```
- Picks most recent `publishDateandTime <= NOW()`.

### Latest
```
GET /v1/content/:type/latest?limit=9
# Optional: &excludeToday=0 (default excludes the today row)
```

### Trending
```
GET /v1/content/:type/trending?limit=9
# Ordered by last_15days_view DESC (per legacy PHP)
```

### Top
```
GET /v1/content/:type/top?limit=9
# Ordered by last_30days_view DESC (per legacy PHP)
```

---

## Notes

- `MEDIA_BASE_URL` builds absolute thumbnail URLs if set.
- Author + comment count hydration is shared.
- For `/v1/news/*`, the module simply delegates with `type=news` to keep backward compatibility.
