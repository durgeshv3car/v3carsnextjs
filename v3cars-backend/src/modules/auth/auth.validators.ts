// src/modules/auth/auth.validators.ts
import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(1),
    displayName: z.string().min(1),
    mobilenumber: z.string().regex(/^\d{10}$/, 'Invalid mobile number'),
    emailAddress: z.string().email(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    emailAddress: z.string().email(),
  }),
});

export const verifyLoginSchema = z.object({
  body: z.object({
    emailAddress: z.string().email(),
    otpvalue: z.string().length(6),
  }),
});