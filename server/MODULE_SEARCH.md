# Search Module (Universal Search)

Base path: `/v1/search`

## Endpoint

- `GET /v1/search/universal`
  - **Query params**
    - `q` (string, required, min 2 chars) — user query; only first token is used for matching (prefix + contains).
    - `citySlug` (string, optional) — used to build city-specific URLs; default `delhi` if absent.
    - `cityName` (string, optional) — label for city-specific suggestions; fallback is `citySlug` with dashes replaced.
    - `limit` (int, optional, default 20, max 50) — trims the returned suggestions after deduping.
  - **Response**
    ```json
    {
      "success": true,
      "query": "tata nex",
      "rows": [
        { "type": "brand", "label": "Tata", "href": "/tata", "id": 15 },
        { "type": "model", "label": "Tata Nexon", "href": "/tata/nexon", "id": 163, "brandId": 15 },
        { "type": "model_page", "subType": "onroad", "label": "Tata Nexon On-Road Price", "href": "/tata/nexon/on-road-price-in-delhi", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "priceInCity", "label": "Tata Nexon Price in Delhi", "href": "/tata/nexon/price-in-delhi", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "specs", "label": "Tata Nexon Specifications", "href": "/tata/nexon/engine-specifications", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "dimensions", "label": "Tata Nexon Dimensions", "href": "/tata/nexon/dimensions", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "mileage", "label": "Tata Nexon Mileage", "href": "/tata/nexon/mileage", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "reviews", "label": "Tata Nexon Reviews", "href": "/tata/nexon/reviews", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "videos", "label": "Tata Nexon Videos", "href": "/tata/nexon/videos", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "news", "label": "Tata Nexon News", "href": "/tata/nexon/news", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "competitors", "label": "Tata Nexon Comparison", "href": "/tata/nexon/competitors", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "images", "label": "Tata Nexon Images", "href": "/tata/nexon/images", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "colors", "label": "Tata Nexon Colors", "href": "/tata/nexon/colors", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "offers", "label": "Tata Nexon Offers & Discounts", "href": "/tata/nexon/offers-discounts", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "monthlySales", "label": "Tata Nexon Monthly Sales", "href": "/tata/nexon/monthly-sales", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "csd", "label": "Tata Nexon CSD Price", "href": "/tata/nexon/csd-price", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "whichVariant", "label": "Tata Nexon Which Variant To Buy", "href": "/tata/nexon/which-variant-to-buy", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "maintenance", "label": "Tata Nexon Maintenance Cost", "href": "/tata/nexon/maintenance-cost", "modelId": 163, "brandId": 15 },
        { "type": "model_page", "subType": "costOfOwnership", "label": "Tata Nexon Cost Of Ownership", "href": "/tata/nexon/cost-of-ownership", "modelId": 163, "brandId": 15 }
      ]
    }
    ```

## Behavior & Notes
- Matching uses only the first token of `q` for speed (prefix + contains).
- Models filter out `isUpcoming = 2` and deleted rows.
- URLs are pre-shaped for frontend routing (`/[brandSlug]/[modelSlug]/...`).
- `citySlug` and `cityName` shape the city-specific labels/links; default `delhi`.
- Cache: Redis/in-memory via `withCache`, TTL 60s, key `ns=search:universal, v=3, q, citySlug, limit`.

## Hotspots / Index Suggestions
- Add DB indexes on: `tblbrands.brandSlug`, `tblbrands.brandName`, `tblmodels.modelSlug`, `tblmodels.modelName`, `tblmodels.totalViews`.

