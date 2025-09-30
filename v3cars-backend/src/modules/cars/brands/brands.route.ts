import { Router } from 'express';
import { BrandsController } from './brands.controller.js';

const r = Router();
const c = new BrandsController();

r.get('/brands', (req, res) => c.list(req, res));
r.get('/brands /:id', (req, res) => c.getById(req, res));

export const brandsRouter = r;
