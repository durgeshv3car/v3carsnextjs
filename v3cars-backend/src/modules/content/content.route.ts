import { Router } from 'express';
import { ContentController } from './content.controller.js';

const r = Router();
const c = new ContentController();

// e.g. /v1/content/news/today
r.get('/:type/today', (req, res) => c.today(req, res));
r.get('/:type/latest', (req, res) => c.latest(req, res));
r.get('/:type/trending', (req, res) => c.trending(req, res));
r.get('/:type/top', (req, res) => c.top(req, res));

export const contentRouter = r;
