/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { isEqual, isNil } from 'lodash';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, checkAutorizationHeader, clientRequestHelper, serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import { handleTokensInterface } from '../../interfaces/useCaseDTO/Token.interfaces';
// import { CryptographyValidation } from '../../interfaces/encryptor.interface';
// import { AuthenticationToken } from '../../interfaces/jwtToken.interface';
import userService from '../../domain/services/user.service';
import { CryptographyValidation } from '../../interfaces/encryptor.interface';
// import { GenericError } from '../../interfaces/http/errors';
// import { UserModel } from '../../domain/models/User.model';
// import tokenService from '../../domain/services/token.service';
// import { tokenTypes } from '../../domain/enums/token.enum';

export class GetReauthenticationToken implements ControllerInterface {
  userService = userService;

  constructor(private readonly handleToken: handleTokensInterface) {
    this.handleToken = handleToken;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { deletePreviousTokens, option } = httpRequest.body;
      const { user } = httpRequest;

      const fingerprint = httpRequest.fingerprint.hash;

      // Se deben enviar los tokens de acceso y refresh generados, el refresh se almacena
      // y se valida su fingerprint para que corresponda con el refresh
      try {
        // TODO: revisar que no esta eliminando el token de acceso anterior sino que esta creando un par de tokens nuevos
        const tokenTupla = await this.handleToken.handleTokens(user._doc._id.toString(), fingerprint, option, deletePreviousTokens);
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
