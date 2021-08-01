import { Response } from 'express';
import { HttpResponse } from '../interfaces/http.interface';
import { GenericError } from '../interfaces/http/errors/GenericError';

export const serverErrorHelper = (error: Error): HttpResponse => {
  const name = 'Internal Server Error';

  return {
    statusCode: 500,
    body: new GenericError(error, 500, name),
  };
};

export const badRequestHelper = (error: Error): HttpResponse => {
  const name = 'Missing Paramenter ';

  return {
    statusCode: 400,
    body: new GenericError(error, 400, name),
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
