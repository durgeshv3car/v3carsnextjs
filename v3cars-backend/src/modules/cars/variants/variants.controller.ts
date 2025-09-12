import type { Request, Response } from 'express';
import { variantsListQueryDto, variantIdParamDto } from './variants.dto.js';
import { VariantsService } from './variants.service.js';

const svc = new VariantsService();

export class VariantsController {
  async list(req: Request, res: Response) {
    const parsed = variantsListQueryDto.parse(req.query);
    const data = await svc.list(parsed);
    res.json(data);
  }

  async getById(req: Request, res: Response) {
    const { id } = variantIdParamDto.parse(req.params);
    const row = await svc.getById(id);
    if (!row) return res.status(404).json({ success: false, message: 'Variant not found' });
    res.json({ success: true, data: row });
  }
}
