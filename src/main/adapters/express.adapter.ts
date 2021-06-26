import { Request, Response } from 'express';
import { HttpRequest, HttpResponse} from '../../interfaces/http.interface';
import { ControllerInterface } from "../../interfaces/controller.interface";

// desacoplamos express del proyecto para usarlo en los routes
export const AdapterRoute = ( controler: ControllerInterface ) => {

  return async (req: Request, res: Response): Promise<any> => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    };

    const httpResponse: HttpResponse = await controler.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
