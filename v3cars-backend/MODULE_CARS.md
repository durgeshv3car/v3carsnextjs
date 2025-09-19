# Module: Cars (Brands, Models, Variants)

All endpoints are under **`/v1/cars`**. Example base URL: `http://localhost:3121`.

---

## Brands

**List**
```
GET /v1/cars/brands
```

**Query params**
- `q` — search in `brandName`/`brandSlug`
- `status` — numeric (`brandStatus`)
- `hasServiceNetwork` — `0|1`
- `brandType` — numeric
- `sortBy` — `popular | latest | name_asc | name_desc`
- `page`, `limit`

**Examples**
- List: `/v1/cars/brands?limit=12&page=1`
- Search: `/v1/cars/brands?q=maruti&limit=12&page=1`
- Popular: `/v1/cars/brands?sortBy=popular&limit=12&page=1`
- Latest: `/v1/cars/brands?sortBy=latest&limit=12&page=1`
- Filters: `/v1/cars/brands?status=1&hasServiceNetwork=1&brandType=0&limit=12&page=1`

---

## Models

**List**
```
GET /v1/cars/models
```x`

**Query params**
- `q` — search in `modelName`/`modelSlug`
- `isUpcoming` — `0|1`
- `futureOnly` — `0|1` (when `isUpcoming=1`, keeps only `launchDate >= today`)
- `brandId` — numeric
- `bodyTypeId` — numeric
- `priceBucket` — `UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L`
- `sortBy` — `launch_asc | latest | popular | price_asc | price_desc | name_asc | name_desc`
- `page`, `limit`
- `upcoming-monthly-count?months=12`
- `launchMonth=2025-0`
- `top-selling-month?year=2025&month=8`

**Examples**
- Upcoming (closest first): `/v1/cars/models?isUpcoming=1&futureOnly=1&sortBy=launch_asc&limit=10&page=1`  , by month count : `/v1/cars/models/upcoming-monthly-count?months=12`  , by month full data `/v1/cars/models?isUpcoming=1&launchMonth=2025-09&sortBy=launch_asc&limit=12&page=1`
- Recently launched (not upcoming): `/v1/cars/models?isUpcoming=0&sortBy=latest&limit=10&page=1`
- Popular SUVs 10–20L: `/v1/cars/models?bodyTypeId=<SUV_ID>&priceBucket=BETWEEN_10_20L&sortBy=popular&limit=12`

**Response item (enriched)**
```json
{
  "modelId": 444,
  "modelName": "Grand Vitara",
  "modelSlug": "grand-vitara",
  "brandId": 3,
  "modelBodyTypeId": 3,
  "isUpcoming": false,
  "launchDate": "2022-09-26T00:00:00.000Z",
  "totalViews": 899990,
  "expectedBasePrice": 0,
  "expectedTopPrice": 0,
  "brand": { "id": 3, "name": "Maruti Nexa", "slug": "maruti-nexa-cars", "logo": "6000853031maruti-suzuki-nexa-logo.png" },
  "priceMin": 1142000,
  "priceMax": 2052000,
  "powerPS": 90,
  "torqueNM": 113,
  "mileageKMPL": 21.11,
  "image": { "name": "grand-vitara-main.jpg", "alt": "Grand Vitara Front", "url": "https://cdn.example.com/grand-vitara-main.jpg" },
  "imageUrl": "https://cdn.example.com/grand-vitara-main.jpg"
}
```

---

## Variants

**List**
```
GET /v1/cars/variants
```

**Query params**
- `modelId` — **recommended** to scope variants
- `q` — search in `variantName`
- Price filters
  - `priceBucket` — `UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L`
  - `minPrice`, `maxPrice` — numbers (₹)
- Powertrain filters
  - `fuelType` — `Petrol|Diesel|CNG|EV`...
  - `transmissionType` — `MT|AT|AMT|DCT`...
- Sorting — `price_asc | price_desc | latest | name_asc | name_desc`
- `page`, `limit`

**Examples**
- By model: `/v1/cars/variants?modelId=163&limit=10&page=1`
- Search + price sort: `/v1/cars/variants?modelId=101&q=delta&sortBy=price_asc&limit=10&page=1`
- Fuel + Transmission: `/v1/cars/variants?modelId=101&fuelType=Petrol&transmissionType=AT&limit=10&page=1`
- Bucket: `/v1/cars/variants?modelId=101&priceBucket=BETWEEN_10_20L&sortBy=price_asc&limit=10&page=1`
- Numeric window: `/v1/cars/variants?modelId=101&minPrice=700000&maxPrice=1200000&limit=10&page=1`

**Response item**
```json
{
  "variantId": 177,
  "variantName": "S",
  "modelId": 105,
  "modelPowertrainId": 549,
  "variantPrice": "₹ 7.79 lakh",
  "updatedDate": "2025-05-19T17:52:30.000Z",
  "priceMin": 779000,
  "priceMax": 779000,
  "powertrain": { "id": 549, "fuelType": "Petrol", "transmissionType": "MT", "label": "1.5P MT" }
}
```

---

## Notes

- **Price fallback:** If model expected prices are 0/null, `priceMin/Max` come from parsed variant prices.
- **Images:** Hero image picked by priority: `isMainImage DESC`, `position_no ASC`, `imageId ASC` (model or variant image).  
- **MEDIA_BASE_URL:** set to build absolute image URLs.




