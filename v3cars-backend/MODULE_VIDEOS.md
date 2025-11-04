Per-type endpoints (slug-based)

Today (single card)

GET /v1/videos/reviews/today

GET /v1/videos/compare/today

GET /v1/videos/variant-explained/today

GET /v1/videos/more/today

GET /v1/videos/auto-expo/today

Latest list (optionally exclude today; default excludeToday=true)

GET /v1/videos/reviews/latest?limit=9

GET /v1/videos/compare/latest?limit=9&excludeToday=false

Trending (last_15days_view desc)

GET /v1/videos/reviews/trending?limit=9

Top (last_30days_view desc)

GET /v1/videos/reviews/top?limit=9

EV-scope (optional, kisi bhi upar wale pe laga sakte ho)

GET /v1/videos/reviews/latest?limit=9&fuelType=Electric

GET /v1/videos/compare/trending?limit=9&fuelType=Electric

Global latest (all types mixed)

GET /v1/videos/latest-global?limit=9

EV-scope:

GET /v1/videos/latest-global?limit=12&fuelType=Electric

Popular videos (global):

/v1/videos/popular?limit=5

/v1/videos/popular?limit=5&fuelType=Electric (EV scope)

by author add authorId params




