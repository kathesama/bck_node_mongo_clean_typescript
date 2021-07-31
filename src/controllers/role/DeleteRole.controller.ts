import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import roleService from '../../domain/services/role.service';
import { DeleteRoleInterface } from '../../interfaces/useCaseDTO/Role.interfaces';

export class DeleteRoleFactorie implements ControllerInterface {
  constructor(private readonly deleteRole: DeleteRoleInterface) {
    this.deleteRole = deleteRole;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;

      const roleDb: any = await roleService.getById(id);
      if (!roleDb) {
        return badRequestHelper(new Error(`${id} doesn't exists`));
      }

      const handledRoleRegister: any = await this.deleteRole.delete(roleDb.id);

      return successHelper(handledRoleRegister);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
