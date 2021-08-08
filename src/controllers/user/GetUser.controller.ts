/* eslint-disable no-unused-vars */
import { ControllerInterface } from '../../interfaces/controller.interface';
import { serverErrorHelper, successHelper } from '../../helpers/http.helper';
import { HttpRequest, HttpResponse } from '../../interfaces/http.interface';
import { logger } from '../../main/config';

import { GetUserInterface, GetOneUserInterface, GetOneUserAndUpdateInterface } from '../../interfaces/useCaseDTO/User.interfaces';
import TokenService from '../../domain/services/token.service';
import { tokenTypes } from '../../domain/enums/token.enum';

export class GetAllUser implements ControllerInterface {
  constructor(private readonly getUser: GetUserInterface) {
    this.getUser = getUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // object destructuration
      // console.log(httpRequest);
      const { limit = 5, from = 0 } = httpRequest.query;

      const user: any = await this.getUser.get({ limit, from });

      return successHelper(user);
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}

export class GetOneUser implements ControllerInterface {
  constructor(private readonly getUser: GetOneUserInterface) {
    this.getUser = getUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.params;

      const user: any = await this.getUser.getOne(userId);

      return successHelper(user);
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}

export class GetVerifyMailUser implements ControllerInterface {
  tokenService = TokenService;

  constructor(private readonly getUser: GetOneUserAndUpdateInterface) {
    this.getUser = getUser;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { key } = httpRequest.query;

      const tokenDoc = await this.tokenService.verifyToken(key, tokenTypes.VERIFY_EMAIL, httpRequest.fingerprint.hash);

      const user: any = await this.getUser.findOneAndActivate(tokenDoc._doc.user.toString());

      await this.tokenService.blacklistToken(tokenDoc._doc._id.toString());

      return successHelper(user);
    } catch (error) {
      logger.error(error);
      throw serverErrorHelper(error);
    }
  }
}
