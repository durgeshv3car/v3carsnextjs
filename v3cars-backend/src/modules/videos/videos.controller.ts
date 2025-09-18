import type { Request, Response } from 'express';
import { VideosService } from './videos.service.js';
import { limitDto, latestDto } from './videos.dto.js';
import { videoTypeFromParam } from './videos.constants.js';

const svc = new VideosService();

export class VideosController {
  /** ✅ Global latest (no type) + optional EV scope */
  async latestGlobal(req: Request, res: Response) {
    const q = latestDto.parse(req.query);
    const rows = await svc.latestGlobal({ limit: q.limit, excludeToday: q.excludeToday, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }

  async today(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const q = limitDto.parse(req.query); // to accept fuelType
    const data = await svc.today(type, { fuelType: q.fuelType });
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }

  async latest(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const q = latestDto.parse(req.query);
    const rows = await svc.latest(type, { limit: q.limit, excludeToday: q.excludeToday, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }

  async trending(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const rows = await svc.trending(type, { limit: q.limit, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }

  async top(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const rows = await svc.top(type, { limit: q.limit, fuelType: q.fuelType });
    res.json({ success: true, rows });
  }
}
