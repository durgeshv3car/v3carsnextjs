import { Router } from 'express';
import { FaqsController } from './faqs.controller.js';

// (optional) CDN/edge cache-control middleware if you’re using it elsewhere
import { setCache } from '../../middlewares/cacheHeaders.js';

const r = Router();
const c = new FaqsController();

// Fixed paths FIRST
r.get('/modules',   setCache?.(3600, 300) ?? ((_, __, next) => next()), (req, res) => c.listModules(req, res));
r.get('/modules/:id', setCache?.(3600, 300) ?? ((_, __, next) => next()), (req, res) => c.getModuleById(req, res));

// List (requires moduleId)
r.get('/',  setCache?.(1800, 120) ?? ((_, __, next) => next()), (req, res) => c.list(req, res));

// ID LAST
r.get('/:id',  setCache?.(1800, 120) ?? ((_, __, next) => next()), (req, res) => c.getById(req, res));

export const faqsRouter = r;

