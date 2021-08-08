/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as joi from 'joi';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

import pick from '../utils/utilFunctions';
import { clientRequestHelper } from '../../helpers/http.helper';

const validateRequestParams = (schema: any) => (req: Request, res: Response, next: any) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'headers']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = joi
    .compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object, schema.options);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return clientRequestHelper(res, httpStatus.BAD_REQUEST, errorMessage);
  }

  Object.assign(req, value);
  return next();
};

export default validateRequestParams;
