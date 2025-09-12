import type { Request, Response } from 'express';
import { NewsService } from './news.service.js';
import { limitDto, latestDto } from './news.dto.js';

const svc = new NewsService();

export class NewsController {
  async today(req: Request, res: Response) {
    const data = await svc.today();
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }

  async trending(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await svc.trending({ limit: q.limit });
    res.json({ success: true, rows });
  }

  async latest(req: Request, res: Response) {
    const q = latestDto.parse(req.query);
    const rows = await svc.latest({ limit: q.limit, excludeToday: q.excludeToday });
    res.json({ success: true, rows });
  }

  async top(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await svc.top({ limit: q.limit });
    res.json({ success: true, rows });
  }
}
