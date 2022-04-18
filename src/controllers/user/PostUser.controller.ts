import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper, successHelperWithCookie } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';

import { AddUserInterface, GetOneUserByEmailInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import { environmentConfig, logger } from '../../main/config';
import { Cryptography } from '../../interfaces/encryptor.interface';
import { UserModel } from '../../domain/models/User.model';
import { sendResetPasswordEmail, sendVerificationEmail } from '../../helpers/email.helper';
import { handleTokensInterface, handleVerifyEmailTokensInterface } from '../../interfaces/useCaseDTO/Token.interfaces';
import { GetOneRoleByNameInterface } from '../../interfaces/useCaseDTO/Role.interfaces';
import { GenericError } from '../../interfaces/http/errors';
import { tokenTypes } from '../../domain/enums/token.enum';
import { ValidateGoogleUserInterface } from '../../interfaces/useCaseDTO/Google.interfaces';
import { isNil } from 'lodash';
import UserService from '../../domain/services/user.service';
import { Cookie } from 'nodemailer/lib/fetch/cookies';

export class RegisterUserFactorie implements ControllerInterface {
  // tokenService = TokenService;

  // eslint-disable-next-line no-unused-vars
  constructor(
    private readonly addUser: AddUserInterface,
    private readonly dcrypt: Cryptography,
    private readonly handleToken: handleVerifyEmailTokensInterface,
    private readonly handleRoles: GetOneRoleByNameInterface
  ) {
    this.addUser = addUser;
    this.dcrypt = dcrypt;
    this.handleToken = handleToken;
    this.handleRoles = handleRoles;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // TODO es posible que esta siguiente seccion de codigo esté demás, revisar
      // const requiredField = ['email', 'password'];
      // for (const field of requiredField) {
      //   if (!httpRequest.body[field]) {
      //     return badRequestHelper(new Error(`${field}`));
      //   }
      // }
      // hasta aqui

      const { email, password, firstName, lastName, age, image, role, isActive, isGoogle } = httpRequest.body;

      const crypPassword: string = await this.dcrypt.encrypt(password);

      const roleObj: any = await this.handleRoles.getOneByName(role);

      const userAdded: any = await this.addUser.add(
        new UserModel(email, crypPassword, firstName, lastName, age, image, roleObj._doc._id, isActive, isGoogle)
      );

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

export class MakeVerifyGoogleUserFactory implements ControllerInterface {
  // eslint-disable-next-line no-unused-vars
  constructor(
    private readonly user: ValidateGoogleUserInterface,
    private readonly handleToken: handleTokensInterface,
    private readonly userService: typeof UserService
  ) {
    this.user = user;
    this.handleToken = handleToken;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const option = 'login';
      const { token } = httpRequest.body;
      const ticket = await this.user.validate({
        idToken: token,
        audience: environmentConfig().googleConfig.GOOGLE_CLIENT_ID,
      });

      const {
        payload: { name, email, picture },
      } = ticket;

      const userDB: UserModel = await this.userService.getByEmail(email);

      if (!userDB || isNil(userDB) || userDB?.isGoogle === false || userDB?.isActive === false) {
        return badRequestHelper(new Error('User not found'), ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }

      // Se deben enviar los tokens de acceso y refresh generados, el refresh se almacena
      // y se valida su fingerprint para que corresponda con el refresh y devuelva un token de acceso
      try {
        const tokenTupla = await this.handleToken.handleTokens(userDB, httpRequest.fingerprint.hash, option, false);

        const { access, refresh } = tokenTupla;
        const expires = Number.parseInt(environmentConfig().jwtConfig.accessExpirationMinutes, 10) || 0;
        const options = {
          created: new Date(Date.now()),
          expire: new Date(Date.now() + expires * 60 * 1000),
          maxAge: new Date(Date.now() + expires * 60 * 1000),
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
        };

        const cookie: Cookie = environmentConfig().serverConfig.IS_COOKIE_HTTPONLY_BASED
          ? {
              name: 'session',
              value: refresh['token'],
              ...options,
            }
          : undefined;

        return successHelperWithCookie(
          {
            access: {
              token: access['token'],
              expires: access['expires'],
            },
            refresh: environmentConfig().serverConfig.IS_COOKIE_HTTPONLY_BASED
              ? {}
              : {
                  token: refresh['token'],
                  expires: refresh['expires'],
                },
            user: {
              name,
              email,
              picture,
            },
          },
          cookie
        );
      } catch (error) {
        logger.error(error);
        return badRequestHelper(error.message, ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
