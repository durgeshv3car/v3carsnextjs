import type { Request, Response } from 'express';
import { searchQueryDto } from './search.dto.js';
import { SearchService } from './search.service.js';

const svc = new SearchService();

export class SearchController {
  async universal(req: Request, res: Response) {
    const { q, citySlug, cityName, limit } = searchQueryDto.parse(req.query);
    const data = await svc.universal({ q, citySlug, cityName, limit });
    res.json({ success: true, query: data.query, rows: data.rows });
  }
}

