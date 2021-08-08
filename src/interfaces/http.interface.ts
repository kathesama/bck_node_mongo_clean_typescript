import { StatusCodes } from 'http-status-codes';

export interface HttpResponse {
  statusCode: StatusCodes;
  body: any;
}

export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  fingerprint?: any;
  customVars?: any;
  language?: any;
  user?: any;
}
