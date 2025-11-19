import type { Request, Response } from 'express';
import { VideosService } from './videos.service.js';
import { limitDto, latestDto } from './videos.dto.js';
import { videoTypeFromParam } from './videos.constants.js';

const svc = new VideosService();

export class VideosController {
  // global/type-scoped (unchanged)
  async latestGlobal(req: Request, res: Response) {
    const q = latestDto.parse(req.query);
    const rows = await svc.latestGlobal({ limit: q.limit, excludeToday: q.excludeToday });
    res.json({ success: true, rows });
  }
  async popularGlobal(req: Request, res: Response) {
    const q = limitDto.parse(req.query);
    const rows = await svc.popularGlobal({ limit: q.limit });
    res.json({ success: true, rows });
  }
  async today(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const data = await svc.today(type);
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }
  async latest(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const q = latestDto.parse(req.query);
    const rows = await svc.latest(type, { limit: q.limit, excludeToday: q.excludeToday });
    res.json({ success: true, rows });
  }
  async trending(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const rows = await svc.trending(type, { limit: q.limit });
    res.json({ success: true, rows });
  }
  async top(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const rows = await svc.top(type, { limit: q.limit });
    res.json({ success: true, rows });
  }

  // ✅ model-scoped (LEFT JOIN tbltagging)
  async modelToday(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    const data = await svc.todayByModel(type, modelId);
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }
  async modelLatest(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    const q = latestDto.parse(req.query);
    const rows = await svc.latestByModel(type, modelId, { limit: q.limit, excludeToday: q.excludeToday });
    res.json({ success: true, rows });
  }
  async modelTrending(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    const q = limitDto.parse(req.query);
    const rows = await svc.trendingByModel(type, modelId, { limit: q.limit });
    res.json({ success: true, rows });
  }
  async modelTop(req: Request, res: Response) {
    const type = videoTypeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    const q = limitDto.parse(req.query);
    const rows = await svc.topByModel(type, modelId, { limit: q.limit });
    res.json({ success: true, rows });
  }
  async modelPopular(req: Request, res: Response) {
    const modelId = Number(req.params.modelId);
    const q = limitDto.parse(req.query);
    const rows = await svc.popularByModel(modelId, { limit: q.limit });
    res.json({ success: true, rows });
  }
}
