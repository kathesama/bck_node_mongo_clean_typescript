import { isNil } from 'lodash';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { GenericError } from '../../interfaces/http/errors';
import RoleService from '../../domain/services/role.service';
import { RoleModel } from '../../domain/models/Role.model';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const validateRoles = async (user: any, requiredRoles: any[]): Promise<boolean> => {
  try {
    if (isNil(user)) {
      throw new GenericError('User can not be null', StatusCodes.PRECONDITION_FAILED, ReasonPhrases.PRECONDITION_FAILED);
    }

    const role: RoleModel = await RoleService.getById(user.role);
    if (!requiredRoles.includes(role[0]._doc.role)) {
      // eslint-disable-next-line prettier/prettier
      throw new GenericError('User must have a valid role to perform this action', StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }
    return true;
  } catch (error) {
    // TODO: adjust codes and reason phrases to error object
    throw new GenericError(error.message, error.statusCode, error.name);
  }
};

export default validateRoles;
