Module: Cars (Brands, Models, Variants)

All endpoints are under /v1/cars. Example base URL: http://localhost:3121.

Brands

List

GET /v1/cars/brands

Query params

q — search in brandName/brandSlug

status — numeric (brandStatus)

hasServiceNetwork — 0|1

brandType — numeric

sortBy — popular | latest | name_asc | name_desc

page, limit

Examples

List: /v1/cars/brands?limit=12&page=1

Search: /v1/cars/brands?q=maruti&limit=12&page=1

Popular: /v1/cars/brands?sortBy=popular&limit=12&page=1

Latest: /v1/cars/brands?sortBy=latest&limit=12&page=1

Filters: /v1/cars/brands?status=1&hasServiceNetwork=1&brandType=0&limit=12&page=1

Models

List

GET /v1/cars/models


Query params (summary)

q — search in modelName/modelSlug

isUpcoming — 0|1

futureOnly — 0|1 (when isUpcoming=1, keeps only launchDate >= today)

brandId — numeric (single)

brandIds — multi-select (comma / repeated / array style)

bodyTypeId — numeric (single)

bodyTypeIds — multi-select (comma / repeated / array style)

priceBucket — UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L

minPrice, maxPrice — numeric (₹)

sortBy — launch_asc | latest | popular | price_asc | price_desc | name_asc | name_desc

page, limit

futureOnly, launchMonth, launchFrom, launchTo as before

Powertrain / spec filters (service-level)

fuelType — string (e.g., Petrol, Diesel, CNG, Electric, case-insensitive contains)

transmissionType — string (e.g., Manual, Automatic, DCT, AMT)

cylinders — single (e.g., 4) or

cylindersList — multi-select (e.g., 4,6 or repeated cylindersList=4&cylindersList=6). Allowed values: 2,3,4,5,6,7,8_PLUS (use 8_PLUS for 8 and above).

mileage — one of UNDER_10 | BETWEEN_10_15 | ABOVE_15 (matches claimedFE OR realWorldMileage)

engineDisplacement — single key mapping to tblmodelpowertrains.cubicCapacity (DB column used is cubicCapacity in cc). Allowed keys:

800 (<= 800)

1000 (== 1000)

800_1000 (800–1000)

1000_1500 (1000–1500)

1500_2000 (1500–2000)

2000_3000 (2000–3000)

3000_4000 (3000–4000)

ABOVE_4000 (>= 4000)

Note: engineDisplacement is currently single-valued (if you want multi-select for displacement, we can extend it).

seating — single (numeric, matches tblmodels.seats) or

seatingList — multi-select (comma / repeated / array style), e.g. seatingList=5,7

Accepted formats for multi-select params
The API accepts multi-select values in all three common shapes (validators normalize them):

comma-separated: brandIds=12,15,20

repeated keys: brandIds=12&brandIds=15&brandIds=20

array-style: brandIds[]=12&brandIds[]=15
This applies to brandIds, bodyTypeIds, cylindersList, seatingList etc.

Examples

Upcoming (closest first):
/v1/cars/models?isUpcoming=1&futureOnly=1&sortBy=launch_asc&limit=10&page=1

Recently launched (not upcoming):
/v1/cars/models?isUpcoming=0&sortBy=latest&limit=10&page=1

Popular SUVs 10–20L:
/v1/cars/models?bodyTypeId=<SUV_ID>&priceBucket=BETWEEN_10_20L&sortBy=popular&limit=12

Multi-select examples

Comma-separated (brands, body types, cylinders, seating):

GET /v1/cars/models?priceBucket=BETWEEN_5_10L&page=1&limit=12&sortBy=popular
&brandIds=12,15,20
&bodyTypeIds=1,3
&cylindersList=4,6
&seatingList=5,7
&mileage=BETWEEN_10_15
&transmissionType=Manual

One-line:

http://localhost:3121/v1/cars/models?priceBucket=BETWEEN_5_10L&page=1&limit=12&sortBy=popular&brandIds=12,15,20&bodyTypeIds=1,3&cylindersList=4,6&seatingList=5,7&mileage=BETWEEN_10_15&transmissionType=Manual


Repeated keys (Express will parse into arrays):

http://localhost:3121/v1/cars/models?brandIds=12&brandIds=15&brandIds=20&bodyTypeIds=1&bodyTypeIds=3&cylindersList=4&cylindersList=6&seatingList=5&seatingList=7&fuelType=Petrol


Array-style ([]):

http://localhost:3121/v1/cars/models?brandIds[]=12&brandIds[]=15&bodyTypeIds[]=1&cylindersList[]=4&seatingList[]=5


Response item (enriched)

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

Variants

List

GET /v1/cars/variants

Query params

modelId — recommended to scope variants

q — search in variantName

Price filters

priceBucket — UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L

minPrice, maxPrice — numbers (₹)

Powertrain filters

fuelType — Petrol|Diesel|CNG|EV...

transmissionType — MT|AT|AMT|DCT...

Sorting — price_asc | price_desc | latest | name_asc | name_desc

page, limit

Examples

By model: /v1/cars/variants?modelId=163&limit=10&page=1

Search + price sort: /v1/cars/variants?modelId=101&q=delta&sortBy=price_asc&limit=10&page=1

Fuel + Transmission: /v1/cars/variants?modelId=101&fuelType=Petrol&transmissionType=AT&limit=10&page=1

Bucket: /v1/cars/variants?modelId=101&priceBucket=BETWEEN_10_20L&sortBy=price_asc&limit=10&page=1

Numeric window: /v1/cars/variants?modelId=101&minPrice=700000&maxPrice=1200000&limit=10&page=1

Response item

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

Notes

Multi-select formats accepted: comma-separated (a,b,c), repeated query keys (k=a&k=b), or array-style (k[]=a&k[]=b). Validators normalize them to arrays server-side.

Engine displacement → cubicCapacity: Frontend uses engineDisplacement keys (e.g., 1000_1500) — server maps these to the DB column tblmodelpowertrains.cubicCapacity (cc). This fixes filters which previously targeted engineDisplacement.

Cylinders: Use 8_PLUS to indicate 8 or more cylinders.

Seating: seating (single) or seatingList (multi).

Price fallback: If model expected prices are 0/null, priceMin/Max come from parsed variant prices.

Images: Hero image picked by priority: isMainImage DESC, position_no ASC, imageId ASC (model or variant image).

MEDIA_BASE_URL: set to build absolute image URLs.



