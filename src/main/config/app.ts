import fs from 'fs';
import https from 'https';
import express from 'express';

import routes from './config.routes';
import { logger } from './logger.config';
import { ServerError } from '../../errors';
import configMiddlewares from './middlewares.config';
import { environmentConfig } from './environment.config';
import ConnectDB from '../../infraestructure/databases/mongodb/MongoConnection';

class App {
  public app: any = null;
  private server: any = null;

  constructor(){
    this.config();
  }

  private config(): void{
    this.app = express();

    configMiddlewares(this.app);

    // ROUTES INIT
    routes(this.app);
  }

  private startTLS(): void{
    try {
      const httpsServerOptions = {
        'key': fs.readFileSync(environmentConfig().serverConfig.KEY_PEM, 'utf-8'),
        'cert': fs.readFileSync(environmentConfig().serverConfig.CERT_PEM, 'utf-8'),
      };

      this.server = https.createServer(httpsServerOptions, this.app).listen(environmentConfig().serverConfig.PORT, () => {
        logger.info(`Server up at port: \x1b[32m%s\x1b[0m`, `${environmentConfig().serverConfig.PORT}`);
      });

    } catch (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }

  private startNoTLS(): void{
    try {
      this.app.listen(environmentConfig().serverConfig.PORT, () => {
          logger.info(`Server up at port: \x1b[32m%s\x1b[0m`, `${environmentConfig().serverConfig.PORT}`);
        });
    } catch (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }

  public start():void{
    try {
      environmentConfig().serverConfig.isHTTPS? this.startTLS() : this.startNoTLS();

      ConnectDB();
    } catch (error) {
      throw new ServerError(`${error.message}`);
    }
  }

  public close():void{
    if (this.server) {
      this.server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }
}

export default App;
