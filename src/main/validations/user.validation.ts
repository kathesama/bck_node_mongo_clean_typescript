/* eslint-disable no-unused-vars */
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

// import validateRoles from './roles.validation.js';
import { GenericError } from '../../interfaces/http/errors';
import { badRequestHelper } from '../../helpers/http.helper';
import validateRoles from './roles.validation';
import UserService from '../../domain/services/user.service';
import { UserModel } from '../../domain/models/User.model';

export const validateUser = async (uuid: string, requiredRoles: any[]): Promise<any> => {
  try {
    if (!uuid) {
      throw new GenericError('User ID is required', StatusCodes.PRECONDITION_FAILED, ReasonPhrases.PRECONDITION_FAILED);
    }

    const user: UserModel = await UserService.getById(uuid);

    if (!user) {
      throw new GenericError('A valid user is required to perform this action', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isValidRole = await validateRoles(user, requiredRoles);
      if (isValidRole) {
        return user;
      } else {
        throw new GenericError('User do not have permit to perform this action', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
      }
    }
  } catch (error) {
    // TODO: adjust codes and reason phrases to error object
    return badRequestHelper(error.message, error.name, error.statusCode);
  }
};
