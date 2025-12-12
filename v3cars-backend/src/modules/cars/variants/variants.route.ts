import { Router } from 'express';
import { VariantsController } from './variants.controller.js';
import { setCache } from '../../../middlewares/cacheHeaders.js';

const r = Router();
const c = new VariantsController();

r.get('/variants', setCache(1800, 120), (req, res) => c.list(req, res));
r.get('/variants/:id', setCache(1800, 120), (req, res) => c.getById(req, res));

export const variantsRouter = r;
