import { Request, Response } from 'express';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { ControllerInterface } from "../../interfaces/controller.interface";

// desacoplamos express del proyecto para usarlo en los routes
export const AdapterRoute = ( controller: ControllerInterface ) => {
  return async (req: Request, res: Response): Promise<any> => {
    const httpRequest: HttpRequest = { body: req.body };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
