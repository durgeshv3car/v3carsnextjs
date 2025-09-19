



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