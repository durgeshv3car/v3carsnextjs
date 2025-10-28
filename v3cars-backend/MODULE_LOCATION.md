
`cities` -

Endpoints

GET /v1/locations/cities — list/paginated cities
Query params (optional):

page (default 1)

limit (default 50, max 100)

sortBy: name_asc | name_desc | latest | id_asc | popular (default name_asc)

q — name search (e.g., gur)

status — 0 | 1

stateId — number

countryId — number (your schema default 0)

isPopular — 1 | 0

isTop — 1 | 0

majorFuel — petrol | diesel | cng

GET /v1/locations/cities/:id — get single city by cityId

Common examples

Popular cities (alpha):

GET /v1/locations/cities?isPopular=1&status=1&limit=24&sortBy=name_asc


Typeahead / search:

GET /v1/locations/cities?q=gur&status=1&limit=10&sortBy=name_asc


By state:

GET /v1/locations/cities?stateId=6&status=1&limit=200&sortBy=name_asc


Fuel-major city lists:

GET /v1/locations/cities?majorFuel=cng&status=1&limit=100&sortBy=name_asc


“Popular first” ordering (no filter):

GET /v1/locations/cities?sortBy=popular&limit=100


Get by ID:

GET /v1/locations/cities/123

Sample cURL
# List (search + pagination)
curl "http://localhost:3121/v1/locations/cities?q=pur&page=1&limit=20&sortBy=name_asc"

# Popular grid
curl "http://localhost:3121/v1/locations/cities?isPopular=1&status=1&limit=24"

# Single city
curl "http://localhost:3121/v1/locations/cities/123"

Response shape (list)
{
  "success": true,
  "rows": [
    {
      "cityId": 1,
      "cityName": "Gurugram",
      "stateId": 6,
      "countryId": 0,
      "status": 1,
      "isPopularCity": 1,
      "isTopCity": 0,
      "ismajorCityPetrol": 1,
      "ismajorCityDiesel": 1,
      "ismajorCityCNG": 0,
      "isImage": "gurugram.webp"
    }
  ],
  "total": 120,
  "page": 1,
  "pageSize": 20,
  "totalPages": 6
}



`States`

List:
/v1/locations/states?limit=50&page=1&sortBy=name_asc

Search:
/v1/locations/states?q=pradesh&limit=50

By country:
/v1/locations/states?countryId=1&limit=100

Today-fuel flag:
/v1/locations/states?isTodayFuelPrice=1

Detail:
/v1/locations/states/7


`Countries`

List:
/v1/locations/countries?limit=100&page=1

Only active:
/v1/locations/countries?isActive=1

Search:
/v1/locations/countries?q=ind

Detail:
/v1/locations/countries/101



`Disrticts`

Search (q filter) in a state:

GET /v1/locations/districts?stateId=29&q=jaipur&limit=20&page=1


Only popular ranks (any of 1..4), ordered by rank then name:

GET /v1/locations/districts?stateId=29&popularAny=1&sortBy=popular_rank


Exact rank:

GET /v1/locations/districts?stateId=29&popularRank=1


Detail:

GET /v1/locations/districts/612