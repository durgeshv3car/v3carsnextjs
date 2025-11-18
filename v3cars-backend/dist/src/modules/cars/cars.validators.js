import { z } from 'zod';
function parseNumberList(val) {
    if (val == null)
        return undefined;
    if (Array.isArray(val))
        return val.map((v) => Number(v)).filter((n) => !Number.isNaN(n));
    if (typeof val === 'string')
        return val.split(',').map(s => Number(s.trim())).filter(n => !Number.isNaN(n));
    return undefined;
}
function parseStringList(val) {
    if (val == null)
        return undefined;
    if (Array.isArray(val))
        return val.map(String).map(s => s.trim()).filter(Boolean);
    if (typeof val === 'string')
        return val.split(',').map(s => s.trim()).filter(Boolean);
    return undefined;
}
export const paginationQuery = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(12),
});
export const commonFiltersQuery = z.object({
    q: z.string().trim().min(1).max(100).optional(),
    isUpcoming: z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1').optional(),
    // single numeric brandId (legacy)
    brandId: z.coerce.number().int().positive().optional(),
    // 🆕 multi-brand support (comma separated or repeated query keys)
    brandIds: z.preprocess(parseNumberList, z.array(z.coerce.number().int().positive()).optional()),
    // single bodyType or multi
    bodyTypeId: z.coerce.number().int().positive().optional(),
    bodyTypeIds: z.preprocess(parseNumberList, z.array(z.coerce.number().int().positive()).optional()),
    bodyTypeName: z.string().trim().min(2).max(50).optional(),
    priceBucket: z.enum(['UNDER_5L', 'BETWEEN_5_10L', 'BETWEEN_10_20L', 'BETWEEN_20_40L', 'ABOVE_40L']).optional(),
    futureOnly: z.union([z.literal('1'), z.literal('0')]).transform(v => v === '1').optional(),
    /** 🆕 fuel/transmission filters (service-level using powertrains) */
    fuelType: z.string().trim().max(50).optional(),
    transmissionType: z.string().trim().max(50).optional(),
    /** 🆕 other powertrain/spec filters (enumerated) */
    // single or multi cylinders (2,3,4,5,6,7,8_PLUS)
    cylinders: z.enum(['2', '3', '4', '5', '6', '7', '8_PLUS']).optional(),
    cylindersList: z.preprocess(parseStringList, z.array(z.enum(['2', '3', '4', '5', '6', '7', '8_PLUS'])).optional()),
    mileage: z.enum(['UNDER_10', 'BETWEEN_10_15', 'ABOVE_15']).optional(),
    seating: z.coerce.number().int().optional(),
    seatingList: z.preprocess(parseNumberList, z.array(z.coerce.number().int().optional()).optional()),
    // engine displacement choices (string keys) - keep single for now
    engineDisplacement: z.enum([
        '800', '1000', '800_1000', '1000_1500', '1500_2000', '2000_3000', '3000_4000', 'ABOVE_4000'
    ]).optional(),
    // min/max price numeric (in ₹)
    minPrice: z.coerce.number().int().positive().optional(),
    maxPrice: z.coerce.number().int().positive().optional(),
});
export const sortQuery = z.object({
    sortBy: z.enum([
        'latest', 'popular', 'price_asc', 'price_desc', 'name_asc', 'name_desc',
        'launch_asc'
    ]).optional(),
});
