import mongoose from 'mongoose';
import fs from 'fs';

import { logger, environment } from '../../../main/config/';

export default ():void => {
  try {
    const sslCA = environment().mongooseConfig.IS_TLS === true ? [fs.readFileSync(environment().mongooseConfig.CA_CERT, 'utf-8')] : [];
    const sslPass = environment().mongooseConfig.IS_TLS === true ? environment().mongooseConfig.CA_TOKEN : '';
    const sslKey = environment().mongooseConfig.IS_TLS === true ? fs.readFileSync(environment().mongooseConfig.KEY_CERT, 'utf-8') : '';
    const sslCert = environment().mongooseConfig.IS_TLS === true ? fs.readFileSync(environment().mongooseConfig.PEM_CERT, 'utf-8') : '';

    const options = {
      sslCA,
      sslPass,
      sslKey,
      sslCert,
      ssl: true,
      ...environment().mongooseConfig.options,
      dbName: environment().mongooseConfig.DB_NAME
    };

    mongoose.connect(environment().mongooseConfig.URL, { ...options }, (err) => {
      if (err) {
        logger.error(err.message);
      }else{
        logger.info(`Conectado a DB en el puerto: 27017 -> \x1b[32m%s\x1b[0m`, 'online');
      }
    });

  } catch (error) {
    logger.error(error);
  }
};
