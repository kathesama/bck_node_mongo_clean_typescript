import { Request, Response } from 'express';

import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { ControllerInterface } from '../../interfaces/controller.interface';

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
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
