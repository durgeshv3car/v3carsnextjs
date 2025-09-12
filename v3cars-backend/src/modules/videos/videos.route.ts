import { Router } from 'express';
import { VideosController } from './videos.controller.js';

const r = Router();
const c = new VideosController();

// e.g. /v1/videos/reviews/latest
r.get('/:type/today', (req, res) => c.today(req, res));
r.get('/:type/latest', (req, res) => c.latest(req, res));
r.get('/:type/trending', (req, res) => c.trending(req, res));
r.get('/:type/top', (req, res) => c.top(req, res));

export const videosRouter = r;
