// import { ServerError } from '../interfaces/http/errors/_ServerError';
import { HttpResponse } from '../interfaces/http.interface';
// import { MissingFormalParamenter } from '../interfaces/http/errors';
import { GenericError } from '../interfaces/http/errors/GenericError';

export const serverErrorHelper = (error: Error): HttpResponse => {
  error.name = 'Internal Server Error';

  return {
    statusCode: 500,
    body: new GenericError(error, 400),
  };
};

export const badRequestHelper = (error: Error): HttpResponse => {
  error.name = 'Missing Paramenter ';

  return {
    statusCode: 400,
    body: new GenericError(error, 400),
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const successHelper = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
