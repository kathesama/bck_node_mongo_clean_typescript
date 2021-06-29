import { Express } from 'express';
import { bodyParser, urlEncoded, cors, ddos, helmet, fingerprint, apiRatelimit } from '../middlewares';

export default (app: Express): void => {
  app.use(fingerprint);
  app.use(bodyParser);
  app.use(urlEncoded);
  app.use(cors);
  app.use(ddos.express);
  app.use(apiRatelimit);
  app.use(helmet());
};
