import { Router } from 'express';
import { carsRouter } from '../modules/cars/cars.routes.js';
import { homeRouter } from '../modules/home/home.route.js';
import { newsRouter } from '../modules/news/news.route.js';
import { contentRouter } from '../modules/content/content.route.js';
import { reviewsRouter } from '../modules/reviews/reviews.route.js';
import { comparisonsRouter } from '../modules/comparisons/comparisons.route.js';
import { videosRouter } from '../modules/videos/videos.route.js';

const v1 = Router();

v1.use('/cars', carsRouter);
v1.use('/home', homeRouter);
v1.use('/news', newsRouter);
v1.use('/content', contentRouter);
v1.use('/reviews', reviewsRouter);
v1.use('/comparisons', comparisonsRouter);
v1.use('/videos', videosRouter); 

export default v1;

