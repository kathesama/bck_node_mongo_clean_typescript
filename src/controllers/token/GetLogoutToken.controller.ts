import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { ControllerInterface } from '../../interfaces/controller.interface';
import { badRequestHelper, serverErrorHelper, successHelper, successHelperWithCookie } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { environmentConfig, logger } from '../../main/config';

import { handleTokensInterface } from '../../interfaces/useCaseDTO/Token.interfaces';
import { Cookie } from 'nodemailer/lib/fetch/cookies';

export class GetLogoutToken implements ControllerInterface {
  constructor(private readonly handleToken: handleTokensInterface) {
    this.handleToken = handleToken;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { deletePreviousTokens } = httpRequest.body;
      const { user } = httpRequest;
      const option = 'logout';

      if (!user) {
        return badRequestHelper('There is not user to logout', ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
      }

      // const fingerprint = httpRequest.fingerprint.hash;

      // Se deben enviar los tokens de acceso y refresh generados, el refresh se almacena
      // y se valida su fingerprint para que corresponda con el refresh y devuelva un token de acceso
      try {
        const tokenTupla = await this.handleToken.handleTokens(user.id, httpRequest.fingerprint.hash, option, deletePreviousTokens);

        if (environmentConfig().serverConfig.IS_COOKIE_HTTPONLY_BASED) {
          const options = {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
          };

          const cookie: Cookie = {
            name: 'session',
            value: undefined,
            ...options,
          };

          return successHelperWithCookie(tokenTupla, cookie);
        }

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
