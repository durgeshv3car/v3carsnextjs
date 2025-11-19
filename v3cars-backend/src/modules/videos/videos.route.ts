import { Router } from 'express';
import { VideosController } from './videos.controller.js';
import { setCache } from '../../middlewares/cacheHeaders.js';

const r = Router();
const c = new VideosController();

// fixed global routes
r.get('/latest',  setCache?.(180, 60) ?? ((_, __, next) => next()), (req, res) => c.latestGlobal(req, res));
r.get('/popular', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.popularGlobal(req, res));

// type-scoped (global)
r.get('/:type/today',    setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.today(req, res));
r.get('/:type/latest',   setCache?.(180, 60) ?? ((_, __, next) => next()), (req, res) => c.latest(req, res));
r.get('/:type/trending', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.trending(req, res));
r.get('/:type/top',      setCache?.(300, 60) ?? ((_, __, next) => next()), (req, res) => c.top(req, res));

// ✅ model-scoped (LEFT JOIN tbltagging)
r.get('/model/:modelId/:type/today',    setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.modelToday(req, res));
r.get('/model/:modelId/:type/latest',   setCache?.(180, 60) ?? ((_, __, next) => next()), (req, res) => c.modelLatest(req, res));
r.get('/model/:modelId/:type/trending', setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.modelTrending(req, res));
r.get('/model/:modelId/:type/top',      setCache?.(300, 60) ?? ((_, __, next) => next()), (req, res) => c.modelTop(req, res));

// popular across all types for a model
r.get('/model/:modelId/popular',        setCache?.(120, 60) ?? ((_, __, next) => next()), (req, res) => c.modelPopular(req, res));

export const videosRouter = r;




