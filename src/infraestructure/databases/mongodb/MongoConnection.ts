import fs from 'fs';
import { MongoError } from 'mongodb';
import mongoose from 'mongoose';
import { environmentConfig, logger } from '../../../main/config/';

// eslint-disable-next-line
const dbOptions = (): any => {
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

const callback = (err?: MongoError): any => {
  if (err) {
    logger.error(err.message);
  } else {
    logger.info(`Conectado a DB en el puerto: 27017 -> \x1b[32m%s\x1b[0m`, `online`);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const connectDatabase = (dbURL: string, dbOptions: any): void => {
  return mongoose.connect(dbURL, { ...dbOptions }, callback);
};

export { dbOptions, callback, connectDatabase };
