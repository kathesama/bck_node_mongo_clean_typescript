import { MongoError } from 'mongodb';
import mongoose from 'mongoose';
import { logger } from '../../../main/config/';

const callback = (err?: MongoError): any => {
  if (err) {
    logger.error(err.message);
    // logger.error('error:' + err.message);
  } else {
    // eslint-disable-next-line quotes
    logger.info(`Conectado a DB en el puerto: 27017 -> \x1b[32m%s\x1b[0m`, `online`);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const connectDatabase = (dbURL: string, dbOptions: any): void => {
  return mongoose.connect(dbURL, { ...dbOptions }, callback);
};

export { callback, connectDatabase };
