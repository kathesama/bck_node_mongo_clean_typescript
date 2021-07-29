import fs from 'fs';
import { logger } from './logger.config';
import { environmentConfig } from './environment.config';

// eslint-disable-next-line
const mongoDbOptions = (): any => {
  try {
    const sslCA =
      environmentConfig().mongooseConfig.IS_TLS === true
        ? [fs.readFileSync(environmentConfig().mongooseConfig.CA_CERT, 'utf-8')]
        : [];
    const sslPass = environmentConfig().mongooseConfig.IS_TLS === true ? environmentConfig().mongooseConfig.CA_TOKEN : '';
    const sslKey =
      environmentConfig().mongooseConfig.IS_TLS === true
        ? fs.readFileSync(environmentConfig().mongooseConfig.KEY_CERT, 'utf-8')
        : '';
    const sslCert =
      environmentConfig().mongooseConfig.IS_TLS === true
        ? fs.readFileSync(environmentConfig().mongooseConfig.PEM_CERT, 'utf-8')
        : '';

    const options = {
      sslCA,
      sslPass,
      sslKey,
      sslCert,
      ssl: environmentConfig().mongooseConfig.IS_TLS,
      ...environmentConfig().mongooseConfig.options,
      dbName: environmentConfig().mongooseConfig.DB_NAME,
    };

    return options;
  } catch (error) {
    logger.error(error);
  }
};

export { mongoDbOptions };
