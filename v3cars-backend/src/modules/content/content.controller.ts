import type { Request, Response } from 'express';
import { ContentService } from './content.service.js';
import { typeFromParam } from './content.constants.js';
import { limitDto, latestDto } from './content.dto.js';

const svc = new ContentService();

export class ContentController {
  async today(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const data = await svc.today(type);
    if (!data) return res.status(204).end();
    res.json({ success: true, data });
  }
  async latest(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = latestDto.parse(req.query);
    const rows = await svc.latest(type, q);
    res.json({ success: true, rows });
  }
  async trending(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const rows = await svc.trending(type, q);
    res.json({ success: true, rows });
  }
  async top(req: Request, res: Response) {
    const type = typeFromParam(req.params.type);
    const q = limitDto.parse(req.query);
    const rows = await svc.top(type, q);
    res.json({ success: true, rows });
  }
}
