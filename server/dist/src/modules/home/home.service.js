import { ModelsService } from '../cars/models/models.service.js';
import { NewsService } from '../news/news.service.js';
import { ReviewsService } from '../reviews/reviews.service.js';
import { ContentService } from '../content/content.service.js';
import { CONTENT_TYPES } from '../content/content.constants.js';
import { VideosService } from '../videos/videos.service.js';
import { prisma } from '../../lib/prisma.js';
const models = new ModelsService();
const news = new NewsService();
const reviews = new ReviewsService();
const content = new ContentService();
const videos = new VideosService();
export class HomeService {
    async heroBanners(q) {
        const limit = q.limit ?? 6;
        return prisma.tblhomepagebanner.findMany({
            where: { status: true },
            orderBy: { bannerId: 'desc' },
            take: limit,
            select: {
                bannerId: true,
                imagePath: true,
                imageAltTag: true,
                redirectLink: true,
                startDate: true,
                endDate: true,
            },
        });
    }
    upcoming(q) {
        return models.list({
            page: q.page ?? 1,
            limit: q.limit ?? 8,
            isUpcoming: true,
            sortBy: 'launch_asc',
            futureOnly: true,
        });
    }
    quickLook(q) {
        const sortBy = q.type === 'popular' ? 'popular' : 'latest';
        return models.list({
            page: q.page ?? 1,
            limit: q.limit ?? 8,
            isUpcoming: false,
            sortBy,
        });
    }
    byBodyType(q) {
        return models.list({
            page: q.page ?? 1,
            limit: q.limit ?? 8,
            bodyTypeId: q.bodyTypeId,
            isUpcoming: typeof q.isUpcoming === 'boolean' ? q.isUpcoming : undefined,
            sortBy: q.sortBy ?? 'popular',
        });
    }
    byPrice(q) {
        return models.list({
            page: q.page ?? 1,
            limit: q.limit ?? 8,
            priceBucket: q.bucket,
            // default: on-sale
            isUpcoming: typeof q.isUpcoming === 'boolean' ? q.isUpcoming : false,
            sortBy: q.sortBy ?? 'price_asc',
        });
    }
    async latestNews(q) {
        const limit = q.limit ?? 9;
        const excludeToday = q.excludeToday !== false; // default true
        const rows = await news.latest({ limit, excludeToday });
        return rows;
    }
    /** Latest expert reviews (articles, type=2) */
    async latestReviews(q) {
        const limit = q.limit ?? 6;
        const excludeToday = q.excludeToday ?? false;
        return reviews.latest({ limit, excludeToday });
    }
    /** 🆕 Latest Videos (global — no videoType filter) */
    async latestVideos(q) {
        const limit = q.limit ?? 9;
        return videos.latestGlobal({ limit });
    }
    /** 🆕 Variants Explained (articles, type=3) for home */
    async latestVariantExplained(q) {
        const limit = q.limit ?? 6;
        const excludeToday = q.excludeToday ?? false;
        return content.latest(CONTENT_TYPES.VARIANTS_EXPLAINED, { limit, excludeToday });
    }
}
