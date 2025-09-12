import type { Request, Response } from 'express';
import { modelsListQueryDto, modelIdParamDto } from './models.dto.js';
import { ModelsService } from './models.service.js';

const svc = new ModelsService();

export class ModelsController {
  async list(req: Request, res: Response) {
    const parsed = modelsListQueryDto.parse(req.query);
    const data = await svc.list(parsed);
    res.json({ success: true, ...data });
  }

  async getById(req: Request, res: Response) {
    const { id } = modelIdParamDto.parse(req.params);
    const row = await svc.getById(id);
    if (!row) return res.status(404).json({ success: false, message: 'Model not found' });
    res.json({ success: true, data: row });
  }
}
