// src/modules/fuel/fuel.routes.ts
import { Router } from 'express';
import { FuelController } from './fuel.controller.js';
import { setCache } from '../../middlewares/cacheHeaders.js';

const r = Router();
const c = new FuelController();

r.get('/metros', setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.metros(req, res));
r.get('/price/latest',            setCache?.(300, 60)  ?? ((_, __, next) => next()), (req, res) => c.latest(req, res));
r.get('/price/latest/popular',    setCache?.(300, 60)  ?? ((_, __, next) => next()), (req, res) => c.latestPopular(req, res));
r.get('/price/history',           setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.history(req, res));
r.get('/states',                  setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.states(req, res));
r.get('/cities',                  setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.cities(req, res));
r.get('/states/combined',         setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.statesCombined(req, res));
r.get('/price/history/combined',  setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.historyCombined(req, res));
r.get('/monthly/trends', setCache?.(600, 120) ?? ((_, __, next) => next()), (req, res) => c.monthlyTrends(req, res));

export const fuelRouter = r;









