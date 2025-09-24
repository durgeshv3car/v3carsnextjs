import { Router } from 'express';
import { NewsController } from './news.controller.js';
import { setCache } from '../../middlewares/cacheHeaders.js';

const r = Router();
const c = new NewsController();

r.get('/popular', setCache(120, 60), (req, res) => c.popular(req, res));
r.get('/today', setCache(120, 60), (req, res) => c.today(req, res));
r.get('/trending', setCache(120, 60), (req, res) => c.trending(req, res));
r.get('/latest', setCache(120, 60), (req, res) => c.latest(req, res));
r.get('/top', setCache(120, 60), (req, res) => c.top(req, res));

export const newsRouter = r;
