

Module: FAQs

Unified FAQs for product modules like Car loan EMI calculator, Fuel cost calculator, Buy/Renew car insurance, etc.
Exposes endpoints under /v1/faqs/*.

Data Model (DB)

tblmodules

id (PK, int, auto)

name (varchar)

createdAt (datetime, default NOW)

tblfaqs

id (PK, int, auto)

moduleId (FK → tblmodules.id, cascade on delete/update)

que (varchar)

ans (text)

sequance (int) — note: spelling follows DB

addedBy (int, nullable)

updatedBy (int, nullable)

careateDateTime (datetime, default NOW) — note: spelling follows DB

updateDateTime (datetime, on update NOW)

The public API returns DB field names as-is to avoid confusion with migrations.

Endpoints
1) List Modules
GET /v1/faqs/modules?limit=50&page=1&q=loan

Query

q (optional) — substring match on module name

page (default 1), limit (default 50, max 100)

Response

{
  "success": true,
  "rows": [
    { "id": 1, "name": "Car loan emi calculator", "createdAt": "2025-09-20T09:00:00.000Z" }
  ],
  "page": 1,
  "pageSize": 50,
  "total": 3,
  "totalPages": 1
}

2) Module Detail
GET /v1/faqs/modules/:id

Response

{
  "success": true,
  "data": { "id": 1, "name": "Car loan emi calculator", "createdAt": "2025-09-20T09:00:00.000Z" }
}

3) List FAQs (by module)
GET /v1/faqs?moduleId=1&limit=50&page=1&sortBy=sequence_asc&q=emi

Query

moduleId (required) — module whose FAQs to return

q (optional) — substring match in que or ans

page (default 1), limit (default 50, max 100)

sortBy (default sequence_asc) — one of:

sequence_asc (default)

latest (by updateDateTime desc, then id desc)

id_asc

id_desc

Response

{
  "success": true,
  "rows": [
    {
      "id": 101,
      "moduleId": 1,
      "que": "EMI kaise calculate hota hai?",
      "ans": "EMI = [P × R × (1+R)^N] / [(1+R)^N − 1] ...",
      "sequance": 1,
      "addedBy": null,
      "updatedBy": null,
      "careateDateTime": "2025-09-20T09:00:00.000Z",
      "updateDateTime": "2025-09-21T09:00:00.000Z"
    }
  ],
  "page": 1,
  "pageSize": 50,
  "total": 12,
  "totalPages": 1
}

4) FAQ Detail
GET /v1/faqs/:id

Responses

200 OK

{
  "success": true,
  "data": {
    "id": 101,
    "moduleId": 1,
    "que": "EMI kaise calculate hota hai?",
    "ans": "EMI = [P × R × (1+R)^N] / ...",
    "sequance": 1,
    "addedBy": null,
    "updatedBy": null,
    "careateDateTime": "2025-09-20T09:00:00.000Z",
    "updateDateTime": "2025-09-21T09:00:00.000Z"
  }
}

404 Not Found

{ "success": false, "message": "FAQ not found" }

400 Bad Request (invalid id)

{ "success": false, "message": "Invalid FAQ id", "issues": [ ... ] }

Sorting & Pagination

Pagination is server-side: page, limit.

Sorting:

sequence_asc → sequance ASC, id ASC

latest → updateDateTime DESC, id DESC

id_asc / id_desc

Search

q filters FAQs where que or ans contains the substring (case-insensitive per DB collation).

Caching

Server cache (Redis/in-memory)

faqs:list

page 1 ⇒ 30 min TTL

page >1 ⇒ 15 min TTL

faq:detail ⇒ 30 min

faqModules:list ⇒ 6 hours

faqModule:detail ⇒ 6 hours

Network caching (optional middleware)

list/detail use Cache-Control like:
public, s-maxage=1800, stale-while-revalidate=120 (adjusted per route)

Invalidation (admin writes)

On FAQ create/update/delete: purge prefixes
faqs:list, faq:detail (and faqModule:detail if needed)

On module create/update/delete: purge
faqModules:list, faqModule:detail, faqs:list

Example Flows
Get module ids, then FAQs

GET /v1/faqs/modules → pick id

GET /v1/faqs?moduleId=1&sortBy=sequence_asc

Search FAQs within a module

GET /v1/faqs?moduleId=2&q=cost&page=1&limit=20

Show latest-changed FAQs (for admin review)

GET /v1/faqs?moduleId=3&sortBy=latest&limit=10

Error Codes

400 — invalid params (zod validation fails)

404 — entity not found

200 — success; list/detail shapes as above

Seeded Modules (suggested)

Car loan emi calculator

Fuel cost calculator

Buy/Renew car insurance

(Use /v1/faqs/modules to verify ids in your DB)

Curl Samples
# List modules
curl -s "http://localhost:3121/v1/faqs/modules?limit=50&page=1"

# Module detail
curl -s "http://localhost:3121/v1/faqs/modules/1"

# List FAQs for a module (ordered by sequence)
curl -s "http://localhost:3121/v1/faqs?moduleId=1&limit=50&page=1&sortBy=sequence_asc"

# FAQ detail
curl -s "http://localhost:3121/v1/faqs/101"



fuel price page -

/v1/faqs?moduleId=16&pageType=1&fuelType=1&limit=50&page=1