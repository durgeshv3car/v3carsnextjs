import type { Request, Response } from 'express';
import { ContentService } from './content.service.js';
import { typeFromParam } from './content.constants.js';
import { limitDto, latestDto } from './content.dto.js';

const svc = new ContentService();

export class ContentController {
  async today(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = { fuelType: (req.query.fuelType as string | undefined)?.trim() || undefined };
    const data = await svc.today(type, q);
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }

  async latest(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = latestDto.parse(req.query);
    const fuelType = (req.query.fuelType as string | undefined)?.trim() || undefined;
    const rows = await svc.latest(type, { ...q, fuelType });
    res.json({ success: true, rows });
  }

  async trending(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const fuelType = (req.query.fuelType as string | undefined)?.trim() || undefined;
    const rows = await svc.trending(type, { ...q, fuelType });
    res.json({ success: true, rows });
  }

  async top(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const fuelType = (req.query.fuelType as string | undefined)?.trim() || undefined;
    const rows = await svc.top(type, { ...q, fuelType });
    res.json({ success: true, rows });
  }

  async popular(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const fuelType = (req.query.fuelType as string | undefined)?.trim() || undefined;
    const rows = await svc.popular(type, { ...q, fuelType });
    res.json({ success: true, rows });
  }

  // -------- NEW: strict by modelId (tbltagging) --------

  async todayByModel(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    if (!Number.isFinite(modelId) || modelId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid model id' });
    }
    const data = await svc.todayForModel(type, modelId);
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }

  async latestByModel(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    if (!Number.isFinite(modelId) || modelId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid model id' });
    }
    const q = latestDto.parse(req.query);
    const rows = await svc.latestForModel(type, modelId, q);
    res.json({ success: true, rows });
  }

  async trendingByModel(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    if (!Number.isFinite(modelId) || modelId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid model id' });
    }
    const q = limitDto.parse(req.query);
    const rows = await svc.trendingForModel(type, modelId, q);
    res.json({ success: true, rows });
  }

  async topByModel(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    if (!Number.isFinite(modelId) || modelId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid model id' });
    }
    const q = limitDto.parse(req.query);
    const rows = await svc.topForModel(type, modelId, q);
    res.json({ success: true, rows });
  }

  async popularByModel(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const modelId = Number(req.params.modelId);
    if (!Number.isFinite(modelId) || modelId <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid model id' });
    }
    const q = limitDto.parse(req.query);
    const rows = await svc.popularForModel(type, modelId, q);
    res.json({ success: true, rows });
  }
}
