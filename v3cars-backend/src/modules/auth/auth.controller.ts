// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { registerSchema, loginSchema, verifyLoginSchema } from './auth.validators.js';

const svc = new AuthService();

export class AuthController {

  async register(req: Request, res: Response) {
    try {
      const body = registerSchema.parse(req).body;
      const result = await svc.register(body);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  
  async sendOtpForLogin(req: Request, res: Response) {
    try {
      const body = loginSchema.parse(req).body;
      const result = await svc.login(body);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }


  async verifyLogin(req: Request, res: Response) {
    try {
      const body = verifyLoginSchema.parse(req).body;
      const result = await svc.verifyLogin(body);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  }


}
