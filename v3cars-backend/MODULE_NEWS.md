# Module: News (Legacy Convenience Endpoints)

News endpoints live under **`/v1/news`** but internally delegate to the **Content** module with `contentType=1`.
Response shape is a **News card** with thumbnail, author and comments count.

---

## Today
```
GET /v1/news/today
```
- Most recent published item up to DB `NOW()`.
- Returns a single object or `204 No Content` when none.

**Response**
```json
{
  "success": true,
  "data": {
    "id": 9266,
    "title": "Title...",
    "pageUrl": "slug-or-url",
    "publishDateandTime": "2025-09-11T09:00:00.000Z",
    "shortDescription": "...",
    "thumbnail": { "url": "https://cdn.../thumb.webp", "alt": "..." },
    "author": { "id": 4, "name": "Mahesh Yadav", "slug": "mahesh-yadav" },
    "commentsCount": 0
  }
}
```

---

## Latest
```
GET /v1/news/latest?limit=9
# Optional: &excludeToday=0 (default excludes the today item)
```

## Trending
```
GET /v1/news/trending?limit=9
# Ordered by last_15days_view DESC
```

## Top
```
GET /v1/news/top?limit=9
# Ordered by last_30days_view DESC
```

**Notes**
- Thumbnail URLs are absolute if `MEDIA_BASE_URL` is set, otherwise raw file/path is returned.
- Author and comments are hydrated in service layer.
