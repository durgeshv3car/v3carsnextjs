// src/modules/auth/auth.routes.ts
import { Router } from 'express';
import { AuthController } from './auth.controller.js';

const r = Router();
const c = new AuthController();

// POST /register
r.post('/register', (req, res) => c.register(req, res));

// POST /send-otp-for-login
r.post('/send-otp-for-login', (req, res) => c.sendOtpForLogin(req, res));

// POST /verify-login
r.post('/verify-login', (req, res) => c.verifyLogin(req, res));

export const authRouter = r;