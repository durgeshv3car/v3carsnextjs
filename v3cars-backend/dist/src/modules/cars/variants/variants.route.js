import { Router } from 'express';
import { VariantsController } from './variants.controller.js';
const r = Router();
const c = new VariantsController();
r.get('/variants', (req, res) => c.list(req, res));
r.get('/variants/:id', (req, res) => c.getById(req, res));
export const variantsRouter = r;
