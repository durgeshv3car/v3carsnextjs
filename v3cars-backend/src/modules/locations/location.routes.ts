import { Router } from 'express';
import { citiesRouter } from './cities/cities.routes.js';

const r = Router();
r.use('/cities', citiesRouter);

export const locationsRouter = r;
