import type { Request, Response } from 'express';
import { ReviewsService } from './reviews.service.js';
import { limitDto, latestDto } from './reviews.dto.js';

const svc = new ReviewsService();

export class ReviewsController {
  async today(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const data = await (svc as any).today({ fuelType: q.fuelType });
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }

  async latest(req: Request, res: Response) {
    const q = latestDto.parse(req.query);
    const rows = await (svc as any).latest({ limit: q.limit, excludeToday: q.excludeToday, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }

  async trending(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await (svc as any).trending({ limit: q.limit, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }

  async top(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await (svc as any).top({ limit: q.limit, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }
}
