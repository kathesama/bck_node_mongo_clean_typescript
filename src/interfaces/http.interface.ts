import { StatusCodes } from 'http-status-codes';
import { Cookie } from 'nodemailer/lib/fetch/cookies';

export interface HttpResponse {
  statusCode: StatusCodes;
  body: any;
  cookie?: Cookie;
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
  cookies?: any;
}
