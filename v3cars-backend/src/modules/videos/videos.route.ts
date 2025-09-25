import { Router } from 'express';
import { VideosController } from './videos.controller.js';

// (optional) cache headers middleware
import { setCache } from '../../middlewares/cacheHeaders.js';

const r = Router();
const c = new VideosController();

/** ⚠️ Fixed routes FIRST (so they don't get captured by :type) */
r.get('/latest',  setCache?.(180, 60) ?? ((_, __, next) => next()), (req, res) => c.latestGlobal(req, res));   // /v1/videos/latest (global)
r.get('/popular', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.popularGlobal(req, res));  // /v1/videos/popular (global)

/** Type-scoped routes: /v1/videos/:type/...  */
r.get('/:type/today',    setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.today(req, res));
r.get('/:type/latest',   setCache?.(180, 60) ?? ((_, __, next) => next()), (req, res) => c.latest(req, res));
r.get('/:type/trending', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.trending(req, res));
r.get('/:type/top',      setCache?.(300, 60) ?? ((_, __, next) => next()), (req, res) => c.top(req, res));

export const videosRouter = r;
