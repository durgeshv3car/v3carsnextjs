import { Router } from 'express';
import { ModelsController } from './models.controller.js';

const r = Router();
const c = new ModelsController();

r.get('/top-selling-month', (req, res) => c.topSellingMonthly(req, res));

// 1) Fixed paths FIRST
r.get('/upcoming-monthly-count', (req, res) => c.upcomingMonthlyCount(req, res));

// 2) List
r.get('/', (req, res) => c.list(req, res));

// 3) ID route LAST (no regex)
r.get('/:id', (req, res) => c.getById(req, res));

export const modelsRouter = r;
