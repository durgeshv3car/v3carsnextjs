import type { Request, Response } from 'express';
import { ModelsService } from './models.service.js';
import { modelIdParamDto, modelsListQueryDto, upcomingMonthlyCountDto, topSellingMonthlyDto } from './models.dto.js';

const svc = new ModelsService();


export class ModelsController {
  async list(req: Request, res: Response) {
    const q = modelsListQueryDto.parse(req.query);
    const data = await svc.list(q as any);
    res.json({ success: true, ...data });
  }

  async getById(req: Request, res: Response) {
    const parsed = modelIdParamDto.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid model id',
        issues: parsed.error.issues,
      });
    }
    const { id } = parsed.data;
    const row = await svc.getById(id);
    if (!row) return res.status(404).json({ success: false, message: 'Model not found' });
    res.json({ success: true, data: row });
  }

  async upcomingMonthlyCount(req: Request, res: Response) {
    const q = upcomingMonthlyCountDto.parse(req.query);
    const rows = await svc.upcomingMonthlyCount({
      months: q.months,
      brandId: q.brandId,
      bodyTypeId: q.bodyTypeId,
    });
    res.json({ success: true, rows });
  }

;

// inside class
  async topSellingMonthly(req: Request, res: Response) {
    const q = topSellingMonthlyDto.parse(req.query);
    const data = await svc.topSellingModelsByMonth({ year: q.year, month: q.month, limit: q.limit });
    res.json({ success: true, ...data });
  }

}