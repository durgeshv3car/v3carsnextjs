import { Router } from 'express';
import { FuelController } from './fuel.controller.js';
import { setCache } from '../../middlewares/cacheHeaders.js'; // adjust path if your middleware lives elsewhere

const r = Router();
const c = new FuelController();

r.get('/price/latest',  setCache?.(300, 60)  ?? ((_, __, next) => next()), (req, res) => c.latest(req, res));
r.get('/price/history', setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.history(req, res));
r.get('/states',        setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.states(req, res));
r.get('/cities',        setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.cities(req, res));
r.get('/states/combined', setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.statesCombined(req, res));
r.get('/price/history/combined', setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.historyCombined(req, res));

export const fuelRouter = r;


