import { Router } from 'express';
import validateRequestParams from '../validations/validateRequestParams.validation';

import { AdapterRoute } from '../adapters/express.adapter';
import {
  makeGetAllUserFactorie,
  makeGetOneUserFactorie,
  makeRegisterUserFactorie,
  makeUpdateUserFactorie,
  makeDeleteUserFactorie,
} from '../factories/user.factorie';
import * as userValidation from '../validations/userRequestParams.validation';

export default (router: Router): void => {
  router
    .route('/users/')
    .get([validateRequestParams(userValidation.getUsers)], AdapterRoute(makeGetAllUserFactorie()))
    .post([validateRequestParams(userValidation.createUser)], AdapterRoute(makeRegisterUserFactorie()));

  router
    .route('/users/:userId')
    .get([validateRequestParams(userValidation.getUser)], AdapterRoute(makeGetOneUserFactorie()))
    .patch([validateRequestParams(userValidation.updateUser)], AdapterRoute(makeUpdateUserFactorie()))
    .delete([validateRequestParams(userValidation.deleteUser)], AdapterRoute(makeDeleteUserFactorie()));
};
