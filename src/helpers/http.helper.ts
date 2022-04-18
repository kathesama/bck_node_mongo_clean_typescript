import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { isNil, isNaN, isEmpty } from 'lodash';
import { languageTypes } from '../domain/enums/language.enum';
import { HttpRequest, HttpResponse } from '../interfaces/http.interface';
import { GenericError } from '../interfaces/http/errors/GenericError';
import { Cookie } from 'nodemailer/lib/fetch/cookies';
import { environmentConfig } from '../main/config';

export const serverErrorHelper = (error: Error): HttpResponse => {
  const name = 'Internal Server Error';

  return {
    statusCode: 500,
    body: new GenericError(error, 500, name),
  };
};

export const badRequestHelper = (error: Error | string, name?: string, statusCode?: number): HttpResponse => {
  if (isNil(name)) {
    name = 'Missing Paramenter ';
  }

  if (isNil(statusCode)) {
    statusCode = 400;
  }

  return {
    statusCode: statusCode,
    body: new GenericError(error, statusCode, name),
  };
};

export const clientRequestHelper = (res: Response, errCode: number, error: string): Response => {
  const responseObject = {
    name: 'Client error response ',
    statusCode: errCode,
    content: error,
    timestamp: new Date().toISOString(),
  };

  return res.status(errCode).json(responseObject);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const successHelper = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const successHelperWithCookie = (data: any, cookie?: Cookie): HttpResponse => ({
  statusCode: 200,
  body: data,
  cookie,
});

/**
 * Returns token from Authorization header
 */
export const checkAutorizationHeader = (httpRequest: HttpRequest): any => {
  try {
    let token = '';
    if (environmentConfig().serverConfig.IS_COOKIE_HTTPONLY_BASED) {
      token = `Bearer ${httpRequest.cookies['session']}`;
    } else {
      token = httpRequest.headers.authorization;
    }

    // if (isNil(httpRequest.headers['authorization']) || isNaN(httpRequest.headers['authorization']) || isEmpty(httpRequest.headers['authorization'])) {
    if (isNil(token) || isEmpty(token)) {
      throw new GenericError('Authorization token is required', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    if (!token.startsWith('Bearer')) {
      throw new GenericError('Token is invalid', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    return token.slice(7, token.length);
  } catch (error) {
    return badRequestHelper(error, error.name, error.statusCode);
  }
};

/**
 * Returns Languague from Languague header
 */
export const checkLanguageHeader = (req: HttpRequest): any => {
  try {
    if (isNil(req.headers['accept-language']) || isNaN(req.headers['accept-language']) || isEmpty(req.headers['accept-language'])) {
      // eslint-disable-next-line prettier/prettier
      throw new GenericError('accept-language is required', StatusCodes.PRECONDITION_FAILED, ReasonPhrases.PRECONDITION_FAILED);
    } else if (!Object.values(languageTypes).includes(req.headers['accept-language'])) {
      throw new GenericError(
        `Language [${req.headers['accept-language']}] not supported`,
        StatusCodes.PRECONDITION_FAILED,
        ReasonPhrases.PRECONDITION_FAILED
      );
    }
    return req.headers['accept-language'];
  } catch (error) {
    throw new GenericError(error.message, error.statusCode, error.name);
    // return badRequestHelper(error, error.name, error.statusCode);
  }
};
