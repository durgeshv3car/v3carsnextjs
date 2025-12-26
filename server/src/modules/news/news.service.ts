import { ContentService } from '../content/content.service.js';
import { CONTENT_TYPES } from '../content/content.constants.js';
import type { NewsListQuery, LatestNewsQuery } from './news.types.js';

// Keep the same shape & endpoints; just delegate to generic content layer
const content = new ContentService();

export class NewsService {
  today() {
    return content.today(CONTENT_TYPES.NEWS);
  }
  trending(q: NewsListQuery) {
    return content.trending(CONTENT_TYPES.NEWS, { limit: q.limit });
  }
  latest(q: LatestNewsQuery) {
    return content.latest(CONTENT_TYPES.NEWS, { limit: q.limit, excludeToday: q.excludeToday });
  }
  top(q: NewsListQuery) {
    return content.top(CONTENT_TYPES.NEWS, { limit: q.limit });
  }
  
 popular(q: NewsListQuery & { fuelType?: string }) {
    return content.popular(CONTENT_TYPES.NEWS, { limit: q.limit, fuelType: (q as any).fuelType });
  }
}
