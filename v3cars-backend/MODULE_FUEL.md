Fuel Prices module (Petrol/Diesel/CNG) — latest price, previous day delta, listings, and last-N-days history for states and cities.

Conventions

Fuel types
1 = Petrol, 2 = Diesel, 3 = CNG

IDs

stateId ⇒ from tblstates.stateId

districtId (city) ⇒ from tblcities.cityId

Dates

History groups by date (day). If multiple updates exist on the same day, we take the latest of that day.

Caching

Most list/history endpoints cached for 5–10 minutes (in-memory or Redis, depending on your env).

Endpoints
1) Latest price (single value) + previous-day delta
a) By City (district)
GET /v1/fuel/price/latest?fuelType={1|2|3}&districtId=<CITY_ID>

Response

{
  "success": true,
  "data": {
    "districtId": 145,
    "stateId": 27,
    "price": 97.45,
    "prevPrice": 97.30,
    "change": 0.15,
    "stateName": "Maharashtra",
    "cityName": "Ahmedabad",
    "updatedAt": "2025-09-26T00:00:00.000Z"
  }
}


b) By State
GET /v1/fuel/price/latest?fuelType={1|2|3}&stateId=<STATE_ID>

Response shape is the same as city.

2) Latest listing (table) with previous-day delta
a) States list (one fuel)
GET /v1/fuel/states?fuelType={1|2|3}&page=1&limit=50&sortBy={name_asc|name_desc|price_asc|price_desc}&q=<search>

q filters by state name (contains)

Default sort: name_asc

Response

{
  "success": true,
  "rows": [
    { "stateId": 27, "stateName": "Maharashtra", "price": 97.45, "prevPrice": 97.30, "change": 0.15, "updatedAt": "2025-09-26T00:00:00.000Z" }
  ],
  "page": 1, "pageSize": 50, "total": 36, "totalPages": 1
}

b) Cities list within a state (one fuel)
GET /v1/fuel/cities?fuelType={1|2|3}&stateId=<STATE_ID>&page=1&limit=50&sortBy={name_asc|name_desc|price_asc|price_desc}&q=<search>

q filters by city name (contains)

Default sort: name_asc

Response

{
  "success": true,
  "rows": [
    { "districtId": 145, "cityName": "Ahmedabad", "stateId": 27, "price": 97.45, "prevPrice": 97.30, "change": 0.15, "updatedAt": "2025-09-26T00:00:00.000Z" }
  ],
  "page": 1, "pageSize": 50, "total": 120, "totalPages": 3
}

c) States list — all three fuels in one row
GET /v1/fuel/states/combined?page=1&limit=50&q=<search>

Response

{
  "success": true,
  "rows": [
    {
      "stateId": 27,
      "stateName": "Maharashtra",
      "petrol": 97.45, "petrolPrev": 97.30, "petrolChange": 0.15,
      "diesel": 89.12, "dieselPrev": 89.12, "dieselChange": 0.00,
      "cng": 76.20,   "cngPrev": 76.00,   "cngChange": 0.20,
      "updatedAt": "2025-09-26T00:00:00.000Z"
    }
  ],
  "page": 1, "pageSize": 50, "total": 36, "totalPages": 1
}

Note: We currently provide combined states listing. If you also want combined cities listing, tell me and I’ll add it similarly.

3) History (last N days)
a) Single fuel — State-wise
GET /v1/fuel/price/history?fuelType={1|2|3}&stateId=<STATE_ID>&days=10

b) Single fuel — City-wise
GET /v1/fuel/price/history?fuelType={1|2|3}&districtId=<CITY_ID>&days=10

Response

{
  "success": true,
  "rows": [
    { "day": "2025-09-17", "price": 97.30 },
    { "day": "2025-09-18", "price": 97.45 }
  ]
}

c) All three fuels together — State-wise
GET /v1/fuel/price/history/combined?stateId=<STATE_ID>&days=10

d) All three fuels together — City-wise
GET /v1/fuel/price/history/combined?districtId=<CITY_ID>&days=10

Response

{
  "success": true,
  "rows": [
    {
      "day": "2025-09-17",
      "petrol": 97.30, "petrolChange": null,
      "diesel": 89.12, "dieselChange": null,
      "cng": 76.00,    "cngChange": null
    },
    {
      "day": "2025-09-18",
      "petrol": 97.45, "petrolChange": 0.15,
      "diesel": 89.12, "dieselChange": 0.00,
      "cng": 76.20,    "cngChange": 0.20
    }
  ]
}

...Change = today minus previous day for that fuel (first row shows null as no previous).

Quick Examples

Latest   Petrol in Delhi (state)       

/v1/fuel/price/latest?fuelType=1&stateId=11

Latest Diesel in Mumbai (city)

/v1/fuel/price/latest?fuelType=2&districtId=145                          

States list for CNG (page 1, 50 per page, price high→low)

/v1/fuel/states?fuelType=3&page=1&limit=50&sortBy=price_desc

Cities in Gujarat for Petrol (search "Ahme")

/v1/fuel/cities?fuelType=1&stateId=24&q=Ahme

States list (all 3 fuels)

/v1/fuel/states/combined?page=1&limit=50

Last 10 days Petrol in Maharashtra (state history)

/v1/fuel/price/history?fuelType=1&stateId=27&days=10

Last 10 days (all fuels) for Ahmedabad (city history)

/v1/fuel/price/history/combined?districtId=145&days=10

Error Codes

400 — missing/invalid query params (e.g., no fuelType, neither stateId nor districtId, invalid days)

204 — latest not found (no data yet)

200 — success (success: true with payload)

Notes / Extensibility

Need combined cities listing (all 3 fuels per city)?
We can add: GET /v1/fuel/cities/combined?stateId=<STATE_ID>&page=1&limit=50&q=<search>.
                                                                                                        
Want weekly/monthly aggregates? We can extend history to group by week/month easily.                      

TTLs adjustable in fuel.service.ts (look for ttlMs).







