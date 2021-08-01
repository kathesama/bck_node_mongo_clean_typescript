/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Joi from 'joi';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

import pick from '../utils/utilFunctions';
import { clientRequestHelper } from '../../helpers/http.helper';
// import { logger } from '../config';

const validate = (schema: any) => (req: Request, res: Response, next: any) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    // logger.error(errorMessage);
    return clientRequestHelper(res, httpStatus.BAD_REQUEST, errorMessage);
  }

  Object.assign(req, value);
  return next();
};

export default validate;
