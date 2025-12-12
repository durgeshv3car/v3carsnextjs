## Locations (Countries, States, Districts, Cities)
Base path: /v1/locations

---

### Cities
GET /v1/locations/cities
- Params: page (default 1), limit (default 50, max 100), sortBy id_asc | latest | name_asc | name_desc | popular (default name_asc)
- Filters: q, status, stateId, countryId, isPopular 0|1, isTop 0|1, majorFuel petrol|diesel|cng
GET /v1/locations/cities/:id

Examples:
- /v1/locations/cities?isPopular=1&status=1&limit=24&sortBy=name_asc
- /v1/locations/cities?q=gur&status=1&limit=10&sortBy=name_asc
- /v1/locations/cities?stateId=6&limit=200&sortBy=name_asc

### States
GET /v1/locations/states
- Params: q, countryId, isTodayFuelPrice 0|1, page, limit (max 100), sortBy 
ame_asc | latest | id_asc | id_desc
GET /v1/locations/states/:id

### Countries
GET /v1/locations/countries
- Params: q, isActive 0|1, page, limit (max 100), sortBy 
ame_asc | latest | id_asc | id_desc
GET /v1/locations/countries/:id

### Districts
GET /v1/locations/districts
- Params: page (default 1), limit (max 100), sortBy id_asc | latest | name_asc | name_desc | popular_rank (default name_asc)
- Filters: q, stateId, popularAny 0|1, popularRank 1|2|3|4
GET /v1/locations/districts/:id

Examples:
- /v1/locations/districts?stateId=29&q=jaipur&limit=20
- /v1/locations/districts?stateId=29&popularAny=1&sortBy=popular_rank
- /v1/locations/districts/612