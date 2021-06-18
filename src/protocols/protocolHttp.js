import _ from 'lodash';
import InvalidArgument from '../errors/InvalidArgument.js';

class URlLogin {
  static parseURL(urlRef = '') {
    if (_.isEmpty(urlRef)) throw new InvalidArgument('Invalid URL');
    const newUrl = new URL(urlRef);
    return newUrl;
  }
}

export default URlLogin;
