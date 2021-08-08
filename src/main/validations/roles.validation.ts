import { isNil } from 'lodash';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { GenericError } from '../../interfaces/http/errors';

const validateRoles = (user = null, requiredRoles: any[]): boolean => {
  try {
    if (isNil(user)) {
      throw new GenericError('User can not be null', StatusCodes.PRECONDITION_FAILED, ReasonPhrases.PRECONDITION_FAILED);
    }

    if (!requiredRoles.includes(user.role)) {
      // eslint-disable-next-line prettier/prettier
      throw new GenericError('User must have a valid role to perfom this action', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }
    return true;
  } catch (error) {
    // TODO: adjust codes and reason phrases to error object
    throw new GenericError(error.message, error.statusCode, error.name);
  }
};

export default validateRoles;
