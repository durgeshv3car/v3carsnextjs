import { Router } from 'express';
import { BrandsController } from './brands.controller.js';
const r = Router();
const c = new BrandsController();
r.get('/brands', (req, res) => c.list(req, res));
// 🔧 fixed stray space in original route
r.get('/brands/:id', (req, res) => c.getById(req, res));
// 🆕 discontinued models for a brand
r.get('/brands/:id/discontinued-models', (req, res) => c.getDiscontinuedModels(req, res));
export const brandsRouter = r;
