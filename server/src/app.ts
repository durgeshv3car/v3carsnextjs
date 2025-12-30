
// src/app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import v1 from './routes/v1.js';
import { cacheHealth } from './lib/cache.js';

const app = express();


// Basic hardening & infra hints
app.disable('x-powered-by');
app.set('trust proxy', 1);


// Core middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));


// Health endpoints (for LB/uptime checks)
app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/ready', async (_req, res) => {
  const h = await cacheHealth();
  res.json({ ok: true, cache: h });
});


// Versioned API
app.use('/v1', v1);

// 404 for unknown routes
app.use((_req, res) => res.status(404).json({ success: false, message: 'Not Found' }));

export default app;
// src


