import Fingerprint from 'express-fingerprint';
import { environmentConfig } from '../config';

const userAgent: any = Fingerprint;

const params: any = {
  parameters: [
    // Defaults
    userAgent.useragent,
    userAgent.acceptHeaders,
    // Fingerprint.geoip,

    // personalized params
    (next: any) => {
      next(null, {
        fingerKey: environmentConfig().serverConfig.SERVER_FINGERKEY,
      });
    },
  ],
};

// reminding browser
export const fingerprint = Fingerprint(params);
