import type { Request, Response } from 'express';
import { ModelsService } from './models.service.js';
import { modelIdParamDto, modelsListQueryDto, upcomingMonthlyCountDto, topSellingMonthlyDto, modelPriceListQueryDto, modelBestVariantQueryDto, modelMsfQueryDto } from './models.dto.js';

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
    const data = await svc.getById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Model not found' });
    res.json({ success: true, data });
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

  async priceList(req: Request, res: Response) {
    const parsedId = modelIdParamDto.safeParse(req.params);
    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: 'Invalid model id', issues: parsedId.error.issues });
    }
    const q = modelPriceListQueryDto.parse(req.query);
    const data = await svc.priceList(parsedId.data.id, q);
    res.json({ success: true, ...data });
  }

  async bestVariantToBuy(req: Request, res: Response) {
    const parsedId = modelIdParamDto.safeParse(req.params);
    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: 'Invalid model id', issues: parsedId.error.issues });
    }
    const q = modelBestVariantQueryDto.parse(req.query);
    const data = await svc.bestVariantToBuy(parsedId.data.id, q as any);
    res.json(data);
  }


  async dimensionsCapacity(req: Request, res: Response) {
    const parsedId = modelIdParamDto.safeParse(req.params);
    if (!parsedId.success) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid model id', issues: parsedId.error.issues });
    }
    const data = await svc.dimensionsCapacity(parsedId.data.id);
    if (!data) return res.status(404).json({ success: false, message: 'Model not found' });
    res.json({ success: true, ...data });
  }


  async mileageSpecsFeatures(req: Request, res: Response) {
    const parsedId = modelIdParamDto.safeParse(req.params);
    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: 'Invalid model id', issues: parsedId.error.issues });
    }
    const q = modelMsfQueryDto.parse(req.query);
    const data = await svc.mileageSpecsFeatures(parsedId.data.id, q as any);
    res.json(data);
  }


  async prosCons(req: Request, res: Response) {
    const parsedId = modelIdParamDto.safeParse(req.params);
    if (!parsedId.success) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid model id', issues: parsedId.error.issues });
    }
    const data = await svc.prosCons(parsedId.data.id);
    res.json(data);
  }

  async compareSimilar(req: Request, res: Response) {
    const parsedId = modelIdParamDto.safeParse(req.params);
    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: 'Invalid model id', issues: parsedId.error.issues });
    }
    const data = await svc.compareSimilar(parsedId.data.id);
    res.json(data);
  }
}