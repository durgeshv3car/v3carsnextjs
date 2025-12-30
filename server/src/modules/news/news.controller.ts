import type { Request, Response } from 'express';
import { NewsService } from './news.service.js';
import { limitDto, latestDto } from './news.dto.js';

const svc = new NewsService();

export class NewsController {
  async today(req: Request, res: Response) {
    // allow optional fuelType
    const q = limitDto.parse(req.query);
    const data = await (svc as any).today({ fuelType: q.fuelType }); // cast to any if types lag behind
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }

  async trending(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await (svc as any).trending({ limit: q.limit, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }

  async latest(req: Request, res: Response) {
    const q = latestDto.parse(req.query);
    const rows = await (svc as any).latest({ limit: q.limit, excludeToday: q.excludeToday, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }

  async top(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await (svc as any).top({ limit: q.limit, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }
  
   async popular(req: Request, res: Response) {
    const limit = Math.max(1, Math.min(Number(req.query.limit) || 9, 50));
    const rows = await svc.popular({ limit });
    res.json({ success: true, rows });
  }
}
