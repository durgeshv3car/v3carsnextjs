import { Router } from 'express';
import { CountriesController } from './countries.controller.js';
import { setCache } from '../../../middlewares/cacheHeaders.js';
const r = Router();
const c = new CountriesController();
r.get('/', setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.list(req, res));
r.get('/:id', setCache?.(1800, 120) ?? ((_, __, next) => next()), (req, res) => c.getById(req, res));
export const countriesRouter = r;
