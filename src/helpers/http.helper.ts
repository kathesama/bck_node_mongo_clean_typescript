import { ServerError } from "../errors/ServerError";
import { HttpResponse } from "../interfaces/http.interface";

export const serverErrorHelper = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
});

export const badRequestHelper = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const successHelper = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});
