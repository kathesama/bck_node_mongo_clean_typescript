import fs from 'fs';
import https from 'https';
import express from 'express';

import routes from './config.routes';
import { logger } from './logger.config';
import { ServerError } from '../../errors';
import configMiddlewares from './middlewares.config';
import { environmentConfig, mongoDbOptions } from './environment.config';
import { connectDatabase } from '../../infraestructure/databases/mongodb/MongoConnection';

class App {
  public app: any = null;
  private server: any = null;

  constructor() {
    this.config();
  }

  private config(): void {
    this.app = express();

    configMiddlewares(this.app);

    // ROUTES INIT
    routes(this.app);

    if (environmentConfig().ENV === 'production') {
      // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
      // see https://expressjs.com/en/guide/behind-proxies.html
      this.app.set('trust proxy', 1);
    }
  }

  private startTLS(): void {
    try {
      const httpsServerOptions = {
        key: fs.readFileSync(environmentConfig().serverConfig.KEY_PEM, 'utf-8'),
        cert: fs.readFileSync(environmentConfig().serverConfig.CERT_PEM, 'utf-8'),
      };

      this.server = https.createServer(httpsServerOptions, this.app).listen(environmentConfig().serverConfig.PORT, () => {
        // eslint-disable-next-line quotes
        logger.info(`Server up at port: \x1b[32m%s\x1b[0m`, `${environmentConfig().serverConfig.PORT}`);
      });
    } catch (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }

  private startNoTLS(): void {
    try {
      this.app.listen(environmentConfig().serverConfig.PORT, () => {
        // eslint-disable-next-line quotes
        logger.info(`Server up at port: \x1b[32m%s\x1b[0m`, `${environmentConfig().serverConfig.PORT}`);
      });
    } catch (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }

  public start(): void {
    try {
      environmentConfig().serverConfig.isHTTPS ? this.startTLS() : this.startNoTLS();

      connectDatabase(environmentConfig().mongooseConfig.URL, mongoDbOptions());
    } catch (error) {
      throw new ServerError(`${error.message}`);
    }
  }

  public close(): void {
    if (this.server) {
      this.server.close(() => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }
}

export default App;
