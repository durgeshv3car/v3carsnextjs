import { NewsService } from './news.service.js';
import { limitDto, latestDto } from './news.dto.js';
const svc = new NewsService();
export class NewsController {
    async today(req, res) {
        // allow optional fuelType
        const q = limitDto.parse(req.query);
        const data = await svc.today({ fuelType: q.fuelType }); // cast to any if types lag behind
        if (!data)
            return res.status(204).end();
        res.json({ success: true, data });
    }
    async trending(req, res) {
        const q = limitDto.parse(req.query);
        const rows = await svc.trending({ limit: q.limit, fuelType: q.fuelType });
        res.json({ success: true, rows });
    }
    async latest(req, res) {
        const q = latestDto.parse(req.query);
        const rows = await svc.latest({ limit: q.limit, excludeToday: q.excludeToday, fuelType: q.fuelType });
        res.json({ success: true, rows });
    }
    async top(req, res) {
        const q = limitDto.parse(req.query);
        const rows = await svc.top({ limit: q.limit, fuelType: q.fuelType });
        res.json({ success: true, rows });
    }
    async popular(req, res) {
        const limit = Math.max(1, Math.min(Number(req.query.limit) || 9, 50));
        const rows = await svc.popular({ limit });
        res.json({ success: true, rows });
    }
}
