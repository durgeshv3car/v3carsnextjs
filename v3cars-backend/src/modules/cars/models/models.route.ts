// src/modules/cars/models/models.route.ts
import { Router } from 'express';
import { ModelsController } from './models.controller.js';
import { setCache } from '../../../middlewares/cacheHeaders.js';

const r = Router();
const c = new ModelsController();

r.get('/top-selling-month', setCache(1800, 120), (req, res) => c.topSellingMonthly(req, res));
r.get('/upcoming-monthly-count', setCache(1800, 120), (req, res) => c.upcomingMonthlyCount(req, res));
r.get('/', setCache(300, 60), (req, res) => c.list(req, res));
r.get('/:id', setCache(600, 120), (req, res) => c.getById(req, res));

export const modelsRouter = r;
