

import { Router } from 'express';
import { carsRouter } from '../modules/cars/cars.routes.js';
import { homeRouter } from '../modules/home/home.route.js';
import { newsRouter } from '../modules/news/news.route.js';
import { contentRouter } from '../modules/content/content.route.js';
import { reviewsRouter } from '../modules/reviews/reviews.route.js';
import { comparisonsRouter } from '../modules/comparisons/comparisons.route.js';
import { videosRouter } from '../modules/videos/videos.route.js';
import { locationsRouter } from '../modules/locations/location.routes.js';
import { faqsRouter } from '../modules/faqs/faqs.route.js'; 
import { fuelRouter } from '../modules/fuel/fuel.routes.js';
import { websiteContentRouter } from '../modules/website-content/websiteContent.route.js';
const v1 = Router();



v1.use('/cars', carsRouter);
v1.use('/home', homeRouter);
v1.use('/news', newsRouter);
v1.use('/content', contentRouter);
v1.use('/reviews', reviewsRouter);
v1.use('/comparisons', comparisonsRouter);
v1.use('/videos', videosRouter);
v1.use('/locations', locationsRouter);
v1.use('/faqs', faqsRouter); 
v1.use('/fuel', fuelRouter);
v1.use('/website-content', websiteContentRouter);



export default v1;





