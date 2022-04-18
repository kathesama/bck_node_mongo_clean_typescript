import { Request, Response, NextFunction } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-headers', '*');
  res.set('access-control-allow-methods', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  // res.set('X-Permitted-Cross-Domain-Policies', 'no-referrer');
  // res.set('Referrer-Policy', 'no-referrer');
  // res.set('credentials', 'true');
  // res.set('origin', 'http://localhost:8051');

  next();
};
