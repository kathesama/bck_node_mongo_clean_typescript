import bcryptjs from 'bcryptjs';
import _ from 'lodash';
import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
// eslint-disable-next-line no-unused-vars
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';
import UserService from '../../domain/services/user.service';
import { UserModel } from '../../domain/models/User.model';

import { PatchUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import { mergeObjects } from '../../main/utils/utilFunctions';

export class PatchUserFactorie implements ControllerInterface {
  constructor(private readonly patchUser: PatchUserInterface) {
    this.patchUser = patchUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params;

      const userDb: UserModel = await UserService.getAllById(userId);

      if (_.isNil(userDb) || _.isEmpty(userDb)) {
        return badRequestHelper(new Error(`${userId} doesn't exists`));
      }

      const user: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        age: number;
        image: string;
        role: string;
        isActive: boolean;
      } = httpRequest.body;

      if (user.password) {
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);
      }

      const updatedUser = mergeObjects(userDb[0]._doc, user);

      const userPatched: any = await this.patchUser.patch(userId, updatedUser);

      return successHelper(userPatched);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
