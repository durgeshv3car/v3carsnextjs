

## Module: FAQs
Base path: `/v1/faqs`

Public API returns DB field names as-is (`sequance`, `careateDateTime`, etc.).

### Routes
1) **List modules** — `GET /v1/faqs/modules`
   - Query: `q` (search name), `page` (default 1), `limit` (default 50, max 100)

2) **Module detail** — `GET /v1/faqs/modules/:id`

3) **List FAQs by module** — `GET /v1/faqs`
   - `moduleId` (required)
   - `q` search in `que` / `ans` (optional)
   - `page` (default 1), `limit` (default 50, max 100)
   - `sortBy` `sequence_asc | latest | id_asc | id_desc` (default `sequence_asc`)
   - Fuel-price module (moduleId=16) extras:
     - `pageType` 1|2|3|4
     - `fuelType` 1|2|3

4) **FAQ detail** — `GET /v1/faqs/:id`

### Sorting & Pagination
- Pagination via `page`, `limit` (server-side)
- Sort options:
  - `sequence_asc`: `sequance ASC, id ASC` (default)
  - `latest`: `updateDateTime DESC, id DESC`
  - `id_asc` / `id_desc`

### Responses (examples)
- Modules list:
  ```json
  {
    "success": true,
    "rows": [{ "id": 1, "name": "Car loan emi calculator", "createdAt": "2025-09-20T09:00:00.000Z" }],
    "page": 1, "pageSize": 50, "total": 3, "totalPages": 1
  }
  ```
- FAQs list:
  ```json
  {
    "success": true,
    "rows": [{
      "id": 101, "moduleId": 1, "que": "...", "ans": "...",
      "sequance": 1, "addedBy": null, "updatedBy": null,
      "careateDateTime": "...", "updateDateTime": "..."
    }],
    "page": 1, "pageSize": 50, "total": 12, "totalPages": 1
  }
  ```
- FAQ detail 404: `{ "success": false, "message": "FAQ not found" }`
- Bad request: `{ "success": false, "message": "Invalid FAQ id", "issues": [...] }`

### Caching
- Server cache (Redis/memory):
  - `faqs:list` page1 30m, page>1 15m
  - `faq:detail` 30m
  - `faqModules:list` 6h
  - `faqModule:detail` 6h
- HTTP cache headers applied via middleware (e.g., `s-maxage=1800, stale-while-revalidate=120`)
- Invalidation hints (admin side):
  - FAQ changes → purge `faqs:list`, `faq:detail`, optionally `faqModule:detail`
  - Module changes → purge `faqModules:list`, `faqModule:detail`, `faqs:list`

### Special: Fuel price FAQs (moduleId=16)
- Data source: `tblfuelpricefaqs`
- Supports filters: `pageType (1|2|3|4)`, `fuelType (1|2|3)`, `q` (ques/ans contains)
- Normalized fields returned as standard FAQ shape; extra `_fuelMeta` included (pageType, fuelType, fadCityId, faqStates, faqCityState).

### Example flows
- Get modules then FAQs:  
  `/v1/faqs/modules` → pick id → `/v1/faqs?moduleId=1&sortBy=sequence_asc`
- Search within module:  
  `/v1/faqs?moduleId=2&q=cost&page=1&limit=20`
- Latest-changed:  
  `/v1/faqs?moduleId=3&sortBy=latest&limit=10`
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