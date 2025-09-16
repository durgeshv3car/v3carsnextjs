import type { Request, Response } from 'express';
import { brandsListQueryDto, brandIdParamDto } from './brands.dto.js';
import { BrandsService } from './brands.service.js';

const svc = new BrandsService();

export class BrandsController {
  async list(req: Request, res: Response) {
    const parsed = brandsListQueryDto.parse(req.query);
    const data = await svc.list(parsed);
    res.json({ success: true, ...data });
  }

  async getById(req: Request, res: Response) {
    const { id } = brandIdParamDto.parse(req.params);
    const row = await svc.getById(id);
    if (!row) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, data: row });
  }
}
