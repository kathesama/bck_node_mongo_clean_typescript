/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

import { isEqual } from 'lodash';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const pick = (object: any, keys: any): Record<string, unknown> => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;

/*
 Merge old object with the new object only if the new one has a property with value, ese remains the old value.
*/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mergeObjects = (previousObj: any, actualObj: any) => {
  // eslint-disable-next-line no-unused-vars
  Object.keys(previousObj).forEach(function (key, index) {
    if (actualObj[key] !== undefined && !isEqual(previousObj[key], actualObj[key])) {
      previousObj[key] = actualObj[key];
    }
  });

  return previousObj;
};
