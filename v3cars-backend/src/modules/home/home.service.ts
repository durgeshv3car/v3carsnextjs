import { ModelsService } from '../cars/models/models.service.js';
import type {
  UpcomingQuery,
  QuickLookQuery,
  BodyTypeQuery,
  PriceQuery,
  HomeLatestNewsQuery,
  HomeLatestReviewsQuery,
} from './home.types.js';
import { NewsService } from '../news/news.service.js';
import { ReviewsService } from '../reviews/reviews.service.js';

const models = new ModelsService();
const news = new NewsService();
const reviews = new ReviewsService();

export class HomeService {
  upcoming(q: UpcomingQuery) {
    return models.list({
      page: q.page ?? 1,
      limit: q.limit ?? 8,
      isUpcoming: true,
      sortBy: 'launch_asc',
      futureOnly: true as any,
    } as any);
  }

  quickLook(q: QuickLookQuery) {
    const sortBy = q.type === 'popular' ? 'popular' : 'latest';
    return models.list({
      page: q.page ?? 1,
      limit: q.limit ?? 8,
      isUpcoming: false,
      sortBy,
    } as any);
  }

  byBodyType(q: BodyTypeQuery) {
    return models.list({
      page: q.page ?? 1,
      limit: q.limit ?? 8,
      bodyTypeId: q.bodyTypeId,
      isUpcoming: typeof q.isUpcoming === 'boolean' ? q.isUpcoming : undefined,
      sortBy: q.sortBy ?? 'popular',
    } as any);
  }

  byPrice(q: PriceQuery) {
    return models.list({
      page: q.page ?? 1,
      limit: q.limit ?? 8,
      priceBucket: q.bucket,
      isUpcoming: typeof q.isUpcoming === 'boolean' ? q.isUpcoming : undefined,
      sortBy: q.sortBy ?? 'price_asc',
    } as any);
  }

  /** Latest car news (excludes 'today' by default) */
  async latestNews(q: HomeLatestNewsQuery) {
    const limit = q.limit ?? 9;
    const excludeToday = q.excludeToday !== false; // default true
    return news.latest({ limit, excludeToday });
  }

  /** ✅ Latest expert reviews (include 'today' by default) */
  async latestReviews(q: HomeLatestReviewsQuery) {
    const limit = q.limit ?? 6;
    const excludeToday = q.excludeToday ?? false; // default false
    return reviews.latest({ limit, excludeToday });
  }
}
