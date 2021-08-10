/* eslint-disable prettier/prettier */
import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { badRequestHelper } from './http.helper';
import { environmentConfig, logger } from '../main/config';
import TokenService from '../domain/services/token.service';

import { tokenTypes } from '../domain/enums/token.enum';
import { GenericError } from '../interfaces/http/errors';
import { isNil } from 'lodash';
import { TokenModel } from '../domain/models/Token.model';

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
// TODO: estos tokens no se almacenan, deben vencer rapido
const getTypedToken = (uuid: string, expires: any, type: any, secret = environmentConfig().jwtConfig.SECRET) => {
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
const saveToken = async (token: string, userId: string, fingerprint: string, expires: any, type: string, blacklisted = false) => {
  try {
    const tokenObj = new TokenModel(
      token,
      fingerprint,
      userId,
      type,
      expires,
      blacklisted
    );

    const tokenDoc = await TokenService.create(tokenObj);

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
const loadToken = async (userId: string, fingerprint: string, type: string, blacklisted = false): Promise<any> => {
  try {
    const tokenDoc = await TokenService.findOne({
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

const performDeleteUserToken = async (query: any): Promise<boolean> => {
  const responseObj = await TokenService.blacklistToken(query).then(() => {
    return true;
  });

  return responseObj ? Promise.resolve(true) : Promise.reject(false);
};

/*
 * receives a counter and a number representing max number of tokens created by user, if it are in maximun it deletes with a query the others and returns the new token created
 */
const validateMaxTokensByUser = async (max: number, query: any, message: string): Promise<any> => {
  const counter = await TokenService.countDocuments(query);

  if (counter > max) {
    logger.warn(message);
    return false;
  } else return true;
};

//------------------------------------------------------------
const checkAllValidTokens = async (max: number, query: any, message: string, reset = false): Promise<boolean> => {
  const resultObj = reset ? performDeleteUserToken(query) : validateMaxTokensByUser(max, query, message);

  return resultObj;
};

const  generateNewTokenByType = async (user: string, fingerprint: string, tokenType: string): Promise<any> => {
  let newTokenExpires: any;
  let convert= true;

  switch (tokenType) {
    case tokenTypes.REFRESH:
        newTokenExpires = moment().add(environmentConfig().jwtConfig.refreshExpirationDays, 'days');
      break;
    case tokenTypes.ACCESS:
        newTokenExpires = moment().add(environmentConfig().jwtConfig.accessExpirationMinutes, 'minutes');
      break;
    case tokenTypes.RESET_PASSWORD:
        newTokenExpires = moment().add(environmentConfig().jwtConfig.resetPasswordExpirationMinutes, 'minutes');
        convert = false;
      break;
    case tokenTypes.VERIFY_EMAIL:
        newTokenExpires = moment().add(environmentConfig().jwtConfig.verifyEmailExpirationMinutes, 'minutes');
        convert = false;
      break;
  }

  const newToken = getTypedToken(user, newTokenExpires, tokenType);

  await saveToken(newToken, user, fingerprint, newTokenExpires, tokenType);

  return {
    token: newToken,
    expires: convert? newTokenExpires.utc(true).toDate() : newTokenExpires,
  };
};

const getActualToken = async (user: string, fingerprint: string, tokenType: string): Promise<any> => {
  try {
    const actualTokenExpires = await loadToken(user, fingerprint, tokenType, false);
    return {
      token: actualTokenExpires._doc.token,
      expires: actualTokenExpires._doc.expires,
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handleTokens = async (user: any, fingerprint: string, option: string, deletePreviousTokens = false): Promise<any> => {
  // validate that the user does not have more than 5 refresh token, nor more than 1 RT per device
  const queries = {
    ALLTotalTokensByUser: { user: user, type: { $in: [tokenTypes.REFRESH, tokenTypes.ACCESS] }, blacklisted: false },
    ALLTotalTokensByUserAndFingerprint: { user: user, fingerprint, type: { $in: [tokenTypes.REFRESH, tokenTypes.ACCESS] }, blacklisted: false },
    RefreshTokenByFingerprint: { user: user, fingerprint, type: tokenTypes.REFRESH, blacklisted: false },
    AccessTokenByFingerprint: { user: user, fingerprint, type: tokenTypes.ACCESS, blacklisted: false },
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
        !(await checkAllValidTokens(4, queries.ALLTotalTokensByUser, messages['totalGeneralReached'], deletePreviousTokens)) ||
        !(await checkAllValidTokens(0, queries.AccessTokenByFingerprint, messages['totalByFingerprintReached'], true))
      ) {
        throw new GenericError(messages['totalGeneralReached'], StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      // now we've to check that must not exists more than one R.T. with the same fingerprint, if it return the same one (always as be a valid token)
      if (!(await checkAllValidTokens(0, queries.RefreshTokenByFingerprint, messages['totalByFingerprintReached'], deletePreviousTokens))) {
        tokenArray['refresh'] = await getActualToken(user, fingerprint, tokenTypes.REFRESH);
      } else {
        // once we've chech the refresh tokens we've to create a new one
        tokenArray['refresh'] = await  generateNewTokenByType(user, fingerprint, tokenTypes.REFRESH);
      }

      // once we've check the access tokens we've to create a new one
      tokenArray['access'] = await  generateNewTokenByType(user, fingerprint, tokenTypes.ACCESS);
      break;
    case 'reauthenticate':
      // now we've to check that must not exists more than one A.T. with the same fingerprint
      if (!(await checkAllValidTokens(0, queries.AccessTokenByFingerprint, messages['totalByFingerprintReached'], deletePreviousTokens))) {
        throw new GenericError(messages['totalGeneralReached'], StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      // once we've check the access tokens we've to create a new one
      tokenArray['access'] = await  generateNewTokenByType(user, fingerprint, tokenTypes.ACCESS);
      break;
    case 'logout':
      // now we've to check that must not exists more than one A.T. with the same fingerprint
      performDeleteUserToken(queries.ALLTotalTokensByUserAndFingerprint);

      // once we've check the access tokens we've to create a new one
      tokenArray['access'] = 'logged out';
      tokenArray['refresh'] = 'logged out';
      break;
  }

  return tokenArray;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const generateMailedToken = async (user: any, fingerprint: string, type: string): Promise<string> => {
  try {
    const tokenArray = await generateNewTokenByType(user, fingerprint, type);

  // const expires = moment().add(environmentConfig().jwtConfig.verifyEmailExpirationMinutes, 'minutes');
  // const verifyEmailToken = getTypedToken(user, expires, tokenTypes.VERIFY_EMAIL);
  // await saveToken(tokenArray['token'], user, fingerprint, tokenArray['expires'], type);

  return tokenArray['token'];
  } catch (error) {
    throw new GenericError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};



/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
export const verifyToken = async (token: string, type: string, fingerprint: string): Promise<any> => {
  try {
    const secret = environmentConfig().jwtConfig.SECRET;

    const payload = jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw new GenericError('Invalid token', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }

      return decoded;
    });

    const { uuid } = payload['sub'];

    const userData = !isNil(uuid) ? uuid : payload['sub'];

    // eslint-disable-next-line prefer-const
    let query = { token, type, user: userData, blacklisted: false };

    if (fingerprint.length > 0) {
      query['fingerprint'] = fingerprint;
    }

    const tokenDoc = await TokenService.findOne(query);
    if (!tokenDoc) {
      throw new GenericError('Token not found', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }

    return tokenDoc;
  } catch (err) {
    logger.error(err);
    throw new GenericError(`Failure on Security Token, [${err.message}]`, err.statusCode, err.name);
  }
};
