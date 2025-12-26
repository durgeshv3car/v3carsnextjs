## Module: WebStories
Base path: `/v1/webstories` (status=true only).

### List (grouped)
`GET /v1/webstories?page=&limit=`
- Groups by `storyId`; each group includes the latest `createdAt` and an `items` array (ordered by `storyId ASC`, `subStoryId ASC`, `createdAt DESC`).
- Pagination: `page` (default 1, min 1), `limit` (default 10, max 50).
- Fields per group: `storyId`, `title`, `mediaUrl`, `contentUrl`, `authorId`, `status`, `createdAt`, `items[]`.
- Fields per item: `id`, `subStoryId`, `title`, `mediaUrl`, `contentUrl`, `authorId`, `addedBy`, `status`, `createdAt`, `updatedAt`.

Caching: 5 minutes via `withCache` keyed by page/limit.
