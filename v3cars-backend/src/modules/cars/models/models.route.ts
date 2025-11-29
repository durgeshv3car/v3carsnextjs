
// src/modules/cars/models/models.route.ts
import { Router } from 'express';
import { ModelsController } from './models.controller.js';
import { setCache } from '../../../middlewares/cacheHeaders.js';

const r = Router();
const c = new ModelsController();


r.get('/models/top-selling-month', setCache(1800, 120), (req, res) => c.topSellingMonthly(req, res));
r.get('/models/upcoming-monthly-count', setCache(1800, 120), (req, res) => c.upcomingMonthlyCount(req, res));
r.get('/models', setCache(300, 60), (req, res) => c.list(req, res));
r.get('/models/:id/price-list', setCache(1800, 120), (req, res) => c.priceList(req, res));
r.get('/models/:id/best-variant-to-buy', setCache(1800, 120), (req, res) => c.bestVariantToBuy(req, res));
r.get('/models/:id/dimensions-capacity', setCache(1800, 120), (req, res) => c.dimensionsCapacity(req, res));
r.get('/models/:id/mileage-specs-features', setCache(1800, 120), (req, res) => c.mileageSpecsFeatures(req, res));
r.get('/models/:id/pros-cons', setCache(1800, 120), (req, res) => c.prosCons(req, res));
r.get('/models/:id/competitors', setCache(1800, 120), (req, res) => c.competitors(req, res));
r.get('/models/:id', setCache(600, 120), (req, res) => c.getById(req, res));  
r.get('/models/:id/fuel-efficiency', setCache(1800, 120), (req, res) => c.fuelEfficiency(req, res));
r.get('/models/:id/csd-vs-onroad', setCache(1800, 120), (req, res) => c.csdVsOnroad(req, res));
r.get('/models/:id/offers-discounts', setCache(1800, 120), (req, res) => c.offersDiscounts(req, res));
r.get('/models/:id/monthly-sales', setCache(1800, 120), (req, res) => c.monthlySales(req, res));
r.get('/models/:id/upcoming-cars', setCache(1800, 120), (req, res) => c.upcomingByBrand(req, res));
r.get('/models/:id/others-cars', setCache(1800, 120), (req, res) => c.othersOnSale(req, res));
r.get('/models/:id/service-cost', setCache(1800, 120), (req, res) => c.serviceCost(req, res));
r.get('/models/:id/colours', setCache(1800, 120), (req, res) => c.colours(req, res));
r.get('/models/:id/images', setCache(1800, 120), (req, res) => c.images(req, res));
r.get('/models/:id/pow-wise-service-cost', setCache(1800, 120), (req, res) => c.serviceCostpow(req, res));


export const modelsRouter = r;







