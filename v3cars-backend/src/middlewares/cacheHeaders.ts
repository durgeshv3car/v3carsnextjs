
import type { Request, Response, NextFunction } from 'express';

export const setCache = (sMaxAgeSec: number, swrSec = 60) =>
  (_req: Request, res: Response, next: NextFunction) => {
    res.set('Cache-Control', `public, s-maxage=${sMaxAgeSec}, stale-while-revalidate=${swrSec}`);
    next();
  };
