import type { Request, Response } from 'express';
import { ModelsService } from './models.service.js';
import {
  modelsListQueryDto,
  upcomingMonthlyCountDto,
  topSellingMonthlyDto,
  modelPriceListQueryDto,
  modelBestVariantQueryDto,
  modelMsfQueryDto,
  modelOffersQueryDto,
  modelDimensionsQueryDto,
  modelFuelEfficiencyQueryDto,
  modelCsdVsOnroadQueryDto,
  modelMonthlySalesQueryDto,
  modelUpcomingByBrandDto,
} from './models.dto.js';



const svc = new ModelsService();

export class ModelsController {

  /** id or slug → numeric modelId resolver */
  private async resolve(req: Request, res: Response): Promise<number | null> {
    const raw = String(req.params.id || '');
    const id = await svc.resolveModelId(raw);
    if (!id) {
      res.status(404).json({ success: false, message: 'Model not found' });
      return null;
    }
    return id;
  }

  async list(req: Request, res: Response) {
    const q = modelsListQueryDto.parse(req.query);
    const data = await svc.list(q as any);
    res.json({ success: true, ...data });
  }

  async getById(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;
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


  async topSellingMonthly(req: Request, res: Response) {
    const q = topSellingMonthlyDto.parse(req.query);
    const data = await svc.topSellingModelsByMonth({ year: q.year, month: q.month, limit: q.limit });
    res.json({ success: true, ...data });
  }


  async priceList(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;
    const q = modelPriceListQueryDto.parse(req.query);
    const data = await svc.priceList(id, q as any);
    res.json({ success: true, ...data });
  }


  async bestVariantToBuy(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;
    const q = modelBestVariantQueryDto.parse(req.query);
    const data = await svc.bestVariantToBuy(id, q as any);
    res.json(data);
  }


  async dimensionsCapacity(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;
    const q = modelDimensionsQueryDto.parse(req.query);
    const data = await svc.dimensionsCapacity(id, q as any);
    if (!data) return res.status(404).json({ success: false, message: 'Model not found' });
    res.json({ success: true, ...data });
  }


  async mileageSpecsFeatures(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;
    const q = modelMsfQueryDto.parse(req.query);
    const data = await svc.mileageSpecsFeatures(id, q as any);
    res.json(data);
  }


  async prosCons(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;
    const data = await svc.prosCons(id);
    res.json(data);
  }


  async competitors(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;
    const data = await svc.competitors(id);
    res.json(data);
  }

  async fuelEfficiency(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;

    const q = modelFuelEfficiencyQueryDto.parse(req.query);
    const data = await svc.fuelEfficiency(id, q);
    res.json(data);
  }

  async csdVsOnroad(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;

    const q = modelCsdVsOnroadQueryDto.parse(req.query);
    const data = await svc.csdVsOnroad(id, q);

    res.json({ success: true, ...data });
  }

  async offersDiscounts(req: Request, res: Response) {
    const id = await this.resolve(req, res);
    if (!id) return;

    const q = modelOffersQueryDto.parse(req.query);
    const data = await svc.offersDiscounts(id, q as any);
    res.json(data);
  }

  async monthlySales(req: Request, res: Response) {
  const id = await this.resolve(req, res);
  if (!id) return;

  const q = modelMonthlySalesQueryDto.parse(req.query);
  const data = await svc.monthlySales(id, { months: q.months ?? 6 });

 
  res.json(data);
}

async upcomingByBrand(req: Request, res: Response) {
  const id = await this.resolve(req, res);
  if (!id) return;

  const q = modelUpcomingByBrandDto.parse(req.query);
  const data = await svc.upcomingByBrand(id, { limit: q.limit });
  res.json({ success: true, ...data });
}


}

