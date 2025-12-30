import { WebStoriesService } from './webstories.service.js';
import { webStoriesListDto } from './webstories.dto.js';
const svc = new WebStoriesService();
export class WebStoriesController {
    async list(req, res) {
        const q = webStoriesListDto.parse(req.query);
        const data = await svc.list({ page: q.page, limit: q.limit });
        res.json({ success: true, ...data });
    }
}
