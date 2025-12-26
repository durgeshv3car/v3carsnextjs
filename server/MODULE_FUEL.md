## Fuel Prices (Petrol/Diesel/CNG)
Base path: /v1/fuel

Fuel types: 1=Petrol, 2=Diesel, 3=CNG

---

### Metros snapshot/history
GET /v1/fuel/metros
- Params: fuelType (optional 1|2|3), days (optional 1..90)
- No days: latest + previous delta for metros (Delhi=612, Chennai=353, Mumbai=280, Kolkata=465); combined or per-fuel.
- With days: per-city history (single-fuel flat list, or grouped petrol/diesel/cng when fuelType not passed).
Examples: /v1/fuel/metros, /v1/fuel/metros?fuelType=1, /v1/fuel/metros?fuelType=2&days=7, /v1/fuel/metros?days=10

### Latest price (city/state)
GET /v1/fuel/price/latest
- Params: fuelType (required) and one of cityId | districtId | stateId (city/district auto-mapped to district)
- Returns: scope (district/state), price, prevPrice, change, updatedAt

### Latest popular cities in a state
GET /v1/fuel/price/latest/popular
- Params: fuelType (required), stateId (required)

### History (single fuel)
GET /v1/fuel/price/history
- Params: fuelType (required), one of cityId | districtId | stateId, days (default 10, max 90)

### State list (single fuel)
GET /v1/fuel/states
- Params: fuelType (required), q, sortBy 
ame_asc | price_desc | price_asc, page, limit (max 100)

### City list within a state
GET /v1/fuel/cities
- Params: fuelType (required), stateId (required), q, sortBy 
ame_asc | price_desc | price_asc, popular 0|1, page, limit (max 100)

### State-wise combined (all fuels)
GET /v1/fuel/states/combined
- Params: q, page, limit (max 100)
- Returns petrol/diesel/cng in one row

### Combined history (all fuels)
GET /v1/fuel/price/history/combined
- Params: stateId or districtId (one required), days (default 10, max 90)

### Monthly trends (single fuel)
GET /v1/fuel/monthly/trends
- Params: fuelType (required), districtId or cityId (one required), months (default 6, max 24)

---

FAQ (fuel module):
/v1/faqs?moduleId=16&pageType=1&fuelType=1&limit=50&page=1

