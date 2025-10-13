Module: Home (Homepage Sections)

All endpoints under /v1/home. These compose existing services for cards on the homepage.

Upcoming Cars

Closest upcoming first (future-only).

GET /v1/home/upcoming-cars?limit=10&page=1

Uses: ModelsService.list with isUpcoming=1, futureOnly=1, sortBy=launch_asc.

Returns enriched model cards (brand, priceMin/Max, powerPS/torque/mileage, image).

For Your Quick Look

Popular or latest cars (not upcoming).

GET /v1/home/quick-look?type=popular&limit=8&page=1
GET /v1/home/quick-look?type=latest&limit=8&page=1

Search Car By Body Type
GET /v1/home/search-by-body-type?bodyTypeId=<ID>&limit=8&page=1
# Optional:
# &isUpcoming=1
# &sortBy=popular|latest|price_asc|price_desc|name_asc|name_desc

Search Car By Price
GET /v1/home/search-by-price?bucket=UNDER_5L&limit=8&page=1
# bucket: UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L
# Optional: &isUpcoming=0|1, &sortBy=price_asc|price_desc|popular|latest|name_asc|name_desc

Latest Car News (Homepage)
GET /v1/home/latest-news?limit=9

# Optional: &excludeToday=0  (default = 1, i.e., excludes the 'today' card)

Returns NewsCard[] from Content/News module (thumbnail absolute URL, author, comments count).

Expert Car Reviews (Homepage)
GET /v1/home/latest-reviews?limit=6

# Optional: &excludeToday=0|1 (default = 0; includes today)

Source: Reviews (content type = Expert Reviews).

Shape: same as NewsCard (title, pageUrl, publishDateandTime, thumbnail, author, commentsCount).

Variants Explained (Homepage)
GET /v1/home/latest-variant-explained?limit=6

# Optional: &excludeToday=0|1 (default = 0; includes today)

Source: Content type = Variant Explained.

Shape: same as NewsCard.

Latest Videos (Homepage)
GET /v1/home/latest-videos?limit=9

Global latest videos (no videoType filter).

Shape: video card (videoId, video_title, pageUrl, video_thumbnail, videoYId, author, dateTimePublishing).

Response Shapes

Models → see MODULE_CARS.md

News/Reviews/Variant Explained → see MODULE_NEWS.md or generic MODULE_CONTENT.md

Videos → see MODULE_VIDEOS.md





