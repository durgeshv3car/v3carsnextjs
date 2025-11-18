import { ReviewsService } from './reviews.service.js';
import { limitDto, latestDto } from './reviews.dto.js';
const svc = new ReviewsService();
export class ReviewsController {
    async today(req, res) {
        const q = limitDto.parse(req.query);
        const data = await svc.today({ fuelType: q.fuelType });
        if (!data)
            return res.status(204).end();
        res.json({ success: true, data });
    }
    async latest(req, res) {
        const q = latestDto.parse(req.query);
        const rows = await svc.latest({ limit: q.limit, excludeToday: q.excludeToday, fuelType: q.fuelType });
        res.json({ success: true, rows });
    }
    async trending(req, res) {
        const q = limitDto.parse(req.query);
        const rows = await svc.trending({ limit: q.limit, fuelType: q.fuelType });
        res.json({ success: true, rows });
    }
    async top(req, res) {
        const q = limitDto.parse(req.query);
        const rows = await svc.top({ limit: q.limit, fuelType: q.fuelType });
        res.json({ success: true, rows });
    }
}
