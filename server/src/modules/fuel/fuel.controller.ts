import type { Request, Response } from 'express';
import {
  fuelLatestQueryDto, fuelHistoryQueryDto,
  fuelStatesListQueryDto, fuelCitiesListQueryDto,
  fuelHistoryCombinedQueryDto,
  fuelMetrosQueryDto,
  fuelMonthlyTrendsQueryDto
} from './fuel.dto.js';
import { FuelService } from './fuel.service.js';       

const svc = new FuelService();

export class FuelController {

    async metros(req: Request, res: Response) {
    const q = fuelMetrosQueryDto.parse(req.query);
    const rows = await svc.metros(q as any);
    res.json({ success: true, rows });
  }

  /** GET /v1/fuel/price/latest/popular?fuelType=1&stateId=29 */
   async latestPopular(req: Request, res: Response) {
    const fuelType = Number(req.query.fuelType);
    const stateId = Number(req.query.stateId);
    if (!fuelType || !stateId) {
      return res.status(400).json({ success: false, message: 'fuelType and stateId are required' });
    }
    const rows = await svc.latestPopularByState(stateId, fuelType);
    return res.json({
      success: true,
      stateId,
      rows
    });
  }

  /** GET /v1/fuel/price/latest?fuelType=1&districtId=5 OR &stateId=7 */
  async latest(req: Request, res: Response) {
    const q = fuelLatestQueryDto.parse(req.query);
    const data = await svc.latest(q as any);
    if (!data) return res.status(204).end();

    const change = data.prevPrice == null || data.price == null
      ? null
      : Number((Number(data.price) - Number(data.prevPrice)).toFixed(2));

    res.json({
      success: true,
      data: {
        scope: q.districtId ? 'district' : 'state',
        stateId: data.stateId,
        stateName: data.stateName,
        districtId: data.districtId,
        cityName: data.cityName,
        price: data.price == null ? null : Number(data.price),
        prevPrice: data.prevPrice == null ? null : Number(data.prevPrice),
        change,
        updatedAt: data.ts ? new Date(data.ts).toISOString() : null,
      }
    });
  }

  /** GET /v1/fuel/price/history?fuelType=1&districtId=5&days=10 */
  async history(req: Request, res: Response) {
    const q = fuelHistoryQueryDto.parse(req.query);
    const rows = await svc.history(q as any);
    res.json({ success: true, rows });
  }

  /** GET /v1/fuel/states?fuelType=1&limit=50&page=1 */
  async states(req: Request, res: Response) {
    const q = fuelStatesListQueryDto.parse(req.query);
    const data = await svc.states(q as any);
    res.json({ success: true, ...data });
  }

  /** GET /v1/fuel/cities?fuelType=1&stateId=7&popular=1 */
  async cities(req: Request, res: Response) {
    const q = fuelCitiesListQueryDto.parse(req.query);
    const data = await svc.cities(q as any);
    res.json({ success: true, ...data });
  }

  /** GET /v1/fuel/states/combined */
  async statesCombined(req: Request, res: Response) {
    const page = Number(req.query.page ?? 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit ?? 50)));
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;
    const data = await svc.statesCombined({ q, page, limit });
    res.json({ success: true, ...data });
  }

  /** GET /v1/fuel/price/history/combined?stateId=9&days=10  OR  ?districtId=1489&days=10 */
  async historyCombined(req: Request, res: Response) {
    const q = fuelHistoryCombinedQueryDto.parse(req.query);
    const rows = await svc.historyCombined(q as any);
    res.json({ success: true, rows });
  }

   async monthlyTrends(req: Request, res: Response) {
    const q = fuelMonthlyTrendsQueryDto.parse(req.query);
    const data = await svc.monthlyTrends(q as any);
    res.json({ success: true, ...data });
  }

  
}



