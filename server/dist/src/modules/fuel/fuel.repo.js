// src/modules/fuel/fuel.repo.ts
import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';
export class FuelRepo {
    async metrosLatest(districtIds, fuelTypes // e.g. [1,2,3] or [1]
    ) {
        const idsList = Prisma.join(districtIds);
        const fuelsLst = Prisma.join(fuelTypes);
        // per (districtId,fuelType) last two distinct days -> today & previous averages
        const rows = await prisma.$queryRaw(Prisma.sql `
      WITH day_rank AS (
        SELECT
          fp.districtId,
          fp.fuelType,
          DATE(fp.addedDateTime) AS day,
          MAX(fp.addedDateTime)  AS ts,
          ROW_NUMBER() OVER (PARTITION BY fp.districtId, fp.fuelType
                             ORDER BY DATE(fp.addedDateTime) DESC) AS rn
        FROM tblfuelprice fp
        WHERE fp.districtId IN (${idsList})
          AND fp.fuelType   IN (${fuelsLst})
        GROUP BY fp.districtId, fp.fuelType, DATE(fp.addedDateTime)
      ),
      today_price AS (
        SELECT
          dr.districtId, dr.fuelType, dr.ts,
          ROUND(AVG(fp.fuelPrice), 2) AS price
        FROM day_rank dr
        JOIN tblfuelprice fp
          ON fp.districtId = dr.districtId
         AND fp.fuelType   = dr.fuelType
         AND DATE(fp.addedDateTime) = dr.day
        WHERE dr.rn = 1
        GROUP BY dr.districtId, dr.fuelType, dr.ts
      ),
      prev_price AS (
        SELECT
          dr.districtId, dr.fuelType,
          ROUND(AVG(fp.fuelPrice), 2) AS prevPrice
        FROM day_rank dr
        JOIN tblfuelprice fp
          ON fp.districtId = dr.districtId
         AND fp.fuelType   = dr.fuelType
         AND DATE(fp.addedDateTime) = dr.day
        WHERE dr.rn = 2
        GROUP BY dr.districtId, dr.fuelType
      )
      SELECT
        d.id           AS districtId,
        d.districtName AS cityName,
        d.stateId      AS stateId,
        s.stateName    AS stateName,
        t.fuelType     AS fuelType,
        t.price        AS price,
        p.prevPrice    AS prevPrice,
        t.ts           AS ts
      FROM tbldistricts d
      LEFT JOIN today_price t ON t.districtId = d.id
      LEFT JOIN prev_price  p ON p.districtId = d.id AND p.fuelType = t.fuelType
      LEFT JOIN tblstates   s ON s.stateId = d.stateId
      WHERE d.id IN (${idsList})
      ORDER BY d.id ASC, t.fuelType ASC
    `);
        return rows;
    }
    // ADD this new method inside FuelRepo
    async metrosHistory(districtIds, fuelTypes, days) {
        const idsList = Prisma.join(districtIds);
        const fuelsLst = Prisma.join(fuelTypes);
        return prisma.$queryRaw(Prisma.sql `
    SELECT
      d.id                         AS districtId,
      d.districtName               AS cityName,
      d.stateId                    AS stateId,
      s.stateName                  AS stateName,
      fp.fuelType                  AS fuelType,
      DATE_FORMAT(fp.addedDateTime, '%Y-%m-%d') AS day,
      ROUND(AVG(fp.fuelPrice), 2)  AS price
    FROM tblfuelprice fp
    JOIN tbldistricts d ON d.id = fp.districtId
    LEFT JOIN tblstates s ON s.stateId = d.stateId
    WHERE fp.districtId IN (${idsList})
      AND fp.fuelType   IN (${fuelsLst})
      AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
    GROUP BY d.id, d.districtName, d.stateId, s.stateName, fp.fuelType, DATE(fp.addedDateTime)
    ORDER BY d.id ASC, fp.fuelType ASC, DATE(fp.addedDateTime) ASC
  `);
    }
    async districtIdFromCityId(cityId) {
        const rows = await prisma.$queryRaw(Prisma.sql `
    SELECT d.id
    FROM tblcities c
    JOIN tbldistricts d
      ON d.stateId = c.stateId
     AND d.districtName = c.cityName
    WHERE c.cityId = ${cityId}
    LIMIT 1
  `);
        return rows[0]?.id ?? null;
    }
    async latestPopularByState(stateId, fuelType) {
        return prisma.$queryRaw(Prisma.sql `
      WITH
      pop AS (
        SELECT d.id AS districtId, d.districtName, d.isPopularCity
        FROM tbldistricts d
        WHERE d.stateId = ${stateId}
          AND d.isPopularCity IN (1,2,3,4)
      ),
      last_day AS (
        SELECT fp.districtId,
               DATE(MAX(fp.addedDateTime)) AS day,
               MAX(fp.addedDateTime)       AS ts
        FROM tblfuelprice fp
        JOIN pop p ON p.districtId = fp.districtId
        WHERE fp.fuelType = ${fuelType}
        GROUP BY fp.districtId
      ),
      today_price AS (
        SELECT ld.districtId,
               ld.ts,
               ROUND(AVG(fp.fuelPrice), 2) AS price
        FROM last_day ld
        JOIN tblfuelprice fp
          ON fp.districtId = ld.districtId
         AND fp.fuelType   = ${fuelType}
         AND DATE(fp.addedDateTime) = ld.day
        GROUP BY ld.districtId, ld.ts
      ),
      ranked_days AS (
        SELECT fp.districtId,
               DATE(fp.addedDateTime) AS day,
               ROW_NUMBER() OVER (
                 PARTITION BY fp.districtId
                 ORDER BY DATE(fp.addedDateTime) DESC
               ) AS rn
        FROM tblfuelprice fp
        JOIN pop p ON p.districtId = fp.districtId
        WHERE fp.fuelType = ${fuelType}
        GROUP BY fp.districtId, DATE(fp.addedDateTime)
      ),
      prev_day AS (
        SELECT districtId, day
        FROM ranked_days
        WHERE rn = 2
      ),
      prev_price AS (
        SELECT pd.districtId,
               ROUND(AVG(fp.fuelPrice), 2) AS prevPrice
        FROM prev_day pd
        JOIN tblfuelprice fp
          ON fp.districtId = pd.districtId
         AND fp.fuelType   = ${fuelType}
         AND DATE(fp.addedDateTime) = pd.day
        GROUP BY pd.districtId
      )
      SELECT
        p.districtId,
        p.districtName          AS cityName,
        ${stateId}              AS stateId,
        p.isPopularCity,
        tp.price,
        pp.prevPrice,
        tp.ts
      FROM pop p
      LEFT JOIN today_price tp ON tp.districtId = p.districtId
      LEFT JOIN prev_price  pp ON pp.districtId = p.districtId
      ORDER BY p.isPopularCity ASC, p.districtName ASC
    `);
    }
    /** ───────────────────────────────────────────────────────────────
     *  LATEST (CITY) — per-day AVG (old backend parity)
     *  - districtId comes from tbldistricts.id
     *  - compute last 2 distinct days’ AVG for that district & fuelType
     *  - hydrate names from tbldistricts / tblstates
     *  - fallback to state if city has no rows at all
     *  ─────────────────────────────────────────────────────────────── */
    async latestByDistrict(districtId, fuelType) {
        const rows = await prisma.$queryRaw(Prisma.sql `
      WITH days AS (
        SELECT DATE(fp.addedDateTime) AS day,
               MAX(fp.addedDateTime)   AS ts
        FROM tblfuelprice fp
        WHERE fp.districtId = ${districtId} AND fp.fuelType = ${fuelType}
        GROUP BY DATE(fp.addedDateTime)
        ORDER BY day DESC
        LIMIT 2
      )
      SELECT d.day,
             d.ts,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM days d
      JOIN tblfuelprice fp
        ON fp.fuelType = ${fuelType}
       AND fp.districtId = ${districtId}
       AND DATE(fp.addedDateTime) = d.day
      GROUP BY d.day, d.ts
      ORDER BY d.day DESC
    `);
        if (!rows.length) {
            // No city data → fallback to state
            const meta = await prisma.$queryRaw(Prisma.sql `
        SELECT d.stateId, d.districtName
        FROM tbldistricts d
        WHERE d.id = ${districtId}
        LIMIT 1
      `);
            const stId = meta[0]?.stateId;
            if (!stId)
                return null;
            const stateLatest = await this.latestByState(stId, fuelType);
            if (!stateLatest)
                return null;
            return {
                ...stateLatest,
                districtId,
                cityName: meta[0]?.districtName ?? null,
            };
        }
        const today = rows[0];
        const prev = rows[1] ?? null;
        const meta = await prisma.$queryRaw(Prisma.sql `
      SELECT d.stateId, d.districtName
      FROM tbldistricts d
      WHERE d.id = ${districtId}
      LIMIT 1
    `);
        const stateNameRow = await prisma.$queryRaw(Prisma.sql `
      SELECT s.stateName
      FROM tblstates s
      WHERE s.stateId = ${meta[0]?.stateId}
      LIMIT 1
    `);
        return {
            districtId,
            stateId: meta[0]?.stateId ?? 0,
            price: today?.price ?? null,
            ts: today?.ts ?? null,
            prevPrice: prev?.price ?? null,
            stateName: stateNameRow[0]?.stateName ?? null,
            cityName: meta[0]?.districtName ?? null,
        };
    }
    /** ───────────────────────────────────────────────────────────────
     *  LATEST (STATE) — per-day AVG (old backend parity)
     *  - compute last 2 distinct days’ AVG for that state & fuelType
     *  - representative districtId from latest day (for shape)
     *  ─────────────────────────────────────────────────────────────── */
    async latestByState(stateId, fuelType) {
        // 1) Popular districts for this state
        const popular = await prisma.$queryRaw(Prisma.sql `
      SELECT d.id
      FROM tbldistricts d
      WHERE d.stateId = ${stateId}
        AND d.isPopularCity IN (1,2,3,4)
    `);
        // helper: stateName and cityName lookups
        const getNames = async (repDistrictId) => {
            const stateNameRow = await prisma.$queryRaw(Prisma.sql `
        SELECT s.stateName FROM tblstates s WHERE s.stateId = ${stateId} LIMIT 1
      `);
            const cityNameRow = repDistrictId
                ? await prisma.$queryRaw(Prisma.sql `
            SELECT d.districtName FROM tbldistricts d WHERE d.id = ${repDistrictId} LIMIT 1
          `)
                : [];
            return {
                stateName: stateNameRow[0]?.stateName ?? null,
                cityName: cityNameRow[0]?.districtName ?? null,
            };
        };
        // If we have popular districts, restrict computation to them
        if (popular.length) {
            const rows = await prisma.$queryRaw(Prisma.sql `
        WITH pop AS (
          SELECT d.id AS districtId
          FROM tbldistricts d
          WHERE d.stateId = ${stateId}
            AND d.isPopularCity IN (1,2,3,4)
        ),
        days AS (
          SELECT DATE(fp.addedDateTime) AS day,
                 MAX(fp.addedDateTime)   AS ts
          FROM tblfuelprice fp
          JOIN pop p ON p.districtId = fp.districtId
          WHERE fp.fuelType = ${fuelType}
          GROUP BY DATE(fp.addedDateTime)
          ORDER BY day DESC
          LIMIT 2
        )
        SELECT d.day,
               d.ts,
               ROUND(AVG(fp.fuelPrice), 2) AS price
        FROM days d
        JOIN tblfuelprice fp
          ON fp.fuelType = ${fuelType}
         AND DATE(fp.addedDateTime) = d.day
        JOIN pop p
          ON p.districtId = fp.districtId
        GROUP BY d.day, d.ts
        ORDER BY d.day DESC
      `);
            if (!rows.length)
                return null;
            const today = rows[0];
            const prev = rows[1] ?? null;
            // representative district from latest day within popular set
            const rep = await prisma.$queryRaw(Prisma.sql `
        WITH pop AS (
          SELECT d.id AS districtId
          FROM tbldistricts d
          WHERE d.stateId = ${stateId}
            AND d.isPopularCity IN (1,2,3,4)
        )
        SELECT fp.districtId
        FROM tblfuelprice fp
        JOIN pop p ON p.districtId = fp.districtId
        WHERE fp.fuelType = ${fuelType}
          AND DATE(fp.addedDateTime) = DATE(${today.ts})
        ORDER BY fp.addedDateTime DESC, fp.id DESC
        LIMIT 1
      `);
            const repDistrictId = rep[0]?.districtId ?? null;
            const { stateName, cityName } = await getNames(repDistrictId);
            return {
                districtId: repDistrictId ?? 0,
                stateId,
                price: today?.price ?? null,
                ts: today?.ts ?? null,
                prevPrice: prev?.price ?? null,
                stateName,
                cityName,
            };
        }
        // 2) Fallback: no popular districts → use old state-wide logic (unchanged)
        const rows = await prisma.$queryRaw(Prisma.sql `
      WITH days AS (
        SELECT DATE(fp.addedDateTime) AS day,
               MAX(fp.addedDateTime)   AS ts
        FROM tblfuelprice fp
        WHERE fp.stateId = ${stateId} AND fp.fuelType = ${fuelType}
        GROUP BY DATE(fp.addedDateTime)
        ORDER BY day DESC
        LIMIT 2
      )
      SELECT d.day,
             d.ts,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM days d
      JOIN tblfuelprice fp
        ON fp.fuelType = ${fuelType}
       AND fp.stateId = ${stateId}
       AND DATE(fp.addedDateTime) = d.day
      GROUP BY d.day, d.ts
      ORDER BY d.day DESC
    `);
        if (!rows.length)
            return null;
        const today = rows[0];
        const prev = rows[1] ?? null;
        const rep = await prisma.$queryRaw(Prisma.sql `
      SELECT fp.districtId
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId}
        AND fp.fuelType = ${fuelType}
        AND DATE(fp.addedDateTime) = DATE(${today.ts})
      ORDER BY fp.addedDateTime DESC, fp.id DESC
      LIMIT 1
    `);
        const repDistrictId = rep[0]?.districtId ?? null;
        const stateNameRow = await prisma.$queryRaw(Prisma.sql `
      SELECT s.stateName FROM tblstates s WHERE s.stateId = ${stateId} LIMIT 1
    `);
        const cityNameRow = repDistrictId
            ? await prisma.$queryRaw(Prisma.sql `
          SELECT d.districtName FROM tbldistricts d WHERE d.id = ${repDistrictId} LIMIT 1
        `)
            : [];
        return {
            districtId: repDistrictId ?? 0,
            stateId,
            price: today?.price ?? null,
            ts: today?.ts ?? null,
            prevPrice: prev?.price ?? null,
            stateName: stateNameRow[0]?.stateName ?? null,
            cityName: cityNameRow[0]?.districtName ?? null,
        };
    }
    /** HISTORY (CITY) — per-day AVG; fallback to state if city has no rows in window */
    async historyByDistrict(districtId, fuelType, days) {
        const anyCity = await prisma.$queryRaw(Prisma.sql `
    SELECT COUNT(*) AS n
    FROM tblfuelprice
    WHERE districtId = ${districtId}
      AND fuelType   = ${fuelType}
      AND addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
  `);
        if (Number(anyCity[0]?.n ?? 0) > 0) {
            return prisma.$queryRaw(Prisma.sql `
      SELECT
        DATE_FORMAT(fp.addedDateTime, '%Y-%m-%d') AS day,
        ROUND(AVG(fp.fuelPrice), 2)               AS price
      FROM tblfuelprice fp
      WHERE fp.districtId = ${districtId}
        AND fp.fuelType   = ${fuelType}
        AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      GROUP BY DATE(fp.addedDateTime)
      ORDER BY day ASC
    `);
        }
        // fallback → state history
        const meta = await prisma.$queryRaw(Prisma.sql `
    SELECT d.stateId
    FROM tbldistricts d
    WHERE d.id = ${districtId}
    LIMIT 1
  `);
        if (!meta[0]?.stateId)
            return [];
        return this.historyByState(meta[0].stateId, fuelType, days);
    }
    /** HISTORY (STATE) — per-day AVG across all districts of the state */
    async historyByState(stateId, fuelType, days) {
        return prisma.$queryRaw(Prisma.sql `
    SELECT
      DATE_FORMAT(fp.addedDateTime, '%Y-%m-%d') AS day,
      ROUND(AVG(fp.fuelPrice), 2)               AS price
    FROM tblfuelprice fp
    WHERE fp.stateId = ${stateId}
      AND fp.fuelType = ${fuelType}
      AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
    GROUP BY DATE(fp.addedDateTime)
    ORDER BY day ASC
  `);
    }
    /** ───────────────────────────────────────────────────────────────
     *  STATES LIST (one fuelType) — latest + prev (date-wise)
     *  ─────────────────────────────────────────────────────────────── */
    async statesLatest(fuelType, q) {
        const nameFilter = q?.q
            ? Prisma.sql ` AND s.stateName LIKE ${'%' + q.q + '%'} `
            : Prisma.empty;
        const rows = await prisma.$queryRaw(Prisma.sql `
    WITH daily AS (
      SELECT
        fp.stateId,
        DATE(fp.addedDateTime)      AS day,
        ROUND(AVG(fp.fuelPrice), 2) AS avgPrice,
        MAX(fp.addedDateTime)       AS ts
      FROM tblfuelprice fp
      WHERE fp.fuelType = ${fuelType}
      GROUP BY fp.stateId, DATE(fp.addedDateTime)
    ),
    ranked AS (
      SELECT
        d.*,
        ROW_NUMBER() OVER (
          PARTITION BY d.stateId
          ORDER BY d.day DESC
        ) AS rn
      FROM daily d
    ),
    latest AS (
      SELECT stateId, avgPrice AS price, ts
      FROM ranked
      WHERE rn = 1
    ),
    prev AS (
      SELECT stateId, avgPrice AS prevPrice
      FROM ranked
      WHERE rn = 2
    )
    SELECT
      s.stateId,
      s.stateName,
      l.price,
      p.prevPrice,
      l.ts
    FROM tblstates s
    LEFT JOIN latest l ON l.stateId = s.stateId
    LEFT JOIN prev   p ON p.stateId = s.stateId
    WHERE 1=1
      ${nameFilter}
    ORDER BY
      ${q?.sortBy === 'price_desc' ? Prisma.sql `l.price DESC, s.stateName ASC` :
            q?.sortBy === 'price_asc' ? Prisma.sql `l.price ASC,  s.stateName ASC` :
                Prisma.sql `s.stateName ASC`}
    LIMIT ${q?.take ?? 50} OFFSET ${q?.skip ?? 0}
  `);
        const totalRows = await prisma.$queryRaw(Prisma.sql `
    SELECT COUNT(*) AS cnt
    FROM tblstates s
    WHERE 1=1
      ${nameFilter}
  `);
        return { rows, total: Number(totalRows[0]?.cnt ?? 0) };
    }
    /** ───────────────────────────────────────────────────────────────
     *  STATES LIST (combined 1/2/3) — latest + prev (date-wise)
     *  ─────────────────────────────────────────────────────────────── */
    async statesLatestCombined(q) {
        const nameFilter = q?.q
            ? Prisma.sql ` AND s.stateName LIKE ${'%' + q.q + '%'} `
            : Prisma.empty;
        // daily = AVG per (stateId, fuelType, DATE)
        // ranked = daily rows ranked by date (rn=1 latest day, rn=2 previous day)
        // latest / prev pivoted per fuel type
        const rows = await prisma.$queryRaw(Prisma.sql `
      WITH daily AS (
        SELECT
          fp.stateId,
          fp.fuelType,
          DATE(fp.addedDateTime)              AS day,
          ROUND(AVG(fp.fuelPrice), 2)         AS avgPrice,
          MAX(fp.addedDateTime)               AS ts
        FROM tblfuelprice fp
        WHERE fp.fuelType IN (1,2,3)
        GROUP BY fp.stateId, fp.fuelType, DATE(fp.addedDateTime)
      ),
      ranked AS (
        SELECT
          d.*,
          ROW_NUMBER() OVER (
            PARTITION BY d.stateId, d.fuelType
            ORDER BY d.day DESC
          ) AS rn
        FROM daily d
      ),
      latest AS (
        SELECT stateId, fuelType, avgPrice AS price, ts
        FROM ranked
        WHERE rn = 1
      ),
      prev AS (
        SELECT stateId, fuelType, avgPrice AS prevPrice
        FROM ranked
        WHERE rn = 2
      )
      SELECT
        s.stateId,
        s.stateName,

        MAX(CASE WHEN l.fuelType = 1 THEN l.price   END) AS petrol,
        MAX(CASE WHEN l.fuelType = 1 THEN l.ts      END) AS petrolTs,
        MAX(CASE WHEN p.fuelType = 1 THEN p.prevPrice END) AS petrolPrev,

        MAX(CASE WHEN l.fuelType = 2 THEN l.price   END) AS diesel,
        MAX(CASE WHEN l.fuelType = 2 THEN l.ts      END) AS dieselTs,
        MAX(CASE WHEN p.fuelType = 2 THEN p.prevPrice END) AS dieselPrev,

        MAX(CASE WHEN l.fuelType = 3 THEN l.price   END) AS cng,
        MAX(CASE WHEN l.fuelType = 3 THEN l.ts      END) AS cngTs,
        MAX(CASE WHEN p.fuelType = 3 THEN p.prevPrice END) AS cngPrev

      FROM tblstates s
      LEFT JOIN latest l ON l.stateId = s.stateId
      LEFT JOIN prev   p ON p.stateId = s.stateId AND p.fuelType = l.fuelType
      WHERE 1=1
        ${nameFilter}
      GROUP BY s.stateId, s.stateName
      ORDER BY s.stateName ASC
      LIMIT ${q?.take ?? 50} OFFSET ${q?.skip ?? 0}
    `);
        const totalRows = await prisma.$queryRaw(Prisma.sql `
      SELECT COUNT(*) AS cnt
      FROM tblstates s
      WHERE 1=1
        ${nameFilter}
    `);
        return { rows, total: Number(totalRows[0]?.cnt ?? 0) };
    }
    /** ───────────────────────────────────────────────────────────────
     *  CITIES LIST (in a state) — popular filter + state per-day AVG
     *  - Rows from tbldistricts (city id / name)
     *  - If ?popular=1, we require a match in tblcities with isPopularCity=1
     *    (we match by stateId + name equality: tblcities.cityName = tbldistricts.districtName)
     *  - Price/prev taken from state-level per-day AVG (old behaviour)
     *  ─────────────────────────────────────────────────────────────── */
    // inside FuelRepo
    /** City list (per state) — per-city latest & previous day AVG, optional popular filter */
    async citiesLatest(stateId, fuelType, q) {
        const nameFilter = q?.q ? Prisma.sql ` AND d.districtName LIKE ${'%' + q.q + '%'} ` : Prisma.empty;
        const popularOnly = q?.popular === 1 ? Prisma.sql ` AND c.isPopularCity = 1 ` : Prisma.empty;
        // latest (per-city) and previous-day (per-city) using tbldistricts ids
        const rows = await prisma.$queryRaw(Prisma.sql `
    WITH
    -- latest day (and timestamp) per district
    last_day AS (
      SELECT fp.districtId,
             DATE(MAX(fp.addedDateTime)) AS day,
             MAX(fp.addedDateTime)       AS ts
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId} AND fp.fuelType = ${fuelType}
      GROUP BY fp.districtId
    ),
    -- today's average (for that latest day) per district
    today_price AS (
      SELECT ld.districtId,
             ld.ts,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM last_day ld
      JOIN tblfuelprice fp
        ON fp.districtId = ld.districtId
       AND fp.fuelType   = ${fuelType}
       AND DATE(fp.addedDateTime) = ld.day
      GROUP BY ld.districtId, ld.ts
    ),
    -- rank days per district to pick the previous day
    ranked_days AS (
      SELECT fp.districtId,
             DATE(fp.addedDateTime) AS day,
             ROW_NUMBER() OVER (PARTITION BY fp.districtId ORDER BY DATE(fp.addedDateTime) DESC) AS rn
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId} AND fp.fuelType = ${fuelType}
      GROUP BY fp.districtId, DATE(fp.addedDateTime)
    ),
    prev_day AS (
      SELECT districtId, day
      FROM ranked_days
      WHERE rn = 2
    ),
    -- previous day's average per district
    prev_price AS (
      SELECT pd.districtId,
             ROUND(AVG(fp.fuelPrice), 2) AS prevPrice
      FROM prev_day pd
      JOIN tblfuelprice fp
        ON fp.districtId = pd.districtId
       AND fp.fuelType   = ${fuelType}
       AND DATE(fp.addedDateTime) = pd.day
      GROUP BY pd.districtId
    )

    SELECT
      d.id            AS districtId,
      d.districtName  AS cityName,
      d.stateId       AS stateId,
      tp.price        AS price,
      pp.prevPrice    AS prevPrice,
      tp.ts           AS ts
    FROM tbldistricts d
    LEFT JOIN tblcities c
      ON c.stateId = d.stateId AND c.cityName = d.districtName
    LEFT JOIN today_price tp
      ON tp.districtId = d.id
    LEFT JOIN prev_price pp
      ON pp.districtId = d.id
    WHERE d.stateId = ${stateId}
      ${popularOnly}
      ${nameFilter}
    ORDER BY
      ${q?.sortBy === 'price_desc' ? Prisma.sql `tp.price DESC, d.districtName ASC` :
            q?.sortBy === 'price_asc' ? Prisma.sql `tp.price ASC, d.districtName ASC` :
                Prisma.sql `d.districtName ASC`}
    LIMIT ${q?.take ?? 50} OFFSET ${q?.skip ?? 0}
  `);
        const totalRows = await prisma.$queryRaw(Prisma.sql `
    SELECT COUNT(*) AS cnt
    FROM tbldistricts d
    LEFT JOIN tblcities c
      ON c.stateId = d.stateId AND c.cityName = d.districtName
    WHERE d.stateId = ${stateId}
      ${popularOnly}
      ${nameFilter}
  `);
        return { rows, total: Number(totalRows[0]?.cnt ?? 0) };
    }
    /** HISTORY COMBINED (STATE) — Petrol/Diesel/CNG per-day AVG */
    async historyCombinedByState(stateId, days) {
        return prisma.$queryRaw(Prisma.sql `
    WITH
    p AS (
      SELECT DATE(fp.addedDateTime) AS day,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId} AND fp.fuelType = 1
        AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      GROUP BY DATE(fp.addedDateTime)
    ),
    d AS (
      SELECT DATE(fp.addedDateTime) AS day,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId} AND fp.fuelType = 2
        AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      GROUP BY DATE(fp.addedDateTime)
    ),
    c AS (
      SELECT DATE(fp.addedDateTime) AS day,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId} AND fp.fuelType = 3
        AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      GROUP BY DATE(fp.addedDateTime)
    ),
    days_union AS (
      SELECT day FROM p
      UNION
      SELECT day FROM d
      UNION
      SELECT day FROM c
    )
    SELECT
      DATE_FORMAT(u.day, '%Y-%m-%d') AS day,
      p.price AS petrol,
      d.price AS diesel,
      c.price AS cng
    FROM days_union u
    LEFT JOIN p ON p.day = u.day
    LEFT JOIN d ON d.day = u.day
    LEFT JOIN c ON c.day = u.day
    ORDER BY u.day ASC
  `);
    }
    /** HISTORY COMBINED (CITY) — Petrol/Diesel/CNG per-day AVG */
    async historyCombinedByDistrict(districtId, days) {
        return prisma.$queryRaw(Prisma.sql `
    WITH
    p AS (
      SELECT DATE(fp.addedDateTime) AS day,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM tblfuelprice fp
      WHERE fp.districtId = ${districtId} AND fp.fuelType = 1
        AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      GROUP BY DATE(fp.addedDateTime)
    ),
    d AS (
      SELECT DATE(fp.addedDateTime) AS day,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM tblfuelprice fp
      WHERE fp.districtId = ${districtId} AND fp.fuelType = 2
        AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      GROUP BY DATE(fp.addedDateTime)
    ),
    c AS (
      SELECT DATE(fp.addedDateTime) AS day,
             ROUND(AVG(fp.fuelPrice), 2) AS price
      FROM tblfuelprice fp
      WHERE fp.districtId = ${districtId} AND fp.fuelType = 3
        AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      GROUP BY DATE(fp.addedDateTime)
    ),
    days_union AS (
      SELECT day FROM p
      UNION
      SELECT day FROM d
      UNION
      SELECT day FROM c
    )
    SELECT
      DATE_FORMAT(u.day, '%Y-%m-%d') AS day,
      p.price AS petrol,
      d.price AS diesel,
      c.price AS cng
    FROM days_union u
    LEFT JOIN p ON p.day = u.day
    LEFT JOIN d ON d.day = u.day
    LEFT JOIN c ON c.day = u.day
    ORDER BY u.day ASC
  `);
    }
    async getDistrictMeta(districtId) {
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT d.id AS districtId, d.districtName, d.stateId, s.stateName
      FROM tbldistricts d
      LEFT JOIN tblstates s ON s.stateId = d.stateId
      WHERE d.id = ${districtId}
      LIMIT 1
    `);
        return rows[0] ?? null;
    }
    /** NEW: map tblcities.cityId -> tbldistricts.id using (stateId, name) join */
    async mapCityIdToDistrictId(cityId) {
        const rows = await prisma.$queryRaw(Prisma.sql `
      SELECT d.id AS mappedDistrictId
      FROM tblcities c
      JOIN tbldistricts d
        ON d.stateId = c.stateId
       AND d.districtName = c.cityName
      WHERE c.cityId = ${cityId}
      LIMIT 1
    `);
        return rows[0]?.mappedDistrictId ?? null;
    }
    /**
     * NEW: Monthly trend for a CITY (districtId) & fuelType
     * - last N months (including current month)
     * - per-day AVG → then monthly stats:
     *   first (earliest day), last (latest day), avg, highest (with date), lowest (with date)
     */
    async monthlyTrendsByDistrict(districtId, fuelType, months) {
        return prisma.$queryRaw(Prisma.sql `
      WITH
      -- all daily averages within the window
      daily AS (
        SELECT
          DATE(fp.addedDateTime) AS day,
          ROUND(AVG(fp.fuelPrice), 2) AS price
        FROM tblfuelprice fp
        WHERE fp.districtId = ${districtId}
          AND fp.fuelType   = ${fuelType}
          AND fp.addedDateTime >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL ${months - 1} MONTH), '%Y-%m-01')
          AND fp.addedDateTime <  DATE_FORMAT(DATE_ADD(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
        GROUP BY DATE(fp.addedDateTime)
      ),
      tagged AS (
        SELECT
          d.day,
          d.price,
          DATE_FORMAT(d.day, '%Y-%m') AS ym
        FROM daily d
      ),
      ranked AS (
        SELECT
          t.*,
          ROW_NUMBER() OVER (PARTITION BY t.ym ORDER BY t.day ASC)  AS rn_first,
          ROW_NUMBER() OVER (PARTITION BY t.ym ORDER BY t.day DESC) AS rn_last,
          ROW_NUMBER() OVER (PARTITION BY t.ym ORDER BY t.price DESC, t.day DESC) AS rn_max,
          ROW_NUMBER() OVER (PARTITION BY t.ym ORDER BY t.price ASC,  t.day ASC)  AS rn_min
        FROM tagged t
      ),
      monthly_avg AS (
        SELECT ym, ROUND(AVG(price), 2) AS avgPrice
        FROM tagged
        GROUP BY ym
      )
      SELECT
        r.ym,
        MAX(CASE WHEN r.rn_first = 1 THEN r.price END)                  AS firstPrice,
        MAX(CASE WHEN r.rn_last  = 1 THEN r.price END)                  AS lastPrice,
        m.avgPrice,
        MAX(CASE WHEN r.rn_max   = 1 THEN r.price END)                  AS highestPrice,
        MAX(CASE WHEN r.rn_max   = 1 THEN r.day   END)                  AS highestDate,
        MAX(CASE WHEN r.rn_min   = 1 THEN r.price END)                  AS lowestPrice,
        MAX(CASE WHEN r.rn_min   = 1 THEN r.day   END)                  AS lowestDate
      FROM ranked r
      JOIN monthly_avg m ON m.ym = r.ym
      GROUP BY r.ym, m.avgPrice
      ORDER BY r.ym DESC
    `);
    }
}
