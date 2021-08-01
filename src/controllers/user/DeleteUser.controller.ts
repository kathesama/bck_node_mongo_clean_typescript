import _ from 'lodash';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import userService from '../../domain/services/user.service';
import { DeleteUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';

export class DeleteUserFactorie implements ControllerInterface {
  constructor(private readonly deleteUser: DeleteUserInterface) {
    this.deleteUser = deleteUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params;

      const userDb: any = await userService.getById(userId);

      if (_.isNil(userDb) || _.isEmpty(userDb)) {
        return badRequestHelper(new Error(`${userId} doesn't exists`));
      }

      const handledUserRegister: any = await this.deleteUser.delete(userId);

      return successHelper(handledUserRegister);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
