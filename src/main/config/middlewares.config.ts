/* eslint-disable no-unused-vars */
import { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { bodyParser, urlEncoded, ddos, helmet, fingerprint, apiRatelimit } from '../middlewares';
// import { noCache } from '../middlewares/noChache.middleware';
import nocache from 'nocache';

export default (app: Express): void => {
  app.use(fingerprint);
  app.use(cookieParser());
  app.use(bodyParser);
  app.use(urlEncoded);
  // app.use(cors);
  app.use(cors({ origin: '*', credentials: true }));
  app.use(ddos.express);
  app.use(apiRatelimit);
  app.use(helmet());
  app.use(nocache());
};
