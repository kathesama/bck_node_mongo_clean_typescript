/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line no-unused-vars
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      language?: Record<string, any>;
    }
  }
}
