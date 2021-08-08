/* eslint-disable no-unused-vars */
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { isNil } from 'lodash';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import {
  GetTokenInterface,
  // GetOneTokenInterface
} from '../../interfaces/useCaseDTO/Token.interfaces';
// import { CryptographyValidation } from '../../interfaces/encryptor.interface';
// import { AuthenticationToken } from '../../interfaces/jwtToken.interface';
import userService from '../../domain/services/user.service';
import { CryptographyValidation } from '../../interfaces/encryptor.interface';
// import { GenericError } from '../../interfaces/http/errors';
import { UserModel } from '../../domain/models/User.model';
import tokenService from '../../domain/services/token.service';

// export class GetAllToken implements ControllerInterface {
//   constructor(private readonly getToken: GetTokenInterface, private readonly dcrypt: CryptographyValidation) {
//     this.getToken = getToken;
//   }

//   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
//     try {
//       // object destructuration
//       // console.log(httpRequest);
//       const { limit = 5, from = 0 } = httpRequest.query;

//       const token: any = await this.getToken.get({ limit, from });

//       return successHelper(token);
//     } catch (error) {
//       logger.error(error);
//       throw serverErrorHelper(error);
//     }
//   }
// }

export class GetLoginToken implements ControllerInterface {
  userService = userService;

  constructor(private readonly getToken: GetTokenInterface, private readonly dcrypt: CryptographyValidation) {
    this.getToken = getToken;
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
        const tokenTupla = await tokenService.getAToken(userDB, httpRequest.fingerprint.hash, option, deletePreviousTokens);
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
