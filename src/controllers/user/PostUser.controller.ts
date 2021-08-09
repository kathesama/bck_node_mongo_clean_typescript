import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
// eslint-disable-next-line no-unused-vars
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { AddUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import { logger } from '../../main/config';
import { Cryptography } from '../../interfaces/encryptor.interface';
import { UserModel } from '../../domain/models/User.model';
import { sendVerificationEmail } from '../../helpers/email.helper';
import { handleVerifyEmailTokensInterface } from '../../interfaces/useCaseDTO/Token.interfaces';

export class RegisterUserFactorie implements ControllerInterface {
  // tokenService = TokenService;

  // eslint-disable-next-line no-unused-vars
  constructor(
    private readonly addUser: AddUserInterface,
    private readonly dcrypt: Cryptography,
    private readonly handleToken: handleVerifyEmailTokensInterface
  ) {
    this.addUser = addUser;
    this.dcrypt = dcrypt;
    this.handleToken = handleToken;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // TODO es posible que esta siguiente seccion de codigo esté demás, revisar
      const requiredField = ['email', 'password'];
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequestHelper(new Error(`${field}`));
        }
      }
      // hasta aqui

      const { email, password, firstName, lastName, age, image, role, isActive } = httpRequest.body;

      const crypPassword: string = await this.dcrypt.encrypt(password);

      const userAdded: any = await this.addUser.add(new UserModel(email, crypPassword, firstName, lastName, age, image, role, isActive));

      const confirmToken = await this.handleToken.generateVerifyEmailToken(userAdded.id, httpRequest.fingerprint.hash);

      await sendVerificationEmail(email, confirmToken);

      return successHelper(userAdded);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
