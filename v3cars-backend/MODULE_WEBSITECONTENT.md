All endpoints under /v1/website-content

Endpoints
1) List (with search + paging + sorting)
GET /v1/website-content?moduleId=1&limit=20&page=1&q=privacy&sortBy=latest

Query params

moduleId (required, number): filter by module.

q (optional, string): full-text contains on title or description.

page (optional, number, min 1, default 1)

limit (optional, number, 1..100, default 50)

sortBy (optional, enum):

latest (default) → createdAt DESC, id DESC

title_asc → title ASC, id ASC

title_desc → title DESC, id DESC

id_asc / id_desc
  
Response

{
  "success": true,
  "rows": [
    {
      "id": 12,
      "moduleId": 1,
      "title": "Privacy Policy",
      "description": "<p>...</p>",
      "createdAt": "2025-09-10T11:20:00.000Z",
      "updatedAt": "2025-09-10T11:20:00.000Z"
    }
  ],
  "total": 37,
  "page": 1,
  "pageSize": 20,
  "totalPages": 2
}

Caching

Page 1: 30 minutes

Page >1: 15 minutes

Cache key:

websiteContent:list:v1:
  moduleId=<id>|page=<n>|limit=<n>|sortBy=<key>|q=<term?>

2) Detail by ID
GET /v1/website-content/:id

Response

{
  "success": true,
  "data": {
    "id": 12,
    "moduleId": 1,
    "title": "Privacy Policy",
    "description": "<p>...</p>",
    "createdAt": "2025-09-10T11:20:00.000Z",
    "updatedAt": "2025-09-10T11:20:00.000Z"
  }
}

Caching

30 minutes

Key: websiteContent:detail:v1:id=<id>

Errors

400 invalid id

404 not found

3) Latest by Module (single most recent)
GET /v1/website-content/modules/:moduleId/latest

Returns the newest row for a given module (by createdAt DESC, id DESC).

Response
{
  "success": true,
  "data": {
    "id": 42,
    "moduleId": 3,
    "title": "EMI Calculator — Page Content",
    "description": "<section>...</section>",
    "createdAt": "2025-09-12T09:15:00.000Z",
    "updatedAt": "2025-09-12T09:15:00.000Z"
  }
}

Caching

30 minutes

Key: websiteContent:latestByModule:v1:moduleId=<id>

Errors

400 invalid moduleId

204 no content for this module (empty body)

Routes (Express)

Mounted in routes/v1.ts:

v1.use('/website-content', websiteContentRouter);

/modules/:moduleId/latest is registered before list & id routes to avoid conflicts.

Validation (Zod DTOs)

List DTO

moduleId: positive int (required)

q: optional trimmed string

page: coerced positive int (default 1)

limit: coerced int [1..100] (default 50)

sortBy: enum latest|title_asc|title_desc|id_asc|id_desc

ID DTO

id: positive int

Module ID DTO

moduleId: positive int

Sorting Rules

latest → createdAt DESC, id DESC

title_asc / title_desc

id_asc / id_desc

Notes & Conventions

HTML is allowed in description, serve as-is.

This module is read-only; admin writes should trigger cache invalidation:

delPrefix('websiteContent:list')

delPrefix('websiteContent:detail')

delPrefix('websiteContent:latestByModule')

Use centralized helpers:

withCache, cacheKey, delPrefix

All timestamps are ISO strings (UTC).

Quick Examples

Latest Privacy

GET /v1/website-content/modules/(:moduleId of Privacy)/latest


Search in EMI copy

GET /v1/website-content?moduleId=3&q=interest%20rate&limit=10&page=1&sortBy=latest

Fetch a specific revision

GET /v1/website-content/42

Error Payloads
// 400
{ "success": false, "message": "Invalid module id" }

// 404
{ "success": false, "message": "Content not found" }

// 204 (Latest by Module no row)
(no body)


All authors (paginated list)

GET /v1/website-content?moduleId=6&limit=20&page=1&sortBy=latest


Optional search: &q=mahesh

Change page/limit as needed.

Single author (by authorId via list filter)

GET /v1/website-content?moduleId=6&authorId=1


(Alternative single author via detail route)

GET /v1/website-content/1?moduleId=6
