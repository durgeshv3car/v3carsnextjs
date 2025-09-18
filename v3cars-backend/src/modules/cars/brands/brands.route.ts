import { Router } from 'express';
import { BrandsController } from './brands.controller.js';

const r = Router();
const c = new BrandsController();

r.get('/', (req, res) => c.list(req, res));
r.get('/:id', (req, res) => c.getById(req, res));

export const brandsRouter = r;
