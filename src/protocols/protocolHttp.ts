import _ from 'lodash';
import { UrlObject } from 'url';
import { InvalidArgument } from '../errors/InvalidArgument';

export class URlLogin {
  static parseURL(urlRef: string): UrlObject {

    if (_.isEmpty(urlRef)) throw new InvalidArgument('Invalid URL');
    const newUrl = new URL(urlRef);
    return newUrl;
  }
}
