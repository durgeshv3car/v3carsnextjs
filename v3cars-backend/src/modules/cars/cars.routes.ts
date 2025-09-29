import { Router } from 'express';
import { modelsRouter } from './models/models.route.js';
import { brandsRouter } from './brands/brands.route.js';
import { variantsRouter } from './variants/variants.route.js';

const cars = Router();

cars.use('/models', modelsRouter);
cars.use('/brands', brandsRouter);
cars.use('/', variantsRouter);

export const carsRouter = cars;
