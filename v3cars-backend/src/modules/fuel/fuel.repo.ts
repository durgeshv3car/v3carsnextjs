import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';

export class FuelRepo {
  /** latest for districtId (city) */
   async latestByDistrict(districtId: number, fuelType: number) {
    // try city first
    const cityRow = await prisma.$queryRaw<Array<{
      districtId: number; stateId: number; price: number; ts: Date;
    }>>(Prisma.sql`
      SELECT f.districtId, f.stateId, f.fuelPrice AS price, f.addedDateTime AS ts
      FROM tblfuelprice f
      WHERE f.districtId = ${districtId} AND f.fuelType = ${fuelType}
      ORDER BY f.addedDateTime DESC, f.id DESC
      LIMIT 1
    `);

    if (cityRow.length) {
      const prev = await prisma.$queryRaw<Array<{ prevPrice: number | null }>>(Prisma.sql`
        SELECT fp.fuelPrice AS prevPrice
        FROM tblfuelprice fp
        WHERE fp.districtId = ${districtId} AND fp.fuelType = ${fuelType}
          AND fp.addedDateTime < ${cityRow[0].ts}
        ORDER BY fp.addedDateTime DESC, fp.id DESC
        LIMIT 1
      `);
      const meta = await prisma.tblcities.findFirst({ where: { cityId: districtId }, select: { cityName: true, stateId: true } });
      const stateName = meta?.stateId ? (await prisma.tblstates.findFirst({ where: { stateId: meta.stateId }, select: { stateName: true } }))?.stateName ?? null : null;
      return {
        districtId, stateId: meta?.stateId ?? cityRow[0].stateId,
        price: cityRow[0].price, ts: cityRow[0].ts,
        prevPrice: prev[0]?.prevPrice ?? null,
        stateName, cityName: meta?.cityName ?? null,
      };
    }

    // fallback → state
    const meta = await prisma.tblcities.findFirst({ where: { cityId: districtId }, select: { cityName: true, stateId: true } });
    if (!meta?.stateId) return null;

    const stateLatest = await this.latestByState(meta.stateId, fuelType);
    if (!stateLatest) return null;

    return {
      ...stateLatest,
      districtId,
      cityName: meta.cityName ?? null,
    };
  }

  /** latest for stateId — pick latest row across its districts (cities) */
  async latestByState(stateId: number, fuelType: number) {
    const rows = await prisma.$queryRaw<Array<{
      districtId: number; stateId: number; price: number; ts: Date;
      prevPrice: number | null; stateName: string | null; cityName: string | null;
    }>>(Prisma.sql`
      WITH latest_row AS (
        SELECT f1.*
        FROM tblfuelprice f1
        JOIN (
          SELECT stateId, MAX(addedDateTime) AS maxTs
          FROM tblfuelprice
          WHERE stateId = ${stateId} AND fuelType = ${fuelType}
          GROUP BY stateId
        ) t ON t.stateId = f1.stateId AND t.maxTs = f1.addedDateTime
        WHERE f1.fuelType = ${fuelType} AND f1.stateId = ${stateId}
        ORDER BY f1.addedDateTime DESC
        LIMIT 1
      ),
      prev AS (
        SELECT fp.fuelPrice AS prevPrice
        FROM tblfuelprice fp
        JOIN latest_row l ON l.stateId = fp.stateId
        WHERE fp.fuelType = ${fuelType}
          AND fp.addedDateTime < (SELECT addedDateTime FROM latest_row)
          AND fp.stateId = ${stateId}
        ORDER BY fp.addedDateTime DESC
        LIMIT 1
      )
      SELECT
        l.districtId, l.stateId, l.fuelPrice AS price, l.addedDateTime AS ts,
        (SELECT prevPrice FROM prev) AS prevPrice,
        s.stateName AS stateName,
        c.cityName  AS cityName
      FROM latest_row l
      LEFT JOIN tblstates s ON s.stateId = l.stateId
      LEFT JOIN tblcities c ON c.cityId  = l.districtId
    `);
    return rows[0] ?? null;
  }

  /** history last N days for a district (city): latest per day */
   /** history for city — fallback to state if city has no rows */
  async historyByDistrict(districtId: number, fuelType: number, days: number) {
    const anyCity = await prisma.$queryRaw<Array<{ n: number }>>(Prisma.sql`
      SELECT COUNT(*) AS n
      FROM tblfuelprice
      WHERE districtId = ${districtId} AND fuelType = ${fuelType}
        AND addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
    `);
    if (Number(anyCity[0]?.n ?? 0) > 0) {
      return prisma.$queryRaw<Array<{ day: string; price: number }>>(Prisma.sql`
        SELECT DATE_FORMAT(fp.addedDateTime, '%Y-%m-%d') AS day,
               CAST(SUBSTRING_INDEX(GROUP_CONCAT(fp.fuelPrice ORDER BY fp.addedDateTime DESC), ',', 1) AS DECIMAL(10,2)) AS price
        FROM tblfuelprice fp
        WHERE fp.districtId = ${districtId}
          AND fp.fuelType   = ${fuelType}
          AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        GROUP BY DATE(fp.addedDateTime)
        ORDER BY day ASC
      `);
    }

    // fallback to state history
    const meta = await prisma.tblcities.findFirst({ where: { cityId: districtId }, select: { stateId: true } });
    if (!meta?.stateId) return [];
    return this.historyByState(meta.stateId, fuelType, days);
  }
  /** history last N days for a state: latest per day across its cities */
  async historyByState(stateId: number, fuelType: number, days: number) {
    return prisma.$queryRaw<Array<{ day: string; price: number }>>(Prisma.sql`
      SELECT d.day,
             CAST(SUBSTRING_INDEX(GROUP_CONCAT(d.price ORDER BY d.ts DESC), ',', 1) AS DECIMAL(10,2)) AS price
      FROM (
        SELECT DATE(fp.addedDateTime) AS day, fp.addedDateTime AS ts, fp.fuelPrice AS price
        FROM tblfuelprice fp
        WHERE fp.stateId = ${stateId}
          AND fp.fuelType = ${fuelType}
          AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
      ) d
      GROUP BY d.day
      ORDER BY d.day ASC
    `);
  }

  /** state-wise list (latest + prev delta) for one fuelType */
  async statesLatest(fuelType: number, q?: { q?: string; skip?: number; take?: number; sortBy?: string }) {
    const nameFilter = q?.q ? Prisma.sql` AND s.stateName LIKE ${'%' + q.q + '%'} ` : Prisma.empty;

    const rows = await prisma.$queryRaw<Array<{
      stateId: number; stateName: string | null;
      price: number | null; prevPrice: number | null; ts: Date | null;
    }>>(Prisma.sql`
      WITH ranked AS (
        SELECT
          f.stateId,
          f.districtId,
          f.fuelPrice AS price,
          f.addedDateTime AS ts,
          ROW_NUMBER() OVER (PARTITION BY f.stateId ORDER BY f.addedDateTime DESC, f.id DESC) AS rn
        FROM tblfuelprice f
        WHERE f.fuelType = ${fuelType}
      ),
      latest_row AS (
        SELECT stateId, districtId, price, ts
        FROM ranked
        WHERE rn = 1
      ),
      prev_row AS (
        /* rn=1 (latest), rn=2 (previous). yahan se previous nikaal rahe hain */
        SELECT
          r.stateId,
          MAX(CASE WHEN r.rn = 2 THEN r.price END) AS prevPrice
        FROM ranked r
        WHERE r.rn IN (1,2)
        GROUP BY r.stateId
      )
      SELECT
        s.stateId,
        s.stateName,
        lr.price,
        pr.prevPrice,
        lr.ts
      FROM tblstates s
      LEFT JOIN latest_row lr ON lr.stateId = s.stateId
      LEFT JOIN prev_row  pr ON pr.stateId = s.stateId
      WHERE 1=1
        ${nameFilter}
      ORDER BY
        ${q?.sortBy === 'price_desc' ? Prisma.sql`lr.price DESC` :
          q?.sortBy === 'price_asc' ? Prisma.sql`lr.price ASC` :
          Prisma.sql`s.stateName ASC`}
      LIMIT ${q?.take ?? 50} OFFSET ${q?.skip ?? 0}
    `);

    const totalRows = await prisma.$queryRaw<Array<{ cnt: number }>>(Prisma.sql`
      SELECT COUNT(*) AS cnt FROM tblstates s
      WHERE 1=1 ${nameFilter}
    `);
    return { rows, total: Number(totalRows[0]?.cnt ?? 0) };
  }

  async statesLatestCombined(q?: { q?: string; skip?: number; take?: number }) {
    const nameFilter = q?.q ? Prisma.sql` AND s.stateName LIKE ${'%' + q.q + '%'} ` : Prisma.empty;

    const rows = await prisma.$queryRaw<Array<{
      stateId: number; stateName: string | null;
      petrol: number | null; petrolPrev: number | null; petrolTs: Date | null;
      diesel: number | null; dieselPrev: number | null; dieselTs: Date | null;
      cng:    number | null; cngPrev: number | null;    cngTs: Date | null;
    }>>(Prisma.sql`
      WITH ranked AS (
        SELECT
          f.stateId, f.fuelType, f.fuelPrice AS price, f.addedDateTime AS ts, f.id,
          ROW_NUMBER() OVER (PARTITION BY f.stateId, f.fuelType ORDER BY f.addedDateTime DESC, f.id DESC) AS rn
        FROM tblfuelprice f
        WHERE f.fuelType IN (1,2,3)
      ),
      latest AS (
        SELECT stateId, fuelType, price, ts
        FROM ranked
        WHERE rn = 1
      ),
      prev AS (
        SELECT
          r.stateId, r.fuelType,
          MAX(CASE WHEN r.rn = 2 THEN r.price END) AS prevPrice
        FROM ranked r
        WHERE r.rn IN (1,2)
        GROUP BY r.stateId, r.fuelType
      )
      SELECT
        s.stateId, s.stateName,
        MAX(CASE WHEN l.fuelType=1 THEN l.price END) AS petrol,
        MAX(CASE WHEN l.fuelType=1 THEN l.ts    END) AS petrolTs,
        MAX(CASE WHEN p.fuelType=1 THEN p.prevPrice END) AS petrolPrev,

        MAX(CASE WHEN l.fuelType=2 THEN l.price END) AS diesel,
        MAX(CASE WHEN l.fuelType=2 THEN l.ts    END) AS dieselTs,
        MAX(CASE WHEN p.fuelType=2 THEN p.prevPrice END) AS dieselPrev,

        MAX(CASE WHEN l.fuelType=3 THEN l.price END) AS cng,
        MAX(CASE WHEN l.fuelType=3 THEN l.ts    END) AS cngTs,
        MAX(CASE WHEN p.fuelType=3 THEN p.prevPrice END) AS cngPrev
      FROM tblstates s
      LEFT JOIN latest l ON l.stateId = s.stateId
      LEFT JOIN prev   p ON p.stateId = s.stateId AND p.fuelType = l.fuelType
      WHERE 1=1
        ${nameFilter}
      GROUP BY s.stateId, s.stateName
      ORDER BY s.stateName ASC
      LIMIT ${q?.take ?? 50} OFFSET ${q?.skip ?? 0}
    `);

    const totalRows = await prisma.$queryRaw<Array<{ cnt: number }>>(Prisma.sql`
      SELECT COUNT(*) AS cnt FROM tblstates s
      WHERE 1=1 ${nameFilter}
    `);

    return { rows, total: Number(totalRows[0]?.cnt ?? 0) };
  }

  /** cities list within a state (latest + delta) for one fuelType */
  async citiesLatest(
    stateId: number,
    fuelType: number,
    q?: { q?: string; skip?: number; take?: number; sortBy?: string; popular?: number }
  ) {
    const nameFilter  = q?.q ? Prisma.sql` AND c.cityName LIKE ${'%' + q.q + '%'} ` : Prisma.empty;
    const popularOnly = q?.popular === 1 ? Prisma.sql` AND c.isPopularCity = 1 ` : Prisma.empty;

    // 1) State latest & previous once
    const stateLatest = await prisma.$queryRaw<Array<{ price: number | null; ts: Date | null }>>(Prisma.sql`
      SELECT fp.fuelPrice AS price, fp.addedDateTime AS ts
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId} AND fp.fuelType = ${fuelType}
      ORDER BY fp.addedDateTime DESC, fp.id DESC
      LIMIT 1
    `);
    const statePrev = await prisma.$queryRaw<Array<{ prevPrice: number | null }>>(Prisma.sql`
      SELECT fp.fuelPrice AS prevPrice
      FROM tblfuelprice fp
      WHERE fp.stateId = ${stateId} AND fp.fuelType = ${fuelType}
        AND fp.addedDateTime < (SELECT addedDateTime FROM tblfuelprice
                                 WHERE stateId=${stateId} AND fuelType=${fuelType}
                                 ORDER BY addedDateTime DESC, id DESC LIMIT 1)
      ORDER BY fp.addedDateTime DESC, fp.id DESC
      LIMIT 1
    `);

    const latestPrice = stateLatest[0]?.price ?? null;
    const latestTs    = stateLatest[0]?.ts ?? null;
    const prevPrice   = statePrev[0]?.prevPrice ?? null;

    // 2) Cities list (scope from master)
    const rows = await prisma.$queryRaw<Array<{ districtId: number; cityName: string | null; stateId: number }>>(Prisma.sql`
      SELECT c.cityId AS districtId, c.cityName, c.stateId
      FROM tblcities c
      WHERE c.stateId = ${stateId}
        ${popularOnly}
        ${nameFilter}
      ORDER BY
        ${q?.sortBy === 'price_desc' || q?.sortBy === 'price_asc'
          ? Prisma.sql`c.cityName ASC` // price same for all, so keep name order stable
          : Prisma.sql`c.cityName ASC`}
      LIMIT ${q?.take ?? 50} OFFSET ${q?.skip ?? 0}
    `);

    const totalRows = await prisma.$queryRaw<Array<{ cnt: number }>>(Prisma.sql`
      SELECT COUNT(*) AS cnt
      FROM tblcities c
      WHERE c.stateId = ${stateId}
        ${popularOnly}
        ${nameFilter}
    `);

    // 3) Shape with state-level price
    const shaped = rows.map(r => ({
      districtId: r.districtId,
      cityName: r.cityName,
      stateId: r.stateId,
      price: latestPrice == null ? null : Number(latestPrice),
      prevPrice: prevPrice == null ? null : Number(prevPrice),
      ts: latestTs,
    }));

    return { rows: shaped, total: Number(totalRows[0]?.cnt ?? 0) };
  }

  async historyCombinedByState(stateId: number, days: number) {
    return prisma.$queryRaw<Array<{
      day: string; petrol: number | null; diesel: number | null; cng: number | null;
    }>>(Prisma.sql`
      WITH
      p AS (
        SELECT DATE(fp.addedDateTime) AS day,
               CAST(SUBSTRING_INDEX(GROUP_CONCAT(fp.fuelPrice ORDER BY fp.addedDateTime DESC), ',', 1) AS DECIMAL(10,2)) AS price
        FROM tblfuelprice fp
        WHERE fp.stateId = ${stateId} AND fp.fuelType = 1
          AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        GROUP BY DATE(fp.addedDateTime)
      ),
      d AS (
        SELECT DATE(fp.addedDateTime) AS day,
               CAST(SUBSTRING_INDEX(GROUP_CONCAT(fp.fuelPrice ORDER BY fp.addedDateTime DESC), ',', 1) AS DECIMAL(10,2)) AS price
        FROM tblfuelprice fp
        WHERE fp.stateId = ${stateId} AND fp.fuelType = 2
          AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        GROUP BY DATE(fp.addedDateTime)
      ),
      c AS (
        SELECT DATE(fp.addedDateTime) AS day,
               CAST(SUBSTRING_INDEX(GROUP_CONCAT(fp.fuelPrice ORDER BY fp.addedDateTime DESC), ',', 1) AS DECIMAL(10,2)) AS price
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

  /** history (last N days) for a CITY (districtId) — all 3 fuel types together (latest-per-day) */
  async historyCombinedByDistrict(districtId: number, days: number) {
    return prisma.$queryRaw<Array<{
      day: string; petrol: number | null; diesel: number | null; cng: number | null;
    }>>(Prisma.sql`
      WITH
      p AS (
        SELECT DATE(fp.addedDateTime) AS day,
               CAST(SUBSTRING_INDEX(GROUP_CONCAT(fp.fuelPrice ORDER BY fp.addedDateTime DESC), ',', 1) AS DECIMAL(10,2)) AS price
        FROM tblfuelprice fp
        WHERE fp.districtId = ${districtId} AND fp.fuelType = 1
          AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        GROUP BY DATE(fp.addedDateTime)
      ),
      d AS (
        SELECT DATE(fp.addedDateTime) AS day,
               CAST(SUBSTRING_INDEX(GROUP_CONCAT(fp.fuelPrice ORDER BY fp.addedDateTime DESC), ',', 1) AS DECIMAL(10,2)) AS price
        FROM tblfuelprice fp
        WHERE fp.districtId = ${districtId} AND fp.fuelType = 2
          AND fp.addedDateTime >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        GROUP BY DATE(fp.addedDateTime)
      ),
      c AS (
        SELECT DATE(fp.addedDateTime) AS day,
               CAST(SUBSTRING_INDEX(GROUP_CONCAT(fp.fuelPrice ORDER BY fp.addedDateTime DESC), ',', 1) AS DECIMAL(10,2)) AS price
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




}
