import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
// eslint-disable-next-line no-unused-vars
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { AddRoleInterface } from '../../interfaces/useCaseDTO/Role.interfaces';
import { logger } from '../../main/config';
import { RoleModel } from '../../domain/models/Role.model';

export class RegisterRoleFactorie implements ControllerInterface {
  constructor(private readonly addRole: AddRoleInterface) {
    this.addRole = addRole;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['role'];
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequestHelper(new Error(`${field}`));
        }
      }

      const { role } = httpRequest.body;

      const obj = new RoleModel(role);

      const roleAdded: any = await this.addRole.add(obj);

      return successHelper(roleAdded);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
