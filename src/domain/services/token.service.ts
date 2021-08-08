/* eslint-disable prettier/prettier */
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { badRequestHelper } from '../../helpers/http.helper';
import { environmentConfig, logger } from '../../main/config';

import { TokenModel } from '../models/Token.model';
import TokenRepository from '../repositories/token.repository';
import { tokenTypes } from '../enums/token.enum';
import { GenericError } from '../../interfaces/http/errors';
import { isEqual } from 'lodash';

class TokenService {
  async add(token: TokenModel): Promise<any> {
    const one: any = TokenRepository.create(token);
    return one;
  }

  /**
   * Delete auth tokens
   * @param {Object} query with user, type and fingerprint (optional)
   * @returns {Promise<Object>}
   */
  private deleteUserTokens = async (query = {}) => {
    try {
      await TokenRepository.deleteMany(query, (err) => {
        if (err) {
          logger.error(err);
          throw new Error(err);
        }
      });
    } catch (error) {
      return badRequestHelper(error, ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  /**
   * Generate token
   * @param {ObjectId} userId
   * @param {Moment} expires
   * @param {string} [secret]
   * @returns {string}
   */
  // TODO: estos tokens no se almacenan, deben vencer rapido
  private getTypedToken = (uuid: string, expires: any, type: any, secret = environmentConfig().jwtConfig.SECRET) => {
    const payload = {
      sub: uuid,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };

  //------------------------------------------------------------
  /**
   * Save a token
   * @param {string} token
   * @param {ObjectId} userId
   * @param {Moment} expires
   * @param {string} type
   * @param {boolean} [blacklisted]
   * @returns {Promise<Token>}
   */
  private saveToken = async (token: string, userId: string, fingerprint: string, expires: any, type: string, blacklisted = false) => {
    try {
      const tokenDoc = await TokenRepository.create({
        token,
        user: userId,
        fingerprint,
        expires: expires.toDate(),
        type,
        blacklisted,
      });

      return tokenDoc;
    } catch (error) {
      logger.error(error);
      return badRequestHelper(error, ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  /**
   * load a token
   * @param {ObjectId} userId
   * @param {string} type
   * @param {boolean} [blacklisted]
   * @returns {Promise<Token>}
   */
  private loadToken = async (userId: string, fingerprint: string, type: string, blacklisted = false): Promise<any> => {
    try {
      const tokenDoc = await TokenRepository.findOne({
        user: userId,
        fingerprint,
        type,
        blacklisted,
      });

      return tokenDoc;
    } catch (error) {
      logger.error(error);
      return badRequestHelper(error, ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  };

  private performDeleteUserToken = async (query: any): Promise<boolean> => {
    const responseObj = await this.deleteUserTokens(query).then(() => {
      return true;
    });

    return responseObj ? Promise.resolve(true) : Promise.reject(false);
  };

  /*
   * receives a counter and a number representing max number of tokens created by user, if it are in maximun it deletes with a query the others and returns the new token created
   */
  private validateMaxTokensByUser = async (max: number, query: any, message: string): Promise<any> => {
    const counter = await TokenRepository.countDocuments(query);

    if (counter > max) {
      logger.warn(message);
      return false;
    } else return true;
  };

  //------------------------------------------------------------
  private checkAllValidTokens = async (max: number, query: any, message: string, reset = false): Promise<boolean> => {
    const resultObj = reset ? this.performDeleteUserToken(query) : this.validateMaxTokensByUser(max, query, message);

    return resultObj;
  };

  private generateNewToken = async (user: string, fingerprint: string, tokenType: string): Promise<any> => {
    const accessTokenExpires = isEqual(tokenType, tokenTypes.REFRESH)
      ? moment().add(environmentConfig().jwtConfig.refreshExpirationDays, 'days')
      : moment().add(environmentConfig().jwtConfig.accessExpirationMinutes, 'minutes');

    const accessToken = this.getTypedToken(user, accessTokenExpires, tokenType);

    await this.saveToken(accessToken, user, fingerprint, accessTokenExpires, tokenType);

    return {
      token: accessToken,
      expires: accessTokenExpires.utc(true).toDate(),
    };
  };

  private getActualToken = async (user: string, fingerprint: string, tokenType: string): Promise<any> => {
    try {
      const accessTokenExpires = await this.loadToken(user, fingerprint, tokenType, false);
      return {
        token: accessTokenExpires._doc.token,
        expires: accessTokenExpires._doc.expires,
      };
    } catch (error) {
      throw new GenericError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  };

  //------------------------------------------------------------
  /**
   * Generate auth tokens
   * @param {UserModel} user
   * @param {string} fingerprint
   * @returns {Promise<Object>}
   */
  getAToken = async (user: any, fingerprint: string, option: string, deletePreviousTokens = false): Promise<any> => {
    // validate that the user does not have more than 5 refresh token, nor more than 1 RT per device
    const queries = {
      ALLTotalTokensByUser: { user: user, type: { $in: [tokenTypes.REFRESH, tokenTypes.ACCESS] } },
      RefreshTokenByFingerprint: { user: user, fingerprint, type: tokenTypes.REFRESH },
      AccessTokenByFingerprint: { user: user, fingerprint, type: tokenTypes.ACCESS },
    };

    const messages = {
      totalGeneralReached: `User: ${user.email} have reached the maximum number of tokens per user. Close at least one open session for enable to open another more.`,
      totalByFingerprintReached: `User ${user.email} was trying to create more than available tokens for the same device.`,
    };

    // eslint-disable-next-line prefer-const
    let tokenArray = {};

    switch (option) {
      case 'login':
        // We validate that it do not have more than one A.T or R.T. per fingerprint, else create a new one
        // first we've to know how many A.T. are already created for this user, not greater than the max, if should logout inline shouldn't be problems
        // also we've to check that must not exists more than one A.T. with the same fingerprint
        if (
          !(await this.checkAllValidTokens(4, queries.ALLTotalTokensByUser, messages['totalGeneralReached'], deletePreviousTokens)) ||
          !(await this.checkAllValidTokens(0, queries.AccessTokenByFingerprint, messages['totalByFingerprintReached'], true))
        ) {
          throw new GenericError(messages['totalGeneralReached'], StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
        }

        // now we've to check that must not exists more than one R.T. with the same fingerprint, if it return the same one (always as be a valid token)
        if (!(await this.checkAllValidTokens(0, queries.RefreshTokenByFingerprint, messages['totalByFingerprintReached'], deletePreviousTokens))) {
          // TODO: get actual token for this fingerprint and return it
          tokenArray['refresh'] = await this.getActualToken(user, fingerprint, tokenTypes.REFRESH);
        } else {
          // once we've chech the refresh tokens we've to create a new one
          tokenArray['refresh'] = await this.generateNewToken(user, fingerprint, tokenTypes.REFRESH);
        }

        // once we've check the access tokens we've to create a new one
        tokenArray['access'] = await this.generateNewToken(user, fingerprint, tokenTypes.ACCESS);
        break;
      case 'reauthenticate':
        // now we've to check that must not exists more than one A.T. with the same fingerprint
        if (!(await this.checkAllValidTokens(0, queries.AccessTokenByFingerprint, messages['totalByFingerprintReached'], deletePreviousTokens))) {
          throw new GenericError(messages['totalGeneralReached'], StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
        }

        // once we've check the access tokens we've to create a new one
        tokenArray['access'] = await this.generateNewToken(user, fingerprint, tokenTypes.ACCESS);
        break;
    }

    return tokenArray;
  };

  //------------------------------------------------------------
  generateJWT = (uuid = '') => {
    return new Promise((resolve, reject) => {
      const payload = { uuid };

      jwt.sign(
        payload,
        environmentConfig().jwtConfig.SECRET,
        { expiresIn: environmentConfig().jwtConfig.accessExpirationMinutes },
        (err: any, token: string) => {
          if (err) {
            logger.error(err);
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Could not generate jwt token');
          } else {
            resolve(token);
          }
        }
      );
    });
  };

  /**
   * Verify token and return token doc (or throw an error if it is not valid)
   * @param {string} token
   * @param {string} type
   * @returns {Promise<Token>}
   */
  verifyToken = async (token: string, type: string, fingerprint: string): Promise<any> => {
    try {
      const payload = jwt.verify(token, environmentConfig().jwtConfig.SECRET, (err, decoded) => {
        if (err) {
          throw new GenericError('Invalid token', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
        }

        return decoded;
      });

      // eslint-disable-next-line prefer-const
      let query = { token, type, user: payload.sub.uuid, blacklisted: false };

      if (fingerprint.length > 0) {
        query['fingerprint'] = fingerprint;
      }

      const tokenDoc = await TokenRepository.findOne(query);
      if (!tokenDoc) {
        throw new GenericError('Token not found', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      return tokenDoc;
    } catch (err) {
      logger.error(err);
      throw new GenericError(`Failure on Security Token, [${err.message}]`, err.statusCode, err.name);
      // return badRequestHelper(`Failure on Security Token, [${err.message}]`, ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }
  };
}

export default new TokenService();
