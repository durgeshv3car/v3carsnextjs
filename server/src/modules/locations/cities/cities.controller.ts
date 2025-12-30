import type { Request, Response } from 'express';
import { CitiesService } from './cities.service.js';
import { citiesListQueryDto, cityIdParamDto } from './cities.dto.js';

const svc = new CitiesService();

export class CitiesController {
  async list(req: Request, res: Response) {
    const q = citiesListQueryDto.parse(req.query);
    const data = await svc.list(q);
    res.json({ success: true, ...data });
  }

  async getById(req: Request, res: Response) {
    const { id } = cityIdParamDto.parse(req.params);
    const row = await svc.getById(id);
    if (!row) return res.status(404).json({ success: false, message: 'City not found' });
    res.json({ success: true, data: row });
  }
}
