import { Router } from 'express';
import { SearchController } from './search.controller.js';

const r = Router();
const c = new SearchController();

r.get('/universal', (req, res) => c.universal(req, res));

export const searchRouter = r;

