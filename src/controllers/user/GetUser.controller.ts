/* eslint-disable no-unused-vars */
import { ControllerInterface } from '../../interfaces/controller.interface';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import { GetUserInterface, GetOneUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';

export class GetAllUser implements ControllerInterface {
  constructor(private readonly getUser: GetUserInterface) {
    this.getUser = getUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

export class GetOneUser implements ControllerInterface {
  constructor(private readonly getUser: GetOneUserInterface) {
    this.getUser = getUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params;

      const user: any = await this.getUser.getOne(userId);

      return successHelper(user);
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}
