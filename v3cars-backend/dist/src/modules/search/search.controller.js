import { searchQueryDto } from './search.dto.js';
import { SearchService } from './search.service.js';
const svc = new SearchService();
export class SearchController {
    async universal(req, res) {
        const { q, citySlug, cityName, limit } = searchQueryDto.parse(req.query);
        const data = await svc.universal({ q, citySlug, cityName, limit });
        res.json({ success: true, query: data.query, rows: data.rows });
    }
}
