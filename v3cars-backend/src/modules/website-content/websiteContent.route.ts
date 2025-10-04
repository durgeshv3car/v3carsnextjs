import { Router } from 'express';
import { WebsiteContentController } from './websiteContent.controller.js';

// (optional) CDN/edge cache headers — same pattern as FAQs
import { setCache } from '../../middlewares/cacheHeaders.js';

const r = Router();
const c = new WebsiteContentController();

/**
 * Endpoints:
 * GET /v1/website-content?moduleId=1&limit=20&page=1&q=emi&sortBy=latest
 * GET /v1/website-content/:id
 * GET /v1/website-content/modules/:moduleId/latest
 */

// Fixed paths FIRST

r.get(
  '/modules/:moduleId/latest',
  setCache?.(1800, 120) ?? ((_, __, next) => next()),
  (req, res) => c.latestByModule(req, res)
);

// List
r.get(
  '/',
  setCache?.(1800, 120) ?? ((_, __, next) => next()),
  (req, res) => c.list(req, res)
);

// Detail LAST
r.get(
  '/:id',
  setCache?.(1800, 120) ?? ((_, __, next) => next()),
  (req, res) => c.getById(req, res)
);

export const websiteContentRouter = r;
