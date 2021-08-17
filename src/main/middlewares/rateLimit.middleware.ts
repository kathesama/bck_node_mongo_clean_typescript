import rateLimit from 'express-rate-limit';
import { environmentConfig } from '../config';
// import { HttpResponse } from '../../interfaces/http.interface';

const message: any = {
  statusCode: 429, // optional, of course
  body: {
    error: 'You are doing that too much. Please try again in while.',
  },
};

export const apiRatelimit = rateLimit({
  windowMs: environmentConfig().serverConfig.HOST_TIME_WINDOWD, // 1 hrs in milliseconds
  max: environmentConfig().serverConfig.HOST_MAX_PETITIONS,
  headers: true, // it will add X-RateLimit-Limit , X-RateLimit-Remaining and Retry-After Headers in the request
  message,
});
