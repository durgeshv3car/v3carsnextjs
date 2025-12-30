import type { Request, Response } from 'express';
import { CountriesService } from './countries.service.js';
import { countriesListQueryDto, countryIdParamDto } from './countries.dto.js';

const svc = new CountriesService();

export class CountriesController {
  async list(req: Request, res: Response) {
    const q = countriesListQueryDto.parse(req.query);
    const data = await svc.list(q as any);
    res.json({ success: true, ...data });
  }

  async getById(req: Request, res: Response) {
    const parsed = countryIdParamDto.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: 'Invalid country id', issues: parsed.error.issues });
    }
    const row = await svc.getById(parsed.data.id);
    if (!row) return res.status(404).json({ success: false, message: 'Country not found' });
    res.json({ success: true, data: row });
  }
}
