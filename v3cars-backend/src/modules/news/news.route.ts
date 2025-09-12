import { Router } from 'express';
import { NewsController } from './news.controller.js';

const r = Router();
const c = new NewsController();

r.get('/today', (req, res) => c.today(req, res));
r.get('/trending', (req, res) => c.trending(req, res));
r.get('/latest', (req, res) => c.latest(req, res));
r.get('/top', (req, res) => c.top(req, res));

export const newsRouter = r;
