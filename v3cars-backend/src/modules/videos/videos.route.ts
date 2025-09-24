import { Router } from 'express';
import { VideosController } from './videos.controller.js';

const r = Router();
const c = new VideosController();

/** ⚠️ Fixed routes FIRST (so they don't get captured by :type) */
r.get('/latest', (req, res) => c.latestGlobal(req, res));   // /v1/videos/latest  (global)  //home 

/** Type-scoped routes: /v1/videos/:type/...  */
r.get('/:type/today', (req, res) => c.today(req, res));
r.get('/:type/latest', (req, res) => c.latest(req, res));
r.get('/:type/trending', (req, res) => c.trending(req, res));
r.get('/:type/top', (req, res) => c.top(req, res));

export const videosRouter = r;
