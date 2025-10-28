Module: Content (Unified — News, Reviews, Guides, etc.)

Generic content APIs for all content types. These power both /v1/content/:type/* and the legacy /v1/news/* routes.

Type Map
:type	contentType
news	1
reviews	2
variant-explained	3
comparison	4
user-reviews	5
features-explained	6
car-guide	7
auto-expo	8
press-release	9
Card Shape (ContentCard)
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

MEDIA_BASE_URL (env) is used to convert relative thumbnailUrl to absolute.

Common query params

limit — integer (1..50), default 9

excludeToday — "1" or "0" (boolean), default "1" (i.e., exclude today) — applies to Latest only

fuelType — string (optional). Example: Electric
When provided, results are EV-scoped using modelTagging (models having at least one powertrain with the given fuel type). Internally, we resolve EV models via powertrains, then match modelTagging in content.

Endpoints
1) Today
GET /v1/content/:type/today
# Picks most recent row with publishDateandTime <= NOW()
# Optional: ?fuelType=Electric

Examples

News today: /v1/content/news/today

EV News today: /v1/content/news/today?fuelType=Electric

Expert Review today: /v1/content/reviews/today

2) Latest
GET /v1/content/:type/latest?limit=9&excludeToday=1
# Ordered by publishDateandTime DESC, id DESC
# Optional: &fuelType=Electric



Examples

Latest News (default): /v1/content/news/latest?limit=9

Latest News including today: /v1/content/news/latest?excludeToday=0

Latest Expert Reviews: /v1/content/reviews/latest?limit=9

Latest Comparison Reviews: /v1/content/comparison/latest?limit=9

Latest EV Reviews: /v1/content/reviews/latest?limit=9&fuelType=Electric

3) Trending
GET /v1/content/:type/trending?limit=9
# Ordered by last_15days_view DESC (legacy behavior)
# Optional: &fuelType=Electric

Examples

Trending News: /v1/content/news/trending?limit=9

Trending Expert Reviews: /v1/content/reviews/trending?limit=9

Trending EV News: /v1/content/news/trending?limit=9&fuelType=Electric

4) Top
GET /v1/content/:type/top?limit=9
# Ordered by last_30days_view DESC (legacy behavior)
# Optional: &fuelType=Electric

Examples

Top News: /v1/content/news/top?limit=9

Top Expert Reviews: /v1/content/reviews/top?limit=9

Top EV News: /v1/content/news/top?limit=9&fuelType=Electric

5) Popular (🆕)
GET /v1/content/:type/popular?limit=9
# Ordered by uniqueUsers (NumView) DESC
# Optional: &fuelType=Electric  (EV scope via modelTagging and powertrains)

Examples

Popular News: /v1/content/news/popular?limit=5

Popular EV News: /v1/content/news/popular?limit=5&fuelType=Electric

Legacy News Aliases (backward compatible)

Exactly same response shape & params, fixed type=news:

Today: /v1/news/today (optional ?fuelType=Electric)

Latest: /v1/news/latest?limit=9&excludeToday=1 (optional &fuelType=Electric)

Trending: /v1/news/trending?limit=9 (optional &fuelType=Electric)

Top: /v1/news/top?limit=9 (optional &fuelType=Electric)

Popular (new): /v1/news/popular?limit=5 (optional &fuelType=Electric)

Notes

Database time (NOW()) is used to include only published rows up to “now” for Today/Latest.

Author and commentsCount are hydrated for all lists.

fuelType (e.g., Electric) works when content is tagged with model IDs in modelTagging. We resolve models with the given fuel type via powertrains and filter content accordingly.

Need other scoping (e.g., by brand/model explicitly)? We can extend with brandId/modelId params later.

Extra Examples

EV reviews:
/v1/content/reviews/latest?fuelType=Electric&limit=9&excludeToday=0

EV videos (videos module):
/v1/videos/latest?limit=10&fuelType=Electric
