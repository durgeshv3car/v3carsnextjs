import { ContentService } from '../content/content.service.js';
import { CONTENT_TYPES } from '../content/content.constants.js';
import type { ComparisonsListQuery, LatestComparisonsQuery } from './comparisons.types.js';

const content = new ContentService();

/** Comparison Reviews (contentType = 4) */
export class ComparisonsService {
  /** Single most recent comparison review (up to DB NOW()) */
  today() {
    return content.today(CONTENT_TYPES.COMPARISON_REVIEW);
  }

  /** Latest list (publishDateandTime DESC) */
  latest(q: LatestComparisonsQuery) {
    return content.latest(CONTENT_TYPES.COMPARISON_REVIEW, {
      limit: q.limit,
      excludeToday: q.excludeToday ?? false, // include today's by default
    });
  }

  /** Trending (last_15days_view DESC) */
  trending(q: ComparisonsListQuery) {
    return content.trending(CONTENT_TYPES.COMPARISON_REVIEW, { limit: q.limit });
  }

  /** Top (last_30days_view DESC) */
  top(q: ComparisonsListQuery) {
    return content.top(CONTENT_TYPES.COMPARISON_REVIEW, { limit: q.limit });
  }
}
