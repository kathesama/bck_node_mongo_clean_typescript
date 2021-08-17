import bcryptjs from 'bcryptjs';
import { isNil, isEmpty } from 'lodash';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';
import UserService from '../../domain/services/user.service';
import { UserModel } from '../../domain/models/User.model';

import { GetOneUserInterface, PatchUserInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import { mergeObjects } from '../../main/utils/utilFunctions';
import { handleBlacklistTokenInterface, handleVerifyTokenInterface } from '../../interfaces/useCaseDTO/Token.interfaces';
import { Cryptography } from '../../interfaces/encryptor.interface';
import { tokenTypes } from '../../domain/enums/token.enum';
import { GenericError } from '../../interfaces/http/errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class PatchUserFactorie implements ControllerInterface {
  constructor(private readonly patchUser: PatchUserInterface) {
    this.patchUser = patchUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params;

      const userDb: Array<UserModel> = await UserService.getAllById(userId);

      if (isNil(userDb) || isEmpty(userDb)) {
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

// TODO: ejecutar este método y chequear que está OK
export class RunResetPasswordFactorie implements ControllerInterface {
  // eslint-disable-next-line no-unused-vars
  constructor(
    private readonly handleUser: GetOneUserInterface & PatchUserInterface,
    private readonly dcrypt: Cryptography,
    private readonly handleToken: handleVerifyTokenInterface & handleBlacklistTokenInterface
  ) {
    this.handleUser = handleUser;
    this.dcrypt = dcrypt;
    this.handleToken = handleToken;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { password } = httpRequest.body;
      const { key } = httpRequest.params;

      const tokenDoc = await this.handleToken.verifyToken(key, tokenTypes.RESET_PASSWORD, httpRequest.fingerprint.hash);

      const user: any = await this.handleUser.getOne(tokenDoc._doc.user.toString());

      if (!user || !user.isActive) {
        throw new GenericError('Account is disabled or User was delete', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      const crypPassword: string = await this.dcrypt.encrypt(password);
      user.password = crypPassword;

      const userUpdated = await this.handleUser.patch(user.id, user);

      this.handleToken.blacklistToken({ _id: tokenDoc._id, type: tokenTypes.RESET_PASSWORD });

      return successHelper(userUpdated);
    } catch (error) {
      logger.error(error.message);
      return serverErrorHelper(error);
    }
  }
}
