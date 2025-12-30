import { Router } from 'express';
import { StatesController } from './states.controller.js';
import { setCache } from '../../../middlewares/cacheHeaders.js';
const r = Router();
const c = new StatesController();
// Fixed FIRST
r.get('/', setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.list(req, res));
// ID last
r.get('/:id', setCache?.(1800, 120) ?? ((_, __, next) => next()), (req, res) => c.getById(req, res));
export const statesRouter = r;
