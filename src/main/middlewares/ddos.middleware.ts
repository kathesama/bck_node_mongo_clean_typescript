import Ddos from 'ddos';
import { logger, environmentConfig } from '../config';

const onDenial = (req) => {
  logger.warning('DDOS from ', req);
};

export const ddos = new Ddos({
  burst: 3,
  limit: 4,
  whitelist: environmentConfig().serverConfig.HOST_ENABLED,
  onDenial,
});
