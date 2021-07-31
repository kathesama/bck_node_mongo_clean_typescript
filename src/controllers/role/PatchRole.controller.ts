import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
// eslint-disable-next-line no-unused-vars
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { PatchRoleInterface } from '../../interfaces/useCaseDTO/Role.interfaces';
import { logger } from '../../main/config';
import { RoleModel } from '../../domain/models/Role.model';
import RoleService from '../../domain/services/role.service';

export class PatchRoleFactorie implements ControllerInterface {
  constructor(private readonly patchRole: PatchRoleInterface) {
    this.patchRole = patchRole;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;

      const roleDb: any = await RoleService.getById(id);
      if (!roleDb) {
        return badRequestHelper(new Error(`${id} doesn't exists`));
      }

      const requiredField = ['role'];
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequestHelper(new Error(`${field}`));
        }
      }

      const { role } = httpRequest.body;
      const obj = new RoleModel(role);

      const rolePatched: any = await this.patchRole.patch(id, obj);

      return successHelper(rolePatched);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
