import { Router } from 'express';
import { ContentController } from './content.controller.js';
// (optional) CDN/browser cache headers if you’re using your middleware:
import { setCache } from '../../middlewares/cacheHeaders.js';
const r = Router();
const c = new ContentController();
/**
 * Base: /v1/content/:type
 * where :type ∈ ["news","reviews","comparison","videos", ...] per your typeFromParam
 */
r.get('/:type/today', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.today(req, res));
r.get('/:type/latest', setCache?.(180, 60) ?? ((_, __, next) => next()), (req, res) => c.latest(req, res));
r.get('/:type/trending', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.trending(req, res));
r.get('/:type/top', setCache?.(300, 60) ?? ((_, __, next) => next()), (req, res) => c.top(req, res));
r.get('/:type/popular', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.popular(req, res));
export const contentRouter = r;
