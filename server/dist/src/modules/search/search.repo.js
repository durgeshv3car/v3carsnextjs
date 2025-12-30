import { prisma } from '../../lib/prisma.js';
import { Prisma } from '@prisma/client';
function buildPattern(tokens) {
    if (!tokens.length)
        return '';
    return `%${tokens.join('%')}%`;
}
function buildPrefix(tokens) {
    if (!tokens.length)
        return '';
    return `${tokens[0]}%`;
}
export class SearchRepo {
    async searchBrands(tokens, limit) {
        if (!tokens.length)
            return [];
        const first = tokens[0];
        const pattern = `%${first}%`;
        const prefix = `${first}%`;
        return prisma.$queryRaw(Prisma.sql `
      SELECT brandId, brandName, brandSlug
      FROM tblbrands
      WHERE brandSlug LIKE ${prefix}
         OR brandName LIKE ${prefix}
         OR LOWER(brandName) LIKE ${pattern}
         OR LOWER(brandSlug) LIKE ${pattern}
      ORDER BY brandId ASC
      LIMIT ${limit}
    `);
    }
    async searchModels(tokens, limit) {
        if (!tokens.length)
            return [];
        const first = tokens[0];
        const pattern = `%${first}%`;
        const prefix = `${first}%`;
        return prisma.$queryRaw(Prisma.sql `
      SELECT
        m.modelId,
        m.modelName,
        m.modelSlug,
        m.brandId,
        b.brandName,
        b.brandSlug
      FROM tblmodels m
      JOIN tblbrands b ON b.brandId = m.brandId
      WHERE m.isUpcoming != 2
        AND m.is_deleted != 1
        AND b.is_deleted != 1
        AND (
          m.modelSlug LIKE ${prefix}
          OR m.modelName LIKE ${prefix}
          OR b.brandSlug LIKE ${prefix}
          OR b.brandName LIKE ${prefix}
          OR LOWER(CONCAT(b.brandName, ' ', m.modelName)) LIKE ${pattern}
          OR LOWER(m.modelName) LIKE ${pattern}
          OR LOWER(b.brandName) LIKE ${pattern}
        )
      ORDER BY m.totalViews DESC, m.modelId DESC
      LIMIT ${limit}
    `);
    }
}
