import type { Request, Response } from 'express';
import { StatesService } from './states.service.js';
import { statesListQueryDto, stateIdParamDto } from './states.dto.js';

const svc = new StatesService();

export class StatesController {
  async list(req: Request, res: Response) {
    const q = statesListQueryDto.parse(req.query);
    const data = await svc.list(q as any);
    res.json({ success: true, ...data });
  }

  async getById(req: Request, res: Response) {
    const parsed = stateIdParamDto.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: 'Invalid state id', issues: parsed.error.issues });
    }
    const row = await svc.getById(parsed.data.id);
    if (!row) return res.status(404).json({ success: false, message: 'State not found' });
    res.json({ success: true, data: row });
  }
}
