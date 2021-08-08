/* eslint-disable no-unused-vars */
import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import { GetUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';

export class LoginController implements ControllerInterface {
  constructor(private readonly getUser: GetUserInterface) {
    this.getUser = getUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['email', 'password'];
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequestHelper(new Error(`${field}`));
        }
      }

      // object destructuration
      // console.log(httpRequest);
      const { limit = 5, from = 0 } = httpRequest.query;

      const user: any = await this.getUser.get({ limit, from });

      return successHelper(user);
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}
