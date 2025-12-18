
## Cars Module (Brands, Models, Variants)

Base path: `/v1/cars` (example: `http://localhost:3121/v1/cars`)

### Common
- Pagination: `page` (default 1), `limit` (default 12, max 100)
- Multi-select accepted as: comma-separated (`a,b`), repeated keys (`k=a&k=b`), or array style (`k[]=a&k[]=b`)
- Slug-or-id: every `:id` path can take numeric id or model slug (controller resolves)

---

## Brands
**List** — `GET /v1/cars/brands`
- `q` search brandName/brandSlug  
- `status` number (brandStatus)  
- `hasServiceNetwork` 0|1  
- `brandType` number  
- `sortBy` `popular | latest | name_asc | name_desc`  
- `page, limit`

Examples  
- `/v1/cars/brands?limit=12&page=1`  
- `/v1/cars/brands?q=maruti&sortBy=popular&page=1`  
- `/v1/cars/brands?status=1&hasServiceNetwork=1&brandType=0&page=1`

**Detail** — `GET /v1/cars/brands/:id`

**Discontinued models** — `GET /v1/cars/brands/:id/discontinued-models`
---


## Models
### List — `GET /v1/cars/models`
Filters:
- Text/search: `q`
- Status/date: `isUpcoming` 0|1, `futureOnly` 0|1 (keep launchDate >= today when upcoming)
- Brand/body: `brandId`, `brandIds`, `bodyTypeId`, `bodyTypeIds`
- Price: `priceBucket` (`UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L`), `minPrice`, `maxPrice`
- Sort: `launch_asc | latest | popular | price_asc | price_desc | name_asc | name_desc`
- Launch window: `launchMonth (YYYY-MM)`, `launchFrom (date)`, `launchTo (date)`
- Powertrain/spec: `fuelType`, `transmissionType`, `cylinders` or `cylindersList` (`2,3,4,5,6,7,8_PLUS`), `mileage` (`UNDER_10 | BETWEEN_10_15 | ABOVE_15`), `engineDisplacement` (`800 | 1000 | 800_1000 | 1000_1500 | 1500_2000 | 2000_3000 | 3000_4000 | ABOVE_4000`), `seating` or `seatingList`
- Pagination: `page`, `limit`

Examples:
- Upcoming soon: `/v1/cars/models?isUpcoming=1&futureOnly=1&sortBy=launch_asc&page=1`
- Recent launches: `/v1/cars/models?isUpcoming=0&sortBy=latest&page=1`
- Popular SUVs 10–20L: `/v1/cars/models?bodyTypeId=<SUV_ID>&priceBucket=BETWEEN_10_20L&sortBy=popular`
- Multi-select: `/v1/cars/models?brandIds=12,15&bodyTypeIds=1,3&cylindersList=4,6&seatingList=5,7`

### Analytics
- `GET /v1/cars/models/upcoming-monthly-count` — `months` (1–24, default 12), `brandId`, `bodyTypeId`
- `GET /v1/cars/models/top-selling-month` — `year` (required), `month` (required), `limit` (default 25, max 100)

### Compare (by variantIds)
- `GET /v1/cars/models/compare`
- Query: `variantIds` (comma-separated, required), `cityId` (optional)
- Returns: `items[]` (comparison blocks) + `expertVerdict` (dynamic verdict lines)

Example:
- `/v1/cars/models/compare?variantIds=3235,3234&cityId=1489`

### Detail (id or slug)
- `GET /v1/cars/models/:id` — core model detail

### Price list
- `GET /v1/cars/models/:id/price-list`
- Query: `fuelType`, `transmissionType`, `priceType` (`ex|onroad|csd`, default ex), `cityId`, `citySlug` (required for onroad/csd), `expandVariantId`, `variantId`, `isLoan` 0|1, `sortBy` (`price_asc|price_desc|latest|name_asc|name_desc`), `page`, `limit`

### Best variant to buy
- `GET /v1/cars/models/:id/best-variant-to-buy`
- Query: `powertrainId`, `fuelType`, `transmissionType`, `detailed` 0|1|true|false

### Dimensions & capacity
- `GET /v1/cars/models/:id/dimensions-capacity`
- Query: `detailed` 0|1 (when true also returns tyre-by-variant), `fuelType`, `transmissionType`

### Mileage, specs, features
- `GET /v1/cars/models/:id/mileage-specs-features`
- Query: `powertrainId` (optional)

### Pros & cons
- `GET /v1/cars/models/:id/pros-cons`

### Competitors
- `GET /v1/cars/models/:id/competitors`

### Segment compare carousel (same segment cars)
- `GET /v1/cars/models/:id/segment-compare`
- Query: `page`, `limit`
- Response pagination: `page`, `pageSize`, `total`, `totalPages` (no hasPrev/hasNext)

Example:
- `/v1/cars/models/venue/segment-compare?page=1&limit=12`

### Fuel efficiency table
- `GET /v1/cars/models/:id/fuel-efficiency`
- Query: `fuelType`, `transmissionType`

### CSD vs On-road price compare
- `GET /v1/cars/models/:id/csd-vs-onroad`
- Query: **cityId (required)**, `fuelType`, `transmissionType`, `expandVariantId`, `isLoan` 0|1

### Offers & discounts
- `GET /v1/cars/models/:id/offers-discounts`
- Query: `cityId`, `expandQID`, `month (YYYY-MM)`, `months` (range, default 12)

### Monthly sales
- `GET /v1/cars/models/:id/monthly-sales`
- Query: `months` (default 6, max 24)

### Related lists
- Upcoming in same brand: `GET /v1/cars/models/:id/upcoming-cars?limit=5`
- Other on-sale models: `GET /v1/cars/models/:id/others-cars?limit=5`

### Service cost
- Overall: `GET /v1/cars/models/:id/service-cost`
- Powertrain-wise schedule: `GET /v1/cars/models/:id/pow-wise-service-cost?mpId=<modelPowertrainId>`

### Colours 
- `GET /v1/cars/models/:id/colours`

### Image gallery
- `GET /v1/cars/models/:id/images`
- Query: `type` (`all|interior|exterior|other`), `limit` (max 2000)

### Segment top-selling
- `GET /v1/cars/models/segments/:segment/top-selling`
- `segment` can be id or name (e.g., `C3`)
- Query: `year`, `month`, `limit`

### Powertrains model wise
- `GET /v1/cars/models/:id/powertrains`

---

## Variants
**List** — `GET /v1/cars/variants`
- `modelId` (recommended)
- `q` — search `variantName`
- Powertrain:
  - `powertrainId` (modelPowertrainId — highest priority if present)
  - `fuelType`
  - `transmissionType`
- Price:  
  - `priceBucket` (`UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L`)  
  - `minPrice`, `maxPrice`
- Sort: `price_asc | price_desc | latest | name_asc | name_desc`
- Pagination: `page`, `limit`
 

Examples:
- `/v1/cars/variants?modelId=163&page=1`
- `/v1/cars/variants?modelId=101&q=delta&sortBy=price_asc`
- `/v1/cars/variants?modelId=101&fuelType=Petrol&transmissionType=AT`
- `/v1/cars/variants?modelId=101&powertrainId=456`
- `/v1/cars/variants?modelId=101&priceBucket=BETWEEN_10_20L`
- `/v1/cars/variants?modelId=101&minPrice=700000&maxPrice=1200000`

**Detail** — `GET /v1/cars/variants/:id`

---

## Notes & Behaviors
- Multi-select: `brandIds`, `bodyTypeIds`, `cylindersList`, `seatingList` accept comma, repeated, or array styles; validators normalize.
- Engine displacement filter maps to `tblmodelpowertrains.cubicCapacity`; use keys shown above.
- Cylinders: use `8_PLUS` for 8 or more.
- Seating: `seating` (single) or `seatingList` (multi).
- Price fallback: when model expected prices are 0/null, `priceMin/priceMax` come from parsed variant prices.
- Images: hero chosen by priority `isMainImage DESC`, `position_no ASC`, `imageId ASC`; URLs built with `MEDIA_BASE_URL` when set.






