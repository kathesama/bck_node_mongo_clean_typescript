import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { AddUserInterface, GetOneUserByEmailInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import { logger } from '../../main/config';
import { Cryptography } from '../../interfaces/encryptor.interface';
import { UserModel } from '../../domain/models/User.model';
import { sendResetPasswordEmail, sendVerificationEmail } from '../../helpers/email.helper';
import { handleVerifyEmailTokensInterface } from '../../interfaces/useCaseDTO/Token.interfaces';
import { GenericError } from '../../interfaces/http/errors';
import { tokenTypes } from '../../domain/enums/token.enum';

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

      const confirmToken = await this.handleToken.generateMailedToken(userAdded.id, httpRequest.fingerprint.hash, tokenTypes.VERIFY_EMAIL);

      await sendVerificationEmail(email, confirmToken);

      return successHelper(userAdded);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}

export class MakeResetPasswordFactorie implements ControllerInterface {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly handleUser: GetOneUserByEmailInterface, private readonly handleToken: handleVerifyEmailTokensInterface) {
    this.handleUser = handleUser;
    this.handleToken = handleToken;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email } = httpRequest.body;

      const user: any = await this.handleUser.getOneByEmail(email);

      if (!user || !user.isActive) {
        throw new GenericError('Account is disabled or User was delete', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      // Generate a Reset password token
      const resetPasswordToken = await this.handleToken.generateMailedToken(user.id, httpRequest.fingerprint.hash, tokenTypes.RESET_PASSWORD);

      await sendResetPasswordEmail(email, resetPasswordToken);

      return successHelper(resetPasswordToken.length > 0 ? 'OK' : 'ERROR');
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
