import { Router } from 'express';
import { ContentController } from './content.controller.js';
import { setCache } from '../../middlewares/cacheHeaders.js';

const r = Router();
const c = new ContentController();

/** Site-wide feeds */
r.get('/:type/today',     setCache?.(120, 60)  ?? ((_, __, next) => next()), (req, res) => c.today(req, res));
r.get('/:type/latest',    setCache?.(180, 60)  ?? ((_, __, next) => next()), (req, res) => c.latest(req, res));
r.get('/:type/trending',  setCache?.(120, 60)  ?? ((_, __, next) => next()), (req, res) => c.trending(req, res));
r.get('/:type/top',       setCache?.(300, 60)  ?? ((_, __, next) => next()), (req, res) => c.top(req, res));
r.get('/:type/popular',   setCache?.(120, 60)  ?? ((_, __, next) => next()), (req, res) => c.popular(req, res));

/** 🔁 By model (ID or slug) via tbltagging (mbId/type/tagContentType) */
r.get('/:type/by-model/:model',    setCache?.(120, 60)  ?? ((_, __, next) => next()), (req, res) => c.todayByModel(req, res));
r.get('/:type/by-model/:model/latest',   setCache?.(180, 60)  ?? ((_, __, next) => next()), (req, res) => c.latestByModel(req, res));
r.get('/:type/by-model/:model/trending', setCache?.(120, 60)  ?? ((_, __, next) => next()), (req, res) => c.trendingByModel(req, res));
r.get('/:type/by-model/:model/top',      setCache?.(300, 60)  ?? ((_, __, next) => next()), (req, res) => c.topByModel(req, res));
r.get('/:type/by-model/:model/popular',  setCache?.(120, 60)  ?? ((_, __, next) => next()), (req, res) => c.popularByModel(req, res));

export const contentRouter = r;
