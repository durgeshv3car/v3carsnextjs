import { ContentService } from '../content/content.service.js';
import { CONTENT_TYPES } from '../content/content.constants.js';
import type { ReviewsListQuery, LatestReviewsQuery } from './reviews.types.js';

const content = new ContentService();

/**
 * Expert Reviews (contentType = 2)
 * Mirrors News API behavior, but defaults excludeToday=false for lists.
 */
export class ReviewsService {
  /** Single most recent review (up to DB NOW()) */
  today() {
    return content.today(CONTENT_TYPES.EXPERT_REVIEW);
  }

  /** Latest reviews list (date desc) */
  latest(q: LatestReviewsQuery) {
    return content.latest(CONTENT_TYPES.EXPERT_REVIEW, {
      limit: q.limit,
      excludeToday: q.excludeToday ?? false,
    });
  }

  /** Trending reviews (last_15days_view desc) */
  trending(q: ReviewsListQuery) {
    return content.trending(CONTENT_TYPES.EXPERT_REVIEW, { limit: q.limit });
  }

  /** Top reviews (last_30days_view desc) */
  top(q: ReviewsListQuery) {
    return content.top(CONTENT_TYPES.EXPERT_REVIEW, { limit: q.limit });
  }
}
