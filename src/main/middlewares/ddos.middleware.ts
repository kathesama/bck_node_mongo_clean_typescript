import Ddos from 'ddos';
import { logger, environmentConfig } from '../config';

const onDenial = (req: any) => {
  logger.warn('DDOS from ', req);
};

export const ddos = new Ddos({
  burst: 3,
  limit: 4,
  whitelist: environmentConfig().serverConfig.HOST_ENABLED,
  onDenial,
});
