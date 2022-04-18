import { Request, Response } from 'express';
import cookie from 'cookie';

import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { ControllerInterface } from '../../interfaces/controller.interface';
import { environmentConfig } from '../config';

// desacoplamos express del proyecto para usarlo en los routes
export const AdapterRoute = (controller: ControllerInterface) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
      query: req.query,
      fingerprint: req.fingerprint,
      language: req.language,
      user: req.user,
      cookies: cookie.parse(req.headers.cookie || ''),
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);

    if (httpResponse?.cookie && environmentConfig().serverConfig.IS_COOKIE_HTTPONLY_BASED) {
      const {
        cookie: { name = 'cookie_name', value = 'cookie_value', ...options },
      } = httpResponse;

      res.status(httpResponse.statusCode).cookie(name, value, options).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    }
  };
};
