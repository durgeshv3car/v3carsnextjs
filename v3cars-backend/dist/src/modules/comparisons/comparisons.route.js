import { Router } from 'express';
import { ComparisonsController } from './comparisons.controller.js';
const r = Router();
const c = new ComparisonsController();
r.get('/today', (req, res) => c.today(req, res));
r.get('/latest', (req, res) => c.latest(req, res));
r.get('/trending', (req, res) => c.trending(req, res));
r.get('/top', (req, res) => c.top(req, res));
/** 🆕 Popular compare URLs (by totalViews) */
r.get('/popular', (req, res) => c.popular(req, res));
export const comparisonsRouter = r;
