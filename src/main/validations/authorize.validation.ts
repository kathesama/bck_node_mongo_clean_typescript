/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Response } from 'express';
import { isEqual, isNil } from 'lodash';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { logger } from '../config';
import { HttpRequest } from '../../interfaces/http.interface';
import { checkAutorizationHeader, checkLanguageHeader, clientRequestHelper } from '../../helpers/http.helper';
import { verifyToken } from '../../helpers/token.helper';
import { GenericError } from '../../interfaces/http/errors';
import { validateUser } from './user.validation';

// eslint-disable-next-line prettier/prettier
export const authorize =
  (tokenType: string, ...requiredRoles: any[]) =>
  async (req: HttpRequest, res: Response, next: any): Promise<any> => {
    try {
      req['language'] = checkLanguageHeader(req);

      const token = checkAutorizationHeader(req);

      const fingerprint = req.fingerprint.hash;

      const tokenInfo = await verifyToken(token, tokenType, fingerprint);

      const user = await validateUser(tokenInfo.user, requiredRoles);

      if (isNil(user)) {
        throw new GenericError('A valid user is required to perform this action', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      if (!isEqual(token, tokenInfo.token)) {
        throw new GenericError('Token expired or invalid', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      req['user'] = user;

      next();
    } catch (error) {
      logger.error('Auth error');
      return clientRequestHelper(res, error.statusCode, error.name);
    }
  };
