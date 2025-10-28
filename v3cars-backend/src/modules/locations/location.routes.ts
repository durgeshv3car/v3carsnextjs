import { Router } from 'express';
import { citiesRouter } from './cities/cities.routes.js';
import { statesRouter } from './states/states.routes.js';
import { countriesRouter } from './countries/countries.routes.js';

const r = Router();

r.use('/cities', citiesRouter);
r.use('/states', statesRouter);      
r.use('/countries', countriesRouter); 
export const locationsRouter = r;

