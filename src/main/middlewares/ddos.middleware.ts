import Ddos from 'ddos';
import { logger, environmentConfig } from "../config";

const onDenial = function (req) {
  logger.warning('DDOS from ', req);
};

export const ddos = new Ddos({
  burst:10,
  limit:15,
  whitelist: environmentConfig().serverConfig.HOST_ENABLED,
  onDenial
});
