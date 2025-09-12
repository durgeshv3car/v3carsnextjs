import { Router } from 'express';
import { ModelsController } from './models.controller.js';

const r = Router();
const c = new ModelsController();

r.get('/models', (req, res) => c.list(req, res));
r.get('/models/:id', (req, res) => c.getById(req, res));

export const modelsRouter = r;
