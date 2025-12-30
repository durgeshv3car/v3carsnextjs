## Website Content
Base path: /v1/website-content

### List
GET /v1/website-content
- Params: moduleId (optional filter), uthorId (optional), q, page (default 1), limit (default 20, max 100), sortBy latest | title_asc | title_desc | id_asc | id_desc

### Detail
GET /v1/website-content/:id
- Optional: moduleId (for module-specific cache namespace)

### Latest by module
GET /v1/website-content/modules/:moduleId/latest
- Returns newest row for module; 204 when none

Caching (server):
- List: page1 30m, others 15m (namespace varies for moduleId=3 insurance, moduleId=6 authors)
- Detail: 30m (module-aware namespaces)
- LatestByModule: 30m (module-aware namespaces)

Sort rules:
- latest: createdAt DESC, id DESC
- 	itle_asc / 	itle_desc
- id_asc / id_desc

Examples:
- /v1/website-content?moduleId=1&q=privacy&limit=20&page=1&sortBy=latest
- /v1/website-content/42
- /v1/website-content/modules/3/latest

Notes:
- HTML in description is returned as-is.
- Invalidate caches on admin writes using delPrefix for namespaces: websiteContent:*, websiteContent:insurance:*, websiteContent:authors:*.