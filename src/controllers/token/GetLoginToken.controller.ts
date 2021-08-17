import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { isNil } from 'lodash';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import { handleTokensInterface } from '../../interfaces/useCaseDTO/Token.interfaces';
import { CryptographyValidation } from '../../interfaces/encryptor.interface';
import { UserModel } from '../../domain/models/User.model';
// import tokenService from '../../domain/services/token.service';
import UserService from '../../domain/services/user.service';

export class GetLoginToken implements ControllerInterface {
  constructor(
    private readonly handleToken: handleTokensInterface,
    private readonly dcrypt: CryptographyValidation,
    // eslint-disable-next-line no-unused-vars
    private readonly userService: typeof UserService
  ) {
    this.handleToken = handleToken;
    this.dcrypt = dcrypt;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password, deletePreviousTokens } = httpRequest.body;
      const option = 'login';

      const userDB: UserModel = await this.userService.getByEmail(email);

      if (!userDB || isNil(userDB)) {
        return badRequestHelper(new Error('User not found'), ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }

      const isValidPassword = await this.dcrypt.encryptValidate(password, userDB.password);
      if (!isValidPassword) {
        return badRequestHelper(new Error('Invalid password'), ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }

      // Se deben enviar los tokens de acceso y refresh generados, el refresh se almacena
      // y se valida su fingerprint para que corresponda con el refresh y devuelva un token de acceso
      try {
        const tokenTupla = await this.handleToken.handleTokens(userDB, httpRequest.fingerprint.hash, option, deletePreviousTokens);
        return successHelper(tokenTupla);
      } catch (error) {
        logger.error(error);
        return badRequestHelper(error.message, ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }
    } catch (error) {
      logger.error(error);
      return serverErrorHelper(error);
    }
  }
}
