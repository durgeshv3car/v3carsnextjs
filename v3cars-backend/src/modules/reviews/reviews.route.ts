import { Router } from 'express';
import { ReviewsController } from './reviews.controller.js';

const r = Router();
const c = new ReviewsController();

r.get('/today', (req, res) => c.today(req, res));
r.get('/latest', (req, res) => c.latest(req, res));
r.get('/trending', (req, res) => c.trending(req, res));
r.get('/top', (req, res) => c.top(req, res));

export const reviewsRouter = r;
