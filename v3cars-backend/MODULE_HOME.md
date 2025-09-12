# Module: Home (Homepage Sections)

All endpoints under **`/v1/home`**. These compose existing services for cards on the homepage.

---

## Upcoming Cars
Closest upcoming first (future-only).
```
GET /v1/home/upcoming-cars?limit=10&page=1
```
- Uses: `ModelsService.list` with `isUpcoming=1`, `futureOnly=1`, `sortBy=launch_asc`.
- Returns enriched model cards (brand, priceMin/Max, powerPS/torque/mileage, image).

---

## For Your Quick Look
Popular or latest cars (not upcoming).
```
GET /v1/home/quick-look?type=popular&limit=8&page=1
GET /v1/home/quick-look?type=latest&limit=8&page=1
```

---

## Search Car By Body Type
```
GET /v1/home/search-by-body-type?bodyTypeId=<ID>&limit=8&page=1
# Optional:
# &isUpcoming=1  (for upcoming view)
# &sortBy=popular|latest|price_asc|price_desc|name_asc|name_desc
```

---

## Search Car By Price
```
GET /v1/home/search-by-price?bucket=UNDER_5L&limit=8&page=1
# bucket: UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L
# Optional: &isUpcoming=0|1, &sortBy=price_asc|price_desc|popular|latest|name_asc|name_desc
```

---

## Latest Car News (Homepage)
```
GET /v1/home/latest-news?limit=9
# Optional: &excludeToday=0  (default excludes the 'today' card)
```
- Returns `NewsCard[]` from Content/News module (thumbnail absolute URL, author, comments count).

**Response shapes** match the underlying modules:
- Models → see `MODULE_CARS.md`
- News → see `MODULE_NEWS.md` (or generic `MODULE_CONTENT.md`)
