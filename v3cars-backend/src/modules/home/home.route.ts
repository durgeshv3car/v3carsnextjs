import { Router } from 'express';
import { HomeController } from './home.controller.js';

const r = Router();
const c = new HomeController();

r.get('/upcoming-cars', (req, res) => c.upcoming(req, res));
r.get('/quick-look', (req, res) => c.quickLook(req, res));
r.get('/search-by-body-type', (req, res) => c.byBodyType(req, res));
r.get('/search-by-price', (req, res) => c.byPrice(req, res));
r.get('/latest-news', (req, res) => c.latestNews(req, res));
r.get('/latest-reviews', (req, res) => c.latestReviews(req, res));

/** 🆕 Home widgets */
r.get('/latest-videos', (req, res) => c.latestVideos(req, res));
r.get('/latest-variant-explained', (req, res) => c.latestVariantExplained(req, res));

export const homeRouter = r;
