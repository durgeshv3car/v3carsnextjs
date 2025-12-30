import { ContentService } from '../content/content.service.js';
import { CONTENT_TYPES } from '../content/content.constants.js';
// Keep the same shape & endpoints; just delegate to generic content layer
const content = new ContentService();
export class NewsService {
    today() {
        return content.today(CONTENT_TYPES.NEWS);
    }
    trending(q) {
        return content.trending(CONTENT_TYPES.NEWS, { limit: q.limit });
    }
    latest(q) {
        return content.latest(CONTENT_TYPES.NEWS, { limit: q.limit, excludeToday: q.excludeToday });
    }
    top(q) {
        return content.top(CONTENT_TYPES.NEWS, { limit: q.limit });
    }
    popular(q) {
        return content.popular(CONTENT_TYPES.NEWS, { limit: q.limit, fuelType: q.fuelType });
    }
}
