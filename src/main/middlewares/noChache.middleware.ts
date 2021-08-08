import { Request, Response, NextFunction } from 'express';

// export const cors = (req: Request, res: Response, next: NextFunction): void => {
//   res.set('access-control-allow-origin', '*');
//   res.set('access-control-allow-headers', '*');
//   res.set('access-control-allow-methods', '*');

//   next();
// };

export const noCache = (req: Request, res: Response, next: NextFunction): void => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');

  next();
};
