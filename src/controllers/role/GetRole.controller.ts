import { ControllerInterface } from '../../interfaces/controller.interface';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { GetRoleInterface, GetOneRoleInterface } from '../../interfaces/useCaseDTO/Role.interfaces';
import { logger } from '../../main/config';

export class GetAllRole implements ControllerInterface {
  constructor(private readonly getRole: GetRoleInterface) {
    this.getRole = getRole;
  }

  async handle(): Promise<HttpResponse> {
    try {
      const role: any = await this.getRole.get();

      return successHelper(role);
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}

export class GetOneRole implements ControllerInterface {
  constructor(private readonly getRole: GetOneRoleInterface) {
    this.getRole = getRole;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id;

      const role: any = await this.getRole.getOne(id);

      return successHelper(role);
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}
