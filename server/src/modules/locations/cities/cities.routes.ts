import { Router } from 'express';
import { CitiesController } from './cities.controller.js';

const r = Router();
const c = new CitiesController();

r.get('/', (req, res) => c.list(req, res));
r.get('/:id', (req, res) => c.getById(req, res));

export const citiesRouter = r;
