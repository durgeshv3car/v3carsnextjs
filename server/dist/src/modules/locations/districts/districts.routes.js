import { Router } from 'express';
import { DistrictsController } from './districts.controller.js';
const r = Router();
const c = new DistrictsController();
r.get('/', (req, res) => c.list(req, res));
r.get('/:id', (req, res) => c.getById(req, res));
export const districtsRouter = r;
