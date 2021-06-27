import mongoose from 'mongoose';
import fs from 'fs';

import { logger, environmentConfig } from '../../../main/config/';

export default ():void => {
  try {
    const sslCA = environmentConfig().mongooseConfig.IS_TLS === true ? [fs.readFileSync(environmentConfig().mongooseConfig.CA_CERT, 'utf-8')] : [];
    const sslPass = environmentConfig().mongooseConfig.IS_TLS === true ? environmentConfig().mongooseConfig.CA_TOKEN : '';
    const sslKey = environmentConfig().mongooseConfig.IS_TLS === true ? fs.readFileSync(environmentConfig().mongooseConfig.KEY_CERT, 'utf-8') : '';
    const sslCert = environmentConfig().mongooseConfig.IS_TLS === true ? fs.readFileSync(environmentConfig().mongooseConfig.PEM_CERT, 'utf-8') : '';

    const options = {
      sslCA,
      sslPass,
      sslKey,
      sslCert,
      ssl: true,
      ...environmentConfig().mongooseConfig.options,
      dbName: environmentConfig().mongooseConfig.DB_NAME
    };

    mongoose.connect(environmentConfig().mongooseConfig.URL, { ...options }, (err) => {
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
