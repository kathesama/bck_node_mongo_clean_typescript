import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
// eslint-disable-next-line no-unused-vars
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { AddUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import { logger } from '../../main/config';
import { Cryptography } from '../../interfaces/encryptor.interface';
import { UserModel } from '../../domain/models/User.model';
// import { UserModel } from '../../domain/models/User.model';

export class RegisterUserFactorie implements ControllerInterface {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly addUser: AddUserInterface, private readonly dcrypt: Cryptography) {
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

      const { email, password, firstName, lastName, age, image, role, isActive } = httpRequest.body;

      const crypPassword: string = await this.dcrypt.encrypt(password);

      const roleAdded: any = await this.addUser.add(new UserModel(email, crypPassword, firstName, lastName, age, image, role, isActive));

      return successHelper(roleAdded);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
