import { Router } from 'express';
import { citiesRouter } from './cities/cities.routes.js';
import { statesRouter } from './states/states.routes.js';
import { countriesRouter } from './countries/countries.routes.js';
import { districtsRouter } from './districts/districts.routes.js';
const r = Router();
r.use('/cities', citiesRouter);
r.use('/states', statesRouter);
r.use('/countries', countriesRouter);
r.use('/districts', districtsRouter); // NEW
export const locationsRouter = r;
