import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
// eslint-disable-next-line no-unused-vars
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { AddUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import { logger } from '../../main/config';
// import { UserModel } from '../../domain/models/User.model';

export class RegisterUserFactorie implements ControllerInterface {
  constructor(private readonly addUser: AddUserInterface) {
    this.addUser = addUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['email', 'password'];
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequestHelper(new Error(`${field}`));
        }
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

      // const { role } = httpRequest.body;
      // const user = new UserModel(email, password, firstName, lastName, age, image, role, isActive);

      // const obj = new UserModel();

      const roleAdded: any = await this.addUser.add(user);

      return successHelper(roleAdded);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
