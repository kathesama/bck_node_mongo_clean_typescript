import _ from 'lodash';
import { UrlObject } from 'url';
import { serverErrorHelper } from '../helpers/http.helper';
import { logger } from '../main/config';

export class URlLogin {
  static parseURL(urlRef: string): UrlObject {
    try {
      if (_.isEmpty(urlRef)) throw new Error('Invalid URL');
      const newUrl = new URL(urlRef);
      return newUrl;
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}
