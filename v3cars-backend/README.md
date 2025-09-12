# v3cars-new — Backend Documentation

A DB-first, ESM TypeScript API built with Express + Prisma for v3cars. This README is the **global doc** for new contributors.
It explains the stack, how to run the project, folder structure, and where to find per-module API docs.

**Base URL (local):** `http://localhost:3121`  
**API Version:** `/v1`

---

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Framework:** Express
- **Language:** TypeScript (ESM imports with `.js` suffix)
- **ORM:** Prisma + MySQL (DB-first)
- **Validation:** Zod
- **Logging:** pino-http
- **Security:** helmet, cors
- **Dev:** nodemon

---

## Getting Started

1. **Environment**
   Create `.env` at repo root:
   ```env
   PORT=3121
   DATABASE_URL="mysql://user:password@host:3306/dbname"
   # Optional: used to build absolute asset URLs for images/thumbnails
   MEDIA_BASE_URL="https://cdn.example.com"
   ```

2. **Install and sync Prisma**
   ```bash
   npm install
   npm run prisma:sync   # prisma db pull && prisma generate
   ```

3. **Run**
   ```bash
   npm run dev     # Development with watch
   # or
   npm run build && npm start
   ```
---

## Folder Structure

```
src/
  config/
    env.ts
  lib/
    prisma.ts
  middlewares/
    error.ts
  modules/
    cars/
      cars.routes.ts
      cars.types.ts
      cars.validators.ts
      brands/*        # full layered module
      models/*        # full layered module (brand + price + specs + image enrichment)
       └─ images/*    # images repo/service used by models service
       └─ powertrains/* # powertrains repo/service used by models/variants
      variants/*      # full layered module (price parsing, filters)
    home/
      home.route.ts
      home.controller.ts
      home.service.ts
      home.dto.ts
      home.types.ts
    news/             # thin wrapper that delegates to content/
      news.route.ts
      news.controller.ts
      news.service.ts
    content/          # unified content module (News/Reviews/etc.)
      content.route.ts
      content.controller.ts
      content.service.ts
      content.repo.ts
      content.dto.ts
      content.types.ts
      content.constants.ts
  routes/
    v1.ts
  app.ts
  server.ts

```

**Architecture:** Repo → Service → Controller → Route.  
- Reusable business rules live in **Service** (e.g., price fallback, brand enrichment, image URL building).  
- **ModelsService** composes brands + variants price bands + powertrain specs + hero image.  
- **ContentService** provides today/latest/trending/top for all content types (News, Reviews, etc.).

---

## Module Docs (Use These For API Details)

- **Cars APIs (Brands, Models, Variants):** see [`MODULE_CARS.md`](./MODULE_CARS.md)
- **Home APIs (Homepage sections):** see [`MODULE_HOME.md`](./MODULE_HOME.md)
- **News APIs (legacy paths /v1/news/*):** see [`MODULE_NEWS.md`](./MODULE_NEWS.md)
- **Unified Content APIs (/v1/content/:type/*):** see [`MODULE_CONTENT.md`](./MODULE_CONTENT.md)

> ℹ️ The **Home** module reuses **Cars** and **Content** services under-the-hood.  
> For endpoint params and response shapes, always refer to the relevant module .md above.

---

## Content Types Mapping (for /v1/content/:type/*)

| Type Param           | contentType (DB) | Path Prefix      |
|----------------------|------------------|------------------|
| `news`               | 1                | `/news/`         |
| `reviews`            | 2                | `/reviews/`      |
| `variant-explained`  | 3                | `/variant-explained/` |
| `comparison`         | 4                | `/comparison/`   |
| `user-reviews`       | 5                | `/user-reviews/` |
| `features-explained` | 6                | `/features-explained/` |
| `car-guide`          | 7                | `/car-guide/`    |
| `auto-expo`          | 8                | `/auto-expo/`    |
| `press-release`      | 9                | `/press-release/`|

---

## Common Conventions

- **Pagination:** `page` (default 1), `limit` (default 12, max 100)
- **Booleans in query:** pass as `0|1` (e.g., `isUpcoming=1`)
- **Price buckets:** `UNDER_5L | BETWEEN_5_10L | BETWEEN_10_20L | BETWEEN_20_40L | ABOVE_40L`
- **Sorting keys:** depend on module (see module docs)

### Price & Images
- Models: `priceMin/priceMax` fallback from **Variants** if `expectedBasePrice/TopPrice` are `0/null`.
- Image URLs: built using `MEDIA_BASE_URL` when present; else raw file name returned—frontend can prefix.

---

## Health & Logs

- Add an optional health route in `routes/v1.ts` if needed:
  - `GET /v1/health` → `{ ok: true }`
- Logs: `pino-http` (JSON). Add request IDs or redact as needed.

---

## Next Steps

- Add caching for popular lists
- Optional rate-limiting
- Materialize numeric price columns for DB-side ordering at scale
