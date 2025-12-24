import { Router } from 'express';
import { WebStoriesController } from './webstories.controller.js';
import { setCache } from '../../middlewares/cacheHeaders.js';
const r = Router();
const c = new WebStoriesController();
r.get('/', setCache(120, 60), (req, res) => c.list(req, res));
export const webStoriesRouter = r;
