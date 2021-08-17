import fs from 'fs';
import { logger } from './logger.config';
import { environmentConfig } from './environment.config';
import { isEmpty } from 'lodash';

const readFile = (fileToRead: any): any => {
  let file: any = '';

  if (environmentConfig().mongooseConfig.IS_TLS_MONGO === true) {
    try {
      if (fs.statSync(fileToRead)) {
        file = fs.readFileSync(fileToRead, 'utf-8');
      }
    } catch (err) {
      logger.warn(`Mongo TLS is true but no file provided: ${fileToRead}, maybe admin is trying to connect with Atlas!!`);
    }
  }

  return file;
};

const mongoDbOptions = (): any => {
  try {
    const sslPass = environmentConfig().mongooseConfig.IS_TLS_MONGO === true ? environmentConfig().mongooseConfig.CA_TOKEN : '';
    const sslKey = readFile(environmentConfig().mongooseConfig.KEY_CERT);
    const sslCert = readFile(environmentConfig().mongooseConfig.PEM_CERT);
    const sslCA = [readFile(environmentConfig().mongooseConfig.CA_CERT)];

    const options = {
      sslCA,
      sslPass,
      sslKey,
      sslCert,
      ssl: environmentConfig().mongooseConfig.IS_TLS_MONGO,
      ...environmentConfig().mongooseConfig.options,
      dbName: environmentConfig().mongooseConfig.DB_NAME,
    };

    if (Array.isArray(sslCA) && isEmpty(sslCA[0]) && isEmpty(sslKey) && isEmpty(sslCert)) {
      delete options.sslCA;
      delete options.sslPass;
      delete options.sslKey;
      delete options.sslCert;
    }

    return options;
  } catch (error) {
    logger.error(error);
  }
};

export { mongoDbOptions };
