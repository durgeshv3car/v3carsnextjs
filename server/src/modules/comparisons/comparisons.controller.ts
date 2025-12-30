import type { Request, Response } from 'express';
import { ComparisonsService } from './comparisons.service.js';
import { limitDto, latestDto } from './comparisons.dto.js';

const svc = new ComparisonsService();

export class ComparisonsController {
  async today(req: Request, res: Response) {
    const data = await svc.today();
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }

  async latest(req: Request, res: Response) {
    const q = latestDto.parse(req.query);
    const rows = await svc.latest({ limit: q.limit, excludeToday: q.excludeToday });
    res.json({ success: true, rows });
  }

  async trending(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await svc.trending({ limit: q.limit });
    res.json({ success: true, rows });
  }

  async top(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await svc.top({ limit: q.limit });
    res.json({ success: true, rows });
  }

  /** 🆕 GET /v1/comparisons/popular?limit=15 */
  async popular(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await svc.popular({ limit: q.limit });
    res.json({ success: true, rows });
  }
}
